//******************************************************************************************************
//  TripRestorationController.cs - Gbtc
//
//  Copyright © 2024, Grid Protection Alliance.  All Rights Reserved.
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
//  01/17/2024 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using openXDA.APIAuthentication;
using openXDA.Model;
using SystemCenter.Notifications.Model;
using ConfigurationLoader = SystemCenter.Notifications.Model.ConfigurationLoader;

namespace SystemCenter.Notifications.Controllers
{
    public class TripRestorationController : ApiController
    {
        const string Connection = "systemSettings";

        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration APISettings { get; } = new APIConfiguration();
        }

        [Route("EventEmailNodes"), HttpGet]
        public IEnumerable<Node> GetEventEmailNodes()
        {
            using (AdoDataConnection connection = CreateDbConnection())
            {
                TableOperations<NodeType> nodeTypeTable = new TableOperations<NodeType>(connection);
                TableOperations<Node> nodeTable = new TableOperations<Node>(connection);
                NodeType eventEmailNodeType = nodeTypeTable.QueryRecordWhere("TypeName = 'openXDA.Nodes.Types.Email.EventEmailNode'");

                if (eventEmailNodeType is null)
                    return Enumerable.Empty<Node>();

                return nodeTable
                    .QueryRecordsWhere("NodeTypeID = {0}", eventEmailNodeType.ID)
                    .ToList();
            }
        }

        [Route("IsTripped/{nodeID}"), HttpGet]
        public async Task<bool> GetTripped(int nodeID)
        {
            Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);
            APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, settings.APISettings.Host.Split(';'));
            static void Configure(HttpRequestMessage request) => request.Method = HttpMethod.Get;

            using (HttpResponseMessage response = await query.SendWebRequestAsync(Configure, $"/Node/{nodeID}/IsTripped"))
            {
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsAsync<bool>();
            }
        }

        [Route("RestoreEventEmails/{nodeID}"), HttpPost]
        public async Task RestoreEventEmails(int nodeID)
        {
            Settings settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure);
            APIQuery query = new APIQuery(settings.APISettings.Key, settings.APISettings.Token, settings.APISettings.Host.Split(';'));
            static void Configure(HttpRequestMessage request) => request.Method = HttpMethod.Post;

            using (HttpResponseMessage response = await query.SendWebRequestAsync(Configure, $"/Node/{nodeID}/RestoreEventEmails"))
            {
                response.EnsureSuccessStatusCode();
            }
        }

        private AdoDataConnection CreateDbConnection()
        {
            AdoDataConnection connection = new AdoDataConnection(Connection);
            connection.DefaultTimeout = DataExtensions.DefaultTimeoutDuration;
            return connection;
        }
    }
}
