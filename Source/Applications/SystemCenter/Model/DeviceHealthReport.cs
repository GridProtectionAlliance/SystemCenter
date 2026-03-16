//******************************************************************************************************
//  DeviceHealthReport.cs - Gbtc
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
//  06/22/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using Newtonsoft.Json;
using openXDA.APIAuthentication;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Windows.Forms.DataVisualization.Charting;

namespace SystemCenter.Model
{
    [CustomView(@"
	SELECT 
		Meter.ID,
		Meter.Name,
		Meter.TimeZone,
		omic.Value as OpenMIC,
		Make + ' ' + Model as Model,
		Location.ID as LocationID,
		Location.Name as Substation,
		Location.LocationKey,
		afvtsc.Value as TSC,
		afvsector.Value as Sector,
		afvip.Value as IP,
		ISNULL(bds.BadDays, 0) as BadDays,
		ISNULL(mimdstat.BadDays, 0) as MiMDBadDays,
		ISNULL(xdastat.BadDays, 0) as XDABadDays,
		mimdstat.[Status] as MiMDStatus,
		xdastat.[Status] as XDAStatus,
		dqstat.[Status] as DQStatus,
		CAST(mimdstat.LastConfigFileChange as DATE) as LastConfigChange
	FROM
		Meter  JOIN
		Location ON Meter.LocationID = Location.ID LEFT JOIN
		AdditionalFieldValue omic ON omic.ParentTableID = Meter.ID AND omic.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='OpenMICAcronym') LEFT JOIN
		AdditionalFieldValue afvtsc ON afvtsc.ParentTableID = Meter.ID AND afvtsc.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='TSC') LEFT JOIN
		AdditionalFieldValue afvsector ON afvsector.ParentTableID = Meter.ID AND afvsector.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='Sector') LEFT JOIN
		AdditionalFieldValue afvip ON afvip.ParentTableID = Meter.ID AND afvip.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='IP') OUTER APPLY (
			SELECT TOP 1 LastConfigFileChange,BadDays, [Status] FROM [MiMDDailyStatistic]  WHERE  Meter.AssetKey = [MiMDDailyStatistic].Meter  ORDER BY CAST([MiMDDailyStatistic].Date as Date) DESC
		) as mimdstat OUTER APPLY (
			SELECT TOP 1 BadDays, [Status] FROM [OpenXDADailyStatistic]  WHERE  Meter.AssetKey = [OpenXDADailyStatistic].Meter  ORDER BY CAST([OpenXDADailyStatistic].Date as date) DESC
		) as xdastat OUTER APPLY  (
		SELECT 
			TOP 1 
			CASE
				WHEN (LatchedPoints + UnreasonablePoints+ NoncongruentPoints) > (SELECT CAST(COALESCE(Value,'100') as INT) FROM [SystemCenter.Setting] WHERE Name = 'OpenXDA.ErrorLevel') THEN 'Error'
				WHEN (LatchedPoints + UnreasonablePoints+ NoncongruentPoints) > (SELECT CAST(COALESCE(Value,'50') as INT) FROM [SystemCenter.Setting] WHERE Name = 'OpenXDA.WarningLevel') THEN 'Warning'
				ELSE ''
			END	as [Status]
		  FROM MeterDataQualitySummary where meterid = Meter.ID order by Date desc
		) as dqstat OUTER APPLY(
			SELECT MAX(BadDays) as BadDays FROM (
			SELECT TOP 1 BadDays FROM [OpenXDADailyStatistic]  WHERE  Meter.AssetKey = [OpenXDADailyStatistic].Meter  ORDER BY Cast([OpenXDADailyStatistic].Date as date) DESC UNION
			SELECT TOP 1 BadDays FROM [MiMDDailyStatistic]  WHERE  Meter.AssetKey = [MiMDDailyStatistic].Meter  ORDER BY Cast([MiMDDailyStatistic].Date as date) DESC ) t
		) as bds     
	"), SettingsCategory("systemSettings"), ViewOnly, AllowSearch]
    public class DeviceHealthReport
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public string TimeZone { get; set; }
        public string OpenMIC { get; set; }
        public int LocationID { get; set; }
        public string Substation { get; set; }
        public string LocationKey { get; set; }
        public string TSC { get; set; }
        public string Sector { get; set; }
        public string IP { get; set; }
        public DateTime? LastGood { get; set; } // no longer gotten from table
        public int BadDays { get; set; }
        public int MiMDBadDays { get; set; }
        public int? MICBadDays { get; set; }  // no longer gotten from table
        public int XDABadDays { get; set; }
        public string MiMDStatus { get; set; }
        public string MICStatus { get; set; } // no longer gotten from table
        public string XDAStatus { get; set; }
        public DateTime? LastConfigChange { get; set; }
    }

    [RoutePrefix("api/DeviceHealthReport")]
    public class DeviceHealthReportController : ModelController<DeviceHealthReport>
    {
        public int PagingAmount { get; set; } = 3;
        public class DailyStatisticsRecord
        {
            [PrimaryKey(true)]
            public int ID { get; set; }

            public DateTime Timestamp { get; set; }

            public int BadDays { get; set; }

            public string Meter { get; set; }

            [FieldDataType(DbType.DateTime2, DatabaseType.SQLServer)]
            public DateTime? LastSuccessfulConnection { get; set; }

            [FieldDataType(DbType.DateTime2, DatabaseType.SQLServer)]
            public DateTime? LastUnsuccessfulConnection { get; set; }

            public string LastUnsuccessfulConnectionExplanation { get; set; }

            [NonRecordField]
            public int TotalConnections => TotalSuccessfulConnections + TotalUnsuccessfulConnections;

            public int TotalUnsuccessfulConnections { get; set; }

            public int TotalSuccessfulConnections { get; set; }
        }

        public class StatusItem
        {
            public string Status { get; set; }
            public string Description { get; set; }
        }

        public class AppStatus
        {
            public string Status { get; set; }

            public List<StatusItem> Details { get; set; }

        }

        public override IHttpActionResult GetPagedList([FromBody] PostData postData, int page)
        {
            PagedResults pagedReports = new()
            {
                RecordsPerPage = 50
            };

            PostData openMicRequestBody = new()
            {
                Searches = [],
                Ascending = true,
                OrderBy = "Timestamp"
            };

            PostData systemCenterRequestBody = new()
            {
                Searches = [],
                Ascending = true,
                OrderBy = "Name"
            };

            SQLSearchFilter[] badDayFilters = [];

            // for each filter, add it to the request body that would use it
            foreach (SQLSearchFilter filter in postData.Searches)
            {
                if (filter.FieldName == "LastGood")
                {
                    SQLSearchFilter newFilter = new()
                    {
                        FieldName = "LastSuccessfulConnection",
                        SearchText = filter.SearchText,
                        Operator = filter.Operator,
                    };
                    openMicRequestBody.Searches = openMicRequestBody.Searches.Append(newFilter);
                    continue;
                }
                if (filter.FieldName == "MICStatus")
                {
                    if (filter.SearchText == "(Warning)")
                    {
                        SQLSearchFilter minFilter = new()
                        {
                            FieldName = "TotalUnsuccessfulConnections",
                            Operator = ">=",
                            SearchText = WarningLevel.ToString()
                        };
                        SQLSearchFilter maxFilter = new()
                        {
                            FieldName = "TotalUnsuccessfulConnections",
                            Operator = "<",
                            SearchText = ErrorLevel.ToString()
                        };
                        openMicRequestBody.Searches = openMicRequestBody.Searches.Append(minFilter);
                        openMicRequestBody.Searches = openMicRequestBody.Searches.Append(maxFilter);
                    }
                    if (filter.SearchText == "(Error)")
                    {

                        SQLSearchFilter errorFilter = new()
                        {
                            FieldName = "TotalUnsuccessfulConnections",
                            Operator = ">=",
                            SearchText = ErrorLevel.ToString()
                        };
                        openMicRequestBody.Searches = openMicRequestBody.Searches.Append(errorFilter);
                    }
                    if (filter.SearchText == "(Warning,Error)")
                    {
                        SQLSearchFilter warningFilter = new()
                        {
                            FieldName = "TotalUnsuccessfulConnections",
                            Operator = ">=",
                            SearchText = WarningLevel.ToString()
                        };
                        openMicRequestBody.Searches = openMicRequestBody.Searches.Append(warningFilter);
                    }
                }
                if (filter.FieldName == "BadDays")
                {
                    badDayFilters = badDayFilters.Append(filter).ToArray();
                    continue;
                }
                systemCenterRequestBody.Searches = systemCenterRequestBody.Searches.Append(filter);
            }

            // pass the sorting argument to the correct application and sort the other by basic field
            if (postData.OrderBy == "LastGood")
            {
                openMicRequestBody.OrderBy = "LastSuccessfulConnection";
                openMicRequestBody.Ascending = postData.Ascending;
            }
            else if (postData.OrderBy == "MICStatus")
            {
                openMicRequestBody.OrderBy = "TotalSuccessfulConnections";
                openMicRequestBody.Ascending = postData.Ascending;
            }
            else
            {
                systemCenterRequestBody.OrderBy = postData.OrderBy;
                systemCenterRequestBody.Ascending = postData.Ascending;
            }

            DataTable systemCenterResult = GetSearchResults(systemCenterRequestBody);

            //turn into array.
            DeviceHealthReport[] deviceHealthReports = systemCenterResult.AsEnumerable()
                .Select(row => new DeviceHealthReport()
                {
                    ID = row.Field<int>("ID"),
                    Name = row.Field<string>("Name"),
                    Model = row.Field<string>("Model"),
                    TimeZone = row.Field<string>("TimeZone"),
                    OpenMIC = row.Field<string>("OpenMIC"),
                    LocationID = row.Field<int>("LocationID"),
                    Substation = row.Field<string>("Substation"),
                    LocationKey = row.Field<string>("LocationKey"),
                    LastGood = null,
                    TSC = row.Field<string>("TSC"),
                    Sector = row.Field<string>("Sector"),
                    IP = row.Field<string>("IP"),
                    BadDays = row.Field<int>("BadDays"),
                    MiMDBadDays = row.Field<int>("MiMDBadDays"),
                    MICStatus = null,
                    MICBadDays = null,
                    XDABadDays = row.Field<int>("XDABadDays"),
                    MiMDStatus = row.Field<string>("MiMDStatus"),
                    XDAStatus = row.Field<string>("XDAStatus"),
                    // LastConfigChange = new DateTime(row.Field<string>("LastConfigChange")) 
                }).ToArray();

            // get a list of meters to search for in open mic
            string[] openMICMeters = deviceHealthReports
                .Select(device => device.OpenMIC).Where(openMIC => openMIC != "").ToArray();

            SQLSearchFilter openMICMeterFilter = new()
            {
                SearchText = $"({String.Join(",", openMICMeters)})",
                Operator = "IN",
                FieldName = "Meter"
            };

            openMicRequestBody.Searches.Append(openMICMeterFilter);

            DailyStatisticsRecord[] openMicStatistics;

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Post;
                request.Content = new StringContent(JsonConvert.SerializeObject(openMicRequestBody), Encoding.UTF8, "application/json");
            }
            try
            {
                APIQuery apiQuery = GetAPIQuery();
                HttpResponseMessage response = apiQuery.SendWebRequestAsync(ConfigureRequest, $"api/DailyStatistics/SearchableList").Result;
                string responseContent = response.Content.ReadAsStringAsync().Result;
                string trimmedResponse = responseContent.Trim('"');
                string unescapedResponse = Regex.Unescape(trimmedResponse);
                openMicStatistics = JsonConvert.DeserializeObject<DailyStatisticsRecord[]>(unescapedResponse);
            }
            catch (Exception e)
            {
                pagedReports.TotalRecords = deviceHealthReports.Count();
                pagedReports.NumberOfPages = (pagedReports.TotalRecords + pagedReports.RecordsPerPage - 1) / pagedReports.RecordsPerPage;
                DeviceHealthReport[] pagedRecords = deviceHealthReports.Skip(page * pagedReports.RecordsPerPage).Take(pagedReports.RecordsPerPage).ToArray();
                pagedReports.Data = JsonConvert.SerializeObject(pagedRecords);
                return Ok(JsonConvert.SerializeObject(pagedReports)); // return just the system center stuff
            }

            DeviceHealthReport[] combinedReport = CombineData(deviceHealthReports, openMicStatistics, postData).ToArray();

            foreach (SQLSearchFilter badDayFilter in badDayFilters)
            {
                combinedReport = FilterBadDays(combinedReport, badDayFilter);
            }

            if (postData.OrderBy == "BadDays")
            {
                if (postData.Ascending)
                {
                    combinedReport = combinedReport.OrderBy(record => record.BadDays).ToArray();
                }
                else
                {
                    combinedReport = combinedReport.OrderByDescending(record => record.BadDays).ToArray();
                }
            }

            pagedReports.TotalRecords = combinedReport.Count();
            pagedReports.NumberOfPages = (pagedReports.TotalRecords + pagedReports.RecordsPerPage - 1) / pagedReports.RecordsPerPage;
            DeviceHealthReport[] pageRecords = combinedReport.Skip(page * pagedReports.RecordsPerPage).Take(pagedReports.RecordsPerPage).ToArray();
            pagedReports.Data = JsonConvert.SerializeObject(pageRecords);
            return Ok(JsonConvert.SerializeObject(pagedReports));
        }

        [HttpGet, Route("OpenMICStatus")]
        public IHttpActionResult GetOpenMICStatus()
        {

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            AppStatus status = new AppStatus()
            {
                Status = "Success",
                Details = []
            };

            HttpResponseMessage? openMICResponse = null;
            try
            {
                APIQuery apiQuery = GetAPIQuery();
                openMICResponse = apiQuery.SendWebRequestAsync(ConfigureRequest, $"api/health/getsystemstatus/").Result;
            }
            catch
            {
                status.Status = "Error";
                status.Details.Add(new StatusItem()
                {
                    Status = "Error",
                    Description = "Could not connect to openMIC. Check the OpenMIC.URL setting in System Center Settings."
                });
            }

            if (openMICResponse is null)
                return Ok(status);

            status.Details.Add(new StatusItem()
            {
                Status = "Success",
                Description = "Connected to openMIC."
            });

            if (openMICResponse.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                status.Status = "Error";
                status.Details.Add(new StatusItem()
                {
                    Status = "Error",
                    Description = "Could not authorize with openMIC. Check the OpenMIC.Credential and OpenMIC.Password settings in System Center Settings."
                });

                return Ok(status);
            }

            if (openMICResponse.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                status.Status = "Error";
                status.Details.Add(new StatusItem()
                {
                    Status = "Error",
                    Description = "openMIC must be updated to v2.0.246 or later."
                });

                return Ok(status);
            }

            if (openMICResponse.StatusCode != System.Net.HttpStatusCode.OK)
            {
                status.Status = "Error";
                status.Details.Add(new StatusItem()
                {
                    Status = "Error",
                    Description = "Failed to establish connection with openMIC."
                });

                return Ok(status);
            }

            status.Details.Add(new StatusItem()
            {
                Status = "Success",
                Description = "Successful authentication."
            });

            string r = openMICResponse.Content.ReadAsStringAsync().Result;

            StatusItem[] responseStatus = JsonConvert.DeserializeObject<StatusItem[]>(r);

            status.Details.AddRange(responseStatus);

            if (status.Details.Any(item => item.Status == "Error"))
            {
                status.Status = "Error";
            }

            return Ok(status);
        }

        [HttpGet, Route("ScadaTriggerStatus")]
        public IHttpActionResult GetScadaTriggerStatus()
        {
            AppStatus status = new AppStatus()
            {
                Status = "Success",
                Details = []
            };
            HttpResponseMessage openMICResponse = null;


            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            try
            {
                APIQuery apiQuery = GetAPIQuery();
                openMICResponse = apiQuery.SendWebRequestAsync(ConfigureRequest, $"api/health/getsystemstatus/").Result;
            }
            catch
            {
                status.Status = "N/A";
                status.Details.Add(new StatusItem()
                {
                    Status = "Error",
                    Description = "Could not connect to openMIC."
                });
            }

            if (openMICResponse is null)
            {
                return Ok(status);
            }

            HttpResponseMessage scadaTriggerResponse = null;
            try
            {
                APIQuery apiQuery = GetAPIQuery();
                scadaTriggerResponse = apiQuery.SendWebRequestAsync(ConfigureRequest, $"api/health/getscadatriggerhealth/").Result;
            }
            catch
            {
                status.Status = "N/A";
                status.Details.Add(new StatusItem()
                {
                    Status = "Error",
                    Description = "Could not connect to Scada Trigger."
                });
            }

            if (scadaTriggerResponse is null)
            {
                return Ok(status);
            }

            if (scadaTriggerResponse.StatusCode != System.Net.HttpStatusCode.OK)
            {
                status.Status = "N/A";
                status.Details.Add(new StatusItem()
                {
                    Status = "Error",
                    Description = "Could not establish connection to Scada Trigger."
                });

                return Ok(status);
            }

            string r = scadaTriggerResponse.Content.ReadAsStringAsync().Result;

            StatusItem[] responseStatus = JsonConvert.DeserializeObject<StatusItem[]>(r);

            status.Details.AddRange(responseStatus);

            if (status.Details.Any(item => item.Status == "Error"))
            {
                status.Status = "Error";
            }

            return Ok(status);
        }

        [HttpGet, Route("OpenMICMeterStatistics")]
        public IHttpActionResult GetOpenMICMeterStatistics([FromUri] string meter)
        {
            DailyStatisticsRecord[] meterStatistics = [];
            OpenMICDailyStatistic[] micDailyStatistics = [];
            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }
            try
            {
                APIQuery apiQuery = GetAPIQuery();
                HttpResponseMessage response = apiQuery.SendWebRequestAsync(ConfigureRequest, $"api/DailyStatistics/Get/?meter={meter}").Result;
                string responseContent = response.Content.ReadAsStringAsync().Result;
                string trimmedResponse = responseContent.Trim('"');
                string unescapedResponse = Regex.Unescape(trimmedResponse);
                meterStatistics = JsonConvert.DeserializeObject<DailyStatisticsRecord[]>(unescapedResponse);
                foreach (DailyStatisticsRecord record in meterStatistics)
                {
                    micDailyStatistics = micDailyStatistics.Append(new()
                    {
                        ID = record.ID,
                        Date = record.Timestamp.ToString(),
                        Meter = record.Meter,
                        LastSuccessfulConnection = record.LastSuccessfulConnection,
                        LastUnsuccessfulConnection = record.LastUnsuccessfulConnection,
                        LastUnsuccessfulConnectionExplanation = record.LastUnsuccessfulConnectionExplanation,
                        TotalConnections = record.TotalConnections,
                        TotalSuccessfulConnections = record.TotalSuccessfulConnections,
                        TotalUnsuccessfulConnections = record.TotalUnsuccessfulConnections,
                        BadDays = record.BadDays,
                        Status = (record.TotalUnsuccessfulConnections >= 50) ? (record.TotalUnsuccessfulConnections >= 100) ? "Error" : "Warning" : ""
                    }).ToArray();
                }
            }
            catch (Exception e)
            {
                return Ok();
            }
            return Ok(JsonConvert.SerializeObject(micDailyStatistics));
        }

        public static APIQuery GetAPIQuery()
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                string url = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = 'OpenMIC.Url'")?.Value ?? "";
                string credential = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = 'OpenMIC.Credential'")?.Value ?? "";
                string password = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = 'OpenMIC.Password'")?.Value ?? "";

                //string token = GenerateAntiForgeryToken(application);
                //return Get(httpClient, url, requestURI, credential, password, token);
                APIQuery query = new APIQuery(credential, password, url);
                return query;
            }
        }

        private static DeviceHealthReport[] FilterBadDays(DeviceHealthReport[] reports, SQLSearchFilter badDayFilter)
        {
            DeviceHealthReport[] filteredReports = [];
            // Bad Days can be =, <> (neq), <, <=, >, >=, with a number
            switch (badDayFilter.Operator)
            {
                case "=":
                    filteredReports = reports
                        .Where(record => record.BadDays == int.Parse(badDayFilter.SearchText)).ToArray();
                    break;
                case "<>":
                    filteredReports = reports
                        .Where(record => record.BadDays != int.Parse(badDayFilter.SearchText)).ToArray();
                    break;
                case "<":
                    filteredReports = reports
                        .Where(record => record.BadDays < int.Parse(badDayFilter.SearchText)).ToArray();
                    break;
                case "<=":
                    filteredReports = reports
                        .Where(record => record.BadDays <= int.Parse(badDayFilter.SearchText)).ToArray();
                    break;
                case ">":
                    filteredReports = reports
                        .Where(record => record.BadDays > int.Parse(badDayFilter.SearchText)).ToArray();
                    break;
                case ">=":
                    filteredReports = reports
                        .Where(record => record.BadDays >= int.Parse(badDayFilter.SearchText)).ToArray();
                    break;
                default:
                    break;
            }
            return filteredReports;
        }

        private List<DeviceHealthReport> CombineData(DeviceHealthReport[] systemCenterData, DailyStatisticsRecord[] openMicData, PostData postData)
        {
            //Turn into Divtionary using ID
            List<DeviceHealthReport> results = [];
            HashSet<int> processedID = new();

            bool openMICFiltered = (postData.Searches.Any(search => string.Equals(search.FieldName, "LastGood", StringComparison.OrdinalIgnoreCase)
            || string.Equals(search.FieldName, "MICStatus", StringComparison.OrdinalIgnoreCase)));

            bool openMICOrdered = (postData.OrderBy == "LastGood" || postData.OrderBy == "MICStatus");

            if (openMICOrdered) // if sorted or filtered by openMICField
            {
                foreach (DailyStatisticsRecord record in openMicData)
                {
                    DeviceHealthReport matchedReport = systemCenterData.FirstOrDefault(r => string.Equals(r.OpenMIC, record.Meter, StringComparison.OrdinalIgnoreCase));

                    if (matchedReport is not null)
                    {
                        results.Add(CombineReports(matchedReport, record));
                        processedID.Add(matchedReport.ID);
                    }
                }
                if (!openMICFiltered) // if not filtered by openMIC, add the rest of systemCenter below 
                    results.AddRange(systemCenterData.Where(record => !processedID.Contains(record.ID)));

            }
            else
            {
                foreach (DeviceHealthReport record in systemCenterData)
                {
                    DailyStatisticsRecord? openMicRecord = null;

                    if (!string.IsNullOrEmpty(record.OpenMIC))
                        openMicRecord = openMicData.FirstOrDefault(r => string.Equals(r.Meter, record.OpenMIC, StringComparison.OrdinalIgnoreCase));

                    if (openMicRecord is null)
                    {
                        if (!openMICFiltered)
                            results.Add(record);
                        continue;
                    }

                    results.Add(CombineReports(record, openMicRecord));
                }
            }

            return results;
        }

        private DeviceHealthReport CombineReports(DeviceHealthReport systemCenterRecord, DailyStatisticsRecord? openMICRecord)
        {
            if (openMICRecord is null)
            {
                return systemCenterRecord;
            }

            switch (openMICRecord.TotalUnsuccessfulConnections)
            {
                case int n when n > ErrorLevel:
                    systemCenterRecord.MICStatus = "Error";
                    break;
                case int n when n > WarningLevel:
                    systemCenterRecord.MICStatus = "Warning";
                    break;
                default:
                    systemCenterRecord.MICStatus = "";
                    break;
            }

            systemCenterRecord.MICBadDays = Math.Max(openMICRecord.BadDays, systemCenterRecord.BadDays);

            systemCenterRecord.LastGood = openMICRecord.LastSuccessfulConnection;

            return systemCenterRecord;
        }

        public int WarningLevel { get; set; } = 50;
        public int ErrorLevel { get; set; } = 100;
    }
}