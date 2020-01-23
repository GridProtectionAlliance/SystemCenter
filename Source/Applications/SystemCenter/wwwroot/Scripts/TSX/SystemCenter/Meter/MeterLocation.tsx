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
import AssetAttributes from '../AssetAttribute/Asset';
import FormInput from '../CommonComponents/FormInput';
import FormTextArea from '../CommonComponents/FormTextArea';
declare var homePath: string;

export default class MeterLocationWindow extends React.Component<{ Meter: OpenXDA.Meter, StateSetter: (OpenXDAMeter) => void }, { MeterLocation: OpenXDA.Location, changed: boolean, MeterLocations: Array<OpenXDA.Location>}, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);

        this.state = {
            MeterLocation: {
                ID: 0,
                LocationKey: null,
                Name: null,
                Alias: null,
                ShortName: null,
                Latitude: null,
                Longitude: null,
                Description: null,
            },
            changed: false,
            MeterLocations: []
        }

        this.valid = this.valid.bind(this);
        this.updateState = this.updateState.bind(this);

    }


    componentDidMount() {
        this.getAllLocations();
        this.getMeterLocation(this.props.Meter);
    }

    componentWillReceiveProps(nextProps): void {
        if (this.state.MeterLocation.ID != nextProps.Meter.MeterLocationID)
            this.getMeterLocation(nextProps.Meter);
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

    getAllLocations(): void {
        if (sessionStorage.hasOwnProperty('SystemCenter.Locations'))
            this.setState({ MeterLocations: JSON.parse(sessionStorage.getItem('SystemCenter.Locations')) });
        else
            $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/Location`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(mls => {
                this.setState({ MeterLocations: mls })
                sessionStorage.setItem('SystemCenter.Locations', JSON.stringify(mls));
            });
    }


    addNewMeterLocation(): JQuery.jqXHR {
        var meterLocation: any = _.clone(this.state.MeterLocation, true);
        meterLocation.MeterID = this.props.Meter.ID;

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
        var meter: OpenXDA.Meter = _.clone(this.props.Meter, true);

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
                   this.props.StateSetter(meter);
               });

           }

           this.setState({ changed: false }, () => this.getAllLocations())
       });
    }

    valid(field: keyof (OpenXDA.Location)): boolean {
        if (field == 'LocationKey')
            return this.state.MeterLocation.LocationKey != null && this.state.MeterLocation.LocationKey.length > 0 && this.state.MeterLocation.LocationKey.length <= 50;
        else if (field == 'Name')
            return this.state.MeterLocation.Name != null && this.state.MeterLocation.Name.length > 0 && this.state.MeterLocation.Name.length <= 200;
        else if (field == 'Alias')
            return this.state.MeterLocation.Alias == null || this.state.MeterLocation.Alias.length <= 200;
        else if (field == 'ShortName')
            return this.state.MeterLocation.ShortName == null || this.state.MeterLocation.ShortName.length <= 50;
        else if (field == 'Latitude')
            return this.state.MeterLocation.Latitude != null && AssetAttributes.isRealNumber(this.state.MeterLocation.Latitude);
        else if (field == 'Longitude')
            return this.state.MeterLocation.Longitude != null && AssetAttributes.isRealNumber(this.state.MeterLocation.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }

    updateState(location: OpenXDA.Location) {
        this.setState({ MeterLocation: location, changed: true });
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
                                                LocationKey: null,
                                                Name: null,
                                                Alias: null,
                                                ShortName: null,
                                                Latitude: null,
                                                Longitude: null,
                                                Description: null,

                                            }, changed: true
                                        });
                                }}>
                                    <option value="0">Add New</option>
                                    {
                                        (this.state.MeterLocations != null ? this.state.MeterLocations.map(ml => <option value={ml.ID} key={ml.ID}>{ml.LocationKey}</option>): null)
                                    }

                                </select>
                            </div>

                            <FormInput<OpenXDA.Location> Record={this.state.MeterLocation} Field={'LocationKey'} Label={'Key'} Feedback={'A unique key of less than 50 characters is required.'} Valid={this.valid} Setter={this.updateState} />
                            <FormInput<OpenXDA.Location> Record={this.state.MeterLocation} Field={'Name'} Feedback={'Name must be less than 200 characters and is required.'} Valid={this.valid} Setter={this.updateState} />
                            <FormInput<OpenXDA.Location> Record={this.state.MeterLocation} Field={'ShortName'} Feedback={'ShortName must be less than 50 characters.'} Valid={this.valid} Setter={this.updateState} />
                            
                        </div>
                        <div className="col">
                            <FormInput<OpenXDA.Location> Record={this.state.MeterLocation} Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={this.valid} Setter={this.updateState} />
                            <FormInput<OpenXDA.Location> Record={this.state.MeterLocation} Field={'Latitude'} Feedback={'Latitude is a require numeric field.'} Valid={this.valid} Setter={this.updateState} />
                            <FormInput<OpenXDA.Location> Record={this.state.MeterLocation} Field={'Longitude'} Feedback={'Longitude is a require numeric field.'} Valid={this.valid} Setter={this.updateState} />
                            <FormTextArea<OpenXDA.Location> Rows={3} Record={this.state.MeterLocation} Field={'Description'} Valid={this.valid} Setter={this.updateState} />
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
                        <button className="btn btn-default" onClick={() => this.getMeterLocation(this.props.Meter)} disabled={!this.state.changed}>Reset</button>
                    </div>
                </div>


            </div>
        );
    }
}
