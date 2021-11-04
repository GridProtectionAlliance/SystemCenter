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
import Table from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import ExternalDBForm from './ExternalDBForm';
import { useDispatch, useSelector } from 'react-redux';
import { ExternalDBTablesSlice } from '../Store/Store';

declare var homePath: string;

const defaultSearchcols: Array<Search.IField<SystemCenter.Types.ExternalDataBaseTable>> = [
    { label: 'TableName', key: 'TableName', type: 'string', isPivotField: false },
    { label: 'ExternalDB', key: 'ExternalDB', type: 'string', isPivotField: false },
];

const ByExternalDB: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    const blankExternalDB = {
        ID: 0,
        TableName: null,
        ExternalDB: 'Maximo',
        Query: ''
    }

    const [newExternalDB, setNewExternalDB] = React.useState<SystemCenter.Types.ExternalDataBaseTable>(blankExternalDB);
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [newExternalDatabaseErrors, setNewExternalDatabaseErrors] = React.useState<string[]>([]);
    const [sortKey, setSortKey] = React.useState<keyof SystemCenter.Types.ExternalDataBaseTable>('TableName');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const dispatch = useDispatch();
    const extDBStatus = useSelector(ExternalDBTablesSlice.Status) as Application.Types.Status;
    const searchResults = useSelector(ExternalDBTablesSlice.SearchResults);
    const searchState = useSelector(ExternalDBTablesSlice.SearchStatus);
    const searchFilters = useSelector(ExternalDBTablesSlice.SearchFilters);

    React.useEffect(() => {
        if (extDBStatus === 'unintiated' || extDBStatus === 'changed')
            dispatch(ExternalDBTablesSlice.Fetch());
    }, [dispatch, extDBStatus]);

    React.useEffect(() => {
        if (searchState === 'unintiated' || searchState === 'changed') 
            dispatch(ExternalDBTablesSlice.DBSearch({ filter: searchFilters, ascending: ascending, sortField: sortKey }));
    }, [dispatch, searchState]);

    React.useEffect(() => {
        dispatch(ExternalDBTablesSlice.DBSearch({ sortField: sortKey, ascending, filter: searchFilters }))
    }, [ascending, sortKey]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ExternalDB&ID=' + item.row.ID, state: {} })
    }

    const standardSearch: Search.IField<SystemCenter.Types.ExternalDataBaseTable> = { label: 'Name', key: 'TableName', type: 'string', isPivotField: false };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<SystemCenter.Types.ExternalDataBaseTable>
                CollumnList={defaultSearchcols}
                SetFilter={(flds) => dispatch(ExternalDBTablesSlice.DBSearch({ filter: flds, ascending: ascending, sortField: sortKey}))}
                Direction={'left'}
                defaultCollumn={standardSearch}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={searchState == 'loading'}
                ResultNote={searchState == 'error' ? 'Could not complete Search' : 'Found ' + searchResults.length + ' External Database Table(s)'}
                GetEnum={(setOptions, field) => {
                    let handle = null;
                    if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
                        return () => { };

                    handle = $.ajax({
                        type: "GET",
                        url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    });

                    handle.done(d => setOptions(d.map(item => ({ Value: item.ID, Label: item.Value }))))
                    return () => { if (handle != null && handle.abort == null) handle.abort(); }
                }}

            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => {
                                event.preventDefault()
                                setNewExternalDB(blankExternalDB);
                                setShowNew(true);
                            }}>Add External Database Table</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table
                    cols={[
                        { key: 'TableName', field: 'TableName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'ExternalDB', field: 'ExternalDB', label: 'External Database', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } }                      
                    ]}
                    tableClass="table table-hover"
                    data={searchResults}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === "Scroll")
                            return;

                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colField);
                        }
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <Modal Show={showNew} Title={'New External DataBase'}
                ShowCancel={true}
                CallBack={(conf) => { if(conf) dispatch(ExternalDBTablesSlice.DBAction({ verb: 'POST', record: newExternalDB })); setShowNew(false); }}
                DisableConfirm={newExternalDatabaseErrors.length > 0}
                ShowX={true}
                ConfirmShowToolTip={newExternalDatabaseErrors.length > 0}
                ConfirmToolTipContent={
                    newExternalDatabaseErrors.map((t, i) => <p key={i}> {CrossMark} {t} </p>)
                }>
                <ExternalDBForm ExternalDB={newExternalDB} Setter={setNewExternalDB} setErrors={setNewExternalDatabaseErrors} />
            </Modal>
        </div>
    )
}

export default ByExternalDB;

