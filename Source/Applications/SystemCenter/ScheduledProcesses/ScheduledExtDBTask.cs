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
            TableOperations<AdditionalField> addlFieldsTable, TableOperations<AdditionalFieldValue> addlValuesTable, TableOperations<ExternalOpenXDAField> xdaFieldTable,
            ExpressionContext context,
            AdoDataConnection xdaConnection, AdoDataConnection extConnection) where T: class, new()
        {
            TableOperations<T> table = new TableOperations<T>(xdaConnection);
            // Ignore key fields, since those don't make sense to not be auto updated
            IEnumerable<AdditionalField> addlFields = addlFieldsTable.QueryRecordsWhere("ParentTable = {0} AND ExternalDBTableID = {1} AND IsKey = 0", table.TableName, extTable.ID);
            // Todo: add external xda table to this, is put off for now
            if (!addlFields.Any()) return;
            IEnumerable<T> allRecords = table.QueryRecords();
            foreach (T record in allRecords)
            {
                DataRowCollection data = RetrieveDataRecord(record, extTable, table, addlValuesTable, context, extConnection).Rows;
                if (data.Count == 0) continue;
                foreach(AdditionalField field in addlFields)
                {
                    string fieldValue = data[0][field.FieldName].ToString();
                    int recordID = GetID(record);
                    if (recordID == -1) continue; // Should be impossible to trigger without huge overhauling of openXDA
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
            context.Variables.Clear();
            if (keyValue?.Value is not null)
                context.Variables["Key"] = keyValue.Value;
            context.Variables[table.TableName] = record;
            return ExecuteQueryWithContext(extTable, context, externalConnection);
        }

        public static DataTable RetrieveDataTable(extDBTables extTable, AdoDataConnection externalConnection)
        {
            ExpressionContext context = new ExpressionContext();
            context.Variables.Clear();
            return ExecuteQueryWithContext(extTable, context, externalConnection);
        }

        //Context should have all vars loaded in
        private static DataTable ExecuteQueryWithContext(extDBTables extTable,
            ExpressionContext context, AdoDataConnection externalConnection)
        {
            List<string> parameters = new List<string>();
            MatchEvaluator evaluator = new MatchEvaluator((match) => RegexReplaceFunction(match, context, parameters));
            string fullQuery = Regex.Replace(extTable.Query, RegexPattern, evaluator, RegexOptions.None, TimeSpan.FromSeconds(2));
            try
            {
                return externalConnection.RetrieveData(fullQuery, parameters.ToArray());
            }
            catch
            {
                Log.Warn($"Query: ${fullQuery} failed on external database connection for ${extTable.TableName}");
                return null;
            }
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
                string matchValue = match.Value.Substring(1, match.Value.Length - 2).Trim();
                IDynamicExpression expression = context.CompileDynamic(matchValue);
                string eval = expression.Evaluate().ToString();
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
                Log.Warn($"Error when parsing query for scheduled update: ${ex.Message}. Using \"null\" as value...");
                return "null";
            }
        }
        #endregion

        #region [ Static ]
        private static readonly ILog Log = LogManager.GetLogger(typeof(ExternalDatabases));
        #endregion

    }
}