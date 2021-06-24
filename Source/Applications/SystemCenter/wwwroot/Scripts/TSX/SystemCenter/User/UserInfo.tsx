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

declare var homePath: string;

export default function UserInfoWindow(props: { User: SystemCenter.UserAccount, stateSetter: (user: SystemCenter.UserAccount) => void }) {
    const [user, setUser] = React.useState<SystemCenter.UserAccount>(props.User);

    React.useEffect(() => {
        setUser({ ...props.User,Name: props.User.AccountName  });
    }, [props.User]);


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
            <div className="card-body" style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                <UserForm UserAccount={user} Setter={props.stateSetter} Edit={true }/>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={() => updateUser()} disabled={user != props.User}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => setUser(props.User)} disabled={user == props.User}>Reset</button>
                </div>
            </div>


        </div>
    );
}