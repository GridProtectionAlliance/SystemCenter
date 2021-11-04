//******************************************************************************************************
//  UserAccount.cs - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  02/05/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using GSF.Security;
using GSF.Security.Model;
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Model.Security
{
    [SettingsCategory("securityProvider")]
    [GetRoles("Administrator")]
    [PostRoles("Administrator")]
    [PatchRoles("Administrator"), AllowSearch,
     AdditionalFieldSearch("", @"
        (SELECT
	        AdditionalUserFieldValue.ID,
	        AdditionalUserField.FieldName,
	        AdditionalUserFieldValue.Value,
            AdditionalUserFieldValue.UserAccountID
        FROM
	        AdditionalUserField JOIN
	        AdditionalUserFieldValue ON AdditionalUserField.ID = AdditionalUserFieldValue.AdditionalUserFieldID) 
    ", "UserAccountID", "Value", "FieldName")]
    public class UserAccount : GSF.Security.Model.UserAccount {
        static UserAccount()
        {
            TableOperations<UserAccount>.TypeRegistry.RegisterType<AdoSecurityProvider>();
        }

        public bool PhoneConfirmed { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool Approved { get; set; }
        public string Title { get; set; }
        public string Department { get; set; }
        public string DepartmentNumber { get; set; }
        public string MobilePhone { get; set; }
        public bool ReceiveNotifications { get; set; }

        [NonRecordField]
        public new string AccountName { get; set;  }
    }

    [RoutePrefix("api/SystemCenter/UserAccount")]
    public class UserAccountController : ModelController<UserAccount> {
        [HttpGet, Route("UpdateMetaData")]
        public IHttpActionResult GetUdateMetaData()
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {
                UserAccountMetaDataUpdater metaData = new UserAccountMetaDataUpdater();
                metaData.Update();
                return Ok("Metadata updated");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpGet, Route("TSC/{tscid:int}")]
        public IHttpActionResult GetUsersForTSC(int tscid)
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    string uaTableName = TableOperations<UserAccount>.GetTableName();
                    string aufvTableName = TableOperations<AdditionalUserFieldValue>.GetTableName();
                    string aufTableName = TableOperations<AdditionalUserField>.GetTableName();

                    string sql = $@"
                        SELECT
	                        UA.*
                        FROM
	                        {uaTableName} as UA JOIN
	                        {aufvTableName} as AUFV ON UA.ID = AUFV.UserAccountID JOIN
	                        {aufTableName} as AUF ON AUFV.AdditionalUserFieldID = AUF.ID
                        WHERE
	                        AUF.FieldName = 'TSC' AND AUFV.Value = {{0}}
                    ";


                    DataTable table = connection.RetrieveData(sql, tscid);
                    return Ok(table);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpGet, Route("Sector/{sectorID:int}")]
        public IHttpActionResult GetUsersForSector(int sectorID)
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    string uaTableName = TableOperations<UserAccount>.GetTableName();
                    string aufvTableName = TableOperations<AdditionalUserFieldValue>.GetTableName();
                    string aufTableName = TableOperations<AdditionalUserField>.GetTableName();

                    string sql = $@"
                        SELECT
	                        UA.*
                        FROM
	                        {uaTableName} as UA JOIN
	                        {aufvTableName} as AUFV ON UA.ID = AUFV.UserAccountID JOIN
	                        {aufTableName} as AUF ON AUFV.AdditionalUserFieldID = AUF.ID
                        WHERE
	                        AUF.FieldName = 'Sector' AND AUFV.Value = {{0}}
                    ";

                    DataTable table = connection.RetrieveData(sql, sectorID);
                    return Ok(table);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }


        [HttpPost, Route("SID")]
        public IHttpActionResult GetSIDFromUserName([FromBody] string userName) {
            if (PostRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {
                return Ok(UserInfo.UserNameToSID(userName));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpPost, Route("FilledUserAccount")]
        public IHttpActionResult GetUserInfo([FromBody] UserAccount userAccount)
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            using(AdoDataConnection connection = new AdoDataConnection(Connection))
            using (AdoDataConnection connection2 = new AdoDataConnection("systemSettings"))
            {
                try
                {
                    // Grab LdapPath From Configuration File
                    ConfigurationFile configFile = ConfigurationFile.Current;
                    CategorizedSettingsElementCollection securityProviderSettings = configFile.Settings["securityProvider"];
                    securityProviderSettings.Add("LdapPath", "", "Specifies the LDAP path used to initialize the security provider.");
                    string ldapPath = securityProviderSettings["LdapPath"].Value;

                    UserInfo userInfo = new UserInfo(UserInfo.SIDToAccountName(userAccount.Name), ldapPath);
                    userAccount.Phone = userInfo.Telephone;
                    userAccount.MobilePhone = userInfo.GetUserPropertyValue("mobile");

                    userAccount.Title = userInfo.Title;
                    userAccount.FirstName = userInfo.FirstName;
                    userAccount.LastName = userInfo.LastName;
                    userAccount.Email = userInfo.Email;
                    userAccount.EmailConfirmed = true;
                    userAccount.PhoneConfirmed = true;
                    userAccount.ReceiveNotifications = true;
                    userAccount.Approved = true;
                    userAccount.Department = userInfo.Department;
                    userAccount.DepartmentNumber = userInfo.GetUserPropertyValue("departmentnumber");
                    
                    return Ok(userAccount);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }

        }


        [HttpPost, Route("IsUser")]
        public IHttpActionResult GetIsUser([FromBody] string sid)
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {

                return Ok(UserInfo.IsUserSID(sid));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        public class UA : UserAccount
        {
            public string Role { get; set; }
            public string TSC { get; set; }

        }

        public override IHttpActionResult GetSearchableList([FromBody] PostData postData)
        {

            if (!GetAuthCheck())
                return Unauthorized();

            try
            {
                PostData searchParam = new ModelController<UserAccount>.PostData()
                {
                    Ascending = postData.Ascending,
                    OrderBy = postData.OrderBy == "AccountName" ? "Name" : postData.OrderBy,
                    Searches = postData.Searches.Where(item => item.FieldName != "AccountName")
                };

                DataTable table = GetSearchResults(searchParam);

                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    IEnumerable<UserAccount> records = table.Select().Select(row => new TableOperations<UserAccount>(connection).LoadRecord(row));

                    if (postData.Searches.Any(item => item.FieldName == "AccountName"))
                    {
                        postData.Searches.Where(item => item.FieldName == "AccountName").ToList().ForEach(search =>
                        {
                            if (search.Operator == "=")
                            {
                                Regex regex = new Regex($"^{search.SearchText}$");
                                records = records.Where(userAccount => regex.IsMatch(userAccount.AccountName.ToLower()));
                            }
                            else if (search.Operator == "LIKE")
                            {
                                Regex regex = new Regex($"^{search.SearchText}$");
                                records = records.Where(userAccount => regex.IsMatch(userAccount.AccountName.ToLower()));
                            }
                            else
                            {
                                Regex regex = new Regex($"^{search.SearchText}$");
                                records = records.Where(userAccount => !regex.IsMatch(userAccount.AccountName.ToLower()));
                            }
                            
                        });
                    }

                    if (postData.OrderBy == "AccountName" && postData.Ascending)
                        records = records.OrderBy(u => u.AccountName);
                    if (postData.OrderBy == "AccountName" && !postData.Ascending)
                        records = records.OrderByDescending(u => u.AccountName);

                    return Ok(JsonConvert.SerializeObject(records));
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("SecureSearchableList")]
        public IHttpActionResult GetUserAccountsUsingSearchableList([FromBody] PostData postData)
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {
                string whereClause = BuildWhereClause(postData.Searches.Where(search => search.FieldName != "UserAccount.Name"));

                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    DataTable table = connection.RetrieveData(@"
                        SELECT
	                        DISTINCT
	                        UserAccount. *,
	                        Role.Name as Role,
	                        TSC.Name as TSC
                        FROM
	                        UserAccount LEFT JOIN 
	                        Role ON UserAccount.RoleID = Role.ID LEFT JOIN
	                        TSC ON UserAccount.TSCID = TSC.ID LEFT JOIN
	                        ApplicationRoleUserAccount ON UserAccount.ID = ApplicationRoleUserAccount.UserAccountID LEFT JOIN
	                        ApplicationRole ON ApplicationRoleUserAccount.ApplicationRoleID = ApplicationRole.ID 
                    " + whereClause + $@" ORDER BY {postData.OrderBy} {(postData.Ascending ? "ASC" : "DESC")}
                    ");

                    IEnumerable<UA> records = table.Select().Select(row => new TableOperations<UA>(connection).LoadRecord(row));
                    if (postData.Searches.Where(search => search.FieldName == "UserAccount.Name").Any())
                    {
                        string search = postData.Searches.First(s => s.FieldName == "UserAccount.Name").SearchText;
                        if (search == string.Empty)
                        {
                            Regex regex = new Regex("^.*$");
                            records = records.Where(userAccount => regex.IsMatch(userAccount.AccountName.ToLower()));
                        }
                        else if (search[0] == '!' || search[0] == '_')
                        {
                            search = search.Replace("*", ".*");
                            Regex regex = new Regex("^" + search + "$");
                            records = records.Where(userAccount => !regex.IsMatch(userAccount.AccountName.ToLower()));
                        }
                        else
                        {
                            search = search.Replace("*", ".*");
                            Regex regex = new Regex("^" + search + "$");
                            records = records.Where(userAccount => regex.IsMatch(userAccount.AccountName.ToLower()));
                        }
                    }

                    return Ok(records);
                }
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck())
                return Unauthorized();
            try
            {

                if (record["ID"].Value<string>() == "new")
                    record["ID"] = System.Guid.NewGuid();
                UserAccount newRecord = record.ToObject<UserAccount>();
                if (newRecord.UseADAuthentication)
                    newRecord.Name = UserInfo.UserNameToSID(newRecord.Name);
                newRecord.CreatedOn = DateTime.UtcNow;
                newRecord.UpdatedOn = DateTime.UtcNow;
                newRecord.CreatedBy = User.Identity.Name;
                newRecord.UpdatedBy = User.Identity.Name;

                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    int result = new TableOperations<UserAccount>(connection).AddNewRecord(newRecord);
                    ConfigurationFile configFile = ConfigurationFile.Current;
                    CategorizedSettingsElementCollection systemSettings = configFile.Settings["systemSettings"];
                    systemSettings.Add("CompanyAcronym", "", "The acronym representing the company who owns this instance of the SystemCenter.");
                    string companyAcronym = systemSettings["CompanyAcronym"].Value;


                    using (AdoDataConnection connection2 = new AdoDataConnection("systemSettings"))
                    {
                        if (companyAcronym == "TVA")
                        {
                            if (newRecord.Title != string.Empty)
                            {
                                AdditionalUserFieldValue additionalFieldValue = new TableOperations<AdditionalUserFieldValue>(connection).GetValue(newRecord.Name, "Role");
                                ValueList roleValue = new TableOperations<ValueList>(connection2).GetAltValue("Role", newRecord.Title, true);
                                if (roleValue != null && roleValue.Value != additionalFieldValue.Value)
                                {
                                    additionalFieldValue.Value = roleValue.ID.ToString();
                                    new TableOperations<AdditionalUserFieldValue>(connection).AddNewOrUpdateRecord(additionalFieldValue);
                                }
                            }
                            if (newRecord.DepartmentNumber != string.Empty)
                            {
                                AdditionalUserFieldValue additionalFieldValue = new TableOperations<AdditionalUserFieldValue>(connection).GetValue(newRecord.Name, "TSC");
                                ValueList roleValue = new TableOperations<ValueList>(connection2).GetAltValue("TSC", newRecord.DepartmentNumber, true);
                                if (roleValue != null && roleValue.Value != additionalFieldValue.Value)
                                {
                                    additionalFieldValue.Value = roleValue.ID.ToString();
                                    new TableOperations<AdditionalUserFieldValue>(connection).AddNewOrUpdateRecord(additionalFieldValue);
                                }

                            }
                        }
                    }

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


        }

    }

    [MetadataType(typeof(GSF.Security.Model.ApplicationRoleUserAccount))]
    [SettingsCategory("securityProvider")]
    public class ApplicationRoleUserAccount : GSF.Security.Model.ApplicationRoleUserAccount
    { }

    [RoutePrefix("api/SystemCenter/ApplicationRoleUserAccount")]
    public class SystemCenterApplicationRoleUserAccountController : ModelController<ApplicationRoleUserAccount>
    {
       
        [HttpPatch, Route("UpdateArray")]
        public IHttpActionResult PatchArray([FromBody] IEnumerable<ApplicationRoleUserAccount> records)
        {
            try
            {
                if (PatchRoles == string.Empty || User.IsInRole(PatchRoles))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        IEnumerable<ApplicationRoleUserAccount> applicationRoles = new TableOperations<ApplicationRoleUserAccount>(connection).QueryRecordsWhere("UserAccountID = {0}", records.First().UserAccountID);

                        foreach (ApplicationRoleUserAccount applicationRole in applicationRoles) {
                            if (records.FirstOrDefault(r => r.ApplicationRoleID == applicationRole.ApplicationRoleID) == null)
                                new TableOperations<ApplicationRoleUserAccount>(connection).DeleteRecord(applicationRole);
                        }

                        foreach (ApplicationRoleUserAccount record in records)
                        {
                            if (applicationRoles.FirstOrDefault(r => r.ApplicationRoleID == record.ApplicationRoleID) == null)
                                new TableOperations<ApplicationRoleUserAccount>(connection).AddNewRecord(record);
                        }

                        return Ok("Updated Roles without error.");
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

    [MetadataType(typeof(GSF.Security.Model.ApplicationRole))]
    [SettingsCategory("securityProvider")]
    public class ApplicationRole : GSF.Security.Model.ApplicationRole
    { }

    [RoutePrefix("api/SystemCenter/ApplicationRole")]
    public class SystemCenterApplicationRoleController : ModelController<ApplicationRole> {}

}