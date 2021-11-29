//******************************************************************************************************
//  DBCleanup.tsx - Gbtc
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
//  11/24/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Input, TextArea } from '@gpa-gemstone/react-forms';
import Table from '@gpa-gemstone/react-table';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { SearchBar, Search, Modal, Warning, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { useDispatch, useSelector } from 'react-redux';
import { DBCleanupSlice } from '../Store/Store';

export interface DBCleanup {
    ID: number;
    SQLCommand: string;
    Schedule: string;
}

const DBCleanup: Application.Types.iByComponent = (props) => {
    const dispatch = useDispatch();

    const status = useSelector(DBCleanupSlice.Status);
    const search: Search.IFilter<DBCleanup>[] = useSelector(DBCleanupSlice.SearchFilters);

    const searchStatus = useSelector(DBCleanupSlice.SearchStatus);
    const data: DBCleanup[] = useSelector(DBCleanupSlice.SearchResults);

    const [sortField, setSortField] = React.useState<keyof DBCleanup>('SQLCommand');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const emptyDBCleanup = { ID: 0, SQLCommand: '', Schedule: ''};
    const [editNewDBCleanup, setEditNewDBCleanup] = React.useState<DBCleanup>(emptyDBCleanup);
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');

    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(DBCleanupSlice.Fetch());
    }, [status]);

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        if (searchStatus === 'unintiated' || searchStatus === 'changed')
            dispatch(DBCleanupSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [searchStatus]);

    React.useEffect(() => {
        dispatch(DBCleanupSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [ascending, sortField]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editNewDBCleanup.Schedule == null || editNewDBCleanup.Schedule.length === 0)
            e.push("Schedule is required.");
        if (editNewDBCleanup.SQLCommand == null || editNewDBCleanup.SQLCommand.length === 0)
            e.push("An SQLCommand is required.");
        setErrors(e)
    }, [editNewDBCleanup])

    const searchFields: Search.IField<DBCleanup>[] = [
        { key: 'SQLCommand', label: 'SQLCommand', type: 'string', isPivotField: false },
        { key: 'Schedule', label: 'Schedule', type: 'string', isPivotField: false },
    ]

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<DBCleanup> CollumnList={searchFields} SetFilter={(flds) => dispatch(DBCleanupSlice.DBSearch({ filter: flds, sortField, ascending }))}
                    Direction={'left'} defaultCollumn={{ key: 'SQLCommand', label: 'SQLCommand', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' DB Cleanup(s)'}
                    GetEnum={() => {
                        return () => { }
                    }}
                >
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-primary" onClick={(event) => { setEditNewDBCleanup(emptyDBCleanup); setEditNew('New'); setShowModal(true); event.preventDefault() }}>Add DB Cleanup</button>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<DBCleanup>
                        cols={[
                            { key: 'SQLCommand', field: 'SQLCommand', label: 'SQLCommand', headerStyle: { width: '50%' }, rowStyle: { width: '10%' } },
                            { key: 'Schedule', field: 'Schedule', label: 'Schedule', headerStyle: { width: '50%' }, rowStyle: { width: '10%' } },
                            { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey === 'scroll' || d.colField === undefined)
                                return;
                            if (d.colField === sortField)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                            }
                            if (d.colField === sortField)
                                dispatch(DBCleanupSlice.DBSearch({ filter: search, sortField, ascending: true }));
                            else
                                dispatch(DBCleanupSlice.DBSearch({ filter: search, sortField: d.colField, ascending }));
                        }}
                        onClick={(item) => { setEditNewDBCleanup(item.row); setShowModal(true); setEditNew('Edit'); }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={() => false}
                    />
                </div>
            </div>
            <Modal Title={editNew === 'Edit' ? editNewDBCleanup.SQLCommand + ' - DB Cleanup' : 'Add New DB Cleanup'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={editNew === 'Edit'} ConfirmText={'Save'} CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        dispatch(DBCleanupSlice.DBAction({ verb: 'POST', record: editNewDBCleanup }))
                    if (conf && editNew === 'Edit')
                        dispatch(DBCleanupSlice.DBAction({ verb: 'PATCH', record: editNewDBCleanup }))
                    if (!conf && isBtn)
                        setShowWarning(true);
                    setShowModal(false);
                }}
                DisableConfirm={(editNew === 'Edit' && !hasChanged) || errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)
                }
            >
                <div className="row">
                    <div className="col">
                        <TextArea<DBCleanup> Rows={4} Record={editNewDBCleanup} Field={'SQLCommand'} Label='SQLCommand' Feedback={'An SQLCommand is required.'}
                            Valid={field => editNewDBCleanup.SQLCommand != null && editNewDBCleanup.SQLCommand.length > 0}
                            Setter={(record) => { setEditNewDBCleanup(record); setHasChanged(true); }}
                        />
                        <TextArea<DBCleanup> Rows={1} Record={editNewDBCleanup} Field={'Schedule'} Label='Schedule' Feedback={'A Schedule is required.'}
                            Valid={field => editNewDBCleanup.Schedule != null && editNewDBCleanup.Schedule.length > 0}
                            Setter={(record) => { setEditNewDBCleanup(record); setHasChanged(true); }}
                        />
                    </div>
                </div>
            </Modal>
            <Warning Title={'Delete DB Cleanup'} Message={'This will Delete this DB Cleanup from the System. This can have unintended consequences and cause the System to crash. Are you sure you want to continue?'}
                Show={showWarning} CallBack={(conf) => { if (conf) dispatch(DBCleanupSlice.DBAction({ verb: 'DELETE', record: editNewDBCleanup })); setShowWarning(false); }} />
        </>)
}
export default DBCleanup;