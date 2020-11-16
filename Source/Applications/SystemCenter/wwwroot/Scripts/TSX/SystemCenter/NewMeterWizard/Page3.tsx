//******************************************************************************************************
//  Page3.tsx - Gbtc
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
import { OpenXDA, SystemCenter } from '../global';
import CFGParser from '../../../TS/CFGParser';
import { useDispatch, useSelector } from 'react-redux';
import { SelectMeasurementTypes, SelectMeasurementTypeStatus, FetchMeasurementType } from '../Store/MeasurementTypeSlice';
import { SelectPhaseStatus, SelectPhases, FetchPhase } from '../Store/PhaseSlice';
import { toNumber } from 'lodash';

declare var homePath: string;

export default function Page3(props: { MeterKey: string, Channels: Array<OpenXDA.Channel>, UpdateChannels: (record: OpenXDA.Channel[]) => void, UpdateAssets: (record: OpenXDA.Asset[]) => void  }) {
    const fileInput = React.useRef(null);
    const dispatch = useDispatch();
    const measurementTypes = useSelector(SelectMeasurementTypes);
    const mtStatus = useSelector(SelectMeasurementTypeStatus) as SystemCenter.Status;
    const phases = useSelector(SelectPhases);
    const phStatus = useSelector(SelectPhaseStatus) as SystemCenter.Status;


    React.useEffect(() => {
        $(".custom-file-input").on("change", (evt: any) => {
            let fileName = (evt as React.ChangeEvent<HTMLInputElement>).target.value.split("\\").pop();
            $(fileInput).siblings(".custom-file-label").addClass("selected").html(fileName);
            readSingleFile((evt as React.ChangeEvent<HTMLInputElement>))
        });

        return () => {
            $(".custom-file-input").off('change');
        }
    }, [])

    React.useEffect(() => {
        if (mtStatus === 'unintiated' || mtStatus === 'changed') {
            dispatch(FetchMeasurementType());
            return function () {
            }
        }
    }, [dispatch, mtStatus]);

    React.useEffect(() => {
        if (phStatus === 'unintiated' || phStatus === 'changed') {
            dispatch(FetchPhase());
            return function () {
            }
        }
    }, [dispatch, phStatus]);

    function readSingleFile(evt: React.ChangeEvent<HTMLInputElement>) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];
        if (f) {
            var r = new FileReader();
            r.onload = (e) => {
                var contents = e.target.result as string;

                var parser;

                if (f.name.indexOf('.cfg') >= 0) {
                    parser = new CFGParser(contents, props.MeterKey);
                    props.UpdateChannels(parser.Channels);
                    clearAssetsChannels();

                }
                else
                    alert('File is not of type cfg. Please only use comtrade standard cfg files.');
            }
            r.readAsText(f);
        }
    }

    function deleteChannel(index: number): void {
        let channels: Array<OpenXDA.Channel> = _.clone(props.Channels);
        let record: OpenXDA.Channel = channels.splice(index, 1)[0];
        props.UpdateChannels(channels);

        if (record.Asset == '') return;

        let assets:Array<OpenXDA.Asset> = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));

        if (assets != null && assets.length > 0) {
            let asset = assets.find(a => a.AssetKey == record.Asset)
            if (asset == null) return;

            let channelIndex = asset.Channels.findIndex(c => c.ID = record.ID);
            if (channelIndex < 0) return;

            asset.Channels.splice(channelIndex,1)
            props.UpdateAssets(assets);

        }
    }

    function clearAssetsChannels():void {
        let assets = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));

        if (assets != null && assets.length > 0) {
            $.each(assets, (index, asset) => {
                asset.Channels = []
            });
            props.UpdateAssets(assets);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={() => {
                        let channels: Array<OpenXDA.Channel> = [
                            { ID: 0, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series } as OpenXDA.Channel,
                            { ID: 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'VBN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage BN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series } as OpenXDA.Channel,
                            { ID: 2, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'VCN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage CN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series } as OpenXDA.Channel,
                            { ID: 3, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'IA', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current A', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series } as OpenXDA.Channel,
                            { ID: 4, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'IB', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current B', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series } as OpenXDA.Channel,
                            { ID: 5, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'IC', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current C', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series } as OpenXDA.Channel,
                            { ID: 6, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'NG', Name: 'IN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current NG', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series } as OpenXDA.Channel,

                        ]
                        props.UpdateChannels(channels);
                        clearAssetsChannels();
                    }}>Default Setup</button>
                </div>
                <div className="col">
                    <div className="form-group" style={{ width: '100%' }}>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" ref={fileInput} accept=".cfg,.par" />
                            <label className="custom-file-label">Choose a comtrade standard cfg file if applicable</label>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <button className="btn btn-primary pull-right" onClick={() => {
                        let channel: OpenXDA.Channel = { ID: props.Channels.length, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series } as OpenXDA.Channel
                        let channels: Array<OpenXDA.Channel> = _.clone(props.Channels);
                        channels.push(channel);
                        props.UpdateChannels(channels);

                    }}>Add Channel</button>
                </div>

            </div>
            <div style={{ width: '100%', maxHeight: 'calc(100% - 35px)', padding: 30, overflowY: 'auto' }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Channel</th>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Type</th>
                            <th>Phase</th>
                            <th>Adder</th>
                            <th>Multiplier</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.Channels.map((channel, index, array) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ width: '5%' }}><input className='form-control'  value={channel.Series.SourceIndexes} onChange={(event) => {
                                            channel.Series.SourceIndexes = event.target.value;
                                            props.UpdateChannels([...array]);
                                        }} /></td>
                                        <td style={{ width: '20%' }}><input className='form-control' value={channel.Name} onChange={(event) => {
                                            channel.Name = event.target.value;
                                            props.UpdateChannels([...array]);
                                        }}/></td>
                                        <td style={{ width: '35%' }}><input className='form-control' value={channel.Description} onChange={(event) => {
                                            channel.Description = event.target.value;
                                            props.UpdateChannels([...array]);
                                        }}/></td>
                                        <td style={{ width: '10%' }}>{<select className= 'form-control'  value={channel.MeasurementType} onChange={(event) => {
                                            channel.MeasurementType = event.target.value;
                                            props.UpdateChannels([...array]);
                                        }}>{measurementTypes.map(a => <option key={a.ID} value={a.Name}>{a.Name}</option>)}</select>}</td>
                                        <td style={{ width: '10%' }}>{<select className='form-control' value={channel.Phase} onChange={(event) => {
                                            channel.Phase = event.target.value;
                                            props.UpdateChannels([...array]);
                                        }}>{phases.map(a => <option key={a.ID} value={a.Name}>{a.Name}</option>)}</select>}</td>
                                        <td style={{ width: '5%' }}><input className='form-control' value={channel.Adder} onChange={(event) => {
                                            channel.Adder = toNumber(event.target.value);
                                            props.UpdateChannels([...array]);
                                        }} /></td>
                                        <td style={{ width: '5%' }}><input className='form-control' value={channel.Multiplier} onChange={(event) => {
                                            channel.Multiplier = toNumber(event.target.value);
                                            props.UpdateChannels([...array]);
                                        }} /></td>
                                        <td style={{ width: '10%' }}>
                                            <button className="btn btn-sm" onClick={(e) => deleteChannel(index)}><span><i className="fa fa-times"></i></span></button>
                                        </td>

                                    </tr>
                                )
                            })
                            }
                    </tbody>
                </table>
            </div>
                
        </>
        );

}

