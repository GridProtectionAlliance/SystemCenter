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
import { OpenXDA } from '../global';
import { useHistory } from 'react-router-dom';
import Table from '../CommonComponents/Table';
import AddToGroupPopup from './AddToGroup';

declare var homePath: string;


function AssetGroupAssetGroupWindow(props: { AssetGroupID: number}) {
    let history = useHistory();
    const [groupList, setGroupList] = React.useState<Array<OpenXDA.AssetGroup>>([]);
    const [sortField, setSortField] = React.useState<string>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);

    React.useEffect(() => {
        return getData();
    }, [props.AssetGroupID])

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

        handle.done((data: Array<OpenXDA.AssetGroup>) => setGroupList(data));
      
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

        handle.done((d) => { history.go(0); })
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
                            { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Assets', label: 'Num. of Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Meters', label: 'Num. of Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Users', label: 'Num. of Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'AssetGroups', label: 'Num. of Asset Groups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={groupList}
                        sortField={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.col == sortField) {
                                let ordered = _.orderBy(groupList, [d.col], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setGroupList(ordered);
                            }
                            else {
                                let ordered = _.orderBy(groupList, [d.col], ["asc"]);
                                setAscending(!ascending);
                                setGroupList(ordered);
                                setSortField(d.col);
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
                <AddToGroupPopup type='Group' onComplete={AddGroups} Show={showAdd} Close={() => setShowAdd(false)} />
            </div>
            </>
    );
}


export default AssetGroupAssetGroupWindow;