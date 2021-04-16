//******************************************************************************************************
//  ByCustomer.tsx - Gbtc
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
//  02/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter } from '../global';

import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive';
import { Input, TextArea } from '@gpa-gemstone/react-forms';


interface Customer extends SystemCenter.Customer {
    Meters: number
}

declare var homePath: string;

const ByCustomer: SystemCenter.ByComponent = (props) => {
    let history = useHistory();
    
    const [search, setSearch] = React.useState<Array<Search.IFilter<Customer>>>([]);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<Customer>>>(SearchFields.Customer as Search.IField<Customer>[]);

    const [data, setData] = React.useState<Array<Customer>>([]);
    const [sortField, setSortField] = React.useState<string>('CustomerKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [newCustomer, setNewCustomer] = React.useState<SystemCenter.Customer>(getNewCustomer());

    React.useEffect(() => {
        return getData();
    }, [search, ascending, sortField]);

    React.useEffect(() => {
        let handle = getAdditionalFields();

        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);

    function getData() {
        let handle = getCustomers();
        handle.done((data: string) => { setData(JSON.parse(data)); setSearchState('Idle'); }).fail((d) => setSearchState('Error'));;
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }

    }

    function getCustomers(): JQuery.jqXHR<string>{

        setSearchState('Loading');

        return $.ajax({
            type: "Post",
            url: `${homePath}api/SystemCenter/Customer/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: TransformSearchFields.Customer(search), OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function getNewCustomer(): SystemCenter.Customer {
        return {
            ID: 0,
            CustomerKey: null,
            Name: null,
            Phone: null,
            Description: null
        }
    }

    function addNewCustomer() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/Customer/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newCustomer),
            cache: false,
            async: true
        }).done((data) => getData());

    }

    function getAdditionalFields(): JQuery.jqXHR<Array<SystemCenter.AdditionalField>> {
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

        handle.done((d: Array<SystemCenter.AdditionalField>) => {
            let ordered = _.orderBy((SearchFields.Customer as Search.IField<Customer>[]).concat(d.map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<Customer>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Customer&CustomerID=' + item.row.ID, state: {} })
    }

    function valid(field: keyof (SystemCenter.Customer)): boolean {
        if (field == 'CustomerKey')
            return newCustomer.CustomerKey != null && newCustomer.CustomerKey.length > 0 && newCustomer.CustomerKey.length <= 25;
        else if (field == 'Name')
            return newCustomer.Name == null || newCustomer.Name.length <= 100;
        else if (field == 'Phone')
            return newCustomer.Phone == null || newCustomer.Phone.length <= 20;
        else if (field == 'Description')
            return newCustomer.Description == null || newCustomer.Description.length <= 200;
        return false;
    }


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<Customer> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.Customer as Search.IField<Customer>} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Customers'}
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
                            <button className="btn btn-primary" data-toggle='modal' data-target="#customerModal" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault() }}>Add Customer</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<Customer>
                    cols={[
                        { key: 'CustomerKey', label: 'Account Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Name', label: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Phone', label: 'Phone', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Description', label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', label: 'Assigned Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortField={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.col == sortField)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortField(d.col);
                        }
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%'  }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
            
            <div className="modal" id="customerModal">
                <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Customer</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <Input<SystemCenter.Customer> Record={newCustomer} Field={'CustomerKey'} Feedback={'AccountName of less than 25 characters is required.'} Valid={valid} Setter={setNewCustomer} />
                                    <Input<SystemCenter.Customer> Record={newCustomer} Field={'Name'} Feedback={'Name must be less than 100 characters.'} Valid={valid} Setter={setNewCustomer} />
                                    <Input<SystemCenter.Customer> Record={newCustomer} Field={'Phone'} Feedback={'Phone must be less than 20 characters.'} Valid={valid} Setter={setNewCustomer} />
                                    <TextArea<SystemCenter.Customer> Rows={3} Record={newCustomer} Field={'Description'} Feedback={'Description must be less than 200 characters.'} Valid={valid} Setter={setNewCustomer} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewCustomer}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ByCustomer;

