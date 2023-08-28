﻿//******************************************************************************************************
//  ByEventTag.tsx - Gbtc
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
//  07/31/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { EventTagSlice } from '../Store/Store';

import Table from '@gpa-gemstone/react-table'
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import EventTagForm from './EventTagForm';


const EventTags: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(EventTagSlice.SearchResults);
    const status = useAppSelector(EventTagSlice.SearchStatus);
    const search = useAppSelector(EventTagSlice.SearchFilters);
    const sortField = useAppSelector(EventTagSlice.SortField);
    const ascending = useAppSelector(EventTagSlice.Ascending);

    const allTags = useAppSelector(EventTagSlice.Data);
    const allTagsStatus = useAppSelector(EventTagSlice.Status);

    const [mode, setMode] = React.useState<'View'|'Add'|'Edit'>('View');
    const [errors, setErrors] = React.useState<string[]>([]);

    const emptyRecord = { ID: 0, Name: '', Description: '', ShowInFilter: false };
    const [record, setRecord] = React.useState<OpenXDA.Types.EventTag>(emptyRecord);

    const EventTagSearchFields = [
        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
        { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
    ];
    const EventTagDefaultSearchField = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(EventTagSlice.DBSearch({ filter: search }));
    }, [status]);

    React.useEffect(() => {
        if (allTagsStatus === 'unintiated' || allTagsStatus === 'changed')
            dispatch(EventTagSlice.Fetch());
    }, [allTagsStatus]);

    React.useEffect(() => {
        let e = [];
        if (record.Name === null || record.Name.length === 0) {
            e.push('A Name is required.');
        }
        if (record.Name?.length > 200) {
            e.push('A Name of less than 200 characters is required.');
        }
        if (allTags.findIndex((t) => t.Name.toLowerCase() === record.Name?.toLowerCase() && t.ID !== record.ID) !== -1) {
            e.push('A unique Name is required.');
        }

        setErrors(e);
    }, [record]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<OpenXDA.Types.EventTag>
                CollumnList={EventTagSearchFields as Search.IField<OpenXDA.Types.EventTag>[]}
                SetFilter={(flds) => dispatch(EventTagSlice.DBSearch({ filter: flds }))}
                Direction={'left'}
                defaultCollumn={EventTagDefaultSearchField as Search.IField<OpenXDA.Types.EventTag>}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={status === 'loading'}
                ResultNote={status === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Event Tag(s)'}
            >

                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0}
                                onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); setMode('Add'); }}>Add Tag</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<OpenXDA.Types.EventTag>
                    cols={[
                        { key: 'Name', label: 'Name', field: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Description', field: 'Description', label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        {
                            key: 'ShowInFilter', label: 'Show in Filter', field: 'ShowInFilter', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                            content: (item) => item.ShowInFilter ? HeavyCheckMark : CrossMark
                        },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colField == null) return;
                        dispatch(EventTagSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    onClick={(item) => { setRecord(item.row); setMode('Edit'); }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                />
            </div>

            <Modal Title={mode === 'Add' ? 'Add New Event Tag' : 'Edit ' + record.Name}
                CallBack={(conf, isBtn) => {
                    if (conf)
                        dispatch(EventTagSlice.DBAction({ verb: mode === 'Add' ? 'POST' : 'PATCH', record }));
                    else if (isBtn)
                        dispatch(EventTagSlice.DBAction({ verb: 'DELETE', record }));
                    setMode('View');
                }}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={mode === 'Add' ? 'Add Tag' : 'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                DisableConfirm={errors.length > 0}
                ShowCancel={mode === 'Edit'}
                CancelText={'Delete'}
                Show={mode === 'Add' || mode === 'Edit'} >
                <EventTagForm Record={record} Setter={setRecord} />
            </Modal>
        </div>
    )
}

export default EventTags;