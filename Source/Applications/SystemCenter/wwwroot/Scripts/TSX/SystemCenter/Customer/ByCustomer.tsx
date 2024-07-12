//******************************************************************************************************
//  ByCustomer.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  02/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { DefaultSearchField, SearchFields } from '../CommonComponents/SearchFields';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import { useAppSelector, useAppDispatch } from '../hooks';
import { CustomerSlice } from '../Store/Store';
import CustomerForm from './CustomerForm';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';


declare var homePath: string;

const ByCustomer: Application.Types.iByComponent = (props) => {
    let dispatch = useAppDispatch();
    let history = useHistory();

    const cState = useAppSelector(CustomerSlice.SearchStatus);
    const data = useAppSelector(CustomerSlice.SearchResults);

    const [search, setSearch] = React.useState<Array<Search.IFilter<OpenXDA.Types.Customer>>>([]);
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<OpenXDA.Types.Customer>>>(SearchFields.Customer as Search.IField<OpenXDA.Types.Customer>[]);

    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.Customer>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [newCustomer, setNewCustomer] = React.useState<OpenXDA.Types.Customer>(getNewCustomer());

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [showEXTModal, setShowExtModal] = React.useState<boolean>(false);
    const extDbUpdateAll = React.useRef<() => (() => void)>(undefined);

    React.useEffect(() => {
        dispatch(CustomerSlice.DBSearch({ sortField: sortKey, ascending, filter: search }))
    }, [search, ascending, sortKey]);

    React.useEffect(() => {
        let handle = getAdditionalFields();

        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);

    React.useEffect(() => {
        if (cState == 'unintiated' || cState == 'changed')
            dispatch(CustomerSlice.DBSearch({ sortField: sortKey, ascending, filter: search }))
    }, [cState, dispatch]);

    function getNewCustomer(): OpenXDA.Types.Customer {
        return {
            ID: 0,
            CustomerKey: null,
            Name: null,
            Phone: null,
            Description: null,
            LSCVS: false,
            PQIFacilityID: -1,
        }
    }


    function getAdditionalFields(): JQuery.jqXHR<Array<SystemCenter.Types.AdditionalField>> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/Customer/FieldName/0`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });

        function ConvertType(type: string) {
            if (type == 'string' || type == 'integer' || type == 'number' || type == 'datetime' || type == 'boolean')
                return { type: type }
            return {
                type: 'enum', enum: [{ Label: type, Value: type }]
            }
        }

        handle.done((d: Array<SystemCenter.Types.AdditionalFieldView>) => {
            let ordered = _.orderBy((SearchFields.Customer as Search.IField<OpenXDA.Types.Customer>[]).concat(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<OpenXDA.Types.Customer>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Customer&CustomerID=' + item.row.ID })
    }

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <SearchBar<OpenXDA.Types.Customer> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.Customer as Search.IField<OpenXDA.Types.Customer>} Width={'50%'} Label={'Search'} StorageID="CustomersFilter"
                ShowLoading={cState == 'loading'} ResultNote={cState == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Customer(s)'}
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
                <li className="nav-item" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0} style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <div className="form-group">
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0} onClick={(event) => { event.preventDefault(); setNewCustomer(getNewCustomer()); setShowModal(true); }}>Add Customer</button>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0}
                                onClick={(event) => { event.preventDefault(); setShowExtModal(true); }}>External Database</button>
                        </div>
                    </fieldset>
                </li>
            </SearchBar>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <ReactTable.Table<OpenXDA.Types.Customer>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colField);
                        }
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
                    <ReactTable.Column<OpenXDA.Types.Customer>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<OpenXDA.Types.Customer>
                        Key={'CustomerKey'}
                        AllowSort={true}
                        Field={'CustomerKey'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                    > Customer Key
                    </ReactTable.Column>
                    <ReactTable.Column<OpenXDA.Types.Customer>
                        Key={'Phone'}
                        AllowSort={true}
                        Field={'Phone'}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                    > Phone
                    </ReactTable.Column>
                    <ReactTable.Column<OpenXDA.Types.Customer>
                        Key={'Description'}
                        AllowSort={true}
                        Field={'Description'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Description
                    </ReactTable.Column>
                    <ReactTable.Column<OpenXDA.Types.Customer>
                        Key={'LSCVS'}
                        AllowSort={true}
                        Field={'LSCVS'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => {
                            if (item.LSCVS == true)
                                return HeavyCheckMark;
                            if (item.LSCVS == false)
                                return null;
                        }}
                    > LSCVS
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Show={showModal} Title={'Add New Customer'} CallBack={(c) => {
                setShowModal(false);
                if (c)
                    dispatch(CustomerSlice.DBAction({ verb: 'POST', record: newCustomer }));
            }} ShowCancel={false} ShowX={true} DisableConfirm={errors.length > 0} ConfirmShowToolTip={errors.length > 0} ConfirmToolTipContent={errors.map((t, i) => <p key={i}> {CrossMark} {t}</p>)} >
                <div className="row">
                    <CustomerForm Customer={newCustomer} stateSetter={setNewCustomer} setErrors={setErrors} />
                </div>
            </Modal>
            <Modal Show={showEXTModal} Size={'xlg'} Title={'Customer External Database Fields'}
                ShowCancel={true} ConfirmText={'Update All'} CancelText={'Close'} CallBack={(c) => {
                    if (c && extDbUpdateAll.current !== undefined) extDbUpdateAll.current();
                    if (!c) setShowExtModal(false);
                }}>
                <ExternalDBUpdate Type='Customer' UpdateAll={extDbUpdateAll} />
            </Modal>
        </div>
    )
}

export default ByCustomer;

