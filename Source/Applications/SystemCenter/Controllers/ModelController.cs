//******************************************************************************************************
//  ModelBaseController.cs - Gbtc
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
//  10/04/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Reflection;
using GSF.Web.Security;

namespace SystemCenter.Controllers
{
    [AuthorizeControllerRole]
    public class ModelController<T> : ApiController where T : class, new()
    {
        #region [ Constructor ]
        public ModelController() {
        }

        public ModelController(bool hasParent, string parentKey)
        {
            HasParent = hasParent;
            ParentKey = parentKey;
        }

        #endregion

        #region [ Properties ]
        protected bool HasParent { get; set; } = false;
        protected string ParentKey { get; set; } = "";
        protected virtual string Connection { get; } = "systemSettings";
        protected virtual string PostRoles { get; } = "Administrator";
        protected virtual string PatchRoles { get; } = "Administrator";
        protected virtual string DeleteRoles { get; } = "Administrator";
        #endregion

        #region [ Methods ]
        [HttpGet, Route("{parentID:int?}")]
        public virtual IHttpActionResult Get(int parentID = 0)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    IEnumerable<T> result;
                    if (HasParent)
                        result = new TableOperations<T>(connection).QueryRecordsWhere(ParentKey + " = {0}", parentID);
                    else
                        result = new TableOperations<T>(connection).QueryRecords();

                    return Ok(result);
                }
                catch(Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }
        [HttpGet, Route("One/{id:int}")]
        public virtual IHttpActionResult GetOne(int id)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    T result = new TableOperations<T>(connection).QueryRecordWhere("ID = {0}", id);

                    if (result == null)
                    {
                        TableNameAttribute tableNameAttribute;
                        string tableName;
                        if (typeof(T).TryGetAttribute(out tableNameAttribute))
                            tableName = tableNameAttribute.TableName;
                        else
                            tableName = typeof(T).Name;
                        return BadRequest(string.Format("ID provided does not exist in '{0}'.", tableName));
                    }
                    else
                        return Ok(result);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }


        [HttpPost, Route("Add")]
        public virtual IHttpActionResult Post([FromBody] T record)
        {
            try
            {
                if (User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        int result = new TableOperations<T>(connection).AddNewRecord(record);
                        return Ok(result);
                    }
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPatch, Route("Update")]
        public virtual IHttpActionResult Patch([FromBody] T record)
        {
            try
            {
                if (User.IsInRole(PatchRoles))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        int result = new TableOperations<T>(connection).UpdateRecord(record);
                        return Ok(result);
                    }
                }
                else
                {
                    return Unauthorized();
                }


            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("Delete")]
        public virtual IHttpActionResult Delete(T record)
        {
            try
            {
                if (User.IsInRole(DeleteRoles))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TableNameAttribute tableNameAttribute;
                        string tableName;
                        if (typeof(T).TryGetAttribute(out tableNameAttribute))
                            tableName = tableNameAttribute.TableName;
                        else
                            tableName = typeof(T).Name;

                        PropertyInfo idProp = typeof(T).GetProperty("ID");
                        if (idProp == null)
                        {
                            int result = new TableOperations<T>(connection).DeleteRecord(record);
                            return Ok(result);
                        }
                        else
                        {
                            int id = (int)idProp.GetValue(record);
                            int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete '{tableName}', 'ID = {id}'");
                            return Ok(result);
                        }
                    }
                }
                else
                {
                    return Unauthorized();
                }             

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        #endregion

    }
}