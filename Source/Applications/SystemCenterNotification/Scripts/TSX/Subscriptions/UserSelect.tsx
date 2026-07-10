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
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive'
import { Application } from '@gpa-gemstone/application-typings'

declare var homePath;
declare var version;

interface IProps {
    SetUserAccountID: (id: string) => void,
    UserAccountID: string
}

const defaultSearchcols: Search.IField<Application.Types.iUserAccount>[] = [
    { label: 'First Name', key: 'FirstName', type: 'string', isPivotField: false },
    { label: 'Last Name', key: 'LastName', type: 'string', isPivotField: false },
    { label: 'Email', key: 'Email', type: 'string', isPivotField: false },
];

const UserSelect = (props: IProps) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(UserAccountSlice.SearchResults);
    const searchStatus = useAppSelector(UserAccountSlice.SearchStatus);
    const [sortField, setSortField] = React.useState<keyof Application.Types.iUserAccount>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [page, setPage] = React.useState<number>(0);
    const totalPages = useAppSelector(UserAccountSlice.TotalPages);
    const totalRecords = useAppSelector(UserAccountSlice.TotalRecords);
    const recordsPerPage = useAppSelector(UserAccountSlice.RecordsPerPage);

    React.useEffect(() => {
        const filters = undefined // setting filter to undefined uses the filter set on the slice by default search.
        dispatch(UserAccountSlice.PagedSearch({filter: filters, sortField: sortField, ascending: ascending, page: page}))
    }, [sortField, ascending, page])

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
            <div className="row">
                <div className="col">
                    <SearchBar<Application.Types.iUserAccount> CollumnList={defaultSearchcols}
                        SetFilter={(flds) => dispatch(UserAccountSlice.PagedSearch({ filter: flds }))}
                        Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                        ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : `Displaying User(s) ${totalRecords > 0 ? recordsPerPage * page + 1 : 0}-${recordsPerPage * page + data.length} out of ${totalRecords}`}
                        GetEnum={() => {
                            return () => { }
                        }}>
                    </SearchBar>
                </div>
            </div>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<Application.Types.iUserAccount>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortField)
                                setAscending((val) => !val);
                            else {
                                setSortField(d.colKey as keyof Application.Types.iUserAccount)
                            }
                        }}
                        OnClick={(d) => props.SetUserAccountID(d.row.ID)}
                        TableStyle={{ height: 'calc(100% - 16px)' }}
                        Selected={(item) => props.UserAccountID == item.ID}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<Application.Types.iUserAccount>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Account
                        </Column>
                        <Column<Application.Types.iUserAccount>
                            Key={'FirstName'}
                            AllowSort={true}
                            Field={'FirstName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > First Name
                        </Column>
                        <Column<Application.Types.iUserAccount>
                            Key={'LastName'}
                            AllowSort={true}
                            Field={'LastName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Last Name
                        </Column>
                        <Column<Application.Types.iUserAccount>
                            Key={'Email'}
                            AllowSort={true}
                            Field={'Email'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Email
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Paging
                        Current={page + 1}
                        SetPage={(page) => setPage(page - 1)}
                        Total={totalPages}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserSelect;