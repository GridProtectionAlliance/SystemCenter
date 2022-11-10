//******************************************************************************************************
//  ChannelPage.tsx - Gbtc
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
import { Application, OpenXDA, PqDiff } from '@gpa-gemstone/application-typings';
import CFGParser from '../../../TS/CFGParser';

import Table from '@gpa-gemstone/react-table'
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { Modal, Warning } from '@gpa-gemstone/react-interactive';
import PARParser from '../../../TS/PARParser';
import PQDIFParser from '../../../TS/PQDIFParser';
import { CrossMark, HeavyCheckMark, TrashCan } from '@gpa-gemstone/gpa-symbols';
import ChannelScalingForm from '../Meter/ChannelScaling/ChannelScalingForm';

declare var homePath: string;

interface IProps {
    MeterKey: string,
    Channels: Array<OpenXDA.Types.Channel>,
    UpdateChannels: React.Dispatch<React.SetStateAction<OpenXDA.Types.Channel[]>>,
    UpdateAssets: (record: OpenXDA.Types.Asset[]) => void,
    SetError: (e: string[]) => void,
    SetWarning: (w: string[]) => void,
    TrendChannels: boolean
}

export default function ChannelPage(props: IProps) {
    const fileInput = React.useRef(null);
    const trendFileInput = React.useRef(null);

    const [showCFGError, setShowCFGError] = React.useState<boolean>(false);
    const [showSpareWarning, setShowSpareWarning] = React.useState<boolean>(false);
    const [showScaling, setShowScaling] = React.useState<boolean>(false);
    const [selectedFile, setSelectedFile] = React.useState('');
    const [selectedTrendFile, setSelectedTrendFile] = React.useState('');

    React.useEffect(() => {
        $(fileInput.current).on("change", (evt: any) => {
            let fileName = (evt as React.ChangeEvent<HTMLInputElement>).target.value.split("\\").pop();
            if (fileName == "")
                return;
            setSelectedFile(fileName);
            readSingleFile((evt as React.ChangeEvent<HTMLInputElement>), false)
        });

        $(trendFileInput.current).on("change", (evt: any) => {
            let fileName = (evt as React.ChangeEvent<HTMLInputElement>).target.value.split("\\").pop();
            if (fileName == "")
                return;
            setSelectedTrendFile(fileName);
            readSingleFile((evt as React.ChangeEvent<HTMLInputElement>), true);
        });

        props.SetWarning(["Ensure all scaling values are correct.", "Ensure all virtual channels are setup."])


        return () => {
            $(".custom-file-input").off('change');
        }
    }, [])

    React.useEffect(() => {
        let e = []; 
        if (props.Channels.filter((item) => (item.Series.filter(s => s.SeriesType != 'Values').length == 0)) && !props.TrendChannels)
            e.push('At least 1 event channel has to be set up.');
        props.SetError(e);
    }, [props.Channels]);

    function readSingleFile(evt: React.ChangeEvent<HTMLInputElement>, isTrend: boolean) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];

        if (!f) {
            return;
        }
        if (f.name.toLowerCase().indexOf('.cfg') >= 0 && !isTrend) {
            let r = new FileReader();
            r.onload = (e) => {

                let contents = e.target.result as string;

                let parser = new CFGParser(contents, props.MeterKey);
                props.UpdateChannels(parser.Channels);
                clearAssetsChannels();
            }
            r.readAsText(f);
        }
        else if (f.name.toLowerCase().indexOf('.par') >= 0 && !isTrend) {
            let r = new FileReader();
            r.onload = (e) => {

                let contents = e.target.result as string;
                let parser = new PARParser(contents, props.MeterKey);
                props.UpdateChannels(parser.Channels);
                clearAssetsChannels();
            }
            r.readAsText(f);
        }
        else if (f.name.toLowerCase().indexOf('.pqd') >= 0) {
            let r = new FileReader();
            r.onload = async (e) => {

                let contents = e.target.result as ArrayBuffer;
                let parser = new PQDIFParser(contents, props.MeterKey);
                await parser.LoadChannels();
                clearAssetsChannels();

                if (isTrend) 
                    props.UpdateChannels((c) => {
                        const u = c.filter(c => c.MeasurementCharacteristic == 'Instantaneous').concat(parser.Channels);
                        // ID's need to update due to the filtering
                        u.forEach((c, i) => c.ID = i);
                        return u;
                    });
                else
                    props.UpdateChannels((c) => {
                        const u = c.filter(c => c.MeasurementCharacteristic != 'Instantaneous').concat(parser.Channels);
                        u.forEach((c, i) => c.ID = i);
                        return u;
                    });               

            }
            r.readAsArrayBuffer(f);

        }
        else
            setShowCFGError(true);
    }

    function deleteChannel(index:number): void {
        let channels: Array<OpenXDA.Types.Channel> = _.clone(props.Channels);
        let record: OpenXDA.Types.Channel = channels.splice(index, 1)[0];
        props.UpdateChannels(channels);

        if (record.Asset == '') return;

        let assets: Array<OpenXDA.Types.Asset> = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));

        if (assets != null && assets.length > 0) {
            let asset = assets.find(a => a.AssetKey == record.Asset)
            if (asset == null) return;

            let channelIndex = asset.Channels.findIndex(c => c.ID = record.ID);
            if (channelIndex < 0) return;

            asset.Channels.splice(channelIndex, 1)
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

    function editChannel(channel: OpenXDA.Types.Channel) {
        let index = props.Channels.findIndex(ch => ch.ID == channel.ID);
        let updated = _.cloneDeep(props.Channels)
        if (index > -1)
            updated[index] = channel;
        else
            updated.push(channel);
     
        props.UpdateChannels(updated);
    }

    function clearSpareChannels() {
        let channels: Array<OpenXDA.Types.Channel> = _.clone(props.Channels);
        let assets: Array<OpenXDA.Types.Asset> = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));

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

    function IsSpare(ch: OpenXDA.Types.Channel): boolean {
        const regex = new RegExp('\(A[0-9]+\)Analog Channel [0-9]+');

        return ch.Description.toLowerCase() == 'spare' || (regex.test(ch.Description) && ch.MeasurementType == 'Digital') ;
    }

    const NSpare = props.Channels.filter(c => IsSpare(c)).length;

    const IsPQD = selectedFile.length > 0 ? selectedFile.toLowerCase().indexOf('.pqd') >= 0 : false;

    return (
        <>
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-primary" onClick={() => {
                        setSelectedFile('');
                        setSelectedTrendFile('');
                        let channels: Array<OpenXDA.Types.Channel> = [
                            { ID: 0, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'VBN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage BN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 2, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'VCN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage CN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 3, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'IA', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current A', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 4, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'IB', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current B', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 5, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'IC', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current C', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 6, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'RES', Name: 'IR', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current RES', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                        ]
                        props.UpdateChannels(channels);
                        clearAssetsChannels();
                    }}>Default Setup</button>
                </div>
                <div className="col-6">
                    <div className="form-group" style={{ width: '100%' }}>
                        <div className="custom-file" style={IsPQD ? { width: '50%' } : {}}>
                            <input type="file" className="custom-file-input" ref={fileInput} accept=".cfg,.pqd" />
                            <label className={"custom-file-label" + (selectedFile.length > 0 ? " selected" : "")} > {selectedFile.length > 0 ? selectedFile : 'Choose cfg or pqd file for event data.'}</label>
                        </div>
                        <div className="custom-file" style={{ width: '50%', visibility: (IsPQD? undefined : 'hidden') }}>
                            <input type="file" className="custom-file-input" ref={trendFileInput} accept=".pqd" />
                            <label className={"custom-file-label" + (selectedTrendFile.length > 0 ? " selected" : "")} > {selectedTrendFile.length > 0 ? selectedTrendFile : 'Choose pqd trending file.'}</label>
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <button className="btn btn-primary pull-right" disabled={NSpare == 0} onClick={() => setShowSpareWarning(true)}>Remove Spare</button>
                </div>
                <div className="col-1">
                    <button className="btn btn-primary pull-right" disabled={props.Channels.length == 0} onClick={() => {
                        props.UpdateChannels([])
                        setSelectedFile('');
                        setSelectedTrendFile('');
                    }
                    }>Clear Channels</button>
                </div>
                <div className="col-1">
                    <button className="btn btn-primary pull-right" disabled={props.Channels.length == 0} onClick={() => {
                        setShowScaling(true);
                    }
                    }>Scale Channels</button>
                </div>

                <div className="col-1">
                    <button className="btn btn-primary pull-right" onClick={() => {
                        let channel: OpenXDA.Types.Channel = { ID: props.Channels.length == 0 ? 1 : Math.max(...props.Channels.map(ch => ch.ID)) + 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel
                        let channels: Array<OpenXDA.Types.Channel> = _.clone(props.Channels);
                        channels.push(channel);
                        props.UpdateChannels(channels);
                    }}>Add Channel</button>
                </div>

            </div>
            <div style={{ width: '100%', maxHeight: innerHeight - 410, padding: 30 }}>
                <Table<OpenXDA.Types.Channel> cols={[
                    {
                        key: 'Series', label: 'Channel', headerStyle: { width: '7%' }, rowStyle: { width: '7%' }, content: (item) => <Input<OpenXDA.Types.Series> Field={'SourceIndexes'}
                            Record={item.Series[0]} Setter={(series) => {
                            item.Series[0].SourceIndexes = series.SourceIndexes;
                            editChannel(item)
                        }} Label={''} Valid={() => true}/>
                    },
                    {
                        key: 'Name', label: 'Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'Name'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />
                    },
                    {
                        key: 'MeasurementType', label: 'Type', headerStyle: { width: '13%' }, rowStyle: { width: '13%' }, content: (item) => <Select<OpenXDA.Types.Channel> Field={'MeasurementType'} Record={item} Setter={(ch) => editChannel(ch)} Label={''} Options={OpenXDA.Lists.MeasurementTypes.map((t) => ({ Value: t, Label: t }))} />
                    },
                    {
                        key: 'MeasurementCharacteristic', label: 'Char.', headerStyle: { width: '8%' }, rowStyle: { width: '8%' }, content: (item) => <Select<OpenXDA.Types.Channel> Field={'MeasurementCharacteristic'} Record={item} Setter={(ch) => editChannel(ch)} Label={''} Options={OpenXDA.Lists.MeasurementCharacteristics.map((t) => ({ Value: t, Label: t }))} />
                    },
                    {
                        key: 'Phase', label: 'Phase', headerStyle: { width: '13%' }, rowStyle: { width: '13%' }, content: (item) => <Select<OpenXDA.Types.Channel> Field={'Phase'} Record={item} Setter={(ch) => editChannel(ch)} Label={''} Options={OpenXDA.Lists.Phases.map((t) => ({ Value: t, Label: t }))} />
                    },
                    { key: 'HarmonicGroup', label: 'Harm', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'HarmonicGroup'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    { key: 'Adder', label: 'Adder', headerStyle: { width: '8%' }, rowStyle: { width: '8%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'Adder'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    { key: 'Multiplier', label: 'Multiplier', headerStyle: { width: '8%' }, rowStyle: { width: '8%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'Multiplier'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    {
                        key: 'Description', label: 'Description', headerStyle: { width: 'calc(24%-6px)' }, rowStyle: { width: 'calc(24%-6px)' }, content: (item) => <TextArea<OpenXDA.Types.Channel> Field={'Description'} Rows={2} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />
                    },
                    { key: 'DeleteButton', label: '', headerStyle: { width: '3%' }, rowStyle: { width: '3%', paddingTop: 36, paddingBottom: 36 }, content: (item, field, key, style, index) => <button className="btn btn-sm" onClick={(e) => deleteChannel(index)}><span>{TrashCan}</span></button> },
                    { key: 'Scroll', label: '', headerStyle: { width: '5px' }, rowStyle: { width: '0px' }, content: () => null }
                ]}
                    tableClass="table table-hover"
                    data={props.Channels.filter((item) => (item.Series.filter(s => s.SeriesType != 'Values').length > 0) ? props.TrendChannels : !props.TrendChannels)}
                    sortKey={'Series'}
                    ascending={false}
                    onSort={(d) => {}}
                    onClick={(fld) => { }}
                    tableStyle={{ padding: 0, width: 'calc(100%)', tableLayout: 'fixed' }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: innerHeight - 460, }}
                    rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
            <Warning Show={showCFGError} Title={'Error Parsing File'} Message={'File is not of type cfg, par, or pqd. Please only use cfg, or pqd files.'} CallBack={() => setShowCFGError(false)} />
            <Warning Show={showSpareWarning} Title={'Remove Spare Channels'} Message={`This will remove all Spare channels. This will remove ${NSpare} Channels from the Configuration.`} CallBack={(conf) => { if (conf) clearSpareChannels(); setShowSpareWarning(false); }} />
            <Modal Title="Scale Channels for New Meter" ShowX={true} ShowCancel={false} Show={showScaling} ConfirmText="Leave Scaling Window" CallBack={() => setShowScaling(false)} Size='xlg'>
                <ChannelScalingForm Channels={props.Channels} UpdateChannels={props.UpdateChannels}/>
            </Modal>
        </>
        );

}