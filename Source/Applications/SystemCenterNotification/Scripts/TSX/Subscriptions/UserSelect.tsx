//******************************************************************************************************
//  UserSelect.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { UserAccountSlice } from '../Store';
import { ReactTable } from '@gpa-gemstone/react-table';
import { DefaultSearch } from '@gpa-gemstone/common-pages';
import { Application } from '@gpa-gemstone/application-typings'

declare var homePath;
declare var version;

interface IProps {
    SetUserAccountID: (id: string) => void,
    UserAccountID: string
}

const UserSelect = (props: IProps) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(UserAccountSlice.SearchResults);
    const sortField = useAppSelector(UserAccountSlice.SortField);
    const ascending = useAppSelector(UserAccountSlice.Ascending);
    
    return (
        <>
            <div className="row">
                <div className="col">
                    <DefaultSearch.User Slice={UserAccountSlice} GetAddlFields={() => () => { }} GetEnum={() => () => { }}>
                    </DefaultSearch.User>
                </div>
            </div>
            <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="col-12" style={{ height: '100%', overflow: 'hidden' }}>
                        <ReactTable.Table<Application.Types.iUserAccount>
                            TableClass="table table-hover"
                            Data={data}
                            SortKey={sortField}
                            Ascending={ascending}
                            OnSort={(d) => {
                                if (d.colKey == null) return;
                                dispatch(UserAccountSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                            }}
                            OnClick={(d) => props.SetUserAccountID(d.row.ID)}
                            TableStyle={{
                                padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                            }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                            RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => props.UserAccountID == item.ID}
                            KeySelector={(item) => item.ID}
                        >
                            <ReactTable.Column<Application.Types.iUserAccount>
                                Key={'Name'}
                                AllowSort={true}
                                Field={'Name'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Account
                            </ReactTable.Column>
                            <ReactTable.Column<Application.Types.iUserAccount>
                                Key={'FirstName'}
                                AllowSort={true}
                                Field={'FirstName'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > First Name
                            </ReactTable.Column>
                            <ReactTable.Column<Application.Types.iUserAccount>
                                Key={'LastName'}
                                AllowSort={true}
                                Field={'LastName'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Last Name
                            </ReactTable.Column>
                            <ReactTable.Column<Application.Types.iUserAccount>
                                Key={'Email'}
                                AllowSort={true}
                                Field={'Email'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Email
                            </ReactTable.Column>
                        </ReactTable.Table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserSelect;