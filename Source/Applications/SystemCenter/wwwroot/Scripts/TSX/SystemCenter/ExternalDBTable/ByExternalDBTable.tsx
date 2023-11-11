//******************************************************************************************************
//  ByExternalDBTable.tsx - Gbtc
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
//  11/10/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '@gpa-gemstone/react-table'
import { useHistory } from "react-router-dom";
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ExternalDatabasesSlice, ExternalDBTablesSlice } from '../Store/Store';

declare var homePath: string;

const ByExternalDBTable: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const data = useAppSelector(ExternalDBTablesSlice.SearchResults);
    const status = useAppSelector(ExternalDBTablesSlice.SearchStatus);
    const search = useAppSelector(ExternalDBTablesSlice.SearchFilters);
    const sortField = useAppSelector(ExternalDBTablesSlice.SortField);
    const ascending = useAppSelector(ExternalDBTablesSlice.Ascending);

    const externalDBData = useAppSelector(ExternalDatabasesSlice.Data);
    const externalDBStatus = useAppSelector(ExternalDatabasesSlice.Status);

    const ExternalDBTableSearchField: Array<Search.IField<SystemCenter.Types.extDBTables>> = [
        { label: 'Database Name', key: 'Name', type: 'string', isPivotField: false },
    ];
    const ExternalDBTableDefaultSearch: Search.IField<SystemCenter.Types.extDBTables> = { label: 'Name', key: 'TableName', type: 'string', isPivotField: false };

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(ExternalDBTablesSlice.DBSearch({ filter: search }));
    }, [status]);

    React.useEffect(() => {
        if (externalDBStatus === 'unintiated' || externalDBStatus === 'changed')
            dispatch(ExternalDatabasesSlice.Fetch());
    }, [externalDBStatus]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ExternalDBTable&ID=' + item.row.ID })
    }


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<SystemCenter.Types.extDBTables>
                CollumnList={ExternalDBTableSearchField}
                SetFilter={(flds) => dispatch(ExternalDBTablesSlice.DBSearch({ filter: flds }))}
                Direction={'left'}
                defaultCollumn={ExternalDBTableDefaultSearch}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' External Database Tables(s)'} >
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table
                    cols={[
                        { key: 'Name', field: 'TableName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        {
                            key: 'ExternalDB', field: 'ExtDBID', label: 'External DB', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                            content: (item) => externalDBData.find((d) => d.ID == item.ExtDBID)
                        },
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
        </div>
    )
}

export default ByExternalDBTable;

