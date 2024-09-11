//******************************************************************************************************
//  OpenXDAControllers.cs - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using GSF.Security.Model;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using SystemCenter.Model;

namespace SystemCenter.Notifications.Controllers
{
    [RoutePrefix("api/OpenXDA/EmailCategory")]
    public class EmailCategoryController : ModelController<EmailCategory> { }

    [AllowSearch]
    [SettingsCategory("systemSettings")]
    [TableName("AssetGroupView")]
    [ViewOnly, RootQueryRestriction("DisplayEmail = {0}", true)]
    public class AssetGroupViewEmail : AssetGroupView { }

    [RoutePrefix("api/OpenXDA/AssetGroup")]
    public class AssetGroupController : ModelController<AssetGroupViewEmail> { }

    [RoutePrefix("api/Setting")]
    public class SettingController : ModelController<openXDA.Model.Setting> { }

    [RoutePrefix("api/EventSubscription")]
    public class EventSubscriptionController : ModelController<openXDA.Model.SubscribeEmails> {

        [HttpGet,Route("approve/{parentID}")]
        public IHttpActionResult Approve(int parentID) 
        {
            if (!PatchAuthCheck())
                return Unauthorized();
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    TableOperations<UserAccountEmailType> tbl = new TableOperations<UserAccountEmailType>(connection);
                    UserAccountEmailType record = tbl.QueryRecordWhere("ID = {0}", parentID);
                    if (record == null)
                        throw new NullReferenceException("Record not found");
                    record.Approved = true;
                    tbl.UpdateRecord(record);
                    return Ok(1);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }

    [RoutePrefix("api/ReportSubscription")]
    public class ReportSubscriptionController : ModelController<openXDA.Model.SubscribeScheduledEmails>
    {
        /*
        [HttpGet, Route("approve/{parentID}")]
        public IHttpActionResult Approve(int parentID)
        {
            if (!PatchAuthCheck())
                return Unauthorized();
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    TableOperations<UserAccountEmailType> tbl = new TableOperations<UserAccountEmailType>(connection);
                    UserAccountEmailType record = tbl.QueryRecordWhere("ID = {0}", parentID);
                    if (record == null)
                        throw new NullReferenceException("Record not found");
                    record.Approved = true;
                    tbl.UpdateRecord(record);
                    return Ok(1);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        */
    }

    [RoutePrefix("api/ActiveSubscription")]
    public class ActiveSubscriptionsController : ModelController<openXDA.Model.ActiveSubscription> 
    {
        [HttpGet, Route("ApproveAll")]
        public IHttpActionResult ApproveAll()
        {
            if (!PatchAuthCheck())
                return Unauthorized();

            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    connection.ExecuteNonQuery("UPDATE UserAccountEmailType SET Approved = 1");
                return Ok(1);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("Approve/{id:int}")]
        public IHttpActionResult Approve(int id)
        {
            if (!PatchAuthCheck())
                return Unauthorized();
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    connection.ExecuteNonQuery("UPDATE UserAccountEmailType SET Approved = 1 WHERE ID = {0}", id);
                return Ok(1);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                ActiveSubscription postRecord = record.ToObject<ActiveSubscription>();
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    UserAccount account = new TableOperations<UserAccount>(connection).QueryRecordWhere("ID = {0}", postRecord.UserAccountID);
                    string username = System.Web.HttpContext.Current.User.Identity.Name;
                    string usersid = UserInfo.UserNameToSID(username);

                    if (PostAuthCheck())
                    {
                        UserAccountEmailType parsedRecord = new UserAccountEmailType()
                        {
                            ID = 0,
                            Approved = postRecord.Approved,
                            UserAccountID = postRecord.UserAccountID,
                            EmailTypeID = postRecord.EmailTypeID,
                            AssetGroupID = int.Parse(postRecord.AssetGroup)
                        };
                        int result = new TableOperations<UserAccountEmailType>(connection).AddNewRecord(parsedRecord);

                        return Ok(result);
                    }
                    // Allow anyone to POST their own Subscription (But set Approved Flag properly)
                    else if (account.Name == usersid || account.Name == username)
                    {
                        EmailType email = new TableOperations<EmailType>(connection).QueryRecordWhere("ID = {0}", postRecord.EmailTypeID);
                        UserAccountEmailType parsedRecord = new UserAccountEmailType()
                        {
                            ID = 0,
                            Approved = !email.RequireApproval,
                            UserAccountID = postRecord.UserAccountID,
                            EmailTypeID = postRecord.EmailTypeID,
                            AssetGroupID = int.Parse(postRecord.AssetGroup)
                        };
                        int result = new TableOperations<UserAccountEmailType>(connection).AddNewRecord(parsedRecord);

                        return Ok(result);
                        
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public override IHttpActionResult Delete(ActiveSubscription record)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
                connection.ExecuteNonQuery("DELETE FROM UserAccountEmailType WHERE ID = {0}", record.UserAccountEmailID);
            
            return Ok(1);
        }
    }

