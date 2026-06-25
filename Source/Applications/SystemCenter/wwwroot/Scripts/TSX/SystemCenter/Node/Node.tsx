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
import { TabSelector } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings'
import { SystemCenter as SC } from '../global'


declare var homePath: string;
declare type Tab = 'info' | 'settings' 

interface IProps { NodeID: number, Tab: Tab, Roles: Application.Types.SecurityRoleName[] }

const Tabs = [
    { Id: "info", Label: "Task Runner Info" },
    { Id: "settings", Label: "Task Runner Settings" },
]

export default function Node(props: IProps) {
    const [tab, setTab] = React.useState(getTab());
    const [node, setNode] = React.useState<SC.Node|null>(null)
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('Customer.Tab', JSON.stringify(tab));
    }, [tab]);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('Node.Tab'))
            return JSON.parse(sessionStorage.getItem('Node.Tab'));
        else
            return 'info';
    }

    React.useEffect(() => {
        if (status === 'uninitiated' || status === 'changed')
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
    }, [props.NodeID, status])

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row p-2">
                <div className="col">
                    <h2>{node != null ? node.Name : ''}</h2>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            {tab === 'info' ? <NodeForm Node={node} UpdateRecord={() => setStatus('changed')} /> : null}
            {tab === 'settings' ? <NodeSettings NodeID={node.ID} /> : null}
        </div>
    )
}