//******************************************************************************************************
//  MaximoController.cs - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  04/08/2020 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using Newtonsoft.Json.Linq;
using Oracle;
using Oracle.ManagedDataAccess.Client;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/ExternalDB/Maximo")]
    public class MaximoController : ApiController
    {

        #region [ Http Methods ]

        [Route("Update/{type}/{id}"), HttpGet]
        public IHttpActionResult Update(string type,string id)
        {

            if (type != "Location")
                return InternalServerError(new System.Exception("Type " +  type + " is not supported"));

            int maximoID = -1;

            try
            {
                maximoID = GetMaximoID(type, int.Parse(id));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            if (maximoID < 0)
                return InternalServerError(new System.IndexOutOfRangeException("The Asset Key could not be found in the external DataBase"));


            List<Model.AdditionalField> fields = new List<Model.AdditionalField>();
            List<Model.ExternalDBUpdate> result = new List<Model.ExternalDBUpdate>();

            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                fields = new TableOperations<Model.AdditionalField>(connection).QueryRecordsWhere("OpenXDAParentTable = {0} AND ExternalDB = 'Maximo'", type).ToList();


                IEnumerable<IGrouping<string, Model.AdditionalField>> fieldGroups = fields.GroupBy(item => item.ExternalDBTable);


                try
                {
                    foreach (IGrouping<string, Model.AdditionalField> group in fieldGroups)
                    {
                        result = result.Concat(GetTable(group.Key, group.ToList(), maximoID, int.Parse(id))).ToList();
                    }
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }

                // Update Date on all Fields
                fields.ForEach(item =>             
                connection.ExecuteNonQuery("UPDATE AdditionalFieldValue SET [UpdatedOn] = sysdatetime() WHERE OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}",
                    int.Parse(id), item.ID)
                );
            }
            return Ok(result);
        }

        [Route("ConfirmUpdate"), HttpPost]
        public IHttpActionResult ConfirmUpdate([FromBody] JObject record)
        {
            try
            {
                JToken data = record.GetValue("data");
                List<Model.ExternalDBUpdate> fields = data.ToObject<List<Model.ExternalDBUpdate>>();

                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    TableOperations<Model.AdditionalFieldValue> valueTable = new TableOperations<Model.AdditionalFieldValue>(connection);

                    foreach (Model.ExternalDBUpdate fld in fields)
                    {
                        if (fld.Error)
                            continue;

                        if (fld.ID == null)
                        {
                            valueTable.AddNewRecord(new Model.AdditionalFieldValue()
                            {
                                AdditionalFieldID = fld.AdditionalFieldID,
                                OpenXDAParentTableID = fld.OpenXDAParentTableID,
                                Value = fld.Value
                            });
                        }
                        else
                        {
                            Model.AdditionalFieldValue val = valueTable.QueryRecordWhere("ID={0}", fld.ID);
                            val.Value = fld.Value;
                            valueTable.UpdateRecord(val);

                        }
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        #endregion

        #region [ Helper Methods ]

        private int GetMaximoID(string type, int xdaID)
        {
            string assetKey = "";

            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                if (type == "Location")
                {
                    assetKey = connection.ExecuteScalar<string>("SELECT LocationKey FROM Location WHERE ID = {0}", xdaID);
                }
                else return -1;
            }

            string query = "SELECT A.LOCATION_KEY  FROM EAMDM.EAM_OD_LOCATION_MV A WHERE A.CLASSSTRUCTURE_ID = {0} AND A.LOCATION_NAME = '{1}'";
            
            using (OracleConnection con = new OracleConnection(constr))
            {
                con.Open();
                using(OracleCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText = string.Format(query, GetMAximoStructureID(type), assetKey);

                    using(OracleDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return reader.GetInt32(0);
                        }
                        else return -1;
                    }
                }
            }

            
        
        }

        private List<Model.ExternalDBUpdate> GetTable(string tableName, IEnumerable<Model.AdditionalField> collumns, int MaximoID, int XDAID)
        {
            List<Model.ExternalDBUpdate> result = new List<Model.ExternalDBUpdate>();
            if (collumns.Count() < 1)
                return result;

            try
            {
                result = GetFields(tableName, collumns, MaximoID, XDAID);
            }
            catch
            {
                foreach (Model.AdditionalField fld in collumns)
                {
                    try
                    {
                        result = result.Concat(GetFields(tableName, new List<Model.AdditionalField>() { fld }, MaximoID, XDAID)).ToList();
                    }
                    catch
                    {
                        result.Add(new Model.ExternalDBUpdate()
                        {
                            FieldName = fld.FieldName,
                            Value = null,
                            Error = true,
                            PreviousValue = null,
                            AdditionalFieldID = fld.ID,
                            OpenXDAParentTableID = XDAID,
                        });
                        // Error Caught
                        // Needs to be dealt with seperately
                    }
                }
            }

            return result;

        }

        private List<Model.ExternalDBUpdate> GetFields(string tableName, IEnumerable<Model.AdditionalField> collumns, int MaximoID, int XDAID)
        {
            List<Model.ExternalDBUpdate> result = new List<Model.ExternalDBUpdate>();

            if (collumns.Count() < 1)
                return result;

            //Start By Getting Data From Maximo
            string query = "SELECT A." + String.Join(", A.", collumns.Select(item => item.ExternalDBTableKey));
            query = query + " FROM " + tableName + " A WHERE LOCATION_KEY = {0}";

            Dictionary<string, string> maximoData = new Dictionary<string, string>();

            
            using (OracleConnection con = new OracleConnection(constr))
            {
                con.Open();
                using (OracleCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText = string.Format(query, MaximoID);


                    using (OracleDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                if (reader.GetValue(i) == null)
                                    maximoData.Add(reader.GetName(i), "");
                                else
                                    maximoData.Add(reader.GetName(i), reader.GetString(i));
                            }

                        }
                        else
                            throw new Exception("Key not found in Maximo");
                    }
                }
            }
            
            //Sort Through Data to get any Data that has changed or does not exist only
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                TableOperations<Model.AdditionalFieldValue> valueTable = new TableOperations<Model.AdditionalFieldValue>(connection);

                result = collumns.Select(item =>
                {
                    string value = item.ExternalDBTableKey;
                    maximoData.TryGetValue(item.ExternalDBTableKey, out value);

                    Model.ExternalDBUpdate res = new Model.ExternalDBUpdate()
                    {
                        FieldName = item.FieldName,
                        Value = value,
                        Error = false,
                        PreviousValue = null,
                        ID = null,
                        AdditionalFieldID = item.ID,
                        OpenXDAParentTableID = XDAID,
                    };

                    if (valueTable.QueryRecordCountWhere("AdditionalFieldID = {0} AND OpenXDAParentTableID = {1}", item.ID, XDAID) > 0)
                    {
                        Model.AdditionalFieldValue val = valueTable.QueryRecordsWhere("AdditionalFieldID = {0} AND OpenXDAParentTableID = {1}", item.ID, XDAID).First();
                        res.ID = val.ID;
                        res.PreviousValue = val.Value;
                    }

                    return res;
                    }).ToList();
            
            }
                
            return result.Where(item => item.PreviousValue != item.Value).ToList();
            
        }

        private int GetMAximoStructureID(string type)
        {
            if (type == "Location")
                return 1058; //That's a SubStation
            return 0;
        }

        private string constr = "Data Source=eamdmp; User Id=TVAPQPC; Password=pqr0cksB";
        #endregion
    }
}