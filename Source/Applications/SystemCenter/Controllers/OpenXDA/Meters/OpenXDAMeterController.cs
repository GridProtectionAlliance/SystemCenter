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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/Meter")]
    public class OpenXDAMeterController : ModelController<Meter>
    {
        protected override string Connection { get; } = "dbOpenXDA";
        protected override string PostRoles { get; } = "Administrator, Transmission SME";
        protected override string PatchRoles { get; } = "Administrator, Transmission SME";
        protected override string DeleteRoles { get; } = "Administrator, Transmission SME";
        protected override string DefaultSort { get; } = "AssetKey";
        protected override bool AllowSearch { get; } = true;

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

                meter.Description = meter.Description == string.Empty ? "NULL" : "'" + meter.Description + "'";
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

                foreach (var asset in Assets)
                {
                    string assetType = asset["AssetType"].ToString();
                    if (asset["ID"].ToString() == "0")
                    {
                        asset["Description"] = asset["Description"] ?? "";

                        if (assetType == "Line")
                        {
                            string maxFaultDistance = asset["MaxFaultDistance"].ToString() == string.Empty ? "NULL" : asset["MaxFaultDistance"].ToString();
                            string minFaultDistance = asset["MinFaultDistance"].ToString() == string.Empty ? "NULL" : asset["MinFaultDistance"].ToString();

                            sqlString += $"INSERT INTO Line (VoltageKV, AssetKey, Description, AssetName, AssetTypeID, MaxFaultDistance, MinFaultDistance) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Line'),{maxFaultDistance},{minFaultDistance}) \n";
                            //sqlString += $"INSERT INTO LineSegment (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,R0, X0, R1, X1, ThermalRating, Length) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}LineSegment','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'LineSegment'),{asset["Segment"]["R0"].ToString()},{asset["Segment"]["X0"].ToString()},{asset["Segment"]["R1"].ToString()},{asset["Segment"]["X1"].ToString()},{asset["Segment"]["ThermalRating"].ToString()},{asset["Segment"]["Length"].ToString()} ) \n";
                            //sqlString += $"INSERT INTO AssetRelationship (AssetRelationshipTypeID, ParentID, ChildID) VALUES ((SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment'),(SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}'),(SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}LineSegment')) \n";
                            //sqlString += $"INSERT INTO MeterAsset (MeterID, AssetID) VALUES ((SELECT ID FROM Meter WHERE AssetKey = '{meter.AssetKey}'),(SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}LineSegment')) \n";
                            //sqlString += $"INSERT INTO AssetLocation (LocationID, AssetID) VALUES ((SELECT ID FROM Location WHERE LocationKey = '{location.LocationKey}'),(SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}LineSegment')) \n";

                        }
                        else if (assetType == "LineSegment")
                            sqlString += $"INSERT INTO LineSegment (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,R0, X0, R1, X1, ThermalRating, Length) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'LineSegment'),{asset["R0"].ToString()},{asset["X0"].ToString()},{asset["R1"].ToString()},{asset["X1"].ToString()},{asset["ThermalRating"].ToString()},{asset["Length"].ToString()} ) \n";
                        else if (assetType == "Breaker")
                        {
                            string tripTime = asset["TripTime"].ToString() == string.Empty ? "NULL" : asset["TripTime"].ToString();
                            string pickupTime = asset["PickupTime"].ToString() == string.Empty ? "NULL" : asset["PickupTime"].ToString();
                            string tripCoilCondition = asset["TripCoilCondition"].ToString() == string.Empty ? "NULL" : asset["TripCoilCondition"].ToString();


                            sqlString += $"INSERT INTO Breaker (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,ThermalRating, Speed, TripTime, PickupTime, TripCoilCondition, Spare) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Breaker'),{asset["ThermalRating"].ToString()},{asset["Speed"].ToString()},{tripTime},{pickupTime},{tripCoilCondition}, {(asset["Spare"].ToString() == "true" ? "1" : "0")} ) \n";
                            if (asset["EDNAPoint"] != null)
                                sqlString += $"INSERT INTO EDNAPoint (BreakerID, Point) VALUES ((SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}'),'{asset["EDNAPoint"].ToString()}') \n";
                        }
                        else if (assetType == "Bus")
                            sqlString += $"INSERT INTO Bus (VoltageKV, AssetKey, Description, AssetName, AssetTypeID) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Bus')) \n";
                        else if (assetType == "CapacitorBank")
                        {
                            sqlString += $"INSERT INTO CapBank (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,[Spare],[NumberOfBanks],[CapacitancePerBank],[CktSwitcher],[MaxKV],[UnitKV],[UnitKVAr],[NegReactanceTol],[PosReactanceTol],[Nparalell],[Nseries],[NSeriesGroup],[NParalellGroup],[Fused],[VTratioBus],[NumberLVCaps],[NumberLVUnits],[LVKVAr],[LVKV],[LVNegReactanceTol],[LVPosReactanceTol],[LowerXFRRatio],[Nshorted],[BlownFuses],[BlownGroups],[RelayPTRatioPrimary],[RelayPTRatioSecondary],[Sh],[Rv],[Rh],[Compensated],[NLowerGroups],[ShortedGroups] ) ";
                            sqlString += $"VALUES ({asset["VoltageKV"]?.ToString() ?? "160"},'{asset["AssetKey"].ToString()}','{asset["Description"]?.ToString() ?? ""}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'CapacitorBank'),0,{asset["NumberOfBanks"]?.ToString() ?? "1"},{asset["CapacitancePerBank"]?.ToString() ?? "1"},'{asset["CktSwitcher"]?.ToString() ?? "1"}',{asset["MaxKV"]?.ToString() ?? "173"},{asset["UnitKV"]?.ToString() ?? "13.2"},{asset["UnitKVAr"]?.ToString() ?? "10"},{asset["NegReactanceTol"]?.ToString() ?? "0"},{asset["PosReactanceTol"]?.ToString() ?? "10"},{asset["Nparalell"]?.ToString() ?? "1"},{asset["Nseries"]?.ToString() ?? "1"},{asset["NSeriesGroup"]?.ToString() ?? "1"},{asset["NParalellGroup"]?.ToString() ?? "1"},'{asset["Fused"]?.ToString() ?? "1"}',{asset["VTratioBus"]?.ToString() ?? "800"},{asset["NumberLVCaps"]?.ToString() ?? "1"},{asset["NumberLVUnits"]?.ToString() ?? "1"},{asset["LVKVAr"]?.ToString() ?? "1"},{asset["LVKV"]?.ToString() ?? "1"},{asset["LVNegReactanceTol"]?.ToString() ?? "0"},{asset["LVPosReactanceTol"]?.ToString() ?? "10"},{asset["LowerXFRRatio"]?.ToString() ?? "100"},{asset["Nshorted"]?.ToString() ?? "0"},{asset["BlownFuses"]?.ToString() ?? "0"},{asset["BlownGroups"]?.ToString() ?? "0"},{asset["RelayPTRatioPrimary"]?.ToString() ?? "0"},{asset["RelayPTRatioSecondary"]?.ToString() ??"0"},{asset["Sh"]?.ToString() ?? "0"},{asset["Rv"]?.ToString() ?? "1"},{asset["Rh"]?.ToString() ?? "0"},'{asset["Compensated"]?.ToString() ?? "1"}',{asset["NLowerGroups"]?.ToString() ?? "1"},{asset["ShortedGroups"]?.ToString() ?? "1"} ) \n";
                        }
                        else if (assetType == "Transformer")
                        {
                            string primaryVoltageKV = asset["PrimaryVoltageKV"].ToString() == string.Empty ? "NULL" : asset["PrimaryVoltageKV"].ToString();
                            string secondaryVoltageKV = asset["SecondaryVoltageKV"].ToString() == string.Empty ? "NULL" : asset["SecondaryVoltageKV"].ToString();
                            string tap = asset["Tap"].ToString() == string.Empty ? "NULL" : asset["Tap"].ToString();

                            sqlString += $"INSERT INTO Transformer (VoltageKV, AssetKey, Description, AssetName, AssetTypeID,R0, X0, R1, X1, ThermalRating, PrimaryVoltageKV, SecondaryVoltageKV, Tap) VALUES ({asset["VoltageKV"].ToString()},'{asset["AssetKey"].ToString()}','{asset["Description"].ToString()}','{asset["AssetName"].ToString()}',(SELECT ID FROM AssetType WHERE Name = 'Transformer'),{asset["R0"].ToString()},{asset["X0"].ToString()},{asset["R1"].ToString()},{asset["X1"].ToString()},{asset["ThermalRating"].ToString()},{primaryVoltageKV},{secondaryVoltageKV},{tap} ) \n";
                        }
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
                foreach (var channel in Channels)
                {
                    string assetName = channel["Asset"].ToString();
                    string measurementType = channel["MeasurementType"].ToString();
                    string measurementcharacteristic = channel["MeasurementCharacteristic"].ToString();
                    string phase = channel["Phase"].ToString();
                    string name = channel["Name"].ToString();
                    double adder = channel["Adder"].ToObject<double>();
                    double multiplier = channel["Multiplier"].ToObject<double>();
                    string description = channel["Description"].ToString() == string.Empty ? "NULL" : "'" + channel["Description"].ToString() + "'";
                    JToken Series = channel["Series"];
                    string sourceIndex = Series[0]["SourceIndexes"].ToString();
                    if (assetName == string.Empty) continue;

                    sqlString += $"INSERT INTO Channel (AssetID, MeasurementTypeID, MeterID, MeasurementCharacteristicID, PhaseID, Name, Adder, Multiplier, SamplesPerHour, HarmonicGroup, Description, Enabled) VALUES ";
                    sqlString += $"((SELECT ID FROM Asset WHERE AssetKey = '{assetName}'),(SELECT ID FROM MeasurementType WHERE Name = '{measurementType}'),(SELECT ID FROM Meter WHERE AssetKey = '{meter.AssetKey}'),(SELECT ID FROM MeasurementCharacteristic WHERE Name = '{measurementcharacteristic}'),(SELECT ID FROM Phase WHERE Name = '{phase}'), '{name}', {adder}, {multiplier}, 0,0,{description}, 1 ) \n";
                    sqlString += $"INSERT INTO Series (ChannelID, SeriesTypeID, SourceIndexes) VALUES ((SELECT @@Identity), (SELECT ID FROM SeriesType WHERE Name = 'Values'), '{sourceIndex}') \n";
                }

                using (TransactionScope scope = new TransactionScope())
                {
                    using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                    {
                        connection.ExecuteNonQuery(sqlString);
                    }

                    // The Complete method commits the transaction. If an exception has been thrown,
                    // Complete is not  called and the transaction is rolled back.
                    scope.Complete();
                }
                return Ok("Compeleted without errors.");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /*
        Channels: List<{ ID: number, Meter: string, Asset: string, MeasurementType: string, MeasurementCharacteristic: string, Phase: string, Name: string, SamplesPerHour: number, PerUnitValue: number, HarmonicGroup: number, Description: string, Enabled: boolean, Series: { ID: number, ChannelID: number, SeriesType: string, SourceIndexes: string } }>
        */
        [HttpPost, Route("{meterID:int}/Channel/Update/{filter=All}")]
        public IHttpActionResult UpdateMeterChannels([FromBody] JObject postData, int meterID, string filter)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                {
                    TableOperations<Channel> channelTable = new TableOperations<Channel>(connection);
                    TableOperations<Series> seriesTable = new TableOperations<Series>(connection);

                    JToken Channels = postData["Channels"];
                    IEnumerable<MeasurementType> measurementTypes = new TableOperations<MeasurementType>(connection).QueryRecords();
                    IEnumerable<MeasurementCharacteristic> measurementCharacteristics = new TableOperations<MeasurementCharacteristic>(connection).QueryRecords();
                    IEnumerable<Phase> phases = new TableOperations<Phase>(connection).QueryRecords();
                    IEnumerable<Asset> assets = new TableOperations<Asset>(connection).QueryRecordsWhere("ID IN (SELECT AssetID FROM MeterAsset WHERE MeterID = {0})", meterID);
                    IEnumerable<SeriesType> seriesTypes = new TableOperations<SeriesType>(connection).QueryRecords();
                    List<int> channelIDs = new List<int>();

                    foreach (JToken channelToken in Channels)
                    {
                        Channel channel = new Channel();
                        channel.ID = channelToken["ID"].ToObject<int>();
                        channel.MeterID = meterID;
                        channel.AssetID = assets.FirstOrDefault(asset => asset.AssetKey == channelToken["Asset"].ToString()).ID;
                        channel.MeasurementTypeID = measurementTypes.First(mt => mt.Name == channelToken["MeasurementType"].ToString()).ID;
                        channel.MeasurementCharacteristicID = measurementCharacteristics.First(mc => mc.Name == channelToken["MeasurementCharacteristic"].ToString()).ID;
                        channel.PhaseID = phases.First(phase => phase.Name == channelToken["Phase"].ToString()).ID;
                        channel.Name = channelToken["Name"].ToString();
                        channel.Description = channelToken["Description"].ToString() == string.Empty ? null : channelToken["Description"].ToString();
                        channel.Adder = channelToken["Adder"].ToObject<double>();
                        channel.Multiplier = channelToken["Multiplier"].ToObject<double>();
                        channel.SamplesPerHour = channelToken["SamplesPerHour"].ToObject<double>();
                        channel.PerUnitValue = channelToken["PerUnitValue"].ToObject<double?>();
                        channel.HarmonicGroup = channelToken["HarmonicGroup"].ToObject<int>();
                        channel.Enabled = channelToken["Enabled"].ToObject<bool>();

                        if (channel.AssetID == 0)
                            continue;

                        channelTable.AddNewOrUpdateRecord(channel);

                        if (channel.ID == 0)
                            channel.ID = connection.ExecuteScalar<int>("SELECT @@IDENTITY");

                        if (channelToken["Series"] is JArray array)
                        {
                            foreach (JToken seriesToken in array)
                            {
                                Series series = new Series();
                                series.ID = seriesToken.Value<int>("ID");
                                series.ChannelID = channel.ID;
                                series.SeriesTypeID = seriesTypes.First(st => st.Name == seriesToken.Value<string>("SeriesType")).ID;
                                series.SourceIndexes = seriesToken.Value<string>("SourceIndexes");
                                seriesTable.AddNewOrUpdateRecord(series);
                            }
                        }

                        channelIDs.Add(channel.ID);
                    }

                    const string EventChannelFilter =
                        "MeasurementCharacteristicID = (SELECT ID FROM MeasurementCharacteristic WHERE Name = 'Instantaneous') AND " +
                        "(SELECT COUNT(*) FROM Series WHERE ChannelID = Channel.ID) = 1 AND " +
                        "EXISTS (SELECT * FROM Series WHERE SeriesTypeID IN (SELECT ID FROM SeriesType WHERE Name IN ('Values', 'Instantaneous')))";

                    string GetTypeFilter()
                    {
                        switch (filter.ToLower())
                        {
                            case "event": return EventChannelFilter;
                            case "trend": return $"NOT ({EventChannelFilter})";
                            case "none": return "1 IS NULL";
                            default: return "1=1";
                        }
                    }

                    string idFilter = channelIDs.Any()
                        ? $"ID NOT IN ({string.Join(",", channelIDs)})"
                        : "1=1";

                    string deleteFilter =
                        $"MeterID = {meterID} AND " +
                        $"({GetTypeFilter()}) AND " +
                        $"{idFilter}";

                    connection.ExecuteNonQuery("EXEC UniversalCascadeDelete 'Channel', {0}", deleteFilter);

                    return Ok("Completed without errors");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("{meterID:int}/Channels/{filter=All}")]
        public IHttpActionResult GetMeterChannels(int meterID, string filter)
        {
            const string ChannelQuery =
                "SELECT " +
                "    Channel.ID, " +
                "    Meter.AssetKey AS Meter, " +
                "    Asset.AssetKey AS Asset, " +
                "    MeasurementType.Name AS MeasurementType, " +
                "    MeasurementCharacteristic.Name AS MeasurementCharacteristic, " +
                "    Phase.Name AS Phase, " +
                "    Channel.Name, " +
                "    Channel.Adder, " +
                "    Channel.Multiplier, " +
                "    Channel.SamplesPerHour, " +
                "    Channel.PerUnitValue, " +
                "    Channel.HarmonicGroup, " +
                "    Channel.Description, " +
                "    Channel.Enabled " +
                "FROM " +
                "    Channel JOIN " +
                "    Asset ON Channel.AssetID = Asset.ID JOIN " +
                "    Meter ON Channel.MeterID = Meter.ID JOIN " +
                "    MeasurementType ON Channel.MeasurementTypeID = MeasurementType.ID JOIN " +
                "    MeasurementCharacteristic ON Channel.MeasurementCharacteristicID = MeasurementCharacteristic.ID JOIN " +
                "    Phase ON Channel.PhaseID = Phase.ID " +
                "WHERE MeterID = {0}";

            const string SeriesQuery =
                "SELECT " +
                "    Series.ID, " +
                "    Series.ChannelID, " +
                "    SeriesType.Name AS SeriesType, " +
                "    Series.SourceIndexes " +
                "FROM " +
                "    Series JOIN " +
                "    SeriesType ON Series.SeriesTypeID = SeriesType.ID JOIN " +
                "    Channel ON Series.ChannelID = Channel.ID " +
                "WHERE Channel.MeterID = {0}";

            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                DataTable channelTable = connection.RetrieveData(ChannelQuery, meterID);
                string channelJSON = JsonConvert.SerializeObject(channelTable);
                JArray channelArray = JArray.Parse(channelJSON);

                DataTable seriesTable = connection.RetrieveData(SeriesQuery, meterID);
                string seriesJSON = JsonConvert.SerializeObject(seriesTable);
                JArray seriesArray = JArray.Parse(seriesJSON);

                int GetChannelID(JToken channel) => channel.Value<int>("ID");
                int GetSeriesChannelID(JToken series) => series.Value<int>("ChannelID");

                var groupings = channelArray
                    .GroupJoin(seriesArray, GetChannelID, GetSeriesChannelID, (Channel, Series) => new { Channel, Series });

                foreach (var grouping in groupings)
                    grouping.Channel["Series"] = new JArray(grouping.Series);

                bool IsInstantaneous(JToken channel) =>
                    channel.Value<string>("MeasurementCharacteristic") == "Instantaneous";

                bool IsSeriesTypeValues(JToken series) =>
                    series.Value<string>("SeriesType") == "Values" ||
                    series.Value<string>("SeriesType") == "Instantaneous";

                bool IsEventChannel(JToken channel) =>
                    IsInstantaneous(channel) &&
                    channel["Series"] is JArray series &&
                    series.Count == 1 &&
                    series.Any(IsSeriesTypeValues);

                bool IsTrendChannel(JToken channel) =>
                    !IsEventChannel(channel);

                IEnumerable<JToken> FilterChannels()
                {
                    switch (filter.ToLower())
                    {
                        case "event": return channelArray.Where(IsEventChannel);
                        case "trend": return channelArray.Where(IsTrendChannel);
                        default: return channelArray;
                    }
                }

                return Ok(FilterChannels());
            }
        }

        [HttpGet, Route("{meterID:int}/Asset/{sort=AssetKey}/{ascending:int=1}")]
        public IHttpActionResult GetMeterAssets(int meterID, string sort, int ascending)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                DataTable records = connection.RetrieveData($@"
                    SELECT 
	                    Asset.ID,
	                    Asset.VoltageKV,
	                    Asset.AssetKey,
	                    Asset.Description,
	                    Asset.AssetName,
	                    Asset.AssetTypeID,
	                    AssetType.Name as AssetType,
	                    COUNT(Channel.ID) as Channels
                    FROM
	                    Asset JOIN
	                    AssetType ON Asset.AssetTypeID = AssetType.ID JOIN
	                    MeterAsset ON Asset.ID = MeterAsset.AssetID LEFT JOIN
	                    Channel ON Asset.ID = Channel.AssetID AND Channel.MeterID = MeterAsset.MeterID
                    WHERE
	                    MeterAsset.MeterID = {{0}}
                    GROUP BY
	                    Asset.ID,
	                    Asset.VoltageKV,
	                    Asset.AssetKey,
	                    Asset.Description,
	                    Asset.AssetName,
	                    Asset.AssetTypeID,
	                    AssetType.Name   
                    ORDER BY {sort} {(ascending == 0? "DESC" : "")}
                ", meterID);
                return Ok(records);
            }
        }

        [HttpDelete, Route("{meterID:int}/Asset/{assetID:int}/{locationID:int}")]
        public IHttpActionResult DeleteMeterAsset(int meterID, int assetID, int locationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                try
                {
                    new TableOperations<MeterAsset>(connection).DeleteRecordWhere("MeterID = {0} AND AssetID = {1}", meterID, assetID);
                    new TableOperations<AssetLocation>(connection).DeleteRecordWhere("LocationID = {0} AND AssetID = {1}", locationID, assetID);

                    return Ok("Completed without errors.");
                }
                catch (Exception ex) {
                    return InternalServerError(ex);
                }
            }
        }
    }


}