//******************************************************************************************************
//  OpenXDALineDataWindow.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  10/14/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { AssetTypeFieldAndValue, OpenXDALine } from "../global";
import * as React from 'react';
import * as _ from 'lodash';
import ValueListInput from "./ValueListInput";

declare var homePath: string;
export default class OpenXDALineDataWindow extends React.Component<{ fields: Array<AssetTypeFieldAndValue>, getData(): void }, { fields: Array<AssetTypeFieldAndValue>, collapsed: boolean }, {}>{
    constructor(props, context) {
        super(props, context);

        this.state = {
            fields: _.cloneDeep(this.props.fields),
            collapsed: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.state.fields) != JSON.stringify(nextProps.fields))
            this.setState({ fields: _.cloneDeep(nextProps.fields) });
    }


    disableButton(): boolean {
        return JSON.stringify(this.state.fields) == JSON.stringify(this.props.fields);
    }

    editBtnClick(): void {
        var openXDARecord = this.makeOpenXDALineRecord();
        if (openXDARecord.ID == 0) {
            this.addOpenXDALine(openXDARecord);
        }
        else {
            this.editOpenXDALine(openXDARecord);
        }
    }

    addOpenXDALine(record: OpenXDALine): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Line/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(record),
            cache: true,
            async: true
        }).done((returnRecord: OpenXDALine) => {
            this.makeFieldsFromOpenXDARecord(returnRecord);
        }).fail((msg) => {
            alert('Unable to update type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    editOpenXDALine(record: OpenXDALine): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/Line/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(record),
            cache: true,
            async: true
        }).done((returnRecord: OpenXDALine) => {
            this.makeFieldsFromOpenXDARecord(record);
        }).fail((msg) => {
            alert('Unable to update type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    editAssetFields(): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/Assets/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.fields),
            cache: true,
            async: true
        }).done(() => this.props.getData()).fail((msg) => {
            alert('Unable to update type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    makeOpenXDALineRecord(): OpenXDALine {
        return {
            ID: this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.ID')[0].AssetTypeFieldValue == null ? 0 : parseInt(this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.ID')[0].AssetTypeFieldValue),
            AssetKey: this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.AssetKey')[0].AssetTypeFieldValue,
            VoltageKV: this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.VoltageKV')[0].AssetTypeFieldValue == null ? null : parseFloat(this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.VoltageKV')[0].AssetTypeFieldValue),
            ThermalRating: this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.ThermalRating')[0].AssetTypeFieldValue == null ? null : parseFloat(this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.ThermalRating')[0].AssetTypeFieldValue),
            Length: this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.Length')[0].AssetTypeFieldValue == null ? null : parseFloat(this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.Length')[0].AssetTypeFieldValue),
            MaxFaultDistance: this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.MaxFaultDistance')[0].AssetTypeFieldValue == null ? null : parseFloat(this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.MaxFaultDistance')[0].AssetTypeFieldValue), 
            MinFaultDistance: this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.MinFaultDistance')[0].AssetTypeFieldValue == null ? null : parseFloat(this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.MinFaultDistance')[0].AssetTypeFieldValue),
            Description: this.state.fields.filter(x => x.FieldName == 'OpenXDA.Line.Description')[0].AssetTypeFieldValue
        }
    }

    makeFieldsFromOpenXDARecord(record: OpenXDALine): void {
        var fields: Array<AssetTypeFieldAndValue> = _.cloneDeep(this.state.fields);
        fields.filter(x => x.FieldName == 'OpenXDA.Line.ID')[0].AssetTypeFieldValue = record.ID.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.Line.AssetKey')[0].AssetTypeFieldValue = record.AssetKey == null ? null : record.AssetKey.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.Line.VoltageKV')[0].AssetTypeFieldValue = record.VoltageKV == null ? null : record.VoltageKV.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.Line.ThermalRating')[0].AssetTypeFieldValue = record.ThermalRating == null ? null : record.ThermalRating.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.Line.Length')[0].AssetTypeFieldValue = record.Length == null ? null : record.Length.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.Line.MaxFaultDistance')[0].AssetTypeFieldValue = record.MaxFaultDistance == null ? null : record.MaxFaultDistance.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.Line.MinFaultDistance')[0].AssetTypeFieldValue = record.MinFaultDistance == null ? null : record.MinFaultDistance.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.Line.Description')[0].AssetTypeFieldValue = record.Description == null ? null : record.Description.toString();
        this.setState({ fields: fields }, () => this.editAssetFields());
    }

    render() {
        var record = this.makeOpenXDALineRecord();
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>OpenXDA:</h4>
                        </div>
                        <div className="col">
                            <button className="btn btn-sm pull-right" onClick={(e) => this.setState({ collapsed: !this.state.collapsed })}><span><i className={(this.state.collapsed ? "fa fa-angle-left" : "fa fa-angle-down")}></i></span></button>
                        </div>
                    </div>
                </div>
                <div className={(this.state.collapsed ? "collapse in" : "collapse show")}>

                    <div className="card-body">
                        <form>
                            {
                                this.state.fields.map(field =>
                                    <ValueListInput key={field.FieldName} valueListGroupID={1} field={field} onChange={(evt, fieldName, result) => {
                                        var obj: Array<AssetTypeFieldAndValue> = _.clone(this.state.fields);
                                        obj[obj.findIndex(x => x.FieldName == fieldName)].AssetTypeFieldValue = result;
                                        this.setState({ fields: obj })
                                    }} disabled={field.FieldName == 'OpenXDA.Line.ID'} />
                                )
                            }
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className='btn btn-primary pull-right' onClick={(evt) => {
                                evt.preventDefault()
                                this.editBtnClick();
                            }} style={{ cursor: this.disableButton() ? 'not-allowed' : 'pointer' }} disabled={this.disableButton()} >Update OpenXDA Data</button>
                            <button className='btn btn-primary pull-right' onClick={(evt) => {
                                evt.preventDefault()
                                window.location.href = `${homePath}index.cshtml?name=Lines&lineID=${record.ID}`
                            }} style={{ cursor: record.ID == null ? 'not-allowed' : 'pointer', marginLeft: 20 }} disabled={record.ID == null} >View Associated OpenXDA Meters</button>

                        </div>
                    </div>
                </div>

            </div>
        );
    }

}