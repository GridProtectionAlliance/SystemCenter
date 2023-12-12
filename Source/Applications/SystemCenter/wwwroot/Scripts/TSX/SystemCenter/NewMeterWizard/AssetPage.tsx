//******************************************************************************************************
//  AssetPage.tsx - Gbtc
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
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import BreakerAttributes from '../AssetAttribute/Breaker';
import BusAttributes from '../AssetAttribute/Bus';
import CapBankAttributes from '../AssetAttribute/CapBank';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import { AssetAttributes } from '../AssetAttribute/Asset';
import CapBankRelayAttributes from '../AssetAttribute/CapBankRelay';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ByAssetSlice, AssetTypeSlice } from '../Store/Store';
import { SelectAssetStatus, FetchAsset, SelectAssets } from '../Store/AssetSlice';
import { Modal, Search } from '@gpa-gemstone/react-interactive';
import DERAttributes from '../AssetAttribute/DER';
import AssetSelect from '../Asset/AssetSelect';
import { CrossMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { getAssetWithAdditionalFields } from '../../../TS/Services/Asset';
import LocationDrawings from '../Meter/PropertyUI/LocationDrawings';
import { GetNodeSize } from '@gpa-gemstone/helper-functions';
import Table, { Column } from '@gpa-gemstone/react-table';
import GenerationAttributes from '../AssetAttribute/Generation';
import StationAuxAttributes from '../AssetAttribute/StationAux';
import StationBatteryAttributes from '../AssetAttribute/StationBattery';

declare var homePath: string;

interface IProps {
    Assets: Array<AssetType>,
    Channels: OpenXDA.Types.Channel[],
    AssetConnections: Array<OpenXDA.Types.AssetConnection>,
    UpdateChannels: (record: OpenXDA.Types.Channel[]) => void,
    UpdateAssets: (record: OpenXDA.Types.Asset[]) => void,
    UpdateAssetConnections: (record: OpenXDA.Types.AssetConnection[]) => void,
    SetWarning: (e: string[]) => void,
    Location: OpenXDA.Types.Location,
    PageID?: string
}

type AssetType = OpenXDA.Types.Breaker | OpenXDA.Types.Bus | OpenXDA.Types.CapBank | OpenXDA.Types.Line | OpenXDA.Types.Transformer | OpenXDA.Types.CapBankRelay | OpenXDA.Types.Generation
    | OpenXDA.Types.StationAux | OpenXDA.Types.StationBattery;

export default function AssetPage(props: IProps) {
    const dispatch = useAppDispatch();

    const assetTypes = useAppSelector(AssetTypeSlice.Data);
    const atStatus = useAppSelector(AssetTypeSlice.Status);
    const assets = useAppSelector(SelectAssets);
    const aStatus = useAppSelector(SelectAssetStatus);
    const byAssetStatus = useAppSelector(ByAssetSlice.Status);
    const detailedAssets = useAppSelector(ByAssetSlice.Data);
    
    const [newEditAsset, setNewEditAsset] = React.useState<AssetType>(AssetAttributes.getNewAsset('Line'));
    const [editAssetKey, setEditAssetKey] = React.useState<string>('');
    const allAssetKeys = React.useMemo(() => detailedAssets.filter(a => a.ID !== newEditAsset.ID).map(a => a.AssetKey).concat(props.Assets.filter((a) => a.AssetKey !== editAssetKey).map(a => a.AssetKey)), [detailedAssets, props.Assets, newEditAsset.ID, editAssetKey])

    const [newEdit, setNewEdit] = React.useState<'New' | 'Edit'>('New');
    const [showAssetModal, setShowAssetModal] = React.useState<boolean>(false);

    const [showAssetSelect, setShowAssetSelect] = React.useState<boolean>(false);
    const [selectedAssets, setSelectedAssets] = React.useState<SystemCenter.Types.DetailedAsset[]>([]);

    const [sortKey, setSortKey] = React.useState<string>();
    const [asc, setAsc] = React.useState<boolean>(false);
    const assetData = React.useMemo(() => {
        const u = _.cloneDeep(props.Assets);
        if (sortKey === 'Channels')
            u.sort((a, b) => (asc? 1 : -1)* (a.Channels.length > b.Channels.length ? 1 : -1));
        else
            return _.orderBy(u, [sortKey], [asc ? 'asc' : 'desc']);
        return u;
    }, [asc, sortKey, props.Assets])

    const defaultFilt: Search.IFilter<SystemCenter.Types.DetailedAsset> = {
        FieldName: 'ID',
        SearchText: `(SELECT AssetID FROM AssetLocation WHERE LocationID = ${props.Location.ID})`,
        Operator: 'IN',
        Type: 'number',
        isPivotColumn: false
    }

    React.useEffect(() => {
        if (props.PageID !== undefined && !localStorage.hasOwnProperty(props.PageID))
            localStorage.setItem(props.PageID, JSON.stringify([defaultFilt]));
        setShowAssetSelect(props.Assets.length === 0);
    }, []);

    React.useEffect(() => {
        if (atStatus === 'unintiated' || atStatus === 'changed') {
            dispatch(AssetTypeSlice.Fetch());
            return function () {
            }
        }
    }, [atStatus]);

    React.useEffect(() => {
        if (aStatus === 'unintiated' || aStatus === 'changed') {
            dispatch(FetchAsset());
            return function () {
            }
        }
    }, [aStatus]);

    React.useEffect(() => {
        if (byAssetStatus === 'unintiated' || byAssetStatus === 'changed') {
            dispatch(ByAssetSlice.Fetch());
        }
    }, [byAssetStatus]);

    React.useEffect(() => {
        let e = [];
        if (props.Assets.length == 0)
            e.push('No assets are configured.');
        props.SetWarning(e)

        let assetList: SystemCenter.Types.DetailedAsset[] = [];
        props.Assets.forEach((asset) => {
            if (asset.ID > 0)
                assetList.push(detailedAssets.find(detailedAsset => detailedAsset.ID === asset.ID));
        });
        setSelectedAssets(assetList);
    }, [props.Assets]);

    React.useEffect(() => {
        if (newEditAsset.AssetType == 'Breaker') {
            let handle = getEDNAPoint(newEditAsset.ID);
            handle.done((ednaPoint: OpenXDA.Types.EDNAPoint) => {
                let record = { ...newEditAsset as OpenXDA.Types.Breaker };
                if (ednaPoint != undefined) {
                    record.EDNAPoint = ednaPoint.Point
                    setNewEditAsset(record);
                }
            });
            return () => {
                if (handle.abort !== undefined) handle.abort();
            }

        }
        else if (newEditAsset.AssetType == 'Line'){
            let handle = getLineSegment(newEditAsset.ID);
            handle.done((lineSegment: OpenXDA.Types.LineDetail) => {
                let record = _.clone(newEditAsset as OpenXDA.Types.Line);
                if (lineSegment != undefined) {
                    record.Detail = lineSegment
                }
                else {
                    record.Detail = AssetAttributes.getNewLineDetails();
                }

                setNewEditAsset(record);

            });
                return () => {
                    if (handle.abort !== undefined) handle.abort();
                }

            }


    }, [newEditAsset.AssetType]);
    
    function editAsset(index: number) {
        const asset = props.Assets.find(a => a.AssetKey === assetData[index].AssetKey);
        setNewEdit('Edit');
        setNewEditAsset(asset);
        setEditAssetKey(asset.AssetKey);
        setShowAssetModal(true);
    }

    function deleteAsset(index: number) {
        const i = props.Assets.findIndex(a => a.AssetKey === assetData[index].AssetKey);
        let list = _.clone(props.Assets);
        let record: Array<OpenXDA.Types.Asset> = list.splice(i, 1);
        let assetConnections: Array<OpenXDA.Types.AssetConnection> = _.clone(props.AssetConnections);
        let channels: Array<OpenXDA.Types.Channel> = _.clone(props.Channels);

        $.each(channels, (i, channel) => {
            if (channel.Asset == record[0].AssetKey)
                channel.Asset = ''
        });

        var index = assetConnections.findIndex(assetConnection => assetConnection.Parent == record[0].AssetKey || assetConnection.Child == record[0].AssetKey);
        while (index >= 0) {
            assetConnections.splice(index, 1);
            index = assetConnections.findIndex(assetConnection => assetConnection.Parent == record[0].AssetKey || assetConnection.Child == record[0].AssetKey);
        }
        
        props.UpdateAssets(list);
        props.UpdateChannels(channels);
        props.UpdateAssetConnections(assetConnections);

    }

    function getDifferentAsset(assetID: number): void {
        let assetTypeID = assets.find(a => a.ID == assetID)['AssetTypeID']; 
        let assetType = assetTypes.find(at => at.ID == assetTypeID)
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/${assetType.Name}/One/${assetID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((asset: OpenXDA.Types.Asset) => {
            asset.AssetType = assetType.Name;
            asset.Channels = [];
            setNewEditAsset(asset);
        });
    }

    function getLineSegment(lineID: number): JQuery.jqXHR<OpenXDA.Types.LineSegment> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Line/${lineID}/LineSegment`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    function getEDNAPoint(breakerID: number): JQuery.jqXHR<OpenXDA.Types.EDNAPoint> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Breaker/${breakerID}/EDNAPoint`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function showAttributes(): JSX.Element {
        if (newEditAsset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.Breaker} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Bus')
            return <BusAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset}/>;
        else if (newEditAsset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.CapBank} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'CapacitorBankRelay')
            return <CapBankRelayAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.CapBankRelay} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Line')
            return <LineAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.Line} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.Transformer} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'DER')
            return <DERAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.DER} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Generation')
            return <GenerationAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'StationAux')
            return <StationAuxAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'StationBattery')
            return <StationBatteryAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset} />;
    }

    const assetRows = [
        {
            key: 'Status', label: 'Status', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
            content: (item) => (item.ID == 0 ? 'New' : 'Existing')
        },
        {
            key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: '20%' }, rowStyle: { width: '20%' }
        },
        {
            key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' }
        },
        {
            key: 'AssetType', field: 'AssetType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }
        },
        {
            key: 'VoltageKV', field: 'VoltageKV', label: 'kV', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }
        },
        {
            key: 'Channels', label: 'Channels', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
            content: (item) => item.Channels.length
        },
        {
            key: 'Buttons', label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
            content: (item, key, field, style, index) => <>
                <button className="btn btn-sm" onClick={(e) => editAsset(index)}><span>{Pencil}</span></button>
                <button className="btn btn-sm" onClick={(e) => { e.stopPropagation(); deleteAsset(index); }}><span>{TrashCan}</span></button>
            </>
        },
        {
            key: 'Scroll', label: '', headerStyle: { width: '5px', padding: 0 }, rowStyle: { width: '0px', padding: 0 },
            content: () => null 
        }] as Column<AssetType>[];

        return (
            <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="d-none d-sm-block col-6 col-lg-4" style={{ overflow: 'hidden',height: '100%' }}>
                        <ul style={{ width: '100%', height: '100%', overflowY: 'auto'}}>
                            {
                                props.Channels.map((channel) => <li style={{textDecoration: (channel.Asset.length > 0 ? 'line-through' : null)}} key={channel.ID}>{channel.Name + ' - ' + channel.Description}</li>)
                            }
                        </ul>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-8" style={{ overflow: 'hidden', height: '100%' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row">
                                <div className="col">
                                    <div className="col pull-right btn-toolbar justify-content-end">
                                        <button className="btn btn-primary mr-4" onClick={() => { setNewEdit('New'); setShowAssetModal(true); }}>Add New</button>
                                        <button className="btn btn-primary mr-4" onClick={() => { setShowAssetSelect(true); }}>Add Existing</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col" style={{height: '100%'}}>
                                    <Table <AssetType> cols={assetRows}
                                        tableClass="table table-hover"
                                        data={assetData}
                                        sortKey={sortKey}
                                        ascending={asc}
                                        onSort={(d) => {
                                            if (d.colKey === "Scroll" || d.colKey == 'Buttons')
                                                return;
                                            if (d.colKey === sortKey)
                                                setAsc((x) => !x);
                                            else
                                                setAsc(false);
                                            setSortKey(d.colKey);
                                        }}
                                        onClick={(fld) => { }}
                                        tableStyle={{ padding: 0, width: 'calc(100%)', tableLayout: 'fixed', height: 'calc(100% - 16px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        tbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                        rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        selected={(item) => false}
                                    />
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
                <AssetSelect Type='multiple' StorageID={props.PageID} Title="Add Transmission Assets to Meter" ShowModal={showAssetSelect} SelectedAssets={selectedAssets}
                    OnCloseFunction={(selected, confirm) => {
                        setShowAssetSelect(false);
                        if (!confirm) return;

                        let list: Array<OpenXDA.Types.Asset> = [];
                        let channels: Array<OpenXDA.Types.Channel> = _.clone(props.Channels);
                        let assetConnections: Array<OpenXDA.Types.AssetConnection> = _.clone(props.AssetConnections);

                        let removedAssets: Array<OpenXDA.Types.Asset> = props.Assets.filter((asset) =>  asset.ID > 0 && selected.findIndex((selectedAsset) => (asset.ID === selectedAsset.ID)) < 0);

                        //Deal with removed assets
                        $.each(removedAssets, (index, asset) => {
                            $.each(channels, (index, channel) => {
                                if (channel.Asset == asset.AssetKey)
                                    channel.Asset = '';
                            });

                            var index = assetConnections.findIndex(assetConnection => assetConnection.Parent == asset.AssetKey || assetConnection.Child == asset.AssetKey);
                            while (index >= 0) {
                                assetConnections.splice(index, 1);
                                index = assetConnections.findIndex(assetConnection => assetConnection.Parent == asset.AssetKey || assetConnection.Child == asset.AssetKey);
                            }
                        });
                        let promises = [];
                        $.each(selected, async (index, record) => {
                            let assetRecord = getAssetWithAdditionalFields(record.ID, record.AssetType as OpenXDA.Types.AssetTypeName);
                            // Push promises into promises
                            promises.push(assetRecord);
                        });

                        //Add the new assets that have been created by the user
                        $.each(props.Assets.filter((asset) => asset.ID <= 0), (index, asset) => {
                            list.push(asset);
                        });

                        //Update selected
                        setSelectedAssets(selected);
                        Promise.all(promises).then(d => { props.UpdateAssets(list.concat(d)) })

                        //Update props
                        props.UpdateChannels(channels);
                        props.UpdateAssetConnections(assetConnections);
                    }}>
                    <li className="nav-item" style={{ width: '20%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <div className="form-group">
                                    <LocationDrawings LocationID={props.Location.ID} />
                                </div>
                            </form>
                        </fieldset>
                    </li>
                </AssetSelect>
                <Modal Show={showAssetModal}
                    Title={newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + (newEditAsset?.AssetName ?? 'Asset')}
                    ConfirmBtnClass={'btn-success'}
                    ConfirmText={newEdit == 'Edit' ? 'Save' : 'Add'}
                    CancelBtnClass={'btn-danger'}
                    CancelText={'Close'}
                    Size={'xlg'}
                    CallBack={(confirm) => {
                        setShowAssetModal(false);
                        
                        if (!confirm) {
                            setNewEditAsset(AssetAttributes.getNewAsset('Line'));
                            return;
                        }
                        
                        let record: OpenXDA.Types.Asset = _.clone(newEditAsset);
                        let list = _.clone(props.Assets);
                        let channels: Array<OpenXDA.Types.Channel> = _.clone(props.Channels);

                        $.each(channels, (index, channel) => {
                            if (channel.Asset == record.AssetKey)
                                channel.Asset = ''

                            if (record.Channels.findIndex(c => c.ID == channel.ID) >= 0)
                                channel.Asset = record.AssetKey
                        });

                        if (newEdit == 'New')
                            list.push(record);
                        if (newEdit == 'Edit') {
                            const index = list.findIndex(a => a.AssetKey == editAssetKey);
                            list[index] = record;
                        }

                        props.UpdateChannels(channels);
                        props.UpdateAssets(list);
                        setNewEditAsset(AssetAttributes.getNewAsset('Line'));                        
                    }}
                    DisableConfirm={(AssetAttributes.AssetError(newEditAsset, newEditAsset.AssetType, allAssetKeys).length > 0) }
                    ConfirmShowToolTip={AssetAttributes.AssetError(newEditAsset, newEditAsset.AssetType, allAssetKeys).length > 0}
                    ConfirmToolTipContent={
                        AssetAttributes.AssetError(newEditAsset, newEditAsset.AssetType, allAssetKeys).map((e, i) => <p key={i}>{CrossMark} {e}</p>)
                    }
                >
                    <div className="row" style={{ maxHeight: innerHeight - 300, overflow:'auto' }}>
                        <div className="col">
                            <AssetAttributes.AssetAttributeFields Asset={newEditAsset} NewEdit={newEdit} AssetTypes={assetTypes} AllAssets={assets}
                                UpdateState={(record) => {
                                    if (record.AssetType == newEditAsset.AssetType)
                                        setNewEditAsset(record);
                                    else {
                                        let newRecord = AssetAttributes.getNewAsset(record.AssetType);
                                        newRecord.AssetKey = record.AssetKey;
                                        newRecord.AssetName = record.AssetName;
                                        newRecord.VoltageKV = record.VoltageKV;
                                        newRecord.Description = record.Description;
                                        newRecord.Channels = record.Channels;
                                        setNewEditAsset(newRecord);
                                    }
                                    
                                }}
                                GetDifferentAsset={getDifferentAsset} HideAssetType={newEdit == 'Edit'} HideSelectAsset={true} />
                        </div>
                        <div className="col">
                            {showAttributes()}
                        </div>
                        {newEditAsset.AssetType != 'Transformer' && newEditAsset.AssetType != 'Breaker' ?
                            <div className="col">
                                <label>Associated Channels</label>
                                <select multiple style={{ height: innerHeight - 330, width: '100%' }} onChange={(evt) => {
                                    let asset = _.clone(newEditAsset as OpenXDA.Types.Asset);
                                    asset.Channels = ($(evt.target).val() as Array<string>).map(a => props.Channels.find(ch => ch.ID == parseInt(a)))
                                    setNewEditAsset(asset);
                                    let channels = _.clone(props.Channels);
                                    channels = channels.map(ch => ({ ...ch, ConnectionPriority: 0 }));
                                    props.UpdateChannels(channels);
                                }} value={newEditAsset.Channels.map(a => a.ID.toString())}>
                                    {
                                        props.Channels.map((channel, index) => <option key={index} value={channel.ID} hidden={channel.Asset != newEditAsset.AssetKey && channel.Asset.length > 0}>{channel.Name + ' - ' + channel.Description}</option>)
                                    }
                                </select>
                            </div> : null}
                        {newEditAsset.AssetType == 'Breaker'?
                            <div className="col">
                                <label>Associated Channels Bus Side</label>
                                <select multiple style={{ height: innerHeight - 430, width: '100%' }} onChange={(evt) => {
                                    let asset = _.clone(newEditAsset as OpenXDA.Types.Asset);
                                    const selectedID = ($(evt.target).val() as Array<string>).map(a => parseInt(a));
                                    let channels = _.clone(props.Channels);
                                    channels = channels.map(ch => ({ ...ch, ConnectionPriority: (selectedID.indexOf(ch.ID) == -1 ? ch.ConnectionPriority : 0) }));

                                    asset.Channels = asset.Channels.filter(ch => ch.ConnectionPriority == 1).concat(selectedID.map(a => channels.find(ch => ch.ID == a)));
                                    setNewEditAsset(asset);
                                    
                                    props.UpdateChannels(channels);
                                }} value={newEditAsset.Channels.filter(ch => ch.ConnectionPriority == 0).map(a => a.ID.toString())}>
                                    {
                                        props.Channels.map((channel, index) => <option key={index} value={channel.ID} hidden={channel.Asset != newEditAsset.AssetKey && channel.Asset.length > 0}>{channel.Name + ' - ' + channel.Description}</option>)
                                    }
                                </select>
                                <label>Associated Channels Line/XFR Side</label>
                                <select multiple style={{ height: innerHeight - 430, width: '100%' }} onChange={(evt) => {
                                    let asset = _.clone(newEditAsset as OpenXDA.Types.Asset);
                                    const selectedID = ($(evt.target).val() as Array<string>).map(a => parseInt(a));
                                    let channels = _.clone(props.Channels);
                                    channels = channels.map(ch => ({ ...ch, ConnectionPriority: (selectedID.indexOf(ch.ID) == -1 ? ch.ConnectionPriority : 1) }));

                                    asset.Channels = asset.Channels.filter(ch => ch.ConnectionPriority == 0).concat(selectedID.map(a => channels.find(ch => ch.ID == a)));
                                    setNewEditAsset(asset);
                                   
                                    props.UpdateChannels(channels);
                                }} value={newEditAsset.Channels.filter(ch => ch.ConnectionPriority == 1).map(a => a.ID.toString())}>
                                    {
                                        props.Channels.map((channel, index) => <option key={index} value={channel.ID} hidden={channel.Asset != newEditAsset.AssetKey && channel.Asset.length > 0}>{channel.Name + ' - ' + channel.Description}</option>)
                                    }
                                </select>
                            </div> : null}
                        {newEditAsset.AssetType == 'Transformer' ?
                            <div className="col">
                                <div className="row">
                                    <div className="col" style={{ width: "33.3%" }}>
                                        <label>Associated Channels Primary Side</label>
                                        <select multiple style={{ height: innerHeight - 430, width: '100%' }} onChange={(evt) => {
                                            let asset = _.clone(newEditAsset as OpenXDA.Types.Asset);
                                            const selectedID = ($(evt.target).val() as Array<string>).map(a => parseInt(a));
                                            let channels = _.clone(props.Channels);
                                            channels = channels.map(ch => ({ ...ch, ConnectionPriority: (selectedID.indexOf(ch.ID) == -1 ? ch.ConnectionPriority : 0) }));

                                            asset.Channels = asset.Channels.filter(ch => ch.ConnectionPriority == 1 || ch.ConnectionPriority == 2).concat(selectedID.map(a => channels.find(ch => ch.ID == a)));
                                            setNewEditAsset(asset);

                                            props.UpdateChannels(channels);
                                        }} value={newEditAsset.Channels.filter(ch => ch.ConnectionPriority == 0).map(a => a.ID.toString())}>
                                            {
                                                props.Channels.map((channel, index) => <option key={index} value={channel.ID} hidden={channel.Asset != newEditAsset.AssetKey && channel.Asset.length > 0}>{channel.Name + ' - ' + channel.Description}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="col" style={{ width: "33.3%" }}>
                                        <label>Associated Channels Secondary Side</label>
                                        <select multiple style={{ height: innerHeight - 430, width: '100%' }} onChange={(evt) => {
                                            let asset = _.clone(newEditAsset as OpenXDA.Types.Asset);
                                            const selectedID = ($(evt.target).val() as Array<string>).map(a => parseInt(a));
                                            let channels = _.clone(props.Channels);
                                            channels = channels.map(ch => ({ ...ch, ConnectionPriority: (selectedID.indexOf(ch.ID) == -1 ? ch.ConnectionPriority : 1) }));

                                            asset.Channels = asset.Channels.filter(ch => ch.ConnectionPriority == 0 || ch.ConnectionPriority == 2).concat(selectedID.map(a => channels.find(ch => ch.ID == a)));
                                            setNewEditAsset(asset);

                                            props.UpdateChannels(channels);
                                        }} value={newEditAsset.Channels.filter(ch => ch.ConnectionPriority == 1).map(a => a.ID.toString())}>
                                            {
                                                props.Channels.map((channel, index) => <option key={index} value={channel.ID} hidden={channel.Asset != newEditAsset.AssetKey && channel.Asset.length > 0}>{channel.Name + ' - ' + channel.Description}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="col" style={{ width: "33.3%" }}>
                                        <label>Associated Channels Tertiary Side</label>
                                        <select multiple style={{ height: innerHeight - 430, width: '100%' }} onChange={(evt) => {
                                            let asset = _.clone(newEditAsset as OpenXDA.Types.Asset);
                                            const selectedID = ($(evt.target).val() as Array<string>).map(a => parseInt(a));
                                            let channels = _.clone(props.Channels);
                                            channels = channels.map(ch => ({ ...ch, ConnectionPriority: (selectedID.indexOf(ch.ID) == -1 ? ch.ConnectionPriority : 2) }));

                                            asset.Channels = asset.Channels.filter(ch => ch.ConnectionPriority == 0 || ch.ConnectionPriority == 1).concat(selectedID.map(a => channels.find(ch => ch.ID == a)));
                                            setNewEditAsset(asset);

                                            props.UpdateChannels(channels);
                                        }} value={newEditAsset.Channels.filter(ch => ch.ConnectionPriority == 2).map(a => a.ID.toString())}>
                                            {
                                                props.Channels.map((channel, index) => <option key={index} value={channel.ID} hidden={channel.Asset != newEditAsset.AssetKey && channel.Asset.length > 0}>{channel.Name + ' - ' + channel.Description}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div> : null}
                        </div>
                </Modal>
            </div>
        );

}
