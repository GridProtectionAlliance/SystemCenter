//******************************************************************************************************
//  ByMeter.tsx - Gbtc
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
//  08/22/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '../../Table';
import * as _ from 'lodash';

type FieldName = 'AssetKey' | 'Name' | 'Location' | 'Make' | 'Model' | 'Note';
interface Search {
    Field: FieldName,
    SearchText: string
}   
interface Meter {
    ID: number, AssetKey: string, Name: string, Location: string, MappedAssets: number, Make: string, Model: string 
}
declare var homePath: string;

export default class ByMeter extends React.Component<{}, { Search: Array<Search>, Data: Array<Meter>, SortField: string, Ascending: boolean }, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            Search: [{Field:'AssetKey', SearchText:''}],
            Data: [],
            SortField: 'AssetName',
            Ascending: true
        }

        this.getMeters = this.getMeters.bind(this);
    }

    getMeters(): void{
        $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/Meter/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(this.state.Search),
            cache: false,
            async: true
        }).done((data: Array<Meter>) => this.setState({ Data: data }));
    }

    componentDidMount() {
        this.getMeters();
    }

    render() {
        var windowHeight = window.innerHeight;

        return (
            <div style={{ width: '100%', height: '100%' }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ width: '100%' }}>
                        <ul className="navbar-nav mr-auto" style={{ width: '100%' }}>
                            <li className="nav-item" style={{ width: '50%', paddingRight: 10 }}>
                                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                    <legend className="w-auto" style={{ fontSize: 'large' }}>Search: </legend>
                                    <form>
                                        {
                                            this.state.Search.map((search, index, array) => {

                                                return (
                                                    <div className="input-group" key={index} style={{ border: '1px solid lightgray'}}>
                                                        <div className="input-group-prepend">
                                                            <select className='form-control' style={{height: '100%'}} value={search.Field} onChange={(evt) => {
                                                                search.Field = evt.target.value as FieldName;
                                                                this.setState({ Search: array })
                                                            }}>
                                                                <option value='AssetKey'>AssetKey</option>
                                                                <option value='Name'>Name</option>
                                                                <option value='Location'>Location</option>
                                                                <option value='Make'>Make</option>
                                                                <option value='Model'>Model</option>
                                                                <option value='Note'>Note</option>
                                                            </select>
                                                        </div>
                                                        <input className='form-control' type='text' placeholder='Search...' value={search.SearchText} onChange={(evt) => {
                                                            search.SearchText = evt.target.value;
                                                            this.setState({ Search: array })
                                                        }} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-danger" type="button" onClick={(evt) => {
                                                                array.splice(index, 1);
                                                                this.setState({ Search: array })
                                                            }}><span><i className="fa fa-times"></i></span></button>
                                                        </div>
                                                    </div>
                                               )
                                            })
                                        
                                    }
                                    </form>
                                </fieldset>
                            </li>
                            <li className="nav-item" style={{ width: '15%' }}>
                                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                    <legend className="w-auto" style={{ fontSize: 'large' }}>Search Params:</legend>
                                    <form>
                                        <div className="form-group">
                                            <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                                event.preventDefault();
                                                let array = _.clone(this.state.Search, true);
                                                array.push({ Field: 'AssetKey', SearchText: '' });
                                                this.setState({ Search: array })
                                            }}>Add Parameter</button>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                                event.preventDefault();
                                                this.getMeters();
                                            }}>Update Search</button>
                                        </div>
                                    </form>
                                </fieldset>
                            </li>
                            <li className="nav-item" style={{ width: '15%' }}>
                                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                    <legend className="w-auto" style={{ fontSize: 'large' }}>Wizards:</legend>
                                    <form>
                                        <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                            event.preventDefault();
                                            window.location.href = `${homePath}index.cshtml?name=NewMeterWizard`
                                        }}>New Meter</button>
                                    </form>
                                </fieldset>
                            </li>


                        </ul>
                    </div>
                </nav>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table
                        cols={[
                            { key: 'AssetKey', label: 'AssetKey', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                            { key: 'Name', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                            { key: 'Location', label: 'Location', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'MappedAssets', label: 'Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Make', label: 'Make', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Model', label: 'Model', headerStyle: { width: 'calc(10%)' }, rowStyle: { width: 'calc(10% - 17px)' } },
                        ]}
                        tableClass="table table-hover"
                        data={this.state.Data}
                        sortField={this.state.SortField}
                        ascending={this.state.Ascending}
                        onSort={(d) => {
                            if (d.col == this.state.SortField) {
                                var ordered = _.orderBy(this.state.Data, [d.col], [(!this.state.Ascending ? "asc" : "desc")]);
                                this.setState({ Ascending: !this.state.Ascending, Data: ordered });
                            }
                            else {
                                var ordered = _.orderBy(this.state.Data, [d.col], ["asc"]);
                                this.setState({ Ascending: true, Data: ordered, SortField: d.col });
                            }
                        }}
                        onClick={(item) => { window.location.href = homePath + 'index.cshtml?name=Meter&meterId=' + item.row.ID}}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 182, width: '100%'  }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />
                </div>
            </div>
        )
    }
}

