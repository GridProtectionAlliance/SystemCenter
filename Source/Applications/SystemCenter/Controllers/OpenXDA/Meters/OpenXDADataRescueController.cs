//******************************************************************************************************
//  OpenXDADataRescueController.cs - Gbtc
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
//  06/12/2021 - Stephen Wills
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using GSF.Data;
using Newtonsoft.Json.Linq;
using SystemCenter.WebClients;

namespace SystemCenter.Controllers.OpenXDA.Meters
{
    [RoutePrefix("api/OpenXDA/DataRescue")]
    public class OpenXDADataRescueController : ApiController
    {
        #region [ Members ]

        // Nested Types

        private class DataRescueOperation
        {
            public int ID { get; set; }
            public int MeterID { get; set; }
            public DateTime StartTime { get; set; }
            public DateTime EndTime { get; set; }
            public double TimeShift { get; set; }
            public string TimeShiftUnits { get; set; }
            public List<DataRescueChannelAdjustment> ChannelAdjustments { get; set; }

            public TimeSpan TimeShiftSpan => ConvertFrom(TimeShift, TimeShiftUnits);

            private TimeSpan ConvertFrom(double shift, string units)
            {
                switch (units)
                {
                    case "ticks": return TimeSpan.FromTicks((long)shift);
                    case "milliseconds": return TimeSpan.FromMilliseconds(shift);
                    case "seconds": return TimeSpan.FromSeconds(shift);
                    case "minutes": return TimeSpan.FromMinutes(shift);
                    case "hours": return TimeSpan.FromHours(shift);
                    case "days": return TimeSpan.FromDays(shift);
                    default: throw new ArgumentException($"Unrecognized units: {units}", nameof(units));
                }
            }
        }

        private class DataRescueChannelAdjustment
        {
            public int ID { get; set; }
            public int ChannelID { get; set; }
            public double Multiplier { get; set; }
            public double Adder { get; set; }
        }

        #endregion

        #region [ Constructors ]

        public OpenXDADataRescueController()
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

        [Route("Operations")]
        public JArray GetOperations(int meterID)
        {
            string GetUnits(TimeSpan timeShift)
            {
                if (timeShift.TotalDays > 1)
                    return "days";
                if (timeShift.TotalHours > 1)
                    return "hours";
                if (timeShift.TotalMinutes > 1)
                    return "minutes";
                if (timeShift.TotalSeconds > 1)
                    return "seconds";
                if (timeShift.TotalMilliseconds > 1)
                    return "milliseconds";
                return "ticks";
            }

            double ConvertTo(TimeSpan timeShiftSpan, string units)
            {
                switch (units)
                {
                    case "ticks": return timeShiftSpan.Ticks;
                    case "milliseconds": return timeShiftSpan.TotalMilliseconds;
                    case "seconds": return timeShiftSpan.TotalSeconds;
                    case "minutes": return timeShiftSpan.TotalMinutes;
                    case "hours": return timeShiftSpan.TotalHours;
                    case "days": return timeShiftSpan.TotalDays;
                    default: throw new ArgumentException($"Unrecognized units: {units}", nameof(units));
                }
            }

            JObject ToOperation(DataRow row)
            {
                dynamic operation = new JObject();
                operation.ID = row.ConvertField<int>("ID");
                operation.MeterID = row.ConvertField<string>("MeterID");
                operation.StartTime = row.ConvertField<DateTime>("StartTime");
                operation.EndTime = row.ConvertField<DateTime>("EndTime");

                long timeShiftTicks = row.ConvertField<long>("TimeShiftTicks");
                TimeSpan timeShiftSpan = TimeSpan.FromTicks(timeShiftTicks);
                string timeShiftUnits = GetUnits(timeShiftSpan);
                double timeShift = ConvertTo(timeShiftSpan, timeShiftUnits);
                operation.TimeShift = timeShift;
                operation.TimeShiftUnits = timeShiftUnits;
                operation.ChannelAdjustments = new JArray();

                return operation;
            }

            using (AdoDataConnection connection = CreateDbConnection())
            using (DataTable operationTable = QueryOperations(connection, meterID))
            using (DataTable channelAdjustmentTable = QueryChannelAdjustments(connection, meterID))
            {
                List<JObject> operations = operationTable
                    .AsEnumerable()
                    .Select(ToOperation)
                    .ToList();

                Dictionary<int, JObject> operationLookup = operations
                    .ToDictionary(operation => operation.Value<int>("ID"));

                foreach (DataRow row in channelAdjustmentTable.Rows)
                {
                    int dataRescueOperationID = row.ConvertField<int>("DataRescueOperationID");

                    if (!operationLookup.TryGetValue(dataRescueOperationID, out JObject operation))
                        continue;

                    JArray channelAdjustments = operation.Value<JArray>("ChannelAdjustments");

                    dynamic channelAdjustment = new JObject();
                    channelAdjustment.ID = row.ConvertField<int>("ID");
                    channelAdjustment.DataRescueOperationID = dataRescueOperationID;
                    channelAdjustment.ChannelID = row.ConvertField<int>("ChannelID");
                    channelAdjustment.Multiplier = row.ConvertField<double>("Multiplier");
                    channelAdjustment.Adder = row.ConvertField<double>("Adder");
                    channelAdjustments.Add(channelAdjustment);
                }

                return JArray.FromObject(operations);
            }
        }

