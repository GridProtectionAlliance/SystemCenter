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
import { LoadingIcon, Alert } from '@gpa-gemstone/react-interactive';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { APIAccessKeySlice } from '../Store/Store';
import { IAPIAccessKey } from './APIAccessKeys'
import moment from 'moment';


interface IProps { Key: IAPIAccessKey, stateSetter: (APIKey: IAPIAccessKey) => void, setErrors?: (e: string[]) => void, disableForm: boolean }
interface IError { [key: string]: string[] };

export default function APIKeyForm(props: IProps) {
    const dispatch = useAppDispatch();
    const allKeys = useAppSelector(APIAccessKeySlice.Data);
    const status = useAppSelector(APIAccessKeySlice.Status);

    const [errors, setErrors] = React.useState<IError>({});
    const [disableExpiry, setDisableExpiry] = React.useState<boolean>(true);

    const errorCheck: (field: keyof (IAPIAccessKey)) => string[] = React.useCallback((field: keyof (IAPIAccessKey)) => {
        const e: string[] = [];
        switch (field) {
            case 'RegistrationKey':
                if (props.Key.RegistrationKey == null || props.Key.RegistrationKey.length == 0)
                    e.push('A Registration Key is required.');
                if (props.Key.RegistrationKey != null && props.Key.RegistrationKey.length > 50)
                    e.push('Registration Key must be less than 50 characters.');
                if (props.Key.RegistrationKey != null && props.Key.RegistrationKey.trim().includes(' '))
                    e.push('No spaces allowed in Registration Key');
                // skip allkeys if status is no good
                if (status !== 'idle') return e;
                if (allKeys.findIndex(k => k.RegistrationKey?.toLowerCase() == props.Key.RegistrationKey?.toLowerCase() && k.ID != props.Key.ID) > -1)
                    e.push('Registration Key must be unique.');
                return e;
            case 'Expires':
                if (props.Key.Expires != null && props.Key.Expires.length !== 0 && moment.utc(props.Key.Expires, OpenXDA.Consts.DateTimeFormat) <= moment.utc())
                    e.push('Expiration date must be in the future.');
                return e;
            default:
                return e;
        }
    }, [props.Key, status]);

    React.useEffect(() => {
        setDisableExpiry(props.Key.Expires == null || props.Key.Expires.length === 0);
    }, [props.Key.ID]);

    React.useEffect(() => {
        if (status == 'changed' || status == 'uninitiated')
            dispatch(APIAccessKeySlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        const e: IError = {};
        const eOut: string[] = [];
        Object.keys(props.Key).forEach((key: keyof IAPIAccessKey) => {
            const errors = errorCheck(key);
            e[key] = errors;
            eOut.push(...errors);
        });
        setErrors(e);
        props.setErrors(eOut);
    }, [props.Key, errorCheck]);

    return (
        <div className="col">
            <LoadingIcon Show={status !== 'idle' && status !== 'error'} />
            {status === 'error' ?
                <Alert Class={'alert-info'} ShowX={false}>
                    An error has occured. Please contact your administrator.
                </Alert> :
                <></>
            }
            <Input<IAPIAccessKey>
                Record={props.Key}
                Field={'RegistrationKey'}
                Label='Registration Key'
                Valid={(field) => errors?.[field]?.length === 0}
                Feedback={errors?.RegistrationKey?.[0]}
                Setter={props.stateSetter}
                Disabled={props.Key.ID >= 0 || status !== 'idle' || props.disableForm}
            />
            <Input<IAPIAccessKey>
                Record={props.Key}
                Field={'APIToken'}
                Label='API Token'
                Valid={(field) => errors?.[field]?.length === 0}
                Feedback={errors?.APIToken?.[0]}
                Setter={props.stateSetter}
                Disabled={true}
            />
            <DatePicker<IAPIAccessKey>
                Record={props.Key}
                Field="Expires"
                Setter={props.stateSetter}
                Valid={(field) => disableExpiry || errors?.[field]?.length === 0}
                Label="Expires"
                Type="date"
                Format={OpenXDA.Consts.DateTimeFormat}
                Feedback={errors?.Expires?.[0]}
                AllowEmpty={disableExpiry}
                Disabled={disableExpiry || props.disableForm}
            />
            <div className="form-check">
                <input
                    className={"form-check-input" + (props.disableForm ? " disabled" : "")}
                    type="checkbox"
                    id={"defaultCheck1"}
                    onChange={(evt) => {
                        if(props.disableForm) return;
                        setDisableExpiry(e => !e);
                        if (evt.target.checked) {
                            props.stateSetter({ ...props.Key, Expires: null });
                        }
                        else {
                            props.stateSetter({ ...props.Key, Expires: moment.utc().add(3, 'months').format(OpenXDA.Consts.DateTimeFormat) });
                        }
                    }}
                    checked={disableExpiry}
                    disabled={props.disableForm}
                />
                <label className="form-check-label" htmlFor={"defaultCheck1"}>No Expiration</label>
            </div>
            <br/>
            <CheckBox
                Record={props.Key}
                Field={'AllowImpersonation'}
                Setter={props.stateSetter}
                Label={'Allow Impersonation'}
                Disabled={props.disableForm}
            />
        </div>
    )
}