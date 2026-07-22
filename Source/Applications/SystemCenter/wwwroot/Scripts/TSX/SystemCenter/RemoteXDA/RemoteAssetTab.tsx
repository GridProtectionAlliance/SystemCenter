//******************************************************************************************************
//  AssetEventChannel.tsx - Gbtc
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
//  04/19/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { RemoteXDAAssetSlice, ByAssetSlice } from '../Store/Store';
import { GenericController, LoadingScreen, Modal, Search, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { BlankRemoteXDAAsset, RemoteAssetForm } from './RemoteAssetForm';
import AssetSelect from '../Asset/AssetSelect';
import { SelectRoles } from '../Store/UserSettings';

interface IProps { ID: number }

const RemoteAssetTab = (props: IProps) => {

    const dispatch = useAppDispatch();

    // Remote Asset Table
    const [remoteAssets, setRemoteAssets] = React.useState<OpenXDA.Types.RemoteXDAAsset[]>([]);
    const [remoteAssetStatus, setRemoteAssetStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.RemoteXDAAsset>('LocalAssetName');
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    // Remote Asset Pagination
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);

    // Edit and Delete Form 
    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [remoteAsset, setRemoteAsset] = React.useState<OpenXDA.Types.RemoteXDAAsset>(BlankRemoteXDAAsset);
    const [selectedAsset, setSelectedAsset] = React.useState<OpenXDA.Types.RemoteXDAAsset>(BlankRemoteXDAAsset);
    const [showEdit, setShowEdit] = React.useState<(boolean)>(false);
    const [showDelete, setShowDelete] = React.useState<(boolean)>(false);

    // Add New Asset 
    const [assetStatus, setAssetStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [assets, setAssets] = React.useState<Array<SystemCenter.Types.DetailedAsset>>([]);
    const [showAddAssets, setShowAddAssets] = React.useState<(boolean)>(false);

    // DBAction statues
    const [patchStatus, setPatchStatus] = React.useState<Application.Types.Status>('idle');
    const [deleteStatus, setDeleteStatus] = React.useState<Application.Types.Status>('idle');
    const [addStatus, setAddStatus] = React.useState<Application.Types.Status>('idle');

    const roles = useAppSelector(SelectRoles);

    const remoteAssetController = React.useMemo(() => new GenericController<OpenXDA.Types.RemoteXDAAsset>(`${homePath}api/OpenXDA/RemoteXDAAsset`, "LocalAssetName", false), [])
    const byAssetController = React.useMemo(() => new GenericController<SystemCenter.Types.DetailedAsset>(`${homePath}api/OpenXDA/ByAsset`, "AssetName", true), [])
    const filters: Search.IFilter<OpenXDA.Types.RemoteXDAAsset>[] = React.useMemo(() => [{
        FieldName: 'RemoteXDAInstanceID',
        SearchText: props.ID.toString(),
        Operator: '=',
        Type: 'number',
        IsPivotColumn: false
    }], [props.ID])

    // fetch remote assets
    React.useEffect(() => {
        setRemoteAssetStatus('loading');

        const handle = remoteAssetController.PagedSearch(filters, sortKey, ascending, page);

        handle.done((d) => {
            setRemoteAssets(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
            setRemoteAssetStatus('idle');
        })

        handle.fail(() => setRemoteAssetStatus('error'));

        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        }

    }, [filters, ascending, sortKey, page, remoteAssetController, refreshTrigger]);

    // fetch all assets
    React.useEffect(() => {
        setAssetStatus('loading');

        const handle = byAssetController.Fetch();

        handle.done((d) => {
            setAssetStatus('idle');
            setAssets(d.filter(asset => remoteAssets.find(rmt => rmt.LocalAssetKey === asset.AssetKey) != null ? true : false));
        })

        handle.fail(() => setAssetStatus('error'))

        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        }
    }, [byAssetController, remoteAssets]);


    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0)
            return false;
        return true;
    }

    let cardBody;
    if (remoteAssetStatus === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
    } else if (remoteAssetStatus === 'loading') {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody =
            <>
                <div className="row d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                    <Table<OpenXDA.Types.RemoteXDAAsset>
                        TableClass="table table-hover"
                        Data={remoteAssets}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey == 'Edit' || d.colKey == 'Delete') return;
                            if (d.colKey === sortKey)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortKey(d.colField);
                            }
                        }}
                        TheadStyle={{ fontSize: 'smaller' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<OpenXDA.Types.RemoteXDAAsset>
                            Key={'LocalAssetName'}
                            AllowSort={true}
                            Field={'LocalAssetName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Local Name
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAAsset>
                            Key={'LocalAssetKey'}
                            AllowSort={true}
                            Field={'LocalAssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Local Key
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAAsset>
                            Key={'RemoteAssetName'}
                            AllowSort={true}
                            Field={'RemoteAssetName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Remote Name
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAAsset>
                            Key={'RemoteAssetKey'}
                            AllowSort={true}
                            Field={'RemoteAssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Remote Key
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAAsset>
                            Key={'Obsfucate'}
                            AllowSort={true}
                            Field={'Obsfucate'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.Obsfucate ? <ReactIcons.CheckMark Color="var(--success)" /> : null}
                        > Obfuscated
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAAsset>
                            Key={'Synced'}
                            AllowSort={true}
                            Field={'Synced'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.Synced ? <ReactIcons.CheckMark Color="var(--success)" /> : null}
                        > Synced
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAAsset>
                            Key={'Edit'}
                            AllowSort={false}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) => (isEditable(item) ?
                                <button
                                    className={"btn btn-edit" + (isEditable(item) ? '' : ' disabled') + (hasPermissions() ? '' : ' disabled')}
                                    onClick={(e) => {
                                        if (hasPermissions()) {
                                            e.preventDefault();
                                            if (isEditable(item)) {
                                                setSelectedAsset(item);
                                                setShowEdit(true);
                                            }
                                        }
                                    }}>
                                    <span><ReactIcons.Pencil Color="var(--warning)" Size={20} /></span>
                                </button> : null)
                            }
                        > <p></p>
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAAsset>
                            Key={'Delete'}
                            AllowSort={false}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) => (isEditable(item) ?
                                <button
                                    className={"btn btn-delete" + (isEditable(item) ? '' : ' disabled') + (hasPermissions() ? '' : ' disabled')}
                                    onClick={(e) => {
                                        if (hasPermissions()) {
                                            e.preventDefault();
                                            if (isEditable(item)) {
                                                setSelectedAsset(item);
                                                setShowDelete(true);
                                            }
                                        }
                                    }}>
                                    <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                                </button> : null)
                            }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
                <div className="row">
                    <div className="col">
                        <Paging
                            Current={page + 1}
                            SetPage={(page) => setPage(page - 1)}
                            Total={totalPages}
                        />
                    </div>
                </div>
            </>
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Remote openXDA Assets:</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p style={{ marginTop: 2, marginBottom: 2 }}>
                            {remoteAssetStatus === 'error' ? 'Could not complete Search' :
                                remoteAssetStatus === 'loading' ? 'Loading...' :
                                    `Displaying Substation(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + remoteAssets.length} out of ${totalRecords}`}
                        </p>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                {cardBody}
            </div>
            <div className="card-footer">
                <div className="add-new-asset">
                    <button
                        className={"btn btn-info" + (hasPermissions() ? '' : ' disabled')}
                        type="submit" data-tooltip='AddAssets' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}
                        onClick={(e) => {
                            if (hasPermissions()) {
                                e.preventDefault();
                                setShowAddAssets(true);
                            }
                        }}>
                        Add Assets
                    </button>
                </div>
                <ToolTip Show={hover == 'submit' && !hasPermissions()} Position={'top'} Target={"AddAssets"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>
            <Warning Title={"Delete " + (selectedAsset?.RemoteXDAAssetKey ?? "Remote Asset")} Show={showDelete} Message={"Are you sure you want to delete the Remote Asset for " + (selectedAsset?.LocalAssetName ?? "No Local Name") + "?"}
                CallBack={(conf) => {
                    setDeleteStatus('loading');
                    if (conf) remoteAssetController.DBAction('DELETE', selectedAsset).done(() => { setDeleteStatus('idle'); setRefreshTrigger(val => !val); }).fail(() => setDeleteStatus('error'));
                    setShowDelete(false);
                }} />
            <Modal Show={showEdit} Title={'Edit ' + (selectedAsset?.LocalAssetName ?? 'Remote Asset')}
                ShowCancel={true}
                CallBack={(conf) => {
                    if (conf) remoteAssetController.DBAction('PATCH', remoteAsset).done(() => { setPatchStatus('idle'); setRefreshTrigger(val => !val); }).fail(() => setPatchStatus('error'));
                    setShowEdit(false);
                }}
                DisableConfirm={newInstErrors.length > 0}
                ShowX={true}
                Size={"lg"}
                ConfirmShowToolTip={newInstErrors.length > 0}
                ConfirmToolTipContent={
                    newInstErrors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)
                }>
                <RemoteAssetForm OriginalAsset={selectedAsset} SetRemoteAsset={setRemoteAsset} SetErrors={setNewInstErrors} />
            </Modal>
            <AssetSelect
                Type='multiple'
                StorageID='RemoteAssetTab'
                ShowModal={showAddAssets}
                SelectedAssets={assets}
                Title={"Add Assets to Remote openXDA Instance:"}
                OnCloseFunction={(selected, conf) => {
                    setShowAddAssets(false);
                    setAssets([]);
                    if (!conf) return;
                    const handle = Promise.allSettled(selected.map((asset) => {
                        let newRemote: OpenXDA.Types.RemoteXDAAsset = {
                            ID: -1,
                            RemoteXDAInstanceID: props.ID,
                            LocalXDAAssetID: asset.ID,
                            RemoteXDAAssetID: -1,
                            RemoteXDAAssetKey: asset.AssetKey,
                            Obsfucate: false,
                            Synced: false,
                            RemoteAssetCreatedByDataPusher: false,
                            LocalAssetName: "",
                            LocalAssetKey: "",
                            RemoteAssetName: "",
                            RemoteAssetKey: ""
                        }
                        return remoteAssetController.DBAction("POST", newRemote);
                    })).then(() => { setAddStatus('idle'); setRefreshTrigger(val => !val)}) // some of these will fail, assuming that the selected asset was already attached to the remote XDA instance.

                }} />
        </div>
    );

}

export default RemoteAssetTab;


function isEditable(item: OpenXDA.Types.RemoteXDAAsset): boolean {
    return item.RemoteXDAAssetID <= 0;
}