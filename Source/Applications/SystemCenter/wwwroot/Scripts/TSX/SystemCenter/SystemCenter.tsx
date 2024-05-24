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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import queryString from "querystring";
import { Application as AppTypes, SystemCenter as SCTypes } from '@gpa-gemstone/application-typings';
import { Provider } from 'react-redux';
import store, { SystemCenterSettingSlice } from './Store/Store';
import { useAppDispatch, useAppSelector } from './hooks';
import { Fetch as UserSettingsFetch, SelectRoles } from './Store/UserSettings';
import { Application, Page, Section } from '@gpa-gemstone/react-interactive';
import RouteHelper from './RouteHelper';

declare var homePath: string;
declare var controllerViewPath: string;
declare var version: string;

const SystemCenter: React.FunctionComponent = (props: {}) => {
    const dispatch = useAppDispatch();

    const [ignored, forceUpdate] = React.useReducer((x: number) => x + 1, 0); // integer state for resize renders

    React.useEffect(() => {

        window.addEventListener('resize', (evt) => forceUpdate());

        return function cleanup() {
            window.removeEventListener('resize', (evt) => { });
        }

    }, []);

    const settings: SCTypes.Types.Setting[] = useAppSelector(SystemCenterSettingSlice.Data);
    const settingsStatus: AppTypes.Types.Status = useAppSelector(SystemCenterSettingSlice.Status);
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (settingsStatus == 'unintiated' || settingsStatus == 'changed')
            dispatch(SystemCenterSettingSlice.Fetch());

        return function () {
        }

    }, [dispatch, settingsStatus]);



    React.useEffect(() => {
        dispatch(UserSettingsFetch())

    }, []);


    if (Object.keys(queryString.parse(location.search)).length == 0)
        window.location.href = homePath + 'index.cshtml?name=Meters';

    return (
        <Router>
            <Application
                HomePath={homePath}
                DefaultPath={`index.cshtml?name=Meters`}
                Logo={'../Images/SystemCenter-TopLeft.png'}
                Version={version}
                AllowCollapsed={true}
                UserRoles={roles}
                OnSignOut={() => window.location.href = './@GSF/Web/Security/Views/Login.cshtml?logout=yes'}
                UseLegacyNavigation={true}
            >
                <Section Label='System Center' />
                <Section Label={'Monitors and Assets'}>
                    <Page Name={`index.cshtml?name=Meters`} Label={'Meters'} />
                    <Page Name={'index.cshtml?name=Locations'} Label={'Substations'} />
                    <Page Name={'index.cshtml?name=Assets'} Label={'Assets'} />
                    <Page Name={'index.cshtml?name=AssetGroups'} Label={'Asset Groups'} />
                    <Page Name={'index.cshtml?name=PQViewCustomers'} Label={'Customers'} />
                    {settings.find(s => s.Name == 'SystemCenter.ShowDeviceHealthReport')?.Value == "1" ?
                        <Page Name={'index.cshtml?name=DeviceHealthReport'} Label={'Device Health Report'} />
                        : null}
                </Section>
                <Section Label={'File Processing'}>
                    <Page Name={'index.cshtml?name=DataFiles'} Label={'Data Files'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=DataOperations&System=OpenXDA'} Label={'Data Operations'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=DataReaders&System=OpenXDA'} Label={'Data Readers'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=MATLABAnalytics'} Label={'MATLAB Analytics'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=DBCleanup'} Label={'Database Cleanup'} RequiredRoles={['Administrator']} />
                </Section>
                <Section Label={'External Links'}>
                    <Page Name={'index.cshtml?name=RemoteXDAInstanceMain'} Label={'Remote openXDA Instances'} RequiredRoles={['Administrator', 'Transmission SME']} />
                    <Page Name={'index.cshtml?name=ByExternalDB'} Label={'External Databases'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=ByExternalTable'} Label={'External Tables'} RequiredRoles={['Administrator']} />
                </Section>
                <Section Label={'UI Configuration'}>
                    <Page Name={'index.cshtml?name=EventType'} Label={'Event Types'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=ValueLists'} Label={'Value Lists'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=ChannelGroups'} Label={'Channel Groups'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=SEBrowserTabs'} Label={'PQ Browser Tabs'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=SEBrowserWidget'} Label={'PQ Browser Widgets'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=MagDurCurves'} Label={'MagDur Curves'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=EventTags'} Label={'Event Tags'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=ByApplicationCategory'} Label={'Application Categories'} RequiredRoles={['Administrator']} />
                </Section>
                <Section Label={'System Settings'}>
                    <Page Name={'index.cshtml?name=AppHost'} Label={'Nodes'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=Settings&System=SystemCenter'} Label={'System Center'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=Settings&System=OpenXDA'} Label={'openXDA'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=ByAdditionalField'} Label={'Additional Fields'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=Settings&System=MiMD'} Label={'miMD'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=ApplicationNodes'} Label={'SSO Applications'} RequiredRoles={['Administrator']} />
                </Section>
                <Section Label={'User Settings'}>
                    <Page Name={'index.cshtml?name=UserStatistics'} Label={'User Statistics'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=Users'} Label={'Users'} RequiredRoles={['Administrator']} />
                    <Page Name={'index.cshtml?name=Groups'} Label={'User Groups'} RequiredRoles={['Administrator']} />
                </Section>
                <Routes>
                    <Route path='/*' element={<RouteHelper />} />
                </Routes>
            </Application>
        </Router>
    )
}

ReactDOM.render(<Provider store={store}><SystemCenter /></Provider>, document.getElementById('window'));
