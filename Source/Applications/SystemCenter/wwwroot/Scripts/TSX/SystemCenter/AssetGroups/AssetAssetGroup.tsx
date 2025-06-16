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
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Table, Column } from '@gpa-gemstone/react-table';
import { AssetGroupSlice, AssetTypeSlice } from '../Store/Store';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Warning } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { useAppDispatch, useAppSelector } from '../hooks';
import AssetSelect from '../Asset/AssetSelect';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

function AssetAssetGroupWindow(props: { AssetGroupID: number}) {
    let navigate = useNavigate();
    const [assetList, setAssetList] = React.useState<Array<SystemCenter.Types.DetailedAsset>>([]);
    const [sortKey, setSortKey] = React.useState<string>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(0);
    const [removeAsset, setRemoveAsset] = React.useState<number>(-1);

    const assetType = useAppSelector(AssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(AssetTypeSlice.Status);
    const dispatch = useAppDispatch();

    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        dispatch(AssetGroupSlice.SetChanged());
        return getData();
    }, [props.AssetGroupID, counter]);

    React.useEffect(() => {
        if (assetTypeStatus == 'changed' || assetTypeStatus == 'unintiated')
            dispatch(AssetTypeSlice.Fetch());
    }, [assetTypeStatus]);

    function getData() {
        if (props.AssetGroupID == null)
            return () => { };

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/Assets`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })

        handle.done((data: Array<SystemCenter.Types.DetailedAsset>) => {
            const sortedData = sortData(sortKey, ascending, data);
            setAssetList(sortedData);
        });
      
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }

    function sortData(key: string, ascending: boolean, data: SystemCenter.Types.DetailedAsset[]) {
        return _.orderBy(data, [key], [(ascending ? "asc" : "desc")]);
    }

    function saveItems(items: SystemCenter.Types.DetailedAsset[]) {

        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/AddAssets`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true,
            data: JSON.stringify(items.map(e => e.ID))
        });

        handle.done(d => setCounter(x => x + 1))


    }

    function removeItem(id: number) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/RemoveAsset/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setCounter(x => x + 1))
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return true;
        return false;
    }

    function handleSelect(item, event) {
        if (event.target.localName == 'td')
            navigate(`${homePath}index.cshtml?name=Asset&AssetID=${item.row.assetID}`);
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
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Table<SystemCenter.Types.DetailedAsset>
                        TableClass="table table-hover"
                        Data={assetList}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === "Remove")
                                return;

                            if (d.colKey === sortKey) {
                                setAscending(!ascending);
                                const ordered = _.orderBy(assetList, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAssetList(ordered);
                            }
                            else {
                                setAscending(true);
                                setSortKey(d.colKey);
                                const ordered = _.orderBy(assetList, [d.colKey], ["asc"]);
                                setAssetList(ordered);
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
                                <button className={"btn btn-sm" + (hasPermissions() ? ' disabled' : '')}
                                    onClick={(e) => { if (!hasPermissions()) setRemoveAsset(item.ID) }}>
                                    <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                                </button>
                            </> }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                        <button className={"btn btn-info pull-right" + (hasPermissions() ? ' disabled' : '')} data-tooltip='AddAsset'
                            onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (!hasPermissions()) setShowAdd(true) }}>Add Assets</button>
                </div>
                    <ToolTip Show={hover == 'Update' && hasPermissions()} Position={'top'} Target={"AddAsset"}>
                        <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                    </ToolTip>
            </div>
            </div>
            <AssetSelect Type='multiple' StorageID='AssetAssetGroup' Title={'Add Transmission Assets to Asset Group'} ShowModal={showAdd} SelectedAssets={assetList}
                OnCloseFunction={(selected, conf) => {
                    setShowAdd(false);
                    if (!conf) return
                    saveItems(selected.filter(items => assetList.findIndex(g => g.ID == items.ID) < 0))
                }} />
            <Warning Show={removeAsset > -1} Title={'Remove Asset from Asset Group'} Message={'This will remove the Transmission Asset from this Asset Group.'} CallBack={(c) => { if (c) removeItem(removeAsset); setRemoveAsset(-1); }} />
            </>
    )
}


export default AssetAssetGroupWindow;