//******************************************************************************************************
//  SystemCenter.tsx - Gbtc
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
//  08/22/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from "history"
import { Application as AppTypes, SystemCenter as SCTypes } from '@gpa-gemstone/application-typings';
import { Application, Page, Section } from '@gpa-gemstone/react-interactive';
import { Provider } from 'react-redux';
import store, { SystemCenterSettingSlice } from './Store/Store';
import { useAppDispatch, useAppSelector } from './hooks';

declare var homePath: string;
declare var version: string;

const SystemCenter: React.FunctionComponent = (props: {}) => {
    const dispatch = useAppDispatch();

    const history = createBrowserHistory();
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
    const BySecurityGroup = React.lazy(() => import(/* webpackChunkName: "ByUser" */ './User/UserGroup/ByUserGroup'));
    const UserStatistics = React.lazy(() => import(/* webpackChunkName: "UserStatistics" */ './UserStatistics/UserStatistics'));
    const Customer = React.lazy(() => import(/* webpackChunkName: "Customer" */ './Customer/Customer'));
    const User = React.lazy(() => import(/* webpackChunkName: "User" */ './User/User/User'));
    const UserGroup = React.lazy(() => import(/* webpackChunkName: "UserGroup" */ './User/UserGroup/UserGroup'));
    const Asset = React.lazy(() => import(/* webpackChunkName: "Asset" */ './Asset/Asset'));
    const NewMeterWizard = React.lazy(() => import( /* webpackChunkName: "NewMeterWizard" */ './NewMeterWizard/NewMeterWizard'));
    const ConfigurationHistory = React.lazy(() => import(/* webpackChunkName: "ConfigurationHistory" */ './ConfigurationHistory/ConfigurationHistory'));
    const Meter = React.lazy(() => import(/* webpackChunkName: "Meter" */'./Meter/Meter'));
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

    const [roles, setRoles] = React.useState<Array<AppTypes.Types.SecurityRoleName>>([]);
    const [ignored, forceUpdate] = React.useReducer((x: number) => x + 1, 0); // integer state for resize renders

    React.useEffect(() => {
        let handle = getRoles();
        handle.done(rs => setRoles(rs));
        window.addEventListener('resize', (evt) => forceUpdate());

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();

            window.removeEventListener('resize', (evt) => { });
        }

    }, []);

    const settings: SCTypes.Types.Setting[] = useAppSelector(SystemCenterSettingSlice.Data);
    const settingsStatus: AppTypes.Types.Status = useAppSelector(SystemCenterSettingSlice.Status);

    React.useEffect(() => {
        if (settingsStatus == 'unintiated' || settingsStatus == 'changed')
            dispatch(SystemCenterSettingSlice.Fetch());

        return function () {
        }

    }, [dispatch, settingsStatus]);


    function getRoles(): JQuery.jqXHR<Array<AppTypes.Types.SecurityRoleName>> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/SecurityRoles`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }

    return (
        <Application
            HomePath={homePath}
            DefaultPath={'ByMeter'}
            Logo={'../Images/SystemCenter-TopLeft.png'}
            Version={version}
            AllowCollapsed={true}
            UserRoles={roles}
            OnSignOut={() => window.location.href = './@GSF/Web/Security/Views/Login.cshtml?logout=yes' }
        >
            <Section Label='System Center' />
            <Section Label={'Monitors and Assets'}>
                <Page Name={'ByMeter'} Label={'Meters'}><ByMeter Roles={roles} /></Page>
                <Page Name={'Meter'} Paths={['/:MeterID']}>
                    <Meter />
                </Page>
                <Page Name={'NewMeterWizard'}>
                    <NewMeterWizard IsEngineer={roles.indexOf('Administrator') >= 0 || roles.indexOf('Transmission SME') >= 0} />
                </Page>
                <Page Name={'ConfigurationHistory'} RequiredRoles={['Administrator', 'Transmission SME']} Paths={['/:MeterConfigurationID/:MeterKey']}>
                    <ConfigurationHistory />
                </Page>
                <Page Name={'ByLocation'} Label={'Substations'}><ByLocation Roles={roles} /></Page>
                <Page Name={'Location'} Paths={['/:LocationID']}>
                    <Location />
                </Page>
                <Page Name={'ByAsset'} Label={'Assets'}><ByAsset Roles={roles} /></Page>
                <Page Name={'Asset'} Paths={['/:AssetID']}>
                    <Asset />
                </Page>
                <Page Name={'ByAssetGroup'} Label={'Asset Groups'}><ByAssetGroup Roles={roles} /></Page>
                <Page Name={'AssetGroup'} Paths={['/:AssetGroupID']}>
                    <AssetGroup />
                </Page>
                <Page Name={'ByCustomer'} Label={'Customers'}><ByCustomer Roles={roles} /></Page>
                <Page Name={'Customer'} Paths={['/:CustomerID']}>
                    <Customer />
                </Page>
                <Page Name={'PQViewSites'}>
                    <iframe style={{ width: '100%', height: '100%' }} src={homePath + 'PQViewDataLoader.cshtml'}></iframe>
                </Page>
                <Page Name={'DeviceContacts'} Paths={['/:ID/:Name/:Field']}>
                    <DeviceContacts />
                </Page>
                <Page Name={'DeviceIssuesPage'} Paths={['/:MeterID/:OpenMICAcronym']}>
                    <DeviceIssuesPage />
                </Page>
                {settings.find(s => s.Name == 'SystemCenter.ShowDeviceHealthReport')?.Value == "1" ?
                    <Page Name={'DeviceHealthReport'} Label={'Device Health Report'}><DeviceHealthReport Roles={roles} /></Page>
                : null}
            </Section>
            <Section Label={'File Processing'}>
                <Page Name={'DataFile'} Label={'Data Files'} RequiredRoles={['Administrator', 'Transmission SME']}><DataFile Roles={roles} /></Page>
                <Page Name={'DataOperations'} Label={'Data Operations'} RequiredRoles={['Administrator', 'Transmission SME']}><DataOperations Roles={roles} /></Page>
                <Page Name={'DataReaders'} Label={'Data Readers'} RequiredRoles={['Administrator', 'Transmission SME']}><DataReaders Roles={roles} /></Page>
                <Page Name={'ByMATLABAnalytic'} Label={'MATLAB Analytics'} RequiredRoles={['Administrator', 'Transmission SME']}><ByMATLABAnalytic Roles={roles} /></Page>
                <Page Name={'MATLABAnalytic'} Paths={['/:AnalyticID']}>
                    <MATLABAnalytic />
                </Page>
                <Page Name={'DBCleanup'} Label={'Database Cleanup'} RequiredRoles={['Administrator', 'Transmission SME']}><DBCleanup Roles={roles} /></Page>
                <Page Name={'DownloadedFiles'} Paths={['/:MeterID/:MeterName']}>
                    <DownloadedFiles />
                </Page>
            </Section>
            <Section Label={'External Links'}>
                <Page Name={'RemoteXDAInstanceMain'} Label={'Remote openXDA Instances'}><RemoteXDAInstanceMain Roles={roles} /></Page>
                <Page Name={'RemoteXDAInstance'} Paths={['/:ID']}>
                    <RemoteXDAInstance Roles={roles} />
                </Page>
                <Page Name={'ByExternalDB'} Label={'External Databases'} RequiredRoles={['Administrator']}><ByExternalDB Roles={roles} /></Page>
                <Page Name={'ExternalDB'} Paths={['/:ID']}>
                    <ExternalDB />
                </Page>
                <Page Name={'ByExternalTable'} Label={'External Tables'} RequiredRoles={['Administrator']}><ByExternalTable Roles={roles} /></Page>
                <Page Name={'ExternalDBTable'} Paths={['/:ID']}>
                    <ExternalDBTable />
                </Page>
            </Section>
            <Section Label={'UI Configuration'}>
                <Page Name={'ByEventType'} Label={'Event Types'} RequiredRoles={['Administrator']}><ByEventType Roles={roles} /></Page>
                <Page Name={'ByValueListGroup'} Label={'Value Lists'} RequiredRoles={['Administrator']}><ByValueListGroup Roles={roles} /></Page>
                <Page Name={'ValueListGroup'} Paths={['/:GroupID']}>
                    <ValueListGroup />
                </Page>
                <Page Name={'ByChannelGroup'} Label={'Channel Groups'} RequiredRoles={['Administrator']}><ByChannelGroup Roles={roles} /></Page>
                <Page Name={'ChannelGroup'} Paths={['/:GroupID']}>
                    <ChannelGroup />
                </Page>
                <Page Name={'BySEBrowserCategory'} Label={'PQ Browser Tabs'} RequiredRoles={['Administrator']}><BySEBrowserCategory Roles={roles} /></Page>
                <Page Name={'SEBrowserCategory'} Paths={['/:TabID']}>
                    <SEBrowserCategory />
                </Page>
                <Page Name={'BySEBrowserWidget'} Label={'PQ Browser Widgets'} RequiredRoles={['Administrator']}><BySEBrowserWidget Roles={roles} /></Page>
                <Page Name={'ByMagDurCurve'} Label={'MagDur Curves'} RequiredRoles={['Administrator']}><ByMagDurCurve Roles={roles} /></Page>
                <Page Name={'ByEventTag'} Label={'Event Tags'} RequiredRoles={['Administrator']}><ByEventTag Roles={roles} /></Page>
                <Page Name={'ByApplicationCategory'} Label={'Application Categories'} RequiredRoles={['Administrator']}><ByApplicationCategory Roles={roles} /></Page>
                <Page Name={'ApplicationCategory'} Paths={['/:ID']}>
                    <ApplicationCategory />
                </Page>
            </Section>
            <Section Label={'System Settings'}>
                <Page Name={'AppHost'} Label={'Nodes'} RequiredRoles={['Administrator']}><AppHost Roles={roles} /></Page>
                <Page Name={'BySettings'} Label={'System Center'} RequiredRoles={['Administrator']}><BySettings Roles={roles} System={'SystemCenter'} /></Page>
                <Page Name={'BySettings'} Label={'openXDA'} RequiredRoles={['Administrator']}><BySettings Roles={roles} System={'OpenXDA'} /></Page>
                <Page Name={'ByAdditionalField'} Label={'Additional Fields'} RequiredRoles={['Administrator']}><ByAdditionalField Roles={roles} /></Page>
                <Page Name={'BySettings'} Label={'miMD'} RequiredRoles={['Administrator']}><BySettings Roles={roles} System={'MiMD'} /></Page>
                <Page Name={'ByApplicationNode'} Label={'SSO Applications'} RequiredRoles={['Administrator']}><ByApplicationNode Roles={roles} /></Page>
            </Section>
            <Section Label={'User Settings'}>
                <Page Name={'UserStatistics'} Label={'User Statistics'} RequiredRoles={['Administrator']}><UserStatistics Roles={roles} /></Page>
                <Page Name={'ByUser'} Label={'Users'} RequiredRoles={['Administrator']}><ByUser Roles={roles} /></Page>
                <Page Name={'User'} Paths={['/:UserID']}>
                    <User />
                </Page>
                <Page Name={'BySecurityGroup'} Label={'User Groups'} RequiredRoles={['Administrator']}><BySecurityGroup Roles={roles} /></Page>
                <Page Name={'UserGroup'} Paths={['/:GroupID']}>
                    <UserGroup />
                </Page>
            </Section>
        </Application>
    )
}

ReactDOM.render(<Provider store={store}><SystemCenter /></Provider>, document.getElementById('window'));
