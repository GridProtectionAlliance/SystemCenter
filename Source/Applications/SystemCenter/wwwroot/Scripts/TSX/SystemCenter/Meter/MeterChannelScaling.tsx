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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { toNumber } from 'lodash';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MeasurementCharacteristicSlice, MeasurmentTypeSlice, PhaseSlice } from '../Store/Store';
import { pseudoRandomBytes } from 'crypto';
import { LoadingIcon, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table';

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

interface IProps {
    Meter: OpenXDA.Types.Meter,
    IsVisible: boolean
}

const ChannelScalingWindow = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [VoltageMultiplier, setVoltageMultiplier] = React.useState<number>(1);
    const [CurrentMultiplier, setCurrentMultiplier] = React.useState<number>(1);
    const [Wrappers, setWrappers] = React.useState<ChannelScalingWrapper[]>([]);

    const phases = useAppSelector(PhaseSlice.Data) as OpenXDA.Types.Phase[];
    const measurementTypes = useAppSelector(MeasurmentTypeSlice.Data) as OpenXDA.Types.MeasurementType[];
    const measurementCharacteristics = useAppSelector(MeasurementCharacteristicSlice.Data) as OpenXDA.Types.MeasurementCharacteristic[];

    const pStatus = useAppSelector(PhaseSlice.Status) as Application.Types.Status;
    const mtStatus = useAppSelector(MeasurmentTypeSlice.Status) as Application.Types.Status;
    const mcStatus = useAppSelector(MeasurementCharacteristicSlice.Status) as Application.Types.Status;

    const [status, setStatus] = React.useState<Application.Types.Status>('idle')
    const [trigger, setTrigger] = React.useState<number>(0);
    const [hover, setHover] = React.useState<( 'Reset' | 'None' | 'Replace' | 'Adjust' )>('None');
    const [changed, setChanged] = React.useState<boolean>(false);

    // Constants
    const ScalingTypes: ChannelScalingType[] = [
        ChannelScalingType.Voltage,
        ChannelScalingType.Current,
        ChannelScalingType.PowerAndEnergy,
        ChannelScalingType.Impedance,
        ChannelScalingType.NoScaling
    ];

   

    React.useEffect(() => {
        
    }, [Wrappers]);

    React.useEffect(() => {
        if (pStatus == 'unintiated')
            dispatch(PhaseSlice.Fetch());
    }, [pStatus])

    React.useEffect(() => {
        if (mtStatus == 'unintiated')
            dispatch(MeasurmentTypeSlice.Fetch());
    }, [mtStatus])

    React.useEffect(() => {
        if (mcStatus == 'unintiated')
            dispatch(MeasurementCharacteristicSlice.Fetch());
    }, [mcStatus])

    React.useEffect(() => {
        let handle = null;
        if (props.IsVisible && mtStatus == 'idle' && mcStatus == 'idle' && pStatus == 'idle')
            handle = initializeWrappers();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [props.IsVisible, pStatus, mtStatus, mcStatus, trigger]);



    function initializeWrappers(): JQuery.jqXHR<OpenXDA.Types.Channel> {
        clearWrappers();
        setStatus('loading');

        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Channels`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: true,
            async: true
        });

        h.done((d) => {
            const wrappers = d.map(channel => {
                const measurementType = measurementTypes.find(measurementType => measurementType.Name === channel.MeasurementType);
                const measurementCharacteristic = measurementCharacteristics.find(measurementCharacteristic => measurementCharacteristic.Name === channel.MeasurementCharacteristic);
                const phase = phases.find(phase => phase.Name === channel.Phase);
                return new ChannelScalingWrapper(channel, measurementType, measurementCharacteristic, phase);
            });


            const vMultiplier = getBaseVoltageMultiplier(wrappers);
            const iMultiplier = getBaseCurrentMultiplier(wrappers);

            for (const wrapper of wrappers) {
                const newMultiplier = wrapper.CalculateMultiplier(vMultiplier, iMultiplier);
                wrapper.ReplacedMultiplier = newMultiplier;
            }

            setVoltageMultiplier(getBaseVoltageMultiplier(wrappers));
            setCurrentMultiplier(getBaseCurrentMultiplier(wrappers));
            setWrappers(wrappers);
            setStatus('idle');
        })

        h.fail(() => { setStatus('error'); })

        return h;
    }

    function clearWrappers() {
        setWrappers([]);
    }

    function getBaseVoltageMultiplier(wrappers: ChannelScalingWrapper[]): number {
        for (const wrapper of wrappers) {
            if (wrapper.ScalingType === ChannelScalingType.Voltage)
                return wrapper.Channel.Multiplier;
        }

        return 1;
    }

    function getBaseCurrentMultiplier(wrappers: ChannelScalingWrapper[]): number {
        for (const wrapper of wrappers) {
            if (wrapper.ScalingType === ChannelScalingType.Current)
                return wrapper.Channel.Multiplier;
        }

        return 1;
    }

    function recalculateChannelMultipliers(multipliers: { VoltageMultiplier?: number, CurrentMultiplier?: number } = {}, wrappers?: ChannelScalingWrapper[]): void {
        const vMultiplier: number = multipliers.VoltageMultiplier || VoltageMultiplier;
        const iMultiplier: number = multipliers.CurrentMultiplier || CurrentMultiplier;

        if (wrappers == undefined)
            wrappers = _.cloneDeep(Wrappers);

        const baseVoltageMultiplier = getBaseVoltageMultiplier(wrappers);
        const baseCurrentMultiplier = getBaseCurrentMultiplier(wrappers);

        for (const wrapper of wrappers) {
            const baseMultiplier = wrapper.CalculateMultiplier(baseVoltageMultiplier, baseCurrentMultiplier);
            const newMultiplier = wrapper.CalculateMultiplier(vMultiplier, iMultiplier);
            wrapper.AdjustedMultiplier = wrapper.Channel.Multiplier * newMultiplier / baseMultiplier;
            wrapper.ReplacedMultiplier = newMultiplier;
        }

        setVoltageMultiplier(vMultiplier);
        setCurrentMultiplier(iMultiplier);
        setWrappers(wrappers);
    }

    function useReplacedMultiplier() {
        const updatedWrappers = _.cloneDeep(Wrappers);
        for (const wrapper of updatedWrappers) {
            const channel = wrapper.Channel;
            channel.Multiplier = wrapper.ReplacedMultiplier;
            wrapper.AdjustedMultiplier = wrapper.ReplacedMultiplier;
        }

        updateChannels(updatedWrappers);
    }



    function useAdjustedMultiplier() {
        const updatedWrappers = _.cloneDeep(Wrappers);
        for (const wrapper of updatedWrappers) {
            const channel = wrapper.Channel;
            channel.Multiplier = wrapper.AdjustedMultiplier;
        }

        updateChannels(updatedWrappers);
    }

    function updateChannels(wrappers: ChannelScalingWrapper[]) {
        const channels = wrappers.map(wrapper => wrapper.Channel);
        setStatus('loading');
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Channel/Update`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Channels: channels }),
            cache: false,
            async: true
        });

        h.done(() => setTrigger((x) => x + 1));
        h.fail(() => setStatus('error'));
    
    }

    let cardBody;
    if (status == 'loading' || pStatus == 'loading' || mcStatus == 'loading' || mtStatus == 'loading')
        cardBody = 
            <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <LoadingIcon Show={true} Size={40} Label={''} />
                </div>
            </div>
    else if (status == 'error' || pStatus == 'error' || mcStatus == 'error' || mtStatus == 'error')
        cardBody =
            <div style={{ width: '100%', height: '200px' }}>
                <div style={{ margin: 'auto' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={''} />
                </div>
            </div>
    else
        cardBody =
            <>
                <div style={{ width: '100%', maxHeight: '27px', margin: 10 }}>
                    Voltage Multiplier: <input style={{ width: "5em" }} type="text" value={VoltageMultiplier} onChange={(event) => {
                        const value = event.target.value;
                        const voltageMultiplier = toNumber(value);
                        recalculateChannelMultipliers({ VoltageMultiplier: voltageMultiplier });
                        setChanged(true);
                    }} />
                    <span style={{ marginLeft: "2em" }} />
                    Current Multiplier: <input style={{ width: "5em" }} type="text" value={CurrentMultiplier} onChange={(event) => {
                        const value = event.target.value;
                        const currentMultiplier = toNumber(value);
                        recalculateChannelMultipliers({ CurrentMultiplier: currentMultiplier });
                        setChanged(true);
                    }} />
                </div>
                <div style={{ width: '100%' }}>
                    <Table<ChannelScalingWrapper>
                        cols={[
                            { key: 'Descriptor', field: 'Descriptor', label: 'Description', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                            { key: 'Identity', field: 'Identity', label: 'Type', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                            {
                                key: 'ScalingType', label: 'Scaling Type', headerStyle: { width: '20%' }, rowStyle: { width: '20%' }, content: (item, key, fld, style, index) => <select className='form-control' value={item.ScalingTypeName} onChange={(event) => {
                                    const scalingTypeName = event.target.value;
                                    const wrapper = _.cloneDeep(Wrappers);
                                    wrapper[index].ScalingType = ChannelScalingType[scalingTypeName];
                                    recalculateChannelMultipliers({},wrapper);
                                }}>{ScalingTypes.map(a => <option key={ChannelScalingType[a]} value={ChannelScalingType[a]}>{ChannelScalingType[a]}</option>)}</select>
                            },
                            { key: 'Multiplier', field: 'CalculateMultiplier', label: 'Multiplier', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Replaced', field: 'ReplacedMultiplier', label: 'Replaced', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Adjusted', field: 'AdjustedMultiplier', label: 'Adjusted', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        ]}
                        tableClass="table table-hover"
                        data={Wrappers}
                        sortKey={''}
                        ascending={false}
                        onSort={(d) => { }}
                        onClick={(fld) => { }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 497, }}
                        rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                        keySelector={(item) => item.Channel.ID.toString()}
                    />
                </div>
            </>

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channel Scaling:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 365 }}>
                {cardBody}
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary pull-right" + (!changed ? ' disabled' : '')} onClick={() => { if(changed) useReplacedMultiplier(); }}
                        onMouseEnter={() => setHover('Replace')} onMouseLeave={() => setHover('None')} data-tooltip={"rep"}
                    >Replace Multipliers</button>
                    <ToolTip Show={hover == 'Replace' && (!changed)} Position={'top'} Theme={'dark'} Target={"rep"}>
                        <p> There are no changes to be applied. </p>
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary pull-right" + (!changed ? ' disabled' : '')} onClick={() => { if (changed) useAdjustedMultiplier(); }}
                        onMouseEnter={() => setHover('Adjust')} onMouseLeave={() => setHover('None')} data-tooltip={"adj"}
                    >Adjust Multipliers</button>
                    <ToolTip Show={hover == 'Adjust' && (changed)} Position={'top'} Theme={'dark'} Target={"adj"}>
                        <p> There are no changes to be applied. </p>
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + (!changed ? ' disabled' : '')} onClick={() => { if (changed) setTrigger((x) => x + 1); }}
                        onMouseEnter={() => setHover('Reset')} onMouseLeave={() => setHover('None')} data-tooltip={"res"}
                    >Clear Changes</button>
                    <ToolTip Show={hover == 'Reset' && (changed)} Position={'top'} Theme={'dark'} Target={"res"}>
                        <p> All changes will be lost. </p>
                    </ToolTip>
                </div>
            </div>
        </div>
    );
}

export default ChannelScalingWindow