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
import { ChannelGroupSlice, ChannelGroupItemSlice } from '../Store/Store';

import Table from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';

import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
//import ChannelGroupForm from './ChannelGroupForm';


const ChannelGroups: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(ChannelGroupSlice.SearchResults);
    const status = useAppSelector(ChannelGroupSlice.SearchStatus);
    const items = useAppSelector(ChannelGroupItemSlice.Data);
    const itemStatus = useAppSelector(ChannelGroupItemSlice.Status);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.ChannelGroupType>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const emptyRecord = { ID: 0, Name: '', Description: '' };
    let history = useHistory();

    const [search, setSearch] = React.useState<Array<Search.IFilter<SystemCenter.Types.ChannelGroupType>>>([]);

    const [record, setRecord] = React.useState<SystemCenter.Types.ChannelGroupType>(emptyRecord);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ChannelGroupSlice.DBSearch({ filter: search, sortField: sortField, ascending: ascending}));

        return function () {
        }
    }, [dispatch, status]);

    React.useEffect(() => {
        dispatch(ChannelGroupSlice.DBSearch({ filter: search, sortField: sortField, ascending: ascending }));

        return function () {
        }
    }, [search, sortField, ascending]);

    React.useEffect(() => {
        if (itemStatus == 'unintiated' || itemStatus == 'changed')
            dispatch(ChannelGroupItemSlice.Fetch());

        return function () {
        }
    }, [dispatch, itemStatus]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ChannelGroup&GroupID=' + item.row.ID })
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar< SystemCenter.Types.ChannelGroupType>
                CollumnList={SearchFields.ValueListGroup as Search.IField<SystemCenter.Types.ChannelGroupType>[]}
                SetFilter={(flds) => setSearch(flds)}
                Direction={'left'}
                defaultCollumn={DefaultSearchField.ValueListGroup as Search.IField<SystemCenter.Types.ChannelGroupType>}
                Width={'50%'}
                Label={'Search'}
                ShowLoading={status == 'loading'}
                ResultNote={status == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Channel Groups(s)'}
                GetEnum={(setOptions, field) => {
                    let handle = null;
                    if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
                        return () => { };

                    handle = $.ajax({
                        type: "GET",
                        url: `${homePath}api/ChannelGroup/Group/${field.enum[0].Value}`,
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
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0}
                                onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); setShowNew(true); }}>Add Group</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table< SystemCenter.Types.ChannelGroupType>
                    cols={[
                        { key: 'Name', label: 'Name', field: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Description', field: 'Description',label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        {
                            key: 'Items', label: 'Items', field: 'Items', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
                            content: (item, key, style) => items.filter(i => i.GroupID == item.ID).length
                        },
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
                Show={showNew} >
                {/*<ChannelGroupForm Record={record} Setter={setRecord} />*/}
            </Modal>
        </div>
    )
}

export default ChannelGroups;

