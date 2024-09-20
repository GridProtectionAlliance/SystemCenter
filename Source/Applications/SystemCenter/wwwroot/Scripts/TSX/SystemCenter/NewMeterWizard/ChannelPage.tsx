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
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { Modal, ToolTip, Warning, ServerErrorIcon, BtnDropdown } from '@gpa-gemstone/react-interactive';
import PARParser from '../../../TS/PARParser';
import { ConfigTable } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table'
import { TrashCan } from '@gpa-gemstone/gpa-symbols';
import ChannelScalingForm from '../Meter/ChannelScaling/ChannelScalingForm';
import { MeasurementCharacteristicSlice, MeasurmentTypeSlice, PhaseSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import TemplateWindow from './TemplateWindow';
import VirtualChannelModal from './VirtualChannelModal';
declare var homePath: string;

interface IProps {
    MeterKey: string,
    Channels: Array<OpenXDA.Types.Channel>,
    UpdateChannels: React.Dispatch<React.SetStateAction<OpenXDA.Types.Channel[]>>,
    UpdateAssets: (record: OpenXDA.Types.Asset[]) => void,
    SetError: (e: string[]) => void,
    SetWarning: (w: string[]) => void,
    TrendChannels: boolean,
    IsEngineer: boolean,
}

export default function ChannelPage(props: IProps) {
    const dispatch = useAppDispatch();
    const fileInput = React.useRef(null);

    const [showCFGError, setShowCFGError] = React.useState<boolean>(false);
    const [showSpareWarning, setShowSpareWarning] = React.useState<boolean>(false);
    const [showRemoveWarning, setShowRemoveWarning] = React.useState<boolean>(false);
    const [showScaling, setShowScaling] = React.useState<boolean>(false);
    const [showDialog, setShowDialog] = React.useState<boolean>(false);
    const [selectedFile, setSelectedFile] = React.useState('');
    const [currentChannels, setCurrentChannels] = React.useState<OpenXDA.Types.Channel[]>([]);
    const [parsedChannels, setParsedChannels] = React.useState<OpenXDA.Types.Channel[]>([]);
    const [channelStatus, setChannelStatus] = React.useState<Application.Types.Status>('idle');
    const [showVirtualChannelModal, setShowVirtualChannelModal] = React.useState<boolean>(false);

    const [sortKey, setSortKey] = React.useState<string>('Series');
    const [asc, setAsc] = React.useState<boolean>(false);

    const phases = useAppSelector(PhaseSlice.Data);
    const measurementCharateristics = useAppSelector(MeasurementCharacteristicSlice.Data);
    const measurementTypes = useAppSelector(MeasurmentTypeSlice.Data);

    const pStatus = useAppSelector(PhaseSlice.Status);
    const mCStatus = useAppSelector(MeasurementCharacteristicSlice.Status);
    const mTStatus = useAppSelector(MeasurmentTypeSlice.Status);

    const baseWarnings: string[] = ["Ensure all Scaling values are correct.", "Ensure all virtual Channels are configured."];
    const serverParsedExtensions: string[] = ['pqd', 'sel', 'cev', 'eve', 'ctl', 'txt'];
    const webParsedExtensions: string[] = ['cfg', 'par'];
    const allTypes: string = webParsedExtensions.join(", ") + ", " + serverParsedExtensions.join(", ");

    React.useEffect(() => {
        if (mTStatus == 'unintiated' || mTStatus == 'changed')
            dispatch(MeasurmentTypeSlice.Fetch()); 
    }, [mTStatus]);

    React.useEffect(() => {
        if (mCStatus == 'unintiated' || mCStatus == 'changed')
            dispatch(MeasurementCharacteristicSlice.Fetch()); 
    }, [mCStatus]);

    React.useEffect(() => {
        if (pStatus == 'unintiated' || pStatus == 'changed')
            dispatch(PhaseSlice.Fetch()); 
    }, [pStatus]);

    React.useEffect(() => {
        props.SetWarning(baseWarnings)

        $(fileInput.current).on("change", (evt: any) => {
            if (evt.target.value == null)
                return;
            let fileName = (evt as React.ChangeEvent<HTMLInputElement>).target.value.split("\\").pop();
            if (fileName == "")
                return;
            setSelectedFile(fileName);
            readSingleFile(evt as React.ChangeEvent<HTMLInputElement>);
            $(fileInput.current).val(null);
        });

        return () => {
            $(".custom-file-input").off('change');
        }
    }, [])

    React.useEffect(() => {
        setSelectedFile('');
    }, [props.TrendChannels]);

    React.useEffect(() => {
        setCurrentChannels(getCurrentChannels(props.TrendChannels));
    }, [props.Channels, props.TrendChannels]);

    React.useEffect(() => {
        setCurrentChannels((d) => {
            if (sortKey == 'Series') {
                const u = _.cloneDeep(d);
                u.sort((a, b) => (asc ? 1 : -1) * (a.Series[0].SourceIndexes > b.Series[0].SourceIndexes ? 1 : -1));
                return u;
            }
            return _.orderBy(d, [sortKey], [(!asc ? "asc" : "desc")]);
        })
    }, [sortKey, asc])

    React.useEffect(() => {
        setChannelStatus('idle');
        let e = baseWarnings;
        if (currentChannels.length == 0 && !props.TrendChannels)
            e.push('No event channels are configured.');
        props.SetWarning(e);
    }, [currentChannels]);

    const ParseFile = React.useCallback((content: ArrayBuffer, fileName: string) => {
        let extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.') + 1, fileName.length);

        // CFG files are only valid for events
        if (extension == 'cfg' && props.TrendChannels) {
            setShowCFGError(true);
            setChannelStatus('idle');
            setSelectedFile('');
        }
        // Handle js parsed files
        else if (webParsedExtensions.indexOf(extension) >= 0) {

            let parser;
            if (extension === 'cfg')
                parser = new CFGParser(new TextDecoder('utf-8').decode(content), props.MeterKey);
            else
                parser = new PARParser(new TextDecoder('utf-8').decode(content), props.MeterKey);

            handleParsedChannels(parser.Channels);
        }
        else if (serverParsedExtensions.indexOf(extension) >= 0) {
            $.ajax({
                type: 'POST',
                url: `${homePath}api/SystemCenter/Parse/${extension}/${props.MeterKey}`,
                contentType: "application/octet-stream",
                processData: false,
                data: content,
                cache: false,
                async: true
            }).done((data: OpenXDA.Types.Channel[]) => {
                handleParsedChannels(data);
                // Need to fetch these after since the server parser will add new things to these if it spots them
                dispatch(PhaseSlice.SetChanged());
                dispatch(MeasurementCharacteristicSlice.SetChanged());
                dispatch(MeasurmentTypeSlice.SetChanged());
            }).fail(() => {
                setChannelStatus('error');
            });
        }
        else {
            setShowCFGError(true);
            setChannelStatus('idle');
            setSelectedFile('');
        }
    }, [props.TrendChannels]);

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

        let r = new FileReader();
        r.onload = (e) => {
            ParseFile(e.target.result as ArrayBuffer, f.name)
        }
           
        r.readAsArrayBuffer(f);
    }
    const handleParsedChannels = React.useCallback((newChannels: OpenXDA.Types.Channel[]) => {
        if (newChannels.findIndex(chan => (chan.Trend !== props.TrendChannels)) >= 0) {
            setParsedChannels(newChannels);
            setShowDialog(true);
        } else
            addChannels(newChannels, false);
    }, [props.TrendChannels]);

    // Note: This will only add channels of the type (Trend or event) that match the mode of the component defined in props.TrendChannels
    const addChannels = React.useCallback((newChannels: OpenXDA.Types.Channel[], addAll: boolean) => {
        const filteredChannels = addAll ? newChannels : newChannels.filter(chan => (chan.Trend === props.TrendChannels));
        const otherChannels = addAll ? [] : getCurrentChannels(!props.TrendChannels);
        const allChannels: OpenXDA.Types.Channel[] = [...otherChannels, ...filteredChannels];
        // ID's need to update due to filtering and combining
        allChannels.forEach((chan, index) => chan.ID = index);
        props.UpdateChannels(allChannels);
        clearAssetsChannels();
    }, [props.TrendChannels]);

    function addChannel(channel: OpenXDA.Types.Channel) {
        channel.ID = props.Channels.length == 0 ? 1 : Math.max(...props.Channels.map(ch => ch.ID)) + 1;
        let channels: Array<OpenXDA.Types.Channel> = [channel].concat(_.cloneDeep(props.Channels));
        props.UpdateChannels(channels);
    }

    function addManualChannel() {
        const channel: OpenXDA.Types.Channel = {
            ID: props.Channels.length == 0 ? 1 : Math.max(...props.Channels.map(ch => ch.ID)) + 1,
            Meter: props.MeterKey, Asset: '',
            MeasurementType: 'Voltage',
            MeasurementCharacteristic: 'Instantaneous',
            Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1,
            SamplesPerHour: 0, PerUnitValue: null,
            HarmonicGroup: 0, Description: 'Voltage AN',
            Enabled: true, Series: [{
                ID: 0,
                ChannelID: 0,
                SeriesType: 'Values',
                SourceIndexes: ''
            } as OpenXDA.Types.Series],
            ConnectionPriority: 0, Trend: false
        } as OpenXDA.Types.Channel
        console.log("ye")
        addChannel(channel);
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

        const digital = regex.test(ch.Description) && ch.MeasurementType == 'Digital';
        const sparePhrase = ch.Description != null && [
            'spare',
            'virtual spare',
            'spare virtual',
            'current spare',
            'spare current',
            'voltage spare',
            'spare voltage',
            'spare trigger',
            'spare channel'].includes(ch.Description.toLowerCase());
        
        return sparePhrase || digital;

    }

    const NSpare = props.Channels.filter(c => IsSpare(c)).length;

    if (channelStatus === 'error') 
        return <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={'A server error has occurred. Please contact your administrator.'} />
                </div>
        </div>

    return <>
        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
            <div className="row justify-content-between">
                <div className="col-lg-2 col text-center">
                    <TemplateWindow IsEngineer={props.IsEngineer} TrendChannels={props.TrendChannels}
                        Upload={(d, f) => {
                            setChannelStatus('loading');
                            ParseFile(d, f);
                    }} />
                </div>
                <div className="d-none col-5 col-xl-4 d-lg-block">
                    <div className="form-group" style={{ width: '100%' }}>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" ref={fileInput} />
                            <label className={"custom-file-label" + (selectedFile.length > 0 ? " selected" : "")} > {selectedFile.length > 0 ? selectedFile : `Choose file for ${props.TrendChannels ? 'trend' : 'event'} channel data.`}</label>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-3 col-xl-2 text-center">
                    {selectedFile === '' ?
                        <>
                            <BtnDropdown Label='Remove All'
                                Callback={() => setShowRemoveWarning(true)}
                                Size={'sm'}
                                Disabled={currentChannels.length === 0}
                                Options={[{
                                    Label: 'Remove Spare', Disabled: NSpare == 0, Callback: () => setShowSpareWarning(true), 
                                    ToolTipContent: <p>No spare channels were identified.</p>, ShowToolTip: true, ToolTipLocation: 'left'
                                }]}
                                ShowToolTip={currentChannels.length === 0}
                                BtnClass={'btn-info'}
                                TooltipContent={
                                    <>
                                        {currentChannels.length === 0 ? <p>No channels to remove.</p> : null}
                                    </>
                                }
                            />
                        </> :
                        <>
                            <BtnDropdown Label='Remove Spare' Callback={() => setShowSpareWarning(true)}
                                Size={'sm'}
                                Disabled={NSpare == 0}
                                Options={[{
                                    Label: 'Remove All', Disabled: currentChannels.length === 0, Callback: () => {
                                        props.UpdateChannels(getCurrentChannels(!props.TrendChannels));
                                        setSelectedFile('');
                                    }
                                }]}
                                ShowToolTip={true}
                                BtnClass={'btn-info' }
                                TooltipContent={<>
                                    {NSpare == 0 ? <p>No spare channels were identified.</p> : null}
                                    {NSpare > 0 ? <p>Channels are considered Spare if the Description is
                                        "spare", "virtual spare", "voltage spare", "current spare", "spare virtual",
                                        "spare channel", "spare voltage", "spare current", "spare trigger" or they are digital with description "A00 analog channel 00". </p> : null}
                                </>}
                            />
                        </>
                    }
                </div>
                <div className="d-none col col-lg-2 d-xl-block text-center">
                    <button className="btn btn-info btn-sm" disabled={currentChannels.length == 0} onClick={() => {
                        setShowScaling(true);
                    }
                    }>Scale</button>
                </div>
                <div className="col col-lg-2">
                    {!props.TrendChannels ?
                        <>
                            {selectedFile === '' ?
                                <BtnDropdown Label="Add Manual Channel"
                                    Callback={addManualChannel}
                                    BtnClass={'btn btn-info'}
                                    Options={[
                                        { Label: 'Add Virtual Channel', Callback: () => { setShowVirtualChannelModal(true) } }
                                    ]}
                                /> :
                                <BtnDropdown Label = "Add Virtual Channel"
                                    Callback={() => { setShowVirtualChannelModal(true) }}
                                    BtnClass={'btn btn-info'}
                                    Options={[
                                        { Label: 'Add Manual Channel', Callback: addManualChannel }
                                    ]}
                                />
                            }
                        </> : <></>
                    }
                </div>
            </div>
            {props.TrendChannels && currentChannels.length == 0 ? <div className="row"> <div className="col-12">
                <div className="alert alert-info">
                    Depending on your system configuration openXDA may add trend channels automatically and you may not need to add them here.
                    For more information please contact your administrator.
                </div></div>
            </div> : null}
            <div className={'row'} style={{ flex: 1, overflow: 'hidden' }}>
                <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                    <ConfigTable.Table<OpenXDA.Types.Channel>
                        LocalStorageKey="ChannelPageConfigTable"
                        TableClass="table table-hover"
                        Data={currentChannels}
                        SortKey={sortKey}
                        Ascending={asc}
                        TheadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={() => false}
                        KeySelector={(item) => item.ID}
                        OnSort={(d) => {
                            if (d.colKey === sortKey)
                                setAsc((x) => !x);
                            else
                                setAsc(false);
                            setSortKey(d.colKey);
                        }}
                    >
                        <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{width: 'auto'}}
                            RowStyle={{width: 'auto'}}
                            Content={({ item }) => <Input<OpenXDA.Types.Channel> Field={'Name'}
                                Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />}
                        > Name
                        </ReactTable.AdjustableColumn>
                        <ConfigTable.Configurable Key='Series' Label='Channel' Default={true}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Series'}
                                AllowSort={true}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Input<OpenXDA.Types.Series> Field={'SourceIndexes'}
                                    Record={item.Series[0]} Setter={(series) => {
                                        item.Series[0].SourceIndexes = series.SourceIndexes;
                                        editChannel(item)
                                    }} Label={''} Valid={() => true} />}
                            > Channel
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='MeasurementType' Label='Type' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'MeasurementType'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Select<OpenXDA.Types.Channel> Field={'MeasurementType'}
                                Record={item} Setter={(ch) => editChannel(ch)} Label={''}
                                    Options={measurementTypes.map((t) => ({ Value: t.Name, Label: t.Name }))} />}>
                            Type
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='MeasurementCharacteristic' Label='Characteristic' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel> Key={'MeasurementCharacteristic'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Select<OpenXDA.Types.Channel>
                                    Field={'MeasurementCharacteristic'} Record={item}
                                    Setter={(ch) => editChannel(ch)} Label={''}
                                    Options={measurementCharateristics.map((t) => ({ Value: t.Name, Label: t.Name }))}/>}>
                                Characteristic
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='Phase' Label='Phase' Default={true}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Phase'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Select<OpenXDA.Types.Channel> Field={'Phase'}
                                    Record={item} Setter={(ch) => editChannel(ch)} Label={''}
                                    Options={phases.map((t) => ({ Value: t.Name, Label: t.Name }))} />}>
                                    Phase
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='SamplesPerHour' Label='Sampling Rate' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'SamplesPerHour'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Input<OpenXDA.Types.Channel>
                                    Field={'SamplesPerHour'} Type={'number'} Record={item} Valid={() => true}
                                    Setter={(ch) => editChannel(ch)} Label={''} />}>
                                Sampling Rate (sph)
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable>
                        <ConfigTable.Configurable Key='PerUnitValue' Label='Per Unit' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'PerUnitValue'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Input<OpenXDA.Types.Channel> Field={'PerUnitValue'} Type={'number'} Record={item}
                                    Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />}>
                                Per Unit
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='HarmonicGroup' Label='Harmonic' Default={false}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'HarmonicGroup'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Input<OpenXDA.Types.Channel> Field={'HarmonicGroup'}
                                    Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />}>
                                Harmonic
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Adder' Label='Adder' Default={true}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Adder'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Input<OpenXDA.Types.Channel> Field={'Adder'} Type={'number'}
                                    Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />}>
                                Adder
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Multiplier' Label='Multiplier' Default={true}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Multiplier'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <Input<OpenXDA.Types.Channel> Field={'Multiplier'}
                                    Type={'number'} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />}>
                                Multiplier
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Description' Label='Description' Default={true}>
                            <ReactTable.AdjustableColumn<OpenXDA.Types.Channel>
                                Key={'Description'}
                                HeaderStyle={{width: 'auto'}}
                                RowStyle={{width: 'auto'}}
                                Content={({ item }) => <TextArea<OpenXDA.Types.Channel> Field={'Description'}
                                    Rows={2} Record={item} Valid={() => true} Setter={(ch) => editChannel(ch)} Label={''} />}>
                                Description
                            </ReactTable.AdjustableColumn>
                        </ConfigTable.Configurable >
                        <ReactTable.Column<OpenXDA.Types.Channel>
                            Key={'DeleteButton'}
                            AllowSort={false}
                            Content={({ index }) => <button className="btn btn-sm"
                                onClick={(e) => deleteChannel(index)}><span>{TrashCan}</span></button>}
                            RowStyle={{ width: '62px', paddingTop: 36, paddingBottom: 36 }}
                        >
                            <p></p>
                        </ReactTable.Column>
                    </ConfigTable.Table>
            </div>
        </div>
            <Warning Show={showCFGError} Title={'Error Parsing File'} Message={`File type not supported. Please select a file of the following types: ${allTypes}. Note COMTRADE files for trending data are automatically ingested using the event channels and can not be uploaded in the wizard.`} CallBack={() => setShowCFGError(false)} />
            <Warning Show={showSpareWarning} Title={'Remove Spare Channels'} Message={`This will remove all Spare Channel(s). This will remove ${NSpare} Channel(s) from the configuration.`} CallBack={(conf) => { if (conf) clearSpareChannels(); setShowSpareWarning(false); }} />
            <Warning Show={showRemoveWarning} Title={'Remove All Channels'}
                Message={`This will remove all Channel(s). This will remove ${getCurrentChannels(props.TrendChannels).length} Channel(s) from the configuration.`}
                CallBack={(conf) => {
                    if (conf) {
                        props.UpdateChannels(getCurrentChannels(!props.TrendChannels));
                        setSelectedFile('');
                    }
                    setShowRemoveWarning(false);
                }} />
            <Modal Title="Scale Channels" ShowX={true} ShowCancel={false} Show={showScaling} ConfirmText="Close Scaling Window" CallBack={() => setShowScaling(false)} Size='xlg'>
                <ChannelScalingForm Channels={currentChannels} UpdateChannels={editChannels} ChannelStatus={channelStatus} Key={props.MeterKey} />
            </Modal>
            <Modal Title={"Add All Channels"} ShowX={true} ShowCancel={true} Show={showDialog} CancelText={"Only " + (props.TrendChannels ? "Trend" : "Event")} ConfirmText="Add All" Size='sm' CallBack={(all) => {
                addChannels(parsedChannels, all);
                setShowDialog(false);
            }}>
                {"Add all Channels or only " + (props.TrendChannels ? "trend" : "event") + " Channels?"}
            </Modal>
            <VirtualChannelModal
                Channels={props.Channels}
                CurrentChannels={currentChannels}
                MeterKey={props.MeterKey}
                UpdateChannels={props.UpdateChannels}
                Shown={showVirtualChannelModal}
                SortKey={sortKey}
                Ascending={asc}
                Close={(channel) => {
                    setShowVirtualChannelModal(false);
                    if (channel !== undefined) {
                        addChannel(channel);
                    }
                }}

            />
        </div>
    </>
}