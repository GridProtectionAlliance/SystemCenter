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
        if (settingsStatus == 'unintiated' || settingsStatus == 'changed')
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
                    >
                        <Section Style={{ width: '100%' }}>
                            <h5 style={{ alignSelf: 'center'}}>System Center</h5>
                        </Section>
                        <Section Label={"MONITORS AND ASSETS"} Style={{ marginLeft: "10px" }}>
                            <Page Name={"index.cshtml?name=Meters"} Label={"Meters"}
                                OtherActivePages={["index.cshtml?name=Meter", "index.cshtml?name=ConfigurationHistory", "index.cshtml?name=NewMeterWizard"]} />
                            <Page Name={"index.cshtml?name=Locations"} Label={"Substations"} OtherActivePages={["index.cshtml?name=Location"]} />
                            <Page Name={"index.cshtml?name=Assets"} Label={"Assets"} OtherActivePages={["index.cshtml?name=Asset&"]} />
                            <Page Name={"index.cshtml?name=AssetGroups"} Label={"Asset Groups"} OtherActivePages={["index.cshtml?name=AssetGroup"]} />
                            <Page Name={"index.cshtml?name=LineSegments"} Label={"Line Segments"} OtherActivePages={["index.cshtml?name=LineSegment"]} />
                            <Page Name={"index.cshtml?name=PQViewCustomers"} Label={"Customers"} OtherActivePages={["index.cshtml?name=Customer"]} />
                            <Page Name={"index.cshtml?name=DeviceHealthReport"} Label={"Device Health Report"} OtherActivePages={["index.cshtml?name=DeviceIssuesPage"]} />
                        </Section>
                        <Section Label={"FILE PROCESSING"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator", "Engineer"]}>
                            <Page Name={"index.cshtml?name=DataFiles"} Label={"Data Files"} OtherActivePages={["index.cshtml?name=DataOperationsFailures"]} />
                            <Page Name={"index.cshtml?name=DataOperations&System=OpenXDA"} Label={"Data Operations"} />
                            <Page Name={"index.cshtml?name=DataReaders&System=OpenXDA"} Label={"Data Readers"} />
                            <Page Name={"index.cshtml?name=MATLABAnalytics"} Label={"MATLAB Analytics"} />
                            <Page Name={"index.cshtml?name=DBCleanup"} Label={"Database Cleanup"} />
                        </Section>
                        <Section Label={"EXTERNAL LINKS"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator", "Engineer"]}>
                            <Page Name={"index.cshtml?name=RemoteXDAInstanceMain"} Label={"Remote openXDA Instances"} OtherActivePages={["index.cshtml?name=RemoteXDAInstance"]} />
                            <Page Name={"index.cshtml?name=ByExternalDB"} Label={"External Databases"} OtherActivePages={["index.cshtml?name=ExternalDB"]} />
                            <Page Name={"index.cshtml?name=ByExternalTable"} Label={"External Tables"} OtherActivePages={["index.cshtml?name=ExternalTable"]} />
                        </Section>
                        <Section Label={"UI CONFIGURATION"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator"]}>
                            <Page Name={"index.cshtml?name=EventType"} Label={"Event Types"} />
                            <Page Name={"index.cshtml?name=ValueLists"} Label={"Value Lists"} OtherActivePages={["index.cshtml?name=ValueListGroup"]} />
                            <Page Name={"index.cshtml?name=ChannelGroups"} Label={"Channel Groups"} OtherActivePages={["index.cshtml?name=ChannelGroup"]} />
                            <Page Name={"index.cshtml?name=SEBrowserTabs"} Label={"PQ Browser Tabs"} OtherActivePages={["index.cshtml?name=SEBrowserTab"]} />
                            <Page Name={"index.cshtml?name=SEBrowserWidget"} Label={"PQ Browser Widgets"} />
                            <Page Name={"index.cshtml?name=MagDurCurves"} Label={"MagDur Curves"} />
                            <Page Name={"index.cshtml?name=EventTags"} Label={"Event Tags"} />
                            <Page Name={"index.cshtml?name=ByApplicationCategory"} Label={"Application Categories"} OtherActivePages={["index.cshtml?name=ApplicationCategory"]} />
                        </Section>
                        <Section Label={"SYSTEM SETTINGS"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator"]}>
                            <Page Name={"index.cshtml?name=AppHost"} Label={"Nodes"} />
                            <Page Name={"index.cshtml?name=Settings&System=SystemCenter"} Label={"System Center"} />
                            <Page Name={"index.cshtml?name=Settings&System=OpenXDA"} Label={"openXDA"} />
                            <Page Name={"index.cshtml?name=ByAdditionalField"} Label={"Additional Fields"} />
                            <Page Name={"index.cshtml?name=Settings&System=MiMD"} Label={"miMD"} />
                            <Page Name={"index.cshtml?name=Settings&System=OpenSEE"} Label={"OpenSEE"} />
                            <Page Name={"index.cshtml?name=Settings&System=SEBrowser"} Label={"SEBrowser"} />
                        </Section>
                        <Section Label={"ACCESS"} Style={{ marginLeft: "10px" }} RequiredRoles={["Administrator"]}>
                            <Page Name={"index.cshtml?name=UserStatistics"} Label={"User Statistics"} />
                            <Page Name={"index.cshtml?name=ApplicationNodes"} Label={"SSO Applications"} />
                            <Page Name={"index.cshtml?name=APIAccessKey"} Label={"API Keys"} />
                            <Page Name={"index.cshtml?name=Users"} Label={"Users"} OtherActivePages={["index.cshtml?name=User&"]} />
                            <Page Name={"index.cshtml?name=Groups"} Label={"User Groups"} OtherActivePages={["index.cshtml?name=Group"]} />
                        </Section>
                        <div className="col" style={{ width: '100%', height: '100%', padding: '0 0 0 0', overflow: 'hidden' }}>
                            <Routes>
                                <Route index element={<Navigate to={`${homePath}index.cshtml?name=Meters`} />} />
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
