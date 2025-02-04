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
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Routes, useLocation, useParams } from 'react-router-dom';
import { createBrowserHistory } from "history"
import { Application, SystemCenter as SCTypes } from '@gpa-gemstone/application-typings';
import { Application as App, LoadingScreen, Page, Section } from '@gpa-gemstone/react-interactive';
import { Provider } from 'react-redux';
import store, { SystemCenterSettingSlice } from './Store/Store';
import { useAppDispatch, useAppSelector } from './hooks';
import ApplicationCategory from './ApplicationCategory/ApplicationCategory';
import { Fetch as UserSettingsFetch, SelectRoles } from './Store/UserSettings';
import ByMeter from './Meter/ByMeter';
import * as queryString from 'querystring';

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
    const DownloadedFiles = React.lazy(() => import(/* webpackChunkName: "DownloadedFiles" */ './DeviceHealthReport/DownloadedFiles'));
    const DeviceHealthReport = React.lazy(() => import(/* webpackChunkName: "DeviceHealthReport" */ './DeviceHealthReport/DeviceHealthReport'));
    const DeviceContacts = React.lazy(() => import(/* webpackChunkName: "DeviceContacts" */ './DeviceHealthReport/DeviceContacts'));
    const DeviceIssuesPage = React.lazy(() => import(/* webpackChunkName: "DeviceIssuesPage" */ './DeviceIssuesPage/DeviceIssuesPage'));
    const DataOperations = React.lazy(() => import(/* webpackChunkName: "DataOperations" */ './Settings/DataOperations'));
    const DataReaders = React.lazy(() => import(/* webpackChunkName: "DataReaders" */ './Settings/DataReaders'));
    const ByApplicationNode = React.lazy(() => import(/* webpackChunkName: "DataReaders" */ './ApplicationManagment/ApplicationNode'));
    const ByApplicationCategory = React.lazy(() => import(/* webpackChunkName: "ByApplicationCategory" */ './ApplicationCategory/ByApplicationCategory'));
    const DBCleanup = React.lazy(() => import(/* webpackChunkName: "DBCleanup" */ './DB/DBCleanup'));
    const DataFile = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './ProcessedFile/ByFile'));
    const AppHost = React.lazy(() => import(/* webpackChunkName: "AppHost" */ './AppHost/AppHost'));

    const SEBrowserCategory = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/WidgetCategory'));
    const BySEBrowserCategory = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/ByWidgetCategory'));
    const BySEBrowserWidget = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/ByWidget'));
    const ByMagDurCurve = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './MagDurCurves/ByMagDurCurve'));
    const APIAccessKey = React.lazy(() => import(/* webpackChunkName: "APIAccessKey" */ './APIAccessKeys/APIAccessKeys'));
    const ByEventTag = React.lazy(() => import(/* webpackChunkName: "ByEventTag" */ './EventTag/ByEventTag'));
    const ByMATLABAnalytic = React.lazy(() => import(/* webpackChunkName: "ByMATLABAnalytic" */ './MATLABAnalytics/ByMATLABAnalytic'));
    const MATLABAnalytic = React.lazy(() => import(/* webpackChunkName: "MATLABAnalytic" */ './MATLABAnalytics/MATLABAnalytic'));

    const params = queryString.parse(location.search.replace("?", ""), "&", "=");

    const routedComponent = React.useMemo(() => {
        console.log("param shift")
        if (params['name'] == "Meter")
            return <Meter MeterID={parseInt(params.MeterID as string)} Tab={params.Tab as any} />
        else if (params['name'] == "NewMeterWizard")
            return <NewMeterWizard IsEngineer={roles.indexOf('Administrator') >= 0 || roles.indexOf('Engineer') >= 0} />
        else if (params['name'] == "ConfigurationHistory")
            return <ConfigurationHistory MeterConfigurationID={parseInt(params.MeterConfigurationID as string)} MeterKey={params.MeterKey as string} />
        else if (params['name'] == "Locations")
            return <ByLocation Roles={roles} />
        else if (params['name'] == "Location")
            return <Location LocationID={parseInt(params.LocationID as string)} Tab={params.Tab as any} />
        else if (params['name'] == "Assets")
            return <ByAsset Roles={roles} />
        else if (params['name'] == "Asset" || params['name'] == "LineSegment")
            return <Asset AssetID={parseInt(params.AssetID as string)} Tab={params.Tab as any} />
        else if (params['name'] == "AssetGroups")
            return <ByAssetGroup Roles={roles} />
        else if (params['name'] == "AssetGroup")
            return <AssetGroup AssetGroupID={parseInt(params.AssetGroupID as string)} Tab={params.Tab as any} />
        else if (params['name'] == "LineSegments")
            return <ByLineSegment Roles={roles} />
        else if (params['name'] == "PQViewCustomers")
            return <ByCustomer Roles={roles} />
        else if (params['name'] == "Customer")
            return <Customer CustomerID={parseInt(params.CustomerID as string)} Tab={params.Tab as any} />
        else if (params['name'] == "DeviceHealthReport")
            return <DeviceHealthReport Roles={roles} />
        else if (params['name'] == "DeviceIssuesPage")
            return <DeviceIssuesPage MeterID={parseInt(params.MeterID as string)} Tab={params.Tab as any} OpenMICAcronym={params.OpenMICAcronym as string} />
        else if (params['name'] == "DeviceContacts")
            return <DeviceContacts ID={params.ID as string} Name={params.Name as string} Field={params.Field as 'TSC' | 'Sector'} />
        else if (params['name'] == "DownloadedFiles")
            return <DownloadedFiles MeterID={parseInt(params.MeterID as string)} MeterName={params.MeterName as string} />

        //TO DO: Add page to gemstone for Users who do not have permission to replace null return
        else if (params['name'] == "DataFiles") {
            if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0) return null;
            return <DataFile Roles={roles} />
        }
        else if (params['name'] == "DataOperations") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <DataOperations Roles={roles} />
        }
        else if (params['name'] == "DataReaders") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <DataReaders Roles={roles} />
        }
        else if (params['name'] == "DBCleanup") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <DBCleanup Roles={roles} />
        }
        else if (params['name'] == "MATLABAnalytics") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByMATLABAnalytic Roles={roles} />
        }
        else if (params['name'] == "MATLABAnalytic") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <MATLABAnalytic AnalyticID={parseInt(params.AnalyticID as string)} Tab={params.Tab as any} />
        }

        else if (params['name'] == "RemoteXDAInstanceMain") {
            if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0) return null;
            return <RemoteXDAInstanceMain Roles={roles} />
        }
        else if (params['name'] == "RemoteXDAInstance") {
            if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0) return null;
            return <RemoteXDAInstance ID={parseInt(params.ID as string)} Roles={roles} Tab={params.Tab as any} />
        }
        else if (params['name'] == "ByExternalDB") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByExternalDB Roles={roles} />
        }
        else if (params['name'] == "ExternalDB") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ExternalDB ID={parseInt(params.ID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == "ByExternalTable") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByExternalTable Roles={roles} />
        }
        else if (params['name'] == "ExternalTable") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ExternalDBTable ID={parseInt(params.ID as string)} Tab={params.Tab as any} />
        }

        else if (params['name'] == "EventType") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByEventType Roles={roles} />
        }
        else if (params['name'] == "ValueListGroup") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ValueListGroup GroupID={parseInt(params.GroupID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == "ValueLists") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByValueListGroup Roles={roles} />
        }
        else if (params['name'] == "ChannelGroups") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByChannelGroup Roles={roles} />
        }
        else if (params['name'] == "ChannelGroup") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ChannelGroup GroupID={parseInt(params.GroupID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == "SEBrowserTabs") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <BySEBrowserCategory Roles={roles} />
        }
        else if (params['name'] == "SEBrowserTab") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <SEBrowserCategory TabID={parseInt(params.TabID as string)} Tab={params.Tab as any} />
        }
        else if (params['name'] == "SEBrowserWidget") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <BySEBrowserWidget Roles={roles} />
        }
        else if (params['name'] == "MagDurCurves") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByMagDurCurve Roles={roles} />
        }
        else if (params['name'] == "EventTags") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByEventTag Roles={roles} />
        }
        else if (params['name'] == "ByApplicationCategory") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByApplicationCategory Roles={roles} />
        }
        else if (params['name'] == "ApplicationCategory") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ApplicationCategory ID={parseInt(params.ID as string)} Tab={params.Tab as any} />
        }

        else if (params['name'] == "AppHost") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <AppHost Roles={roles} />
        }
        else if (params['name'] == "Settings") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <BySettings Roles={roles} System={params.System as 'SystemCenter' | 'OpenXDA' | 'MiMD' | 'OpenSEE'} />
        }
        else if (params['name'] == "ByAdditionalField") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByAdditionalField Roles={roles} />
        }

        else if (params['name'] == "UserStatistics") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <UserStatistics Roles={roles} />
        }
        else if (params['name'] == "ApplicationNodes") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByApplicationNode Roles={roles} />
        }
        else if (params['name'] == "APIAccessKey") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <APIAccessKey Roles={roles} />
        }
        else if (params['name'] == "Users") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <ByUser Roles={roles} />
        }
        else if (params['name'] == "User") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <User UserID={params.UserAccountID as string} Tab={params.Tab as any} />
        }
        else if (params['name'] == "Group") {
            if (roles.indexOf('Administrator') < 0) return null;
            return <UserGroup GroupID={params.GroupID as string} Tab={params.Tab as any} />
        }
        else if (params['name'] == "Groups") {
            if (roles.indexOf('Administrator') < 0) return null;
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