//******************************************************************************************************
//  ValueListGroupDelete.tsx - Gbtc
//
//  Copyright © 2024, Grid Protection Alliance.  All Rights Reserved.
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
//  02/10/2024 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Warning } from '@gpa-gemstone/react-interactive';
import { SystemCenter } from '@gpa-gemstone/application-typings';

declare var homePath: string;
interface IProps { CallBack: (conf: boolean) => void, Record: SystemCenter.Types.ValueListGroup, Show: boolean }
export const requiredValueLists = ["TimeZones","Make","Model","Unit","Category"]

export default function ValueListGroupDelete(props: IProps) {
    const [message, setMessage] = React.useState<string>('')
    const [prevent, setPrevent]  = React.useState<boolean>(false)
  
    React.useEffect(() => {
        if (requiredValueLists.includes(props.Record?.Name)) {
            setPrevent(true);
            setMessage('This Value List Group is required and cannot be removed.')
            return
        }
        setPrevent(false);
        setMessage('This will permanently delete this Value List Group and cannot be undone.')
    }, [props.Record])

    return ( <Warning
                Message={message}
                Show={props.Show} Title={'Delete ' + (props.Record?.Name ?? 'Value List Group')}
                CallBack={(c) => {props.CallBack(c && !prevent)}} />
    )
}

interface IPropsItem { 
    CallBack: (conf: boolean) => void,
    Record: SystemCenter.Types.ValueListItem, 
    Show: boolean, 
    ItemCount: number, 
    Group: SystemCenter.Types.ValueListGroup
}

export function ValueListItemDelete(props: IPropsItem) {

    const [message, setMessage] = React.useState<string>('')
    const [prevent, setPrevent]  = React.useState<boolean>(false)
    const [removalCount, setRemovalCount] = React.useState<number>(0);

    React.useEffect(() => {
        if (requiredValueLists.includes(props.Group?.Name) && itemCount == 1) {
            setPrevent(true);
            setMessage('This Value List Group is required and needs to contain at least 1 item. Therfore this Item cannot be removed.')
            return
        }
        if (itemCount == 1 && removalCount > 0)
        {
            setMessage('Removing this Item will result in an empty Value List Group. All Fields using this Value List Group will be changed to strings.')
            setPrevent(false);
    
            return;
        }
        if (removalCount > 0)
        {
            setMessage(`There are some fields using this Value List Group, with ${removalCount} values corresponding to this item. These values will be unasigned.`)
            setPrevent(false);
            return;
        }
        setPrevent(false);
        setMessage('This will permanently delete this Value List Item and cannot be undone.')
    }, [props.Group, removalCount, itemCount])

    return ( <Warning
                Message={message}
                Show={props.Show} Title={'Delete ' + (props.Record.AltValue ?? props.Record.Value)}
                CallBack={(c) => {props.CallBack(c && !prevent)}} />
    )
}