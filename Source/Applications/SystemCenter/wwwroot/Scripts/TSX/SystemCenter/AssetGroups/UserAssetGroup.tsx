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
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import Table from '@gpa-gemstone/react-table';

declare var homePath: string;
interface User { ID: number, UserAccountID: string, AssetGroupID: number, Dashboard: boolean, Email: boolean, Username: string, GroupName: string}

function UserAssetGroupWindow(props: { AssetGroupID: number}) {
    let history = useNavigate();
    const [userList, setUserList] = React.useState<Array<User>>([]);
    const [sortField, setSortField] = React.useState<string>('Username');
    const [ascending, setAscending] = React.useState<boolean>(true);

    React.useEffect(() => {
        return getData();
    }, [props.AssetGroupID])

    function getData() {
        if (props.AssetGroupID == null)
            return () => { };

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/Users`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((data: Array<User>) => setUserList(data));
      
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>User Accounts in Asset Group:</h4>
                    </div>
                   
                </div>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <Table
                        cols={[
                            { key: 'Username', field: 'Username', label: 'User Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={userList}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey == sortField) {
                                let ordered = _.orderBy(userList, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setUserList(ordered);
                            }
                            else {
                                let ordered = _.orderBy(userList, [d.colKey], ["asc"]);
                                setAscending(!ascending);
                                setUserList(ordered);
                                setSortField(d.colKey);
                            }
                        }}
                        onClick={(data) => {}}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />
                </div>
            </div>
            <div className="card-footer">
               
            </div>

        </div>
    );
}


export default UserAssetGroupWindow;