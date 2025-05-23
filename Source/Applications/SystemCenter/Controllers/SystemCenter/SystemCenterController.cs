﻿//******************************************************************************************************
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
using GSF;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.EMAX;
using GSF.PQDIF.Logical;
using GSF.SELEventParser;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using openXDA.Configuration;
using openXDA.Model;
using SEBrowser.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Http;
using SystemCenter.Model;
using SystemCenter.ScheduledProcesses;
using ConfigurationLoader = SystemCenter.Model.ConfigurationLoader;
using Customer = SystemCenter.Model.Customer;
using Phase = GSF.PQDIF.Logical.Phase;
using Setting = SystemCenter.Model.Setting;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/ValueList")]
    public class ValueListController : ModelController<ValueList>
    {
       

        [HttpGet, Route("Group/{groupName}")]
        public IHttpActionResult GetValueListForGroup(string groupName)
        {
            using AdoDataConnection connection = new AdoDataConnection(Connection);
            TableOperations<ValueListGroup> groupTable = new TableOperations<ValueListGroup>(connection);
            TableOperations<ValueList> valueTable = new TableOperations<ValueList>(connection);
            List<int> groupIds = groupTable.QueryRecordsWhere("Name = {0}", groupName).Select(group => group.ID).ToList();
            if (groupIds.Count() == 0)
            {
                RestrictedValueList restriction = RestrictedValueList.List.Find((g) => g.Name == groupName);
                if (!(restriction is null))
                {

                    groupTable.AddNewRecord(
                        new ValueListGroup()
                        {
                            Description = "",
                            Name = restriction.Name
                        });
                    groupIds.Add(connection.ExecuteScalar<int>("SELECT @@IDENTITY"));

                    int sortOrder = 1;
                    foreach (string item in restriction.DefaultItems)
                    {
                    valueTable.AddNewRecord(
                        new ValueList()
                        {
                            GroupID = groupIds[0],
                            Value = item,
                            AltValue = item,
                            SortOrder = sortOrder
                        });
                        sortOrder++;
                    }
                }
                else
                    return Ok(new List<ValueList>());
            }
            IEnumerable<ValueList> records = valueTable.QueryRecordsWhere("GroupID in ({0})", string.Join(", ", groupIds)).OrderBy(v => v.SortOrder);
            return Ok(records);
        }

         public override IHttpActionResult Patch([FromBody] SystemCenter.Model.ValueList newRecord)
         {
             if (!PatchAuthCheck())
            {
                return Unauthorized();
            }

            // Check if Value changed
            bool changeVal = false;
            SystemCenter.Model.ValueList oldRecord;

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                oldRecord = new TableOperations<SystemCenter.Model.ValueList>(connection).QueryRecordWhere("ID = {0}", newRecord.ID);
                changeVal = !(newRecord.Value == oldRecord.Value);
            }

            if (changeVal)
            {
                ValueListGroup group;
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    group = new TableOperations<ValueListGroup>(connection).QueryRecordWhere("ID = {0}", newRecord.GroupID);
                    // Update Additional Fields
                    connection.ExecuteScalar(@"UPDATE 
                        AdditionalFieldValue AFV
                        SET [Value] = {0} 
                        WHERE
                        [Value] = {1} AND
                        (SELECT TOP 1 Type FROM AdditionalField AF WHERE AF.ID = AFV.AdditionalFieldID ) = {2}", newRecord.Value, oldRecord.Value, group.Name);

                    RestrictedValueList restriction = RestrictedValueList.List.Find((g) => g.Name == group.Name);
                    if (!(restriction?.UpdateSQL is null))
                    {
                        connection.ExecuteScalar(restriction.UpdateSQL, newRecord.Value, oldRecord.Value);
                    }
                }
            }
            return base.Patch(newRecord);

         }

        public override IHttpActionResult Delete(SystemCenter.Model.ValueList record)
        {
            if (!DeleteAuthCheck())
            {
                return Unauthorized();
            }

            ValueListGroup group;
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                group = new TableOperations<ValueListGroup>(connection).QueryRecordWhere("ID = {0}", record.GroupID);
                RestrictedValueList restriction = RestrictedValueList.List.Find((g) => g.Name == group.Name);
                if (!(restriction?.CountSQL is null))
                {
                    int count = connection.ExecuteScalar<int>(restriction.CountSQL, record.Value);
                    if (count > 0)
                        return Unauthorized();
                }
                
                connection.ExecuteScalar(@"DELETE FROM AdditionalFieldValue
                            WHERE
                            [Value] = {0} AND
                            (SELECT TOP 1 Type FROM AdditionalField AF WHERE AF.ID = AdditionalFieldValue.AdditionalFieldID) = {1}", (object)record.Value, group.Name);
            
                return base.Delete(record);
            }

        }

        [Route("Count/{groupName}/{value}"), HttpGet]
        public IHttpActionResult GetCount(string groupName, string value)
        {
            if (!PatchAuthCheck())
                return Unauthorized();
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                int nAddlFields = connection.ExecuteScalar<int>(@"SELECT COUNT(AFV.ID) FROM AdditionalFieldValue AFV WHERE 
                        [Value] = {0} AND (SELECT TOP 1 AF.ID FROM AdditionalField AF WHERE Type = {1}) = AFV.AdditionalFieldID
                        ", value, groupName);
                RestrictedValueList restriction = RestrictedValueList.List.Find((g) => g.Name == groupName);
                int count = 0;
                if (!(restriction?.CountSQL is null))
                {
                    count = connection.ExecuteScalar<int>(restriction.CountSQL, value); 
                }
                return Ok(nAddlFields + count);
            }
           
        }
    }

    [RoutePrefix("api/ChannelGroupDetails")]
    public class ChannelGroupDetailsController : ModelController<openXDA.Model.ChannelGroupDetails> 
    {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck())
            {
                return Unauthorized();
            }

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                openXDA.Model.ChannelGroupType newRecord = record.ToObject<openXDA.Model.ChannelGroupType>();
                int result = new TableOperations<openXDA.Model.ChannelGroupType>(connection).AddNewRecord(newRecord);
                return Ok(result);
            }
        }

        public override IHttpActionResult Patch([FromBody] openXDA.Model.ChannelGroupDetails record)
        {
            if (!PatchAuthCheck())
            {
                return Unauthorized();
            }

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                int result = new TableOperations<openXDA.Model.ChannelGroupType>(connection).AddNewOrUpdateRecord(record);
                // Turn into channelgrouptype
                openXDA.Model.ChannelGroupType newRecord = new TableOperations<openXDA.Model.ChannelGroupType>(connection).QueryRecordWhere("ID = {0}", record.ID);
                return Ok(newRecord);
            }
        }

        public override IHttpActionResult Delete(openXDA.Model.ChannelGroupDetails record)
        {
            if (!DeleteAuthCheck())
            {
                return Unauthorized();
            }

            using (AdoDataConnection adoDataConnection = new AdoDataConnection(Connection))
            {
                int result = adoDataConnection.ExecuteNonQuery($"EXEC UniversalCascadeDelete ChannelGroupType, 'ID = {record.ID}'");
                return Ok(result);
            }
        }
    }

    [RoutePrefix("api/LSCVSAccount")]
    public class LSCVSAccountController : ModelController<LSCVSAccount> { }

    
    [RoutePrefix("api/OpenXDA/DBCleanup")]
    public class DBCleanupController : ModelController<openXDA.Model.DBCleanup> { }

    [RoutePrefix("api/SystemCenter/Customer")]
    public class CustomerController : ExternalModelController<Customer>
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

        public override IHttpActionResult Delete(openXDA.Model.MeterAssetGroupView record)
        {
            try
            {
                if (DeleteAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        int id = record.ID;
                        int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete MeterAssetGroup, 'ID = {id}'");
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

        public override IHttpActionResult Delete(openXDA.Model.AssetAssetGroupView record)
        {
            try
            {
                if (DeleteAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        int id = record.ID;
                        int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete AssetAssetGroup, 'ID = {id}'");
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

    [RoutePrefix("api/SystemCenter/ExternalOpenXDAField")]
    public class ExternalOpenXDAFieldController : ModelController<ExternalOpenXDAField> { }

    [RoutePrefix("api/SystemCenter/AdditionalField")]
    public class AdditionalFieldController : ModelController<AdditionalField> { }

    [RoutePrefix("api/SystemCenter/AdditionalFieldView")]
    public class AdditionalFieldViewController : ModelController<AdditionalFieldView, AdditionalField>
    {
        [HttpGet, Route("ParentTable/{openXDAParentTable}/{sort}/{ascending:int}")]
        public IHttpActionResult GetAdditionalFieldsForTable(string openXDAParentTable, string sort, int ascending)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                string orderByExpression = DefaultSort;

                if (sort != null && sort != string.Empty)
                    orderByExpression = $"{sort} {(ascending == 1 ? "ASC" : "DESC")}";

                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {

                    string sqlFormat = $@"
                        SELECT * FROM
                            ({CustomView}) FullTbl
                        WHERE ParentTable = {{0}}
                        {(User.IsInRole("Administrator") ? "" : "AND IsSecure = 0")}
                        ORDER BY {orderByExpression}";
                    DataTable dataTable = connection.RetrieveData(sqlFormat, openXDAParentTable);

                    return Ok(dataTable);
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
        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Setting]
            [DefaultValue(false)]
            [SettingName("TrackAdditionalFields")]
            public bool TrackAdditionalFields { get; set; }
        }

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
                            AddNote(value, connection);
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

        private void AddNote(AdditionalFieldValue newValue, AdoDataConnection connection)
        {
            Settings config = new Settings(new ConfigurationLoader(() => new AdoDataConnection(Connection)).Configure);

            if (!config.TrackAdditionalFields)
                return;
            AdditionalField field = new TableOperations<AdditionalField>(connection).QueryRecordsWhere("ID = {0}", newValue.AdditionalFieldID).FirstOrDefault();
            if (!(field.ExternalDBTableID is null) && !field.IsKey)
                return;

            AdditionalFieldValue oldValue = new TableOperations<AdditionalFieldValue>(connection).QueryRecordWhere("ID = {0}", newValue.ID);
            
            NoteApplication noteApplication = new TableOperations<NoteApplication>(connection).QueryRecordWhere("Name = {0}", "SystemCenter");
            NoteTag noteTag = new TableOperations<NoteTag>(connection).QueryRecordWhere("Name = {0}", "Configuration");
            NoteType noteType = new TableOperations<NoteType>(connection).QueryRecordWhere("ReferenceTableName = {0}", field.ParentTable);

            string note = $"Field {field.FieldName} was changed from \"{oldValue?.Value ?? ""}\" to \"{newValue.Value}\"";
            new TableOperations<Notes>(connection).AddNewRecord(new Notes()
            {
                UserAccount = User.Identity.Name,
                Note = note,
                ReferenceTableID = newValue.ParentTableID,
                NoteApplicationID = noteApplication.ID,
                NoteTagID = noteTag.ID,
                NoteTypeID = noteType.ID,
                Timestamp = DateTime.UtcNow
            });

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
        private string Connection { get; } = "systemSettings";

        #endregion

        #region [ Http Methods ]

        [HttpPost, Route("{extension}/{meterKey}")]
        public IHttpActionResult Post([FromUri] string extension, [FromUri] string meterKey)
        {
            IEnumerable<ParsedChannel> channels;
            bool checkChannels = false;
            if (extension == "pqd")
            {
                byte[] bytes = Request.Content.ReadAsByteArrayAsync().Result;
                channels = ParsePQDiff(bytes, meterKey);
                checkChannels = true;
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
                checkChannels = true;
            }
            else
                throw new InvalidDataException("File type not supported.");

            if (checkChannels)
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    // Finding Phases that do not yet exist and adding them to the database
                    Func<ParsedChannel, string> phaseKeyChannel = (ParsedChannel channel) => channel.Phase.ToUpper();
                    Func<openXDA.Model.Phase, string> phaseKey = (openXDA.Model.Phase phase) => phase.Name.ToUpper();
                    Func<ParsedChannel, openXDA.Model.Phase> createPhase = 
                        (ParsedChannel channel) =>
                            new openXDA.Model.Phase()
                            {
                                Description = channel.Phase,
                                Name = channel.Phase
                            };
                    CheckAndAddRecords(connection, channels, phaseKeyChannel, phaseKey, createPhase);

                    // Same as above but characteristic
                    Func<ParsedChannel, string> charKeyChannel = (ParsedChannel channel) => channel.MeasurementCharacteristic;
                    Func<openXDA.Model.MeasurementCharacteristic, string> charKey = (openXDA.Model.MeasurementCharacteristic characteristic) => characteristic.Name;
                    Func<ParsedChannel, openXDA.Model.MeasurementCharacteristic> createChar =
                        (ParsedChannel channel) =>
                            new openXDA.Model.MeasurementCharacteristic()
                            {
                                Description = channel.MeasurementCharacteristic,
                                Name = channel.MeasurementCharacteristic,
                                Display = false
                            };
                    CheckAndAddRecords(connection, channels, charKeyChannel, charKey, createChar);

                    // Same as above but type
                    Func<ParsedChannel, string> typeKeyChannel = (ParsedChannel channel) => channel.MeasurementType;
                    Func<openXDA.Model.MeasurementType, string> typeKey = (openXDA.Model.MeasurementType type) => type.Name;
                    Func<ParsedChannel, openXDA.Model.MeasurementType> createType =
                        (ParsedChannel channel) =>
                            new openXDA.Model.MeasurementType()
                            {
                                Description = channel.MeasurementType,
                                Name = channel.MeasurementType
                            };
                    CheckAndAddRecords(connection, channels, typeKeyChannel, typeKey, createType);
                }

            return Ok(channels);
        }

        private void CheckAndAddRecords<T>(AdoDataConnection connection, IEnumerable<ParsedChannel> channels, Func<ParsedChannel, string> getKeyChannel, Func<T, string> getKeyRecord, Func<ParsedChannel, T> newRecordFunction) where T : class, new ()
        {
            TableOperations<T> recordTable = new TableOperations<T>(connection);
            List<T> allRecords = recordTable.QueryRecords().ToList();
            HashSet<string> hashedRecords = new HashSet<string>(allRecords.Select(record => getKeyRecord(record)));
            IEnumerable<ParsedChannel> filteredChannels = channels.Where(channel => !hashedRecords.Contains(getKeyChannel(channel)));
            while (filteredChannels.Any())
            {
                ParsedChannel firstChannel = filteredChannels.First();
                T newRecord = newRecordFunction(firstChannel);
                recordTable.AddNewRecord(newRecord);
                //Deffered execution causes this to filter our channels again with the new key in the hash set
                hashedRecords.Add(getKeyChannel(firstChannel));
            }
        }

        private IEnumerable<ParsedChannel> ParsePQDiff(byte[] bytes, string meterKey)
        {
            using (Stream stream = new MemoryStream(bytes))
            using (LogicalParser parser = new LogicalParser(stream))
            {
                List<ObservationRecord> observationRecords = new List<ObservationRecord>();

                while (parser.HasNextObservationRecord())
                    observationRecords.Add(parser.NextObservationRecord());

                // Build the list of all data source records in the PQDIF file
                List<DataSourceRecord> dataSources = observationRecords
                    .Select(observation => observation.DataSource)
                    .Distinct()
                    .ToList();

                // If there are no data sources, there is no
                // need to go any further because we won't be
                // able to interpret any of the channel data
                if (!dataSources.Any())
                    throw new InvalidDataException("File contained no usable channel definitions");

                // Build the list of all channel instances in the PQDIF file
                List<ChannelInstance> channelInstances = observationRecords
                    .SelectMany(observation => observation.ChannelInstances)
                    .Where(channelInstance => QuantityType.IsQuantityTypeID(channelInstance.Definition.QuantityTypeID))
                    .Where(channelInstance => channelInstance.SeriesInstances.Any())
                    .Where(channelInstance => channelInstance.SeriesInstances[0].Definition.ValueTypeID == SeriesValueType.Time)
                    .OrderByDescending(channelInstance => channelInstance.SeriesInstances.Count())
                    .ToList();

                List<ParsedChannel> parsedChannels = new List<ParsedChannel>();
                int channelIndex = 1;
                bool assumeTrend = true;
                foreach (ChannelInstance channelInstance in channelInstances)
                {
                    bool timeValueChannel =
                        channelInstance.Definition.QuantityTypeID == QuantityType.WaveForm ||
                        channelInstance.Definition.QuantityTypeID == QuantityType.ValueLog ||
                        channelInstance.Definition.QuantityTypeID == QuantityType.Phasor;

                    if (!timeValueChannel)
                        continue;

                    ParsedChannel channel = ParseChannel(channelInstance, assumeTrend);
                    channel.Meter = meterKey;
                    channel.ID = channelIndex;
                    channelIndex++;
                    // Add the new channel to the meter's channel list
                    parsedChannels.Add(channel);
                }
                return parsedChannels;
            }
        }

        private static ParsedChannel ParseChannel(ChannelInstance channelInstance, bool lastTrend = true)
        {
            // Populate measurement type properties
            QuantityMeasured quantityMeasured = channelInstance.Definition.QuantityMeasured;

            // Popuplate phase properties
            Phase phase = channelInstance.Definition.Phase;

            // Populate channel properties
            ParsedChannel channel = new ParsedChannel()
            {
                Name = channelInstance.Definition.ChannelName,
                Description = channelInstance.Definition.ChannelName,
                MeasurementType = quantityMeasured.ToString(),
                Phase = phase.ToString(),
                Asset = "",
                Enabled = true,
                Adder = 0,
                Multiplier = 1,
                SamplesPerHour = 0,
                ConnectionPriority = 0,
                PerUnitValue = 1
            };

            Guid quantityCharacteristicID;
            try
            {
                SeriesInstance seriesInstance = channelInstance.SeriesInstances[1];

                // Assumes the first seriesInstance is a time instance
                channel.Series = channelInstance.SeriesInstances.Skip(1).Select((seriesInstance) => ParseSeries(seriesInstance.Definition));

                // Populate characteristic properties
                Guid quantityTypeID = channelInstance.Definition.QuantityTypeID;
                quantityCharacteristicID = seriesInstance.Definition.QuantityCharacteristicID;

                // Workaround for bad quantity characteristic in files produced by PQube Classic
                if (quantityTypeID == QuantityType.Phasor && quantityCharacteristicID == QuantityCharacteristic.Instantaneous)
                    quantityCharacteristicID = QuantityCharacteristic.RMS;

                channel.HarmonicGroup = seriesInstance.Channel.ChannelGroupID;

                // Default set earlier, overwrite if avaliable
                if (seriesInstance.Definition.HasElement(SeriesDefinition.SeriesNominalQuantityTag))
                    channel.PerUnitValue = seriesInstance.Definition.SeriesNominalQuantity;
            }
            catch
            {
                List<ParsedSeries> parsedSeries = new List<ParsedSeries>();
                parsedSeries.Add(new ParsedSeries()
                {
                    ID = 0,
                    ChannelID = 0,
                    SeriesType = lastTrend ? SeriesValueType.ToString(SeriesValueType.Avg) : SeriesValueType.ToString(SeriesValueType.Val),
                    SourceIndexes = ""
                });
                channel.Series = parsedSeries;
                quantityCharacteristicID = lastTrend ? QuantityCharacteristic.RMS : QuantityCharacteristic.Instantaneous;
                channel.HarmonicGroup = 0;
            }

            channel.MeasurementCharacteristic = QuantityCharacteristic.ToName(quantityCharacteristicID) ?? quantityCharacteristicID.ToString();
            channel.Trend =
                channel.MeasurementCharacteristic != QuantityCharacteristic.ToName(QuantityCharacteristic.Instantaneous) ||
                channel.Series.All(series => series.SeriesType != SeriesValueType.ToString(SeriesValueType.Val));
            lastTrend = channel.Trend;
            return channel;
        }

        private static ParsedSeries ParseSeries(SeriesDefinition seriesDefinition)
        {
            // Populate series properties
            return new ParsedSeries()
            {
                ID = 0,
                ChannelID = 0,
                SeriesType = SeriesValueType.ToString(seriesDefinition.ValueTypeID) ?? seriesDefinition.ValueTypeName ?? seriesDefinition.ValueTypeID.ToString(),
                SourceIndexes = ""
            };
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

            Func<string, string, string, int, ParsedChannel> ParseChannel = (string channelName, string measurementTypeString, string multiplierString, int index) =>
            {
                List<ParsedSeries> series = new List<ParsedSeries>();
                series.Add(new ParsedSeries()
                {
                    ID = 0,
                    ChannelID = 0,
                    SeriesType = "Instantaneous",
                    SourceIndexes = index.ToString()
                });

                string phase = "None";
                GroupCollection phaseMatchGroup = Regex.Match(channelName, @"(?<=\s\-\s[VI])(\S*)$", RegexOptions.IgnoreCase).Groups;
                if(phaseMatchGroup.Count > 0)
                {
                    string phaseMatch = phaseMatchGroup[0].Value.ToUpper();
                    switch (phaseMatch)
                    {
                        case "R":
                            phase = "Residual";
                            break;
                        case "A":
                            phase = "AN";
                            break;
                        case "B":
                            phase = "BN";
                            break;
                        case "C":
                            phase = "CN";
                            break;
                        case "AB": case "BC": case "CA":
                        case "AN": case "BN": case "CN":
                            phase = phaseMatch;
                            break;
                        case "N":
                            phase = "NG";
                            break;
                    }
                }

                string measurementType = "None";
                switch (measurementTypeString)
                {
                    case "Digital":
                        measurementType = "Digital";
                        break;
                    case "A": case "I":
                        measurementType = "Current";
                        break;
                    case "V":
                        measurementType = "Voltage";
                        break;
                }

                int multiplier;
                if (!int.TryParse(multiplierString, out multiplier)) multiplier = 1;


                return new ParsedChannel()
                {
                    ID = index,
                    Meter = meterKey,
                    Asset = "",
                    MeasurementType = measurementType,
                    MeasurementCharacteristic = "Instantaneous",
                    Phase = phase,
                    Name = channelName,
                    SamplesPerHour = 0,
                    PerUnitValue = 1,
                    HarmonicGroup = 0,
                    Description = channelName,
                    Enabled = true,
                    Adder = 0,
                    Multiplier = multiplier,
                    Series = series,
                    ConnectionPriority = 0,
                    Trend = false
                };
            };

            // EMAX files have channels begin indexing at index 1
            IEnumerable<ParsedChannel> parsedAnalog = analogChannels.Select((chan, index) => ParseChannel(chan.title.Trim(), chan.type.ToUpper(), chan.primary, index + 1));
            IEnumerable<ParsedChannel> parsedDigital = digitalChannels.Select((chan, index) => ParseChannel(chan.e_title.Trim(), "Digital", "1", index + 1));

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

    [RoutePrefix("api/SystemCenter/StandardMagDurCurve")]
    public class MagDurCurveController : ModelController<openXDA.Model.StandardMagDurCurve>
    {
        //We will need to do Post, Patch and Delete Sepperately
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                string name = record["Name"].ToObject<string>();
                string area = Geometry(record["Area"].ToObject<string>());
                string color = record["Color"].ToObject<string>();

                connection.ExecuteNonQuery("INSERT StandardMagDurCurve (Name, Area, Color) VALUES ({0}, {1}, {2})",name, area, color );
                return Ok(1);
            }
        }

        public override IHttpActionResult Patch([FromBody] openXDA.Model.StandardMagDurCurve record)
        {
            if (!PatchAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                connection.ExecuteNonQuery("UPDATE StandardMagDurCurve SET Name = {0} WHERE ID = {1}", record.Name, record.ID);
                connection.ExecuteNonQuery("UPDATE StandardMagDurCurve SET Area = {0} WHERE ID = {1}", Geometry(record.Area), record.ID);
                connection.ExecuteNonQuery("UPDATE StandardMagDurCurve SET Color = {0} WHERE ID = {1}", record.Color, record.ID);
                return Ok(1);
            }
        }

        public override IHttpActionResult Delete(openXDA.Model.StandardMagDurCurve record)
        {
            if (!DeleteAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                connection.ExecuteNonQuery("DELETE FROM StandardMagDurCurve WHERE ID = {0}", record.ID);
                return Ok(1);
            }
        }
        private string Geometry(string area) => $"Polygon (({area}))";
    }

    [RoutePrefix("api/SystemCenter/WidgetCategory")]
    public class SEBrowserWidgetCategoryController : ModelController<SEBrowser.Model.WidgetCategory> { }

    [RoutePrefix("api/SEbrowser/WidgetView")]
    public class SEBrowserWidgetViewController : ModelController<SEBrowser.Model.WidgetView> 
    {
        public override IHttpActionResult Delete(WidgetView record)
        {
            if (!DeleteAuthCheck())
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

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                TableOperations<WidgetWidgetCategory> tbl = new TableOperations<WidgetWidgetCategory>(connection);
                tbl.AddNewRecord(new WidgetWidgetCategory()
                {
                    CategoryID = record["CategoryID"].Value<int>(),
                    WidgetID = record["ID"].Value<int>()
                });

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

    [RoutePrefix("api/SystemCenter/ExternalDatabases")]
    public class ExternalDatabasesController : ModelController<DetailedExternalDatabases, ExternalDatabases>
    {
        private static ServiceHost Host = Program.Host;
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck() || ViewOnly)
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                ExternalDatabases newRecord = record.ToObject<ExternalDatabases>();
                int result = new TableOperations<ExternalDatabases>(connection).AddNewRecord(newRecord);
                Host.ExtDBAddDB(newRecord);
                return Ok(result);
            }
        }
        
        public override IHttpActionResult Patch([FromBody] ExternalDatabases record)
        {
            if (!PatchAuthCheck() || ViewOnly)
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                int result = new TableOperations<ExternalDatabases>(connection).UpdateRecord(record);
                Host.ExtDBRemoveDB(record);
                Host.ExtDBAddDB(record);
                return Ok(result);
            }
        }

        public override IHttpActionResult Delete([FromBody] ExternalDatabases record)
        {
            if (!DeleteAuthCheck() || ViewOnly)
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                int result = new TableOperations<ExternalDatabases>(connection).DeleteRecord(record);
                Host.ExtDBRemoveDB(record);
                return Ok(result);
            }
        }

        [HttpPost, Route("TestConnection")]
        public IHttpActionResult TestConnection([FromBody] JObject record)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            ExternalDatabases extDB = record.ToObject<ExternalDatabases>();
            using (AdoDataConnection extConn = ScheduledExtDBTask.GetExternalConnection(extDB))
            {
                string query;
                if (extConn.IsOracle)
                    query = "SELECT 0 FROM dual;";
                else
                    query = "SELECT 0;";
                return Ok(extConn.ExecuteScalar<int>(query));
            }
        }

        [HttpPost, Route("UnscheduledUpdate")]
        public IHttpActionResult UnscheduledUpdate([FromBody] JObject record)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            ExternalDatabases extDB = record.ToObject<ExternalDatabases>();
            return Ok(ScheduledExtDBTask.Run(extDB));
        }

        [HttpPost, Route("UnscheduledUpdate/{parentTable}")]
        public IHttpActionResult UnscheduledUpdate([FromBody] JObject record, string parentTable)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            ExternalDatabases extDB = record.ToObject<ExternalDatabases>();
            return Ok(ScheduledExtDBTask.Run(extDB, parentTable));
        }

        [HttpPost, Route("UnscheduledUpdate/{parentTable}/{parentID:int}")]
        public IHttpActionResult UnscheduledUpdate([FromBody] JObject record, string parentTable, int parentID)
        {
            if (!PostAuthCheck())
                return Unauthorized();

            ExternalDatabases extDB = record.ToObject<ExternalDatabases>();
            return Ok(ScheduledExtDBTask.Run(extDB, parentTable, parentID));
        }
    }

    [RoutePrefix("api/SystemCenter/extDBTables")]
    public class ExternalTableController : ModelController<DetailedExtDBTables, extDBTables>
    {
        [HttpGet, Route("RetrieveTable/{extTableID:int}/{orderBy}/{ascending:int?}/{start:int?}/{end:int?}")]
        public IHttpActionResult RetrieveTableByID(int extTableID, string orderBy=null, int? ascending=null, int? start=null, int? end=null)
        {
            if (!GetAuthCheck())
                return Unauthorized();
            
            bool asc = ascending > 0;

            using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
            {
                extDBTables table = new TableOperations<extDBTables>(xdaConnection).QueryRecordWhere("ID={0}", extTableID);
                return Ok(QueryExternal(table, xdaConnection, new SQLSearchFilter[0], orderBy, asc, start, end));
            }
        }

        [HttpPost, Route("RetrieveTable/{extTableID:int}/{start:int}/{end:int}")]
        public IHttpActionResult RetrieveFilteredTableByID(int extTableID, int start, int end, [FromBody] PostData postData)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
            {
                extDBTables table = new TableOperations<extDBTables>(xdaConnection).QueryRecordWhere("ID={0}", extTableID);
                return Ok(QueryExternal(table, xdaConnection, postData.Searches, postData.OrderBy, postData.Ascending, start, end));
            }
        }


        [HttpGet, Route("RetrieveTableCount/{extTableID:int}")]
        public IHttpActionResult RetrieveTableCount(int extTableID)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
            {
                extDBTables table = new TableOperations<extDBTables>(xdaConnection).QueryRecordWhere("ID={0}", extTableID);
                return Ok(QueryExternalCount(table, xdaConnection, new SQLSearchFilter[0]));
            }            
        }

        [HttpPost, Route("RetrieveTableCount/{extTableID:int}")]
        public IHttpActionResult RetrieveFilteredTableCount(int extTableID, [FromBody] PostData postData)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
            {
                extDBTables table = new TableOperations<extDBTables>(xdaConnection).QueryRecordWhere("ID={0}", extTableID);
                return Ok(QueryExternalCount(table, xdaConnection, postData.Searches.ToArray()));
            }
        }


        public class PostDataExtension: PostData
        {
            public DetailedExtDBTables externalTable { get; set; }
        }
        [HttpPost, Route("RetrieveTempTable/{start:int}/{end:int}")]
        public IHttpActionResult RetrieveTable([FromBody] PostDataExtension record, int start, int end)
        {
            if (!PostAuthCheck())
                return Unauthorized();
            try
            {
                using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
                {
                    return Ok(QueryExternal(record.externalTable, xdaConnection, record.Searches, record.OrderBy, record.Ascending, start, end));
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [HttpPost, Route("RetrieveTableCount")]
        public IHttpActionResult RetrieveTableCount([FromBody] PostDataExtension record)
        {
            if (!PostAuthCheck())
                return Unauthorized();
            try
            {
                using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
                {
                    return Ok(QueryExternalCount(record.externalTable, xdaConnection, record.Searches));
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private DataTable QueryExternal(extDBTables table, AdoDataConnection xdaConnection, IEnumerable<SQLSearchFilter> filters, string orderBy=null, bool asc=true, int? start=null, int? end=null)
        {
            int count = -1;
            if (!(start is null) && !(end is null) )
                count = (end ?? 0) - (start ?? 0);

            ExternalDatabases extDB = new TableOperations<ExternalDatabases>(xdaConnection).QueryRecordWhere("ID={0}", table.ExtDBID);
            if (extDB is null) throw new NullReferenceException($"Could not find external database associated with table ${table.TableName}");
            using (AdoDataConnection extConnection = ScheduledExtDBTask.GetExternalConnection(extDB))
                return ScheduledExtDBTask.RetrieveDataTable(table, extConnection, filters.Select(f => ProcessExternalFilter(extConnection, f)).ToArray(), orderBy,asc,(start ?? 1)-1, count);
        }

        private int QueryExternalCount(extDBTables table, AdoDataConnection xdaConnection, IEnumerable<SQLSearchFilter> filters)
        {
            ExternalDatabases extDB = new TableOperations<ExternalDatabases>(xdaConnection).QueryRecordWhere("ID={0}", table.ExtDBID);
            if (extDB is null) throw new NullReferenceException($"Could not find external database associated with table ${table.TableName}");
            using (AdoDataConnection extConnection = ScheduledExtDBTask.GetExternalConnection(extDB))
                return ScheduledExtDBTask.RetrieveDataCount(table, extConnection, filters.Select(f => ProcessExternalFilter(extConnection,f)).ToArray());
        }

        private Condition ProcessExternalFilter(AdoDataConnection connection, SQLSearchFilter search)
        {
            string fieldName = search.FieldName;
            if (connection.IsOracle)
                fieldName = $"\"{fieldName}\"";
            if (connection.IsSQLServer)
                fieldName = $"[{fieldName}]";
            return new Condition()
            {
                Parameter = search.SearchText.Replace("*","%"),
                SQL = $"{fieldName} {search.Operator} {{0}}"
            };
        }

    }


    [RoutePrefix("api/SEbrowser/Widget")]
    public class SEBrowserWidgetController : ModelController<SEBrowser.Model.Widget> {}

    [RoutePrefix("api/OpenXDA/EventTag")]
    public class EventTagController : ModelController<openXDA.Model.EventTag> { }

    [RoutePrefix("api/OpenXDA/MATLABAnalytic")]
    public class MATLABAnalyticController : ModelController<openXDA.Model.MATLABAnalytic>
    {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck())
            {
                return Unauthorized();
            }

            try
            {
                openXDA.Model.MATLABAnalytic analyticRecord = record["MATLABAnalytic"].ToObject<openXDA.Model.MATLABAnalytic>();
                openXDA.Model.MATLABAnalyticEventType[] eventTypeRecords = record["MATLABAnalyticEventType"].ToObject<openXDA.Model.MATLABAnalyticEventType[]>();
                openXDA.Model.MATLABAnalyticAssetType[] assetTypeRecords = record["MATLABAnalyticAssetType"].ToObject<openXDA.Model.MATLABAnalyticAssetType[]>();

                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    new TableOperations<openXDA.Model.MATLABAnalytic>(connection).AddNewRecord(analyticRecord);

                    analyticRecord.ID = connection.ExecuteScalar<int>($"SELECT MAX(ID) FROM MATLABAnalytic");
                    
                    // Add event types
                    foreach (openXDA.Model.MATLABAnalyticEventType eventType in eventTypeRecords)
                    {
                        eventType.MATLABAnalyticID = analyticRecord.ID;
                        new TableOperations<openXDA.Model.MATLABAnalyticEventType>(connection).AddNewRecord(eventType);
                    }

                    // Add asset types
                    foreach (openXDA.Model.MATLABAnalyticAssetType assetType in assetTypeRecords)
                    {
                        assetType.MATLABAnalyticID = analyticRecord.ID;
                        new TableOperations<openXDA.Model.MATLABAnalyticAssetType>(connection).AddNewRecord(assetType);
                    }
                }

                return Ok(analyticRecord.ID);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }

    [RoutePrefix("api/OpenXDA/MATLABAnalyticEventType")]
    public class MATLABAnalyticEventTypeController : ModelController<openXDA.Model.MATLABAnalyticEventType> { }

    [RoutePrefix("api/OpenXDA/MATLABAnalyticAssetType")]
    public class MATLABAnalyticAssetTypeController : ModelController<openXDA.Model.MATLABAnalyticAssetType> { }

}