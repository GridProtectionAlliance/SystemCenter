//******************************************************************************************************
//  EmailTypeController.cs - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  07/28/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml.Linq;
using GSF.Configuration;
using GSF.Data;
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.APIAuthentication;
using openXDA.Model;
using SystemCenter.Notifications.Model;
using ConfigurationLoader = SystemCenter.Notifications.Model.ConfigurationLoader;

namespace SystemCenter.Notifications.Controllers
{

    public class NotificationEvent
    {
        public string Meter { get; set; }
        public string Asset { get; set; }
        public DateTime StartTime { get; set; }
        public int EventID { get; set; }
        public string EventType { get; set; }
        public bool Triggered { get; set; }
    }

    public class PostEventFilter
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public List<int> EventTypes { get; set; }
        public List<int> MeterIDs { get; set; }
        public List<int> AssetIDs { get; set; }
        public List<int> SubstationIDs { get; set; }
        public List<int> GroupIDs { get; set; }
        public string TriggerSQL { get; set; }
    }

    [RoutePrefix("api/OpenXDA/EmailType")]
    public class EmailTypeController : ModelController<EmailType>
    {
        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration APISettings { get; } = new APIConfiguration();
        }

        [HttpPost, Route("GetEvents")]
        public IHttpActionResult TestTrigger([FromBody] PostEventFilter content)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            try
            {

                string groupFilter = "";
                if (content.GroupIDs.Count > 0)
                {
                    groupFilter = "AND (";
                    groupFilter += $"E.AssetID IN (SELECT AssetID FROM AssetAssetGroup WHERE AssetGroupID IN ({string.Join(",",content.GroupIDs)}))";
                    groupFilter += " OR ";
                    groupFilter += $"E.MeterID IN (SELECT MeterID FROM MeterAssetGroup WHERE AssetGroupID IN ({string.Join(",", content.GroupIDs)}))";
                    groupFilter += ")";
                }

                string locationFilter = "";
                if (content.SubstationIDs.Count > 0)
                {
                    locationFilter = "AND (";
                    locationFilter += $"E.AssetID IN (SELECT AssetID FROM AssetLocation WHERE LocationID IN ({string.Join(",", content.SubstationIDs)}))";
                    locationFilter += " OR ";
                    locationFilter += $"M.LocationID IN ({string.Join(",", content.SubstationIDs)})";
                    locationFilter += ")";
                }

                string sql = $@"
                SELECT TOP 100 
                    E.StartTime, 
                    M.AssetKey AS Meter,
                    A.AssetKey AS Asset,
                    E.ID AS EventID,
                    ET.Description AS EventType,
                    (SELECT CASE WHEN EmailTrigger.Value <> 0 THEN 1 ELSE 0 END) AS Triggered
                FROM
                    Event E LEFT JOIN
                    Asset A ON E.AssetID = A.ID LEFT JOIN
                    Meter M ON M.ID = E.MeterID LEFT JOIN
                    EventType ET ON E.EventTypeID = ET.ID CROSS APPLY  
                    ({string.Format(content.TriggerSQL, "E.ID")}) EmailTrigger(Value) 
                WHERE E.StartTime BETWEEN {{0}} AND {{1}} 
                    {(content.AssetIDs.Count > 0? $" AND E.AssetID IN ({string.Join(",",content.AssetIDs)})" : "")}
                    {(content.MeterIDs.Count > 0 ? $" AND E.MeterID IN ({string.Join(",", content.MeterIDs)})" : "")}
                    {(content.EventTypes.Count > 0 ? $" AND ET.ID IN ({string.Join(",", content.EventTypes)})" : "")}
                    {groupFilter}
                ORDER BY StartTime DESC";

                using (AdoDataConnection connection = CreateDbConnection())
                    return Ok(connection.RetrieveData(sql, content.Start, content.End));
               
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("GetCombined/{eventID:int}")]
        public IHttpActionResult GetCombined(int eventID, [FromBody] JObject postObject)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            try
            {
                string combineSQL = postObject.GetValue("sql").ToString();


                string sql = $@"
                SELECT TOP 100 
                    E.StartTime, 
                    M.AssetKey AS Meter,
                    A.AssetKey AS Asset,
                    E.ID AS EventID,
                    ET.Name AS EventType,
                    0 AS Triggered
                FROM
                    Event E LEFT JOIN
                    Asset A ON E.AssetID = A.ID LEFT JOIN
                    Meter M ON M.ID = E.MeterID LEFT JOIN
                    EventType ET ON E.EventTypeID = ET.ID 
                WHERE E.ID IN ({string.Format(combineSQL, eventID)})
                ORDER BY StartTime DESC";

                using (AdoDataConnection connection = CreateDbConnection())
                    return Ok(connection.RetrieveData(sql));

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("Test/{eventID:int}/{emailID:int}/{recipient}")]
        public IHttpActionResult Test(int eventID,int emailID, string recipient)
        {
            if (!PatchAuthCheck())
                return Unauthorized();
            try
            {
                Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);

                //Send Email from openXDA
                APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, settings.APISettings.Host.Split(';'));

                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Get;
                }

                HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/email/testEmail/{emailID}/{eventID}/{recipient}").Result;

                return Ok(1);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("GetData/{eventID:int}/{emailID:int}")]
        public IHttpActionResult GetData(int eventID, int emailID)
        {
            if (!PatchAuthCheck())
                return Unauthorized();
            try
            {
                Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);

                //Send Email from openXDA
                APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, settings.APISettings.Host.Split(';'));

                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Get;
                }

                HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/email/testData/{emailID}/{eventID}").Result;

                responseMessage.EnsureSuccessStatusCode();

                string responseJSON = responseMessage.Content
                    .ReadAsStringAsync()
                    .GetAwaiter()
                    .GetResult();

                JArray results = JArray.Parse(responseJSON);

                for(int index = 0; index < results.Count(); index++)
                {
                    XElement data = JsonConvert.DeserializeObject<XElement>(results[index]["Data"].ToString());
                    results[index]["Data"] = data.ToString() ?? "";
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        private AdoDataConnection CreateDbConnection()
        {
            AdoDataConnection connection = new AdoDataConnection(Connection);
            connection.DefaultTimeout = DataExtensions.DefaultTimeoutDuration;
            return connection;
        }
    }

    [RoutePrefix("api/OpenXDA/ScheduledEmailType")]
    public class ScheduledEmailTypeController : ModelController<ScheduledEmailType>
    {
        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration APISettings { get; } = new APIConfiguration();
        }

        public override IHttpActionResult Patch(ScheduledEmailType record)
        {
            if (!PatchAuthCheck())
                return Unauthorized();

            IHttpActionResult result = base.Patch(record);
            ReconfigureScheduledEmailNode();

            return result;
        }

        public override IHttpActionResult Post(JObject record)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            IHttpActionResult result = base.Post(record);
            ReconfigureScheduledEmailNode();

            return result;
        }

        public override IHttpActionResult Delete(ScheduledEmailType record)
        {
            if (!DeleteAuthCheck())
                return Unauthorized();

            IHttpActionResult result = base.Delete(record);
            ReconfigureScheduledEmailNode();

            return result;
        }

        private void ReconfigureScheduledEmailNode()
        {
            Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);
            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            using (AdoDataConnection connection = CreateDbConnection())
            {
                DataTable hosts = connection
                    .RetrieveData(@"
                        SELECT ActiveHost.URL , Node.ID as NodeID
                        FROM 
	                        ActiveHost JOIN 
	                        Node ON ActiveHost.ID = Node.HostRegistrationID JOIN
	                        NodeType ON Node.NodeTypeID = NodeType.ID
                        WHERE
	                        NodeType.Name = 'ScheduledEmail'");
                Task[] reconfigureTasks = hosts
                    .AsEnumerable()
                    .Select(row =>
                    {
                        string url = row.ConvertField<string>("URL");
                        int nodeID = row.ConvertField<int>("NodeID");

                        APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, url.Split(';'));
                        return query.SendWebRequestAsync(ConfigureRequest, $"/Node/{nodeID}/Reconfigure");
                    }).ToArray();
                Task.WaitAll(reconfigureTasks);
            }
        }


        [HttpGet, Route("Test/{reportID:int}/{recipient}")]
        public IHttpActionResult Test(int reportID, string recipient)
        {
            if (!PatchAuthCheck())
                return Unauthorized();
            try
            {
                Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);

                //Send Email from openXDA
                APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, settings.APISettings.Host.Split(';'));

                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Get;
                }

                HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/email/testReport/{reportID}/{recipient}/now").Result;

                return Ok(1);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("GetData/{emailID:int}")]
        public IHttpActionResult GetData(int emailID)
        {
            if (!PatchAuthCheck())
                return Unauthorized();
            try
            {
                Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);

                //Send Email from openXDA
                APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, settings.APISettings.Host.Split(';'));

                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Get;
                }

                long timeTicksNow = DateTime.UtcNow.Ticks;

                HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/email/testReportData/{emailID}/{timeTicksNow}").Result;

                responseMessage.EnsureSuccessStatusCode();

                string responseJSON = responseMessage.Content
                    .ReadAsStringAsync()
                    .GetAwaiter()
                    .GetResult();

                JArray results = JArray.Parse(responseJSON);

                for (int index = 0; index < results.Count(); index++)
                {
                    XElement data = JsonConvert.DeserializeObject<XElement>(results[index]["Data"].ToString());
                    results[index]["Data"] = data.ToString() ?? "";
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        private AdoDataConnection CreateDbConnection()
        {
            AdoDataConnection connection = new AdoDataConnection(Connection);
            connection.DefaultTimeout = DataExtensions.DefaultTimeoutDuration;
            return connection;
        }
    }
}