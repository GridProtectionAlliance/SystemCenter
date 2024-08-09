//******************************************************************************************************
//  CategoryForm.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  08/08/2024 - Ali Karrar
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Input, CheckBox, DatePicker } from '@gpa-gemstone/react-forms';
import { APIAccessKeySlice } from '../Store/Store';
import { OpenXDA } from '@gpa-gemstone/application-typings'
import { SelectRoles } from '../Store/UserSettings';
import { CreateGuid } from '@gpa-gemstone/helper-functions'


interface IProps { Key: OpenXDA.Types.APIAccessKey, disableEdit: boolean, stateSetter: (APIKey: OpenXDA.Types.APIAccessKey) => void, setErrors?: (e: string[]) => void }

export default function APIKeyForm(props: IProps) {
    const dispatch = useAppDispatch();

    const [errors, setErrors] = React.useState<string[]>([]);
    const allKeys = useAppSelector(APIAccessKeySlice.Data);
    const akStatus = useAppSelector(APIAccessKeySlice.Status);

    const [APIKey, setAPIKey] = React.useState<OpenXDA.Types.APIAccessKey>(props.Key);
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (akStatus == 'changed' || akStatus == 'unintiated')
            dispatch(APIAccessKeySlice.Fetch());
    }, [akStatus])

    React.useEffect(() => {
        if (!_.isEqual(props.Key, APIKey))
            setAPIKey(props.Key);
    }, [props.Key]);

    React.useEffect(() => {
        let e = [];
        if (APIKey.RegistrationKey == null || APIKey.RegistrationKey.length == 0)
            e.push('A Registration Key is required.')
        if (APIKey.APIToken == null || APIKey.APIToken.length == 0)
            e.push('An API Token is required.')

        if (allKeys.findIndex(c => c.RegistrationKey == APIKey.RegistrationKey && c.ID != APIKey.ID) > -1)
            e.push('Registration Key must be unique.')

        if (APIKey.RegistrationKey != null && APIKey.RegistrationKey.length > 50)
            e.push('Registration Key must be less than 50 characters.')

        setErrors(e);
    }, [APIKey, allKeys])

    React.useEffect(() => {
        if (props.setErrors != undefined)
            props.setErrors(errors);
    }, [props.setErrors, errors])



    function valid(field: keyof (OpenXDA.Types.APIAccessKey)): boolean {
        if (field == 'RegistrationKey')
            return APIKey.RegistrationKey != null && APIKey.RegistrationKey.length > 0 && APIKey.RegistrationKey.length <= 50;
        else if (field == 'APIToken')
            return APIKey.APIToken != null && APIKey.APIToken.length > 0 && APIKey.APIToken.length <= 50;
        return true;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <div className="col">
            <Input<OpenXDA.Types.APIAccessKey> Record={APIKey} Field={'RegistrationKey'} Label='Registration Key' Valid={valid} Feedback={''} Setter={(record) => props.stateSetter(record)} Disabled={!hasPermissions() && props.disableEdit} />
            <Input<OpenXDA.Types.APIAccessKey> Record={APIKey} Field={'APIToken'} Label='API Token' Valid={valid} Feedback={''} Setter={(record) => props.stateSetter(record)} Disabled={true} />
            <button className="btn btn-primary" onClick={() => setAPIKey((key) => ({ ...key, APIToken: CreateGuid() }))}>Generate New Key</button>
            <br></br>
            <DatePicker<OpenXDA.Types.APIAccessKey>
                Record={APIKey}
                Field="Expires"
                Format="MM/DD/YYYY HH:mm:ss.SSS"
                Setter={setAPIKey}
                Valid={() => true} ///change to validate dates that aren't in past
                Label="Expiration Date"
                Type="datetime-local"
                AllowEmpty={true}
            />
            <CheckBox Record={APIKey} Field={'AllowImpersonation'} Setter={(record) => props.stateSetter(record)} Label={'Allow Impersonation'} Disabled={!hasPermissions() && props.disableEdit} />
        </div>
    )

}