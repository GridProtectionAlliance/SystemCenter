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
                return InternalServerError();

            int maximoID = GetMaximoID(type, int.Parse(id));

            if (maximoID < 0)
                return InternalServerError();

            List<Model.AdditionalField> fields = new List<Model.AdditionalField>();

            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                fields = new TableOperations<Model.AdditionalField>(connection).QueryRecordsWhere("OpenXDAParentTable = {0} AND ExternalDB = 'Maximo'", type).ToList();
            }

            if (fields.Count() == 0)
                return InternalServerError();


           return Ok(maximoID);
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

            //Send Query To Oracle DataBase
            

            return 0;
        }

        private string GenerateRequest(string tableName, IEnumerable<string> collumns)
        {

            return "";
        }

        private int GetMAximoStructureID(string type)
        {
            if (type == "Location")
                return 1058; //That's a SubStation
            return 0;
        }
        #endregion
    }
}