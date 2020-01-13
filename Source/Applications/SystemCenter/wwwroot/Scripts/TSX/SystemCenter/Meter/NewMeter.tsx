//******************************************************************************************************
//  NewMeter.tsx - Gbtc
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
//  10/15/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
import { OpenXDA, ValueListItem } from '../global';
declare var homePath: string;

export default class NewMeterInfoWindow extends React.Component<{}, { Meter: OpenXDA.Meter, MeterLocation: OpenXDA.Location, TimeZones: Array<ValueListItem>, MeterLocations: Array<OpenXDA.Location> }, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);

        this.state = {
            Meter: {
                ID: 0,
                AssetKey: '',
                Name: '',
                ShortName: '',
                Alias: '',
                Make: '',
                Model: '',
                TimeZone: '',
                Description: '',
                LocationID: 0
            },
            MeterLocation: {
                ID: 0,
                LocationKey: '',
                Name: '',
                Alias: '',
                ShortName: '',
                Latitude: 0,
                Longitude: 0,
                Description: '',
            },
            TimeZones: [],
            MeterLocations: []
        }

        this.addNewMeter = this.addNewMeter.bind(this);
    }


    componentDidMount() {
        this.getTimeZones();
        this.getMeterLocations();
    }


    getTimeZones(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/TimeZones`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((tzs: Array<ValueListItem>) => this.setState({ TimeZones: tzs }));
    }

    getMeterLocations(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/MeterLocation`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((mls: Array<OpenXDA.Location>) => {
            var ordered = _.orderBy(mls, ['AssetKey'], ['ASC']);
            this.setState({ MeterLocations: mls })
        });
    }

    addNewMeter(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Meter/New`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ Meter: this.state.Meter, MeterLocation: this.state.MeterLocation }),
            dataType: 'json',
            cache: true,
            async: true
        }).done((meter: OpenXDA.Meter) => {
            window.location.href = homePath + 'index.cshtml?name=Meter&meterID=' + meter.ID
        });
    }


    render() {
        const disableBtn = this.state.Meter.AssetKey.length == 0 || this.state.Meter.Name.length == 0 || this.state.Meter.Make.length == 0;
        return (
            <>
            <div className="card">
                <div className="card-header">
                    <h4>Meter Location / Substation Information:</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">

                                <label>Select Location</label>
                                <select className="form-control" value={this.state.MeterLocation.ID} onChange={(evt) => {
                                        var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                        var meter: OpenXDA.Meter = _.clone(this.state.Meter, true);

                                        if (evt.target.value != "0") {
                                            meter.LocationID = parseInt(evt.target.value);
                                            this.setState({ MeterLocation: this.state.MeterLocations.find(x => x.ID == parseInt(evt.target.value)), Meter: meter });
                                        }
                                        else {
                                            meter.LocationID = 0;
                                            this.setState({
                                                MeterLocation: {
                                                    ID: 0,
                                                    LocationKey: '',
                                                    Name: '',
                                                    Alias: '',
                                                    ShortName: '',
                                                    Latitude: 0,
                                                    Longitude: 0,
                                                    Description: '',
                                                },  Meter: meter
                                            });
                                }
                                }}>
                                    <option value="0">Add New</option>
                                    {this.state.MeterLocations.map(ml => <option value={ml.ID} key={ml.ID}>{ml.LocationKey}</option>)}
                                </select>

                                <label>Asset Key</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                        if (evt.target.value != "")
                                            meterLocation.LocationKey = evt.target.value;
                                        else
                                            meterLocation.LocationKey = null;

                                        this.setState({ MeterLocation: meterLocation });
                                    }} value={this.state.MeterLocation.LocationKey == null ? '' : this.state.MeterLocation.LocationKey} disabled={this.state.MeterLocation.ID != 0}/>
                                <label>Name</label>
                                <input className="form-control" onChange={(evt) => {
                                        var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Name = evt.target.value;
                                    else
                                        meterLocation.Name = null;

                                    this.setState({ MeterLocation: meterLocation });
                                    }} value={this.state.MeterLocation.Name == null ? '' : this.state.MeterLocation.Name} disabled={this.state.MeterLocation.ID != 0}/>
                                <label>Short Name</label>
                                <input className="form-control" onChange={(evt) => {
                                        var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.ShortName = evt.target.value;
                                    else
                                        meterLocation.ShortName = null;

                                    this.setState({ MeterLocation: meterLocation});
                                    }} value={this.state.MeterLocation.ShortName == null ? '' : this.state.MeterLocation.ShortName} disabled={this.state.MeterLocation.ID != 0} />
                                <label>Alias</label>
                                <input className="form-control" onChange={(evt) => {
                                        var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Alias = evt.target.value;
                                    else
                                        meterLocation.Alias = null;

                                    this.setState({ MeterLocation: meterLocation});
                                    }} value={this.state.MeterLocation.Alias == null ? '' : this.state.MeterLocation.Alias} disabled={this.state.MeterLocation.ID != 0}/>


                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Latitude</label>
                                <input className="form-control" onChange={(evt) => {
                                        var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Latitude = parseFloat(evt.target.value);
                                    else
                                        meterLocation.Latitude = null;

                                    this.setState({ MeterLocation: meterLocation });
                                    }} value={this.state.MeterLocation.Latitude == null ? '' : this.state.MeterLocation.Latitude} type="number" step={3} disabled={this.state.MeterLocation.ID != 0}/>

                                <label>Longitude</label>
                                <input className="form-control" onChange={(evt) => {
                                        var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Longitude = parseFloat(evt.target.value);
                                    else
                                        meterLocation.Longitude = null;

                                    this.setState({ MeterLocation: meterLocation });
                                    }} value={this.state.MeterLocation.Longitude == null ? '' : this.state.MeterLocation.Longitude} type="number" step={3} disabled={this.state.MeterLocation.ID != 0} />



                                <label>Description</label>
                                <textarea rows={2} className="form-control" onChange={(evt) => {
                                        var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Description = evt.target.value;
                                    else
                                        meterLocation.Description = null;

                                    this.setState({ MeterLocation: meterLocation});
                                    }} value={this.state.MeterLocation.Description == null ? '' : this.state.MeterLocation.Description} disabled={this.state.MeterLocation.ID != 0}/>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>General Meter Information:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Asset Key</label>
                                <input className={"form-control"} onChange={(evt) => {
                                    var meter: OpenXDA.Meter = _.clone(this.state.Meter, true);
                                    if (evt.target.value != "")
                                        meter.AssetKey = evt.target.value;
                                    else
                                        meter.AssetKey = null;

                                    this.setState({ Meter: meter });
                                }} value={this.state.Meter == null || this.state.Meter.AssetKey == null ? '' : this.state.Meter.AssetKey} required={true}/>
                                <label>Name</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meter: OpenXDA.Meter  = _.clone(this.state.Meter, true);
                                    if (evt.target.value != "")
                                        meter.Name = evt.target.value;
                                    else
                                        meter.Name = null;

                                    this.setState({ Meter: meter });
                                }} value={this.state.Meter == null || this.state.Meter.Name == null ? '' : this.state.Meter.Name} />
                                <label>Short Name</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meter: OpenXDA.Meter  = _.clone(this.state.Meter, true);
                                    if (evt.target.value != "")
                                        meter.ShortName = evt.target.value;
                                    else
                                        meter.ShortName = null;

                                    this.setState({ Meter: meter });
                                }} value={this.state.Meter == null || this.state.Meter.ShortName == null ? '' : this.state.Meter.ShortName} />
                                <label>Alias</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meter: OpenXDA.Meter  = _.clone(this.state.Meter, true);
                                    if (evt.target.value != "")
                                        meter.Alias = evt.target.value;
                                    else
                                        meter.Alias = null;

                                    this.setState({ Meter: meter });
                                }} value={this.state.Meter == null || this.state.Meter.Alias == null ? '' : this.state.Meter.Alias} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">

                                <label>Make</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meter: OpenXDA.Meter  = _.clone(this.state.Meter, true);
                                    if (evt.target.value != "")
                                        meter.Make = evt.target.value;
                                    else
                                        meter.Make = null;

                                    this.setState({ Meter: meter });
                                }} value={this.state.Meter == null || this.state.Meter.Make == null ? '' : this.state.Meter.Make} />
                                <label>Model</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meter: OpenXDA.Meter  = _.clone(this.state.Meter, true);
                                    if (evt.target.value != "")
                                        meter.Model = evt.target.value;
                                    else
                                        meter.Model = null;

                                    this.setState({ Meter: meter });
                                }} value={this.state.Meter == null || this.state.Meter.Model == null ? '' : this.state.Meter.Model} />

                                <label>Time Zone</label>
                                <select className="form-control" value={this.state.Meter == null || this.state.Meter.TimeZone == null ? '-1' : this.state.Meter.TimeZone} onChange={(evt) => {
                                    var meter: OpenXDA.Meter  = _.clone(this.state.Meter, true);
                                    if (evt.target.value != "-1")
                                        meter.TimeZone = evt.target.value;
                                    else
                                        meter.TimeZone = null;
                                    this.setState({ Meter: meter });
                                }}>
                                    <option value="-1">None Selected</option>
                                    {
                                        (this.state.TimeZones != null ? this.state.TimeZones.sort((a, b) => a.SortOrder - b.SortOrder).map(tz => <option value={tz.Text} key={tz.Text} disabled={!tz.Enabled} hidden={tz.Hidden}>{tz.AltText1}</option>): null)
                                    }
                                </select>

                                <label>Description</label>
                                <textarea rows={2} className="form-control" onChange={(evt) => {
                                    var meter: OpenXDA.Meter  = _.clone(this.state.Meter, true);
                                    if (evt.target.value != "")
                                        meter.Description = evt.target.value;
                                    else
                                        meter.Description = null;

                                    this.setState({ Meter: meter });
                                }} value={this.state.Meter == null || this.state.Meter.Description == null ? '' : this.state.Meter.Description} />


                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={this.addNewMeter}  type="submit">Add New</button>
                    </div>
                </div>

            </div>
            </>
        );
    }
}
