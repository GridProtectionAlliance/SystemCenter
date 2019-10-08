//******************************************************************************************************
//  AssetTypePreviewPane.tsx - Gbtc
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
//  09/20/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as moment from 'moment';
import Table from '../../Table';
import * as _ from 'lodash';
import { AssetTypeField, Asset, ValueListItem, AssetTypeFieldAndValue } from '../global';
import AssetNoteWindow from './AssetNote';

declare var homePath: string;
declare interface AssetPreviewPaneProps { assetID: number, assetTypeID: number, assetTypeName: string, assetName: string }
declare interface AssetPreviewPaneState { fields: Array<AssetTypeFieldAndValue> }
export default class AssetPreviewPane extends React.Component<AssetPreviewPaneProps, AssetPreviewPaneState, { }> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            fields: []
        };
    }

    componentDidMount() {
        if (this.props.assetID > 0) {
            this.getData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.assetID > 0)
        {
            this.getData(nextProps);
        }
    }

    getData(props) {
        $.ajax({
            type: "GET",
            url: `${homePath}api/Assets/One/${props.assetID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((fields: Array<AssetTypeFieldAndValue>) => this.setState({ fields: fields })).fail((msg) => console.log(msg.responseJSON));
    }

    render() {
        if (this.state.fields.length == 0) return <div></div>;

        var cards = [...new Set(this.state.fields.filter(x => x.FieldName.indexOf('.') >= 0).map(x => x.FieldName.split('.')[0]))];
        return (
            <>
                <AssetNoteWindow assetID={this.props.assetID} />
                <GenericDataWindow key={'General Info'} groupName={'General Info'} fields={this.state.fields.filter(x => x.FieldName.indexOf('.') < 0)} getData={() => this.getData(this.props)} />
                {                
                    cards.map(name => <GenericDataWindow key={name} groupName={name} fields={this.state.fields.filter(x => x.FieldName.indexOf(name) >= 0)} getData={() => this.getData(this.props)} />)
                }
            </>
        );
    }
}
class GenericDataWindow extends React.Component<{ groupName: string, fields: Array<AssetTypeFieldAndValue>, getData(): void }, { fields: Array<AssetTypeFieldAndValue>, collapsed: boolean}, {}> {
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


    disableButton():boolean {
        return JSON.stringify(this.state.fields) == JSON.stringify(this.props.fields);
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

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>{this.props.groupName}:</h4>
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
                                    }} />
                                )
                            }
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className='btn btn-primary pull-right' onClick={(evt) => {
                                evt.preventDefault()
                                this.editAssetFields();
                            }} style={{cursor: this.disableButton() ? 'not-allowed' : 'pointer'}} disabled={this.disableButton()} >Update {this.props.groupName} Data</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

class ValueListInput extends React.Component<{ valueListGroupID: number, field: AssetTypeFieldAndValue, onChange(evt: React.ChangeEvent, fieldName: string, result: any): any }, { options: Array<ValueListItem> }, {}> {

    constructor(props, context) {
        super(props, context)
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        this.getOptions();
    }


    getOptions() {
        $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/${this.props.valueListGroupID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(valueListGroups => this.setState({ options: valueListGroups })).fail((msg) => console.log(msg.responseJSON));
    }

    render() {
        if (this.props.field.FieldType == "integer") {
            return(
            <>
                <label key={this.props.field.AssetTypeFieldValueID}>{this.props.field.FieldName}</label>
                    <input className="form-control" type="number" step="1" value={(this.props.field.AssetTypeFieldValue != null ? this.props.field.AssetTypeFieldValue : '')} onChange={(evt) => this.props.onChange(evt, this.props.field.FieldName, (evt.target.value != '' ? evt.target.value : null)) } />
            </>);
        }
        else if (this.props.field.FieldType == "number")
            return (
                <>
                    <label key={this.props.field.AssetTypeFieldValueID}>{this.props.field.FieldName}</label>
                    <input className="form-control" type="number" value={(this.props.field.AssetTypeFieldValue != null ? this.props.field.AssetTypeFieldValue : '')} onChange={(evt) => this.props.onChange(evt, this.props.field.FieldName, (evt.target.value != '' ? evt.target.value : null))}/>
                </>);
        else if (this.props.field.FieldType == "string")
            return (
                <>
                    <label key={this.props.field.AssetTypeFieldValueID}>{this.props.field.FieldName}</label>
                    <input className="form-control" type="string" value={(this.props.field.AssetTypeFieldValue != null ? this.props.field.AssetTypeFieldValue : '')} onChange={(evt) => this.props.onChange(evt, this.props.field.FieldName, (evt.target.value != '' ? evt.target.value : null))}/>
                </>);
        else if (this.props.field.FieldType == "boolean")
            return (
                <div className='form-check'>
                    <input className="form-check-input" type="checkbox" checked={Boolean((this.props.field.AssetTypeFieldValue != null ? this.props.field.AssetTypeFieldValue : ''))} onChange={(evt) => this.props.onChange(evt, this.props.field.FieldName, (evt.target.checked ? evt.target.checked : null))} />
                    <label className='form-check-label' key={this.props.field.AssetTypeFieldValueID}>{this.props.field.FieldName}</label>
                </div>
            );

        else
            return (
                <>
                    <label key={this.props.field.AssetTypeFieldValueID}>{this.props.field.FieldName}</label>
                    <select className='form-control' value={(this.props.field.AssetTypeFieldValue != null ? this.props.field.AssetTypeFieldValue : '')} onChange={(evt) => this.props.onChange(evt, this.props.field.FieldName, (evt.target.value  != ''? evt.target.value: null) )}>
                        <option value=''></option>
                        {
                            this.state.options.map(x => <option key={x.ID} value={x.Text}>{x.Text}</option>)
                        }
                    </select>
                </>);

    }
}
