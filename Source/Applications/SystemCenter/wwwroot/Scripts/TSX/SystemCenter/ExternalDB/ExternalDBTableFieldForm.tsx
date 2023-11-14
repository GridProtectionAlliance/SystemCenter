//******************************************************************************************************
//  ExternalDBTableFieldForm.tsx - Gbtc
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
//  10/05/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter, OpenXDA } from '@gpa-gemstone/application-typings';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ValueListGroupSlice } from '../Store/Store';
import { Input, Select, CheckBox } from '@gpa-gemstone/react-forms';

interface IProps {
    Record: SystemCenter.Types.AdditionalFieldView,
    Setter: (record: SystemCenter.Types.AdditionalFieldView) => void,
    SetErrors?: (e: string[]) => void
}

export default function ExternalDBTableFieldForm(props: IProps) {

    const dispatch = useAppDispatch();

    const valueListGroupData = useAppSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    React.useEffect(() => {
        if (valueListGroupStatus == 'unintiated' || valueListGroupStatus == 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);

    function Valid(field: keyof (SystemCenter.Types.AdditionalFieldView)): boolean {
        if (field == 'FieldName')
            return props.Record.FieldName != null && props.Record.FieldName.length > 0 && props.Record.FieldName.length <= 200;;

        return true;
    }

    return (
        <form>
            <Input<SystemCenter.Types.AdditionalFieldView> Record={props.Record} Field={'FieldName'} Label={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <Select<SystemCenter.Types.AdditionalFieldView> Record={props.Record} Field={'ParentTable'} Label={'Parent Type'} Setter={props.Setter}
                Options={[{ Value: 'Meter', Label: 'Meter' }, { Value: 'Location', Label: 'Substation' }, { Value: 'Customer', Label: 'Customer' }, { Value: 'Company', Label: 'Company' }, { Value: 'Asset', Label: 'Asset' },
                    { Value: 'Line', Label: 'Line' }, { Value: 'LineSegment', Label: 'Line Segment' }, { Value: 'Breaker', Label: 'Breaker' }, { Value: 'CapacitorBank', Label: 'Capacitor Bank' }, { Value: 'Transformer', Label: 'Transformer' }, { Value: 'CapacitorBankRelay', Label: 'Capacitor Bank Relay' }, { Value: 'DER', Label: 'DER' }]} />
            <Select<SystemCenter.Types.AdditionalFieldView> Record={props.Record} Field={'Type'} Label={'Field Type'} Setter={props.Setter}
                Options={[{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }].concat(valueListGroupData.map(x => { return { Value: x.Name, Label: x.Name } }))} />
            <CheckBox<SystemCenter.Types.AdditionalFieldView> Record={props.Record} Field={'Searchable'} Label={'Searchable'} Setter={props.Setter} Help={'Enable to use this field as a Search Filter.'} />
            <CheckBox<SystemCenter.Types.AdditionalFieldView> Record={props.Record} Field={'IsSecure'} Label={'Secure'} Setter={props.Setter} Help={'Enable to make this field only visible to admins.'} />
            <CheckBox<SystemCenter.Types.AdditionalFieldView> Record={props.Record} Field={'IsInfo'} Label={'Info'} Setter={props.Setter} Help={'Enable to display this field and its Value in the Info tab.'} />
            <CheckBox<SystemCenter.Types.AdditionalFieldView> Record={props.Record} Field={'IsKey'} Label={'Key'} Setter={props.Setter} Help={'Enable if this is an External Database Key.'} />
        </form>

    );
}