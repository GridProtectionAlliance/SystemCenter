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
using System.ComponentModel;
using GSF.Configuration;
using System.Net.Http.Headers;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Text;
using Newtonsoft.Json;
using GSF.Communication;
using GSF.Web.Security;

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

        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration APISettings { get; } = new APIConfiguration();
        }

        [HttpGet]
        [Route("GetEvents/{id:int}")]
        public IHttpActionResult GetEvents(int id)
        {

            if (GetAuthCheck())
            {
                using (AdoDataConnection connection = CreateDbConnection())
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
                APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).APISettings;

                APIQuery query = new APIQuery(settings.Key, settings.Token, settings.Host.Split(';'));

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

        [HttpPost]
        [Route("ReprocessMany")]
        public IHttpActionResult ReprocessMany([FromBody] IEnumerable<int> ids)
        {

            if (PatchAuthCheck())
            {
                APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).APISettings;
                APIQuery query = new APIQuery(settings.Key, settings.Token, settings.Host.Split(';'));
                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Post;
                    request.Content = new StringContent(JsonConvert.SerializeObject(ids), Encoding.UTF8, "application/json");
                    
                }

                HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/Workbench/DataFiles/ReprocessFilesByID").Result;
                if (responseMessage.IsSuccessStatusCode)
                    return Ok(1);
                else
                    return InternalServerError();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        [Route("Download/{id:int}")]
        public IHttpActionResult Download(int id)
        {

            if (GetAuthCheck())
            {
                APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).APISettings;

                APIQuery query = new APIQuery(settings.Key, settings.Token, settings.Host.Split(';'));

                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Get;
                }

                HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/Workbench/DataFiles/Download/{id}").Result;
                if (!responseMessage.IsSuccessStatusCode)
                    return InternalServerError();
            
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

        private AdoDataConnection CreateDbConnection()
        {
            AdoDataConnection connection = new AdoDataConnection(Connection);
            connection.DefaultTimeout = DataExtensions.DefaultTimeoutDuration;
            return connection;
        }

 
    }

}