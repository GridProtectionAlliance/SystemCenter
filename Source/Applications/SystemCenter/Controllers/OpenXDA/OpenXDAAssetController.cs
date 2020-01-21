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
        protected override string Connection { get; } = "dbOpenXDA";
        /*
         record fields
         Asset: { ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Channels: Array<OpenXDA.Channel> 
            interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number,EDNAPoint?:string }
            interface Bus extends Asset { }
            interface CapBank extends Asset { NumberOfBanks: number, CansPerBank: number, CapacitancePerBank: number }
            interface Line extends Asset { MaxFaultDistance: number, MinFaultDistance: number, Segment: LineSegment }
            interface LineSegment extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number }
            interface Transformer extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, PrimaryVoltageKV: number, SecondaryVoltageKV: number, Tap: number }
          AssetConnections: List<{ ID: int, AssetRelationshipTypeID: int, Parent: string, Child: string }>
        */
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
                            Line line = new Line()
                            {
                                VoltageKV = asset["VoltageKV"].ToObject<double>(),
                                AssetKey = asset["AssetKey"].ToString(),
                                Description = asset["Description"].ToString(),
                                AssetName = asset["AssetName"].ToString(),
                                AssetTypeID = assetTypeID,
                                MaxFaultDistance = asset["MaxFaultDistance"].ToObject<double>(),
                                MinFaultDistance = asset["MinFaultDistance"].ToObject<double>()
                            };

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
                            LineSegment lineSegment = new LineSegment()
                            {
                                VoltageKV = asset["VoltageKV"].ToObject<double>(),
                                AssetKey = asset["AssetKey"].ToString() + "LineSegment",
                                Description = asset["Description"].ToString(),
                                AssetName = asset["AssetName"].ToString(),
                                AssetTypeID = assetTypeID,
                                R0 = asset["R0"].ToObject<double>(),
                                X0 = asset["X0"].ToObject<double>(),
                                R1 = asset["R1"].ToObject<double>(),
                                X1 = asset["X1"].ToObject<double>(),
                                Length = asset["Length"].ToObject<double>(),
                            };

                            new TableOperations<LineSegment>(connection).AddNewRecord(lineSegment);
                        }
                        else if (assetType == "Breaker")
                        {
                            Breaker breaker = new Breaker()
                            {
                                VoltageKV = asset["VoltageKV"].ToObject<double>(),
                                AssetKey = asset["AssetKey"].ToString(),
                                Description = asset["Description"].ToString(),
                                AssetName = asset["AssetName"].ToString(),
                                AssetTypeID = assetTypeID,
                                ThermalRating = asset["ThermalRating"].ToObject<double>(),
                                Speed = asset["Speed"].ToObject<double>(),
                                TripTime = asset["TripTime"].ToObject<int?>(),
                                PickupTime = asset["PickupTime"].ToObject<int?>(),
                                TripCoilCondition = asset["TripCoilCondition"].ToObject<double>(),
                                Spare = asset["Spare"].ToObject<bool>(),

                            };

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

                        }
                        else if (assetType == "Bus")
                        {
                            Bus bus = new Bus()
                            {
                                VoltageKV = asset["VoltageKV"].ToObject<double>(),
                                AssetKey = asset["AssetKey"].ToString(),
                                Description = asset["Description"].ToString(),
                                AssetName = asset["AssetName"].ToString(),
                                AssetTypeID = assetTypeID
                            };
                            new TableOperations<Bus>(connection).AddNewRecord(bus);
                        }
                        else if (assetType == "CapacitorBank")
                        {
                            CapBank capBank = new CapBank()
                            {
                                VoltageKV = asset["VoltageKV"].ToObject<double>(),
                                AssetKey = asset["AssetKey"].ToString(),
                                Description = asset["Description"].ToString(),
                                AssetName = asset["AssetName"].ToString(),
                                AssetTypeID = assetTypeID,
                                NumberOfBanks = asset["NumberOfBanks"].ToObject<int>(),
                                CansPerBank = asset["CansPerBank"].ToObject<int>(),
                                CapacitancePerBank = asset["CapacitancePerBank"].ToObject<double>(),
                            };
                            new TableOperations<CapBank>(connection).AddNewRecord(capBank);
                        }
                        else if (assetType == "Transformer")
                        {
                            Transformer transformer = new Transformer()
                            {
                                VoltageKV = asset["VoltageKV"].ToObject<double>(),
                                AssetKey = asset["AssetKey"].ToString(),
                                Description = asset["Description"].ToString(),
                                AssetName = asset["AssetName"].ToString(),
                                AssetTypeID = assetTypeID,
                                R0 = asset["R0"].ToObject<double>(),
                                X0 = asset["X0"].ToObject<double>(),
                                R1 = asset["R1"].ToObject<double>(),
                                X1 = asset["X1"].ToObject<double>(),
                                ThermalRating = asset["ThermalRating"].ToObject<double>(),
                                PrimaryVoltageKV = asset["PrimaryVoltageKV"].ToObject<double>(),
                                SecondaryVoltageKV = asset["SecondaryVoltageKV"].ToObject<double>(),
                                Tap = asset["Tap"].ToObject<double>(),

                            };

                            new TableOperations<Transformer>(connection).AddNewRecord(transformer);
                        }
                        else
                        {
                            Asset newAsset = new Asset()
                            {
                                VoltageKV = asset["VoltageKV"].ToObject<double>(),
                                AssetKey = asset["AssetKey"].ToString(),
                                Description = asset["Description"].ToString(),
                                AssetName = asset["AssetName"].ToString(),
                                AssetTypeID = assetTypeID
                            };
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

        /*
        record fields
        Asset: { ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Channels: Array<OpenXDA.Channel> 
        interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number,EDNAPoint?:string }
        interface Bus extends Asset { }
        interface CapBank extends Asset { NumberOfBanks: number, CansPerBank: number, CapacitancePerBank: number }
        interface Line extends Asset { MaxFaultDistance: number, MinFaultDistance: number, Segment: LineSegment }
        interface LineSegment extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number }
        interface Transformer extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, PrimaryVoltageKV: number, SecondaryVoltageKV: number, Tap: number }
        AssetConnections: List<{ ID: int, AssetRelationshipTypeID: int, Parent: string, Child: string }>
        */
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

        /*
        record fields
        Asset: { ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Channels: Array<OpenXDA.Channel> 
        interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number,EDNAPoint?:string }
        interface Bus extends Asset { }
        interface CapBank extends Asset { NumberOfBanks: number, CansPerBank: number, CapacitancePerBank: number }
        interface Line extends Asset { MaxFaultDistance: number, MinFaultDistance: number, Segment: LineSegment }
        interface LineSegment extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number }
        interface Transformer extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, PrimaryVoltageKV: number, SecondaryVoltageKV: number, Tap: number }
        AssetConnections: List<{ ID: int, AssetRelationshipTypeID: int, Parent: string, Child: string }>
        */
        [HttpPost, Route("Edit/Meter")]
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
                        line.VoltageKV = asset["VoltageKV"].ToObject<double>();
                        line.AssetKey = asset["AssetKey"].ToString();
                        line.Description = asset["Description"].ToString();
                        line.AssetName = asset["AssetName"].ToString();
                        line.MaxFaultDistance = asset["MaxFaultDistance"].ToObject<double>();
                        line.MinFaultDistance = asset["MinFaultDistance"].ToObject<double>();

                        new TableOperations<Line>(connection).UpdateRecord(line);

                        LineSegment lineSegment = new TableOperations<LineSegment>(connection).QueryRecordWhere("ID = {0}", asset["Segment"]["ID"].ToObject<int>());
                        lineSegment.R0 = asset["Segment"]["R0"].ToObject<double>();
                        lineSegment.X0 = asset["Segment"]["X0"].ToObject<double>();
                        lineSegment.R1 = asset["Segment"]["R1"].ToObject<double>();
                        lineSegment.X1 = asset["Segment"]["X1"].ToObject<double>();
                        lineSegment.Length = asset["Segment"]["Length"].ToObject<double>();

                        new TableOperations<LineSegment>(connection).UpdateRecord(lineSegment);
                    }
                    else if (assetType == "LineSegment")
                    {
                        LineSegment lineSegment = new TableOperations<LineSegment>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        lineSegment.VoltageKV = asset["VoltageKV"].ToObject<double>();
                        lineSegment.AssetKey = asset["AssetKey"].ToString() + "LineSegment";
                        lineSegment.Description = asset["Description"].ToString();
                        lineSegment.AssetName = asset["AssetName"].ToString();
                        lineSegment.R0 = asset["R0"].ToObject<double>();
                        lineSegment.X0 = asset["X0"].ToObject<double>();
                        lineSegment.R1 = asset["R1"].ToObject<double>();
                        lineSegment.X1 = asset["X1"].ToObject<double>();
                        lineSegment.Length = asset["Length"].ToObject<double>();

                        new TableOperations<LineSegment>(connection).UpdateRecord(lineSegment);
                    }
                    else if (assetType == "Breaker")
                    {
                        Breaker breaker = new TableOperations<Breaker>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        breaker.VoltageKV = asset["VoltageKV"].ToObject<double>();
                        breaker.AssetKey = asset["AssetKey"].ToString();
                        breaker.Description = asset["Description"].ToString();
                        breaker.AssetName = asset["AssetName"].ToString();
                        breaker.ThermalRating = asset["ThermalRating"].ToObject<double>();
                        breaker.Speed = asset["Speed"].ToObject<double>();
                        breaker.TripTime = asset["TripTime"].ToObject<int?>();
                        breaker.PickupTime = asset["PickupTime"].ToObject<int?>();
                        breaker.TripCoilCondition = asset["TripCoilCondition"].ToObject<double>();
                        breaker.Spare = asset["Spare"].ToObject<bool>();

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

                    }
                    else if (assetType == "Bus")
                    {
                        Bus bus = new TableOperations<Bus>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        bus.VoltageKV = asset["VoltageKV"].ToObject<double>();
                        bus.AssetKey = asset["AssetKey"].ToString();
                        bus.Description = asset["Description"].ToString();
                        bus.AssetName = asset["AssetName"].ToString();
                        new TableOperations<Bus>(connection).UpdateRecord(bus);
                    }
                    else if (assetType == "CapacitorBank")
                    {
                        CapBank capBank = new TableOperations<CapBank>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        capBank.VoltageKV = asset["VoltageKV"].ToObject<double>();
                        capBank.AssetKey = asset["AssetKey"].ToString();
                        capBank.Description = asset["Description"].ToString();
                        capBank.AssetName = asset["AssetName"].ToString();
                        capBank.NumberOfBanks = asset["NumberOfBanks"].ToObject<int>();
                        capBank.CansPerBank = asset["CansPerBank"].ToObject<int>();
                        capBank.CapacitancePerBank = asset["CapacitancePerBank"].ToObject<double>();
                        new TableOperations<CapBank>(connection).UpdateRecord(capBank);
                    }
                    else if (assetType == "Transformer")
                    {
                        Transformer transformer = new TableOperations<Transformer>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        transformer.VoltageKV = asset["VoltageKV"].ToObject<double>();
                        transformer.AssetKey = asset["AssetKey"].ToString();
                        transformer.Description = asset["Description"].ToString();
                        transformer.AssetName = asset["AssetName"].ToString();
                        transformer.R0 = asset["R0"].ToObject<double>();
                        transformer.X0 = asset["X0"].ToObject<double>();
                        transformer.R1 = asset["R1"].ToObject<double>();
                        transformer.X1 = asset["X1"].ToObject<double>();
                        transformer.ThermalRating = asset["ThermalRating"].ToObject<double>();
                        transformer.PrimaryVoltageKV = asset["PrimaryVoltageKV"].ToObject<double>();
                        transformer.SecondaryVoltageKV = asset["SecondaryVoltageKV"].ToObject<double>();
                        transformer.Tap = asset["Tap"].ToObject<double>();
                        new TableOperations<Transformer>(connection).UpdateRecord(transformer);
                    }
                    else
                    {
                        Asset newAsset = new TableOperations<Asset>(connection).QueryRecordWhere("ID = {0}", asset["ID"].ToObject<int>());
                        newAsset.VoltageKV = asset["VoltageKV"].ToObject<double>();
                        newAsset.AssetKey = asset["AssetKey"].ToString();
                        newAsset.Description = asset["Description"].ToString();
                        newAsset.AssetName = asset["AssetName"].ToString();
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