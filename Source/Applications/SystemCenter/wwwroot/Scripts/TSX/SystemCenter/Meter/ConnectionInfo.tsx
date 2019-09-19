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

declare interface iMeter {
    Phone: string,
    ConnectionIP: string,
    InternalIP: string,
    Gateway: string,
    Subnet: string,
    UnitID: string,
    UserID: string,
    Password: string,
    ConnectionType: string,
    DLHost: string,
    Callback: string
}

export default class ConnectionInfoWindow extends React.Component<{ meterId: number }, { Meter: iMeter, collapsed: boolean, changed: boolean}, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);

        this.state = {
            Meter: {
                Phone: '',
                ConnectionIP: '',
                InternalIP: '',
                Gateway: '',
                Subnet: '',
                UnitID: '',
                UserID: '',
                Password: '',
                ConnectionType: '',
                DLHost: '',
                Callback: '',
            },
            collapsed: true,
            changed: false,
        }
    }


    componentDidMount() {
        this.getMeter().done((meter: iMeter) => this.setState({ Meter: meter }));
    }

    getMeter(): JQuery.jqXHR {
        if (this.jqueryHandle !== undefined)
            this.jqueryHandle.abort();

        this.jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/ConnectionInfo/${this.props.meterId}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return this.jqueryHandle;
    }

    updateMeter(): JQuery.jqXHR {
        var meter: any = _.clone(this.state.Meter, true);
        meter.ID = this.props.meterId;
       return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/Meter/ConnectionInfo/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(meter),
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
                            <h4>Connection Information:</h4>
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
                                    <label>Phone</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Phone = evt.target.value;
                                        else
                                            meter.Phone = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Phone == null ? '' : this.state.Meter.Phone} />
                                    <label>ConnectionIP</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.ConnectionIP = evt.target.value;
                                        else
                                            meter.ConnectionIP = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.ConnectionIP == null ? '' : this.state.Meter.ConnectionIP} />
                                    <label>InternalIP</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.InternalIP = evt.target.value;
                                        else
                                            meter.InternalIP = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.InternalIP == null ? '' : this.state.Meter.InternalIP} />
                                    <label>Gateway</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Gateway = evt.target.value;
                                        else
                                            meter.Gateway = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Gateway == null ? '' : this.state.Meter.Gateway} />

                                    <label>Subnet</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Subnet = evt.target.value;
                                        else
                                            meter.Subnet = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Subnet == null ? '' : this.state.Meter.Subnet} />


       
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>UnitID</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.UnitID = evt.target.value;
                                        else
                                            meter.UnitID = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.UnitID == null ? '' : this.state.Meter.UnitID} />

                                    <label>Password</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.Password = evt.target.value;
                                        else
                                            meter.Password = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.Password == null ? '' : this.state.Meter.Password} />
                                    <label>ConnectionType</label>
                                    <select className="form-control" value={this.state.Meter.ConnectionType == null ? '-1' : this.state.Meter.ConnectionType} onChange={(evt) => {
                                        var meter: iMeter = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "-1")
                                            meter.ConnectionType = evt.target.value;
                                        else
                                            meter.ConnectionType = null;
                                        this.setState({ Meter: meter, changed: true });
                                    }}>
                                        <option value="-1">None Selected</option>
                                        <option value="Dialup Modem">Dialup Modem</option>
                                        <option value="LPC - Bandit">LPC - Bandit</option>
                                        <option value="TVA Corporate Network">TVA Corporate Network</option>
                                        <option value="PowerWAN">PowerWAN</option>
                                        <option value="Satellite - Bandit">Satellite - Bandit</option>
                                        <option value="Cellular - Bandit">Cellular - Bandit</option>
                                        <option value="External Network">External Network</option>
                                        <option value="PowerWAN">PowerWAN</option>
                                    </select>

                                    <label>DLHost</label>
                                    <input className="form-control" onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "")
                                            meter.DLHost = evt.target.value;
                                        else
                                            meter.DLHost = null;

                                        this.setState({ Meter: meter, changed: true });
                                    }} value={this.state.Meter.DLHost == null ? '' : this.state.Meter.DLHost} />
                                    <label>Callback</label>
                                    <select className="form-control" value={this.state.Meter.Callback == null ? '-1' : this.state.Meter.Callback} onChange={(evt) => {
                                        var meter: iMeter  = _.clone(this.state.Meter, true);
                                        if (evt.target.value != "-1")
                                            meter.Callback = evt.target.value;
                                        else
                                            meter.Callback = null;
                                        this.setState({ Meter: meter, changed: true });
                                    }}>
                                        <option value="-1">None Selected</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
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
                    </div>

                </div>

            </div>
        );
    }
}
