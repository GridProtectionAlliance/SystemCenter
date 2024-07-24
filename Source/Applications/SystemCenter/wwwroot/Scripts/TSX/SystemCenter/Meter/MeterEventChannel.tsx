//******************************************************************************************************
//  MeterEventChannel.tsx - Gbtc
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
import { Application, OpenXDA as GemstoneOpenXDA} from '@gpa-gemstone/application-typings';
import { PhaseSlice, MeasurmentTypeSlice } from '../Store/Store'
import { useAppSelector, useAppDispatch } from '../hooks';
import { LoadingIcon, ServerErrorIcon, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { CrossMark, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { OpenXDA } from '../global';
import { SelectAscending, SelectSortKey, SelectEventChannels, SelectEventChannelStatus, SelectMeterID, dBAction } from '../Store/EventChannelSlice';
import { FetchChannels } from '../Store/EventChannelSlice';
import { IsNumber } from '@gpa-gemstone/helper-functions';
import { cloneDeep } from 'lodash';
import { ConfigTable } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table'
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

interface IProps { Meter: GemstoneOpenXDA.Types.Meter, IsVisible: boolean }
type RecordChange = Map<number, Map<keyof OpenXDA.EventChannel, string | number>>;

const MeterEventChannelWindow = (props: IProps) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(SelectEventChannels);
    const sortKey = useAppSelector(SelectSortKey)
    const ascending = useAppSelector(SelectAscending)
    const status = useAppSelector(SelectEventChannelStatus);
    const meterID = useAppSelector(SelectMeterID);

    const [recordChanges, setRecordChanges] = React.useState<RecordChange>(new Map<number, Map<keyof OpenXDA.EventChannel, number | string>>());

    const phases = useAppSelector(PhaseSlice.Data) as GemstoneOpenXDA.Types.Phase[];
    const measurementTypes = useAppSelector(MeasurmentTypeSlice.Data) as GemstoneOpenXDA.Types.MeasurementType[];
    const [assets, setAssets] = React.useState<GemstoneOpenXDA.Types.Asset[]>([]);

    const pStatus = useAppSelector(PhaseSlice.Status) as Application.Types.Status;
    const mtStatus = useAppSelector(MeasurmentTypeSlice.Status) as Application.Types.Status;
    const [assetStatus, setAssetStatus] = React.useState<Application.Types.Status>('idle')

    const [removeRecord, setRemoveRecord] = React.useState<OpenXDA.EventChannel|null>(null);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None' | 'Add')>('None');
    const roles = useAppSelector(SelectRoles);



    React.useEffect(() => {
        if (pStatus == 'unintiated' || pStatus == 'changed')
            dispatch(PhaseSlice.Fetch());
    }, [pStatus])

    React.useEffect(() => {
        if (mtStatus == 'unintiated' || mtStatus == 'changed')
            dispatch(MeasurmentTypeSlice.Fetch());
    }, [mtStatus])

    React.useEffect(() => {
        if (status == 'unintiated' || meterID !== props.Meter.ID || status == 'changed')
            dispatch(FetchChannels({ meterId: props.Meter.ID }));
    }, [props.Meter,status])

    React.useEffect(() => {
        if (!props.IsVisible)
            return;
        let assetHandle = getAssets();

        assetHandle.then(() => setAssetStatus('idle'), () => setAssetStatus('error'))
        return () => {
            if (assetHandle != null && assetHandle.abort != null)
                assetHandle.abort();
        }

    }, [props.IsVisible, props.Meter])

    React.useEffect(() => {

        let e = [];
        for (let id of recordChanges.keys()) {
            for (let k of recordChanges.get(id).keys()) {
                const val = recordChanges.get(id).get(k);
                if (k == 'Adder' && val != null && !AssetAttributes.isRealNumber(val))
                    e.push('All Adders must be numeric values.')
                if (k == 'Multiplier' && val != null && !AssetAttributes.isRealNumber(val))
                    e.push('All Multipliers must be numeric values.')
                if (k == 'ConnectionPriority' && val != null && !AssetAttributes.isRealNumber(val))
                    e.push('All Connection Priorities must be numeric values.')

                 if(k == 'Adder' && val == null)
                    e.push('All Channels must have an Adder.')
                if (k == 'Multiplier' && val == null)
                    e.push('All Channels must have a Multiplier.')
                if (k == 'ConnectionPriority' && val == null)
                    e.push('All Channels must have a Connection Priority.')

                if (k == 'Name' && (val == null || val.toString().length == 0))
                    e.push('All Channels must have a Name.')
                if (k == 'SourceIndices' && (val == null || val.toString().length == 0))
                    e.push('All Channels must have a valid Source Index.')

                if (k == 'Name' && val != null && val.toString().length > 0 && data.findIndex(c => c.Name.toLowerCase() == val.toString().toLowerCase() && id != c.ID) > -1)
                    e.push('All Channel Names must be unique.')
            }
        }

        setErrors(_.uniq(e));

    }, [recordChanges])

    function getAssets(): JQuery.jqXHR<GemstoneOpenXDA.Types.Asset[]> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Asset`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d: GemstoneOpenXDA.Types.Asset[]) => {
            setAssets(d)
        });
    }

    function applyUpdates(): void {
        for (let id of recordChanges.keys()) {
            const original = cloneDeep(data.find(r => r.ID == id)) as any;
            for (let k of recordChanges.get(id).keys()) {
                original[k] = (recordChanges.get(id).get(k as keyof OpenXDA.EventChannel)) as any
            }
            dispatch(dBAction({ record: original, verb: 'PATCH' }));
        }

        setRecordChanges(new Map<number, Map<keyof OpenXDA.EventChannel, number | string>>());
    }

    function replicateChanges(record: OpenXDA.EventChannel) {
        const result = { ...record } as any;
        if (recordChanges.has(result.ID)) {
            for (let k of recordChanges.get(result.ID).keys()) {
                result[k] = (recordChanges.get(result.ID).get(k as keyof OpenXDA.EventChannel)) as any
            }
        }
        return result as OpenXDA.EventChannel;
    }

    function createChange(record: OpenXDA.EventChannel, field: keyof OpenXDA.EventChannel) {
        setRecordChanges((original) => {
            let update = cloneDeep(original);
            if (!update.has(record.ID))
                update.set(record.ID, new Map<keyof OpenXDA.EventChannel, string | number>());
            update.get(record.ID).set(field, record[field] as string|number);
            return update;
        })

    }

    function isValid(fld: keyof OpenXDA.EventChannel, record: OpenXDA.EventChannel) {
        if (fld == 'SourceIndices')
            return record.SourceIndices != null && record.SourceIndices.trim().length > 0;
        if (fld == 'Name')
            return record.Name != null && record.Name.trim().length > 0 && record.Name.length < 200 && data.findIndex(item => item.Name == record.Name && item.ID != record.ID) == -1;
        if (fld == 'Adder')
            return record.Adder != null && IsNumber(record.Adder);
        if (fld == 'Multiplier')
            return record.Multiplier != null && IsNumber(record.Multiplier);
        if (fld == 'ConnectionPriority')
            return record.ConnectionPriority != null && IsNumber(record.ConnectionPriority);
        return true;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    if (assetStatus == 'error' || pStatus == 'error' || mtStatus == 'error' || status == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Event Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                    </div>
                </div>
            </div>
        </div>

    if (assetStatus == 'loading' || pStatus == 'loading' || mtStatus == 'loading' || status == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Event Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} Label={''} />
                    </div>
                </div>
            </div>
        </div>

    return <>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Event Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <ConfigTable.Table<OpenXDA.EventChannel>
                        LocalStorageKey="MeterEventChannelConfigTable"
                        TableClass="table table-hover"
                        Data={data.map(c => replicateChanges(c))}
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={() => false}
                        KeySelector={(item) => item.ID}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortKey)
                                dispatch(FetchChannels({ sortField: d.colField, ascending: !ascending, meterId: props.Meter.ID }));
                            else
                                dispatch(FetchChannels({ sortField: d.colField, ascending: true, meterId: props.Meter.ID }));
                        }}
                    >
                        <ConfigTable.Configurable Key='SourceIndices' Label='Channel' Default={true}>
                            <ReactTable.Column<OpenXDA.EventChannel>
                                Key={'SourceIndices'} Field={'SourceIndices'}
                                HeaderStyle={{ width: '7%' }} RowStyle={{ width: '7%' }}
                                Content={({ item }) => <Input<OpenXDA.EventChannel>
                                    Record={item} Field={'SourceIndices'}
                                    Label={''}
                                    Setter={(r) => createChange(r, 'SourceIndices')}
                                    Valid={(f) => isValid(f, item)} Disabled={!hasPermissions()}/>}>
                                Channel</ReactTable.Column>
                        </ConfigTable.Configurable >
                        <ReactTable.Column<OpenXDA.EventChannel>
                            Key={'Name'} Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => <Input<OpenXDA.EventChannel> Record={item} Field={'Name'}
                                Label={''} Setter={(r) => createChange(r, 'Name')}
                                Valid={(f) => isValid(f, item)} Disabled={!hasPermissions()}/>}
                        >
                            Name </ReactTable.Column>

                        <ConfigTable.Configurable Key='Description' Label='Description' Default={true}>
                            <ReactTable.Column<OpenXDA.EventChannel>
                                Key={'Description'} Field={'Description'} HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item }) => <Input<OpenXDA.EventChannel> Record={item}
                                    Field={'Description'} Label={''}
                                    Setter={(r) => createChange(r, 'Description')}
                                    Valid={(f) => isValid(f, item)} Disabled={!hasPermissions()}/>}>
                            </ReactTable.Column>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='MeasurementType' Label='Type' Default={true}>
                            <ReactTable.Column<OpenXDA.EventChannel>
                                Key={'MeasurementType'}
                                Field={'MeasurementType'}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                                Content={({ item }) => <Select Record={item} Field={'MeasurementTypeID'}
                                    Label={''}
                                    Options={measurementTypes.map(d => ({ Label: d.Name, Value: d.ID.toString() }))}
                                    Setter={(r) => createChange(r, 'MeasurementTypeID')} Disabled={!hasPermissions()}/>}>
                                Type
                            </ReactTable.Column>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Phase' Label='Phase' Default={true}>
                            <ReactTable.Column<OpenXDA.EventChannel>
                                Key={'Phase'}
                                Field={'Phase'}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                                Content={({ item }) => <Select Record={item} Field={'PhaseID'}
                                    Label={''} Options={phases.map(d => ({ Label: d.Name, Value: d.ID.toString() }))}
                                    Setter={(r) => createChange(r, 'PhaseID')} Disabled={!hasPermissions()}/>}>
                            </ReactTable.Column>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Adder' Label='Adder' Default={true}>
                            <ReactTable.Column<OpenXDA.EventChannel>
                                Key={'Adder'}
                                Field={'Adder'}
                                HeaderStyle={{ width: '7%' }}
                                RowStyle={{ width: '7%' }}
                                Content={({ item }) => <Input<OpenXDA.EventChannel>
                                    Record={item} Field={'Adder'} Type={'number'}
                                    Label={''} Setter={(r) => createChange(r, 'Adder')}
                                    Valid={(f) => isValid(f, item)} Disabled={!hasPermissions()}/>}>
                            </ReactTable.Column>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Multiplier' Label='Multiplier' Default={true}>
                            <ReactTable.Column<OpenXDA.EventChannel>
                                Key={'Multiplier'}
                                Field={'Multiplier'}
                                HeaderStyle={{ width: '7%' }}
                                RowStyle={{ width: '7%' }}
                                Content={({ item }) => <Input<OpenXDA.EventChannel>
                                    Record={item} Field={'Multiplier'} Type={'number'}
                                    Label={''} Setter={(r) => createChange(r, 'Multiplier')}
                                    Valid={(f) => isValid(f, item)} Disabled={!hasPermissions()}/>}>
                            </ReactTable.Column>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='Asset' Label='Asset' Default={true}>
                            <ReactTable.Column<OpenXDA.EventChannel>
                                Key={'Asset'} Field={'Asset'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item }) => <Select Record={item}
                                    Field={'AssetID'} Label={''}
                                    Options={assets.map(d => ({ Label: d.AssetKey, Value: d.ID.toString() }))}
                                    Setter={(r) => createChange(r, 'AssetID')} Disabled={!hasPermissions()}/>}>

                            </ReactTable.Column>
                        </ConfigTable.Configurable >
                        <ConfigTable.Configurable Key='ConnectionPriority' Label='Connection Type' Default={true}>
                            <ReactTable.Column<OpenXDA.EventChannel>
                                Key={'ConnectionPriority'}
                                Field={'ConnectionPriority'}
                                HeaderStyle={{ width: '7%' }}
                                RowStyle={{ width: '8%' }}
                                Content={({ item }) => <Select EmptyOption={true} Record={item}
                                    Field={'ConnectionPriority'} Label={''}
                                    Options={[{ Value: '0', Label: 'Primary' }, { Value: '1', Label: 'Secondary' }, { Value: '2', Label: 'Tertiary' }]}
                                    Setter={(r) => createChange(r, 'ConnectionPriority')}
                                    Disabled={(assets.find(d => d.ID == item.AssetID)?.AssetType != 'Transformer') || !hasPermissions()} />}>
                                Conn Type
                            </ReactTable.Column>
                        </ConfigTable.Configurable >
                        <ReactTable.Column<OpenXDA.EventChannel>
                            Key={'Remove'}
                            AllowSort={false}
                            HeaderStyle={{ width: '62px' }}
                            RowStyle={{ width: '62px' }}
                            Content={({ item }) => <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')}
                                onClick={(e) => { if (hasPermissions()) setRemoveRecord(item) }}><span>{TrashCan}</span></button>}>
                            <p></p>
                        </ReactTable.Column>
                    </ConfigTable.Table>

                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary pull-right" + (!hasPermissions() || assets.length == 0 ? ' disabled' : '')} data-tooltip='AddChannel' onMouseEnter={() => setHover('Add')} onMouseLeave={() => setHover('None')} onClick={() => {
                        if (hasPermissions() && assets.length > 0) {
                            let i = 1;
                            while (data.findIndex(item => item.Name.toLowerCase() == `channel ${i}`) > -1)
                                i = i + 1;

                            let newChannel: OpenXDA.EventChannel = {
                                Series: [],
                                ID: 0,
                                Meter: props.Meter.AssetKey,
                                ConnectionPriority: 0,
                                Asset: '',
                                MeasurementType: 'Voltage',
                                MeasurementCharacteristic: 'Instantaneous',
                                Phase: 'AN',
                                Name: 'Channel ' + i,
                                Adder: 0,
                                Multiplier: 1,
                                SamplesPerHour: 0,
                                PerUnitValue: null,
                                HarmonicGroup: 0,
                                Description: '',
                                Enabled: true,
                                SourceIndices: 'A1',
                                MeterID: props.Meter.ID,
                                AssetID: assets.length > 0 ? assets[0].ID : -1,
                                MeasurementTypeID: measurementTypes.length > 0 ? measurementTypes[0].ID : -1,
                                PhaseID: phases.length > 0 ? phases[0].ID : -1,
                                Trend: false
                            }

                            dispatch(dBAction({ verb: 'POST', record: newChannel }));
                        }
                    }}>Add Channel</button>
                </div>
                <ToolTip Show={hover == 'Add' && (!hasPermissions() || assets.length == 0)} Position={'top'} Theme={'dark'} Target={"AddChannel"}>
                    {!hasPermissions() ? <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p> : null}
                    {assets.length == 0 ? <p>Must connect assets to meter.</p> : null}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (errors.length > 0 || recordChanges.size == 0 ? ' disabled' : '')} onClick={() => { if (errors.length === 0 && recordChanges.size > 0 && hasPermissions())  applyUpdates()}}
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} data-tooltip={'save'}>Save Changes</button>
                    <ToolTip Show={hover == 'Update' && (errors.length > 0 || recordChanges.size == 0)} Position={'top'} Theme={'dark'} Target={"save"}>
                        {recordChanges.size == 0 && hasPermissions()? <p> No changes have been made. </p> : null}
                        {!hasPermissions() ? <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p> : null}
                        {errors.length > 0 ? errors.map((e, i) => <> {CrossMark} <p key={i}> {e} </p> </>) : null}
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (recordChanges.size == 0 ? ' disabled' : '')} onClick={() => { if (recordChanges.size > 0 && hasPermissions()) setRecordChanges(new Map<number, Map<keyof OpenXDA.EventChannel, number | string>>()); }}
                        onMouseEnter={() => setHover('Reset')} onMouseLeave={() => setHover('None')} data-tooltip={"clr"}>Clear Changes</button>
                <ToolTip Show={hover == 'Reset' && (recordChanges.size  > 0)} Position={'top'} Theme={'dark'} Target={"clr"}>
                        <p> There are {recordChanges.size} channels with changes that will be lost. </p>
                    </ToolTip>
                    <ToolTip Show={hover == 'Reset' && (recordChanges.size == 0)} Position={'top'} Theme={'dark'} Target={"clr"}>
                        <p> No changes have been made. </p>
                    </ToolTip>
                </div>
            </div>
        </div>
        <Warning Message={'This will permanently delete this Channel and cannot be undone.'} Show={removeRecord != null} Title={'Delete ' + (removeRecord?.Name ?? 'Channel')} CallBack={(c) => { if (c) dispatch(dBAction({ record: removeRecord, verb: 'DELETE' })); setRemoveRecord(null); }} />
    </>

}

export default MeterEventChannelWindow;