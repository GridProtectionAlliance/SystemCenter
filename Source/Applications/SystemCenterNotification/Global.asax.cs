﻿//******************************************************************************************************
//  Global.asax.cs - Gbtc
//
//  Copyright © 2018, Grid Protection Alliance.  All Rights Reserved.
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
//  09/10/2018 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using GSF;
using GSF.Configuration;
using GSF.Data;
using GSF.Diagnostics;
using GSF.Identity;
using GSF.IO;
using GSF.Threading;
using GSF.Web.Embedded;
using GSF.Web.Model;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Json;
using Newtonsoft.Json;
using SystemCenter.Notifications.Model;

namespace SystemCenter.Notifications
{
    public class MvcApplication : HttpApplication
    {
        /// <summary>
        /// Gets the default model used for the application.
        /// </summary>
        public static readonly AppModel DefaultModel = new AppModel();

        protected void Application_Start()
        {
            const string DefaultSecurityRoles = "Administrator,Engineer,Viewer";

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Add additional virtual path provider to allow access to embedded resources
            EmbeddedResourceProvider.Register();

            GlobalSettings global = DefaultModel.Global;

            // Make sure SystemCenter.Notifications specific default config file service settings exist
            CategorizedSettingsElementCollection systemSettings = ConfigurationFile.Current.Settings["systemSettings"];

            systemSettings.Add("ConnectionString", "Data Source=localhost; Initial Catalog=LSCVSReport; Integrated Security=SSPI", "Configuration connection string.");
            systemSettings.Add("DataProviderString", "AssemblyName={System.Data, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089}; ConnectionType=System.Data.SqlClient.SqlConnection; AdapterType=System.Data.SqlClient.SqlDataAdapter", "Configuration database ADO.NET data provider assembly type creation string used");
            systemSettings.Add("CompanyName", "Grid Protection Alliance", "The name of the company who owns this instance of the openMIC.");
            systemSettings.Add("CompanyAcronym", "GPA", "The acronym representing the company who owns this instance of the openMIC.");
            systemSettings.Add("DateFormat", "MM/dd/yyyy", "The default date format to use when rendering timestamps.");
            systemSettings.Add("TimeFormat", "HH:mm.ss.fff", "The default time format to use when rendering timestamps.");
            systemSettings.Add("DefaultSecurityRoles", DefaultSecurityRoles, "The default security roles that should exist for the application.");
            systemSettings.Add("DebugLogLocation", "Logs", "The location to which debug logs will be written");
            systemSettings.Add("DebugLogLevel", VerboseLevel.None, "The verbosity level of messages to be captured in the debug log: None, Low, Medium, High, Ultra, All");

            // Load default configuration file based model settings
            global.CompanyName = systemSettings["CompanyName"].Value;
            global.CompanyAcronym = systemSettings["CompanyAcronym"].Value;
            global.DateFormat = systemSettings["DateFormat"].Value;
            global.TimeFormat = systemSettings["TimeFormat"].Value;
            global.DateTimeFormat = $"{global.DateFormat} {global.TimeFormat}";

            // Start logging debug messages
            string debugLogLocation = systemSettings["DebugLogLocation"].Value;
            VerboseLevel debugLogLevel = systemSettings["DebugLogLevel"].ValueAs<VerboseLevel>();
            RunDebugLogger(debugLogLocation, debugLogLevel);

            // Load database driven model settings
            using (DataContext dataContext = new DataContext(exceptionHandler: LogException))
            {
                // Validate default security roles exist
                ValidateSecurityRoles(dataContext.Connection, systemSettings["DefaultSecurityRoles"].ValueAs(DefaultSecurityRoles));

                // Validate users and groups exist in the database as SIDs
                ValidateAccountsAndGroups(dataContext.Connection);
            }

            // Modify the JSON serializer to serialize dates as UTC -
            // otherwise, timezone will not be appended to date strings
            // and browsers will select whatever timezone suits them
            JsonSerializerSettings settings = JsonUtility.CreateDefaultSerializerSettings();
            settings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
            JsonSerializer serializer = JsonSerializer.Create(settings);
            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => serializer);
        }

        private void Page_Error(object sender, EventArgs e)
        {
            Exception exc = Server.GetLastError();
            WriteToErrorLog(exc);

            // Clear the error from the server.
            Server.ClearError();
        }

