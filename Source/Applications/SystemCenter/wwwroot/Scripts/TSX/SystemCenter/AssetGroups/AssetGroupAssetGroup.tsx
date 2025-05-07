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
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { useNavigate } from 'react-router-dom';
import { Table, Column } from '@gpa-gemstone/react-table';
import { AssetGroupSlice } from '../Store/Store';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { Search, Warning } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;


function AssetGroupAssetGroupWindow(props: { AssetGroupID: number}) {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [groupList, setGroupList] = React.useState<Array<OpenXDA.Types.AssetGroup>>([]);
    const [sortField, setSortField] = React.useState<string>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(0);
    const [removeGroup, setRemoveGroup] = React.useState<number>(-1);

    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    const noSameFilter: Search.IFilter<OpenXDA.Types.RemoteXDAMeter> =
    {
        FieldName: 'ID',
        SearchText: props.AssetGroupID.toString(),
        Operator: '<>',
        Type: 'number',
        IsPivotColumn: false
    };

    React.useEffect(() => {
        dispatch(AssetGroupSlice.SetChanged());
        return getData();
    }, [props.AssetGroupID, counter]);

    function getData() {
        if (props.AssetGroupID == null)
            return () => { };

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/AssetGroups`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((data: Array<OpenXDA.Types.AssetGroup>) => {
            const sortedData = sortData(sortField, ascending, data);
            setGroupList(sortedData);
        });
      
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }

    function sortData(key: string, ascending: boolean, data: OpenXDA.Types.AssetGroup[]) {
        return _.orderBy(data, [key], [(ascending ? "asc" : "desc")]);
    }

    function getEnum(setOptions, field) {
        let handle = null;
        if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
            return () => { };

        handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        }
    }

    function removeItem(id: number) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/RemoveGroup/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setCounter(x => x + 1))
    }

    function saveItems(items: OpenXDA.Types.AssetGroup[]) {
        
        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/AddAssetGroups`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true,
            data: JSON.stringify(items.map(e => e.ID))
        });

        handle.done(d => setCounter(x => x + 1))


    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return true;
        return false;
    }

    return (
        <>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Asset Groups in Asset Group:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{  width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Table<OpenXDA.Types.AssetGroup>
                        TableClass="table table-hover"
                        Data={groupList}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey == sortField) {
                                setAscending(!ascending);
                                const ordered = _.orderBy(groupList, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setGroupList(ordered);
                            }
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                                const ordered = _.orderBy(groupList, [d.colKey], ["asc"]);
                                setGroupList(ordered);
                            }
                        }}
                        OnClick={(data) => { navigate(`${homePath}index.cshtml?name=AssetGroup&AssetGroupID=${data.row.ID}`); }}
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'Assets'}
                            AllowSort={true}
                            Field={'Assets'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Assets
                        </Column>
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'Meters'}
                            AllowSort={true}
                            Field={'Meters'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Meters
                        </Column>
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'AssetGroups'}
                            AllowSort={true}
                            Field={'AssetGroups'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Asset Groups
                        </Column>
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'Remove'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => <>
                                <button className={"btn btn-sm" + (hasPermissions() ? ' disabled' : '')}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!hasPermissions()) setRemoveGroup(item.ID); }}>
                                    <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                                </button>
                            </> }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
                
            </div>
            <div className="card-footer">
                    <button className={"btn btn-info pull-left" + (hasPermissions() ? ' disabled' : '')} data-tooltip='AddGroup'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (!hasPermissions()) setShowAdd(true); }}>Add Asset Groups</button>
                </div>
                <ToolTip Show={hover == 'Update' && hasPermissions()} Position={'top'} Target={"AddGroup"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>

                <DefaultSelects.AssetGroup
                    Slice={AssetGroupSlice}
                    Selection={groupList}
                    OnClose={(selected, conf) => {
                        setShowAdd(false)
                        if (!conf) return
                        saveItems(selected.filter(items => groupList.findIndex(g => g.ID == items.ID) < 0))
                    }}
                    Show={showAdd}
                    Type={'multiple'}
                    AddlFilters={[noSameFilter]}
                    Title={"Add Asset Groups to Asset Group"}
                    GetEnum={getEnum}
                    GetAddlFields={() => () => { }}
                >
                    <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >Name</Column>
                    <Column Key="Assets" Field="Assets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >Assets</Column>
                    <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >Meters</Column>
                    <Column Key="AssetGroups" Field="AssetGroups" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >Sub Groups</Column>
                </DefaultSelects.AssetGroup>
                <Warning Show={removeGroup > -1} Title={'Remove Asset Group from Asset Group'} Message={'This will remove the Asset Group from this Asset Group.'} CallBack={(c) => { if (c) removeItem(removeGroup); setRemoveGroup(-1); }} />
            </div>
            </>
    );
}


export default AssetGroupAssetGroupWindow;