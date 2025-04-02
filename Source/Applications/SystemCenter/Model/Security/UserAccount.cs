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
using Microsoft.Graph;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Http;

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
    public class UserAccount : GSF.Security.Model.UserAccount
    {
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
        public string Type { get; set; }

        [NonRecordField]
        public string DisplayName { get; set; }
    }

    [RoutePrefix("api/SystemCenter/UserAccount")]
    public class UserAccountController : ModelController<UserAccount>
    {
        private AzureADSettings m_azureADSettings;
        private GraphServiceClient m_graphClient;

        public string LDAPPath
        {
            get
            {
                ConfigurationFile configFile = ConfigurationFile.Current;
                CategorizedSettingsElementCollection securityProviderSettings = configFile.Settings["securityProvider"];
                securityProviderSettings.Add("LdapPath", "", "Specifies the LDAP path used to initialize the security provider.");
                return securityProviderSettings["LdapPath"].Value;
            }
        }

        /// <summary>
        /// Gets Azure AD settings.
        /// </summary>
        public AzureADSettings AzureADSettings => m_azureADSettings ??= AzureADSettings.Load();

        /// <summary>
        /// Gets Graph client.
        /// </summary>
        public GraphServiceClient GraphClient => m_graphClient ??= AzureADSettings.GetGraphClient();

        protected override IEnumerable<UserAccount> QueryRecords(string sortBy, bool ascending)
        {
            IEnumerable<UserAccount> baseResult;
            if (!IsInDatabase(sortBy))
                baseResult = base.QueryRecords("Name", ascending);
            else
                baseResult = base.QueryRecords(sortBy, ascending);

            baseResult = baseResult.Select(g => ExtendAcct(g));

            if (string.Equals(sortBy, "DisplayName", StringComparison.OrdinalIgnoreCase) && ascending)
                baseResult = baseResult.OrderBy(g => g.DisplayName);
            if (string.Equals(sortBy, "DisplayName", StringComparison.OrdinalIgnoreCase) && !ascending)
                baseResult = baseResult.OrderByDescending(g => g.DisplayName);

            if (string.Equals(sortBy, "Type", StringComparison.OrdinalIgnoreCase) && ascending)
                baseResult = baseResult.OrderBy(g => g.Type);
            if (string.Equals(sortBy, "Type", StringComparison.OrdinalIgnoreCase) && !ascending)
                baseResult = baseResult.OrderByDescending(g => g.Type);

            return baseResult;
        }

        protected override UserAccount QueryRecordWhere(string filterExpression, params object[] parameters) =>
            ExtendAcct(base.QueryRecordWhere(filterExpression, parameters));


        protected override IEnumerable<UserAccount> QueryRecordsWhere(string orderBy, bool ascending, string filterExpression, params object[] parameters)
        {
            IEnumerable<UserAccount> baseResult;
            if (!IsInDatabase(orderBy))
                baseResult = base.QueryRecordsWhere("Name", ascending, filterExpression, parameters);
            else
                baseResult = base.QueryRecordsWhere(orderBy, ascending, filterExpression, parameters);

            baseResult = baseResult.Select(g => ExtendAcct(g));

            if (string.Equals(orderBy, "DisplayName", StringComparison.OrdinalIgnoreCase) && ascending)
                baseResult = baseResult.OrderBy(g => g.DisplayName);
            if (string.Equals(orderBy, "DisplayName", StringComparison.OrdinalIgnoreCase) && !ascending)
                baseResult = baseResult.OrderByDescending(g => g.DisplayName);

            if (string.Equals(orderBy, "Type", StringComparison.OrdinalIgnoreCase) && ascending)
                baseResult = baseResult.OrderBy(g => g.Type);
            if (string.Equals(orderBy, "Type", StringComparison.OrdinalIgnoreCase) && !ascending)
                baseResult = baseResult.OrderByDescending(g => g.Type);

            return baseResult;

        }

        protected override DataTable GetSearchResults(PostData postData, int? page)
        {
            string orderBy = postData.OrderBy;
            if (!IsInDatabase(orderBy))
                orderBy = "Name";

            PostData filteredPostData = new ModelController<UserAccount>.PostData()
            {
                Ascending = postData.Ascending,
                OrderBy = orderBy,
                Searches = postData.Searches.Where(flt => IsInDatabase(flt.FieldName)),
            };

            DataTable dataTable = base.GetSearchResults(filteredPostData);
            dataTable.Columns.Add("DisplayName", typeof(string));
            dataTable.Columns.Add("Type", typeof(string));

            foreach (DataRow row in dataTable.Rows)
            {
                UserAccount group = ExtendAcct(TableOperations<UserAccount>.LoadRecordFunction()(row));
                row["Type"] = group.Type;
                row["DisplayName"] = group.DisplayName;
            }
            
            // Todo: This code is used in Secruity Group as well, maybe we should create a shared helper function?

            IEnumerable<DataRow> filteredRows = dataTable.AsEnumerable();
            IEnumerable<SQLSearchFilter> searchesToApply = postData.Searches.Where(flt => !IsInDatabase(flt.FieldName));
            foreach (SQLSearchFilter search in searchesToApply)
            {
                string wildcardPattern = Regex.Escape(search.SearchText.ToLower()).Replace(@"\*", ".*");
                switch (search.Operator)
                {
                    case "=":
                        filteredRows = filteredRows.Where((row) => row.Field<string>(search.FieldName).ToLower() == search.SearchText.ToLower());
                        break;
                    case "LIKE":
                        filteredRows = filteredRows.Where((row) => Regex.IsMatch(row.Field<string>(search.FieldName).ToLower(), wildcardPattern));
                        break;
                    case "NOT LIKE":
                        filteredRows = filteredRows.Where((row) => !Regex.IsMatch(row.Field<string>(search.FieldName).ToLower(), wildcardPattern));
                        break;
                    case "IN":
                        List<string> groupTypes = search.SearchText.Trim('(', ')').Split(',').ToList();
                        filteredRows = filteredRows.Where((row) => groupTypes.Contains(row.Field<string>(search.FieldName)));
                        break;
                    default:
                        throw new Exception("Operator not found for Filter.");
                }
            }

            dataTable = filteredRows.CopyToDataTable();

            if (!IsInDatabase(orderBy))
            {
                dataTable.DefaultView.Sort = orderBy + (postData.Ascending ? " ASC" : " DESC");
                dataTable = dataTable.DefaultView.ToTable();
            }

            return dataTable;
        }

        private UserAccount ExtendAcct(UserAccount user)
        {
            user.DisplayName = user.AccountName;
            user.Type = "Database";

            if (!string.Equals(user.Name, user.AccountName))
                user.Type = "AD";
            else if (IsValidAzureADUserName(user.Name).Result)
                user.Type = "Azure";

            return user;
        }

        /// <summary>
        /// Gets flag that determines if specified group name can be found on Azure AD.
        /// </summary>
        /// <param name="groupName">Group name to lookup</param>
        /// <returns><c>true</c> if group name was found in Azure AD; otherwise, <c>false</c>.</returns>
        private async Task<bool> IsValidAzureADUserName(string userName)
        {
            GraphServiceClient graphClient = GraphClient;

            if (graphClient is null)
                return false;
            if (string.IsNullOrWhiteSpace(userName))
                return false;

            try
            {
                IGraphServiceUsersCollectionRequest request = graphClient.Users.Request().Filter($"mail eq '{userName}'");

                // Load user data - note that external users need to be looked up by userPrincipalName
                User user = (await request.GetAsync()).FirstOrDefault();

                return user is not null;
            }
            catch (ServiceException ex)
            {
                if (ex.Error.Code == "Request_ResourceNotFound")
                    return false;
                else
                    throw new Exception("Unable to query Azure", ex);
            }
            catch (Exception ex)
            {
                throw new Exception("Exception attempting to query Azure", ex);
            }
        }

        private bool IsValidADUser(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName))
                return false;
            string sid = UserInfo.GroupNameToSID(userName);
            return UserInfo.IsUserSID(sid);
        }

        private UserAccount LoadADUser(string username)
        {
            UserAccount user = new UserAccount()
            {
                Name = UserInfo.UserNameToSID(username),
                Approved = true,
                UseADAuthentication = true,
            };

            UserInfo userInfo = new UserInfo(UserInfo.SIDToAccountName(username), LDAPPath);
            user.Phone = userInfo.Telephone;
            user.MobilePhone = userInfo.GetUserPropertyValue("mobile");

            user.Title = userInfo.Title;
            user.FirstName = userInfo.FirstName;
            user.LastName = userInfo.LastName;
            user.Email = userInfo.Email;
            user.EmailConfirmed = true;
            user.PhoneConfirmed = true;
            user.ReceiveNotifications = true;
            user.Approved = true;
            user.Department = userInfo.Department;
            user.DepartmentNumber = userInfo.GetUserPropertyValue("departmentnumber");
            return user;
        }

        private UserAccount LoadAzureUser(string username)
        {
            GraphServiceClient graphClient = GraphClient;


            IGraphServiceUsersCollectionRequest request = graphClient.Users.Request().Filter($"mail eq '{username}'");

            // Load user data - note that external users need to be looked up by userPrincipalName
            User user = request.GetAsync().Result.FirstOrDefault();

            return new UserAccount() {
                Name = username,
                Approved = true,
                UseADAuthentication = false,
                FirstName = user.GivenName,
                LastName = user.Surname,
                Phone = user.MobilePhone,
                DisplayName = username,
                Email = user.Mail,
            };

        }
        private bool IsInDatabase(string collumn)
        {
            return !string.Equals(collumn, "DisplayName", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(collumn, "Type", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(collumn, "AccountName", StringComparison.OrdinalIgnoreCase); ;
        }

        [HttpPost]
        [Route("PostRoles/{userID}")]
        public IHttpActionResult PostAccountRoles([FromBody] IEnumerable<JObject> record, string userID)
        {
            if (!PostAuthCheck())
            {
                return Unauthorized();
            }

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                TableOperations<ApplicationRoleUserAccount> tbl = new TableOperations<ApplicationRoleUserAccount>(connection);
                IEnumerable<ApplicationRole> roles = record.Select(r => r.ToObject<ApplicationRole>());
                foreach (ApplicationRole role in roles)
                {
                    ApplicationRoleUserAccount current = tbl
                        .QueryRecordWhere("ApplicationRoleID = {0} AND UserAccountID = {1}", role.ID, userID);
                    if (current is null)
                        tbl.AddNewRecord(new ApplicationRoleUserAccount() { ApplicationRoleID = role.ID, UserAccountID = new Guid(userID) });
                }

                foreach (ApplicationRoleUserAccount role in tbl.QueryRecordsWhere("UserAccountID = {0}", userID))
                {
                    if (roles.FirstOrDefault(r => r.ID == role.ApplicationRoleID) is null)
                        tbl.DeleteRecord(role);
                }

                return Ok(1);
            }

        }


        [HttpGet]
        [Route("Roles/{userID}")]
        public IHttpActionResult GetAccountRoles(string userID)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
                return Ok(new TableOperations<ApplicationRole>(connection).QueryRecords("Name", new RecordRestriction(
                    "(SELECT COUNT(ID) FROM ApplicationRoleUserAccount WHERE UserAccountID = {0} AND ApplicationRoleID = ApplicationRole.ID) > 0", userID)));
        }

        [HttpPost]
        [Route("Verify")]
        public IHttpActionResult GetVerifyUser([FromBody] string userName)
        {
            if (userName is null || !GetAuthCheck())
                return Unauthorized();

          
            if (IsValidADUser(userName))
                return Ok(LoadADUser(userName));

            if (IsValidAzureADUserName(userName).Result)
                return Ok(LoadAzureUser(userName));

            return Ok((UserAccount)null);
        }

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck() || ViewOnly)
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                UserAccount newRecord = record.ToObject<UserAccount>();
                newRecord = new UserAccount()
                {
                    Name = newRecord.Name,
                    Approved= newRecord.Approved,
                    UseADAuthentication= IsValidADUser(newRecord.Name),
                    ChangePasswordOn = newRecord.ChangePasswordOn,
                    DefaultNodeID= newRecord.DefaultNodeID,
                    Department = "",
                    Email= newRecord.Email,
                    EmailConfirmed= newRecord.EmailConfirmed,
                    Phone= newRecord.Phone,
                    PhoneConfirmed= newRecord.PhoneConfirmed,   
                    LockedOut= newRecord.LockedOut,
                    Password= newRecord.Password,
                    ReceiveNotifications= newRecord.ReceiveNotifications,
                    MobilePhone = newRecord.MobilePhone,
                    FirstName   = newRecord.FirstName,
                    LastName = newRecord.LastName,
                    CreatedBy = User.Identity.Name,
                    CreatedOn = DateTime.UtcNow,
                    UpdatedBy = User.Identity.Name,
                    UpdatedOn = DateTime.UtcNow
                };
                int result = new TableOperations<UserAccount>(connection).AddNewRecord(newRecord);
                return Ok(result);
            }
        }



    }
}