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
import { ChannelGroupSlice, ChannelGroupDetailsSlice, ChannelGroupViewSlice } from '../Store/Store';
import { SystemCenter as LocalSC } from '../global';
import { ReactTable } from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';

import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import ChannelGroupForm from './ChannelGroupForm';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';


const ChannelGroups: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(ChannelGroupViewSlice.SearchResults);
    const status = useAppSelector(ChannelGroupViewSlice.SearchStatus);
    const items = useAppSelector(ChannelGroupDetailsSlice.Data);
    const itemStatus = useAppSelector(ChannelGroupDetailsSlice.Status);
    const parentID = useAppSelector(ChannelGroupDetailsSlice.ParentID);
    const sortField = useAppSelector(ChannelGroupViewSlice.SortField);
    const ascending = useAppSelector(ChannelGroupViewSlice.Ascending);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const emptyRecord = { ID: 0, Name: '', Description: '' };
    let history = useHistory();

    const ChannelGroupSearchFields = [
        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
        { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
    ];
    const ChannelGroupDefaultSearchField = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };
    const [search, setSearch] = React.useState<Array<Search.IFilter<LocalSC.ChannelGroupView>>>([]);

    const [record, setRecord] = React.useState<SystemCenter.Types.ChannelGroup>(emptyRecord);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ChannelGroupViewSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [dispatch, status]);

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
        <div className="container-fluid d-flex h-100 flex-column">
            <SearchBar< SystemCenter.Types.ChannelGroup>
                CollumnList={ChannelGroupSearchFields as Search.IField<SystemCenter.Types.ChannelGroup>[]}
                SetFilter={(flds) => dispatch(ChannelGroupViewSlice.DBSearch({ filter: flds }))}
                Direction={'left'}
                defaultCollumn={ChannelGroupDefaultSearchField as Search.IField<SystemCenter.Types.ChannelGroup>}
                Width={'50%'}
                StorageID="ChannelGroupsFilter"
                Label={'Search'}
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Channel Groups(s)'}
            >

                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" 
                                onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); setShowNew(true); }}>Add Group</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <ReactTable.Table<LocalSC.ChannelGroupView>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        dispatch(ChannelGroupViewSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    OnClick={handleSelect}
                    TableStyle={{
                        padding: 0, width: '100%', height: '100%',
                        tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 0
                    }}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<LocalSC.ChannelGroupView>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<LocalSC.ChannelGroupView>
                        Key={'Description'}
                        AllowSort={true}
                        Field={'Description'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Description
                    </ReactTable.Column>
                    <ReactTable.Column<LocalSC.ChannelGroupView>
                        Key={'ItemCount'}
                        AllowSort={true}
                        Field={'ItemCount'}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                    > Items
                    </ReactTable.Column>
                </ReactTable.Table>
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

