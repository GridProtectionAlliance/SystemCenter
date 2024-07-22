//******************************************************************************************************
//  ChannelPage.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the 'License'; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  'AS-IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  07/02/2024 - Collins Self
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Modal } from '@gpa-gemstone/react-interactive';
import { ConfigTable } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table'
import { Input } from '@gpa-gemstone/react-forms';
import { CrossMark, Plus, TrashCan } from '@gpa-gemstone/gpa-symbols';

interface IProps {
    Channels: OpenXDA.Types.Channel[],
    MeterKey: string,
    UpdateChannels: React.Dispatch<React.SetStateAction<OpenXDA.Types.Channel[]>>,
    CurrentChannels: OpenXDA.Types.Channel[],
    SortKey: string,
    Ascending: boolean,
    Shown: boolean,
    Close: (c: OpenXDA.Types.Channel | undefined) => void
}

interface IVirtualChannel {
    Series: string,
    Phase: string,
    MeasurementType: string,
    Scale: number,
    Name: string
}

export default function VirtualChannelModal(props: IProps) {
    const [disableModalConfirm, setDisableModalConfirm] = React.useState<boolean>(true);
    const [validSelection, setValidSelection] = React.useState<boolean>(false);
    const [virtualChannels, setVirtualChannels] = React.useState<IVirtualChannel[]>([]);

    React.useEffect(() => {
        setDisableModalConfirm(true);
        if (virtualChannels.length > 0 && validSelection) setDisableModalConfirm(false);
    }, [virtualChannels, validSelection]);

    React.useEffect(() => {
        for (const vChannel of virtualChannels) {
            if (vChannel.Series === null || vChannel.Series == '') {
                setValidSelection(false);
                return;
            }
            setValidSelection(true);
        }
    }, [virtualChannels])

    const handleChannelClick = React.useCallback((data: {
        colKey?: string;
        colField?: keyof OpenXDA.Types.Channel;
        row: OpenXDA.Types.Channel;
        data: OpenXDA.Types.Channel[keyof OpenXDA.Types.Channel] | null;
        index: number
    }, event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        addVirtualChannel(data.row, 1); // scale default is 1
    }, []);

    function addVirtualChannel(channel: OpenXDA.Types.Channel, scale: number) {
        const vChannel: IVirtualChannel = {
            Series: channel.Series[0].SourceIndexes,
            Phase: channel.Phase,
            MeasurementType: channel.MeasurementType,
            Scale: scale,
            Name: channel.Name
        }
        setVirtualChannels(prevChannels => [...prevChannels, vChannel])
    }

    function handleVCModalConfirmCallback(conf, isButton) {
        const mTypeArr = [];
        const phaseArr = [];
        for (const ch of virtualChannels) {
            mTypeArr.push(ch.MeasurementType);
            phaseArr.push(ch.Phase);
        }

        if (conf) {
            let channel: OpenXDA.Types.Channel = {
                ID: 0, // gets overwritten by addChannel in ChannelPage
                Meter: props.MeterKey, Asset: '',
                MeasurementType: mTypeArr.every(v => v === mTypeArr[0]) ? mTypeArr[0] : 'Voltage',   // if all the same return one of the el's
                Adder: 0, Phase: phaseArr.every(v => v === phaseArr[0]) ? phaseArr[0] : 'AN', 
                MeasurementCharacteristic: 'Instantaneous',
                Name: 'New Virtual Channel',  Multiplier: 1,
                SamplesPerHour: 0, PerUnitValue: null,
                HarmonicGroup: 0, Description: 'Voltage AN',
                Enabled: true, Series: [{
                    ID: 0,
                    ChannelID: 0,
                    SeriesType: 'Values',
                    SourceIndexes: virtualChannels.map((ch) => ch.Scale + '*' + ch.Series).join(',') // scal * source idx
                } as OpenXDA.Types.Series],
                ConnectionPriority: 0, Trend: false
            } as OpenXDA.Types.Channel

            let channels: Array<OpenXDA.Types.Channel> = [channel].concat(_.cloneDeep(props.Channels));
            props.UpdateChannels(channels);

            props.Close(channel)
            setVirtualChannels([]);
        } else if (isButton) {
            props.Close(undefined);
            setVirtualChannels([]);
        }
    }

    function updateChannelScale(vChannel: IVirtualChannel, index: number) {
        let updatedChannels = _.cloneDeep(virtualChannels);

        if (index > -1) updatedChannels[index] = vChannel;
        else updatedChannels.push(vChannel);

        setVirtualChannels(updatedChannels);
    }

    function signedScale(index: number) {
        const vChannels = _.cloneDeep(virtualChannels);

        if (index > -1) vChannels[index].Scale = -vChannels[index].Scale;
        setVirtualChannels(vChannels);
    }

    function removeVC(channel: IVirtualChannel) {
        setVirtualChannels(prevChannels => [...prevChannels.filter((element) => element !== channel)]);
    }

    return <>
        <Modal
            Title={'Virtual Channel'}
            Show={props.Shown}
            CallBack={(conf, isButton) => {
                handleVCModalConfirmCallback(conf, isButton);
            }}
            ConfirmText={'Add'}
            ConfirmBtnClass={'btn-primary'}
            DisableConfirm={disableModalConfirm}
            ShowCancel={true}
            Size={'lg'}
            ConfirmShowToolTip={!validSelection}
            ConfirmToolTipContent={<p><span>{CrossMark}</span>Selection includes channel with no Series.</p>}
        >
            <div className='row'>
                <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                    <ConfigTable.Table<OpenXDA.Types.Channel>
                        // LocalStorageKey='ChannelPageConfigTable'
                        Data={props.CurrentChannels}
                        SortKey={props.SortKey}
                        Ascending={props.Ascending}
                        TheadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={() => false}
                        KeySelector={(item) => item.ID}
                        OnClick={(data, event) => handleChannelClick(data, event)}
                        OnSort={(d) => {
                            // if (d.colKey === props.SortKey)
                            // setAsc((x) => !x);
                            // else
                            // setAsc(false);
                            // setSortKey(d.colKey);
                        }}
                    >
                        <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ maxWidth: 'auto' }}
                            >Name
                        </ReactTable.AdjustableColumn>
                        <ConfigTable.Configurable Key='Series' Label='Channel' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Series'}
                                AllowSort={true}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                Content={({ item }) => item.Series[0].SourceIndexes}
                                >Channel
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='MeasurementType' Label='Type' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'MeasurementType'}
                                AllowSort={true}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                Field={'MeasurementType'}
                                >Type
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='MeasurementCharacteristic' Label='Characteristic' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel> Key={'MeasurementCharacteristic'}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                Field={'MeasurementCharacteristic'}
                            >Characteristic
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='Phase' Label='Phase' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Phase'}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                AllowSort={true}
                                Field={'Phase'}
                            >Phase
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='SamplesPerHour' Label='Sampling Rate' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'SamplesPerHour'}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                AllowSort={true}
                                Field={'SamplesPerHour'}
                            >Sampling Rate (sph)
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='PerUnitValue' Label='Per Unit' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'PerUnitValue'}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                AllowSort={true}
                                Field={'PerUnitValue'}
                            >Per Unit
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='HarmonicGroup' Label='Harmonic' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'HarmonicGroup'}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                AllowSort={true}
                                Field={'HarmonicGroup'}
                            >Harmonic
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Adder' Label='Adder' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Adder'}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                AllowSort={true}
                                Field={'Adder'}
                            >Adder
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Multiplier' Label='Multiplier' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Multiplier'}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                AllowSort={true}
                                Field={'Multiplier'}
                            >Multiplier
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Description' Label='Description' Default={true}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Description'}
                                HeaderStyle={{ maxWidth: 'auto' }}
                                Field={'Description'}
                            >Description
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                    </ConfigTable.Table>
                </div>
            </div>
            <div className={'row justify-content-center'} style={{ height: '100%', overflow: 'hidden' }}>
                {virtualChannels.map((channel: IVirtualChannel, index: number) => (
                    <>
                        {index === 0
                        ? <div className='col-1 mx-1'></div>
                        : <div style={{ cursor: 'pointer' }} className={'col-1 mx-1 text-center'} onClick={() => {signedScale(index)}}>{Plus}</div>}
                        <div className='col-1 px-0 mx-2'>
                            <Input<IVirtualChannel>
                                Field={'Scale'}
                                Label={''}
                                Type={'number'}
                                Record={channel}
                                Valid={() => true}
                                Setter={(ch) => updateChannelScale(ch, index)}
                                Style={{marginBottom: 0}} />
                        </div>
                        <div className="pl-2">&times;</div>
                        <div className='col-2 text-center'>
                            {channel.Name}
                        </div>
                        <button className='col-1 btn btn-sm' onClick={() => removeVC(channel)}>
                            <span>{TrashCan}</span>
                        </button>
                    </>
                ))}
            </div>
            {(virtualChannels.length > 0) ? null : <div className='row mt-2 justify-content-center'>
                <div className='alert alert-primary'>Select channels to add to virtual channel.</div>
            </div>}
        </Modal>
    </>
}