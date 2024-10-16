//******************************************************************************************************
//  AppHostController.cs - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  06/11/2023 - C. lackner
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Reflection;
using Newtonsoft.Json;
using openXDA.APIMiddleware;
using openXDA.APIAuthentication;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using SystemCenter.Model;
using ConfigurationLoader = SystemCenter.Model.ConfigurationLoader;

namespace SystemCenter.Controllers
{
    public class AppProperty
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class AppHost
    { 
        public string Image { get; set; }
        public IEnumerable<AppProperty> Properties { get; set; }
        public string PingURL { get; set; }
        public string ConsoleURL { get; set; }
        public string StatsURL { get; set; }
        public string Name { get; set; }
    }

    [RoutePrefix("api/SystemCenter/AppHost")]
    public class AppHostController : ApiController
    {
        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration XDAAPISettings { get; } = new APIConfiguration();

            [Category]
            [SettingName("MiMD")]
            public APIConfiguration MiMDAPISettings { get; } = new APIConfiguration();

        }

        [Route(), HttpGet]
        public IHttpActionResult Get()
        {
            List<AppHost> hosts = new List<AppHost>();

            // Add SystemCenter
            hosts.Add(GetSystemCenter());

            // Add MiMD
            hosts.Add(GetMiMD());

            // Add XDA Nodes
            using (AdoDataConnection connection = CreateDbConnection())
            {
                hosts.AddRange(new TableOperations<HostRegistration>(connection)
                    .QueryRecords().Select(host => new AppHost()
                    {
                        PingURL = $"./api/SystemCenter/AppHost/xdaConsole/{host.ID}/Ping",
                        ConsoleURL = $"./api/SystemCenter/AppHost/xdaConsole/{host.ID}",
                        StatsURL = $"./api/SystemCenter/AppHost/xdaStatistics/{host.ID}",
                        Name = "XDA - " + host.RegistrationKey,
                        Image = "../Images/NodeTiles/OpenXDA.png",
                        Properties = new AppProperty[]
                        {
                            new AppProperty() { Name= "Host", Value = host.URL },
                            new AppProperty() { Name= "Database", Value = DatabaseName },
                            new AppProperty() {
                                Name= "Nodes Running",
                                Value = connection.ExecuteScalar<int>("SELECT COUNT(ID) FROM Node WHERE HostRegistrationID = {0}", host.ID)
                                .ToString()
                            },
                            new AppProperty() { Name= "Last Checkin", Value = host.CheckedIn.ToString() }
                        }
                    }));
            }

            return Ok(hosts);
        }

