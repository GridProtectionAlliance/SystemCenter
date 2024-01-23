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
import { ReactTable } from '@gpa-gemstone/react-table';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { RemoteXDAAssetSlice, ByAssetSlice } from '../Store/Store';
import { LoadingScreen, Modal, Search, ServerErrorIcon, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { CrossMark, HeavyCheckMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { BlankRemoteXDAAsset, RemoteAssetForm } from './RemoteAssetForm';
import AssetSelect from '../Asset/AssetSelect';
import { SelectRoles } from '../Store/UserSettings';

interface IProps { ID: number }


const RemoteAssetTab = (props: IProps) => {
    // Display Remote Assets Consts
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.RemoteXDAAsset>('LocalAssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const dispatch = useAppDispatch();
    const remoteAssetStatus = useAppSelector(RemoteXDAAssetSlice.Status);
    const searchResults = useAppSelector(RemoteXDAAssetSlice.SearchResults);
    const searchState = useAppSelector(RemoteXDAAssetSlice.SearchStatus);

    const searchFilters: Search.IFilter<OpenXDA.Types.RemoteXDAAsset>[] =
    [{
        FieldName: 'RemoteXDAInstanceID',
        SearchText: props.ID.toString(),
        Operator: '=',
        Type: 'number',
        isPivotColumn: false
    }]

    // Edit and Delete Form Consts
    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [remoteAsset, setRemoteAsset] = React.useState<OpenXDA.Types.RemoteXDAAsset>(BlankRemoteXDAAsset);
    const [selectedAsset, setSelectedAsset] = React.useState<OpenXDA.Types.RemoteXDAAsset>(BlankRemoteXDAAsset);
    const [showEdit, setShowEdit] = React.useState<(boolean)>(false);
    const [showDelete, setShowDelete] = React.useState<(boolean)>(false);

    // Add New Asset Consts
    const assetStatus = useAppSelector(ByAssetSlice.Status) as Application.Types.Status;
    const [assetList, setAssetList] = React.useState<Array<SystemCenter.Types.DetailedAsset>>([]);
    const [showAddAssets, setShowAddAssets] = React.useState<(boolean)>(false);

    const roles = useAppSelector(SelectRoles);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    React.useEffect(() => {
        if (remoteAssetStatus === 'unintiated' || remoteAssetStatus === 'changed')
            dispatch(RemoteXDAAssetSlice.Fetch());
    }, [dispatch, remoteAssetStatus]);

    React.useEffect(() => {
        if (searchState === 'unintiated' || searchState === 'changed')
            dispatch(RemoteXDAAssetSlice.DBSearch({ filter: searchFilters, ascending: ascending, sortField: sortKey }));
    }, [dispatch, searchState]);

    React.useEffect(() => {
        dispatch(RemoteXDAAssetSlice.DBSearch({ sortField: sortKey, ascending, filter: searchFilters }))
    }, [ascending, sortKey]);

    React.useEffect(() => {
        if (assetStatus === 'unintiated' || assetStatus === 'changed')
            dispatch(ByAssetSlice.Fetch());
    }, [dispatch, assetStatus]);

    function isEditable(item: OpenXDA.Types.RemoteXDAAsset): boolean {
        return item.RemoteXDAAssetID <= 0;
    }

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
            <ReactTable.Table<OpenXDA.Types.RemoteXDAAsset>
                TableClass="table table-hover"
                Data={searchResults}
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
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <ReactTable.Column<OpenXDA.Types.RemoteXDAAsset>
                    Key={'LocalAssetName'}
                    AllowSort={true}
                    Field={'LocalAssetName'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Local Asset Name
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAAsset>
                    Key={'LocalAssetKey'}
                    AllowSort={true}
                    Field={'LocalAssetKey'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Local Asset Key
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAAsset>
                    Key={'RemoteAssetName'}
                    AllowSort={true}
                    Field={'RemoteXDAAssetKey'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.Obsfucate ? item.RemoteXDAAssetKey : item.LocalAssetName }
                > Remote Asset Name
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAAsset>
                    Key={'RemoteAssetKey'}
                    AllowSort={true}
                    Field={'RemoteXDAAssetKey'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.Obsfucate ? item.RemoteXDAAssetKey : item.LocalAssetKey }
                > Remote Asset Key
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAAsset>
                    Key={'Obsfucate'}
                    AllowSort={true}
                    Field={'Obsfucate'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.Obsfucate ? HeavyCheckMark : null }
                > Obsfucated
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAAsset>
                    Key={'Synced'}
                    AllowSort={true}
                    Field={'Synced'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.Synced ? HeavyCheckMark : null}
                > Synced
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAAsset>
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
                            <span>{Pencil}</span>
                        </button> : null)
                    }
                > <p></p>
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAAsset>
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
                            <span>{TrashCan}</span>
                        </button> : null)
                    }
                > <p></p>
                </ReactTable.Column>
            </ReactTable.Table>
    }

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Remote openXDA Assets:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                {cardBody}
            </div>
            <div className="card-footer">
                <div className="add-new-asset">
                    <button
                        className={"btn btn-primary" + (hasPermissions() ? '' : ' disabled')}
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
                <ToolTip Show={hover == 'submit' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"AddAssets"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>
            <Warning Title={"Delete " + (selectedAsset?.RemoteXDAAssetKey ?? "Remote Asset")} Show={showDelete} Message={"Are you sure you want to delete the Remote Asset for " + (selectedAsset?.LocalAssetName ?? "No Local Name") + "?"}
                CallBack={(conf) => {
                    if (conf) dispatch(RemoteXDAAssetSlice.DBAction({ verb: 'DELETE', record: selectedAsset }));
                    setShowDelete(false);
                }} />
            <Modal Show={showEdit} Title={'Edit ' + (selectedAsset?.LocalAssetName ?? 'Remote Asset')}
                ShowCancel={true}
                CallBack={(conf) => {
                    if (conf) dispatch(RemoteXDAAssetSlice.DBAction({ verb: 'PATCH', record: remoteAsset }));
                    setShowEdit(false);
                }}
                DisableConfirm={newInstErrors.length > 0}
                ShowX={true}
                Size={"lg"}
                ConfirmShowToolTip={newInstErrors.length > 0}
                ConfirmToolTipContent={
                    newInstErrors.map((t, i) => <p key={i}> {CrossMark} {t} </p>)
                }>
                <RemoteAssetForm OriginalAsset={selectedAsset} SetRemoteAsset={setRemoteAsset} SetErrors={setNewInstErrors} />
            </Modal>
            <AssetSelect Type='multiple' StorageID='RemoteAssetTab' ShowModal={showAddAssets} SelectedAssets={assetList}
                Title={"Add Assets to Remote openXDA Instance:"}
                OnCloseFunction={(selected, conf) => {
                    setShowAddAssets(false);
                    setAssetList([]);
                    if (!conf) return;
                    selected.forEach((asset) => {
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
                            LocalAssetKey: ""
                        }
                        dispatch(RemoteXDAAssetSlice.DBAction({ verb: "POST", record: newRemote }));
                    });
                }} />
        </div>
    );


}

export default RemoteAssetTab;