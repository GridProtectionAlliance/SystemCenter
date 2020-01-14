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
import { OpenXDA } from '../global';
declare var homePath: string;

export default class MeterLocationWindow extends React.Component<{ meter: OpenXDA.Meter, stateSetter: (OpenXDAMeter) => void }, { MeterLocation: OpenXDA.Location, changed: boolean, MeterLocations: Array<OpenXDA.Location>}, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);

        this.state = {
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
            changed: false,
            MeterLocations: null
        }
    }


    componentDidMount() {
        this.getAllLocations();
        this.getMeterLocation(this.props.meter);
    }

    componentWillReceiveProps(nextProps): void {
        if (this.state.MeterLocation.ID != nextProps.meter.MeterLocationID)
            this.getMeterLocation(nextProps.meter);
    }


    getMeterLocation(meter: OpenXDA.Meter): void {
        if (meter == null || meter.LocationID == null) return;
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/One/${meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((meterLocation: OpenXDA.Location) => this.setState({ MeterLocation: meterLocation, changed: false }));
    }

    getDifferentMeterLocation(meterLocationID: number): JQuery.jqXHR {
        var jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/One/${meterLocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle.done((meterLocation: OpenXDA.Location) => this.setState({ MeterLocation: meterLocation, changed: true }));
    }

    getAllLocations(): JQuery.jqXHR {
        var jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle.done(mls => this.setState({ MeterLocations: mls }));
    }


    addNewMeterLocation(): JQuery.jqXHR {
        var meterLocation: any = _.clone(this.state.MeterLocation, true);
        meterLocation.MeterID = this.props.meter.ID;

        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Location/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(meterLocation),
            dataType: 'json',
            cache: true,
            async: true
        }).done((meterLocation: OpenXDA.Location) => {      
            this.setState({ MeterLocation: meterLocation, changed: false },() => this.getAllLocations())
        });
    }


    updateMeterLocation(): JQuery.jqXHR {
        var location: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
        var meter: OpenXDA.Meter = _.clone(this.props.meter, true);

       return $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/Location/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.MeterLocation),
            dataType: 'json',
            cache: true,
            async: true
       }).done((meterLocationID: number) => {
           if (location.ID != meter.LocationID) {
               meter.LocationID = this.state.MeterLocation.ID;
               $.ajax({
                   type: "PATCH",
                   url: `${homePath}api/OpenXDA/Meter/Update`,
                   contentType: "application/json; charset=utf-8",
                   data: JSON.stringify(meter),
                   dataType: 'json',
                   cache: true,
                   async: true
               }).done((msg) => {
                   this.props.stateSetter(meter);
               });

           }

           this.setState({ changed: false }, () => this.getAllLocations())
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
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">

                                <label>Select Location</label>
                                <select className="form-control" value={this.state.MeterLocation.ID == null ? '0' : this.state.MeterLocation.ID} onChange={(evt) => {
                                    var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "0")
                                        this.getDifferentMeterLocation(parseInt(evt.target.value));
                                    else
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
                                            }, changed: true});
                                }}>
                                    <option value="0">Add New</option>
                                    {
                                        (this.state.MeterLocations != null ? this.state.MeterLocations.map(ml => <option value={ml.ID} key={ml.ID}>{ml.LocationKey}</option>): null)
                                    }

                                </select>

                                <label>Asset Key</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.LocationKey = evt.target.value;
                                    else
                                        meterLocation.LocationKey = null;

                                    this.setState({ MeterLocation: meterLocation, changed: true });
                                }} value={this.state.MeterLocation.LocationKey == null ? '' : this.state.MeterLocation.LocationKey} />
                                <label>Name</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Name = evt.target.value;
                                    else
                                        meterLocation.Name = null;

                                    this.setState({ MeterLocation: meterLocation, changed: true });
                                }} value={this.state.MeterLocation.Name == null ? '' : this.state.MeterLocation.Name} />
                                <label>Short Name</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.ShortName = evt.target.value;
                                    else
                                        meterLocation.ShortName = null;

                                    this.setState({ MeterLocation: meterLocation, changed: true });
                                }} value={this.state.MeterLocation.ShortName == null ? '' : this.state.MeterLocation.ShortName} />

                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Alias</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Alias = evt.target.value;
                                    else
                                        meterLocation.Alias = null;

                                    this.setState({ MeterLocation: meterLocation, changed: true });
                                }} value={this.state.MeterLocation.Alias == null ? '' : this.state.MeterLocation.Alias} />


                                <label>Latitude</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Latitude = parseFloat(evt.target.value);
                                    else
                                        meterLocation.Latitude = null;

                                    this.setState({ MeterLocation: meterLocation, changed: true });
                                }} value={this.state.MeterLocation.Latitude == null ? '' : this.state.MeterLocation.Latitude} type="number" step={3} />

                                <label>Longitude</label>
                                <input className="form-control" onChange={(evt) => {
                                    var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
                                    if (evt.target.value != "")
                                        meterLocation.Longitude = parseFloat(evt.target.value);
                                    else
                                        meterLocation.Longitude = null;

                                    this.setState({ MeterLocation: meterLocation, changed: true });
                                }} value={this.state.MeterLocation.Longitude == null ? '' : this.state.MeterLocation.Longitude} type="number" step={3}/>



                                <label>Description</label>
                                <textarea rows={2} className="form-control" onChange={(evt) => {
                                    var meterLocation: OpenXDA.Location = _.clone(this.state.MeterLocation, true);
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
                        <button className="btn btn-default" onClick={() => this.getMeterLocation(this.props.meter)} disabled={!this.state.changed}>Reset</button>
                    </div>
                </div>


            </div>
        );
    }
}