    [RoutePrefix("api/ActiveScheduleSubscription")]
    public class ActiveScheduleSubscriptionsController : ModelController<openXDA.Model.ActiveScheduledSubscription>
    {
        
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                ActiveScheduledSubscription postRecord = record.ToObject<ActiveScheduledSubscription>();
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    UserAccount account = new TableOperations<UserAccount>(connection).QueryRecordWhere("ID = {0}", postRecord.UserAccountID);
                    string username = System.Web.HttpContext.Current.User.Identity.Name;
                    string usersid = UserInfo.UserNameToSID(username);

                    if (PostAuthCheck())
                    {
                        openXDA.Model.Links.UserAccountScheduledEmailType parsedRecord = new openXDA.Model.Links.UserAccountScheduledEmailType()
                        {
                            ID = 0,
                            UserAccountID = postRecord.UserAccountID,
                            ScheduledEmailTypeID = postRecord.ScheduledEmailTypeID,
                            AssetGroupID = int.Parse(postRecord.AssetGroup)
                        };
                        int result = new TableOperations<openXDA.Model.Links.UserAccountScheduledEmailType>(connection).AddNewRecord(parsedRecord);

                        return Ok(result);
                    }
                    // Allow anyone to POST their own Subscription (But set Approved Flag properly)
                    else if (account.Name == usersid || account.Name == username)
                    {
                        ScheduledEmailType email = new TableOperations<ScheduledEmailType>(connection).QueryRecordWhere("ID = {0}", postRecord.ScheduledEmailTypeID);
                        openXDA.Model.Links.UserAccountScheduledEmailType parsedRecord = new openXDA.Model.Links.UserAccountScheduledEmailType()
                        {
                            ID = 0,
                            UserAccountID = postRecord.UserAccountID,
                            ScheduledEmailTypeID = postRecord.ScheduledEmailTypeID,
                            AssetGroupID = int.Parse(postRecord.AssetGroup)
                        };
                        int result = new TableOperations<openXDA.Model.Links.UserAccountScheduledEmailType>(connection).AddNewRecord(parsedRecord);

                        return Ok(result);

                    }
                    else
                    {
                        return Unauthorized();
                    }
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public override IHttpActionResult Delete(openXDA.Model.ActiveScheduledSubscription record)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
                connection.ExecuteNonQuery("DELETE FROM UserAccountScheduledEmailType WHERE ID = {0}", record.ScheduledEmailTypeID);

            return Ok(1);
        }
    }

    [RoutePrefix("api/EventType")]
    public class EventTypeController : ModelController<EventType> { }

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

    [RoutePrefix("api/openXDA/Event/AssetGroup")]
    public class OpenXDAAssetGroupController : ModelController<AssetGroupView> { }

    [RoutePrefix("api/openXDA/Event/Asset")]
    public class OpenXDAAssetController : DetailedAssetController<DetailedAsset> { }

    [RoutePrefix("api/openXDA/Event/Meter")]
    public class OpenXDAMeterController : ModelController<DetailedMeter> { }

    [RoutePrefix("api/openXDA/Event/Location")]
    public class OpenXDALocationController : DetailedLocationController<DetailedLocation> { }

    [RoutePrefix("api/openXDA/AdditionalFieldView")]
    public class AdditionalFieldViewController : ModelController<AdditionalFieldView>
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

    [RoutePrefix("api/openXDA/TriggeredEmailDataSource")]
    public class TriggeredEmailDataSourceController : ModelController<TriggeredEmailDataSource> { }

    [RoutePrefix("api/openXDA/TriggeredEmailDataSourceSetting")]
    public class TriggeredEmailDataSourceSettingController : ModelController<TriggeredEmailDataSourceSetting> { }

    [RoutePrefix("api/openXDA/ScheduledEmailDataSource")]
    public class ScheduledEmailDataSourceController : ModelController<ScheduledEmailDataSource> { }

    [RoutePrefix("api/openXDA/ScheduledEmailDataSourceSetting")]
    public class ScheduledEmailDataSourceSettingController : ModelController<ScheduledEmailDataSourceSetting> { }

    [RoutePrefix("api/openXDA/TriggeredEmailDataSourceEmailType")]
    public class TriggeredEmailDataSourceEmaulTypeController : ModelController<TriggeredEmailDataSourceEmailTypeView>
    {
        public override IHttpActionResult Delete(TriggeredEmailDataSourceEmailTypeView record)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
                connection.ExecuteNonQuery("DELETE FROM TriggeredEmailDataSourceEmailType WHERE ID = {0}", record.ID);

