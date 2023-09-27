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
using Microsoft.AspNet.SignalR.Infrastructure;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Http.Results;
using System.Web.UI.HtmlControls;
using SystemCenter.Model;
using Flee.PublicTypes;
using openXDA.Model;
using System.Reflection;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;

namespace SystemCenter.ScheduledProcesses
{
    public class ScheduledExtDBTask
    {
        #region [ Member ]
        public ExternalDatabases ExternalDB { get; set; }
        public static Func<AdoDataConnection> ConnectionFactory = () => new AdoDataConnection("systemSettings");
        public static string RegexPattern = "[{][^{}]*[}]";
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
                ExpressionContext context = new ExpressionContext();
                using (AdoDataConnection externalConnection = GetExternalConnection(extDB))
                    foreach (extDBTables extTable in extTables)
                    {
                        try
                        {
                            // Todo: update db with result
                            RetrieveData<Meter>(extTable, addlFieldsTable, addlValueTable, context, xdaConnection, externalConnection);
                            RetrieveData<Transformer>(extTable, addlFieldsTable, addlValueTable, context, xdaConnection, externalConnection);
                        }
                        catch
                        {

                        }
                    }
            }
        }

        public static void RetrieveData<T>(extDBTables extTable,
            TableOperations<AdditionalField> addlFieldsTable, TableOperations<AdditionalFieldValue> addlValuesTable,
            ExpressionContext context,
            AdoDataConnection xdaConnection, AdoDataConnection extConnection) where T: class, new()
        {
            TableOperations<T> table = new TableOperations<T>(xdaConnection);
            IEnumerable<AdditionalField> addlFields = addlFieldsTable.QueryRecordsWhere("ParentTable = {0} AND ExternalDBTableID = {1}", table.TableName, extTable.ID);
            if (!addlFields.Any()) return;
            IEnumerable<T> allRecords = table.QueryRecords();
            foreach (T record in allRecords)
            {
                object[] primaryKeys = table.GetPrimaryKeys(record);
                if (primaryKeys.Length == 0) continue;
                AdditionalFieldValue keyValue = addlValuesTable.QueryRecordWhere(
                    @"ParentTableID = {0} AND
	                AdditionalFieldValue.AdditionalFieldID in (
		                Select ID From AdditionalField
		                Where 
			                ParentTable = {1} AND
			                ExternalDBTableID = {2} AND
			                IsKey = 1)"
                    , primaryKeys[0], table.TableName, extTable.ID);
                context.Variables.Clear();
                context.Variables["Key"] = keyValue?.Value;
                context.Variables[table.TableName] = record;
                List<string> parameters = new List<string>();
                MatchEvaluator evaluator = new MatchEvaluator((match) => RegexReplaceFunction(match, context, parameters));
                string fullQuery = Regex.Replace(extTable.Query, RegexPattern, evaluator, RegexOptions.None, TimeSpan.FromSeconds(2));
                try
                {
                    // Should be a singular row
                    DataTable dataTable = extConnection.RetrieveData(fullQuery, parameters.ToArray());
                }
                catch
                {
                    Log.Warn($"Query: ${fullQuery} failed on external database connection for ${extTable.TableName}");
                }
            }
        }

        public static void SaveData<T>(IEnumerable<DataRow> externalData,
            AdoDataConnection xdaConnection) where T: class, new()
        {
            TableOperations<T> table = new TableOperations<T>(xdaConnection);
            // TODO: External openXDA fields
        }

        private static AdoDataConnection GetExternalConnection(ExternalDatabases extDB)
        {
            if (extDB.Encrypt)
                return new AdoDataConnection(extDB.ConnectionString);
            else
                return new AdoDataConnection(extDB.ConnectionString, extDB.DataProviderString);
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