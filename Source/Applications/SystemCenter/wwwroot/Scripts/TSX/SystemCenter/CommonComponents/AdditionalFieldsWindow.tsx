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
import * as moment from 'moment';
import * as _ from 'lodash';
import { AdditionalField, AdditionalFieldValue, AdditionalFieldType } from '../global';
import AssetAttributes from '../AssetAttribute/Asset';
declare var homePath: string;

function AdditionalFieldsWindow(props: { ID: number , Type: 'Asset' | 'Meter' | 'Location'}): JSX.Element {
    const [additionalFields, setAdditionalFields] = React.useState<Array<AdditionalField>>([]);
    const [additionalFieldValues, setAdditionalFieldVaules] = React.useState<Array<AdditionalFieldValue>>([]);
    const [changed, setChanged] = React.useState<boolean>(false);

    React.useEffect(() => {
        getData();
    }, [props.ID]);

    function getData() {
        getFields();
        getFieldValues()
        setChanged(false);
    }

    function getFields(): void {
       $.ajax({
            type: "GET",
           url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/${props.Type}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
       }).done((data: Array<AdditionalField>) => {
           setAdditionalFields(data);
       });
    }

    function getFieldValues(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((data: Array<AdditionalFieldValue>) => {
            setAdditionalFieldVaules(data);
        });
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

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <h4>Additional Fields:</h4>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <table className='table'>
                        <thead>
                            <tr><td>Field</td><td>Value</td></tr>
                        </thead>
                        <tbody>
                            {additionalFields.map((a, i) => <TableRowInput key={i} ParentTableID={props.ID} Field={a} Values={additionalFieldValues} Setter={(values) => {
                                setAdditionalFieldVaules(values);
                                setChanged(true);
                            }} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={addOrUpdateValues} disabled={!changed}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={getFieldValues} disabled={!changed}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default AdditionalFieldsWindow;

function TableRowInput(props: { ParentTableID: number, Field: AdditionalField, Values: Array<AdditionalFieldValue>, Setter: (values: Array<AdditionalFieldValue>) => void }) {
    function Valid(type: AdditionalFieldType): boolean {
        if (type == "integer")
            return value.Value == null ||  AssetAttributes.isInteger(value.Value);
        else if (type == "number")
            return value.Value == null || AssetAttributes.isRealNumber(value.Value);
        else if (type == "boolean")
            return true;
        else
            return true;
    }

    var values: Array<AdditionalFieldValue> = _.clone(props.Values, true);
    var value: AdditionalFieldValue = values.find(value => value.AdditionalFieldID == props.Field.ID);

    if (value == null) {
        value = { ID: 0, AdditionalFieldID: props.Field.ID, OpenXDAParentTableID: props.ParentTableID, Value: null };
        values.push(value);
    }
    return(
        <tr>
            <td>{props.Field.FieldName}</td>
            <td>
                <input className={(Valid(props.Field.Type) ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    if (evt.target.value != "")
                        value.Value = evt.target.value as any;
                    else
                        value.Value = null;

                    props.Setter(values);
                }} value={value.Value == null ? '' : value.Value.toString()}/>
            </td>
        </tr>
    );
}
