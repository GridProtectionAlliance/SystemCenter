//******************************************************************************************************
//  MeterChannelScaling.tsx - Gbtc
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

declare let homePath: string;

enum ChannelScalingType {
    Voltage,
    Current,
    PowerAndEnergy,
    Impedance,
    NoScaling
}

class ChannelScalingWrapper {
    private _ScalingType: ChannelScalingType;
    private _Channel: OpenXDA.Types.Channel;
    private MeasurementType: OpenXDA.Types.MeasurementType;
    private MeasurementCharacteristic: OpenXDA.Types.MeasurementCharacteristic;
    private Phase: OpenXDA.Types.Phase;
    private _ReplacedMultiplier: number;
    private _AdjustedMultiplier: number;

    constructor(channel: OpenXDA.Types.Channel, measurementType: OpenXDA.Types.MeasurementType, measurementCharacteristic: OpenXDA.Types.MeasurementCharacteristic, phase: OpenXDA.Types.Phase) {
        this._Channel = channel;
        this.MeasurementType = measurementType;
        this.MeasurementCharacteristic = measurementCharacteristic;
        this.Phase = phase;
        this._ScalingType = this.DeriveScalingType();
        this.ReplacedMultiplier = channel.Multiplier;
        this.AdjustedMultiplier = channel.Multiplier;
    }

    get Channel() {
        return this._Channel;
    }

    get Descriptor() {
        return <>
            {this._Channel.Name}<br />
            {this._Channel.Description}<br />
            {this._Channel.Asset}
        </>;
    }

    get Identity() {
        return <>
            {this.MeasurementType.Name}<br />
            {this.MeasurementCharacteristic.Name}<br />
            {this.Phase.Name}
        </>;
    }

    get ScalingType() {
        return this._ScalingType;
    }
    set ScalingType(value) {
        this._ScalingType = value;
    }

    get ScalingTypeName() {
        return ChannelScalingType[this.ScalingType];
    }

    get ReplacedMultiplier() {
        return this._ReplacedMultiplier;
    }
    set ReplacedMultiplier(value) {
        this._ReplacedMultiplier = value;
    }

    get AdjustedMultiplier() {
        return this._AdjustedMultiplier;
    }
    set AdjustedMultiplier(value) {
        this._AdjustedMultiplier = value;
    }

    CalculateMultiplier(voltageMultiplier: number, currentMultiplier: number) {
        switch (this.ScalingType) {
            case ChannelScalingType.Voltage:
                return voltageMultiplier;
            case ChannelScalingType.Current:
                return currentMultiplier;
            case ChannelScalingType.PowerAndEnergy:
                return voltageMultiplier * currentMultiplier;
            case ChannelScalingType.Impedance:
                return voltageMultiplier / currentMultiplier;
            default:
                return 1;
        }
    }

    private DeriveScalingType() {
        if (this.MeasurementType.Name === "Voltage") {
            if (this.MeasurementCharacteristic.Name === "Instantaneous")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "Peak")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "RMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "HRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "IHRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "TotalTHDRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "OddTHDRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "EvenTHDRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "TIDRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "TIFRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "SPos")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "SNeg")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "SZero")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic.Name === "SpectraHGroup")
                return ChannelScalingType.Voltage;
        }
        if (this.MeasurementType.Name === "Current") {
            if (this.MeasurementCharacteristic.Name === "Instantaneous")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "Peak")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "RMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "RMSDemand")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "RMSPeakDemand")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "HRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "IHRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "TotalTHDRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "OddTHDRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "EvenTHDRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "TIDRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "SPos")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "SNeg")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "SZero")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic.Name === "SpectraHGroup")
                return ChannelScalingType.Current;
        }
        if (this.MeasurementType.Name === "Power") {
            if (this.MeasurementCharacteristic.Name === "P")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "Q")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "S")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PPeakDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QPeakDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SPeakDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PPredDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QPredDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SPredDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PCoQDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PCoSDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QCoPDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QCoSDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SCoPDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SCoQDemand")
                return ChannelScalingType.PowerAndEnergy
            if (this.MeasurementCharacteristic.Name === "PHarmonic")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PHarmonicUnsigned")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SVector")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SVectorFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SArith")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SArithFund")
                return ChannelScalingType.PowerAndEnergy;
        }
        if (this.MeasurementType.Name === "Energy") {
            if (this.MeasurementCharacteristic.Name === "PIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIntgPos")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIntgPosFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIntgNeg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIntgNegFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIntgPos")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIntgPosFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIntgNeg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIntgNegFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SIntgFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIVLIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIVLIntgPos")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIVLIntgPosFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIVLIntgNeg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "PIVLIntgNegFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIVLIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIVLIntgPos")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIVLIntgPosFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIVLIntgNeg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "QIVLIntgNegFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SIVLIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic.Name === "SIVLIntgFund")
                return ChannelScalingType.PowerAndEnergy;
        }
        return ChannelScalingType.NoScaling;
    }
}

