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
import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';
import UserForm from './UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ValueListSlice, ValueListGroupSlice, UserAdditionalFieldSlice, UserAccountSlice } from '../Store/Store';

const defaultSearchcols: Search.IField<Application.Types.iUserAccount>[] = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'First Name', key: 'FirstName', type: 'string', isPivotField: false },
    { label: 'Last Name', key: 'LastName', type: 'string', isPivotField: false },
    { label: 'Location', key: 'Location', type: 'string', isPivotField: false },
    { label: 'Phone', key: 'Phone', type: 'string', isPivotField: false },
    { label: 'Email', key: 'Email', type: 'string', isPivotField: false },
];


const ByUser: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    const dispatch = useDispatch();

    const search: Search.IFilter<Application.Types.iUserAccount>[] = useSelector(UserAccountSlice.SearchFilters);

    const data: Application.Types.iUserAccount[] = useSelector(UserAccountSlice.SearchResults);
    const userStatus: Application.Types.Status = useSelector(UserAccountSlice.Status);
    const searchStatus: Application.Types.Status = useSelector(UserAccountSlice.SearchStatus);

    const sortField: keyof Application.Types.iUserAccount = useSelector(UserAccountSlice.SortField);
    const ascending: boolean = useSelector(UserAccountSlice.Ascending);

    const currentUserAccount: Application.Types.iUserAccount = useSelector(UserAccountSlice.CurrentUser);

    const adlFields: Application.Types.iAdditionalUserField[] = useSelector(UserAdditionalFieldSlice.Fields)
    const adlFieldStatus: Application.Types.Status = useSelector(UserAdditionalFieldSlice.FieldStatus)

    const [filterableList, setFilterableList] = React.useState<Search.IField<Application.Types.iUserAccount>[]>(defaultSearchcols);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [userError, setUserError] = React.useState<string[]>([]);

    const valueListItems: SystemCenter.Types.ValueListItem[] = useSelector(ValueListSlice.Data);
    const valueListItemStatus: Application.Types.Status = useSelector(ValueListSlice.Status);

    const valueListGroups: SystemCenter.Types.ValueListGroup[] = useSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus: Application.Types.Status = useSelector(ValueListGroupSlice.Status);


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
        if (adlFieldStatus === 'unintiated' || adlFieldStatus === 'changed')
            dispatch(UserAdditionalFieldSlice.FetchField());
    }, [dispatch, adlFieldStatus]);

    React.useEffect(() => {
        dispatch(UserAccountSlice.DBSearch({ sortField, ascending, filter: search }));
        dispatch(UserAccountSlice.SetNewUser());
    }, [dispatch]);

    React.useEffect(() => {
        if (searchStatus == 'unintiated' || searchStatus == 'changed')
            dispatch(UserAccountSlice.DBSearch({ sortField, ascending, filter: search }));
    }, [searchStatus])

    React.useEffect(() => {
        if (userStatus === 'unintiated' || userStatus === 'changed') 
            dispatch(UserAccountSlice.Fetch());        
    }, [userStatus]);

    React.useEffect(() => {
        if (valueListItemStatus === 'unintiated' || valueListItemStatus === 'changed')
            dispatch(ValueListSlice.Fetch());
    }, [dispatch, valueListItemStatus]);

    React.useEffect(() => {
        if (valueListGroupStatus === 'unintiated' || valueListGroupStatus === 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [dispatch, valueListGroupStatus]);


    React.useEffect(() => {
        function ConvertType(type: string) {
            if (type === 'string' || type === 'integer' || type === 'number' || type === 'datetime' || type === 'boolean')
                return { type }
            return { type: 'enum', enum: [{ Label: type, Value: type }] }
        }
        const ordered = _.orderBy(defaultSearchcols.concat(adlFields.map(item => (
            { label: `[AF] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<Application.Types.iUserAccount>
        ))), ['label'], ["asc"]);
        setFilterableList(ordered)
    }, [adlFields]);

    if (pageStatus === 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occured. Please Reload the Application'} />
        </div>;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <LoadingScreen Show={pageStatus === 'loading'} />
            <SearchBar<Application.Types.iUserAccount> CollumnList={filterableList} SetFilter={(flds) => dispatch(UserAccountSlice.DBSearch({ sortField, ascending, filter: flds }))}
                Direction={'left'} defaultCollumn={{ label: 'Last Name', key: 'LastName', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' UserAccounts'}
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
                <Table<Application.Types.iUserAccount>
                    cols={[
                        { key: 'Name', field: 'AccountName', label: 'User Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'FirstName', field: 'FirstName', label: 'First Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'LastName', field: 'LastName', label: 'Last Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Phone', field: 'Phone', label: 'Phone', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colField === undefined)
                            return;
                        if (d.colField !== sortField)
                            dispatch(UserAccountSlice.DBSearch({ sortField, ascending: !ascending, filter: search }))
                        else
                            dispatch(UserAccountSlice.DBSearch({ sortField: d.colField, ascending: true, filter: search }))


                    }}
                    onClick={(d) => history.push({pathname: homePath + 'index.cshtml', search: '?name=User&UserAccountID=' + d.row.ID, state: { } })}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
            <Modal Show={showModal} Size={'lg'} ShowCancel={false} ShowX={true} ConfirmText={'Save'}
                Title={'Add User'} CallBack={(confirm) => {
                    if (confirm)
                        dispatch(UserAccountSlice.DBAction({ verb: 'POST', record: { ...currentUserAccount, Password: CryptoJS.SHA256(currentUserAccount.Password + "0").toString(CryptoJS.enc.Base64) } }))
                    dispatch(UserAccountSlice.SetNewUser());
                    setShowModal(false);
                }}
                ConfirmShowToolTip={userError.length > 0}
                ConfirmToolTipContent={userError.map((t, i) => <p key={i}>{CrossMark} {t}</p>)}
                DisableConfirm={userError.length > 0}
            >
                {currentUserAccount !== undefined ? <UserForm
                    UserAccount={currentUserAccount} Setter={(u) => dispatch(UserAccountSlice.SetCurrentUser(u))}
                    Edit={false} SetErrors={setUserError} 

                /> : null}
            </Modal>
        </div>
    )

}

export default ByUser;
