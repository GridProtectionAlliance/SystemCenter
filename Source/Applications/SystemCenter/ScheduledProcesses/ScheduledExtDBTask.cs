//******************************************************************************************************
//  ScheduledExtDBTask.cs - Gbtc
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
//  09/18/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using GSF.Data.Model;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using SystemCenter.Model;
using Flee.PublicTypes;
using openXDA.Model;
using System.Reflection;
using System.Data;
using GSF.Collections;
using System.Web.Http.Filters;
using Microsoft.Graph.ExternalConnectors;
using System.Data.Common;
using System.Runtime.Remoting.Contexts;
using System.Web.Services.Description;
using System.Web.UI.WebControls;
using System.Collections.Concurrent;

namespace SystemCenter.ScheduledProcesses
{
    public class ScheduledExtDBTask
    {
        #region [ Member ]
        public ExternalDatabases ExternalDB { get; set; }
        public static readonly Func<AdoDataConnection> ConnectionFactory = () => new AdoDataConnection("systemSettings");

        // Line segment excluded, special case
        public static readonly Dictionary<Type, string> TableNames = new Dictionary<Type, string> { 
            {typeof(Meter),"Meter" }, 
            {typeof(Location), "Location"}, 
            {typeof(Model.Customer), "Customer"},
            {typeof(Line), "Line"},
            {typeof(Breaker), "Breaker"}, 
            {typeof(Bus), "Bus"}, 
            {typeof(CapBank), "CapBank"}, 
            {typeof(Transformer), "Transformer"}, 
            {typeof(CapBankRelay), "CapBankRelay"}, 
            {typeof(DER), "DER"}, 
            {typeof(Asset), "Asset"}, 
            {typeof(Generation), "Generation"},
            {typeof(StationAux), "StationAux"}, 
            {typeof(StationBattery), "StationBattery"}
        };
        public const string RegexPattern = "[{][^{}]*[}]";
        public const string RegexIllegal = @"[\s]";

        private static string FieldCountSQL(Type type) {
            return $@"
                SELECT SUM(RecordCount*(AF + XF)) AS CT FROM (SELECT (SELECT COUNT(ID) FROM {TableNames[type]}) AS RecordCount,
                (SELECT COUNT(ID) FROM AdditionalField WHERE AdditionalField.ParentTable LIKE '{TableNames[type]}' AND ExternalDBTableID = extDBTables.ID AND IsKey = 0) AS AF, 
                (SELECT COUNT(ID) FROM ExternalOpenXDAField WHERE ExternalOpenXDAField.ParentTable LIKE '{TableNames[type]}' AND ExternalOpenXDAField.ExternalDBTableID = extDBTables.ID ) AS XF
                FROM extDBTables WHERE ExtDBID = {{0}}) T";
        } 
        public class ExtDBTaskStatus
        {
            public string Message { get; set; }
            public string Status { get; set; }
            public int PercentFinished { get; set; }
            public int RowsAffected { get; set; }
            public int RecordsAffected { get; set; }
        }
        #endregion

        #region [ Constructor ]
        public ScheduledExtDBTask(ExternalDatabases task)
        {
            ExternalDB = task;
        }

        #endregion

