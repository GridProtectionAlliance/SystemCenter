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
using System.Diagnostics;
using System.Linq;
using System.Transactions;
using System.Web.Http;
using GSF.Collections;
using GSF.Data;
using GSF.Data.Model;
using GSF.Reflection;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/Asset")]
    public class OpenXDAAssetController : ModelController<Asset>
    {
        [HttpGet, Route("{assetID:int}/Locations")]
        public IHttpActionResult GetAssetLocations(int assetID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        IEnumerable<Location> records = new TableOperations<Location>(connection).QueryRecordsWhere("ID IN (SELECT LocationID FROM AssetLocation WHERE AssetID = {0})", assetID);

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

        [HttpGet, Route("{assetID:int}/AssetLocations")]
        public IHttpActionResult GetAssetLocationModels(int assetID)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            { 
                    IEnumerable<AssetLocation> records = new TableOperations<AssetLocation>(connection).QueryRecordsWhere("AssetID = {0}", assetID);
                    return Ok(records);
            } 
        }

        [HttpGet, Route("{assetID:int}/AssetNear")]
        public IHttpActionResult GetAssetsNearAnAsset(int assetID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        IEnumerable<Asset> records = new TableOperations<Asset>(connection).QueryRecordsWhere("ID IN (SELECT oal.AssetID FROM AssetLocation as oal WHERE oal.LocationID IN (SELECT ial.LocationID FROM AssetLocation as ial WHERE ial.AssetID = {0})) AND ID NOT IN (SELECT CASE WHEN ParentID = {0} THEN ChildID ELSE ParentID END as ID FROM AssetConnection WHERE ParentID = {0} OR ChildID = {0})", assetID).OrderBy(x => x.AssetKey);

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

        [HttpGet, Route("{assetID:int}/Meters")]
        public IHttpActionResult GetAssetMeters(int assetID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("ID IN (SELECT MeterID FROM MeterAsset WHERE AssetID = {0})", assetID);

                        return Ok(records);
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            return Unauthorized();
        }

        [HttpGet, Route("{assetID:int}/AssetConnections")]
        public IHttpActionResult GetAssetAssetConnections(int assetID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        DataTable records = connection.RetrieveData(@"
                        SELECT
	                        AssetRelationship.AssetRelationshipTypeID,
	                        AssetRelationshipType.Name,
	                        Asset.ID as AssetID,
	                        Asset.AssetKey,
                            Asset.AssetName
                        FROM
	                        AssetRelationship JOIN
	                        AssetRelationshipType ON AssetRelationship.AssetRelationshipTypeID = AssetRelationshipType.ID JOIN
	                        ASset ON Asset.ID = (
		                        CASE 
			                        WHEN ParentID = {0} THEN AssetRelationship.ChildID
			                        ELSE AssetRelationship.ParentID
		                        END
	                        )
                        WHERE
	                        ParentID = {0} OR ChildID = {0}
                    ", assetID);

                        return Ok(records);
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            return Unauthorized();
        }

        [HttpGet, Route("{assetID:int}/OtherLocations")]
        public IHttpActionResult GetOtherLocations(int assetID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        IEnumerable<Location> records = new TableOperations<Location>(connection).QueryRecordsWhere("ID NOT IN (SELECT LocationID FROM AssetLocation WHERE AssetID = {0})", assetID);

                        return Ok(records);
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            return Unauthorized();
        }
        
        [HttpPost, Route("SearchableListIncludingMeter")]
        public IHttpActionResult GetMetersUsingSearchableList([FromBody] PostData searches)
        {

            if (!AllowSearch || (GetRoles != string.Empty && !User.IsInRole(GetRoles)))
                return Unauthorized();

            try
            {
                List<object> param = new List<object>();
                string whereClause = BuildWhereClause(searches.Searches, param);


                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {

                    TableNameAttribute tableNameAttribute;
                    UseEscapedNameAttribute escapedNameAttribute;

                    string addtionalFieldTableName;
                    if (typeof(AdditionalField).TryGetAttribute(out tableNameAttribute))
                        addtionalFieldTableName = tableNameAttribute.TableName;
                    else
                        addtionalFieldTableName = typeof(AdditionalField).Name;

                    if (typeof(AdditionalField).TryGetAttribute(out escapedNameAttribute))
                        addtionalFieldTableName = $"[{addtionalFieldTableName}]";

                    string addtionalFieldValueTableName;
                    if (typeof(AdditionalFieldValue).TryGetAttribute(out tableNameAttribute))
                        addtionalFieldValueTableName = tableNameAttribute.TableName;
                    else
                        addtionalFieldValueTableName = typeof(AdditionalFieldValue).Name;

                    if (typeof(AdditionalFieldValue).TryGetAttribute(out escapedNameAttribute))
                        addtionalFieldValueTableName = $"[{addtionalFieldValueTableName}]";

                    string view = @"SELECT

                        DISTINCT
                            Asset.ID,
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
	                    Location ON AssetLocation.LocationID = Location.ID
                    GROUP BY
                        Asset.ID,
	                    Asset.AssetKey,
	                    Asset.AssetName,
	                    Asset.VoltageKV,
	                    AssetType.Name
                    ";

                    string sql = "";

                    string pivotCollums = "(" + String.Join(",",searches.Searches.Where(item => item.IsPivotColumn).Select(search => "'" + search.FieldName + "'")) + ")";

                    if (pivotCollums == "()")
                        pivotCollums = "('')";

                    sql = $@"
                        DECLARE @PivotColumns NVARCHAR(MAX) = N''
                        SELECT @PivotColumns = @PivotColumns + '[AFV_' + t.FieldName + '],'
                            FROM (Select DISTINCT FieldName FROM {addtionalFieldTableName} WHERE 
                                ParentTable = 'Line' OR  ParentTable = 'Transformer' OR  ParentTable = 'Breaker'  OR  ParentTable = 'CapBank'  OR  ParentTable = 'Bus' OR ParentTable = 'Generation' OR ParentTable = 'StationAux' OR ParentTable = 'StationBattery'
                                AND FieldName IN {pivotCollums}
                            ) AS t


                        DECLARE @SQLStatement NVARCHAR(MAX) = N''
                        
                        IF @PivotColumns != ''
                            SET @SQLStatement = N'
                            SELECT * INTO #Tbl FROM (
                            SELECT 
                                M.*,
                                (CONCAT(''AFV_'',af.FieldName)) AS FieldName,
	                            afv.Value
                            FROM ({view.Replace("'", "''")}) M LEFT JOIN 
                                {addtionalFieldTableName} af on af.ParentTable IN (''Line'',''Transformer'',''Breaker'',''CapBank'',''Bus'',''Generation'',''StationAux'',''StationBattery'') AND af.FieldName IN {pivotCollums.Replace("'", "''")} LEFT JOIN
	                            {addtionalFieldValueTableName} afv ON m.ID = afv.ParentTableID AND af.ID = afv.AdditionalFieldID
                            ) as T PIVOT (
                                Max(T.Value) FOR T.FieldName IN ('+ SUBSTRING(@PivotColumns,0, LEN(@PivotColumns)) + ')) AS PVT
                            {whereClause.Replace("'", "''")}
                            ORDER BY { searches.OrderBy} {(searches.Ascending ? "ASC" : "DESC")};

                            DECLARE @NoNPivotColumns NVARCHAR(MAX) = N''''
                                SELECT @NoNPivotColumns = @NoNPivotColumns + ''[''+ name + ''],''
                                    FROM tempdb.sys.columns WHERE  object_id = Object_id(''tempdb..#Tbl'') AND name NOT LIKE ''AFV%''; 
		                    DECLARE @CleanSQL NVARCHAR(MAX) = N''SELECT '' + SUBSTRING(@NoNPivotColumns,0, LEN(@NoNPivotColumns)) + ''FROM #Tbl''

		                    exec sp_executesql @CleanSQL
                        '
                        ELSE 
                            SET @SQLStatement = 'SELECT * FROM ({view.Replace("'", "''")}) pvt {whereClause.Replace("'", "''")} ORDER BY { searches.OrderBy} {(searches.Ascending ? "ASC" : "DESC")}'

                        exec sp_executesql @SQLStatement";


                    DataTable table;
                    object[] paramArray = param.ToArray();
                    if (param.Count() > 0)
                        table = connection.RetrieveData(sql, paramArray.ToArray());
                    else
                        table = connection.RetrieveData(sql, "");

                    return Ok(table);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpPost, Route("New/Meter/{meterID:int}/{locationID:int}")]
        public IHttpActionResult PostNewAssetForMeter([FromBody] JObject record, int meterID, int locationID)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    int assetID = PostNewAsset(record);
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        MeterAsset meterAsset = new MeterAsset() { MeterID = meterID, AssetID = assetID };
                        new TableOperations<MeterAsset>(connection).AddNewRecord(meterAsset);
                        AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                        new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
                    }
                    scope.Complete();
                    return Ok("Completed without errors.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPost, Route("New/Location/{locationID:int}")]
        public IHttpActionResult PostNewAssetForLocation([FromBody] JObject record, int locationID)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    int assetID = PostNewAsset(record);
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                        new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
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

        // Method to post asset and return the associated asset ID
        public int PostNewAsset(JObject record)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                JToken asset = record["Asset"];
                string assetType = asset["AssetType"].ToString();
                int assetTypeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = {0}", assetType);


                if (assetType == "Line")
                {
                    Line line = new Line();
                    CreateLineFromJToken(line, asset);
                    new TableOperations<Line>(connection).AddNewRecord(line);
                    line.ID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", line.AssetKey);

                    LineSegment lineSegment = new LineSegment()
                    {
                        VoltageKV = asset["VoltageKV"].ToObject<double>(),
                        AssetKey = asset["AssetKey"].ToString() + "LineSegment",
                        Description = asset["Description"].ToString(),
                        AssetName = asset["AssetName"].ToString(),
                        AssetTypeID = assetTypeID,
                        R0 = asset["Segment"]["R0"].ToObject<double>(),
                        X0 = asset["Segment"]["X0"].ToObject<double>(),
                        R1 = asset["Segment"]["R1"].ToObject<double>(),
                        X1 = asset["Segment"]["X1"].ToObject<double>(),
                        Length = asset["Segment"]["Length"].ToObject<double>(),
                    };
                    lineSegment.AssetTypeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'LineSegment'");

                    new TableOperations<LineSegment>(connection).AddNewRecord(lineSegment);
                    lineSegment.ID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", lineSegment.AssetKey);

                    AssetConnection assetConnection = new AssetConnection()
                    {
                        AssetRelationshipTypeID = 0,
                        ParentID = line.ID,
                        ChildID = lineSegment.ID
                    };
                    assetConnection.AssetRelationshipTypeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment'");
                    new TableOperations<AssetConnection>(connection).AddNewRecord(assetConnection);
                }
                else if (assetType == "LineSegment")
                {
                    LineSegment lineSegment = new LineSegment();
                    CreateLineSegmentFromJToken(lineSegment, asset);
                    new TableOperations<LineSegment>(connection).AddNewRecord(lineSegment);
                }
                else if (assetType == "Breaker")
                {
                    Breaker breaker = new Breaker();
                    CreateBreakerFromJToken(breaker, asset);
                    new TableOperations<Breaker>(connection).AddNewRecord(breaker);
                    breaker.ID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", breaker.AssetKey);

                    if (asset["SCADAPoint"] != null)
                    {
                        SCADAPoint point = new SCADAPoint()
                        {
                            BreakerID = breaker.ID,
                            Point = asset["SCADAPoint"].ToString()
                        };
                        new TableOperations<SCADAPoint>(connection).AddNewRecord(point);
                    }

                    if (asset["SpareBreakerID"] != null)
                    {
                        AssetSpare assetSpare = new AssetSpare()
                        {
                            AssetID = breaker.ID,
                            SpareAssetID = asset["SpareBreakerID"].ToObject<int>()
                        };
                        new TableOperations<AssetSpare>(connection).AddNewRecord(assetSpare);
                    }
                }
                else if (assetType == "Bus")
                {
                    Bus bus = new Bus();
                    CreateBusFromJToken(bus, asset);
                    new TableOperations<Bus>(connection).AddNewRecord(bus);
                }
                else if (assetType == "Generation")
                {
                    Generation gen = new Generation();
                    CreateGenFromJToken(gen, asset);
                    new TableOperations<Generation>(connection).AddNewRecord(gen);
                }
                else if (assetType == "StationAux")
                {
                    StationAux aux = new StationAux();
                    CreateAuxFromJToken(aux, asset);
                    new TableOperations<StationAux>(connection).AddNewRecord(aux);
                }
                else if (assetType == "StationBattery")
                {
                    StationBattery battery = new StationBattery();
                    CreateBatteryFromJToken(battery, asset);
                    new TableOperations<StationBattery>(connection).AddNewRecord(battery);
                }
                else if (assetType == "CapacitorBank")
                {
                    CapBank capBank = new CapBank();
                    CreateCapBankFromJToken(capBank, asset);
                    new TableOperations<CapBank>(connection).AddNewRecord(capBank);
                }
                else if (assetType == "CapacitorBankRelay")
                {
                    CapBankRelay capBankRelay = new CapBankRelay();
                    CreateCapBankRelayFromJToken(capBankRelay, asset);
                    new TableOperations<CapBankRelay>(connection).AddNewRecord(capBankRelay);
                }
                else if (assetType == "Transformer")
                {
                    Transformer transformer = new Transformer();
                    CreateTransformerFromJToken(transformer, asset);
                    new TableOperations<Transformer>(connection).AddNewRecord(transformer);
                }
                else
                {
                    Asset newAsset = new Asset();
                    CreateAssetFromJToken(newAsset, asset);
                    new TableOperations<Asset>(connection).AddNewRecord(newAsset);

                }

                return connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", asset["AssetKey"].ToString());
            }
        }



        [HttpPost, Route("Existing/Meter/{meterID:int}/{locationID:int}")]
        public IHttpActionResult PostExistingAssetForMeter([FromBody] JObject record, int meterID, int locationID)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        JToken asset = record["Asset"];
                        int assetID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", asset["AssetKey"].ToString());
                        MeterAsset meterAsset = new MeterAsset() { MeterID = meterID, AssetID = assetID };
                        new TableOperations<MeterAsset>(connection).AddNewRecord(meterAsset);
                        AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                        new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
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


        [HttpPost, Route("Existing/Location/{locationID:int}")]
        public IHttpActionResult PostExistingAssetForLocation([FromBody] JObject record, int locationID)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    JToken asset = record["Asset"];
                    int assetID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", asset["AssetKey"].ToString());
                    AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                    new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
                    return Ok(assetLocation);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("{assetID:int}/Location/{locationID:int}")]
        public IHttpActionResult PostExistingLocationForAsset(int assetID, int locationID)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                    new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
                    return Ok(assetLocation);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("{assetID:int}/Meter/{meterID:int}")]
        public IHttpActionResult PostExistingMeterForAsset(int assetID, int meterID)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    MeterAsset meterAsset = new MeterAsset() { MeterID = meterID, AssetID = assetID };
                    new TableOperations<MeterAsset>(connection).AddNewRecord(meterAsset);
                    return Ok(meterAsset);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("{assetID:int}/ConnectedChannels")]
        public IHttpActionResult GetAssetChannels(int assetID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                try
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        Asset asset = new TableOperations<Asset>(connection).QueryRecordWhere("ID={0}", assetID);
                        if (asset is null)
                            throw (new Exception($"Asset ID={assetID} not found in OpenXDA database"));

                        asset.ConnectionFactory = () => (new AdoDataConnection(Connection));

                        List<Channel> connectedChannels = asset.ConnectedChannels;
                        connectedChannels.AddRange(asset.DirectChannels);

                        if (connectedChannels.Count > 0)
                        {
                            TableOperations<ChannelDetail> tableOp = new TableOperations<ChannelDetail>(connection);
                            // Channels get triplicated from Series Type ID in ChannelDetail View
                            IEnumerable<ChannelDetail> uniqueChannels = new TableOperations<ChannelDetail>(connection)
                            .QueryRecordsWhere($"ID in ({string.Join(", ", connectedChannels.Select(channels => channels.ID))})")
                            .DistinctBy(c => c.ID);

                            return Ok(uniqueChannels);
                        }
                        else
                        {
                            return Ok(new List<ChannelDetail>());
                        }
                    }
                } catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
            else
                return Unauthorized();
        }


        [HttpPost, Route("Edit")]
        public IHttpActionResult PostEditAssetForMeter([FromBody] JObject record)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    JToken asset = record["Asset"];
                    string assetType = asset["AssetType"].ToString();

                    if (assetType == "Line")
                    {
                        Line line = new TableOperations<Line>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateLineFromJToken(line, asset);
                        new TableOperations<Line>(connection).UpdateRecord(line);

                        if (asset["Segement"] != null)
                        {
                            LineSegment lineSegment = new TableOperations<LineSegment>(connection).QueryRecordWhere("ID = {0}", asset["Segment"]["ID"].ToObject<int>());
                            lineSegment.R0 = asset["Segment"]["R0"].ToObject<double>();
                            lineSegment.X0 = asset["Segment"]["X0"].ToObject<double>();
                            lineSegment.R1 = asset["Segment"]["R1"].ToObject<double>();
                            lineSegment.X1 = asset["Segment"]["X1"].ToObject<double>();
                            lineSegment.Length = asset["Segment"]["Length"].ToObject<double>();
                            lineSegment.ThermalRating = asset["Segment"]["ThermalRating"].ToObject<double>();

                            new TableOperations<LineSegment>(connection).UpdateRecord(lineSegment);
                        }
                    }
                    else if (assetType == "LineSegment")
                    {
                        LineSegment lineSegment = new TableOperations<LineSegment>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateLineSegmentFromJToken(lineSegment, asset);
                        new TableOperations<LineSegment>(connection).UpdateRecord(lineSegment);
                    }
                    else if (assetType == "Breaker")
                    {
                        Breaker breaker = new TableOperations<Breaker>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateBreakerFromJToken(breaker, asset);
                        new TableOperations<Breaker>(connection).UpdateRecord(breaker);

                        SCADAPoint point = new TableOperations<SCADAPoint>(connection).QueryRecordWhere("BreakerID = {0}", breaker.ID);
                        if (point == null && asset["SCADAPoint"] != null)
                        {
                            point = new SCADAPoint()
                            {
                                BreakerID = breaker.ID,
                                Point = asset["SCADAPoint"].ToString()
                            };
                            new TableOperations<SCADAPoint>(connection).AddNewRecord(point);
                        }
                        else if (point != null && asset["SCADAPoint"] == null)
                            new TableOperations<SCADAPoint>(connection).DeleteRecord(point);
                        else if (point != null && asset["SCADAPoint"] != null) {
                            if(point.Point != asset["SCADAPoint"].ToString())
                            {
                                point.Point = asset["SCADAPoint"].ToString();
                                new TableOperations<SCADAPoint>(connection).UpdateRecord(point);
                            }
                        }

                        AssetSpare assetSpare = new TableOperations<AssetSpare>(connection).QueryRecordWhere("AssetID = {0}", breaker.ID);
                        if (assetSpare == null && asset["SpareBreakerID"] != null && asset["SpareBreakerID"].ToObject<int?>() != null)
                        {
                            assetSpare = new AssetSpare()
                            {
                                AssetID = breaker.ID,
                                SpareAssetID = asset["SpareBreakerID"].ToObject<int>()
                            };
                            new TableOperations<AssetSpare>(connection).AddNewRecord(assetSpare);
                        }
                        else if (assetSpare != null && (asset["SpareBreakerID"] == null || asset["SpareBreakerID"].ToObject<int?>() == null))
                            new TableOperations<AssetSpare>(connection).DeleteRecord(assetSpare);
                        else if (assetSpare != null && asset["SpareBreakerID"] != null)
                        {
                            if (assetSpare.SpareAssetID != asset["SpareBreakerID"].ToObject<int>())
                            {
                                assetSpare.SpareAssetID = asset["SpareBreakerID"].ToObject<int>();
                                new TableOperations<AssetSpare>(connection).UpdateRecord(assetSpare);
                            }
                        }

                    }
                    else if (assetType == "Bus")
                    {
                        Bus bus = new TableOperations<Bus>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateBusFromJToken(bus, asset);
                        new TableOperations<Bus>(connection).UpdateRecord(bus);
                    }
                    else if (assetType == "Generation")
                    {
                        Generation gen = new TableOperations<Generation>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateGenFromJToken(gen, asset);
                        new TableOperations<Generation>(connection).UpdateRecord(gen);
                    }
                    else if (assetType == "StationAux")
                    {
                        StationAux aux = new TableOperations<StationAux>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateAuxFromJToken(aux, asset);
                        new TableOperations<StationAux>(connection).UpdateRecord(aux);
                    }
                    else if (assetType == "StationBattery")
                    {
                        StationBattery battery = new TableOperations<StationBattery>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateBatteryFromJToken(battery, asset);
                        new TableOperations<StationBattery>(connection).UpdateRecord(battery);
                    }
                    else if (assetType == "CapacitorBank")
                    {
                        CapBank capBank = new TableOperations<CapBank>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateCapBankFromJToken(capBank, asset);
                        new TableOperations<CapBank>(connection).UpdateRecord(capBank);
                    }
                    else if (assetType == "CapacitorBankRelay")
                    {
                        CapBankRelay capBankRelay = new TableOperations<CapBankRelay>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateCapBankRelayFromJToken(capBankRelay, asset);
                        new TableOperations<CapBankRelay>(connection).UpdateRecord(capBankRelay);
                    }
                    else if (assetType == "Transformer")
                    {
                        Transformer transformer = new TableOperations<Transformer>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateTransformerFromJToken(transformer, asset);
                        new TableOperations<Transformer>(connection).UpdateRecord(transformer);
                    }
                    else
                    {
                        Asset newAsset = new TableOperations<Asset>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateAssetFromJToken(newAsset, asset);
                        new TableOperations<Asset>(connection).UpdateRecord(newAsset);

                    }
                }

                return Ok("The asset was saved.");

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("{assetID:int}/Location/{locationID:int}")]
        public IHttpActionResult DeleteAssetLocation(int assetID, int locationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    new TableOperations<AssetLocation>(connection).DeleteRecordWhere("LocationID = {0} AND AssetID = {1}", locationID, assetID);

                    return Ok("Deleted");
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }


        [HttpDelete, Route("{assetID:int}/Meter/{meterID:int}")]
        public IHttpActionResult DeleteMeterLocation(int assetID, int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    new TableOperations<MeterAsset>(connection).DeleteRecordWhere("MeterID = {0} AND AssetID = {1}", meterID, assetID);

                    return Ok("Deleted");
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }

        [HttpDelete, Route("{assetOneID:int}/AssetConnection/{assetTwoID:int}")]
        public IHttpActionResult DeleteAssetConnections(int assetOneID, int assetTwoID)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    new TableOperations<AssetConnection>(connection).DeleteRecordWhere("(ChildID = {0} AND ParentID = {1}) OR (ParentID = {0} AND ChildID = {1})", assetOneID, assetTwoID);

                    return Ok("Deleted");
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }

        #region [ Model Creation Helper Functions ]
        private void CreateAssetFromJToken(Asset asset, JToken record)
        {
            asset.VoltageKV = record["VoltageKV"].ToObject<double>();
            asset.AssetKey = record["AssetKey"].ToString();
            asset.Description = record["Description"].ToString();
            asset.AssetName = record["AssetName"].ToString();
        }

        private void CreateLineFromJToken(Line line, JToken record) {
            line.VoltageKV = record["VoltageKV"].ToObject<double>();
            line.AssetKey = record["AssetKey"].ToString();
            line.Description = record["Description"].ToString();
            line.AssetName = record["AssetName"].ToString();
            line.MaxFaultDistance = record["MaxFaultDistance"].ToObject<double?>();
            line.MinFaultDistance = record["MinFaultDistance"].ToObject<double?>();
        }

        private void CreateLineSegmentFromJToken(LineSegment lineSegment, JToken record)
        {
            lineSegment.VoltageKV = record["VoltageKV"].ToObject<double>();
            lineSegment.AssetKey = record["AssetKey"].ToString();
            lineSegment.Description = record["Description"].ToString();
            lineSegment.AssetName = record["AssetName"].ToString();
            lineSegment.R0 = record["R0"].ToObject<double>();
            lineSegment.X0 = record["X0"].ToObject<double>();
            lineSegment.R1 = record["R1"].ToObject<double>();
            lineSegment.X1 = record["X1"].ToObject<double>();
            lineSegment.Length = record["Length"].ToObject<double>();
            lineSegment.ThermalRating = record["ThermalRating"].ToObject<double>();
        }

        private void CreateBreakerFromJToken(Breaker breaker, JToken record)
        {
            breaker.VoltageKV = record["VoltageKV"].ToObject<double>();
            breaker.AssetKey = record["AssetKey"].ToString();
            breaker.Description = record["Description"].ToString();
            breaker.AssetName = record["AssetName"].ToString();
            breaker.ThermalRating = record["ThermalRating"].ToObject<double>();
            breaker.Speed = record["Speed"].ToObject<double>();
            breaker.TripTime = record["TripTime"].ToObject<int>();
            breaker.PickupTime = record["PickupTime"].ToObject<int>();
            breaker.TripCoilCondition = record["TripCoilCondition"].ToObject<double>();
            breaker.Spare = record["Spare"].ToObject<bool>();
            breaker.AirGapResistor = record["AirGapResistor"].ToObject<bool>();
        }

        private void CreateBusFromJToken(Bus bus, JToken record)
        {
            bus.VoltageKV = record["VoltageKV"].ToObject<double>();
            bus.AssetKey = record["AssetKey"].ToString();
            bus.Description = record["Description"].ToString();
            bus.AssetName = record["AssetName"].ToString();
        }

        private void CreateGenFromJToken(Generation gen, JToken record)
        {
            gen.VoltageKV = record["VoltageKV"].ToObject<double>();
            gen.AssetKey = record["AssetKey"].ToString();
            gen.Description = record["Description"].ToString();
            gen.AssetName = record["AssetName"].ToString();
        }

        private void CreateAuxFromJToken(StationAux aux, JToken record)
        {
            aux.VoltageKV = record["VoltageKV"].ToObject<double>();
            aux.AssetKey = record["AssetKey"].ToString();
            aux.Description = record["Description"].ToString();
            aux.AssetName = record["AssetName"].ToString();
        }

        private void CreateBatteryFromJToken(StationBattery battery, JToken record)
        {
            battery.VoltageKV = record["VoltageKV"].ToObject<double>();
            battery.AssetKey = record["AssetKey"].ToString();
            battery.Description = record["Description"].ToString();
            battery.AssetName = record["AssetName"].ToString();
        }

        private void CreateCapBankFromJToken(CapBank capBank, JToken record)
        {
            capBank.VoltageKV = record["VoltageKV"].ToObject<double>();
            capBank.AssetKey = record["AssetKey"].ToString();
            capBank.Description = record["Description"].ToString();
            capBank.AssetName = record["AssetName"].ToString();
            capBank.NumberOfBanks = record["NumberOfBanks"].ToObject<int>();
            capBank.CapacitancePerBank = record["CapacitancePerBank"].ToObject<double>();

            capBank.CktSwitcher = record["CktSwitcher"].ToObject<string>();
            capBank.MaxKV = record["MaxKV"].ToObject<double>();
            capBank.UnitKV = record["UnitKV"].ToObject<double>();
            capBank.UnitKVAr = record["UnitKVAr"].ToObject<double>();
            capBank.NegReactanceTol = record["NegReactanceTol"].ToObject<double>();
            capBank.PosReactanceTol = record["PosReactanceTol"].ToObject<double>();
            capBank.Nparalell = record["Nparalell"].ToObject<int>();
            capBank.Nseries = record["Nseries"].ToObject<int>();
            capBank.NSeriesGroup = record["NSeriesGroup"].ToObject<int>();
            capBank.NParalellGroup = record["NParalellGroup"].ToObject<int>();
            capBank.Fused = record["Fused"].ToObject<bool>();
            capBank.VTratioBus = record["VTratioBus"].ToObject<double>();
            capBank.NumberLVCaps = record["NumberLVCaps"].ToObject<int>();
            capBank.NumberLVUnits = record["NumberLVUnits"].ToObject<int>();
            capBank.LVKVAr = record["LVKVAr"].ToObject<double>(); 
            capBank.LVKV = record["LVKV"].ToObject<double>();
            capBank.LVNegReactanceTol = record["LVNegReactanceTol"].ToObject<double>();
            capBank.LVPosReactanceTol = record["LVPosReactanceTol"].ToObject<double>();
            capBank.LowerXFRRatio = record["LowerXFRRatio"].ToObject<double>();
            capBank.Nshorted = record["Nshorted"].ToObject<double>();
            capBank.BlownFuses = record["BlownFuses"].ToObject<int>();
            capBank.BlownGroups = record["BlownGroups"].ToObject<int>();
            capBank.ShortedGroups = record["ShortedGroups"].ToObject<double>();
            capBank.NLowerGroups = record["NLowerGroups"].ToObject<int>();

            capBank.RelayPTRatioPrimary = record["RelayPTRatioPrimary"].ToObject<int>();
            capBank.RelayPTRatioSecondary = record["RelayPTRatioSecondary"].ToObject<int>();
            capBank.Sh = record["Sh"].ToObject<double>();
            capBank.Rv = record["Rv"].ToObject<double>();
            capBank.Rh = record["Rh"].ToObject<double>();
            capBank.Compensated = record["Compensated"].ToObject<bool>();

        }

        private void CreateCapBankRelayFromJToken(CapBankRelay capBankRelay, JToken record)
        {
            capBankRelay.VoltageKV = record["VoltageKV"].ToObject<double>();
            capBankRelay.AssetKey = record["AssetKey"].ToString();
            capBankRelay.Description = record["Description"].ToString();
            capBankRelay.AssetName = record["AssetName"].ToString();
            capBankRelay.OnVoltageThreshhold = record["OnVoltageThreshhold"].ToObject<double>();
            capBankRelay.CapBankNumber = record["CapBankNumber"].ToObject<int>();
        }

        private void CreateTransformerFromJToken(Transformer transformer, JToken record) {
            transformer.VoltageKV = record["VoltageKV"].ToObject<double>();
            transformer.AssetKey = record["AssetKey"].ToString();
            transformer.Description = record["Description"].ToString();
            transformer.AssetName = record["AssetName"].ToString();
            transformer.R0 = record["R0"].ToObject<double>();
            transformer.X0 = record["X0"].ToObject<double>();
            transformer.R1 = record["R1"].ToObject<double>();
            transformer.X1 = record["X1"].ToObject<double>();
            transformer.ThermalRating = record["ThermalRating"].ToObject<double>();
            transformer.PrimaryVoltageKV = record["PrimaryVoltageKV"].ToObject<double>();
            transformer.SecondaryVoltageKV = record["SecondaryVoltageKV"].ToObject<double>();
            transformer.TertiaryVoltageKV = record["TertiaryVoltageKV"].ToObject<double>();
            transformer.PrimaryWinding = record["PrimaryWinding"].ToObject<double>();
            transformer.SecondaryWinding = record["SecondaryWinding"].ToObject<double>();
            transformer.TertiaryWinding = record["TertiaryWinding"].ToObject<double>();
            transformer.Tap = record["Tap"].ToObject<double>();
        }

        ////Need to Override the external DB Function to return the list for all Assets
        //public override IHttpActionResult GetExtendedDataBases()
        //{

        //    using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //    {
        //        try
        //        {
        //            string query = @"SELECT MIN(UpdatedOn) AS lastUpdate, AdditionalField.ExternalDB AS name  
        //                            FROM 
        //                            AdditionalField LEFT JOIN AdditionalFieldValue ON AdditionalField.ID = AdditionalFieldValue.AdditionalFieldID
        //                            WHERE 
        //                                (AdditionalField.OpenXDAParentTable = 'LineSegment' OR  AdditionalField.OpenXDAParentTable = 'Line' OR
        //                                AdditionalField.OpenXDAParentTable = 'Bus' OR  AdditionalField.OpenXDAParentTable = 'Transformer' OR
        //                                AdditionalField.OpenXDAParentTable = 'Breaker' OR  AdditionalField.OpenXDAParentTable = 'CapBank')
        //                                AND AdditionalField.ExternalDB IS NOT NULL AND AdditionalField.ExternalDB <> ''
        //                            GROUP BY AdditionalField.ExternalDB";

        //            DataTable table = connection.RetrieveData(query);

        //            List<ExtDB> result = new List<ExtDB>();
        //            foreach (DataRow row in table.Rows)
        //            {
        //                result.Add(new ExtDB() { name = row.ConvertField<string>("name"), lastupdate = row.ConvertField<DateTime>("lastUpdate") });
        //            }

        //            return Ok(result);

        //        }
        //        catch (Exception ex)
        //        {
        //            return InternalServerError(ex);
        //        }
        //    }
        //}
        #endregion
    }

    [RoutePrefix("api/OpenXDA/DetailedMeterAsset")]
    public class DetailedMeterAssetController : ModelController<DetailedMeterAsset> { }
}