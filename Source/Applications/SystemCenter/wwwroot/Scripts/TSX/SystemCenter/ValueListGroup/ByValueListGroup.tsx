//******************************************************************************************************
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
import { useSelector, useDispatch } from 'react-redux';
import { ValueListGroupSlice } from '../Store/Store';
import { ValueListSlice } from '../Store/Store';

import Table from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive';

import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import ValueListGroupForm from './ValueListGroupForm';


const ValueListGroups: Application.Types.iByComponent = (props) => {
    const dispatch = useDispatch();

    const data = useSelector(ValueListGroupSlice.SearchResults);
    const status = useSelector(ValueListGroupSlice.SearchStatus);
    const items = useSelector(ValueListSlice.Data);
    const itemStatus = useSelector(ValueListSlice.Status);

    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.ValueListGroup>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const emptyRecord = { ID: 0, Name: '', Description: '' };
    let history = useNavigate();

    const [search, setSearch] = React.useState<Array<Search.IFilter<SystemCenter.Types.ValueListGroup>>>([]);
    const [newRecord, setNewRecord] = React.useState<SystemCenter.Types.ValueListGroup>(emptyRecord);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<SystemCenter.Types.ValueListGroup>>>(SearchFields.ValueListGroup as Search.IField<SystemCenter.Types.ValueListGroup>[]);
    const [showNew, setShowNew] = React.useState<boolean>(false);

    const [record, setRecord] = React.useState<SystemCenter.Types.ValueListGroup>(emptyRecord);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ValueListGroupSlice.DBSearch({ filter: search, sortField: sortField, ascending: ascending}));

        return function () {
        }
    }, [dispatch, status]);

    React.useEffect(() => {
        dispatch(ValueListGroupSlice.DBSearch({ filter: search, sortField: sortField, ascending: ascending }));

        return function () {
        }
    }, [search, sortField, ascending]);

    React.useEffect(() => {
        if (itemStatus == 'unintiated' || itemStatus == 'changed')
            dispatch(ValueListSlice.Fetch());

        return function () {
        }
    }, [dispatch, itemStatus]);



    function handleSelect(item) {
        history({ pathname: homePath + 'index.cshtml', search: '?name=ValueListGroup&GroupID=' + item.row.ID })
    }


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar< SystemCenter.Types.ValueListGroup>
                CollumnList={filterableList}
                SetFilter={(flds) => setSearch(flds)}
                Direction={'left'}
                defaultCollumn={DefaultSearchField.ValueListGroup as Search.IField<SystemCenter.Types.ValueListGroup>}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={searchState == 'Loading'}
                ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Groups'}
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
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} data-toggle="modal" data-target="#exampleModal" onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); }}>Add Group</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table< SystemCenter.Types.ValueListGroup>
                    cols={[
                        { key: 'Name', label: 'Name', field: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Description', field: 'Description',label: 'Description/Comments', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Items', label: 'Items', field: 'Items', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => items.filter(i => i.GroupID == item.ID).length },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey != sortField)
                            setSortField(d.colKey as any)
                        else
                            setAscending(!d.ascending)
                            
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <div className="modal" id="exampleModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new list item</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ValueListGroupForm Record={record} Setter={setRecord} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => dispatch(ValueListGroupSlice.DBAction({ verb: 'POST', record }))}>Save changes</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ValueListGroups;

