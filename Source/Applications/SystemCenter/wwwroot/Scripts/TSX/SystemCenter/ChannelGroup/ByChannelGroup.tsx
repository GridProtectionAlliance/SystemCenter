//******************************************************************************************************
//  ByChannelGroup.tsx - Gbtc
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
//  06/30/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ChannelGroupSlice, ChannelGroupDetailsSlice } from '../Store/Store';

import Table from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';

import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import ChannelGroupForm from './ChannelGroupForm';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';


const ChannelGroups: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(ChannelGroupSlice.SearchResults);
    const status = useAppSelector(ChannelGroupSlice.SearchStatus);
    const items = useAppSelector(ChannelGroupDetailsSlice.Data);
    const itemStatus = useAppSelector(ChannelGroupDetailsSlice.Status);
    const parentID = useAppSelector(ChannelGroupDetailsSlice.ParentID);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.ChannelGroup>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [errors, setErrors] = React.useState<string[]>([]);

    const emptyRecord = { ID: 0, Name: '', Description: '' };
    let history = useHistory();

    const ChannelGroupSearchFields = [
        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
        { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
    ];
    const ChannelGroupDefaultSearchField = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };
    const [search, setSearch] = React.useState<Array<Search.IFilter<SystemCenter.Types.ChannelGroup>>>([]);

    const [record, setRecord] = React.useState<SystemCenter.Types.ChannelGroup>(emptyRecord);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ChannelGroupSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [dispatch, status]);

    React.useEffect(() => {
        dispatch(ChannelGroupSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [search, sortField, ascending]);

    React.useEffect(() => {
        if (itemStatus == 'unintiated' || itemStatus == 'changed' || parentID != null)
            dispatch(ChannelGroupDetailsSlice.Fetch());
    }, [dispatch, itemStatus, parentID]);

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
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ChannelGroup&GroupID=' + item.row.ID })
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar< SystemCenter.Types.ChannelGroup>
                CollumnList={ChannelGroupSearchFields as Search.IField<SystemCenter.Types.ChannelGroup>[]}
                SetFilter={(flds) => dispatch(ChannelGroupSlice.DBSearch({ filter: flds }))}
                Direction={'left'}
                defaultCollumn={ChannelGroupDefaultSearchField as Search.IField<SystemCenter.Types.ChannelGroup>}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Channel Groups(s)'}
            >

                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0}
                                onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); setShowNew(true); }}>Add Group</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table< SystemCenter.Types.ChannelGroup>
                    cols={[
                        { key: 'Name', label: 'Name', field: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Description', field: 'Description',label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        {
                            key: 'Items', label: 'Items', field: 'Items', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
                            content: (item, key, style) => items.filter(i => i.ChannelGroupID == item.ID).length
                        },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey != sortField)
                            dispatch(ChannelGroupSlice.DBSearch({ filter: search, sortField: (d.colField as any), ascending: true }));
                        else
                            dispatch(ChannelGroupSlice.DBSearch({ filter: search, ascending: !ascending }))
                            
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <Modal Title={'Add New Channel Group'}
                CallBack={(c) => {
                    if (c)
                        dispatch(ChannelGroupSlice.DBAction({ verb: 'POST', record }));
                    setShowNew(false);
                }}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Add Group'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                DisableConfirm={errors.length > 0}
                Show={showNew} >
                <ChannelGroupForm Record={record} Setter={setRecord} />
            </Modal>
        </div>
    )
}

export default ChannelGroups;

