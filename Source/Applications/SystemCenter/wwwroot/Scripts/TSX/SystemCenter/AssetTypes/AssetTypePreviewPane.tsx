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
import { AssetTypeField } from '../global';

declare var homePath: string;

export default class AssetTypePreviewPane extends React.Component<{ assetTypeID: number }, { AssetType: { ID: number, Name: string }, AssetTypeFields: AssetTypeField }> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            AssetType: null,
            AssetTypeFields: null,
        };
    }

    componentDidMount() {
        if (this.props.assetTypeID > 0)
            this.getData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.assetTypeID > 0)
            this.getData(nextProps);
    }

    getData(props) {
        $.ajax({
            type: "GET",
            url: `${homePath}api/AssetTypes/${props.assetTypeID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(assetType => this.setState({ AssetType: assetType })).fail((msg) => console.log(msg.responseJSON));
    }

    render() {
        if (this.state.AssetType == null) return <div></div>;

        return (
            <>
                <AssetTypeFieldTable assetTypeID={this.props.assetTypeID} assetTypeName={this.state.AssetType.Name}/>
            </>
        );
    }
}

class AssetTypeFieldTable extends React.Component<{ assetTypeID: number, assetTypeName: string }, { data: Array<AssetTypeField>, ascending: boolean, addNew: boolean, newEditName: string, newEditID: number, newEditDescription: string, newEditType: string, OptionList: Array<string>}, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            ascending: true,
            addNew: true,
            newEditName: '',
            newEditID: 0,
            newEditDescription: '',
            newEditType: 'string',
            OptionList: ["string", "integer", "number", "boolean"]
        }

    }


    componentDidMount() {
        this.getOptions();
        if (this.props.assetTypeID > 0)
            this.getTypeFields(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.assetTypeID > 0)
            this.getTypeFields(nextProps);
    }

    getTypeFields(props) {
        $.ajax({
            type: "GET",
            url: `${homePath}api/AssetTypeFields/${props.assetTypeID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(data => this.setState({ data: data })).fail((msg) => console.log(msg.responseJSON));
    }

    addTypeField(name: string, description: string, type: string): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/AssetTypeFields`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: 0, AssetTypeID: this.props.assetTypeID, Type: type,Name: name, Description: description }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => this.getTypeFields(this.props)).fail((msg) => {
            alert('Unable to add new type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    editTypeField(id:number, assetTypeID: number, type:string, name:string, description: string): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/AssetTypeFields`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: id, AssetTypeID: assetTypeID, Type: type, Name: name, Description: description }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => this.getTypeFields(this.props)).fail((msg) => {
            alert('Unable to update type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    deleteTypeField(id): void {
        if (confirm(`Deleteing this field will delete all information associated with it for every ${this.props.assetTypeName} asset.  Are you sure?`)) {
            $.ajax({
                type: "DELETE",
                url: `${homePath}api/AssetTypeFields/${id}`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(() => this.getTypeFields(this.props)).fail((msg) => console.log(msg.responseJSON));
        }
    }

    getOptions() {
        $.ajax({
            type: "GET",
            url: `${homePath}api/ValueListGroup/`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(valueListGroups => this.setState({ OptionList: ["string", "integer", "number", "boolean", ...valueListGroups.map(vlg => vlg.Name)] })).fail((msg) => console.log(msg.responseJSON));
    }



    render() {
        return (
            <div className="card">
                <div className="card-header">Asset Type ({this.props.assetTypeName}) Fields
                    <button className='btn btn-primary pull-right' data-toggle="modal" data-target="#assetTypeFieldModal" onClick={(evt) => {
                        evt.preventDefault()
                        this.setState({
                            newEditName: '',
                            newEditID: 0,
                            newEditDescription: '',
                            newEditType: 'string',
                            addNew: true
                        });
                    }} >Add New Field</button>
                </div>
                <div className="card-body">
                <Table<AssetTypeField>
                    cols={[
                        { key: 'Name', label: 'Name', headerStyle: { width: '40%' }, rowStyle: { width: '40%' } },
                        { key: 'Type', label: 'Data Type', headerStyle: { width: '40%' }, rowStyle: { width: '40%' } },
                        {
                            key: 'Edit', label: '', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item, key, style) => <button className="btn btn-sm" data-toggle="modal" data-target="#assetTypeFieldModal" onClick={(e) => {
                                e.preventDefault();
                                this.setState({ newEditID: item.ID, newEditName: item.Name, newEditDescription: item.Description,newEditType: item.Type, addNew: false })
                            }}><span><i className="fa fa-pencil"></i></span></button>
                        },
                        {
                            key: 'Delete', label: '', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item, key, style) => <button className="btn btn-sm" onClick={(e) => {
                                e.preventDefault();
                                this.deleteTypeField(item.ID);
                            }}><span><i className="fa fa-times"></i></span></button>
                        },
                    ]}
                    tableClass="table table-hover"
                    data={this.state.data}
                    sortField={"Name"}
                    ascending={this.state.ascending}
                    onSort={(d) => {
                        var ordered = _.orderBy(this.state.data, [d.col], ["asc"]);
                        this.setState({ ascending: !this.state.ascending, data: ordered });
                    }}
                    onClick={(col, row, data) => {
                    }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 182, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
                <div className="modal" id="assetTypeFieldModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{this.state.addNew ? "Add New" : "Edit"} Asset Type</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label>Name</label>
                                    <input className='form-control' type='text' value={this.state.newEditName} onChange={(evt) => this.setState({ newEditName: evt.target.value })} />
                                    <label>Data Type</label>
                                        <select className='form-control' value={this.state.newEditType} onChange={(evt) => this.setState({ newEditType: evt.target.value })}>
                                        {
                                                this.state.OptionList.map(x => <option key={x}>{x}</option>)
                                        }
                                        </select>
                                    <label>Description</label>
                                    <textarea className='form-control' rows={3} value={this.state.newEditDescription} onChange={(evt) => this.setState({ newEditDescription: evt.target.value })}></textarea>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(evt) => {
                                    if (this.state.addNew)
                                        this.addTypeField(this.state.newEditName, this.state.newEditDescription, this.state.newEditType);
                                    else
                                        this.editTypeField(this.state.newEditID, this.props.assetTypeID, this.state.newEditType, this.state.newEditName, this.state.newEditDescription);

                                    this.setState({ newEditName: '', newEditDescription: '',newEditID: 0 });

                                }} >Save</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                    this.setState({ newEditName: '', newEditDescription: '', newEditID: 0 });
                                }}>Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                </div>
            </div>

        );
    }
}

