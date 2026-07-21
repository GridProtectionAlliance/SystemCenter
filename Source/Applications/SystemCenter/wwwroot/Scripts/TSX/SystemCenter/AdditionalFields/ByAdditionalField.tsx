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
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { LoadingScreen, GenericController, Modal, Search, SearchBar, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import AdditionalFieldForm from './AdditionalFieldForm';

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

    const [data, setData] = React.useState<SystemCenter.Types.AdditionalFieldView[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [search, setSearch] = React.useState<Search.IFilter<SystemCenter.Types.AdditionalFieldView>[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);

    const [valueListGroupData, setValueListGroupData] = React.useState<SystemCenter.Types.ValueListGroup[]>([]);
    const [valueListGroupStatus, setValueListGroupStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.AdditionalFieldView>("FieldName")
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [errors, setErrors] = React.useState<string[]>([]);
    const [warnings, setWarnings] = React.useState<string[]>([]);
    const [mode, setMode] = React.useState<'View' | 'Add' | 'Edit'>('View');
    const [record, setRecord] = React.useState<SystemCenter.Types.AdditionalField>(emptyRecord);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false)

    const additionalFieldViewController = React.useMemo(() => new GenericController<SystemCenter.Types.AdditionalFieldView>(`${homePath}api/SystemCenter/AdditionalFieldView`, "FieldName", true),[])

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
                { Value: 'Bus', Label: 'Bus' },
                { Value: 'Line', Label: 'Line' },
                { Value: 'LineSegment', Label: 'Line Segment' },
                { Value: 'Breaker', Label: 'Breaker' },
                { Value: 'CapBank', Label: 'Capacitor Bank' },
                { Value: 'Transformer', Label: 'Transformer' },
                { Value: 'CapBankRelay', Label: 'Capacitor Bank Relay' },
                { Value: 'DER', Label: 'DER' },
                { Value: 'Generation', Label: 'Generation' },
                { Value: 'StationAux', Label: 'Station Auxiliary' },
                { Value: 'StationBattery', Label: 'Station Battery'}
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
        setStatus('loading')
        const h = additionalFieldViewController.PagedSearch(search, sortField, ascending, page);

        h.done((d) => {
            setData(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setRecordsPerPage(d.RecordsPerPage);
            setTotalRecords(d.TotalRecords);
            if (page >= d.NumberOfPages)
                setPage(d.NumberOfPages - 1);
            setStatus('idle');
        })

        h.fail(() => setStatus('error'))

        return () => {
            if (h != null && h.abort != null)
                h.abort()
        }

    }, [search, sortField, ascending, page, additionalFieldViewController, refreshTrigger]);

    React.useEffect(() => {
        setValueListGroupStatus('loading')

        const h = new GenericController<SystemCenter.Types.ValueListGroup>(`${homePath}api/ValueListGroup`, 'Name').Fetch();

        h.done((d) => {
            setValueListGroupData(d);
            setValueListGroupStatus('idle');
        })

        h.fail(() => setValueListGroupStatus('error'))

        return () => {
            if (h != null && h.abort != null)
                h.abort()
        }
    }, []);

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={ valueListGroupStatus === 'loading' || status === 'loading'} />
            <ServerErrorIcon Show={ valueListGroupStatus === 'error' || status === 'error'} />
            <div className="row">
                <div className="col">
                    <SearchBar<SystemCenter.Types.AdditionalFieldView>
                        CollumnList={AdditionalFieldSearchField}
                        SetFilter={setSearch}
                        Direction={'left'}
                        defaultCollumn={AdditionalFieldDefaultSearchField}
                        Width={'50%'}
                        StorageID="AdditionalFieldsFilter"
                        Label={'Search'}
                        ShowLoading={status == 'loading'}
                        ResultNote={status == 'error' ? 'Could not complete Search' : `Displaying Additional Field(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + data.length} out of ${totalRecords}`}
                    >
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <button className="btn btn-info btn-block" onClick={(event) => {
                                        event.preventDefault()
                                        setRecord({ ...emptyRecord });
                                        setMode('Add');
                                    }}>Add Additional Field</button>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
            </div>

            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<SystemCenter.Types.AdditionalFieldView>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField as string}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortField)
                                setAscending(a => !a)
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                            }
                        }}
                        OnClick={(item) => { setRecord(item.row); setMode('Edit'); }}
                        TableStyle={{
                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
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
                            Key={'ParentTable'}
                            AllowSort={true}
                            Field={'ParentTable'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.ParentTable != '' ? (item.ParentTable === 'Location' ? 'Substation' : item.ParentTable) : 'No Associated Table' }
                        > Parent Type
                        </Column>
                        <Column<SystemCenter.Types.AdditionalFieldView>
                            Key={'ExternalDB'}
                            AllowSort={true}
                            Field={'ExternalDB'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > External DB
                        </Column>
                        <Column<SystemCenter.Types.AdditionalFieldView>
                            Key={'ExternalTable'}
                            AllowSort={true}
                            Field={'ExternalTable'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > External Table
                        </Column>
                        <Column<SystemCenter.Types.AdditionalFieldView>
                            Key={'Type'}
                            AllowSort={true}
                            Field={'Type'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Field Type
                        </Column>
                        <Column<SystemCenter.Types.AdditionalFieldView>
                            Key={'Searchable'}
                            AllowSort={true}
                            Field={'Searchable'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.Searchable ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" /> }
                        > Searchable
                        </Column>
                        <Column<SystemCenter.Types.AdditionalFieldView>
                            Key={'IsSecure'}
                            AllowSort={true}
                            Field={'IsSecure'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.IsSecure ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark  Color="var(--danger)" /> }
                        > Secure
                        </Column>
                        <Column<SystemCenter.Types.AdditionalFieldView>
                            Key={'IsInfo'}
                            AllowSort={true}
                            Field={'IsInfo'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.IsInfo ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" /> }
                        > Info
                        </Column>
                        <Column<SystemCenter.Types.AdditionalFieldView>
                            Key={'IsKey'}
                            AllowSort={true}
                            Field={'IsKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.IsKey ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" /> }
                        > Key
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Paging
                        Current={page + 1}
                        Total={totalPages}
                        SetPage={(p) =>setPage(p - 1)}
                    />
                </div>
            </div>
            <Modal Title={mode === 'Add' ? 'Add New Additional Field' : 'Edit ' + record.FieldName}
                CallBack={(conf, isBtn) => {
                    if (conf)
                        additionalFieldViewController.DBAction(mode === 'Add' ? 'POST' : 'PATCH', record).done(() => setRefreshTrigger(val => !val));
                    else if (isBtn)
                        additionalFieldViewController.DBAction('DELETE', record).done(() => setRefreshTrigger(val => !val));
                    setMode('View');
                }}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Save'}
                ConfirmShowToolTip={errors.length + warnings.length > 0}
                ConfirmToolTipContent={
                    <>
                        {warnings.map((w, i) => <p key={i}><ReactIcons.Warning Color="var(--warning)" /> {w}</p>)}
                        {errors.map((e, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {e}</p>)}
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

