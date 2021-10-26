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
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { Modal, Search, SearchBar, ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import ExternalDBForm from './ExternalDBForm';

interface ExternalDB {
    ID: number, TableName: string, ExternalDB: string
}
declare var homePath: string;

const defaultSearchcols: Array<Search.IField<ExternalDB>> = [
    { label: 'TableName', key: 'TableName', type: 'string', isPivotField: false },
    { label: 'ExternalDB', key: 'ExternalDB', type: 'string', isPivotField: false },
];

const ByExternalDB: Application.Types.iByComponent = (props) => {
    let history = useHistory();

    const [search, setSearch] = React.useState<Array<Search.IFilter<ExternalDB>>>([]);
    const [data, setData] = React.useState<Array<ExternalDB>>([]);

    const [newExternalDB, setNewExternalDB] = React.useState<OpenXDA.Types.ExternalDataBase>(getNewExternalDB());
    const [sortKey, setSortKey] = React.useState<string>('TableName');
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<ExternalDB>>>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [newExternalDatabaseErrors, setNewExternalDatabaseErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        let handle = getExternalDB();
        handle.done((dt: string) => {
            setSearchState('Idle');
            setData(JSON.parse(dt) as Array<ExternalDB>);
        }).fail((d) => setSearchState('Error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [sortKey, ascending, search]);

    function getNewExternalDB(): OpenXDA.Types.ExternalDataBase {
        return {
            ID: 0,
            TableName: null,
            ExternalDB: 'Maximo',
            Query: ''
        }
    }

    function getData() {
        let handle = getExternalDB();
        handle.done((data: string) => {
            setSearchState('Idle');
            setData(JSON.parse(data) as OpenXDA.Types.ExternalDataBase[]);

        }).fail((d) => setSearchState('Error'));
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }

    }

    function addNewExternalDatabase() {
        $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/ExternalDBTables/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newExternalDB),
            cache: false,
            async: true
        }).done((data) => getData());

    }

    function getExternalDB(): JQuery.jqXHR<string> {
        setSearchState('Loading');
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/ExternalDBTables/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortKey, Ascending: ascending }),
            cache: false,
            async: true
        });
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ExternalDB&ID=' + item.row.ID, state: {} })
    }

    function nameExists(newDB: ExternalDB) {
        for (let i = 0; i < data.length; i++) {
            if (newDB.TableName === data[i].TableName) {
                return true;
            }
        }
        return false;
    }

    const standardSearch: Search.IField<ExternalDB> = { label: 'Name', key: 'TableName', type: 'string', isPivotField: false };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<ExternalDB>
                CollumnList={filterableList}
                SetFilter={(flds) => setSearch(flds)}
                Direction={'left'}
                defaultCollumn={standardSearch}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={searchState == 'Loading'}
                ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' External Database Table(s)'}
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
                                setNewExternalDB(getNewExternalDB());
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
                    data={data}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === "Scroll")
                            return;

                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colKey);
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
                CallBack={(conf) => { if (!nameExists(newExternalDB) && conf) addNewExternalDatabase(); setShowNew(false); }}
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

