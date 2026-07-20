//******************************************************************************************************
//  Node.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  06/25/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import NodeForm from './NodeForm';
import NodeSettings from './NodeSettings'
import { TabSelector, Warning, GenericController } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings'
import { SystemCenter as SC } from '../global'
import { useNavigate } from 'react-router-dom';
import { IOpenXDANode, convertToXDANode, IHostRegistration, INodeType } from './NodeAttributes'


declare var homePath: string;
declare type Tab = 'info' | 'settings'

interface IProps { NodeID: number, Tab: Tab, Roles: Application.Types.SecurityRoleName[] }

const Tabs = [
    { Id: "info", Label: "Info" },
    { Id: "settings", Label: "Settings" },
]

export default function Node(props: IProps) {
    let navigate = useNavigate();
    const [tab, setTab] = React.useState(getTab());
    const [node, setNode] = React.useState<SC.Node | null>(null)
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [showWarning, setShowWarning] = React.useState<boolean>(false)
    const [nodeTypes, setNodeTypes] = React.useState<INodeType[]>([]);
    const [appHosts, setAppHosts] = React.useState<IHostRegistration[]>([])
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false)

    function hasPermissions(): boolean {
        if (props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    function deleteNode() {
        const controller = new GenericController<IOpenXDANode>(`${homePath}api/openXDA/Node`, 'ID')
        controller.DBAction('DELETE', convertToXDANode(node, nodeTypes, appHosts)).then(() => navigate(`${homePath}index.cshtml?name=TaskRunners`))
    }

    React.useEffect(() => {
        const saved = getTab(props.Tab);
        if (saved !== tab)
            sessionStorage.setItem('Node.Tab', JSON.stringify(tab));
    }, [tab]);

    React.useEffect(() => {
        setStatus('loading')
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Node/One/${props.NodeID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })
        h.done((d) => {
            setNode(d)
            setStatus('idle')
        }).fail((d) => {
            setStatus('error')
        })

        return () => {
            if (h.abort != undefined) h.abort();
        }
    }, [props.NodeID, refreshTrigger])

    React.useEffect(() => {
        const nodeTypeController = new GenericController<INodeType>(`${homePath}api/OpenXDA/NodeTypes`, 'Name', true);
        const handle = nodeTypeController.Fetch();
        handle.done((d: INodeType[]) => {
            setNodeTypes(d);
        }).fail((d) => {
            setStatus('error');
        })
        return () => {
            if (handle.abort != undefined) handle.abort();

        }
    }, [])

    React.useEffect(() => {
        const appHostController = new GenericController<IHostRegistration>(`${homePath}api/OpenXDA/HostRegistration`, 'ID', true);
        const handle = appHostController.Fetch();
        handle.done((d: IHostRegistration[]) => {
            setAppHosts(d);
        }).fail((d) => {
            setStatus('error');
        })
        return () => {
            if (handle.abort != undefined) handle.abort();

        }
    }, [])

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row p-2">
                <div className="col">
                    <h2>{node != null ? node.Name : ''}</h2>
                </div>
                <div className="col">
                    <button className={"btn btn-danger pull-right"} hidden={(node == null) || !hasPermissions()} onClick={() => { if (hasPermissions()) setShowWarning(true) }}>Delete Task Runner</button>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            {tab === 'info' ? <NodeForm Node={node} UpdateRecord={() => setRefreshTrigger((val) => !val)} NodeTypes={nodeTypes} AppHosts={appHosts} /> : null}
            {tab === 'settings' ? <NodeSettings NodeID={node?.ID ?? props.NodeID.toString()} /> : null}
            <Warning Title={'Delete ' + (node?.Name ?? 'Task Runner')} Show={showWarning} Message={'This will delete this Task Runner from the system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'} CallBack={(c) => { if (c) deleteNode(); setShowWarning(false) }} />
        </div>
    )
}

function getTab(currentTab?: Tab | undefined): Tab {
    if (currentTab !== undefined) return currentTab;
    else if (sessionStorage.hasOwnProperty('Node.Tab'))
        return JSON.parse(sessionStorage.getItem('Node.Tab'));
    else
        return 'info';
}