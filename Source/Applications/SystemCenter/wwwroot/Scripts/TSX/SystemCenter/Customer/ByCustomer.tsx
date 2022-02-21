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
import Table from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';

import { DefaultSearchField, SearchFields } from '../CommonComponents/SearchFields';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import { useSelector, useDispatch } from 'react-redux';
import { CustomerSlice } from '../Store/Store';
import CustomerForm from './CustomerForm';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';


declare var homePath: string;

const ByCustomer: Application.Types.iByComponent = (props) => {
    let dispatch = useDispatch();
    let history = useNavigate();

    const cState = useSelector(CustomerSlice.SearchStatus);
    const data = useSelector(CustomerSlice.SearchResults);

    const [search, setSearch] = React.useState<Array<Search.IFilter<OpenXDA.Types.Customer>>>([]);
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<OpenXDA.Types.Customer>>>(SearchFields.Customer as Search.IField<OpenXDA.Types.Customer>[]);

    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.Customer>('CustomerKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [newCustomer, setNewCustomer] = React.useState<OpenXDA.Types.Customer>(getNewCustomer());

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

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
            LSCVS: false
        }
    }


    function getAdditionalFields(): JQuery.jqXHR<Array<SystemCenter.Types.AdditionalField>> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/Customer/FieldName/0`,
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

        handle.done((d: Array<SystemCenter.Types.AdditionalField>) => {
            let ordered = _.orderBy((SearchFields.Customer as Search.IField<OpenXDA.Types.Customer>[]).concat(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<OpenXDA.Types.Customer>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }

    function handleSelect(item) {
        history({ pathname: homePath + 'index.cshtml', search: '?name=Customer&CustomerID=' + item.row.ID })
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<OpenXDA.Types.Customer> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.Customer as Search.IField<OpenXDA.Types.Customer>} Width={'50%'} Label={'Search'}
                ShowLoading={cState == 'loading'} ResultNote={cState == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Customers'}
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
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault(); setShowModal(true); }}>Add Customer</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<OpenXDA.Types.Customer>
                    cols={[
                        { key: 'CustomerKey', field: 'CustomerKey', label: 'Account Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Phone', field: 'Phone', label: 'Phone', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Description', field: 'Description', label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        {
                            key: 'LSCVS', field: 'LSCVS', label: 'LSCVS', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => {
                                if (item.LSCVS == true)
                                    return HeavyCheckMark;
                                if (item.LSCVS == false)
                                    return null;
                            }
                        },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === "Scroll")
                            return;

                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colField);
                        }
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%'  }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <Modal Show={showModal} Title={'Add Customer'} CallBack={(c) => {
                setShowModal(false);
                if (c)
                    dispatch(CustomerSlice.DBAction({ verb: 'POST', record: newCustomer }));
            }} ShowCancel={false} ShowX={true} DisableConfirm={errors.length > 0} ConfirmShowToolTip={errors.length > 0} ConfirmToolTipContent={errors.map((t, i) => <p key={i}> {CrossMark} {t}</p>)} >
                <div className="row">
                    <CustomerForm Customer={newCustomer} stateSetter={setNewCustomer} setErrors={setErrors} />
                </div>
            </Modal>
            

        </div>
    )
}

export default ByCustomer;

