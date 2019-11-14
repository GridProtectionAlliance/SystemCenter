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
import { OpenXDAMeter, OpenXDALine, OpenXDASCMeterLine } from '../global';
declare var homePath: string;

export default class TransmissionElementWindow extends React.Component<{ meter: OpenXDAMeter }, { allLines : Array<OpenXDASCMeterLine>,lines: Array<OpenXDALine>, collapsed: boolean, changed: boolean, addNew: boolean, newEditMeterLine: OpenXDASCMeterLine }, {}> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            addNew: false,
            collapsed: true,
            changed: false,
            newEditMeterLine: this.createOpenXDAMeterLine(),
            lines: [],
            allLines: []
        }
    }

    createOpenXDAMeterLine(): OpenXDASCMeterLine {
        var record: OpenXDASCMeterLine = {
            ID: 0,
            AssetKey: '',
            VoltageKV: null,
            ThermalRating: null,
            Length: null,
            MaxFaultDistance: null,
            MinFaultDistance: null,
            Description: '',
            LineName: '',
            LineImpedanceID: null,
            R0: null,
            R1: null, 
            X0: null,
            X1: null
        }

        return record;
    
    }

    enableSaveLine():boolean {
        return (
            this.state.newEditMeterLine.AssetKey.length > 0 &&
            this.state.newEditMeterLine.LineName.length > 0 &&
            this.state.newEditMeterLine.VoltageKV != null &&
            this.state.newEditMeterLine.ThermalRating != null &&
            this.state.newEditMeterLine.Length != null
        );
    }

    getLines(): void {
        if (this.props.meter.ID == undefined) return;
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Line/Meter/${this.props.meter.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((lines: Array<OpenXDALine>) => this.setState({ lines: lines }));
    }

    getAllLines(): void {
        if (this.props.meter.ID == undefined) return;
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Line/AllLines`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((lines: Array<OpenXDASCMeterLine>) => {
            this.setState({ allLines: lines })
        });
    }

    addLineToMeter(): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Line/MeterLine`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                Line: {
                    ID: this.state.newEditMeterLine.ID,
                    AssetKey: this.state.newEditMeterLine.AssetKey,
                    VoltageKV: this.state.newEditMeterLine.VoltageKV,
                    ThermalRating: this.state.newEditMeterLine.ThermalRating,
                    Length: this.state.newEditMeterLine.Length,
                    MaxFaultDistance: this.state.newEditMeterLine.MaxFaultDistance,
                    MinFaultDistance: this.state.newEditMeterLine.MinFaultDistance,
                    Description: this.state.newEditMeterLine.Description
                },
                LineImpedance: {
                    ID: this.state.newEditMeterLine.LineImpedanceID,
                    LineID: this.state.newEditMeterLine.ID,
                    R0: this.state.newEditMeterLine.R0,
                    R1: this.state.newEditMeterLine.R1,
                    X0: this.state.newEditMeterLine.X0,
                    X1: this.state.newEditMeterLine.X1
                },
                MeterLine: {
                    ID: 0,
                    LineID: this.state.newEditMeterLine.ID,
                    MeterID: this.props.meter.ID,
                    LineName: this.state.newEditMeterLine.LineName
                }
            }),
            cache: false,
            async: true
        }).done(response => this.getLines());
    }

    componentDidMount() {
        this.getAllLines();
        this.getLines();
    }

    render() {
        return (
        <>
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Lines:</h4>
                        </div>
                        <div className="col">
                            <button className="btn btn-sm pull-right" onClick={(e) => this.setState({collapsed: !this.state.collapsed})}><span><i className={(this.state.collapsed ? "fa fa-angle-left" : "fa fa-angle-down")}></i></span></button>
                        </div>
                    </div>
                </div>
                <div className={(this.state.collapsed ? "collapse in" : "collapse show")}>
                    <div className="card-body">
                        <ul>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                                <button className='btn btn-primary' data-toggle="modal" data-target="#LineModal" onClick={(evt) => {
                                    evt.preventDefault()
                                    this.setState({ addNew: true });
                                }} >Add New Line</button>
                        </div>
                    </div>

                </div>

            </div>

            <div className="modal" id="LineModal">
                    <div className="modal-dialog modal-lg" style={{width:'75%'}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.state.addNew ? "Add New Line" : "Edit Line"} </h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label>Line:</label>
                                    <select className='form-control' value={this.state.newEditMeterLine.ID} onChange={(evt) => {
                                        if (parseInt(evt.target.value) == 0) {
                                            this.setState({ newEditMeterLine: this.createOpenXDAMeterLine() });
                                        }
                                        else {
                                            this.setState({newEditMeterLine: this.state.allLines.find(x=> x.ID == parseInt(evt.target.value))});
                                        }
                                    }}>
                                        <option value={0}>Add New Line</option>
                                        {
                                            this.state.allLines.map((value, index, array) => <option key={value.ID} value={value.ID}>{value.AssetKey}</option>)
                                        }
                                    </select>

                                <label>AssetKey: {(this.state.newEditMeterLine.AssetKey.length == 0 ? <span style={{color: 'darkred'}}><i>* Required</i></span>: null)}</label>
                                <input className='form-control' type='text' value={this.state.newEditMeterLine.AssetKey} style={{ border: (this.state.newEditMeterLine.AssetKey.length == 0 ?'2px solid darkred': null)}} onChange={(evt) => {
                                    var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                    record.AssetKey = evt.target.value;
                                    this.setState({ newEditMeterLine: record })
                                }} />

                                <label>Line Name: {(this.state.newEditMeterLine.LineName.length == 0 ? <span style={{color: 'darkred'}}><i>* Required</i></span>: null)}</label>
                                    <input className='form-control' type='text' value={this.state.newEditMeterLine.LineName} style={{ border: (this.state.newEditMeterLine.LineName.length == 0 ?'2px solid darkred': null)}} onChange={(evt) => {
                                    var record:OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                    record.LineName = evt.target.value;
                                    this.setState({ newEditMeterLine: record })
                                }} />

                                <label>Description:</label>
                                    <textarea rows={2} className='form-control' value={this.state.newEditMeterLine.Description} onChange={(evt) => {
                                    var record:OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                    record.Description = evt.target.value;
                                    this.setState({ newEditMeterLine: record })
                                }} />

                                <div className="row">
                                    <div className="col">
                                        <label>Voltage (kV): {(this.state.newEditMeterLine.VoltageKV == null ? <span style={{color: 'darkred'}}><i>* Required</i></span>: null)}</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.VoltageKV} style={{ border: (this.state.newEditMeterLine.VoltageKV == null ? '2px solid darkred' : null) }} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.VoltageKV = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />

                                        <label>Thermal Rating: : {(this.state.newEditMeterLine.ThermalRating == null ? <span style={{color: 'darkred'}}><i>* Required</i></span>: null)}</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.ThermalRating} style={{ border: (this.state.newEditMeterLine.ThermalRating == null ? '2px solid darkred' : null) }} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.ThermalRating = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />

                                        <label>Length: : {(this.state.newEditMeterLine.Length == null ? <span style={{color: 'darkred'}}><i>* Required</i></span>: null)}</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.Length} style={{ border: (this.state.newEditMeterLine.Length == null ? '2px solid darkred' : null) }} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.Length = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />

                                        <label>Maximum Fault Distance:</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.MaxFaultDistance} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.MaxFaultDistance = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />

                                        <label>Minimum Fault Distance:</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.MinFaultDistance} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.MinFaultDistance = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />
                                    </div>
                                    <div className="col">
                                        <label>R0:</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.R0} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.R0 = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />

                                        <label>X0:</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.X0} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.X0 = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />

                                        <label>R1:</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.R1} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.R1 = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />

                                        <label>X1:</label>
                                            <input className='form-control' type='number' value={this.state.newEditMeterLine.X1} onChange={(evt) => {
                                            var record: OpenXDASCMeterLine = _.clone(this.state.newEditMeterLine)
                                            record.X1 = parseFloat(evt.target.value);
                                            this.setState({ newEditMeterLine: record })
                                        }} />
                                    </div>

                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" disabled={!this.enableSaveLine()} onClick={(evt) => {
                                this.addLineToMeter()
                            }} >Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                //this.setState({ newEditName: '', newEditID: 0 });
                            }}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
        );
    }
}
