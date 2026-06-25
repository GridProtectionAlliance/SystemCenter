//******************************************************************************************************
//  Node.cs - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  06/11/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

using System.Data;
using System.Web.Http;
using GSF.Data.Model;
using GSF.Web.Model;
using Newtonsoft.Json;
using openXDA.Model;

namespace SystemCenter.Model
{
    [TableName("Node"), ReturnLimit(50),
     CustomView(@"
    SELECT 
	    Node.ID,
	    Node.Name,
	    NodeType.Name as NodeType,
	    Node.MinimumHostCount,
	    ISNULL(hostRegistration.RegistrationKey, 'N/A') as HostRegistrationKey,
	    ISNULL(assignedHostRegistration.RegistrationKey, 'N/A') as AssignedHostRegistrationKey
    FROM
	    Node 
		    JOIN NodeType ON Node.NodeTypeID = NodeType.ID
		    LEFT JOIN HostRegistration hostRegistration ON Node.HostRegistrationID = HostRegistration.ID
		    LEFT JOIN HostRegistration assignedHostRegistration ON Node.AssignedHostRegistrationID = HostRegistration.ID
    ")]
    [AllowSearch]
    public class Node
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string NodeType { get; set; }
        public int MinimumHostCount { get; set; }
        public string HostRegistrationKey { get; set; }
        public string AssignedHostRegistrationKey { get; set; }
    }

    [RoutePrefix("api/SystemCenter/Node")]
    public class SystemCenterNodeController : ModelController<Node> {}

    [RoutePrefix("api/OpenXDA/NodeTypes")]
    public class OpenXDANodeTypesController : ModelController<openXDA.Model.NodeType> {}

    [RoutePrefix("api/OpenXDA/HostRegistration")]
    public class OpenXDAHostRegistrationController : ModelController<openXDA.Model.HostRegistration> {}

    [RoutePrefix("api/OpenXDA/Node")]
    public class OpenXDANodeController : ModelController<openXDA.Model.Node> { }

    [RoutePrefix("api/OpenXDA/NodeSetting"), AllowSearch]
    public class OpenXDANodeSettingController : ModelController<openXDA.Model.NodeSetting> {

        public override IHttpActionResult GetSearchableList([FromBody] PostData postData) // for some reason, even with the 'AllowSearch' attribute, the value for AllowSearch was false and would prevent searching.
        {
            if (!GetAuthCheck())
                return Unauthorized();

            DataTable table = base.GetSearchResults(postData);
            return Ok(JsonConvert.SerializeObject(table));
        }

        public override IHttpActionResult GetPagedList([FromBody] PostData postData, int page) // same problem as above.
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using DataTable table = GetSearchResults(postData, page);
            int recordCount = CountSearchResults(postData);
            int recordsPerPage = Take ?? 50;

            return Ok(new PagedResults()
            {
                Data = JsonConvert.SerializeObject(table),
                RecordsPerPage = recordsPerPage,
                TotalRecords = recordCount,
                NumberOfPages = (recordCount + recordsPerPage - 1) / recordsPerPage
            });
        }
    }
}