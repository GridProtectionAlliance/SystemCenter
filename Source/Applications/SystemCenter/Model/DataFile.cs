//******************************************************************************************************
//  DataFile.cs - Gbtc
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
//  06/28/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************



using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SystemCenter.Controllers;
using openXDA.Model;
using openXDA.APIAuthentication;
using System;
using System.Net.Http;

namespace SystemCenter.Model
{
    [TableName("Datafile"), ReturnLimit(50),
     CustomView(@"
        SELECT
	        DataFile.*,
	        FileGroup.DataStartTime,
	        FileGroup.ProcessingEndTime,
	        FileGroup.MeterID
        FROM
	        DataFile JOIN
	        FileGroup ON DataFile.FileGroupID = FileGroup.ID
    ")]
    [AllowSearch]
    public class DataFile : openXDA.Model.DataFile
    {
        [ParentKey(typeof(Meter))]
        public int MeterID { get; set; }
        [DefaultSortOrder(false)]
        public DateTime ProcessingEndTime { get; set; }
        public DateTime DataStartTime { get; set; }
    }

    [RoutePrefix("api/OpenXDA/DataFile")]
    public class OpenXDADataFileController : ModelController<DataFile> {

        const string SettingsCategory = "systemSettings";

        public string Host
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From [SystemCenter.Setting] Where Name = 'XDA.Url'") ?? "";
            }
        }

        public string Key
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From [SystemCenter.Setting] Where Name = 'XDA.APIKey'") ?? "";
            }
        }

        public string Token
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From [SystemCenter.Setting] Where Name = 'XDA.APIToken'") ?? "";
            }
        }

        [HttpGet]
        [Route("GetEvents/{id:int}")]
        public IHttpActionResult GetEvents(int id)
        {

            if (GetAuthCheck())
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {

                    try
                    {
                        return Ok(new TableOperations<Event>(connection).QueryRecords(restriction: new RecordRestriction("FileGroupID IN (SELECT FileGroupID FROM DataFile WHERE ID = {0})", id)));
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpGet]
        [Route("Reprocess/{id:int}")]
        public IHttpActionResult Reprocess(int id)
        {

            if (PatchAuthCheck())
            {
                APIQuery query = new APIQuery(Key,Token,Host.Split(';'));

                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Post;
                }

                HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/Workbench/DataFiles/ReprocessFile/{id}").Result;
                return Ok(1);
            }
            else
            {
                return Unauthorized();
            }
        }
    }

}