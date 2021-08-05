//******************************************************************************************************
//  CompanyMeter.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with  work for additional information regarding copyright ownership.
//  The GPA licenses  file to you under the MIT License (MIT), the "License"; you may not use 
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
//  02/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols'
import { OpenXDA } from '@gpa-gemstone/application-typings'

declare var homePath: string;

export default function CompanyMeterWindow(props: { Company: OpenXDA.Types.Company }){
    const [sites, setSites] = React.useState<OpenXDA.Types.CompanyMeter[]>([]);
    const [allSites, setAllSites] = React.useState<any[]>([]);
    const [searchText, setSearchText] = React.useState<string>('');
    const [searchTextAS, setSearchTextAS] = React.useState<string>('');

    const [selectedSites, setSelectedSites] = React.useState<{ID: number, Name: string}[]>([]);
    const [updated, Sync] = React.useReducer(x => x + 1, 0);// integer state for inducing database sync

    React.useEffect(() => {
        let promise1 = getSites();
        promise1.done((sites: Array<OpenXDA.Types.CompanyMeter>) => setSites(sites));
        let promise2 = getAllSites();
        promise2.done((sites: Array<any>) => setAllSites(_.orderBy(sites, ['AssetKey'], ['asc'])));

        return () => {
            if (promise1.abort != undefined) promise1.abort();
            if (promise2.abort != undefined) promise2.abort();
        }
    }, [updated]);

    function getSites(): JQuery.jqXHR<OpenXDA.Types.CompanyMeter[]> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/CompanyMeter/${props.Company.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    function addSites(): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/CompanyMeter/AddMultiple`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(selectedSites.map(ss => ({ ID: 0, CompanyID: props.Company.ID, MeterID: parseInt(ss.ID.toString()), DisplayName : ss.Name, Enabled: true }) as OpenXDA.Types.CompanyMeter)),
            cache: false,
            async: true
        }).done(() => {
            Sync();
        }).fail(msg => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                Sync();
            }
        });
    }

    function getAllSites(): JQuery.jqXHR<any[]> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    function deleteCustommerAccess(record: OpenXDA.Types.CompanyMeter): void {
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/CompanyMeter/Delete`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(record),
            cache: false,
            async: true
        }).done(() => {
            Sync();
        }).fail(msg => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                Sync();
            }
        });

    }

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Sites:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div style={{ width: '100%', height: window.innerHeight - 421, maxHeight: window.innerHeight - 421, padding: 0, overflowY: 'auto' }}>
                            <input className="form-control" placeholder="Search filter for select box ..." value={searchTextAS} onChange={(e) => setSearchTextAS(e.target.value)} />

                            <table className="table">
                                <thead><tr><th>Assigned Sites:</th><th></th></tr></thead>
                                <tbody>
                                    {sites.length > 0 ? sites.filter(s => s.DisplayName.toLowerCase().indexOf(searchTextAS.toLowerCase()) >= 0).map((site, i) => <tr key={i}><td>{site.DisplayName}</td><td><button className="btn btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        deleteCustommerAccess(site);
                                    }}><span>{TrashCan}</span></button></td></tr>) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col">
                        <input className="form-control" placeholder="Search filter for select box ..." value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <select className="form-control" style={{ paddingTop: 5, height: 'calc(100% - 35px)' }} value={selectedSites.map(ss => ss.ID.toString())} multiple onChange={(e) => {
                            setSelectedSites(Array.from(e.target.selectedOptions).map(o => ({ ID: o.value, Name: o.text })) as any)
                        }}>
                            {allSites.filter(allsite => allsite.AssetKey.toLowerCase().indexOf(searchText.toLowerCase()) >= 0).map(allsite => <option key={allsite.ID} value={allsite.ID} hidden={sites.find(s => s.MeterID == allsite.ID) != null} disabled={sites.find(s => s.MeterID == allsite.ID) != null}>{allsite.AssetKey}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right" onClick={addSites}>Add Sites</button>
                </div>
            </div>
        </div>
                
    );

}

