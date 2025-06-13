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
    FieldValues: SystemCenter.Types.AdditionalFieldValue[],
    SetValues: (value: SystemCenter.Types.AdditionalFieldValue, field: SystemCenter.Types.AdditionalField) => void
    HideExternal: boolean,
    LoadState: Application.Types.Status
}

function AdditionalFieldsTable(props: IProps): JSX.Element {
    const [additionalFields, setAdditionalFields] = React.useState<Array<SystemCenter.Types.AdditionalFieldView>>([]);

    const [sortKey, setSortKey] = React.useState<string>('FieldName');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [hover, setHover] = React.useState<string>('None');
    const [fieldState, setFieldState] = React.useState < Application.Types.Status>('idle')
    const [keyField, setKeyField] = React.useState<SystemCenter.Types.AdditionalFieldView>(undefined);
    const [showModal, setShowModal] = React.useState<boolean>(false);


    const keyModalCallback = React.useCallback((newValue: string) => {
        let val = props.FieldValues.find(field => field.AdditionalFieldID == keyField.ID);
        if (val == null) {
            val = { ID: 0, AdditionalFieldID: keyField.ID, ParentTableID: props.ID, Value: newValue };
        } else val.Value = newValue;
        props.SetValues(val, keyField);
        setKeyField(null);
    }, [props.SetValues, props.FieldValues, keyField, props.ID]);

    React.useEffect(() => {
        setFieldState('loading')

        const fieldHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/${props.Type}/${sortKey}/${(ascending ? '1' : '0')}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        fieldHandle.done((data: Array<SystemCenter.Types.AdditionalFieldView>) => {
            setFieldState('idle')
            if (props.HideExternal ?? false)
                setAdditionalFields(data.filter(item => item.ExternalDB == null || item.ExternalDB == '' || item.IsKey));
            else
                setAdditionalFields(data);
        }).fail(() => setFieldState('error'));

        return () => { if (fieldHandle != null && fieldHandle.abort != null) fieldHandle.abort(); }
    }, [sortKey, ascending, props.Type, props.HideExternal]);


    if (props.LoadState === 'error' || fieldState === 'error')
        return <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />;

    return (
        <>
            <LoadingScreen Show={props.LoadState === 'loading' || fieldState === 'loading'} />
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
                Selected={() => false}
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
                        <AdditionalFieldsValueField Field={item} ParentTableID={props.ID} Values={props.FieldValues}
                            Setter={(v) => props.SetValues(v.find(x => x.AdditionalFieldID == item.ID), item)} />
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
                                        setKeyField(item);
                                        setShowModal(true);
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
            <AdditionalFieldsKeyModal KeyField={keyField} SetKeyFieldValue={keyModalCallback} Show={showModal} SetShow={setShowModal} />
            <ToolTip Show={hover.match(/_edit$/) != null} Position={'left'} Target={hover}>
                Select Key Field Value
            </ToolTip>
            <ToolTip Show={hover.match(/_delete$/) != null} Position={'left'} Target={hover}>
                Clear Key Field Value
            </ToolTip>
        </>);
}

export default AdditionalFieldsTable;