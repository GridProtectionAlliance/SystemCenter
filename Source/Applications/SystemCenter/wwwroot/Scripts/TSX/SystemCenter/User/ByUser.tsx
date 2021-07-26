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
import Table from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter as SCGlobal } from '../global';
import { getFilledUser, getNewUserAccount, getSIDFromUserName} from './../../../TS/Services/User';;
import { ByUser } from '@gpa-gemstone/common-pages';
import { Application } from '@gpa-gemstone/application-typings';
import { ValueListGroupSlice, ValueListSlice, UserAccountSlice, UserAdditionalFieldSlice } from '../Store/Store';


const ByUserPage: SCGlobal.ByComponent = (props) => {
    let history = useHistory();
  

    function getAdditionalUserFields(): JQuery.jqXHR<Application.Types.iAdditionalUserField[]> {
        return  $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalUserField/FieldName/0`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });
    }


    function getUserAccounts(searches, sortField, ascending): JQuery.jqXHR<Array<SCGlobal.UserAccount>> {
        return $.ajax({
            type: "Post",
            url: `${homePath}api/SystemCenter/UserAccount/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function addNewUserAccount(user: SCGlobal.UserAccount) {
        return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/UserAccount/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(user),
            cache: false,
            async: true
        });

    }

    function GetValueList(group: string) {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/ValueListGroup`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    if (props.Roles.indexOf('Administrator') < 0) return null;

    return <ByUser
        OnUserSelect={(userid) => history.push({ pathname: homePath + 'index.cshtml', search: '?name=User&UserAccountID=' + userid, state: {} })}
        UserSlice={UserAccountSlice}
        ValueListGroupSlice={ValueListGroupSlice}
        ValueListItemSlice={ValueListSlice}
        AdditionalFieldSlice={UserAdditionalFieldSlice}
    />
   
}


export default ByUserPage;
