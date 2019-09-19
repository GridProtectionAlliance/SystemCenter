//******************************************************************************************************
//  ConnectionInfo.tsx - Gbtc
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
//  09/11/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
declare var homePath: string;

declare interface iMeterLocation {
    ID: number,
    AssetKey: string,
    Name: string,
    Alias: string,
    ShortName: string,
    Latitude: number,
    Longitude: number,
    Description: string,
    EMPACName: string,
    TSC: string,
    Sector: string,
    LocationType: string
}

export default class MeterLocationWindow extends React.Component<{ meterId: number }, { MeterLocation: iMeterLocation, collapsed: boolean, changed: boolean, LocationTypes: any, MeterLocations: any}, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);

        this.state = {
            MeterLocation: {
                ID: 0,
                AssetKey: '',
                Name: '',
                Alias: '',
                ShortName: '',
                Latitude: 0,
                Longitude: 0,
                Description: '',
                EMPACName: '',
                TSC: '',
                Sector: '',
                LocationType: ''
            },
            collapsed: true,
            changed: false,
            LocationTypes: {},
            MeterLocations: {}
        }
    }


    componentDidMount() {
        this.getLocationTypes();
        this.getAllLocations();
        this.getMeterLocation();
    }

    getMeterLocation(): JQuery.jqXHR {
        var jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/MeterLocation/${this.props.meterId}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle.done((meterLocation: iMeterLocation) => this.setState({ MeterLocation: meterLocation, changed: false }));
    }

    getDifferentMeterLocation(meterLocationID: number): JQuery.jqXHR {
        var jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/MeterLocation/MeterLocation/${meterLocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle.done((meterLocation: iMeterLocation) => this.setState({ MeterLocation: meterLocation, changed: true }));
    }

    getLocationTypes(): JQuery.jqXHR {
        var jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/MeterLocation/LocationTypes`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle.done(lts => this.setState({ LocationTypes: lts }));
    }

    getAllLocations(): JQuery.jqXHR {
        var jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/MeterLocation/AllLocations`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle.done(mls => this.setState({ MeterLocations: mls }));
    }


    addNewMeterLocation(): JQuery.jqXHR {
        var meterLocation: any = _.clone(this.state.MeterLocation, true);
        meterLocation.MeterID = this.props.meterId;

        return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/Meter/MeterLocation/AddNew`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(meterLocation),
            dataType: 'json',
            cache: true,
            async: true
        }).done((meterLocation: iMeterLocation) => {      
            this.setState({ MeterLocation: meterLocation, changed: false },() => this.getAllLocations())
        });
    }


    updateMeterLocation(): JQuery.jqXHR {
        var meterLocation: any = _.clone(this.state.MeterLocation, true);
        meterLocation.MeterID = this.props.meterId;

       return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/Meter/MeterLocation/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(meterLocation),
            dataType: 'json',
            cache: true,
            async: true
       }).done((meterLocation: iMeterLocation) => {
           this.setState({ MeterLocation: meterLocation, changed: false }, () => this.getAllLocations())
       });
    }

    deleteMeterLocation(): JQuery.jqXHR {
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/Meter/MeterLocation/Delete/${this.state.MeterLocation.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((meterLocation: iMeterLocation) => {
            this.setState({ MeterLocation: meterLocation, changed: false }, () => this.getAllLocations())
        });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Meter Location / Substation Information:</h4>
                        </div>
                        <div className="col">
                            <button className="btn btn-sm pull-right" onClick={(e) => this.setState({collapsed: !this.state.collapsed})}><span><i className={(this.state.collapsed ? "fa fa-angle-left" : "fa fa-angle-down")}></i></span></button>
                        </div>
                    </div>
                </div>
                <div className={(this.state.collapsed ? "collapse in" : "collapse show")}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">

                                    <label>Select Location</label>
                                    <select className="form-control" value={this.state.MeterLocation.ID == null ? '0' : this.state.MeterLocation.ID} onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "0")
                                            this.getDifferentMeterLocation(parseInt(evt.target.value));
                                        else
                                            this.setState({
                                                MeterLocation: {
                                                    ID: 0,
                                                    AssetKey: '',
                                                    Name: '',
                                                    Alias: '',
                                                    ShortName: '',
                                                    Latitude: 0,
                                                    Longitude: 0,
                                                    Description: '',
                                                    EMPACName: '',
                                                    TSC: '',
                                                    Sector: '',
                                                    LocationType: ''
                                                }, changed: true});
                                    }}>
                                        <option value="0">Add New</option>
                                        {
                                            Object.keys(this.state.MeterLocations).map(ml => <option value={ml} key={ml}>{this.state.MeterLocations[ml]}</option>)
                                        }

                                    </select>

                                    <label>Asset Key</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.AssetKey = evt.target.value;
                                        else
                                            meterLocation.AssetKey = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.AssetKey == null ? '' : this.state.MeterLocation.AssetKey} />
                                    <label>Name</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.Name = evt.target.value;
                                        else
                                            meterLocation.Name = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.Name == null ? '' : this.state.MeterLocation.Name} />
                                    <label>Short Name</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.ShortName = evt.target.value;
                                        else
                                            meterLocation.ShortName = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.ShortName == null ? '' : this.state.MeterLocation.ShortName} />
                                    <label>Alias</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.Alias = evt.target.value;
                                        else
                                            meterLocation.Alias = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.Alias == null ? '' : this.state.MeterLocation.Alias} />
                                    <label>Latitude</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.Latitude = parseFloat(evt.target.value);
                                        else
                                            meterLocation.Latitude = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.Latitude == null ? '' : this.state.MeterLocation.Latitude} type="number" step={3}/>


                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Longitude</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.Longitude = parseFloat(evt.target.value);
                                        else
                                            meterLocation.Longitude = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.Longitude == null ? '' : this.state.MeterLocation.Longitude} type="number" step={3}/>


                                    <label>EMPAC Name</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.EMPACName = evt.target.value;
                                        else
                                            meterLocation.EMPACName = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.EMPACName == null ? '' : this.state.MeterLocation.EMPACName} />

                                    <label>TSC</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.TSC = evt.target.value;
                                        else
                                            meterLocation.TSC = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.TSC == null ? '' : this.state.MeterLocation.TSC} />


                                    <label>Sector</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.Sector = evt.target.value;
                                        else
                                            meterLocation.Sector = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.Sector == null ? '' : this.state.MeterLocation.Sector} />

                                    <label>Location Type</label>
                                    <select className="form-control" value={this.state.MeterLocation.LocationType == null ? '-1' : this.state.MeterLocation.LocationType} onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "-1")
                                            meterLocation.LocationType = evt.target.value;
                                        else
                                            meterLocation.LocationType = null;
                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }}>
                                        <option value="-1">None Selected</option>
                                        {
                                            Object.keys(this.state.LocationTypes).map(lt => <option value={lt} key={lt}>{this.state.LocationTypes[lt]}</option>)
                                        }

                                    </select>

                                    <label>Description</label>
                                    <textarea rows={2} className="form-control" onChange={(evt) => {
                                        var meterLocation: iMeterLocation = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.Description = evt.target.value;
                                        else
                                            meterLocation.Description = null;

                                        this.setState({ MeterLocation: meterLocation, changed: true });
                                    }} value={this.state.MeterLocation.Description == null ? '' : this.state.MeterLocation.Description} />


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className="btn btn-primary" onClick={() => this.addNewMeterLocation()} hidden={this.state.MeterLocation.ID != 0} disabled={!this.state.changed}>Add New</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-primary" onClick={() => this.updateMeterLocation()} hidden={this.state.MeterLocation.ID == 0} disabled={!this.state.changed}>Update</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-default" onClick={() => this.getMeterLocation()} disabled={!this.state.changed}>Reset</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-danger" onClick={() => this.deleteMeterLocation()} disabled={this.state.MeterLocation.ID == 0 || this.state.changed}>Delete Meter Location</button>
                        </div>


                    </div>

                </div>

            </div>
        );
    }
}
