//******************************************************************************************************
//  OpenXDAMeterDataController.cs - Gbtc
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
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using GSF.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SystemCenter.WebClients;

namespace SystemCenter.Controllers.OpenXDA.Meters
{
    [RoutePrefix("api/OpenXDA/MeterData")]
    public class OpenXDAMeterDataController : ApiController
    {
        #region [ Constructors ]

        public OpenXDAMeterDataController()
        {
            XDANodeClient = new XDANodeClient(CreateDbConnection);
            HIDSClient = new HIDSClient(CreateDbConnection);
        }

        #endregion

        #region [ Properties ]

        private XDANodeClient XDANodeClient { get; }
        private HIDSClient HIDSClient { get; }

        #endregion

        #region [ Methods ]

        [Route("AffectedFileCount")]
        public int GetFileCount(int meterID, DateTime startTime, DateTime endTime)
        {
            using (AdoDataConnection connection = CreateDbConnection())
                return QueryFileCount(connection, meterID, startTime, endTime);
        }

        [Route("Delete")]
        public async Task DeleteAsync([FromBody] JObject deleteParameters, CancellationToken cancellationToken = default)
        {
            int meterID = deleteParameters.Value<int>("meterID");
            DateTime startTime = deleteParameters.Value<DateTime>("startTime");
            DateTime endTime = deleteParameters.Value<DateTime>("endTime");

            using (AdoDataConnection connection = CreateDbConnection())
            {
                DeleteEventData(connection, meterID, startTime, endTime);
                await DeleteTrendingDataAsync(meterID, startTime, endTime, cancellationToken);
                DeleteFileBlobs(connection, meterID, startTime, endTime, cancellationToken);
            }
        }

        private void DeleteEventData(AdoDataConnection connection, int meterID, DateTime startTime, DateTime endTime)
        {
            const string TimestampFormat = "yyyy-MM-dd HH:mm:ss.fffffff";

            string Format(DateTime dateTime) =>
                dateTime.ToString(TimestampFormat);

            string start = Format(startTime);
            string end = Format(endTime);

            string baseCriteria =
                $"FileGroupID IN " +
                $"( " +
                $"    SELECT ID " +
                $"    FROM FileGroup " +
                $"    WHERE " +
                $"        MeterID = {meterID} AND " +
                $"        DataEndTime >= '{start}' AND " +
                $"        DataStartTime <= '{end}' " +
                $")";

            CascadeDelete(connection, "Event", baseCriteria);
            XDANodeClient.NotifyNodes("openXDA.Nodes.dll", "openXDA.Nodes.Types.FilePruning.FilePrunerNode", "PurgeOrphanData");
        }

        private async Task DeleteTrendingDataAsync(int meterID, DateTime startTime, DateTime endTime, CancellationToken cancellationToken) =>
            await HIDSClient.DeleteTrendingDataAsync(meterID, startTime, endTime, cancellationToken);

        private void DeleteFileBlobs(AdoDataConnection connection, int meterID, DateTime startTime, DateTime endTime, CancellationToken cancellationToken)
        {
            const string QueryFormat =
                "DELETE FROM FileBlob " +
                "WHERE DataFileID IN " +
                "( " +
                "    SELECT TOP 50 DataFile.ID " +
                "    FROM " +
                "        DataFile JOIN " +
                "        FileGroup ON DataFile.FileGroupID = FileGroup.ID " +
                "    WHERE " +
                "        FileGroup.MeterID = {0} AND " +
                "        FileGroup.DataEndTime >= {1} AND " +
                "        FileGroup.DataStartTime <= {2} " +
                ")";

            while (true)
            {
                if (cancellationToken.IsCancellationRequested)
                    break;

                int count = connection.ExecuteNonQuery(QueryFormat, meterID, startTime, endTime);

                if (count == 0)
                    break;
            }
        }

        private int QueryFileCount(AdoDataConnection connection, int meterID, DateTime startTime, DateTime endTime)
        {
            const string QueryFormat =
                "SELECT COUNT(*) " +
                "FROM FileGroup " +
                "WHERE " +
                "    MeterID = {0} AND " +
                "    DataEndTime >= {1} AND " +
                "    DataStartTime <= {2}";

            IDbDataParameter startTime2 = ToDateTime2(connection, startTime);
            IDbDataParameter endTime2 = ToDateTime2(connection, endTime);
            return connection.ExecuteScalar<int>(QueryFormat, meterID, startTime2, endTime2);
        }

        private void CascadeDelete(AdoDataConnection connection, string tableName, string baseCriteria)
        {
            using (IDbCommand sc = connection.Connection.CreateCommand())
            {
                sc.CommandText = "dbo.UniversalCascadeDelete";
                sc.CommandType = CommandType.StoredProcedure;
                IDbDataParameter param1 = sc.CreateParameter();
                param1.ParameterName = "@tableName";
                param1.Value = tableName;
                IDbDataParameter param2 = sc.CreateParameter();
                param2.ParameterName = "@baseCriteria";
                param2.Value = baseCriteria;
                sc.Parameters.Add(param1);
                sc.Parameters.Add(param2);
                sc.ExecuteNonQuery();
            }
        }

        private IDbDataParameter ToDateTime2(AdoDataConnection connection, DateTime dateTime)
        {
            using (IDbCommand command = connection.Connection.CreateCommand())
            {
                IDbDataParameter parameter = command.CreateParameter();
                parameter.DbType = DbType.DateTime2;
                parameter.Value = dateTime;
                return parameter;
            }
        }

        #endregion

        #region [ Static ]

        // Static Methods
        private static AdoDataConnection CreateDbConnection() =>
            new AdoDataConnection("systemSettings");

        #endregion
    }
}