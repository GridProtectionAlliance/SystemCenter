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
import { getAssetTypes, getAllAssets, getAssetWithAdditionalFields, editExistingAsset } from '../../../TS/Services/Asset';
import Table from '@gpa-gemstone/react-table';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Warning, Modal, LoadingScreen } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter }

const MeterAssetWindow = (props: IProps) => {

    const [meterAssets, setMeterAssets] = React.useState < Array<OpenXDA.Types.DetailedAsset>>([]);
    const [newEditAsset, setNewEditAsset] = React.useState<OpenXDA.Types.DetailedAsset>(AssetAttributes.getNewAsset('Line'));
    const [allAssets, setAllAssets] = React.useState<OpenXDA.Types.Asset[]>([]);
    const [assetTypes, setAssetTypes] = React.useState<OpenXDA.Types.AssetType[]>([]);
    const [newEdit, setNewEdit] = React.useState<Application.Types.NewEdit>('New');
    const [activeAssetID, setActiveAssetID] = React.useState<number>(0);
    const [activeAssetType, setActiveAssetType] = React.useState<OpenXDA.Types.AssetTypeName>('Line');

    const [showEditNew, setShoweditNew] = React.useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = React.useState<boolean>(false);

    const [sortKey, setSortKey] = React.useState<string>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showLoading, setShowLoading] = React.useState<boolean>(false);

    const [assetReloadCounter, forceAssetReload] = React.useState<number>(0);

    React.useEffect(() => {
        let h = getAssetTypes()
        h.done((data: Array<OpenXDA.Types.AssetType>) => {
            setAssetTypes(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [])

    React.useEffect(() => {
        let h = getAllAssets()
        h.done((data: Array<OpenXDA.Types.Asset>) => {
            setAllAssets(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [assetReloadCounter])

    React.useEffect(() => {
        let h = getAllAssets()
        h.done((data: Array<OpenXDA.Types.Asset>) => {
            setAllAssets(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [])

    React.useEffect(() => {
        let h = getMeterAssets();
        h.done((data: Array<OpenXDA.Types.Asset>) => {
            setMeterAssets(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [props.Meter, ascending, sortKey])

    React.useEffect(() => {
        if (activeAssetID == 0) {
            setNewEditAsset(AssetAttributes.getNewAsset(activeAssetType));
            setNewEdit('New');
            return;
        }

        let h = getAssetWithAdditionalFields(activeAssetID, activeAssetType);
        h.then(record => { setNewEditAsset(record); setNewEdit('Edit') });

    }, [activeAssetID, activeAssetType]);

    function getMeterAssets(): JQueryXHR {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Asset/${sortKey}/${ascending? 1: 0}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function deleteAsset() {
        setShowLoading(true);
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Asset/${activeAssetID}/${props.Meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((assets: Array<OpenXDA.Types.Asset>) => {
            setSortKey('AssetKey');
            forceAssetReload((x) => x + 1);
            setShowLoading(false);
        }).fail((msg) => {
            setShowLoading(false);
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else 
                sessionStorage.clear();            
        });
    }
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
                                        content: (item) => <> <button className="btn btn-sm"
                                            onClick={(e) => {
                                                setActiveAssetType(item.AssetType);
                                                setActiveAssetID(item.ID);
                                                setShoweditNew(true);
                                            }}><span>{Pencil}</span></button>
                                            <button className="btn btn-sm"
                                                onClick={(e) => {
                                                    setActiveAssetType(item.AssetType);
                                                    setActiveAssetID(item.ID);
                                                    setShowDeleteWarning(true)
                                                }}><span>{TrashCan}</span></button>
                                        </>
                                    }
                                ]}
                                tableClass="table table-hover"
                                data={meterAssets}
                                sortKey={sortKey}
                                ascending={ascending}
                                onSort={(d) => {
                                    if (d.colKey === 'EditDelete')
                                        return;

                                    if (d.colKey === sortKey)
                                        setAscending(!ascending);
                                    else {
                                        setAscending(true);
                                        setSortKey(d.colKey);
                                    }
                                }}
                                onClick={(fld) => { }}
                                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
                                rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                selected={(item) => false}
                            />

                            <Warning Show={showDeleteWarning} CallBack={(confirmed) => { if (confirmed) deleteAsset(); setShowDeleteWarning(false); }} Title={'Remove this Asset'} Message={'This will permanently remove this Asset from the Meter.'} />
                            <LoadingScreen Show={showLoading} />
                            <Modal Show={showEditNew}
                                Title={newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + newEditAsset.AssetKey + ' for Meter'}
                                Size={'lg'}
                                ShowX={true}
                                ShowCancel={false}
                                ConfirmText={'Save'}
                                CallBack={(confirm) => { setShoweditNew(false); if (!confirm) return; }}
                                ConfirmShowToolTip={AssetAttributes.AttributeError(newEditAsset).length > 0}
                                DisableConfirm={AssetAttributes.AttributeError(newEditAsset).length > 0}
                                ConfirmToolTipContent={
                                    AssetAttributes.AttributeError(newEditAsset).map((e, i) => <p key={i}><ErrorSymbol /> {e}</p>)
                                }
                            >
                                <div className="row">
                                    <div className="col">
                                        <AssetAttributes.AssetAttributeFields Asset={newEditAsset} NewEdit={newEdit} AssetTypes={assetTypes} AllAssets={allAssets}
                                            UpdateState={setNewEditAsset}
                                            GetDifferentAsset={(assetID) => {
                                                setActiveAssetID(assetID);
                                                setActiveAssetType(assetTypes.find(at => at.ID == (allAssets as any).find(a => a.ID == assetID).AssetTypeID).Name)
                                            }} HideSelectAsset={false} HideAssetType={false} />
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
                        setActiveAssetID(0); setActiveAssetType('Line'); setShoweditNew(true);
                    }}>Add Asset</button>
                </div>
            </div>
        </div>
    );


    function showAttributes(): JSX.Element {
        if (newEditAsset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.Breaker} UpdateState={setNewEditAsset} ShowSpare={true} />;
        else if (newEditAsset.AssetType == 'Bus')
            return <BusAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.CapBank} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Line')
            return <LineAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.Line} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Types.Transformer} UpdateState={setNewEditAsset} />;
    }
}

export default MeterAssetWindow;

const ErrorSymbol = () => <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i>
