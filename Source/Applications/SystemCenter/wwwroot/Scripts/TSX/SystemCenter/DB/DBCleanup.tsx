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
import { ReactTable } from '@gpa-gemstone/react-table';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { SearchBar, Search, Modal, Warning, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { DBCleanupSlice } from '../Store/Store';

export interface DBCleanup {
    ID: number;
    Name: string;
    SQLCommand: string;
    Schedule: string;
}

const DBCleanup: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(DBCleanupSlice.Status);
    const search: Search.IFilter<DBCleanup>[] = useAppSelector(DBCleanupSlice.SearchFilters);

    const searchStatus = useAppSelector(DBCleanupSlice.SearchStatus);
    const data: DBCleanup[] = useAppSelector(DBCleanupSlice.SearchResults);
    const allDBCleanup: DBCleanup[] = useAppSelector(DBCleanupSlice.Data);

    const [sortField, setSortField] = React.useState<keyof DBCleanup>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const emptyDBCleanup = { ID: 0, Name: '', SQLCommand: '', Schedule: ''};
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
            e.push("A Schedule is required.");
        if (editNewDBCleanup.Name == null || editNewDBCleanup.Name.length === 0)
            e.push("A Name is required.");
        if (editNewDBCleanup.Name != null && editNewDBCleanup.Name.length > 0 && allDBCleanup.findIndex(s => s.Name.toLowerCase() === editNewDBCleanup.Name.toLowerCase() && s.ID !== editNewDBCleanup.ID) > -1)
            e.push('Name must be unique.')
        if (editNewDBCleanup.SQLCommand == null || editNewDBCleanup.SQLCommand.length === 0)
            e.push("A SQL Command is required.");
        setErrors(e)
    }, [editNewDBCleanup])

    const searchFields: Search.IField<DBCleanup>[] = [
        { key: 'Name', label: 'Name', type: 'string', isPivotField: false },
        { key: 'Schedule', label: 'Schedule', type: 'string', isPivotField: false },
    ]

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<DBCleanup> CollumnList={searchFields} SetFilter={(flds) => dispatch(DBCleanupSlice.DBSearch({ filter: flds, sortField, ascending }))}
                    Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Database Cleanup(s)'}
                    StorageID="DatabaseCleanupFilters"
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
                    <ReactTable.Table<DBCleanup>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
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
                        OnClick={(item) => { setEditNewDBCleanup(item.row); setShowModal(true); setEditNew('Edit'); }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 500, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<DBCleanup>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '50%' }}
                            RowStyle={{ width: '10%' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<DBCleanup>
                            Key={'Schedule'}
                            AllowSort={true}
                            Field={'Schedule'}
                            HeaderStyle={{ width: '50%' }}
                            RowStyle={{ width: '10%' }}
                        > Schedule
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <Modal Title={editNew === 'Edit' ? 'Edit ' + (editNewDBCleanup?.Name ?? 'Database Cleanup') : 'Add New Database Cleanup'}
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
                        <TextArea<DBCleanup> Rows={1} Record={editNewDBCleanup} Field={'Name'} Label='Name' Feedback={'A Name is required.'}
                            Valid={field => editNewDBCleanup.Name != null && editNewDBCleanup.Name.length > 0}
                            Setter={(record) => { setEditNewDBCleanup(record); setHasChanged(true); }}
                        />
                        <TextArea<DBCleanup> Rows={1} Record={editNewDBCleanup} Field={'Schedule'} Label='Schedule' Feedback={'A Schedule is required.'}
                            Valid={field => editNewDBCleanup.Schedule != null && editNewDBCleanup.Schedule.length > 0}
                            Setter={(record) => { setEditNewDBCleanup(record); setHasChanged(true); }}
                        />
                        <TextArea<DBCleanup> Rows={4} Record={editNewDBCleanup} Field={'SQLCommand'} Label='SQL Command' Feedback={'A SQL Command is required.'}
                            Valid={field => editNewDBCleanup.SQLCommand != null && editNewDBCleanup.SQLCommand.length > 0}
                            Setter={(record) => { setEditNewDBCleanup(record); setHasChanged(true); }}
                        />
                    </div>
                </div>
            </Modal>
            <Warning Title={'Delete ' + (editNewDBCleanup?.Name ?? 'Database Cleanup')} Message={'This will delete this Database Cleanup operation from the system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                Show={showWarning} CallBack={(conf) => { if (conf) dispatch(DBCleanupSlice.DBAction({ verb: 'DELETE', record: editNewDBCleanup })); setShowWarning(false); }} />
        </>)
}
export default DBCleanup;