        [Route("xdaStatistics/{id}"), HttpGet]
        public IHttpActionResult XDAFetchStatistics(int id)
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).XDAAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetXDABaseURL(id) + "/");

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"api/SystemCenter/SystemHealth").Result;

            return ResponseMessage(responseMessage);
        }

        [Route("xdaConsole/{id}/Send/{session}"), HttpPost]
        public IHttpActionResult XDAConsoleSend(int id, string session, [FromBody] object postData)
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).XDAAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetXDABaseURL(id) + "/");

            var json = JsonConvert.SerializeObject(postData);

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Post;
                request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest,
                $"/api/Console/Send/{session}", User).Result;

            return ResponseMessage(responseMessage);
        }

        [Route("xdaConsole/{id}/Connect"), HttpGet]
        public IHttpActionResult XDAConsoleConnect(int id)
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).XDAAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetXDABaseURL(id) + "/");

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest,
                $"/api/Console/Connect", User).Result;

            return ResponseMessage(responseMessage);
        }

        [Route("xdaConsole/{id}/Retrieve/{session}"), HttpGet]
        public IHttpActionResult XDAConsoleRetrive(int id, string session)
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).XDAAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetXDABaseURL(id) + "/");

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest,
                $"/api/Console/Retrieve/{session}", User).Result;

            return ResponseMessage(responseMessage);
        }

        [Route("xdaConsole/{id}/Ping"), HttpGet]
        public IHttpActionResult XDAPing(int id)
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).XDAAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetXDABaseURL(id) + "/");

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"api/SystemCenter/Alive").Result;

            return ResponseMessage(responseMessage);
        }

        [Route("MiMDConsole/Ping"), HttpGet]
        public IHttpActionResult MiMDPing()
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).MiMDAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetMiMDBaseURL() + "/");

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"api/MiMD/Ping", User).Result;

            return ResponseMessage(responseMessage);
        }

        [Route("MiMDConsole/Connect"), HttpGet]
        public IHttpActionResult MiMDConsoleConnect()
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).MiMDAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetMiMDBaseURL() + "/");

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest, $"/api/MiMD/Console/Connect", User).Result;

            return ResponseMessage(responseMessage);
        }

        [Route("MiMDConsole/Retrieve/{session}"), HttpGet]
        public IHttpActionResult MiMDConsoleRetrive(string session)
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).MiMDAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetMiMDBaseURL() + "/");

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest,
                $"api/MiMD/Console/Retrieve/{session}", User).Result;

            return ResponseMessage(responseMessage);
        }

        [Route("MiMDConsole/Send/{session}"), HttpPost]
        public IHttpActionResult MiMDConsoleSend(string session, [FromBody] object postData)
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).MiMDAPISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, GetMiMDBaseURL() + "/");

            var json = JsonConvert.SerializeObject(postData);

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Post;
                request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            }

            HttpResponseMessage responseMessage = query.SendWebRequestAsync(ConfigureRequest,
                $"api/MiMD/Console/Send/{session}", User).Result;

            return ResponseMessage(responseMessage);
        }

        #region [ Helpers ]

        private string GetXDABaseURL(int id)
        {
            using (AdoDataConnection connection = CreateDbConnection())
            {
                return new TableOperations<HostRegistration>(connection).QueryRecordWhere("ID = {0}", id)?.URL ?? "";
            }
        }

        private string GetMiMDBaseURL()
        {
            using (AdoDataConnection connection = CreateDbConnection())
            {
                return connection.ExecuteScalar("", "SELECT Value FROM [SystemCenter.Setting] WHERE Name = {0}", "MiMD.Url");
            }
        }

        private AdoDataConnection CreateDbConnection()
        {
            AdoDataConnection connection = new AdoDataConnection("systemSettings");
            connection.DefaultTimeout = DataExtensions.DefaultTimeoutDuration;
            return connection;
        }

        private AppHost GetSystemCenter()
        {
            Version assemblyVersionInfo = AssemblyInfo.EntryAssembly.Version;
            string systemCenterVersion = assemblyVersionInfo.Major + "." +
                assemblyVersionInfo.Minor + "." + assemblyVersionInfo.Build + "."
                + assemblyVersionInfo.Revision;

            return new AppHost()
            {
                Image = "../Images/NodeTiles/SystemCenter.png",
                Properties = new AppProperty[] {
                    new AppProperty() { Name= "Host", Value = Url.Content("~/") },
                    new AppProperty() { Name= "Database", Value = DatabaseName },
                    new AppProperty() { Name= "Version", Value = systemCenterVersion }
                },
                PingURL = "./api/SystemCenter/Ping",
                ConsoleURL = "./api/SystemCenter/Console",
                Name = "SystemCenter"
            };
        }

        private AppHost GetMiMD()
        {
            return new AppHost()
            {
                Image = "../Images/NodeTiles/MiMD.png",
                Properties = new AppProperty[] {
                    new AppProperty() { Name= "Host", Value = GetMiMDBaseURL() },
                    new AppProperty() { Name= "Database", Value = DatabaseName },
                },
                PingURL = "./api/SystemCenter/AppHost/MiMDConsole/Ping",
                ConsoleURL = "./api/SystemCenter/AppHost/MiMDConsole",
                Name = "MiMD"
            };
        }

        private string DatabaseName
        {
            get
            {
                try
                {
                    using (AdoDataConnection database = CreateDbConnection())
                    {
                        return database.Connection.Database;
                    }
                }
                catch
                {
                    return "Not Available";
                }
            }
        }

        #endregion
    }

    [RoutePrefix("api/SystemCenter/Console")]
    public class ConsoleController : APIConsoleController
    {
        protected override IAPIConsoleHost Host => (IAPIConsoleHost) Program.Host;
    }

}