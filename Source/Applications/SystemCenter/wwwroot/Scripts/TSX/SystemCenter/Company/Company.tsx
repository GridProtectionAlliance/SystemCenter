//******************************************************************************************************
//  Company.tsx - Gbtc
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
import { SystemCenter } from '../global';
import NoteWindow from '../CommonComponents/NoteWindow';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import CompanyInfoWindow from './CompanyInfo';
import CompanyMeterWindow from './CompanyMeter';
import { LoadingScreen, Warning } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

export default function Company (props: { CompanyID: number }) {
    const [company, setCompany] = React.useState<SystemCenter.Company>(null);
    const [tab, setTab] = React.useState(getTab);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);

    React.useEffect(() => {
        let promise = getCompany();
        promise.done((data: SystemCenter.Company) => setCompany(data));
        return () => {
            if (promise.abort != undefined) promise.abort();
        };
    }, []);

    React.useEffect(() => {
        sessionStorage.setItem('Company.Tab', JSON.stringify(tab));
    }, [tab]);

    function getTab(): string {
        if (sessionStorage.hasOwnProperty('Company.Tab'))
            return JSON.parse(sessionStorage.getItem('Company.Tab'));
        else
            return 'companyInfo';
    }

    function getCompany(): JQuery.jqXHR<SystemCenter.Company> {
       return $.ajax({
            type: "GET",
           url: `${homePath}api/OpenXDA/Company/One/${props.CompanyID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       });
    }

    function deleteCompany(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Company/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(company),
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(() => {
            window.location.href = homePath + 'index.cshtml?name=PCompanies'
        })

        handle.then((d) => setLoadDelete(false))

        return handle;
    }
    
        if (company == null) return null;
        return (
            <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
                <div className="row">
                    <div className="col">
                        <h2>{company != null ? company.Name : ''}</h2>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger pull-right" hidden={company == null} onClick={() => setShowDelete(true)}>Delete Company</button>
                    </div>
                </div>


                <hr />
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={"nav-link" + (tab == "companyInfo" ? " active" : "")} onClick={() => setTab('companyInfo')} data-toggle="tab" href="#companyInfo">Company Info</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (tab == "additionalFields" ? " active" : "")} onClick={() => setTab('additionalFields')} data-toggle="tab">Additional Fields</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (tab == "meters" ? " active" : "")} onClick={() => setTab('meters')} data-toggle="tab" href="#meters">Assigned Meters</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (tab == "notes" ? " active" : "")} onClick={() => setTab('notes')} data-toggle="tab" href="#notes">Notes</a>
                    </li>
                </ul>
             
                <div className="tab-content" style={{maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                    <div className={"tab-pane " + (tab == "companyInfo" ? " active" : "fade")} id="companyInfo">
                        <CompanyInfoWindow Company={company} stateSetter={setCompany}/>
                    </div>
                    <div className={"tab-pane " + (tab == "additionalFields" ? " active" : "fade")} id="additionalFields">
                        <AdditionalFieldsWindow ID={company.ID} Type='Company' Tab={tab}/>
                    </div>
                    <div className={"tab-pane " + (tab == "meters" ? " active" : "fade")} id="meters">
                        <CompanyMeterWindow Company={company} />
                    </div>
                    <div className={"tab-pane " + (tab == "notes" ? " active" : "fade")} id="notes" >
                        <NoteWindow ID={props.CompanyID} Type='Company' />
                    </div>

                </div>
                <Warning Message={'This will permanently Delete this company and can not be undone.'} Show={showDelete} Title={'Delete Company ' + company.Name} CallBack={(conf) => { if (conf) deleteCompany(); setShowDelete(false); }} />
                <LoadingScreen Show={loadDelete} />
            </div>
        )
}

