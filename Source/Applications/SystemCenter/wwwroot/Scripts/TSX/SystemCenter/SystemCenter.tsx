﻿//******************************************************************************************************
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
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import queryString from "querystring";
import { createBrowserHistory } from "history"
import { SystemCenter } from './global';
import { SystemCenter as SCTypes } from '@gpa-gemstone/application-typings';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { SettingSlice } from './Store/Store';

declare var homePath: string;
declare var controllerViewPath: string;
declare var version: string;

const SystemCenter: React.FunctionComponent = (props: {}) => {
    const dispatch = useDispatch();

    const history = createBrowserHistory();
    const ByMeter = React.lazy(() => import(/*webpackChunkName: "ByMeter"*/'./Meter/ByMeter'));
    const ByLocation = React.lazy(() => import(/* webpackChunkName: "ByLocation" */ './Location/ByLocation'));
    const ByAsset = React.lazy(() => import(/* webpackChunkName: "ByAsset" */ './Asset/ByAsset'));
    const ByCustomer = React.lazy(() => import(/* webpackChunkName: "ByCustomer" */ './Customer/ByCustomer'));
    const ByUser = React.lazy(() => import(/* webpackChunkName: "ByUser" */ './User/ByUser'));
    const UserStatistics = React.lazy(() => import(/* webpackChunkName: "UserStatistics" */ './UserStatistics/UserStatistics'));
    const Customer = React.lazy(() => import(/* webpackChunkName: "Customer" */ './Customer/Customer'));
    const User = React.lazy(() => import(/* webpackChunkName: "User" */ './User/User'));
    const Asset = React.lazy(() => import(/* webpackChunkName: "Asset" */ './Asset/Asset'));
    const NewMeterWizard = React.lazy(() => import( /* webpackChunkName: "NewMeterWizard" */ './NewMeterWizard/NewMeterWizard'));
    const ConfigurationHistory = React.lazy(() => import(/* webpackChunkName: "ConfigurationHistory" */ './ConfigurationHistory/ConfigurationHistory'));
    const Meter = React.lazy(() => import(/* webpackChunkName: "Meter" */ './Meter/Meter'));
    const Location = React.lazy(() => import(/* webpackChunkName: "Location" */ './Location/Location'));
    const ByAssetGroup = React.lazy(() => import(/* webpackChunkName: "ByAssetGroup" */ './AssetGroups/ByAssetGroup'));
    const AssetGroup = React.lazy(() => import(/* webpackChunkName: "AssetGroup" */ './AssetGroups/AssetGroup'));
    const ByCompany = React.lazy(() => import(/* webpackChunkName: "ByCompany" */ './Company/ByCompany'));
    const Company = React.lazy(() => import(/* webpackChunkName: "Company" */ './Company/Company'));
    const BySetting = React.lazy(() => import(/* webpackChunkName: "ByCompany" */ './Settings/BySetting'));
    const ByValueListGroup = React.lazy(() => import(/* webpackChunkName: "ByValueListGroup" */ './ValueListGroup/ByValueListGroup'));
    const ValueListGroup = React.lazy(() => import(/* webpackChunkName: "ValueListGroup" */ './ValueListGroup/ValueListGroup'));
    const DownloadedFiles = React.lazy(() => import(/* webpackChunkName: "DownloadedFiles" */ './DeviceHealthReport/DownloadedFiles'));
    const DeviceHealthReport = React.lazy(() => import(/* webpackChunkName: "DeviceHealthReport" */ './DeviceHealthReport/DeviceHealthReport'));
    const DeviceContacts = React.lazy(() => import(/* webpackChunkName: "DeviceContacts" */ './DeviceHealthReport/DeviceContacts'));
    const DeviceIssuesPage = React.lazy(() => import(/* webpackChunkName: "DeviceIssuesPage" */ './DeviceIssuesPage/DeviceIssuesPage'));


    const [roles, setRoles] = React.useState<Array<SystemCenter.SystemCeneterSecurityRoleName>>([]);
    const [ignored, forceUpdate] = React.useReducer((x:number) => x + 1, 0); // integer state for resize renders

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

    const settings: SCTypes.Types.Setting[] = useSelector(SettingSlice.Data);
    const settingsStatus: SystemCenter.Status = useSelector(SettingSlice.Status);

    React.useEffect(() => {
        if (settingsStatus == 'unintiated' || settingsStatus == 'changed')
            dispatch(SettingSlice.Fetch());

        return function () {
        }

    }, [dispatch, settingsStatus]);


    function getRoles(): JQuery.jqXHR<Array<SystemCenter.SystemCeneterSecurityRoleName>> {
       return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/SecurityRoles`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }


    if (Object.keys(queryString.parse(history.location.search)).length == 0)
        history.push({ pathname: homePath + 'index.cshtml', search: 'name=Meters' })

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
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Meters"} to={controllerViewPath + "?name=Meters"}>Meters</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Locations"} to={controllerViewPath + "?name=Locations"}>Substations</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Assets"} to={controllerViewPath + "?name=Assets"}>Transmission Assets</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=AssetGroups"} to={controllerViewPath + "?name=AssetGroups"}>Asset Groups</NavLink>
                                </li>
                                <li className="nav-item" hidden={settings.find(s => s.Name == 'SystemCenter.ShowDeviceHealthReport')?.Value != "1" }>
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=DeviceHealthReport"} to={controllerViewPath + "?name=DeviceHealthReport"}>Device Health Report</NavLink>
                                </li>

                            </ul>

                            <hr />
                            <h6 style={{ fontWeight: 'bold', marginLeft: 10 }} className="sidebar-heading">External Links</h6>
                            <ul style={{ marginLeft: 10 }} className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Companies"} to={controllerViewPath + "?name=Companies"}>Companies</NavLink>
                                </li>
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
                                <li className="nav-item">
                                    <NavLink activeClassName='nav-link active' className="nav-link" isActive={(match, location) => location.pathname + location.search == controllerViewPath + "?name=Settings"} to={controllerViewPath + "?name=Settings"}>Settings</NavLink>

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
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                            <Route children={({ match, ...rest }) => {
                                let qs = queryString.parse(rest.location.search);
                                if (qs['?name'] == "Locations") 
                                    return <ByLocation Roles={roles} />                            
                                else if (qs['?name'] == "Assets")
                                    return <ByAsset Roles={roles} />
                                else if (qs['?name'] == "AssetGroups")
                                    return <ByAssetGroup Roles={roles} />
                                else if (qs['?name'] == "Users")
                                    return <ByUser Roles={roles} />
                                else if (qs['?name'] == "Companies")
                                    return <ByCompany Roles={roles} />
                                else if (qs['?name'] == "User")
                                    return <User UserID={qs.UserAccountID as string} />
                                else if (qs['?name'] == "UserStatistics")
                                    return <UserStatistics Roles={roles} />
                                else if (qs['?name'] == "Meter")
                                    return <Meter MeterID={parseInt(qs.MeterID as string)} />
                                else if (qs['?name'] == "Location")
                                    return <Location LocationID={parseInt(qs.LocationID as string)} Tab={qs.Tab as any} />
                                else if (qs['?name'] == "Asset")
                                    return <Asset AssetID={parseInt(qs.AssetID as string)} />
                                else if (qs['?name'] == "AssetGroup")
                                    return <AssetGroup AssetGroupID={parseInt(qs.AssetGroupID as string)} />
                                else if (qs['?name'] == "Customer")
                                    return <Customer CustomerID={parseInt(qs.CustomerID as string)} />
                                else if (qs['?name'] == "Company")
                                    return <Company CompanyID={parseInt(qs.CompanyID as string)} />
                                else if (qs['?name'] == "PQViewSites")
                                    return <iframe style={{ width: '100%', height: '100%' }} src={homePath + 'PQViewDataLoader.cshtml'}></iframe>
                                else if (qs['?name'] == "PQViewCustomers")
                                    return <ByCustomer Roles={roles} />
                                else if (qs['?name'] == "NewMeterWizard")
                                    return <NewMeterWizard />
                                else if (qs['?name'] == "ValueListGroup")
                                    return <ValueListGroup GroupID={parseInt(qs.GroupID as string)} />
                                else if (qs['?name'] == "Settings")
                                    return <BySetting Roles={roles} />
                                else if (qs['?name'] == "DeviceHealthReport") {
                                    return <DeviceHealthReport Roles={roles} />
                                }
                                else if (qs['?name'] == "DownloadedFiles")
                                    return <DownloadedFiles MeterID={parseInt(qs.MeterID as string)} MeterName={qs.MeterName as string } />
                                else if (qs['?name'] == "DeviceContacts")
                                    return <DeviceContacts ID={parseInt(qs.ID as string)} Name={qs.Name as string} Field={qs.Field as 'TSC' | 'Sector'} />
                                else if (qs['?name'] == "DeviceIssuesPage")
                                    return <DeviceIssuesPage MeterID={parseInt(qs.MeterID as string)} Tab={qs.Tab as any} />

                                else if (queryString.parse(rest.location.search)['?name'] == "ValueLists") {
                                    if (roles.indexOf('Administrator') < 0) return null;
                                    return <ByValueListGroup Roles={roles} />
                                }
                                else if (queryString.parse(rest.location.search)['?name'] == "ConfigurationHistory") {
                                    if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0) return null;
                                    return <ConfigurationHistory MeterConfigurationID={parseInt(queryString.parse(rest.location.search).MeterConfigurationID as string)} MeterKey={queryString.parse(rest.location.search).MeterKey as string} />
                                }
                                else
                                    return <ByMeter Roles={roles} />;
                            }} />
                            </Switch>

                        </React.Suspense>
                    </div>

                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(<Provider store={store}><SystemCenter /></Provider>, document.getElementById('window'));
