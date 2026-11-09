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
import { BrowserRouter as Router, Route, NavLink, Routes, Navigate } from 'react-router-dom';
import queryString from "querystring";
import { createBrowserHistory } from "history"
import { Application, SystemCenter as SCTypes } from '@gpa-gemstone/application-typings';
import { Application as App, Page, Section } from '@gpa-gemstone/react-interactive';
import { Provider } from 'react-redux';
import store, { SystemCenterSettingSlice } from './Store/Store';
import { useAppDispatch, useAppSelector } from './hooks';
import ApplicationCategory from './ApplicationCategory/ApplicationCategory';
import { Fetch as UserSettingsFetch, SelectRoles } from './Store/UserSettings';
import { SystemCenterURL } from './constants'
import Matcher from './Matcher';

declare var homePath: string;
declare var controllerViewPath: string;
declare var version: string;

const SystemCenter: React.FunctionComponent = (props: {}) => {
    const dispatch = useAppDispatch();
    const history = createBrowserHistory();

    const settings: SCTypes.Types.Setting[] = useAppSelector(SystemCenterSettingSlice.Data);
    const settingsStatus: Application.Types.Status = useAppSelector(SystemCenterSettingSlice.Status);
    const roles = useAppSelector(SelectRoles);

    const [ignored, forceUpdate] = React.useReducer((x: number) => x + 1, 0); // integer state for resize renders

    React.useEffect(() => {
        window.addEventListener('resize', (evt) => forceUpdate());

        return function cleanup() {
            window.removeEventListener('resize', (evt) => { });
        }
    }, []);

    React.useEffect(() => {
        if (settingsStatus == 'uninitiated' || settingsStatus == 'changed')
            dispatch(SystemCenterSettingSlice.Fetch());
    }, [settingsStatus]);

    React.useEffect(() => {
        dispatch(UserSettingsFetch())
    }, []);

    return (
        <Router>
            <div className="container-fluid" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
                <div className="row" style={{ height: '100%' }}>
                    <App
                        HomePath={homePath}
                        DefaultPath={"index.cshtml"}
                        Logo={`${homePath}Images/SystemCenter-TopLeft.png`}
                        Version={version}
                        OnSignOut={() => { window.location.href = `/@GSF/Web/Security/Views/Login.cshtml?logout=yes`; }}
                        UseLegacyNavigation={true} // Note: if we move away from legacy nav, we will have to add roles to pages that need them. Right now, access control is done in the matcher
                        UserRoles={roles}
                        AllowCollapsed={false}
                    >
                        <Section Style={{ width: '100%' }}>
                            <h5 style={{ alignSelf: 'center'}}>System Center</h5>
                        </Section>
                        <Section Label={"MONITORS AND ASSETS"} Style={{ marginLeft: "10px" }}>
                            <Page Name={SystemCenterURL.MeterByPage} Label={"Meters"}
                                OtherActivePages={[SystemCenterURL.MeterDetails, SystemCenterURL.ConfigurationHistory, SystemCenterURL.NewMeterWizard]} />
                            <Page Name={SystemCenterURL.LocationByPage} Label={"Substations"} OtherActivePages={[SystemCenterURL.LocationDetails]} />
                            <Page Name={SystemCenterURL.AssetByPage} Label={"Assets"} OtherActivePages={[SystemCenterURL.AssetDetails + "&"]} /> {/** ampersand prevents it from matching asset group pages. */ }
                            <Page Name={SystemCenterURL.LineSegmentByPage} Label={"Line Segments"} OtherActivePages={[SystemCenterURL.LineSegmentDetails]} />
                            <Page Name={SystemCenterURL.AssetGroupByPage} Label={"Asset Groups"} OtherActivePages={[SystemCenterURL.AssetGroupDetails]} />
                            <Page Name={SystemCenterURL.CustomerByPage} Label={"Customers"} OtherActivePages={[SystemCenterURL.CustomerDetails]} />
                            <Page Name={SystemCenterURL.DeviceHealthReport} Label={"Device Health Report"} OtherActivePages={[SystemCenterURL.DeviceIssuesPage, SystemCenterURL.DeviceContacts]} />
                        </Section>
                        <Section Label={"FILE PROCESSING"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator", "Engineer"]}>
                            <Page Name={SystemCenterURL.DataFiles} Label={"Data Files"} OtherActivePages={[SystemCenterURL.DataOperationFailures]} />
                            <Page Name={SystemCenterURL.DataOperations} Label={"Data Operations"} />
                            <Page Name={SystemCenterURL.DataReaders} Label={"Data Readers"} />
                            <Page Name={SystemCenterURL.MATLABAnalyticByPage} Label={"MATLAB Analytics"} OtherActivePages={[SystemCenterURL.MATLABAnalyticDetails]} />
                            <Page Name={SystemCenterURL.DatabaseCleanup} Label={"Database Cleanup"} />
                        </Section>
                        <Section Label={"EXTERNAL LINKS"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator", "Engineer"]}>
                            <Page Name={SystemCenterURL.RemoteXDAInstanceByPage} Label={"Remote openXDA Instances"} OtherActivePages={[SystemCenterURL.RemoteXDAInstanceDetails]} />
                            <Page Name={SystemCenterURL.ExternalDatabaseByPage} Label={"External Databases"} OtherActivePages={[SystemCenterURL.ExternalDatabaseDetails]} />
                            <Page Name={SystemCenterURL.ExternalTableByPage} Label={"External Tables"} OtherActivePages={[SystemCenterURL.ExternalTableDetails]} />
                        </Section>
                        <Section Label={"UI CONFIGURATION"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator"]}>
                            <Page Name={SystemCenterURL.EventTypes} Label={"Event Types"} />
                            <Page Name={SystemCenterURL.ValueListByPage} Label={"Value Lists"} OtherActivePages={[SystemCenterURL.ValueListGroup]} />
                            <Page Name={SystemCenterURL.ChannelGroupByPage} Label={"Channel Groups"} OtherActivePages={[SystemCenterURL.ChannelGroupDetail]} />
                            <Page Name={SystemCenterURL.PQBrowserTabByPage} Label={"PQ Browser Tabs"} OtherActivePages={[SystemCenterURL.PQBrowserTabDetail]} />
                            <Page Name={SystemCenterURL.PQBrowserWidgets} Label={"PQ Browser Widgets"} />
                            <Page Name={SystemCenterURL.PQBrowserDigest} Label={"PQ Digest Home"} />
                            <Page Name={SystemCenterURL.PQBrowserDigestWidgets} Label={"PQ Digest Widgets"} />
                            <Page Name={SystemCenterURL.MagDurCurves} Label={"MagDur Curves"} />
                            <Page Name={SystemCenterURL.EventTags} Label={"Event Tags"} />
                            <Page Name={SystemCenterURL.ApplicationCategoryByPage} Label={"Application Categories"} OtherActivePages={[SystemCenterURL.ApplicationCategoryDetails]} />
                        </Section>
                        <Section Label={"SYSTEM SETTINGS"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator"]}>
                            <Page Name={SystemCenterURL.Nodes} Label={"Nodes"} />
                            <Page Name={SystemCenterURL.TaskRunnerByPage} Label={"Task Runners"} OtherActivePages={[SystemCenterURL.TaskRunnerDetails]} />
                            <Page Name={SystemCenterURL.Settings + "&System=SystemCenter"} Label={"System Center"} />
                            <Page Name={SystemCenterURL.Settings + "&System=OpenXDA"} Label={"openXDA"} />
                            <Page Name={SystemCenterURL.Settings + "&System=SEBrowser"} Label={"PQ Browser"} />
                            <Page Name={SystemCenterURL.Settings + "&System=OpenSEE"} Label={"openSEE"} />
                            <Page Name={SystemCenterURL.Settings + "&System=MiMD"} Label={"miMD"} />
                            <Page Name={SystemCenterURL.Settings + "&System=PQDigest"} Label={"PQ Digest"} />
                            <Page Name={SystemCenterURL.AdditionalFieldsByPage} Label={"Additional Fields"} />
                        </Section>
                        <Section Label={"ACCESS"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator"]}>
                            <Page Name={SystemCenterURL.UserStatistics } Label={"User Statistics"} />
                            <Page Name={SystemCenterURL.SSOApplications} Label={"SSO Applications"} />
                            <Page Name={SystemCenterURL.APIKeys} Label={"API Keys"} />
                            <Page Name={SystemCenterURL.UserByPage} Label={"Users"} OtherActivePages={[SystemCenterURL.UserDetails]} />
                            <Page Name={SystemCenterURL.UserGroupByPage} Label={"User Groups"} OtherActivePages={[SystemCenterURL.UserGroupDetails]} />
                        </Section>
                        <div className="col" style={{ width: '100%', height: '100%', padding: '0 0 0 0', overflow: 'hidden' }}>
                            <Routes>
                                <Route index element={<Navigate to={`${homePath}${SystemCenterURL.MeterByPage}`} />} />
                                <Route path="/index.cshtml" element={<Matcher />} />
                            </Routes>
                        </div>
                    </App>
                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(<Provider store={store}><SystemCenter /></Provider>, document.getElementById('window'));
