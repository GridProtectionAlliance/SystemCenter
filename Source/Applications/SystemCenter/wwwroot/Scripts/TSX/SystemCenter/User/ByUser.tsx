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
import { ValueListGroupSlice, ValueListSlice, UserAccountSlice, UserAdditionalFieldSlice } from '../Store/Store';


const ByUserPage: Application.Types.iByComponent = (props) => {


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
