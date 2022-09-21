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
import Table from '@gpa-gemstone/react-table';
import { AssetGroupSlice } from '../Store/Store';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { Search, Warning } from '@gpa-gemstone/react-interactive';
import { TrashCan } from '@gpa-gemstone/gpa-symbols';
import { useAppDispatch, useAppSelector } from '../hooks';

declare var homePath: string;


function AssetGroupAssetGroupWindow(props: { AssetGroupID: number}) {
    let history = useHistory();
    const [groupList, setGroupList] = React.useState<Array<OpenXDA.Types.AssetGroup>>([]);
    const [sortField, setSortField] = React.useState<string>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(0);
    const [removeGroup, setRemoveGroup] = React.useState<number>(-1);

    const noSameFilter: Search.IFilter<OpenXDA.Types.RemoteXDAMeter> =
    {
        FieldName: 'ID',
        SearchText: props.AssetGroupID.toString(),
        Operator: '<>',
        Type: 'number',
        isPivotColumn: false
    };

    React.useEffect(() => {
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
                    <Table
                        cols={[
                                { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Assets', field: 'Assets', label: 'Num. of Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Meters', field: 'Meters', label: 'Num. of Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Users', field: 'Users', label: 'Num. of Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                    { key: 'AssetGroups', field: 'AssetGroups', label: 'Num. of Asset Groups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                {
                                    key: 'Remove', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (c) => <button className="btn btn-sm" onClick={(e) => setRemoveGroup(c.ID)}><span>{TrashCan}</span></button>
                                },
                                { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={groupList}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
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
                        onClick={(data) => { history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + data.row.ID})}}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                        />
                </div>
                
            </div>
            <div className="card-footer">
                    <button className="btn btn-primary" onClick={() => setShowAdd(true)}>Add Asset Group</button>
                </div>
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
                        { key: 'Users', field: 'Users', label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', field: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    Title={"Add Asset Groups to Asset Group"}
                    GetEnum={getEnum}
                    GetAddlFields={() => () => { }} />
                <Warning Show={removeGroup > -1} Title={'Remove Asset Group from Group'} Message={'This will remove the Asset Group from this AssetGroup'} CallBack={(c) => { if (c) removeItem(removeGroup); setRemoveGroup(-1); }} />
            </div>
            </>
    );
}


export default AssetGroupAssetGroupWindow;