        private void Application_Error(object sender, EventArgs e)
        {
            Exception exc = Server.GetLastError();
            WriteToErrorLog(exc);
        }

        /// <summary>
        /// Logs a status message.
        /// </summary>
        /// <param name="message">Message to log.</param>
        /// <param name="type">Type of message to log.</param>
        public static void LogStatusMessage(string message, UpdateType type = UpdateType.Information)
        {
            // TODO: Write message to log with log4net, etc.
        }

        /// <summary>
        /// Logs an exception.
        /// </summary>
        /// <param name="ex">Exception to log.</param>
        public static void LogException(Exception ex)
        {
            // TODO: Write exception to log with log4net, etc.
            #if DEBUG
                ThreadPool.QueueUserWorkItem(state => { Thread.Sleep(1500); });
            #endif

            WriteToErrorLog(ex);
        }

        /// <summary>
        /// Validates security roles for all defined nodes.
        /// </summary>
        /// <param name="database">Data connection to use for database operations.</param>
        /// <param name="defaultSecurityRoles">Default security roles that should exist.</param>        
        private static void ValidateSecurityRoles(AdoDataConnection database, string defaultSecurityRoles)
        {
            // Queries
            const string RoleCountFormat = "SELECT COUNT(*) FROM ApplicationRole WHERE NodeID = {0} AND Name = {1}";

            if (string.IsNullOrEmpty(defaultSecurityRoles))
                defaultSecurityRoles = "Administrator, Owner, Viewer";

            string[] roles = defaultSecurityRoles.Split(',').Select(role => role.Trim()).Where(role => !string.IsNullOrEmpty(role)).ToArray();

            // For each Node in new database make sure all roles exist
            DataTable dataTable;

            try
            {
                // JRC: ApplicationNode is not a standard TSL table name for nodes? Is this old code?
                dataTable = database.RetrieveData("SELECT ID FROM ApplicationNode");
            }
            catch
            {
                // Fall-back on standard TSL node table name
                dataTable = database.RetrieveData("SELECT ID FROM Node");
            }

            foreach (DataRow row in dataTable.Rows)
            {
                Guid nodeID = row.ConvertField<Guid>("ID");

                foreach (string role in roles)
                    if ((database.ExecuteScalar<int?>(RoleCountFormat, database.Guid(nodeID), role) ?? 0) == 0)
                        AddRolesForNode(database, nodeID, role);
            }
        }

        /// <summary>
        /// Adds role for newly added node, e.g., Administrator, Editor, Viewer.
        /// </summary>
        /// <param name="database">Data connection to use for database operations.</param>
        /// <param name="nodeID">Node ID to which roles are being assigned.</param>
        /// <param name="roleName">Name of role to be added.</param>
        private static void AddRolesForNode(AdoDataConnection database, Guid nodeID, string roleName)
        {
            // Queries
            const string InsertRoleFormat = "INSERT INTO ApplicationRole(Name, Description, NodeID, UpdatedBy, CreatedBy) VALUES('{0}', '{0} Role', {{0}}, {{1}}, {{2}})";

            string currentUserSID = UserInfo.UserNameToSID(UserInfo.CurrentUserID);
            database.ExecuteNonQuery(string.Format(InsertRoleFormat, roleName), database.Guid(nodeID), currentUserSID, currentUserSID);
        }

