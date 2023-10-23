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

namespace SystemCenter.ScheduledProcesses
{
    public class ScheduledExtDBTask
    {
        #region [ Member ]
        public ExternalDatabases ExternalDB { get; set; }
        public static readonly Func<AdoDataConnection> ConnectionFactory = () => new AdoDataConnection("systemSettings");
        // Line segment excluded, special case
        public static readonly Type[] CheckedTypes = new Type[] { typeof(Meter), typeof(Location), typeof(Model.Customer),
            typeof(Line), typeof(Breaker), typeof(Bus), typeof(CapBank), typeof(Transformer), typeof(CapBankRelay), typeof(DER), typeof(Asset) };
        public const string RegexPattern = "[{][^{}]*[}]";

        private static IDictionary<Type, string> TypeTableNameDict;
        #endregion

        #region [ Constructor ]
        public ScheduledExtDBTask(ExternalDatabases task)
        {
            ExternalDB = task;
        }

        static ScheduledExtDBTask()
        {
            TypeTableNameDict = new Dictionary<Type, string>();
            foreach (Type type in CheckedTypes)
            {
                Type tableOp = typeof(TableOperations<>).MakeGenericType(type);
                var getTableName = tableOp.GetMethod("GetTableName", BindingFlags.Static | BindingFlags.Public);
                TypeTableNameDict.Add(type, (string) getTableName.Invoke(null, new object[] { }));
            }
        }
        #endregion

        #region [ Methods ]
        public void Run()
        {
            Log.Info($"Running External Database Fetch Task {ExternalDB.ID}....");

            try
            {
                // Calling static method
                Run(ExternalDB);
                Log.Info($"Ran External Database Fetch Task: {ExternalDB.ID}");
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message, ex);
            }
        }
        public static void Run(ExternalDatabases extDB)
        {
            using(AdoDataConnection xdaConnection = ConnectionFactory())
            {
                TableOperations<extDBTables> tblTable = new TableOperations<extDBTables>(xdaConnection);
                IEnumerable<extDBTables> extTables = tblTable.QueryRecordsWhere("ExtDBID = {0}", extDB.ID);
                if (extTables.Count() == 0)
                {
                    Log.Warn($"No tables found connected to external database ${extDB.Name}.");
                    return;
                }
                TableOperations<AdditionalField> addlFieldsTable = new TableOperations<AdditionalField>(xdaConnection);
                TableOperations<AdditionalFieldValue> addlValueTable = new TableOperations<AdditionalFieldValue>(xdaConnection);
                TableOperations<ExternalOpenXDAField> xdaFieldTable = new TableOperations<ExternalOpenXDAField>(xdaConnection);
                ExpressionContext context = new ExpressionContext();
                using (AdoDataConnection externalConnection = GetExternalConnection(extDB))
                    foreach (extDBTables extTable in extTables)
                    {
                        foreach (Type t in CheckedTypes)
                        {
                            var updateMethods = typeof(ScheduledExtDBTask).GetMethod("UpdateData", BindingFlags.Static | BindingFlags.Public);
                            var typedUpdateMethod = updateMethods.MakeGenericMethod(new[] { t });
                            typedUpdateMethod.Invoke(null, new object[] { extTable, addlFieldsTable, addlValueTable, xdaFieldTable, context, xdaConnection, externalConnection });
                        }
                    }
            }
        }