        [Route("AffectedFileCount/{dataRescueOperationID?}")]
        public int GetFileCount(int? dataRescueOperationID = null, int? meterID = null, DateTime? startTime = null, DateTime? endTime = null)
        {
            using (AdoDataConnection connection = CreateDbConnection())
            {
                if (!(dataRescueOperationID is null))
                    return QueryFileCount(connection, dataRescueOperationID.GetValueOrDefault());

                if (meterID is null || startTime is null || endTime is null)
                {
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                    response.Content = new StringContent("meterID, startTime, and endTime must be defined");
                    response.ReasonPhrase = "Bad Request";
                    throw new HttpResponseException(response);
                }

                int defaultOrMeterID = meterID.GetValueOrDefault();
                DateTime defaultOrStartTime = startTime.GetValueOrDefault();
                DateTime defaultOrEndTime = endTime.GetValueOrDefault();
                return QueryFileCount(connection, defaultOrMeterID, defaultOrStartTime, defaultOrEndTime);
            }
        }

        [Route("SaveOperation")]
        public async Task PostOperationAsync([FromBody] JObject jOperation, CancellationToken cancellationToken = default)
        {
            DataRescueOperation operation = jOperation.ToObject<DataRescueOperation>();

            using (AdoDataConnection connection = CreateDbConnection())
            {
                int id = operation.ID;

                operation.ID = SaveOperation(connection, operation);
                SetTimeShift(connection, operation);
                SetChannelAdjustments(connection, operation);

                if (id != operation.ID)
                    SetAffectedFiles(connection, operation);

                PurgeStaleEventData(connection, operation);
                await PurgeStaleTrendingDataAsync(operation, cancellationToken);
                ReprocessAffectedFiles(connection, operation);
            }
        }

        [Route("Delete/{dataRescueOperationID}")]
        public async Task DeleteOperationAsync(int dataRescueOperationID, CancellationToken cancellationToken = default)
        {
            using (AdoDataConnection connection = CreateDbConnection())
            {
                DataRescueOperation ToOperation(DataRow row) => new DataRescueOperation()
                {
                    ID = row.ConvertField<int>("ID"),
                    MeterID = row.ConvertField<int>("MeterID"),
                    StartTime = row.ConvertField<DateTime>("StartTime"),
                    EndTime = row.ConvertField<DateTime>("EndTime")
                };

                DataRescueOperation operation = new Func<DataRescueOperation>(() =>
                {
                    const string QueryFormat =
                        "SELECT " +
                        "    ID, " +
                        "    MeterID, " +
                        "    StartTime, " +
                        "    EndTime " +
                        "FROM DataRescueOperation " +
                        "WHERE ID = {0}";

                    using (DataTable table = connection.RetrieveData(QueryFormat, dataRescueOperationID))
                    {
                        return table
                            .AsEnumerable()
                            .Select(ToOperation)
                            .FirstOrDefault();
                    }
                })();

                const string DeleteFormat =
                    "DELETE FROM DataRescueTimeShift " +
                    "WHERE DataRescueOperationID = {0} " +
                    "" +
                    "DELETE FROM DataRescueChannelAdjustment " +
                    "WHERE DataRescueOperationID = {0}";

                connection.ExecuteNonQuery(DeleteFormat, operation.ID);

                PurgeStaleEventData(connection, operation);
                await PurgeStaleTrendingDataAsync(operation, cancellationToken);
                ReprocessAffectedFiles(connection, operation);

                string baseCriteria = $"ID = {dataRescueOperationID}";
                CascadeDelete(connection, "DataRescueOperation", baseCriteria);
                XDANodeClient.NotifyNodes("openXDA.Nodes.dll", "openXDA.Nodes.Types.Analysis.AnalysisNode", "PollTaskQueue");
            }
        }

