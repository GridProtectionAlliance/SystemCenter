//******************************************************************************************************
//  OpenMICController.cs - Gbtc
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
//  08/03/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using GSF.Data.Model;
using SystemCenter.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using System.Net.Http.Headers;
using GSF.Web;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using GSF.Net.Security;
using GSF.Configuration;
using log4net;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/OpenMIC")]
    public class OpenMICController: ApiController
    {
        #region [ Constructor ]
        public OpenMICController()
        {
            using(AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                TableOperations<Setting> table = new TableOperations<Setting>(connection);
                InstanceUrl = table.QueryRecordWhere("Name = 'OpenMIC.Url'")?.Value ?? "";
                Credential = table.QueryRecordWhere("Name = 'OpenMIC.Url'")?.Value ?? "";
                Password = table.QueryRecordWhere("Name = 'OpenMIC.Url'")?.Value ?? "";
            }
        }

        #endregion

        #region [ Properties ]
        private string InstanceUrl { get; set; }
        private string Credential { get; set; }
        private string Password { get; set; }

        #endregion

        #region [ Methods ] 

        [HttpGet, Route("Acronym/{meterID:int}")]
        public IHttpActionResult Acronym(int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                AdditionalFieldValue value = new TableOperations<AdditionalFieldValue>(connection).GetValue("Meter", meterID, "OpenMICAcronym");
                return Ok(value.Value);
            }
        }

        [HttpGet, Route("Test/{meter}")]
        public IHttpActionResult Test(string meter)
        {
            using (WebRequestHandler handler = new WebRequestHandler())
            using (HttpClient client = new HttpClient(handler))
            {
                handler.ServerCertificateValidationCallback += HandleCertificateValidation;

                client.BaseAddress = new Uri(InstanceUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.AddBasicAuthenticationHeader(Credential, Password);

                HttpResponseMessage response = client.GetAsync($"api/Operations/Test/{meter}").Result;

                if (!response.IsSuccessStatusCode)
                    return BadRequest($"Server returned status code {response.StatusCode}: {response.ReasonPhrase}");
                string rsp = response.Content.ReadAsStringAsync().Result;
                return Ok(rsp);
            }
        }

        [HttpGet, Route("Meters")]
        public IHttpActionResult Meters()
        {
            using (WebRequestHandler handler = new WebRequestHandler())
            using (HttpClient client = new HttpClient(handler))
            {
                handler.ServerCertificateValidationCallback += HandleCertificateValidation;

                client.BaseAddress = new Uri(InstanceUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.AddBasicAuthenticationHeader(Credential, Password);

                HttpResponseMessage response = client.GetAsync($"api/Operations/Meters").Result;

                if (!response.IsSuccessStatusCode)
                    return BadRequest($"Server returned status code {response.StatusCode}: {response.ReasonPhrase}");

                string rsp = response.Content.ReadAsStringAsync().Result;
                return Ok(rsp);
            }
        }

        [HttpGet, Route("Statistics/{meter}")]
        public IHttpActionResult Statistics(string meter)
        {
            using (WebRequestHandler handler = new WebRequestHandler())
            using (HttpClient client = new HttpClient(handler))
            {
                handler.ServerCertificateValidationCallback += HandleCertificateValidation;

                client.BaseAddress = new Uri(InstanceUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.AddBasicAuthenticationHeader(Credential, Password);

                HttpResponseMessage response = client.GetAsync($"api/Operations/Statistics/{meter}").Result;

                if (!response.IsSuccessStatusCode)
                    return BadRequest($"Server returned status code {response.StatusCode}: {response.ReasonPhrase}");

                string rsp = response.Content.ReadAsStringAsync().Result;
                return Ok(rsp);
            }
        }



        private string GenerateAntiForgeryToken()
        {
            using (WebRequestHandler handler = new WebRequestHandler())
            using (HttpClient client = new HttpClient(handler))
            {
                handler.ServerCertificateValidationCallback += HandleCertificateValidation;

                client.BaseAddress = new Uri(InstanceUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.AddBasicAuthenticationHeader(Credential, Password);

                HttpResponseMessage response = client.GetAsync("api/rvht").Result;

                if (!response.IsSuccessStatusCode)
                    throw new InvalidOperationException($"Server returned status code {response.StatusCode}: {response.ReasonPhrase}");

                return response.Content.ReadAsStringAsync().Result;
            }
        }

        private bool HandleCertificateValidation(Object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            SimpleCertificateChecker simpleCertificateChecker = new SimpleCertificateChecker();

            CategorizedSettingsElementCollection systemSettings = ConfigurationFile.Current.Settings["systemSettings"];
            systemSettings.Add("CertFile", "", "This is a certfile.");
            systemSettings.Add("ValidPolicyErrors", "None", "Password for PQMarkWeb API access.");
            systemSettings.Add("ValidChainFlags", "NoError", "Password for PQMarkWeb API access.");

            try
            {
                simpleCertificateChecker.ValidPolicyErrors = (SslPolicyErrors)Enum.Parse(typeof(SslPolicyErrors), (systemSettings["ValidPolicyErrors"].Value != "All" ? systemSettings["ValidPolicyErrors"].Value : "7"));
                simpleCertificateChecker.ValidChainFlags = (X509ChainStatusFlags)Enum.Parse(typeof(X509ChainStatusFlags), (systemSettings["ValidChainFlags"].Value != "All" ? systemSettings["ValidChainFlags"].Value : (~0).ToString()));
                simpleCertificateChecker.TrustedCertificates.Add((!string.IsNullOrEmpty(systemSettings["CertFile"].Value) ? new X509Certificate2(systemSettings["CertFile"].Value) : certificate));
            }
            catch (Exception ex)
            {
                Log.Error(ex.ToString());
            }

            return simpleCertificateChecker.ValidateRemoteCertificate(sender, certificate, chain, sslPolicyErrors);
        }

        #endregion

        #region [ Static ]
        private static readonly ILog Log = LogManager.GetLogger(typeof(OpenMICController));

        #endregion

    }
}