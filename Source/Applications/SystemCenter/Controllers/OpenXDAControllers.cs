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
using System.Linq;

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
         Channels: List<{ ID: number, Meter: string, Asset: string, MeasurementType: string, MeasurementCharacteristic: string, Phase: string, Name: string, SamplesPerHour: number, PerUnitValue: number, HarmonicGroup: number, Description: string, Enabled: boolean, Series: { ID: number, ChannelID: number, SeriesType: string, SourceIndexes: string } }>
         Assets: List<{ ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Channels: Array<OpenXDA.Channel> }>
            interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number,EDNAPoint?:string }
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
                Meter meter = record["MeterInfo"].ToObject<Meter>();

                meter.Description =  meter.Description == string.Empty ? "NULL" : "'" + meter.Description + "'";
                meter.Alias = meter.Alias == string.Empty ? "NULL" : "'" + meter.Alias + "'";
                meter.ShortName = meter.ShortName == string.Empty ? "NULL" : "'" + meter.ShortName + "'";
                meter.TimeZone = meter.TimeZone == string.Empty ? "NULL" : "'" + meter.TimeZone + "'";

                Location location = record["LocationInfo"].ToObject<Location>();

                location.Description = location.Description == string.Empty ? "NULL" : "'" + location.Description + "'";
                location.Alias = location.Alias == string.Empty ? "NULL" : "'" + location.Alias + "'";
                location.ShortName = location.ShortName == string.Empty ? "NULL" : "'" + location.ShortName + "'";

                if (location.Description == string.Empty) location.Description = "NULL";
                if (location.Alias == string.Empty) location.Alias = "NULL";
                if (location.ShortName == string.Empty) location.ShortName = "NULL";

                string sqlString = @"";

                if (location.ID == 0)
                    sqlString += $"INSERT INTO Location (LocationKey, Name, Alias, Latitude, Longitude, Description, ShortName) VALUES ('{location.LocationKey}','{location.Name}', {location.Alias}, {location.Latitude}, {location.Longitude}, {location.Description}, {location.ShortName} ) \n";

                sqlString += $"INSERT INTO Meter (AssetKey, LocationID, Name, Alias, ShortName, Make, Model, TimeZone, Description) VALUES ('{meter.AssetKey}', (SELECT ID FROM Location WHERE LocationKey ='{location.LocationKey}') ,'{meter.Name}', {meter.Alias}, {meter.ShortName} , '{meter.Make}', '{meter.Model}', {meter.TimeZone}, {meter.Description} ) \n";

                JToken Assets = record["Assets"];

                foreach(var asset in Assets)
                {
                    string assetType = asset["AssetType"].ToString();
                    if (asset["ID"].ToString() == "0")
                    {
                        if (assetType == "Line")
                        {
                            sqlString += $"INSERT INTO Line (VoltageKV, AssetKey, Description, AssetName, AssetTypeID, MaxFaultDistance, MinFaultDistance) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Line'),{asset["MaxFaultDistance"].ToString()},{asset["MinFaultDistance"].ToString()}) \n";
                            sqlString += $"INSERT INTO LineSegment (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,R0, X0, R1, X1, ThermalRating, Length) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}LineSegment','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'LineSegment'),{asset["Segment"]["R0"].ToString()},{asset["Segment"]["X0"].ToString()},{asset["Segment"]["R1"].ToString()},{asset["Segment"]["X1"].ToString()},{asset["Segment"]["ThermalRating"].ToString()},{asset["Segment"]["Length"].ToString()} ) \n";
                            sqlString += $"INSERT INTO AssetRelationship (AssetRelationshipTypeID, ParentID, ChildID) VALUES ((SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment'),(SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}'),(SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}LineSegment')) \n";
                        }
                        else if (assetType == "LineSegment")
                            sqlString += $"INSERT INTO LineSegment (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,R0, X0, R1, X1, ThermalRating, Length) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'LineSegment'),{asset["R0"].ToString()},{asset["X0"].ToString()},{asset["R1"].ToString()},{asset["X1"].ToString()},{asset["ThermalRating"].ToString()},{asset["Length"].ToString()} ) \n";
                        else if (assetType == "Breaker")
                        {
                            sqlString += $"INSERT INTO Breaker (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,ThermalRating, Speed, TripTime, PickupTime, TripCoilCondition, Spare) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Breaker'),{asset["ThermalRating"].ToString()},{asset["Speed"].ToString()},{asset["TripTime"].ToString()},{asset["PickupTime"].ToString()},{asset["TripCoilCondition"].ToString()}, {(asset["Spare"].ToString() == "true" ? "1" : "0")} ) \n";
                            if (asset["EDNAPoint"] != null )
                                sqlString += $"INSERT INTO EDNAPoint (BreakerID, Point) VALUES ((SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}'),'{asset["EDNAPoint"].ToString()}') \n";

                        }
                        else if (assetType == "Bus")
                            sqlString += $"INSERT INTO Bus (VoltageKV, AssetKey, Description, AssetName, AssetTypeID) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Bus')) \n";
                        else if (assetType == "CapacitorBank")
                            sqlString += $"INSERT INTO CapBank (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,NumberOfBanks, CansPerBank, CapacitancePerBank) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'CapacitorBank'),{asset["NumberOfBanks"].ToString()},{asset["CansPerBank"].ToString()},{asset["CapacitancePerBank"].ToString()} ) \n";
                        else if (assetType == "Transformer")
                            sqlString += $"INSERT INTO Transformer (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,R0, X0, R1, X1, ThermalRating, PrimaryVoltageKV, SecondaryVoltageKV, Tap) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Transformer'),{asset["R0"].ToString()},{asset["X0"].ToString()},{asset["R1"].ToString()},{asset["X1"].ToString()},{asset["ThermalRating"].ToString()},{asset["PrimaryVoltageKV"].ToString()},{asset["SecondaryVoltageKV"].ToString()},{asset["Tap"].ToString()} ) \n";
                        else
                            sqlString += $"INSERT INTO Asset (VoltageKV, AssetKey, Description, AssetName, AssetTypeID) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Bus')) \n";
                    }

                    sqlString += $"INSERT INTO MeterAsset (MeterID, AssetID) VALUES ((SELECT ID FROM Meter WHERE AssetKey = '{meter.AssetKey}'),(SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}')) \n";
                    sqlString += $"INSERT INTO AssetLocation (LocationID, AssetID) VALUES ((SELECT ID FROM Location WHERE LocationKey = '{location.LocationKey}'),(SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}')) \n";            
                }

                JToken AssetConnections = record["AssetConnections"];
                foreach (var assetConnection in AssetConnections)
                    sqlString += $"INSERT INTO AssetRelationship (AssetRelationshipTypeID, ParentID, ChildID) VALUES ({assetConnection["AssetRelationshipTypeID"].ToString()},(SELECT ID FROM Asset WHERE AssetKey = '{assetConnection["Parent"].ToString()}'),(SELECT ID FROM Asset WHERE AssetKey = '{assetConnection["Child"].ToString()}')) \n";


                JToken Channels = record["Channels"];
                foreach (var channel in Channels) {
                    string assetName = channel["Asset"].ToString();
                    string measurementType = channel["MeasurementType"].ToString();
                    string measurementcharacteristic = channel["MeasurementCharacteristic"].ToString();
                    string phase = channel["Phase"].ToString();
                    string name = channel["Name"].ToString();
                    string description = channel["Description"].ToString() == string.Empty ? "NULL" : "'" +channel["Description"].ToString() + "'";
                    JToken Series = channel["Series"];
                    string sourceIndex = Series["SourceIndexes"].ToString();
                    if (assetName == string.Empty) continue;

                    sqlString += $"INSERT INTO Channel (AssetID, MeasurementTypeID, MeterID, MeasurementCharacteristicID, PhaseID, Name, SamplesPerHour, HarmonicGroup, Description, Enabled) VALUES ";
                    sqlString += $"((SELECT ID FROM Asset WHERE AssetKey = '{assetName}'),(SELECT ID FROM MeasurementType WHERE Name = '{measurementType}'),(SELECT ID FROM Meter WHERE AssetKey = '{meter.AssetKey}'),(SELECT ID FROM MeasurementCharacteristic WHERE Name = '{measurementcharacteristic}'),(SELECT ID FROM Phase WHERE Name = '{phase}'), '{name}', 0,0,{description}, 1 ) \n";
                    sqlString += $"INSERT INTO Series (ChannelID, SeriesTypeID, SourceIndexes) VALUES ((SELECT @@Identity), (SELECT ID FROM SeriesType WHERE Name = 'Values'), '{sourceIndex}') \n";
                }

                using (TransactionScope scope = new TransactionScope()) {
                    using(AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                    {
                        connection.ExecuteNonQuery(sqlString);
                    }

                    // The Complete method commits the transaction. If an exception has been thrown,
                    // Complete is not  called and the transaction is rolled back.
                    scope.Complete();
                }
                return Ok();             
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        /*
        Channels: List<{ ID: number, Meter: string, Asset: string, MeasurementType: string, MeasurementCharacteristic: string, Phase: string, Name: string, SamplesPerHour: number, PerUnitValue: number, HarmonicGroup: number, Description: string, Enabled: boolean, Series: { ID: number, ChannelID: number, SeriesType: string, SourceIndexes: string } }>
        */
        [HttpPost, Route("{meterID:int}/Channel/Update")]
        public IHttpActionResult UpdateMeterChannels([FromBody] JObject postData, int meterID)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                {
                    JToken Channels = postData["Channels"];
                    IEnumerable<MeasurementType> measurementTypes = new TableOperations<MeasurementType>(connection).QueryRecords();
                    IEnumerable<MeasurementCharacteristic> measurementCharacteristics = new TableOperations<MeasurementCharacteristic>(connection).QueryRecords();
                    IEnumerable<Phase> phases = new TableOperations<Phase>(connection).QueryRecords();
                    IEnumerable<Asset> assets = new TableOperations<Asset>(connection).QueryRecordsWhere("ID IN (SELECT AssetID FROM MeterAsset WHERE MeterID = {0})", meterID);
                    IEnumerable<SeriesType> seriesTypes = new TableOperations<SeriesType>(connection).QueryRecords();
                    List<int> channelIDs = new List<int>();
                    foreach (var channel in Channels)
                    {
                        JToken Series = channel["Series"];
                        string sourceIndex = Series["SourceIndexes"].ToString();

                        Channel record = new Channel();
                        record.ID = channel["ID"].ToObject<int>();
                        record.MeterID = meterID;
                        record.AssetID = assets.FirstOrDefault(asset => asset.AssetKey == channel["Asset"].ToString()).ID;
                        record.MeasurementTypeID = measurementTypes.First(mt => mt.Name == channel["MeasurementType"].ToString()).ID;
                        record.MeasurementCharacteristicID = measurementCharacteristics.First(mc => mc.Name == channel["MeasurementCharacteristic"].ToString()).ID;
                        record.PhaseID = phases.First(phase => phase.Name == channel["Phase"].ToString()).ID;
                        record.Name = channel["Name"].ToString();
                        record.Description = channel["Description"].ToString() == string.Empty ? null : channel["Description"].ToString();
                        record.SamplesPerHour = channel["SamplesPerHour"].ToObject<double>();
                        record.PerUnitValue = channel["PerUnitValue"].ToObject<double?>();
                        record.HarmonicGroup = channel["HarmonicGroup"].ToObject<int>();
                        record.Enabled = channel["Enabled"].ToObject<bool>();

                        if (record.AssetID == 0) continue;
                        else if (record.ID != 0)
                        {
                            new TableOperations<Channel>(connection).UpdateRecord(record);
                            Series series = new TableOperations<Series>(connection).QueryRecordWhere("ChannelID = {0}", record.ID);
                            series.SourceIndexes = sourceIndex;
                            new TableOperations<Series>(connection).UpdateRecord(series);
                            channelIDs.Add(record.ID);
                        }
                        else
                        {
                            new TableOperations<Channel>(connection).AddNewRecord(record);
                            int channelID = connection.ExecuteScalar<int>("SELECT @@IDENTITY");
                            Series series = new Series();
                            series.ChannelID = channelID;
                            series.SeriesTypeID = seriesTypes.First(st => st.Name == "Values").ID;
                            series.SourceIndexes = sourceIndex;
                            new TableOperations<Series>(connection).AddNewRecord(series);
                            channelIDs.Add(channelID);
                        }


                    }

                    connection.ExecuteNonQuery(@"
                            EXEC UniversalCascadeDelete 'Channel', 'ID NOT IN (" + string.Join(",", channelIDs) + @")'
                        ");


                    return Ok();

                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet,Route("{meterID:int}/Channels")]
        public IHttpActionResult GetMeterChannels(int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                DataTable table = connection.RetrieveData(@"
                    SELECT
	                    Channel.ID,
	                    Meter.AssetKey as Meter,
	                    Asset.AssetKey as Asset,
	                    MeasurementType.Name as MeasurementType,
	                    MeasurementCharacteristic.Name as MeasurementCharacteristic,
	                    Phase.Name as Phase,
	                    Channel.Name,
	                    Channel.SamplesPerHour,
	                    Channel.PerUnitValue,
	                    Channel.HarmonicGroup,
	                    Channel.Description,
	                    Channel.Enabled,
                        Series.ID as SeriesID,
	                    Series.SourceIndexes as SeriesSourceIndexes

                    FROM
	                    Channel JOIN
	                    Series ON Channel.ID = Series.ChannelID JOIN
	                    Asset ON Channel.AssetID = Asset.ID JOIN
	                    Meter ON Channel.MeterID = Meter.ID JOIN
	                    MeasurementType ON Channel.MeasurementTypeID = MeasurementType.ID JOIN
	                    MeasurementCharacteristic ON Channel.MeasurementCharacteristicID = MeasurementCharacteristic.ID JOIN
	                    Phase ON Channel.PhaseID = Phase.ID
                    WHERE 
	                    MeterID = {0}
                ", meterID);
                return Ok(table);
            }
        }

        [HttpGet, Route("{meterID:int}/Asset")]
        public IHttpActionResult GetMeterAssets(int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Asset> records = new TableOperations<Asset>(connection).QueryRecordsWhere("ID IN (SELECT AssetID FROM MeterAsset WHERE MeterID = {0})", meterID);
                return Ok(records);
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

    [RoutePrefix("api/OpenXDA/Note")]
    public class NoteController : ModelController<Notes>
    {
        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("ForObject/{noteType}/{referenceTableID:int}")]
        public IHttpActionResult GetNotes(string noteType, int referenceTableID)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    IEnumerable<Notes> result = new TableOperations<Notes>(connection).QueryRecordsWhere("NoteTypeID = (SELECT ID FROM NoteType WHERE ReferenceTableName = {0}) AND ReferenceTableID = {1} ", noteType, referenceTableID).OrderByDescending(x => x.Timestamp);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }

        public override IHttpActionResult Post([FromBody] Notes record)
        {
            try
            {
                if (User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        record.UserAccount = User.Identity.Name;
                        int result = new TableOperations<Notes>(connection).AddNewRecord(record);
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


    }

    [RoutePrefix("api/OpenXDA/NoteType")]
    public class NoteTypeController : ModelController<NoteType>
    {
        protected override string Connection { get; } = "dbOpenXDA";

    }



}

