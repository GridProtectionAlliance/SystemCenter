// ******************************************************************************************************
//  Info.tsx - Gbtc
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
import * as _ from 'lodash';
import UserForm from './UserForm';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import { Warning } from '@gpa-gemstone/gpa-symbols';
import { UserAccountSlice } from '../../Store/Store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IUserAccount } from '../Types';

const UserInfo = (props: { AccountId: string }) => {
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector((state) => UserAccountSlice.Datum(state,props.AccountId));
    const [user, setUser] = React.useState<IUserAccount>(currentUser);
    const [warnings, setWarning] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('None' | 'Clear')>('None');


    React.useEffect(() => {
        if (currentUser == null || user == null)
            return;

        const w = [];
        if (currentUser.FirstName !== user.FirstName)
            w.push('Changes to First Name will be lost.')
        if (currentUser.LastName !== user.LastName)
            w.push('Changes to Last Name will be lost.')
        if (currentUser.Phone !== user.Phone)
            w.push('Changes to Phone will be lost.')
        if (currentUser.Email !== user.Email)
            w.push('Changes to Email will be lost.')
        if (currentUser.ChangePasswordOn !== user.ChangePasswordOn)
            w.push('Changes to Change Password Date will be lost.')
        if (currentUser.LockedOut !== user.LockedOut)
            w.push('Changes to Account Locked Status will be lost.')
        if (currentUser.Approved !== user.Approved)
            w.push('Changes Account Approved Status will be lost.')
        if (currentUser.PhoneConfirmed !== user.PhoneConfirmed)
            w.push('Changes to Phone Confirmed Status will be lost.')
        if (currentUser.EmailConfirmed !== user.EmailConfirmed)
            w.push('Changes to Email confirmed Status will be lost.')
        if (currentUser.Type === 'Database' && currentUser.Password !== user.Password)
            w.push('Changes to Password will be lost.')

        setWarning(w);
    }, [currentUser, user])

    React.useEffect(() => { setUser(currentUser) }, [currentUser])

    function updateUser() {
        dispatch(UserAccountSlice.DBAction({ verb: 'PATCH', record: user }))
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>User Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                {user != null ? <UserForm UserAccount={user} Setter={(u) => setUser(u)} Edit={true} /> : null}
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={() => updateUser()} disabled={warnings.length === 0}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => setUser(currentUser)} disabled={warnings.length === 0} data-tooltip={'Clr'}
                        onMouseEnter={() => setHover('Clear')} onMouseLeave={() => setHover('None')}>Reset</button>
                </div>
                <ToolTip Show={hover === 'Clear' && (warnings.length > 0)} Position={'top'} Target={"Clr"}>
                    {warnings.map((t, i) => <p key={i}>{Warning} {t}</p>)}
                </ToolTip>
            </div>


        </div>
    );

}

export default UserInfo;
