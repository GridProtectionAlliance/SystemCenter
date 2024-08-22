//******************************************************************************************************
//  AdditionalFieldsWindow.tsx - Gbtc
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
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { LoadingIcon, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table';
import { CrossMark, HeavyCheckMark, Pencil, Warning as WarningIcon } from '@gpa-gemstone/gpa-symbols'
import AdditionalFieldsKeyModal from './AdditionalFieldsKeyModal';
import AdditionalFieldsValueField from './AdditionalFieldsValueField';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

interface IProps {
    ID: number,
    Type: LocalXDA.AdditionalFieldType,
    Tab?: string,
    //Change properties of page
    InnerOnly?: boolean,
    HideExternal?: boolean
}

function AdditionalFieldsWindow(props: IProps): JSX.Element {
    const [additionalFields, setAdditionalFields] = React.useState<Array<SystemCenter.Types.AdditionalFieldView>>([]);
    const [additionalFieldValues, setAdditionalFieldVaules] = React.useState<Array<SystemCenter.Types.AdditionalFieldValue>>([]);

    const [additionalFieldValuesWorking, setAdditionalFieldValuesWorking] = React.useState<Array<SystemCenter.Types.AdditionalFieldValue>>([]);

    const [sortKey, setSortKey] = React.useState<string>('FieldName');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const [state, setState] = React.useState<'idle' | 'loading' | 'error'>('idle');
    const [hover, setHover] = React.useState<('None' | 'Save' | 'Clear')>('None');

    const [hoverEdit, setHoverEdit] = React.useState<(string)>('None');
    const [hoverDelete, setHoverDelete] = React.useState<(string)>('None');

    // Note: There only ever should be one key field, but this is so we do not have to rely on that
    const [keyField, setKeyField] = React.useState<SystemCenter.Types.AdditionalFieldView>(undefined);
    const [showExt, setShowExt] = React.useState<boolean>(false);

    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        // This line autosaves data on navigation away via props.ID so that anything unsaved is saved before it goes away
        if (HasValueChanged() && !HasInvalidChanges() && (props.InnerOnly ?? false))
            addOrUpdateValues();
        return getData();
    }, [props.ID, props.Type, props.Tab]);

    React.useEffect(() => { setAdditionalFieldValuesWorking(_.cloneDeep(additionalFieldValues)) }, [additionalFieldValues])

    React.useEffect(() => {
        let h = getFields();

        return () => { if (h.abort != undefined) h.abort() }
    }, [sortKey, ascending]);

    // Should save while typing in the fields (assuming edit mode and save button is hidden due to not returning these elements), timeout to avoid hitting the server with too many requests
    React.useEffect(() => {
        let handle: any = null;
        if (HasValueChanged() && !HasInvalidChanges() && (props.InnerOnly ?? false))
            handle = setTimeout(() => addOrUpdateValues(), 500);
        return () => { if (handle !== null) clearTimeout(handle); };
    }, [additionalFieldValuesWorking]);

    function getData() {
        setState('loading');
        let fieldHandle = getFields();
        let fieldValueHandle = getFieldValues();
        Promise.all([fieldHandle, fieldValueHandle])
            .then(() => { setState('idle') }, () => { setState('error') });

        return () => {
            if (fieldHandle.abort != undefined) fieldHandle.abort();
            if (fieldValueHandle.abort != undefined) fieldValueHandle.abort();
        }
    }

    function getFields(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/${props.Type}/${sortKey}/${(ascending? '1' : '0')}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: Array<SystemCenter.Types.AdditionalFieldView>) => {
            if (props.HideExternal ?? false)
                setAdditionalFields(data.filter(item => item.ExternalDB == null || item.ExternalDB == '' || item.IsKey));
            else
                setAdditionalFields(data);
        });

        return handle;
    }

    function getFieldValues(): JQuery.jqXHR {

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: Array<SystemCenter.Types.AdditionalFieldValue>) => {
            setAdditionalFieldVaules(data);
        });

        return handle;
    }

    function addOrUpdateValues(): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/Array`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(additionalFieldValuesWorking),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });
    }

    function HasValueChanged(): boolean {

        return additionalFieldValuesWorking.some((item, index) => {
            let i = additionalFieldValues.findIndex(val => val.AdditionalFieldID == item.AdditionalFieldID)
            if (i == -1 && item.Value == null)
                return false;
            if (i == -1)
                return true;
            return item.Value != additionalFieldValues[i].Value;
        });
    }

    function ChangedValues(warning: boolean): Array<JSX.Element> {

        let result: JSX.Element[] = [];
        additionalFieldValuesWorking.forEach((item,index) => {
            let iFld = additionalFields.findIndex(fld => fld.ID == item.AdditionalFieldID);
            let iWVal = additionalFieldValues.findIndex(val => val.AdditionalFieldID == item.AdditionalFieldID)

            if (iFld == -1 || (iWVal == -1 && item.Value == null))
                return;
            if (iWVal == -1) {
                result.push((warning ? <p key={index}> {WarningIcon} Changes to '{additionalFields[iFld].FieldName}' will be lost.</p> :
                    <p key={index}> {HeavyCheckMark} Changes to '{additionalFields[iFld].FieldName}' are valid.</p>));
                return;
            }
            if (item.Value == additionalFieldValues[iWVal].Value)
                return;

            result.push((warning ? <p key={index}> {WarningIcon} Changes to '{additionalFields[iFld].FieldName}' will be lost.</p> :
                <p key={index}> {HeavyCheckMark} Changes to '{additionalFields[iFld].FieldName}' are valid.</p>));
        });

        return result;
    }

    function HasInvalidChanges(): boolean {
        return additionalFieldValuesWorking.some(item => {
            let i = additionalFields.findIndex(fld => fld.ID == item.AdditionalFieldID);
            if (i == -1)
                return false;
            if (additionalFields[i].Type == 'integer')
                return !(item.Value == null || AssetAttributes.isInteger(item.Value))
            return false;
        });
    }

    function InvalidChanges(): Array<JSX.Element> {
        if (!HasInvalidChanges())
            return []
        let result = [];
        additionalFieldValuesWorking.forEach((item,index) => {
            let i = additionalFields.findIndex(fld => fld.ID == item.AdditionalFieldID);
            if (i == -1)
                return;
            if (additionalFields[i].Type == 'integer' && !(item.Value == null || AssetAttributes.isInteger(item.Value)))
                result.push(<p key={index}> {CrossMark} Value for '{additionalFields[i].FieldName}' must be an integer.</p>)
        });
        return result;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    const KeyModalCallback = React.useCallback((newValue: string) => {
        const newFields = _.cloneDeep(additionalFieldValuesWorking);
        const alteredID = newFields.findIndex(field => field.AdditionalFieldID == keyField.ID);
        if (alteredID < 0) {
            newFields.push({ ID: 0, AdditionalFieldID: keyField.ID, ParentTableID: props.ID, Value: newValue })
        } else {
            newFields[alteredID].Value = newValue;
        }
        setAdditionalFieldValuesWorking(newFields);
    }, [additionalFieldValuesWorking, setAdditionalFieldValuesWorking, keyField]);

        if (state == 'loading' && !(props.InnerOnly ?? false))
        return (
            <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <LoadingIcon Show={true} Size={40} />
                </div>
            </div>);


    if (state == 'error')
        return (
            <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                </div>
            </div>);

    let tableComponent = (
        <ReactTable.Table<SystemCenter.Types.AdditionalFieldView>
            TableClass="table table-hover"
            Data={additionalFields}
            SortKey={sortKey}
            Ascending={ascending}
            OnSort={(d) => {
                if (d.colKey === 'EditButton' || d.colKey === 'DeleteButton' || d.colKey === 'IsSecure')
                    return;

                if (d.colKey === sortKey)
                    setAscending(!ascending);
                else {
                    setAscending(true);
                    setSortKey(d.colKey);
                }
            }}
            TableStyle={{ padding: 0, width: '100%', height: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
            TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
            RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
            Selected={(item) => false}
            KeySelector={(item) => item.ID}
        >
            <ReactTable.Column<SystemCenter.Types.AdditionalFieldView>
                Key={'FieldName'}
                AllowSort={true}
                Field={'FieldName'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
            > Field Name
            </ReactTable.Column>
            <ReactTable.Column<SystemCenter.Types.AdditionalFieldView>
                Key={'ExternalDB'}
                AllowSort={true}
                Field={'ExternalDB'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
            > Ext Database
            </ReactTable.Column>
            <ReactTable.Column<SystemCenter.Types.AdditionalFieldView>
                Key={'ExternalTable'}
                AllowSort={true}
                Field={'ExternalTable'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
            > Ext Table
            </ReactTable.Column>
            <ReactTable.Column<SystemCenter.Types.AdditionalFieldView>
                Key={'Type'}
                AllowSort={true}
                Field={'Type'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
                Content={({ item }) => `${item.Type}${item.IsKey ? " (external key)" : ""}`}
            > Type
            </ReactTable.Column>
            <ReactTable.Column<SystemCenter.Types.AdditionalFieldView>
                Key={'Searchable'}
                AllowSort={true}
                Field={'Searchable'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
                Content={({ item }) => item.Searchable ? HeavyCheckMark : '' }
            > Searchable
            </ReactTable.Column>
            <ReactTable.Column<SystemCenter.Types.AdditionalFieldView>
                Key={'Value'}
                AllowSort={true}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
                Content={({ item }) => <>
                    <AdditionalFieldsValueField Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking}
                        Setter={(val: SystemCenter.Types.AdditionalFieldValue[]) => {setAdditionalFieldValuesWorking(val)}} />
                </> }
            > Value
            </ReactTable.Column>
            <ReactTable.Column<SystemCenter.Types.AdditionalFieldView>
                Key={'IsKey'}
                AllowSort={false}
                Field={'IsKey'}
                HeaderStyle={{ width: '100px' }}
                RowStyle={{ width: '100px' }}
                Content={({ item }) =>
                    item.IsKey ?
                        <>
                            <button data-tooltip={`${item.ID}_edit`} onMouseEnter={() => setHoverEdit(`${item.ID}_edit`)} onMouseLeave={() => setHoverEdit('None')}
                                className="btn btn-sm pull-left" onClick={(e) => {
                                    e.preventDefault();
                                    setShowExt(true);
                                    setKeyField(item);
                                }}>{Pencil}</button>
                            <button data-tooltip={`${item.ID}_delete`} onMouseEnter={() => setHoverDelete(`${item.ID}_delete`)} onMouseLeave={() => setHoverDelete('None')}
                                className="btn btn-sm pull-right" onClick={(e) => {
                                    e.preventDefault();
                                    KeyModalCallback(null);
                                }}>{CrossMark}</button>
                        </> : null}
            > <p></p>
            </ReactTable.Column>
        </ReactTable.Table>
    );

    if (props.InnerOnly ?? false) return (
        <>
            <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                <div className={'row'} style={{ flex: 1, overflow: 'hidden' }}>
                    <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                        {tableComponent}
                        <AdditionalFieldsKeyModal KeyField={keyField} SetKeyFieldValue={KeyModalCallback} Show={showExt} SetShow={setShowExt} />
                    </div>
                </div>
            </div>
        </>);

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <h4>Additional Fields:</h4>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                {tableComponent}
                <ToolTip Show={hoverEdit !== 'None'} Position={'left'} Theme={'dark'} Target={hoverEdit}>
                    Select Key Field Value
                </ToolTip>
                <ToolTip Show={hoverDelete !== 'None'} Position={'left'} Theme={'dark'} Target={hoverDelete}>
                    Clear Key Field Value
                </ToolTip>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (!HasValueChanged() || HasInvalidChanges() ? ' disabled' : '')} onClick={() => { if (HasValueChanged() && !HasInvalidChanges()) addOrUpdateValues(); }}
                        onMouseEnter={() => setHover('Save')} onMouseLeave={() => setHover('None')} data-tooltip={'SaveValues'}>Save Changes</button>
                    <ToolTip Show={hover == 'Save' && (HasValueChanged() || !hasPermissions())} Position={'top'} Theme={'dark'} Target={"SaveValues"}>
                        {HasValueChanged() && !HasInvalidChanges() ? ChangedValues(false) : null}
                        {HasValueChanged() && HasInvalidChanges() ? InvalidChanges() : null}
                        {!hasPermissions() ? <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p> : null}
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-warning" + (!(HasValueChanged()) ? ' disabled' : '')} onClick={() => { if (HasValueChanged()) getFieldValues(); }} onMouseEnter={() => setHover('Clear')}
                        onMouseLeave={() => setHover('None')} data-tooltip={'Clear'}>Clear Changes</button>
                    <ToolTip Show={hover == 'Clear' && (HasValueChanged())} Position={'top'} Theme={'dark'} Target={"Clear"}>
                        {HasValueChanged() ? ChangedValues(true) : null}
                    </ToolTip>
                </div>
            </div>
            <AdditionalFieldsKeyModal KeyField={keyField} SetKeyFieldValue={KeyModalCallback} Show={showExt} SetShow={setShowExt} />
        </div>);
}

export default AdditionalFieldsWindow;