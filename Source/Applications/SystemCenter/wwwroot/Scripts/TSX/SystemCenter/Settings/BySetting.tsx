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
import { SystemCenter as SC } from '../global';
import { Setting } from '@gpa-gemstone/common-pages';
import { MiMDSettingSlice, OpenXDASettingSlice, SystemCenterSettingSlice } from '../Store/Store';
import { useDispatch } from 'react-redux';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';

declare var homePath: string;

interface BySettingsComponent { (props: { Roles: Array<Application.Types.SecurityRoleName>, System: 'SystemCenter'|'OpenXDA'|'MiMD' }): JSX.Element; }

const BySetting: BySettingsComponent = (props) => {

    let slice = SystemCenterSettingSlice

    if (props.System == 'OpenXDA')
        slice = OpenXDASettingSlice;
    if (props.System == 'MiMD')
        slice = MiMDSettingSlice;
    
    return <Setting SettingsSlice={slice} />

}

export default BySetting;

