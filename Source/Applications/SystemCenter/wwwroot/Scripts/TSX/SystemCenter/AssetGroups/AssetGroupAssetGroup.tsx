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
import { useHistory } from 'react-router-dom';
import { ReactTable } from '@gpa-gemstone/react-table';
import { AssetGroupSlice } from '../Store/Store';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { Search, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { TrashCan } from '@gpa-gemstone/gpa-symbols';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;


function AssetGroupAssetGroupWindow(props: { AssetGroupID: number}) {
    let history = useHistory();
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

        handle.done((data: Array<OpenXDA.Types.AssetGroup>) => setGroupList(data));
      
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
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
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return true;
        return false;
    }

    return (
        <>
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Asset Groups in Asset Group:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <ReactTable.Table<OpenXDA.Types.AssetGroup>
                        TableClass="table table-hover"
                        Data={groupList}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey == sortField) {
                                let ordered = _.orderBy(groupList, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setGroupList(ordered);
                            }
                            else {
                                let ordered = _.orderBy(groupList, [d.colKey], ["asc"]);
                                setAscending(!ascending);
                                setGroupList(ordered);
                                setSortField(d.colKey);
                            }
                        }}
                        OnClick={(data) => { history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + data.row.ID }) }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<OpenXDA.Types.AssetGroup>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.AssetGroup>
                            Key={'Assets'}
                            AllowSort={true}
                            Field={'Assets'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Assets
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.AssetGroup>
                            Key={'Meters'}
                            AllowSort={true}
                            Field={'Meters'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Meters
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.AssetGroup>
                            Key={'AssetGroups'}
                            AllowSort={true}
                            Field={'AssetGroups'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Asset Groups
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.AssetGroup>
                            Key={'Remove'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => <>
                                <button className={"btn btn-sm" + (hasPermissions() ? ' disabled' : '')}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!hasPermissions()) setRemoveGroup(item.ID); }}><span>{TrashCan}</span></button>
                            </> }
                        > <p></p>
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
                
            </div>
            <div className="card-footer">
                    <button className={"btn btn-primary" + (hasPermissions() ? ' disabled' : '')} data-tooltip='AddGroup'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (!hasPermissions()) setShowAdd(true); }}>Add Asset Groups</button>
                </div>
                <ToolTip Show={hover == 'Update' && hasPermissions()} Position={'top'} Theme={'dark'} Target={"AddGroup"}>
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
                    Columns={[
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Assets', field: 'Assets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', field: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    Title={"Add Asset Groups to Asset Group"}
                    GetEnum={getEnum}
                    GetAddlFields={() => () => { }} />
                <Warning Show={removeGroup > -1} Title={'Remove Asset Group from Asset Group'} Message={'This will remove the Asset Group from this Asset Group.'} CallBack={(c) => { if (c) removeItem(removeGroup); setRemoveGroup(-1); }} />
            </div>
            </>
    );
}


export default AssetGroupAssetGroupWindow;