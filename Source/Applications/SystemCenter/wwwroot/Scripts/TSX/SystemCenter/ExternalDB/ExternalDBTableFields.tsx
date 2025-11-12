//******************************************************************************************************
//  ExternalDBTableFields.tsx - Gbtc
//
//  Copyright � 2023, Grid Protection Alliance.  All Rights Reserved.
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
import * as _ from 'lodash';
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { useAppSelector, useAppDispatch } from '../hooks';
import { AdditionalFieldsSlice, ValueListGroupSlice } from '../Store/Store';
import AdditionalFieldForm from '../AdditionalFields/AdditionalFieldForm';
import { Table, Column } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { LoadingScreen, Modal, SearchBar, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { SelectPopup } from '@gpa-gemstone/common-pages';

const emptyRecord: SystemCenter.Types.AdditionalFieldView = {
    ID: 0,
    ParentTable: '',
    FieldName: '',
    Type: 'string',
    ExternalDBTableID: 0,
    IsSecure: false,
    Searchable: false,
    IsInfo: false,
    IsKey: false,
    ExternalDB: null
};
const filterStorage = "ExternalDBTableFields";

export default function ExternalDBTableFields(props: { TableName: string, ID: number }) {

    const dispatch = useAppDispatch();

    const data = useAppSelector(AdditionalFieldsSlice.Data);
    const status = useAppSelector(AdditionalFieldsSlice.Status);
    const searchData = useAppSelector(AdditionalFieldsSlice.SearchResults);
    const searchStatus = useAppSelector(AdditionalFieldsSlice.SearchStatus);

    const valueListGroupData = useAppSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    const [fieldsInTable, setFieldsInTable] = React.useState<SystemCenter.Types.AdditionalFieldView[]>([]);
    const parentID = React.useRef<number>(-1);
    const [tableStatus, setTableStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [asc, setAsc] = React.useState<boolean>(true);
    const [sortKey, setSortKey] = React.useState<string>('FieldName');

    const [record, setRecord] = React.useState<SystemCenter.Types.AdditionalFieldView>(emptyRecord);
    const [showRemove, setShowRemove] = React.useState<boolean>(false);
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [showExisting, setShowExisting] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [warnings, setWarnings] = React.useState<string[]>([]);

    const [overWriteFields, setOverWriteFields] = React.useState<SystemCenter.Types.AdditionalFieldView[]>([]);

    React.useEffect(() => {
        if (status !== 'idle') return;
        if (tableStatus === 'uninitiated' || tableStatus === 'changed' || parentID.current !== props.ID) {
            setTableStatus('loading');
            parentID.current = props.ID;
            const handle = $.ajax({
                type: "GET",
                url: `${homePath}api/SystemCenter/AdditionalFieldView/${parentID.current}/${sortKey}/${asc ? '1' : '0'}`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: false,
                async: true
            });
            handle.done((results) => {
                sortData(JSON.parse(results.toString()));
                setTableStatus('idle');
            });
            handle.fail(() => {
                setTableStatus('error');
            });
        }
    }, [tableStatus, props.ID, status]);

    React.useEffect(() => {
        sortData(fieldsInTable);
    }, [sortKey, asc]);

    React.useEffect(() => {
        if (status === 'uninitiated' || status === 'changed')
            dispatch(AdditionalFieldsSlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        if (valueListGroupStatus === 'uninitiated' || valueListGroupStatus === 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);

    /* TODO: we don't have any way to filter for null values here... this might need a gsf update
    React.useEffect(() => {
        localStorage.setItem(filterStorage, JSON.stringify([{
            FieldName: "ExternalDB",
            SearchText: ``,
            Operator: "LIKE",
            Type: "integer",
            IsPivotColumn: false
        }]));
    }, [props.ID]);
    */

    const sortData = React.useCallback((sortData: SystemCenter.Types.AdditionalFieldView[]) => {
        setFieldsInTable(_.orderBy(sortData, [sortKey], [(asc ? "asc" : "desc")]));
    }, [setFieldsInTable, sortKey, asc]);

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
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Fields:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <LoadingScreen Show={tableStatus === 'loading'} />
                                    {tableStatus === 'error' ?
                                        <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} /> :
                                        <Table<SystemCenter.Types.AdditionalFieldView>
                                            TableClass="table table-hover"
                                            Data={fieldsInTable}
                                            SortKey={sortKey}
                                            Ascending={asc}
                                            OnSort={(d) => {
                                                if (d.colKey == 'btns') return;
                                                if (d.colKey === sortKey) setAsc(prev => !prev);
                                                else setSortKey(d.colKey);
                                            }}
                                            TheadStyle={{ fontSize: 'smaller' }}
                                            RowStyle={{ fontSize: 'smaller' }}
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
                                            > ParentType
                                            </Column>
                                            <Column<SystemCenter.Types.AdditionalFieldView>
                                                Key={'Type'}
                                                AllowSort={true}
                                                Field={'Type'}
                                                HeaderStyle={{ width: 'auto' }}
                                                RowStyle={{ width: 'auto' }}
                                            > Field type
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
                                                Content={({ item }) => item.IsSecure ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" /> }
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
                                            <Column<SystemCenter.Types.AdditionalFieldView>
                                                Key={'btns'}
                                                AllowSort={false}
                                                HeaderStyle={{ width: 'auto' }}
                                                RowStyle={{ width: 'auto' }}
                                                Content={({ item }) => <>
                                                    <button className="btn btn-sm" onClick={(e) => {
                                                        e.preventDefault();
                                                        setRecord(item);
                                                        setShowNew(true);
                                                    }}><ReactIcons.Pencil Color="var(--warning)" Size={20} /></button>
                                                    <button className="btn btn-sm" onClick={(e) => {
                                                        e.preventDefault();
                                                        setRecord(item);
                                                        setShowRemove(true);
                                                    }}><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></button>
                                                </>}
                                            > <p></p>
                                            </Column>
                                        </Table>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className="btn btn-info"
                                onClick={() => { setShowExisting(true); }}
                            >Add Existing Field</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-info"
                                onClick={() => { setRecord({ ...emptyRecord, ExternalDBTableID: props.ID }); setShowNew(true); }}
                            >Add New Field</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                Title={'Remove ' + (record?.FieldName ?? 'Field')}
                Show={showRemove}
                CallBack={() => setShowRemove(false)}
                ShowCancel={false}
                ConfirmText={'Close'}
            >
                <button className="btn btn-danger btn-block" onClick={() => { setTableStatus('changed'); DisassociateField(record); setShowRemove(false); }}>Remove Field From Table</button>
                <button className="btn btn-danger btn-block" onClick={() => { setTableStatus('changed'); Delete(); setShowRemove(false); }}>Delete Field Permanently</button>
            </Modal>

            <Warning Title={'Overwrite Field Association'} Show={overWriteFields.length !== 0} CallBack={c => {
                if (c) {
                    overWriteFields.forEach((f) => AssociateField(f));
                    setTableStatus('changed');
                }
                setOverWriteFields([]);
            }} Message={`Associating the selected ${overWriteFields.length} field(s) with ${props.TableName ?? 'this table'} will overwrite an existing connection in ${overWriteFields.filter(f => f.ExternalDBTableID != null).length} field(s). This cannot be undone.`} />

            <Modal
                Title={record.ID == 0 ? 'Add New Field' : 'Edit ' + (record?.FieldName ?? 'Field')}
                Show={showNew}
                ShowCancel={false}
                ConfirmText={record.ID == 0 ? 'Add' : 'Save'}
                ConfirmShowToolTip={errors.length > 0 || warnings.length > 0}
                ConfirmToolTipContent={
                    <>
                        {warnings.map((w, i) => <p key={i}><ReactIcons.Warning Color="var(--warning)" /> {w}</p>)}
                        {errors.map((e, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {e}</p>)}
                    </>
                }
                DisableConfirm={errors.length > 0}
                ShowX={true}
                CallBack={(conf) => {
                    setShowNew(false);
                    if (conf) {
                        setTableStatus('changed');
                        if (record.ID > 0) dispatch(AdditionalFieldsSlice.DBAction({ verb: 'PATCH', record }));
                        else if (record.ID == 0) dispatch(AdditionalFieldsSlice.DBAction({ verb: 'POST', record }));
                    }
                }}
            >
                <AdditionalFieldForm Record={record} Setter={setRecord} SetErrors={setErrors} SetWarnings={setWarnings} ShowDatabaseSelect={false} />
            </Modal>

            <SelectPopup<SystemCenter.Types.AdditionalFieldView>
                Slice={AdditionalFieldsSlice}
                Title={"Add Fields to " + (props.TableName ?? 'Table')}
                Selection={fieldsInTable}
                OnClose={(selected, conf) => {
                    setShowExisting(false);
                    if (conf) {
                        setTableStatus('changed');
                        const associateFields = selected.filter((s) => fieldsInTable.findIndex((o) => o.ID === s.ID) < 0);
                        if (associateFields.findIndex(f => f.ExternalDBTableID != null) !== -1) setOverWriteFields(associateFields);
                        else associateFields.forEach((f) => AssociateField(f));
                        fieldsInTable.filter((o) => selected.findIndex((s) => s.ID === o.ID) < 0).forEach((f) => DisassociateField(f));
                    }
                }}
                Show={showExisting}
                Type={'multiple'}
                Searchbar={(children) => <SearchBar<SystemCenter.Types.AdditionalField>
                    CollumnList={[
                        { label: 'Name', key: 'FieldName', type: 'string', isPivotField: false },
                        { label: 'Parent Type', key: 'ParentTable', type: 'string', isPivotField: false },
                        { label: 'External Database', key: 'ExternalDB', type: 'string', isPivotField: false },
                        {
                            label: 'Field Type', key: 'Type', isPivotField: false, type: 'enum',
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
                    ShowLoading={searchStatus == 'loading'}
                    StorageID={filterStorage}
                    ResultNote={searchStatus == 'error' ? 'Could not complete Search' : 'Found ' + searchData.length + ' Additional Field(s)'}
                >
                    {children}
                    <Column Key="FieldName" Field="FieldName" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >Name</Column>
                    <Column Key="ParentTable" Field="ParentTable" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >Parent Type</Column>
                    <Column Key="Type" Field="Type" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >Field Type</Column>
                    <Column Key="ExternalDB" Field="ExternalDB" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >External Database</Column>
                    <Column Key="ExternalTable" Field="ExternalTable" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                    >External Table</Column>
                    <Column Key="Searchable" Field="Searchable" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        Content={row => row.item ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" />}
                    >Searchable</Column>
                    <Column Key="IsSecure" Field="IsSecure" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        Content={row => row.item ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" />}
                    >Secure</Column>
                    <Column Key="IsInfo" Field="IsInfo" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        Content={row => row.item ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" />}
                    >Info</Column>
                    <Column Key="IsKey" Field="IsKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        Content={row => row.item ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" />}
                    >Key</Column>
                </SearchBar>
                }
            />            
        </div>


    );

}