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
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { RemoteXDAInstanceForm } from './RemoteXDAInstanceForm';
import GenericInfo from '../CommonComponents/GenericInfo';
import { SelectRoles } from '../Store/UserSettings'; 
import { useAppSelector } from '../hooks';
import { OperationResult } from '../CommonComponents/ResultAlert'; 

interface IProps {
    SelectedRecord: OpenXDA.Types.RemoteXDAInstance
    SetSelectedRecord: React.Dispatch<React.SetStateAction<OpenXDA.Types.RemoteXDAInstance>>
    Errors: string[]
    SetErrors: React.Dispatch<React.SetStateAction<string[]>>
    Warnings: string[]
    ClearChanges: () => void
    Patch: () => void
    PatchStatus: Application.Types.Status
    OperationResults: OperationResult[]
    SetOperationResults: React.Dispatch<React.SetStateAction<OperationResult[]>>
}

const SystemSettingsTab = (props: IProps) => {

    const roles = useAppSelector(SelectRoles);

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 || roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <GenericInfo<OpenXDA.Types.RemoteXDAInstance>
            Forms={[(record, setter, setErrors) => <RemoteXDAInstanceForm BaseInstance={record} SetInstance={setter} SetErrors={setErrors} />]}
            HasPermissions={hasPermissions}
            RecordType={'Remote XDA Instance'}
            SelectedRecord={props.SelectedRecord}
            SetSelectedRecord={props.SetSelectedRecord}
            Errors={props.Errors}
            SetErrors={props.SetErrors}
            Warnings={props.Warnings}
            ClearChanges={props.ClearChanges}
            Patch={props.Patch}
            PatchStatus={props.PatchStatus}
            OperationResults={props.OperationResults}
            SetOperationResults={props.SetOperationResults }
        />
    )
}

export default SystemSettingsTab;