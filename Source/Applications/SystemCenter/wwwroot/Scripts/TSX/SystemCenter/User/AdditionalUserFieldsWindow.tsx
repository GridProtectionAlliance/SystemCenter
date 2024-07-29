// ******************************************************************************************************
//  AdditionalField.tsx - Gbtc
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
//  07/14/2021 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table';
import { CrossMark, HeavyCheckMark, Pencil, Warning, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Modal, ToolTip, ServerErrorIcon, Warning as WarningModal } from '@gpa-gemstone/react-interactive';
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import { UserAdditionalFieldSlice, ValueListSlice, ValueListGroupSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { IsInteger, IsNumber } from '@gpa-gemstone/helper-functions';

interface IField {
	FieldName: string,
	Type: string,
	IsSecure: boolean
}

interface IValue {
	Value: string | number,
	UserAccountID: string,
	ID: number
	AdditionalUserValueFieldID: number
}

interface IProps {
	Id: string | number,
	EmptyField: Application.Types.iAdditionalUserField
	GetFieldValueIndex: (field: Application.Types.iAdditionalUserField, values: Application.Types.iAdditionalUserFieldValue[]) => number,
	GetFieldIndex: (value: Application.Types.iAdditionalUserFieldValue, fields: Application.Types.iAdditionalUserField[]) => number,
	FieldKeySelector: (field: Application.Types.iAdditionalUserField) => string,
	ValidateField: (field: Application.Types.iAdditionalUserField) => string[],
	CreateValue: (field: Application.Types.iAdditionalUserField) => Application.Types.iAdditionalUserFieldValue,
	FieldUI: (field: Application.Types.iAdditionalUserField, setField: (field: Application.Types.iAdditionalUserField) => void) => JSX.Element
}

function AdditionalField(props: IProps) {
	const dispatch = useAppDispatch();

	const valueListItems = useAppSelector(ValueListSlice.Data);
	const valueListItemStatus = useAppSelector(ValueListSlice.Status);

	const valueListGroups = useAppSelector(ValueListGroupSlice.Data);
	const valueListGroupStatus= useAppSelector(ValueListGroupSlice.Status);

	const fields = useAppSelector(UserAdditionalFieldSlice.Fields);
	const values = useAppSelector(UserAdditionalFieldSlice.Values);
	const fieldStatus = useAppSelector(UserAdditionalFieldSlice.FieldStatus);
	const valueStatus = useAppSelector(UserAdditionalFieldSlice.ValueStatus);
	const valueParentID = useAppSelector(UserAdditionalFieldSlice.ValueParentId);

	const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('unintiated');

	const [editValues, setEditValues] = React.useState<Application.Types.iAdditionalUserFieldValue[]>([]);

	const sortField = useAppSelector(UserAdditionalFieldSlice.SortField);
	const ascending = useAppSelector(UserAdditionalFieldSlice.Ascending);

	const [newField, setNewField] = React.useState<Application.Types.iAdditionalUserField>(props.EmptyField);
	const [showWarning, setShowWarning] = React.useState<boolean>(false);
	const [showEdit, setShowEdit] = React.useState<boolean>(false);

	const [hover, setHover] = React.useState<('None' | 'Save' | 'New' | 'View' | 'Clear')>('None');

	const [mode, setMode] = React.useState<'Edit' | 'View'>('View')

	const [changedFields, setChangedFields] = React.useState<string[]>([]);
	const [errorFields, setErrorFields] = React.useState<string[]>([]);
	const [fieldErrors, setFieldErrors] = React.useState<string[]>([]);

	const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');

	React.useEffect(() => {
		if (fieldStatus === 'error' || valueStatus === 'error' || valueListGroupStatus === 'error' || valueListItemStatus === 'error')
			setPageStatus('error')
		else if (fieldStatus === 'loading' || valueStatus === 'loading' || valueListGroupStatus === 'loading' || valueListItemStatus === 'loading')
			setPageStatus('loading')
		else
			setPageStatus('idle');
	}, [fieldStatus, valueStatus, valueListGroupStatus, valueListItemStatus])

	React.useEffect(() => {
		if (fieldStatus === 'unintiated' || fieldStatus === 'changed')
			dispatch(UserAdditionalFieldSlice.FetchField());
	}, [dispatch, fieldStatus]);

	React.useEffect(() => {
		if (valueStatus === 'unintiated' || valueStatus === 'changed' || props.Id !== valueParentID)
			dispatch(UserAdditionalFieldSlice.FetchValues(props.Id));
	}, [dispatch, valueStatus, props.Id, valueParentID]);

	React.useEffect(() => {
		if (valueListItemStatus === 'unintiated' || valueListItemStatus === 'changed')
			dispatch(ValueListSlice.Fetch());
	}, [dispatch, valueListItemStatus]);

	React.useEffect(() => {
		if (valueListGroupStatus === 'unintiated' || valueListGroupStatus === 'changed')
			dispatch(ValueListGroupSlice.Fetch());
	}, [dispatch, valueListGroupStatus]);

	React.useEffect(() => { setEditValues(values) }, [values])

	const typeOptions = [{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }].concat(valueListGroups.map(x => { return { Value: x.Name, Label: x.Name } }));

	React.useEffect(() => {
		const e = props.ValidateField(newField);
		if (newField.FieldName == null || newField.FieldName.length === 0)
			e.push('A Field Name is required.')
		else if (fields.findIndex(f => f.FieldName.toLowerCase() === newField.FieldName.toLowerCase() && props.FieldKeySelector(f) !== props.FieldKeySelector(newField)) > -1)
			e.push('A Field with this Name already exists.')
		setFieldErrors(e);
	}, [newField])

	React.useEffect(() => {
		const c: string[] = [];
		const e: string[] = [];

		editValues.forEach(v => {
			const eIndex = values.findIndex(val => val.ID === v.ID);
			const fldIndex = props.GetFieldIndex(v, fields);
			if (eIndex === -1 && fldIndex > -1)
				c.push(fields[fldIndex].FieldName);
			else if (fldIndex > -1 && v.Value !== values[eIndex].Value)
				c.push(fields[fldIndex].FieldName);

			if (fldIndex > -1 && fields[fldIndex].Type === 'integer' && !IsInteger(v.Value))
				e.push("'" + fields[fldIndex].FieldName + "' must be a valid integer.")
			if (fldIndex > -1 && fields[fldIndex].Type === 'number' && !IsNumber(v.Value))
				e.push("'" + fields[fldIndex].FieldName + "' must be a valid number.")
		})

		setErrorFields(e);
		setChangedFields(c)
	}, [values, editValues])

	if (pageStatus === 'error')
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
						<ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
					</div>
				</div>
			</div>
		</div>

	return (
		<div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
			<div className="card-header">
				<div className="row">
					<div className="col">
						<h4>Additional Fields:</h4>
					</div>
					<div className="col">
						{(mode === 'Edit') ?
							<button className="btn btn-default pull-right" data-tooltip='View' onClick={() => { setMode('View'); setEditValues(values) }} onMouseEnter={() => setHover('View')} onMouseLeave={() => setHover('None')}>View</button> :
							<button className="btn btn-primary pull-right" onClick={() => setMode('Edit')}>Edit</button>}
						<ToolTip Show={hover === 'View' && changedFields.length > 0} Position={'left'} Theme={'dark'} Target={"View"}>
							{changedFields.map((fld, i) => <p key={i}>{Warning} Changes to '{fld}' will be lost. </p>)}
						</ToolTip>
					</div>
				</div>

			</div>
			<div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
				<ReactTable.Table<Application.Types.iAdditionalUserField>
					TableClass="table table-hover"
					Data={fields}
					SortKey={sortField}
					Ascending={ascending}
					OnSort={(d) => {
						if (d.colKey === sortField)
							dispatch(UserAdditionalFieldSlice.Sort({ SortField: d.colField, Ascending: !ascending }))
						else
							dispatch(UserAdditionalFieldSlice.Sort({ SortField: d.colField, Ascending: true }))
					}}
					TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
					TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
					TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1, width: '100%' }}
					RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
					Selected={(item) => false}
					KeySelector={props.FieldKeySelector}
				>
					<ReactTable.Column<Application.Types.iAdditionalUserField>
						Key={'FieldName'}
						AllowSort={true}
						Field={'FieldName'}
						HeaderStyle={{ width: 'auto' }}
						RowStyle={{ width: 'auto' }}
					> Field
					</ReactTable.Column>
					<ReactTable.Column<Application.Types.iAdditionalUserField>
						Key={'Type'}
						AllowSort={true}
						Field={'Type'}
						HeaderStyle={{ width: 'auto' }}
						RowStyle={{ width: 'auto' }}
					> Type
					</ReactTable.Column>
					<ReactTable.Column<Application.Types.iAdditionalUserField>
						Key={'Value'}
						AllowSort={true}
						HeaderStyle={{ width: 'auto' }}
						RowStyle={{ width: 'auto' }}
						Content={({ item }) => {
							let valueListgrpId = valueListGroups.findIndex(g => g.Name === item.Type);
							valueListgrpId = (valueListgrpId > -1 ? valueListGroups[valueListgrpId].ID : -1);
							const vList = valueListItems.filter(i => i.GroupID === valueListgrpId);
							const valIdx = props.GetFieldValueIndex(item, editValues);
							if (valIdx > -1)
								return <ValueDisplay Mode={mode} Type={item.Type} ValueListItems={vList} Value={editValues[valIdx]} Setter={(val: Application.Types.iAdditionalUserFieldValue) => setEditValues((d) => { const u = [...d]; u[valIdx] = val; return u; })} />
							return <ValueDisplay Mode={mode} Type={item.Type} ValueListItems={vList} Value={props.CreateValue(item)} Setter={(val: Application.Types.iAdditionalUserFieldValue) => setEditValues((d) => { const u = [...d]; u.push(val); return u; })} />
						}}
					> Value
					</ReactTable.Column>
					<ReactTable.Column<Application.Types.iAdditionalUserField>
						Key={'EditButton'}
						AllowSort={false}
						HeaderStyle={{ width: 40, paddingRight: 0, paddingLeft: 10 }}
						RowStyle={{ width: 40, paddingRight: 0, paddingLeft: 10, paddingTop: 36 }}
						Content={({ item }) => (mode === 'Edit' ? <button className="btn btn-sm" onClick={() => { setNewField(item); setShowEdit(true); setEditNew('Edit'); }}><span>{Pencil}</span></button> : '')}
					> <p></p>
					</ReactTable.Column>
					<ReactTable.Column<Application.Types.iAdditionalUserField>
						Key={'DeleteButton'}
						AllowSort={false}
						HeaderStyle={{ width: 40, paddingRight: 0, paddingLeft: 10 }}
						RowStyle={{ width: 40, paddingRight: 0, paddingLeft: 10, paddingTop: 36 }}
						Content={({ item }) => (mode === 'Edit' ? <button className="btn btn-sm" onClick={() => { setNewField(item); setShowWarning(true); }}><span>{TrashCan}</span></button> : '')}
					> <p></p>
					</ReactTable.Column>
				</ReactTable.Table>
			</div>
			<div className="card-footer">
				<div className="btn-group mr-2">
					<button className={"btn btn-primary" + (mode === 'View' ? ' disabled' : '')} onMouseEnter={() => setHover('New')} onMouseLeave={() => setHover('None')}
						onClick={() => { if (mode === 'Edit') { setShowEdit(true); setNewField(props.EmptyField) } }} data-tooltip={'New'} >Add Field</button>
				</div>
				<ToolTip Show={hover === 'New' && mode === 'View'} Position={'top'} Theme={'dark'} Target={"New"}>
					<p> To add a new Field, switch to Edit mode by clicking on the Edit button on the upper right corner.</p>
				</ToolTip>
				<div className="btn-group mr-2">
					<button className={"btn btn-primary" + (changedFields.length === 0 || mode === 'View' || errorFields.length > 0 ? ' disabled' : '')} onClick={() => { if (errorFields.length === 0 && changedFields.length > 0 && mode === 'Edit') dispatch(UserAdditionalFieldSlice.UpdateValues({ ParentID: props.Id, Values: editValues })); }}
						onMouseEnter={() => setHover('Save')} onMouseLeave={() => setHover('None')} data-tooltip={'SaveValues'}>Save Changes</button>
				</div>
				<ToolTip Show={hover === 'Save' && (mode === 'View' || changedFields.length > 0)} Position={'top'} Theme={'dark'} Target={"SaveValues"}>
					{mode === 'View' ? <p> To change any Fields, switch to Edit mode by clicking on the Edit button on the upper right corner.</p> : null}
					{changedFields.length > 0 && errorFields.length === 0 ? changedFields.map((fld, i) => <p key={i}> {HeavyCheckMark} Changes to '{fld}' are valid.</p>) : null}
					{changedFields.length > 0 && errorFields.length > 0 ? errorFields.map((t, i) => <p key={i}> {CrossMark} {t}.</p>) : null}
				</ToolTip>
				<div className="btn-group mr-2">
					<button className={"btn btn-default" + (changedFields.length === 0 || mode === 'View' ? ' disabled' : '')}
						onClick={() => {
							if (changedFields.length > 0 && mode === 'Edit')
								setEditValues(values);
						}}
						onMouseEnter={() => setHover('Clear')}
						onMouseLeave={() => setHover('None')} data-tooltip={'Reset'}>Reset</button>
				</div>
				<ToolTip Show={hover === 'Clear' && (mode === 'View' || changedFields.length > 0)} Position={'top'} Theme={'dark'} Target={'Reset'}>
					{mode === 'View' ? <p> To change any Fields, switch to Edit mode by clicking on the Edit button on the upper right corner.</p> : null}
					{changedFields.length > 0 ? changedFields.map((fld, i) => <p key={i}>{Warning} Changes to '{fld}' will be lost. </p>) : null}
				</ToolTip>
			</div>
			<WarningModal Show={showWarning} Title={'Delete ' + (newField?.FieldName ?? 'Additional Field')}
				Message={"This will delete the Field '" + (newField?.FieldName ?? "<No Name>") + "' from all Users and all Values assigned to it."}
				CallBack={(confirm: boolean) => { if (confirm) dispatch(UserAdditionalFieldSlice.FieldAction({ Verb: 'DELETE', Record: newField })); setShowWarning(false) }} />

			<Modal
				Title={editNew === 'Edit' ? "Edit " + (newField?.FieldName ?? "Additional Field") : "Add Additional Field"} ConfirmText={'Save'} ShowX={true} ShowCancel={false}
				ConfirmBtnClass={'btn-primary' + (fieldErrors.length > 0 ? ' disabled' : '')}
				Show={showEdit} Size={'lg'}
				CallBack={(confirmation) => {
					if (confirmation) {
						if (props.FieldKeySelector(newField) === "new")
							dispatch(UserAdditionalFieldSlice.FieldAction({ Verb: "POST", Record: newField }))
						else
							dispatch(UserAdditionalFieldSlice.FieldAction({ Verb: "PATCH", Record: newField }))
					}

					setShowEdit(false);
				}}
				ConfirmShowToolTip={fieldErrors.length > 0}
				ConfirmToolTipContent={fieldErrors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)}
			>
				<Input<Application.Types.iAdditionalUserField> Record={newField} Field='FieldName' Valid={(field) =>
					newField.FieldName != null && newField.FieldName.length > 0
					&& fields.findIndex(f => f.FieldName.toLowerCase() === newField.FieldName.toLowerCase() && props.FieldKeySelector(f) !== props.FieldKeySelector(newField)) < 0}
					Label="Field Name" Setter={setNewField} Feedback={'A unique Field Name is required.'} />
				<Select<Application.Types.iAdditionalUserField> Record={newField} Field='Type' Options={typeOptions} Label="Field Type" Setter={setNewField} />
				{props.FieldUI !== undefined ? props.FieldUI(newField, setNewField) : null}
			</Modal>
		</div>

	);

}

