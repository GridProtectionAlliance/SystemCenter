//******************************************************************************************************
//  AdditionalUserFieldsWindow.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  06/23/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************



import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter, OpenXDA } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';

import { AssetAttributes } from '../AssetAttribute/Asset';

import { LoadingIcon, Modal, Search, ServerErrorIcon, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import Table from '@gpa-gemstone/react-table';

declare var homePath: string;
interface IProps { ID: string, Tab: string }

function AdditionalUserFieldsWindow(props: IProps): JSX.Element {

    const [valueListGroups, setValueListGroups] = React.useState<SystemCenter.Types.ValueListGroup[]>([]);

    const [AdditionalUserFields, setAdditionalUserFields] = React.useState<SC.AdditionalUserField[]>([]);
    const [AdditionalUserFieldValues, setAdditionalUserFieldVaules] = React.useState<SC.AdditionalUserFieldValue[]>([]);

    const [AdditionalUserFieldValuesWorking, setAdditionalUserFieldValuesWorking] = React.useState<SC.AdditionalUserFieldValue[]>([]);
    const [edit, setEdit] = React.useState<boolean>(false);

    const [sortFields, setSortField] = React.useState<keyof SC.AdditionalUserField>('FieldName');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const [newField, setNewField] = React.useState<SC.AdditionalUserField>({ ID: 0, FieldName: '', Type: 'string', IsSecure: false });

    const [state, setState] = React.useState<'idle' | 'loading' | 'error'>('idle');

    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showEdit, setShowEdit] = React.useState<boolean>(false);

    const [hover, setHover] = React.useState<('None' | 'Save' | 'New' | 'View' | 'Clear')>('None');

    const [newFieldNameValid, setNewFieldNameValid] = React.useState<boolean>(true);

    const EmptyField: SC.AdditionalUserField = { ID: 0, FieldName: '', Type: 'string', IsSecure: false };

    React.useEffect(() => {
        return getData();
    }, [props.ID, props.Tab]);

    React.useEffect(() => { setAdditionalUserFieldValuesWorking(AdditionalUserFieldValues) }, [AdditionalUserFieldValues])

    React.useEffect(() => {
        let h = getFields();

        return () => { if (h.abort != undefined) h.abort() }
    }, [sortFields, ascending])

    React.useEffect(() => {
        let h = validateFieldName();
        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [newField.ID, newField.FieldName])

    function getData() {
        setState('loading');
        let fieldHandle = getFields();
        let fieldValueHandle = getFieldValues();
        let valueListHandle = getValueLists();

        setNewField(EmptyField);
        Promise.all([fieldHandle, fieldValueHandle, valueListHandle])
            .then(() => { setState('idle') }, () => { setState('error') })

        return () => {
            if (fieldHandle.abort != undefined) fieldHandle.abort();
            if (fieldValueHandle.abort != undefined) fieldValueHandle.abort();
            if (valueListHandle.abort != undefined) valueListHandle.abort();
        }
    }

    function getFields(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalUserField/${sortFields}/${(ascending? '1' : '0')}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: SC.AdditionalUserField[]) => {
            if (typeof (data) == 'string') setAdditionalUserFields(JSON.parse(data));
            else setAdditionalUserFields(data);
        });

        return handle;
    }

    function getFieldValues(): JQuery.jqXHR {

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalUserFieldValue/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        handle.done((data: SC.AdditionalUserFieldValue[]) => {
            setAdditionalUserFieldVaules(data);
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

        handle.done((data: Array<SystemCenter.Types.ValueListGroup>) => {
            setValueListGroups(data);
        });

        return handle;
    }

    function validateFieldName(): JQuery.jqXHR<string> {
        if (newField.FieldName == null || newField.FieldName.length == 0)
            return null;

        let h = $.ajax({
            type: "Post",
            url: `${homePath}api/SystemCenter/AdditionalUserField/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: [{ FieldName: 'FieldName', Operator: "=", SearchText: newField.FieldName, Type: 'string' } as Search.IFilter<SC.AdditionalUserField>], OrderBy: "FieldName", Ascending: true }),
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
            url: `${homePath}api/SystemCenter/AdditionalUserFieldValue/Array`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(AdditionalUserFieldValuesWorking),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });
    }

    function addNewField(): void {
        setState('loading');
        $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/AdditionalUserField/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(newField),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        }).fail(() => {
            setState('error');
        });
    }

    function updateField(): void {
        setState('loading');
        $.ajax({
            type: "Patch",
            url: `${homePath}api/SystemCenter/AdditionalUserField/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(newField),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        }).fail(() => {
            setState('error');
        });
    }

    function deleteField(field: SC.AdditionalUserField): void {
        setState('loading');
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/AdditionalUserField/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(field),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });

    }

    function ValidField(): boolean {
        return newFieldNameValid &&  newField.FieldName != null && newField.FieldName.length > 0;
    }

    function HasValueChanged(): boolean {
        
        return AdditionalUserFieldValuesWorking.some((item, index) => {
            let i = AdditionalUserFieldValues.findIndex(val => val.AdditionalUserFieldID == item.AdditionalUserFieldID)
            if (i == -1 && item.Value == null)
                return false;
            if (i == -1)
                return true;
            return item.Value != AdditionalUserFieldValues[i].Value;
        });
    }

    function ChangedValues(warning: boolean): Array<JSX.Element> {

        let result: JSX.Element[] = [];
        AdditionalUserFieldValuesWorking.forEach((item,index) => {
            let iFld = AdditionalUserFields.findIndex(fld => fld.ID == item.AdditionalUserFieldID);
            let iWVal = AdditionalUserFieldValues.findIndex(val => val.AdditionalUserFieldID == item.AdditionalUserFieldID)

            if (iFld == -1 || (iWVal == -1 && item.Value == null))
                return;
            if (iWVal == -1) {
                result.push((warning ? <p key={index}> <i style={{ marginRight: '10px', color: '#ffc107' }} className="fa fa-exclamation-triangle"></i> Changes to '{AdditionalUserFields[iFld].FieldName}' will be lost.</p> :
                    <p key={index}> <i style={{ marginRight: '10px', color: '#28A745' }} className="fa fa-check-circle"></i> Changes to '{AdditionalUserFields[iFld].FieldName}' are valid.</p>));
                return;
            }
            if (item.Value == AdditionalUserFieldValues[iWVal].Value)
                return;

            result.push((warning ? <p key={index}> <i style={{ marginRight: '10px', color: '#ffc107' }} className="fa fa-exclamation-triangle"></i> Changes to '{AdditionalUserFields[iFld].FieldName}' will be lost.</p> :
                <p key={index}> <i style={{ marginRight: '10px', color: '#28A745' }} className="fa fa-check-circle"></i> Changes to '{AdditionalUserFields[iFld].FieldName}' are valid.</p>));
        });

        return result;
    }

    function HasInvalidChanges(): boolean {
        return AdditionalUserFieldValuesWorking.some(item => {
            let i = AdditionalUserFields.findIndex(fld => fld.ID == item.AdditionalUserFieldID);
            if (i == -1)
                return false;
            if (AdditionalUserFields[i].Type == 'integer')
                return !(item.Value == null || AssetAttributes.isInteger(item.Value))
            return false;
        });
    }

    function InvalidChanges(): Array<JSX.Element> {
        if (!HasInvalidChanges())
            return []
        let result = [];
        AdditionalUserFieldValuesWorking.forEach((item,index) => {
            let i = AdditionalUserFields.findIndex(fld => fld.ID == item.AdditionalUserFieldID);
            if (i == -1)
                return;
            if (AdditionalUserFields[i].Type == 'integer' && !(item.Value == null || AssetAttributes.isInteger(item.Value)))
                result.push(<p key={index}> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Value for '{AdditionalUserFields[i].FieldName}' is required to be an integer.</p>)
        });
        return result;
    }

    if (state == 'loading')
        return <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Additional Fields:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                    <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} />
                    </div>
                </div>
            </div>
        </div>

                        
    if (state == 'error')
        return <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Additional Fields:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                    </div>
                </div>
            </div>
        </div>

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
                <Table<SC.AdditionalUserField>
                        cols={[
                            { key: 'FieldName', label: 'Field', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Type', label: 'Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            {
                                key: 'IsSecure', label: 'Value', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => {
                                    let index: number = AdditionalUserFieldValues.findIndex(value => value.AdditionalUserFieldID == item.ID);
                                    if (!edit)
                                        return (index > -1 && AdditionalUserFieldValues[index].Value != null ? <ValueSpan Field={item} Value={AdditionalUserFieldValues[index]} /> : '');
                                    return <ValueField Field={item} UserAccountID={props.ID} Values={AdditionalUserFieldValuesWorking} Setter={(val: SC.AdditionalUserFieldValue[]) => setAdditionalUserFieldValuesWorking(val)} />
                                }                            
                            },
                        { key: 'ID', label: '', headerStyle: { width: 40, paddingRight: 0, paddingLeft: 10 }, rowStyle: { width: 40, paddingRight: 0, paddingLeft: 10, paddingTop: 36 }, content: (item) => (edit ? <button className="btn btn-sm" onClick={() => { setNewField(item); setShowEdit(true); }}><span><i className="fa fa-pencil"></i></span></button> : '') },
                        { key: null, label: '', headerStyle: { width: 40, paddingLeft: 0, paddingRight: 10 }, rowStyle: { width: 40, paddingLeft: 0, paddingTop: 36, paddingRight: 10 }, content: (item) => (edit ? <button className="btn btn-sm" onClick={() => { setNewField(item); setShowWarning(true); }}><span><i className="fa fa-times"></i></span></button> : '') },

                        ]}
                        tableClass="table table-hover"
                        data={AdditionalUserFields}
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
                        onMouseLeave={() => setHover('None')} data-tooltip={'Reset'}>Reset</button>
                </div>
                <ToolTip Show={hover == 'Clear' && (!edit || HasValueChanged())} Position={'top'} Theme={'dark'} Target={'Reset'}>
                    {!edit ? <p> To change any Fields switch to Edit mode by clicking on the Edit Button on the upper right corner.</p> : null}
                    {HasValueChanged() ? ChangedValues(true) : null }
                </ToolTip>
            </div>
            <Warning Show={showWarning} Title={'Delete ' + newField.FieldName}
                Message={"This will delete the field '" + newField.FieldName + "' from all UserAccounts and will also delete all information assigned to these fields."}
                CallBack={(confirm: boolean) => { if (confirm) deleteField(newField); setShowWarning(false) }} />

            <Modal
                Title={'Additional Field'} ConfirmText={'Save'} CancelText={'Close'}
                ConfirmBtnClass={'btn-primary' + (!ValidField() ? ' disabled' : '')}
                Show={showEdit} Size={'lg'} ShowX={true}
                CallBack={(confirmation: boolean, btn: boolean) => {
                    if (!ValidField() && confirmation)
                        return;
                    if (confirmation) {
                        if (newField.ID == 0)
                            addNewField();
                        else
                            updateField();
                    }
                        
                    setShowEdit(false);
                }}
                ConfirmShowToolTip={!ValidField()}
                ConfirmToolTipContent={
                    <>
                        {newField.FieldName == null || newField.FieldName.length == 0 || !newFieldNameValid ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Field Name is required and has to be unique.</p> : null}
                    </>
                }

                >
                <Input<SC.AdditionalUserField> Record={newField} Field='FieldName' Valid={(field) => newField.FieldName != null && newField.FieldName.length > 0 && newFieldNameValid} Label="Field Name" Setter={setNewField} Feedback={'The additional field needs to have a unique Field Name'} />
                <Select<SC.AdditionalUserField> Record={newField} Field='Type' Options={[{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }].concat(valueListGroups.map(x => { return { Value: x.Name, Label: x.Name } }))} Label="Field Type" Setter={setNewField} />
                <CheckBox<SC.AdditionalUserField> Record={newField} Field='IsSecure' Label="Secure Data" Setter={setNewField} />
            </Modal>
        </div>

    );
}

