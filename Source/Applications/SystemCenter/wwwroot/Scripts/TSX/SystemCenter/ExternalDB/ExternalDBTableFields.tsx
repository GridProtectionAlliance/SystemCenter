//******************************************************************************************************
//  ExternalDBTableFields.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  10/03/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppSelector, useAppDispatch } from '../hooks';
import { AdditionalFieldsSlice, ValueListGroupSlice } from '../Store/Store';
import ExternalDBTableFieldForm from './ExternalDBTableFieldForm';
import Table from '@gpa-gemstone/react-table';
import { CrossMark, Pencil, TrashCan, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { Modal, Warning, SearchBar } from '@gpa-gemstone/react-interactive';
import { SelectPopup } from '@gpa-gemstone/common-pages';

export default function ExternalDBTableFields(props: { TableName: string, ID: number }) {

    const dispatch = useAppDispatch();

    const data = useAppSelector(AdditionalFieldsSlice.Data);
    const searchData = useAppSelector(AdditionalFieldsSlice.SearchResults);
    const sortKey = useAppSelector(AdditionalFieldsSlice.SortField);
    const asc = useAppSelector(AdditionalFieldsSlice.Ascending);
    const status = useAppSelector(AdditionalFieldsSlice.Status);
    const parentID = useAppSelector(AdditionalFieldsSlice.ParentID);

    const valueListGroupData = useAppSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    const emptyRecord: SystemCenter.Types.AdditionalField = {
        ID: 0,
        ParentTable: '',
        FieldName: '',
        Type: 'string',
        ExternalDBTableID: 0,
        IsSecure: false,
        Searchable: false,
        IsInfo: false,
        IsKey: false,
    };
    const [record, setRecord] = React.useState<SystemCenter.Types.AdditionalField>(emptyRecord);
    const [origFields, setOrigFields] = React.useState<SystemCenter.Types.AdditionalField[]>(data);
    const [showDeleteWarning, setShowDeleteWarning] = React.useState<boolean>(false);
    const [showDisassociateWarning, setShowDisassociateWarning] = React.useState<boolean>(false);
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [showExisting, setShowExisting] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (!showExisting && (status == 'unintiated' || status == 'changed' || parentID !== props.ID))
            dispatch(AdditionalFieldsSlice.Fetch(props.ID));
    }, [showExisting, status, parentID, props.ID, parentID]);

    React.useEffect(() => {
        if (showExisting)
            dispatch(AdditionalFieldsSlice.Fetch());
    }, [showExisting]);

    React.useEffect(() => {
        if (valueListGroupStatus == 'unintiated' || valueListGroupStatus == 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);


    React.useEffect(() => {
        let e = [];
        if (record.FieldName == null || record.FieldName.length == 0) {
            e.push('A Field Name is required.');
        }

        setErrors(e);
    }, [record]);

    function Delete() {
        dispatch(AdditionalFieldsSlice.DBAction({ verb: 'DELETE', record: { ...record } }));
        setRecord(emptyRecord);
    }

    function AssociateField(fld) {
        dispatch(AdditionalFieldsSlice.DBAction({ verb: 'PATCH', record: { ...fld, ExternalDBTableID: props.ID } }));
    }

    function DisassociateField(fld) {
        dispatch(AdditionalFieldsSlice.DBAction({ verb: 'PATCH', record: { ...fld, ExternalDBTableID: null } }));
        setRecord(emptyRecord);
    }

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Fields:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div style={{ width: '100%', height: window.innerHeight - 421, maxHeight: window.innerHeight - 421, padding: 0, overflowY: 'auto' }}>
                        <Table<SystemCenter.Types.AdditionalField>
                            cols={[
                                { key: 'FieldName', field: 'FieldName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'ParentTable', field: 'ParentTable', label: 'Parent Table', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Type', field: 'Type', label: 'Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                {
                                    key: 'Searchable', label: 'Searchable', field: 'Searchable', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => item.Searchable ? HeavyCheckMark : CrossMark
                                },
                                {
                                    key: 'IsSecure', label: 'Secure', field: 'IsSecure', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => item.IsSecure ? HeavyCheckMark : CrossMark
                                },
                                {
                                    key: 'IsInfo', label: 'Info', field: 'IsInfo', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => item.IsInfo ? HeavyCheckMark : CrossMark
                                },
                                {
                                    key: 'IsKey', label: 'Key', field: 'IsKey', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => item.IsKey ? HeavyCheckMark : CrossMark
                                },
                                {
                                    key: 'btns', field: 'ID', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => <>
                                        <button className="btn btn-sm" onClick={(e) => {
                                            e.preventDefault();
                                            setRecord(item);
                                            setShowNew(true);
                                        }}>{Pencil}</button>
                                        <button className="btn btn-sm" onClick={(e) => {
                                            e.preventDefault();
                                            setRecord(item);
                                            setShowDeleteWarning(true);
                                        }}>{TrashCan}</button>
                                        <button className="btn btn-sm" onClick={(e) => {
                                            e.preventDefault();
                                            setRecord(item);
                                            setShowDisassociateWarning(true);
                                        }}>{CrossMark}</button>
                                    </>
                                },
                                { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                            ]}
                            tableClass="table table-hover"
                            data={data}
                            sortKey={sortKey}
                            ascending={asc}
                            onSort={(d) => {
                                if (d.colKey == 'btns' || d.colKey == 'scroll' || d.colField == null) return;
                                dispatch(AdditionalFieldsSlice.Sort({ SortField: d.colField, Ascending: !asc }));
                            }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', maxHeight: window.innerHeight - 455, }}
                            rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={() => false}
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary"
                        onClick={() => { setOrigFields(data); setShowExisting(true); }}
                    >Add Existing Field</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-primary"
                        onClick={() => { setRecord({ ...emptyRecord, ExternalDBTableID: props.ID }); setShowNew(true); }}
                    >Add New Field</button>
                </div>
            </div>
            <Warning
                Message={'This will permanently delete this External DB Table Field and cannot be undone.'}
                Show={showDeleteWarning} Title={'Delete ' + (record?.FieldName ?? 'External DB Table Field')}
                CallBack={(conf) => { if (conf) Delete(); setShowDeleteWarning(false); }} />

            <Warning
                Message={'This will disassociate this field from this External DB Table. The field will not be deleted and can be associated again.'}
                Show={showDisassociateWarning} Title={'Disassociate ' + (record?.FieldName ?? 'External DB Table Field') + ' From ' + (props.TableName ?? 'External DB Table')}
                CallBack={(conf) => {
                    if (conf) DisassociateField(record);
                    setShowDisassociateWarning(false);
                }} />

            <Modal Title={record.ID == 0 ? 'Add New Field' : 'Edit ' + (record?.FieldName ?? 'Field')} Show={showNew} ShowCancel={false} ConfirmText={record.ID == 0 ? 'Add' : 'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                DisableConfirm={errors.length > 0}
                ShowX={true} CallBack={(conf) => {
                    setShowNew(false);
                    if (conf && record.ID > 0)
                        dispatch(AdditionalFieldsSlice.DBAction({ verb: 'PATCH', record }));
                    else if (conf && record.ID == 0)
                        dispatch(AdditionalFieldsSlice.DBAction({ verb: 'POST', record }));
                }}
            >
                <ExternalDBTableFieldForm Record={record} Setter={setRecord} SetErrors={setErrors} />
            </Modal>

            {/* TODO: for some reason, you have to click on a column key to sort the table before any of the addl fields are populated that weren't part of the original fields */}
            <SelectPopup<SystemCenter.Types.AdditionalField>
                Slice={AdditionalFieldsSlice}
                Title={"Add Fields to " + (props.TableName ?? 'External DB Table')}
                Selection={origFields}
                OnClose={(selected, conf) => {
                    setShowExisting(false);

                    if (conf) {
                        selected.filter((s) => origFields.findIndex((o) => o.ID === s.ID) < 0).forEach((f) => AssociateField(f));
                        origFields.filter((o) => selected.findIndex((s) => s.ID === o.ID) < 0).forEach((f) => DisassociateField(f));
                    }
                }}
                Show={showExisting}
                Type={'multiple'}
                Columns={[
                    { key: 'FieldName', field: 'FieldName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'ParentTable', field: 'ParentTable', label: 'Parent Table', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Type', field: 'Type', label: 'Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    {
                        key: 'Searchable', label: 'Searchable', field: 'Searchable', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                        content: (item) => item.Searchable ? HeavyCheckMark : CrossMark
                    },
                    {
                        key: 'IsSecure', label: 'Secure', field: 'IsSecure', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                        content: (item) => item.IsSecure ? HeavyCheckMark : CrossMark
                    },
                    {
                        key: 'IsInfo', label: 'Info', field: 'IsInfo', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                        content: (item) => item.IsInfo ? HeavyCheckMark : CrossMark
                    },
                    {
                        key: 'IsKey', label: 'Key', field: 'IsKey', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                        content: (item) => item.IsKey ? HeavyCheckMark : CrossMark
                    },
                ]}
                Searchbar={(children) => <SearchBar<SystemCenter.Types.AdditionalField>
                        CollumnList={[
                            { label: 'Name', key: 'FieldName', type: 'string', isPivotField: false },
                            { label: 'Parent Table', key: 'ParentTable', type: 'string', isPivotField: false },
                            {
                                label: 'Type', key: 'Type', isPivotField: false, type: 'enum',
                                enum: [
                                    { Value: 'string', Label: 'string' },
                                    { Value: 'integer', Label: 'integer' },
                                    { Value: 'number', Label: 'number' }
                                ].concat(valueListGroupData.map(x => { return { Value: x.Name, Label: x.Name } }))
                            }
                        ]}
                        SetFilter={(flds) => dispatch(AdditionalFieldsSlice.DBSearch({ filter: flds }))}
                        Direction={'left'}
                        defaultCollumn={{ label: 'Name', key: 'FieldName', type: 'string', isPivotField: false }}
                        Width={'50%'}
                        Label={'Search'}
                        ShowLoading={status == 'loading'}
                        ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + searchData.length + ' Additional Field(s)'}
                    >
                        {children}
                    </SearchBar>
                }
            />

            
        </div>


    );

}