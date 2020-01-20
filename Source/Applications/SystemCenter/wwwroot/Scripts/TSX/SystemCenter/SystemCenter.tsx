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

/// <reference path="SystemCenter.d.ts">

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Meter from './OpenXDA/Meter';
import * as queryString from "query-string";
import createHistory from "history/createBrowserHistory"
import Assets from './Assets/Assets';
import ByLocation from './OpenXDA/ByLocation';
import ByLine from './OpenXDA/ByLine';
import ByMeter from './OpenXDA/ByMeter';
import NewMeterWizard from './NewMeterWizard/NewMeterWizard';

declare var homePath: string;
declare var controllerViewPath: string;

class SystemCenter extends React.Component<{}, {}, {}>{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var windowHeight = window.innerHeight;

        return (
            <Router>
            <>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" style={{textAlign:'center'}}href="https://www.gridprotectionalliance.org"><img style={{ width: 230, margin: -5 }} src={"../Images/2-Line - 500.png"} /></a>
                    {/*<input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>*/}
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <a className="nav-link" href="#">Sign out</a>
                        </li>
                    </ul>
                </nav>
                <div className="container-fluid" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <div className="row" style={{height: '100%'}}>
                        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky">
                                <div style={{ width: '100%', marginTop: 5, textAlign: 'center' }}><h3>System Center</h3></div>
                                <hr />

                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Meters"} to={controllerViewPath + "?name=Meters"}>Meters</NavLink>
                                    </li>
                                </ul>
                                <hr />

                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=PQViewSites"} to={controllerViewPath + "?name=PQViewSites"}>PQView Sites</NavLink>
                                    </li>
                                </ul>

                                <hr />

                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=ValueLists"} to={controllerViewPath + "?name=ValueLists"}>Value Lists</NavLink>
                                    </li>
                                </ul>
                                <hr />

                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Users"} to={controllerViewPath + "?name=Users"}>Security Users</NavLink>

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
                        <div className="col-md-9 ml-sm-auto col-lg-10" style={{ width: '100%', height: 'inherit', padding: '62px 0 0 0', overflowY: 'hidden' }}>
                            <Route children={({ match, ...rest }) => {
                                if (rest.location.pathname + rest.location.search == controllerViewPath + "?name=Meters")
                                    return <ByMeter />
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "MeterLocations")
                                    return <ByLocation meterLocationID={queryString.parse(rest.location.search).meterLocationID} meterLocationAssetKey={queryString.parse(rest.location.search).AssetKey} />
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Lines")
                                    return <ByLine lineID={queryString.parse(rest.location.search).lineID} />
                                else
                                    return null;
                            }} />

                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Meter")
                                    return <Meter meterId={queryString.parse(rest.location.search).meterId} />
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Users")
                                    return <iframe style={{ width: '100%', height: '100%' }} src={homePath + 'Users.cshtml'}></iframe>
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "Groups")
                                    return <iframe style={{ width: '100%', height: '100%' }} src={homePath + 'Groups.cshtml'}></iframe>
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "ValueLists")
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
                                if (queryString.parse(rest.location.search).name == "Assets")
                                    return <Assets assetTypeID={queryString.parse(rest.location.search).assetTypeID} assetTypeName={queryString.parse(rest.location.search).assetTypeName} />
                                else
                                    return null;
                            }} />
                            <Route children={({ match, ...rest }) => {
                                if (queryString.parse(rest.location.search).name == "NewMeterWizard")
                                    return <NewMeterWizard />
                                else
                                    return null;
                            }} />



                        </div>

                    </div>
                </div>
            </>
            </Router>
        )
    }
}

ReactDOM.render(<SystemCenter />, document.getElementById('window'));
