//******************************************************************************************************
//  Page4.tsx - Gbtc
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
import BreakerAttributes from '../AssetAttribute/Breaker';
import BusAttributes from '../AssetAttribute/Bus';
import CapBankAttributes from '../AssetAttribute/CapBank';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { getAssetTypes, getAllAssets } from '../../../TS/Services/Asset';
import CapBankRelayAttributes from '../AssetAttribute/CapBankRelay';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAssetTypes, SelectAssetTypeStatus, FetchAssetType } from '../Store/AssetTypeSlice';
import { SelectAssetStatus, FetchAsset, SelectAssets } from '../Store/AssetSlice';

declare var homePath: string;

interface Page4Props {
    Assets: Array<OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.Transformer | OpenXDA.CapBankRelay>,
    Channels: OpenXDA.Channel[],
    AssetConnections: Array<OpenXDA.AssetConnection>,
    UpdateChannels: (record: OpenXDA.Channel[]) => void,
    UpdateAssets: (record: OpenXDA.Asset[]) => void,
    UpdateAssetConnections: (record: OpenXDA.AssetConnection[]) => void,

}

type AssetType = OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.Transformer | OpenXDA.CapBankRelay;

export default function Page4(props: Page4Props) {
    const dispatch = useDispatch();
    const assetTypes = useSelector(SelectAssetTypes);
    const atStatus = useSelector(SelectAssetTypeStatus);
    const assets = useSelector(SelectAssets);
    const aStatus = useSelector(SelectAssetStatus);

    const [newEditAsset, setNewEditAsset] = React.useState<AssetType>(AssetAttributes.getNewAsset('Line'));
    const [newEdit, setNewEdit] = React.useState<'New' | 'Edit'>('New');

    React.useEffect(() => {
        if (atStatus === 'unintiated' || atStatus === 'changed') {
            dispatch(FetchAssetType());
            return function () {
            }
        }
    }, [dispatch, atStatus]);
    React.useEffect(() => {
        if (aStatus === 'unintiated' || aStatus === 'changed') {
            dispatch(FetchAsset());
            return function () {
            }
        }
    }, [dispatch, aStatus]);



    React.useEffect(() => {
        if (newEditAsset.AssetType == 'Breaker') {
            let handle = getEDNAPoint(newEditAsset.ID);
            handle.done((ednaPoint: OpenXDA.EDNAPoint) => {
                let record = { ...newEditAsset as OpenXDA.Breaker };
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
            handle.done((lineSegment: OpenXDA.LineDetail) => {
                let record = _.clone(newEditAsset as OpenXDA.Line);
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
        setNewEdit('Edit');
        setNewEditAsset(props.Assets[index]);
    }

    function deleteAsset(index: number) {
        let list = _.clone(props.Assets);
        let record: Array<OpenXDA.Asset> = list.splice(index, 1);
        let assetConnections: Array<OpenXDA.AssetConnection> = _.clone(props.AssetConnections);
        let channels: Array<OpenXDA.Channel> = _.clone(props.Channels);

        $.each(channels, (index, channel) => {
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


    function changeAssetType(type: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer' | 'CapacitorBankRelay'): void {
        let asset = {
            ID: newEditAsset.ID,
            AssetKey: newEditAsset.AssetKey,
            AssetName: newEditAsset.AssetName,
            AssetType: type,
            Description: newEditAsset.Description,
            VoltageKV: newEditAsset.VoltageKV,
            Channels: newEditAsset.Channels,
            Spare: newEditAsset.Spare
        }

        asset = AssetAttributes.getNewAssetAttributes(asset, type);
        setNewEditAsset( asset);
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
        }).done((asset: OpenXDA.Asset) => {
            asset.AssetType = assetType.Name;
            asset.Channels = [];
            setNewEditAsset(asset);
        });
    }

    function getLineSegment(lineID: number): JQuery.jqXHR<OpenXDA.LineSegment> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Line/${lineID}/LineSegment`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    function getEDNAPoint(breakerID: number): JQuery.jqXHR<OpenXDA.EDNAPoint> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Breaker/${breakerID}/EDNAPoint`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function disableModalSave(): boolean {
        return $('.is-invalid').length > 0;
    }

    function showAttributes(): JSX.Element {
        if (newEditAsset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Breaker} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Bus')
            return <BusAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset}/>;
        else if (newEditAsset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.CapBank} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'CapacitorBankRelay')
            return <CapBankRelayAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.CapBankRelay} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Line')
            return <LineAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Line} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Transformer} UpdateState={setNewEditAsset} />;
    }



        return (
            <>
                <div className="row" style={{margin: -20}}>
                    <div className="col-lg-4">
                        <ul style={{ width: '100%', height: window.innerHeight - 285, maxHeight: window.innerHeight - 285, overflowY: 'auto', padding: 0, margin: 0 }}>
                            {
                                props.Channels.map((channel, index) => <li style={{textDecoration: (channel.Asset.length > 0 ? 'line-through' : null)}} key={index}>{channel.Name + ' - ' + channel.Description}</li>)
                            }
                        </ul>
                    </div>
                    <div className="col" style={{padding: 20}}>
                        <div style={{ width: '100%', height: 38 }}>
                            <button className="btn btn-primary pull-right" data-toggle='modal' data-target='#assetModal' onClick={() => setNewEdit('New')}>Add Asset</button>
                        </div>

                        <div style={{ width: '100%', maxHeight: window.innerHeight - 350, padding: 30, overflowY: 'auto' }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Key</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>kV</th>
                                        <th>Channels</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.Assets.map((asset: OpenXDA.Asset, index, array) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '10%' }}>{(asset.ID == 0 ? 'New' : 'Existing')}</td>
                                                    <td style={{ width: '20%' }}>{asset.AssetKey}</td>
                                                    <td style={{ width: '30%' }}>{asset.AssetName}</td>
                                                    <td style={{ width: '10%' }}>{asset.AssetType}</td>
                                                    <td style={{ width: '10%' }}>{asset.VoltageKV}</td>
                                                    <td style={{ width: '10%' }}>{asset.Channels.length}</td>
                                                    <td style={{ width: '10%' }}>
                                                        <button className="btn btn-sm" data-toggle='modal' data-target='#assetModal' onClick={(e) => editAsset(index)}><span><i className="fa fa-pencil"></i></span></button>
                                                        <button className="btn btn-sm" onClick={(e) => deleteAsset(index)}><span><i className="fa fa-times"></i></span></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div className="modal" id="assetModal">
                    <div className="modal-dialog" style={{maxWidth: '100%', width: '90%'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{newEdit == 'New' ? 'Add New Asset to Meter': 'Edit ' + newEditAsset.AssetKey + ' for Meter' }</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <AssetAttributes.AssetAttributeFields Asset={newEditAsset} NewEdit={newEdit} AssetTypes={assetTypes} AllAssets={assets} UpdateState={setNewEditAsset} GetDifferentAsset={getDifferentAsset} />
                                    </div>
                                    <div className="col">
                                        { showAttributes() }
                                    </div>
                                    <div className="col">
                                        <label>Associated Channels</label>
                                        <select multiple style={{ height: '100%', width: '100%' }} onChange={(evt) => {
                                            let asset  = _.clone(newEditAsset as OpenXDA.Asset);
                                            asset.Channels = ($(evt.target).val() as Array<string>).map(a => props.Channels[parseInt(a)])
                                            setNewEditAsset(asset);
                                        }} value={newEditAsset.Channels.map(a => a.ID.toString())}>
                                            {
                                                props.Channels.map((channel, index) => <option key={index} value={index} hidden={ channel.Asset != newEditAsset.AssetKey && channel.Asset.length> 0}>{channel.Name + ' - ' + channel.Description}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(evt) => {
                                    let record: OpenXDA.Asset = _.clone(newEditAsset);
                                    let list = _.clone(props.Assets);
                                    let channels: Array<OpenXDA.Channel> = _.clone(props.Channels);

                                    $.each(channels, (index, channel) => {
                                        if (channel.Asset == record.AssetKey)
                                            channel.Asset = ''

                                        if (record.Channels.findIndex(c => c.ID == channel.ID) >= 0)
                                            channel.Asset = record.AssetKey
                                    });
                                    list.push(record);
                                    props.UpdateChannels(channels);
                                    props.UpdateAssets(list);
                                    setNewEditAsset(AssetAttributes.getNewAsset('Line') );

                                }} hidden={newEdit != 'New'}>Save</button>

                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(evt) => {
                                    let record: OpenXDA.Asset = _.clone(newEditAsset);
                                    let list = _.clone(props.Assets);
                                    let channels: Array<OpenXDA.Channel> = _.clone(props.Channels);
                                    let i = list.findIndex(r => r.AssetKey == record.AssetKey);
                                    list[i] = record;
                                    $.each(channels, (index, channel) => {
                                        if (channel.Asset == record.AssetKey)
                                            channel.Asset = ''

                                        if (record.Channels.findIndex(c => c.ID == channel.ID) >= 0)
                                            channel.Asset = record.AssetKey
                                    });

                                    props.UpdateChannels(channels);
                                    props.UpdateAssets(list);
                                    setNewEditAsset(AssetAttributes.getNewAsset('Line'));
                                }} hidden={newEdit != 'Edit'}>Save</button>


                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                    setNewEditAsset(AssetAttributes.getNewAsset('Line'));
                                }}>Close</button>
                            </div>

                        </div>
                    </div>
                </div>

        </>
        );

}