        public static void UpdateData<T>(extDBTables extTable,
            TableOperations<AdditionalField> addlFieldsTable, TableOperations<AdditionalFieldValue> addlValuesTable, 
            TableOperations<ExternalOpenXDAField> xdaFieldTable,
            ExpressionContext context,
            AdoDataConnection xdaConnection, AdoDataConnection extConnection) where T: class, new()
        {
            TableOperations<T> table = new TableOperations<T>(xdaConnection);
            // Ignore key fields, since those don't make sense to not be auto updated
            IEnumerable<AdditionalField> addlFields = addlFieldsTable.QueryRecordsWhere("ParentTable = {0} AND ExternalDBTableID = {1} AND IsKey = 0", table.TableName, extTable.ID);
            IEnumerable<ExternalOpenXDAField> xdaFields = xdaFieldTable.QueryRecordsWhere("ParentTable = {0} AND ExternalDBTableID = {1}", table.TableName, extTable.ID);
            // Todo: add external xda table to this, is put off for now
            if (!addlFields.Any() && !xdaFields.Any()) return;
            IEnumerable<T> allRecords = table.QueryRecords();
            foreach (T record in allRecords)
            {
                int recordID = GetID(record);
                if (recordID == -1) continue; // Should be impossible to trigger without huge overhauling of openXDA
                DataRowCollection data = RetrieveDataRecord(record, extTable, table, addlValuesTable, context, extConnection).Rows;
                // 0 records is not a problem, since not every XDA record exists externally, just skip it
                if (data.Count == 0) continue;
                if (data.Count != 1)
                    Log.Warn($"{data.Count} external records found for table {extTable.TableName} using xda record with ID {recordID} from xda table {table.TableName}. Table query should result in one and only one record...");
                foreach(AdditionalField field in addlFields)
                {
                    string fieldValue;
                    try
                    {
                        fieldValue = data[0][field.FieldName].ToString();
                    }
                    catch
                    {
                        Log.Warn($"Additional field with no field in external database found: ID {field.ID}, Name {field.FieldName}, External Table {extTable.TableName}");
                        continue;
                    }
                    AdditionalFieldValue addlValue = addlValuesTable.QueryRecordWhere("ParentTableID = {0} AND AdditionalFieldID = {1}", recordID, field.ID);
                    if (addlValue is null)
                    {
                        addlValue = new AdditionalFieldValue()
                        {
                            ParentTableID = (int) recordID,
                            AdditionalFieldID = field.ID,
                            Value = fieldValue
                        };
                        addlValuesTable.AddNewRecord(addlValue);
                    }
                    else
                    {
                        if (fieldValue == addlValue.Value) continue;
                        addlValue.Value = fieldValue;
                        addlValuesTable.UpdateRecord(addlValue);
                    }
                }
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
                        continue;
                    }
                    PropertyInfo fieldPropInfo = record.GetType().GetProperty(field.FieldName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (fieldPropInfo is null) 
                    {
                        Log.Error($"External OpenXDA field defined that does not exist on the xda model {field.FieldName} on table {field.ParentTable}");
                        continue;
                    }
                    // Todo: confirm this works
                    if (fieldValue == fieldPropInfo.GetValue(record)) continue;
                    // Todo: Make sure this actually sets value properly
                    fieldPropInfo.SetValue(record, fieldValue);
                    table.UpdateRecord(record);
                }
            }
        }

        public static DataTable RetrieveDataRecord<T>(T record, extDBTables extTable,
            TableOperations<T> table, TableOperations<AdditionalFieldValue> addlValuesTable,
            ExpressionContext context, AdoDataConnection externalConnection) where T: class, new()
        {
            int idKey = GetID(record);
            if (idKey == -1) return null; // Should be impossible to trigger without huge overhauling of openXDA
            AdditionalFieldValue keyValue = addlValuesTable.QueryRecordWhere(
                @"ParentTableID = {0} AND
	                AdditionalFieldValue.AdditionalFieldID in (
		                Select ID From AdditionalField
		                Where 
			                ParentTable = {1} AND
			                ExternalDBTableID = {2} AND
			                IsKey = 1)"
                , idKey, table.TableName, extTable.ID);
            DefineAllowedVariables(context);
            context.Variables["Key"] = keyValue?.Value;
            context.Variables[table.TableName] = record;
            return ExecuteQueryWithContext(extTable, context, externalConnection);
        }

        public static DataTable RetrieveDataTable(extDBTables extTable, AdoDataConnection externalConnection)
        {
            ExpressionContext context = new ExpressionContext();
            DefineAllowedVariables(context);
            return ExecuteQueryWithContext(extTable, context, externalConnection);
        }

        private static void DefineAllowedVariables(ExpressionContext context)
        {
            context.Variables.Clear();
            // Define special var key
            context.Variables.DefineVariable("key", typeof(string));
            context.Variables["key"] = null;
            // Define all vars that could be pulled from openXDA
            foreach(Type type in CheckedTypes)
            {
                string tableName;
                if (!TypeTableNameDict.TryGetValue(type, out tableName))
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
            ExpressionContext context, AdoDataConnection externalConnection)
        {
            List<string> parameters = new List<string>();
            MatchEvaluator evaluator = new MatchEvaluator((match) => RegexReplaceFunction(match, context, parameters));
            string fullQuery = Regex.Replace(extTable.Query, RegexPattern, evaluator, RegexOptions.None, TimeSpan.FromSeconds(2));
             return externalConnection.RetrieveData(fullQuery, parameters.ToArray());
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

        private static string RegexReplaceFunction(Match match, ExpressionContext context, List<string> parameters)
        {
            try
            {
                string variable = match.Value.Substring(1, match.Value.Length - 2).Trim();
                string stringExpression = $"if({variable.Split('.')[0]} <> null, {variable}.toString(), null)";
                IGenericExpression<string> expression = context.CompileGeneric<string>(stringExpression);
                string eval = expression.Evaluate();
                if (eval is null) return "null";

                // Quick explaination, we need to transform something like {object.property} into an index on a parameter so that
                // GSF can handle the parameters. This is needed because we cannot use VARCHAR arguements directly, it is DB dependant
                int parameterNumber = parameters.FindIndex(para => para == eval);
                if (parameterNumber > -1)
                    return "{" + parameterNumber + "}";
                parameters.Add(eval);
                return "{" + (parameters.Count() - 1) + "}";
                    
            }
            catch (Exception ex)
            {
                Log.Error($"Error when parsing query for external database update: ${ex.Message}. Query not ran.");
                throw ex;
            }
        }
        #endregion

        #region [ Static ]
        private static readonly ILog Log = LogManager.GetLogger(typeof(ExternalDatabases));
        #endregion

    }
}