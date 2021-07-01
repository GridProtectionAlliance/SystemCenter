//******************************************************************************************************
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
//  10/20/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '../global';
import { Input, CheckBox, DatePicker } from '@gpa-gemstone/react-forms';
import { getFilledUser, getSIDFromUserName, validUserAccountField } from '../../../TS/Services/User';
import _ from 'lodash';
import { LoadingScreen, Modal } from '@gpa-gemstone/react-interactive';

type UserValidation = 'Resolving' | 'Valid' | 'Invalid' | 'Unknown';

interface IProps { UserAccount: SystemCenter.UserAccount, Setter: (record: SystemCenter.UserAccount) => void, Edit: boolean }

export default function UserForm(props: IProps) {
    const [userValidation, setUserValidation] = React.useState<UserValidation>('Invalid');
    const [fillState, setFillState] = React.useState<'loading' | 'error' | 'idle'>('idle');
    const [updatedAD, setUpdatedAD] = React.useState<boolean>(false);

    React.useEffect(() => {
        validateUser(props.UserAccount?.Name);
    }, [props.UserAccount]);

    React.useEffect(() => {
        if (userValidation == 'Valid' && !props.Edit && updatedAD == false)
            updateADInformation();
    }, [userValidation, updatedAD])

    async function validateUser(accountName: string) {
        if (accountName == null || accountName.length == 0) {
            setUserValidation('Invalid');
            return;
        }

        setUserValidation('Resolving');
        let sid = await getSIDFromUserName(accountName);
        if (accountName !== sid && accountName.countOccurrences("\\") < 2) {
            setUserValidation('Valid');
        }
        else {
            setUserValidation('Invalid')
        }

    }

    function updateADInformation() {
        if (userValidation != 'Valid' || !props.UserAccount.UseADAuthentication)
            return;
        setFillState('loading')
        let handle = getFilledUser(props.UserAccount);
        handle.done((d: SystemCenter.UserAccount) => {
            props.Setter(d);
            setFillState('idle');
            setUpdatedAD(true);
        }).fail((d) => { setFillState('error'); setUpdatedAD(true); })
    }

    if (props.UserAccount == null) return null;
    return (
        <>
            <LoadingScreen Show={fillState == 'loading'} />
            <Modal Title={'Unable to connect to AD'} ShowCancel={false} ConfirmText={'Close'} Size={'sm'} CallBack={() => { setFillState('idle') }} Show={fillState == 'error'} >
                <p> The System is unable to get the the account information from the Active Directory.</p>
            </Modal>
        <form>
            <div className="row">
                <div className="col">
                        <Input<SystemCenter.UserAccount> Record={props.UserAccount} Disabled={props.Edit == true} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={(record) => {
                            setUpdatedAD(false);
                        if (props.UserAccount.UseADAuthentication)
                            validateUser(record.Name);

                        props.Setter(record);
                        }} />

                        <div className="row" style={{ position: 'absolute', top: 0, left: 100 }} hidden={!props.UserAccount.UseADAuthentication}>
                            <span id="resolvingAccount" hidden={userValidation != 'Resolving'}><i style={{ height: 10, width: 10, color: 'grey' }} className="fa fa fa-spin fa-refresh"></i>&nbsp;<em className="small">Resolving account details...</em></span>
                            <span id="accountValid" hidden={userValidation != 'Valid'}><i style={{ height: 20, width: 20, color: 'green' }} className="fa fa-check-circle"></i>&nbsp;<em className="small">Resolved account name </em></span>
                            <span id="accountInvalid" hidden={userValidation != 'Invalid'}><i style={{ height: 20, width: 20, color: 'red' }} className="fa fa-times-circle"></i>&nbsp;<em className="small">Cannot resolve account name</em></span>
                            <span id="accountUnknown" hidden={userValidation != 'Unknown'}><i style={{ height: 20, width: 20, color: 'orange' }} className="fa fa-exclamation-circle"></i>&nbsp;<em className="small">Valid account name is not a user or Active Directory access is limited</em></span>
                        </div>

                        <button style={{ marginBottom: 10 }} type="button" className="btn btn-primary btn-sm" onClick={(evt) => { evt.preventDefault(); updateADInformation(); }} hidden={userValidation != 'Valid' || !props.Edit}>Load Information from AD</button>

                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-xs-4">
                                    <div className="form-check-inline">
                                        <label className="form-check-label"><input className='form-check-input' type='radio' checked={props.UserAccount.UseADAuthentication} onChange={(e) => {
                                            var record: SystemCenter.UserAccount = _.clone(props.UserAccount);
                                            record.UseADAuthentication = e.target.checked;
                                            props.Setter(record);
                                        }} />Active Directory User</label>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className="form-check-inline">
                                        <label className="form-check-label"><input className='form-check-input' type='radio' checked={!props.UserAccount.UseADAuthentication} onChange={(e) => {
                                            var record: SystemCenter.UserAccount = _.clone(props.UserAccount);
                                            record.UseADAuthentication = !e.target.checked;
                                            props.Setter(record);
                                        }} />Database User</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body" hidden={!props.UserAccount.UseADAuthentication}>
                            <div className="row">
                                <div className="col">
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'FirstName'} Label='First Name' Feedback={'First Name must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'LastName'} Label='Last Name' Feedback={'Last Name must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'Title'} Feedback={'Title must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                </div>
                                <div className="col">
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'Phone'} Feedback={'Phone must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'MobilePhone'} Label='Mobile Phone' Feedback={'Mobile Phone must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'Email'} Feedback={'Email must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                </div>
                            </div>
                        </div>
                        <div className="card-body" hidden={props.UserAccount.UseADAuthentication}>
                            <div className="row">
                                <div className="col">
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'Password'} Feedback={'Password must be less than 200 characters.'} Type={'password'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'FirstName'} Label='First Name' Feedback={'First Name must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'LastName'} Label='Last Name' Feedback={'Last Name must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'Title'} Feedback={'Title must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                </div>
                                <div className="col">
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'Phone'} Feedback={'Password must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'MobilePhone'} Label='Mobile Phone' Feedback={'Mobile Phone must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <Input<SystemCenter.UserAccount> Record={props.UserAccount} Field={'Email'} Feedback={'Password must be less than 200 characters.'} Valid={field => validUserAccountField(props.UserAccount, field)} Setter={props.Setter} />
                                    <DatePicker<SystemCenter.UserAccount> Record={props.UserAccount} Field={'ChangePasswordOn'} Label='Change Password On' Setter={props.Setter} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                                <div className="col">
                                    <CheckBox<SystemCenter.UserAccount> Record={props.UserAccount} Label='Locked Out' Field='LockedOut' Setter={props.Setter} />
                                    <CheckBox<SystemCenter.UserAccount> Record={props.UserAccount} Field='Approved' Setter={props.Setter} />
                                </div>
                            <div className="col-lg-6">
                                <CheckBox<SystemCenter.UserAccount> Record={props.UserAccount} Label='Phone Confirmed' Field='PhoneConfirmed' Setter={props.Setter} />
                                <CheckBox<SystemCenter.UserAccount> Record={props.UserAccount} Label='Email Confirmed' Field='EmailConfirmed' Setter={props.Setter} />
                                <CheckBox<SystemCenter.UserAccount> Record={props.UserAccount} Field='ReceiveNotifications' Label='Receive Notifications' Setter={props.Setter} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
            </>
    );
}