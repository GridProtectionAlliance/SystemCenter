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
import Table from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter } from '../global';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive';
import CompanyForm from './CompanyForm';


interface Company extends SystemCenter.Company {
    Meters: number
}

declare var homePath: string;

const defaultSearchcols: Array<Search.IField<Company>> = [
    { label: 'Name', key: 'Name', type: 'string' },
    { label: 'CompanyID', key: 'CompanyID', type: 'string' },
    { label: 'Description', key: 'Description', type: 'string' },
    { label: 'Description', key: 'Description', type: 'string' },
                                                          
];

const ByCompany: SystemCenter.ByComponent = (props) => {
    let history = useHistory();
    
    const [search, setSearch] = React.useState<Array<Search.IFilter<Company>>>([]);
    const [data, setData] = React.useState<Array<Company>>([]);
    const [sortField, setSortField] = React.useState<string>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [newCompany, setNewCompany] = React.useState<SystemCenter.Company>(getNewCompany());
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    React.useEffect(() => {
        return getData();
    }, [search, ascending, sortField]);

    function getData() {
        let handle = getCompanys();
        handle.done((data: string) => {
            setSearchState('Idle');
            setData(JSON.parse(data) as Company[]);

        }).fail((d) => setSearchState('Error'));
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }

    }

    function getCompanys(): JQuery.jqXHR<string>{
        setSearchState('Loading');


        return $.ajax({
            type: "Post",
            url: `${homePath}api/SystemCenter/Company/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: search, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function getNewCompany(): SystemCenter.Company {
        return {
            ID: 0,
            CompanyTypeID: 0,
            CompanyID: null,
            Name: null,
            Description: null
        }
    }

    function addNewCompany() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/Company/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newCompany),
            cache: false,
            async: true
        }).done((data) => getData());

    }


    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Company&CompanyID=' + item.row.ID, state: {} })
    }

    function valid(field: keyof (SystemCenter.Company)): boolean {
        if (field == 'CompanyID')
            return newCompany.CompanyID != null && newCompany.CompanyID.length > 0 && newCompany.CompanyID.length <= 8;
        else if (field == 'Name')
            return newCompany.Name == null || newCompany.Name.length <= 100;
        else if (field == 'Description')
            return newCompany.Description == null || newCompany.Description.length <= 200;
        return false;
    }

    const standardSearch: Search.IField<Location> = { label: 'Name', key: 'Name', type: 'string' };
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<Location> CollumnList={defaultSearchcols} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={standardSearch} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Companys'}
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
                {/*<option value='Company.Name'>Name</option>
                                                            <option value='Company.CompanyID'>CompanyID</option>
                                                            <option value='Company.Description'>Description</option>
                                                            <option value='CompanyMeter.AssetKey'>Meter</option>
                                                            <option value='CompanyType.Name'>Type</option>*/}

                                                   
                                    
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" data-toggle='modal' data-target="#companyModal" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => {
                                event.preventDefault()
                                setNewCompany(getNewCompany());
                            }}>Add Company</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<Company>
                    cols={[
                        { key: 'Name', label: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'CompanyTypeID', label: 'Type', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'CompanyID', label: 'CompanyID', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
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

            <div className="modal" id="companyModal">
                <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Company</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <CompanyForm Company={newCompany} Setter={setNewCompany} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewCompany}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ByCompany;

