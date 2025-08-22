//******************************************************************************************************
//  OpenXDAApi.cs - Gbtc
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
//  04/08/2025 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using GSF.Configuration;
using GSF.Data;
using openXDA.APIAuthentication;
using SystemCenter.Model;

namespace SEBrowser.Controllers.OpenXDA
{
    /// <summary>
    /// Helper class that provides openXDA API Calls
    /// </summary>
    public class OpenXDAApi : XDAAPIHelper
    {
        private static string Connection { get; } = "systemSettings";
        private static APIConfiguration config;
        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration APISettings { get; } = new APIConfiguration();
        }

        static OpenXDAApi()
        {
            RefreshSettings();
        }

        public static void RefreshSettings()
        {
            config = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).APISettings;
        }

        public async void ReconfigureNodes(string nodeName)
        {
            RefreshSettings();
            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            using (AdoDataConnection connection = CreateDbConnection())
            {
                DataTable hosts = connection
                    .RetrieveData(@"
                        SELECT
                            ActiveHost.URL,
                            Node.ID as NodeID
                        FROM 
	                        ActiveHost JOIN 
	                        Node ON ActiveHost.ID = Node.HostRegistrationID JOIN
	                        NodeType ON Node.NodeTypeID = NodeType.ID
                        WHERE
	                        NodeType.Name = {0}", nodeName);
                Task[] reconfigureTasks = hosts
                    .AsEnumerable()
                    .Select(row =>
                    {
                        string url = row.ConvertField<string>("URL");
                        int nodeID = row.ConvertField<int>("NodeID");

                        APIQuery query = new APIQuery(Key, Token, url.Split(';'));
                        return query.SendWebRequestAsync(ConfigureRequest, $"/Node/{nodeID}/Reconfigure");
                    }).ToArray();
                await Task.WhenAll(reconfigureTasks).ConfigureAwait(false);
            }
        }

        /// <summary>
        /// API Token used to access OpenXDA
        /// </summary>
        protected override string Token
        {
            get
            {
               return config?.Token ?? "";
            }

        }

        /// <summary>
        /// API Key used to access OpenXDA
        /// </summary>
        protected override string Key
        {
            get
            {
                return config?.Key ?? "";
            }

        }

        /// <summary>
        /// API Key used to access OpenXDA
        /// </summary>
        protected override string Host
        {
            get
            {
                return config?.Host ?? "";
            }
        }

        private static AdoDataConnection CreateDbConnection()
        {
            AdoDataConnection connection = new AdoDataConnection(Connection);
            connection.DefaultTimeout = DataExtensions.DefaultTimeoutDuration;
            return connection;
        }
    }
}