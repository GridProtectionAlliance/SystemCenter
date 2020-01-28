//******************************************************************************************************
//  Meters.cs - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/26/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Transactions;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using Newtonsoft.Json.Linq;
using openXDA.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/MeterConfiguration")]
    public class OpenXDAMeterConfigurationController : ModelController<MeterConfiguration>
    {
        public OpenXDAMeterConfigurationController() : base(true, "MeterID") { }

        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("Meter/{meterID:int}")]
        public IHttpActionResult GetMeterConfigurationsForMeter(int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                DataTable records = connection.RetrieveData(@"
                    SELECT
	                    MeterConfiguration.Revision,
	                    COUNT(FileGroup.ID) as FilesProcessed,
	                    MAX(FileGroup.ProcessingEndTime) as LastProcessedTime
                    FROM
	                    MeterConfiguration JOIN
	                    FileGroupMeterConfiguration ON MeterConfiguration.ID = FileGroupMeterConfiguration.MeterConfigurationID JOIN
	                    FileGroup ON FileGroupMeterConfiguration.FileGroupID = FileGroup.ID
                    WHERE
	                    MeterConfiguration.MeterID = {0}
                    GROUP BY 
	                    Revision
                ", meterID);
                return Ok(records);
            }
        }

    }
}
