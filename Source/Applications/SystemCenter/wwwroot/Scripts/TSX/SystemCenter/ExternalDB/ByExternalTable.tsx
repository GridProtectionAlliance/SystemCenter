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
import Table from '@gpa-gemstone/react-table'
import { useHistory } from "react-router-dom";
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import ExternalDBTableForm from './ExternalDBTableForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ExternalDBTablesSlice } from '../Store/Store';

declare var homePath: string;

const ExternalDBSearchField: Array<Search.IField<SystemCenter.Types.extDBTables>> = [
    { label: 'Table Name', key: 'TableName', type: 'string', isPivotField: false },
];
const ExternalDBDefaultSearchField: Search.IField<SystemCenter.Types.extDBTables> = { label: 'Table Name', key: 'TableName', type: 'string', isPivotField: false };
const emptyRecord = { ID: -1, TableName: '', ExtDBID: -1, Query: ''};

const ByExternalTable: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const data = useAppSelector(ExternalDBTablesSlice.SearchResults);
    const status = useAppSelector(ExternalDBTablesSlice.SearchStatus);
    const search = useAppSelector(ExternalDBTablesSlice.SearchFilters);
    const sortField = useAppSelector(ExternalDBTablesSlice.SortField);
    const ascending = useAppSelector(ExternalDBTablesSlice.Ascending);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [record, setRecord] = React.useState<SystemCenter.Types.extDBTables>(emptyRecord);

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(ExternalDBTablesSlice.DBSearch({ filter: search }));
    }, [status]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ExternalDBTable&ID=' + item.row.ID })
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<SystemCenter.Types.extDBTables>
                CollumnList={ExternalDBSearchField}
                SetFilter={(flds) => dispatch(ExternalDBTablesSlice.DBSearch({ filter: flds }))}
                Direction={'left'}
                defaultCollumn={ExternalDBDefaultSearchField}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' External Table(s)'}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => {
                                event.preventDefault()
                                setRecord({ ...emptyRecord });
                                setShowNew(true);
                            }}>Add External Table</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table
                    cols={[
                        { key: 'TableName', field: 'TableName', label: 'Table Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        /* ToDo: Add this, requires custom view on backend to make sorting not wierd
                        { key: 'ExtDBID', field: 'ExtDBID', label: 'External Database', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => extDbData.find(db => db.ID === item.ExtDBID).Name },
                        */
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } }                      
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === null) return;
                        dispatch(ExternalDBTablesSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
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

