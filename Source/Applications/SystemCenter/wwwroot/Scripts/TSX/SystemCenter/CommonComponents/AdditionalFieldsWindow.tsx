//******************************************************************************************************
//  AdditionalFieldsWindow.tsx - Gbtc
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
//  01/28/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import {SystemCenter, OpenXDA } from '../global';
import AssetAttributes from '../AssetAttribute/Asset';
import FormInput from './FormInput';
import FormCheckBox from './FormCheckBox';
import FormSelect from './FormSelect';

declare var homePath: string;
declare type AdditionalFieldType = 'Meter' | 'Location' | 'Customer' | 'Line' | 'Bus' | 'Breaker' | 'Transformer' | 'LineSegment' | 'CapacitorBank' | 'Asset' | 'CapacitorBankRelay'

function AdditionalFieldsWindow(props: { ID: number, Type: AdditionalFieldType, Tab: string }): JSX.Element {

    const [valueListGroups, setValueListGroups] = React.useState<Array<SystemCenter.ValueListGroup>>([]);
    const [additionalFields, setAdditionalFields] = React.useState<Array<SystemCenter.AdditionalField>>([]);
    const [additionalFieldValues, setAdditionalFieldVaules] = React.useState<Array<SystemCenter.AdditionalFieldValue>>([]);
    const [edit, setEdit] = React.useState<boolean>(false);
    const [changed, setChanged] = React.useState<boolean>(false);
    const [newField, setNewField] = React.useState<SystemCenter.AdditionalField>({ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false });

    React.useEffect(() => {
        return getData();
    }, [props.ID, props.Type, props.Tab]);

    function getData() {
        let handle1 = getFields();
        let handle2 = getFieldValues();
        let handle3 = getValueLists();

        setChanged(false);
        setNewField({ ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false });

        return () => {
            if (handle1.abort != undefined) handle1.abort();
            if (handle2.abort != undefined) handle2.abort();
            if (handle3.abort != undefined) handle3.abort();

        }
    }

    function getFields(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/${props.Type}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: Array<SystemCenter.AdditionalField>) => {
            setAdditionalFields(data);
        });

        return handle;
    }

    function getFieldValues(): JQuery.jqXHR {

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: Array<SystemCenter.AdditionalFieldValue>) => {
            setAdditionalFieldVaules(data);
        });

        return handle;
    }

    function getValueLists(): JQuery.jqXHR {

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueListGroup`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: Array<SystemCenter.ValueListGroup>) => {
            setValueListGroups(data);
        });

        return handle;
    }


    function addOrUpdateValues(): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/Array`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(additionalFieldValues),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });
    }

    function addNewField(): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalField/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(newField),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });
    }

    function deleteField(field: SystemCenter.AdditionalField): void {
        let response = confirm("This will delete the field '" + field.FieldName + "' from all " + props.Type + "s and will also delete all information assigned to these fields");

        if (!response) return;
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/AdditionalField/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(field),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });

    }

    function editField(field: SystemCenter.AdditionalField): void {
        setNewField(field);
    }

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Additional Fields:</h4>
                    </div>
                    <div className="col">
                        {(edit) ?
                            <button className="btn btn-default pull-right" onClick={() => setEdit(false)}>View</button> :
                            <button className="btn btn-primary pull-right" onClick={() => setEdit(true)}>Edit</button>}
                    </div>
                </div>
                
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <table className='table'>
                        <thead>
                            <tr><th>Field</th><th style={{ width: 150 }}>Ext DB</th><th style={{ width: 100}}>Type</th><th style={{ width: 300 }}>Value</th><th style={{ width: 30 }}></th><th style={{width: 30}}></th></tr>
                        </thead>
                        {(edit) ?
                            <tbody>
                                {additionalFields.map((a, i) => <TableRowInput key={i} ParentTableID={props.ID} Field={a} Values={additionalFieldValues} Setter={(values) => {
                                    setAdditionalFieldVaules(values);
                                    setChanged(true);
                                }} DeleteField={deleteField} EditField={editField} />)}
                            </tbody> :
                            <tbody>
                                {additionalFields.map((a, i) => <ViewTableRowInput key={i} ParentTableID={props.ID} Field={a} Values={additionalFieldValues} />)}
                            </tbody>
                        }
                    </table>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" data-toggle='modal' data-target="#newField" disabled={!edit}>Add Field</button>
                </div>

                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={addOrUpdateValues} disabled={!changed || !edit}>Save Changes</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={getFieldValues} disabled={!changed || !edit}>Reset</button>
                </div>
            </div>

            <div className="modal" id="newField">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Additional Field</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <FormInput<SystemCenter.AdditionalField> Record={newField} Field='FieldName' Valid={(field) => true} Label="Field Name" Setter={setNewField} /> 
                            <FormSelect<SystemCenter.AdditionalField> Record={newField} Field='Type' Options={[{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }].concat(valueListGroups.filter(x => x.Enabled).map(x => { return { Value: x.Name, Label: x.Name } }))} Label="Field Type" Setter={setNewField} /> 
                            <FormInput<SystemCenter.AdditionalField> Record={newField} Field='ExternalDB' Valid={(field) => true} Label="External Database" Setter={setNewField} /> 
                            <FormInput<SystemCenter.AdditionalField> Record={newField} Field='ExternalDBTable' Valid={(field) => true} Label="External Database Table" Setter={setNewField} /> 
                            <FormInput<SystemCenter.AdditionalField> Record={newField} Field='ExternalDBTableKey' Valid={(field) => true} Label="External Database Table Key" Setter={setNewField} /> 
                            <FormCheckBox<SystemCenter.AdditionalField> Record={newField} Field='IsSecure' Label="Secure Data" Setter={setNewField} /> 

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewField} >Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default AdditionalFieldsWindow;

