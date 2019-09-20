//******************************************************************************************************
//  AssetTypesController.cs - Gbtc
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
//  09/19/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.AssetTypes
{
    [RoutePrefix("api/AssetTypeFields")]
    public class AssetTypeFieldsController : ApiController
    {
        [HttpGet, Route("{id}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    IEnumerable<AssetTypeField> types = new TableOperations<AssetTypeField>(connection).QueryRecordsWhere("AssetTypeID = {0}", id);
                    return Ok(types);
                }

            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route()]
        public IHttpActionResult Post([FromBody] AssetTypeField assetTypeField)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    int result = new TableOperations<AssetTypeField>(connection).AddNewRecord(assetTypeField);
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPatch, Route()]
        public IHttpActionResult Patch([FromBody] AssetTypeField assetTypeField)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    int result = new TableOperations<AssetTypeField>(connection).UpdateRecord(assetTypeField);
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'AssetTypeField', 'ID = {id}'");
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }
}