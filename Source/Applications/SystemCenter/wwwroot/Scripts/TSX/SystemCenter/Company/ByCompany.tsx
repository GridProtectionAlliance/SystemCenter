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
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import CompanyForm from './CompanyForm';
import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import { useSelector, useDispatch } from 'react-redux';
import { CompanyTypeSlice } from '../Store/Store';

declare var homePath: string;


const ByCompany: SCGlobal.ByComponent = (props) => {
    let history = useHistory();

    const dispatch = useDispatch();
    const companyTypes = useSelector(CompanyTypeSlice.Data) as SCGlobal.CompanyType[];
    const ctStatus = useSelector(CompanyTypeSlice.Status) as SCGlobal.Status;

    const [search, setSearch] = React.useState<Array<Search.IFilter<SCGlobal.Company>>>([]);
    const [data, setData] = React.useState<Array<SCGlobal.Company>>([]);
    const [sortField, setSortField] = React.useState<keyof SCGlobal.Company>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [newCompany, setNewCompany] = React.useState<SCGlobal.Company>(getNewCompany());
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<SCGlobal.Company>>>(SearchFields.Company as Search.IField<SCGlobal.Company>[]);
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [newCompanyErrors, setNewCompanyErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        return getData();
    }, [search, ascending, sortField]);

    function getData() {
        let handle = getCompanys();
        handle.done((data: string) => {
            setSearchState('Idle');
            setData(JSON.parse(data) as SCGlobal.Company[]);

        }).fail((d) => setSearchState('Error'));
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }

    }
    React.useEffect(() => {
        let handle = getAdditionalFields();

        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);

    React.useEffect(() => {
        if (ctStatus != 'unintiated') return;
        dispatch(CompanyTypeSlice.Fetch());
    }, []);

    function getAdditionalFields(): JQuery.jqXHR<Array<SystemCenter.Types.AdditionalField>> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/Company/FieldName/0`,
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
            let ordered = _.orderBy((SearchFields.Company as Search.IField<SCGlobal.Company>[]).concat(d.map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<Location>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }

    function getCompanys(): JQuery.jqXHR<string>{
        setSearchState('Loading');

        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/Company/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: TransformSearchFields.Company(search), OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function getNewCompany(): SCGlobal.Company {
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
            url: `${homePath}api/OpenXDA/Company/Add`,
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

    
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<SCGlobal.Company> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.Company as Search.IField<SCGlobal.Company>} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Companys'}
                GetEnum={(setOptions, field) => {
                    let handle = null;
                    if (field.key == "CompanyTypeID") {
                        setOptions(companyTypes.map(item => ({ Value: item.ID.toString(), Label: item.Name })))
                        return () => { }
                    }
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
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => {
                                event.preventDefault()
                                setNewCompany(getNewCompany());
                                setShowNew(true);
                            }}>Add Company</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<SCGlobal.Company>
                    cols={[
                        { key: 'Name', label: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'CompanyTypeID', label: 'Type', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        {
                            key: 'CompanyID', label: 'CompanyID', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => {
                                const ct = companyTypes.find(ct => ct.ID == item.CompanyTypeID)
                                if (ct == null)
                                    return "";
                                return ct.Name
                                }
                        },
                        { key: 'Description', label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
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

            <Modal Show={showNew} Title={'Edit Note'}
                ShowCancel={true}
                CallBack={(conf) => { if (conf) addNewCompany(); setShowNew(false); }}
                DisableConfirm={newCompanyErrors.length > 0}
                ShowX={true}
                ConfirmShowToolTip={newCompanyErrors.length > 0}
                ConfirmToolTipContent={
                    newCompanyErrors.map((t, i) => <p key={i}> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i>
                        {t} </p>)
                }>
                <CompanyForm Company={newCompany} Setter={setNewCompany} setErrors={setNewCompanyErrors} />
            </Modal>
            
        </div>
    )
}

export default ByCompany;

