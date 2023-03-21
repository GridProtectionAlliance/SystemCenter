//******************************************************************************************************
//  UserInformation.cs - Gbtc
//
//  Copyright © 2018, Grid Protection Alliance.  All Rights Reserved.
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
//  05/26/2022 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using GSF.Security;
using GSF.Security.Model;
using Microsoft.Graph;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace SystemCenter.Notifications.Model
{
    /// <summary>
    /// Defines the current Users Information used for these pages.
    /// </summary>
    public class UserInformation
    {

        #region [ Properties ]

        public List<string> Roles { get; set; }
        public Guid UserID { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool PhoneConfirmed { get; set; }
        public int? CellCarrierID { get; set; }
        public string CellPhone { get; set; }
        #endregion       
    }

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
    }

    [RoutePrefix("api/UserInfo")]
    public class UserController : ApiController
    {

        /// <summary>
        /// Gets Azure AD settings.
        /// </summary>
        public AzureADSettings AzureADSettings => m_azureADSettings ??= AzureADSettings.Load(); 
       /* {
            get 
            {
                if (m_azureADSettings is null)
                    m_azureADSettings = AzureADSettings.Load();
                return m_azureADSettings;
            } 
        }*/

        /// <summary>
        /// Gets Graph client.
        /// </summary>
        public GraphServiceClient GraphClient
        {
            get 
            { 
                if (m_graphClient is null)
                    m_graphClient = AzureADSettings.GetGraphClient();
                return m_graphClient;
            }
        }

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

        [Route(), HttpGet]
        public IHttpActionResult Get()
        {
            UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
            userInfo.Initialize();

            string username = System.Web.HttpContext.Current.User.Identity.Name;
            string usersid = UserInfo.UserNameToSID(username);

            UserAccount account;
            bool requireEmailConfirm = true;
            openXDA.Model.UserAccountCarrier cellCarrier;

            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                account = new TableOperations<UserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);
                requireEmailConfirm = connection.ExecuteScalar<bool>("SELECT Value From [Setting] Where Name = 'Subscription.RequireConfirmation'");
                if (account == null)
                {
                    // Add User to the Database
                    Guid id = Guid.NewGuid();
                    if (IsValidADUser(username))
                        account = LoadADUser(username);
                    if (IsValidAzureADUserName(username).Result)
                        account = LoadAzureUser(username);
                    account.UpdatedOn = DateTime.UtcNow;
                    account.CreatedBy = userInfo.UserName;
                    account.CreatedOn = DateTime.UtcNow;
                    account.LockedOut = false;

                    new TableOperations<UserAccount>(connection).AddNewRecord(account);

                }

                cellCarrier = new TableOperations<openXDA.Model.UserAccountCarrier>(connection).QueryRecordWhere("UserAccountID = {0}", account.ID);
            }

            UserInformation result = new UserInformation()
            {
                Roles = new List<string>(),
                UserID = account.ID,
                EmailConfirmed = account.EmailConfirmed || !requireEmailConfirm,
                PhoneConfirmed = account.PhoneConfirmed,
                CellCarrierID = cellCarrier?.CarrierID ?? null,
                CellPhone = account.Phone ?? account.MobilePhone

            };

            if (User.IsInRole("Administrator")) result.Roles.Add("Administrator");
            if (User.IsInRole("Viewer")) result.Roles.Add("Viewer");
            if (User.IsInRole("Transmission SME")) result.Roles.Add("Transmission SME");
            if (User.IsInRole("PQ Data Viewer")) result.Roles.Add("PQ Data Viewer");

            return Ok(result);
        }

        [Route("{carrierID:int}"), HttpGet]
        public IHttpActionResult PatchCarrier(int carrierID)
        {
            try
            {
                UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
                userInfo.Initialize();

                string username = System.Web.HttpContext.Current.User.Identity.Name;
                string usersid = UserInfo.UserNameToSID(username);

                UserAccount account;
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    account = new TableOperations<UserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);

                    openXDA.Model.UserAccountCarrier cellCarrier = new TableOperations<openXDA.Model.UserAccountCarrier>(connection).QueryRecordWhere("UserAccountID = {0}", account.ID);
                    if (cellCarrier == null)
                    {
                        cellCarrier = new openXDA.Model.UserAccountCarrier()
                        {
                            CarrierID = carrierID,
                            UserAccountID = account.ID
                        };
                        new TableOperations<openXDA.Model.UserAccountCarrier>(connection).AddNewRecord(cellCarrier);
                    }
                    else
                    {
                        cellCarrier.CarrierID = carrierID;
                        new TableOperations<openXDA.Model.UserAccountCarrier>(connection).UpdateRecord(cellCarrier);
                    }
                    return Ok(1);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("PatchPhone/{phone}"), HttpGet]
        public IHttpActionResult PatchPhone(string phone)
        {
            try
            {
                UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
                userInfo.Initialize();

                string username = System.Web.HttpContext.Current.User.Identity.Name;
                string usersid = UserInfo.UserNameToSID(username);

                UserAccount account;
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    account = new TableOperations<UserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);
                    account.Phone = phone;
                    account.PhoneConfirmed = false;
                    new TableOperations<UserAccount>(connection).UpdateRecord(account);
                   
                    return Ok(1);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private bool IsValidADUser(string userName)
        {
            string sid = UserInfo.GroupNameToSID(userName);
            return UserInfo.IsUserSID(sid);
        }

        private async Task<bool> IsValidAzureADUserName(string userName)
        {
            GraphServiceClient graphClient = GraphClient;

            if (graphClient is null)
                return false;

            try
            {
                IUserRequest request = graphClient.Users[userName].Request();

                // Load user data - note that external users need to be looked up by userPrincipalName
                Microsoft.Graph.User user = userName.Contains("#EXT#") ?
                    (await graphClient.Users.Request().Filter($"userPrincipalName eq '{userName}'").GetAsync()).FirstOrDefault() :
                    await request.GetAsync();

                return !(user is null);
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

        private UserAccount LoadADUser(string username)
        {
            UserAccount user = new UserAccount()
            {
                Name = username,
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
            user.EmailConfirmed = false;
            user.PhoneConfirmed = false;
            user.ReceiveNotifications = false;
            user.Approved = true;
            user.Department = userInfo.Department;
            user.DepartmentNumber = userInfo.GetUserPropertyValue("departmentnumber");
            return user;
        }

        private UserAccount LoadAzureUser(string username)
        {
            GraphServiceClient graphClient = GraphClient;

            Microsoft.Graph.User user = username.Contains("#EXT#") ?
                               graphClient.Users.Request().Filter($"userPrincipalName eq '{username}'").GetAsync().Result.FirstOrDefault() :
                               graphClient.Users[username].Request().GetAsync().Result;

            return new UserAccount()
            {
                Name = user.UserPrincipalName,
                Approved = true,
                UseADAuthentication = false,
                FirstName = user.GivenName,
                LastName = user.Surname,
                Phone = user.MobilePhone,
                Email = user.Mail,
                EmailConfirmed = false,
                PhoneConfirmed = false,
            };

        }
    }
}