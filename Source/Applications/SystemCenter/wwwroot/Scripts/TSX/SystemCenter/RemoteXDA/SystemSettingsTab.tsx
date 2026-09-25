//******************************************************************************************************
//  AssetEventChannel.tsx - Gbtc
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
//  04/19/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { RemoteXDAInstanceForm } from './RemoteXDAInstanceForm';
import GenericInfo from '../CommonComponents/GenericInfo';
import { useRecordContext } from '../CommonComponents/RecordContext';


const SystemSettingsTab = () => {
    const context = useRecordContext<OpenXDA.Types.RemoteXDAInstance>();
    if (context.SelectedRecord == null) return null;
    return (
        <GenericInfo<OpenXDA.Types.RemoteXDAInstance>
            Forms={[(record, setter, setErrors) => <RemoteXDAInstanceForm BaseInstance={record} SetInstance={setter} SetErrors={setErrors} />]}
            HasPermissions={() => true} // currently, the SystemSettingsTab in the master branch does not check permissions before edits.
        />
    )
}

export default SystemSettingsTab;