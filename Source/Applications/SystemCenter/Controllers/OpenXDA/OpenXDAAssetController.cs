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
using Newtonsoft.Json.Linq;
using openXDA.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/Asset")]
    public class OpenXDAAssetController : ModelController<Asset>
    {
        /*
         record fields for asset JObject Post records
         Asset: { ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Channels: Array<OpenXDA.Channel> 
            interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number,EDNAPoint?:string }
            interface Bus extends Asset { }
            interface CapBank extends Asset { NumberOfBanks: number, CansPerBank: number, CapacitancePerBank: number }
            interface Line extends Asset { MaxFaultDistance: number, MinFaultDistance: number, Segment: LineSegment }
            interface LineSegment extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number }
            interface Transformer extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, PrimaryVoltageKV: number, SecondaryVoltageKV: number, Tap: number }
          AssetConnections: List<{ ID: int, AssetRelationshipTypeID: int, Parent: string, Child: string }>
        */


        protected override string Connection { get; } = "dbOpenXDA";

        public class MeterSearch
        {
            public string Field { get; set; }
            public string SearchText { get; set; }
        }
        [HttpPost, Route("SearchableList")]
        public IHttpActionResult GetAssetsUsingSearchableList([FromBody] IEnumerable<MeterSearch> searches)
        {
            string whereClause = string.Join(" AND ", searches.Select(search => search.Field + " LIKE '%" + search.SearchText + "%'"));
            if (searches.Any())
                whereClause = "WHERE \n" + whereClause;

            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                DataTable table = connection.RetrieveData(@"
                    SELECT
	                DISTINCT
                        Asset.ID,
	                    Asset.AssetKey,
	                    Asset.AssetName,
	                    Asset.VoltageKV,
	                    AssetType.Name as AssetType,
	                    COUNT(Meter.ID) as Meters,
	                    COUNT(Location.ID) as Locations
                    FROM
	                    Asset Join
	                    AssetType ON Asset.AssetTypeID = AssetType.ID LEFT JOIN
	                    MeterAsset ON MeterAsset.AssetID = Asset.ID LEFT JOIN
	                    Meter ON MeterAsset.MeterID = Meter.ID LEFT JOIN
	                    AssetLocation ON AssetLocation.AssetID = Asset.ID LEFT JOIN
	                    Location ON AssetLocation.LocationID = Location.ID LEFT JOIN
	                    Note ON Note.NoteTypeID = (SELECT ID FROM NoteType WHERE Name = 'Asset') AND Note.ReferenceTableID = Meter.ID
                   " + whereClause + @"
                    GROUP BY
                         Asset.ID,
	                    Asset.AssetKey,
	                    Asset.AssetName,
	                    Asset.VoltageKV,
	                    AssetType.Name,
                        Note.Note
                ");
                return Ok(table);
            }
        }



        [HttpPost, Route("New/Meter/{meterID:int}/{locationID:int}")]
        public IHttpActionResult PostNewAssetForMeter([FromBody] JObject record, int meterID, int locationID)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope()) {
                    using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
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

                            if (asset["EDNAPoint"] != null)
                            {
                                EDNAPoint eDNAPoint = new EDNAPoint()
                                {
                                    BreakerID = breaker.ID,
                                    Point = asset["EDNAPoint"].ToString()
                                };
                                new TableOperations<EDNAPoint>(connection).AddNewRecord(eDNAPoint);

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
                        else if (assetType == "CapacitorBank")
                        {
                            CapBank capBank = new CapBank();
                            CreateCapBankFromJToken(capBank, asset);
                            new TableOperations<CapBank>(connection).AddNewRecord(capBank);
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


                        int assetID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", asset["AssetKey"].ToString());
                        MeterAsset meterAsset = new MeterAsset() { MeterID = meterID, AssetID = assetID };
                        new TableOperations<MeterAsset>(connection).AddNewRecord(meterAsset);
                        AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                        new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
                    }

                    scope.Complete();
                    return Ok();

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
                    using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
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

                            if (asset["EDNAPoint"] != null)
                            {
                                EDNAPoint eDNAPoint = new EDNAPoint()
                                {
                                    BreakerID = breaker.ID,
                                    Point = asset["EDNAPoint"].ToString()
                                };
                                new TableOperations<EDNAPoint>(connection).AddNewRecord(eDNAPoint);
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
                        else if (assetType == "CapacitorBank")
                        {
                            CapBank capBank = new CapBank();
                            CreateCapBankFromJToken(capBank, asset);
                            new TableOperations<CapBank>(connection).AddNewRecord(capBank);
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


                        int assetID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", asset["AssetKey"].ToString());
                        AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                        new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
                    }

                    scope.Complete();
                    return Ok();

                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



        [HttpPost, Route("Existing/Meter/{meterID:int}/{locationID:int}")]
        public IHttpActionResult PostExistingAssetForMeter([FromBody] JObject record, int meterID, int locationID)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                    {
                        JToken asset = record["Asset"];
                        int assetID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", asset["AssetKey"].ToString());
                        MeterAsset meterAsset = new MeterAsset() { MeterID = meterID, AssetID = assetID };
                        new TableOperations<MeterAsset>(connection).AddNewRecord(meterAsset);
                        AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                        new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
                    }
                    scope.Complete();
                    return Ok();
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
                using (TransactionScope scope = new TransactionScope())
                {
                    using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                    {
                        JToken asset = record["Asset"];
                        int assetID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", asset["AssetKey"].ToString());
                        AssetLocation assetLocation = new AssetLocation() { LocationID = locationID, AssetID = assetID };
                        new TableOperations<AssetLocation>(connection).AddNewRecord(assetLocation);
                    }
                    scope.Complete();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPost, Route("Edit")]
        public IHttpActionResult PostEditAssetForMeter([FromBody] JObject record)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                {
                    JToken asset = record["Asset"];
                    string assetType = asset["AssetType"].ToString();

                    if (assetType == "Line")
                    {
                        Line line = new TableOperations<Line>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateLineFromJToken(line, asset);
                        new TableOperations<Line>(connection).UpdateRecord(line);

                        LineSegment lineSegment = new TableOperations<LineSegment>(connection).QueryRecordWhere("ID = {0}", asset["Segment"]["ID"].ToObject<int>());
                        lineSegment.R0 = asset["Segment"]["R0"].ToObject<double>();
                        lineSegment.X0 = asset["Segment"]["X0"].ToObject<double>();
                        lineSegment.R1 = asset["Segment"]["R1"].ToObject<double>();
                        lineSegment.X1 = asset["Segment"]["X1"].ToObject<double>();
                        lineSegment.Length = asset["Segment"]["Length"].ToObject<double>();
                        lineSegment.ThermalRating = asset["Segment"]["ThermalRating"].ToObject<double>();

                        new TableOperations<LineSegment>(connection).UpdateRecord(lineSegment);
                    }
                    else if (assetType == "LineSegment")
                    {
                        LineSegment lineSegment = new TableOperations<LineSegment>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateLineSegmentFromJToken(lineSegment, record);
                        new TableOperations<LineSegment>(connection).UpdateRecord(lineSegment);
                    }
                    else if (assetType == "Breaker")
                    {
                        Breaker breaker = new TableOperations<Breaker>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateBreakerFromJToken(breaker, asset);
                        new TableOperations<Breaker>(connection).UpdateRecord(breaker);

                        EDNAPoint eDNAPoint = new TableOperations<EDNAPoint>(connection).QueryRecordWhere("BreakerID = {0}", breaker.ID);
                        if (eDNAPoint == null && asset["EDNAPoint"] != null)
                        {
                            eDNAPoint = new EDNAPoint()
                            {
                                BreakerID = breaker.ID,
                                Point = asset["EDNAPoint"].ToString()
                            };
                            new TableOperations<EDNAPoint>(connection).AddNewRecord(eDNAPoint);
                        }
                        else if (eDNAPoint != null && asset["EDNAPoint"] == null)
                            new TableOperations<EDNAPoint>(connection).DeleteRecord(eDNAPoint);
                        else if (eDNAPoint != null && asset["EDNAPoint"] != null) {
                            if(eDNAPoint.Point != asset["EDNAPoint"].ToString())
                            {
                                eDNAPoint.Point = asset["EDNAPoint"].ToString();
                                new TableOperations<EDNAPoint>(connection).UpdateRecord(eDNAPoint);
                            }
                        }

                        AssetSpare assetSpare = new TableOperations<AssetSpare>(connection).QueryRecordWhere("AssetID = {0}", breaker.ID);
                        if (assetSpare == null && asset["SpareBreakerID"] != null)
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
                    else if (assetType == "CapacitorBank")
                    {
                        CapBank capBank = new TableOperations<CapBank>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        CreateCapBankFromJToken(capBank, asset);
                        new TableOperations<CapBank>(connection).UpdateRecord(capBank);
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

                return Ok();

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("{assetID:int}/Location/{locationID:int}")]
        public IHttpActionResult DeleteAssetLocation(int assetID, int locationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                try
                {
                    new TableOperations<AssetLocation>(connection).DeleteRecordWhere("LocationID = {0} AND AssetID = {1}", locationID, assetID);

                    return Ok();
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
            breaker.TripTime = record["TripTime"].ToObject<int?>();
            breaker.PickupTime = record["PickupTime"].ToObject<int?>();
            breaker.TripCoilCondition = record["TripCoilCondition"].ToObject<double?>();
            breaker.Spare = record["Spare"].ToObject<bool>();
        }

        private void CreateBusFromJToken(Bus bus, JToken record)
        {
            bus.VoltageKV = record["VoltageKV"].ToObject<double>();
            bus.AssetKey = record["AssetKey"].ToString();
            bus.Description = record["Description"].ToString();
            bus.AssetName = record["AssetName"].ToString();
        }

        private void CreateCapBankFromJToken(CapBank capBank, JToken record)
        {
            capBank.VoltageKV = record["VoltageKV"].ToObject<double>();
            capBank.AssetKey = record["AssetKey"].ToString();
            capBank.Description = record["Description"].ToString();
            capBank.AssetName = record["AssetName"].ToString();
            capBank.NumberOfBanks = record["NumberOfBanks"].ToObject<int>();
            capBank.CansPerBank = record["CansPerBank"].ToObject<int>();
            capBank.CapacitancePerBank = record["CapacitancePerBank"].ToObject<double>();
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
            transformer.Tap = record["Tap"].ToObject<double>();
        }
        #endregion
    }

    [RoutePrefix("api/OpenXDA/Line")]
    public class LineController : ModelController<Line>
    {
        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("{lineID:int}/LineSegment")]
        public IHttpActionResult GetLineSegmentForLine(int lineID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                LineSegment record = new TableOperations<LineSegment>(connection).QueryRecordWhere("ID = (select ChildID from AssetRelationship where AssetRelationshipTypeID = (SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment') AND ParentID = {0})", lineID);
                return Ok(record);
            }

        }

    }

    [RoutePrefix("api/OpenXDA/Breaker")]
    public class BreakerController : ModelController<Breaker>
    {
        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("{breakerID:int}/EDNAPoint")]
        public IHttpActionResult GetEDNAPoinsForBreaker(int breakerID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                EDNAPoint record = new TableOperations<EDNAPoint>(connection).QueryRecordWhere("BreakerID = {0}", breakerID);
                return Ok(record);
            }
        }

        [HttpGet, Route("{breakerID:int}/SpareBreaker")]
        public IHttpActionResult GetSpareBreakerForBreaker(int breakerID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                Breaker record = new TableOperations<Breaker>(connection).QueryRecordWhere("ID = (SELECT SpareAssetID FROM AssetSpare WHERE AssetID = {0})", breakerID);
                return Ok(record);
            }
        }

        [HttpGet, Route("{breakerID:int}/SpareBreakersForSubstation")]
        public IHttpActionResult SpareBreakersForSubstationForBreaker(int breakerID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Breaker> record = new TableOperations<Breaker>(connection).QueryRecordsWhere(@"
                    Spare=1 AND ID IN 
                    (SELECT AssetID FROM AssetLocation WHERE LocationID = 
                        (
                            SELECT 
                             LocationID
                            FROM
                                Asset JOIN
                                AssetLocation ON Asset.ID = AssetLocation.AssetID
                            WHERE
                                Asset.ID = {0}
                        )
                    )
                ", breakerID);
                return Ok(record);
            }
        }

        [HttpGet, Route("SpareBreakers/Substation/{locationID:int}")]
        public IHttpActionResult SpareBreakersForSubstation(int locationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Breaker> record = new TableOperations<Breaker>(connection).QueryRecordsWhere(@"
                    Spare=1 AND ID IN 
                    (SELECT AssetID FROM AssetLocation WHERE LocationID = {0})
                ", locationID);
                return Ok(record);
            }
        }

        [HttpGet, Route("{breakerID:int}/Location")]
        public IHttpActionResult GetLocationForAsset(int breakerID)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    Location record = new TableOperations<Location>(connection).QueryRecordWhere("ID IN (SELECT LocationID FROM AssetLocation WHERE AssetID = {0})", breakerID);
                    return Ok(record);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }

    }





    [RoutePrefix("api/OpenXDA/Bus")]
    public class BusController : ModelController<Bus>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/CapacitorBank")]
    public class CapBankController : ModelController<CapBank>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/LineSegment")]
    public class LineSegmentController : ModelController<LineSegment>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/Transformer")]
    public class TransformerController : ModelController<Transformer>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

}