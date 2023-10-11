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
import { SystemCenter, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { LoadingIcon, Modal, ServerErrorIcon, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import Table from '@gpa-gemstone/react-table';
import { CrossMark, HeavyCheckMark, Pencil, Warning as WarningIcon } from '@gpa-gemstone/gpa-symbols'

declare var homePath: string;
declare type AdditionalFieldType = 'Meter' | 'Location' | 'Customer' | 'Company' | 'ValueListGroup' | 'Asset' | OpenXDA.Types.AssetTypeName;

interface IProps {
    ID: number,
    Type: AdditionalFieldType,
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

    // Note: There only ever should be one key field, but this is so we do not have to rely on that
    const [keyField, setKeyField] = React.useState<SystemCenter.Types.AdditionalFieldView>(undefined);
    // Key Modal Controls and Vars
    const [showExt, setShowExt] = React.useState<('hide'|'ext'|'fail')>('hide');
    const [externalData, setExternalData] = React.useState<any[]>(undefined);
    const [selectedExternal, setSelectedExternal] = React.useState<any>(undefined);
    const [ascExt, setAscExt] = React.useState<boolean>(false);
    const [sortExt, setSortExt] = React.useState<string>("");

    React.useEffect(() => {
        // This line autosaves data on navigation away via props.ID so that anything unsaved is saved before it goes away
        if (HasValueChanged() && !HasInvalidChanges() && (props.InnerOnly ?? false))
            addOrUpdateValues();
        return getData();
    }, [props.ID, props.Type, props.Tab]);

    React.useEffect(() => { setAdditionalFieldValuesWorking(additionalFieldValues) }, [additionalFieldValues])

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
                setAdditionalFields(data.filter(item => item.ExternalDB == null || item.ExternalDB == ''));
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

    const getExternalData = React.useCallback((keyField: SystemCenter.Types.AdditionalFieldView) => {
        setKeyField(keyField);
        if (keyField.ExternalDBTableID == null) return;
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/extDBTables/RetrieveTable/${keyField.ExternalDBTableID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((extData: any[]) => {
            if (extData != null && extData.length !== 0) {
                setShowExt('ext');
                setExternalData(extData);
            } else
                setShowExt('fail');
        });
        handle.fail(() => {
            setShowExt('fail');
        });
        return handle;
    }, [homePath, setExternalData]);

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
        <Table<SystemCenter.Types.AdditionalFieldView>
            cols={[
                { key: 'FieldName', field: 'FieldName', label: 'Field Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                {
                    key: 'ExternalDB', field: 'ExternalDB', label: (props.HideExternal ?? false) ? '' : 'Ext DB', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => {
                        return (props.HideExternal ?? false) ? '' : item.ExternalDB
                    }
                },
                { key: 'Type', field: 'Type', label: 'Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                {
                    key: 'Searchable', label: 'Searchable', field: 'Searchable', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => {
                        return item.Searchable ? HeavyCheckMark : ''
                    }
                },
                {
                    key: 'IsKey', label: 'Is Key Field', field: 'IsKey', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => {
                        return item.IsKey ? HeavyCheckMark : ''
                    }
                },
                {
                    key: 'Value', label: 'Value', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => {
                        return (
                            <div className="form-inline">
                                <div className="form-group">
                                    <ValueField Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking}
                                        Setter={(val: SystemCenter.Types.AdditionalFieldValue[]) => setAdditionalFieldValuesWorking(val)} />
                                    {item.IsKey ? <button className="btn btn-sm pull-right" onClick={(e) => {
                                        e.preventDefault();
                                        const handle = getExternalData(item);
                                        return () => { if (handle != null && handle.abort != null) handle.abort(); };
                                    }}>{Pencil}</button> : null}
                                </div>
                            </div>
                        );
                    }
                },


            ]}
            tableClass="table table-hover"
            data={additionalFields}
            sortKey={sortKey}
            ascending={ascending}
            onSort={(d) => {
                if (d.colKey === 'EditButton' || d.colKey === 'DeleteButton' || d.colKey === 'IsSecure')
                    return;

                if (d.colKey === sortKey)
                    setAscending(!ascending);
                else {
                    setAscending(true);
                    setSortKey(d.colKey);
                }
            }}
            onClick={() => { }}
            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
            rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
            selected={() => false}
        />);

    let keyModal = (
        <>
            <Modal Title={"Select External Record to Key to Local Record"} ShowCancel={true} ShowX={true} CallBack={(conf) => {
                setShowExt('hide');
                if (conf) {
                    const newFields = [...additionalFieldValuesWorking];
                    const alteredID = newFields.findIndex(field => field.AdditionalFieldID === keyField.ID);
                    if (alteredID === -1) return;
                    newFields[alteredID].Value = selectedExternal[keyField.FieldName];
                    setAdditionalFieldValuesWorking(newFields);
                }
            }} Show={showExt === 'ext'} Size={'xlg'}>
                {(externalData == null || externalData.length === 0) ? null :
                    <Table<any>
                        cols={
                            Object.keys(externalData[0]).map((field: string) => {
                                return { key: field, field: field, label: field }
                            })}
                        tableClass="table table-hover"
                        data={externalData}
                        sortKey={sortExt}
                        ascending={ascExt}
                        onSort={(d) => {
                            if (d.colKey === sortExt)
                                setAscExt(!ascExt);
                            else {
                                setAscExt(true);
                                setSortExt(d.colKey);
                            }
                        }}
                        onClick={(d) => { setSelectedExternal(d.row); }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                        tbodyStyle={{ display: 'block', width: '100%', overflowX: 'scroll' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                        selected={(item) => _.isEqual(item, selectedExternal)} />
                }
            </Modal>
            <Modal Title={'External Query Failure'} ConfirmBtnClass={'btn btn-secondary'} ConfirmText={'Close'}
                CallBack={() => { setShowExt('hide'); }} Show={showExt === 'fail'} ShowCancel={false}>
                <p>Could not query external database table associated with this field. Please contact your administrator.</p>
            </Modal> 
        </>
    )

    if (props.InnerOnly ?? false) return (
        <>
            <h4 style={{ width: '100%', padding: '10px' }}>Additional Fields: </h4>
            {tableComponent}
            {keyModal}
        </>);

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215, height: '100%'}}>
            <div className="card-header">
                <h4>Additional Fields:</h4>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                {tableComponent}
            </div>
            <div className="card-footer">  
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (!HasValueChanged() || HasInvalidChanges() ? ' disabled' : '')} onClick={() => { if (HasValueChanged() && !HasInvalidChanges()) addOrUpdateValues(); }}
                        onMouseEnter={() => setHover('Save')} onMouseLeave={() => setHover('None')} data-tooltip={'SaveValues'}>Update</button>
                    <ToolTip Show={hover == 'Save' && (HasValueChanged())} Position={'top'} Theme={'dark'} Target={"SaveValues"}>
                        {HasValueChanged() && !HasInvalidChanges() ? ChangedValues(false) : null}
                        {HasValueChanged() && HasInvalidChanges() ? InvalidChanges() : null}
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + (!(HasValueChanged()) ? ' disabled' : '')} onClick={() => { if (HasValueChanged()) getFieldValues(); }} onMouseEnter={() => setHover('Clear')}
                        onMouseLeave={() => setHover('None')} data-tooltip={'Clear'}>Reset</button>
                    <ToolTip Show={hover == 'Clear' && (HasValueChanged())} Position={'top'} Theme={'dark'} Target={"Clear"}>
                        {HasValueChanged() ? ChangedValues(true) : null}
                    </ToolTip>
                </div>
            </div>
            {keyModal}
        </div>);
}

export default AdditionalFieldsWindow;

interface IValueFieldProps {
    Field: SystemCenter.Types.AdditionalField,
    Values: SystemCenter.Types.AdditionalFieldValue[],
    ParentTableID: number,
    Setter: (val: SystemCenter.Types.AdditionalFieldValue[]) => void
}
const ValueField = (props: IValueFieldProps) => {
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

    if (props.Field.Type == 'number' || props.Field.Type == 'integer')
        return <Input<SystemCenter.Types.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={''} Type={'number'} Setter={Setter} Feedback={props.Field.FieldName + ' requires an integer value.'} />
    if (props.Field.Type == 'string')
        return <Input<SystemCenter.Types.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={''} Type={'text'} Setter={Setter} />
    if (props.Field.Type == 'boolean')
        return <CheckBox<SystemCenter.Types.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Label={''} Setter={Setter} />
    return <Select<SystemCenter.Types.AdditionalFieldValue> EmptyOption={true} Record={props.Values[valueIndex]} Field={'Value'} Label={''} Setter={Setter} Options={valueListItems.map(x => ({ Value: x.ID.toString(), Label: x.Value }))} />
}
