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
using GSF.IO;
using GSF.Web.Model;
using Newtonsoft.Json;
using openXDA.APIAuthentication;
using openXDA.Configuration;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Model
{
    [TableName("Datafile"), ReturnLimit(50),
     CustomView(@"
        SELECT
	        DataFile.*,
	        FileGroup.DataStartTime,
	        FileGroup.MeterID,
            FileGroup.ProcessingStatus AS ProcessingState,
            (SELECT COUNT(*) FROM FileGroupAnalysisJob WHERE FileGroupAnalysisJob.FileGroupID = FileGroup.ID) AS NumberOfTimesProcessed,
            (SELECT MAX(ProcessingStartTime) FROM FileGroupAnalysisJob WHERE FileGroupAnalysisJob.FileGroupID = FileGroup.ID) AS LastProcessed,
            (SELECT MAX(ProcessingEndTime) FROM FileGroupAnalysisJob WHERE FileGroupAnalysisJob.FileGroupID = FileGroup.ID) AS LastProcessedComplete
        FROM
	        DataFile JOIN
	        FileGroup ON DataFile.FileGroupID = FileGroup.ID
    ")]
    [AllowSearch]
    public class DataFile : openXDA.Model.DataFile
    {
        [ParentKey(typeof(Meter))]
        public int MeterID { get; set; }
        public DateTime DataStartTime { get; set; }
        public int ProcessingState { get; set; }
        [NonRecordField]
        public string FileName => Path.GetFileName(FilePath);

        [DefaultSortOrder(false)]
        public DateTime LastProcessed { get; set; }
        public DateTime LastProcessedComplete { get; set; }
        public int NumberOfTimesProcessed { get; set; }
    }

    [ReturnLimit(50),
    CustomView(@"
        SELECT
	        FileGroupAnalysisJob.*,
            DataFile.FilePath,
	        FileGroup.DataStartTime,
	        FileGroup.MeterID,
        FROM
	        FileGroupAnalysisJob OUTER JOIN
            DATAFILE ON FileGroupAnalysisJob.FileGroupID = DataFile.FileGroupID LEFT JOIN
	        FileGroup ON DataFile.FileGroupID = FileGroup.ID
    ")]
    [AllowSearch]
    public class ProcessedFile : FileGroupAnalysisJob
    {
        [ParentKey(typeof(Meter))]
        public int MeterID { get; set; }
        public DateTime DataStartTime { get; set; }

        public string FilePath { get; set; }

        [NonRecordField]
        public string FileName => Path.GetFileName(FilePath);
    }

    [ReturnLimit(50),
    CustomView(@"
        SELECT
	        AnalysisTask.*,
	        FileGroup.DataStartTime,
            FileGroup.DataEndTime,
	        Meter.Name AS MeterName
        FROM
	        AnalysisTask JOIN
	        FileGroup ON AnalysisTask.FileGroupID = FileGroup.ID JOIN
            Meter ON FileGroup.MeterID = Meter.ID 
    ")]
    [AllowSearch]
    public class AnalysisTask: openXDA.Model.AnalysisTask
    {
        public DateTime DataStartTime { get; set; }
        public DateTime DataEndTime { get; set; }
        public string MeterName { get; set; }
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

        [Route("Enumerate"), HttpPost, HttpEditionFilter(Edition.Enterprise)]
        public IHttpActionResult Enumerate()
        {
            if (PatchAuthCheck())
            {
                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Post;
                }

                HttpResponseMessage responseMessage = XDANodeHelper.SendRequest("FileProcessor", ConfigureRequest, "Enumerate").Result;
                responseMessage.EnsureSuccessStatusCode();

                return Ok(1);
            }
            else
            {
                return Unauthorized();
            }
        }

        [Route("FlushAndEnumerate"), HttpPost, HttpEditionFilter(Edition.Enterprise)]
        public IHttpActionResult FlushAndEnumerate()
        {
            if (PatchAuthCheck())
            {
                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Post;
                }

                HttpResponseMessage responseMessage = XDANodeHelper.SendRequest("FileProcessor", ConfigureRequest, "FlushAndEnumerate").Result;
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

        [Route("AggregateRecentlyProcessedFiles"), HttpGet]
        public IHttpActionResult AggregateRecentlyProcessedFiles()
        {
            if (!GetAuthCheck())
                return Unauthorized();

            String sqlQuery = @"
            SELECT
	            FORMAT (FileGroup.ProcessingStartTime, 'yyyy-MM-dd HH') AS Hour,
	            COUNT(DataFile.ID) as Count
            FROM
	            DataFile JOIN FileGroup ON DataFile.FileGroupID = FileGroup.ID
            WHERE
	            FileGroup.ProcessingStartTime > DATEADD(HOUR, DATEDIFF(HOUR, 0, GETDATE()) - 48, 0)
	            GROUP BY FORMAT (FileGroup.ProcessingStartTime, 'yyyy-MM-dd HH');";
            DataTable result;
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                result = connection.RetrieveData(sqlQuery);
            }
            return Ok(result);
        }
       
        [Route("PagedResults"), HttpPost]
        public override IHttpActionResult GetPagedList([FromBody] PostData postData, int page)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using DataTable table = GetSearchResults(postData, page);
            DataFile[] results = table
                .AsEnumerable()
                .Select(row => new DataFile() 
            { 
                CreationTime = row.Field<DateTime>("CreationTime"),
                ID = row.Field<int>("ID"),
                FileGroupID = row.Field<int>("FileGroupID"),
                FilePath = row.Field<string>("FilePath"),
                FilePathHash = row.Field<int>("FilePathHash"),
                FileSize = row.Field<long>("FileSize"),
                LastWriteTime = row.Field<DateTime>("LastWriteTime"),
                LastAccessTime = row.Field<DateTime>("LastAccessTime"),
                MeterID = row.Field<int>("MeterID"),
                DataStartTime = row.Field<DateTime>("DataStartTime"),
                ProcessingState = row.Field<int>("ProcessingState"),
                LastProcessed = row.ConvertNullableField<DateTime>("LastProcessed") ?? DateTime.MinValue,
                LastProcessedComplete = row.ConvertNullableField<DateTime>("LastProcessedComplete") ?? DateTime.MinValue,
                NumberOfTimesProcessed = row.Field<int>("NumberOfTimesProcessed")
                }).ToArray();

            int recordCount = CountSearchResults(postData);
            int recordPerPage = Take ?? 50;
            return Ok(new PagedResults()
            {
                Data = JsonConvert.SerializeObject(results),
                RecordsPerPage = recordPerPage,
                TotalRecords = recordCount,
                NumberOfPages = (recordCount + recordPerPage - 1) / recordPerPage
            });
        }

    }

    [RoutePrefix("api/OpenXDA/ProcessedFiles")]
    public class OpenXDAProcessedileController : ModelController<ProcessedFile>
    {
        [Route("PagedResults"), HttpPost]
        public override IHttpActionResult GetPagedList([FromBody] PostData postData, int page)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using DataTable table = GetSearchResults(postData, page);
            ProcessedFile[] results = table
                .AsEnumerable()
                .Select(row => new ProcessedFile()
                {
                    ID = row.Field<int>("ID"),
                    FileGroupID = row.Field<int>("FileGroupID"),
                    FilePath = row.Field<string>("FilePath"),
                    MeterID = row.Field<int>("MeterID"),
                    DataStartTime = row.Field<DateTime>("DataStartTime"),
                    TaskQueuedTime = row.Field<DateTime>("TaskQueuedTime"),
                    TaskPriority = row.Field<int>("TaskPriority"),
                    ProcessingStartTime = row.Field<DateTime>("ProcessingStartTime"),
                    ProcessingEndTime = row.ConvertNullableField<DateTime>("ProcessingEndTime") ?? DateTime.MinValue,
                    ProcessingVersion = row.Field<int>("ProcessingVersion")
                }).ToArray();

            int recordCount = CountSearchResults(postData);
            int recordPerPage = Take ?? 50;
            return Ok(new PagedResults()
            {
                Data = JsonConvert.SerializeObject(results),
                RecordsPerPage = recordPerPage,
                TotalRecords = recordCount,
                NumberOfPages = (recordCount + recordPerPage - 1) / recordPerPage
            });
        }

    }

    [RoutePrefix("api/OpenXDA/AnalysisTask")]
    public class AnalysisTaskController : ModelController<AnalysisTask> 
    {
        [Route("PagedResults"), HttpPost]
        public override IHttpActionResult GetPagedList([FromBody] PostData postData, int page)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using DataTable table = GetSearchResults(postData, page);
            AnalysisTask[] results = table
                .AsEnumerable()
                .Select(row => new AnalysisTask()
                {
                    ID = row.Field<int>("ID"),
                    FileGroupID = row.Field<int>("FileGroupID"),
                    MeterID = row.Field<int>("MeterID"),
                    DataStartTime = row.Field<DateTime>("DataStartTime"),
                    NodeID = row.ConvertNullableField<int>("NodeID"),
                    TimeQueued = row.Field<DateTime>("TimeQueued"),
                    Priority = row.Field<int>("Priority"),
                    DataEndTime = row.Field<DateTime>("DataEndTime"),
                    MeterName = row.Field<string>("MeterName")
                }).ToArray();

            int recordCount = CountSearchResults(postData);
            int recordPerPage = Take ?? 50;
            return Ok(new PagedResults()
            {
                Data = JsonConvert.SerializeObject(results),
                RecordsPerPage = recordPerPage,
                TotalRecords = recordCount,
                NumberOfPages = (recordCount + recordPerPage - 1) / recordPerPage
            });
        }
    }


}