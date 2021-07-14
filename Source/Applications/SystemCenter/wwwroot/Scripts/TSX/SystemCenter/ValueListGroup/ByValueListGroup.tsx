//******************************************************************************************************
//  ByValueListGroup.tsx - Gbtc
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
//  10/16/2020 - Billy Ernest
//       Generated original version of source code.
//  07/13/2021 - Christoph Lackner
//       Moved to gpa-gemstone
//
//******************************************************************************************************

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ValueListGroupSlice, ValueListSlice } from '../Store/Store';
import { ByValueList } from '@gpa-gemstone/common-pages';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter as SCGlobal } from '../global';

const ByValueListGroups: SCGlobal.ByComponent = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();

    function handleSelect(id: number) {
        history.go(homePath + 'index.cshtml?name=ValueListGroup&GroupID=' + id)
    }

    if (props.Roles.indexOf('Administrator') > -1 || props.Roles.indexOf('Transmission SME') > -1)
        return <ByValueList OnValueListSelect={handleSelect} ValueListItemSlice={ValueListSlice} ValueListSlice={ValueListGroupSlice} />;
    else
        return null;
 
}

export default ByValueListGroups;

