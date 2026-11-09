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

    // Monitors and Assets
    export const MeterByPage = "index.cshtml?name=Meters";
    export const NewMeterWizard = `index.cshtml?name=NewMeterWizard`;
    export const MeterDetails = `index.cshtml?name=Meter`;
    export const ConfigurationHistory = "index.cshtml?name=ConfigurationHistory";

    export const LocationByPage = "index.cshtml?name=Locations";
    export const LocationDetails = "index.cshtml?name=Location";

    export const AssetByPage = "index.cshtml?name=Assets";
    export const AssetDetails = "index.cshtml?name=Asset";

    export const LineSegmentByPage = "index.cshtml?name=LineSegments";
    export const LineSegmentDetails = "index.cshtml?name=LineSegment";

    export const AssetGroupByPage = "index.cshtml?name=AssetGroups";
    export const AssetGroupDetails = "index.cshtml?name=AssetGroup";

    export const CustomerByPage = "index.cshtml?name=PQViewCustomers";
    export const CustomerDetails = "index.cshtml?name=Customer";

    // File Processing
    export const DeviceHealthReport = "index.cshtml?name=DeviceHealthReport";
    export const DeviceIssuesPage = "index.cshtml?name=DeviceIssuesPage";
    export const DeviceContacts = "index.cshtml?name=DeviceContacts";

    export const DataFiles = "index.cshtml?name=DataFiles";
    export const DataOperationFailures = "index.cshtml?name=DataOperationsFailures";

    export const DataOperations = "index.cshtml?name=DataOperations&System=OpenXDA"; // are any other "System" variables valid?
    export const DataReaders = "index.cshtml?name=DataReaders&System=OpenXDA";

    export const MATLABAnalyticByPage = "index.cshtml?name=MATLABAnalytics";
    export const MATLABAnalyticDetails = "index.cshtml?name=MATLABAnalytic";

    export const DatabaseCleanup = "index.cshtml?name=DBCleanup";

    // External Links
    export const RemoteXDAInstanceByPage = "index.cshtml?name=RemoteXDAInstanceMain";
    export const RemoteXDAInstanceDetails = "index.cshtml?name=RemoteXDAInstance";

    export const ExternalDatabaseByPage = "index.cshtml?name=ByExternalDB";
    export const ExternalDatabaseDetails = "index.cshtml?name=ExternalDB";

    export const ExternalTableByPage = "index.cshtml?name=ByExternalTable";
    export const ExternalTableDetails = "index.cshtml?name=ExternalTable";

    // UI Configuration
    export const EventTypes = "index.cshtml?name=EventType";

    export const ValueListByPage = "index.cshtml?name=ValueLists";
    export const ValueListGroup = "index.cshtml?name=ValueListGroup";

    export const ChannelGroupByPage = "index.cshtml?name=ChannelGroups";
    export const ChannelGroupDetail = "index.cshtml?name=ChannelGroup";

    export const PQBrowserTabByPage = "index.cshtml?name=SEBrowserTabs";
    export const PQBrowserTabDetail = "index.cshtml?name=SEBrowserTab";

    export const PQBrowserWidgets = "index.cshtml?name=SEBrowserWidget";

    export const PQBrowserDigest = "index.cshtml?name=PQDigestHomePage";
    export const PQBrowserDigestWidgets = "index.cshtml?name=PQDigestWidget";

    export const MagDurCurves = "index.cshtml?name=MagDurCurves";

    export const EventTags = "index.cshtml?name=EventTags";

    export const ApplicationCategoryByPage = "index.cshtml?name=ByApplicationCategory";
    export const ApplicationCategoryDetails = "index.cshtml?name=ApplicationCategory";

    // SystemSettings
    export const Nodes = "index.cshtml?name=AppHost";

    export const TaskRunnerByPage = "index.cshtml?name=TaskRunners";
    export const TaskRunnerDetails = "index.cshtml?name=Node";

    export const Settings = "index.cshtml?name=Settings";

    export const AdditionalFieldsByPage = "index.cshtml?name=ByAdditionalField";

    // Access
    export const UserStatistics = "index.cshtml?name=UserStatistics";

    export const SSOApplications = "index.cshtml?name=ApplicationNodes";

    export const APIKeys = "index.cshtml?name=APIAccessKey";

    export const UserByPage = "index.cshtml?name=Users";
    export const UserDetails = "index.cshtml?name=User";

    export const UserGroupByPage = "index.cshtml?name=Groups";
    export const UserGroupDetails = "index.cshtml?name=Group";
}