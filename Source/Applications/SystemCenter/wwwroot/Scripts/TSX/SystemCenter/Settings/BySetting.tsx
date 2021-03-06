﻿//******************************************************************************************************
//  BySetting.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  04/28/2021 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter as SC } from '../global';
import { Setting } from '@gpa-gemstone/common-pages';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Search } from '@gpa-gemstone/react-interactive';
import { SettingSlice } from '../Store/Store';
import { useDispatch } from 'react-redux';

declare var homePath: string;

const BySetting: SC.ByComponent = (props) => {
    const dispatch = useDispatch();

    return <Setting SettingsSlice={SettingSlice} />
    null;
    /*<Setting<SystemCenter.Types.Setting>
        getNewSetting={() => ({ Name: '', DefaultValue: '', Value: '', ID: 0 })}
        searchSetting={SearchSettings}
        addSetting={(setting) => dispatch(SettingSlice.DBAction({verb: 'POST', record: setting})) as any}
        deleteSetting={(setting) => dispatch(SettingSlice.DBAction({ verb: 'DELETE', record: setting })) as any}
        updateSetting={(setting) => dispatch(SettingSlice.DBAction({ verb: 'PATCH', record: setting })) as any}
    />
    */
    function SearchSettings(search: Search.IFilter<SystemCenter.Types.Setting>[], ascending: boolean, sortField: string) {
        return $.ajax({
            type: "Post",
            url: `${homePath}api/Setting/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: search, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

}

export default BySetting;

