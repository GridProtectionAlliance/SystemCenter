//******************************************************************************************************
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
//  02/05/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '../CommonComponents/Table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import FormInput from '../CommonComponents/FormInput';
import { SystemCenter } from '../global';
import FormDatePicker from '../CommonComponents/FormDatePicker';
import FormCheckBox from '../CommonComponents/FormCheckBox';
import { getSIDFromUserName, getIsUser, getFilledUser, getRoles, getTSCs, validUserAccountField} from './../../../TS/Services/User';
import FormSelect from '../CommonComponents/FormSelect';
import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive';
import CryptoJS from 'crypto-js'
import { Input } from '@gpa-gemstone/react-forms';


declare var homePath: string;

type UserValidation = 'Resolving' | 'Valid' | 'Invalid' | 'Unknown';
type FieldName = 'UserAccount.FirstName' | 'UserAccount.LastName' | 'UserAccount.Email' | 'UserAccount.Phone' | 'UserAccount.MobilePhone' |'ApplicationRole.Name' | 'TSC.Name' | 'Role.Name';
interface Search {
    Field: FieldName,
    SearchText: string
}   
interface UserAccount extends SystemCenter.UserAccount {
    Role: string, TSC: string
}


const ByUser: SystemCenter.ByComponent = (props) => {
    let history = useHistory();
    const [search, setSearch] = React.useState<Array<Search.IFilter<UserAccount>>>([]);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const [data, setData] = React.useState<Array<UserAccount>>([]);
    const [sortField, setSortField] = React.useState<string>('FirstName');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [newUserAccount, setNewUserAccount] = React.useState<SystemCenter.UserAccount>(null);
    const [userValidation, setUserValidation] = React.useState<UserValidation>('Invalid');
    const [roles, setRoles] = React.useState<Array<SystemCenter.Role>>([]);
    const [tscs, setTscs] = React.useState<Array<SystemCenter.TSC>>([]);

    React.useEffect(() => {
        return getData();
    }, []);

    React.useEffect(() => {
        setSearchState('Loading');
        let handle = getUserAccounts();
        handle.done((data: Array<UserAccount>) => { setData(data); setSearchState('Idle'); });
        handle.fail(msg => setSearchState('Error'))

        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [search, ascending, sortField]);

    function getData() {
        getNewUserAccount().done(ua => setNewUserAccount(ua));

        let handle2 = getRoles();
        handle2.done(rs => setRoles(rs));

        let handle3 = getTSCs();
        handle3.done(ts => setTscs(ts));

        return function cleanup() {

            if (handle2.abort != null)
                handle2.abort();

            if (handle3.abort != null)
                handle3.abort();

        }
    }

    function getNewUserAccount(): JQuery.jqXHR< SystemCenter.UserAccount> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/UserAccount/New`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }

    function getUserAccounts(): JQuery.jqXHR<Array<SystemCenter.UserAccount>> {
        return $.ajax({
            type: "Post",
            url: `${homePath}api/SystemCenter/UserAccount/SecureSearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: search, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    async function validateUser(accountName: string) {
        if (accountName == null || accountName.length == 0) {
            setUserValidation('Invalid');
            getNewUserAccount().done(ua => {
                ua.Name = accountName
                setNewUserAccount(ua)
            });
            return;
        }

        setUserValidation('Resolving');
        let sid = await getSIDFromUserName(accountName);
        if (accountName !== sid && accountName.countOccurrences("\\") < 2) {
            let result = await getIsUser(sid);
            setUserValidation(result ? 'Valid' : 'Unknown');
            if (result) {
                let ua = newUserAccount;
                ua.Name = sid;
                let user = await getFilledUser(ua);
                user.Name = accountName;
                setNewUserAccount(user);
            }
            else {
                getNewUserAccount().done(ua => {
                    ua.Name = accountName
                    setNewUserAccount(ua)
                });
            }
        }
        else {
            setUserValidation('Invalid')
            getNewUserAccount().done(ua => {
                ua.Name = accountName
                setNewUserAccount(ua)
            });
        }

    }

    function addNewUserAccount() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/UserAccount/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ ...newUserAccount, Password: CryptoJS.SHA256(newUserAccount.Password + "0").toString(CryptoJS.enc.Base64) }),
            cache: false,
            async: true
        }).done((data) => getData());

    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=User&UserAccountID=' + item.row.ID, state: {} })
    }

    if (props.Roles.indexOf('Administrator') < 0) return null;
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<UserAccount> CollumnList={SearchFields.UserAccount as Search.IField<UserAccount>[]} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.UserAccount as Search.IField<UserAccount>} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' UserAccounts'}
                GetEnum={(setOptions, field) => {
                    return () => { }
                }}

            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" data-toggle='modal' data-target="#userAccountModal" hidden={props.Roles.indexOf('Administrator') < 0} onClick={(event) => { event.preventDefault() }}>Add User</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
          
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<UserAccount>
                    cols={[
                        { key: 'Name', label: 'User Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'FirstName', label: 'First Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'LastName', label: 'Last Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Role', label: 'Role', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                        { key: 'TSC', label: 'TSC', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Phone', label: 'Phone', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'MobilePhone', label: 'Mobile', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortField={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.col == sortField)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortField(d.col);
                        }

                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
                <div className="modal" id="userAccountModal">
                    <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add User</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                            {newUserAccount != null ?

                                <div className="row">
                                    <div className="col">
                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={(record) => {
                                            if (newUserAccount.UseADAuthentication)
                                                validateUser(record.Name);

                                            setNewUserAccount(record);
                                        }} />
                                        <div className="row" style={{ position: 'absolute', top: 0, left: 100 }} hidden={!newUserAccount.UseADAuthentication}>
                                            <span id="resolvingAccount" hidden={userValidation != 'Resolving'}><i style={{ height: 10, width: 10, color: 'grey' }} className="fa fa fa-spin fa-refresh"></i>&nbsp;<em className="small">Resolving account details...</em></span>
                                            <span id="accountValid" hidden={userValidation != 'Valid'}><i style={{ height: 20, width: 20, color: 'green' }} className="fa fa-check-circle"></i>&nbsp;<em className="small">Resolved account name</em></span>
                                            <span id="accountInvalid" hidden={userValidation != 'Invalid'}><i style={{ height: 20, width: 20, color: 'red' }} className="fa fa-times-circle"></i>&nbsp;<em className="small">Cannot resolve account name</em></span>
                                            <span id="accountUnknown" hidden={userValidation != 'Unknown'}><i style={{ height: 20, width: 20, color: 'orange' }} className="fa fa-exclamation-circle"></i>&nbsp;<em className="small">Valid account name is not a user or Active Directory access is limited</em></span>
                                        </div>


                                        <div className="card">
                                            <div className="card-header">
                                                <div className="row">
                                                    <div className="col-xs-4">
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label"><input className='form-check-input' type='radio' checked={newUserAccount.UseADAuthentication} onChange={(e) => {
                                                                var record: SystemCenter.UserAccount = _.clone(newUserAccount);
                                                                record.UseADAuthentication = e.target.checked;
                                                                setNewUserAccount(record);
                                                            }} />Active Directory User</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-4">
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label"><input className='form-check-input' type='radio' checked={!newUserAccount.UseADAuthentication} onChange={(e) => {
                                                                var record: SystemCenter.UserAccount = _.clone(newUserAccount);
                                                                record.UseADAuthentication = !e.target.checked;
                                                                setNewUserAccount(record);
                                                            }} />Database User</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body" hidden={!newUserAccount.UseADAuthentication}>
                                                <div className="row">
                                                    <div className="col">
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'FirstName'} Label='First Name' Feedback={'First Name must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'LastName'} Label='Last Name' Feedback={'Last Name must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Title'} Feedback={'Title must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormSelect<SystemCenter.UserAccount> Record={newUserAccount} Field={'RoleID'} Label='Role' Options={roles.map(rs => { return { Value: rs.ID.toString(), Label: rs.Name } })} Setter={setNewUserAccount} EmptyOption={true}/>
                                                    </div>
                                                    <div className="col">
                                                        <FormSelect<SystemCenter.UserAccount> Record={newUserAccount} Field={'TSCID'} Label='TSC' Options={tscs.map(rs => { return { Value: rs.ID.toString(), Label: rs.Name } })} Setter={setNewUserAccount} EmptyOption={true}/>
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Phone'} Feedback={'Phone must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'MobilePhone'} Label='Mobile Phone' Feedback={'Mobile Phone must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Email'} Feedback={'Email must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body" hidden={newUserAccount.UseADAuthentication}>
                                                <div className="row">
                                                    <div className="col">
                                                        <Input<SystemCenter.UserAccount> Record={newUserAccount} Field={'Password'} Feedback={'Password must be less than 200 characters.'} Type={'password'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'FirstName'} Label='First Name' Feedback={'First Name must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'LastName'} Label='Last Name' Feedback={'Last Name must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Title'} Feedback={'Title must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormSelect<SystemCenter.UserAccount> Record={newUserAccount} Field={'RoleID'} Label='Role' Options={roles.map(rs => { return { Value: rs.ID.toString(), Label: rs.Name } })} Setter={setNewUserAccount} EmptyOption={true} />
                                                    </div>
                                                    <div className="col">
                                                        <FormSelect<SystemCenter.UserAccount> Record={newUserAccount} Field={'TSCID'} Label='TSC' Options={tscs.map(rs => { return { Value: rs.ID.toString(), Label: rs.Name } })} Setter={setNewUserAccount} EmptyOption={true} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Phone'} Feedback={'Password must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'MobilePhone'} Label='Mobile Phone' Feedback={'Mobile Phone must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Email'} Feedback={'Password must be less than 200 characters.'} Valid={field => validUserAccountField(newUserAccount, field)} Setter={setNewUserAccount} />
                                                        <FormDatePicker<SystemCenter.UserAccount> Record={newUserAccount} Field={'ChangePasswordOn'} Label='Change Password On' Setter={setNewUserAccount} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="col-lg-2">
                                                    <FormCheckBox<SystemCenter.UserAccount> Record={newUserAccount} Label='Locked Out' Field='LockedOut' Setter={setNewUserAccount} />
                                                    <FormCheckBox<SystemCenter.UserAccount> Record={newUserAccount} Label='Phone Confirmed' Field='PhoneConfirmed' Setter={setNewUserAccount} />
                                                    <FormCheckBox<SystemCenter.UserAccount> Record={newUserAccount} Label='Email Confirmed' Field='EmailConfirmed' Setter={setNewUserAccount} />
                                                    <FormCheckBox<SystemCenter.UserAccount> Record={newUserAccount} Field='Approved' Setter={setNewUserAccount} />
                                                    <FormCheckBox<SystemCenter.UserAccount> Record={newUserAccount} Field='ReceiveNotifications' Label='Receive Notifications' Setter={setNewUserAccount} />

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                : null}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewUserAccount}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => getNewUserAccount().done(nua => setNewUserAccount(nua))}>Close</button>
                            </div>

                        </div>
                    </div>
                </div>


        </div>
    )
   
}

export default ByUser;
