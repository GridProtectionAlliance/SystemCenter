//******************************************************************************************************
//  Matcher.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  01/24/2025 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingScreen } from '@gpa-gemstone/react-interactive';
import { useAppSelector } from './hooks';
import ApplicationCategory from './ApplicationCategory/ApplicationCategory';
import { SelectRoles } from './Store/UserSettings';
import * as queryString from 'querystring';
import { SystemCenterURL } from './constants';

declare var homePath: string;
declare var controllerViewPath: string;
declare var version: string;

const Matcher: React.FunctionComponent = (props: {}) => {
    const roles = useAppSelector(SelectRoles);
    const location = useLocation();

    const ByMeter = React.lazy(() => import(/*webpackChunkName: "ByMeter"*/'./Meter/ByMeter'));
    const ByLocation = React.lazy(() => import(/* webpackChunkName: "ByLocation" */ './Location/ByLocation'));
    const ByAsset = React.lazy(() => import(/* webpackChunkName: "ByAsset" */ './Asset/ByAsset'));
    const ByLineSegment = React.lazy(() => import(/* webpackChunkName: "ByLineSegment" */ './LineSegment/ByLineSegment'));
    const ByCustomer = React.lazy(() => import(/* webpackChunkName: "ByCustomer" */ './Customer/ByCustomer'));
    const RemoteXDAInstanceMain = React.lazy(() => import(/* webpackChunkname: "RemoteXDA" */ './RemoteXDA/RemoteXDAInstanceMain'))
    const RemoteXDAInstance = React.lazy(() => import(/* webpackChunkname: "RemoteXDA" */ './RemoteXDA/RemoteXDAInstance'))
    const ByExternalDB = React.lazy(() => import(/* webpackChunkname: "ByExternalDB" */ './ExternalDB/ByExternalDB'));
    const ByExternalTable = React.lazy(() => import(/* webpackChunkname: "ByExternalTable" */ './ExternalDB/ByExternalTable'));
    const ExternalDB = React.lazy(() => import(/* webpackChunkname: "ExternalDB" */ './ExternalDB/ExternalDB'));
    const ExternalDBTable = React.lazy(() => import(/* webpackChunkname: "ExternalDB" */ './ExternalDB/ExternalDBTable'));
    const ByAdditionalField = React.lazy(() => import(/* webpackChunkname: "ByAdditionalField" */ './AdditionalFields/ByAdditionalField'));
    const ByUser = React.lazy(() => import(/* webpackChunkName: "ByUser" */ './User/User/ByUser'));
    const BySecuritytGroup = React.lazy(() => import(/* webpackChunkName: "ByUser" */ './User/UserGroup/ByUserGroup'));
    const UserStatistics = React.lazy(() => import(/* webpackChunkName: "UserStatistics" */ './UserStatistics/UserStatistics'));
    const Customer = React.lazy(() => import(/* webpackChunkName: "Customer" */ './Customer/Customer'));
    const User = React.lazy(() => import(/* webpackChunkName: "User" */ './User/User/User'));
    const UserGroup = React.lazy(() => import(/* webpackChunkName: "UserGroup" */ './User/UserGroup/UserGroup'));
    const Asset = React.lazy(() => import(/* webpackChunkName: "Asset" */ './Asset/Asset'));
    const NewMeterWizard = React.lazy(() => import( /* webpackChunkName: "NewMeterWizard" */ './NewMeterWizard/NewMeterWizard'));
    const ConfigurationHistory = React.lazy(() => import(/* webpackChunkName: "ConfigurationHistory" */ './ConfigurationHistory/ConfigurationHistory'));
    const Meter = React.lazy(() => import(/* webpackChunkName: "Meter" */ './Meter/Meter'));
    const Location = React.lazy(() => import(/* webpackChunkName: "Location" */ './Location/Location'));
    const ByAssetGroup = React.lazy(() => import(/* webpackChunkName: "ByAssetGroup" */ './AssetGroups/ByAssetGroup'));
    const AssetGroup = React.lazy(() => import(/* webpackChunkName: "AssetGroup" */ './AssetGroups/AssetGroup'));
    const ByEventType = React.lazy(() => import(/* webpackChunkName: "ByEventType" */ './EventType/ByEventType'));
    const BySettings = React.lazy(() => import(/* webpackChunkName: "BySetting" */ './Settings/BySetting'));
    const ByValueListGroup = React.lazy(() => import(/* webpackChunkName: "ByValueListGroup" */ './ValueListGroup/ByValueListGroup'));
    const ValueListGroup = React.lazy(() => import(/* webpackChunkName: "ValueListGroup" */ './ValueListGroup/ValueListGroup'));
    const ByChannelGroup = React.lazy(() => import(/* webpackChunkName: "ByChannelGroup" */ './ChannelGroup/ByChannelGroup'));
    const ChannelGroup = React.lazy(() => import(/* webpackChunkName: "ChannelGroup" */ './ChannelGroup/ChannelGroup'));
    const DeviceHealthReport = React.lazy(() => import(/* webpackChunkName: "DeviceHealthReport" */ './DeviceHealthReport/DeviceHealthReport'));
    const DeviceContacts = React.lazy(() => import(/* webpackChunkName: "DeviceContacts" */ './DeviceHealthReport/DeviceContacts'));
    const DeviceIssuesPage = React.lazy(() => import(/* webpackChunkName: "DeviceIssuesPage" */ './DeviceIssuesPage/DeviceIssuesPage'));
    const DataOperations = React.lazy(() => import(/* webpackChunkName: "DataOperations" */ './Settings/DataOperations'));
    const DataReaders = React.lazy(() => import(/* webpackChunkName: "DataReaders" */ './Settings/DataReaders'));
    const ByApplicationNode = React.lazy(() => import(/* webpackChunkName: "DataReaders" */ './ApplicationManagment/ApplicationNode'));
    const ByApplicationCategory = React.lazy(() => import(/* webpackChunkName: "ByApplicationCategory" */ './ApplicationCategory/ByApplicationCategory'));
    const DBCleanup = React.lazy(() => import(/* webpackChunkName: "DBCleanup" */ './DB/DBCleanup'));
    const DataFile = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './ProcessedFile/ByFile'));
    const ByDataOperationsFailure = React.lazy(() => import(/* webpackChunkName: "ByDataOperationsFailure" */ './ProcessedFile/ByDataOperationsFailure'));
    const AppHost = React.lazy(() => import(/* webpackChunkName: "AppHost" */ './AppHost/AppHost'));
    const ByNode = React.lazy(() => import(/* webpackChunkName: "ByNode" */ './Node/ByNode'));
    const Node = React.lazy(() => import (/* webpackChunkName: "Node" */ './Node/Node'))
    const ByPQDigestHomePage = React.lazy(() => import(/* webpackChunkName: "ByHomeScreenWidget" */ './PQDigest/ByHomeScreenWidget'));
    const ByPQDigestWidget = React.lazy(() => import(/* webpackChunkName: "ByPQDigestWidget" */ './PQDigest/ByWidget'));
    const SEBrowserCategory = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/WidgetCategory'));
    const BySEBrowserCategory = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/ByWidgetCategory'));
    const BySEBrowserWidget = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/ByWidget'));
    const ByMagDurCurve = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './MagDurCurves/ByMagDurCurve'));
    const APIAccessKey = React.lazy(() => import(/* webpackChunkName: "APIAccessKey" */ './APIAccessKeys/APIAccessKeys'));
    const ByEventTag = React.lazy(() => import(/* webpackChunkName: "ByEventTag" */ './EventTag/ByEventTag'));
    const ByMATLABAnalytic = React.lazy(() => import(/* webpackChunkName: "ByMATLABAnalytic" */ './MATLABAnalytics/ByMATLABAnalytic'));
    const MATLABAnalytic = React.lazy(() => import(/* webpackChunkName: "MATLABAnalytic" */ './MATLABAnalytics/MATLABAnalytic'));
    const RoleAccessErrorPage = React.lazy(() =>
        import(/* webpackChunkName: "RoleAccessErrorPage" */ '@gpa-gemstone/common-pages')
        .then(module => ({ default: module.RoleAccessErrorPage }))
);

    const params = queryString.parse(location.search.replace("?", ""), "&", "=");

    const routedComponent = React.useMemo(() => {
        if (params['name'] == SystemCenterURL.PageName.Meter)
            return <Meter MeterID={parseInt(params.MeterID as string)} Tab={params.Tab as any} />
        else if (params['name'] == SystemCenterURL.PageName.NewMeterWizard)
            return <NewMeterWizard IsEngineer={roles.indexOf('Administrator') >= 0 || roles.indexOf('Engineer') >= 0} />
        else if (params['name'] == SystemCenterURL.PageName.ConfigurationHistory)
            return <ConfigurationHistory MeterConfigurationID={parseInt(params.MeterConfigurationID as string)} MeterKey={params.MeterKey as string} />
        else if (params['name'] == SystemCenterURL.PageName.Locations)
            return <ByLocation Roles={roles} />
        else if (params['name'] == SystemCenterURL.PageName.Location)
            return <Location LocationID={parseInt(params.LocationID as string)} Tab={params.Tab as any} />
        else if (params['name'] == SystemCenterURL.PageName.Assets)
            return <ByAsset Roles={roles} />
        else if (params['name'] == SystemCenterURL.PageName.Asset || params['name'] == SystemCenterURL.PageName.LineSegment)
            return <Asset AssetID={parseInt(params.AssetID as string)} Tab={params.Tab as any} />
        else if (params['name'] == SystemCenterURL.PageName.AssetGroups)
            return <ByAssetGroup Roles={roles} />
        else if (params['name'] == SystemCenterURL.PageName.AssetGroup)
            return <AssetGroup AssetGroupID={parseInt(params.AssetGroupID as string)} Tab={params.Tab as any} />
        else if (params['name'] == SystemCenterURL.PageName.LineSegments)
            return <ByLineSegment Roles={roles} />
        else if (params['name'] == SystemCenterURL.PageName.Customers)
            return <ByCustomer Roles={roles} />
        else if (params['name'] == SystemCenterURL.PageName.Customer)
            return <Customer CustomerID={parseInt(params.CustomerID as string)} Tab={params.Tab as any} />

        else if (params['name'] == SystemCenterURL.PageName.DeviceHealthReport)
            return <DeviceHealthReport Roles={roles} />
        else if (params['name'] == SystemCenterURL.PageName.DeviceIssues)
            return <DeviceIssuesPage MeterID={parseInt(params.MeterID as string)} Tab={params.Tab as any} OpenMICAcronym={params.OpenMICAcronym as string} />
        else if (params['name'] == SystemCenterURL.PageName.DeviceContacts)
            return <DeviceContacts ID={params.ID as string} Name={params.Name as string} Field={params.Field as 'TSC' | 'Sector'} />

        else if (params['name'] == SystemCenterURL.PageName.DataFiles) {
            if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <DataFile Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.DataOperationFailures) {
            if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0) return null;
            return <ByDataOperationsFailure FileGroupID={parseInt(params.FileGroupID as string)} />
        }
        else if (params['name'] == SystemCenterURL.PageName.DataOperations) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <DataOperations Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.DataReaders) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <DataReaders Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.DatabaseCleanup) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <DBCleanup Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.MATLABAnalytics) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByMATLABAnalytic Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.MATLABAnalytic) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <MATLABAnalytic AnalyticID={parseInt(params.AnalyticID as string)} Tab={params.Tab as any} />
        }

        else if (params['name'] == SystemCenterURL.PageName.RemoteXDAInstances) {
            if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <RemoteXDAInstanceMain Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.RemoteXDAInstance) {
            if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <RemoteXDAInstance ID={parseInt(params.ID as string)} Roles={roles} Tab={params.Tab as any} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ExternalDatabases) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByExternalDB Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ExternalDatabase) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ExternalDB ID={parseInt(params.ID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ExternalTables) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByExternalTable Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ExternalTable) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ExternalDBTable ID={parseInt(params.ID as string)} Tab={params.Tab as any} />
        }

        else if (params['name'] == SystemCenterURL.PageName.EventTypes) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByEventType Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ValueList) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ValueListGroup GroupID={parseInt(params.GroupID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ValueLists) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByValueListGroup Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ChannelGroups) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByChannelGroup Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ChannelGroup) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ChannelGroup GroupID={parseInt(params.GroupID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == SystemCenterURL.PageName.PQBrowserTabs) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <BySEBrowserCategory Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.PQBrowserTab) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <SEBrowserCategory TabID={parseInt(params.TabID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == SystemCenterURL.PageName.PQBrowserWidgets) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <BySEBrowserWidget Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.PQBrowserDigestWidgets) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByPQDigestWidget Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.PQBrowserDigest) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByPQDigestHomePage Roles={roles} />
        }
            
        else if (params['name'] == SystemCenterURL.PageName.MagDurCurves) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByMagDurCurve Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.EventTags) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByEventTag Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ApplicationCategories) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByApplicationCategory Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.ApplicationCategory) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ApplicationCategory ID={parseInt(params.ID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == SystemCenterURL.PageName.Nodes) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <AppHost Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.TaskRunners) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByNode Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.TaskRunner) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <Node NodeID={parseInt(params.NodeID as string)} Tab={'info'} Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.Settings) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <BySettings Roles={roles} System={params.System as 'SystemCenter' | 'OpenXDA' | 'MiMD' | 'OpenSEE' | 'SEBrowser' | 'PQDigest'} />
        }
        else if (params['name'] == SystemCenterURL.PageName.AdditionalFields) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByAdditionalField Roles={roles} />
        }

        else if (params['name'] == SystemCenterURL.PageName.UserStatistics) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <UserStatistics Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.SSOApplications) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByApplicationNode Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.APIKeys) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <APIAccessKey Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.Users) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <ByUser Roles={roles} />
        }
        else if (params['name'] == SystemCenterURL.PageName.User) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <User UserID={params.UserAccountID as string} Tab={params.Tab as any} />
        }
        else if (params['name'] == SystemCenterURL.PageName.UserGroup) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <UserGroup GroupID={params.GroupID as string} Tab={params.Tab as any} />
        }
        else if (params['name'] == SystemCenterURL.PageName.UserGroups) {
            if (roles.indexOf('Administrator') < 0)
                return <RoleAccessErrorPage Logo={`${homePath}Images/GiantLogo.png`} />
            return <BySecuritytGroup Roles={roles} />
        }
        else
            return <ByMeter Roles={roles} />
    }, [params, roles]);

    return (
        <React.Suspense fallback={<LoadingScreen Show={true} />}>
            {routedComponent}
        </React.Suspense>
    )
}

export default Matcher;