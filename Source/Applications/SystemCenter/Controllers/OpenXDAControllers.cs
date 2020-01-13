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
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Net.Security;
using GSF.Security.Model;
using GSF.Web;
using GSF.Web.Security;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using System.Transactions;
using System.Data.SqlClient;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/OpenXDA/AssetConnection")]
    public class AssetConnectionController : ModelController<openXDA.Model.AssetConnection>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/AssetConnectionType")]
    public class AssetConnectionTypeController : ModelController<openXDA.Model.AssetConnectionType>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/AssetType")]
    public class AssetTypeController : ModelController<openXDA.Model.AssetTypes>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/Phase")]
    public class PhaseController:ModelController<Phase> {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/MeasurementType")]
    public class MeasurementTypeController:ModelController<MeasurementType> {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/Asset")]
    public class AssetController : ModelController<Asset>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/Meter")]
    public class MeterController : ModelController<Meter> {
        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("Line/{lineID:int}")]
        public IHttpActionResult GetMetersForLine(int lineID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("ID IN ( SELECT MeterID FROM MeterLine WHERE LineID = {0})", lineID);
                return Ok(records);
            }
        }

        [HttpGet, Route("MeterLocation/{meterLocationID:int}")]
        public IHttpActionResult GetMetersForMeterLocation(int meterLocationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("MeterLocationID = {0}", meterLocationID);
                return Ok(records);
            }
        }

        public override IHttpActionResult Post([FromBody] Meter record)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                base.Post(record);
                record = new TableOperations<Meter>(connection).QueryRecordWhere("AssetKey = {0}", record.AssetKey);
                return Ok(record);
            }
        }
        /*
         record fields
         MeterInfo: { ID: int, AssetKey: string, Alias: string, Make: string, Model: string, Name: string, ShortName: string, TimeZone: string, LocationID: int, Description: string }
         LocationInfo:  { ID: int, LocationKey: string, Name: string, Alias: string, Latitude: double, Longitude: double, Description: string, ShortName: string }
         Channels: List<{ ID: number, Meter: string, Asset: string, MeasurementType: string, Measurementcharacteristic: string, Phase: string, Name: string, SamplesPerHour: number, PerUnitValue: number, HarmonicGroup: number, Description: string, Enabled: boolean, Series: { ID: number, ChannelID: number, SeriesType: string, SourceIndexes: string } }>
         Assets: List<{ ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Channels: Array<OpenXDA.Channel> }>
            interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number }
            interface Bus extends Asset { }
            interface CapBank extends Asset { NumberOfBanks: number, CansPerBank: number, CapacitancePerBank: number }
            interface Line extends Asset { MaxFaultDistance: number, MinFaultDistance: number, Segment: LineSegment }
            interface LineSegment extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number }
            interface Transformer extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, PrimaryVoltageKV: number, SecondaryVoltageKV: number, Tap: number }
          AssetConnections: List<{ ID: int, AssetRelationshipTypeID: int, Parent: string, Child: string }>
             */
        [HttpPost, Route("New")]
        public IHttpActionResult PostNewMeter([FromBody] JObject record)
        {
            try
            {
                string commandText = @"";
                using (TransactionScope scope = new TransactionScope()) {
                    using(AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                    using (SqlConnection connection1 = new SqlConnection(connection.Connection.ConnectionString))
                    {
                        Meter meter = record["MeterInfo"].ToObject<Meter>();
                        Location location = record["LocationInfo"].ToObject<Location>();

                        // Opening the connection automatically enlists it in the 
                        // TransactionScope as a lightweight transaction.
                        connection1.Open();

                        // Create the SqlCommand object and execute the first command.
                        SqlCommand command = new SqlCommand(commandText, connection1);
                        command.ExecuteNonQuery();
                    }

                    // The Complete method commits the transaction. If an exception has been thrown,
                    // Complete is not  called and the transaction is rolled back.
                    scope.Complete();
                }

                //using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
                //using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
                //{
                //    Location meterLocation = record["MeterLocation"].ToObject<Location>();
                //    Meter meter = record["Meter"].ToObject<Meter>();

                //    if (meterLocation.ID == 0)
                //    {
                //        new TableOperations<Location>(connXDA).AddNewRecord(meterLocation);
                //        meter.LocationID = new TableOperations<Location>(connXDA).QueryRecordWhere("AssetKey = {0}", meterLocation.LocationKey).ID;
                //        int mlassetTypeID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'Station'");
                //        int mlassetTypeFieldID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.MeterLocation.ID'");

                //        new TableOperations<Asset>(connSS).AddNewRecord(new Asset() { AssetKey = meterLocation.LocationKey, AssetTypeID = mlassetTypeID });
                //        int mlassetID = connSS.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", meterLocation.LocationKey);
                //        //new TableOperations<AssetTypeFieldValue>(connSS).AddNewRecord(new AssetTypeFieldValue() { AssetID = mlassetID, AssetTypeFieldID = mlassetTypeFieldID, Value = meter.LocationID.ToString() });

                //    }
                //    base.Post(meter);
                //    meter = new TableOperations<Meter>(connXDA).QueryRecordWhere("AssetKey = {0}", meter.AssetKey);


                //    int assetTypeID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'Meter'");
                //    int assetTypeFieldID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.Meter.ID'");

                //    new TableOperations<Asset>(connSS).AddNewRecord(new Asset() { AssetKey = meter.AssetKey, AssetTypeID = assetTypeID});
                //    int assetID = connSS.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", meter.AssetKey);
                //    //new TableOperations<AssetTypeFieldValue>(connSS).AddNewRecord(new AssetTypeFieldValue() { AssetID = assetID, AssetTypeFieldID = assetTypeFieldID, Value = meter.ID.ToString()});

                return Ok();
                

            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("PQViewSite/{meterID:int}")]
        public IHttpActionResult GetPQViewSite(int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                PQViewSite record = new TableOperations<PQViewSite>(connection).QueryRecordWhere("MeterID = {0}", meterID);
                return Ok(record);
            }
        }



        [HttpPost, Route("PQViewSite")]
        public IHttpActionResult PostPQViewSite([FromBody] PQViewSite record)
        {
            try
            {
                using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
                {

                    if (record.SiteID != null)
                    {
                        new TableOperations<PQViewSite>(connXDA).AddNewOrUpdateRecord(record);
                    }
                    else
                    {
                        //connXDA.ExecuteNonQuery("DELETE FROM PQViewSite WHERE MeterID = {0}", record.MeterID);
                    }
                    return Ok();
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("MeterLocation/Delete")]
        public IHttpActionResult DeleteMeterLocation(Meter record)
        {
            try
            {
                using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
                using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
                {
                    int assetID = connSS.ExecuteScalar<int>("SELECT AssetID FROM AssetTypeFieldValue WHERE AssetTypeFieldID = (SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.MeterLocation.ID') AND Value = {0}", record.LocationID.ToString());
                    connSS.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'Asset', 'ID = {assetID}'");
                    int tempMeterLocationID = connXDA.ExecuteScalar<int>("SELECT TOP 1 ID FROM MeterLocation");
                    connXDA.ExecuteNonQuery("UPDATE Meter SET MeterLocationID = {0} WHERE ID = {1}", tempMeterLocationID, record.ID);
                    LocationController meterLocationController = new LocationController();
                    Location meterLocation = new TableOperations<Location>(connXDA).QueryRecordWhere("ID = {0}", record.LocationID);
                    meterLocationController.Delete(meterLocation);
                    Location newMeterLocation = new TableOperations<Location>(connXDA).QueryRecordWhere("ID = {0}", tempMeterLocationID);
                    return Ok(newMeterLocation);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        public override IHttpActionResult Delete(Meter record)
        {
            try
            {
                using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
                {
                    int assetID = connSS.ExecuteScalar<int>("SELECT AssetID FROM AssetTypeFieldValue WHERE AssetTypeFieldID = (SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.Meter.ID') AND Value = {0}", record.ID.ToString());
                    connSS.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'Asset', 'ID = {assetID}'");
                    return base.Delete(record);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
    }

    [RoutePrefix("api/OpenXDA/Location")]
    public class LocationController : ModelController<Location> {
        protected override string Connection { get; } = "dbOpenXDA";
    }
    
    [RoutePrefix("api/OpenXDA/Line")]
    public class LineController : ModelController<Line> {
        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("Meter/{meterID:int}")]
        public IHttpActionResult GetLinesForMeter(int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Line> records = new TableOperations<Line>(connection).QueryRecordsWhere("ID IN ( SELECT LineID FROM MeterLine WHERE MeterID = {0})", meterID);
                return Ok(records);
            }
        }

        [HttpGet, Route("AllLines")]
        public IHttpActionResult GetAllLines()
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                DataTable records = connection.RetrieveData(@"
                    SELECT
	                    Line.ID,
	                    Line.AssetKey,
	                    Line.VoltageKV,
	                    Line.ThermalRating,
	                    Line.Length,
	                    Line.Description,
	                    Line.MaxFaultDistance,
	                    Line.MinFaultDistance,
                        LineImpedance.ID as LineImpedanceID,
	                    LineImpedance.R0,
	                    LineImpedance.X0,
	                    LineImpedance.R1,
	                    LineImpedance.X1,
                        '' as LineName
                    FROM
	                    Line LEFT JOIN
	                    LineImpedance ON Line.ID = LineImpedance.LineID
                ");
                return Ok(records);
            }
        }


        [HttpGet, Route("MeterLocation/{meterLocationID:int}")]
        public IHttpActionResult GetMetersForMeterLocation(int meterLocationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("MeterLocationID = {0}", meterLocationID);
                return Ok(records);
            }
        }

        public class PostMeterLineContent {
            public Line Line { get; set; }
            public MeterAsset MeterAsset { get; set; }
            //public LineImpedance LineImpedance { get; set; }
        }
        [HttpPost, Route("MeterLine")]
        public IHttpActionResult PostMeterLine([FromBody]PostMeterLineContent content)
        {
            using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
            using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
            {
                new TableOperations<Line>(connXDA).AddNewOrUpdateRecord(content.Line);

                //content.LineImpedance.LineID = content.MeterLine.LineID = content.Line.ID = new TableOperations<Line>(connXDA).QueryRecordWhere("AssetKey = {0}", content.Line.AssetKey).ID;
                //new TableOperations<LineImpedance>(connXDA).AddNewOrUpdateRecord(content.LineImpedance);

                //new TableOperations<MeterLine>(connXDA).AddNewRecord(content.MeterLine);


                //int assetTypeID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'Line'");
                //int assetTypeFieldID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.Line.ID'");

                //new TableOperations<Asset>(connSS).AddNewRecord(new Asset() { AssetKey = content.Line.AssetKey, AssetTypeID = assetTypeID });
                //int assetID = connSS.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", content.Line.AssetKey);
                //new TableOperations<AssetTypeFieldValue>(connSS).AddNewRecord(new AssetTypeFieldValue() { AssetID = assetID, AssetTypeFieldID = assetTypeFieldID, Value = content.Line.ID.ToString() });

                return Ok();
            }
        }

        public override IHttpActionResult Post([FromBody] Line record)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                base.Post(record);
                record = new TableOperations<Line>(connection).QueryRecordWhere("AssetKey = {0}", record.AssetKey);
                return Ok(record);
            }
        }

        //[HttpGet, Route("EDNAPoints/{lineID:int}")]
        //public IHttpActionResult GetEDNAPointsForLine(int lineID)
        //{
        //    using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
        //    {
        //        IEnumerable<EDNAPoint> records = new TableOperations<EDNAPoint>(connection).QueryRecordsWhere("LineID = {0}", lineID);
        //        return Ok(records);
        //    }
        //}

    }

    [RoutePrefix("api/OpenXDA/EDNAPoint")]
    public class EDNAPointController : ModelController<EDNAPoint>
    {
        EDNAPointController(): base(true, "LineID"){}
        protected override string Connection { get; } = "dbOpenXDA";        
    }

    [RoutePrefix("api/OpenXDA/Breaker")]
    public class BreakerController : ModelController<Breaker>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/Bus")]
    public class BusController : ModelController<Bus>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/CapBank")]
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

