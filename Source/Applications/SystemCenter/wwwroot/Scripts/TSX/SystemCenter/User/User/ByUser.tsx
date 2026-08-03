// ******************************************************************************************************
//  ByUser.tsx - Gbtc
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
//  07/14/2021 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { SearchBar, Search, Modal, ServerErrorIcon, LoadingScreen, GenericController } from '@gpa-gemstone/react-interactive';
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import UserForm from './UserForm';
import { useNavigate } from "react-router-dom";
import { IUserAccount } from '../Types';
import moment from 'moment';

const defaultSearchcols: Search.IField<Application.Types.iUserAccount>[] = [
    { label: 'Username', key: 'DisplayName', type: 'string', isPivotField: false },
    { label: 'First Name', key: 'FirstName', type: 'string', isPivotField: false },
    { label: 'Last Name', key: 'LastName', type: 'string', isPivotField: false },
    { label: 'Phone', key: 'Phone', type: 'string', isPivotField: false },
    { label: 'Email', key: 'Email', type: 'string', isPivotField: false },
];

const newAcct: IUserAccount = {
    UseADAuthentication: false,
    AccountName: '',
    FirstName: '',
    LastName: '',
    LockedOut: false,
    Approved: true,
    ID: '00000000-0000-0000-0000-000000000000',
    EmailConfirmed: false,
    ChangePasswordOn: moment().add(1, 'year').format('YYYY-MM-DD'),
    Email: '',
    Name: '',
    Password: '',
    Phone: '',
    PhoneConfirmed: false,
    DefaultNodeID: '00000000-0000-0000-0000-000000000000',
    Type: 'Database',
    DisplayName: ''
}

