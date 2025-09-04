//******************************************************************************************************
//  ValueListGroup.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  10/16/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { TabSelector } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ValueListGroupSlice } from '../Store/Store';
import { ValueListGroupDelete } from './ValueListGroupDelete';
import ValueListGroupInfo from './ValueListGroupInfo';
import ValueListGroupItems from './ValueListGroupItem';

declare var homePath: string;
declare type Tab = 'info' | 'items'

interface IProps { GroupID: number, Tab: Tab }

export default function ValueListGroup(props: IProps) {
    const dispatch = useAppDispatch();
    const record = useAppSelector((state) => ValueListGroupSlice.Datum(state, props.GroupID));
    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    const [tab, setTab] = React.useState(getTab());
    const [showRemove, setShowRemove] = React.useState<boolean>(false);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('ValueListGroup.Tab'))
            return JSON.parse(sessionStorage.getItem('ValueListGroup.Tab'));
        else
            return 'info';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('ValueListGroup.Tab', JSON.stringify(tab));
    }, [tab]);

    React.useEffect(() => {
        if (valueListGroupStatus == 'unintiated' || valueListGroupStatus == 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);

    function Delete() {
        dispatch(ValueListGroupSlice.DBAction({ verb: 'DELETE', record }))
        window.location.href = homePath + 'index.cshtml?name=ValueLists';
    }

    if (record == null) return null;
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row p-2">
                <div className="col">
                    <h2>{record.Name}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={record == null}
                        onClick={() => setShowRemove(true)}>Delete Value List</button>
                </div>
            </div>
            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={[{ Label: 'Value List Group Info', Id: 'info' }, { Label: 'List Items', Id: 'items' }]} />
            {tab === "info" ? <ValueListGroupInfo Record={record} /> : null}
            {tab === "items" ? <ValueListGroupItems Record={record} /> : null}

            <ValueListGroupDelete
                Show={showRemove} 
                Record={record}
                CallBack={(conf) => { if (conf) Delete(); setShowRemove(false); }} />
        </div>
    )
}