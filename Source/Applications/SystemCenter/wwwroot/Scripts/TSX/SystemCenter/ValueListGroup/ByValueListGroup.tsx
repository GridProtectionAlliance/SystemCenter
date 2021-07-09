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
import { useHistory } from "react-router-dom";
import { SystemCenter as SCTyping } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive';

import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import ValueListGroupForm from './ValueListGroupForm';

const ValueListGroups: SCGlobal.ByComponent = (props) => {
    const dispatch = useDispatch();

    const data: SCTyping.Types.ValueListGroup[] = useSelector(ValueListGroupSlice.Data);
    const status: SCGlobal.Status = useSelector(ValueListGroupSlice.Status);
    const items: SCTyping.Types.ValueListItem[] = useSelector(ValueListSlice.Data);
    const itemStatus: SCGlobal.Status = useSelector(ValueListSlice.Status);

    const sortKey = useSelector(ValueListGroupSlice.SortField);
    const ascending: boolean = useSelector(ValueListGroupSlice.Ascending);
    const emptyRecord: SCTyping.Types.ValueListGroup = {ID: 0, Name: '', Description: ''};
    let history = useHistory();
    
    const [search, setSearch] = React.useState<Array<Search.IFilter<SCTyping.Types.ValueListGroup>>>([]);
    const [newRecord, setNewRecord] = React.useState<SCTyping.Types.ValueListGroup>(emptyRecord);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<SCTyping.Types.ValueListGroup>>>(SearchFields.ValueListGroup as Search.IField<SCTyping.Types.ValueListGroup>[]);
    const [showNew, setShowNew] = React.useState<boolean>(false);

    const [record, setRecord] = React.useState<SCTyping.Types.ValueListGroup>(emptyRecord);

    React.useEffect(() => {
        if (status !== 'unintiated' && status !== 'changed') return function () { };

        dispatch(ValueListGroupSlice.Fetch());

    }, [dispatch, status]);

    React.useEffect(() => {
        if (itemStatus !== 'unintiated' && itemStatus !== 'changed') return function () { };

       dispatch(ValueListSlice.Fetch());

    }, [dispatch, itemStatus]);



    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ValueListGroup&GroupID=' + item.row.ID, state: {} })
    }

    
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar< SCTyping.Types.ValueListGroup> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.ValueListGroup as Search.IField<SCTyping.Types.ValueListGroup>} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Groups'}
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
                <Table< SCTyping.Types.ValueListGroup>
                    cols={[
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Description', field: 'Description', label: 'Description/Comments', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Items', field: 'Items', label: 'Items', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => items.filter(i => i.GroupID == item.ID).length },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === "Scroll")
                            return;
                        dispatch(ValueListGroupSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%'  }}
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

