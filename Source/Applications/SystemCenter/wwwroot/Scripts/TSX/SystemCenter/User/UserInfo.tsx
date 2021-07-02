//******************************************************************************************************
//  ConnectionInfo.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  09/11/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter } from '../global';

import CryptoJS from 'crypto-js'
import UserForm from './UserForm';
import { ToolTip } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

export default function UserInfoWindow(props: { User: SystemCenter.UserAccount, stateSetter: (user: SystemCenter.UserAccount) => void }) {
    const [user, setUser] = React.useState<SystemCenter.UserAccount>(props.User);
    const [warnings, setWarning] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('None' | 'Clear')>('None');


    React.useEffect(() => {
        setUser({ ...props.User,Name: props.User.AccountName  });
    }, [props.User]);

    React.useEffect(() => {
        let encryptedPwd = (user.Password != props.User.Password ? CryptoJS.SHA256(user.Password + "0").toString(CryptoJS.enc.Base64) : user.Password)

        let w = [];
        if (props.User.FirstName != user.FirstName)
            w.push('Changes to First Name will be lost.')
        if (props.User.LastName != user.LastName)
            w.push('Changes to Last Name will be lost.')
        if (props.User.Title != user.Title)
            w.push('Changes to Title will be lost.')
        if (props.User.Phone != user.Phone)
            w.push('Changes to Phone will be lost.')
        if (props.User.MobilePhone != user.MobilePhone)
            w.push('Changes to Mobile Phone will be lost.')
        if (props.User.Email != user.Email)
            w.push('Changes to Email will be lost.')
        if (props.User.ChangePasswordOn != user.ChangePasswordOn)
            w.push('Changes to Change Password Date will be lost.')
        if (props.User.LockedOut != user.LockedOut)
            w.push('Changes to Account Locked Status will be lost.')
        if (props.User.Approved != user.Approved)
            w.push('Changes Account Approved Status will be lost.')
        if (props.User.PhoneConfirmed != user.PhoneConfirmed)
            w.push('Changes to Phone Confirmed Status will be lost.')
        if (props.User.EmailConfirmed != user.EmailConfirmed)
            w.push('Changes to Email confirmed Status will be lost.')
        if (props.User.ReceiveNotifications != user.ReceiveNotifications)
            w.push('Changes to Notification Status will be lost.')
        if (!props.User.UseADAuthentication && props.User.Password != encryptedPwd)
            w.push('Changes to Password will be lost.')

        setWarning(w);
    }, [props.User, user])

    function updateUser(): JQuery.jqXHR {
       let encryptedPwd = (user.Password != props.User.Password ? CryptoJS.SHA256(user.Password + "0").toString(CryptoJS.enc.Base64) : user.Password)
       return $.ajax({
            type: "PATCH",
           url: `${homePath}api/SystemCenter/UserAccount/Update`,
           contentType: "application/json; charset=utf-8",
           data: JSON.stringify({ ...user, Name: props.User.Name, Password: encryptedPwd }),
            dataType: 'json',
            cache: true,
            async: true
       }).done((LocationID: number) => {
           props.stateSetter(user);
       });
    }


    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>User Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ height: window.innerHeight - 440, maxHeight: window.innerHeight - 440, overflowY: 'auto' }}>
                <UserForm UserAccount={user} Setter={setUser} Edit={true} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={() => updateUser()} disabled={warnings.length == 0}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => setUser({ ...props.User, Name: props.User.AccountName })} disabled={warnings.length == 0} data-tooltip={'Clr'}
                        onMouseEnter={() => setHover('Clear')} onMouseLeave={() => setHover('None')}>Reset</button>
                </div>
                <ToolTip Show={hover == 'Clear' && (warnings.length > 0)} Position={'top'} Theme={'dark'} Target={"Clr"}>
                    {warnings.map((t, i) => <p key={i}><i style={{ marginRight: '10px', color: '#ffc107' }} className="fa fa-exclamation-triangle"></i> {t}</p>)}
                </ToolTip>
            </div>


        </div>
    );
}