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
declare var homePath: string;

declare interface iMeter {
    AssetKey: string, Alias: string, CurrentStatus: string, DataFolder: string, Description: string, ID: number, InServiceDate: string, Make: string, Model: string, Name: string, RevisedBy: string, ShortName: string,
    TimeZone: string
}

export default class GeneralMeterInfoWindow extends React.Component<{ meterId: number }, { Meter: iMeter, collapsed: boolean, changed: boolean,TimeZones: any, CurrentStatuses: any }, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);

        this.state = {
            Meter: {
                AssetKey: '',
                Alias: '',
                CurrentStatus: '',
                DataFolder: '',
                Description: '',
                ID: 0,
                InServiceDate: '',
                Make: '',
                Model: '',
                Name: '',
                RevisedBy: '',
                ShortName: '',
                TimeZone: ''
            },
            collapsed: true,
            changed: false,
            TimeZones: {},
            CurrentStatuses: {}
        }
    }


    componentDidMount() {
        this.getTimeZones().done((tzs: any) => this.setState({ TimeZones: tzs }));
        this.getCurrentStatuses().done((cses: any) => this.setState({ CurrentStatuses: cses }));
        this.getMeter().done((meter: iMeter) => this.setState({ Meter: meter }));
    }
    handleAdd(): void {
        //addNote().done(e => {
        //    setNote('');
        //    createTableRows();
        //});
    }

    handleDelete(d) {
        //deleteNote(d.ID).done(() => createTableRows());
    }

    handleEdit(d) {
        //setNote(d.Note);
        //deleteNote(d.ID).done(() => createTableRows());
    }

    getMeter(): JQuery.jqXHR {
        if (this.jqueryHandle !== undefined)
            this.jqueryHandle.abort();

        this.jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/GeneralInfo/${this.props.meterId}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return this.jqueryHandle;
    }

    getTimeZones(): JQuery.jqXHR {
        var jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/GeneralInfo/TimeZones`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle;
    }

    getCurrentStatuses(): JQuery.jqXHR {
        var jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/GeneralInfo/CurrentStatuses`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle;
    }


    deleteMeter(): JQuery.jqXHR  {
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/Meter/GeneralInfo/${this.state.Meter.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }


    updateMeter(): JQuery.jqXHR {
       return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/Meter/GeneralInfo/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Meter),
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    render() {
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
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.AssetKey = evt.target.value;
                                        else
                                            meter.AssetKey = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.AssetKey == null ? '' : this.state.Meter.AssetKey} />
                                    <label>Name</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Name = evt.target.value;
                                        else
                                            meter.Name = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Name == null ? '' : this.state.Meter.Name} />
                                    <label>Short Name</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.ShortName = evt.target.value;
                                        else
                                            meter.ShortName = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.ShortName == null ? '' : this.state.Meter.ShortName} />
                                    <label>Alias</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Alias = evt.target.value;
                                        else
                                            meter.Alias = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Alias == null ? '' : this.state.Meter.Alias} />


                                    <label>Current Status</label>
                                    <select className="form-control" value={this.state.Meter.CurrentStatus == null ? '-1' : this.state.Meter.CurrentStatus} onChange={(evt) => {
                                        var meter: iMeter = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "-1")
                                            meter.CurrentStatus = evt.target.value;
                                        else
                                            meter.CurrentStatus = null;
                                        this.setState({ Meter: meter, changed: true });
                                    }}>
                                        <option value="-1">None Selected</option>
                                        {
                                            Object.keys(this.state.CurrentStatuses).map(cs => <option value={cs} key={cs}>{this.state.CurrentStatuses[cs]}</option>)
                                        }
                                    </select>


                                    <label>Revised By</label>
                                    <input className="form-control readonly" value={this.state.Meter.RevisedBy == null ? '' : this.state.Meter.RevisedBy} readOnly />


                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>In Service Date</label>
                                    <input type="date" className="form-control" onChange={(evt) => {
                                        var meter: iMeter = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.InServiceDate = evt.target.value;
                                        else
                                            meter.InServiceDate = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.InServiceDate == null ? '' : this.state.Meter.InServiceDate} />

                                    <label>Data Folder</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.DataFolder = evt.target.value;
                                        else
                                            meter.DataFolder = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.DataFolder == null ? '' : this.state.Meter.DataFolder} />

                                    <label>Make</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Make = evt.target.value;
                                        else
                                            meter.Make = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Make == null ? '' : this.state.Meter.Make} />
                                    <label>Model</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Model = evt.target.value;
                                        else
                                            meter.Model = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Model == null ? '' : this.state.Meter.Model} />

                                    <label>Time Zone</label>
                                    <select className="form-control" value={this.state.Meter.TimeZone == null ? '-1' : this.state.Meter.TimeZone} onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "-1")
                                            meter.TimeZone = evt.target.value;
                                        else
                                            meter.TimeZone = null;
                                        this.setState({ Meter: meter, changed: true });
                                    }}>
                                        <option value="-1">None Selected</option>
                                        {
                                            Object.keys(this.state.TimeZones).map(tz => <option value={tz} key={tz}>{this.state.TimeZones[tz]}</option>)
                                        }
                                    </select>

                                    <label>Description</label>
                                    <textarea rows={2} className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Description = evt.target.value;
                                        else
                                            meter.Description = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Description == null ? '' : this.state.Meter.Description} />


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className="btn btn-primary" onClick={() => this.updateMeter().done((meter: iMeter) => this.setState({ Meter: meter, changed: false }))}  disabled={!this.state.changed}>Update</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-default" onClick={() => this.getMeter().done((meter: iMeter) => this.setState({ Meter: meter, changed: false }))} disabled={!this.state.changed}>Reset</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-danger" onClick={() => this.deleteMeter().done(() => window.location.href = homePath + 'SystemCenter/index.cshtml?name=Meters')}>Delete Meter (Permanent)</button>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
