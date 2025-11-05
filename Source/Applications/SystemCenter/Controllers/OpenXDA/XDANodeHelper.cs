//******************************************************************************************************
//  XDANodeHelper.cs - Gbtc
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
//  10/16/2025 - Gabriel Santos
//       Refactored with upstream changes, scope reduced to just nodes.
//
//******************************************************************************************************

using System;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using GSF.Data;
using openXDA.APIAuthentication;

namespace SystemCenter.Controllers
{
    public static class XDANodeHelper
    {
        public static async void ReconfigureNodes(string nodeName)
        {
            if (!XDAAPIHelper.TryRefreshSettings())
                throw new InvalidOperationException("Unable to retrieve XDA credentials while using API Helper. Check static intialization in startup.");

            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }

            using (AdoDataConnection connection = Program.Host.CreateDbConnection())
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

                        APIQuery query = new APIQuery(XDAAPIHelper.Key, XDAAPIHelper.Token, url.Split(';'));
                        return query.SendWebRequestAsync(ConfigureRequest, $"/Node/{nodeID}/Reconfigure");
                    }).ToArray();
                await Task.WhenAll(reconfigureTasks).ConfigureAwait(false);
            }
        }
    }
}