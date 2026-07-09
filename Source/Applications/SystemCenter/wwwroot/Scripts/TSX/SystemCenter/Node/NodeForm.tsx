//******************************************************************************************************
//  NodeForm.tsx - Gbtc
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
//  06/17/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector } from '../hooks';
import { Application } from '@gpa-gemstone/application-typings'
import { ToolTip } from '@gpa-gemstone/react-forms'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { GenericController, LoadingScreen } from '@gpa-gemstone/react-interactive'
import { SelectRoles } from '../Store/UserSettings';
import { SystemCenter as SC } from '../global'
import NodeAttributes, { validNode, valid, INodeType, IHostRegistration, IOpenXDANode, convertToXDANode } from './NodeAttributes'

interface IProps {
    Node: SC.Node | null
    UpdateRecord: () => void
}

const NodeForm = (props: IProps) => {
    const roles = useAppSelector(SelectRoles);
    const [nodeTypes, setNodeTypes] = React.useState<INodeType[]>([]);
    const [appHosts, setAppHosts] = React.useState<IHostRegistration[]>([])
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [hover, setHover] = React.useState<string | null>(null)
    const [node, setNode] = React.useState<SC.Node | null>(props.Node)

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    React.useEffect(() => {
        setNode(props.Node)
    }, [props.Node])

    function hasChanged(field?: keyof (SC.Node)): boolean {
        if (props.Node == null || node == null) return true;
        if (field == null)
            return hasChanged('Name') || hasChanged('MinimumHostCount') || hasChanged('AssignedHostRegistrationKey') || hasChanged('HostRegistrationKey') || hasChanged('NodeType')
        if (field === 'Name')
            return props.Node.Name !== node.Name
        if (field === 'MinimumHostCount')
            return props.Node.MinimumHostCount !== node.MinimumHostCount
        if (field === 'AssignedHostRegistrationKey')
            return props.Node.AssignedHostRegistrationKey !== node.AssignedHostRegistrationKey
        if (field === 'HostRegistrationKey')
            return props.Node.HostRegistrationKey !== node.HostRegistrationKey
        if (field === 'NodeType')
            return props.Node.NodeType !== node.NodeType
    }

    const updateNode = React.useCallback(() => {
        const controller = new GenericController<IOpenXDANode>(`${homePath}api/openXDA/Node`, 'ID')
        const handle = controller.DBAction('PATCH', convertToXDANode(node, nodeTypes, appHosts)).done((d) => props.UpdateRecord())
    }, [node, props.UpdateRecord])

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


    return <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Task Runner Information:</h4>
                </div>
            </div>
        </div>
        <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
            {node == null ? null :
                <div className="col">
                    <NodeAttributes
                        Node={node}
                        SetNode={setNode}
                        HasPermissions={hasPermissions()}
                        NodeTypes={nodeTypes}
                        AppHosts={appHosts}
                    />
                </div>
            }
            <LoadingScreen Show={status === 'loading'} />
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                <button className={"btn btn-primary" + (validNode(node) && hasChanged() ? '' : ' disabled')} type="submit"
                    onClick={() => { if (validNode(node) && hasChanged()) updateNode(); }} data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
            </div>
            <ToolTip Show={(!validNode(node) || !hasChanged()) && hover == 'submit'} Position={'top'} Target={"submit"}>
                {!hasChanged() && hasPermissions() ? <p> No changes made.</p> : null}
                {!hasPermissions() ? <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p> : null}
                {!valid(node, 'Name') ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> A name is required.</p> : null}
                {!valid(node, 'MinimumHostCount') ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> A minimum node count between 0 and 100 (non-inclusive) is required.</p> : null}
            </ToolTip>
            <div className="btn-group mr-2">
                <button className={"btn btn-warning" + (hasChanged() ? '' : ' disabled')} data-tooltip="clear" onClick={() => {
                    setNode(props.Node);
                }} onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
            </div>
            <ToolTip Show={hasChanged() && hover == 'clear'} Position={'top'} Target={"clear"}>
                {hasChanged('MinimumHostCount') ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to Minimum Node Count will be discarded.</p> : null}
                {hasChanged('Name') ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to Name will be discarded.</p> : null}
                {hasChanged('NodeType') ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to Task Runner Type will be discarded.</p> : null}
                {hasChanged('AssignedHostRegistrationKey') ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to Assigned Node will be discarded.</p> : null}
                {hasChanged('HostRegistrationKey') ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to Node will be discarded.</p> : null}
            </ToolTip>
        </div>

    </div>

}
export default NodeForm;