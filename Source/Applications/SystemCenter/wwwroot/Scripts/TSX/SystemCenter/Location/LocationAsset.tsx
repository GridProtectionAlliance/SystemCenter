//******************************************************************************************************
//  LocationAsset.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with  work for additional information regarding copyright ownership.
//  The GPA licenses  file to you under the MIT License (MIT), the "License"; you may not use 
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
//  01/21/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, Application } from '@gpa-gemstone/application-typings' 
import Table from '@gpa-gemstone/react-table';
import { useHistory } from "react-router-dom";
import { AssetAttributes } from '../AssetAttribute/Asset';
import BreakerAttributes from '../AssetAttribute/Breaker';
import BusAttributes from '../AssetAttribute/Bus';
import CapBankAttributes from '../AssetAttribute/CapBank';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import { useAppSelector, useAppDispatch } from '../hooks';
import { FetchAsset, SelectAssets, SelectAssetStatus } from '../Store/AssetSlice';
import { AssetTypeSlice } from '../Store/Store';
import { getAssetWithAdditionalFields, editExistingAsset } from '../../../TS/Services/Asset';
import { LoadingIcon, Modal, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import GenerationAttributes from '../AssetAttribute/Generation';
import StationAuxAttributes from '../AssetAttribute/StationAux';
import StationBatteryAttributes from '../AssetAttribute/StationBattery';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;


function LocationAssetWindow(props: { Location: OpenXDA.Types.Location }): JSX.Element{
    let history = useHistory();
    let dispatch = useAppDispatch();

    const [data, setData] = React.useState<Array<OpenXDA.Types.Asset>>([]);
    const [sortKey, setSortKey] = React.useState<string>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [trigger, setTrigger] = React.useState<number>(0);

    const [newEditAsset, setNewEditAsset] = React.useState<OpenXDA.Types.DetailedAsset>(AssetAttributes.getNewAsset('Line'));
    const [editAsset, setEditasset] = React.useState<OpenXDA.Types.DetailedAsset>(AssetAttributes.getNewAsset('Line'));

    const [newEdit, setNewEdit] = React.useState<Application.Types.NewEdit>('New');

    const [assetErrors, setAssetErrors] = React.useState<string[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const [lStatus, setLStatus] = React.useState<'error' | 'loading' | 'idle'>('idle')

    const aStatus = useAppSelector(SelectAssetStatus);
    const atStatus = useAppSelector(AssetTypeSlice.Status);

    const assetTypes = useAppSelector(AssetTypeSlice.Data);
    const allAssets = useAppSelector(SelectAssets);

    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (atStatus == 'unintiated' || atStatus == 'changed')
            dispatch(AssetTypeSlice.Fetch());
    }, []);

    React.useEffect(() => {
        if (aStatus == 'unintiated' || aStatus == 'changed')
            dispatch(FetchAsset());
    }, []);

    React.useEffect(() => {
        let assetsHandle = getAssets();
        return () => { if (assetsHandle != null && assetsHandle.abort != null) assetsHandle.abort(); }

    }, [props.Location.ID, trigger]);

    React.useEffect(() => {
        const errors = AssetAttributes.AssetError(newEditAsset, newEditAsset.AssetType);
        if (newEditAsset.AssetKey == null || newEditAsset.AssetKey.length == 0)
            errors.push('A Key is required.')
        else if (allAssets.findIndex(asset => asset.AssetKey.toLowerCase() == newEditAsset.AssetKey.toLowerCase() && asset.ID != newEditAsset.ID) > -1)
            errors.push('Key must be unique.')

        setAssetErrors(errors);
    }, [newEditAsset])

    React.useEffect(() => { setNewEditAsset(editAsset) }, [editAsset]);

    function getAssets(): JQuery.jqXHR<OpenXDA.Types.Asset[]> {
        setLStatus('loading');

        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/${props.Location.ID}/Assets`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d) => {
            setData(d);
            setLStatus('idle')
        }).fail(() => setLStatus('error'));
    }


    function addNewAsset() {
        setLStatus('loading');
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/New/Location/${props.Location.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: newEditAsset }),
            cache: false,
            async: true
        }).done(() => {
            dispatch(FetchAsset());
            setTrigger(x => x + 1);
            setNewEditAsset(AssetAttributes.getNewAsset('Line'))

        }).fail((msg) => {
            setLStatus('error')
        });

    }

    

    async function addExistingAsset() {
        setLStatus('loading');
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/Existing/Location/${props.Location.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: newEditAsset }),
            cache: false,
            async: true
        }).done(() => {
            dispatch(FetchAsset());
            setTrigger(x => x + 1);
            setNewEditAsset(AssetAttributes.getNewAsset('Line'))

        }).fail((msg) => {
            setLStatus('error')
        });

    }

    async function deleteAsset(asset: OpenXDA.Types.Asset) {
        setLStatus('loading')
      return  $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Asset/${asset.ID}/Location/${props.Location.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
      }).done(() => {
          setTrigger(x => x + 1);
          setNewEditAsset(AssetAttributes.getNewAsset('Line'))
      }).fail((msg) => {
          setLStatus('error')
      });
    }

    function addNewButton(): void {
        setNewEdit('New');
        setShowModal(true);
        setNewEditAsset(AssetAttributes.getNewAsset('Line'));
    }

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
        else if (newEditAsset.AssetType == 'Generation')
            return <GenerationAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'StationAux')
            return <StationAuxAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'StationBattery')
            return <StationBatteryAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset} />;
    }

    function handleSelect(item, event) {
        if (event.target.localName == 'td')
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + item.row.ID })
    }

    function GetDifferentAsset(assetID: number) {
        setLStatus('loading')
        let asset = allAssets.find(a => a.ID == assetID);
        let assetType = assetTypes.find(at => at.ID == asset['AssetTypeID'])
        getAssetWithAdditionalFields(assetID, assetType.Name).then(asset => {
            setLStatus('idle')
            setNewEditAsset(asset)
        }, () => setLStatus('error'));
    }

    async function saveButtonForExistingAssets() {
        setLStatus('loading')

        editExistingAsset(newEditAsset).then(() => {
            dispatch(FetchAsset());
            setNewEditAsset(AssetAttributes.getNewAsset('Line'));
            setTrigger(x => x + 1);
        }, () => setLStatus('error'));        
        
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    if (atStatus == 'error' || aStatus == 'error' || lStatus == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assets:</h4>
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

    if (atStatus == 'loading' || aStatus == 'loading' || lStatus == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assets:</h4>
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

    const assetChanged = !_.isEqual(editAsset, newEditAsset);

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
                <div style={{ width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' }}>
                    <Table<OpenXDA.Types.Asset>
                        cols={[
                            { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                            { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                            { key: 'AssetType', field: 'AssetType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            {
                                key: 'EditDelete', label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (asset, key, style) => <>
                                    <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')} onClick={(e) => {
                                        if (hasPermissions()) {
                                            e.preventDefault();
                                            let assetType = assetTypes.find(at => at.ID == asset['AssetTypeID']);
                                            setLStatus('loading')
                                            getAssetWithAdditionalFields(asset.ID, assetType.Name).then(asset => { setEditasset(asset); setLStatus('idle'); }, () => setLStatus('error'));
                                            setNewEdit('Edit');
                                            setShowModal(true)
                                        }
                                    }}><span>{Pencil}</span></button>
                                    <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')} onClick={(e) => {
                                        if (hasPermissions()) {
                                            e.preventDefault();
                                            deleteAsset(asset);
                                         }
                                     }}><span>{TrashCan}</span></button>
                                    </>
                            },

                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortKey={sortKey}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey === "EditDelete")
                                return;

                            if (d.colKey === sortKey) {
                                var ordered = _.orderBy(data, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setData(ordered);
                            }
                            else {
                                var ordered = _.orderBy(data, [d.colKey], ["asc"]);
                                setAscending(!ascending);
                                setData(ordered);
                                setSortKey(d.colKey);
                            }
                        }}
                        onClick={handleSelect}
                        selected={(item) => false}
                    />

                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary pull-right" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='AddAsset' onMouseEnter={() => setHover('Update')}
                    onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions()) addNewButton() }}>Add Asset</button>
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"AddAsset"}>
                    <p>You do not have permission.</p>
                </ToolTip>
            </div>


            <Modal Show={showModal}
                Title={newEdit == 'New' ? 'Add New Asset to ' + (props.Location?.Name ?? 'Substation') : 'Edit ' + (newEditAsset?.AssetName ?? 'Asset')}
                ConfirmBtnClass={'btn-success'}
                ConfirmText={newEdit == 'Edit' ? 'Save' : 'Add'}
                CancelBtnClass={'btn-danger'}
                CancelText={'Close'}
                Size={'xlg'}
                CallBack={(confirm) => {
                    setShowModal(false);

                    if (!confirm) {
                        setNewEditAsset(AssetAttributes.getNewAsset('Line'));
                        return;
                    }
                    if (newEdit == 'New' && newEditAsset.ID == 0)
                        addNewAsset();
                    else if (newEdit == 'New' && newEditAsset.ID != 0)
                        addExistingAsset();
                    if (newEdit == 'Edit') 
                        saveButtonForExistingAssets();
                    
                    setNewEditAsset(AssetAttributes.getNewAsset('Line'));
                }}
                DisableConfirm={(assetErrors.length > 0) || (newEdit == 'Edit' && !assetChanged)}
                ConfirmShowToolTip={(assetErrors.length > 0)}
                ConfirmToolTipContent={
                    assetErrors.map((e, i) => <p key={i}>{ErrorSymbol()} {e}</p>)
                }
            >
                <div className="row" style={{ maxHeight: innerHeight - 300, overflow: 'auto' }}>
                    <div className="col">
                        <AssetAttributes.AssetAttributeFields Asset={newEditAsset} NewEdit={newEdit} AssetTypes={assetTypes} AllAssets={allAssets}
                            UpdateState={setNewEditAsset}
                            GetDifferentAsset={GetDifferentAsset} HideAssetType={newEdit == 'Edit'} HideSelectAsset={false} />
                    </div>
                    <div className="col">
                        {showAttributes()}
                    </div>
                    </div>
            </Modal>
        </div>
                
    );
}
const ErrorSymbol = () => CrossMark



export default LocationAssetWindow;
