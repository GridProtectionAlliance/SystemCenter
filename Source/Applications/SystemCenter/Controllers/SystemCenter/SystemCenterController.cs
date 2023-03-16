//******************************************************************************************************
//  SystemCenterController.cs - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  06/15/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using FaultData.DataReaders;
using FaultData.DataSets;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.EMAX;
using GSF.PQDIF.Logical;
using GSF.SELEventParser;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using openXDA.Configuration;
using SEBrowser.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Http;
using SystemCenter.Model;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/ValueList")]
    public class ValueListController : ModelController<ValueList>
    {
        private IDictionary<string, string> RequiredGroups = new Dictionary<string, string>
        {
            {"TimeZones", "UTC"},
            {"Make", "GPA"},
            {"Model", "PQMeter"}
        };

        [HttpGet, Route("Group/{groupName}")]
        public IHttpActionResult GetValueListForGroup(string groupName)
        {
            using AdoDataConnection connection = new AdoDataConnection(Connection);
            TableOperations<ValueListGroup> groupTable = new TableOperations<ValueListGroup>(connection);
            TableOperations<ValueList> valueTable = new TableOperations<ValueList>(connection);
            List<int> groupIds = groupTable.QueryRecordsWhere("Name = {0}", groupName).Select(group => group.ID).ToList();
            if (groupIds.Count() == 0)
            {
                if (RequiredGroups.ContainsKey(groupName))
                {
                    groupTable.AddNewRecord(
                        new ValueListGroup()
                        {
                            Description = "",
                            Name = groupName
                        });
                    groupIds.Add(connection.ExecuteScalar<int>("SELECT @@IDENTITY"));
                    valueTable.AddNewRecord(
                        new ValueList()
                        {
                            GroupID = groupIds[0],
                            Value = RequiredGroups[groupName],
                            AltValue = RequiredGroups[groupName],
                            SortOrder = 1
                        });
                }
                else
                    return Ok(new List<ValueList>());
            }
            IEnumerable<ValueList> records = valueTable.QueryRecordsWhere("GroupID in ({0})", string.Join(", ", groupIds));
            return Ok(records);
        }
    }

    [RoutePrefix("api/LSCVSAccount")]
    public class LSCVSAccountController : ModelController<LSCVSAccount> { }

    [RoutePrefix("api/ValueListGroup")]
    public class ValueListGroupController : ModelController<ValueListGroup> { }

    [RoutePrefix("api/OpenXDA/DBCleanup")]
    public class DBCleanupController : ModelController<openXDA.Model.DBCleanup> { }

    [RoutePrefix("api/SystemCenter/Customer")]
    public class CustomerController : ModelController<Customer>
    {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if ((PostRoles == string.Empty || User.IsInRole(PostRoles)))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        Customer newRecord = record.ToObject<Customer>();
                        int result = new TableOperations<Customer>(connection).AddNewRecord(newRecord);

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

        public override IHttpActionResult Patch([FromBody] Customer record)
        {
            try
            {
                if (PatchRoles == string.Empty || User.IsInRole(PatchRoles))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        int result = new TableOperations<Customer>(connection).AddNewOrUpdateRecord(record);
                        Customer newRecord = new TableOperations<Customer>(connection).QueryRecordWhere("ID = {0}", record.ID);
                        return Ok(newRecord);
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

        public override IHttpActionResult Delete(Customer record)
        {
            try
            {
                if ((DeleteRoles == string.Empty || User.IsInRole(DeleteRoles)))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        int id = record.ID;
                        int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete Customer, 'ID = {id}'");
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

    [RoutePrefix("api/SystemCenter/CustomerMeter")]
    public class CustomerMeterController : ModelController<CustomerMeterDetail>
    {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        CustomerMeterDetail newDetailRecord = record.ToObject<CustomerMeterDetail>();
                        CustomerMeter newRecord = new CustomerMeter() { CustomerID = newDetailRecord.CustomerID, MeterID = newDetailRecord.MeterID };
                        int result = new TableOperations<CustomerMeter>(connection).AddNewRecord(newRecord);

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

        public override IHttpActionResult Delete(CustomerMeterDetail record)
        {
            try
            {
                if (DeleteAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                       
                        int id = record.ID;
                        int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete CustomerMeter, 'ID = {id}'");
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
        [HttpPost, Route("PostCustomerList")]
        public IHttpActionResult PostList([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TableOperations<CustomerMeter> connectionTable = new TableOperations<CustomerMeter>(connection);
                        int[] customerIDs = record["CustomerIDs"].ToObject<int[]>();
                        int meterID = record["ID"].ToObject<int>();
                        int result = connectionTable.DeleteRecordWhere("MeterID = {0}", meterID);
                        CustomerMeter newRecord = new CustomerMeter();
                        newRecord.MeterID = meterID;
                        foreach (int customerID in customerIDs)
                        {
                            newRecord.CustomerID = customerID;
                            result += connectionTable.AddNewRecord(newRecord);
                        }

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

    [RoutePrefix("api/SystemCenter/CustomerAsset")]
    public class CustomerAssetController : ModelController<openXDA.Model.CustomerAssetDetail>
    {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        openXDA.Model.CustomerAssetDetail newDetailRecord = record.ToObject<openXDA.Model.CustomerAssetDetail>();
                        openXDA.Model.CustomerAsset newRecord = new openXDA.Model.CustomerAsset() { CustomerID = newDetailRecord.CustomerID, AssetID = newDetailRecord.AssetID };
                        int result = new TableOperations<openXDA.Model.CustomerAsset>(connection).AddNewRecord(newRecord);

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

        public override IHttpActionResult Delete(openXDA.Model.CustomerAssetDetail record)
        {
            try
            {
                if (DeleteAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        int id = record.ID;
                        int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete CustomerAsset, 'ID = {id}'");
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
        [HttpPost, Route("PostCustomerList")]
        public IHttpActionResult PostList([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TableOperations<openXDA.Model.CustomerAsset> connectionTable = new TableOperations<openXDA.Model.CustomerAsset>(connection);
                        int[] customerIDs = record["CustomerIDs"].ToObject<int[]>();
                        int assetID = record["ID"].ToObject<int>();
                        int result = connectionTable.DeleteRecordWhere("AssetID = {0}", assetID);
                        openXDA.Model.CustomerAsset newRecord = new openXDA.Model.CustomerAsset();
                        newRecord.AssetID = assetID;
                        foreach (int customerID in customerIDs)
                        {
                            newRecord.CustomerID = customerID;
                            result += connectionTable.AddNewRecord(newRecord);
                        }

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

    [RoutePrefix("api/SystemCenter/AssetGroupMeter")]
    public class AssetGroupMeterController : ModelController<openXDA.Model.MeterAssetGroupView>
    {
        [HttpPost, Route("PostGroupList")]
        public IHttpActionResult PostList([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TableOperations<openXDA.Model.MeterAssetGroup> connectionTable = new TableOperations<openXDA.Model.MeterAssetGroup>(connection);
                        int[] groupIDs = record["GroupIDs"].ToObject<int[]>();
                        int meterID = record["ID"].ToObject<int>();
                        int result = connectionTable.DeleteRecordWhere("MeterID = {0}", meterID);
                        openXDA.Model.MeterAssetGroup newRecord = new openXDA.Model.MeterAssetGroup();
                        newRecord.MeterID = meterID;
                        foreach (int groupID in groupIDs)
                        {
                            newRecord.AssetGroupID = groupID;
                            result += connectionTable.AddNewRecord(newRecord);
                        }

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

    [RoutePrefix("api/SystemCenter/AssetGroupAsset")]
    public class AssetGroupAssetController : ModelController<openXDA.Model.AssetAssetGroupView>
    {
        [HttpPost, Route("PostGroupList")]
        public IHttpActionResult PostList([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TableOperations<openXDA.Model.AssetAssetGroup> connectionTable = new TableOperations<openXDA.Model.AssetAssetGroup>(connection);
                        int[] groupIDs = record["GroupIDs"].ToObject<int[]>();
                        int assetID = record["ID"].ToObject<int>();
                        int result = connectionTable.DeleteRecordWhere("AssetID = {0}", assetID);
                        openXDA.Model.AssetAssetGroup newRecord = new openXDA.Model.AssetAssetGroup();
                        newRecord.AssetID = assetID;
                        foreach (int groupID in groupIDs)
                        {
                            newRecord.AssetGroupID = groupID;
                            result += connectionTable.AddNewRecord(newRecord);
                        }

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


    [RoutePrefix("api/Setting")]
    public class SettingController : ModelController<Setting> { }


    [AllowSearch]
    [DeleteRoles("Administrator")]
    [PatchRoles("Administrator")]
    [PostRoles("Administrator")]
    [TableName("MiMD.Setting")]
    [UseEscapedName]
    public class MiMDSetting: openXDA.Model.Setting {};


    [RoutePrefix("api/OpenXDA/Setting")]
    public class OpenXDASettingController : ModelController<openXDA.Model.Setting> { }

    [RoutePrefix("api/MiMD/Setting")]
    public class MiMDSettingController : ModelController<MiMDSetting> { }

    [RoutePrefix("api/OpenXDA/ApplicationCategory")]
    public class ApplicationCategoryController : ModelController<openXDA.Model.ApplicationCategory> { }

    [RoutePrefix("api/OpenXDA/PQApplications")]
    public class PQApplicationsController : ModelController<openXDA.Model.PQApplications> { }

    [RoutePrefix("api/SystemCenter/AdditionalField")]
    public class AdditionalFieldController : ModelController<AdditionalField>
    {

        [HttpGet, Route("ParentTable/{openXDAParentTable}/{sort}/{ascending:int}")]
        public IHttpActionResult GetAdditionalFieldsForTable(string openXDAParentTable, string sort, int ascending)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                //Fix added Fro Capacitor Bank due to naming Missmatch
                if (openXDAParentTable == "CapacitorBank")
                    openXDAParentTable = "CapBank";

                string orderByExpression = DefaultSort;

                if (sort != null && sort != string.Empty)
                    orderByExpression = $"{sort} {(ascending == 1 ? "ASC" : "DESC")}";

                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    IEnumerable<AdditionalField> records = new TableOperations<AdditionalField>(connection).QueryRecords(orderByExpression, new RecordRestriction( "ParentTable = {0}", openXDAParentTable));
                    if (!User.IsInRole("Administrator"))
                    {
                        records = records.Where(x => !x.IsSecure);
                    }

                    return Ok(records);
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet, Route("ExternalDataBase")]
        public IHttpActionResult GetExternalDB()
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {

                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    string tableName = new TableOperations<extDBTables>(connection).TableName;
                    DataTable dataTbl = connection.RetrieveData($"SELECT DISTINCT [ExternalDB] from {tableName}");
                    return Ok(dataTbl);
                }
            }
            else
            {
                return Unauthorized();
            }
        }
    }

    [RoutePrefix("api/SystemCenter/AdditionalFieldValue")]
    public class AdditionalFieldValueController : ModelController<AdditionalFieldValue>
    {

        [HttpPatch, Route("Array")]
        public IHttpActionResult PatchValues([FromBody] IEnumerable<AdditionalFieldValue> values)
        {
            try
            {
                if (User.IsInRole(PatchRoles))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        foreach (AdditionalFieldValue value in values)
                        {
                            new TableOperations<AdditionalFieldValue>(connection).AddNewOrUpdateRecord(value);
                        }
                        return Ok("Patched values without exception.");
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

    [RoutePrefix("api/SystemCenter/AdditionalUserField")]
    public class AdditionalUserFieldController : ModelController<AdditionalUserField> {}

    [RoutePrefix("api/SystemCenter/AdditionalUserFieldValue")]
    public class AdditionalUserFieldValueController : ModelController<AdditionalUserFieldValue>
    {

        [HttpPatch, Route("Array")]
        public IHttpActionResult PatchValues([FromBody] IEnumerable<AdditionalUserFieldValue> values)
        {
            try
            {
                if (User.IsInRole(PatchRoles))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        foreach (AdditionalUserFieldValue value in values)
                        {
                            new TableOperations<AdditionalUserFieldValue>(connection).AddNewOrUpdateRecord(value);
                        }
                        return Ok("Patched values without exception.");
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


    [RoutePrefix("api/SystemCenter/Role")]
    public class RoleController : ModelController<ADRole> { }

    [RoutePrefix("api/LocationDrawing")]
    public class LocationDrawingController : ModelController<LocationDrawing> { }

    [RoutePrefix("api/SystemCenter/Statistics/OpenMIC")]
    public class OpenMICDailyStatisticController : ModelController<OpenMICDailyStatistic> {
        public OpenMICDailyStatisticController() {
            ParentKey = "Meter";
        }

    }

    [RoutePrefix("api/SystemCenter/Statistics/MiMD")]
    public class MiMDDailyStatisticController : ModelController<MiMDDailyStatistic>
    {
        public MiMDDailyStatisticController()
        {
            ParentKey = "Meter";
        }

        [HttpGet, Route("Last/{meter}")]
        public IHttpActionResult GetLast(string meter)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {

                try
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        IEnumerable<MiMDDailyStatistic> result = new TableOperations<MiMDDailyStatistic>(connection).QueryRecordsWhere("Meter = {0}", meter);
                        MiMDDailyStatistic statistic = null;
                        if (result.Any()) statistic = result.OrderBy(x => x.Date).Last();
                        return Ok(statistic);
                    }
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }

            }
            else
            {
                return Unauthorized();
            }

        }

    }


    [RoutePrefix("api/SystemCenter/Statistics/OpenXDA")]
    public class OpenXDADailyStatisticController : ModelController<OpenXDADailyStatistic>
    {
        public OpenXDADailyStatisticController()
        {
            ParentKey = "Meter";
        }

    }

    [RoutePrefix("api/SystemCenter/Parse")]
    public class ParseController: ApiController
    {
        #region [ Properties ]

        [System.ComponentModel.Category]
        [SettingName(DataAnalysisSection.CategoryName)]
        public DataAnalysisSection DataAnalysisSettings { get; }
            = new DataAnalysisSection();

        #endregion

        #region [ Members ]
        private class ParsedSeries
        {
            public int ID { get; set; }
            public int ChannelID { get; set; }
            public string SeriesType { get; set; }
            public string SourceIndexes { get; set; }
        }
        private class ParsedChannel
        {
            public int ID { get; set; }
            public string Meter { get; set; }
            public string Asset { get; set; }
            public string MeasurementType { get; set; }
            public string MeasurementCharacteristic { get; set; }
            public string Phase { get; set; }
            public string Name { get; set; }
            public double SamplesPerHour { get; set; }
            public double PerUnitValue { get; set; }
            public int HarmonicGroup { get; set; }
            public string Description { get; set; }
            public bool Enabled { get; set; }
            public double Adder { get; set; }
            public double Multiplier { get; set; }
            public IEnumerable<ParsedSeries> Series { get; set; }
            public int ConnectionPriority { get; set; }
            public bool Trend { get; set; }
        }

        #endregion

        #region [ Http Methods ]

        [HttpPost, Route("{extension}/{meterKey}")]
        public IHttpActionResult Post([FromUri] string extension, [FromUri] string meterKey)
        {
            IEnumerable<ParsedChannel> channels;
            if (extension == "pqd")
            {
                byte[] bytes = Request.Content.ReadAsByteArrayAsync().Result;
                channels = ParsePQDiff(bytes, meterKey);
            }
            else if (extension == "sel" || extension == "cev" || extension == "eve")
            {
                string fileText = Request.Content.ReadAsStringAsync().Result;
                channels = ParseSELEVE(fileText, extension, meterKey);
            }
            else if (extension == "ctl")
            {
                byte[] bytes = Request.Content.ReadAsByteArrayAsync().Result;
                channels = ParseEMAX(bytes, meterKey);
            }
            else if (extension == "txt")
            {
                string fileText = Request.Content.ReadAsStringAsync().Result;
                channels = ParseLDP(fileText, meterKey);
            }
            else
                throw new InvalidDataException("File type not supported.");

            return Ok(channels);
        }
        private IEnumerable<ParsedChannel> ParsePQDiff(byte[] bytes, string meterKey)
        {
            ContainerRecord containerRecord;
            using (Stream stream = new MemoryStream(bytes))
            using (LogicalParser parser = new LogicalParser(stream))
            {
                containerRecord = parser.ContainerRecord;
                while (parser.HasNextObservationRecord())
                    parser.NextObservationRecord();

                if (parser.DataSourceRecords.Count == 0)
                    throw new InvalidDataException("File contained no useable channel definitions");

                IEnumerable<ChannelDefinition> channelDefinitions = parser.DataSourceRecords.First().ChannelDefinitions
                    .Where(cd => cd.SeriesDefinitions.Where(ser => ser.QuantityCharacteristicID == QuantityCharacteristic.Instantaneous).Any());

                List<ObservationRecord> observations = new List<ObservationRecord>();
                while (parser.HasNextObservationRecord())
                    observations.Add(parser.NextObservationRecord());

                IEnumerable<ParsedChannel> channels = channelDefinitions.Select((cd, index) => {

                    Guid characteristic = cd.SeriesDefinitions
                    .Where(item => item.ValueTypeID != SeriesValueType.Time).FirstOrDefault()?.QuantityCharacteristicID
                    ?? QuantityCharacteristic.Instantaneous;
                    Guid valType = SeriesValueType.Val;
                    Guid maxType = SeriesValueType.Max;
                    Guid minType = SeriesValueType.Min;
                    Guid avgType = SeriesValueType.Avg;

                    Func<Guid, string> SeriesType = (Guid g) =>
                    {
                        if (g == SeriesValueType.Val)
                            return "Values";
                        if (g == SeriesValueType.Min)
                            return "Minimum";
                        if (g == SeriesValueType.Min)
                            return "Maximum";
                        if (g == SeriesValueType.Min)
                            return "Average";
                        return "Values";
                    };

                    int harmonicGroup = observations
                        .Where(observation => ReferenceEquals(observation.DataSource, cd.DataSource))
                        .SelectMany(observation => observation.ChannelInstances)
                        .Where(channelInstance => ReferenceEquals(channelInstance.Definition, cd))
                        .Select(channelInstance => channelInstance.ChannelGroupID)
                        .FirstOrDefault(channelGroupIndex => channelGroupIndex != 0);

                    IEnumerable<ParsedSeries> series = cd.SeriesDefinitions.Where(s => s.ValueTypeID == SeriesValueType.Val || s.ValueTypeID == SeriesValueType.Max || s.ValueTypeID == SeriesValueType.Min || s.ValueTypeID == SeriesValueType.Avg)
                    .Select(d => new ParsedSeries()
                    {
                        ID = 0,
                        ChannelID = 0,
                        SeriesType = SeriesType(d.ValueTypeID),
                        SourceIndexes = ""
                    });

                    bool trend = series.Any(item => item.SeriesType != "Values");

                    return new ParsedChannel()
                    {
                        ID = index + 1,
                        Meter = meterKey,
                        Asset = "",
                        MeasurementType = cd.QuantityMeasured.ToString(),
                        MeasurementCharacteristic = QuantityCharacteristic.ToName(characteristic),
                        Phase = cd.Phase.ToString(),
                        Name = cd.ChannelName,
                        SamplesPerHour = 0,
                        PerUnitValue = 1,
                        HarmonicGroup = harmonicGroup,
                        Description = (cd.DataSource.DataSourceName) + " - " + cd.ChannelName,
                        Enabled = true,
                        Adder = 0,
                        Multiplier = 1,
                        Series = series,
                        ConnectionPriority = 0,
                        Trend = trend
                    };

                });

                return channels;
            }
        }

        private IEnumerable<ParsedChannel> ParseSELEVE(string fileText, string extension, string meterKey)
        {
            // TODO: this config doesn't work, but it won't be an issue for the time being, the parts we are parsing do not rely on these settings
            EventFile eventFile = EventFile.Parse(extension, fileText, DataAnalysisSettings.SystemFrequency, DataAnalysisSettings.MaxEventDuration);

            if (!eventFile.EventReports.Any() && !eventFile.CommaSeparatedEventReports.Any())
                throw new InvalidDataException("No event reports specified in file.");

            Func<string, int, ParsedChannel> ParseAnalog = (string channelName, int index) =>
            {
                string measurementType;
                switch (channelName)
                {
                    case "VA":
                    case "VB":
                    case "VC":
                    case "VS":
                    case "VDC":
                    case "Freq":
                        measurementType = "Voltage";
                        break;
                    case "IA":
                    case "IB":
                    case "IC":
                    case "IN":
                    case "IG":
                    case "IR":
                        measurementType = "Current";
                        break;
                    default:
                        measurementType = "None";
                        break;
                }

                string phase;
                switch (channelName)
                {
                    case "VA":
                    case "IA":
                    case "Freq":
                        phase = "AN";
                        break;
                    case "VB":
                    case "IB":
                        phase = "BN";
                        break;
                    case "VC":
                    case "IC":
                        phase = "CN";
                        break;
                    case "IN":
                        phase = "NG";
                        break;
                    case "IG":
                        phase = "Ground";
                        break;
                    case "IR":
                        phase = "Residual";
                        break;
                    default:
                    case "VS":
                    case "VDC":
                        phase = "None";
                        break;
                }

                string measurementCharacteristic;
                if (channelName == "Freq")
                    measurementCharacteristic = "Frequency";
                else
                    measurementCharacteristic = "Instantaneous";

                List<ParsedSeries> series = new List<ParsedSeries>();
                series.Add(new ParsedSeries()
                {
                    ID = 0,
                    ChannelID = 0,
                    SeriesType = "Values",
                    SourceIndexes = index.ToString()
                });

                return new ParsedChannel()
                {
                    ID = index + 1,
                    Meter = meterKey,
                    Asset = "",
                    MeasurementType = measurementType,
                    MeasurementCharacteristic = measurementCharacteristic,
                    Phase = phase,
                    Name = channelName,
                    SamplesPerHour = 0,
                    PerUnitValue = 1,
                    HarmonicGroup = 0,
                    Description = channelName,
                    Enabled = true,
                    Adder = 0,
                    Multiplier = 1,
                    Series = series,
                    ConnectionPriority = 0,
                    Trend = false
                };
            };
            Func<string, int, ParsedChannel> ParseDigital = (string channelName, int index) =>
            {
                List<ParsedSeries> series = new List<ParsedSeries>();
                series.Add(new ParsedSeries()
                {
                    ID = 0,
                    ChannelID = 0,
                    SeriesType = "Values",
                    SourceIndexes = index.ToString()
                });

                return new ParsedChannel()
                {
                    ID = index + 1,
                    Meter = meterKey,
                    Asset = "",
                    MeasurementType = "Digital",
                    MeasurementCharacteristic = "Instantaneous",
                    Phase = "None",
                    Name = channelName,
                    SamplesPerHour = 0,
                    PerUnitValue = 1,
                    HarmonicGroup = 0,
                    Description = channelName,
                    Enabled = true,
                    Adder = 0,
                    Multiplier = 1,
                    Series = series,
                    ConnectionPriority = 0,
                    Trend = false
                };
            };

            IEnumerable<ParsedChannel> reportChannels = eventFile.EventReports.SelectMany((report) =>
            {
                List<ParsedChannel> channels = report.AnalogSection.AnalogChannels.Select((chan, index) => ParseAnalog(chan.Name, index)).ToList();
                for (int index = 0; index < report.AnalogSection.DigitalChannels.Count; index++)
                {
                    ParsedChannel digiChan = ParseDigital(report.AnalogSection.DigitalChannels[index].Name, index);
                    if (digiChan.Name == "*")
                        continue;
                    channels.Add(digiChan);
                }
                return channels;
            });

            IEnumerable<ParsedChannel> commaChannels = eventFile.CommaSeparatedEventReports.SelectMany((report) =>
            {
                List<ParsedChannel> channels = report.AnalogSection.AnalogChannels.Select((chan, index) => {
                    const string ChannelWithUnitsPattern = @"(?<Name>\S+)\s*\((?<Units>\S+)\)";
                    Match regexMatch = Regex.Match(chan.Name, ChannelWithUnitsPattern);
                    string channelName = regexMatch.Success ? regexMatch.Groups["Name"].Value : chan.Name;
                    return ParseAnalog(channelName, index);
                }).ToList();
                for (int index = 0; index < report.AnalogSection.DigitalChannels.Count; index++)
                {
                    ParsedChannel digiChan = ParseDigital(report.AnalogSection.DigitalChannels[index].Name, index);
                    if (digiChan.Name == "*")
                        continue;
                    channels.Add(digiChan);
                }
                return channels;
            });

            return reportChannels.Concat(commaChannels);
        }

        private IEnumerable<ParsedChannel> ParseEMAX(byte[] bytes, string meterKey)
        {
            ControlFile controlFile;
            using (MemoryStream stream = new MemoryStream(bytes))
            {
                controlFile = new ControlFile();
                controlFile.Parse(stream);
            }

            List<ANLG_CHNL_NEW> analogChannels = controlFile.AnalogChannelSettings
                .OrderBy(kvp => kvp.Key)
                .Select(kvp => kvp.Value)
                .ToList();

            List<EVNT_CHNL_NEW> digitalChannels = controlFile.EventChannelSettings
                .OrderBy(kvp => kvp.Key)
                .Select(kvp => kvp.Value)
                .ToList();

            if (!analogChannels.Any() && !digitalChannels.Any())
                throw new InvalidDataException("No channels specified in file.");

            Func<string, string, int, ParsedChannel> ParseChannel = (string channelName, string measurementType, int index) =>
            {
                List<ParsedSeries> series = new List<ParsedSeries>();
                series.Add(new ParsedSeries()
                {
                    ID = 0,
                    ChannelID = 0,
                    SeriesType = "Instantaneous",
                    SourceIndexes = index.ToString()
                });

                return new ParsedChannel()
                {
                    ID = index + 1,
                    Meter = meterKey,
                    Asset = "",
                    MeasurementType = measurementType,
                    MeasurementCharacteristic = "None",
                    Phase = "None",
                    Name = channelName,
                    SamplesPerHour = 0,
                    PerUnitValue = 1,
                    HarmonicGroup = 0,
                    Description = channelName,
                    Enabled = true,
                    Adder = 0,
                    Multiplier = 1,
                    Series = series,
                    ConnectionPriority = 0,
                    Trend = false
                };
            };

            IEnumerable<ParsedChannel> parsedAnalog = analogChannels.Select((chan, index) => ParseChannel(chan.title, "None",  index));
            IEnumerable<ParsedChannel> parsedDigital = digitalChannels.Select((chan, index) => ParseChannel(chan.e_title, "Digital", index));

            return parsedAnalog.Concat(parsedDigital);
        }

        private IEnumerable<ParsedChannel> ParseLDP(string fileText, string meterKey)
        {
            //TODO: Channel parsing may disappear from the MeterDataSet parser, if that happens it'll move out to its own function, replace this with that
            SELLDPReader parser = new SELLDPReader();
            MeterDataSet dataSet = parser.Parse(fileText);

            if (!dataSet.Meter.Channels.Any())
                throw new InvalidDataException("No channels specified in file.");


            return dataSet.Meter.Channels.Select((chan, index) => {
                IEnumerable<ParsedSeries> series = chan.Series.Select((single) => new ParsedSeries()
                {
                    ID = single.ID,
                    ChannelID = single.ChannelID,
                    SeriesType = single.SeriesType.Name,
                    SourceIndexes = single.SourceIndexes
                });

                bool trend = series.Any(item => item.SeriesType != "Values");

                return new ParsedChannel()
                {
                    ID = index + 1,
                    Meter = meterKey,
                    Asset = "",
                    MeasurementType = chan.MeasurementType.Name,
                    MeasurementCharacteristic = chan.MeasurementCharacteristic.Name,
                    Phase = chan.Phase.Name,
                    Name = chan.Name,
                    SamplesPerHour = chan.SamplesPerHour,
                    PerUnitValue = chan.PerUnitValue ?? 1,
                    HarmonicGroup = chan.HarmonicGroup,
                    Description = chan.Description,
                    Enabled = chan.Enabled,
                    Adder = chan.Adder,
                    Multiplier = chan.Multiplier,
                    Series = series,
                    ConnectionPriority = chan.ConnectionPriority,
                    Trend = trend
                };
            });

        }
        
        #endregion
    }

    [RoutePrefix("api/SystemCenter/WidgetCategory")]
    public class SEBrowserWidgetCategoryController : ModelController<SEBrowser.Model.WidgetCategory> { }

    [RoutePrefix("api/SystemCenter/WidgetView")]
    public class SEBrowserWidgetController : ModelController<SEBrowser.Model.WidgetView> 
    {
        public override IHttpActionResult Delete(WidgetView record)
        {
            // We use GET permissions since this only deletes the WidgetWidgetCategory
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                TableOperations<WidgetWidgetCategory> tbl = new TableOperations<WidgetWidgetCategory>(connection);
                WidgetWidgetCategory model = tbl.QueryRecordWhere("WidgetID = {0} AND CategoryID = {1}", record.ID, record.CategoryID);
                if (model is null)
                    return InternalServerError();

                return Ok(tbl.DeleteRecord(model));
            }
        }

        public override IHttpActionResult Patch([FromBody] WidgetView record)
        {
            // We may want to switch to PATCH Auth checks but that would require an XDA update so defered it 
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                TableOperations<Widget> tbl = new TableOperations<Widget>(connection);
                Widget model = tbl.QueryRecordWhere("ID = {0}", record.ID);
                if (model is null)
                    return InternalServerError();

                model.Setting = record.Setting;
                model.Enabled = record.Enabled;
                return Ok(tbl.UpdateRecord(model));
            }

            return base.Patch(record);
        }

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            // We use GET permissions since this only adds the WidgetWidgetCategory
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                TableOperations<WidgetWidgetCategory> tbl = new TableOperations<WidgetWidgetCategory>(connection);
                tbl.AddNewRecord(new WidgetWidgetCategory()
                {
                    CategoryID = record["CategoryID"].Value<int>(),
                    WidgetID = record["ID"].Value<int>()
                });

                //Save Settings And Enabled 
                TableOperations<Widget> widgetTbl = new TableOperations<Widget>(connection);
                Widget model = widgetTbl.QueryRecordWhere("ID = {0}", record["ID"].Value<int>());

                if (model is null)
                    return InternalServerError();

                model.Setting = record["Setting"].Value<string>();
                model.Enabled = record["Enabled"].Value<bool>();
                widgetTbl.UpdateRecord(model);

                return Ok(1);
            }
        }

        [HttpGet, Route("All")]
        public IHttpActionResult GetAll()
        {
            if (!GetAuthCheck())
                return Unauthorized();
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                TableOperations<Widget> tbl = new TableOperations<Widget>(connection);
                return Ok(tbl.QueryRecords());
            }
        }
    }
}