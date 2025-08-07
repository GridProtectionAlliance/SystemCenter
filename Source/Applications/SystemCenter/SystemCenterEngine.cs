//*********************************************************************************************************************
// ExtensibleDisturbanceAnalysisEngine.cs
// Version 1.1 and subsequent releases
//
//  Copyright © 2013, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the Eclipse Public License -v 1.0 (the "License"); you may
//  not use this file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://www.opensource.org/licenses/eclipse-1.0.php
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
// --------------------------------------------------------------------------------------------------------------------
//
// Version 1.0
//
// Copyright 2012 ELECTRIC POWER RESEARCH INSTITUTE, INC. All rights reserved.
//
// openXDA ("this software") is licensed under BSD 3-Clause license.
//
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the 
// following conditions are met:
//
// •    Redistributions of source code must retain the above copyright  notice, this list of conditions and 
//      the following disclaimer.
//
// •    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and 
//      the following disclaimer in the documentation and/or other materials provided with the distribution.
//
// •    Neither the name of the Electric Power Research Institute, Inc. (“EPRI”) nor the names of its contributors 
//      may be used to endorse or promote products derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
// DISCLAIMED. IN NO EVENT SHALL EPRI BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
// POSSIBILITY OF SUCH DAMAGE.
//
//
// This software incorporates work covered by the following copyright and permission notice: 
//
// •    TVA Code Library 4.0.4.3 - Tennessee Valley Authority, tvainfo@tva.gov
//      No copyright is claimed pursuant to 17 USC § 105. All Other Rights Reserved.
//
//      Licensed under TVA Custom License based on NASA Open Source Agreement (TVA Custom NOSA); 
//      you may not use TVA Code Library except in compliance with the TVA Custom NOSA. You may  
//      obtain a copy of the TVA Custom NOSA at http://tvacodelibrary.codeplex.com/license.
//
//      TVA Code Library is provided by the copyright holders and contributors "as is" and any express 
//      or implied warranties, including, but not limited to, the implied warranties of merchantability 
//      and fitness for a particular purpose are disclaimed.
//
//*********************************************************************************************************************
//
//  Code Modification History:
//  -------------------------------------------------------------------------------------------------------------------
//  05/16/2012 - J. Ritchie Carroll, Grid Protection Alliance
//       Generated original version of source code.
//  10/02/2014 - Stephen C. Wills, Grid Protection Alliance
//       Adapted from the openFLE project to use the new fault location logic.
//
//*********************************************************************************************************************

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Text;
using GSF.Annotations;
using GSF.Collections;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using log4net;
using SystemCenter.Configuration;
using SystemCenter.Model;

namespace SystemCenter
{
    /// <summary>
    /// Represents an engine that processes power quality data
    /// to determine the locations of faults along power lines.
    /// </summary>
    public class SystemCenterEngine
    {
        #region [ Members ]


        // Fields
        private SystemSettings m_systemSettings;
        private ConcurrentDictionary<string, DatabaseConnectionFactory> m_connectionFactories;

        // Constants
        private const string DefaultCategory = "systemSettings";

        #endregion

        // ToDo: Move version in XDA to somewhere where we can use same class both there and here
        private class DatabaseConnectionFactory
        {
            #region [ Members ]

            // Constants
            private const string DefaultConnectionStringSettingName = "ConnectionString";
            private const string DefaultDataProviderStringSettingName = "DataProviderString";

            #endregion

            #region [ Constructors ]

            public DatabaseConnectionFactory(ConfigurationFile configurationFile, string settingsCategory)
                : this (configurationFile, settingsCategory, DefaultConnectionStringSettingName, DefaultDataProviderStringSettingName) { }

            public DatabaseConnectionFactory(ConfigurationFile configurationFile, string settingsCategory, string connStringSetting, string dataStringSetting)
            {
                ConfigurationFile = configurationFile;
                SettingsCategory = settingsCategory;
                ConnStringSettingName = connStringSetting;
                DataStringSettingName = dataStringSetting;
                LoadSettings();
            }

            #endregion

            #region [ Properties ]

            private ConfigurationFile ConfigurationFile { get; }
            private string SettingsCategory { get; }
            private string ConnStringSettingName { get; }
            private string DataStringSettingName { get; }
            public string ConnectionString { get; set; }
            public string DataProviderString { get; set; }

            #endregion

            #region [ Methods ]

            public AdoDataConnection CreateDbConnection() =>
                new AdoDataConnection(ConnectionString, DataProviderString);

            private void LoadSettings()
            {
                CategorizedSettingsSection categorizedSettings = ConfigurationFile.Settings;
                CategorizedSettingsElementCollection category = categorizedSettings[SettingsCategory];
                if (category is null)
                    throw new ArgumentNullException($"Could not retrieve settings of category {SettingsCategory} for db connection...");

                CategorizedSettingsElement connectionSetting = category[ConnStringSettingName];
                if (connectionSetting is null)
                    throw new ArgumentNullException($"Could not retrieve setting {ConnStringSettingName} of category {SettingsCategory} for db connection...");

                CategorizedSettingsElement dataProviderSetting = category[DataStringSettingName];
                if (dataProviderSetting is null)
                    throw new ArgumentNullException($"Could not retrieve setting {DataStringSettingName} of category {SettingsCategory} for db connection...");

                ConnectionString = connectionSetting.Value;
                DataProviderString = dataProviderSetting.Value;
            }

