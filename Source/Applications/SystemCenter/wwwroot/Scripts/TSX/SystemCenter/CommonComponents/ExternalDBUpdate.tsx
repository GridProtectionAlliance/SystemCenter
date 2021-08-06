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
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { LoadingIcon, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import moment from 'moment';



function ExternalDataBaseWindow(props: {
    ID: number,
    Type: 'Asset' | 'Meter' | 'Location' | 'Customer' | 'Line' | 'Breaker' | 'Bus' | 'LineSegment' | 'CapacitorBank' | 'Transformer' | 'CapacitorBankRelay',
    Tab: string
}): JSX.Element {
    const [externalDB, setexternalDB] = React.useState<Array<SystemCenter.Types.ExternalDB>>([]);
    const [externalDBFields, setFields] = React.useState<Array<SystemCenter.Types.ExternalDBField>>([]);
    const [changed, setChanged] = React.useState<boolean>(false);
    const [currentDB, setCurrentDB] = React.useState<string>("");

    const [status, setStatus] = React.useState<('error' | 'idle' | 'loading')>('idle');

    React.useEffect(() => {
        setChanged(false);
        setFields([]);
        return getExternalDBs();
    }, [props.ID, props.Type, props.Tab]); 

    function getExternalDBs() {
       setStatus('loading')
       let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/${props.Type}/extDataBases`, 
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       })

        handle
            .done((data: Array<SystemCenter.Types.ExternalDB>) => {
            setStatus('idle')
            setexternalDB(data);
        })
            .fail(() => { setStatus('error') });

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }

    function updateExternalDB(type: string) {
        setStatus('loading')
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ExternalDB/${type}/${props.Type}/Update/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })

        handle.done((data: Array<SystemCenter.Types.ExternalDBField>) => {
            setFields(data)
            setStatus('idle')
            setChanged(true)
            setCurrentDB(type)
            if (data.length < 1)
                cancelUpdate()
        }).fail(() => { setStatus('error') });

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }

    

   
    
    function cancelUpdate(): void {
        setFields([])
        setChanged(false)
    }

    function checkUpdate(data: Array<SystemCenter.Types.ExternalDBField>): void {
        if (data.length < 1) {
                cancelUpdate();
        }
        else {
            setFields(data);
        }
    }

    function submitUpdate() {
        setStatus('loading')
        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/ExternalDB/${currentDB}/${props.Type}/ConfirmUpdate`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ "data": externalDBFields }),
            cache: false,
            async: true
        }).done(() => {
            setFields([])
            setChanged(false)

            getExternalDBs();
        }).fail(() => setStatus('error'))

        return () => {
            if (handle.abort != undefined) handle.abort();
        } 
    }

    if (status == 'loading')
        return <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4> External Data Base Connections:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                    <div style={{ height: '100%', width: '100%', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} />
                    </div>
                </div>
            </div>
        </div>


    if (status == 'error')
        return <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4> External Data Base Connections:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                    </div>
                </div>
            </div>
        </div>

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <h4> External Data Base Connections:</h4>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    {(changed? (
                        <table id="fields" className='table'>
                            <thead>
                                <tr>
                                    {props.ID == -1 ?
                                        <th> {props.Type} </th> :
                                        null}
                                    <th>Field</th>
                                    <th style={{ width: 300 }}>Previous Value</th>
                                    <th style={{ width: 300 }}>Updated Value</th>
                                    <th style={{ width: 30 }}></th>
                                    <th style={{ width: 30 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {externalDBFields.map((a, i) => <TableRowField key={i} ParentTableID={props.ID} Field={a} Values={externalDBFields} Setter={checkUpdate} />)}
                            </tbody>
                        </table>):(
                        <table id="overview" className='table'>
                            <thead>
                                <tr><th>External DB</th><th style={{ width: 250 }}>Last Updated</th><th style={{ width: 300 }}></th></tr>
                            </thead>
                            <tbody>
                                    {externalDB.map((a, i) => <TableRowInput key={i} ParentTableID={props.ID} ExternalDB={a.name} updated={a.lastupdate} Update={(dbType) => {
                                        updateExternalDB(dbType);
                                }} />)}
                            </tbody>
                        </table>)
                    )}
                </div>
            </div>
            {(changed ?
                <div className="card-footer">

                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={submitUpdate}>Save Changes</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={cancelUpdate}>Cancel</button>
                    </div> 
            </div> : null)}
        </div>
    );
}

export default ExternalDataBaseWindow;

function TableRowInput(props: { ParentTableID: number, ExternalDB: string, updated: Date, Update: (externalDB: string) => void }) {
   
    return(
        <tr>
            <td>{props.ExternalDB}</td>
            <td>{(props.updated == null ? "N/A" : moment(props.updated).format("MM/DD/YYYY"))}</td>
            <td><button className="btn btn-primary" onClick={(e) => props.Update(props.ExternalDB)}>Update {props.ExternalDB}</button></td>
        </tr>
    );
}

function TableRowField(props: { ParentTableID: number, Field: SystemCenter.Types.ExternalDBField, Values: Array<SystemCenter.Types.ExternalDBField>, Setter: (values: Array<SystemCenter.Types.ExternalDBField>) => void}) {
    var values: Array<SystemCenter.Types.ExternalDBField> = _.clone(props.Values);
    var value: SystemCenter.Types.ExternalDBField = values.find(value => value.AdditionalFieldID == props.Field.AdditionalFieldID && value.OpenXDAParentTableID == props.Field.OpenXDAParentTableID && value.isXDAField == props.Field.isXDAField);

    function removeField() {
        values = values.filter(fld => !(fld.AdditionalFieldID == props.Field.AdditionalFieldID && fld.OpenXDAParentTableID == props.Field.OpenXDAParentTableID && fld.isXDAField == props.Field.isXDAField))
        props.Setter(values);
    }
    return (
        <tr>
            {props.ParentTableID == -1 ?
                <td>{props.Field.DisplayName}</td>
                : null}
            <td>{props.Field.FieldName}</td>
            <td>{props.Field.PreviousValue == null ? "" : props.Field.PreviousValue}</td>
            {(props.Field.Error ? <td>{props.Field.Message}</td> :
                <td>
                    <input className={(props.Field.Changed ? "form-control is-invalid" : "form-control")} onChange={(evt) => {
                        if (evt.target.value != "")
                            value.Value = evt.target.value as any;
                        else
                            value.Value = null;

                        value.Changed = true;
                        props.Setter(values);
                    }} value={value.Value == null ? '' : value.Value.toString()} />
                </td>
                )}
            <td>{props.Field.Error ? <span><i className="fa fa-exclamation-triangle"></i></span> : null}</td>
            <td><button className="btn btn-sm" onClick={(e) => removeField()}><span><i className="fa fa-times"></i></span></button></td>
        </tr>
    );
}
