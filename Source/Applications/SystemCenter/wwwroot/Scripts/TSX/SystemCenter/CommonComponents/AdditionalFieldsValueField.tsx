﻿//******************************************************************************************************
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
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';

declare var homePath: string;

interface IValueFieldProps {
    Field: SystemCenter.Types.AdditionalField,
    Values: SystemCenter.Types.AdditionalFieldValue[],
    ParentTableID: number,
    Setter: (val: SystemCenter.Types.AdditionalFieldValue[]) => void,
    KeyCallback: () => void,
    DisplayKeyInBox?: boolean,
    IncludeLabel?: boolean
}

const AdditionalFieldsValueField = (props: IValueFieldProps) => {
    const [valueListItems, setValueListItems] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const [valueIndex, setValueIndex] = React.useState<number>(-1)

    React.useEffect(() => {
        let index = props.Values.findIndex(value => value.AdditionalFieldID == props.Field.ID);
        setValueIndex(index);
        if (index == -1)
            props.Setter([...props.Values, { ID: 0, AdditionalFieldID: props.Field.ID, ParentTableID: props.ParentTableID, Value: null }]);
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

    function Setter(record: SystemCenter.Types.AdditionalFieldValue): void {
        let updated = _.cloneDeep(props.Values);
        updated[valueIndex] = record;
        props.Setter(updated)
    }

    function Valid(type: SystemCenter.Types.AdditionalFieldType): boolean {
        if (props.Field.Type == "integer")
            return props.Values[valueIndex].Value == null || AssetAttributes.isInteger(props.Values[valueIndex].Value);
        else if (props.Field.Type == "number")
            return props.Values[valueIndex].Value == null || AssetAttributes.isRealNumber(props.Values[valueIndex].Value);
        else if (props.Field.Type == "boolean")
            return true;
        else
            return true;
    }

    if (valueIndex == -1 || props.Values[valueIndex] == undefined) {
        return null;
    }
    if (props.Field.IsKey)
        if (props.DisplayKeyInBox ?? false)
            return (
                <>
                    {(props.IncludeLabel ?? false) ? 
                        <label>{props.Field.FieldName}</label> : null
                    }
                    <div className="row" style={{height: "67px"}}>
                        <div className="form-group" style={{width: "calc(100% - 75px)", paddingLeft: "15px"}}>
                            <Input<SystemCenter.Types.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={''}
                                Type={'text'} Disabled={true} Setter={Setter} />
                        </div>
                        <button className="btn btn-sm pull-right" style={{ height: '38px' }} onClick={(e) => {
                            e.preventDefault();
                            props.KeyCallback();
                        }}>{Pencil}</button>
                        <button className="btn btn-sm pull-right" style={{height: '38px'}} onClick={(e) => {
                            e.preventDefault();
                            const newRecord = { ...props.Values[valueIndex] }
                            newRecord.Value = null;
                            Setter(newRecord);
                        }}>{TrashCan}</button>
                    </div>
                </>                    );
            else
                return (
                    <>
                        {props.Values[valueIndex]['Value']}
                        <button className="btn btn-sm pull-right" onClick={(e) => {
                            e.preventDefault();
                            props.KeyCallback();
                        }}>{Pencil}</button>
                        <button className="btn btn-sm pull-right" onClick={(e) => {
                            e.preventDefault();
                            const newRecord = { ...props.Values[valueIndex] }
                            newRecord.Value = null;
                            Setter(newRecord);
                        }}>{TrashCan}</button>
                    </>);
    if (props.Field.Type == 'number' || props.Field.Type == 'integer')
        return <Input<SystemCenter.Types.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={(props.IncludeLabel ?? false) ? props.Field.FieldName : ''}
            Type={'number'} Disabled={false} Setter={Setter} Feedback={props.Field.FieldName + ' requires an integer value.'} />
    if (props.Field.Type == 'string')
        return <Input<SystemCenter.Types.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={(props.IncludeLabel ?? false) ? props.Field.FieldName : ''}
            Type={'text'} Disabled={false} Setter={Setter} />
    if (props.Field.Type == 'boolean')
        return <CheckBox<SystemCenter.Types.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Label={(props.IncludeLabel ?? false) ? props.Field.FieldName : ''}
            Disabled={false} Setter={Setter} />
    return <Select<SystemCenter.Types.AdditionalFieldValue> EmptyOption={true} Record={props.Values[valueIndex]} Field={'Value'} Label={(props.IncludeLabel ?? false) ? props.Field.FieldName : ''}
        Disabled={false} Setter={Setter} Options={valueListItems.map(x => ({ Value: x.ID.toString(), Label: x.Value }))} />
}


export default AdditionalFieldsValueField;