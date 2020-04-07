//******************************************************************************************************
//  ExternalDBUpdate.tsx - Gbtc
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
//  04/07/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import {SystemCenter } from '../global';
import AssetAttributes from '../AssetAttribute/Asset';
import FormInput from './FormInput';
import FormCheckBox from './FormCheckBox';
import FormSelect from './FormSelect';
import { Moment } from '../../../../../node_modules/moment/moment';
declare var homePath: string;



function ExternalDataBaseWindow(props: { ID: number , Type: 'Asset' | 'Meter' | 'Location' | 'Customer'}): JSX.Element {
    const [externalDB, setexternalDB] = React.useState<Array<SystemCenter.ExternalDB>>([]);
    const [changed, setChanged] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        getData();
    }, [props.ID]);

    function getData() {
        getExternalDBs();
        setChanged(false);
    }

    function getExternalDBs(): void {
       $.ajax({
            type: "GET",
           url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/${props.Type}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
       }).done((data: Array<SystemCenter.ExternalDB>) => {
           setexternalDB(data);
       });
    }


    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <h4>External Data Base Connections:</h4>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <table className='table'>
                        <thead>
                            <tr><th>Ext DB</th><th style={{ width: 250 }}>Last Updated</th><th style={{ width: 300 }}>Value</th></tr>
                        </thead>
                        <tbody>
                            {externalDB.map((a, i) => <TableRowInput key={i} ParentTableID={props.ID} ExternalDB={a.name} updated={a.lastUpdate} Update={(values) => {
                                console.log(values);
                            }} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExternalDataBaseWindow;

function TableRowInput(props: { ParentTableID: number, ExternalDB: string, updated: Date, Update: (externalDB: string) => void }) {
   
    return(
        <tr>
            <td>{props.ExternalDB}</td>
            <td>{props.updated.toString()}</td>
            <td><button className="btn btn-primary" onClick={(e) => props.Update(props.ExternalDB)}>Update {props.ExternalDB}</button></td>
        </tr>
    );
}
