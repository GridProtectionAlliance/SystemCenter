//******************************************************************************************************
//  AssetAssetGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as _ from 'lodash';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Warning } from '@gpa-gemstone/react-interactive';
import { Column, Paging, Table } from '@gpa-gemstone/react-table';
import { useAppSelector } from '../hooks';
import AssetSelect from '../Asset/AssetSelect';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

interface IProps {
    AssetGroupID: number
}

function AssetAssetGroupWindow(props: IProps) {
    let navigate = useNavigate();

    // asset table
    const [assets, setAssets] = React.useState<SystemCenter.Types.DetailedAsset[]>([]);
    const [assetStatus, setAssetStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [sortKey, setSortKey] = React.useState<string>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');

    // paging
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);

    // add/remove asset modal
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [removeAsset, setRemoveAsset] = React.useState<number>(-1);

    // db actions
    const [actionStatus, setActionStatus] = React.useState<Application.Types.Status>('idle');

    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {

        if (props.AssetGroupID == null) return 

        setAssetStatus('loading');

        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/Assets/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ OrderBy: sortKey, Ascending: ascending })
        })

        handle.done((d) => {
            setAssets(JSON.parse(d.Data));
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
            setAssetStatus('idle')
        });

        handle.fail(() => setAssetStatus('error'))

        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        }
    }, [ascending, sortKey, page, props.AssetGroupID, refreshTrigger])


    async function saveItems(items: SystemCenter.Types.DetailedAsset[]) {
        setActionStatus('loading');

        const handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/AddAssets`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true,
            data: JSON.stringify(items.map(e => e.ID))
        });

        handle.done(d => {
            setActionStatus('idle')
            setRefreshTrigger(val => !val);
        })

        handle.fail(() => setActionStatus('error'));

        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        }
    }

    async function removeItem(id: number) {
        setActionStatus('loading');

        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/RemoveAsset/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => {
            setActionStatus('idle')
            setRefreshTrigger(val => !val);
        })

        handle.fail(() => setActionStatus('error'));

        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        }
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
                            <h4>Transmission Assets:</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p style={{ marginTop: 2, marginBottom: 2 }}>
                                {assetStatus === 'error' ? 'Could not complete Search' :
                                    assetStatus === 'loading' ? 'Loading...' :
                                        `Displaying Asset(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + assets.length} out of ${totalRecords}`}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="row d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                        <Table<SystemCenter.Types.DetailedAsset>
                            TableClass="table table-hover"
                            Data={assets}
                            SortKey={sortKey}
                            Ascending={ascending}
                            OnSort={(d) => {
                                if (d.colKey === "Remove")
                                    return;

                                if (d.colKey === sortKey) {
                                    setAscending(!ascending);
                                }
                                else {
                                    setAscending(true);
                                    setSortKey(d.colKey);
                                }
                            }}
                            OnClick={handleSelect}
                            TheadStyle={{ fontSize: 'smaller' }}
                            RowStyle={{ fontSize: 'smaller' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'AssetName'}
                                AllowSort={true}
                                Field={'AssetName'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Name
                            </Column>
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'AssetKey'}
                                AllowSort={true}
                                Field={'AssetKey'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Key
                            </Column>
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'AssetType'}
                                AllowSort={true}
                                Field={'AssetType'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Type
                            </Column>
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'Remove'}
                                AllowSort={false}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item }) => <>
                                    <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')}
                                        onClick={(e) => {
                                            if (hasPermissions()) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setRemoveAsset(item.ID);
                                            }
                                        }}>
                                        <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                                    </button>
                                </>}
                            > <p></p>
                            </Column>
                        </Table>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Paging
                                Total={totalPages}
                                Current={page + 1}
                                SetPage={(page) => setPage(page -1)}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')}
                            data-tooltip='AddAsset'
                            onMouseEnter={() => setHover('Update')}
                            onMouseLeave={() => setHover('None')}
                            onClick={() => { if (hasPermissions()) setShowAdd(true) }}>Add Assets</button>
                    </div>
                    <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"AddAsset"}>
                        <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                    </ToolTip>
                </div>
            </div>
            <AssetSelect
                Type='multiple'
                StorageID='AssetAssetGroup'
                Title={'Add Transmission Assets to Asset Group'}
                ShowModal={showAdd}
                SelectedAssets={assets}
                OnCloseFunction={(selected, conf) => {
                    setShowAdd(false);
                    if (!conf) return
                    saveItems(selected.filter(items => assets.findIndex(g => g.ID == items.ID) < 0))
                }} />
            <Warning Show={removeAsset > -1} Title={'Remove Asset from Asset Group'} Message={'This will remove the Transmission Asset from this Asset Group.'} CallBack={(c) => { if (c) removeItem(removeAsset); setRemoveAsset(-1); }} />
        </>
    )
}


export default AssetAssetGroupWindow;