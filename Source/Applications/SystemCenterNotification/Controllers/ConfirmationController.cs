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
using GSF.Collections;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using GSF.Security.Model;
using GSF.Web.Model;
using Microsoft.AspNet.SignalR.Hubs;
using Newtonsoft.Json.Linq;
using openXDA.APIAuthentication;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using SystemCenter.Notifications.Model;
using ConfigurationLoader = SystemCenter.Notifications.Model.ConfigurationLoader;

namespace SystemCenter.Notifications.Controllers
{

    [RoutePrefix("api/Confirm")]
    public class ConfirmationController : ApiController
    {
        const string Connection = "systemSettings";

        private string PhoneCodeDictionary => Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "SystemCenter", "PhoneCodes.bin");

        private string EmailCodeDictionary => Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "SystemCenter", "EmailCodes.bin");

        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration APISettings { get; } = new APIConfiguration();
        }


        [Route("Email/{code}"), HttpGet]
        public IHttpActionResult ConfirmEmail(string code)
        {
            UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
            userInfo.Initialize();

            string username = System.Web.HttpContext.Current.User.Identity.Name;
            Tuple<DateTime, string> savedCode;
            lock (s_emailCodeLock)
            {
                using (FileBackedDictionary<string, Tuple<DateTime, string>> dictionary = new FileBackedDictionary<string, Tuple<DateTime, string>>(EmailCodeDictionary))
                {
                    if (!dictionary.TryGetValue(username, out savedCode))
                        savedCode = Tuple.Create(DateTime.MinValue, "");
                }
            }

            // Check to make sure it's no older than 24 hours
            if ((DateTime.UtcNow - savedCode.Item1).TotalDays > 1)
                return Ok(0);
            if (string.Compare(savedCode.Item2, code,true) != 0)
                return Ok(0);

            string usersid = UserInfo.UserNameToSID(username);

            ConfirmableUserAccount account;
            using (AdoDataConnection connection = CreateDbConnection())
            {
                account = new TableOperations<ConfirmableUserAccount>(connection)
                    .QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);

                if (account.EmailConfirmed)
                    return Ok(1);

                connection.ExecuteNonQuery("UPDATE UserAccount SET EmailConfirmed = 1 WHERE ID = {0}", account.ID);
                return Ok(1);
            }
        }

        [Route("Phone/{code}"), HttpGet]
        public IHttpActionResult ConfirmPhone(string code)
        {
            UserInfo userInfo = new UserInfo(System.Web.HttpContext.Current.User.Identity.Name);
            userInfo.Initialize();

            string username = System.Web.HttpContext.Current.User.Identity.Name;
            string usersid = UserInfo.UserNameToSID(username);

            Tuple<DateTime, string> savedCode;
            lock (s_phoneCodeLock)
            {
                using (FileBackedDictionary<string, Tuple<DateTime, string>> dictionary = new FileBackedDictionary<string, Tuple<DateTime, string>>(PhoneCodeDictionary))
                {
                    if (!dictionary.TryGetValue(username, out savedCode))
                        savedCode = Tuple.Create(DateTime.MinValue, "");
                }
            }

            // Check to make sure it's no older than 24 hours
            if ((DateTime.UtcNow - savedCode.Item1).TotalDays > 1)
                return Ok(0);
            if (string.Compare(savedCode.Item2, code, true) != 0)
                return Ok(0);

            ConfirmableUserAccount account;
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                account = new TableOperations<ConfirmableUserAccount>(connection).QueryRecordWhere("Name = {0} OR Name = {1}", usersid, username);

                if (account.PhoneConfirmed)
                    return Ok(1);

                connection.ExecuteNonQuery("UPDATE UserAccount SET PhoneConfirmed = 1 WHERE ID = {0}", account.ID);
                return Ok(1);
            }
        }

        [Route("ResendEmail"), HttpGet]
        public async Task<IHttpActionResult> ResendEmail()
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
                Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);
                APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, settings.APISettings.Host.Split(';'));

                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Get;
                }

                HttpResponseMessage responseMessage = await query.SendWebRequestAsync(ConfigureRequest, $"/api/email/sendVerification/{account.ID}");

                if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                    responseMessage.StatusCode = HttpStatusCode.Forbidden;

                if (responseMessage.StatusCode != HttpStatusCode.OK)
                    return ResponseMessage(responseMessage);

                string code = await responseMessage.Content.ReadAsStringAsync();
                lock (s_emailCodeLock)
                {
                    using (FileBackedDictionary<string, Tuple<DateTime,string>> dictionary = new FileBackedDictionary<string, Tuple<DateTime, string>>(EmailCodeDictionary))
                        dictionary.AddOrUpdate(username, new Tuple<DateTime,string> (DateTime.UtcNow,code));
                }

                return Ok(code);
            }
        }

        [Route("ResendText"), HttpGet]
        public async Task<IHttpActionResult> ResendText()
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
                Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);
                APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, settings.APISettings.Host.Split(';'));

                void ConfigureRequest(HttpRequestMessage request)
                {
                    request.Method = HttpMethod.Get;
                }

                HttpResponseMessage responseMessage = await query.SendWebRequestAsync(ConfigureRequest, $"/api/email/sendTextVerification/{account.ID}");

                if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                    responseMessage.StatusCode = HttpStatusCode.Forbidden;

                if (responseMessage.StatusCode != HttpStatusCode.OK)
                    return ResponseMessage(responseMessage);

                string code = await responseMessage.Content.ReadAsStringAsync();
                lock (s_phoneCodeLock)
                {
                    using (FileBackedDictionary<string, Tuple<DateTime, string>> dictionary = new FileBackedDictionary<string, Tuple<DateTime, string>>(PhoneCodeDictionary))
                        dictionary.AddOrUpdate(username, new Tuple<DateTime, string>(DateTime.UtcNow, code));
                }
                return ResponseMessage(responseMessage);
            }
        }

        [Route("Acknowledgment"), HttpGet]
        public IHttpActionResult GetAcknowledgement()
        {
            using (AdoDataConnection connection = CreateDbConnection())
                return Ok(connection.ExecuteScalar<string>($"SELECT Value From [SystemCenter.Setting] Where Name = 'Subscription.Acknowledge'") ?? "");
        }

        private AdoDataConnection CreateDbConnection()
        {
            AdoDataConnection connection = new AdoDataConnection(Connection);
            connection.DefaultTimeout = DataExtensions.DefaultTimeoutDuration;
            return connection;
        }

        private static readonly object s_emailCodeLock = new object();
        private static readonly object s_phoneCodeLock = new object();
    }
}