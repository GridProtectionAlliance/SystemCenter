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
import {SystemCenter, OpenXDA } from '../global';
import AssetAttributes from '../AssetAttribute/Asset';

import { LoadingScreen, Modal, Search, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import Table from '@gpa-gemstone/react-table';

declare var homePath: string;
declare type AdditionalFieldType = 'Meter' | 'Location' | 'Customer'| 'Company' | 'Line' | 'Bus' | 'Breaker' | 'Transformer' | 'LineSegment' | 'CapacitorBank' | 'Asset' | 'CapacitorBankRelay'
interface IProps { ID: number, Type: AdditionalFieldType, Tab: string }

function AdditionalFieldsWindow(props: IProps): JSX.Element {

    const [valueListGroups, setValueListGroups] = React.useState<Array<SystemCenter.ValueListGroup>>([]);
    const [externalDBs, setExternalDBs] = React.useState<Array<string>>([]);
    const [externalDBTables, setExternalDBTables] = React.useState<Array<string>>([]);

    const [additionalFields, setAdditionalFields] = React.useState<Array<SystemCenter.AdditionalField>>([]);
    const [additionalFieldValues, setAdditionalFieldVaules] = React.useState<Array<SystemCenter.AdditionalFieldValue>>([]);

    const [additionalFieldValuesWorking, setAdditionalFieldValuesWorking] = React.useState<Array<SystemCenter.AdditionalFieldValue>>([]);
    const [edit, setEdit] = React.useState<boolean>(false);

    const [sortFields, setSortField] = React.useState<keyof SystemCenter.AdditionalField>('FieldName');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const [newField, setNewField] = React.useState<SystemCenter.AdditionalField>({ ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false });

    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showLoading, setShowLoading] = React.useState<boolean>(false)
    const [showEdit, setShowEdit] = React.useState<boolean>(false)

    const [hover, setHover] = React.useState<('None' | 'Save' | 'New' | 'View' | 'Clear' | 'ExternalDB' | "Cancel" | "Confirm" )>('None');

    const [newFieldNameValid, setNewFieldNameValid] = React.useState<boolean>(true);

    const EmptyField: SystemCenter.AdditionalField = { ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false };

    React.useEffect(() => {
        return getData();
    }, [props.ID, props.Type, props.Tab]);

    React.useEffect(() => { setAdditionalFieldValuesWorking(additionalFieldValues) }, [additionalFieldValues])

    React.useEffect(() => {
        let h = getFields();

        return () => { if (h.abort != undefined) h.abort() }
    }, [sortFields, ascending])

    React.useEffect(() => {
        let h = validateFieldName();
        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [newField.ID, newField.FieldName])

    function getData() {
        let handle1 = getFields();
        let handle2 = getFieldValues();
        let handle3 = getValueLists();
        let handle4 = getExternalDataBase();
        let handle5 = getExternalDataBaseTables();
        setNewField({ ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false });

        return () => {
            if (handle1.abort != undefined) handle1.abort();
            if (handle2.abort != undefined) handle2.abort();
            if (handle3.abort != undefined) handle3.abort();
            if (handle4.abort != undefined) handle4.abort();
            if (handle5.abort != undefined) handle5.abort();
        }
    }

    function getFields(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/${props.Type}/${sortFields}/${(ascending? '1' : '0')}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: Array<SystemCenter.AdditionalField>) => {
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

        handle.done((data: Array<SystemCenter.AdditionalFieldValue>) => {
            setAdditionalFieldVaules(data);
        });

        return handle;
    }

    function getValueLists(): JQuery.jqXHR {

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueListGroup`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: Array<SystemCenter.ValueListGroup>) => {
            setValueListGroups(data);
        });

        return handle;
    }

    function getExternalDataBase(): JQuery.jqXHR {

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ExternalDataBase`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: Array<any>) => {
            setExternalDBs(data.map(item => item.ExternalDB));
        });

        return handle;
    }

    function getExternalDataBaseTables(): JQuery.jqXHR {

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/ExternalDBTables/TableName/0`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: string) => {
            let d = JSON.parse(data);
            setExternalDBTables(d.map(item => item.TableName));
        });

        return handle;
    }

    function validateFieldName(): JQuery.jqXHR<string> {
        if (newField.FieldName == null || newField.FieldName.length == 0)
            return null;

        let h = $.ajax({
            type: "Post",
            url: `${homePath}api/SystemCenter/AdditionalField/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: [{ FieldName: 'FieldName', Operator: "=", SearchText: newField.FieldName, Type: 'string' } as Search.IFilter<SystemCenter.AdditionalField>], OrderBy: "FieldName", Ascending: true }),
            cache: false,
            async: true
        });
        h.done((d: string) => {
            let fields = JSON.parse(d);

            if (fields.length == 0)
                setNewFieldNameValid(true);
            else if (fields.length > 1)
                setNewFieldNameValid(false);
            else if (fields[0].ID == newField.ID)
                setNewFieldNameValid(true);
            else
                setNewFieldNameValid(false);

        });

        return h;
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

    function addNewField(): void {
        setShowLoading(true)
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalField/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(newField),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
            setShowLoading(false);
        });
    }

    function deleteField(field: SystemCenter.AdditionalField): void {
        setShowLoading(true);
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/AdditionalField/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(field),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
            setShowLoading(false);
        });

    }

    function ValidField(): boolean {
        return newFieldNameValid &&  newField.FieldName != null && newField.FieldName.length > 0 &&
            (newField.ExternalDB == null || newField.ExternalDB.length == 0 ||
                (!(newField.ExternalDBTable == null || newField.ExternalDBTable.length == 0) &&
                    !(newField.ExternalDBTableKey == null || newField.ExternalDBTableKey.length == 0)));
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
                result.push((warning ? <p key={index}> <i style={{ marginRight: '10px', color: '#ffc107' }} className="fa fa-exclamation-triangle"></i> Changes to '{additionalFields[iFld].FieldName}' will be lost.</p> :
                    <p key={index}> <i style={{ marginRight: '10px', color: '#28A745' }} className="fa fa-check-circle"></i> Changes to '{additionalFields[iFld].FieldName}' are valid.</p>));
                return;
            }
            if (item.Value == additionalFieldValues[iWVal].Value)
                return;

            result.push((warning ? <p key={index}> <i style={{ marginRight: '10px', color: '#ffc107' }} className="fa fa-exclamation-triangle"></i> Changes to '{additionalFields[iFld].FieldName}' will be lost.</p> :
                <p key={index}> <i style={{ marginRight: '10px', color: '#28A745' }} className="fa fa-check-circle"></i> Changes to '{additionalFields[iFld].FieldName}' are valid.</p>));
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
                result.push(<p key={index}> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Value for '{additionalFields[i].FieldName}' is required to be an integer.</p>)
        });
        return result;
    }

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Additional Fields:</h4>
                    </div>
                    <div className="col">
                        {(edit) ?
                            <button className="btn btn-default pull-right" data-tooltip='View' onClick={() => { setEdit(false); getFieldValues(); }} onMouseEnter={() => setHover('View')} onMouseLeave={() => setHover('None')}>View</button> :
                            <button className="btn btn-primary pull-right" onClick={() => setEdit(true)}>Edit</button>}
                        <ToolTip Show={hover == 'View' && (HasValueChanged())} Position={'left'} Theme={'dark'} Target={"View"}>
                            {ChangedValues(true)}
                        </ToolTip>
                    </div>
                </div>
                
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                    <Table<SystemCenter.AdditionalField>
                        cols={[
                            { key: 'FieldName', label: 'Field', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'ExternalDB', label: 'Ext DB', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Type', label: 'Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            {
                                key: 'IsSecure', label: 'Value', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => {
                                    let index: number = additionalFieldValues.findIndex(value => value.AdditionalFieldID == item.ID);
                                    if (!edit)
                                        return (index > -1 && additionalFieldValues[index].Value != null ? additionalFieldValues[index].Value.toString() : '');
                                    return <ValueField Field={item} ParentTableID={props.ID} Values={additionalFieldValuesWorking} Setter={(val: SystemCenter.AdditionalFieldValue[]) => setAdditionalFieldValuesWorking(val)} />
                                }                            
                            },
                        { key: 'ID', label: '', headerStyle: { width: 40, paddingRight: 0, paddingLeft: 10 }, rowStyle: { width: 40, paddingRight: 0, paddingLeft: 10, paddingTop: 36 }, content: (item) => (edit ? <button className="btn btn-sm" onClick={() => { setNewField(item); setShowEdit(true); }}><span><i className="fa fa-pencil"></i></span></button> : '') },
                        { key: null, label: '', headerStyle: { width: 40, paddingLeft: 0, paddingRight: 10 }, rowStyle: { width: 40, paddingLeft: 0, paddingTop: 36, paddingRight: 10 }, content: (item) => (edit ? <button className="btn btn-sm" onClick={() => { setNewField(item); setShowWarning(true); }}><span><i className="fa fa-times"></i></span></button> : '') },

                        ]}
                        tableClass="table table-hover"
                        data={additionalFields}
                        sortField={sortFields}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.col == null || d.col == 'ID' || d.col == 'IsSecure')
                                return;
                            if (d.col == sortFields)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortField(d.col);
                            }
                        }}
                        onClick={(fld) => { }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455,}}
                        rowStyle={{display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (!edit ? ' disabled' : '')} onMouseEnter={() => setHover('New')} onMouseLeave={() => setHover('None')}
                        onClick={() => { if (edit) { setShowEdit(true); setNewField(EmptyField) } }} data-tooltip={'New'} >Add Field</button>
                </div>
                <ToolTip Show={hover == 'New' && !edit} Position={'top'} Theme={'dark'} Target={"New"}>
                    {!edit? <p> To add a new Field switch to Edit mode by clicking on the Edit Button on the upper right corner.</p> : null}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (!HasValueChanged() || !edit || HasInvalidChanges() ? ' disabled' : '')} onClick={() => { if (HasValueChanged() && !HasInvalidChanges() && edit) addOrUpdateValues(); }}
                        onMouseEnter={() => setHover('Save')} onMouseLeave={() => setHover('None')} data-tooltip={'SaveValues'}>Save Changes</button>
                </div>
                <ToolTip Show={hover == 'Save' && (!edit || HasValueChanged())} Position={'top'} Theme={'dark'} Target={"SaveValues"}>
                    {!edit ? <p> To change any Fields switch to Edit mode by clicking on the Edit Button on the upper right corner.</p> : null}
                    {HasValueChanged() && !HasInvalidChanges() ? ChangedValues(false) : null}
                    {HasValueChanged() && HasInvalidChanges() ? InvalidChanges() : null}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + (!(HasValueChanged()) || !edit ? ' disabled' : '')} onClick={() => { if (HasValueChanged() && edit) getFieldValues(); }} onMouseEnter={() => setHover('Clear')}
                        onMouseLeave={() => setHover('None')} data-tooltip={'Clear'}>Reset</button>
                </div>
                <ToolTip Show={hover == 'Clear' && (!edit || HasValueChanged())} Position={'top'} Theme={'dark'} Target={"Clear"}>
                    {!edit ? <p> To change any Fields switch to Edit mode by clicking on the Edit Button on the upper right corner.</p> : null}
                    {HasValueChanged() ? ChangedValues(true) : null }
                </ToolTip>
            </div>
            <LoadingScreen Show={showLoading} />
            <Warning Show={showWarning} Title={'Delete ' + newField.FieldName}
                Message={"This will delete the field '" + newField.FieldName + "' from all " + props.Type + "s and will also delete all information assigned to these fields."}
                CallBack={(confirm: boolean) => { if (confirm) deleteField(newField); setShowWarning(false) }} />

            <Modal
                Title={'Additional Field'} ConfirmText={'Save'} CancelText={'Close'}
                ConfirmBtnClass={'btn-primary' + (!ValidField() ? ' disabled' : '')}
                Show={showEdit} Size={'lg'} ShowX={true}
                CallBack={(confirmation: boolean) => { if (!ValidField() && confirmation) return; if (confirmation) addNewField(); setShowEdit(false); }}
                OnHover={(hov) => setHover(hov)}
                ConfirmToolTip={'ModalSave'}>
                <Input<SystemCenter.AdditionalField> Record={newField} Field='FieldName' Valid={(field) => newField.FieldName != null && newField.FieldName.length > 0 && newFieldNameValid} Label="Field Name" Setter={setNewField} Feedback={'The additional field needs to have a unique Field Name'} />
                <Select<SystemCenter.AdditionalField> Record={newField} Field='Type' Options={[{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }].concat(valueListGroups.filter(x => x.Enabled).map(x => { return { Value: x.Name, Label: x.Name } }))} Label="Field Type" Setter={setNewField} />
                <Select<SystemCenter.AdditionalField> Record={newField} Field='ExternalDB' Label="External Database"
                    Setter={(fld: SystemCenter.AdditionalField) => {
                        if (fld.ExternalDB == null || fld.ExternalDB == '')
                            fld = { ...fld, ExternalDB: null, ExternalDBTable: null, ExternalDBTableKey: null };
                        setNewField(fld);
                    }}
                    EmptyOption={true} Options={externalDBs.map(item => ({ Value: item, Label: item }))} />
                <div data-tooltip="ExternalDB" onMouseEnter={() => setHover('ExternalDB')} onMouseLeave={() => setHover('None')}>
                    <Select<SystemCenter.AdditionalField> EmptyOption={true} Disabled={newField.ExternalDB == null || newField.ExternalDB.length == 0} Record={newField} Field='ExternalDBTable' Options={externalDBTables.map(item => ({ Value: item, Label: item }))}
                        Label="External Database Table"
                        Setter={setNewField} />
                </div>
                <Input<SystemCenter.AdditionalField> Disabled={newField.ExternalDB == null || newField.ExternalDB.length == 0} Record={newField} Field='ExternalDBTableKey' Valid={(field) => true} Label="External Database Table Key" Setter={setNewField} />
                <CheckBox<SystemCenter.AdditionalField> Record={newField} Field='IsSecure' Label="Secure Data" Setter={setNewField} /> 
            </Modal>
            <ToolTip Zindex={9999} Show={hover == 'Confirm' && !ValidField()} Position={'top'} Theme={'dark'} Target={"ModalSave"}>
                {newField.FieldName == null || newField.FieldName.length == 0 || !newFieldNameValid? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Field Name is required and has to be unique.</p> : null}
                {newField.ExternalDB != null && newField.ExternalDBTable == null ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> A Field from an External Database requires an External Database Table.</p> : null}
                {newField.ExternalDB != null && newField.ExternalDBTableKey == null ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> A Field from an External Database requires an External Database Table Key.</p> : null}
            </ToolTip>
            <ToolTip Zindex={9999} Show={hover == 'ExternalDB' && (newField.ExternalDB == null || newField.ExternalDB.length == 0)} Position={'bottom'} Theme={'dark'} Target={"ExternalDB"}>
                <p> No External Database selected.</p>
            </ToolTip>
        </div>

    );
}

