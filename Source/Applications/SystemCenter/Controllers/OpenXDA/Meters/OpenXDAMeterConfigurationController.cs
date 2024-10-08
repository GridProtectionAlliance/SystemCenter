﻿//******************************************************************************************************
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
using System.Web.Http.Results;
using GSF.Data;
using GSF.Data.Model;
using GSF.PQDIF.Physical;
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/MeterConfiguration")]
    public class OpenXDAMeterConfigurationController : ModelController<MeterConfiguration>
    {
        [HttpGet, Route("Meter/{meterID:int}/{page:int}")]
        public IHttpActionResult GetMeterConfigurationsForMeter(int meterID, int page)
        {
            int recordsPerPage = 50;
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    int totalRecords = connection.ExecuteScalar<int>($@"
                    SELECT COUNT(*)
                    FROM MeterConfiguration
                    WHERE MeterID = {meterID}
                    ");
                    int numberOfPages = (totalRecords + recordsPerPage - 1) / recordsPerPage;
                    if (numberOfPages == 0) numberOfPages = 1;
                    DataTable records = connection.RetrieveData($@"
                    SELECT
                        MeterConfiguration.ID,
	                    CAST(MeterConfiguration.RevisionMajor as varchar(max)) + '.'+  CAST(MeterConfiguration.RevisionMinor as varchar(max)) as Revision,
	                    COUNT(FileGroup.ID) as FilesProcessed,
	                    MAX(FileGroup.ProcessingEndTime) as LastProcessedTime
                    FROM
	                    MeterConfiguration LEFT JOIN
	                    FileGroupMeterConfiguration ON MeterConfiguration.ID = FileGroupMeterConfiguration.MeterConfigurationID LEFT JOIN
	                    FileGroup ON FileGroupMeterConfiguration.FileGroupID = FileGroup.ID
                    WHERE
	                    MeterConfiguration.MeterID = {{0}}
                    GROUP BY 
                        MeterConfiguration.ID,
	                    MeterConfiguration.RevisionMajor,
	                    MeterConfiguration.RevisionMinor
                    ORDER BY
                        MeterConfiguration.RevisionMajor DESC, MeterConfiguration.RevisionMinor DESC
                    OFFSET {page * recordsPerPage} ROWS FETCH NEXT {recordsPerPage} ROWS ONLY
                ", meterID);
                    return Ok(new
                    {
                        Records = JsonConvert.SerializeObject(records),
                        RecordsPerPage = recordsPerPage,
                        NumberOfPages = numberOfPages,
                        TotalRecords = totalRecords
                    });
                }
            }
            else
                return Unauthorized();
        }

        [HttpGet, Route("{meterConfigurationID:int}/FilesProcessed/{page:int}")]
        public IHttpActionResult GetFilesProcessedForMeterConfigurations(int meterConfigurationID, int page)
        {
            int recordsPerPage = 50;
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    int totalRecords = connection.ExecuteScalar<int>($@"
                        SELECT COUNT(*)
                        FROM DataFile
                        WHERE FileGroupID IN (SELECT FileGroupID FROM FileGroupMeterConfiguration WHERE MeterConfigurationID = {meterConfigurationID})
                    ");
                    int numberOfPages = (totalRecords + recordsPerPage - 1) / recordsPerPage;
                    if (numberOfPages == 0) numberOfPages = 1;
                    int offset = page * recordsPerPage;
                    string orderByExpression = "ID";

                    RecordRestriction restriction = new RecordRestriction(
                        "FileGroupID IN (SELECT FileGroupID FROM FileGroupMeterConfiguration WHERE MeterConfigurationID = {0})",
                        meterConfigurationID
                    );

                    IEnumerable<DataFileDb> records = new TableOperations<DataFileDb>(connection).QueryRecords(
                        orderByExpression,
                        restriction
                    ).Skip(offset).Take(recordsPerPage);

                    return Ok(new
                    {
                        Records = JsonConvert.SerializeObject(records),
                        RecordsPerPage = recordsPerPage,
                        NumberOfPages = numberOfPages,
                        TotalRecords = totalRecords
                    });
                }
            }
            else
                return Unauthorized();
        }

        public override IHttpActionResult GetOne(string id)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                IHttpActionResult result = base.GetOne(id);
                MeterConfiguration meterConfiguration = result.ExecuteAsync(new System.Threading.CancellationToken()).Result.Content.ReadAsAsync<MeterConfiguration>().Result;
                if (meterConfiguration.DiffID != null)
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        meterConfiguration.ConfigText = new TableOperations<MeterConfiguration>(connection).Unpatch(meterConfiguration);
                    }
                }
                return Ok(meterConfiguration);
            }
            else
                return Unauthorized();

        }

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (User.IsInRole(PostRoles) || PostRoles == string.Empty)
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        MeterConfiguration newRecord = record.ToObject<MeterConfiguration>();
                        newRecord.RevisionMinor = 1 + connection.ExecuteScalar<int>("SELECT top 1 RevisionMinor FROM MeterConfiguration where meterid={0} and RevisionMajor = {1} order by RevisionMinor desc", newRecord.MeterID, newRecord.RevisionMajor);
                        int result = new TableOperations<MeterConfiguration>(connection).AddNewRecord(newRecord);
                        newRecord = new TableOperations<MeterConfiguration>(connection).QueryRecordWhere("MeterID = {0} AND RevisionMajor = {1} AND RevisionMinor = {2}", newRecord.MeterID, newRecord.RevisionMajor, newRecord.RevisionMinor);
                        return Ok(newRecord);
                    }
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