export default class ChannelScalingWindow extends React.Component<{ Meter: OpenXDA.Types.Meter, IsVisible: boolean }, { VoltageMultiplier: number, CurrentMultiplier: number, Wrappers: ChannelScalingWrapper[], ScalingTypes: ChannelScalingType[] }, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            VoltageMultiplier: 1,
            CurrentMultiplier: 1,
            Wrappers: [],
            ScalingTypes: [
                ChannelScalingType.Voltage,
                ChannelScalingType.Current,
                ChannelScalingType.PowerAndEnergy,
                ChannelScalingType.Impedance,
                ChannelScalingType.NoScaling
            ]
        }

        this.initializeWrappers = this.initializeWrappers.bind(this);
        this.useReplacedMultiplier = this.useReplacedMultiplier.bind(this);
        this.useAdjustedMultiplier = this.useAdjustedMultiplier.bind(this);
    }

    componentDidMount() {
        // If tab is not visible,
        // defer initialization until
        // tab becomes visible
        if (!this.props.IsVisible)
            return;

        this.initializeWrappers();
    }

    static getDerivedStateFromProps(props, state) {
        // If tab is not visible,
        // clear state because user may be modifying
        // state of channels in another tab
        if (!props.IsVisible && state.Wrappers.length > 0)
            return { Wrappers: [] };

        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // If tab is not visible, don't bother rendering
        if (!nextProps.IsVisible)
            return false;

        // If tab becomes visible, reinitialize to receive the latest state
        if (!this.props.IsVisible && nextProps.IsVisible)
            this.initializeWrappers();

        return true;
    }

    async initializeWrappers(): Promise<void> {
        const promises: [
            Promise<OpenXDA.Types.Channel[]>,
            Promise<OpenXDA.Types.MeasurementType[]>,
            Promise<OpenXDA.Types.MeasurementCharacteristic[]>,
            Promise<OpenXDA.Types.Phase[]>
        ] = [
            this.queryChannels(),
            this.queryMeasurementTypes(),
            this.queryMeasurementCharacteristics(),
            this.queryPhases()
        ];

        const [channels, measurementTypes, measurementCharacteristics, phases] = await Promise.all(promises);

        const wrappers = channels.map(channel => {
            const measurementType = measurementTypes.find(measurementType => measurementType.Name === channel.MeasurementType);
            const measurementCharacteristic = measurementCharacteristics.find(measurementCharacteristic => measurementCharacteristic.Name === channel.MeasurementCharacteristic);
            const phase = phases.find(phase => phase.Name === channel.Phase);
            return new ChannelScalingWrapper(channel, measurementType, measurementCharacteristic, phase);
        });

        const voltageMultiplier = this.getBaseVoltageMultiplier(wrappers);
        const currentMultiplier = this.getBaseCurrentMultiplier(wrappers);

        for (const wrapper of wrappers) {
            const newMultiplier = wrapper.CalculateMultiplier(voltageMultiplier, currentMultiplier);
            wrapper.ReplacedMultiplier = newMultiplier;
        }

        this.setState({
            VoltageMultiplier: this.getBaseVoltageMultiplier(wrappers),
            CurrentMultiplier: this.getBaseCurrentMultiplier(wrappers),
            Wrappers: wrappers
        });
    }

    async queryChannels(): Promise<Array<OpenXDA.Types.Channel>> {
        const channels = await $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Channels`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: true,
            async: true
        });

        return channels.map(channel => channel as OpenXDA.Types.Channel);
    }

    async queryMeasurementTypes(): Promise<Array<OpenXDA.Types.MeasurementType>> {
        if (sessionStorage.hasOwnProperty("OpenXDA.MeasurementTypes"))
            return JSON.parse(sessionStorage.getItem("OpenXDA.MeasurementTypes"));

        const measurementTypes: Array<OpenXDA.Types.MeasurementType> = await $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/MeasurementType`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: true,
            async: true
        });

        sessionStorage.setItem("OpenXDA.MeasurementTypes", JSON.stringify(measurementTypes));
        return measurementTypes;
    }

    async queryMeasurementCharacteristics(): Promise<Array<OpenXDA.Types.MeasurementCharacteristic>> {
        if (sessionStorage.hasOwnProperty("OpenXDA.MeasurementCharacteristics"))
            return JSON.parse(sessionStorage.getItem("OpenXDA.MeasurementCharacteristics"));

        const measurementCharacteristics: Array<OpenXDA.Types.MeasurementCharacteristic> = await $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/MeasurementCharacteristic`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: true,
            async: true
        });

        sessionStorage.setItem("OpenXDA.MeasurementCharacteristics", JSON.stringify(measurementCharacteristics));
        return measurementCharacteristics;
    }

    async queryPhases(): Promise<Array<OpenXDA.Types.Phase>> {
        if (sessionStorage.hasOwnProperty("OpenXDA.Phases"))
            return JSON.parse(sessionStorage.getItem("OpenXDA.Phases"));

        const phases: Array<OpenXDA.Types.Phase> = await $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Phase`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: true,
            async: true
        });

        sessionStorage.setItem("OpenXDA.Phases", JSON.stringify(phases));
        return phases;
    }

    getBaseVoltageMultiplier(wrappers: ChannelScalingWrapper[]): number {
        for (const wrapper of wrappers) {
            if (wrapper.ScalingType === ChannelScalingType.Voltage)
                return wrapper.Channel.Multiplier;
        }

        return 1;
    }

    getBaseCurrentMultiplier(wrappers: ChannelScalingWrapper[]): number {
        for (const wrapper of wrappers) {
            if (wrapper.ScalingType === ChannelScalingType.Current)
                return wrapper.Channel.Multiplier;
        }

        return 1;
    }

    recalculateChannelMultipliers(multipliers: { VoltageMultiplier?: number, CurrentMultiplier?: number } = {}): void {
        const voltageMultiplier: number = multipliers.VoltageMultiplier || this.state.VoltageMultiplier;
        const currentMultiplier: number = multipliers.CurrentMultiplier || this.state.CurrentMultiplier;

        const wrappers = this.state.Wrappers;
        const baseVoltageMultiplier = this.getBaseVoltageMultiplier(wrappers);
        const baseCurrentMultiplier = this.getBaseCurrentMultiplier(wrappers);

        for (const wrapper of wrappers) {
            const baseMultiplier = wrapper.CalculateMultiplier(baseVoltageMultiplier, baseCurrentMultiplier);
            const newMultiplier = wrapper.CalculateMultiplier(voltageMultiplier, currentMultiplier);
            wrapper.AdjustedMultiplier = wrapper.Channel.Multiplier * newMultiplier / baseMultiplier;
            wrapper.ReplacedMultiplier = newMultiplier;
        }

        this.setState({
            VoltageMultiplier: voltageMultiplier,
            CurrentMultiplier: currentMultiplier,
            Wrappers: wrappers
        });
    }

    async useReplacedMultiplier(): Promise<void> {
        for (const wrapper of this.state.Wrappers) {
            const channel = wrapper.Channel;
            channel.Multiplier = wrapper.ReplacedMultiplier;
            wrapper.AdjustedMultiplier = wrapper.ReplacedMultiplier;
        }

        await this.updateChannels();
    }

    async useAdjustedMultiplier(): Promise<void> {
        for (const wrapper of this.state.Wrappers) {
            const channel = wrapper.Channel;
            channel.Multiplier = wrapper.AdjustedMultiplier;
        }

        await this.updateChannels();
    }

    async updateChannels(): Promise<void> {
        const wrappers = this.state.Wrappers;
        const channels = wrappers.map(wrapper => wrapper.Channel);

        try {
            await $.ajax({
                type: "POST",
                url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Channel/Update`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({ Channels: channels }),
                cache: false,
                async: true
            });

            this.setState({ Wrappers: wrappers });
        } catch (e) {
            alert(e);
        }
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
                    <div style={{ width: '100%', margin: 10 }}>
                        Voltage Multiplier: <input style={{ width: "5em" }} type="text" value={this.state.VoltageMultiplier} onChange={(event) => {
                            const value = event.target.value;
                            const voltageMultiplier = toNumber(value);
                            this.recalculateChannelMultipliers({ VoltageMultiplier: voltageMultiplier });
                        }} />
                        <span style={{ marginLeft: "2em" }} />
                        Current Multiplier: <input style={{ width: "5em" }} type="text" value={this.state.CurrentMultiplier} onChange={(event) => {
                            const value = event.target.value;
                            const currentMultiplier = toNumber(value);
                            this.recalculateChannelMultipliers({ CurrentMultiplier: currentMultiplier });
                        }} />
                    </div>
                    <div style={{ width: '100%', maxHeight: window.innerHeight - 450, padding: 30, overflowY: 'auto' }}>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Scaling Type</th>
                                    <th>Multiplier</th>
                                    <th>Replaced</th>
                                    <th>Adjusted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Wrappers.map((wrapper, index, wrappers) => {
                                        return (
                                            <tr key={index}>
                                                <td style={{ width: '30%' }}>{ wrapper.Descriptor }</td>
                                                <td style={{ width: '20%' }}>{ wrapper.Identity }</td>
                                                <td style={{ width: '20%' }}>{<select className='form-control' value={wrapper.ScalingTypeName} onChange={(event) => {
                                                    const scalingTypeName = event.target.value;
                                                    wrapper.ScalingType = ChannelScalingType[scalingTypeName];
                                                    this.recalculateChannelMultipliers();
                                                }}>{this.state.ScalingTypes.map(a => <option key={ChannelScalingType[a]} value={ChannelScalingType[a]}>{ChannelScalingType[a]}</option>)}</select>}</td>
                                                <td style={{ width: '10%' }}>{wrapper.Channel.Multiplier}</td>
                                                <td style={{ width: '10%' }}>{wrapper.ReplacedMultiplier}</td>
                                                <td style={{ width: '10%' }}>{wrapper.AdjustedMultiplier}</td>
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
                        <button className="btn btn-primary pull-right" onClick={this.useReplacedMultiplier}>Replace Multipliers</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary pull-right" onClick={this.useAdjustedMultiplier}>Adjust Multipliers</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={this.initializeWrappers}>Clear Changes</button>
                    </div>
                </div>
            </div>
        );
    }
}

