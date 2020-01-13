//******************************************************************************************************
//  Page1.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, ValueListItem } from '../global';
import { object } from 'prop-types';
declare var homePath: string;

export default class Page2 extends React.Component<{ LocationInfo: OpenXDA.Location, UpdateState: (record) => void }, { Locations: Array<OpenXDA.Location> }, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            Locations: []
        }
    }
    componentDidMount() {
        this.getAllLocations();
    }


    getAllLocations(): void {
        if (sessionStorage.hasOwnProperty('NewMeterWizard.Locations'))
            this.setState({ Locations: JSON.parse(sessionStorage.getItem('NewMeterWizard.Locations')) });
        else
            $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
            }).done((mls: Array<OpenXDA.Location>) => {
                this.setState({ Locations: mls })
                sessionStorage.setItem('NewMeterWizard.Locations', JSON.stringify(mls));
            });
    }

    getDifferentMeterLocation(meterLocationID: number): void {
        this.props.UpdateState({ LocationInfo: this.state.Locations.find((value, index, object) => value.ID == meterLocationID) })
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="form-group">

                        <label>Select Location</label>
                        <select className="form-control" value={this.props.LocationInfo.ID == null ? '0' : this.props.LocationInfo.ID} onChange={(evt) => {
                            if (evt.target.value != "0")
                                this.getDifferentMeterLocation(parseInt(evt.target.value));
                            else
                                this.props.UpdateState({
                                    LocationInfo: {
                                        ID: 0,
                                        LocationKey: '',
                                        Name: '',
                                        Alias: '',
                                        ShortName: '',
                                        Latitude: 0,
                                        Longitude: 0,
                                        Description: '',
                                    }
                                });
                        }}>
                            <option value="0">Add New</option>
                            {
                                (this.state.Locations != null ? this.state.Locations.map(ml => <option value={ml.ID} key={ml.ID}>{ml.LocationKey}</option>) : null)
                            }

                        </select>
                    </div>
                    <div className="form-group">

                        <label>Location Key</label>
                        <input className={(this.props.LocationInfo.LocationKey != null && this.props.LocationInfo.LocationKey.length > 0 && (this.state.Locations.map(a => a.LocationKey.toLowerCase()).indexOf(this.props.LocationInfo.LocationKey.toLowerCase()) < 0 || this.props.LocationInfo.ID != 0) ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                            var meterLocation: OpenXDA.Location = _.clone(this.props.LocationInfo, true);
                            if (evt.target.value != "")
                                meterLocation.LocationKey = evt.target.value;
                            else
                                meterLocation.LocationKey = null;

                            this.props.UpdateState({ LocationInfo: meterLocation });
                        }} value={this.props.LocationInfo.LocationKey == null ? '' : this.props.LocationInfo.LocationKey} disabled={this.props.LocationInfo.ID != 0} />
                        <div className='invalid-feedback'>{(this.state.Locations.map(a => a.LocationKey).indexOf(this.props.LocationInfo.LocationKey) < 0 ? 'A unique key is required.' : 'The key provided is not unique.')}</div>

                    </div>
                    <div className="form-group">

                        <label>Name</label>
                        <input className={(this.props.LocationInfo.Name != null && this.props.LocationInfo.Name.length > 0 ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                            var meterLocation: OpenXDA.Location = _.clone(this.props.LocationInfo, true);
                            if (evt.target.value != "")
                                meterLocation.Name = evt.target.value;
                            else
                                meterLocation.Name = null;

                            this.props.UpdateState({ LocationInfo: meterLocation });
                        }} value={this.props.LocationInfo.Name == null ? '' : this.props.LocationInfo.Name} disabled={this.props.LocationInfo.ID != 0}/>
                        <div className='invalid-feedback'>Name is a required field.</div>

                    </div>
                    <div className="form-group">

                        <label>Short Name</label>
                        <input className="form-control" onChange={(evt) => {
                            var meterLocation: OpenXDA.Location = _.clone(this.props.LocationInfo, true);
                            if (evt.target.value != "")
                                meterLocation.ShortName = evt.target.value;
                            else
                                meterLocation.ShortName = null;

                            this.props.UpdateState({ LocationInfo: meterLocation });
                        }} value={this.props.LocationInfo.ShortName == null ? '' : this.props.LocationInfo.ShortName} disabled={this.props.LocationInfo.ID != 0} />

                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label>Alias</label>
                        <input className="form-control" onChange={(evt) => {
                            var meterLocation: OpenXDA.Location = _.clone(this.props.LocationInfo, true);
                            if (evt.target.value != "")
                                meterLocation.Alias = evt.target.value;
                            else
                                meterLocation.Alias = null;

                            this.props.UpdateState({ LocationInfo: meterLocation });
                        }} value={this.props.LocationInfo.Alias == null ? '' : this.props.LocationInfo.Alias} disabled={this.props.LocationInfo.ID != 0}/>
                    </div>
                    <div className="form-group">


                        <label>Latitude</label>
                        <input className={(this.props.LocationInfo.Latitude != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                            var meterLocation: OpenXDA.Location = _.clone(this.props.LocationInfo, true);
                            if (evt.target.value != "")
                                meterLocation.Latitude = parseFloat(evt.target.value);
                            else
                                meterLocation.Latitude = null;

                            this.props.UpdateState({ LocationInfo: meterLocation });
                        }} value={this.props.LocationInfo.Latitude == null ? '' : this.props.LocationInfo.Latitude} type="number" step={3} disabled={this.props.LocationInfo.ID != 0}/>
                        <div className='invalid-feedback'>Latitude is a required field.</div>

                    </div>
                    <div className="form-group">

                        <label>Longitude</label>
                        <input className={(this.props.LocationInfo.Longitude != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                            var meterLocation: OpenXDA.Location = _.clone(this.props.LocationInfo, true);
                            if (evt.target.value != "")
                                meterLocation.Longitude = parseFloat(evt.target.value);
                            else
                                meterLocation.Longitude = null;

                            this.props.UpdateState({ LocationInfo: meterLocation });
                        }} value={this.props.LocationInfo.Longitude == null ? '' : this.props.LocationInfo.Longitude} type="number" step={3} disabled={this.props.LocationInfo.ID != 0} />
                        <div className='invalid-feedback'>Longitude is a required field.</div>

                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea rows={2} className="form-control" onChange={(evt) => {
                            var meterLocation: OpenXDA.Location = _.clone(this.props.LocationInfo, true);
                            if (evt.target.value != "")
                                meterLocation.Description = evt.target.value;
                            else
                                meterLocation.Description = null;

                            this.props.UpdateState({ LocationInfo: meterLocation });
                        }} value={this.props.LocationInfo.Description == null ? '' : this.props.LocationInfo.Description} disabled={this.props.LocationInfo.ID != 0}/>


                    </div>
                </div>
            </div>
        );
    }

}

