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
import { LoadingIcon } from '@gpa-gemstone/react-interactive'
import { EmailCategorySlice, EmailTypeSlice, UserAccountSlice } from '../Store';
import Table from '@gpa-gemstone/react-table';
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
                    <div className="row">
                        <div className="col">
                            <DefaultSearch.User Slice={UserAccountSlice} GetAddlFields={() => () => { }} GetEnum={() => () => { }}>
                            </DefaultSearch.User>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                    <Table<Application.Types.iUserAccount>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Account', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'FirstName', field: 'FirstName', label: 'First Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'LastName', field: 'LastName', label: 'Last Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortKey={sortField as string}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey === "Scroll")
                                return;

                            if (d.colKey === sortField)
                                dispatch(UserAccountSlice.Sort({ SortField: sortField, Ascending: ascending }));
                            else {
                                dispatch(UserAccountSlice.Sort({ SortField: d.colField as keyof Application.Types.iUserAccount, Ascending: true }));
                            }
                        }}
                        onClick={(d) => props.SetUserAccountID(d.row.ID)}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => props.UserAccountID == item.ID}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserSelect;