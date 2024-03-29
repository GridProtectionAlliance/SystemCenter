﻿//******************************************************************************************************
//  AdditionalField.cs - Gbtc
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
//  09/20/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Model
{
    [UseEscapedName, AllowSearch]
    public class AdditionalField
    {
        [PrimaryKey(true)]
        public int ID { get; set; }
        public string ParentTable { get; set; }
        public string FieldName { get; set; }
        public string Type { get; set; }
        public string ExternalDB { get; set; }
        public string ExternalDBTable { get; set; }
        public string ExternalDBTableKey{ get; set; }
        public bool IsSecure { get; set; }

    }

    [RoutePrefix("api/SystemCenter/AdditionalField")]
    public class AdditionalFieldController : ModelController<AdditionalField> {
       
        [HttpGet, Route("ParentTable/{openXDAParentTable}/{sort}/{ascending:int}")]
        public IHttpActionResult GetAdditionalFieldsForTable(string openXDAParentTable, string sort, int ascending)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                //Fix added for Capacitor Bank due to naming Missmatch
                if (openXDAParentTable == "CapacitorBank")
                    openXDAParentTable = "CapBank";

                string orderByExpression = DefaultSort;

                if (sort != null && sort != string.Empty)
                    orderByExpression = $"{sort} {(ascending == 1 ? "ASC" : "DESC")}";

                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    IEnumerable<AdditionalField> records = new TableOperations<AdditionalField>(connection).QueryRecords(orderByExpression, new RecordRestriction("ParentTable = {0}", openXDAParentTable));
                    if (!User.IsInRole("Administrator"))
                    {
                        records = records.Where(x => !x.IsSecure);
                    }

                    return Ok(records);
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet, Route("ExternalDataBase")]
        public IHttpActionResult GetExternalDB()
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {

                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    string tableName = new TableOperations<extDBTables>(connection).TableName;
                    DataTable dataTbl = connection.RetrieveData($"SELECT DISTINCT [ExternalDB] from {tableName}");
                    return Ok(dataTbl);
                }
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}