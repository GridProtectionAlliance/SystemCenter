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
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System;
using System.Data;
using System.Web.Http;
using SystemCenter.Controllers;
using System.Collections.Generic;

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
		bds.BadDays,
		mimdstat.BadDays as MiMDBadDays,
		xdastat.BadDays as XDABadDays,
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
		public DateTime LastGood { get; set; } // no longer gotten from table
		public int BadDays { get; set; }
		public int MiMDBadDays { get; set; }
		public int MICBadDays { get; set; }  // no longer gotten from table
		public int XDABadDays { get; set; }
        public string MiMDStatus { get; set; } 
        public string MICStatus { get; set; } // no longer gotten from table
		public string XDAStatus { get; set; }
		public DateTime LastConfigChange { get; set; }
	}

	[RoutePrefix("api/DeviceHealthReport")]
	public class DeviceHealthReportController : ModelController<DeviceHealthReport> 
	{
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

        public override IHttpActionResult GetSearchableList([FromBody] PostData postData)
        {
            int warningLevel = 50;
            int errorLevel = 100;
            DataTable table = GetSearchResults(postData);

			// add empty rows to table for openMIC info
			table.Columns.Add("MICStatus");
			table.Columns.Add("MICBadDays", Type.GetType("System.Int32"));
			table.Columns.Add("LastGood");
            foreach (DataRow devHealthReport in table.Rows)
			{
				if (string.IsNullOrEmpty(devHealthReport.ConvertField<string>("OpenMic")))
				{
					continue;
				}
				var rawResponse = ControllerHelpers.Get("OpenMIC", $"api/Operations/Statistics/{devHealthReport["OpenMIC"]}");
				JObject? openMicResult = null;
				try
				{
					openMicResult = JObject.Parse(rawResponse);
				}
				catch(JsonReaderException)
				{
					continue;
				}
                int totalUnsuccessfulConnections = openMicResult["TotalUnsuccessfulConnections"]?.ToObject<int>() ?? 0;
                if (totalUnsuccessfulConnections > errorLevel)
                {
                    devHealthReport["Status"] = "Error";

                }
                else if (totalUnsuccessfulConnections > warningLevel)
                {
                    devHealthReport["Status"] = "Warning";
                }
                devHealthReport["MICStatus"] = openMicResult["Status"];
				devHealthReport["MICBadDays"] = 0; // just a placeholder for now.
				if (Convert.ToInt32(devHealthReport["MICBadDays"]) > Convert.ToInt32(devHealthReport["BadDays"]))
				{ 
					devHealthReport["BadDays"] = devHealthReport["MICBadDays"]; 
				}

				if (openMicResult["LastSuccessfulConnection"] != null)
				{
                    devHealthReport["LastGood"] = openMicResult["LastSuccessfulConnection"];
                }
                ;
			}
			return Ok(JsonConvert.SerializeObject(table));
        }

		[HttpGet, Route("OpenMICStatus")]
        public IHttpActionResult GetOpenMICStatus()
		{
			AppStatus status = new AppStatus() 
			{ 
				Status ="Success",
				Details = []
			};

			HttpResponseMessage? openMICResponse = null;

            try
			{
				using (HttpClient client = new())
					openMICResponse = ControllerHelpers.Get(client, "OpenMIC", $"api/health/getsystemstatus/");
				;
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
                Description = "Connected to openMIC"
            });

            if (openMICResponse.StatusCode == System.Net.HttpStatusCode.Unauthorized)
			{
                status.Status = "Error";
                status.Details.Add(new StatusItem()
                {
                    Status = "Error",
                    Description = "Failed to authenticate with openMIC. Check the OpenMIC.Credential and OpenMIC.Password settings in System Center Settings."
                });

                return Ok(status);
            }

            status.Details.Add(new StatusItem()
            {
                Status = "Success",
                Description = "Successful authentication."
            });

			string r = openMICResponse.Content.ReadAsStringAsync().Result;

            return Ok(status);
        }

		[HttpGet, Route("OMTriggerStatus")]
		public IHttpActionResult GetOMTriggerStatus()
		{
            AppStatus status = new AppStatus()
            {
                Status = "Success",
                Details = []
            };
			try
			{
				using (HttpClient client = new())
					ControllerHelpers.Get(client, "OpenMIC", $"api/health/getsystemstatus/"); 
				;
			}
			catch
			{
				status.Status = "N/A";
				status.Details.Add(new StatusItem()
				{
					Status = "Error",
					Description = "Could not connect to openMIC. Check the OpenMIC.URL setting in System Center Settings."
				});
            }
			return Ok(status);
		}
    }
}