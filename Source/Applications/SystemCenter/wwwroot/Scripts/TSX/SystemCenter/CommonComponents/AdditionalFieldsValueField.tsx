//******************************************************************************************************
//  AdditionalFieldsValueField.tsx - Gbtc
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
//  01/28/2020 - Billy Ernest
//       Generated original version of source code.
//  10/19/2023 - Gabriel Santos
//       Seperated Code into it's own file
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';

declare var homePath: string;

interface IValueFieldProps {
    Field: SystemCenter.Types.AdditionalFieldView,
    Values: SystemCenter.Types.AdditionalFieldValue[],
    ParentTableID: number,
    Setter: (val: SystemCenter.Types.AdditionalFieldValue[]) => void,
    IncludeLabel?: boolean
}

const AdditionalFieldsValueField = (props: IValueFieldProps) => {
    const [valueListItems, setValueListItems] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const [valueIndex, setValueIndex] = React.useState<number>(-1);

    const valueListValue: SystemCenter.Types.AdditionalFieldValue = React.useMemo(() => {
        if (valueIndex >= 0) return props.Values[valueIndex];
        else return { ID: 0, AdditionalFieldID: props.Field.ID, ParentTableID: props.ParentTableID, Value: null };
    }, [valueIndex, props.Values, props.Field.ID, props.ParentTableID])

    const setter = React.useCallback((record: SystemCenter.Types.AdditionalFieldValue) => {
        let updated = _.cloneDeep(props.Values);
        if (valueIndex >= 0) updated[valueIndex] = record;
        else updated.push(record);
        props.Setter(updated);
    }, [props.Values, props.Setter]);

    React.useEffect(() => {
        setValueIndex(props.Values.findIndex(value => value.AdditionalFieldID == props.Field.ID));
    }, [props.Values, props.Field]);


    React.useEffect(() => {
        if ((["integer", "number", "boolean", "string"]).indexOf(props.Field.Type) < 0) {
            let handle = $.ajax({
                type: "GET",
                url: `${homePath}api/ValueList/Group/${props.Field.Type}`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            })

            handle.done((vl: Array<SystemCenter.Types.ValueListItem>) => {
                setValueListItems(vl);
            });

            return () => {
                if (handle.abort != undefined) handle.abort()
            }
        }
    }, [props.Field.Type]);

    function Valid(type: SystemCenter.Types.AdditionalFieldType): boolean {
        if (props.Field.Type == "integer")
            return valueListValue.Value == null || AssetAttributes.isInteger(valueListValue.Value);
        else if (props.Field.Type == "number")
            return valueListValue.Value == null || AssetAttributes.isRealNumber(valueListValue.Value);
        else if (props.Field.Type == "boolean")
            return true;
        else
            return true;
    }

    if (valueListValue == null)
        return null;
    if (props.Field.Type == 'string' || props.Field.IsKey)
        return <Input<SystemCenter.Types.AdditionalFieldValue> Record={valueListValue} Field={'Value'} Valid={Valid} Label={(props.IncludeLabel ?? false) ? props.Field.FieldName : ''}
            Type={'text'} Disabled={props.Field.IsKey} Setter={setter}
            Help={(props.Field.IsKey && props.IncludeLabel) ? `Key Value for the ${props.Field.ExternalTable} ${props.Field?.ExternalDB == null ? '' : '(' + props.Field.ExternalDB + ')'} External Database. Visit the Additional Fields tab to select a different Value.` : undefined} />
    if (props.Field.Type == 'number' || props.Field.Type == 'integer')
        return <Input<SystemCenter.Types.AdditionalFieldValue> Record={valueListValue} Field={'Value'} Valid={Valid} Label={(props.IncludeLabel ?? false) ? props.Field.FieldName : ''}
            Type={'number'} Disabled={false} Setter={setter} Feedback={props.Field.FieldName + ' requires an integer value.'} />
    if (props.Field.Type == 'boolean')
        return <CheckBox<SystemCenter.Types.AdditionalFieldValue> Record={valueListValue} Field={'Value'} Label={(props.IncludeLabel ?? false) ? props.Field.FieldName : ''}
            Disabled={false} Setter={setter} />
    return <Select<SystemCenter.Types.AdditionalFieldValue> EmptyOption={true} Record={valueListValue} Field={'Value'} Label={(props.IncludeLabel ?? false) ? props.Field.FieldName : ''}
        Disabled={false} Setter={setter} Options={valueListItems.map(x => ({ Value: x.Value, Label: x.AltValue ?? x.Value }))} />
}


export default AdditionalFieldsValueField;