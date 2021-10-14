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

declare var homePath: string;

function ExternalDB(props: { ID: number }) {
    const [eDB, setExternalDB] = React.useState<OpenXDA.Types.ExternalDataBase>(null);
    const [tab, setTab] = React.useState(getTab);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);

    React.useEffect(() => {
        let promise = getExternalDB()
        promise.done((data: OpenXDA.Types.ExternalDataBase) => setExternalDB(data));
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
            return 'companyInfo';
    }

    function getExternalDB(): JQuery.jqXHR<OpenXDA.Types.ExternalDataBase> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/ExternalDBTables/One/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }


/*    function getCompany(): JQuery.jqXHR<OpenXDA.Types.Company> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Company/One/${props.CompanyID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }*/

    function deleteCompany(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/ExternalDB/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(eDB),
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(() => {
            window.location.href = homePath + 'index.cshtml?name=Companies'
        })

        handle.then((d) => setLoadDelete(false))

        return handle;
    }

    if (eDB == null) return null;
    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{eDB != null ? eDB.TableName : ''}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={eDB == null} onClick={() => setShowDelete(true)}>Delete External Database</button>
                </div>
            </div>


            <hr />
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "companyInfo" ? " active" : "")} onClick={() => setTab('companyInfo')} data-toggle="tab" href="#companyInfo">External Database Info</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "notes" ? " active" : "")} onClick={() => setTab('notes')} data-toggle="tab" href="#notes">Notes</a>
                </li>
            </ul>

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "companyInfo" ? " active" : "fade")} id="companyInfo">
                    <ExternalDBWindow ExternalDB={eDB} stateSetter={setExternalDB} />
                </div>
                <div className={"tab-pane " + (tab == "notes" ? " active" : "fade")} id="notes" >
                    <NoteWindow ID={props.ID} Type='Company' />
                </div>

            </div>
            <Warning Message={'This will permanently Delete this external database and can not be undone.'} Show={showDelete} Title={'Delete External Database ' + eDB.TableName} CallBack={(conf) => { if (conf) deleteCompany(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
    )
}


export default ExternalDB;