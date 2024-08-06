//******************************************************************************************************
//  AccessLogController.cs - Gbtc
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
//  06/15/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************



using GSF.Data;
using GSF.Data.Model;
using GSF.Security.Model;
using GSF.Web.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Controllers
{
    
    [RoutePrefix("api/SystemCenter/AccessLog")]
    public class SystemCenterAccessLogController : ApiController {

        private string Connection { get; } = "systemSettings";


        [HttpGet, Route("Aggregates/{nodeID}/{days:int}")]
        public IHttpActionResult GetAggregates(string nodeID, int days)
        {
           
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    string sql = @"
                        SELECT 
                            Count(ID) AS Count,
                            FORMAT(Max(CreatedOn),'MM/dd/yyyy') AS [Date]
                        FROM AccessLog 
                        WHERE NodeID = {0} AND
                        AccessGranted = 1 AND
                            CreatedOn BETWEEN DATEADD(DAY, -{1}, GETUTCDATE()) AND GETUTCDATE()
                        GROUP BY dateadd(DAY, 0, datediff(day, 0, CreatedOn))";

                    DataTable table = connection.RetrieveData(sql, nodeID,days);
                    return Ok(table);
                }
        }

        [HttpGet, Route("Table/{nodeID}/{days:int}")]
        public IHttpActionResult GetTable(string nodeID, int days)
        {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    DataTable table = connection.RetrieveData(@"
                        SELECT
	                        COUNT(AccessGranted) as Logins,
	                        Max(CreatedOn) as LastAccess,
	                        UserName
                        FROM
	                        AccessLog
                        WHERE
	                        AccessGranted = 1 AND 
                            CreatedOn BETWEEN DATEADD(DAY, -{1}, GETUTCDATE()) AND GETUTCDATE() AND
                            NodeID = {0}       
                        GROUP BY
	                        UserName
                    ", nodeID, days);
                    return Ok(table);
                }
        }

    }
}