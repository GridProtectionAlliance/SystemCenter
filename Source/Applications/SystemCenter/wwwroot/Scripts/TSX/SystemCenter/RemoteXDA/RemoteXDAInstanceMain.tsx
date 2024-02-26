//******************************************************************************************************
//  RemoteXDAInstanceMain.tsx - Gbtc
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
//  05/03/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RemoteXDAInstanceSlice } from '../Store/Store';
import { RemoteXDAInstanceForm, BlankRemoteXDAInstance } from './RemoteXDAInstanceForm';

declare var homePath: string;

const defaultSearchcols: Array<Search.IField<OpenXDA.Types.RemoteXDAInstance>> = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'URL', key: 'Address', type: 'string', isPivotField: false },
];

const RemoteXDAInstanceMain: Application.Types.iByComponent = (props) => {
    let history = useHistory();

    const [showNew, setShowNew] = React.useState<boolean>(false);

    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.RemoteXDAInstance>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [formInstance, setFormInstance] = React.useState<OpenXDA.Types.RemoteXDAInstance>(BlankRemoteXDAInstance);

    const dispatch = useAppDispatch();
    const instStatus = useAppSelector(RemoteXDAInstanceSlice.Status) as Application.Types.Status;
    const searchResults = useAppSelector(RemoteXDAInstanceSlice.SearchResults);
    const searchState = useAppSelector(RemoteXDAInstanceSlice.SearchStatus);
    const searchFilters = useAppSelector(RemoteXDAInstanceSlice.SearchFilters);

    React.useEffect(() => {
        if (instStatus === 'unintiated' || instStatus === 'changed')
            dispatch(RemoteXDAInstanceSlice.Fetch());
    }, [dispatch, instStatus]);

    React.useEffect(() => {
        if (searchState === 'unintiated' || searchState === 'changed')
            dispatch(RemoteXDAInstanceSlice.DBSearch({ filter: searchFilters, ascending: ascending, sortField: sortKey }));
    }, [dispatch, searchState]);

    React.useEffect(() => {
        dispatch(RemoteXDAInstanceSlice.DBSearch({ sortField: sortKey, ascending, filter: searchFilters }))
    }, [ascending, sortKey]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=RemoteXDAInstance&ID=' + item.row.ID, state: {} })
    }

    const standardSearch: Search.IField<OpenXDA.Types.RemoteXDAInstance> = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<OpenXDA.Types.RemoteXDAInstance>
                CollumnList={defaultSearchcols}
                SetFilter={(flds) => dispatch(RemoteXDAInstanceSlice.DBSearch({ filter: flds, ascending: ascending, sortField: sortKey }))}
                Direction={'left'}
                defaultCollumn={standardSearch}
                Width={'50%'}
                Label={'Search'}
                StorageID="RemoteOpenXDAInstancesFilter"
                ShowLoading={searchState == 'loading'}
                ResultNote={searchState == 'error' ? 'Could not complete Search' : 'Found ' + searchResults.length + ' Remote openXDA Intance(s)'}
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
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0} onClick={(event) => {
                                if (props.Roles.indexOf('Administrator') > -1) {
                                    event.preventDefault();
                                    setShowNew(true);
                                }
                            }}>Add Remote Connection</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <ReactTable.Table<OpenXDA.Types.RemoteXDAInstance>
                    TableClass="table table-hover"
                    Data={searchResults}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colField);
                        }
                    }}
                    OnClick={handleSelect}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<OpenXDA.Types.RemoteXDAInstance>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<OpenXDA.Types.RemoteXDAInstance>
                        Key={'Address'}
                        AllowSort={true}
                        Field={'Address'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > URL
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Show={showNew} Title={'New Remote openXDA Instance Connection'}
                ShowCancel={true}
                CallBack={(conf) => { if (conf) dispatch(RemoteXDAInstanceSlice.DBAction({ verb: 'POST', record: formInstance })); setShowNew(false); }}
                DisableConfirm={newInstErrors.length > 0}
                ShowX={true}
                ConfirmShowToolTip={newInstErrors.length > 0}
                ConfirmToolTipContent={
                    newInstErrors.map((t, i) => <p key={i}> {CrossMark} {t} </p>)
                }>
                <RemoteXDAInstanceForm BaseInstance={BlankRemoteXDAInstance} SetInstance={setFormInstance} SetErrors={setNewInstErrors} RenderPortalId={'userModal'}/>
            </Modal>

            { /* Portal endpoint for inner modal for new remote instance connection */ }
            <div id='userModal' />
        </div>
    )
}

export default RemoteXDAInstanceMain;

