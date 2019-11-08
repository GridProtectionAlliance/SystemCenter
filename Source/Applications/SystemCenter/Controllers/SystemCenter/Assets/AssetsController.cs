//******************************************************************************************************
//  AssetsController.cs - Gbtc
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
//  09/23/2019 - Billy Ernest
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

namespace SystemCenter.Controllers.Assets
{
    [RoutePrefix("api/Assets")]
    public class AssetsController : ApiController
    {
        [HttpGet, Route("One/{assetID}")]
        public IHttpActionResult GetOne(int assetID)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    //DataTable asset = connection.RetrieveData(@"
                    //    declare @assetID int = {0}
                    //    declare @assetType int = {1}
                    //    declare @columns nvarchar(max)

                    //    SELECT @columns = COALESCE(@Columns + ', ','') + QUOTENAME(Name)
                    //    FROM   
                    //     AssetTypeField
                    //    WHERE
                    //     AssetTypeField.AssetTypeID = @assetType

                    //    DECLARE @sql nvarchar(max)  = N'
                    //    SELECT *
                    //    FROM(
                    //    SELECT
                    //     Asset.ID,
                    //     Asset.AssetKey,
                    //     Asset.AssetTypeID,
                    //     AssetTypeField.Name as FieldName,
                    //     AssetTypeFieldValue.Value
                    //    FROM
                    //     Asset LEFT JOIN
                    //     AssetTypeField ON Asset.AssetTypeID = AssetTypeField.AssetTypeID LEFT JOIN
                    //     AssetTypeFieldValue ON AssetTypeField.ID = AssetTypeFieldValue.AssetTypeFieldID
                    //    WHERE 
                    //     Asset.ID = @assetID
                    //    )as t
                    //    pivot(
                    //     Max(Value)
                    //     FOR t.FieldName IN (' + @columns +')
                    //    ) as pvt'

                    //    EXECUTE sp_executesql @sql, N'@assetID int,@assetType int',@assetID=@assetID,@assetType=@assetType                    
                    //", assetID, assetTypeID);

                    DataTable asset = connection.RetrieveData(@"
                    SELECT
                        Asset.ID as AssetID,
                        AssetTypeField.ID as AssetTypeFieldID,
	                    AssetTypeField.Name as FieldName,
	                    AssetTypeField.Description as FieldDescription,
	                    AssetTypeField.Type as FieldType,
	                    AssetTypeFieldValue.ID as AssetTypeFieldValueID,
	                    AssetTypeFieldValue.Value as AssetTypeFieldValue
                    FROM
	                    Asset JOIN
	                    AssetTypeField ON Asset.AssetTypeID = AssetTypeField.AssetTypeID LEFT JOIN
	                    AssetTypeFieldValue ON AssetTypeField.ID = AssetTypeFieldValue.AssetTypeFieldID AND AssetTypeFieldValue.AssetID = Asset.ID
                    WHERE 
	                    Asset.ID = {0}
                    ", assetID);
                    if (asset != null)
                        return Ok(asset);
                    else
                        return BadRequest($"Asset Type ID ({assetID}) does not exist in the AssetType database table.");
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet, Route("{assetTypeID}")]
        public IHttpActionResult Get(int assetTypeID)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    //DataTable assets = connection.RetrieveData(@"
                    //    declare @assetType int = {0}
                    //    declare @columns nvarchar(max)

                    //    SELECT @columns = COALESCE(@Columns + ', ','') + QUOTENAME(Name)
                    //    FROM   
                    //     AssetTypeField
                    //    WHERE
                    //     AssetTypeField.AssetTypeID = @assetType

                    //    DECLARE @sql nvarchar(max)  = N'
                    //    SELECT *
                    //    FROM(
                    //    SELECT
                    //     Asset.ID,
                    //     Asset.AssetKey,
                    //     Asset.AssetTypeID,
                    //     AssetTypeField.Name as FieldName,
                    //     AssetTypeFieldValue.Value
                    //    FROM
                    //     Asset LEFT JOIN
                    //     AssetTypeField ON Asset.AssetTypeID = AssetTypeField.AssetTypeID LEFT JOIN
                    //     AssetTypeFieldValue ON AssetTypeField.ID = AssetTypeFieldValue.AssetTypeFieldID
                    //    WHERE 
                    //     Asset.AssetTypeID = @assetType
                    //    )as t
                    //    pivot(
                    //     Max(Value)
                    //     FOR t.FieldName IN (' + @columns +')
                    //    ) as pvt'

                    //    EXECUTE sp_executesql @sql, N'@assetType int',@assetType=@assetType                    
                    //", id);
                    IEnumerable<Asset> assets = new TableOperations<Asset>(connection).QueryRecordsWhere("AssetTypeID = {0}", assetTypeID);
                    return Ok(assets);
                }

            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route()]
        public IHttpActionResult Post([FromBody] Asset asset)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    int result = new TableOperations<Asset>(connection).AddNewRecord(asset);
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPatch, Route()]
        public IHttpActionResult Patch([FromBody] Asset asset)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    int result = new TableOperations<Asset>(connection).UpdateRecord(asset);
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPatch, Route("Update")]
        public IHttpActionResult Patch([FromBody] DataTable assetFields)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    TableOperations<AssetTypeFieldValue> to = new TableOperations<AssetTypeFieldValue>(connection);
                    foreach (DataRow row in assetFields.Rows)
                    {
                        string ids = row["AssetTypeFieldValueID"].ToString();
                        string value = row["AssetTypeFieldValue"].ToString();
                        AssetTypeFieldValue record = new AssetTypeFieldValue();
                        int id = (ids != string.Empty ? int.Parse(ids): 0);

                        if(id == 0 && value != string.Empty)
                        {
                            record.AssetID = int.Parse(row["AssetID"].ToString());
                            record.AssetTypeFieldID = int.Parse(row["AssetTypeFieldID"].ToString());
                            record.Value = value;
                            to.AddNewRecord(record);
                        }
                        else if(id != 0 && value != string.Empty)
                        {
                            record = to.QueryRecordWhere("ID = {0}", id);
                            record.Value = value;
                            to.UpdateRecord(record);
                        }
                        else if(id != 0 && value == string.Empty)
                        {
                            record = to.QueryRecordWhere("ID = {0}", id);
                            to.DeleteRecord(record.ID);
                        }

                    }
                    return Ok();
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
                    int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'AssetType', 'ID = {id}'");
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