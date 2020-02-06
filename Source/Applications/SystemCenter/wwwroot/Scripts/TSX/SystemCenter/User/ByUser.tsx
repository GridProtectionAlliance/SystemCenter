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
import FormTextArea from '../CommonComponents/FormTextArea';
import { SystemCenter } from '../global';
import FormDatePicker from '../CommonComponents/FormDatePicker';
import FormCheckBox from '../CommonComponents/FormCheckBox';
import { getSIDFromUserName, getIsUser, getFilledUser} from './../../../TS/Services/User';
declare var homePath: string;

type UserValidation = 'Resolving' | 'Valid' | 'Invalid' | 'Unknown';
type FieldName = 'UserAccount.Name' | 'UserAccount.FirstName' | 'UserAccount.LastName' | 'UserAccount.Email' | 'UserAccount.Phone' | 'ApplicationRole.Name';
interface Search {
    Field: FieldName,
    SearchText: string
}   


function ByUser(props: { Roles: Array<SystemCenter.Role> })  {
    let history = useHistory();
    const [search, setSearch] = React.useState<Array<Search>>([{ Field: 'UserAccount.Name', SearchText: '' }]);
    const [data, setData] = React.useState<Array<SystemCenter.UserAccount>>([]);
    const [sortField, setSortField] = React.useState<string>('UserAccountKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [newUserAccount, setNewUserAccount] = React.useState<SystemCenter.UserAccount>(null);
    const [allUserAccounts, setAllUserAccounts] = React.useState<Array<string>>([]);
    const [userValidation, setUserValidation] = React.useState<UserValidation>('Invalid');

    React.useEffect(() => {
        return getData();
    }, []);

    function getData() {
        getNewUserAccount().done(ua => setNewUserAccount(ua));
        let handle1 = getUserAccounts();
        handle1.done((data: Array<SystemCenter.UserAccount>) => setData(data));
        return function cleanup() {
            if (handle1.abort != null)
                handle1.abort();
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
            url: `${homePath}api/SystemCenter/UserAccount/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }

    async function validateUser(accountName: string) {
        if (accountName == null || accountName.length == 0) {
            setUserValidation('Invalid');
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
        }
        else
            setUserValidation('Invalid')

    }

    function addNewUserAccount() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/UserAccount/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newUserAccount),
            cache: false,
            async: true
        }).done((data) => getData());

    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=User&UserAccountID=' + item.row.ID, state: {} })
    }

    function valid(field: keyof(SystemCenter.UserAccount)): boolean {
        if (field == 'Name')
            return newUserAccount.Name != null && newUserAccount.Name.length > 0 && newUserAccount.Name.length <= 200;
        else if (field == 'Password')
            return newUserAccount.Password == null || newUserAccount.Password.length <= 200;
        else if (field == 'FirstName')
            return newUserAccount.FirstName == null || newUserAccount.FirstName.length <= 200;
        else if (field == 'LastName')
            return newUserAccount.LastName == null || newUserAccount.LastName.length <= 200;
        else if (field == 'Phone')
            return newUserAccount.Phone == null || newUserAccount.Phone.length <= 200;
        else if (field == 'Email')
            return newUserAccount.Email == null || newUserAccount.Email.length <= 200;
        return false;
    }

    if (props.Roles.indexOf('Administrator') < 0) return null;
    return (
        <div style={{ width: '100%', height: '100%' }}>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ width: '100%' }}>
                    <ul className="navbar-nav mr-auto" style={{ width: '100%' }}>
                        <li className="nav-item" style={{ width: '50%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Search:</legend>
                                <form>
                                    {
                                        search.map((s, index, a) => {

                                            return (
                                                <div className="input-group" key={index} style={{ border: '1px solid lightgray' }}>
                                                    <div className="input-group-prepend">
                                                        <select className='form-control' style={{ height: '100%' }} value={s.Field} onChange={(evt) => {
                                                            s.Field = evt.target.value as FieldName;
                                                            let array = _.clone(a, true);
                                                            setSearch(array);
                                                        }}>
                                                            <option value='UserAccount.Name'>Name</option>
                                                            <option value='UserAccount.FirstName'>First Name</option>
                                                            <option value='UserAccount.LastName'>Last Name</option>
                                                            <option value='UserAccount.Phone'>Phone</option>
                                                            <option value='UserAccount.Email'>Email</option>
                                                            <option value='ApplicationRole.Name'>Role</option>
                                                        </select>
                                                    </div>
                                                    <input className='form-control' type='text' placeholder='Search...' value={s.SearchText} onChange={(evt) => {
                                                        s.SearchText = evt.target.value;
                                                        let array = _.clone(a, true);
                                                        setSearch(array);
                                                    }} />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-danger" type="button" onClick={(evt) => {
                                                            let array = _.clone(a, true);
                                                            array.splice(index, 1);
                                                            setSearch(array);
                                                        }}><span><i className="fa fa-times"></i></span></button>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </form>
                            </fieldset>
                        </li>
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Search Params:</legend>
                                <form>
                                    <div className="form-group">
                                        <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                            event.preventDefault();
                                            let array = _.clone(search, true);
                                            array.push({ Field: 'UserAccountKey', SearchText: '' });
                                            setSearch(array);
                                        }}>Add Parameter</button>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                            event.preventDefault();
                                            getUserAccounts().done((data: Array<SystemCenter.UserAccount>) => setData(data));
                                        }}>Update Search</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <button className="btn btn-primary" data-toggle='modal' data-target="#userAccountModal" hidden={props.Roles.indexOf('Administrator') < 0} onClick={(event) => { event.preventDefault()}}>Add User</button>
                                </form>
                            </fieldset>
                        </li>

                    </ul>
                </div>
            </nav>


            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<SystemCenter.UserAccount>
                    cols={[
                        { key: 'AccountName', label: 'Name', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                        { key: 'FirstName', label: 'First Name', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                        { key: 'LastName', label: 'Last Name', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                        { key: 'Phone', label: 'Phone', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                        { key: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortField={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.col == sortField) {
                            var ordered = _.orderBy(data, [d.col], [(!ascending ? "asc" : "desc")]);
                            setData(ordered);
                        }
                        else {
                            var ordered = _.orderBy(data, [d.col], ["asc"]);
                            setData(ordered);
                            setSortField(d.col);
                        }
                        setAscending(!ascending);

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
                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={valid} Setter={(record) => {
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
                                                                var record: SystemCenter.UserAccount = _.clone(newUserAccount, true);
                                                                record.UseADAuthentication = e.target.checked;
                                                                setNewUserAccount(record);
                                                            }} />Active Directory User</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-4">
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label"><input className='form-check-input' type='radio' checked={!newUserAccount.UseADAuthentication} onChange={(e) => {
                                                                var record: SystemCenter.UserAccount = _.clone(newUserAccount, true);
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
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'FirstName'} Label='First Name' Feedback={'First Name must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'LastName'} Label='Last Name' Feedback={'Last Name must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
                                                    </div>
                                                    <div className="col">
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Phone'} Feedback={'Password must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Email'} Feedback={'Password must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body" hidden={newUserAccount.UseADAuthentication}>
                                                <div className="row">
                                                    <div className="col">
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Password'} Feedback={'Password must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'FirstName'} Label='First Name' Feedback={'First Name must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'LastName'} Label='Last Name' Feedback={'Last Name must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
                                                    </div>
                                                    <div className="col">
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Phone'} Feedback={'Password must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
                                                        <FormInput<SystemCenter.UserAccount> Record={newUserAccount} Field={'Email'} Feedback={'Password must be less than 200 characters.'} Valid={valid} Setter={setNewUserAccount} />
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
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                : null}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewUserAccount}>Save</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>


        </div>
    )
   
}

export default ByUser;