export default AdditionalField;

interface IValueDisplayProps<V extends Application.Types.iAdditionalUserFieldValue> {
	Type: string,
	ValueListItems: SystemCenter.Types.ValueListItem[],
	Value: V,
	Setter: (val: V) => void,
	Mode: 'Edit' | 'View'
}

function ValueDisplay<V extends Application.Types.iAdditionalUserFieldValue>(props: IValueDisplayProps<V>) {

	React.useEffect(() => {
		if (props.Type === 'integer' || props.Type === 'number' || props.Type === 'string')
			return;
		else if (props.Type !== 'boolean' &&
			props.ValueListItems.findIndex(i => i.Value.toLowerCase() === props.Value.Value.toString().toLowerCase()) < 0
			&& props.ValueListItems.length > 0)
			props.Setter({ ...props.Value, Value: props.ValueListItems[0].Value })
	}, [props.Type, props.Value, props.ValueListItems])

	if (props.Mode === 'View') {
		if (props.Type === 'boolean')
			return <span>{props.Value.Value.toString().toLowerCase() === "true" ? "true" : "false"}</span>
		else
			return <span>{props.Value.Value}</span>;
	}

	if (props.Type === 'number')
		return <Input<V> Record={props.Value} Field={'Value'} Valid={() => IsInteger(props.Value.Value)} Label={''} Type={'number'} Setter={props.Setter} Feedback={'Field Value must be numeric.'} />
	if (props.Type === 'integer')
		return <Input<V> Record={props.Value} Field={'Value'} Valid={() => IsNumber(props.Value.Value)} Label={''} Type={'number'} Setter={props.Setter} Feedback={'Field Value must be an integer.'} />
	else if (props.Type === 'string')
		return <Input<V> Record={props.Value} Field={'Value'} Valid={() => true} Label={''} Type={'text'} Setter={props.Setter} />
	else if (props.Type === 'boolean')
		return <CheckBox<V> Record={props.Value} Field={'Value'} Label={''} Setter={props.Setter} />
	else
		return <Select<V> EmptyOption={true} Record={props.Value} Field={'Value'} Label={''} Setter={props.Setter}
			Options={props.ValueListItems.map(x => ({ Value: x.Value, Label: x.AltValue ?? x.Value }))} />

}
