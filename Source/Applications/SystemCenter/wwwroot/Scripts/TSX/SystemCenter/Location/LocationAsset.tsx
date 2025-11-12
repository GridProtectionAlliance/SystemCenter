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
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { useNavigate } from "react-router-dom";
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
import { LoadingIcon, Modal, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import GenerationAttributes from '../AssetAttribute/Generation';
import StationAuxAttributes from '../AssetAttribute/StationAux';
import StationBatteryAttributes from '../AssetAttribute/StationBattery';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;
const PagingID = 'LocationAssetPage';

function LocationAssetWindow(props: { Location: OpenXDA.Types.Location }): JSX.Element{
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    const [data, setData] = React.useState<Array<OpenXDA.Types.Asset>>([]);
    const [sortKey, setSortKey] = React.useState<string>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [trigger, setTrigger] = React.useState<number>(0);

    const [newEditAsset, setNewEditAsset] = React.useState<OpenXDA.Types.DetailedAsset>(AssetAttributes.getNewAsset('Line'));
    const [editAsset, setEditasset] = React.useState<OpenXDA.Types.DetailedAsset>(AssetAttributes.getNewAsset('Line'));

    const [newEdit, setNewEdit] = React.useState<Application.Types.NewEdit>('New');

    const [assetErrors, setAssetErrors] = React.useState<string[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const [lStatus, setLStatus] = React.useState<'error' | 'loading' | 'idle'>('idle');

    const aStatus = useAppSelector(SelectAssetStatus);
    const atStatus = useAppSelector(AssetTypeSlice.Status);

    const assetTypes = useAppSelector(AssetTypeSlice.Data);
    const allAssets = useAppSelector(SelectAssets);

    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });

    React.useEffect(() => {
        if (atStatus == 'uninitiated' || atStatus == 'changed')
            dispatch(AssetTypeSlice.Fetch());
    }, []);

    React.useEffect(() => {
        if (aStatus == 'uninitiated' || aStatus == 'changed')
            dispatch(FetchAsset());
    }, []);

    React.useEffect(() => {
        let assetsHandle = getAssets();
        return () => { if (assetsHandle != null && assetsHandle.abort != null) assetsHandle.abort(); }

    }, [props.Location.ID, page, trigger, ascending, sortKey]);

    React.useEffect(() => {
        const errors = AssetAttributes.AssetError(newEditAsset, newEditAsset.AssetType);
        if (newEditAsset.AssetKey == null || newEditAsset.AssetKey.length == 0)
            errors.push('A Key is required.')
        else if (allAssets.findIndex(asset => asset.AssetKey.toLowerCase() == newEditAsset.AssetKey.toLowerCase() && asset.ID != newEditAsset.ID) > -1)
            errors.push('Key must be unique.')

        setAssetErrors(errors);
    }, [newEditAsset]);

    React.useEffect(() => { setNewEditAsset(editAsset) }, [editAsset]);

    React.useEffect(() => {
        let storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
        if (storedInfo == null || storedInfo == 0) return; // page 0 means it's on a real page
        if (storedInfo + 1 > pageInfo.NumberOfPages) {
            storedInfo = Math.max(0, pageInfo.NumberOfPages - 1);
            localStorage.setItem(PagingID, `${storedInfo}`);
        }
        setPage(storedInfo);
    }, [pageInfo.TotalRecords]); // Make sure user is still on a real page when data is deleted or filtered out

    function getAssets(): JQuery.jqXHR<OpenXDA.Types.Asset[]> {
        setLStatus('loading');

        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/${props.Location.ID}/Assets/${page}/${ascending ? 1 : 0}/${sortKey}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((result) => {
            setData(result.Result);
            setPageInfo({
                RecordsPerPage: result.RecordsPerPage,
                NumberOfPages: result.NumberOfPages,
                TotalRecords: result.TotalRecords
            });
            setLStatus('idle');
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

    function handleSelect(item) {
            navigate(`${homePath}index.cshtml?name=Asset&AssetID=${item.row.ID}`);
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
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
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
        <div className="card" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assets:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ paddingBottom: 0, flex: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Table<OpenXDA.Types.Asset>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === "EditDelete")
                                return;

                            if (d.colKey === sortKey) {
                                setAscending(a => !a);
                            }
                            else {
                                setAscending(true);
                                setSortKey(d.colKey);
                            }
                        }}
                        OnClick={handleSelect}
                        TableStyle={{ height: '100%' }}
                        TheadStyle={{ fontSize: 'smaller' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<OpenXDA.Types.Asset>
                            Key={'AssetName'}
                            AllowSort={true}
                            Field={'AssetName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<OpenXDA.Types.Asset>
                            Key={'AssetKey'}
                            AllowSort={true}
                            Field={'AssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Key
                        </Column>
                        <Column<OpenXDA.Types.Asset>
                            Key={'AssetType'}
                            AllowSort={true}
                            Field={'AssetType'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Type
                        </Column>
                        <Column<OpenXDA.Types.Asset>
                            Key={'EditDelete'}
                            AllowSort={false}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) => <>
                                <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')} onClick={(e) => {
                                        if (hasPermissions()) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            let assetType = assetTypes.find(at => at.ID == item['AssetTypeID']);
                                            setLStatus('loading')
                                            getAssetWithAdditionalFields(item.ID, assetType.Name).then(asset => { setEditasset(asset); setLStatus('idle'); }, () => setLStatus('error'));
                                            setNewEdit('Edit');
                                            setShowModal(true);
                                    }
                                }}><ReactIcons.Pencil Color="var(--warning)" Size={20} /></button>
                                    <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')} onClick={(e) => {
                                        if (hasPermissions()) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            deleteAsset(item);
                                    }
                                }}><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></button></>
                            }
                        > <p></p>
                        </Column>
                    </Table>
                    <div className="row">
                        <div className="col">
                            <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='AddAsset' onMouseEnter={() => setHover('Update')}
                    onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions()) addNewButton() }}>Add Asset</button>
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"AddAsset"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>


            <Modal Show={showModal}
                Title={newEdit == 'New' ? 'Add New Asset to ' + (props.Location?.Name ?? 'Substation') : 'Edit ' + (newEditAsset?.AssetName ?? 'Asset')}
                ConfirmText={'Save'}
                Size={'xlg'}
                ShowCancel={false}
                ShowX={true}
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
                    assetErrors.map((e, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {e}</p>)
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



export default LocationAssetWindow;