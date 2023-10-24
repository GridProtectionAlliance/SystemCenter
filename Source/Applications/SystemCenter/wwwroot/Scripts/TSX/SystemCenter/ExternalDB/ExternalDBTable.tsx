//******************************************************************************************************
//  ExternalDBTable.tsx - Gbtc
//
//  Copyright � 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  10/03/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import ExternalDBTableInfo from './ExternalDBTableInfo';
import ExternalDBTableFields from './ExternalDBTableFields';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ExternalDBTablesSlice } from '../Store/Store';
import { TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { SystemCenter as gemstoneSC } from '@gpa-gemstone/application-typings';
import QueryTestDialog from './QueryTestDialog';
import ExternalDBXdaFields from './ExternalXDAFields/ExternalDBXdaFields';

declare var homePath: string;
declare type Tab = 'info' | 'fields' | 'xda';

export default function ExternalDB(props: { ID: number, Tab: Tab }) {
    const dispatch = useAppDispatch();

    const record = useAppSelector((state) => ExternalDBTablesSlice.Datum(state, props.ID));
    const status = useAppSelector(ExternalDBTablesSlice.Status);

    const [tab, setTab] = React.useState(getTab());
    const [showRemove, setShowRemove] = React.useState<boolean>(false);
    const [showDialog, setShowDialog] = React.useState<boolean>(false);

    const Tabs = [
        { Id: "info", Label: "Info" },
        { Id: "fields", Label: "Addl. Fields" },
        { Id: "xda", Label: "XDA Fields" },
    ];

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ExternalDBTablesSlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('ExternalDBTable.Tab', JSON.stringify(tab));
    }, [tab]);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('ExternalDBTable.Tab'))
            return JSON.parse(sessionStorage.getItem('ExternalDBTable.Tab'));
        else return 'info';
    }

    function Delete() {
        dispatch(ExternalDBTablesSlice.DBAction({ verb: 'DELETE', record }));
        window.location.href = homePath + 'index.cshtml?name=ExternalDB&ID=' + record.ExtDBID;
    }

    const SaveTable = React.useCallback((table: gemstoneSC.Types.extDBTables) => {
        dispatch(ExternalDBTablesSlice.DBAction({ verb: 'PATCH', record: table }));
    }, [dispatch, ExternalDBTablesSlice.DBAction]);

    if (record == null) return null;
    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>External DB Table</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={record == null}
                        onClick={() => setShowRemove(true)}>Delete Table</button>
                    <button className="btn btn-light pull-right" hidden={record == null}
                        onClick={() => { setShowDialog(true); } }>Test Table Query</button>
                </div>
            </div>


            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235 }}>
                <div className={"tab-pane " + (tab == "info" ? " active" : "fade")} id="info">
                    <ExternalDBTableInfo Record={record} />
                </div>
                <div className={"tab-pane " + (tab == "fields" ? " active" : "fade")} id="fields">
                    <ExternalDBTableFields TableName={record.TableName} ID={record.ID} />
                </div>
                <div className={"tab-pane " + (tab == "xda" ? " active" : "fade")} id="xda">
                    <ExternalDBXdaFields ID={record.ID} />
                </div>
            </div>
            <QueryTestDialog ExtTable={record} SetExtTable={SaveTable} Show={showDialog} SetShow={setShowDialog} />
            <Warning
                Message={'This will permanently delete this External DB Table and cannot be undone.'}
                Show={showRemove} Title={'Delete ' + (record?.TableName ?? 'Table')}
                CallBack={(conf) => { if (conf) Delete(); setShowRemove(false); }} />
        </div>
    )
}