export default AdditionalUserFieldsWindow;

interface IValueFieldProps {
    Field: SC.AdditionalUserField,
    Values: SC.AdditionalUserFieldValue[],
    UserAccountID: string,
    Setter: (val: SC.AdditionalUserFieldValue[]) => void
}
const ValueField = (props: IValueFieldProps) => {
    const [valueListItems, setValueListItems] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const [valueIndex, setValueIndex] = React.useState<number>(-1)

    React.useEffect(() => {
        let index = props.Values.findIndex(value => value.AdditionalUserFieldID == props.Field.ID);
        setValueIndex(index);
        if (index == -1)
            props.Setter([...props.Values, { ID: 0, AdditionalUserFieldID: props.Field.ID, UserAccountID: props.UserAccountID, Value: null }]);
        
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

    function Setter(record: SC.AdditionalUserFieldValue): void {
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
        return <span>valueIndex.toString()</span>;
    }

    else if (props.Field.Type == 'number' || props.Field.Type == 'integer')
        return <Input<SC.AdditionalUserFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={''} Type={'number'} Setter={Setter} Feedback={props.Field.FieldName + ' is an integer field.'} />
    else if (props.Field.Type == 'string')
        return <Input<SC.AdditionalUserFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Valid={Valid} Label={''} Type={'text'} Setter={Setter} />
    else if (props.Field.Type == 'boolean')
        return <CheckBox<SC.AdditionalUserFieldValue> Record={props.Values[valueIndex]} Field={'Value'} Label={''} Setter={Setter} />
    else
        return <Select<SC.AdditionalUserFieldValue> EmptyOption={true} Record={props.Values[valueIndex]} Field={'Value'} Label={''} Setter={Setter} Options={valueListItems.map(x => ({ Value: x.ID.toString(), Label: x.Value }))} />
}

const ValueSpan = (props: { Field: SC.AdditionalUserField, Value: SC.AdditionalUserFieldValue}) => {
    const [valueListItems, setValueListItems] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);

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



    if (props.Field.Type == 'number' || props.Field.Type == 'integer' || props.Field.Type == 'string' || props.Field.Type == 'boolean')
        return <span>{props.Value.Value}</span>
    else if (props.Field.Type == 'boolean')
        return <span>{props.Value.Value.toLowerCase() == "true" ? "true" : "false"}</span>
    else if (valueListItems.length == 0) {
        return <span>{props.Value.Value}</span>;
    }

    else
        return <span>{valueListItems.find(vli => vli.ID == parseInt(props.Value.Value)).Value}</span>
}
