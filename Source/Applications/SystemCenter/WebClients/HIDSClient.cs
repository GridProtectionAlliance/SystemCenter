//******************************************************************************************************
//  HIDSClient.cs - Gbtc
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
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using GSF.Data;
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SystemCenter.WebClients
{
    public class HIDSClient
    {
        private Func<AdoDataConnection> ConnectionFactory { get; }

        public HIDSClient(Func<AdoDataConnection> connectionFactory) =>
            ConnectionFactory = connectionFactory;

        public async Task DeleteTrendingDataAsync(int meterID, DateTime startTime, DateTime endTime, CancellationToken cancellationToken = default)
        {
            using (AdoDataConnection connection = ConnectionFactory())
                await DeleteTrendingDataAsync(connection, meterID, startTime, endTime, cancellationToken);
        }

        private async Task DeleteTrendingDataAsync(AdoDataConnection connection, int meterID, DateTime startTime, DateTime endTime, CancellationToken cancellationToken)
        {
            IEnumerable<string> EnumerateChannelTags()
            {
                const string QueryFormat =
                    "SELECT ID " +
                    "FROM Channel " +
                    "WHERE MeterID = {0}";

                using (DataTable channelTable = connection.RetrieveData(QueryFormat, meterID))
                {
                    foreach (DataRow row in channelTable.Rows)
                    {
                        int channelID = row.ConvertField<int>("ID");
                        yield return channelID.ToString("X8");
                    }
                }
            }

            Dictionary<string, string> hidsSettings = new Func<Dictionary<string, string>>(() =>
            {
                string GetValue(DataRow row) => row
                    .ConvertField<string>("Value")
                    .Trim();

                const string Query =
                    "SELECT Name, Value " +
                    "FROM Setting " +
                    "WHERE Name LIKE 'HIDS.%'";

                using (DataTable settingsTable = connection.RetrieveData(Query))
                {
                    return settingsTable
                        .AsEnumerable()
                        .GroupBy(row => row.ConvertField<string>("Name"))
                        .ToDictionary(grouping => grouping.Key, grouping => GetValue(grouping.First()));
                }
            })();

            string QuerySetting(string name) =>
                hidsSettings.TryGetValue(name, out string value) ? value.Trim() : null;

            string host = QuerySetting("HIDS.Host");
            string tokenID = QuerySetting("HIDS.TokenID") ?? "";
            string bucket = QuerySetting("HIDS.PointBucket") ?? "point_bucket";
            string organizationID = QuerySetting("HIDS.OrganizationID") ?? "gpa";

            if (string.IsNullOrEmpty(host))
                return;

            string trimmedHost = host.TrimEnd('/');
            string url = $"{trimmedHost}/api/v2/delete";

            string encodedBucket = Uri.EscapeDataString(bucket);
            string encodedOrganizationID = Uri.EscapeDataString(organizationID);
            string query = $"bucket={encodedBucket}&org={encodedOrganizationID}";

            void ConfigureRequest(HttpRequestMessage request)
            {
                DateTime ForceUTC(DateTime timestamp) =>
                    DateTime.SpecifyKind(timestamp, DateTimeKind.Utc);

                IEnumerable<string> conditionals = EnumerateChannelTags()
                    .Select(tag => $"tag == \"{tag}\"");

                DateTime start = ForceUTC(startTime);
                DateTime end = ForceUTC(endTime);

                JObject jBody = new JObject();
                jBody["predicate"] = string.Join(" or ", conditionals);
                jBody["start"] = JsonConvert.ToString(start);
                jBody["stop"] = JsonConvert.ToString(end);

                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri($"{url}?{query}");
                request.Content = new StringContent(jBody.ToString(), new UTF8Encoding(false), "application/json");
            }

            HttpResponseMessage response = await HttpClient.SendAsync(ConfigureRequest, cancellationToken);

            if (!response.IsSuccessStatusCode)
                Log.Warn($"[DataRescue] InfluxDB server returned {(int)response.StatusCode} {response.StatusCode} in response to delete request.");
        }

        private static readonly ILog Log = LogManager.GetLogger(typeof(HIDSClient));
    }
}