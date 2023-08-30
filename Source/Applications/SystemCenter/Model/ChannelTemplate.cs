//******************************************************************************************************
//  Channeltemplate.cs - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  08/30/2023 - C. Lackner
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
using System.Reflection;

namespace SystemCenter.Model
{
    [TableName("Datafile"), ReturnLimit(50),
     CustomView(@"
        SELECT
	        ChannelTemplateFile.ID,
            ChannelTemplateFile.Name,
            ChannelTemplateFile.FileName,
	        CONVERT(VARCHAR(MAX), ChannelTemplateFile.FileBlob, 1) AS FileBlob
        FROM
	        ChannelTemplateFile 
    ")]
    [AllowSearch]
    [PatchRoles("Administrator, Transmission SME")]
    [PostRoles("Administrator, Transmission SME")]
    [DeleteRoles("Administrator, Transmission SME")]
    public class ChannelTemplate 
    {
        [PrimaryKey(true)]
        public int ID { get; set; }

        public string Name { get; set; }

        public string FileBlob { get; set; }

        public string FileName { get; set; }
    }

    [RoutePrefix("api/SystemCenter/ChannelTemplateFile")]
    public class ChannelTemplateFileController : ModelController<ChannelTemplate>
    {
        public override IHttpActionResult Delete(ChannelTemplate record)
        {
            if (!DeleteAuthCheck())
            {
                return Unauthorized();
            }

            using AdoDataConnection adoDataConnection = new AdoDataConnection(Connection);
            int num = record.ID;
            int content = adoDataConnection.ExecuteNonQuery($"EXEC UniversalCascadeDelete ChanneltemplateFile, 'ID = {num}'");
            
            return Ok(content);
        }

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck())
            {
                return Unauthorized();
            }

            using AdoDataConnection connection = new AdoDataConnection(Connection);
            int content = connection.ExecuteNonQuery("INSERT INTO ChanneltemplateFile (Name, FileName, FileBlob) VALUES ({0},{1}, CONVERT(VARBINARY(MAX), {2}, 1))",
                record["Name"].ToString(), record["FileName"].ToString(), "0x" + record["FileBlob"].ToString());
            return Ok(content);
        }
    }

}