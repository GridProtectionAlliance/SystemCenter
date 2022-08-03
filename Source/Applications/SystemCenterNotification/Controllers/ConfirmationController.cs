//******************************************************************************************************
//  ConfirmationController.cs - Gbtc
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
//  07/28/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using GSF.Security.Model;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using openXDA.APIAuthentication;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;

namespace SystemCenter.Notifications.Controllers
{

    [RoutePrefix("api/Confirm")]
    public class ConfirmationController : ApiController
    {
        const string SettingsCategory = "systemSettings";

        public string Host
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From [SystemCenter.Setting] Where Name = 'XDA.Url'") ?? "";
            }
        }

        public string Key
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From [SystemCenter.Setting] Where Name = 'XDA.APIKey'") ?? "";
            }
        }

        public string Token
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From [SystemCenter.Setting] Where Name = 'XDA.APIToken'") ?? "";
            }
        }

        [Route("Email"), HttpGet]
        public IHttpActionResult ConfirmEmail()
        {
            try
            {
                UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
                userInfo.Initialize();

                string username = System.Web.HttpContext.Current.User.Identity.Name;
                string usersid = UserInfo.UserNameToSID(username);

                ConfirmableUserAccount account;
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    account = new TableOperations<ConfirmableUserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);


                    if (account.EmailConfirmed)
                        return Ok(1);

                    else
                        connection.ExecuteNonQuery("UPDATE UserAccount SET EmailConfirmed = 1 WHERE ID = {0}", account.ID);
                    return Ok(1);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


        }

        [Route("Phone"), HttpGet]
        public IHttpActionResult ConfirmPhone()
        {
            try
            {
                UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
                userInfo.Initialize();

                string username = System.Web.HttpContext.Current.User.Identity.Name;
                string usersid = UserInfo.UserNameToSID(username);

                ConfirmableUserAccount account;
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    account = new TableOperations<ConfirmableUserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);


                    if (account.PhoneConfirmed)
                        return Ok(1);

                    else
                        connection.ExecuteNonQuery("UPDATE UserAccount SET PhoneConfirmed = 1 WHERE ID = {0}", account.ID);
                    return Ok(1);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


        }

        [Route("ResendEmail"), HttpGet]
        public IHttpActionResult ResendEmail()
        {
            try
            {
                UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
                userInfo.Initialize();

                string username = System.Web.HttpContext.Current.User.Identity.Name;
                string usersid = UserInfo.UserNameToSID(username);

                ConfirmableUserAccount account;
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    account = new TableOperations<ConfirmableUserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);


                    if (account.EmailConfirmed)
                        return Ok(1);

                    //Send Email from openXDA
                    APIQuery query = new APIQuery(Key, Token, Host.Split(';'));

                    void ConfigureRequest(HttpRequestMessage request)
                    {
                        request.Method = HttpMethod.Get;
                    }

                    HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/email/sendVerification/{account.ID}").Result;

                    return Ok(1);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


        }

        [Route("ResendText"), HttpGet]
        public IHttpActionResult ResendText()
        {
            try
            {
                UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
                userInfo.Initialize();

                string username = System.Web.HttpContext.Current.User.Identity.Name;
                string usersid = UserInfo.UserNameToSID(username);

                ConfirmableUserAccount account;
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    account = new TableOperations<ConfirmableUserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);


                    if (account.PhoneConfirmed)
                        return Ok(1);

                    //Send Text from openXDA
                    APIQuery query = new APIQuery(Key, Token, Host.Split(';'));

                    void ConfigureRequest(HttpRequestMessage request)
                    {
                        request.Method = HttpMethod.Get;
                    }

                    HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/email/sendTextVerification/{account.ID}").Result;
                    int code = 0;
                    if (responseMessage.IsSuccessStatusCode)
                        code =  int.Parse(responseMessage.Content.ReadAsStringAsync().Result);
                    return Ok(code);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


        }
    }
}