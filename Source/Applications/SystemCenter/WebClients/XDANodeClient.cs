//******************************************************************************************************
//  XDANodeClient.cs - Gbtc
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
//  07/23/2021 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Http;
using System.Text;
using GSF.Data;

namespace SystemCenter.WebClients
{
    public class XDANodeClient
    {
        private Func<AdoDataConnection> ConnectionFactory { get; }

        public XDANodeClient(Func<AdoDataConnection> connectionFactory) =>
            ConnectionFactory = connectionFactory;

        public void NotifyNodes(string assemblyName, string typeName, string action)
        {
            foreach (Action<HttpRequestMessage> webRequest in EnumerateWebRequests(assemblyName, typeName, action))
                _ = HttpClient.SendAsync(webRequest);
        }

        private IEnumerable<Action<HttpRequestMessage>> EnumerateWebRequests(string assemblyName, string typeName, string action)
        {
            DataTable QueryHosts()
            {
                const string HostQueryFormat =
                    "SELECT " +
                    "    ActiveHost.RegistrationKey, " +
                    "    ActiveHost.APIToken, " +
                    "    ActiveHost.URL, " +
                    "    Node.ID NodeID " +
                    "FROM " +
                    "    ActiveHost JOIN " +
                    "    Node ON Node.HostRegistrationID = ActiveHost.ID JOIN " +
                    "    NodeType ON Node.NodeTypeID = NodeType.ID " +
                    "WHERE " +
                    "    NodeType.AssemblyName = {0} AND " +
                    "    NodeType.TypeName = {1}";

                using (AdoDataConnection connection = ConnectionFactory())
                    return connection.RetrieveData(HostQueryFormat, assemblyName, typeName);
            }

            IEnumerable<DataRow> EnumerateHosts()
            {
                using (DataTable hosts = QueryHosts())
                {
                    foreach (DataRow host in hosts.Rows)
                        yield return host;
                }
            }

            foreach (DataRow host in EnumerateHosts())
            {
                string registrationKey = host.ConvertField<string>("RegistrationKey");
                string apiToken = host.ConvertField<string>("APIToken");
                string hostURL = host.ConvertField<string>("URL");
                int nodeID = host.ConvertField<int>("NodeID");

                yield return request =>
                {
                    request.Method = HttpMethod.Post;

                    string cleanHostURL = hostURL.Trim().TrimEnd('/');
                    string fullURL = $"{cleanHostURL}/Node/{nodeID}/{action}";
                    request.RequestUri = new Uri(fullURL);

                    const string type = "XDA-Host";
                    string decode = $"{registrationKey}:{apiToken}";
                    Encoding utf8 = new UTF8Encoding(false);
                    byte[] credentialData = utf8.GetBytes(decode);
                    string credentials = Convert.ToBase64String(credentialData);
                    request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue(type, credentials);
                };
            }
        }
    }
}