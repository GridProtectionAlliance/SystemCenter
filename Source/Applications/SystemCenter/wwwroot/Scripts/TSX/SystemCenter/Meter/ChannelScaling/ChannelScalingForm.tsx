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
import { ReactTable } from '@gpa-gemstone/react-table';
import { ChannelScalingWrapper, ChannelScalingType, IMultiplier } from './ChannelScalingWrapper';
import { Input } from '@gpa-gemstone/react-forms';
import { SelectRoles } from '../../Store/UserSettings';

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
    const [status, setStatus] = React.useState<Application.Types.Status>('idle');

    const [hover, setHover] = React.useState<('Reset' | 'None' | 'Replace' | 'Adjust')>('None');
    const roles = useAppSelector(SelectRoles);

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
            localStorage.setItem('SystemCenter.ChannelScaling.' + props.Key + '.V', multiplier.Voltage.toString());
            localStorage.setItem('SystemCenter.ChannelScaling.' + props.Key + '.I', multiplier.Current.toString());
    }, [multiplier.Voltage, multiplier.Current]);

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

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
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
                    <Input<IMultiplier> Record={multiplier} AllowNull={true} Type={'number'} Label={'Voltage Multiplier'} Field={'Voltage'} Size={'small'} Disabled={!hasPermissions()} Setter={(r) => {
                        setMultiplier({ Voltage: r.Voltage ?? 1, Current: r.Current ?? 1 });
                    }} Valid={(f) => true} />
                </div>
                <div className="col-3">
                    <Input<IMultiplier> Size={'small'} Record={multiplier}
                    Type={'number'}
                        Label={'Current Multiplier'}
                        AllowNull={true}
                        Field={'Current'} Disabled={!hasPermissions()} Setter={(r) => {
                            setMultiplier({ Voltage: r.Voltage ?? 1, Current: r.Current ?? 1 });
                        }} Valid={(f) => true} />   
                </div>
                </div>
                <div style={{ width: '100%' }}>
                    <ReactTable.Table<ChannelScalingWrapper>
                        TableClass="table table-hover"
                        Data={Wrappers}
                        SortKey={''}
                        Ascending={false}
                        OnSort={(d) => { }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', width: '100%', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.Channel.ID.toString()}
                    >
                        <ReactTable.Column<ChannelScalingWrapper>
                            Key={'Descriptor'}
                            AllowSort={false}
                            Field={'Descriptor'}
                            HeaderStyle={{ width: '30%' }}
                            RowStyle={{ width: '30%' }}
                        > Description
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelScalingWrapper>
                            Key={'Identity'}
                            AllowSort={false}
                            Field={'Identity'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > Type
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelScalingWrapper>
                            Key={'ScalingType'}
                            AllowSort={false}
                            Field={'ScalingType'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                            Content={({ item, index }) => 
                                <select className='form-control' value={item.ScalingTypeName} disabled={!hasPermissions()} onChange={(event) => {
                                    const scalingTypeName = event.target.value;
                                    const wrapper = _.cloneDeep(Wrappers);
                                    wrapper[index].ScalingType = ChannelScalingType[scalingTypeName];
                                    recalculateChannelMultipliers(wrapper);
                                }}>{ScalingTypes.map(a => <option key={ChannelScalingType[a]} value={ChannelScalingType[a]}>{ChannelScalingType[a]}</option>)}</select>
                            }
                        > Scaling Type
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelScalingWrapper>
                            Key={'PresentMultiplier'}
                            AllowSort={false}
                            Field={'PresentMultiplier'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > Applied Multiplier
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelScalingWrapper>
                            Key={'ReplacedMultiplier'}
                            AllowSort={false}
                            Field={'ReplacedMultiplier'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > If Replaced
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelScalingWrapper>
                            Key={'AdjustedMultiplier'}
                            AllowSort={false}
                            Field={'AdjustedMultiplier'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > If Adjusted
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </>

    return (
        <>
            <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto'  }}>
                {cardBody}
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary pull-right" + ((multiplier.Voltage == 1 && multiplier.Current == 1) ? ' disabled' : '')} onClick={() => { if(multiplier.Voltage  != 1 || multiplier.Current != 1) useReplacedMultiplier(); }}
                        onMouseEnter={() => setHover('Replace')} onMouseLeave={() => setHover('None')} data-tooltip={"rep"}
                    >Replace Multipliers</button>
                    <ToolTip Show={hover == 'Replace' && (multiplier.Voltage == 1 && multiplier.Current == 1)} Position={'top'} Theme={'dark'} Target={"rep"}>
                        {!hasPermissions() ? <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p> : null}
                        {hasPermissions() ? <p> There are no changes to be applied. </p> : null}
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary pull-right" + ((multiplier.Voltage == 1 && multiplier.Current == 1) ? ' disabled' : '')} onClick={() => { if (multiplier.Voltage != 1 || multiplier.Current != 1) useAdjustedMultiplier(); }}
                        onMouseEnter={() => setHover('Adjust')} onMouseLeave={() => setHover('None')} data-tooltip={"adj"}
                    >Adjust Multipliers</button>
                    <ToolTip Show={hover == 'Adjust' && (multiplier.Voltage == 1 && multiplier.Current == 1)} Position={'top'} Theme={'dark'} Target={"adj"}>
                        {!hasPermissions() ? <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p> : null}
                        {hasPermissions() ? <p> There are no changes to be applied. </p> : null}
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + ((multiplier.Voltage == 1 && multiplier.Current == 1) ? ' disabled' : '')} onClick={() => { if (multiplier.Voltage != 1 || multiplier.Current != 1) initializeWrappers(); }}
                        onMouseEnter={() => setHover('Reset')} onMouseLeave={() => setHover('None')} data-tooltip={"res"}
                    >Clear Changes</button>
                    <ToolTip Show={hover == 'Reset' && (multiplier.Voltage == 1 || multiplier.Current == 1)} Position={'top'} Theme={'dark'} Target={"res"}>
                        <p> All changes will be lost. </p>
                    </ToolTip>
                </div>
            </div>
        </>
    );
}

export default ChannelScalingForm;