//******************************************************************************************************
//  MeterInfo.tsx - Gbtc
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
//  09/09/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
import { OpenXDA, ValueListItem } from '../global';
declare var homePath: string;

export default class GeneralMeterInfoWindow extends React.Component<{ meter: OpenXDA.Meter, stateSetter: (meter: OpenXDA.Meter) => void }, { collapsed: boolean, changed: boolean, TimeZones: Array<ValueListItem> }, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);

        this.state = {
            collapsed: true,
            changed: false,
            TimeZones: null
        }

        this.addNewMeter = this.addNewMeter.bind(this);
    }


    componentDidMount() {
        this.getTimeZones();
    }

    componentWillReceiveProps(nextProps): void {
    }

    getMeter(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/One/${this.props.meter.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((meter: OpenXDA.Meter) => {
            this.props.stateSetter(meter)
            this.setState({ changed: false });
        });
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

    deleteMeter(): JQuery.jqXHR  {
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Meter/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.props.meter),
            dataType: 'json',
            cache: true,
            async: true
        });
    }


    updateMeter(): void {
       $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/Meter/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.props.meter),
            dataType: 'json',
            cache: true,
            async: true
       }).done((meter: OpenXDA.Meter) => {
           this.setState({ changed: false });
       });
    }

    addNewMeter(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();

        var meter: any = _.clone(this.props.meter, true);

        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Meter/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(meter),
            dataType: 'json',
            cache: true,
            async: true
        }).done((meter: OpenXDA.Meter) => {
            this.props.stateSetter(meter);
            this.setState({ changed: false });
        });
    }


    render() {
        if (this.props.meter == null) return null;
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>General Meter Information:</h4>
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
                                    <label>Asset Key</label>
                                    <input className={"form-control"} onChange={(evt) => {
                                        var meter: OpenXDA.Meter = _.clone(this.props.meter, true);
                                        if (evt.target.value != "")
                                            meter.AssetKey = evt.target.value;
                                        else
                                            meter.AssetKey = null;

                                        this.props.stateSetter(meter);
                                        this.setState({ changed: true });
                                    }} value={this.props.meter == null || this.props.meter.AssetKey == null ? '' : this.props.meter.AssetKey} required={true}/>
                                    <label>Name</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: OpenXDA.Meter  = _.clone(this.props.meter, true);
                                        if (evt.target.value != "")
                                            meter.Name = evt.target.value;
                                        else
                                            meter.Name = null;

                                        this.props.stateSetter(meter);
                                        this.setState({ changed: true });
                                    }} value={this.props.meter == null || this.props.meter.Name == null ? '' : this.props.meter.Name} />
                                    <label>Short Name</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: OpenXDA.Meter  = _.clone(this.props.meter, true);
                                        if (evt.target.value != "")
                                            meter.ShortName = evt.target.value;
                                        else
                                            meter.ShortName = null;

                                        this.props.stateSetter(meter);
                                        this.setState({ changed: true });
                                    }} value={this.props.meter == null || this.props.meter.ShortName == null ? '' : this.props.meter.ShortName} />
                                    <label>Alias</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: OpenXDA.Meter  = _.clone(this.props.meter, true);
                                        if (evt.target.value != "")
                                            meter.Alias = evt.target.value;
                                        else
                                            meter.Alias = null;

                                        this.props.stateSetter(meter);
                                        this.setState({ changed: true });
                                    }} value={this.props.meter == null || this.props.meter.Alias == null ? '' : this.props.meter.Alias} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">

                                    <label>Make</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: OpenXDA.Meter  = _.clone(this.props.meter, true);
                                        if (evt.target.value != "")
                                            meter.Make = evt.target.value;
                                        else
                                            meter.Make = null;

                                        this.props.stateSetter(meter);
                                        this.setState({ changed: true });
                                    }} value={this.props.meter == null || this.props.meter.Make == null ? '' : this.props.meter.Make} />
                                    <label>Model</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: OpenXDA.Meter  = _.clone(this.props.meter, true);
                                        if (evt.target.value != "")
                                            meter.Model = evt.target.value;
                                        else
                                            meter.Model = null;

                                        this.props.stateSetter(meter);
                                        this.setState({ changed: true });
                                    }} value={this.props.meter == null || this.props.meter.Model == null ? '' : this.props.meter.Model} />

                                    <label>Time Zone</label>
                                    <select className="form-control" value={this.props.meter == null || this.props.meter.TimeZone == null ? '-1' : this.props.meter.TimeZone} onChange={(evt) => {
                                        var meter: OpenXDA.Meter  = _.clone(this.props.meter, true);
                                        if (evt.target.value != "-1")
                                            meter.TimeZone = evt.target.value;
                                        else
                                            meter.TimeZone = null;
                                        this.props.stateSetter(meter);
                                        this.setState({ changed: true });
                                    }}>
                                        <option value="-1">None Selected</option>
                                        {
                                            (this.state.TimeZones != null ? this.state.TimeZones.sort((a, b) => a.SortOrder - b.SortOrder).map(tz => <option value={tz.Text} key={tz.Text} disabled={!tz.Enabled} hidden={tz.Hidden}>{tz.AltText1}</option>): null)
                                        }
                                    </select>

                                    <label>Description</label>
                                    <textarea rows={2} className="form-control" onChange={(evt) => {
                                        var meter: OpenXDA.Meter  = _.clone(this.props.meter, true);
                                        if (evt.target.value != "")
                                            meter.Description = evt.target.value;
                                        else
                                            meter.Description = null;

                                        this.props.stateSetter(meter);
                                        this.setState({ changed: true });
                                    }} value={this.props.meter == null || this.props.meter.Description == null ? '' : this.props.meter.Description} />


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className="btn btn-primary" onClick={this.addNewMeter} hidden={this.props.meter.ID != 0}  type="submit">Add New</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-primary" type="submit" onClick={() => this.updateMeter()} hidden={this.props.meter.ID == 0}  disabled={!this.state.changed}>Update</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-default" onClick={() => this.getMeter()} disabled={!this.state.changed}>Reset</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-danger" hidden={this.props.meter == null}  onClick={() => this.deleteMeter().done(() => window.location.href = homePath + 'index.cshtml?name=Meter')}>Delete Meter (Permanent)</button>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
