//******************************************************************************************************
//  MeterAsset.tsx - Gbtc
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
//  01/16/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';

import BusAttributes from '../AssetAttribute/Bus';
import BreakerAttributes from '../AssetAttribute/Breaker';
import CapBankAttributes from '../AssetAttribute/CapBank';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { getAssetTypes, getAssetWithAdditionalFields } from '../../../TS/Services/Asset';
import { SearchedAssets, SearchStatus, DBSearchAsset, DBActionAsset } from '../Store/AssetSlice'
import Table from '@gpa-gemstone/react-table';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Warning, Modal, LoadingScreen, Search } from '@gpa-gemstone/react-interactive';
import DERAttributes from '../AssetAttribute/DER';
import { useDispatch, useSelector } from 'react-redux';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter }

const MeterAssetWindow = (props: IProps) => {
    const [assetTypes, setAssetTypes] = React.useState<OpenXDA.Types.AssetType[]>([]);
    const [newEdit, setNewEdit] = React.useState<Application.Types.NewEdit>('New');

    const [activeAsset, changeActiveAsset] = React.useState<OpenXDA.Types.Asset>(AssetAttributes.getNewAsset('Line'));
    const [showEditNew, setShoweditNew] = React.useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = React.useState<boolean>(false);

    const [showLoading, setShowLoading] = React.useState<boolean>(false);

    // Asset Slice Consts
    const dispatch = useDispatch();
    const assetStatus = useSelector(SearchStatus) as Application.Types.Status;
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.Asset>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [filter, setFilter] = React.useState<Search.IFilter<OpenXDA.Types.Asset>[]>([]);
    const assetResults = useSelector(SearchedAssets) as OpenXDA.Types.Asset[];

    React.useEffect(() => {
        let h = getAssetTypes()
        h.done((data: Array<OpenXDA.Types.AssetType>) => {
            setAssetTypes(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [])

    React.useEffect(() => {
        setFilter(
            [{
                FieldName: 'ID',
                Type: 'number',
                SearchText: `(Select AssetID from MeterAsset Where MeterID=${props.Meter.ID})`,
                Operator: 'IN',
                isPivotColumn: false
            }]
        );
    }, [props.Meter]);

    React.useEffect(() => {
        if (assetStatus === 'unintiated' || assetStatus === 'changed') {
            setShowLoading(true);
            reloadSlice();
        }
    }, [dispatch, assetStatus]);

    React.useEffect(() => {
        setShowLoading(true);
        reloadSlice();
    }, [ascending, sortKey, filter, dispatch]);

    function setActiveAsset(assetID: number, assetType: OpenXDA.Types.AssetTypeName) {
        if (assetID == 0) {
            changeActiveAsset(AssetAttributes.getNewAsset(assetType));
            setNewEdit('New');
            return;
        }

        let h = getAssetWithAdditionalFields(assetID, assetType);
        h.then(record => { changeActiveAsset(record); setNewEdit('Edit') });
    }

    function reloadSlice() {
        dispatch(DBSearchAsset({ sortField: sortKey, ascending, filter: filter }))
        setShowLoading(false);
    }

    if (assetResults == undefined)
        return null;

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assets:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row" style={{ margin: -20 }}>
                    <div className="col" style={{ padding: 20 }}>
                        <div style={{ width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' }}>
                            <Table<OpenXDA.Types.Asset>
                                cols={[
                                    { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'calc(20%-16px)' }, rowStyle: { width: 'calc(20%-16px)' } },
                                    { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'calc(30%-16px)' }, rowStyle: { width: 'calc(30%-16px)' } },
                                    { key: 'AssetType', field: 'AssetType', label: 'Type', headerStyle: { width: 'calc(10%-16px)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                    { key: 'VoltageKV', field: 'VoltageKV', label: 'Base kV', headerStyle: { width: 'calc(10%-16x)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                    { key: 'Channels', field: 'Channels', label: 'Channels', headerStyle: { width: 'calc(10%-16px)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                    
                                    {
                                        key: 'EditDelete', label: '', headerStyle: { width: 80, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 80, paddingLeft: 0, paddingRight: 5 },
                                        content: (item) => <>
                                            <button className="btn btn-sm"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveAsset(item.ID, item.AssetType);
                                                    setShoweditNew(true);
                                                }}><span>{Pencil}</span></button>
                                            <button className="btn btn-sm"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveAsset(item.ID, item.AssetType);
                                                    setShowDeleteWarning(true)
                                                }}><span>{TrashCan}</span></button>
                                        </>
                                    }
                                ]}
                                tableClass="table table-hover"
                                data={assetResults}
                                sortKey={sortKey}
                                ascending={ascending}
                                onSort={(d) => {
                                    if (d.colKey === 'EditDelete')
                                        return;
                                    if (d.colKey == sortKey)
                                        setAscending(!ascending);
                                    else {
                                        setAscending(true);
                                        setSortKey(d.colKey as keyof OpenXDA.Types.Asset);
                                    }
                                }}
                                onClick={(fld) => { }}
                                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
                                rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                selected={(item) => false}
                            />

                            <Warning Show={showDeleteWarning} CallBack={(confirmed) => { if (confirmed) dispatch(DBActionAsset({ verb: 'DELETE', record: activeAsset, meterID: props.Meter.ID, locationID: props.Meter.LocationID })); setShowDeleteWarning(false); }} Title={'Remove this Asset'} Message={'This will permanently remove this Asset from the Meter.'} />
                            <LoadingScreen Show={showLoading} />
                            <Modal Show={showEditNew}
                                Title={newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + activeAsset.AssetKey + ' for Meter'}
                                Size={'lg'}
                                ShowX={true}
                                ShowCancel={false}
                                ConfirmText={'Save'}
                                CallBack={(confirm) => {
                                    setShoweditNew(false);
                                    if (confirm) {
                                        dispatch(DBActionAsset({ verb: 'POST', record: activeAsset, meterID: props.Meter.ID, locationID: props.Meter.LocationID }));
                                    }
                                }}
                                ConfirmShowToolTip={AssetAttributes.AttributeError(activeAsset).length > 0}
                                DisableConfirm={AssetAttributes.AttributeError(activeAsset).length > 0}
                                ConfirmToolTipContent={
                                    AssetAttributes.AttributeError(activeAsset).map((e, i) => <p key={i}><ErrorSymbol /> {e}</p>)
                                }
                            >
                                <div className="row">
                                    <div className="col">
                                        <AssetAttributes.AssetAttributeFields Asset={activeAsset} NewEdit={newEdit} AssetTypes={assetTypes} AllAssets={assetResults}
                                            UpdateState={changeActiveAsset}
                                            GetDifferentAsset={(assetID) => {
                                                setActiveAsset(assetID, assetTypes.find(at => (assetResults as any).find(a => a.ID == assetID).AssetTypeID).Name);
                                            }} HideSelectAsset={true} HideAssetType={false} />
                                    </div>
                                    <div className="col">
                                        {showAttributes()}
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right" onClick={() => {
                        setActiveAsset(0, 'Line');
                        setShoweditNew(true);
                    }}>Add Asset</button>
                </div>
            </div>
        </div>
    );


    function showAttributes(): JSX.Element {
        if (activeAsset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={newEdit} Asset={activeAsset as OpenXDA.Types.Breaker} UpdateState={changeActiveAsset} ShowSpare={true} />;
        else if (activeAsset.AssetType == 'Bus')
            return <BusAttributes NewEdit={newEdit} Asset={activeAsset} UpdateState={changeActiveAsset} />;
        else if (activeAsset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={newEdit} Asset={activeAsset as OpenXDA.Types.CapBank} UpdateState={changeActiveAsset} />;
        else if (activeAsset.AssetType == 'Line')
            return <LineAttributes NewEdit={newEdit} Asset={activeAsset as OpenXDA.Types.Line} UpdateState={changeActiveAsset} />;
        else if (activeAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={newEdit} Asset={activeAsset as OpenXDA.Types.Transformer} UpdateState={changeActiveAsset} />;
        else if (activeAsset.AssetType == 'DER')
            return <DERAttributes NewEdit={newEdit} Asset={activeAsset as OpenXDA.Types.DER} UpdateState={changeActiveAsset} />;

    }
}

export default MeterAssetWindow;

const ErrorSymbol = () => <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i>