        /// <summary>
        /// Validate accounts and groups to ensure that account names and group names are converted to SIDs.
        /// </summary>
        /// <param name="database">Data connection to use for database operations.</param>
        private static void ValidateAccountsAndGroups(AdoDataConnection database)
        {
            const string SelectUserAccountQuery = "SELECT ID, Name, UseADAuthentication FROM UserAccount";
            const string SelectSecurityGroupQuery = "SELECT ID, Name FROM SecurityGroup";
            const string UpdateUserAccountFormat = "UPDATE UserAccount SET Name = '{0}' WHERE ID = '{1}'";
            const string UpdateSecurityGroupFormat = "UPDATE SecurityGroup SET Name = '{0}' WHERE ID = '{1}'";

            string id;
            string sid;
            string accountName;
            Dictionary<string, string> updateMap;

            updateMap = new Dictionary<string, string>();

            // Find user accounts that need to be updated
            using (IDataReader userAccountReader = database.Connection.ExecuteReader(SelectUserAccountQuery))
            {
                while (userAccountReader.Read())
                {
                    id = userAccountReader["ID"].ToNonNullString();
                    accountName = userAccountReader["Name"].ToNonNullString();

                    if (userAccountReader["UseADAuthentication"].ToNonNullString().ParseBoolean())
                    {
                        sid = UserInfo.UserNameToSID(accountName);

                        if (!ReferenceEquals(accountName, sid) && UserInfo.IsUserSID(sid))
                            updateMap.Add(id, sid);
                    }
                }
            }

            // Update user accounts
            foreach (KeyValuePair<string, string> pair in updateMap)
                database.Connection.ExecuteNonQuery(string.Format(UpdateUserAccountFormat, pair.Value, pair.Key));

            updateMap.Clear();

            // Find security groups that need to be updated
            using (IDataReader securityGroupReader = database.Connection.ExecuteReader(SelectSecurityGroupQuery))
            {
                while (securityGroupReader.Read())
                {
                    id = securityGroupReader["ID"].ToNonNullString();
                    accountName = securityGroupReader["Name"].ToNonNullString();

                    if (accountName.Contains('\\'))
                    {
                        sid = UserInfo.GroupNameToSID(accountName);

                        if (!ReferenceEquals(accountName, sid) && UserInfo.IsGroupSID(sid))
                            updateMap.Add(id, sid);
                    }
                }
            }

            // Update security groups
            foreach (KeyValuePair<string, string> pair in updateMap)
                database.Connection.ExecuteNonQuery(string.Format(UpdateSecurityGroupFormat, pair.Value, pair.Key));
        }

        private static ReaderWriterLockSlim LogFileReadWriteLock = new ReaderWriterLockSlim();

        public static void WriteToErrorLog(Exception ex, bool innerException = false)
        {
            if (ex.InnerException != null) WriteToErrorLog(ex.InnerException, true);

            string folderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "SystemCenterNotification");
            string path = Path.Combine("C:\\Users\\Public\\Documents", "SystemCenterNotification.ErrorLog.txt");
            // Set Status to Locked
            LogFileReadWriteLock.EnterWriteLock();
            try
            {
                Directory.CreateDirectory(folderPath);
                // Append text to the file
                using (StreamWriter sw = File.AppendText(path))
                {
                    sw.WriteLine($"[{DateTime.Now}] ({(innerException ? "Inner Exception" : "Outer Excpetion")})");
                    sw.WriteLine($"Exception Source:    {ex.Source}");
                    sw.WriteLine($"Exception Message:    {ex.Message}");
                    sw.WriteLine();
                    sw.WriteLine("---- Stack Trace ----");
                    sw.WriteLine();
                    sw.WriteLine(ex.StackTrace);
                    sw.WriteLine();
                    sw.WriteLine();

                    sw.Close();
                }
            }
            finally
            {
                // Release lock
                LogFileReadWriteLock.ExitWriteLock();
            }
        }

        private void RunDebugLogger(string logLocation, VerboseLevel verboseLevel)
        {
            ConcurrentQueue<LogMessage> logMessages = new ConcurrentQueue<LogMessage>();

            IEnumerable<LogMessage> DrainMessages()
            {
                while (logMessages.TryDequeue(out LogMessage message))
                    yield return message;
            }

            void LogMessages(DateTime date, IEnumerable<LogMessage> messages)
            {
                string fullPath = FilePath.GetAbsolutePath(logLocation);
                string logPath = Path.Combine(fullPath, $"{date:yyyyMMdd}.log");
                Directory.CreateDirectory(fullPath);

                using (StreamWriter log = File.AppendText(logPath))
                {
                    foreach (LogMessage message in messages)
                        log.WriteLine(message.GetMessage());
                }
            }

            void LogAllMessages()
            {
                if (logMessages.IsEmpty)
                    return;

                Thread.Sleep(1000);

                IEnumerable<IGrouping<DateTime, LogMessage>> groupings = DrainMessages()
                    .GroupBy(logMessage => logMessage.UtcTime.Date);

                foreach (var grouping in groupings)
                    LogMessages(grouping.Key, grouping);
            }

            LongSynchronizedOperation logOperation = new LongSynchronizedOperation(LogAllMessages);
            LogSubscriber subscriber = Logger.CreateSubscriber(verboseLevel);

            subscriber.NewLogMessage += (logMessage) =>
            {
                logMessages.Enqueue(logMessage);
                logOperation.RunOnceAsync();
            };
        }
    }
}
