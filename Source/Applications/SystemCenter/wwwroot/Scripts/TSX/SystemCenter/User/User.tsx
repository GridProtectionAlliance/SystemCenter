//******************************************************************************************************
//  Meter.tsx - Gbtc
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
//  08/27/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter } from '../global';
import { useHistory } from "react-router-dom";
import { User } from '@gpa-gemstone/common-pages';
import { getFilledUser, getSecurityRoles, getSecurityRolesForUser, getSIDFromUserName, updateSecurityRolesForUser } from '../../../TS/Services/User';

declare var homePath: string;


export default function UserPage(props: { UserID: string })
{
    const history = useHistory();

    function getUser(userID: string) {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/UserAccount/One/${userID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })
    }

    function deleteUser(user: SystemCenter.UserAccount): JQuery.jqXHR {
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/UserAccount/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(user),
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    function updateUser(user: SystemCenter.UserAccount): JQuery.jqXHR {
        
        return $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/UserAccount/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(user),
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    function getAdditionalUserFields(): JQuery.jqXHR<SystemCenter.AdditionalUserField[]> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalUserField/FieldName/0`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });
    }

    function getFields(sortKey, ascending) {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalUserField/${sortKey}/${(ascending ? '1' : '0')}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function getFieldValues(id: string) {
        return  $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalUserFieldValue/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }
    function GetValueList() {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/ValueListGroup`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function getValueListGroup(group) {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${group}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

    }

    function addField(fld) {
        return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/AdditionalUserField/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(fld),
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function addValues(d) {
        return $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalUserFieldValue/Array`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(d),
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function updateField(fld) {
        return $.ajax({
            type: "Patch",
            url: `${homePath}api/SystemCenter/AdditionalUserField/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(fld),
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function deleteField(fld) {
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/AdditionalUserField/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(fld),
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function ValidateFieldName(name: string) {

        return Promise.resolve(true)
    
    }
    
    

    return <User
        UserID={props.UserID}
        OnDelete={() => history.push({ pathname: homePath + 'index.cshtml?name=Users', state: {} })}
        GetUser={getUser}
        DeleteUser={deleteUser}
        UpdateUser={updateUser}
        GetADinfo={getFilledUser}
        GetSID={getSIDFromUserName}
        GetAdditionalUserFields={getAdditionalUserFields}
        GetAllRoles={() => getSecurityRoles<SystemCenter.SystemCeneterSecurityRoleName>('SystemCenter')}
        GetActiveRoles={(id) => getSecurityRolesForUser(id, 'SystemCenter')}
        SetRoles={(d) => updateSecurityRolesForUser('SystemCenter', d)}
        GetFields={getFields}
        GetFieldValues={getFieldValues}
        GetValueListGroup={getValueListGroup}
        GetValueLists={GetValueList}
        AddField={addField}
        AddOrUpdateValues={addValues}
        DeleteField={deleteField}
        UpdateField={updateField}
        ValidateFieldName={ValidateFieldName}

    />
}

