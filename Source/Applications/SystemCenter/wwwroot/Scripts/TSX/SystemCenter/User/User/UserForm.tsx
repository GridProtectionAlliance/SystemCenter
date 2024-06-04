// ******************************************************************************************************
//  UserForm.tsx - Gbtc
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
import { Input, DatePicker, CheckBox } from '@gpa-gemstone/react-forms'
import * as _ from 'lodash';
import { UserAccountSlice } from '../../Store/Store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IUserAccount } from '../Types';
import * as CryptoJS from 'crypto-js';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import moment from 'moment';

interface IProps {
    UserAccount: IUserAccount,
    Setter: (record: IUserAccount) => void,
    Edit: boolean,
    SetErrors?: (e: string[]) => void
}

function UserForm(props: IProps) {
    const dispatch = useAppDispatch();

    const allUsers = useAppSelector(UserAccountSlice.Data);
    const userStatus = useAppSelector(UserAccountSlice.Status);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [valid, setValid] = React.useState<'valid' | 'resolving' | 'invalid' | 'unknown'>("valid")

    React.useEffect(() => {
        if (userStatus === 'unintiated' || userStatus === 'changed')
            dispatch(UserAccountSlice.Fetch());
    }, [userStatus]);

    React.useEffect(() => {
        if (props.SetErrors !== undefined)
            props.SetErrors(errors);
    }, [errors, props.SetErrors]);

    React.useEffect(() => {
        const h = validate();
        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [props.UserAccount.DisplayName, props.UserAccount.Type])


    React.useEffect(() => {
        if (props.UserAccount == null)
            return
        const e = [];
        if (props.UserAccount.DisplayName == null || props.UserAccount.DisplayName.length === 0)
            e.push('A Username is required.')
        if (props.UserAccount.Type != 'Database' && valid !== 'valid')
            e.push('The User could not be validated by the AD or Azure.')
        if (props.UserAccount.DisplayName !== null && allUsers.findIndex(u => u.DisplayName.toLowerCase() == props.UserAccount.DisplayName.toLowerCase() && u.ID !== props.UserAccount.ID) > -1)
            e.push('Username must be unique.')
        if (props.UserAccount.ChangePasswordOn == null || moment(props.UserAccount.ChangePasswordOn).isBefore(moment()))
            e.push('Account Expiration date must be on or after tomorrow.');
        
        setErrors(e);
    }, [props.UserAccount, valid])

    function validUserAccountField(user: IUserAccount, field: keyof (IUserAccount)): boolean {
        if (props.UserAccount.Type != 'Database')
            return true;
        if (field === 'DisplayName')
            return user.DisplayName != null && user.DisplayName.length > 0 && user.DisplayName.length <= 200 && (allUsers.findIndex(u => u.DisplayName.toLowerCase() == user.DisplayName.toLowerCase() && u.ID !== user.ID) == -1);
        else if (field === 'Password')
            return user.Password == null || user.Password.length <= 200;
        else if (field === 'FirstName')
            return user.FirstName == null || user.FirstName.length <= 200;
        else if (field === 'LastName')
            return user.LastName == null || user.LastName.length <= 200;
        else if (field === 'Phone')
            return user.Phone == null || user.Phone.length <= 200;
        else if (field === 'Email')
            return user.Email == null || user.Email.length <= 200;
        else if (field === 'ChangePasswordOn')
            return props.UserAccount.ChangePasswordOn != null && !moment(user.ChangePasswordOn).isBefore(moment())
        return false;

    }

    function validate() {
        if (props.UserAccount.Type == 'Database' || props.UserAccount.DisplayName == null)
            return;

        setValid('resolving');

        return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/UserAccount/Verify`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(props.UserAccount.DisplayName),
            cache: false,
            async: true
        }).done((d: IUserAccount|null) => {
            
            if (d != null) {
                setValid('valid');
                if (!props.Edit)
                    props.Setter({
                        ...props.UserAccount,
                        FirstName: d.FirstName,
                        LastName: d.LastName,
                        Phone: d.Phone,
                        Email: d.Email
                    })
            }
                
            else
                setValid('invalid');
        }).fail((d) => {
            setValid('unknown')
        });;
    }

    if (props.UserAccount == null) return null;

    return (
        <>
            <form>
                <div className="row">
                    <div className="col">
                        <Input<IUserAccount> Record={props.UserAccount} Disabled={props.Edit} Label={'Username'} Field={'DisplayName'}
                            Feedback={'A Name of less than 200 characters is required.'}
                            Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />

                        <div className="row" style={{ position: 'absolute', top: 0, left: 130 }} hidden={props.UserAccount.Type == 'Database'}>
                            <span id="resolvingAccount" hidden={valid !== 'resolving'}><i style={{ height: 10, width: 10, color: 'grey' }}
                                className="fa fa fa-spin fa-refresh"></i>&nbsp;<em className="small">Resolving account details...</em></span>
                            <span id="accountValid" hidden={valid !== 'valid'}>{HeavyCheckMark} &nbsp;<em className="small">Resolved account name.</em></span>
                            <span id="accountInvalid" hidden={valid !== 'invalid'}>{CrossMark} &nbsp;<em className="small">Cannot resolve account name.</em></span>
                            <span id="accountUnknown" hidden={valid !== 'unknown'}>{CrossMark} &nbsp;<em className="small">Valid account name is not a User, or Active Directory access is limited.</em></span>
                        </div>                     
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-check-inline">
                                            <label className="form-check-label"><input disabled={props.Edit}
                                                className='form-check-input' type='radio'
                                                checked={props.UserAccount.UseADAuthentication} onChange={(e) => {
                                                props.Setter({
                                                    ...props.UserAccount,
                                                    Type: e.target.checked ? 'Azure' : 'Database',
                                                    UseADAuthentication: e.target.checked
                                                })
                                            }} />Active Directory or Azure User</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-check-inline">
                                            <label className="form-check-label"><input disabled={props.Edit}
                                                className='form-check-input' type='radio' checked={!props.UserAccount.UseADAuthentication}
                                                onChange={(e) => {
                                                props.Setter({
                                                    ...props.UserAccount,
                                                    Type: e.target.checked ? 'Database' : 'Azure',
                                                    UseADAuthentication: !e.target.checked
                                                })
                                            }} />Database User</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        {props.UserAccount.Type == 'Database' ?
                                            <PasswordField UserAccount={props.UserAccount} SetUserAccount={props.Setter}
                                                Valid={(u) => validUserAccountField(u, 'Password')} />
                                        : null}
                                        <Input<IUserAccount> Record={props.UserAccount} Field={'FirstName'} Label='First Name'
                                            Feedback={'First Name must be less than 200 characters.'}
                                            Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                        <Input<IUserAccount> Record={props.UserAccount} Field={'LastName'} Label='Last Name'
                                            Feedback={'Last Name must be less than 200 characters.'}
                                            Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    </div>
                                    <div className="col">
                                        <Input<IUserAccount> Record={props.UserAccount} Field={'Phone'}
                                            Feedback={'Phone must be less than 200 characters.'}
                                            Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                        <Input<IUserAccount> Record={props.UserAccount} Field={'Email'}
                                            Feedback={'Email must be less than 200 characters.'}
                                            Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />

                                        {props.UserAccount.Type == 'Database' ?
                                            <DatePicker<IUserAccount> Record={props.UserAccount}
                                                Field={'ChangePasswordOn'} Label='Account Expiration' MinDate={moment().add(1, 'day')}
                                                Feedback={'Account Expiration is required.'}
                                                Setter={props.Setter} Valid={field => validUserAccountField(props.UserAccount, field)} 
                                            />
                                            : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col" style={{ margin: 10 }}>
                                        <CheckBox<IUserAccount> Record={props.UserAccount} Label='Locked Out' Field='LockedOut' Setter={props.Setter} />
                                        <CheckBox<IUserAccount> Record={props.UserAccount} Field='Approved' Setter={props.Setter} />
                                    </div>
                                    <div className="col-lg-6">
                                        <CheckBox<IUserAccount> Record={props.UserAccount} Label='Phone Confirmed' Field='PhoneConfirmed' Setter={props.Setter} />
                                        <CheckBox<IUserAccount> Record={props.UserAccount} Label='Email Confirmed' Field='EmailConfirmed' Setter={props.Setter} />
                                    </div>
                                </div>
                            </div>                            
                        </div>

                    </div>
                </div>
            </form>
        </>
    );
}

interface IPassword { Password: string, Hashed: string }

const PasswordField = (props: {
    UserAccount: IUserAccount,
    SetUserAccount: (user: IUserAccount) => void,
    Valid: (user: IUserAccount) => boolean
}) => {
    const [password, setPassword] = React.useState<IPassword>({ Password: '', Hashed: props.UserAccount.Password })

    React.useEffect(() => {
        if (props.UserAccount.Password != password.Hashed)
            setPassword({ Password: '', Hashed: props.UserAccount.Password })
    }, [props.UserAccount]);

    React.useEffect(() => {
        props.SetUserAccount({ ...props.UserAccount, Password: password.Hashed })
    }, [password.Hashed])

    function Hash(p: string) {
        return CryptoJS.SHA256(p + "0").toString(CryptoJS.enc.Base64)
    }
    return <Input<IPassword> Record={password} Field={'Password'} Feedback={'Password must be less than 200 characters.'}
        Type={'password'} Valid={field => props.Valid({ ...props.UserAccount, Password: password.Password })}
        Setter={(r) => setPassword({ Password: r.Password, Hashed: Hash(r.Password) })} />

}
export default UserForm;
