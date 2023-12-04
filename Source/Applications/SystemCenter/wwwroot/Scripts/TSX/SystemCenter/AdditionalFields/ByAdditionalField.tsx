//******************************************************************************************************
//  ByAdditionalField.tsx - Gbtc
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
//  10/09/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '@gpa-gemstone/react-table';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { CrossMark, HeavyCheckMark, Warning as WarningIcon } from '@gpa-gemstone/gpa-symbols';
import AdditionalFieldForm from './AdditionalFieldForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AdditionalFieldsSlice, ValueListGroupSlice } from '../Store/Store';

const AdditionalFieldDefaultSearchField: Search.IField<SystemCenter.Types.AdditionalFieldView> = { label: 'Name', key: 'FieldName', type: 'string', isPivotField: false };
const emptyRecord: SystemCenter.Types.AdditionalField = {
    ID: 0,
    ParentTable: 'Meter',
    FieldName: '',
    Type: 'string',
    ExternalDBTableID: null,
    IsSecure: false,
    Searchable: false,
    IsInfo: false,
    IsKey: false
};

const ByAdditionalField: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(AdditionalFieldsSlice.SearchResults);
    const status = useAppSelector(AdditionalFieldsSlice.SearchStatus);
    const search = useAppSelector(AdditionalFieldsSlice.SearchFilters);
    const sortField = useAppSelector(AdditionalFieldsSlice.SortField);
    const ascending = useAppSelector(AdditionalFieldsSlice.Ascending);
    const parentID = useAppSelector(AdditionalFieldsSlice.ParentID);

    const valueListGroupData = useAppSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [warnings, setWarnings] = React.useState<string[]>([]);
    const [mode, setMode] = React.useState<'View' | 'Add' | 'Edit'>('View');
    const [record, setRecord] = React.useState<SystemCenter.Types.AdditionalField>(emptyRecord);

    const AdditionalFieldSearchField: Array<Search.IField<SystemCenter.Types.AdditionalFieldView>> = [
        { label: 'Name', key: 'FieldName', type: 'string', isPivotField: false },
        { label: 'External Database', key: 'ExternalDB', type: 'string', isPivotField: false },
        { label: 'External Table', key: 'ExternalTable', type: 'string', isPivotField: false },
        {
            label: 'Parent Type', key: 'ParentTable', type: 'enum', isPivotField: false,
            enum: [
                { Value: 'Meter', Label: 'Meter' },
                { Value: 'Location', Label: 'Substation' },
                { Value: 'Customer', Label: 'Customer' },
                { Value: 'Company', Label: 'Company' },
                { Value: 'Asset', Label: 'Asset' },
                { Value: 'Line', Label: 'Line' },
                { Value: 'LineSegment', Label: 'Line Segment' },
                { Value: 'Breaker', Label: 'Breaker' },
                { Value: 'CapacitorBank', Label: 'Capacitor Bank' },
                { Value: 'Transformer', Label: 'Transformer' },
                { Value: 'CapacitorBankRelay', Label: 'Capacitor Bank Relay' },
                { Value: 'DER', Label: 'DER' }
            ]
        },
        // Todo: maybe override query results to allow for ExternalDBTableID to be used as a boolean?
        // { label: 'External DB', key: 'ExternalDBTableID', type: 'boolean', isPivotField: false },
        {
            label: 'Field Type', key: 'Type', isPivotField: false, type: 'enum',
            enum: [
                { Value: 'string', Label: 'string' },
                { Value: 'integer', Label: 'integer' },
                { Value: 'number', Label: 'number' }
            ].concat(valueListGroupData.map(x => { return { Value: x.Name, Label: x.Name } }))
        }
    ];

    React.useEffect(() => {
        if (parentID !== null)
            dispatch(AdditionalFieldsSlice.Fetch());
    }, [parentID]);

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(AdditionalFieldsSlice.DBSearch({ filter: search }));
    }, [status]);


    React.useEffect(() => {
        if (valueListGroupStatus == 'unintiated' || valueListGroupStatus == 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<SystemCenter.Types.AdditionalFieldView>
                CollumnList={AdditionalFieldSearchField}
                SetFilter={(flds) => dispatch(AdditionalFieldsSlice.DBSearch({ filter: flds }))}
                Direction={'left'}
                defaultCollumn={AdditionalFieldDefaultSearchField}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Additional Field(s)'}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => {
                                event.preventDefault()
                                setRecord({ ...emptyRecord });
                                setMode('Add');
                            }}>Add Additional Field</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<SystemCenter.Types.AdditionalFieldView>
                    cols={[
                        { key: 'FieldName', field: 'FieldName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        {
                            key: 'ParentTable', field: 'ParentTable', label: 'Parent Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                            content: (item) => item.ParentTable != '' ? item.ParentTable : 'No Associated Table'
                        },
                        { key: 'ExternalDB', field: 'ExternalDB', label: 'External DB', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'ExternalTable', field: 'ExternalTable', label: 'External Table', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Type', field: 'Type', label: 'Field Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
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
                        { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === null) return;
                        dispatch(AdditionalFieldsSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    onClick={(item) => { setRecord(item.row); setMode('Edit'); }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <Modal Title={mode === 'Add' ? 'Add New Additional Field' : 'Edit ' + record.FieldName}
                CallBack={(conf, isBtn) => {
                    if (conf)
                        dispatch(AdditionalFieldsSlice.DBAction({ verb: mode === 'Add' ? 'POST' : 'PATCH', record }));
                    else if (isBtn)
                        dispatch(AdditionalFieldsSlice.DBAction({ verb: 'DELETE', record }));
                    setMode('View');
                }}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={mode === 'Add' ? 'Add Field' : 'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    <>
                        {warnings.map((w, i) => <p key={i}>{WarningIcon} {w}</p>)}
                        {errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                    </>
                }
                DisableConfirm={errors.length > 0}
                ShowCancel={mode === 'Edit'}
                CancelText={'Delete'}
                Show={mode === 'Add' || mode === 'Edit'} >
                <AdditionalFieldForm Record={record} Setter={setRecord} SetErrors={setErrors} SetWarnings={setWarnings} ShowDatabaseSelect={true} />
            </Modal>
        </div>
    )
}

export default ByAdditionalField;