        #region [ Methods ]
        public void Run()
        {
            Log.Info($"Running External Database Fetch Task {ExternalDB.ID}....");

            try
            {
                // Calling static method
                int rows = Run(ExternalDB);
                Log.Info($"Ran External Database Fetch Task: {ExternalDB.ID}, {rows} affected");

            }
            catch (Exception ex)
            {
                Log.Error(ex.Message, ex);
            }
        }
        public static int Run(ExternalDatabases extDB, ConcurrentQueue<ExtDBTaskStatus> logQueue = null)
        {
            using (AdoDataConnection xdaConnection = ConnectionFactory())
            {
                TableOperations<extDBTables> tblTable = new TableOperations<extDBTables>(xdaConnection);
                IEnumerable<extDBTables> extTables = tblTable.QueryRecordsWhere("ExtDBID = {0}", extDB.ID);
                if (extTables.Count() == 0)
                {
                    Log.Warn($"No tables found connected to external database {extDB.Name}.");
                    logQueue?.Enqueue(new ExtDBTaskStatus() {
                        RowsAffected = 0,
                        PercentFinished = 100,
                        RecordsAffected = 0,
                        Status = "Error",
                        Message = $"No tables found connected to external database {extDB.Name}."
                    });
                    return 0;
                }
                TableOperations<AdditionalField> addlFieldsTable = new TableOperations<AdditionalField>(xdaConnection);
                TableOperations<AdditionalFieldValue> addlValueTable = new TableOperations<AdditionalFieldValue>(xdaConnection);
                TableOperations<ExternalOpenXDAField> xdaFieldTable = new TableOperations<ExternalOpenXDAField>(xdaConnection);
                ExpressionContext context = new ExpressionContext();
                int rowsAffected = 0;
                int totalFields = 0;
                using (AdoDataConnection externalConnection = GetExternalConnection(extDB))
                {
                    // total count += in a foreach Type t
                    foreach (Type t in TableNames.Keys)
                    {
                        string tableName = TableNames[t];
                        totalFields += xdaConnection.ExecuteScalar<int>(FieldCountSQL(t), extDB.ID);
                    }

                    foreach (Type t in TableNames.Keys)
                    {
                        foreach (extDBTables extTable in extTables)
                        {
                            rowsAffected += RunOnType(t, extTable, addlFieldsTable, addlValueTable, xdaFieldTable, context, xdaConnection, externalConnection, totalFields, rowsAffected, logQueue);
                        }
                    }
                }
                extDB.LastDataUpdate = DateTime.UtcNow;
                new TableOperations<ExternalDatabases>(xdaConnection).UpdateRecord(extDB);
                logQueue?.Enqueue(new ExtDBTaskStatus()
                {
                    RowsAffected = rowsAffected,
                    PercentFinished = 100,
                    RecordsAffected = 0,
                    Status = "Success",
                    Message = $"Finished updating external database {extDB.Name}: {rowsAffected} rows affected."
                });
                return rowsAffected;
            }
        }
        public static int Run(ExternalDatabases extDB, string parentTable, int? parentID = null, ConcurrentQueue<ExtDBTaskStatus> logQueue = null)
        {
            Type tableType;
            try
            {
                tableType = TableNames.First(item => item.Value == parentTable).Key;
            }
            catch (InvalidOperationException ex)
            {
                Log.Error($"Type {parentTable} is not a recognized xda parent table.");

                logQueue?.Enqueue(new ExtDBTaskStatus()
                {
                    RowsAffected = 0,
                    PercentFinished = 100,
                    RecordsAffected = 0,
                    Status = "Error",
                    Message = $"Type {parentTable} is not a recognized xda parent table."
                });
                return 0;
            }

            using (AdoDataConnection xdaConnection = ConnectionFactory())
            {
                
                TableOperations<extDBTables> tblTable = new TableOperations<extDBTables>(xdaConnection);
                IEnumerable<extDBTables> extTables = tblTable.QueryRecordsWhere("ExtDBID = {0}", extDB.ID);
                if (extTables.Count() == 0)
                {
                    Log.Warn($"No tables found connected to external database ${extDB.Name}.");
                    logQueue?.Enqueue(new ExtDBTaskStatus()
                    {
                        RowsAffected = 0,
                        PercentFinished = 100,
                        RecordsAffected = 0,
                        Status = "Error",
                        Message = $"No tables found connected to external database {extDB.Name}."
                    });
                    return 0;
                }
                TableOperations<AdditionalField> addlFieldsTable = new TableOperations<AdditionalField>(xdaConnection);
                TableOperations<AdditionalFieldValue> addlValueTable = new TableOperations<AdditionalFieldValue>(xdaConnection);
                TableOperations<ExternalOpenXDAField> xdaFieldTable = new TableOperations<ExternalOpenXDAField>(xdaConnection);
                ExpressionContext context = new ExpressionContext();
                int rowsAffected = 0;
                using (AdoDataConnection externalConnection = GetExternalConnection(extDB))
                {
                    string sql = FieldCountSQL(tableType);
                    int totalFields = xdaConnection.ExecuteScalar<int>(sql, extDB.ID);
                    foreach (extDBTables extTable in extTables)
                    {
                        rowsAffected += RunOnType(tableType, extTable, addlFieldsTable, addlValueTable, xdaFieldTable, context, xdaConnection, externalConnection, totalFields, rowsAffected, logQueue, parentID);
                    }
                }
                extDB.LastDataUpdate = DateTime.UtcNow;
                new TableOperations<ExternalDatabases>(xdaConnection).UpdateRecord(extDB);
                logQueue?.Enqueue(new ExtDBTaskStatus()
                {
                    RowsAffected = rowsAffected,
                    PercentFinished = 100,
                    RecordsAffected = 0,
                    Status = "Success",
                    Message = $"Finished updating external database {extDB.Name}: {rowsAffected} rows affected."
                });
                return rowsAffected;
            }
        }
       
