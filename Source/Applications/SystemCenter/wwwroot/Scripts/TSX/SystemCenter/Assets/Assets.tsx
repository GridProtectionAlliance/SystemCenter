//******************************************************************************************************
//  Assets.tsx - Gbtc
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
//  09/23/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '../../Table';
import * as _ from 'lodash';
import AssetPreviewPane from './AssetPreviewPane';
import { Asset } from '../global';

declare var homePath: string;

declare interface AssetsProps { assetTypeID: number, assetTypeName: string}
declare interface AssetsState { searchText: string, data: Array<Asset>, newEditID: number, newEditName: string, ascending: boolean, addNew: boolean, assetID: number, assetName: string }

export default class Assets extends React.Component<AssetsProps, AssetsState , {}>{
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchText: '',
            data: [],
            ascending: true,
            newEditID: 0,
            newEditName: '',
            addNew: true, 
            assetID: 0,
            assetName: ''
        }
    }

    getAssets(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/Assets/${this.props.assetTypeID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((data: Array<Asset>) => this.setState({ data: data, assetID: (data.length > 0 ? data[0].ID : 0), assetName: (data.length > 0 ? data[0].AssetKey : '') })).fail((msg) => console.log(msg.responseJSON));
    }

    
    addAsset(assetKey): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/Assets`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: 0, AssetKey: assetKey, AssetTypeID: this.props.assetTypeID }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => this.getAssets()).fail((msg) => {
            alert('Unable to add new type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    editAsset(id, assetKey): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/Assets`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: id, AssetKey: assetKey, AssetTypeID: this.props.assetTypeID }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => this.getAssets()).fail((msg) => {
            alert('Unable to update type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    deleteAsset(id): void{
        if (confirm("Deleteing this asset type will delete all asset and asset information associated with it.  Are you sure?" )){
            $.ajax({
                type: "DELETE",
                url: `${homePath}api/Assets/${id}`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(() => this.getAssets()).fail((msg) => console.log(msg.responseJSON));
        }
    }

    componentDidMount() {
        this.getAssets();
    }

    render() {
        var windowHeight = window.innerHeight;

        var data = this.state.data.filter(x => x.AssetKey.toLowerCase().indexOf(this.state.searchText) >= 0 )
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ width: '100%' }}>
                        <ul className="navbar-nav mr-auto" style={{ width: '100%' }}>
                            <li className="nav-item" style={{ width: '50%', paddingRight: 10 }}>
                                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                    <legend className="w-auto" style={{ fontSize: 'large' }}>Text Search:</legend>
                                    <form>
                                        <input className='form-control' type='text' placeholder='Search...' value={this.state.searchText} onChange={(evt) => this.setState({ searchText: evt.target.value })} />
                                    </form>
                                </fieldset>
                            </li>
                            <li className="nav-item" style={{ width: '50%', paddingRight: 10 }}>
                                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                    <form>
                                        <button className='btn btn-primary' data-toggle={(this.props.assetTypeName != "Meter" ? "modal" : '')} data-target="#assetTypeModal" onClick={(evt) => {
                                            evt.preventDefault()
                                            if (this.props.assetTypeName == "Meter")
                                                window.location.href = homePath + 'index.cshtml?name=Meter'
                                            this.setState({addNew: true});
                                        }} >Add New {this.props.assetTypeName}</button>
                                    </form>
                                </fieldset>
                            </li>

                        </ul>
                    </div>
                </nav>

                <div style={{ width: '50%', height: 'calc( 100% - 136px)', position: 'relative', float:'left', overflowY: 'hidden' }}>
                    <Table<Asset>
                        cols={[
                            { key: 'AssetKey', label: 'Asset Key', headerStyle: { width: '50%' }, rowStyle: { width: '50%' } },
                            //{
                            //    key: 'Edit', label: '', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item, key, style) => <button className="btn btn-sm" data-toggle="modal" data-target="#assetTypeModal" onClick={(e) => {
                            //        e.preventDefault();
                            //        this.setState({ newEditID: item.ID, newEditName: item.Name, addNew: false })
                            //    }}><span><i className="fa fa-pencil"></i></span></button>
                            //},
                            {
                                key: 'Delete', label: '', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item, key, style) => <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    this.deleteAsset(item.ID);
                                }}><span><i className="fa fa-times"></i></span></button>
                            },
                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortField={"Name"}
                        ascending={this.state.ascending}
                        onSort={(d) => {
                            var ordered = _.orderBy(this.state.data, [d.col], ["asc"]);
                            this.setState({ ascending: !this.state.ascending, data: ordered });
                        }}
                        onClick={(col, row, data) => {
                            if(col.col == "AssetKey")
                                this.setState({ assetID: col.row.ID, assetName: col.row.AssetKey })
                        }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 182, width: '100%'  }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => item.ID == this.state.assetID}
                    />
                </div>
                <div style={{ width: '50%', height: 'calc( 100% - 136px)', position: 'relative', float: 'right', overflowY: 'auto' }}>
                    <AssetPreviewPane assetID={this.state.assetID} assetTypeID={this.props.assetTypeID} assetTypeName={this.props.assetTypeName} assetName={this.state.assetName}/>
                </div>

                <div className="modal" id="assetTypeModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                                <h4 className="modal-title">{this.state.addNew ? "Add New" : "Edit" } </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                          <div className="modal-body">
                                <form>
                                    <label>Name</label>
                                    <input className='form-control' type='text' value={this.state.newEditName} onChange={(evt) => this.setState({ newEditName: evt.target.value })} />
                                </form>
                          </div>
                          <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(evt) => {
                                    if(this.state.addNew)
                                        this.addAsset(this.state.newEditName);
                                    else
                                        this.editAsset(this.state.newEditID, this.state.newEditName);

                                    this.setState({ newEditName: '', newEditID: 0 });
                                    
                                }} >Save</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                    this.setState({ newEditName: '', newEditID: 0 });
                                }}>Close</button>
                          </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

