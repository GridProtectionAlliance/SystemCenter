//******************************************************************************************************
//  ByExternalDB.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  10/12/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table'
import { useHistory } from "react-router-dom";
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { IsCron } from '@gpa-gemstone/helper-functions';
import ExternalDBForm from './ExternalDBForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ExternalDatabasesSlice } from '../Store/Store';
import moment from 'moment';

declare var homePath: string;

const ExternalDBSearchField: Array<Search.IField<SystemCenter.Types.DetailedExternalDatabases>> = [
    { label: 'Database Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Date of Last Data Update', key: 'LastDataUpdate', type: 'datetime', isPivotField: false },
    { label: 'Number of Mapped Tables', key: 'MappedTables', type: 'number', isPivotField: false },
    { label: 'Number of Mapped Fields', key: 'MappedFields', type: 'number', isPivotField: false },
];
const ExternalDBDefaultSearchField: Search.IField<SystemCenter.Types.DetailedExternalDatabases> = { label: 'Database Name', key: 'Name', type: 'string', isPivotField: false };
const emptyRecord = { ID: 0, Name: '', Schedule: '', ConnectionString: '', DataProviderString: '', Encrypt: false };

const ByExternalDB: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const data = useAppSelector(ExternalDatabasesSlice.SearchResults);
    const status = useAppSelector(ExternalDatabasesSlice.SearchStatus);
    const search = useAppSelector(ExternalDatabasesSlice.SearchFilters);
    const sortField = useAppSelector(ExternalDatabasesSlice.SortField);
    const ascending = useAppSelector(ExternalDatabasesSlice.Ascending);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [record, setRecord] = React.useState<SystemCenter.Types.ExternalDatabases>(emptyRecord);


    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(ExternalDatabasesSlice.DBSearch({ filter: search }));
    }, [status]);

    React.useEffect(() => {
        let e = [];
        if (record.Name == null || record.Name.length == 0)
            e.push('A Name is required.');
        else if (record.Name.length > 200)
            e.push('A Name of less than 200 characters is required.');
        if (record.Schedule?.length != 0 && (record.Schedule != null && !IsCron(record.Schedule)))
            e.push('Schedule must be in cron format.');

        setErrors(e);
    }, [record]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ExternalDB&ID=' + item.row.ID })
    }

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <div className="row">
                <div className="col">
                    <SearchBar<SystemCenter.Types.DetailedExternalDatabases>
                        CollumnList={ExternalDBSearchField}
                        SetFilter={(flds) => dispatch(ExternalDatabasesSlice.DBSearch({ filter: flds }))}
                        Direction={'left'}
                        defaultCollumn={ExternalDBDefaultSearchField}
                        Width={'50%'}
                        Label={'Search'}
                        StorageID="ExternalDatabasesFilter"
                        ShowLoading={status == 'loading'}
                        ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' External Database(s)'}
                    >
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <button className="btn btn-primary" onClick={(event) => {
                                        event.preventDefault()
                                        setRecord({ ...emptyRecord });
                                        setShowNew(true);
                                    }}>Add External Database</button>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
            </div>

            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <ReactTable.Table<SystemCenter.Types.DetailedExternalDatabases>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            dispatch(ExternalDatabasesSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        OnClick={handleSelect}
                        TableStyle={{
                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<SystemCenter.Types.DetailedExternalDatabases>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Database Name
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedExternalDatabases>
                            Key={'MappedTables'}
                            AllowSort={true}
                            Field={'MappedTables'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Mapped Tables
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedExternalDatabases>
                            Key={'MappedFields'}
                            AllowSort={true}
                            Field={'MappedFields'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Mapped Fields
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedExternalDatabases>
                            Key={'LastDataUpdate'}
                            AllowSort={true}
                            Field={'LastDataUpdate'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => {
                                if (item.LastDataUpdate == null || item.LastDataUpdate == '') return ''
                                else return moment(item.LastDataUpdate).format('MM/DD/YYYY HH:mm.ss.ssss')
                            }}
                        > Last Data Update
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>

            <Modal Title={'Add New External Database'}
                CallBack={(conf) => {
                    if (conf) {
                        record.Schedule = record.Schedule?.length == 0 ? null : record.Schedule;
                        dispatch(ExternalDatabasesSlice.DBAction({ verb: 'POST', record }));
                    }
                    setShowNew(false);
                }}
                Show={showNew}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Add ExternalDB'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                DisableConfirm={errors.length > 0} >
                <ExternalDBForm Record={record} Setter={setRecord} setErrors={setErrors} />
            </Modal>
        </div>
    )
}

export default ByExternalDB;

