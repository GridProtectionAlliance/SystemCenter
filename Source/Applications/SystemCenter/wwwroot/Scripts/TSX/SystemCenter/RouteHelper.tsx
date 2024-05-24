//******************************************************************************************************
//  RouteHelper.tsx - Gbtc
//
//  Copyright © 2024, Grid Protection Alliance.  All Rights Reserved.
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
//  05/23/2024 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "querystring";
import { useAppSelector } from './hooks';
import { Fetch as UserSettingsFetch, SelectRoles } from './Store/UserSettings';


const RouteHelper: React.FunctionComponent = (props: {}) => {
    const location = useLocation();

    const ByMeter = React.lazy(() => import(/*webpackChunkName: "ByMeter"*/'./Meter/ByMeter'));
    const ByLocation = React.lazy(() => import(/* webpackChunkName: "ByLocation" */ './Location/ByLocation'));
    const ByAsset = React.lazy(() => import(/* webpackChunkName: "ByAsset" */ './Asset/ByAsset'));
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
    const ApplicationCategory = React.lazy(() => import(/* webpackChunkName: "ApplicationCategory" */ './ApplicationCategory/ApplicationCategory'));
    const DBCleanup = React.lazy(() => import(/* webpackChunkName: "DBCleanup" */ './DB/DBCleanup'));
    const DataFile = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './ProcessedFile/ByFile'));
    const AppHost = React.lazy(() => import(/* webpackChunkName: "AppHost" */ './AppHost/AppHost'));

    const SEBrowserCategory = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/WidgetCategory'));
    const BySEBrowserCategory = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/ByWidgetCategory'));
    const BySEBrowserWidget = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './SEBrowser/ByWidget'));
    const ByMagDurCurve = React.lazy(() => import(/* webpackChunkName: "DataFile" */ './MagDurCurves/ByMagDurCurve'));
    const ByEventTag = React.lazy(() => import(/* webpackChunkName: "ByEventTag" */ './EventTag/ByEventTag'));
    const ByMATLABAnalytic = React.lazy(() => import(/* webpackChunkName: "ByMATLABAnalytic" */ './MATLABAnalytics/ByMATLABAnalytic'));
    const MATLABAnalytic = React.lazy(() => import(/* webpackChunkName: "MATLABAnalytic" */ './MATLABAnalytics/MATLABAnalytic'));

    const roles = useAppSelector(SelectRoles);

    const [lazyCmpt, setLazyCmpt] = React.useState(null);

    React.useEffect(() => {
        let qs = queryString.parse(location.search);
        if (qs['?name'] == "Locations")
            setLazyCmpt(<ByLocation Roles={roles} />)
        else if (qs['?name'] == "Assets")
            setLazyCmpt(<ByAsset Roles={roles} />)
        else if (qs['?name'] == "AssetGroups")
            setLazyCmpt(<ByAssetGroup Roles={roles} />)
        else if (qs['?name'] == "Users")
            setLazyCmpt(<ByUser Roles={roles} />)
        else if (qs['?name'] == "EventType")
            setLazyCmpt(<ByEventType Roles={roles} />)
        else if (qs['?name'] == "RemoteXDAInstanceMain")
            setLazyCmpt(<RemoteXDAInstanceMain Roles={roles} />)
        else if (qs['?name'] == "RemoteXDAInstance")
            setLazyCmpt(<RemoteXDAInstance ID={parseInt(qs.ID as string)} Roles={roles} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "ByExternalDB")
            setLazyCmpt(<ByExternalDB Roles={roles} />)
        else if (qs['?name'] == "ByExternalTable")
            setLazyCmpt(<ByExternalTable Roles={roles} />)
        else if (qs['?name'] == "ExternalDB")
            setLazyCmpt(<ExternalDB ID={parseInt(qs.ID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "ExternalTable")
            setLazyCmpt(<ExternalDBTable ID={parseInt(qs.ID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "ByAdditionalField")
            setLazyCmpt(<ByAdditionalField Roles={roles} />)
        else if (qs['?name'] == "User")
            setLazyCmpt(<User UserID={qs.UserAccountID as string} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "Group")
            setLazyCmpt(<UserGroup GroupID={qs.GroupID as string} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "ByApplicationCategory")
            setLazyCmpt(<ByApplicationCategory Roles={roles} />)
        else if (qs['?name'] == "DBCleanup")
            setLazyCmpt(<DBCleanup Roles={roles} />)
        else if (qs['?name'] == "ApplicationCategory")
            setLazyCmpt(<ApplicationCategory ID={parseInt(qs.ID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "UserStatistics")
            setLazyCmpt(<UserStatistics Roles={roles} />)
        else if (qs['?name'] == "Meter")
            setLazyCmpt(<Meter MeterID={parseInt(qs.MeterID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "Location")
            setLazyCmpt(<Location LocationID={parseInt(qs.LocationID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "Asset")
            setLazyCmpt(<Asset AssetID={parseInt(qs.AssetID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "AssetGroup")
            setLazyCmpt(<AssetGroup AssetGroupID={parseInt(qs.AssetGroupID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "Customer")
            setLazyCmpt(<Customer CustomerID={parseInt(qs.CustomerID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "PQViewSites")
            setLazyCmpt(<iframe style={{ width: '100%', height: '100%' }} src={homePath + 'PQViewDataLoader.cshtml'}></iframe>)
        else if (qs['?name'] == "PQViewCustomers")
            setLazyCmpt(<ByCustomer Roles={roles} />)
        else if (qs['?name'] == "NewMeterWizard")
            setLazyCmpt(<NewMeterWizard IsEngineer={roles.indexOf('Administrator') >= 0 || roles.indexOf('Transmission SME') >= 0} />)
        else if (qs['?name'] == "ValueListGroup")
            setLazyCmpt(<ValueListGroup GroupID={parseInt(qs.GroupID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "ChannelGroup")
            setLazyCmpt(<ChannelGroup GroupID={parseInt(qs.GroupID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "Settings")
            setLazyCmpt(<BySettings Roles={roles} System={qs.System as 'SystemCenter' | 'OpenXDA' | 'MiMD'} />)
        else if (qs['?name'] == "DataOperations")
            setLazyCmpt(<DataOperations Roles={roles} />)
        else if (qs['?name'] == "DataReaders")
            setLazyCmpt(<DataReaders Roles={roles} />)
        else if (qs['?name'] == "ApplicationNodes")
            setLazyCmpt(<ByApplicationNode Roles={roles} />)
        else if (qs['?name'] == "Groups")
            setLazyCmpt(<BySecuritytGroup Roles={roles} />)
        else if (qs['?name'] == "AppHost")
            setLazyCmpt(<AppHost Roles={roles} />)
        else if (qs['?name'] == "DeviceHealthReport") {
            setLazyCmpt(<DeviceHealthReport Roles={roles} />)
        }
        else if (qs['?name'] == "SEBrowserTabs")
            setLazyCmpt(<BySEBrowserCategory Roles={roles} />)
        else if (qs['?name'] == "SEBrowserTab")
            setLazyCmpt(<SEBrowserCategory TabID={parseInt(qs.TabID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "SEBrowserWidget")
            setLazyCmpt(<BySEBrowserWidget Roles={roles} />)
        else if (qs['?name'] == "MagDurCurves")
            setLazyCmpt(<ByMagDurCurve Roles={roles} />)
        else if (qs['?name'] == "Groups")
            setLazyCmpt(<BySecuritytGroup Roles={roles} />)
        else if (qs['?name'] == "MATLABAnalytic")
            setLazyCmpt(<MATLABAnalytic AnalyticID={parseInt(qs.AnalyticID as string)} Tab={qs.Tab as any} />)
        else if (qs['?name'] == "DownloadedFiles")
            setLazyCmpt(<DownloadedFiles MeterID={parseInt(qs.MeterID as string)} MeterName={qs.MeterName as string} />)
        else if (qs['?name'] == "DeviceContacts")
            setLazyCmpt(<DeviceContacts ID={qs.ID as string} Name={qs.Name as string} Field={qs.Field as 'TSC' | 'Sector'} />)
        else if (qs['?name'] == "DeviceIssuesPage")
            setLazyCmpt(<DeviceIssuesPage MeterID={parseInt(qs.MeterID as string)} Tab={qs.Tab as any} OpenMICAcronym={qs.OpenMICAcronym as string} />)
        else if (qs['?name'] == "ValueLists") {
            if (roles.indexOf('Administrator') < 0) setLazyCmpt(null);
            setLazyCmpt(<ByValueListGroup Roles={roles} />)
        }
        else if (qs['?name'] == "ChannelGroups")
            setLazyCmpt(<ByChannelGroup Roles={roles} />)
        else if (qs['?name'] == "ConfigurationHistory") {
            setLazyCmpt(<ConfigurationHistory MeterConfigurationID={parseInt(qs.MeterConfigurationID as string)} MeterKey={qs.MeterKey as string} />)
        }
        else if (qs['?name'] == "DataFiles") {
            if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0) setLazyCmpt(null);
            setLazyCmpt(<DataFile Roles={roles} />)
        }
        else if (qs['?name'] == "EventTags") {
            setLazyCmpt(<ByEventTag Roles={roles} />)
        }
        else if (qs['?name'] == "MATLABAnalytics") {
            if (roles.indexOf('Administrator') < 0) setLazyCmpt(null);
            setLazyCmpt(<ByMATLABAnalytic Roles={roles} />)
        }
        else
            setLazyCmpt(<ByMeter Roles={roles} />)
    }, [location.search]);

    return lazyCmpt;
}

export default RouteHelper;
