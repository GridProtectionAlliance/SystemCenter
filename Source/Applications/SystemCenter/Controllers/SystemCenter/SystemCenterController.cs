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

using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using SystemCenter.Model;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/ValueList")]
    public class ValueListController : ModelController<ValueList>
    {
        [HttpGet, Route("Group/{groupName}")]
        public IHttpActionResult GetValueListForGroup(string groupName)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                string tableName = new TableOperations<ValueListGroup>(connection).TableName;
                IEnumerable<ValueList> records = new TableOperations<ValueList>(connection).QueryRecordsWhere($"GroupID = ( SELECT ID FROM {tableName} WHERE Name = {{0}})", groupName);
                return Ok(records);
            }
        }

    }

    [RoutePrefix("api/ValueListGroup")]
    public class ValueListGroupController : ModelController<ValueListGroup> { }

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

        [HttpDelete, Route("Delete")]
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

    [RoutePrefix("api/SystemCenter/CustomerAccess")]
    public class CustomerAccessController : ModelController<CustomerAccess>
    {
        [HttpPost, Route("AddMultiple")]
        public IHttpActionResult AddMultipleCustomerAccess(IEnumerable<CustomerAccess> customerAccesses)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    foreach (CustomerAccess customerAccess in customerAccesses)
                        new TableOperations<CustomerAccess>(connection).AddNewRecord(customerAccess);

                    return Ok("Added all records without error.");
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

}