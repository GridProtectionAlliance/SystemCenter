//******************************************************************************************************
//  ExternalDB.tsx - Gbtc
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
//  10/14/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import ExternalDBInfo from './ExternalDBInfo';
import ExternalDBTables from './ExternalDBTables';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ExternalDatabasesSlice } from '../Store/Store';
import { Modal, TabSelector, Warning } from '@gpa-gemstone/react-interactive';

declare var homePath: string;
declare type Tab = 'info' | 'tables';

export default function ExternalDB(props: { ID: number, Tab: Tab }) {
    const dispatch = useAppDispatch();

    const record = useAppSelector((state) => ExternalDatabasesSlice.Datum(state, props.ID));
    const status = useAppSelector(ExternalDatabasesSlice.Status);

    const [tab, setTab] = React.useState(getTab());
    const [showRemove, setShowRemove] = React.useState<boolean>(false);

    // Testing db variables
    const [isTesting, setIsTesting] = React.useState<boolean>(false);
    const [testMessage, setTestMessage] = React.useState<string>("");
    const [showTestPopup, setShowTestPopup] = React.useState<boolean>(false);


    const Tabs = [
        { Id: "info", Label: "Info" },
        { Id: "tables", Label: "Tables" },
    ];

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ExternalDatabasesSlice.Fetch());
    }, [status]);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('ExternalDB.Tab'))
            return JSON.parse(sessionStorage.getItem('ExternalDB.Tab'));
        else return 'info';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('ExternalDB.Tab', JSON.stringify(tab));
    }, [tab]);

    function Delete() {
        dispatch(ExternalDatabasesSlice.DBAction({ verb: 'DELETE', record }));
        window.location.href = homePath + 'index.cshtml?name=ByExternalDB';
    }

    const TestExternal = React.useCallback(() => {
        setIsTesting(true);
        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/ExternalDatabases/TestConnection`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(record),
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done((success: boolean) => {
            if (success)
                setTestMessage("Connection to database successful!");
            else
                setTestMessage("Connection to database failure.")
        });
        handle.fail(() => {
            setTestMessage("OpenXDA server connection failure. External database connection test not performed.")
        });
        handle.then(() => {
            setIsTesting(false);
            setShowTestPopup(true);
        });
        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        };
    }, [record, setTestMessage, setIsTesting, setShowTestPopup]);

    const ClosePopup = React.useCallback(() => {
        setShowTestPopup(false);
    }, [setShowTestPopup]);

    if (record == null) return null;
    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>External Database</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={record == null}
                        onClick={() => setShowRemove(true)}>Delete External DB</button>
                    <button className="btn btn-primary pull-right" hidden={record == null}
                        onClick={TestExternal}>Query External DB</button>
                </div>
            </div>


            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235 }}>
                <div className={"tab-pane " + (tab == "info" ? " active" : "fade")} id="info">
                    <ExternalDBInfo Record={record} />
                </div>
                <div className={"tab-pane " + (tab == "tables" ? " active" : "fade")} id="tables">
                    <ExternalDBTables ID={record.ID} />
                </div>
            </div>
            <Warning
                Message={'This will permanently delete this External Database and cannot be undone.'}
                Show={showRemove} Title={'Delete ' + (record?.Name ?? 'External Database')}
                CallBack={(conf) => { if (conf) Delete(); setShowRemove(false); }} />
            <Modal Title={"Connection Test Results"} Show={showTestPopup} ConfirmBtnClass={'btn-secondary'} ConfirmText={'Close'}
                ShowX={true} ShowCancel={false} Size={'sm'} CallBack={ClosePopup}>
                <p>{testMessage}</p>
            </Modal>
        </div>
    )
}
