//******************************************************************************************************
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
import { MiMDSettingSlice, OpenSEESettingSlice, OpenXDASettingSlice, SystemCenterSettingSlice, SEBrowserSettingSlice } from '../Store/Store';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as LocalSC } from '../global';
import Setting from './Setting';

interface IProps {
    System: 'SystemCenter' | 'MiMD' | 'OpenXDA' | 'OpenSEE' | 'SEBrowser',
    Roles: Application.Types.SecurityRoleName[]
}

const emptySEBSetting: LocalSC.SEBrowserSetting = { ID: 0, Name: '', Value: null, DefaultValue: null, Scope: "app.setting", ApplicationInstance: false, Roles: "Administrator" };
const emptySetting: SystemCenter.Types.Setting = { ID: 0, Name: '', Value: null, DefaultValue: null };

const BySetting = (props: IProps) => {
    if (props.System == 'SystemCenter')
        return <Setting SettingsSlice={SystemCenterSettingSlice} DefaultSetting={emptySetting} key='SystemCenter' />
    if (props.System == 'MiMD')
        return <Setting SettingsSlice={MiMDSettingSlice} DefaultSetting={emptySetting} key='MiMD' />
    if (props.System == 'OpenSEE')
        return <Setting SettingsSlice={OpenSEESettingSlice} DefaultSetting={emptySetting} key='OpenSEE' />
    if (props.System == 'SEBrowser')
        return <Setting SettingsSlice={SEBrowserSettingSlice} DefaultSetting={emptySEBSetting}  key='SEBrowser' />
    return <Setting SettingsSlice={OpenXDASettingSlice} DefaultSetting={emptySetting} key='OpenXDA' />
}
export default BySetting;

