//******************************************************************************************************
//  AssetTypes.tsx - Gbtc
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
//  09/19/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '../../Table';
import * as _ from 'lodash';
import AssetTypePreviewPane from './AssetTypePreviewPane';

declare var homePath: string;

export default class AssetTypes extends React.Component<{}, { searchText: string, data: Array<{ Name: string }>, newEditID:number, newEditName: string, ascending: boolean, addNew: boolean, assetTypeID: number }, {}>{
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
            assetTypeID:0
        }
    }

    getTypes(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/AssetTypes`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(data => this.setState({ data: data })).fail((msg) => console.log(msg.responseJSON));
    }

    
    addType(name): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/AssetTypes`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: 0, Name: name }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => this.getTypes()).fail((msg) => {
            alert('Unable to add new type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    editType(id, name): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/AssetTypes`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: id, Name: name }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => this.getTypes()).fail((msg) => {
            alert('Unable to update type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    deleteType(id): void{
        if (confirm("Deleteing this asset type will delete all asset and asset information associated with it.  Are you sure?" )){
            $.ajax({
                type: "DELETE",
                url: `${homePath}api/AssetTypes/${id}`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(() => this.getTypes()).fail((msg) => console.log(msg.responseJSON));
        }
    }

    componentDidMount() {
        this.getTypes();
    }

    render() {
        var windowHeight = window.innerHeight;

        var data = this.state.data.filter(x => x.Name.toLowerCase().indexOf(this.state.searchText) >= 0 )
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
                                        <button className='btn btn-primary' data-toggle="modal" data-target="#assetTypeModal" onClick={(evt) => {
                                            evt.preventDefault()
                                            this.setState({addNew: true});
                                        }} >Add New Type</button>
                                    </form>
                                </fieldset>
                            </li>

                        </ul>
                    </div>
                </nav>

                <div style={{ width: '50%', height: 'calc( 100% - 136px)', position: 'relative', float:'left', overflowY: 'hidden' }}>
                    <Table
                        cols={[
                            { key: 'Name', label: 'Name', headerStyle: { width: '85%' }, rowStyle: { width: '85%' } },
                            {
                                key: 'Edit', label: '', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item, key, style) => <button className="btn btn-sm" data-toggle="modal" data-target="#assetTypeModal" onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({ newEditID: item.ID, newEditName: item.Name, addNew: false })
                                }}><span><i className="fa fa-pencil"></i></span></button>
                            },
                            {
                                key: 'Delete', label: '', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item, key, style) => <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    this.deleteType(item.ID);
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
                            if(col.col == "Name")
                                this.setState({ assetTypeID: col.row.ID })
                        }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 182, width: '100%'  }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />
                </div>
                <div style={{ width: '50%', height: 'calc( 100% - 136px)', position: 'relative', float: 'right', overflowY: 'hidden' }}>
                    <AssetTypePreviewPane assetTypeID={this.state.assetTypeID}/>
                </div>

                <div className="modal" id="assetTypeModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                                <h4 className="modal-title">{this.state.addNew ? "Add New" : "Edit" } Asset Type</h4>
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
                                        this.addType(this.state.newEditName);
                                    else
                                        this.editType(this.state.newEditID, this.state.newEditName);

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

