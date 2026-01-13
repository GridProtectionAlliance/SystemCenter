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



using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using Newtonsoft.Json;
using openXDA.APIAuthentication;
using openXDA.Configuration;
using openXDA.Model;
using SystemCenter.Controllers;

namespace SystemCenter.Model
{
    [TableName("Datafile"), ReturnLimit(50),
     CustomView(@"
        SELECT
	        DataFile.*,
	        FileGroup.DataStartTime,
	        FileGroup.ProcessingEndTime,
	        FileGroup.MeterID,
            FileGroup.ProcessingStatus AS ProcessingState
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
        public int ProcessingState { get; set; }
    }

    [RoutePrefix("api/OpenXDA/DataFile")]
    public class OpenXDADataFileController : ModelController<DataFile> {
        [Route("GetEvents/{id:int}"), HttpGet]
        public IHttpActionResult GetEvents(int id)
        {

            if (GetAuthCheck())
            {
                using (AdoDataConnection connection = ConnectionFactory())
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

        [Route("Reprocess/{id:int}"), HttpGet]
        public IHttpActionResult Reprocess(int id)
        {
            if (PatchAuthCheck())
            {
                if (!XDAAPIHelper.TryRefreshSettings())
                    throw new InvalidOperationException("Unable to refresh static XDA API credentials.");

                XDAAPIHelper.GetResponseTask($"api/Workbench/DataFiles/ReprocessFile/{id}", new StringContent(""));
                return Ok(1);
            }
            else
            {
                return Unauthorized();
            }
        }

        [Route("ReprocessMany"), HttpPost]
        public IHttpActionResult ReprocessMany([FromBody] IEnumerable<int> ids)
        {
            if (PatchAuthCheck())
            {
                if (!XDAAPIHelper.TryRefreshSettings())
                    throw new InvalidOperationException("Unable to refresh static XDA API credentials.");

                HttpContent content = new StringContent(JsonConvert.SerializeObject(ids), Encoding.UTF8, "application/json");
                HttpResponseMessage responseMessage = XDAAPIHelper.GetResponseTask($"api/Workbench/DataFiles/ReprocessFilesByID", content).Result;

                responseMessage.EnsureSuccessStatusCode();
                return Ok(1);
            }
            else
            {
                return Unauthorized();
            }
        }

        [Route("Download/{id:int}"), HttpGet]
        public IHttpActionResult Download(int id)
        {

            if (GetAuthCheck())
            {
                HttpResponseMessage responseMessage = XDAAPIHelper.GetResponseTask($"/api/Workbench/DataFiles/Download/{id}").Result;
                responseMessage.EnsureSuccessStatusCode();
            
                byte[] data = responseMessage.Content.ReadAsByteArrayAsync().Result;

                string fileName = responseMessage.Content.Headers.ContentDisposition.FileName;

                Stream stream = new MemoryStream(data);

                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StreamContent(stream)
                };

                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = fileName
                };

                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/file");
                return ResponseMessage(result);
            }
            else
            {
                return Unauthorized();
            }
        }

 
    }

}