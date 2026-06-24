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
import { Gemstone } from '@gpa-gemstone/application-typings'
import { Input, Select, MultiCheckBoxSelect } from '@gpa-gemstone/react-forms'
import { SelectRoles } from '../Store/UserSettings';
import { SystemCenter as SC } from '../global'

interface IProps {
    Node: SC.Node,
    StateSetter: (customer: SC.Node) => void,
    SetErrors: (e: string[]) => void,
    NodeTypeOptions: Gemstone.TSX.Interfaces.ILabelValue<string>[]
    HostOptions: Gemstone.TSX.Interfaces.ILabelValue<string>[]
}


const NodeForm = (props: IProps) => {
    const roles = useAppSelector(SelectRoles);
    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }
    function valid(field: keyof (SC.Node)): boolean {
        if (field == 'Name')
            return props.Node.Name != null // && props.Customer.CustomerKey.length > 0 && props.Customer.CustomerKey.length <= 25;
        if (field == 'MinimumHostCount')
            return props.Node.MinimumHostCount > 0 && props.Node.MinimumHostCount < 100
        return true;
    }


    return <div className="col">
        <Input<SC.Node> Record={props.Node} Field={'Name'} Label='Name' Feedback={'A unique Key of less than 25 characters is required.'} Valid={valid} Setter={(record) => props.StateSetter(record)} Disabled={!hasPermissions()} />
        <Input<SC.Node> Type={'number'} Record={props.Node} Field={'MinimumHostCount'} Label='Minimum Node Count' Feedback='A number between 0 and 100 is required.' Valid={valid} Setter={(record) => props.StateSetter(record)} Disabled={!hasPermissions()} />
        <Select<SC.Node> Options={props.NodeTypeOptions} Record={props.Node} Field={'NodeType'} Setter={(record) => props.StateSetter(record)} />
        <Select<SC.Node> Record={props.Node} Options={props.HostOptions} Field={'HostRegistrationKey'} Label={'Node'} EmptyOption={true} Setter={(record) => props.StateSetter(record)} />
        <Select<SC.Node> Record={props.Node} Options={props.HostOptions} Field={'AssignedHostRegistrationKey'} Label={'Assigned Nodes'} EmptyOption={true} Setter={(record) => props.StateSetter(record)} />
    </div> 
}

export default NodeForm;