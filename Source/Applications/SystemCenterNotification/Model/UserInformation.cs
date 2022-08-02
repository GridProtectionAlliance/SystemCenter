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

using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using GSF.Security;
using GSF.Security.Model;
using System;
using System.Collections.Generic;
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
    public class UserController: ApiController
    {
        [Route(), HttpGet]
        public IHttpActionResult Get()
        {
            UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
            userInfo.Initialize();

            string username = System.Web.HttpContext.Current.User.Identity.Name;
            string usersid = UserInfo.UserNameToSID(username);

            UserAccount account;
            bool requireEmailConfirm = true;

            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                account = new TableOperations<UserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);
                requireEmailConfirm = connection.ExecuteScalar<bool>("SELECT Value From [Setting] Where Name = 'Subscription.RequireConfirmation'");
                if (account == null)
                {
                    // Add User to the Database
                    Guid id = Guid.NewGuid();
                    account = new UserAccount()
                    {
                        UpdatedOn = DateTime.UtcNow,
                        CreatedBy = userInfo.UserName,
                        CreatedOn = DateTime.UtcNow,
                        LockedOut = false,
                        UseADAuthentication = true,
                        UpdatedBy = userInfo.UserName,
                        Email = userInfo.Email,
                        DefaultNodeID = new Guid("00000000-0000-0000-0000-000000000000"),
                        LastName = userInfo.LastName,
                        FirstName = userInfo.FirstName,
                        Password = null,
                        Name = usersid,
                        Approved = true,
                        EmailConfirmed = false,
                        PhoneConfirmed = false,
                        Phone = userInfo.Telephone,
                        ID = id
                    };

                    new TableOperations<UserAccount>(connection).AddNewRecord(account);

                }

            }

            UserInformation result = new UserInformation()
            {
                Roles = new List<string>(),
                UserID = account.ID,
                EmailConfirmed = account.EmailConfirmed || !requireEmailConfirm,
                PhoneConfirmed = account.PhoneConfirmed,
                
            };
        
            if (User.IsInRole("Administrator")) result.Roles.Add("Administrator");
            if (User.IsInRole("Viewer")) result.Roles.Add("Viewer");
            if (User.IsInRole("Transmission SME")) result.Roles.Add("Transmission SME");
            if (User.IsInRole("PQ Data Viewer")) result.Roles.Add("PQ Data Viewer");


            return Ok(result);
        }
    }
}