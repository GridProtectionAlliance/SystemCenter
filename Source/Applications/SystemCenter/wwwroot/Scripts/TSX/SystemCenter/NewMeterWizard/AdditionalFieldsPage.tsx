//******************************************************************************************************
//  AdditionalFieldsPage.tsx - Gbtc
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
//  04/20/2025 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import AdditionalFieldsTable from '../CommonComponents/AdditionalFieldsTable';
import { IsInteger } from '@gpa-gemstone/helper-functions';

declare var homePath: string;

interface IProps {
    Type: ('Meter' | OpenXDA.Types.AssetTypeName),
    ID: number,
    SetError: (e: string[]) => void,
    SetAddlFieldValues: React.Dispatch<React.SetStateAction<SystemCenter.Types.AdditionalFieldValue[]>>,
    AddlFieldValues: SystemCenter.Types.AdditionalFieldValue[]
}

interface IValidated {
    FieldID: number;
    Message: string;
}

interface IRef {
    OnEnter: () => PromiseLike<void>;
    OnExit: () => PromiseLike<void>;
}

const AdditionalFieldsPage: React.ForwardRefRenderFunction<IRef,IProps> = (props: IProps, ref: React.ForwardedRef<IRef>) => {

    const [changes, setChanges] = React.useState<SystemCenter.Types.AdditionalFieldValue[]>([]);
    const [values, setValues] = React.useState<SystemCenter.Types.AdditionalFieldValue[]>([]);
    const [state, setState] = React.useState<Application.Types.Status>('unintiated')
    const [invalidChanges, setInvalidChanges] = React.useState<IValidated[]>([]);

    React.useEffect(() => { props.SetError(invalidChanges.map((m) => m.Message))}, [invalidChanges]);

    const saveChanges = React.useCallback(() => $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/Array`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(changes),
            dataType: 'json',
            cache: true,
            async: true
        }),[changes]);

    React.useImperativeHandle(ref, () => ({
        OnExit: saveChanges,
        OnEnter: () => Promise.resolve(),
    }));

        React.useEffect(() => {  
            setState('loading');
                $.ajax({
                    type: "GET",
                    url: `${homePath}api/SystemCenter/AdditionalFieldValue/${props.ID}`,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    cache: true,
                    async: true
                }).then((d) => { setValues(d); setState('idle'); }, () => setState('error'));
            
        }, [props.ID, props.Type])

    const allValues = React.useMemo(() => values.filter((v) => changes.findIndex((item) => item.AdditionalFieldID == v.AdditionalFieldID) < 0).concat(changes), [values, changes])

    return  <AdditionalFieldsTable
        ID={props.ID}
        Type={props.Type}
        FieldValues={allValues}
        HideExternal={true}
        LoadState={state}
        SetValues={(value, field) => {
            const i = changes.findIndex(f => f.AdditionalFieldID === field.ID);
            const iCurrent = values.findIndex(f => f.AdditionalFieldID === field.ID);

            if (i >= 0 && iCurrent < 0)
                setChanges((c) => { const u = _.cloneDeep(c); u[i] = value; return u })
            else if (i >= 0 && values[iCurrent].Value != value.Value)
                setChanges((c) => { const u = _.cloneDeep(c); u[i] = value; return u })
            else if (i >= 0)
                setChanges((c) => { const u = _.cloneDeep(c); u.splice(i); return u })
            else if (iCurrent >= 0 && values[iCurrent].Value != value.Value)
                setChanges((c) => { const u = _.cloneDeep(c); u.push(value); return u })
            else if (iCurrent < 0)
                setChanges((c) => { const u = _.cloneDeep(c); u.splice(i); return u })

            const iInvalid = invalidChanges.findIndex(item => item.FieldID == field.ID);
            const valid = field.Type != 'integer' || (value.Value != null && IsInteger(value.Value));

            if (valid && iInvalid >= 0)
                setInvalidChanges((c) => { const u = _.cloneDeep(c); u.splice(iInvalid); return u });
            if (!valid && iInvalid < 0) 
                setInvalidChanges((c) => { const u = _.cloneDeep(c); u.push({ FieldID: field.ID, Message: `Value for \'${field.FieldName}\' must be an integer.` }); return u });

        }}
            />                     
}

export default React.forwardRef<IRef,IProps>(AdditionalFieldsPage); ;