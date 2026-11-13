//******************************************************************************************************
//  constants.ts - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  11/09/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

export namespace APIPath {
    export namespace Controller {

    }
}

export namespace TimeFormatting {

}

export namespace SystemCenterURL {

    const Base = "index.cshtml?name=";

    export namespace PageName {

        // Monitors and Assets
        export const Meters = "Meters"
        export const Meter = "Meter"
        export const NewMeterWizard = "NewMeterWizard"
        export const ConfigurationHistory = "ConfigurationHistory"

        export const Locations = "Locations"
        export const Location = "Location"

        export const Assets = "Assets"
        export const Asset = "Asset"

        export const LineSegments = "LineSegments"
        export const LineSegment = "LineSegment"

        export const AssetGroups = "AssetGroups"
        export const AssetGroup = "AssetGroup"

        export const Customers = "PQViewCustomers"
        export const Customer = "Customer"

        // File Processing
        export const DeviceHealthReport = "DeviceHealthReport"
        export const DeviceIssues = "DeviceIssuesPage"
        export const DeviceContacts = "DeviceContacts"

        export const DataFiles = "DataFiles";
        export const DataOperationFailures = "DataOperationsFailures"
        export const DataOperations = "DataOperations"
        export const DataReaders = "DataReaders"

        export const MATLABAnalytics = "MATLABAnalytics"
        export const MATLABAnalytic = "MATLABAnalytic"

        export const DatabaseCleanup = "DBCleanup"

        // External Links
        export const RemoteXDAInstances = "RemoteXDAInstanceMain"
        export const RemoteXDAInstance = "RemoteXDAInstance"

        export const ExternalDatabases = "ByExternalDB"
        export const ExternalDatabase = "ExternalDB"

        export const ExternalTables = "ByExternalTable"
        export const ExternalTable = "ExternalTable"

        // UI Configuration
        export const EventTypes = "EventType"

        export const ValueLists = "ValueLists"
        export const ValueList = "ValueListGroup"

        export const ChannelGroups = "ChannelGroups"
        export const ChannelGroup = "ChannelGroup"

        export const PQBrowserTabs = "SEBrowserTabs"
        export const PQBrowserTab = "SEBrowserTab"

        export const PQBrowserWidgets = "SEBrowserWidget"

        export const PQBrowserDigest = "PQDigestHomePage"
        export const PQBrowserDigestWidgets = "PQDigestWidget"

        export const MagDurCurves = "MagDurCurves"

        export const EventTags = "EventTags"

        export const ApplicationCategories = "ByApplicationCategory"
        export const ApplicationCategory = "ApplicationCategory"

        // System Settings
        export const Nodes = "AppHost"

        export const TaskRunners = "TaskRunners"
        export const TaskRunner = "Node"

        export const Settings = "Settings"

        export const AdditionalFields = "ByAdditionalField"

        // Access
        export const UserStatistics = "UserStatistics"

        export const SSOApplications = "ApplicationNodes"

        export const APIKeys = "APIAccessKey"

        export const Users = "Users"
        export const User = "User"

        export const UserGroups = "Groups"
        export const UserGroup = "Group"
    }

    // Monitors and Assets
    export const MeterByPage = Base + PageName.Meters;
    export const MeterDetails = Base + PageName.Meter;
    export const NewMeterWizard = Base + PageName.NewMeterWizard;
    export const ConfigurationHistory = Base + PageName.ConfigurationHistory;

    export const LocationByPage = Base + PageName.Locations;
    export const LocationDetails = Base + PageName.Location;

    export const AssetByPage = Base + PageName.Assets;
    export const AssetDetails = Base + PageName.Asset;

    export const LineSegmentByPage = Base + PageName.LineSegments;
    export const LineSegmentDetails = Base + PageName.LineSegment;

    export const AssetGroupByPage = Base + PageName.AssetGroups;
    export const AssetGroupDetails = Base + PageName.AssetGroup;

    export const CustomerByPage = Base + PageName.Customers;
    export const CustomerDetails = Base + PageName.Customer;

    // File Processing
    export const DeviceHealthReport = Base + PageName.DeviceHealthReport;
    export const DeviceIssuesPage = Base + PageName.DeviceIssues;
    export const DeviceContacts = Base + PageName.DeviceContacts;

    export const DataFiles = Base + PageName.DataFiles;
    export const DataOperationFailures = Base + PageName.DataOperationFailures;

    export const DataOperations = Base + PageName.DataOperations; // &System=OpenXDA // System parameter is unused.
    export const DataReaders = Base + PageName.DataReaders; // &System=OpenXDA" // see above.

    export const MATLABAnalyticByPage = Base + PageName.MATLABAnalytics;
    export const MATLABAnalyticDetails = Base + PageName.MATLABAnalytic;

    export const DatabaseCleanup = Base + PageName.DatabaseCleanup;


    // External Links
    export const RemoteXDAInstanceByPage = Base + PageName.RemoteXDAInstances;
    export const RemoteXDAInstanceDetails = Base + PageName.RemoteXDAInstance;

    export const ExternalDatabaseByPage = Base + PageName.ExternalDatabases;
    export const ExternalDatabaseDetails = Base + PageName.ExternalDatabase;

    export const ExternalTableByPage = Base + PageName.ExternalTables;
    export const ExternalTableDetails = Base + PageName.ExternalTable;

    // UI Configuration
    export const EventTypes = Base + PageName.EventTypes;

    export const ValueListByPage = Base + PageName.ValueLists;
    export const ValueListGroup = Base + PageName.ValueList;

    export const ChannelGroupByPage = Base + PageName.ChannelGroups;
    export const ChannelGroupDetail = Base + PageName.ChannelGroup;

    export const PQBrowserTabByPage = Base + PageName.PQBrowserTabs;
    export const PQBrowserTabDetail = Base + PageName.PQBrowserTab;

    export const PQBrowserWidgets = Base + PageName.PQBrowserWidgets;

    export const PQBrowserDigest = Base + PageName.PQBrowserDigest;
    export const PQBrowserDigestWidgets = Base + PageName.PQBrowserDigestWidgets;

    export const MagDurCurves = Base + PageName.MagDurCurves;

    export const EventTags = Base + PageName.EventTags;

    export const ApplicationCategoryByPage = Base + PageName.ApplicationCategories;
    export const ApplicationCategoryDetails = Base + PageName.ApplicationCategory;

    // System Settings
    export const Nodes = Base + PageName.Nodes;

    export const TaskRunnerByPage = Base + PageName.TaskRunners;
    export const TaskRunnerDetails = Base + PageName.TaskRunner;

    export const Settings = Base + PageName.Settings;

    export const AdditionalFieldsByPage = Base + PageName.AdditionalFields;

    // Access
    export const UserStatistics = Base + PageName.UserStatistics;

    export const SSOApplications = Base + PageName.SSOApplications;

    export const APIKeys = Base + PageName.APIKeys;

    export const UserByPage = Base + PageName.Users;
    export const UserDetails = Base + PageName.User;

    export const UserGroupByPage = Base + PageName.UserGroups;
    export const UserGroupDetails = Base + PageName.UserGroup;
}