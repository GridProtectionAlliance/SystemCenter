//******************************************************************************************************
//  ExternalModelController.cs - Gbtc
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
//  09/28/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Data;
using System.Web.Http;
using Flee.PublicTypes;
using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using Microsoft.Graph.ExternalConnectors;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using SystemCenter.Model;
using SystemCenter.ScheduledProcesses;

namespace SystemCenter.Controllers
{
    // Todo: this name might be a little confusing, since its not a model controller that is only external, its a model controller thats ALSO external
    public class ExternalModelController<T> : ModelController<T> where T : class, new()
    {
        public class ExternalQuery
        {
            public T xdaRecord { get; set; }
            public extDBTables table { get; set; }
        }
        [HttpPost, Route("RetrieveExternalRecord")]
        public IHttpActionResult RetrieveExternalRecord([FromBody] JObject query)
        {
            if (!PostAuthCheck())
                return Unauthorized();
            try
            {
                using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
                    return Ok(ExecuteExternalQuery(query, xdaConnection));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // This is seperated specifically for assets controller to use without making the whole thing an extension
        public static DataRowCollection ExecuteExternalQuery(JObject extQuery, AdoDataConnection xdaConnection)
        {
            T xdaRecord = extQuery["xdaRecord"].ToObject<T>();
            extDBTables table = extQuery["table"].ToObject<extDBTables>();
            ExternalDatabases extDB = new TableOperations<ExternalDatabases>(xdaConnection).QueryRecordWhere("ID={0}", table.ExtDBID);
            if (extDB is null) throw new NullReferenceException($"Could not find external database associated with table ${table.TableName}");
            using (AdoDataConnection extConnection = ScheduledExtDBTask.GetExternalConnection(extDB))
            {
                TableOperations<T> xdaTable = new TableOperations<T>(xdaConnection);
                TableOperations<AdditionalField> afTable = new TableOperations<AdditionalField>(xdaConnection);
                TableOperations<AdditionalFieldValue> afvTable = new TableOperations<AdditionalFieldValue>(xdaConnection);
                ExpressionContext context = new ExpressionContext();
                DataRowCollection data = ScheduledExtDBTask.RetrieveDataRecord<T>(xdaRecord, table, xdaTable, afTable, afvTable, context, extConnection);
                return data;
            }
        }
    }
}