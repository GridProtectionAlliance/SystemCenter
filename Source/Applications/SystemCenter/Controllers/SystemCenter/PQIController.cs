//******************************************************************************************************
//  PQIController.cs - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/26/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using openXDA.PQI;
using openXDA.Model.SystemCenter;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/SystemCenter/PQI")]
    public class PQIController : ApiController
    {

        const string SettingsCategory = "systemSettings";

        public string ClientID
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From Setting Where Name = 'PQI.ClientID'") ?? "";
            }
        }

        public string ClientSecret
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From Setting Where Name = 'PQI.ClientSecret'") ?? "";
            }
        }

        public string Username
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From Setting Where Name = 'PQI.Username'") ?? "";
            }
        }

        public string Password
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From Setting Where Name = 'PQI.Password'") ?? "";
            }
        }
        public string PingURL
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From Setting Where Name = 'PQI.PingURL'") ?? "";
            }
        }
        public string BaseURL
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection(SettingsCategory))
                    return connection.ExecuteScalar<string>($"SELECT Value From Setting Where Name = 'PQI.BaseURL'") ?? "";
            }
        }

        [Route("Facilities"), HttpGet]
        public IHttpActionResult GetFacilities()
        {
            try
            {
                PQIWSClient pqiwsClient = new PQIWSClient(BaseURL, FetchAccessToken);

                return Ok(pqiwsClient.GetAllFacilities().Result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [Route("Companies"), HttpGet]
        public IHttpActionResult GetCompanies()
        {
            try
            {
                PQIWSClient pqiwsClient = new PQIWSClient(BaseURL, FetchAccessToken);

                return Ok(pqiwsClient.GetAllCompanies().Result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("Addresses"), HttpGet]
        public IHttpActionResult GetAdresses()
        {
            try
            {
                PQIWSClient pqiwsClient = new PQIWSClient(BaseURL, FetchAccessToken);

                return Ok(pqiwsClient.GetAllAddresses().Result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("Test"), HttpGet]
        public IHttpActionResult TestPQI()
        {
            AppStatus appStatus = new()
            {
                Status = "N/A",
                Details = []
            };

            if (String.IsNullOrEmpty(BaseURL))
                return Ok(appStatus);

            appStatus.Status = "Error";

            string accessToken = "";
            NetworkCredential clientCredential = new NetworkCredential(ClientID, ClientSecret);
            NetworkCredential userCredential = new NetworkCredential(Username, Password);
            PingClient pingClient = new PingClient(PingURL);
            Task exchangeTask = pingClient.ExchangeAsync(clientCredential, userCredential);
            try
            { 
                exchangeTask.GetAwaiter().GetResult();
            }
            catch (Exception)
            {
                appStatus.Details = 
                [
                    new StatusItem()
                        { 
                            Status = "Error",
                            Description = "Authentication error. Check the PQI authentication settings in openXDA."
                        }
                ];
                return Ok(appStatus);
            }

            try
            {
                PQIWSClient pqiwsClient = new (BaseURL, () => (accessToken));

                Task<List<Company>> result = pqiwsClient.GetAllCompanies();
            }
            catch (Exception)
            {
                appStatus.Details = 
                [
                    new StatusItem()
                    {
                        Status = "Error",
                        Description = "Could not connect to PQI Client. Check the PQI.Url setting in System Center."
                    }
                ];
                return Ok(appStatus);
            }

            appStatus.Status = "Success";
            appStatus.Details.Add(new StatusItem()
            {
                Status = "Success",
                Description = "Successfully connected to PQI."
            });
            return Ok(appStatus);
        }

        private string FetchAccessToken()
        {
            NetworkCredential clientCredential = new NetworkCredential(ClientID, ClientSecret);
            NetworkCredential userCredential = new NetworkCredential(Username, Password);
            PingClient pingClient = new PingClient(PingURL);
            Task exchangeTask = pingClient.ExchangeAsync(clientCredential, userCredential);
            exchangeTask.GetAwaiter().GetResult();
            return pingClient.AccessToken;
        }
    }
}