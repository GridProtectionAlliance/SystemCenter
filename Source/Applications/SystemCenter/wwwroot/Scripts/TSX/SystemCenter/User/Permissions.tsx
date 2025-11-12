// ******************************************************************************************************
//  Permission.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  02/23/2023 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************
import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import { ApplicationNodeSlice, ApplicationRoleSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { LoadingScreen, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { IApplicationRole } from './Types';

declare var homePath: string;

interface IProps {
    ID: string,
    GetRoles: (ID: string) => JQuery.jqXHR<IApplicationRole[]>,
    SaveRoles: (ID: string, roles: IApplicationRole[]) => JQuery.jqXHR,
}

function Permission(props: IProps) {

    const dispatch = useAppDispatch();

    const [roles, setRoles] = React.useState<IApplicationRole[]>([]);
    const [originalRoles, setOriginalRoles] = React.useState<IApplicationRole[]>([]);

    const applicationRolesStatus = useAppSelector(ApplicationRoleSlice.Status)
    const applicationRoles = useAppSelector(ApplicationRoleSlice.Data)

    const applicationNodeStatus = useAppSelector(ApplicationNodeSlice.Status);
    const applicationNodes = useAppSelector(ApplicationNodeSlice.Data);

    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');

    React.useEffect(() => {
        const handle = LoadRoles();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, []);

    React.useEffect(() => {
        if (applicationNodeStatus === 'uninitiated' || applicationNodeStatus === 'changed')
            dispatch(ApplicationNodeSlice.Fetch())
    }, [applicationNodeStatus])

    React.useEffect(() => {
        if (applicationRolesStatus === 'uninitiated' || applicationRolesStatus === 'changed')
            dispatch(ApplicationRoleSlice.Fetch())
    }, [applicationRolesStatus])

    React.useEffect(() => { setRoles(originalRoles) }, [originalRoles])

    function LoadRoles(): JQuery.jqXHR<IApplicationRole[]> {
        setStatus('loading')
        return props.GetRoles(props.ID)
            .done((d) => { setOriginalRoles(d); setStatus('idle') })
            .fail(() => setStatus('error'));
    }

    function SaveRoles() {
        setStatus('loading')
        const handle = props.SaveRoles(props.ID, roles)
            .done(() => { setStatus('idle'); setOriginalRoles(roles); })
            .fail(() => setStatus('error'));;
    }

    if (applicationNodeStatus == 'error' || applicationRolesStatus == 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
        </div>;

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <LoadingScreen Show={applicationNodeStatus === 'loading' || applicationRolesStatus == 'loading' || status == 'loading'} />
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Permissions:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                <div className="row">
                    {applicationNodes.map(node => <AppPermission App={node}
                        Roles={applicationRoles.filter((r) => r.NodeID == node.ID)}
                        CurrentRoles={roles.filter(r => r.NodeID == node.ID)}
                        AddRole={(r) => setRoles((s) => [...s.filter(sr => sr.ID != r.ID), r])}
                        RemoveRole={(r) => setRoles((s) => [...s.filter(sr => sr.ID != r.ID)])}
                    />)}
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={() => SaveRoles()} disabled={_.isEqual(originalRoles, roles)}>Save Changes</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-warning" onClick={() => setRoles(originalRoles)} disabled={_.isEqual(originalRoles, roles)}>Clear Changes</button>
                </div>
            </div>
        </div>
    );


}

export default Permission;

const AppPermission = (props: {
    App: Application.Types.iApplicationNode,
    Roles: IApplicationRole[],
    CurrentRoles: IApplicationRole[],
    AddRole: (role: IApplicationRole) => void;
    RemoveRole: (role: IApplicationRole) => void
}) => {

    return <div className="col">
        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
            <legend className="w-auto" style={{ fontSize: 'large' }}>{props.App.Name}:</legend>
            <form>
                <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', float: 'left' }}>
                    {props.Roles.map((item) => <li key={item.ID}>
                        <label>
                            <input type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked)
                                        props.AddRole(item);
                                    else
                                        props.RemoveRole(item);
                                }} checked={props.CurrentRoles.find(i => i.ID == item.ID) != null} />
                            {item.Description}
                        </label>
                    </li>)}
                </ul>
            </form>
        </fieldset>
    </div>
}