﻿//******************************************************************************************************
//  OpenMICMeterStatisticOperation.cs - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  07/09/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using SystemCenter.Controllers;
using SystemCenter.Model;
using SystemCenter.Model.Security;
using Setting = SystemCenter.Model.Setting;

namespace SystemCenter
{
    public class OpenMICMeterStatisticOperation
    {

        #region [ Static ]
        private static readonly ILog Log = LogManager.GetLogger(typeof(OpenMICMeterStatisticOperation));
        private static bool Running { get; set; } = false;

        #endregion

        #region [ Member ]
        #endregion

        #region [ Constructor ]
        public OpenMICMeterStatisticOperation() {
        }

        #endregion

        #region [ Properties ]
        #endregion

        #region [ Methods ]
        public void GetStatistics()
        {
            if (Running)
            {
                Log.Info("OpenMIC Statistic operation already running...");
                return;
            }

            try
            {
                Log.Info("Beginning OpenMIC Statistic operation");

                Running = true;
                IEnumerable<string> devices = GetOpenMICMeters();
                if(devices == null)
                    Log.Info("Null devices record recieved from OpenMIC.");
                else if (!devices.Any())
                    Log.Info("Empty devices record recieved from OpenMIC.");

                foreach (string device in devices)
                {
                    try
                    {
                        Log.Info($"Querying {device} for the OpenMIC Statistic operation");

                        JObject statistic = GetOpenMICStatistic(device);
                        if (statistic == null) {
                            Log.Info($"No statistics from openMIC for {device}");
                            continue; 
                        }

                        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                        {
                            AdditionalField field = new TableOperations<AdditionalField>(connection).QueryRecordWhere("ParentTable = 'Meter' AND FieldName = 'OpenMICAcronym'");
                            if (field == null)
                            {
                                Log.Info($"No Field exists for OpenMICAcronym");
                                continue;
                            }

                            AdditionalFieldValue value = new TableOperations<AdditionalFieldValue>(connection).QueryRecordWhere("AdditionalFieldID = {0} AND Value = {1}", field.ID, device);
                            if (value == null)
                            {
                                Log.Info($"No additional value exists for {device}");
                                continue;
                            }

                            Meter meter = new TableOperations<Meter>(connection).QueryRecordWhere("ID = {0}", value.ParentTableID);
                            if (meter == null)
                            {
                                Log.Info($"No meter exists for {device}");
                                continue;
                            }

                            int warningLevel = int.Parse(new TableOperations<Setting>(connection).QueryRecordWhere("Name = 'OpenMIC.WarningLevel'")?.Value ?? "50");
                            int errorLevel = int.Parse(new TableOperations<Setting>(connection).QueryRecordWhere("Name = 'OpenMIC.ErrorLevel'")?.Value ?? "100");

                            openXDA.Model.Setting defaultTimeZone = new TableOperations<openXDA.Model.Setting>(connection).QueryRecordWhere("Name = 'System.DefaultMeterTimeZone'");
                            if (defaultTimeZone == null)
                            {
                                Log.Info($"No setting exists for default time zone, using UTC");
                                defaultTimeZone = new openXDA.Model.Setting() { Value = "UTC" };
                            }

                            if (meter.TimeZone == null) meter.TimeZone = defaultTimeZone.Value;

                            string date = TimeZoneInfo.ConvertTimeFromUtc(statistic["EndTime"]?.ToObject<DateTime>() ?? DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById(meter.TimeZone)).ToString("MM/dd/yyyy");
                            if (date == "01/01/0001") {
                                date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById(meter.TimeZone)).ToString("MM/dd/yyyy");
                            }

                            OpenMICDailyStatistic stat = new TableOperations<OpenMICDailyStatistic>(connection).QueryRecordWhere("Meter = {0} AND Date = {1}", meter.AssetKey, date);

                            if (stat == null)
                            {
                                stat = new OpenMICDailyStatistic();
                                stat.Meter = meter.AssetKey;
                                stat.Date = date;
                                stat.BadDays = new TableOperations<OpenMICDailyStatistic>(connection).QueryRecords("[DATE] DESC", new RecordRestriction("Meter = {0}", meter.AssetKey)).FirstOrDefault()?.BadDays ?? 0;
                            }

                            DateTime? lastSuccess = statistic["LastSuccessfulConnection"].Value<DateTime?>();
                            if (lastSuccess != null)
                                lastSuccess = TimeZoneInfo.ConvertTimeFromUtc((DateTime)lastSuccess, TimeZoneInfo.FindSystemTimeZoneById(meter.TimeZone));

                            stat.LastSuccessfulConnection = lastSuccess;

                            DateTime? lastUnsuccess = statistic["LastUnsuccessfulConnection"].Value<DateTime?>();
                            if (lastUnsuccess != null)
                                lastUnsuccess = TimeZoneInfo.ConvertTimeFromUtc((DateTime)lastUnsuccess, TimeZoneInfo.FindSystemTimeZoneById(meter.TimeZone));

                            stat.LastUnsuccessfulConnection = lastUnsuccess;
                            stat.LastUnsuccessfulConnectionExplanation = statistic["LastUnsuccessfulConnectionExplanation"]?.ToString();
                            stat.TotalSuccessfulConnections = statistic["TotalSuccessfulConnections"]?.ToObject<int>() ?? 0;
                            stat.TotalUnsuccessfulConnections = statistic["TotalUnsuccessfulConnections"]?.ToObject<int>() ?? 0;
                            stat.TotalConnections = stat.TotalSuccessfulConnections + stat.TotalUnsuccessfulConnections;

                            if (stat.Status == "Error") { } // do nothing if alreaedy an error for the day
                            else if (stat.TotalUnsuccessfulConnections > errorLevel)
                            {
                                stat.Status = "Error";
                                stat.BadDays++;

                            }
                            else if (stat.Status == "Warning") { } // do nothing else if already a warning for the day
                            else if (stat.TotalUnsuccessfulConnections > warningLevel)
                            {
                                stat.Status = "Warning";
                            }

                            Log.Info($"Updating statistic record for {device} - Date: {stat.Date} / ID: {stat.ID} / Last Successful Connection: {stat.LastSuccessfulConnection} / Daily Connections: {stat.TotalConnections}");
                            new TableOperations<OpenMICDailyStatistic>(connection).AddNewOrUpdateRecord(stat);
                            Log.Info($"Loaded record for {device} with no exceptions");
                        }

                    }
                    catch (Exception ex)
                    {
                        Log.Error(ex.Message + "\n" + ex.StackTrace, ex);
                    }
                }

            }
            catch (Exception ex) {
                Log.Error(ex.Message + "\n" + ex.StackTrace, ex);

            }
            finally
            {
                Running = false;

            }
        }

        private IEnumerable<string> GetOpenMICMeters() {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                DataTable table = connection.RetrieveData(@"
                    SELECT AdditionalFieldValue.Value
                    FROM
                        AdditionalFieldValue JOIN
                        AdditionalField ON AdditionalFieldValue.AdditionalFieldID = AdditionalField.ID
                    WHERE
                        AdditionalField.ParentTable = 'Meter' AND
                        AdditionalField.FieldName = 'OpenMICAcronym' 

                    ");

                return table.Select().Select(x => x["Value"].ToString());
            }
            //return ControllerHelpers.Get<IEnumerable<string>>("OpenMIC", "api/Operations/Meters");
        }

        private JObject GetOpenMICStatistic(string meter)
        {
            return JObject.Parse(ControllerHelpers.Get("OpenMIC", $"api/Operations/Statistics/{meter}"));
        }

        #endregion
    }
}