export default AdditionalFieldsWindow;

interface IValueFieldProps {
    Field: SystemCenter.AdditionalField,
    Values: SystemCenter.AdditionalFieldValue[],
    ParentTableID: number,
    Setter: (val: SystemCenter.AdditionalFieldValue[]) => void
}
const ValueField = (props: IValueFieldProps) => {
    const [valueListItems, setValueListItems] = React.useState<Array<SystemCenter.ValueListItem>>([]);
    const [valueIndex, setValueIndex] = React.useState<number>(-1)

    React.useEffect(() => {
        let index = props.Values.findIndex(value => value.AdditionalFieldID == props.Field.ID);
        setValueIndex(index);
        if (index == -1)
            props.Setter([...props.Values, { ID: 0, AdditionalFieldID: props.Field.ID, OpenXDAParentTableID: props.ParentTableID, Value: null }]);
        
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

            handle.done((vl: Array<SystemCenter.ValueListItem>) => {
                setValueListItems(vl);
            });

            return () => {
                if (handle.abort != undefined) handle.abort()
            }
        }
    }, [props.Field.Type]);

    function Setter(record: SystemCenter.AdditionalFieldValue): void {
        let updated = _.cloneDeep(props.Values);
        updated[valueIndex] = record;
        props.Setter(updated)
    }

    function Valid(type: SystemCenter.AdditionalFieldType): boolean {
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
        return <Input<SystemCenter.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={''} Type={'number'} Setter={Setter} Feedback={props.Field.FieldName + ' is an integer field.'} />
    if (props.Field.Type == 'string')
        return <Input<SystemCenter.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={''} Type={'text'} Setter={Setter} />
    if (props.Field.Type == 'boolean')
        return <CheckBox<SystemCenter.AdditionalFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Label={''} Setter={Setter} />
    return <Select<SystemCenter.AdditionalFieldValue> EmptyOption={true} Record={props.Values[valueIndex]} Field={'Value'} Label={''} Setter={Setter} Options={valueListItems.map(x => ({ Value: x.ID.toString(), Label: x.Text }))} />
}
