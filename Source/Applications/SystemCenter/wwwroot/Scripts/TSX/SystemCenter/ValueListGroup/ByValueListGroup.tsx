﻿//******************************************************************************************************
//  ByCompany.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  10/16/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ValueListGroupSlice, ValueListGroupViewSlice } from '../Store/Store';
import { ValueListSlice } from '../Store/Store';

import { ReactTable } from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import {SystemCenter as localSC } from '../global'
import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import ValueListGroupForm from './ValueListGroupForm';


const ValueListGroups: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(ValueListGroupViewSlice.SearchResults);
    const status = useAppSelector(ValueListGroupViewSlice.SearchStatus);
    const items = useAppSelector(ValueListSlice.Data);
    const itemStatus = useAppSelector(ValueListSlice.Status);
    const parentID = useAppSelector(ValueListSlice.ParentID);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof localSC.ValueListGroupView>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const emptyRecord = { ID: 0, Name: '', Description: '', ItemCount: 0 };
    let history = useHistory();

    const [search, setSearch] = React.useState<Array<Search.IFilter<localSC.ValueListGroupView>>>([]);

    const [record, setRecord] = React.useState<localSC.ValueListGroupView>(emptyRecord);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ValueListGroupViewSlice.DBSearch({ filter: search, sortField: sortField, ascending: ascending }));

        return function () {
        }
    }, [dispatch, status]);

    React.useEffect(() => {
        dispatch(ValueListGroupViewSlice.DBSearch({ filter: search, sortField: sortField, ascending: ascending }));

        return function () {
        }
    }, [search, sortField, ascending]);

    React.useEffect(() => {
        if (itemStatus == 'unintiated' || itemStatus == 'changed' || parentID != null)
            dispatch(ValueListSlice.Fetch());
    }, [itemStatus, parentID]);



    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ValueListGroup&GroupID=' + item.row.ID })
    }


    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <SearchBar<localSC.ValueListGroupView>
                CollumnList={SearchFields.ValueListGroup as Search.IField<localSC.ValueListGroupView>[]}
                SetFilter={(flds) => setSearch(flds)}
                Direction={'left'}
                defaultCollumn={DefaultSearchField.ValueListGroup as Search.IField<localSC.ValueListGroupView>}
                Width={'50%'}
                Label={'Search'}
                StorageID="ValueListsFilter"
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Value List(s)'}
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

                    handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
                    return () => { if (handle != null && handle.abort == null) handle.abort(); }
                }}

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
                <ReactTable.Table<localSC.ValueListGroupView>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey != sortField)
                            setSortField(d.colKey as any)
                        else
                            setAscending(!d.ascending)
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
                    <ReactTable.Column<localSC.ValueListGroupView>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<localSC.ValueListGroupView>
                        Key={'Description'}
                        AllowSort={true}
                        Field={'Description'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Description
                    </ReactTable.Column>
                    <ReactTable.Column<localSC.ValueListGroupView>
                        Key={'ItemCount'}
                        AllowSort={true}
                        Field={'ItemCount'}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                    > Items
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Title={'Add New Value List Group'}
                CallBack={(c) => {
                    if (c)
                        dispatch(ValueListGroupSlice.DBAction({ verb: 'POST', record }));
                    setShowNew(false);
                }}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Save'}
                Show={showNew} >
                <ValueListGroupForm Record={record} Setter={(r) => setRecord({ ...r, ItemCount: 0 })} />
            </Modal>
        </div>
    )
}

export default ValueListGroups;