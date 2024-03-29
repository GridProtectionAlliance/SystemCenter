﻿//******************************************************************************************************
//  Meters.cs - Gbtc
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
//  08/26/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Transactions;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/LineSegment")]
    public class OpenXDALineSegmentController : ModelController<LineSegment>
    {

        [HttpGet, Route("OrphanedSegments")]
        public IHttpActionResult GetOrphanedSegments()
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles))
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                const string Query =
                    "SELECT LineSegment.* " +
                    "FROM " +
                    "    Asset LineSegment JOIN " +
                    "    AssetType ON " +
                    "        LineSegment.AssetTypeID = AssetType.ID AND " +
                    "        AssetType.Name = 'LineSegment' JOIN " +
                    "    AssetRelationshipType ON AssetRelationshipType.Name = 'Line-LineSegment' LEFT OUTER JOIN " +
                    "    AssetRelationship ON " +
                    "        AssetRelationship.AssetRelationshipTypeID = AssetRelationshipType.ID AND " +
                    "        LineSegment.ID IN (AssetRelationship.ParentID, AssetRelationship.ChildID) " +
                    "WHERE AssetRelationship.ID IS NULL";

                using (DataTable table = connection.RetrieveData(Query))
                {
                    TableOperations<Asset> assetTable = new TableOperations<Asset>(connection);

                    IEnumerable<Asset> records = table
                        .AsEnumerable()
                        .Select(assetTable.LoadRecord);

                    return Ok(records);
                }
            }
        }

        [HttpGet, Route("{segmentID:int}/AddToLine/{lineID:int}")]
        public IHttpActionResult AddLineSegmentToLine(int segmentID, int lineID)
        {
            if (PatchRoles == string.Empty || User.IsInRole(PatchRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    AssetConnection assetConnection = new AssetConnection()
                    {
                        AssetRelationshipTypeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetRelationShipType WHERE Name = 'Line-LineSegment'"),
                        ChildID = lineID,
                        ParentID = segmentID
                    };

                    (new TableOperations<AssetConnection>(connection)).AddNewRecord(assetConnection);
                    return Ok(1);
                }
            }
            else
                return Unauthorized();

        }
        
        [HttpPost, Route("New/Line/{lineID:int}")]
        public IHttpActionResult PostNewAssetForLocation([FromBody] JObject record, int lineID)
        {
            if (PostRoles == string.Empty || User.IsInRole(PostRoles))
            {
                try
                {
                    using (TransactionScope scope = new TransactionScope())
                    {
                        using (AdoDataConnection connection = new AdoDataConnection(Connection))
                        {
                            JToken asset = record["Asset"];
                            int assetTypeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'LineSegment'");

                            LineSegment lineSegment = new LineSegment();

                            lineSegment.VoltageKV = asset["VoltageKV"].ToObject<double>();
                            lineSegment.AssetKey = asset["AssetKey"].ToString();
                            lineSegment.Description = asset["Description"].ToString();
                            lineSegment.AssetName = asset["AssetName"].ToString();
                            lineSegment.R0 = asset["R0"].ToObject<double>();
                            lineSegment.X0 = asset["X0"].ToObject<double>();
                            lineSegment.R1 = asset["R1"].ToObject<double>();
                            lineSegment.X1 = asset["X1"].ToObject<double>();
                            lineSegment.Length = asset["Length"].ToObject<double>();
                            lineSegment.ThermalRating = asset["ThermalRating"].ToObject<double>();
                            lineSegment.IsEnd = asset["IsEnd"].ToObject<bool>();

                            new TableOperations<LineSegment>(connection).AddNewRecord(lineSegment);

                            int assetID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", asset["AssetKey"].ToString());
                            AssetConnection assetConnection = new AssetConnection()
                            {
                                AssetRelationshipTypeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetRelationShipType WHERE Name = 'Line-LineSegment'"),
                                ChildID = lineID,
                                ParentID = assetID
                            };

                            (new TableOperations<AssetConnection>(connection)).AddNewRecord(assetConnection);
                        }

                        scope.Complete();
                        return Ok("Completed without errors");

                    }
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
            else
                return Unauthorized();
        }

        [HttpGet, Route("{segmentID:int}/Disconnect/{lineID:int}")]
        public IHttpActionResult DisconnectLineSegmentFromLine(int segmentID, int lineID)
        {
            if (DeleteRoles == string.Empty || User.IsInRole(DeleteRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    int typeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetRelationShipType WHERE Name = 'Line-LineSegment'");
                    connection.ExecuteNonQuery("DELETE FROM AssetRelationship WHERE AssetRelationshipTypeID = {0} AND ((ChildID = {1} AND ParentID = {2}) OR (ChildID = {2} AND ParentID = {1}))", typeID, lineID, segmentID);

                    return Ok(1);
                }
            }
            else
                return Unauthorized();

        }
    }

}
