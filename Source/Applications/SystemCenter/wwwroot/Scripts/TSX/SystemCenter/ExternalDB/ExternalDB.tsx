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
import NoteWindow from '../CommonComponents/NoteWindow';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import ExternalDBWindow from './ExternalDBInfo';
import { LoadingScreen, Warning } from '@gpa-gemstone/react-interactive';
import { OpenXDA } from '@gpa-gemstone/application-typings'
import QueryWindow from './QueryWindow';

interface ExternalDataBase { ID: number, TableName: string, ExternalDB: string, Query: string }
declare var homePath: string;

function ExternalDB(props: { ID: number }) {
    const [externalDBTable, setExternalDB] = React.useState<ExternalDataBase>(null);
    const [tab, setTab] = React.useState(getTab);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);

    React.useEffect(() => {
        let promise = getExternalDB()
        promise.done((data: ExternalDataBase) => setExternalDB(data));
        return () => {
            if (promise.abort != undefined) promise.abort();
        };
    }, []);

    React.useEffect(() => {
        sessionStorage.setItem('Company.Tab', JSON.stringify(tab));
    }, [tab]);

    function getTab(): string {
        if (sessionStorage.hasOwnProperty('ExternalDB.Tab'))
            return JSON.parse(sessionStorage.getItem('ExternalDB.Tab'));
        else
            return 'ExternalDBInfo';
    }

    function getExternalDB(): JQuery.jqXHR<ExternalDataBase> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/ExternalDBTables/One/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }

    function deleteExternalDBTable(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/ExternalDBTables/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(externalDBTable),
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(() => {
            window.location.href = homePath + 'index.cshtml?name=ByExternalDB'
        })

        handle.then((d) => setLoadDelete(false))

        return handle;
    }

    if (externalDBTable == null) return null;
    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{externalDBTable != null ? externalDBTable.TableName : ''}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={externalDBTable == null} onClick={() => setShowDelete(true)}>Delete External DB Table</button>
                </div>
            </div>


            <hr />
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "ExternalDBInfo" ? " active" : "")} onClick={() => setTab('ExternalDBInfo')} data-toggle="tab" href="#ExternalDBInfo">External Database Table Information</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "query" ? " active" : "")} onClick={() => setTab('query')} data-toggle="tab" href="#query">Query</a>
                </li>
            </ul>

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "ExternalDBInfo" ? " active" : "fade")} id="ExternalDBInfo">
                    <ExternalDBWindow ExternalDBTables={externalDBTable} stateSetter={setExternalDB} />
                </div>
                <div className={"tab-pane " + (tab == "query" ? "active" : "fade")} id="query" >
                    <QueryWindow ExternalDB={externalDBTable} stateSetter={setExternalDB} />
                </div>
            </div>
            <Warning Message={'This will permanently Delete the ' + externalDBTable.ExternalDB + ' Table and can not be undone.'} Show={showDelete} Title={'Delete External Database Table' + externalDBTable.TableName} CallBack={(conf) => { if (conf) deleteExternalDBTable(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
    )
}


export default ExternalDB;