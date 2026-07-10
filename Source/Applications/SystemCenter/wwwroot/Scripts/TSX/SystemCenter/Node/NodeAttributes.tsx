//******************************************************************************************************
//  NodeAttributes.tsx - Gbtc
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
//  07/08/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Input, Select } from '@gpa-gemstone/react-forms'
import { SystemCenter as SC } from '../global'


interface IProps {
    Node: SC.Node
    SetNode: React.Dispatch<React.SetStateAction<SC.Node>>
    HasPermissions: boolean
    NodeTypes: INodeType[]
    AppHosts: IHostRegistration[]
}

export interface INodeType {
    ID: number,
    Name: string,
    AssemblyName: string,
    TypeName: string
}

export interface IHostRegistration {
    ID: number,
    RegistrationKey: string,
    APIToken: string,
    URL: string,
    CheckedIn: string
}
export interface IOpenXDANode {
    ID: number,
    NodeTypeID: number,
    HostRegistrationID?: number,
    AssignedHostRegistrationID?: number,
    Name: string,
    MinimumHostCount: number
}

export default function NodeAttributes(props: IProps) {

    return (<>
        <Input<SC.Node> Record={props.Node} Field={'Name'} Label='Name' Valid={(field) => valid(props.Node, field)} Setter={(record) => props.SetNode(record)} Disabled={!props.HasPermissions} Feedback='A name is required.' />
        <Input<SC.Node> Type={'number'} Record={props.Node} Field={'MinimumHostCount'} Label='Minimum Node Count' Help='The minimum number of active Nodes before this task runner is enabled.' Feedback='A number between 1 and 99 is required.' Valid={(field) => valid(props.Node, field)} Setter={(record) => props.SetNode(record)} Disabled={!props.HasPermissions} />
        <Select<SC.Node> Options={props.NodeTypes.map((n) => { return { Value: n.Name, Label: n.Name } })} Record={props.Node} Field={'NodeType'} Setter={(record) => props.SetNode(record)} Label={'Type'} />
        <Select<SC.Node> Record={props.Node} Options={props.AppHosts.map((h) => { return { Value: h.RegistrationKey, Label: h.RegistrationKey } })} Field={'HostRegistrationKey'} Label={'Node'} EmptyOption={true} Setter={(record) => props.SetNode(record)} />
        <Select<SC.Node> Record={props.Node} Options={props.AppHosts.map((h) => { return { Value: h.RegistrationKey, Label: h.RegistrationKey } })} Field={'AssignedHostRegistrationKey'} Label={'Assigned Node'} EmptyOption={true} Setter={(record) => props.SetNode(record)} />
    </>)
}


export function valid(node: SC.Node, field: keyof (SC.Node)): boolean {
    if (node == null)
        return false
    if (field == 'Name')
        return node.Name != null
    if (field == 'MinimumHostCount')
        return node.MinimumHostCount > 0 && node.MinimumHostCount < 100
    return true;
}
export function validNode(node: SC.Node): boolean {
    return valid(node, 'Name') && valid(node, 'MinimumHostCount')
}

export function convertToXDANode(node: SC.Node, nodeTypes: INodeType[], appHosts: IHostRegistration[]): IOpenXDANode {
    return {
        ID: parseInt(node.ID),
        MinimumHostCount: node.MinimumHostCount,
        NodeTypeID: nodeTypes.find(nt => nt.Name == node.NodeType).ID ?? 1,
        AssignedHostRegistrationID: appHosts.find(ah => ah.RegistrationKey == node.AssignedHostRegistrationKey)?.ID ?? null,
        HostRegistrationID: appHosts.find(ah => ah.RegistrationKey == node.HostRegistrationKey)?.ID ?? null,
        Name: node.Name
    }
}