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
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" style={{height: 75}}>
                <a className="col-sm-3 col-md-2 mr-0" style={{textAlign:'center'}}href="https://www.gridprotectionalliance.org"><img style={{ width: '100%', margin: -5 }} src={"../Images/SystemCenter-TopLeft.png"} /></a>
                {/*<input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>*/}
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="./@GSF/Web/Security/Views/Login.cshtml?logout=yes" >Sign out</a>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid" style={{ top: 75,  position: 'absolute', width: '100%', height: 'calc(100% - 75px)', overflow: 'hidden' }}>
                <div className="row" style={{height: '100%'}}>
                    <nav className="col bg-light sidebar" style={{ maxWidth: 250, height: '100%' }}>
                        <div className="sidebar-sticky" style={{height: 'calc(100% - 35px)'}}>
                            <div style={{ width: '100%', marginTop: 5, textAlign: 'center' }}><h3>System Center</h3></div>
                            <hr />

                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading">Monitors and Assets</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=Meter") || (location.pathname + location.search).includes(controllerViewPath + "?name=ConfigurationHistory")} to={controllerViewPath + "?name=Meters"}>Meters</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=Location")} to={controllerViewPath + "?name=Locations"}>Substations</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => {
                                        const loc = (location.pathname + location.search);
                                        return loc.includes(controllerViewPath + "?name=Asset") && !loc.includes(controllerViewPath + "?name=AssetGroup");
                                    }} to={controllerViewPath + "?name=Assets"}>Assets</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=AssetGroup")} to={controllerViewPath + "?name=AssetGroups"}>Asset Groups</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link"
                                        isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=LineSegment")}
                                        to={controllerViewPath + "?name=LineSegments"}>Line Segments</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search == controllerViewPath + "?name=PQViewCustomers") || (location.pathname + location.search).includes(controllerViewPath + "?name=Customer")} to={controllerViewPath + "?name=PQViewCustomers"}>Customers</NavLink>
                                </li>
                                <li className="nav-item" hidden={settings.find(s => s.Name == 'SystemCenter.ShowDeviceHealthReport')?.Value != "1" }>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=DeviceHealthReport") || (location.pathname + location.search).includes(controllerViewPath + "?name=DeviceIssuesPage")} to={controllerViewPath + "?name=DeviceHealthReport"}>Device Health Report</NavLink>
                                </li>
                            </ul>

                            <div hidden={roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0}>
                            <hr />
                            </div>
                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading" hidden={roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0}>File Processing</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column" hidden={roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0}>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=DataFiles"} to={controllerViewPath + "?name=DataFiles"}>Data Files</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' hidden={roles.indexOf('Administrator') < 0} className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=DataOperations&System=OpenXDA"} to={controllerViewPath + "?name=DataOperations&System=OpenXDA"}>Data Operations</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' hidden={roles.indexOf('Administrator') < 0} className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=DataReaders&System=OpenXDA"} to={controllerViewPath + "?name=DataReaders&System=OpenXDA"}>Data Readers</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' hidden={roles.indexOf('Administrator') < 0} className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=MATLABAnalytics")} to={controllerViewPath + "?name=MATLABAnalytics"}>MATLAB Analytics</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' hidden={roles.indexOf('Administrator') < 0} className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=DBCleanup"} to={controllerViewPath + "?name=DBCleanup"}>Database Cleanup</NavLink>
                                </li>
                            </ul>

                            <div hidden={roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0}>
                                <hr />
                            </div>
                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading" hidden={roles.indexOf('Administrator') < 0 && roles.indexOf("Engineer") < 0}>External Links</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column" hidden={roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0}>
                                <li className="nav-item" hidden={roles.indexOf('Administrator') < 0 && roles.indexOf("Engineer") < 0}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=RemoteXDAInstance")} to={controllerViewPath + "?name=RemoteXDAInstanceMain"}>Remote openXDA Instances</NavLink>
                                </li>
                                <li className="nav-item" hidden={roles.indexOf('Administrator') < 0}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=ByExternalDB") || (location.pathname + location.search).includes(controllerViewPath + "?name=ExternalDB")} to={controllerViewPath + "?name=ByExternalDB"}>External Databases</NavLink>
                                </li>
                                <li className="nav-item" hidden={roles.indexOf('Administrator') < 0}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=ByExternalTable") || (location.pathname + location.search).includes(controllerViewPath + "?name=ExternalTable")} to={controllerViewPath + "?name=ByExternalTable"}>External Tables</NavLink>
                                </li>
                            </ul>

                            <div hidden={roles.indexOf('Administrator') < 0}>
                            <hr />
                            </div>
                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading" hidden={roles.indexOf('Administrator') < 0}>UI Configuration</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column" hidden={roles.indexOf('Administrator') < 0}>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=EventType")} to={controllerViewPath + "?name=EventType"}>Event Types</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=ValueList")} to={controllerViewPath + "?name=ValueLists"}>Value Lists</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=ChannelGroup")} to={controllerViewPath + "?name=ChannelGroups"}>Channel Groups</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' hidden={roles.indexOf('Administrator') < 0} className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=SEBrowserTab")} to={controllerViewPath + "?name=SEBrowserTabs"}>PQ Browser Tabs</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' hidden={roles.indexOf('Administrator') < 0} className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=SEBrowserWidget")} to={controllerViewPath + "?name=SEBrowserWidget"}>PQ Browser Widgets</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' hidden={roles.indexOf('Administrator') < 0} className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=MagDurCurves")} to={controllerViewPath + "?name=MagDurCurves"}>MagDur Curves</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=EventTags")} to={controllerViewPath + "?name=EventTags"}>Event Tags</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=ByApplicationCategory") || (location.pathname + location.search).includes(controllerViewPath + "?name=ApplicationCategory")} to={controllerViewPath + "?name=ByApplicationCategory"}>Application Categories</NavLink>
                                </li>
                            </ul>

                            <div hidden={roles.indexOf('Administrator') < 0}>
                                <hr />
                            </div>
                            <h6 style={{fontWeight: 'bold', marginLeft: 10}} className="sidebar-heading" hidden={roles.indexOf('Administrator') < 0}>System Settings</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column" hidden={roles.indexOf('Administrator') < 0}>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=AppHost")} to={controllerViewPath + "?name=AppHost"}>Nodes</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Settings&System=SystemCenter"} to={controllerViewPath + "?name=Settings&System=SystemCenter"}>System Center</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Settings&System=OpenXDA"} to={controllerViewPath + "?name=Settings&System=OpenXDA"}>openXDA</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=ByAdditionalField")} to={controllerViewPath + "?name=ByAdditionalField"}>Additional Fields</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Settings&System=MiMD"} to={controllerViewPath + "?name=Settings&System=MiMD"}>miMD</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Settings&System=OpenSEE"} to={controllerViewPath + "?name=Settings&System=OpenSEE"}>OpenSEE</NavLink>
                                </li>
                            </ul>

                            <div hidden={roles.indexOf('Administrator') < 0}>
                                <hr />
                            </div>
                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading" hidden={roles.indexOf('Administrator') < 0}>Access</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column" hidden={roles.indexOf('Administrator') < 0}>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=UserStatistics"} to={controllerViewPath + "?name=UserStatistics"}>User Statistics</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=ApplicationNodes"} to={controllerViewPath + "?name=ApplicationNodes"}>SSO Applications</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=APIAccessKey")} to={controllerViewPath + "?name=APIAccessKey"}>API Keys</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=User")
                                        && !(location.pathname + location.search).includes(controllerViewPath + "?name=UserStatistics")} to={controllerViewPath + "?name=Users"}>Users</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => (location.pathname + location.search).includes(controllerViewPath + "?name=Groups") || (location.pathname + location.search).includes(controllerViewPath + "?name=Group")} to={controllerViewPath + "?name=Groups"}>User Groups</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="sidebar-sticky" style={{ height: '35px' }}>
                            <div style={{ width: '100%', textAlign: 'center'}}>
                                <span>Version {version}</span>
                                <br />
                                <span></span>
                            </div>

                        </div>
                    </nav>
                    <div className="col" style={{ width: '100%', height: 'inherit', padding: '0 0 0 0', overflow: 'hidden' }}>
                            <Routes>
                                <Route index element={<Navigate to={`${homePath}index.cshtml?name=Meters`} />} />
                                <Route path="/index.cshtml" element={<Matcher />} />
                            </Routes>
                    </div>

                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(<Provider store={store}><SystemCenter /></Provider>, document.getElementById('window'));
