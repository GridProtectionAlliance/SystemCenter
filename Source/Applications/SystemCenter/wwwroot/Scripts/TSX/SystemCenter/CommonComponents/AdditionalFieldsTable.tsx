//******************************************************************************************************
//  AdditionalFieldsTable.tsx - Gbtc
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
//  04/03/2025 - Gabriel Santos
//       Seperated Into Own File
//
//******************************************************************************************************

import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { LoadingScreen, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { Column, Table } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import * as React from 'react';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { OpenXDA as LocalXDA } from '../global';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
import AdditionalFieldsKeyModal from './AdditionalFieldsKeyModal';
import AdditionalFieldsValueField from './AdditionalFieldsValueField';

declare var homePath: string;

interface IProps {
    ID: number,
    Type: LocalXDA.AdditionalFieldType,
    SaveFieldsCallback: React.MutableRefObject<{ cleanup: () => void, getHandle: () => Promise<void>}>,
    ResetFieldsCallback?: React.MutableRefObject<() => void>,
    SetChangedMessageList?: (messages: string[]) => void,
    SetInvalidMessageList: (messages: string[]) => void,
    SetHasEditPermissions?: (state: boolean) => void,
    HideExternal: boolean
}

function AdditionalFieldsTable(props: IProps): JSX.Element {
    const [additionalFields, setAdditionalFields] = React.useState<Array<SystemCenter.Types.AdditionalFieldView>>([]);
    const [additionalFieldValues, setAdditionalFieldVaules] = React.useState<Array<SystemCenter.Types.AdditionalFieldValue>>([]);

    const [additionalFieldValuesWorking, setAdditionalFieldValuesWorking] = React.useState<Array<SystemCenter.Types.AdditionalFieldValue>>([]);

    const [sortKey, setSortKey] = React.useState<string>('FieldName');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [hasInvalid, setHasInvalid] = React.useState<boolean>(false);
    const [state, setState] = React.useState<Application.Types.Status>('idle');
    const [hover, setHover] = React.useState<(string)>('None');

    // Note: There only ever should be one key field, but this is so we do not have to rely on that
    const [keyField, setKeyField] = React.useState<SystemCenter.Types.AdditionalFieldView>(undefined);
    const [showExt, setShowExt] = React.useState<boolean>(false);

    // View perms are different than write
    const roles = useAppSelector(SelectRoles);
    const hasPermissions = React.useMemo(() => (roles.indexOf('Administrator') >= 0 || roles.indexOf('Engineer') >= 0), [roles]);

    const getFields = React.useCallback(() => {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/${props.Type}/${sortKey}/${(ascending ? '1' : '0')}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((data: Array<SystemCenter.Types.AdditionalFieldView>) => {
            if (props.HideExternal ?? false)
                setAdditionalFields(data.filter(item => item.ExternalDB == null || item.ExternalDB == '' || item.IsKey));
            else
                setAdditionalFields(data);
        });
    }, [props.HideExternal, props.Type, sortKey, ascending]);

    const getFieldValues = React.useCallback(() => {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(setAdditionalFieldVaules);
    }, [props.ID]);

    const keyModalCallback = React.useCallback((newValue: string) => {
        const newFields = _.cloneDeep(additionalFieldValuesWorking);
        const alteredID = newFields.findIndex(field => field.AdditionalFieldID == keyField.ID);
        if (alteredID < 0) {
            newFields.push({ ID: 0, AdditionalFieldID: keyField.ID, ParentTableID: props.ID, Value: newValue })
        } else {
            newFields[alteredID].Value = newValue;
        }
        setAdditionalFieldValuesWorking(newFields);
    }, [additionalFieldValuesWorking, setAdditionalFieldValuesWorking, keyField]);

    React.useEffect(() => { setAdditionalFieldValuesWorking(_.cloneDeep(additionalFieldValues)) }, [additionalFieldValues]);

    React.useEffect(() => {
        if (props.SetChangedMessageList == null) return;

        let result: string[] = [];
        additionalFieldValuesWorking.forEach((item, index) => {
            let iFld = additionalFields.findIndex(fld => fld.ID == item.AdditionalFieldID);
            let iWVal = additionalFieldValues.findIndex(val => val.AdditionalFieldID == item.AdditionalFieldID)

            if (iFld === -1 || (iWVal === -1 && item.Value == null))
                return;
            if (iWVal === -1) {
                result.push(`Changes to \'${additionalFields[iFld].FieldName}\' will be lost.`);
                return;
            }
            if (item.Value == additionalFieldValues[iWVal].Value)
                return;

            result.push(`Changes to \'${additionalFields[iFld].FieldName}\' will be lost.`);
        });

        props.SetChangedMessageList(result);
    }, [additionalFieldValuesWorking]);

    React.useEffect(() => {
        let result = [];
        additionalFieldValuesWorking.forEach((item, index) => {
            let i = additionalFields.findIndex(fld => fld.ID == item.AdditionalFieldID);
            if (i == -1)
                return;
            if (additionalFields[i].Type == 'integer' && !(item.Value == null || AssetAttributes.isInteger(item.Value)))
                result.push(`Value for \'${additionalFields[i].FieldName}\' must be an integer.`)
        });
        setHasInvalid(result.length > 0);
        props.SetInvalidMessageList(result);
    }, [additionalFieldValuesWorking]);

    React.useEffect(() => {
        if (props.SetHasEditPermissions != null)
            props.SetHasEditPermissions(hasPermissions);
    }, [hasPermissions]);

    React.useEffect(() => {
        let fieldHandle = getFields();

        return () => { if (fieldHandle != null && fieldHandle.abort != null) fieldHandle.abort(); }
    }, [sortKey, ascending]);

    React.useEffect(() => {
        let valueHandle = getFieldValues();

        return () => { if (valueHandle != null && valueHandle.abort != null) valueHandle.abort(); }
    }, []);

    React.useEffect(() => {
        let fieldValueHandle: JQuery.jqXHR;
        let fieldHandle: JQuery.jqXHR;

        const getHandle = () => {
            if (!hasPermissions || hasInvalid) return;
            setState('loading');
            return new Promise<void>((resolve, reject) => {
                $.ajax({
                    type: "PATCH",
                    url: `${homePath}api/SystemCenter/AdditionalFieldValue/Array`,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(additionalFieldValuesWorking),
                    dataType: 'json',
                    cache: true,
                    async: true
                }).then(resolve, reject);
            }).then(() => {
                fieldHandle = getFields();
                fieldValueHandle = getFieldValues();
                return Promise.all([fieldHandle, fieldValueHandle]);
            }).then(() => {
                setState('idle');
            }).catch((err) => {
                console.error(err);
                setState('error');
            });;
        }
        const cleanup = () => {
            // Reason we don't cleanup the whole promise chain is because we want the first part to resolve no matter what
            if (fieldHandle != null && fieldHandle.abort != null) fieldHandle.abort();
            if (fieldValueHandle != null && fieldValueHandle.abort != undefined) fieldValueHandle.abort();
        }

        props.SaveFieldsCallback.current = {cleanup: cleanup, getHandle};
    }, [additionalFieldValuesWorking, getFields, getFieldValues, hasPermissions, hasInvalid]);

    React.useEffect(() => {
        if (props.ResetFieldsCallback != null)
            props.ResetFieldsCallback.current = () => setAdditionalFieldValuesWorking(_.cloneDeep(additionalFieldValues));
    }, [additionalFieldValues]);


    if (state === 'error')
        return <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />;

    return (
        <>
            <LoadingScreen Show={state === 'loading'} />
            <Table<SystemCenter.Types.AdditionalFieldView>
                TableClass="table table-hover"
                Data={additionalFields}
                SortKey={sortKey}
                Ascending={ascending}
                OnSort={(d) => {
                    if (d.colKey === sortKey)
                        setAscending(!ascending);
                    else {
                        setAscending(true);
                        setSortKey(d.colKey);
                    }
                }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <Column<SystemCenter.Types.AdditionalFieldView>
                    Key={'FieldName'}
                    AllowSort={true}
                    Field={'FieldName'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Name
                </Column>
                <Column<SystemCenter.Types.AdditionalFieldView>
                    Key={'Type'}
                    AllowSort={true}
                    Field={'Type'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => `${item.Type}${item.IsKey ? " (external key)" : ""}`}
                > Type
                </Column>
                <Column<SystemCenter.Types.AdditionalFieldView>
                    Key={'ExternalDB'}
                    AllowSort={true}
                    Field={'ExternalDB'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Ext Database
                </Column>
                <Column<SystemCenter.Types.AdditionalFieldView>
                    Key={'ExternalTable'}
                    AllowSort={true}
                    Field={'ExternalTable'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Ext Table
                </Column>
                <Column<SystemCenter.Types.AdditionalFieldView>
                    Key={'Searchable'}
                    AllowSort={true}
                    Field={'Searchable'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.Searchable ? <ReactIcons.CheckMark Color="var(--success)" /> : ''}
                > Searchable
                </Column>
                <Column<SystemCenter.Types.AdditionalFieldView>
                    Key={'Value'}
                    AllowSort={false}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => <>
                        <AdditionalFieldsValueField Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking}
                            Setter={(val: SystemCenter.Types.AdditionalFieldValue[]) => { setAdditionalFieldValuesWorking(val) }} />
                    </>}
                > Value
                </Column>
                <Column<SystemCenter.Types.AdditionalFieldView>
                    Key={'IsKey'}
                    AllowSort={false}
                    Field={'IsKey'}
                    HeaderStyle={{ width: '100px' }}
                    RowStyle={{ width: '100px', paddingLeft: '0px' }}
                    Content={({ item }) =>
                        item.IsKey ?
                            <>
                                <button
                                    data-tooltip={`${item.ID}_edit`}
                                    onMouseEnter={() => setHover(`${item.ID}_edit`)}
                                    onMouseLeave={() => setHover('None')}
                                    className="btn btn-sm pull-left" onClick={(e) => {
                                        e.preventDefault();
                                        setShowExt(true);
                                        setKeyField(item);
                                    }}><ReactIcons.Pencil Color="var(--danger)" Size={20} /></button>
                                <button
                                    data-tooltip={`${item.ID}_delete`}
                                    onMouseEnter={() => setHover(`${item.ID}_delete`)}
                                    onMouseLeave={() => setHover('None')}
                                    className="btn btn-sm pull-right" onClick={(e) => {
                                        e.preventDefault();
                                        keyModalCallback(null);
                                    }}><ReactIcons.CrossMark Color="var(--danger)" Size={20} /></button>
                            </> : null}
                > <p></p>
                </Column>
            </Table>
            <AdditionalFieldsKeyModal KeyField={keyField} SetKeyFieldValue={keyModalCallback} Show={showExt} SetShow={setShowExt} />
            <ToolTip Show={hover.match(/_edit$/) != null} Position={'left'} Target={hover}>
                Select Key Field Value
            </ToolTip>
            <ToolTip Show={hover.match(/_delete$/) != null} Position={'left'} Target={hover}>
                Clear Key Field Value
            </ToolTip>
        </>);
}

export default AdditionalFieldsTable;