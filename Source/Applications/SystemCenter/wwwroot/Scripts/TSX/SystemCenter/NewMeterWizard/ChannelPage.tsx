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
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import CFGParser from '../../../TS/CFGParser';

import Table from '@gpa-gemstone/react-table'
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { ConfigurableTable, Modal, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import PARParser from '../../../TS/PARParser';
import PQDIFParser from '../../../TS/PQDIFParser';
import { TrashCan } from '@gpa-gemstone/gpa-symbols';
import ChannelScalingForm from '../Meter/ChannelScaling/ChannelScalingForm';
import { MeasurementCharacteristicSlice, MeasurmentTypeSlice, PhaseSlice } from '../Store/Store';
import { useAppDispatch } from '../hooks';

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
    const dispatch = useAppDispatch();
    const fileInput = React.useRef(null);
    const [showCFGError, setShowCFGError] = React.useState<boolean>(false);
    const [showSpareWarning, setShowSpareWarning] = React.useState<boolean>(false);
    const [showScaling, setShowScaling] = React.useState<boolean>(false);
    const [showDialog, setShowDialog] = React.useState<boolean>(false);
    const [selectedFile, setSelectedFile] = React.useState('');
    const [currentChannels, setCurrentChannels] = React.useState<OpenXDA.Types.Channel[]>([]);
    const [parsedChannels, setParsedChannels] = React.useState<OpenXDA.Types.Channel[]>([]);
    const [channelStatus, setChannelStatus] = React.useState<Application.Types.Status>('idle');

    const [hoverDefault, setHoverDefault] = React.useState<boolean>(false);

    const baseWarnings: string[] = ["Ensure all scaling values are correct.", "Ensure all virtual channels are setup."];
    const serverParsedExtensions: string[] = ['pqd', 'sel', 'cev', 'eve', 'ctl', 'txt'];
    const webParsedExtensions: string[] = ['cfg', 'par'];
    const allTypes: string = webParsedExtensions.join(", ") + ", " + serverParsedExtensions.join(", ");

    React.useEffect(() => {
        props.SetWarning(baseWarnings)

        // Need two seperate inputs because the page is expected to go between event and trend mode, thus if the same file is used it won't trigger the event
        $(fileInput.current).on("change", (evt: any) => {
            let fileName = (evt as React.ChangeEvent<HTMLInputElement>).target.value.split("\\").pop();
            if (fileName == "")
                return;
            setSelectedFile(fileName);
            readSingleFile(evt as React.ChangeEvent<HTMLInputElement>);
        });

        return () => {
            $(".custom-file-input").off('change');
        }
    }, [])

    React.useEffect(() => {
        setCurrentChannels(getCurrentChannels(props.TrendChannels));
    }, [props.Channels, props.TrendChannels]);

    React.useEffect(() => {
        setChannelStatus('idle');
        let e = baseWarnings;
        if (currentChannels.length == 0 && !props.TrendChannels)
            e.push('No event channels are set up.');
        props.SetWarning(e);
    }, [currentChannels]);

    function getCurrentChannels(trendChannels: boolean): OpenXDA.Types.Channel[] {
        let newCurrent: OpenXDA.Types.Channel[] = _.cloneDeep(props.Channels);
        return newCurrent.filter((item) => (item.Trend === trendChannels));
    }

    function readSingleFile(evt: React.ChangeEvent<HTMLInputElement>) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];

        if (!f) {
            return;
        }
        if (f.name.indexOf('.') < 0) {
            setShowCFGError(true);
            return;
        }
        setChannelStatus('loading');
        let extension = f.name.toLowerCase().substring(f.name.lastIndexOf('.') + 1, f.name.length);
        // Handle js parsed files
        if (webParsedExtensions.indexOf(extension) >= 0) {
            let r = new FileReader();
            r.onload = (e) => {

                let contents = e.target.result as string;
                let parser;
                if (extension === 'cfg')
                    parser = new CFGParser(contents, props.MeterKey);
                else
                    parser = new PARParser(contents, props.MeterKey);

                handleParsedChannels(parser.Channels);
            }
            r.readAsText(f);
        }
        // Handle server parsed files
        else if (serverParsedExtensions.indexOf(extension) >= 0) {
            let r = new FileReader();
            r.onload = async (e) => {
                let contents = e.target.result as ArrayBuffer;
                $.ajax({
                    type: 'POST',
                    url: `${homePath}api/SystemCenter/Parse/${extension}/${props.MeterKey}`,
                    contentType: "application/octet-stream",
                    processData: false,
                    data: contents,
                    cache: false,
                    async: true
                }).done((data: OpenXDA.Types.Channel[]) => {
                    handleParsedChannels(data);
                    // Need to fetch these after since the server parser will add new things to these if it spots them
                    dispatch(PhaseSlice.Fetch());
                    dispatch(MeasurementCharacteristicSlice.Fetch());
                    dispatch(MeasurmentTypeSlice.Fetch());
                }).fail(msg => {
                    if (msg.status == 500)
                        alert(msg.responseJSON.ExceptionMessage);
                    setChannelStatus('idle');
                });
            }
            r.readAsArrayBuffer(f);
        }
        else {
            setShowCFGError(true);
            setChannelStatus('idle');
        }
    }

    function handleParsedChannels(newChannels: OpenXDA.Types.Channel[]) {
        if (newChannels.findIndex(chan => (chan.Trend !== props.TrendChannels)) >= 0) {
            setParsedChannels(newChannels);
            setShowDialog(true);
        } else
            addChannels(newChannels, false);
    }

    // Note: This will only add channels of the type (Trend or event) that match the mode of the component defined in props.TrendChannels
    function addChannels(newChannels: OpenXDA.Types.Channel[], addAll: boolean) {
        const filteredChannels = addAll ? newChannels : newChannels.filter(chan => (chan.Trend === props.TrendChannels));
        const otherChannels = addAll ? [] : getCurrentChannels(!props.TrendChannels);
        const allChannels: OpenXDA.Types.Channel[] = [...otherChannels, ...filteredChannels];
        // ID's need to update due to filtering and combining
        allChannels.forEach((chan, index) => chan.ID = index);
        props.UpdateChannels(allChannels);
        clearAssetsChannels();
    }

    function deleteChannel(index:number): void {
        let channels: Array<OpenXDA.Types.Channel> = _.cloneDeep(props.Channels);
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

    function editChannels(channels: OpenXDA.Types.Channel[]) {
        let updated = _.cloneDeep(props.Channels)

        $.each(channels, (i, channel) => {
            let index = props.Channels.findIndex(ch => ch.ID == channel.ID);
            if (index > -1)
                updated[index] = channel;
            else
                updated.push(channel);
        });

        props.UpdateChannels(updated);
    }

    function clearSpareChannels() {
        let channels: Array<OpenXDA.Types.Channel> = _.cloneDeep(props.Channels);
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

    return (
        <>
            <div className="row">
                <div className="col-1">
                    <button className={"btn btn-primary" + (props.TrendChannels ? 'btn-disabled' : '')}
                        data-tooltip='DefaultChannel'
                        onMouseEnter={() => setHoverDefault(true)}
                        onMouseLeave={() => setHoverDefault(false)}
                        onClick={() => {
                        if (props.TrendChannels)
                            return;                           
                        setSelectedFile('');
                        let channels: Array<OpenXDA.Types.Channel> = [
                            { ID: 0, Trend: props.TrendChannels, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 1, Trend: props.TrendChannels, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'VBN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage BN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 2, Trend: props.TrendChannels, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'VCN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage CN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 3, Trend: props.TrendChannels, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'IA', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current A', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 4, Trend: props.TrendChannels, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'IB', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current B', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 5, Trend: props.TrendChannels, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'IC', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current C', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                            { ID: 6, Trend: props.TrendChannels, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'RES', Name: 'IR', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current RES', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0 } as OpenXDA.Types.Channel,
                        ]
                        props.UpdateChannels(channels);
                        clearAssetsChannels();
                    }}>Default Setup</button>
                    <ToolTip Show={hoverDefault} Position={'top'} Theme={'dark'} Target={"DefaultChannel"}>
                    <p>No Trending Channel Default Setup is available</p>
                    </ToolTip>
                </div>
                <div className="col-1">
                    {`Number of ${props.TrendChannels ? "Trend" : "Event"} Channels: ${currentChannels.length}`}
                </div>
                <div className="col-5">
                    <div className="form-group" style={{ width: '100%' }}>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" ref={fileInput} />
                            <label className={"custom-file-label" + (selectedFile.length > 0 ? " selected" : "")} > {selectedFile.length > 0 ? selectedFile :`Choose file for ${props.TrendChannels ? 'trend' : 'event'} channel data.`}</label>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary pull-right" disabled={NSpare == 0} onClick={() => setShowSpareWarning(true)}>Remove Spare</button>
                </div>
                <div className="col-1">
                    <button className="btn btn-primary pull-right" disabled={currentChannels.length === 0} onClick={() => {
                        props.UpdateChannels(getCurrentChannels(!props.TrendChannels)); // Set props to only non-shown channels for current page
                        setSelectedFile('');
                    }
                    }>Remove All</button>
                </div>
                <div className="col-1">
                    <button className="btn btn-primary pull-right" disabled={currentChannels.length == 0} onClick={() => {
                        setShowScaling(true);
                    }
                    }>Scale</button>
                </div>

                {props.TrendChannels ? null :
                    <div className="col-1">
                        <button className="btn btn-primary pull-right" onClick={() => {
                            let channel: OpenXDA.Types.Channel = { ID: props.Channels.length == 0 ? 1 : Math.max(...props.Channels.map(ch => ch.ID)) + 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series], ConnectionPriority: 0, Trend: false } as OpenXDA.Types.Channel
                            let channels: Array<OpenXDA.Types.Channel> = _.cloneDeep(props.Channels);
                            channels.push(channel);
                            props.UpdateChannels(channels);
                        }}>Add</button>
                    </div>}

            </div>
            <div style={{ width: '100%', maxHeight: innerHeight - 410, padding: 30 }}>
                <ConfigurableTable<OpenXDA.Types.Channel> cols={[
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
                    { key: 'SamplesPerHour', label: 'Sph.', headerStyle: { width: '8%' }, rowStyle: { width: '8%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'SamplesPerHour'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    { key: 'PerUnitValue', label: 'Per Unit', headerStyle: { width: '8%' }, rowStyle: { width: '8%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'PerUnitValue'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    { key: 'HarmonicGroup', label: 'Harm', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'HarmonicGroup'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    { key: 'Adder', label: 'Adder', headerStyle: { width: '8%' }, rowStyle: { width: '8%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'Adder'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    { key: 'Multiplier', label: 'Multiplier', headerStyle: { width: '8%' }, rowStyle: { width: '8%' }, content: (item) => <Input<OpenXDA.Types.Channel> Field={'Multiplier'} Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} /> },
                    {
                        key: 'Description', label: 'Description', headerStyle: { width: 'calc(24%-6px)' }, rowStyle: { width: 'calc(24%-6px)' }, content: (item) => <TextArea<OpenXDA.Types.Channel> Field={'Description'} Rows={2} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />
                    },
                    { key: 'DeleteButton', label: '', headerStyle: { width: '3%' }, rowStyle: { width: '3%', paddingTop: 36, paddingBottom: 36 }, content: (item, field, key, style, index) => <button className="btn btn-sm" onClick={(e) => deleteChannel(index)}><span>{TrashCan}</span></button> },
                    { key: 'Scroll', label: '', headerStyle: { width: '5px' }, rowStyle: { width: '0px' }, content: () => null }
                ]}
                    defaultColumns={["Series", "Name", "MeasurementType", "MeasurementCharacteristic", "Phase", "HarmonicGroup", "Adder", "Multiplier", "Description", "DeleteButton", "Scroll"]}
                    requiredColumns={["Name", "DeleteButton", "Scroll"]}
                    localStorageKey="ChannelPageConfigTable"
                    tableClass="table table-hover"
                    data={currentChannels}
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
            <Warning Show={showCFGError} Title={'Error Parsing File'} Message={`File is not one of following types ${allTypes}. Please only use files of those types.`} CallBack={() => setShowCFGError(false)} />
            <Warning Show={showSpareWarning} Title={'Remove Spare Channels'} Message={`This will remove all Spare channels. This will remove ${NSpare} Channels from the Configuration.`} CallBack={(conf) => { if (conf) clearSpareChannels(); setShowSpareWarning(false); }} />
            <Modal Title="Scale Channels for New Meter" ShowX={true} ShowCancel={false} Show={showScaling} ConfirmText="Leave Scaling Window" CallBack={() => setShowScaling(false)} Size='xlg'>
                <ChannelScalingForm Channels={currentChannels} UpdateChannels={editChannels} ChannelStatus={channelStatus}/>
            </Modal>
            <Modal Title={"Add All Channels"} ShowX={true} ShowCancel={true} Show={showDialog} CancelText={"Only " + (props.TrendChannels ? "Trend" : "Event")} ConfirmText="Add All" Size='sm' CallBack={(all) => {
                addChannels(parsedChannels, all);
                setShowDialog(false);
            }}>
                {"Add all channels or only " + (props.TrendChannels ? "trend" : "event") + " channels?"}
            </Modal>

        </>
        );

}