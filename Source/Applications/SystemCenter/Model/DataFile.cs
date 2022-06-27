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
using System;

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
        //public override IHttpActionResult Get(string parentID = null)
        //{
        //    IEnumerable<DataFile> files = (IEnumerable<DataFile>)base.Get(parentID).ExecuteAsync(new System.Threading.CancellationToken()).Result;
        //    return Ok(files.Take(50));
        //}
    }

}