function TableRowInput(props: { ParentTableID: number, Field: SystemCenter.AdditionalField, Values: Array<SystemCenter.AdditionalFieldValue>, Setter: (values: Array<SystemCenter.AdditionalFieldValue>) => void, DeleteField: (field: SystemCenter.AdditionalField) => void, EditField: (field: SystemCenter.AdditionalField) => void }) {
    const [valueListItems, setValueListItems] = React.useState<Array<SystemCenter.ValueListItem>>([]);

    React.useEffect(() => {
        if ((["integer", "number", "boolean", "string"]).indexOf(props.Field.Type) < 0) {
            let handle = $.ajax({
                type: "GET",
                url: `${homePath}api/ValueList/Group/${props.Field.Type}`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            })

            handle.done((vl: Array<SystemCenter.ValueListItem>) => {
                setValueListItems(vl);
            });

            return () => {
                if(handle.abort != undefined) handle.abort()
            }
        }

    }, [props.Field.Type]);

    function Valid(type: SystemCenter.AdditionalFieldType): boolean {
        if (type == "integer")
            return value.Value == null || AssetAttributes.isInteger(value.Value);
        else if (type == "number")
            return value.Value == null || AssetAttributes.isRealNumber(value.Value);
        else if (type == "boolean")
            return true;
        else
            return true;
    }

    var values: Array<SystemCenter.AdditionalFieldValue> = _.clone(props.Values);
    var value: SystemCenter.AdditionalFieldValue = values.find(value => value.AdditionalFieldID == props.Field.ID);

    if (value == null) {
        value = { ID: 0, AdditionalFieldID: props.Field.ID, OpenXDAParentTableID: props.ParentTableID, Value: null };
        values.push(value);
    }

    if ((["integer", "number", "boolean", "string" ]).indexOf(props.Field.Type) < 0) {
    }

    return(
        <tr>
            <td>{props.Field.FieldName}</td>
            <td>{props.Field.ExternalDB}</td>
            <td>{props.Field.Type}</td>
            <td>
                {((["integer", "number", "boolean", "string"]).indexOf(props.Field.Type) >= 0 ?                   
                    <input className={(Valid(props.Field.Type) ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        if (evt.target.value != "")
                            value.Value = evt.target.value as any;
                        else
                            value.Value = null;

                        props.Setter(values);
                    }} value={value.Value == null ? '' : value.Value.toString()} />
                    :
                    <select className='form-control' value={(value.Value != null ? value.Value : '')} onChange={(evt) => {
                        if (evt.target.value != "")
                            value.Value = evt.target.value as any;
                        else
                            value.Value = null;

                        props.Setter(values);
                    }} >
                        <option value=''></option>
                        {
                            valueListItems.map(x => <option key={x.ID} value={x.Text}>{x.Text}</option>)
                        }
                    </select>
                )}
            </td>
            <td><button className="btn btn-sm" data-toggle='modal' data-target="#newField"  onClick={(e) => props.EditField(props.Field)}><span><i className="fa fa-pencil"></i></span></button></td>
            <td><button className="btn btn-sm" onClick={(e) => props.DeleteField(props.Field)}><span><i className="fa fa-times"></i></span></button></td>
        </tr>
    );
}

function ViewTableRowInput(props: { ParentTableID: number, Field: SystemCenter.AdditionalField, Values: Array<SystemCenter.AdditionalFieldValue> }) {
    

    var values: Array<SystemCenter.AdditionalFieldValue> = _.clone(props.Values);
    var value: SystemCenter.AdditionalFieldValue = values.find(value => value.AdditionalFieldID == props.Field.ID);

    if (value == null) {
        return (null)
    }
    return (
        <tr>
            <td>{props.Field.FieldName}</td>
            <td>{props.Field.ExternalDB}</td>
            <td>{props.Field.Type}</td>
            <td>{value.Value != null ? value.Value.toString() : ''}</td>
            <td></td>
            <td></td>
        </tr>
    );
}