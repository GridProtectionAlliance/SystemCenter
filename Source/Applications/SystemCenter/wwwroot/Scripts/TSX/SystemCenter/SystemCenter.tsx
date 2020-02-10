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
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Meter from './Meter/Meter';
import Location from './Location/Location';

import * as queryString from "query-string";
import { createBrowserHistory } from "history"
import { SystemCenter } from './global';
import ByMeter from './Meter/ByMeter';
import ByLocation from './Location/ByLocation';
import ByAsset from './Asset/ByAsset';
import ByUser from './User/ByUser';
import UserStatistics from './UserStatistics/UserStatistics';

import Asset from './Asset/Asset';
import ByCustomer from './Customer/ByCustomer';
import Customer from './Customer/Customer';
import NewMeterWizard from './NewMeterWizard/NewMeterWizard';
import ConfigurationHistory from './ConfigurationHistory/ConfigurationHistory';
import User from './User/User';

declare var homePath: string;
declare var controllerViewPath: string;

const SystemCenter: React.FunctionComponent = (props: {}) => {
    const history = createBrowserHistory();
    //const ByMeter = React.lazy(() => import('./Meter/ByMeter'));
    //const ByLocation = React.lazy(() => import('./Location/ByLocation'));
    //const ByAsset = React.lazy(() => import('./Asset/ByAsset'));
    //const ByCustomer = React.lazy(() => import('./Customer/ByCustomer'));
    //const Customer = React.lazy(() => import('./Customer/Customer'));

    //const Asset = React.lazy(() => import('./Asset/Asset'));
    //const NewMeterWizard = React.lazy(() => import('./NewMeterWizard/NewMeterWizard'));
    //const ConfigurationHistory = React.lazy(() => import('./ConfigurationHistory/ConfigurationHistory'));
    const [roles, setRoles] = React.useState<Array<SystemCenter.SystemCeneterSecurityRoleName>>([]);

    React.useEffect(() => {
        getRoles();
    }, []);

    function getRoles(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/SecurityRoles`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((rs: Array<SystemCenter.SystemCeneterSecurityRoleName>) => setRoles(rs));
    }

    if (Object.keys(queryString.parse(history.location.search)).length == 0)
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meters', state: {} })

    return (
        <Router>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" style={{height: 75}}>
                <a className="col-sm-3 col-md-2 mr-0" style={{textAlign:'center'}}href="https://www.gridprotectionalliance.org"><img style={{ width: '100%', margin: -5 }} src={"../Images/SystemCenter-TopLeft.png"} /></a>
                {/*<input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>*/}
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid" style={{ top: 75,  position: 'absolute', width: '100%', height: 'calc(100% - 75px)', overflow: 'hidden' }}>
                <div className="row" style={{height: '100%'}}>
                    <nav className="col bg-light sidebar" style={{ maxWidth: 250 }}>
                        <div className="sidebar-sticky">
                            <div style={{ width: '100%', marginTop: 5, textAlign: 'center' }}><h3>System Center</h3></div>
                            <hr />

                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading">Monitors and Assets</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Meters"} to={controllerViewPath + "?name=Meters"}>Meters</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Locations"} to={controllerViewPath + "?name=Locations"}>Substations</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Assets"} to={controllerViewPath + "?name=Assets"}>Transmission Assets</NavLink>
                                </li>
                            </ul>

                            <hr />
                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading">External Links</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=PQViewCustomers"} to={controllerViewPath + "?name=PQViewCustomers"}>PQView Customer Access</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=PQViewSites"} to={controllerViewPath + "?name=PQViewSites"}>PQView Sites</NavLink>
                                </li>
                            </ul>

                            <hr />
                            <h6 style={{fontWeight: 'bold', marginLeft: 10}} className="sidebar-heading" hidden={roles.indexOf('Administrator') < 0}>System Settings</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column" hidden={roles.indexOf('Administrator') < 0}>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=ValueLists"} to={controllerViewPath + "?name=ValueLists"}>Value Lists</NavLink>
                                </li>
                            </ul>

                            <hr />
                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading" hidden={roles.indexOf('Administrator') < 0}>User Settings</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column" hidden={roles.indexOf('Administrator') < 0}>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=UserStatistics"} to={controllerViewPath + "?name=UserStatistics"}>User Statistics</NavLink>

                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Users"} to={controllerViewPath + "?name=Users"}>Users</NavLink>

                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Groups"} to={controllerViewPath + "?name=Groups"}>Security Groups</NavLink>
                                </li>
                            </ul>
                            <div style={{ width: '100%', textAlign: 'center', position:'absolute', bottom: 50 }}>

                                <span>Version 0.1</span>
                                <br />
                                <span></span>
                            </div>

                        </div>
                    </nav>
                    <div className="col" style={{ width: '100%', height: 'inherit', padding: '0 0 0 0', overflow: 'hidden' }}>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == undefined || rest.location.pathname + rest.location.search == controllerViewPath + "?name=Meters") 
                                    return <ByMeter Roles={roles}/>
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Locations")
                                    return <ByLocation Roles={roles}/>
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Assets")
                                    return <ByAsset Roles={roles}/>
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Users")
                                    return <ByUser Roles={roles} />
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "User")
                                    return <User UserID={queryString.parse(rest.location.search).UserAccountID} />
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "UserStatistics")
                                    return <UserStatistics Roles={roles} />
                                else
                                    return null;
                            }} />


                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Meter")
                                    return <Meter MeterID={queryString.parse(rest.location.search).MeterID} />
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Location")
                                    return <Location LocationID={queryString.parse(rest.location.search).LocationID} />
                                else
                                    return null;
                            }} />
                                <Route children={({ match, ...rest }) => {
                                    if (queryString.parse(rest.location.search).name == "Asset")
                                        return <Asset AssetID={queryString.parse(rest.location.search).AssetID} />
                                    else
                                        return null;
                                }} />

                            <Route children={({ match, ...rest }) => {
                                if (roles.indexOf('Administrator') < 0) return null;
                                else if (queryString.parse(rest.location.search).name == "Groups")
                                    return <iframe style={{ width: '100%', height: '100%' }} src={homePath + 'Groups.cshtml'}></iframe>
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (roles.indexOf('Administrator') < 0) return null;
                                else if (queryString.parse(rest.location.search).name == "ValueLists")
                                    return <iframe style={{ width: '100%', height: '100%' }} src={homePath + 'ValueListGroups.cshtml'}></iframe>
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "PQViewSites")
                                    return <iframe style={{ width: '100%', height: '100%' }} src={homePath + 'PQViewDataLoader.cshtml'}></iframe>
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "PQViewCustomers")
                                    return <ByCustomer Roles={roles}/>
                                else
                                    return null;
                            }} />

                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Customer")
                                    return <Customer CustomerID={queryString.parse(rest.location.search).CustomerID} />
                                else
                                    return null;
                            }} />

                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "NewMeterWizard")
                                    return <NewMeterWizard />
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0) return null;
                                else if (queryString.parse(rest.location.search).name == "ConfigurationHistory")
                                    return <ConfigurationHistory MeterConfigurationID={queryString.parse(rest.location.search).MeterConfigurationID} MeterKey={queryString.parse(rest.location.search).MeterKey}/>
                                else
                                    return null;
                            }} />
                        </React.Suspense>
                    </div>

                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(<SystemCenter />, document.getElementById('window'));
