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
import { ReactTable } from '@gpa-gemstone/react-table';
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
         <div className="container-fluid d-flex h-100 flex-column">
            <LoadingScreen Show={pageStatus === 'loading'} />
            <SearchBar<IUserAccount> CollumnList={filterableList} SetFilter={(flds) => dispatch(UserAccountSlice.DBSearch({ sortField, ascending, filter: flds }))}
                Direction={'left'} defaultCollumn={{ label: 'Username', key: 'DisplayName', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' User Account(s)'}
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
                            <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); setShowModal(true) }}>Add User</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

             <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                 <ReactTable.Table<IUserAccount>
                     TableClass="table table-hover"
                     Data={data}
                     SortKey={sortField}
                     Ascending={ascending}
                     OnSort={(d) => {
                         dispatch(UserAccountSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                     }}
                     OnClick={(d) => history.push({ pathname: homePath + 'index.cshtml', search: '?name=User&UserAccountID=' + d.row.ID })}
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
                     <ReactTable.Column<IUserAccount>
                         Key={'DisplayName'}
                         AllowSort={true}
                         Field={'DisplayName'}
                         HeaderStyle={{ width: 'auto' }}
                         RowStyle={{ width: 'auto' }}
                     > Username
                     </ReactTable.Column>
                     <ReactTable.Column<IUserAccount>
                         Key={'FirstName'}
                         AllowSort={true}
                         Field={'FirstName'}
                         HeaderStyle={{ width: 'auto' }}
                         RowStyle={{ width: 'auto' }}
                     > First Name
                     </ReactTable.Column>
                     <ReactTable.Column<IUserAccount>
                         Key={'LastName'}
                         AllowSort={true}
                         Field={'LastName'}
                         HeaderStyle={{ width: 'auto' }}
                         RowStyle={{ width: 'auto' }}
                     > Last Name
                     </ReactTable.Column>
                     <ReactTable.Column<IUserAccount>
                         Key={'Phone'}
                         AllowSort={true}
                         Field={'Phone'}
                         HeaderStyle={{ width: 'auto' }}
                         RowStyle={{ width: 'auto' }}
                     > Phone
                     </ReactTable.Column>
                     <ReactTable.Column<IUserAccount>
                         Key={'Email'}
                         AllowSort={true}
                         Field={'Email'}
                         HeaderStyle={{ width: 'auto' }}
                         RowStyle={{ width: 'auto' }}
                     > Email
                     </ReactTable.Column>
                     <ReactTable.Column<IUserAccount>
                         Key={'Type'}
                         AllowSort={true}
                         Field={'Type'}
                         HeaderStyle={{ width: 'auto' }}
                         RowStyle={{ width: 'auto' }}
                     > Type
                     </ReactTable.Column>
                 </ReactTable.Table>
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
