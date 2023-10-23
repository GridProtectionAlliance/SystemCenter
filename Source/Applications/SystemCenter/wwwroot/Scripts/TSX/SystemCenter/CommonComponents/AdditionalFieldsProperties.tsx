//******************************************************************************************************
//  AdditionalFieldsProperties.tsx - Gbtc
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
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { LoadingIcon, LoadingScreen, Modal, Search, ServerErrorIcon, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import Table from '@gpa-gemstone/react-table';
import { CrossMark, HeavyCheckMark, Pencil, Warning as WarningIcon } from '@gpa-gemstone/gpa-symbols'
import AdditionalFieldsKeyModal from './AdditionalFieldsKeyModal';
import AdditionalFieldsValueField from './AdditionalFieldsValueField';

declare var homePath: string;

interface IProps {
    ID: number,
    ParentTable: string,
    AddlFieldSaveRef: React.MutableRefObject<() => (() => void)>,
    SetErrorList?: (errorText: string[]) => void,
    SetChangedList?: (changedText: string[]) => void
}

function AdditionalFieldsProperties(props: IProps): JSX.Element {
    const [additionalFields, setAdditionalFields] = React.useState<Array<SystemCenter.Types.AdditionalFieldView>>([]);
    const [additionalFieldValues, setAdditionalFieldVaules] = React.useState<Array<SystemCenter.Types.AdditionalFieldValue>>([]);

    const errorList = React.useRef<string[]>([]);
    const changedList = React.useRef<string[]>([]);

    const [additionalFieldValuesWorking, setAdditionalFieldValuesWorking] = React.useState<Array<SystemCenter.Types.AdditionalFieldValue>>([]);

    const [status, setStatus] = React.useState<Application.Types.Status>('idle');

    // Note: There only ever should be one key field, but this is so we do not have to rely on that
    const [keyField, setKeyField] = React.useState<SystemCenter.Types.AdditionalFieldView>(undefined);
    const [showExt, setShowExt] = React.useState<boolean>(false);

    const getFields = React.useCallback(() => {
        const filt: Search.IFilter<SystemCenter.Types.AdditionalFieldView>[] = [{
            FieldName: 'ParentTable',
            Operator: '=',
            SearchText: props.ParentTable,
            Type: "string",
            isPivotColumn: false
        }, {
            FieldName: 'IsInfo',
            Operator: '=',
            SearchText: "1",
            Type: "boolean",
            isPivotColumn: false
        }];
        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: filt, OrderBy: 'FieldName', Ascending: true }),
            cache: true,
            async: true
        })
        handle.done((data: string) => { setAdditionalFields(JSON.parse(data)); });
        return handle;
    }, [setAdditionalFields, props.ParentTable, homePath]);

    const getFieldValues = React.useCallback(() => {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done((data: SystemCenter.Types.AdditionalFieldValue[]) => { setAdditionalFieldVaules(data); });
        return handle;
    }, [setAdditionalFieldVaules, props.ID, homePath]);

    const getData = React.useCallback(() => {
        setStatus('loading');
        let fieldHandle = getFields();
        let fieldValueHandle = getFieldValues();
        Promise.all([fieldHandle, fieldValueHandle])
            .then(() => { setStatus('idle') }, () => { setStatus('error') });

        return () => {
            if (fieldHandle.abort != undefined) fieldHandle.abort();
            if (fieldValueHandle.abort != undefined) fieldValueHandle.abort();
        }
    }, [getFields, getFieldValues, setStatus]);

    const addOrUpdateValues = React.useCallback(() => {
        let handle;
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/Array`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(additionalFieldValuesWorking),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => handle = getData());
        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [additionalFieldValuesWorking, getData, homePath]);

    const KeyModalCallback = React.useCallback((newValue: string) => {
        const newFields = [...additionalFieldValuesWorking];
        const alteredID = newFields.findIndex(field => field.AdditionalFieldID === keyField.ID);
        if (alteredID === -1) return;
        newFields[alteredID].Value = newValue;
        setAdditionalFieldValuesWorking(newFields);
    }, [additionalFieldValuesWorking, setAdditionalFieldValuesWorking, keyField]);

    React.useEffect(() => { setAdditionalFieldValuesWorking(_.cloneDeep(additionalFieldValues)); }, [additionalFieldValues]);
    React.useEffect(() => { props.AddlFieldSaveRef.current = addOrUpdateValues; }, [addOrUpdateValues, props.AddlFieldSaveRef]);

    React.useEffect(() => {
        return getData();
    }, [props.ID, props.ParentTable]);

    React.useEffect(() => {
        console.log(additionalFieldValues)
        console.log(additionalFieldValues.length / 2)
        console.log(additionalFieldValues.slice(0, additionalFieldValues.length / 2))
        console.log(additionalFieldValues.slice(additionalFieldValues.length / 2, additionalFieldValues.length))
    }, [additionalFields]);

    React.useEffect(() => {
        if (props.SetErrorList === undefined) return;
        let result: string[] = [];
        additionalFieldValuesWorking.forEach((item, index) => {
            let i = additionalFields.findIndex(fld => fld.ID == item.AdditionalFieldID);
            if (i == -1)
                return;
            if (additionalFields[i].Type == 'integer' && !(item.Value == null || AssetAttributes.isInteger(item.Value)))
                result.push(`Value for ${additionalFields[i].FieldName} must be an integer.`);
        });
        if (!_.isEqual(errorList.current, result)) {
            props.SetErrorList(result);
            errorList.current = result;
        }
    }, [additionalFieldValuesWorking]);

    React.useEffect(() => {
        if (props.SetChangedList === undefined) return;
        let result: string[] = [];
        additionalFieldValuesWorking.forEach((item) => {
            let iFld = additionalFields.findIndex(fld => fld.ID == item.AdditionalFieldID);
            let iWVal = additionalFieldValues.findIndex(val => val.AdditionalFieldID == item.AdditionalFieldID)

            if (iFld == -1 || (iWVal == -1 && item.Value == null))
                return;
            if (iWVal == -1) {
                result.push(`Changes to ${additionalFields[iFld].FieldName} will be discarded.`);
                return;
            }
            if (item.Value == additionalFieldValues[iWVal].Value)
                return;

            result.push(`Changes to ${additionalFields[iFld].FieldName} will be discarded.`);
        });
        if (!_.isEqual(changedList.current, result)) {
            props.SetChangedList(result);
            changedList.current = result;
        }
    }, [additionalFieldValuesWorking]);

    return (
        <div className="row">
            <LoadingScreen Show={status === 'loading'} />
            <ServerErrorIcon Show={status === 'error'} Size={40} Label={'A Server Error Occurred. Could Not Load Additional Fields for this Record. Please Reload the Application.'} />
            <AdditionalFieldsKeyModal KeyField={keyField} SetKeyFieldValue={KeyModalCallback} Show={showExt} SetShow={setShowExt} />
            <div className="col">
                {additionalFields.slice(0, additionalFields.length / 2 + 0.5).map(item =>
                    <AdditionalFieldsValueField Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking} IncludeLabel={true}
                        Setter={setAdditionalFieldValuesWorking}
                        KeyCallback={() => { setShowExt(true); setKeyField(item); }} DisplayKeyInBox={true} />
                )}
            </div>
            <div className="col">
                {additionalFields.slice(additionalFields.length / 2 + 0.5, additionalFields.length + 0.5).map(item =>
                    <AdditionalFieldsValueField Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking} IncludeLabel={true}
                        Setter={setAdditionalFieldValuesWorking}
                        KeyCallback={() => { setShowExt(true); setKeyField(item); }} DisplayKeyInBox={true} />
                )}
            </div>
        </div>);
}

export default AdditionalFieldsProperties;