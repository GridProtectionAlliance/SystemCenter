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
import { IAPIAccessKey } from './APIAccessKeys'
import moment from 'moment';


interface IProps { Key: IAPIAccessKey, formDisabled: boolean, stateSetter: (APIKey: IAPIAccessKey) => void, setErrors?: (e: string[]) => void }

export default function APIKeyForm(props: IProps) {
    const dispatch = useAppDispatch();

    const allKeys = useAppSelector(APIAccessKeySlice.Data);
    const status = useAppSelector(APIAccessKeySlice.Status);

    const [disableDate, setDisableDate] = React.useState(props.Key.Expires == null);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'changed' || status == 'uninitiated')
            dispatch(APIAccessKeySlice.Fetch());
    }, [status])

    React.useEffect(() => {
        if (props.formDisabled) return
        let e = [];
        if (props.Key.RegistrationKey == null || props.Key.RegistrationKey.length == 0)
            e.push('A Registration Key is required.')
        if (allKeys.findIndex(k => k.RegistrationKey?.toLowerCase() == props.Key.RegistrationKey?.toLowerCase() && k.ID != props.Key.ID) > -1)
            e.push('Registration Key must be unique.')
        if (props.Key.RegistrationKey != null && props.Key.RegistrationKey.length > 50)
            e.push('Registration Key must be less than 50 characters.')
        if (props.Key.RegistrationKey != null && props.Key.RegistrationKey.trim().includes(' '))
            e.push('No spaces allowed in Registration Key')
        if (props.Key.Expires != null && !moment(props.Key.Expires).isValid())
            e.push('Expiration must be a valid date or No Expiration must be checked ')
        setErrors(e);
    }, [props.Key, allKeys])

    React.useEffect(() => {
        if (props.setErrors != undefined)
            props.setErrors(errors);
    }, [props.setErrors, errors])

    function valid(field: keyof (IAPIAccessKey)): boolean {
        if (props.formDisabled) return true
        if (field == 'RegistrationKey')
            return props.Key.RegistrationKey != null && props.Key.RegistrationKey.length > 0 && props.Key.RegistrationKey.length <= 50;
        return true;
    }

    return (
        <div className="col">
            <Input<IAPIAccessKey> Record={props.Key} Field={'RegistrationKey'} Label='Registration Key' Valid={valid} Feedback={''} Setter={(record) => props.stateSetter(record)} Disabled={props.formDisabled} />
            <Input<IAPIAccessKey> Record={props.Key} Field={'APIToken'} Label='API Token' Valid={valid} Feedback={''} Setter={(record) => props.stateSetter(record)} Disabled={true} />
            
            <DatePicker<IAPIAccessKey>
                Record={props.Key}
                Field="Expires"
                Setter={props.stateSetter}
                Valid={() => true}     // change to only validate dates in the future
                Label="Expires:"
                Type="date"
                AllowEmpty={true}
                Disabled={props.formDisabled || disableDate}
            />

            <div className="form-check">
                <input className="form-check-input" type="checkbox" id={"defaultCheck1"} onChange={(evt) => {
                    if (evt.target.checked) props.stateSetter({...props.Key, Expires: null});
                    setDisableDate(evt.target.checked)
                }}
                    checked={disableDate} disabled={props.formDisabled} />
                    <label className="form-check-label" htmlFor={"defaultCheck1"}>No Expiration</label>
            </div>
            

            <br></br>
            <CheckBox Record={props.Key} Field={'AllowImpersonation'} Setter={(record) => props.stateSetter(record)} Label={'Allow Impersonation'} Disabled={props.formDisabled} />
        </div>
    )

}