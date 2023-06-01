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
import * as _ from 'lodash';
import ExternalDBWindow from './ExternalDBInfo';
import { LoadingScreen, Warning } from '@gpa-gemstone/react-interactive';
import QueryWindow from './QueryWindow';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ExternalDBTablesSlice } from '../Store/Store';
import { Application } from '@gpa-gemstone/application-typings';

declare var homePath: string;

function ExternalDB(props: { ID: number }) {

    const [tab, setTab] = React.useState(getTab);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const extDBStatus = useAppSelector(ExternalDBTablesSlice.Status) as Application.Types.Status;
    const datum = useAppSelector((state) => ExternalDBTablesSlice.Datum(state, props.ID))

    React.useEffect(() => {
        if (extDBStatus === 'unintiated' || extDBStatus === 'changed') 
            dispatch(ExternalDBTablesSlice.Fetch());
    }, [dispatch, extDBStatus]);

    React.useEffect(() => {
        sessionStorage.setItem('ExternalDB.Tab', JSON.stringify(tab));
    }, [tab]);

    function getTab(): string {
        if (sessionStorage.hasOwnProperty('ExternalDB.Tab'))
            return JSON.parse(sessionStorage.getItem('ExternalDB.Tab'));
        else
            return 'ExternalDBInfo';
    }

    if (datum == null) return null;
    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{datum.TableName}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" onClick={() => setShowDelete(true)}>Delete External DB Table</button>
                </div>
            </div>


            <hr />
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "ExternalDBInfo" ? " active" : "")} onClick={() => setTab('ExternalDBInfo')} data-toggle="tab" href="#ExternalDBInfo">Table Information</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "query" ? " active" : "")} onClick={() => setTab('query')} data-toggle="tab" href="#query">Query</a>
                </li>
            </ul>

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "ExternalDBInfo" ? " active" : "fade")} id="ExternalDBInfo">
                    <ExternalDBWindow ExternalDBTables={datum} />
                </div>
                <div className={"tab-pane " + (tab == "query" ? "active" : "fade")} id="query" >
                    <QueryWindow ExternalDB={datum} />
                </div>
            </div>
            <Warning Message={'This will permanently delete the ' + (datum?.ExternalDB ?? 'External Database') + ' Table from openXDA and cannot be undone.'} Show={showDelete} Title={'Delete ' + (datum?.TableName ?? 'External Database Table')}
                CallBack={(conf) => {
                    if (conf)
                        dispatch(ExternalDBTablesSlice.DBAction({ verb: 'DELETE', record: datum }));
                    window.location.href = homePath + 'index.cshtml?name=ByExternalDB';
                    setShowDelete(false);
                }} />
            <LoadingScreen Show={false} />
        </div>
    )
}


export default ExternalDB;