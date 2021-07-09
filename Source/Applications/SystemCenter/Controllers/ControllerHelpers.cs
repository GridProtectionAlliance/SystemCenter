//******************************************************************************************************
//  ControllerHelpers.cs - Gbtc
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
//  07/09/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using GSF.Data.Model;
using log4net;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using SystemCenter.Model;

namespace SystemCenter.Controllers
{
    public class ControllerHelpers
    {
        #region [ Static ]
        private static readonly ILog Log = LogManager.GetLogger(typeof(ControllerHelpers));


        #endregion

        /// <summary>
        /// Gets AntiForgeryToken from application
        /// </summary>
        /// <param name="application">Application name used in Settings table to define parameters</param>
        /// <returns>string token</returns>
        public static string GenerateAntiForgeryToken(string application)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {

                try
                {
                    string url = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Url'")?.Value ?? "";
                    string credential = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Credential'")?.Value ?? "";
                    string password = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Password'")?.Value ?? "";

                    return Get(url, "api/rvht", credential, password);
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }

            }
        }

        /// <summary>
        /// Processes Get request on baseURL + requestURI using provided credentials using Basic auth
        /// </summary>
        /// <param name="baseURL">Base URL of WebAPI</param>
        /// <param name="requestURI">Path to specific API request</param>
        /// <param name="credential">User Name</param>
        /// <param name="password">Password</param>
        /// <param name="token">anti forgery token, defaults to null</param>
        /// <returns>string</returns>
        public static string Get(string baseURL, string requestURI, string credential, string password, string token = null)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(baseURL);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{credential}:{password}")));

                    if(token != null)
                        client.DefaultRequestHeaders.Add("X-GSF-Verify", token);

                    HttpResponseMessage response = client.GetAsync(requestURI).Result;

                    if (!response.IsSuccessStatusCode)
                        return "";

                    Task<string> rsp = response.Content.ReadAsStringAsync();
                    return response.Content.ReadAsStringAsync().Result;
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }

            }
        }

        /// <summary>
        /// Processes Get request from an application using settings table parameters
        /// </summary>
        /// <param name="application">Name of Application</param>
        /// <param name="requestURI">Path to specific API request</param>
        /// <returns>string</returns>
        public static string Get(string application, string requestURI)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {

                try
                {
                    string url = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Url'")?.Value ?? "";
                    string credential = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Credential'")?.Value ?? "";
                    string password = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Password'")?.Value ?? "";

                    string token = GenerateAntiForgeryToken(application);
                    return Get(url, requestURI, credential, password, token);
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }

            }
        }

        /// <summary>
        /// Processes Get request from an application using settings table parameters
        /// </summary>
        /// <param name="application">Name of Application</param>
        /// <param name="requestURI">Path to specific API request</param>
        /// <returns>string</returns>
        public static T Get<T>(string application, string requestURI) where T: class
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {

                try
                {
                    string url = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Url'")?.Value ?? "";
                    string credential = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Credential'")?.Value ?? "";
                    string password = new TableOperations<Setting>(connection).QueryRecordWhere($"Name = '{application}.Password'")?.Value ?? "";

                    string token = GenerateAntiForgeryToken(application);
                    string result = Get(url, requestURI, credential, password, token);
                    return JsonConvert.DeserializeObject<T>(result);
                }
                catch (Exception ex)
                {
                    Log.Error(ex.Message);
                    return null;
                }

            }
        }


    }
}