        private static int RunOnType(Type type, extDBTables extTable,
            TableOperations<AdditionalField> addlFieldsTable, TableOperations<AdditionalFieldValue> addlValuesTable,
            TableOperations<ExternalOpenXDAField> xdaFieldTable,
            ExpressionContext context,
            AdoDataConnection xdaConnection, AdoDataConnection extConnection,
            int totalFields, int tableFieldOffset, ConcurrentQueue<ExtDBTaskStatus> logQueue,
            int? parentID = null)
        {
            if (type == typeof(Meter))
                return UpdateData<Meter>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(Location))
                return UpdateData<Location>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(Model.Customer))
                return UpdateData<Model.Customer>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(Line))
                return UpdateData<Line>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(Breaker))
                return UpdateData<Breaker>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(Bus))
                return UpdateData<Bus>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(CapBank))
                return UpdateData<CapBank>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(Transformer))
                return UpdateData<Transformer>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(CapBankRelay))
                return UpdateData<CapBankRelay>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(DER))
                return UpdateData<DER>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(Asset))
                return UpdateData<Asset>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(Generation))
                return UpdateData<Generation>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(StationAux))
                return UpdateData<StationAux>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            else if (type == typeof(StationBattery))
                return UpdateData<StationBattery>(extTable, addlFieldsTable, addlValuesTable, xdaFieldTable, context, xdaConnection, extConnection, totalFields, tableFieldOffset, logQueue, parentID);
            // shouldn't be possible
            throw new ArgumentOutOfRangeException($"{type} is not recognized as an XDA parent table.");
        }

        public static int UpdateData<T>(extDBTables extTable,
            TableOperations<AdditionalField> addlFieldsTable, TableOperations<AdditionalFieldValue> addlValuesTable,
            TableOperations<ExternalOpenXDAField> xdaFieldTable,
            ExpressionContext context,
            AdoDataConnection xdaConnection, AdoDataConnection extConnection,
            int totalFields, int tableFieldOffset, ConcurrentQueue<ExtDBTaskStatus> logQueue,
            int? parentID = null) where T : class, new()
        {
            TableOperations<T> table = new TableOperations<T>(xdaConnection);
            // Ignore key fields, since those don't make sense to not be auto updated
            IEnumerable<AdditionalField> addlFields = addlFieldsTable.QueryRecordsWhere("ParentTable = {0} AND ExternalDBTableID = {1} AND IsKey = 0", table.TableName, extTable.ID);
            IEnumerable<ExternalOpenXDAField> xdaFields = xdaFieldTable.QueryRecordsWhere("ParentTable = {0} AND ExternalDBTableID = {1}", table.TableName, extTable.ID);

            if (!addlFields.Any() && !xdaFields.Any()) return 0;
            IEnumerable<T> allRecords;
            if (parentID is not null) allRecords = table.QueryRecordsWhere("ID = {0}", parentID);
            else allRecords = table.QueryRecords();
            int rows = 0;
            int updatedRecords = 0;
            string userTableName = (table.TableName == "Location" ? "Substation" : table.TableName);
            foreach (T record in allRecords)
            {
                int recordID = GetID(record);
                int rowsBeforeRecord = rows;
                if (recordID == -1) continue; // Should be impossible to trigger without huge overhauling of openXDA
                DataRowCollection data = RetrieveDataRecord(record, extTable, table, addlFieldsTable, addlValuesTable, context, extConnection);
                // null means no specific record was found
                if (data is null) continue;
                foreach (AdditionalField field in addlFields)
                {
                    string fieldValue;
                    try
                    {
                        fieldValue = data[0][field.FieldName].ToString();
                    }
                    catch
                    {
                        Log.Warn($"Additional field with no field in external database found: ID {field.ID}, Name {field.FieldName}, External Table {extTable.TableName}");
                        logQueue?.Enqueue(new ExtDBTaskStatus()
                        {
                            RowsAffected = tableFieldOffset + rows,
                            RecordsAffected = updatedRecords,
                            PercentFinished = ((tableFieldOffset + rows) / totalFields) * 100,
                            Status = "Warning",
                            Message = $"Additional field with no field in external database found: ID {field.ID}, Name {field.FieldName}, External Table {extTable.TableName}"
                        });
                        continue;
                    }
                    AdditionalFieldValue addlValue = addlValuesTable.QueryRecordWhere("ParentTableID = {0} AND AdditionalFieldID = {1}", recordID, field.ID);
                    if (addlValue is null)
                    {
                        addlValue = new AdditionalFieldValue()
                        {
                            ParentTableID = (int)recordID,
                            AdditionalFieldID = field.ID,
                            Value = fieldValue
                        };
                        rows += addlValuesTable.AddNewRecord(addlValue);
                    }
                    else
                    {
                        if (fieldValue == addlValue.Value) continue;
                        addlValue.Value = fieldValue;
                        rows += addlValuesTable.UpdateRecord(addlValue); // message for record update? field update?
                    }
                }
                bool hasXdaChanges = false;
                foreach (ExternalOpenXDAField field in xdaFields)
                {
                    object fieldValue;
                    try
                    {
                        fieldValue = data[0][field.FieldName];
                    }
                    catch
                    {
                        Log.Warn($"External OpenXDA field with no field in external database found: ID {field.ID}, Name {field.FieldName}, External Table {extTable.TableName}");
                        logQueue.Enqueue(new ExtDBTaskStatus()
                        {   
                            RowsAffected = tableFieldOffset + rows,
                            RecordsAffected = updatedRecords,
                            PercentFinished = ((tableFieldOffset + rows) / totalFields) * 100,
                            Status = "Warning",
                            Message = $"External OpenXDA field with no field in external database found: ID {field.ID}, Name {field.FieldName}, External Table {extTable.TableName}"
                        });
                        continue;
                    }
                    PropertyInfo fieldPropInfo = record.GetType().GetProperty(field.FieldName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (fieldPropInfo is null)
                    {
                        Log.Error($"External OpenXDA field defined that does not exist on the xda model {field.FieldName} on table {field.ParentTable}");
                        logQueue.Enqueue(new ExtDBTaskStatus()
                        {
                            RowsAffected = tableFieldOffset + rows,
                            RecordsAffected = updatedRecords,
                            PercentFinished = ((tableFieldOffset + rows) / totalFields) * 100,
                            Status = "Warning",
                            Message = $"External OpenXDA field defined that does not exist on the xda model {field.FieldName} on table {field.ParentTable}"
                        });
                        continue;
                    }
                    // This should work for primatives
                    if (fieldValue.Equals(fieldPropInfo.GetValue(record))) continue;
                    fieldPropInfo.SetValue(record, fieldValue);
                    hasXdaChanges = true;
                }
                if (hasXdaChanges) rows += table.UpdateRecord(record);
                logQueue.Enqueue(new ExtDBTaskStatus()
                {
                    RowsAffected = tableFieldOffset + rows,
                    RecordsAffected = updatedRecords,
                    PercentFinished = ((tableFieldOffset + rows) / totalFields) * 100,
                    Status = "Info",
                    Message = $"{(userTableName)} \"{GetName(record)}\" updated successfully for {rows - rowsBeforeRecord} fields."
                });
                updatedRecords += 1;
            }
            logQueue.Enqueue(new ExtDBTaskStatus()
            {
                RowsAffected = tableFieldOffset + rows,
                RecordsAffected = updatedRecords,
                PercentFinished = ((tableFieldOffset + rows) / totalFields) * 100,
                Status = "Info",
                Message = $"Table {userTableName} updated successfully for {updatedRecords} records and {rows} fields."
            });
            return rows;
        }

        public static DataTable RetrieveDataRecordTable<T>(T record, extDBTables extTable,
            TableOperations<T> table, TableOperations<AdditionalField> addlTable, TableOperations<AdditionalFieldValue> addlValuesTable,
            ExpressionContext context, AdoDataConnection externalConnection) where T : class, new()
        {
            DefineAllowedVariables(context);
            context.Variables[table.TableName] = record;
            // Defining additional fields
            int idKey = GetID(record);
            if (idKey == -1) return null; // Should be impossible to trigger without huge overhauling of openXDA
            IEnumerable<AdditionalField> infoFields = addlTable.QueryRecordsWhere("ParentTable = {0}", table.TableName, extTable.ID);
            IEnumerable<AdditionalField> keyFields = addlTable.QueryRecordsWhere("ParentTable = {0} AND ExternalDBTableID = {1} AND IsKey=1", table.TableName, extTable.ID);
            foreach (AdditionalField field in infoFields)
            {
                AdditionalFieldValue value = addlValuesTable.QueryRecordWhere("ParentTableID = {0} AND AdditionalFieldID = {1}", idKey, field.ID);
                if (keyFields.Any(keyField => keyField.ID == field.ID))
                {
                    // Assumption, if key field exists, then key field is required to query a singular record
                    // (even if multiple keys, maybe a user tries to mark multiple and the bring them up individually with table.Field.fieldName
                    if (value?.Value is null) return null;

                    // Means we've already defined a key
                    if (context.Variables["Key"] is not null)
                    {
                        Log.Warn($"External Table {extTable.TableName} has multiple key values defined. Using first value found as key \"{context.Variables["Key"]}\"");
                    }
                    else
                    {
                        // Key is defined with a special keyword
                        context.Variables["Key"] = value.Value;
                    }
                }
                string fieldName = RemoveIllegalCharacters(field.FieldName);
                context.Variables.DefineVariable(fieldName, typeof(string));
                context.Variables[fieldName] = value?.Value;
            }
            return ExecuteQueryWithContext(extTable, context, externalConnection, new Condition[0]);
        }

        public static DataRowCollection RetrieveDataRecord<T>(T record, extDBTables extTable,
            TableOperations<T> table, TableOperations<AdditionalField> addlTable, TableOperations<AdditionalFieldValue> addlValuesTable,
            ExpressionContext context, AdoDataConnection externalConnection) where T : class, new()
        {
            DataRowCollection data = RetrieveDataRecordTable(record, extTable, table, addlTable, addlValuesTable, context, externalConnection)?.Rows;
            if (data is null || data.Count != 1) return null;
            return data;
        }

        public static DataTable RetrieveDataTable(extDBTables extTable, AdoDataConnection externalConnection, Condition[] conditions, string orderBy = null, bool ascending = true, int skip = 0, int count = -1)
        {
            ExpressionContext context = new ExpressionContext();
            DefineAllowedVariables(context);
            return ExecuteQueryWithContext(extTable, context, externalConnection, conditions, orderBy, ascending, count, skip);
        }

        /// <summary>
        /// Returns the number of records in the external database
        /// </summary>
        /// <param name="extTable"> the <see cref="extDBTables"/></param>
        /// <param name="externalConnection"> the <see cref="AdoDataConnection"/> to the external system </param>
        /// <returns>the number of rows found in the Table</returns>
        public static int RetrieveDataCount(extDBTables extTable, AdoDataConnection externalConnection, Condition[] conditions)
        {
            ExpressionContext context = new ExpressionContext();
            DefineAllowedVariables(context);
            return ExecuteCountQueryWithContext(extTable, context, externalConnection, conditions);
        }

        private static string RemoveIllegalCharacters(string fieldName)
        {
            // This will causes issues if there are two fields, one as "field name" and one as "field_name"
            return Regex.Replace(fieldName, RegexIllegal, "_");
        }

        private static void DefineAllowedVariables(ExpressionContext context)
        {
            context.Variables.Clear();
            // Define special var key
            context.Variables.DefineVariable("key", typeof(string));
            context.Variables["key"] = null;
            // Define all vars that could be pulled from openXDA
            foreach(Type type in TableNames.Keys)
            {
                string tableName;
                if (!TableNames.TryGetValue(type, out tableName))
                {
                    Log.Warn($"Type {type.Name} checked in Scheduled DB Task could not find associated table name.");
                    continue;
                }
                context.Variables.DefineVariable(tableName, type);
                context.Variables[tableName] = null;
            }
        }

        //Context should have all vars loaded in
        private static DataTable ExecuteQueryWithContext(extDBTables extTable,
            ExpressionContext context, AdoDataConnection externalConnection, Condition[] conditions,
            string orderBy = null, bool ascending = true, int count = -1, int skip = 0)
        {
            List<object> parameters = new List<object>();
            MatchEvaluator evaluator = new MatchEvaluator((match) => RegexReplaceFunction(match, context, parameters));
            string fullQuery = Regex.Replace(extTable.Query, RegexPattern, evaluator, RegexOptions.None, TimeSpan.FromSeconds(2));
            if (skip > 0 || count > 0 || !String.IsNullOrEmpty(orderBy))
            {
                if (externalConnection.IsSQLServer)
                {
                    string limit = "";
                    string filters = "";
                    
                    if (conditions.Length > 0)
                        filters = "WHERE " + String.Join(" AND ", conditions.Select((item, i) => item.SQL.Replace("{0}", $"{{{i + parameters.Count()}}}")));

                    parameters.AddRange(conditions.Select(item => item.Parameter));

                    if (count > 0 && skip <=0)
                        limit = $"TOP {count}";
                    string order = "";
                    if (!String.IsNullOrEmpty(orderBy))
                        order = $"ORDER BY \"{orderBy}\" {(ascending ? "ASC" : "DESC")}";
                    string offset = "";
                    if (skip > 0)
                        offset = $"OFFSET {skip} ROWS";
                    if (count > 0 && skip > 0)
                        offset = offset + $" FETCH NEXT {count} ROWS ONLY";
                    fullQuery = $"select {limit} * from ({fullQuery}) T {filters} {order} {offset}";
                }
                else if (externalConnection.IsOracle)
                {
                    string limit = "";
                    string filters = "";

                    if (conditions.Length > 0)
                        filters = "WHERE " + String.Join(" AND ", conditions.Select((item, i) => item.SQL.Replace("{0}", $"{{{i + parameters.Count()}}}")));

                    parameters.AddRange(conditions.Select(item => item.Parameter));

                    if (count > 0 && skip > 0)
                        limit = $"where rn between {skip+1} and {skip+count+1}";
                    else if (count > 0)
                        limit = $"where rn < {count+1}";
                    else if (skip > 0)
                        limit = $"where rn > {skip}";
                    string order = "null";
                    if (!String.IsNullOrEmpty(orderBy))
                        order = $"\"{orderBy}\" {(ascending ? "ASC" : "DESC")}";

                    fullQuery = $"select * from ( select T.*, row_number() over (order by {order}) rn from ({fullQuery}) T {filters}) {limit}";
                }
                else if (externalConnection.IsMySQL || externalConnection.IsPostgreSQL)
                {
                    string limit = "";
                    string filters = "";

                    if (conditions.Length > 0)
                        filters = "WHERE " + String.Join(" AND ", conditions.Select((item, i) => item.SQL.Replace("{0}", $"{{{i + parameters.Count()}}}")));

                    parameters.AddRange(conditions.Select(item => item.Parameter));

                    if (count > 0)
                        limit = $"LIMIT {count}";
                    string order = "";
                    if (!String.IsNullOrEmpty(orderBy))
                        order = $"ORDER BY {orderBy} {(ascending ? "ASC" : "DESC")}";
                    string offset = "";
                    if (skip > 0)
                        offset = $"OFFSET {skip}";
                    fullQuery = $"select * from ({fullQuery}) T {filters}{order} {limit} {offset}";
                }
                else
                {
                    throw new NotImplementedException("External Database Type not implemented");
                }
               
            }
            return externalConnection.RetrieveData(fullQuery, parameters.ToArray());
        }

        private static int ExecuteCountQueryWithContext(extDBTables extTable,
                       ExpressionContext context, AdoDataConnection externalConnection, Condition[] conditions)
        {
            List<object> parameters = new List<object>();
            MatchEvaluator evaluator = new MatchEvaluator((match) => RegexReplaceFunction(match, context, parameters));
            string fullQuery = Regex.Replace(extTable.Query, RegexPattern, evaluator, RegexOptions.None, TimeSpan.FromSeconds(2));
            fullQuery = $"select count(*) from ({fullQuery}) T";
            if (conditions.Length > 0) 
                fullQuery = fullQuery + " WHERE " + String.Join(" AND ", conditions.Select((item, i) => item.SQL.Replace("{0}", $"{{{i + parameters.Count()}}}")));
            parameters.AddRange(conditions.Select(item => item.Parameter));
            return externalConnection.ExecuteScalar<int>(fullQuery, parameters.ToArray());
        }

        public static AdoDataConnection GetExternalConnection(ExternalDatabases extDB)
        {
            if (extDB.Encrypt)
                return new AdoDataConnection(extDB.ConnectionString);
            else
                return new AdoDataConnection(extDB.ConnectionString, extDB.DataProviderString);
        }

        private static int GetID<T>(T record) where T: class, new()
        {
            PropertyInfo idObj = record.GetType().GetProperty("ID", BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (idObj is null) return -1;
            return (int) idObj.GetValue(record);
        }

        private static string GetName<T>(T record) where T: class, new()
        {
            HashSet<Type> nonAssetTypes = new HashSet<Type>() { typeof(Meter), typeof(Model.Customer), typeof(Location) };
            string propertyName = "AssetName";
            if (nonAssetTypes.Contains(typeof(T)))
                propertyName = "Name";
            PropertyInfo nameObj = record.GetType().GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (nameObj is null) return "";
            return (string)nameObj.GetValue(record);
        }

        private static string RegexReplaceFunction(Match match, ExpressionContext context, List<object> parameters)
        {
            try
            {
                string variable = match.Value.Substring(1, match.Value.Length - 2).Trim();
                string[] variableComponents = variable.Split('.');
                if (context.Variables[variableComponents[0]] is null) return "null";
                if (variableComponents.Length > 2 && string.Equals(variableComponents[1], "Field", StringComparison.OrdinalIgnoreCase))
                    variable = RemoveIllegalCharacters(variableComponents[2]);
                string stringExpression = $"if({variable} <> null, {variable}.toString(), null)";
                IGenericExpression<string> expression = context.CompileGeneric<string>(stringExpression);
                string eval = expression.Evaluate();
                if (eval is null) return "null";

                // Quick explaination, we need to transform something like {object.property} into an index on a parameter so that
                // GSF can handle the parameters. This is needed because we cannot use VARCHAR arguements directly, it is DB dependant
                int parameterNumber = parameters.FindIndex(para => para.ToString() == eval);
                if (parameterNumber > -1)
                    return "{" + parameterNumber + "}";
                parameters.Add(eval);
                return "{" + (parameters.Count() - 1) + "}";
                    
            }
            catch (Exception ex)
            {
                Log.Error($"Error when parsing query for external database update: ${ex.Message}. Query not ran.");
                throw;
            }
        }
        #endregion

        #region [ Static ]
        private static readonly ILog Log = LogManager.GetLogger(typeof(ExternalDatabases));
        #endregion

    }
}