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
import { ConfigurableTable, LoadingIcon, ServerErrorIcon, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { CrossMark, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { OpenXDA } from '../global';
import { SelectAscending, SelectSortKey, SelectEventChannels, SelectEventChannelStatus, SelectMeterID, dBAction } from '../Store/EventChannelSlice';
import { FetchChannels } from '../Store/EventChannelSlice';
import { IsNumber } from '@gpa-gemstone/helper-functions';
import { cloneDeep } from 'lodash';
import { getAsset } from '../../../TS/Services/Asset';

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
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None' )>('None');

    

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
        <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Event Channels:</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
            <div style={{ width: '100%', height: window.innerHeight - 420 }}>
                <ConfigurableTable<OpenXDA.EventChannel>
                    cols={[
                        {
                            key: 'SourceIndices', field: 'SourceIndices', label: 'Channel', headerStyle: { width: '7%' }, rowStyle: { width: '7%' },
                            content: (c) => <Input<OpenXDA.EventChannel> Record={c} Field={'SourceIndices'} Label={''} Setter={(r) => createChange(r, 'SourceIndices')} Valid={(f) => isValid(f,c)} />
                        },
                        {
                            key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                            content: (c) => <Input<OpenXDA.EventChannel> Record={c} Field={'Name'} Label={''} Setter={(r) => createChange(r, 'Name')} Valid={(f) => isValid(f, c)} />
                        },
                        {
                            key: 'Description', field: 'Description', label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                            content: (c) => <Input<OpenXDA.EventChannel> Record={c} Field={'Description'} Label={''} Setter={(r) => createChange(r, 'Description')} Valid={(f) => isValid(f, c)} />
                        },
                        {
                            key: 'MeasurementType', field: 'MeasurementType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
                            content: (c) => <Select Record={c} Field={'MeasurementTypeID'} Label={''} Options={measurementTypes.map(d => ({ Label: d.Name, Value: d.ID.toString() }))} Setter={(r) => createChange(r, 'MeasurementTypeID')} />
                        },
                        {
                            key: 'Phase', field: 'Phase', label: 'Phase', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
                            content: (c) => <Select Record={c} Field={'PhaseID'} Label={''} Options={phases.map(d => ({ Label: d.Name, Value: d.ID.toString() }))} Setter={(r) => createChange(r, 'PhaseID')} />
                        },
                        {
                            key: 'Adder', field: 'Adder', label: 'Adder', headerStyle: { width: '7%' }, rowStyle: { width: '7%' },
                            content: (c) => <Input<OpenXDA.EventChannel> Record={c} Field={'Adder'} Type={'number'} Label={''} Setter={(r) => createChange(r, 'Adder')} Valid={(f) => isValid(f, c)} />
                        },
                        {
                            key: 'Multiplier', field: 'Multiplier', label: 'Multiplier', headerStyle: { width: '7%' }, rowStyle: { width: '7%' },
                            content: (c) => <Input<OpenXDA.EventChannel> Record={c} Field={'Multiplier'} Type={'number'} Label={''} Setter={(r) => createChange(r, 'Multiplier')} Valid={(f) => isValid(f, c)} />
                        },
                        {
                            key: 'Asset', field: 'Asset', label: 'Asset', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                            content: (c) => <Select Record={c} Field={'AssetID'} Label={''} Options={assets.map(d => ({ Label: d.AssetKey, Value: d.ID.toString() }))} Setter={(r) => createChange(r, 'AssetID')} />
                        },
                        {
                            key: 'ConnectionPriority', field: 'ConnectionPriority', label: 'Priority', headerStyle: { width: '7%' }, rowStyle: { width: '8%' },
                            content: (c) => <Select EmptyOption={true} Record={c} Field={'ConnectionPriority'} Label={''} Options={[{ Value: '0', Label: 'Primary' }, { Value: '1', Label: 'Secondary' }, { Value: '2', Label: 'Tertiary' }]} Setter={(r) => createChange(r, 'ConnectionPriority')} Disabled={assets.find(d => d.ID == c.AssetID)?.AssetType != 'Transformer'} />
                        },
                        {
                            key: 'Remove', label: '', headerStyle: { width: '3%' }, rowStyle: { width: '3%' },
                            content: (c) => <button className="btn btn-sm" onClick={(e) => setRemoveRecord(c)}><span>{TrashCan}</span></button>
                        },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    defaultColumns={["SourceIndices", "Name", "Phase", "MeasurementType", "Adder", "Multiplier", "Description", "Asset", "ConnectionPriority", "Remove", "Scroll"]}
                    requiredColumns={["Name", "Remove", "Scroll"]}
                    localStorageKey="MeterEventChannelConfigTable"
                    tableClass="table table-hover"
                    data={data.map(c => replicateChanges(c))}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {

                            if (d.colKey === "Scroll" || d.colKey == 'Remove')
                                return;

                            if (d.colKey === sortKey)
                                dispatch(FetchChannels({ sortField: d.colField, ascending: !ascending, meterId: props.Meter.ID }));
                            else 
                                dispatch(FetchChannels({ sortField: d.colField, ascending: true, meterId: props.Meter.ID }));
                        }}
                    onClick={() => { }}
                    tableStyle={{ padding: 0, width: 'calc(100%)', tableLayout: 'fixed'}}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 500, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                <button className="btn btn-primary pull-right" onClick={() => {
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
                }}>Add Channel</button>
            </div>
            <div className="btn-group mr-2">
                <button className={"btn btn-primary" + (errors.length > 0 || recordChanges.size == 0 ? ' disabled' : '')} onClick={() => { if (errors.length === 0 && recordChanges.size > 0) applyUpdates() }}
                    onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} data-tooltip={'save'}>Save Changes</button>
                <ToolTip Show={hover == 'Update' && (errors.length > 0 || recordChanges.size == 0)} Position={'top'} Theme={'dark'} Target={"save"}>
                    {recordChanges.size == 0 ? <p> No changes have been made. </p> : null}
                    {errors.length > 0 ? errors.map((e, i) => <> {CrossMark} <p key={i}> {e} </p> </>) : null}
                </ToolTip>
            </div>
            <div className="btn-group mr-2">
                <button className={"btn btn-primary" + (recordChanges.size == 0 ? ' disabled' : '')} onClick={() => { if (recordChanges.size > 0) setRecordChanges(new Map<number, Map<keyof OpenXDA.EventChannel, number | string>>()); }}
                    onMouseEnter={() => setHover('Reset')} onMouseLeave={() => setHover('None')} data-tooltip={"clr"}>Clear Changes</button>
                <ToolTip Show={hover == 'Reset' && (recordChanges.size  > 0)} Position={'top'} Theme={'dark'} Target={"clr"}>
                    <p> There are {recordChanges.size} channels with changes that will be lost. </p>
                </ToolTip>
            </div>
        </div>
        </div>
        <Warning Message={'This will permanently delete this Channel and cannot be undone.'} Show={removeRecord != null} Title={'Delete ' + (removeRecord?.Name ?? 'Channel')} CallBack={(c) => { if (c) dispatch(dBAction({ record: removeRecord, verb: 'DELETE' })); setRemoveRecord(null); }} />
        </>

}

export default MeterEventChannelWindow;

