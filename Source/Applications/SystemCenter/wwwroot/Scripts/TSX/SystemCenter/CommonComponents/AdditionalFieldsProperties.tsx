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
//  10/23/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { LoadingIcon, Search, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import AdditionalFieldsKeyModal from './AdditionalFieldsKeyModal';
import AdditionalFieldsValueField from './AdditionalFieldsValueField';
import { OpenXDA } from '../global';

declare var homePath: string;

interface IProps {
    ID: number,
    ParentTable: OpenXDA.AdditionalFieldType,
    SingleColumn?: boolean,
    AddlFieldSaveRef: React.MutableRefObject<() => JQuery.jqXHR<void>>,
    ResetAddlFieldRef: React.MutableRefObject<() => void>,
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
        const fieldHandle = getFields();
        const fieldValueHandle = getFieldValues();
        Promise.all([fieldHandle, fieldValueHandle])
            .then(() => { setStatus('idle') }, () => { setStatus('error') });

        return () => {
            if (fieldHandle.abort != undefined) fieldHandle.abort();
            if (fieldValueHandle.abort != undefined) fieldValueHandle.abort();
        }
    }, [getFields, getFieldValues, setStatus]);

    const addOrUpdateValues = React.useCallback(() => {
        setStatus('loading');
        return $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/Array`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(additionalFieldValuesWorking),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => {
            const fieldHandle = getFields();
            const fieldValueHandle = getFieldValues();
            return Promise.all([fieldHandle, fieldValueHandle]);
        }).done(() => {
            setStatus('idle');
            props.SetChangedList([]);
            changedList.current = [];
        }).fail(() => { setStatus('error') })
    }, [additionalFieldValuesWorking, getFields, getFieldValues, setStatus, homePath]);

    const ResetCallback = React.useCallback(() => {
        setAdditionalFieldValuesWorking(_.cloneDeep(additionalFieldValues));
    }, [additionalFieldValues, setAdditionalFieldValuesWorking]);

    React.useEffect(ResetCallback, [additionalFieldValues]);
    React.useEffect(() => { props.ResetAddlFieldRef.current = ResetCallback }, [ResetCallback, props.ResetAddlFieldRef]);
    React.useEffect(() => { props.AddlFieldSaveRef.current = addOrUpdateValues; }, [addOrUpdateValues, props.AddlFieldSaveRef]);

    React.useEffect(() => {
        return getData();
    }, [props.ID, props.ParentTable]);

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

    let columnBody;
    if (props.SingleColumn ?? false) columnBody = (
        <div className="col">
            {additionalFields.map((item,i) =>
                <AdditionalFieldsValueField key={i} Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking} IncludeLabel={true}
                    Setter={setAdditionalFieldValuesWorking} />
            )}
        </div>);
    else columnBody = (
        <>
            <div className="col">
                {additionalFields.slice(0, additionalFields.length / 2 + 0.5).map((item, i) =>
                    <AdditionalFieldsValueField key={`l_${i}`} Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking} IncludeLabel={true}
                        Setter={setAdditionalFieldValuesWorking} />
                )}
            </div>
            <div className="col">
                {additionalFields.slice(additionalFields.length / 2 + 0.5, additionalFields.length + 0.5).map((item, i) =>
                    <AdditionalFieldsValueField key={`r_${i}`} Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking} IncludeLabel={true}
                        Setter={setAdditionalFieldValuesWorking} />
                )}
            </div>
        </>);


    return (
        <div className="row">
            <LoadingIcon Show={status === 'loading'} />
            <ServerErrorIcon Show={status === 'error'} Size={40} Label={'A Server Error Occurred. Could Not Load Additional Fields for this Record. Please Reload the Application.'} />
            {status === 'idle' ? columnBody : null}
        </div>);
}

export default AdditionalFieldsProperties;