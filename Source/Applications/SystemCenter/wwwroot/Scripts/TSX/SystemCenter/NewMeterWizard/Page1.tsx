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
declare var homePath: string;

export default class Page1 extends React.Component<{ MeterInfo: OpenXDA.Meter, UpdateState: (record) => void }, { TimeZones: Array<ValueListItem>, MeterKeys: Array<string> }, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            TimeZones: [],
            MeterKeys: []
        }
    }

    componentDidMount() {
        this.getMeterKeys();
        this.getTimeZones();

    }


    getTimeZones(): void {
        if (sessionStorage.hasOwnProperty('NewMeterWizard.TimeZones'))
            this.setState({ TimeZones: JSON.parse(sessionStorage.getItem('NewMeterWizard.TimeZones')) });
        else
            $.ajax({
                type: "GET",
                url: `${homePath}api/ValueList/Group/TimeZones`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((tzs: Array<ValueListItem>) => {
                this.setState({ TimeZones: tzs });
                sessionStorage.setItem('NewMeterWizard.TimeZones', JSON.stringify(tzs));

            });
    }

    getMeterKeys(): void {
        if (sessionStorage.hasOwnProperty('NewMeterWizard.MeterKeys'))
            this.setState({ MeterKeys: JSON.parse(sessionStorage.getItem('NewMeterWizard.MeterKeys')) });
        else
            $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/Meter`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((meters: Array<OpenXDA.Meter>) => {
                var keys = meters.map(a => a.AssetKey.toLowerCase());
                this.setState({ MeterKeys: keys });
                sessionStorage.setItem('NewMeterWizard.MeterKeys', JSON.stringify(keys));
            });
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label>Key</label>
                        <input className={(this.props.MeterInfo.AssetKey != null && this.props.MeterInfo.AssetKey.length > 0 && this.state.MeterKeys.indexOf(this.props.MeterInfo.AssetKey.toLowerCase()) < 0 ? "form-control" : "form-control is-invalid" )} onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(this.props.MeterInfo, true);
                            if (evt.target.value != "")
                                meter.AssetKey = evt.target.value;
                            else
                                meter.AssetKey = null;

                            this.props.UpdateState({ MeterInfo: meter });
                        }} value={this.props.MeterInfo == null || this.props.MeterInfo.AssetKey == null ? '' : this.props.MeterInfo.AssetKey} required={true} />
                        <div className='invalid-feedback'>{(this.state.MeterKeys.indexOf(this.props.MeterInfo.AssetKey) < 0 ? 'A unique key is required.': 'The key provided is not unique.')}</div>
                    </div>
                    <div className="form-group">

                        <label>Name</label>
                        <input className={(this.props.MeterInfo.Name != null && this.props.MeterInfo.Name.length > 0 ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(this.props.MeterInfo, true);
                            if (evt.target.value != "")
                                meter.Name = evt.target.value;
                            else
                                meter.Name = null;

                            this.props.UpdateState({ MeterInfo: meter });
                        }} value={this.props.MeterInfo == null || this.props.MeterInfo.Name == null ? '' : this.props.MeterInfo.Name} />
                        <div className='invalid-feedback'>Name is a required field.</div>
                    </div>
                    <div className="form-group">

                        <label>Short Name</label>
                        <input className="form-control" onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(this.props.MeterInfo, true);
                            if (evt.target.value != "")
                                meter.ShortName = evt.target.value;
                            else
                                meter.ShortName = null;

                            this.props.UpdateState({ MeterInfo: meter });
                        }} value={this.props.MeterInfo == null || this.props.MeterInfo.ShortName == null ? '' : this.props.MeterInfo.ShortName} />
                    </div>
                    <div className="form-group">

                        <label>Alias</label>
                        <input className="form-control" onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(this.props.MeterInfo, true);
                            if (evt.target.value != "")
                                meter.Alias = evt.target.value;
                            else
                                meter.Alias = null;

                            this.props.UpdateState({ MeterInfo: meter });
                        }} value={this.props.MeterInfo == null || this.props.MeterInfo.Alias == null ? '' : this.props.MeterInfo.Alias} />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">

                        <label>Make</label>
                        <input className={(this.props.MeterInfo.Make != null && this.props.MeterInfo.Make.length > 0 ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(this.props.MeterInfo, true);
                            if (evt.target.value != "")
                                meter.Make = evt.target.value;
                            else
                                meter.Make = null;

                            this.props.UpdateState({ MeterInfo: meter });
                        }} value={this.props.MeterInfo == null || this.props.MeterInfo.Make == null ? '' : this.props.MeterInfo.Make} />
                        <div className='invalid-feedback'>Make is a required field.</div>
                    </div>
                    <div className="form-group">


                        <label>Model</label>
                        <input className={(this.props.MeterInfo.Model != null && this.props.MeterInfo.Model.length > 0 ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(this.props.MeterInfo, true);
                            if (evt.target.value != "")
                                meter.Model = evt.target.value;
                            else
                                meter.Model = null;

                            this.props.UpdateState({ MeterInfo: meter });
                        }} value={this.props.MeterInfo == null || this.props.MeterInfo.Model == null ? '' : this.props.MeterInfo.Model} />
                        <div className='invalid-feedback'>Model is a required field.</div>
                    </div>
                    <div className="form-group">

                        <label>Time Zone</label>
                        <select className="form-control" value={this.props.MeterInfo == null || this.props.MeterInfo.TimeZone == null ? '-1' : this.props.MeterInfo.TimeZone} onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(this.props.MeterInfo, true);
                            if (evt.target.value != "-1")
                                meter.TimeZone = evt.target.value;
                            else
                                meter.TimeZone = null;
                            this.props.UpdateState({ MeterInfo: meter });
                        }}>
                            <option value="-1">None Selected</option>
                            {
                                (this.state.TimeZones != null ? this.state.TimeZones.sort((a, b) => a.SortOrder - b.SortOrder).map(tz => <option value={tz.Text} key={tz.Text} disabled={!tz.Enabled} hidden={tz.Hidden}>{tz.AltText1}</option>) : null)
                            }
                        </select>
                    </div>
                    <div className="form-group">

                        <label>Description</label>
                        <textarea rows={2} className="form-control" onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(this.props.MeterInfo, true);
                            if (evt.target.value != "")
                                meter.Description = evt.target.value;
                            else
                                meter.Description = null;

                            this.props.UpdateState({ MeterInfo: meter });
                        }} value={this.props.MeterInfo == null || this.props.MeterInfo.Description == null ? '' : this.props.MeterInfo.Description} />


                    </div>
                </div>
            </div>
        );
    }

}

