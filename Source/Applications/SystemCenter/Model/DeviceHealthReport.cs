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
using GSF.Threading;
using GSF.Web.Model;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SystemCenter.Model
{
	[CustomView(@"
	SELECT 
		Meter.ID,
		Meter.Name,
		omic.Value as OpenMIC,
		Make + ' ' + Model as Model,
		Location.ID as LocationID,
		Location.Name as Substation,
		Location.LocationKey,
		vltsc.Value as TSC,
		vltsc.ID as TSCID,
		vltsector.Value as Sector,
		vltsector.ID as SectorID,
		afvip.Value as IP,
		micstat.LastSuccessfulConnection as LastGood,
		bds.BadDays,
		mimdstat.BadDays as MiMDBadDays,
		micstat.BadDays as MICBadDays,
		xdastat.BadDays as XDABadDays,
		mimdstat.[Status] as MiMDStatus,
		micstat.[Status] as MICStatus,
		xdastat.[Status] as XDAStatus,
		dqstat.[Status] as DQStatus,
		CAST(mimdstat.LastConfigFileChange as DATE) as LastConfigChange
	FROM
		Meter  JOIN
		Location ON Meter.LocationID = Location.ID LEFT JOIN
		AdditionalFieldValue omic ON omic.ParentTableID = Meter.ID AND omic.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='OpenMICAcronym') LEFT JOIN
		AdditionalFieldValue afvtsc ON afvtsc.ParentTableID = Meter.ID AND afvtsc.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='TSC') LEFT JOIN
		ValueList vltsc ON vltsc.ID = afvtsc.Value and vltsc.GroupID = (SELECT ID FROM ValueListGroup WHERE Name = 'TSC') LEFT JOIN
		AdditionalFieldValue afvsector ON afvsector.ParentTableID = Meter.ID AND afvsector.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='Sector') LEFT JOIN
		ValueList vltsector ON vltsector.ID = afvsector.Value and vltsector.GroupID = (SELECT ID FROM ValueListGroup WHERE Name = 'Sector') LEFT JOIN
		AdditionalFieldValue afvip ON afvip.ParentTableID = Meter.ID AND afvip.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='IP') OUTER APPLY (
			SELECT TOP 1 LastConfigFileChange,BadDays, [Status] FROM [MiMDDailyStatistic]  WHERE  Meter.AssetKey = [MiMDDailyStatistic].Meter  ORDER BY CAST([MiMDDailyStatistic].Date as Date) DESC
		) as mimdstat OUTER APPLY (
			SELECT TOP 1 LastSuccessfulConnection,BadDays, [Status] FROM [OpenMICDailyStatistic]  WHERE  Meter.AssetKey = [OpenMICDailyStatistic].Meter  ORDER BY CAST([OpenMICDailyStatistic].Date as date) DESC
		) as micstat  OUTER APPLY (
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
			SELECT TOP 1 BadDays FROM [OpenMICDailyStatistic]  WHERE  Meter.AssetKey = [OpenMICDailyStatistic].Meter  ORDER BY Cast([OpenMICDailyStatistic].Date as date) DESC UNION
			SELECT TOP 1 BadDays FROM [OpenXDADailyStatistic]  WHERE  Meter.AssetKey = [OpenXDADailyStatistic].Meter  ORDER BY Cast([OpenXDADailyStatistic].Date as date) DESC UNION
			SELECT TOP 1 BadDays FROM [MiMDDailyStatistic]  WHERE  Meter.AssetKey = [MiMDDailyStatistic].Meter  ORDER BY Cast([MiMDDailyStatistic].Date as date) DESC ) t
		) as bds     
	"), SettingsCategory("systemSettings"), ViewOnly, AllowSearch]
	public class DeviceHealthReport
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public string Model { get; set; }
		public string OpenMIC { get; set; }
		public int LocationID { get; set; }
		public string Substation { get; set; }
		public string LocationKey { get; set; }
		public string TSC { get; set; }
		public int TSCID { get; set; }
		public string Sector { get; set; }
		public int SectorID { get; set; }
		public string IP { get; set; }
		public DateTime LastGood { get; set; }
		public int BadDays { get; set; }
		public int MiMDBadDays { get; set; }
		public int MICBadDays { get; set; }
		public int XDABadDays { get; set; }

		public string MiMDStatus { get; set; }
		public string MICStatus { get; set; }
		public string XDAStatus { get; set; }

		public DateTime LastConfigChange { get; set; }

	}


	[RoutePrefix("api/DeviceHealthReport")]
	public class DeviceHealthReportController : ModelController<DeviceHealthReport> { }

}