const ByUser: Application.Types.iByComponent = (props) => {
    let navigate = useNavigate();

    const [search, setSearch] = React.useState<Search.IFilter<IUserAccount>[]>([])

    const [data, setData] = React.useState<IUserAccount[]>([]);
    const [searchStatus, setSearchStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [sortField, setSortField] = React.useState<keyof IUserAccount>('DisplayName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);

    const [adlFields, setAdlFields] = React.useState<Application.Types.iAdditionalUserField[]>([])
    const [adlFieldStatus, setAdlFieldStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [filterableList, setFilterableList] = React.useState<Search.IField<IUserAccount>[]>(defaultSearchcols);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [userError, setUserError] = React.useState<string[]>([]);

    const [valueListItems, setValueListItems] = React.useState<SystemCenter.Types.ValueListItem[]>([]);
    const [valueListItemStatus, setValueListItemStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [valueListGroups, setValueListGroups] = React.useState<SystemCenter.Types.ValueListGroup[]>([]);
    const [valueListGroupStatus, setValueListGroupStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [act, setAct] = React.useState<IUserAccount>(newAcct)

    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('uninitiated');

    const userAccountController = React.useMemo(() => new GenericController<IUserAccount>(`${homePath}api/SystemCenter/UserAccount`, "DisplayName", true), [])

    React.useEffect(() => {
        if (adlFieldStatus === 'error' || valueListItemStatus === 'error' || valueListGroupStatus === 'error')
            setPageStatus('error')
        else if (adlFieldStatus === 'loading' || valueListItemStatus === 'loading' || valueListGroupStatus === 'loading')
            setPageStatus('loading')
        else
            setPageStatus('idle');
    }, [adlFieldStatus, valueListItemStatus, valueListGroupStatus])

    React.useEffect(() => {
        setAdlFieldStatus('loading')
        const handle = new GenericController<Application.Types.iAdditionalUserField>(`${homePath}api/SystemCenter/AdditionalUserField`, "FieldName").Fetch();
        handle.done((d) => {
            setAdlFields(d)
            setAdlFieldStatus('idle')
        }).fail(() => {
            setAdlFieldStatus('error')
        })
        return () => {
            if (handle != null && handle.abort != null)
                handle.abort()
        };
    }, []);

    React.useEffect(() => {
        setValueListItemStatus('loading')
        const handle = new GenericController<SystemCenter.Types.ValueListItem>(`${homePath}api/ValueList`, 'SortOrder').Fetch();
        handle.done((d) => {
            setValueListItems(d)
            setValueListItemStatus('idle')
        }).fail(() => {
            setValueListItemStatus('error')
        })

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        }
    }, []);

    React.useEffect(() => {
        setValueListGroupStatus('loading')
        const handle = new GenericController<SystemCenter.Types.ValueListGroup>(`${homePath}api/ValueListGroup`, 'Name').Fetch();
        handle.done((d) => {
            setValueListGroups(d)
            setValueListGroupStatus('idle')
        }).fail(() => {
            setValueListGroupStatus('error')
        })

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        }
    }, []);

    React.useEffect(() => {
        setSearchStatus('loading')
        const handle = userAccountController.PagedSearch(search, sortField, ascending, page);
        handle.done((d) => {
            setData(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
            setSearchStatus('idle')
        })
        handle.fail(() => setSearchStatus('error'))
        return () => { if (handle != null && handle.abort != null) handle.abort() }
    }, [page, search, sortField, ascending, userAccountController, refreshTrigger])

    React.useEffect(() => {
        function ConvertType(type: string) {
            if (type === 'string' || type === 'integer' || type === 'number' || type === 'datetime' || type === 'boolean')
                return { type }
            return { type: 'enum', enum: [{ Label: type, Value: type }] }
        }
        const ordered = _.orderBy(defaultSearchcols.concat(adlFields.map(item => (
            { label: `[AF] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<IUserAccount>
        ))), ['label'], ["asc"]);

        setFilterableList(ordered)
    }, [adlFields]);

    if (pageStatus === 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
        </div>;

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <LoadingScreen Show={pageStatus === 'loading'} />
            <SearchBar<IUserAccount> CollumnList={filterableList} SetFilter={setSearch}
                Direction={'left'} defaultCollumn={{ label: 'Username', key: 'DisplayName', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : `Displaying User(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + data.length} out of ${totalRecords}`}
                StorageID="UsersFilter"
                GetEnum={(setOptions, field) => {

                    if (field.type !== 'enum' || field.enum === undefined || field.enum.length !== 1)
                        return () => { };

                    const grpName = (field.enum !== undefined ? field.enum[0].Value.toLowerCase() : '')
                    const grpIndex = valueListGroups.findIndex(g => g.Name.toLowerCase() === grpName)
                    if (grpIndex < 0)
                        return () => { }

                    setOptions(valueListItems.filter(v => v.GroupID === valueListGroups[grpIndex].ID).map(item => ({ Value: item.Value, Label: item.AltValue ?? item.Value })));
                    return () => { }
                }}

            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-info btn-block" onClick={(event) => { event.preventDefault(); setShowModal(true) }}>Add User</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="col h-100">
                    <Table<IUserAccount>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortField)
                                setAscending(a => !a);
                            else {
                                setAscending(true);
                                setSortField(d.colKey as keyof IUserAccount);
                            }
                        }}
                        OnClick={(d) => navigate(`${homePath}index.cshtml?name=User&UserAccountID=${d.row.ID}`)}
                        TableStyle={{
                            padding: 0, width: '100%', height: '100%',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 0
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<IUserAccount>
                            Key={'DisplayName'}
                            AllowSort={true}
                            Field={'DisplayName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Username
                        </Column>
                        <Column<IUserAccount>
                            Key={'FirstName'}
                            AllowSort={true}
                            Field={'FirstName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > First Name
                        </Column>
                        <Column<IUserAccount>
                            Key={'LastName'}
                            AllowSort={true}
                            Field={'LastName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Last Name
                        </Column>
                        <Column<IUserAccount>
                            Key={'Phone'}
                            AllowSort={true}
                            Field={'Phone'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Phone
                        </Column>
                        <Column<IUserAccount>
                            Key={'Email'}
                            AllowSort={true}
                            Field={'Email'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Email
                        </Column>
                        <Column<IUserAccount>
                            Key={'Type'}
                            AllowSort={true}
                            Field={'Type'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Type
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Paging
                        Current={page + 1}
                        SetPage={(p) => setPage(p - 1)}
                        Total={totalPages}
                    />
                </div>
            </div>
            <Modal Show={showModal} Size={'lg'} ShowCancel={false} ShowX={true} ConfirmText={'Save'}
                Title={'Add New User'} CallBack={(confirm) => {
                    if (confirm)
                        userAccountController.DBAction('POST', act).then(() => setRefreshTrigger(val => !val))
                    setAct(newAcct);
                    setShowModal(false);
                }}
                ConfirmShowToolTip={userError.length > 0}
                ConfirmToolTipContent={<>
                    {userError.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                </>}
                DisableConfirm={userError.length > 0}
            >
                <UserForm
                    UserAccount={act} Setter={setAct}
                    Edit={false} SetErrors={setUserError}
                />
            </Modal>
        </div>
    )

}

export default ByUser;
