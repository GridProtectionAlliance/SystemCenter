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
import Table from '@gpa-gemstone/react-table'
import { Input, Select } from '@gpa-gemstone/react-forms';
import { Warning } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

export default function Page3(props: { MeterKey: string, Channels: Array<OpenXDA.Channel>, UpdateChannels: (record: OpenXDA.Channel[]) => void, UpdateAssets: (record: OpenXDA.Asset[]) => void, SetError: (e: string[]) => void  }) {
    const fileInput = React.useRef(null);
    const dispatch = useDispatch();
    const measurementTypes = useSelector(SelectMeasurementTypes);
    const mtStatus = useSelector(SelectMeasurementTypeStatus) as SystemCenter.Status;
    const phases = useSelector(SelectPhases);
    const phStatus = useSelector(SelectPhaseStatus) as SystemCenter.Status;
    const [showCFGError, setShowCFGError] = React.useState<boolean>(false);
    const [showSpareWarning, setShowSpareWarning] = React.useState<boolean>(false);

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

    React.useEffect(() => {
        let e = [];
        if (props.Channels.length == 0)
            e.push('At Least 1 Channel has to be set up.');
        props.SetError(e);
    }, [props.Channels]);

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
                    setShowCFGError(true);
                   
            }
            r.readAsText(f);
        }
    }

    function deleteChannel(id: number): void {
        let channels: Array<OpenXDA.Channel> = _.clone(props.Channels);
        let index = channels.findIndex(ch => ch.ID == id);
        if (index == -1)
            return;
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

    function editChannel(channel: OpenXDA.Channel) {
        let index = props.Channels.findIndex(ch => ch.ID == channel.ID);
        let updated = _.cloneDeep(props.Channels)
        if (index > -1)
            updated[index] = channel;
        else
            updated.push(channel);
     
        props.UpdateChannels(updated);
    }

    function clearSpareChannels() {
        let channels: Array<OpenXDA.Channel> = _.clone(props.Channels);
        let assets: Array<OpenXDA.Asset> = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));

        if (assets != null && assets.length > 0) {

            channels.filter(c => IsSpare(c)).forEach(c => {

                if (c.Asset == '') return;

                let asset = assets.find(a => a.AssetKey == c.Asset)
                if (asset == null) return;

                let channelIndex = asset.Channels.findIndex(ch => ch.ID = c.ID);
                if (channelIndex < 0) return;

                asset.Channels.splice(channelIndex, 1)
            });
            props.UpdateAssets(assets);
        }

        props.UpdateChannels(channels.filter(c => !IsSpare(c)));
    }

    function IsSpare(ch: OpenXDA.Channel): boolean {
        const regex = new RegExp('\(A[0-9]+\)Analog Channel [0-9]+');

        return ch.Description.toLowerCase() == 'spare' || (regex.test(ch.Description) && ch.MeasurementType == 'Digital') ;
    }

    const NSpare = props.Channels.filter(c => IsSpare(c)).length;


    return (
        <>
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-primary" onClick={() => {
                        let channels: Array<OpenXDA.Channel> = [
                            { ID: 0, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series], ConnectionPriority: 0 } as OpenXDA.Channel,
                            { ID: 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'VBN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage BN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series], ConnectionPriority: 0 } as OpenXDA.Channel,
                            { ID: 2, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'VCN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage CN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series], ConnectionPriority: 0 } as OpenXDA.Channel,
                            { ID: 3, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'IA', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current A', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series], ConnectionPriority: 0 } as OpenXDA.Channel,
                            { ID: 4, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'IB', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current B', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series], ConnectionPriority: 0 } as OpenXDA.Channel,
                            { ID: 5, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'IC', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current C', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series], ConnectionPriority: 0 } as OpenXDA.Channel,
                            { ID: 6, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'RES', Name: 'IR', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current RES', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series], ConnectionPriority: 0 } as OpenXDA.Channel,

                        ]
                        props.UpdateChannels(channels);
                        clearAssetsChannels();
                    }}>Default Setup</button>
                </div>
                <div className="col-6">
                    <div className="form-group" style={{ width: '100%' }}>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" ref={fileInput} accept=".cfg,.par" />
                            <label className="custom-file-label">Choose a comtrade standard cfg file if applicable</label>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary pull-right" disabled={NSpare == 0} onClick={() => setShowSpareWarning(true)}>Remove Spare</button>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary pull-right" onClick={() => {
                        let channel: OpenXDA.Channel = { ID: props.Channels.length == 0 ? 1 : Math.max(...props.Channels.map(ch => ch.ID)) + 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Series], ConnectionPriority: 0 } as OpenXDA.Channel
                        let channels: Array<OpenXDA.Channel> = _.clone(props.Channels);
                        channels.push(channel);
                        props.UpdateChannels(channels);
                    }}>Add Channel</button>
                </div>

            </div>
            <div style={{ width: '100%', maxHeight: innerHeight - 380, padding: 30 }}>
                <Table<OpenXDA.Channel> cols={[
                    {
                        key: 'Series', label: 'Channel', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item) => <Input<OpenXDA.Series> Field={'SourceIndexes'}
                            Record={item.Series[0]} Setter={(series) => {
                            item.Series[0].SourceIndexes = series.SourceIndexes;
                            editChannel(item)
                        }} Label={''} Valid={() => true}/>
                    },
                    {
                        key: 'Name', label: 'Name', headerStyle: { width: '20%' }, rowStyle: { width: '20%' }, content: (item) => <Input<OpenXDA.Channel> Field={'Name'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />
                    },
                    {
                        key: 'Description', label: 'Desc', headerStyle: { width: '33%' }, rowStyle: { width: '33%' }, content: (item) => <Input<OpenXDA.Channel> Field={'Description'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />
                    },
                    {
                        key: 'MeasurementType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => <Select<OpenXDA.Channel> Field={'MeasurementType'} Record={item} Setter={(ch) => editChannel(ch)} Label={''} Options={(measurementTypes as OpenXDA.MeasurementType[]).map((t) => ({ Value: t.Name, Label: t.Name }))} />
                    },
                    {
                        key: 'Phase', label: 'Phase', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => <Select<OpenXDA.Channel> Field={'Phase'} Record={item} Setter={(ch) => editChannel(ch)} Label={''} Options={(phases as OpenXDA.Phase[]).map((t) => ({ Value: t.Name, Label: t.Name }))} />
                    },
                    { key: 'Adder', label: 'Adder', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item) => <Input<OpenXDA.Channel> Field={'Adder'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    { key: 'Multiplier', label: 'Multiplier', headerStyle: { width: '7%' }, rowStyle: { width: '7%' }, content: (item) => <Input<OpenXDA.Channel> Field={'Multiplier'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    { key: null, label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%', paddingTop: 36, paddingBottom: 36 }, content: (item) => <button className="btn btn-sm" onClick={(e) => deleteChannel(item.ID)}><span><i className="fa fa-times"></i></span></button> },
                    
                ]}
                    tableClass="table table-hover"
                    data={props.Channels}
                    sortField={'SourceIndexes'}
                    ascending={false}
                    onSort={(d) => {}}
                    onClick={(fld) => { }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: innerHeight - 460, }}
                    rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
            <Warning Show={showCFGError} Title={'Error Parsing File'} Message={'File is not of type cfg. Please only use comtrade standard cfg files.'} CallBack={() => setShowCFGError(false)} />
            <Warning Show={showSpareWarning} Title={'Remove Spare Channels'} Message={`This will remove all Spare channels. This will remove ${NSpare} Channels from the Configuration.`} CallBack={(conf) => { if (conf) clearSpareChannels(); setShowSpareWarning(false); }} />

        </>
        );

}

