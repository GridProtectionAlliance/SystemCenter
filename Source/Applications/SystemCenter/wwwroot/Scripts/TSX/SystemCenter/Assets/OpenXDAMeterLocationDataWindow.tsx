//******************************************************************************************************
//  OpenXDAMeterLocationDataWindow.tsx - Gbtc
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

import { AssetTypeFieldAndValue, OpenXDAMeterLocation } from "../global";
import * as React from 'react';
import * as _ from 'lodash';
import ValueListInput from "./ValueListInput";

declare var homePath: string;
export default class OpenXDAMeterLocationDataWindow extends React.Component<{ fields: Array<AssetTypeFieldAndValue>, getData(): void }, { fields: Array<AssetTypeFieldAndValue>, collapsed: boolean }, {}>{
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
        var openXDARecord = this.makeOpenXDAMeterLocationRecord();
        if (openXDARecord.ID == 0) {
            this.addOpenXDAMeterLocation(openXDARecord);
        }
        else {
            this.editOpenXDAMeterLocation(openXDARecord);
        }
    }

    addOpenXDAMeterLocation(record: OpenXDAMeterLocation): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/MeterLocation/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(record),
            cache: true,
            async: true
        }).done((returnRecord: OpenXDAMeterLocation) => {
            this.makeFieldsFromOpenXDARecord(returnRecord);
        }).fail((msg) => {
            alert('Unable to update type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    editOpenXDAMeterLocation(record: OpenXDAMeterLocation): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/MeterLocation/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(record),
            cache: true,
            async: true
        }).done((returnRecord: OpenXDAMeterLocation) => {
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

    makeOpenXDAMeterLocationRecord(): OpenXDAMeterLocation {
        return {
            ID: this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.ID')[0].AssetTypeFieldValue == null ? 0 : parseInt(this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.ID')[0].AssetTypeFieldValue),
            AssetKey: this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.AssetKey')[0].AssetTypeFieldValue,
            ShortName: this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.ShortName')[0].AssetTypeFieldValue,
            Name: this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Name')[0].AssetTypeFieldValue,
            Alias: this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Alias')[0].AssetTypeFieldValue,
            Latitude: this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Latitude')[0].AssetTypeFieldValue == null ? null : parseFloat(this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Latitude')[0].AssetTypeFieldValue),
            Longitude: this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Longitude')[0].AssetTypeFieldValue == null ? null : parseFloat(this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Longitude')[0].AssetTypeFieldValue),
            Description: this.state.fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Description')[0].AssetTypeFieldValue
        }
    }

    makeFieldsFromOpenXDARecord(record: OpenXDAMeterLocation): void {
        var fields: Array<AssetTypeFieldAndValue> = _.cloneDeep(this.state.fields);
        fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.ID')[0].AssetTypeFieldValue = record.ID.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.AssetKey')[0].AssetTypeFieldValue = record.AssetKey == null ? null : record.AssetKey.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.ShortName')[0].AssetTypeFieldValue = record.ShortName == null ? null : record.ShortName.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Name')[0].AssetTypeFieldValue = record.Name == null ? null : record.Name.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Alias')[0].AssetTypeFieldValue = record.Alias == null ? null : record.Alias.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Latitude')[0].AssetTypeFieldValue = record.Latitude == null ? null : record.Latitude.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Longitude')[0].AssetTypeFieldValue = record.Longitude == null ? null : record.Longitude.toString();
        fields.filter(x => x.FieldName == 'OpenXDA.MeterLocation.Description')[0].AssetTypeFieldValue = record.Description == null ? null : record.Description.toString();
        this.setState({ fields: fields }, () => this.editAssetFields());
    }

    render() {
        var record = this.makeOpenXDAMeterLocationRecord();
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
                                    }} disabled={field.FieldName == 'OpenXDA.MeterLocation.ID'} />
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
                                window.location.href = `${homePath}index.cshtml?name=MeterLocations&meterLocationID=${record.ID}`
                            }} style={{ cursor: record.ID == null ? 'not-allowed' : 'pointer', marginLeft: 20 }} disabled={record.ID == null} >View Associated OpenXDA Meters</button>

                        </div>
                    </div>
                </div>

            </div>
        );
    }

}