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
import AddToGroup from './AddToGroup';
import { AssetGroupSlice } from '../Store/Store';
import { Modal } from '@gpa-gemstone/react-interactive';

declare var homePath: string;


function AssetGroupAssetGroupWindow(props: { AssetGroupID: number}) {
    let history = useHistory();
    const [groupList, setGroupList] = React.useState<Array<OpenXDA.Types.AssetGroup>>([]);
    const [sortField, setSortField] = React.useState<string>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() => {
        return getData();
    }, [props.AssetGroupID, counter])

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

    function AddGroups(toAdd) {
        let handle = $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/AddAssetGroups`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(toAdd),
            cache: false,
            async: true
        });

        handle.done((d) => { setCounter((x) => x + 1) })
        return handle
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
                        onClick={(data) => { history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + data.row.ID, state: {} })}}
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
                <Modal Show={showAdd} Size={'xlg'} ShowX={true} ShowCancel={false} ConfirmBtnClass={'btn-danger'} ConfirmText={'Close'} Title={''} CallBack={() => setShowAdd(false)}>
                    <AddToGroup<OpenXDA.Types.AssetGroup> Type='Asset Group' Slice={AssetGroupSlice} Data={groupList} SetData={(d) => setGroupList(d)} InitialSortKey={'Name' as keyof OpenXDA.Types.AssetGroup} StandardSearch={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                    DefaultFilterList={[
                        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                        { label: 'Number of Meter', key: 'Meters', type: 'integer', isPivotField: false },
                        { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer', isPivotField: false },
                        { label: 'Number of Users', key: 'Users', type: 'integer', isPivotField: false },
                        { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean', isPivotField: false },
                    ]}
                    TableColumns={[
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Assets', field: 'Assets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Users', field: 'Users', label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', field: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]} />
                </Modal>
            </div>
            </>
    );
}


export default AssetGroupAssetGroupWindow;