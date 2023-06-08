//******************************************************************************************************
//  ChannelScalingForm.tsx - Gbtc
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
//  10/20/2022 - Gabriel Santos
//       Refactored this code, split this class from ChannelScalingWindow and placed it in its own file.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { MeasurementCharacteristicSlice, MeasurmentTypeSlice, PhaseSlice } from '../../Store/Store';
import { LoadingIcon, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table';
import { ChannelScalingWrapper, ChannelScalingType, IMultiplier } from './ChannelScalingWrapper';
import { Input } from '@gpa-gemstone/react-forms';

declare let homePath: string;

interface IProps {
    Channels: OpenXDA.Types.Channel[],
    UpdateChannels: (channels: OpenXDA.Types.Channel[]) => void,
    ChannelStatus?: Application.Types.Status,
    Key?: string
}


const ChannelScalingForm = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [multiplier, setMultiplier] = React.useState<IMultiplier>({ Voltage: 1, Current: 1});
    const [Wrappers, setWrappers] = React.useState<ChannelScalingWrapper[]>([]);

    const phases = useAppSelector(PhaseSlice.Data) as OpenXDA.Types.Phase[];
    const measurementTypes = useAppSelector(MeasurmentTypeSlice.Data) as OpenXDA.Types.MeasurementType[];
    const measurementCharacteristics = useAppSelector(MeasurementCharacteristicSlice.Data) as OpenXDA.Types.MeasurementCharacteristic[];

    const pStatus = useAppSelector(PhaseSlice.Status) as Application.Types.Status;
    const mtStatus = useAppSelector(MeasurmentTypeSlice.Status) as Application.Types.Status;
    const mcStatus = useAppSelector(MeasurementCharacteristicSlice.Status) as Application.Types.Status;
    const [status, setStatus] = React.useState <Application.Types.Status>('idle');
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
        if (props.ChannelStatus === undefined) {
            if (props.Channels === undefined) setStatus('error');
            else setStatus('idle');
        }
        else setStatus(props.ChannelStatus);
    }, [props.ChannelStatus]);

    React.useEffect(() => {
        recalculateChannelMultipliers();
    }, [multiplier.Voltage, multiplier.Current]);

    React.useEffect(() => {
        if (props.Key == undefined)
            return;
        const multip = {
            Voltage: parseFloat(localStorage.getItem('SystemCenter.ChannelScaling.' + props.Key + '.V') ?? multiplier.Voltage.toString()),
            Current: parseFloat(localStorage.getItem('SystemCenter.ChannelScaling.' + props.Key + '.I') ?? multiplier.Current.toString()),
        };
        setMultiplier(multip);
    }, [])
    React.useEffect(() => {
        if (props.Key == undefined)
            return;
        if (multiplier.Voltage != 1)
            localStorage.setItem('SystemCenter.ChannelScaling.' + props.Key + '.V', multiplier.Voltage.toString());
        if (multiplier.Current != 1)
            localStorage.setItem('SystemCenter.ChannelScaling.' + props.Key + '.I', multiplier.Current.toString());
    }, [multiplier]);

    React.useEffect(() => {
        if (pStatus == 'unintiated' || pStatus == 'changed')
            dispatch(PhaseSlice.Fetch());
    }, [pStatus])

    React.useEffect(() => {
        if (mtStatus == 'unintiated' || pStatus == 'changed')
            dispatch(MeasurmentTypeSlice.Fetch());
    }, [mtStatus])

    React.useEffect(() => {
        if (mcStatus == 'unintiated' || pStatus == 'changed')
            dispatch(MeasurementCharacteristicSlice.Fetch());
    }, [mcStatus])

    React.useEffect(() => {
        initializeWrappers();
    }, [props.Channels, status, pStatus, mtStatus, mcStatus]);

    function initializeWrappers() {
        if (status == 'idle' && mtStatus == 'idle' && mcStatus == 'idle' && pStatus == 'idle') {
            const wrappers = props.Channels.map(channel => {
                const measurementType = measurementTypes.find(measurementType => measurementType.Name === channel.MeasurementType);
                const measurementCharacteristic = measurementCharacteristics.find(measurementCharacteristic => measurementCharacteristic.Name === channel.MeasurementCharacteristic);
                const phase = phases.find(phase => phase.Name === channel.Phase);
                return new ChannelScalingWrapper(channel, measurementType, measurementCharacteristic, phase);
            });

            recalculateChannelMultipliers(wrappers);
        }
    }

    function recalculateChannelMultipliers(wrappers?: ChannelScalingWrapper[]): void {
       
        if (wrappers == undefined)
            wrappers = _.cloneDeep(Wrappers);

        for (const wrapper of wrappers) {
            const newMultiplier = wrapper.CalculateMultiplier(multiplier);
            wrapper.AdjustedMultiplier = wrapper.Channel.Multiplier * newMultiplier;
            wrapper.ReplacedMultiplier = newMultiplier;
        }

        setWrappers(wrappers);
    }

    function useReplacedMultiplier() {
        const updatedWrappers = _.cloneDeep(Wrappers);
        for (const wrapper of updatedWrappers) {
            const channel = wrapper.Channel;
            channel.Multiplier = wrapper.ReplacedMultiplier;
        }
        props.UpdateChannels(updatedWrappers.map(wrapper => wrapper.Channel));
    }

    function useAdjustedMultiplier() {
        const updatedWrappers = _.cloneDeep(Wrappers);
        for (const wrapper of updatedWrappers) {
            const channel = wrapper.Channel;
            channel.Multiplier = wrapper.AdjustedMultiplier;
        }
        props.UpdateChannels(updatedWrappers.map(wrapper => wrapper.Channel));
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
                    <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                </div>
            </div>
    else
        cardBody =
            <>
            <div className="row">
                <div className="col-3">
                    <Input<IMultiplier> Record={multiplier} AllowNull={true} Type={'number'} Label={'Voltage Multiplier'} Field={'Voltage'} Size={'small'} Setter={(r) => {
                        setMultiplier({ Voltage: r.Voltage ?? 1, Current: r.Current ?? 1 });
                    setChanged(true);
                    }} Valid={(f) => true} />
                </div>
                <div className="col-3">
                    <Input<IMultiplier> Size={'small'} Record={multiplier}
                    Type={'number'}
                        Label={'Current Multiplier'}
                        AllowNull={true}
                        Field={'Current'} Setter={(r) => {
                            setMultiplier({ Voltage: r.Voltage ?? 1, Current: r.Current ?? 1 });
                            setChanged(true);
                        }} Valid={(f) => true} />   
                </div>
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
                                    recalculateChannelMultipliers(wrapper);
                                }}>{ScalingTypes.map(a => <option key={ChannelScalingType[a]} value={ChannelScalingType[a]}>{ChannelScalingType[a]}</option>)}</select>
                            },
                            { key: 'Multiplier', field: 'PresentMultiplier', label: 'Applied Multiplier', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Replaced', field: 'ReplacedMultiplier', label: 'If Replaced', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Adjusted', field: 'AdjustedMultiplier', label: 'If Adjusted', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        ]}
                        tableClass="table table-hover"
                        data={Wrappers}
                        sortKey={''}
                        ascending={false}
                        onSort={(d) => { }}
                        onClick={(fld) => { }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 510, }}
                        rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                        keySelector={(item) => item.Channel.ID.toString()}
                    />
                </div>
            </>

    return (
        <>
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
                    <button className={"btn btn-default" + (!changed ? ' disabled' : '')} onClick={() => { if (changed) initializeWrappers(); }}
                        onMouseEnter={() => setHover('Reset')} onMouseLeave={() => setHover('None')} data-tooltip={"res"}
                    >Clear Changes</button>
                    <ToolTip Show={hover == 'Reset' && (changed)} Position={'top'} Theme={'dark'} Target={"res"}>
                        <p> All changes will be lost. </p>
                    </ToolTip>
                </div>
            </div>
        </>
    );
}

export default ChannelScalingForm;