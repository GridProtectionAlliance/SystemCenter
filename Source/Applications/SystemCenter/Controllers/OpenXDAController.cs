//******************************************************************************************************
//  ModelBaseController.cs - Gbtc
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
//  10/04/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Net.Security;
using GSF.Security.Model;
using GSF.Web;
using GSF.Web.Security;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/OpenXDA")]
    public class OpenXDAController : ApiController { 
        #region [ Constructor ]

        #endregion

        #region [ Properties ]

        #endregion

        #region [ Methods ]
        [HttpGet, Route("{parentID:int?}")]
        public IHttpActionResult Get(int parentID = 0)
        {
            try
            {
                return Ok();
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private string GenerateAntiForgeryToken(string instance, UserAccount userAccount)
        {
            using (WebRequestHandler handler = new WebRequestHandler())
            using (HttpClient client = new HttpClient(handler))
            {
                handler.ServerCertificateValidationCallback += HandleCertificateValidation;

                client.BaseAddress = new Uri(instance);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.AddBasicAuthenticationHeader(userAccount.AccountName, userAccount.Password);

                HttpResponseMessage response = client.GetAsync("api/PQMark/GenerateRequestVerficationToken").Result;

                if (!response.IsSuccessStatusCode)
                    throw new InvalidOperationException($"Server returned status code {response.StatusCode}: {response.ReasonPhrase}");

                return response.Content.ReadAsStringAsync().Result;
            }
        }

        private static bool HandleCertificateValidation(Object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            SimpleCertificateChecker simpleCertificateChecker = new SimpleCertificateChecker();

            CategorizedSettingsElementCollection systemSettings = ConfigurationFile.Current.Settings["systemSettings"];
            systemSettings.Add("CertFile", "", "This is a certfile.");
            systemSettings.Add("ValidPolicyErrors", "None", "List of valid policy errors.");
            systemSettings.Add("ValidChainFlags", "NoError", "List of valid chain flags.");

            try
            {
                simpleCertificateChecker.ValidPolicyErrors = (SslPolicyErrors)Enum.Parse(typeof(SslPolicyErrors), (systemSettings["ValidPolicyErrors"].Value != "All" ? systemSettings["ValidPolicyErrors"].Value : "7"));
                simpleCertificateChecker.ValidChainFlags = (X509ChainStatusFlags)Enum.Parse(typeof(X509ChainStatusFlags), (systemSettings["ValidChainFlags"].Value != "All" ? systemSettings["ValidChainFlags"].Value : (~0).ToString()));
                simpleCertificateChecker.TrustedCertificates.Add((!string.IsNullOrEmpty(systemSettings["CertFile"].Value) ? new X509Certificate2(systemSettings["CertFile"].Value) : certificate));
            }
            catch (Exception ex)
            {
                Program.Host.LogException(ex);
            }

            return simpleCertificateChecker.ValidateRemoteCertificate(sender, certificate, chain, sslPolicyErrors);
        }

        #endregion

    }
}