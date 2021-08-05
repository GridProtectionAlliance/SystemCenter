//******************************************************************************************************
//  MeterTrendChannel.tsx - Gbtc
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
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { toNumber } from 'lodash';

declare var homePath: string;

export default class MeterTrendChannelWindow extends React.Component<{ Meter: OpenXDA.Types.Meter, IsVisible: boolean }, { Channels: Array<OpenXDA.Types.Channel>, Phases: Array<OpenXDA.Types.Phase>, MeasurementTypes: Array<OpenXDA.Types.MeasurementType>, MeasurementCharacteristics: Array<OpenXDA.Types.MeasurementCharacteristic>, AllAssets: Array<OpenXDA.Types.Asset> }, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            Channels: [],
            Phases: [],
            MeasurementTypes: [],
            MeasurementCharacteristics: [],
            AllAssets: []
        }

        this.getChannels = this.getChannels.bind(this);
        this.updateChannels = this.updateChannels.bind(this);
    }

    componentDidMount() {
        // If tab is not visible,
        // defer initialization until
        // tab becomes visible
        if (!this.props.IsVisible)
            return;

        this.getPhases();
        this.getAssets();
        this.getMeasurementTypes();
        this.getMeasurementCharacteristics();
        this.getChannels();
    }

    static getDerivedStateFromProps(props, state) {
        // If tab is not visible,
        // clear state because user may be modifying
        // state of channels in another tab
        if (!props.IsVisible && state.Channels.length > 0)
            return { Channels: [] };

        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // If tab is not visible, don't bother rendering
        if (!nextProps.IsVisible)
            return false;

        // If tab becomes visible, reinitialize to receive the latest state
        if (!this.props.IsVisible && nextProps.IsVisible) {
            this.getPhases();
            this.getAssets();
            this.getMeasurementTypes();
            this.getMeasurementCharacteristics();
            this.getChannels();
        }

        return true;
    }

    getChannels(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Channels/Trend`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((channels: Array<any>) => {
            let makeChannels = channels.map(channel => channel as OpenXDA.Types.Channel)
            this.setState({ Channels:  makeChannels})
        });
    }

    updateChannels(): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Channel/Update/Trend`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({Channels: this.state.Channels}),
            cache: false,
            async: true
        }).done(() => {
            this.getChannels();
        }).fail(msg => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                this.getChannels();
            }
        });;
    }


    getAssets(): void {
            $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Asset`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((assets: Array<OpenXDA.Types.Asset>) => {
                this.setState({ AllAssets: assets })
            });
    }



    getPhases(): void {
        if (sessionStorage.hasOwnProperty('SystemCenter.Phases'))
            this.setState({ Phases: JSON.parse(sessionStorage.getItem('SystemCenter.Phases')) });
        else
            $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/Phase`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((phases: Array<OpenXDA.Types.Phase>) => {
                this.setState({ Phases: phases })
                sessionStorage.setItem('NewMeterWizard.Phases', JSON.stringify(phases));
            });
    }

    getMeasurementTypes(): void {
        if (sessionStorage.hasOwnProperty('OpenXDA.MeasurementTypes'))
            this.setState({ MeasurementTypes: JSON.parse(sessionStorage.getItem('OpenXDA.MeasurementTypes')) });
        else
            $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/MeasurementType`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((measurementTypes: Array<OpenXDA.Types.MeasurementType>) => {
                this.setState({ MeasurementTypes: measurementTypes })
                sessionStorage.setItem('OpenXDA.MeasurementTypes', JSON.stringify(measurementTypes));
            });
    }

    getMeasurementCharacteristics(): void {
        if (sessionStorage.hasOwnProperty('OpenXDA.MeasurementCharacteristics'))
            this.setState({ MeasurementTypes: JSON.parse(sessionStorage.getItem('OpenXDA.MeasurementCharacteristics')) });
        else
            $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/MeasurementCharacteristic`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((measurementCharacteristics: Array<OpenXDA.Types.MeasurementCharacteristic>) => {
                this.setState({ MeasurementCharacteristics: measurementCharacteristics })
                sessionStorage.setItem('OpenXDA.MeasurementCharacteristics', JSON.stringify(measurementCharacteristics));
            });
    }

    deleteChannel(index: number): void {
        let channels: Array<OpenXDA.Types.Channel> = _.clone(this.state.Channels);
        let record: OpenXDA.Types.Channel = channels.splice(index, 1)[0];
        this.setState({ Channels: channels });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Channels:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' }}>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Desc</th>
                                    <th>Type</th>
                                    <th>Characteristic</th>
                                    <th>Phase</th>
                                    <th>Harmonic</th>
                                    <th>Adder</th>
                                    <th>Multiplier</th>
                                    <th>Asset</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Channels.map((channel, index, array) => {
                                        return (
                                            <tr key={index}>
                                                <td style={{ width: '15%' }}><input className='form-control' value={channel.Name} onChange={(event) => {
                                                    channel.Name = event.target.value;
                                                    this.setState({ Channels: array });
                                                }} /></td>
                                                <td style={{ width: '20%' }}><input className='form-control' value={channel.Description == null ? '' : channel.Description} onChange={(event) => {
                                                    channel.Description = event.target.value;
                                                    this.setState({ Channels: array });
                                                }} /></td>
                                                <td style={{ width: '10%' }}>{<select className='form-control' value={channel.MeasurementType} onChange={(event) => {
                                                    channel.MeasurementType = event.target.value;
                                                    this.setState({ Channels: array });
                                                }}>{this.state.MeasurementTypes.map(a => <option key={a.ID} value={a.Name}>{a.Name}</option>)}</select>}</td>
                                                <td style={{ width: '10%' }}>{<select className='form-control' value={channel.MeasurementCharacteristic} onChange={(event) => {
                                                    channel.MeasurementCharacteristic = event.target.value;
                                                    this.setState({ Channels: array });
                                                }}>{this.state.MeasurementCharacteristics.map(a => <option key={a.ID} value={a.Name}>{a.Name}</option>)}</select>}</td>
                                                <td style={{ width: '10%' }}>{<select className='form-control' value={channel.Phase} onChange={(event) => {
                                                    channel.Phase = event.target.value;
                                                    this.setState({ Channels: array });
                                                }}>{this.state.Phases.map(a => <option key={a.ID} value={a.Name}>{a.Name}</option>)}</select>}</td>
                                                <td style={{ width: '5%' }}><input className='form-control' value={channel.HarmonicGroup} onChange={(event) => {
                                                    channel.HarmonicGroup = toNumber(event.target.value);
                                                    this.setState({ Channels: array });
                                                }} /></td>
                                                <td style={{ width: '5%' }}><input className='form-control' value={channel.Adder} onChange={(event) => {
                                                    channel.Adder = toNumber(event.target.value);
                                                    this.setState({ Channels: array });
                                                }} /></td>
                                                <td style={{ width: '5%' }}><input className='form-control' value={channel.Multiplier} onChange={(event) => {
                                                    channel.Multiplier = toNumber(event.target.value);
                                                    this.setState({ Channels: array });
                                                }} /></td>
                                                <td style={{ width: '10%' }}>{<select className='form-control' value={channel.Asset} onChange={(event) => {
                                                    channel.Asset = event.target.value;
                                                    this.setState({ Channels: array });
                                                }}>
                                                    <option value=""></option>
                                                    {this.state.AllAssets.map(a => <option key={a.ID} value={a.AssetKey}>{a.AssetKey}</option>)}</select>}</td>
                                                <td style={{ width: '5%' }}>
                                                    <button className="btn btn-sm" onClick={(e) => this.deleteChannel(index)}><span><i className="fa fa-times"></i></span></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary pull-right" onClick={() => {
                            let channel: OpenXDA.Types.Channel = { ID: 0, Meter: this.props.Meter.AssetKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'RMS', Phase: 'AN', Name: 'VAN RMS', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN RMS', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Maximum', SourceIndexes: '' }, { ID: 0, ChannelID: 0, SeriesType: 'Minimum', SourceIndexes: '' }, { ID: 0, ChannelID: 0, SeriesType: 'Average', SourceIndexes: '' }] } as OpenXDA.Types.Channel
                            let channels: Array<OpenXDA.Types.Channel> = _.clone(this.state.Channels);
                            channels.push(channel);
                            this.setState({ Channels: channels });
                        }}>Add Channel</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary pull-right" onClick={this.updateChannels}>Save Changes</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={this.getChannels}>Clear Changes</button>
                    </div>
                </div>
            </div>
        );
    }
}

