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
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [AdditionalFieldSearch("ParentTable='Meter'")]
    public class MeterDetail : openXDA.Model.Meter { }
    
    [RoutePrefix("api/OpenXDA/Meter")]
    public class OpenXDAMeterController : ModelController<Meter>
    {
        [HttpGet, Route("Line/{lineID:int}")]
        public IHttpActionResult GetMetersForLine(int lineID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("ID IN ( SELECT MeterID FROM MeterAsset WHERE AssetID = {0})", lineID);
                    return Ok(records);
                }
            }
            else
                return Unauthorized();
        }

        [HttpGet, Route("MeterLocation/{meterLocationID:int}")]
        public IHttpActionResult GetMetersForMeterLocation(int meterLocationID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("LocationID = {0}", meterLocationID);
                    return Ok(records);
                }
            }
            else
                return Unauthorized();
        }

       
        // #ToDo: Update to use Models instead of direct SQL Statements
        [HttpPost, Route("New")]
        public IHttpActionResult PostNewMeter([FromBody] JObject record)
        {
            if (PostRoles == string.Empty || User.IsInRole(PostRoles))
            {
                try
                {
                    Meter meter = record["MeterInfo"].ToObject<Meter>();
                    Location location = record["LocationInfo"].ToObject<Location>();

                    using (TransactionScope scope = new TransactionScope())
                    {
                        using (AdoDataConnection connection = new AdoDataConnection(Connection))
                        {
                            if (location.ID == 0)
                                (new TableOperations<Location>(connection)).AddNewRecord(location);

                            JToken Assets = record["Assets"];
                            int locationID = connection.ExecuteScalar<int>($"SELECT ID FROM Location WHERE LocationKey = '{location.LocationKey}'");
                            meter.LocationID = locationID;

                            (new TableOperations<Meter>(connection)).AddNewRecord(meter);
                            int meterId = connection.ExecuteScalar<int>($"SELECT ID FROM Meter WHERE AssetKey = '{meter.AssetKey}'");

                            foreach (var asset in Assets)
                            {
                                string assetType = asset["AssetType"].ToString();
                                if (asset["ID"].ToString() == "0")
                                {
                                    if (assetType == "Line")
                                        (new TableOperations<Line>(connection)).AddNewRecord(asset.ToObject<Line>());
                                    else if (assetType == "LineSegment")
                                        (new TableOperations<LineSegment>(connection)).AddNewRecord(asset.ToObject<LineSegment>());
                                    else if (assetType == "Breaker")
                                    {
                                        (new TableOperations<Breaker>(connection)).AddNewRecord(asset.ToObject<Breaker>());
                                        if (asset["EDNAPoint"] != null)
                                            connection.ExecuteNonQuery($"INSERT INTO EDNAPoint (BreakerID, Point) VALUES ((SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}'),'{asset["EDNAPoint"].ToString()}')");
                                    }
                                    else if (assetType == "Bus")
                                        (new TableOperations<Bus>(connection)).AddNewRecord(asset.ToObject<Bus>());
                                    else if (assetType == "CapacitorBank")
                                        (new TableOperations<CapBank>(connection)).AddNewRecord(asset.ToObject<CapBank>());
                                    else if (assetType == "Transformer")
                                        (new TableOperations<Transformer>(connection)).AddNewRecord(asset.ToObject<Transformer>());
                                    else if (assetType == "CapacitorBankRelay")
                                        (new TableOperations<CapBankRelay>(connection)).AddNewRecord(asset.ToObject<CapBankRelay>());
                                    else if (assetType == "DER")
                                        (new TableOperations<DER>(connection)).AddNewRecord(asset.ToObject<DER>());

                                    else
                                        (new TableOperations<Asset>(connection)).AddNewRecord(asset.ToObject<Asset>());
                                }
                                int assetID = connection.ExecuteScalar<int>($"SELECT ID FROM Asset WHERE AssetKey = '{asset["AssetKey"].ToString()}'");

                                (new TableOperations<MeterAsset>(connection)).AddNewRecord(new MeterAsset()
                                {
                                    AssetID = assetID,
                                    MeterID = meterId
                                });
                                (new TableOperations<AssetLocation>(connection)).AddNewRecord(new AssetLocation()
                                {
                                    AssetID = assetID,
                                    LocationID = locationID
                                });
                            }

                            JToken AssetConnections = record["AssetConnections"];
                            foreach (var assetConnection in AssetConnections)
                            {
                                int childID = connection.ExecuteScalar<int>($"SELECT ID From asset WHERE AssetKey = '{assetConnection["Child"].ToString()}'");
                                int parentID = connection.ExecuteScalar<int>($"SELECT ID From asset WHERE AssetKey = '{assetConnection["Parent"].ToString()}'");
                                (new TableOperations<AssetConnection>(connection)).AddNewRecord(new AssetConnection()
                                {
                                    ParentID = parentID,
                                    ChildID = childID,
                                    AssetRelationshipTypeID = int.Parse(assetConnection["AssetRelationshipTypeID"].ToString())
                                });
                            }

                            JToken Channels = record["Channels"];
                            foreach (var channel in Channels)
                            {
                                string assetKey = channel["Asset"].ToString();
                                string measurementType = channel["MeasurementType"].ToString();
                                string measurementcharacteristic = channel["MeasurementCharacteristic"].ToString();
                                string phase = channel["Phase"].ToString();
                                string name = channel["Name"].ToString();
                                double adder = channel["Adder"].ToObject<double>();
                                double multiplier = channel["Multiplier"].ToObject<double>();
                                string description = channel["Description"].ToString() == string.Empty ? "NULL" : "'" + channel["Description"].ToString() + "'";
                                int conPriority = channel["ConnectionPriority"].ToObject<int>();

                                JToken Series = channel["Series"];
                                string sourceIndex = Series[0]["SourceIndexes"].ToString();
                                if (assetKey == string.Empty) continue;

                                Phase ph = new TableOperations<Phase>(connection).QueryRecordWhere("Name = {0}", phase);
                                if(ph == null)
                                {
                                    ph = new Phase() {ID=0, Name = phase, Description = phase };
                                    new TableOperations<Phase>(connection).AddNewRecord(ph);
                                }
                                    
                                connection.ExecuteNonQuery($@"INSERT INTO Channel
                                    (
                                        AssetID,
                                        MeasurementTypeID,
                                        MeterID,
                                        MeasurementCharacteristicID,   
                                        PhaseID,
                                        Name,
                                        Adder,
                                        Multiplier,
                                        SamplesPerHour,
                                        HarmonicGroup,
                                        Description,
                                        Enabled,
                                        ConnectionPriority
                                    ) VALUES 
                                ((SELECT ID FROM Asset WHERE AssetKey = '{assetKey}'),
                                (SELECT ID FROM MeasurementType WHERE Name = '{measurementType}'),
                                {meterId},
                                (SELECT ID FROM MeasurementCharacteristic WHERE Name = '{measurementcharacteristic}'),
                                (SELECT ID FROM Phase WHERE Name = '{phase}'),
                                '{name}', {adder}, {multiplier}, 0,0,{description}, 1,{conPriority} )");

                                connection.ExecuteNonQuery($@"INSERT INTO Series (ChannelID, SeriesTypeID, SourceIndexes) VALUES 
                                    ((SELECT @@Identity), (SELECT ID FROM SeriesType WHERE Name = 'Values'), '{sourceIndex}') ");
                            }

                            scope.Complete();
                        }
                    }                

                    return Ok("Completed without errors.");
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
            return
                Unauthorized();
        }

        /*
        Channels: List<{ ID: number, Meter: string, Asset: string, MeasurementType: string, MeasurementCharacteristic: string, Phase: string, Name: string, SamplesPerHour: number, PerUnitValue: number, HarmonicGroup: number, Description: string, Enabled: boolean, Series: { ID: number, ChannelID: number, SeriesType: string, SourceIndexes: string } }>
        */
        [HttpPost, Route("{meterID:int}/Channel/Update/{filter=All}")]
        public IHttpActionResult UpdateMeterChannels([FromBody] JObject postData, int meterID, string filter)
        {
            if (PatchRoles == string.Empty || User.IsInRole(PatchRoles))
            {
                try
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
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
                            channel.ConnectionPriority = channelToken["ConnectionPriority"].ToObject<int>();
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
            else
                return Unauthorized();
        }

        [HttpGet, Route("{meterID:int}/Channels/{filter=All}")]
        public IHttpActionResult GetMeterChannels(int meterID, string filter)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
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
                "    Channel.Enabled, " +
                "    Channel.ConnectionPriority " +
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

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
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
            else
                return Unauthorized();
        }

        [HttpGet, Route("{meterID:int}/Asset/{sort=AssetKey}/{ascending:int=1}")]
        public IHttpActionResult GetMeterAssets(int meterID, string sort, int ascending)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
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
                    ORDER BY {sort} {(ascending == 0 ? "DESC" : "")}
                ", meterID);
                    return Ok(records);
                }
            }
            else
                return Unauthorized();
        }

        [HttpDelete, Route("{meterID:int}/Asset/{assetID:int}/{locationID:int}")]
        public IHttpActionResult DeleteMeterAsset(int meterID, int assetID, int locationID)
        {
            if (DeleteRoles == string.Empty || User.IsInRole(DeleteRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        new TableOperations<MeterAsset>(connection).DeleteRecordWhere("MeterID = {0} AND AssetID = {1}", meterID, assetID);
                        new TableOperations<AssetLocation>(connection).DeleteRecordWhere("LocationID = {0} AND AssetID = {1}", locationID, assetID);

                        return Ok("Completed without errors.");
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

        [HttpGet, Route("extDataBases")]
        public IHttpActionResult GetExternalDB()
        {
            try
            {
                if (GetRoles == string.Empty || User.IsInRole(GetRoles))
                {
                    string afTbl = TableOperations<AdditionalField>.GetTableName();
                    string afvTbl = TableOperations<AdditionalFieldValue>.GetTableName();

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        string query = $@"SELECT MIN(UpdatedOn) AS lastUpdate, {afTbl}.ExternalDB AS name  
                                                    FROM 
                                                    {afTbl} LEFT JOIN {afvTbl} ON {afTbl}.ID = {afvTbl}.AdditionalFieldID
                                                    WHERE 
                                                        {afTbl}.ParentTable = 'Meter'
                                                        AND {afTbl}.ExternalDB IS NOT NULL AND {afTbl}.ExternalDB <> ''
                                                    GROUP BY {afTbl}.ExternalDB";

                        DataTable table = connection.RetrieveData(query);

                        return Ok(table);
                    }
                }
                else
                    return Unauthorized();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
    }

    [CustomView("SELECT " +
                "    Channel.*, " +
                "    Meter.AssetKey AS Meter, " +
                "    Asset.AssetKey AS Asset, " +
                "    MeasurementType.Name AS MeasurementType, " +
                "    MeasurementCharacteristic.Name AS MeasurementCharacteristic, " +
                "    Phase.Name AS Phase," +
                "    (SELECT TOP 1 SourceIndexes FROM Series WHERE Channel.ID = Series.ChannelID) AS SourceIndices " +
                "FROM " +
                "    Channel JOIN " +
                "    Asset ON Channel.AssetID = Asset.ID JOIN " +
                "    Meter ON Channel.MeterID = Meter.ID JOIN " +
                "    MeasurementType ON Channel.MeasurementTypeID = MeasurementType.ID JOIN " +
                "    MeasurementCharacteristic ON Channel.MeasurementCharacteristicID = MeasurementCharacteristic.ID JOIN " +
                "    Phase ON Channel.PhaseID = Phase.ID " +
                "WHERE MeasurementCharacteristic.Name = 'Instantaneous' AND " +
                "    (SELECT COUNT(ID) FROM Series WHERE Channel.ID = Series.ChannelID) = 1 AND " +
                "    (SELECT TOP 1 SeriesTypeID FROM Series WHERE Channel.ID = Series.ChannelID) IN (SELECT ID FROM SeriesType WHERE Name IN ('Values','Instantaneous'))")]
    public class EventChannel : ChannelBase
    {
        [ParentKey(typeof(MeterDetail))]
        public new int MeterID { get; set; }
        public string Meter { get; set; }
        public string Asset { get; set; }
        public string MeasurementType { get; set; }
        public string MeasurementCharacteristic { get; set; }
        public string Phase { get; set; }
        public string SourceIndices { get; set; }
    }

    [RoutePrefix("api/OpenXDA/EventChannel")]
    public class EventChannelController: ModelController<EventChannel>
    {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        EventChannel newRecord = record.ToObject<EventChannel>();

                        IEnumerable<MeasurementCharacteristic> measurementCharacteristics = new TableOperations<MeasurementCharacteristic>(connection).QueryRecordsWhere("Name = 'Instantaneous'");
                        IEnumerable<SeriesType> seriesTypes = new TableOperations<SeriesType>(connection).QueryRecordsWhere("Name = 'Values'");

                        ChannelBase channel = new ChannelBase() {
                            MeterID = newRecord.MeterID,
                            AssetID = newRecord.AssetID,
                            MeasurementTypeID = newRecord.MeasurementTypeID,
                            Adder = newRecord.Adder,
                            MeasurementCharacteristicID = measurementCharacteristics.First()?.ID ?? 0,
                            ConnectionPriority = newRecord.ConnectionPriority,
                            PhaseID = newRecord.PhaseID,
                            Name = newRecord.Name,
                            Multiplier = newRecord.Multiplier,
                            SamplesPerHour = newRecord.SamplesPerHour,
                            PerUnitValue = newRecord.PerUnitValue,
                            HarmonicGroup = newRecord.HarmonicGroup,
                            Description = newRecord.Description,
                            Enabled = newRecord.Enabled,
                        };


                        int result = new TableOperations<ChannelBase>(connection).AddNewRecord(channel);
                        int channelID = connection.ExecuteScalar<int>("SELECT @@IDENTITY");

                        Series series = new Series() { 
                            SeriesTypeID = seriesTypes.First()?.ID ?? 0,
                            SourceIndexes = newRecord.SourceIndices,
                            ChannelID = channelID
                        };

                        result = new TableOperations<Series>(connection).AddNewRecord(series);

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

        public override IHttpActionResult Delete(EventChannel record)
        {
            if (DeleteAuthCheck())
            {

                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete Channel, 'ID = ''{record.ID}'''");
                    return Ok(result);
                }
            }
            else
            {
                return Unauthorized();
            }

        }

        public override IHttpActionResult Patch([FromBody] EventChannel record)
        {

            try
            {
                if (PatchAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        IEnumerable<MeasurementCharacteristic> measurementCharacteristics = new TableOperations<MeasurementCharacteristic>(connection).QueryRecordsWhere("Name = 'Instantaneous'");

                        ChannelBase channel = new ChannelBase()
                        {
                            ID = record.ID,
                            MeterID = record.MeterID,
                            AssetID = record.AssetID,
                            MeasurementTypeID = record.MeasurementTypeID,
                            Adder = record.Adder,
                            MeasurementCharacteristicID = measurementCharacteristics.First()?.ID ?? 0,
                            ConnectionPriority = record.ConnectionPriority,
                            PhaseID = record.PhaseID,
                            Name = record.Name,
                            Multiplier = record.Multiplier,
                            SamplesPerHour = record.SamplesPerHour,
                            PerUnitValue = record.PerUnitValue,
                            HarmonicGroup = record.HarmonicGroup,
                            Description = record.Description,
                            Enabled = record.Enabled,
                        };

                        int result = new TableOperations<ChannelBase>(connection).UpdateRecord(channel);

                        Series series = new TableOperations<Series>(connection).QueryRecordWhere("ChannelID = {0}", record.ID);

                        series.SourceIndexes = record.SourceIndices;
                        result = new TableOperations<Series>(connection).UpdateRecord(series);

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


}