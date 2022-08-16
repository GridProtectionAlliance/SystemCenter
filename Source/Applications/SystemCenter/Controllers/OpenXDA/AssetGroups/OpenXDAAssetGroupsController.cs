//******************************************************************************************************
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
// record fields for asset JObject Post records
//  Asset: { ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Channels: Array<OpenXDA.Channel>
// interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number,EDNAPoint?:string }
// interface Bus extends Asset { }
// interface CapBank extends Asset { NumberOfBanks: number, CansPerBank: number, CapacitancePerBank: number }
// interface Line extends Asset { MaxFaultDistance: number, MinFaultDistance: number, Segment: LineSegment }
// interface LineSegment extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number }
// interface Transformer extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, PrimaryVoltageKV: number, SecondaryVoltageKV: number, Tap: number }
// AssetConnections: List<{ ID: int, AssetRelationshipTypeID: int, Parent: string, Child: string }>
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
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
    [RoutePrefix("api/OpenXDA/AssetGroup")]
    public class OpenXDAAssetGroupController : ModelController<AssetGroupView>
    {
        private class extendedAssetGroupView: AssetGroupView
        {
            public List<int> MeterList { get; set; }
            public List<int> AssetList { get; set; }
            public List<int> UserList { get; set; }
            public List<int> AssetGroupList { get; set; }

        }
     
        [HttpGet, Route("{assetGroupID:int}/Assets")]
        public IHttpActionResult GetAssets(int assetGroupID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        string sql = @"SELECT   
                            DISTINCT
                                Asset.ID,
                                AssetAssetGroup.AssetGroupID,
                                Asset.AssetKey,
                                Asset.AssetName,
                                Asset.VoltageKV,
                                AssetType.Name as AssetType,
                                COUNT(DISTINCT Meter.ID) as Meters,
                                COUNT(DISTINCT Location.ID) as Locations
                            FROM
                                Asset Join
                                AssetType ON Asset.AssetTypeID = AssetType.ID LEFT JOIN
                                MeterAsset ON MeterAsset.AssetID = Asset.ID LEFT JOIN
                                Meter ON MeterAsset.MeterID = Meter.ID LEFT JOIN
                                AssetLocation ON AssetLocation.AssetID = Asset.ID LEFT JOIN
                                Location ON AssetLocation.LocationID = Location.ID LEFT JOIN
                                AssetAssetGroup ON Asset.ID = AssetAssetGroup.AssetID
                            GROUP BY
                                Asset.ID,
                                Asset.AssetKey, 
                                Asset.AssetName,
                                Asset.VoltageKV,
                                AssetType.Name,
                                AssetAssetGroup.AssetGroupID
                            HAVING AssetAssetGroup.AssetGroupID = {0}";

                        return Ok(connection.RetrieveData(sql,assetGroupID));
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            else
                return Unauthorized();
        }

        [HttpPost, Route("{assetGroupID:int}/AddAssets")]
        public IHttpActionResult AddAssets(int assetGroupID, [FromBody] IEnumerable<int> assets)
        {
            try
            {
                if (PostRoles == string.Empty || User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TableOperations<AssetAssetGroup> assetassetGroupTbl = new TableOperations<AssetAssetGroup>(connection);
                        foreach (int assetID in assets)
                        {
                            int n = connection.ExecuteScalar<int>("Select Count(ID) FROM AssetAssetGroup WHERE AssetID = {0} AND AssetGroupID = {1}", assetID, assetGroupID);
                            if (n == 0)
                                assetassetGroupTbl.AddNewRecord( new AssetAssetGroup() { AssetGroupID = assetGroupID, AssetID = assetID});
                        }
                        return Ok(1);
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

        [HttpGet, Route("{assetGroupID:int}/RemoveAsset/{assetID:int}")]
        public IHttpActionResult RemoveAsset(int assetGroupID, int assetID)
        {
            try
            {
                if (PostRoles == string.Empty || User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        connection.ExecuteNonQuery("DELETE FROM AssetAssetGroup WHERE AssetID = {0} AND AssetGroupID = {1}", assetID, assetGroupID);
                        return Ok(1);
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

        [HttpGet, Route("{assetGroupID:int}/Meters")]
        public IHttpActionResult GetMeters(int assetGroupID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        string sql = @"SELECT DISTINCT
                            Meter.ID,
                            MeterAssetGroup.AssetGroupID,
                            Meter.AssetKey,
                            Meter.Name,
                            Meter.Make,
                            Meter.Model,
                            Location.Name as Location,
                            COUNT(DISTINCT MeterAsset.AssetID)  as MappedAssets
                        FROM
                            Meter LEFT JOIN
                            Location ON Meter.LocationID = Location.ID LEFT JOIN
                            MeterAsset ON Meter.ID = MeterAsset.MeterID LEFT JOIN
                            Asset ON MeterAsset.AssetID = Asset.ID LEFT JOIN
                            MeterAssetGroup ON Meter.ID = MeterAssetGroup.MeterID
                        GROUP BY
                            Meter.ID,
                            Meter.AssetKey,
                            Meter.Name,
                            Meter.Make,
                            Meter.Model,
                            Location.Name,
                            MeterAssetGroup.AssetGroupID
                        HAVING MeterAssetGroup.AssetGroupID = {0}";
                       
                        return Ok(connection.RetrieveData(sql,assetGroupID));
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            else
                return Unauthorized();
        }

        [HttpPost, Route("{assetGroupID:int}/AddMeters")]
        public IHttpActionResult AddMeters(int assetGroupID, [FromBody] IEnumerable<int> meters)
        {
            try
            {
                if (PostRoles == string.Empty || User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TableOperations<MeterAssetGroup> meterassetGroupTbl = new TableOperations<MeterAssetGroup>(connection);
                        foreach (int meterID in meters)
                        {
                            int n = connection.ExecuteScalar<int>("Select Count(ID) FROM MeterAssetGroup WHERE MeterID = {0} AND AssetGroupID = {1}", meterID, assetGroupID);
                            if (n == 0)
                                meterassetGroupTbl.AddNewRecord(new MeterAssetGroup() { AssetGroupID = assetGroupID, MeterID = meterID });
                        }
                        return Ok(1);
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

        [HttpGet, Route("{assetGroupID:int}/RemoveMeter/{meterID:int}")]
        public IHttpActionResult RemoveMeter(int assetGroupID, int meterID)
        {
            try
            {
                if (PostRoles == string.Empty || User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        connection.ExecuteNonQuery("DELETE FROM MeterAssetGroup WHERE MeterID = {0} AND AssetGroupID = {1}", meterID, assetGroupID);
                        return Ok(1);
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


        [HttpGet, Route("{assetGroupID:int}/Users")]
        public IHttpActionResult GetUserAccounts(int assetGroupID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        IEnumerable<UserAccountAssetGroupView> records = new TableOperations<UserAccountAssetGroupView>(connection).QueryRecordsWhere("AssetGroupID = {0}", assetGroupID);

                        return Ok(records);
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            else
                return Unauthorized();
        }

        [HttpGet, Route("{assetGroupID:int}/AssetGroups")]
        public IHttpActionResult GetSubGroups(int assetGroupID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        IEnumerable<AssetGroupView> records = new TableOperations<AssetGroupView>(connection).QueryRecordsWhere("ID in (SELECT ChildAssetGroupID FROM AssetGroupAssetGroupView WHERE ParentAssetGroupID = {0})", assetGroupID);

                        return Ok(records);
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            else
                return Unauthorized();
        }

        [HttpPost, Route("{assetGroupID:int}/AddAssetGroups")]
        public IHttpActionResult AddSubgroups(int assetGroupID, [FromBody] IEnumerable<int> subGroups)
        {
            try
            {
                if (PostRoles == string.Empty || User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TableOperations<AssetGroupAssetGroup> assetassetGroupTbl = new TableOperations<AssetGroupAssetGroup>(connection);
                        foreach (int childID in subGroups)
                        {
                            int n = connection.ExecuteScalar<int>("Select Count(ID) FROM AssetGroupAssetGroup WHERE ChildAssetGroupID = {0} AND ParentAssetGroupID = {1}", childID, assetGroupID);
                            if (n == 0)
                                assetassetGroupTbl.AddNewRecord(new AssetGroupAssetGroup() { ParentAssetGroupID = assetGroupID, ChildAssetGroupID = childID });
                        }
                        return Ok(1);
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

        [HttpGet, Route("{assetGroupID:int}/RemoveGroup/{childID:int}")]
        public IHttpActionResult RemoveGroup(int assetGroupID, int childID)
        {
            try
            {
                if (PostRoles == string.Empty || User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        connection.ExecuteNonQuery("DELETE FROM AssetGroupAssetGroup WHERE ChildAssetGroupID = {0} AND ParentAssetGroupID = {1}", childID, assetGroupID);
                        return Ok(1);
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
        public override IHttpActionResult Delete(AssetGroupView record)
        {
            try
            {
                if (DeleteRoles == string.Empty || User.IsInRole(DeleteRoles))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                       
                        int id = record.ID;
                        int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'AssetGroup', 'ID = {id}'");
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

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostRoles == string.Empty || User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        extendedAssetGroupView newRecord = record.ToObject<extendedAssetGroupView>();
                        AssetGroup newGroup = new AssetGroup() { ID= newRecord.ID, DisplayDashboard = newRecord.DisplayDashboard, Name= newRecord.Name, DisplayEmail=newRecord.DisplayEmail };

                        int result = new TableOperations<AssetGroup>(connection).AddNewRecord(newRecord);

                        return Ok(new TableOperations<AssetGroupView>(connection).QueryRecordWhere("Name = {0}", newRecord.Name));
                            

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

        public override IHttpActionResult Patch([FromBody] AssetGroupView record)
        {
            try
            {
                if (PatchAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        AssetGroup tblRecord = new TableOperations<AssetGroupView>(connection).QueryRecordWhere("ID = {0}", record.ID);
                        tblRecord.Name = record.Name;
                        tblRecord.DisplayEmail = record.DisplayEmail;
                        tblRecord.DisplayDashboard = record.DisplayDashboard;

                        int result = new TableOperations<AssetGroup>(connection).UpdateRecord(tblRecord);

                        return Ok(1);
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
    }

}