            return Ok(1);
        }
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck() && !ViewOnly)
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        TriggeredEmailDataSourceEmailTypeView postRecord = record.ToObject<TriggeredEmailDataSourceEmailTypeView>();
                        TriggeredEmailDataSourceEmailType newRecord = new TriggeredEmailDataSourceEmailType()
                        {
                            ID = postRecord.ID,
                            TriggeredEmailDataSourceID = postRecord.TriggeredEmailDataSourceID,
                            EmailTypeID = postRecord.EmailTypeID
                        };
                        int result = new TableOperations<TriggeredEmailDataSourceEmailType>(connection).AddNewRecord(newRecord);
                        newRecord.ID = connection.ExecuteScalar<int>("SELECT @@IDENTITY");

                        IEnumerable<TriggeredEmailDataSourceSetting> settings = record["Settings"].ToObject<IEnumerable<TriggeredEmailDataSourceSetting>>();
                        TableOperations<TriggeredEmailDataSourceSetting> settingsTable = new TableOperations<TriggeredEmailDataSourceSetting>(connection);
                        foreach (TriggeredEmailDataSourceSetting setting in settings)
                        {
                            setting.TriggeredEmailDataSourceEmailTypeID = newRecord.ID;
                            result += settingsTable.AddNewRecord(setting);
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

        public override IHttpActionResult Patch([FromBody] TriggeredEmailDataSourceEmailTypeView record)
        {
            try
            {
                if (PatchAuthCheck() && !ViewOnly)
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        TriggeredEmailDataSourceEmailType updatedRecord = new TriggeredEmailDataSourceEmailType()
                        {
                            ID = record.ID,
                            TriggeredEmailDataSourceID = record.TriggeredEmailDataSourceID,
                            EmailTypeID = record.EmailTypeID
                        };

                        int result = new TableOperations<TriggeredEmailDataSourceEmailType>(connection).UpdateRecord(updatedRecord);

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

    [RoutePrefix("api/openXDA/ScheduledEmailDataSourceEmailType")]
    public class TScheduledEmailDataSourceEmaulTypeController : ModelController<ScheduledEmailDataSourceEmailTypeView> 
    {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck() && !ViewOnly)
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        ScheduledEmailDataSourceEmailTypeView postRecord = record.ToObject<ScheduledEmailDataSourceEmailTypeView>();
                        ScheduledEmailDataSourceEmailType newRecord = new ScheduledEmailDataSourceEmailType()
                        {
                            ID = postRecord.ID,
                            ScheduledEmailDataSourceID = postRecord.ScheduledEmailDataSourceID,
                            ScheduledEmailTypeID = postRecord.ScheduledEmailTypeID
                        };
                        int result = new TableOperations<ScheduledEmailDataSourceEmailType>(connection).AddNewRecord(newRecord);
                        newRecord.ID = connection.ExecuteScalar<int>("SELECT @@IDENTITY");

                        IEnumerable<ScheduledEmailDataSourceSetting> settings = record["Settings"].ToObject<IEnumerable<ScheduledEmailDataSourceSetting>>();
                        TableOperations<ScheduledEmailDataSourceSetting> settingsTable = new TableOperations<ScheduledEmailDataSourceSetting>(connection);
                        foreach (ScheduledEmailDataSourceSetting setting in settings)
                        {
                            setting.ScheduledEmailDataSourceEmailTypeID = newRecord.ID;
                            result += settingsTable.AddNewRecord(setting);
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

        public override IHttpActionResult Patch([FromBody] ScheduledEmailDataSourceEmailTypeView record)
        {
            try
            {
                if (PatchAuthCheck() && !ViewOnly)
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        ScheduledEmailDataSourceEmailType updatedRecord = new ScheduledEmailDataSourceEmailType()
                        {
                            ID = record.ID,
                            ScheduledEmailDataSourceID = record.ScheduledEmailDataSourceID,
                            ScheduledEmailTypeID = record.ScheduledEmailTypeID
                        };

                        int result = new TableOperations<ScheduledEmailDataSourceEmailType>(connection).UpdateRecord(updatedRecord);

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


    [TableName("UserAccount"), CustomView(@"
	Select
		ID,
		Name,
		'' as Password,
		FirstName,
		LastName,
		DefaultNodeID,
		Phone,
		PhoneConfirmed,
		Email,
		EmailConfirmed,
		LockedOut,
		Approved,
		UseADAuthentication,
		TSCID,
		RoleID,
		Title,
		Department,
		DepartmentNumber,
		MobilePhone,
		ReceiveNotifications,
		ChangePasswordOn,
		CreatedOn,
		CreatedBy,
		UpdatedOn,
		UpdatedBy
	From
		UserAccount
	")]
    [SettingsCategory("SystemSettings")]
    [GetRoles("Administrator")]
    [PostRoles("Administrator")]
    [PatchRoles("Administrator"), AllowSearch]
    [ViewOnly]
    public class RemoteUserAccount : UserAccount { }
    [RoutePrefix("api/OpenXDA/UserAccount")]
    public class RemoteUserAccountController : ModelController<RemoteUserAccount> { }

    [RoutePrefix("api/openXDA/CellCarrier")]
    public class CellCarrierController : ModelController<CellCarrier> { }
}