        private int QueryFileCount(AdoDataConnection connection, int dataRescueOperationID)
        {
            const string QueryFormat =
                "SELECT COUNT(*) " +
                "FROM DataRescueFileGroup " +
                "WHERE DataRescueOperationID = {0}";

            return connection.ExecuteScalar<int>(QueryFormat, dataRescueOperationID);
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

        private int SaveOperation(AdoDataConnection connection, DataRescueOperation operation)
        {
            const string QueryFormat =
                "UPDATE DataRescueOperation " +
                "SET " +
                "    MeterID = {1}, " +
                "    StartTime = {2}, " +
                "    EndTime = {3} " +
                "WHERE ID = {0} " +
                "" +
                "DECLARE @count INT = @@ROWCOUNT " +
                "" +
                "INSERT INTO DataRescueOperation(MeterID, StartTime, EndTime) " +
                "SELECT {1} MeterID, {2} StartTime, {3} EndTime " +
                "WHERE @count = 0 " +
                "" +
                "DECLARE @id INT = " +
                "( " +
                "    SELECT @@IDENTITY " +
                "    WHERE @count = 0 " +
                ") " +
                "" +
                "SELECT COALESCE(@id, {0})";

            int id = operation.ID;
            int meterID = operation.MeterID;
            DateTime startTime = operation.StartTime;
            DateTime endTime = operation.EndTime;
            IDbDataParameter startTime2 = ToDateTime2(connection, startTime);
            IDbDataParameter endTime2 = ToDateTime2(connection, endTime);
            return connection.ExecuteScalar<int>(QueryFormat, id, meterID, startTime2, endTime2);
        }

        private void SetTimeShift(AdoDataConnection connection, DataRescueOperation operation)
        {
            const string InsertUpdateFormat =
                "UPDATE DataRescueTimeShift " +
                "SET Ticks = {1} " +
                "WHERE DataRescueOperationID = {0} " +
                "" +
                "DECLARE @count INT = @@ROWCOUNT " +
                "" +
                "INSERT INTO DataRescueTimeShift(DataRescueOperationID, Ticks) " +
                "SELECT {0} DataRescueOperationID, {1} Ticks " +
                "WHERE @count = 0";

            const string DeleteFormat =
                "DELETE FROM DataRescueTimeShift " +
                "WHERE DataRescueOperationID = {0}";

            int operationID = operation.ID;
            TimeSpan timeShift = operation.TimeShiftSpan;
            string queryFormat = (timeShift != TimeSpan.Zero) ? InsertUpdateFormat : DeleteFormat;
            connection.ExecuteNonQuery(queryFormat, operationID, timeShift.Ticks);
        }

        private void SetChannelAdjustments(AdoDataConnection connection, DataRescueOperation operation)
        {
            int operationID = operation.ID;

            HashSet<int> previouslyAdjusted = new Func<HashSet<int>>(() =>
            {
                const string QueryFormat =
                    "SELECT ChannelID " +
                    "FROM DataRescueChannelAdjustment " +
                    "WHERE DataRescueOperationID = {0}";

                using (DataTable table = connection.RetrieveData(QueryFormat, operationID))
                {
                    IEnumerable<int> channelIDs = table
                        .AsEnumerable()
                        .Select(row => row.ConvertField<int>("ChannelID"));

                    return new HashSet<int>(channelIDs);
                }
            })();

            List<DataRescueChannelAdjustment> channelAdjustments = operation.ChannelAdjustments;

            IEnumerable<DataRescueChannelAdjustment> newAdjustments = channelAdjustments
                .Where(adjustment => !previouslyAdjusted.Contains(adjustment.ChannelID));

            IEnumerable<DataRescueChannelAdjustment> updatedAdjustments = channelAdjustments
                .Where(adjustment => previouslyAdjusted.Contains(adjustment.ChannelID));

            IEnumerable<int> removedAdjustments = previouslyAdjusted
                .Except(channelAdjustments.Select(adjustment => adjustment.ChannelID));

            foreach (DataRescueChannelAdjustment adjustment in newAdjustments)
            {
                const string InsertFormat =
                    "INSERT INTO DataRescueChannelAdjustment(DataRescueOperationID, ChannelID, Multiplier, Adder) " +
                    "VALUES({0}, {1}, {2}, {3})";

                int channelID = adjustment.ChannelID;
                double multiplier = adjustment.Multiplier;
                double adder = adjustment.Adder;
                connection.ExecuteNonQuery(InsertFormat, operationID, channelID, multiplier, adder);
            }

            foreach (DataRescueChannelAdjustment adjustment in updatedAdjustments)
            {
                const string UpdateFormat =
                    "UPDATE DataRescueChannelAdjustment " +
                    "SET " +
                    "    Multiplier = {2}, " +
                    "    Adder = {3} " +
                    "WHERE " +
                    "    DataRescueOperationID = {0} AND " +
                    "    ChannelID = {1}";

                int channelID = adjustment.ChannelID;
                double multiplier = adjustment.Multiplier;
                double adder = adjustment.Adder;
                connection.ExecuteNonQuery(UpdateFormat, operationID, channelID, multiplier, adder);
            }

            foreach (int channelID in removedAdjustments)
            {
                const string DeleteFormat =
                    "DELETE FROM DataRescueChannelAdjustment " +
                    "WHERE " +
                    "    DataRescueOperationID = {0} AND " +
                    "    ChannelID = {1}";

                connection.ExecuteNonQuery(DeleteFormat, operationID, channelID);
            }
        }

        private void SetAffectedFiles(AdoDataConnection connection, DataRescueOperation operation)
        {
            const string QueryFormat =
                "INSERT INTO DataRescueFileGroup(DataRescueOperationID, FileGroupID) " +
                "SELECT {0} DataRescueOperationID, FileGroup.ID FileGroupID " +
                "FROM FileGroup " +
                "WHERE " +
                "    MeterID = {1} AND " +
                "    DataEndTime >= {2} AND " +
                "    DataStartTime <= {3}";

            int operationID = operation.ID;
            int meterID = operation.MeterID;
            DateTime startTime = operation.StartTime;
            DateTime endTime = operation.EndTime;
            connection.ExecuteNonQuery(QueryFormat, operationID, meterID, startTime, endTime);
        }

        private void PurgeStaleEventData(AdoDataConnection connection, DataRescueOperation operation)
        {
            string baseCriteria =
                $"FileGroupID IN " +
                $"( " +
                $"    SELECT ID " +
                $"    FROM DataRescueFileGroup " +
                $"    WHERE DataRescueOperationID = {operation.ID} " +
                $")";

            CascadeDelete(connection, "Event", baseCriteria);
            XDANodeClient.NotifyNodes("openXDA.Nodes.dll", "openXDA.Nodes.Types.FilePruning.FilePrunerNode", "PurgeOrphanData");
        }

        private async Task PurgeStaleTrendingDataAsync(DataRescueOperation operation, CancellationToken cancellationToken)
        {
            int meterID = operation.MeterID;
            DateTime startTime = operation.StartTime;
            DateTime endTime = operation.EndTime;
            await HIDSClient.DeleteTrendingDataAsync(meterID, startTime, endTime, cancellationToken);
        }

        private void ReprocessAffectedFiles(AdoDataConnection connection, DataRescueOperation operation)
        {
            const string QueryFormat =
                "INSERT INTO AnalysisTask(FileGroupID, MeterID, Priority) " +
                "SELECT " +
                "    DataRescueFileGroup.FileGroupID, " +
                "    {1} MeterID, " +
                "    1 Priority " +
                "FROM DataRescueFileGroup " +
                "WHERE DataRescueFileGroup.DataRescueOperationID = {0}";

            int operationID = operation.ID;
            int meterID = operation.MeterID;
            connection.ExecuteNonQuery(QueryFormat, operationID, meterID);
            XDANodeClient.NotifyNodes("openXDA.Nodes.dll", "openXDA.Nodes.Types.Analysis.AnalysisNode", "PollTaskQueue");
        }

        private DataTable QueryOperations(AdoDataConnection connection, int meterID)
        {
            const string QueryFormat =
                "SELECT " +
                "    DataRescueOperation.ID, " +
                "    DataRescueOperation.MeterID, " +
                "    DataRescueOperation.StartTime, " +
                "    DataRescueOperation.EndTime, " +
                "    COALESCE(DataRescueTimeShift.Ticks, 0) AS TimeShiftTicks " +
                "FROM " +
                "    DataRescueOperation LEFT OUTER JOIN " +
                "    DataRescueTimeShift ON DataRescueTimeShift.DataRescueOperationID = DataRescueOperation.ID " +
                "WHERE DataRescueOperation.MeterID = {0} " +
                "ORDER BY DataRescueOperation.ID DESC";

            return connection.RetrieveData(QueryFormat, meterID);
        }

        private DataTable QueryChannelAdjustments(AdoDataConnection connection, int meterID)
        {
            const string QueryFormat =
                "SELECT " +
                "    DataRescueChannelAdjustment.ID, " +
                "    DataRescueChannelAdjustment.DataRescueOperationID, " +
                "    DataRescueChannelAdjustment.ChannelID, " +
                "    DataRescueChannelAdjustment.Multiplier, " +
                "    DataRescueChannelAdjustment.Adder " +
                "FROM " +
                "    DataRescueOperation JOIN " +
                "    DataRescueChannelAdjustment ON DataRescueChannelAdjustment.DataRescueOperationID = DataRescueOperation.ID " +
                "WHERE DataRescueOperation.MeterID = {0}";

            return connection.RetrieveData(QueryFormat, meterID);
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

        #endregion

        #region [ Static ]

        // Static Methods
        private static AdoDataConnection CreateDbConnection() =>
            new AdoDataConnection("systemSettings");

        #endregion
    }
}