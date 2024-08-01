//******************************************************************************************************
//  User.ts - Gbtc
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
//  02/06/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { SystemCenter } from "../../TSX/SystemCenter/global";
import { SystemCenter as SCTypings } from '@gpa-gemstone/application-typings';
import { Application } from '@gpa-gemstone/application-typings'
import * as _ from 'lodash';
declare var homePath: string;

export function getSIDFromUserName(accountName: string): JQuery.jqXHR<string> {
    return $.ajax({
        type: "POST",
        url: `${homePath}api/SystemCenter/UserAccount/SID`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(accountName),
        cache: false,
        async: true
    });

}

export function getIsUser(sid: string): JQuery.jqXHR<boolean> {
    return $.ajax({
        type: "POST",
        url: `${homePath}api/SystemCenter/UserAccount/IsUser`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(sid),
        cache: false,
        async: true
    });

}

export function getFilledUser(userAccount: Application.Types.iUserAccount): JQuery.jqXHR<Application.Types.iUserAccount> {
    return $.ajax({
        type: "POST",
        url: `${homePath}api/SystemCenter/UserAccount/FilledUserAccount`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(userAccount),
        cache: false,
        async: true
    });

}

export function getRoles(): JQuery.jqXHR<Array<SystemCenter.Role>> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/SystemCenter/Role`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}

export function getSecurityRoles<T>(applicationName: 'SystemCenter' | 'OpenXDA'): JQuery.jqXHR<Array<Application.Types.iApplicationRole<T>>> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/${applicationName}/ApplicationRole`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}

export function updateSecurityRolesForUser(applicationName: 'SystemCenter' | 'OpenXDA', data: Array<Application.Types.iApplicationRoleUserAccount>): JQuery.jqXHR<string> {
    return $.ajax({
        type: "PATCH",
        url: `${homePath}api/${applicationName}/ApplicationRoleUserAccount/UpdateArray`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(data),
        cache: true,
        async: true
    });
}


export function getSecurityRolesForUser(id: string, applicationName: 'SystemCenter' | 'OpenXDA'): JQuery.jqXHR<Array<Application.Types.iApplicationRoleUserAccount>> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/${applicationName}/ApplicationRoleUserAccount/${id}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}

export function getTSCs(): JQuery.jqXHR<Array<SCTypings.Types.ValueListItem>> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/ValueList/Group/TSC`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}

export function validUserAccountField(user: SystemCenter.UserAccount, field: keyof (SystemCenter.UserAccount)): boolean {
    if (field == 'AccountName')
        return user.Name != null && user.Name.length > 0 && user.Name.length <= 200;
    if (field == 'Name')
        return user.Name != null && user.Name.length > 0 && user.Name.length <= 200;
    else if (field == 'Password')
        return user.Password == null || user.Password.length <= 200;
    else if (field == 'FirstName')
        return user.FirstName == null || user.FirstName.length <= 200;
    else if (field == 'LastName')
        return user.LastName == null || user.LastName.length <= 200;
    else if (field == 'Phone')
        return user.Phone == null || user.Phone.length <= 200;
    else if (field == 'Email')
        return user.Email == null || user.Email.length <= 200;

    return false;

}

export function getNewUserAccount(): JQuery.jqXHR<Application.Types.iUserAccount> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/SystemCenter/UserAccount/New`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}