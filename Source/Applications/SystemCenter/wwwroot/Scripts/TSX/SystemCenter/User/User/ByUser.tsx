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
import Table from '@gpa-gemstone/react-table';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { SearchBar, Search, Modal, ServerErrorIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import UserForm from './UserForm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useHistory } from "react-router-dom";
import { ValueListSlice, ValueListGroupSlice, UserAdditionalFieldSlice, UserAccountSlice } from '../../Store/Store';
import { IUserAccount } from '../Types';
import moment from 'moment';

const defaultSearchcols: Search.IField<Application.Types.iUserAccount>[] = [
    { label: 'Username', key: 'Name', type: 'string', isPivotField: false },
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
    let history = useHistory();
    const dispatch = useAppDispatch();

    const search = useAppSelector(UserAccountSlice.SearchFilters);

    const data = useAppSelector(UserAccountSlice.SearchResults);
    const userStatus: Application.Types.Status = useAppSelector(UserAccountSlice.Status);
    const searchStatus: Application.Types.Status = useAppSelector(UserAccountSlice.SearchStatus);

    const sortField = useAppSelector(UserAccountSlice.SortField)
    const ascending = useAppSelector(UserAccountSlice.Ascending)

    const adlFields: Application.Types.iAdditionalUserField[] = useAppSelector(UserAdditionalFieldSlice.Fields)
    const adlFieldStatus: Application.Types.Status = useAppSelector(UserAdditionalFieldSlice.FieldStatus)

    const [filterableList, setFilterableList] = React.useState<Search.IField<IUserAccount>[]>(defaultSearchcols);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [userError, setUserError] = React.useState<string[]>([]);

    const valueListItems: SystemCenter.Types.ValueListItem[] = useAppSelector(ValueListSlice.Data);
    const valueListItemStatus: Application.Types.Status = useAppSelector(ValueListSlice.Status);

    const valueListGroups: SystemCenter.Types.ValueListGroup[] = useAppSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus: Application.Types.Status = useAppSelector(ValueListGroupSlice.Status);

    const [act, setAct] = React.useState<IUserAccount>(newAcct)

    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('unintiated');

    React.useEffect(() => {
        if (userStatus === 'error' || adlFieldStatus === 'error' || valueListItemStatus === 'error' || valueListGroupStatus === 'error')
            setPageStatus('error')
        else if (userStatus === 'loading' || adlFieldStatus === 'loading' || valueListItemStatus === 'loading' || valueListGroupStatus === 'loading')
            setPageStatus('loading')
        else
            setPageStatus('idle');
    }, [userStatus, adlFieldStatus, valueListItemStatus, valueListGroupStatus])

    React.useEffect(() => {
        if (searchStatus === 'unintiated' || searchStatus === 'changed')
            dispatch(UserAccountSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [searchStatus]);

    React.useEffect(() => {
        if (adlFieldStatus === 'unintiated' || adlFieldStatus === 'changed')
            dispatch(UserAdditionalFieldSlice.FetchField());
    }, [adlFieldStatus]);

     React.useEffect(() => {
        if (valueListItemStatus === 'unintiated' || valueListItemStatus === 'changed')
            dispatch(ValueListSlice.Fetch());
    }, [valueListItemStatus]);

    React.useEffect(() => {
        if (valueListGroupStatus === 'unintiated' || valueListGroupStatus === 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);


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
        <div style={{ width: '100%', height: '100%' }}>
            <LoadingScreen Show={pageStatus === 'loading'} />
            <SearchBar<IUserAccount> CollumnList={filterableList} SetFilter={(flds) => dispatch(UserAccountSlice.DBSearch({ sortField, ascending, filter: flds }))}
                Direction={'left'} defaultCollumn={{ label: 'Last Name', key: 'LastName', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' User Account(s)'}
                GetEnum={(setOptions, field) => {

                    if (field.type !== 'enum' || field.enum === undefined || field.enum.length !== 1)
                        return () => { };

                    const grpName = (field.enum !== undefined ? field.enum[0].Value.toLowerCase() : '')
                    const grpIndex = valueListGroups.findIndex(g => g.Name.toLowerCase() === grpName)
                    if (grpIndex < 0)
                        return () => { }

                    setOptions(valueListItems.filter(v => v.GroupID === valueListGroups[grpIndex].ID).map(item => ({ Value: item.ID.toString(), Label: item.Value })));
                    return () => { }
                }}

            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); setShowModal(true) }}>Add User</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<IUserAccount>
                    cols={[
                        { key: 'DisplayName', field: 'DisplayName', label: 'Username', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'FirstName', field: 'FirstName', label: 'First Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'LastName', field: 'LastName', label: 'Last Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Phone', field: 'Phone', label: 'Phone', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                         { key: 'Type', field: 'Type', label: 'Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === 'scroll' || d.colField === undefined) return;
                        dispatch(UserAccountSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    onClick={(d) => history.push({pathname: homePath + 'index.cshtml', search: '?name=User&UserAccountID=' + d.row.ID })}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={() => false}
                />
            </div>
            <Modal Show={showModal} Size={'lg'} ShowCancel={false} ShowX={true} ConfirmText={'Save'}
                Title={'Add New User'} CallBack={(confirm) => {
                    if (confirm)
                        dispatch(UserAccountSlice.DBAction({ verb: 'POST', record: { ...act, Name: act.DisplayName } }))
                    setAct(newAcct);
                    setShowModal(false);
                }}
                ConfirmShowToolTip={userError.length > 0}
                ConfirmToolTipContent={<>
                    {userError.map((t, i) => <p key={i}>{CrossMark} {t}</p>)}
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
