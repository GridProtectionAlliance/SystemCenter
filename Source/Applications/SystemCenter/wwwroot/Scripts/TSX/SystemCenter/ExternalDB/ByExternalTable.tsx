//******************************************************************************************************
//  ByExternalTable.tsx - Gbtc
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
//  11/13/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table'
import { useHistory } from "react-router-dom";
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import ExternalDBTableForm from './ExternalDBTableForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ExternalDBTablesSlice } from '../Store/Store';

declare var homePath: string;

const ExternalDBSearchField: Array<Search.IField<SystemCenter.Types.DetailedExtDBTables>> = [
    { label: 'Table Name', key: 'TableName', type: 'string', isPivotField: false },
    { label: 'External Database', key: 'ExternalDB', type: 'string', isPivotField: false },
    { label: 'Number of Mapped Fields', key: 'MappedFields', type: 'number', isPivotField: false },
];
const ExternalDBDefaultSearchField: Search.IField<SystemCenter.Types.DetailedExtDBTables> = { label: 'Table Name', key: 'TableName', type: 'string', isPivotField: false };
const emptyRecord = { ID: -1, TableName: '', ExtDBID: -1, Query: ''};

const ByExternalTable: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const data = useAppSelector(ExternalDBTablesSlice.SearchResults);
    const status = useAppSelector(ExternalDBTablesSlice.SearchStatus);
    const search = useAppSelector(ExternalDBTablesSlice.SearchFilters);
    const sortField = useAppSelector(ExternalDBTablesSlice.SortField);
    const ascending = useAppSelector(ExternalDBTablesSlice.Ascending);
    const parentID = useAppSelector(ExternalDBTablesSlice.ParentID);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [record, setRecord] = React.useState<SystemCenter.Types.DetailedExtDBTables>(emptyRecord);

    React.useEffect(() => {
        if (parentID != null)
            dispatch(ExternalDBTablesSlice.Fetch());
    }, [parentID]);

    React.useEffect(() => {
        if ((status === 'unintiated' || status === 'changed') && parentID == null)
            dispatch(ExternalDBTablesSlice.DBSearch({ filter: search }));
    }, [status, parentID]);

    React.useEffect(() => {
        let e = [];
        if (record.TableName == null || record.TableName.length == 0)
            e.push('A Name is required.');
        else if (record.TableName.length > 200)
            e.push('A Name of less than 200 characters is required.');
        if (record.Query == null || record.Query.length == 0)
            e.push('A Query is required.');

        setErrors(e);
    }, [record]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ExternalTable&ID=' + item.row.ID })
    }

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <SearchBar<SystemCenter.Types.DetailedExtDBTables>
                CollumnList={ExternalDBSearchField}
                SetFilter={(flds) => dispatch(ExternalDBTablesSlice.DBSearch({ filter: flds }))}
                Direction={'left'}
                defaultCollumn={ExternalDBDefaultSearchField}
                Width={'50%'}
                Label={'Search'}
                StorageID="ExternalTablesFilter"
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' External Table(s)'}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" onClick={(event) => {
                                event.preventDefault()
                                setRecord({ ...emptyRecord });
                                setShowNew(true);
                            }}>Add External Table</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <ReactTable.Table<SystemCenter.Types.DetailedExtDBTables>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        dispatch(ExternalDBTablesSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    OnClick={handleSelect}
                    TableStyle={{
                        padding: 0, width: '100%', height: '100%',
                        tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 0
                    }}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<SystemCenter.Types.DetailedExtDBTables>
                        Key={'TableName'}
                        AllowSort={true}
                        Field={'TableName'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Table Name
                    </ReactTable.Column>
                    <ReactTable.Column<SystemCenter.Types.DetailedExtDBTables>
                        Key={'ExternalDB'}
                        AllowSort={true}
                        Field={'ExternalDB'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > External Database
                    </ReactTable.Column>
                    <ReactTable.Column<SystemCenter.Types.DetailedExtDBTables>
                        Key={'MappedFields'}
                        AllowSort={true}
                        Field={'MappedFields'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Mapped Fields
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Title={'Add New External Table'}
                CallBack={(conf) => {
                    if (conf) dispatch(ExternalDBTablesSlice.DBAction({ verb: 'POST', record }));
                    setShowNew(false);
                }}
                Show={showNew}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Add Table'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                DisableConfirm={errors.length > 0} >
                <ExternalDBTableForm Record={record} Setter={setRecord} SetErrors={setErrors} ShowSelectExternalDB={true} />
            </Modal>
        </div>
    )
}

export default ByExternalTable;

