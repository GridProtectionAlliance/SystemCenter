//******************************************************************************************************
//  SecurityGroupForm.tsx - Gbtc
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
//  10/21/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, TextArea, Select } from '@gpa-gemstone/react-forms';
import { CompanyTypeSlice, CompanySlice } from '../Store/Store';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';

interface IProps { SecurityGroup: OpenXDA.Types.SecurityGroup, Setter: (eDB: OpenXDA.Types.SecurityGroup) => void, setErrors?: (e: string[]) => void }

export default function SecurityGroupForm(props: IProps) {

    const dispatch = useDispatch();
    const ctStatus = useSelector(CompanyTypeSlice.Status) as Application.Types.Status;
    const cStatus = useSelector(CompanySlice.Status) as Application.Types.Status;

    React.useEffect(() => {
        let e = [];
        if (props.SecurityGroup.Name == null || props.SecurityGroup.Name.length == 0)
            e.push('A name is required.');
        if (props.SecurityGroup.Name != null && props.SecurityGroup.Name.length > 200)
            e.push('External Database Table Name must be less than 200 characters.');

        if (props.setErrors != undefined)
            props.setErrors(e);
    }, [props.SecurityGroup]);

    React.useEffect(() => {
        if (ctStatus == 'unintiated' || ctStatus == 'changed')
            dispatch(CompanyTypeSlice.Fetch());
    }, []);

    React.useEffect(() => {
        if (cStatus == 'unintiated' || cStatus == 'changed')
            dispatch(CompanySlice.Fetch());
    }, []);


    function Valid(field: keyof (OpenXDA.Types.SecurityGroup)): boolean {
        if (field == 'Name')
            return props.SecurityGroup.Name != null && props.SecurityGroup.Name.length > 0 && props.SecurityGroup.Name.length <= 200;
        else if (field == 'Description')
            return props.SecurityGroup.Description != null && props.SecurityGroup.Description.length > 0 && props.SecurityGroup.Description.length <= 200;
        return false;
    }


    return (
        <form>
            <Input<OpenXDA.Types.SecurityGroup> Record={props.SecurityGroup} Field={'Name'} Feedback={'Name must be less than 200 characters.'} Valid={Valid} Setter={props.Setter} />
            <Input<OpenXDA.Types.SecurityGroup> Record={props.SecurityGroup} Field={'Description'} Feedback={'Description must be less than 200 characters.'} Valid={Valid} Setter={props.Setter} />
        </form>

    );
}