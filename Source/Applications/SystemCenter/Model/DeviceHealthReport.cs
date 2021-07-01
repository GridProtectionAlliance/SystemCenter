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
	    CAST(GETDATE() as date) as LastGood,
	    0 as BadDays,
	    '' as Status,
	    CAST(mimdstat.LastConfigFileChange as DATE) as LastConfigChange
    FROM
	    Meter JOIN
	    Location ON Meter.LocationID = Location.ID LEFT JOIN
		AdditionalFieldValue omic ON omic.ParentTableID = Meter.ID AND omic.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='OpenMICAcronym') LEFT JOIN
	    AdditionalFieldValue afvtsc ON afvtsc.ParentTableID = Meter.ID AND afvtsc.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='TSC') LEFT JOIN
	    ValueList vltsc ON vltsc.ID = afvtsc.Value and vltsc.GroupID = (SELECT ID FROM ValueListGroup WHERE Name = 'TSC') LEFT JOIN
	    AdditionalFieldValue afvsector ON afvsector.ParentTableID = Meter.ID AND afvsector.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='Sector') LEFT JOIN
	    ValueList vltsector ON vltsector.ID = afvsector.Value and vltsector.GroupID = (SELECT ID FROM ValueListGroup WHERE Name = 'Sector') LEFT JOIN
	    AdditionalFieldValue afvip ON afvip.ParentTableID = Meter.ID AND afvip.AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE ParentTable = 'Meter' AND FieldName ='IP') OUTER APPLY (
		    SELECT TOP 1 LastConfigFileChange FROM [SystemCenter.MiMDDailyStatistic]  WHERE  Meter.AssetKey = [SystemCenter.MiMDDailyStatistic].Meter  ORDER BY Date DESC
	    ) as mimdstat
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
		public string Status { get; set; }
		public DateTime LastConfigChange { get; set; }

	}


	[RoutePrefix("api/DeviceHealthReport")]
	public class DeviceHealthReportController : ModelController<DeviceHealthReport> { }

}