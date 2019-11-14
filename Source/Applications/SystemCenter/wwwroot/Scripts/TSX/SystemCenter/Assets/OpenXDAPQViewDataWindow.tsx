//******************************************************************************************************
//  OpenXDADataWindow.tsx - Gbtc
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
//  10/14/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';

declare var homePath: string;

export default class OpenXDAPQViewDataWindow extends React.Component<{ meterID: number}, { id: number,enabled: boolean, siteID: string, collapsed: boolean }, {}> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            enabled: false,
            siteID: '',
            collapsed: true,
            id: 0
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        this.getPQViewSite();
    }

    getPQViewSite(): void {
        if (this.props.meterID == undefined) return;
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/PQViewSite/${this.props.meterID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(pqviewSite => {
            if(pqviewSite != null)
                this.setState({ id: pqviewSite.ID, siteID: pqviewSite.SiteID, enabled: pqviewSite.Enabled })
        });
    }

    updatePQViewSite(): void {
        if (this.props.meterID == undefined) return;
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Meter/PQViewSite`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ID: this.state.id, MeterID: this.props.meterID, SiteID: this.state.siteID, Enabled: this.state.enabled}),
            async: true
        });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>PQView Site Information:</h4>
                        </div>
                        <div className="col">
                            <button className="btn btn-sm pull-right" onClick={(e) => this.setState({ collapsed: !this.state.collapsed })}><span><i className={(this.state.collapsed ? "fa fa-angle-left" : "fa fa-angle-down")}></i></span></button>
                        </div>
                    </div>
                </div>
                <div className={(this.state.collapsed ? "collapse in" : "collapse show")}>

                    <div className="card-body">
                        <form>
                            <label>Site ID:</label>
                            <input className="form-control" type="string" value={this.state.siteID} onChange={(evt) => {
                                this.setState({siteID: evt.target.value});
                            }} />

                            <div className='form-check'>
                                <input className="form-check-input" type="checkbox" checked={this.state.enabled} onChange={(evt) => {
                                    this.setState({enabled: !this.state.enabled});
                                }} />
                                <label className='form-check-label'>Enabled</label>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className='btn btn-primary' onClick={(evt) => {
                                evt.preventDefault()
                                this.updatePQViewSite();
                            }}>Update</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}