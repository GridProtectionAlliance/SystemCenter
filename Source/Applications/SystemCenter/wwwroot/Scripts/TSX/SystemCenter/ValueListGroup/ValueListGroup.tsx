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



import * as React from 'react';
import * as _ from 'lodash';
import ValueListGroupInfo from './ValueListGroupInfo';
import ValueListGroupItems from './ValueListGroupItem';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ValueListGroupSlice } from '../Store/Store';
import { TabSelector, Warning } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

export default function ValueListGroup(props: { GroupID: number }) {
    const dispatch = useAppDispatch();
    const record = useAppSelector((state) => ValueListGroupSlice.Datum(state, props.GroupID));

    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    const [tab, setTab] = React.useState<'items' | 'info'>('items');
    const [showRemove, setShowRemove] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (valueListGroupStatus == 'unintiated' || valueListGroupStatus == 'changed')
            dispatch(ValueListGroupSlice.Fetch());

        return function () {
        }
    }, [dispatch, valueListGroupStatus]);

    React.useEffect(() => {
        sessionStorage.setItem('ValueListGroup.Tab', JSON.stringify(tab));
    }, [tab]);

    function Delete() {
        dispatch(ValueListGroupSlice.DBAction({ verb: 'DELETE', record }))
        window.location.href = homePath + 'index.cshtml?name=ValueListGroups';
    }

    if (record == null) return null;
    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{record.Name}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={record == null}
                        onClick={() => setShowRemove(true)}>Delete Value List Group (Permanent)</button>
                </div>
            </div>


            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t) => setTab(t as ('items' | 'info'))} Tabs={[{ Label: 'Value List Group Info', Id: 'info' }, { Label: 'List Items', Id: 'items'}]} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "info" ? " active" : "fade")} id="info">
                    <ValueListGroupInfo Record={record} />
                </div>
                <div className={"tab-pane " + (tab == "items" ? " active" : "fade")} id="items">
                    <ValueListGroupItems Record={record} />
                </div>
            </div>
            <Warning
                Message={'This will permanently delete this Value List Group and cannot be undone.'}
                Show={showRemove} Title={'Delete Value List Group'}
                CallBack={(conf) => { if (conf) Delete(); setShowRemove(false); }} />
        </div>
    )
}

