﻿//******************************************************************************************************
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
import { useNavigate } from 'react-router-dom';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { getAssetTypes, getAssetWithAdditionalFields } from '../../../TS/Services/Asset';
import { DBActionAsset, DBMeterAction, SelectAssetStatus } from '../Store/AssetSlice'
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Warning, Modal, LoadingScreen, GenericController, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import DERAttributes from '../AssetAttribute/DER';
import { useAppDispatch, useAppSelector } from '../hooks';
import AssetSelect from '../Asset/AssetSelect';
import { SelectRoles } from '../Store/UserSettings';
import GenerationAttributes from '../AssetAttribute/Generation';
import StationAuxAttributes from '../AssetAttribute/StationAux';
import StationBatteryAttributes from '../AssetAttribute/StationBattery';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter }

const MeterAssetWindow = (props: IProps) => {
    const navigate = useNavigate();

    const MeterAssetController = new GenericController<OpenXDA.Types.MeterAsset>(`${homePath}api/OpenXDA/DetailedMeterAsset/${props.Meter.ID}`, "AssetName", true);
    const PagingID = 'MeterAssetPage'

    const [assetTypes, setAssetTypes] = React.useState<OpenXDA.Types.AssetType[]>([]);
    const [newEdit, setNewEdit] = React.useState<Application.Types.NewEdit>('New');

    const [activeAsset, changeActiveAsset] = React.useState<OpenXDA.Types.Asset>(AssetAttributes.getNewAsset('Line'));
    const [showEditNew, setShoweditNew] = React.useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = React.useState<boolean>(false);

    const [showSelect, setShowSelect] = React.useState<boolean>(false);

    // Asset Slice Consts
    const [data, setData] = React.useState<OpenXDA.Types.MeterAsset[]>([]);
    const dispatch = useAppDispatch();
    const status = useAppSelector(SelectAssetStatus) as Application.Types.Status;
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.MeterAsset>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');
    const roles = useAppSelector(SelectRoles);

    // Pagination states
    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');

    React.useEffect(() => {
        let h = getAssetTypes()
        h.done((data: Array<OpenXDA.Types.AssetType>) => {
            setAssetTypes(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, []);

    React.useEffect(() => {
            let storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
            if (storedInfo == null || storedInfo == 0) return; // page 0 means it's on a real page
            if (storedInfo + 1 > pageInfo.NumberOfPages) {
                storedInfo = Math.max(0, pageInfo.NumberOfPages - 1);
                localStorage.setItem(PagingID, `${storedInfo}`);
            }
            setPage(storedInfo);
        }, [pageInfo.TotalRecords]); // Make sure user is still on a real page when data is deleted or filtered out

    React.useEffect(() => {
        localStorage.setItem(PagingID, JSON.stringify(page));
    }, [page]);


    React.useEffect(() => {
        setPageState('loading');
        const handle = MeterAssetController.PagedSearch([], sortKey, ascending, page).done((result) => {
            setData(JSON.parse(result.Data as unknown as string));
            if (result.NumberOfPages == 0) result.NumberOfPages = 1;
            setPageInfo(result);
            setPageState('idle');
        }).fail(() => setPageState('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [sortKey, ascending, page, status])

    function setActiveAsset(assetID: number, assetType: OpenXDA.Types.AssetTypeName) {
        if (assetID == 0) {
            changeActiveAsset(AssetAttributes.getNewAsset(assetType));
            setNewEdit('New');
            return;
        }

        let h = getAssetWithAdditionalFields(assetID, assetType);
        h.then(record => { changeActiveAsset(record); setNewEdit('Edit') });
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    function handleSelect(item) {
            navigate(`${homePath}index.cshtml?name=Asset&AssetID=${item.row.ID}`);
    }

    return (
        <>
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Assets:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body" style={{ paddingBottom: 0,  display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Table<OpenXDA.Types.MeterAsset>
                            TableClass="table table-hover"
                            Data={data}
                            SortKey={sortKey}
                            Ascending={ascending}
                            OnSort={(d) => {
                                if (d.colKey === 'EditDelete')
                                    return;
                                if (d.colKey == sortKey)
                                    setAscending(!ascending);
                                else {
                                    setAscending(true);
                                    setSortKey(d.colKey as keyof OpenXDA.Types.Asset);
                                }
                            }}
                            OnClick={handleSelect}
                            TheadStyle={{ fontSize: 'smaller' }}
                            RowStyle={{ fontSize: 'smaller' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<OpenXDA.Types.MeterAsset>
                                Key={'AssetName'}
                                AllowSort={true}
                                Field={'AssetName'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Name
                            </Column>
                            <Column<OpenXDA.Types.MeterAsset>
                                Key={'AssetKey'}
                                AllowSort={true}
                                Field={'AssetKey'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Key
                            </Column>
                            <Column<OpenXDA.Types.MeterAsset>
                                Key={'VoltageKV'}
                                AllowSort={true}
                                Field={'VoltageKV'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Voltage (kV)
                            </Column>
                            <Column<OpenXDA.Types.MeterAsset>
                                Key={'AssetType'}
                                AllowSort={true}
                                Field={'AssetType'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Type
                            </Column>
                            <Column<OpenXDA.Types.MeterAsset>
                                Key={'FaultDetectionLogic'}
                                AllowSort={true}
                                Field={'FaultDetectionLogic'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Fault Detection Logic
                            </Column>
                            <Column<OpenXDA.Types.MeterAsset>
                                Key={'Designation'}
                                AllowSort={true}
                                Field={'Designation'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Designation
                            </Column>
                            <Column<OpenXDA.Types.MeterAsset>
                                Key={'EditDelete'}
                                AllowSort={false}
                                HeaderStyle={{ width: 'auto', paddingLeft: 0, paddingRight: 5 }}
                                RowStyle={{ width: 'auto', paddingLeft: 0, paddingRight: 5 }}
                                Content={({ item }) => <>
                                    <button className={"btn btn-sm" + (hasPermissions() ? '' : ' disabled')}
                                        onClick={(e) => {
                                            if (hasPermissions()) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setActiveAsset(item.ID, item.AssetType);
                                                setShoweditNew(true);
                                            }
                                        }}><span><ReactIcons.Pencil Color="var(--warning)" Size={20} /></span></button>
                                    <button className={"btn btn-sm" + (hasPermissions() ? '' : ' disabled')}
                                        onClick={(e) => {
                                            if (hasPermissions()) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setActiveAsset(item.ID, item.AssetType);
                                                setShowDeleteWarning(true);
                                            }
                                        }}><span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span></button>
                                </>}
                            > <p></p>
                            </Column>
                        </Table>

                        <Warning Show={showDeleteWarning} CallBack={(confirmed) => { if (confirmed) dispatch(DBMeterAction({ verb: 'DELETE', assetID: activeAsset.ID, meterID: props.Meter.ID, locationID: props.Meter.LocationID })); setShowDeleteWarning(false); }} Title={'Remove ' + (activeAsset?.AssetName ?? 'Asset') + ' from ' + (props.Meter?.Name ?? 'Meter')} Message={'This will permanently remove the Asset from this Meter.'} />
                        <LoadingScreen Show={pageState == 'loading'} />
                        <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                        <div className="row">
                            <div className="col">
                                <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                            </div>
                        </div>
                        <Modal Show={showEditNew}
                            Title={newEdit == 'New' ? 'Add New Asset to ' + (props.Meter?.Name ?? 'Meter') : 'Edit ' + (activeAsset?.AssetKey ?? 'Asset')}
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
                                AssetAttributes.AttributeError(activeAsset).map((e, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {e}</p>)
                            }
                        >
                            <div className="row">
                                <div className="col">
                                    <AssetAttributes.AssetAttributeFields Asset={activeAsset} NewEdit={newEdit} AssetTypes={assetTypes} AllAssets={data}
                                        UpdateState={changeActiveAsset}
                                        GetDifferentAsset={(assetID) => {
                                            setActiveAsset(assetID, assetTypes.find(at => (data as any).find(a => a.ID == assetID).AssetTypeID).Name);
                                        }} HideSelectAsset={true} HideAssetType={false} />
                                </div>
                                <div className="col">
                                    {showAttributes()}
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className={"btn btn-info pull-right" + (hasPermissions() ? '' : ' disabled')} style={{ marginRight: 5 }} data-tooltip='ExistingAsset' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}
                            onClick={() => { if (hasPermissions()) setShowSelect(true) }}>Add Existing Asset</button>
                        <ToolTip Show={hover == 'submit' && !hasPermissions()} Position={'top'} Target={"ExistingAsset"}>
                            <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                        </ToolTip>

                        <button className={"btn btn-info pull-right" + (hasPermissions() ? '' : ' disabled')} data-tooltip='NewAsset' onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')}
                            onClick={() => { setActiveAsset(0, 'Line'); if (hasPermissions()) setShoweditNew(true); }}>Add New Asset</button>
                        <ToolTip Show={hover == 'clear' && !hasPermissions()} Position={'top'} Target={"NewAsset"}>
                            <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                        </ToolTip>
                    </div>
                </div>
            </div>
            <AssetSelect
                SelectedAssets={[]}
                ShowModal={showSelect}
                StorageID={'MeterAsset'}
                Type={'single'}
                Title={`Add Asset to ${props.Meter.Name}`}
                OnCloseFunction={(selected, confirm) => {
                    setShowSelect(false);
                    if (confirm)
                        dispatch(DBMeterAction({ verb: 'POST', assetID: selected[0].ID, meterID: props.Meter.ID, locationID: props.Meter.LocationID }));
                }}
            />
        </>
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
        else if (activeAsset.AssetType == 'Generation')
            return <GenerationAttributes NewEdit={newEdit} Asset={activeAsset} UpdateState={changeActiveAsset} />;
        else if (activeAsset.AssetType == 'StationAux')
            return <StationAuxAttributes NewEdit={newEdit} Asset={activeAsset} UpdateState={changeActiveAsset} />;
        else if (activeAsset.AssetType == 'StationBattery')
            return <StationBatteryAttributes NewEdit={newEdit} Asset={activeAsset} UpdateState={changeActiveAsset} />;
    }
}

export default MeterAssetWindow;