            #endregion
        }

        #region [ Properties ]
        private bool Stopped { get; set; } = true;

        /// <summary>
        /// Gets the current status of the XDA engine.
        /// </summary>
        public string Status
        {
            get
            {
                SystemSettings systemSettings = m_systemSettings;
                StringBuilder statusBuilder = new StringBuilder();

                statusBuilder.AppendLine("System Center Status:");
                statusBuilder.AppendLine(new string('=', 50));
                statusBuilder.AppendLine($"       Database Timeout: {systemSettings.DbTimeout} seconds");
                statusBuilder.AppendLine();


                return statusBuilder.ToString().TrimEnd();
            }
        }

        #endregion

        #region [ Methods ]

        /// <summary>
        /// Starts the fault location engine.
        /// </summary>
        public void Start()
        {
            // Create Connection factory object
            m_connectionFactories = new ConcurrentDictionary<string, DatabaseConnectionFactory>();

            // Get system settings from the database
            ReloadSystemSettings();

            // Reload configuration at startup
            ReloadConfiguration();

            Stopped = false;

        }

        /// <summary>
        /// Reloads system configuration from configuration sources.
        /// </summary>
        public void ReloadConfiguration()
        {
            // If system settings is null,
            // attempt to reload system settings
            if ((object)m_systemSettings == null)
                ReloadSystemSettings();

            // If system settings is still null, give up
            if ((object)m_systemSettings == null)
                return;
        }

        /// <summary>
        /// Reloads system settings from the database.
        /// </summary>
        public void ReloadSystemSettings()
        {
            ConfigurationFile configurationFile;

            // Reload the configuration file
            configurationFile = ConfigurationFile.Current;
            configurationFile.Reload();

            // Reconstruct known connection factories
            AdoDataConnection.ReloadConfigurationSettings();
            foreach (string key in m_connectionFactories.Keys)
                CreateAndAddFactory(configurationFile, key);

            // Load system settings from the database
            m_systemSettings = new SystemSettings(LoadSystemSettings());
        }

        /// <summary>
        /// Creates a db connection to the database, using timeout settings.
        /// </summary>
        public AdoDataConnection CreateDbConnection(string? settingsCategory = null)
        {
            string category = settingsCategory ?? DefaultCategory;

            if (!m_connectionFactories.TryGetValue(category, out DatabaseConnectionFactory factory))
                factory = CreateAndAddFactory(ConfigurationFile.Current, category);

            AdoDataConnection connection = factory.CreateDbConnection();
            if (m_systemSettings is not null)
                connection.DefaultTimeout = m_systemSettings.DbTimeout;

            return connection;
        }

        /// <summary>
        /// Stops the fault location engine.
        /// </summary>
        public void Stop()
        {
            try
            {
            }
            finally
            {
                Stopped = true;
            }
        }

        // Adds a new connection factory given a configuration file and settings category
        private DatabaseConnectionFactory CreateAndAddFactory(ConfigurationFile file, string category)
        {
            DatabaseConnectionFactory factory = new DatabaseConnectionFactory(file, category);
            m_connectionFactories.AddOrUpdate(category, factory);
            return factory;
        }

        // Loads system settings from the database.
        private string LoadSystemSettings()
        {
            using (AdoDataConnection connection = CreateDbConnection())
                return LoadSystemSettings(connection);
        }

        // Loads system settings from the database.
        private string LoadSystemSettings(AdoDataConnection connection)
        {
            TableOperations<Setting> settingTable = new TableOperations<Setting>(connection);
            List<Setting> settingList = settingTable.QueryRecords().ToList();

            foreach (IGrouping<string, Setting> grouping in settingList.GroupBy(setting => setting.Name))
            {
                if (grouping.Count() > 1)
                    Log.Warn($"Duplicate record for setting {grouping.Key} detected.");
            }

            // Convert the Setting table to a dictionary
            Dictionary<string, string> settings = settingList
                .DistinctBy(setting => setting.Name)
                .ToDictionary(setting => setting.Name, setting => setting.Value, StringComparer.OrdinalIgnoreCase);

            // Add the database connection string if there is not
            // already one explicitly specified in the Setting table
            if (!settings.ContainsKey("dbConnectionString"))
            {
                if (!m_connectionFactories.TryGetValue(DefaultCategory, out DatabaseConnectionFactory factory))
                    factory = CreateAndAddFactory(ConfigurationFile.Current, DefaultCategory);
                settings.Add("dbConnectionString", factory.ConnectionString);
            }

            // Convert dictionary to a connection string and return it
            return SystemSettings.ToConnectionString(settings);
        }

        #endregion

        #region [ Static ]

        // Static Fields
        private static readonly ConnectionStringParser<SettingAttribute, CategoryAttribute> ConnectionStringParser = new ConnectionStringParser<SettingAttribute, CategoryAttribute>();
        private static readonly ILog Log = LogManager.GetLogger(typeof(SystemCenterEngine));


        // Displays status message to the console - proxy method for service implementation
        [StringFormatMethod("format")]
        private static void OnStatusMessage(string format, params object[] args)
        {
            Log.Info(string.Format(format, args));
        }

        // Displays exception message to the console - proxy method for service implmentation
        private static void OnProcessException(Exception ex)
        {
            Log.Error(ex.Message, ex);
        }

        #endregion
    }
}
