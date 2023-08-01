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
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';

import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
//import EventTagForm from './EventTagForm';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';


const EventTags: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(EventTagSlice.SearchResults);
    const status = useAppSelector(EventTagSlice.SearchStatus);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.EventTag>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [errors, setErrors] = React.useState<string[]>([]);

    const emptyRecord = { ID: 0, Name: '', Description: '', ShowInFilter: false };
    let history = useHistory();

    const EventTagSearchFields = [
        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
        { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
    ];
    const EventTagDefaultSearchField = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };
    const [search, setSearch] = React.useState<Array<Search.IFilter<SystemCenter.Types.EventTag>>>([]);

    const [record, setRecord] = React.useState<SystemCenter.Types.EventTag>(emptyRecord);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(EventTagSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [status]);

    React.useEffect(() => {
        dispatch(EventTagSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [search, sortField, ascending]);

    React.useEffect(() => {
        let e = [];
        if (record.Name == null || record.Name.length == 0) {
            e.push('A Name is required.');
        }
        if (record.Name.length > 200) {
            e.push('A Name of less than 200 characters is required.')
        }

        setErrors(e);
    }, [record]);

    function handleSelect(item) {
        // POP UP EDIT MODAL
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<SystemCenter.Types.EventTag>
                CollumnList={EventTagSearchFields as Search.IField<SystemCenter.Types.EventTag>[]}
                SetFilter={(flds) => dispatch(EventTagSlice.DBSearch({ filter: flds }))}
                Direction={'left'}
                defaultCollumn={EventTagDefaultSearchField as Search.IField<SystemCenter.Types.EventTag>}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Event Tag(s)'}
            >

                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0}
                                onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); setShowNew(true); }}>Add Tag</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table< SystemCenter.Types.EventTag>
                    cols={[
                        { key: 'Name', label: 'Name', field: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Description', field: 'Description',label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        {
                            key: 'ShowInFilter', label: 'Show in Filter', field: 'ShowInFilter', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
                            content: (item, key, style) => item.ShowInFilter ? HeavyCheckMark : CrossMark
                        },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey != sortField)
                            dispatch(EventTagSlice.DBSearch({ filter: search, sortField: (d.colField as any), ascending: true }));
                        else
                            dispatch(EventTagSlice.DBSearch({ filter: search, ascending: !ascending }))

                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <Modal Title={'Add New Event Tag'}
                CallBack={(c) => {
                    if (c)
                        dispatch(EventTagSlice.DBAction({ verb: 'POST', record }));
                    setShowNew(false);
                }}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Add Tag'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                DisableConfirm={errors.length > 0}
                Show={showNew} >
                {/*<EventTagForm Record={record} Setter={setRecord} />*/}
            </Modal>
        </div>
    )
}

export default EventTags;