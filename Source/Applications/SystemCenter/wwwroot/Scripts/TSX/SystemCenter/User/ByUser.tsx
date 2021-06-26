//******************************************************************************************************
//  ByUser.tsx - Gbtc
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
//  02/05/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '../CommonComponents/Table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { SystemCenter as SCGlobal } from '../global';
import { getNewUserAccount} from './../../../TS/Services/User';;
import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive';
import CryptoJS from 'crypto-js'
import UserForm from './UserForm';

const defaultSearchcols: Array<Search.IField<SCGlobal.UserAccount>> = [
    { label: 'First Name', key: 'FirstName', type: 'string', isPivotField: false },
    { label: 'Last Name', key: 'LastName', type: 'string', isPivotField: false },
    { label: 'Location', key: 'Location', type: 'string', isPivotField: false },
    { label: 'Phone', key: 'Phone', type: 'string', isPivotField: false },
    { label: 'Email', key: 'Email', type: 'string', isPivotField: false },

];

const ByUser: SCGlobal.ByComponent = (props) => {
    let history = useHistory();
    const [search, setSearch] = React.useState<Array<Search.IFilter<SCGlobal.UserAccount>>>([]);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const [data, setData] = React.useState<SCGlobal.UserAccount[]>([]);
    const [sortField, setSortField] = React.useState<keyof SCGlobal.UserAccount>('FirstName');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [newUserAccount, setNewUserAccount] = React.useState<SCGlobal.UserAccount>(null);
    const [filterableList, setFilterableList] = React.useState<Search.IField<SCGlobal.UserAccount>[]>(defaultSearchcols);

    React.useEffect(() => {
        return getData();
    }, [search, ascending, sortField]);


    React.useEffect(() => {
        let handle = getAdditionalUserFields();

        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);

    function getData() {
        setSearchState('Loading');
        let handle = getUserAccounts();
        handle.done((data: Array<SCGlobal.UserAccount>) => {
            if (typeof (data) == 'string') data = JSON.parse(data);
            setData(data);
            setSearchState('Idle');
        });
        handle.fail(msg => setSearchState('Error'))

        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }


    function getAdditionalUserFields(): JQuery.jqXHR<SCGlobal.AdditionalUserField[]> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalUserField/FieldName/0`,
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

        handle.done((d: SCGlobal.AdditionalUserField[]) => {
            if (typeof (d) == 'string') d = JSON.parse(d);

            let ordered = _.orderBy(defaultSearchcols.concat(d.map(item => (
                { label: `[AF] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<SCGlobal.UserAccount>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }


    function getUserAccounts(): JQuery.jqXHR<Array<SCGlobal.UserAccount>> {
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/SystemCenter/UserAccount/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function addNewUserAccount() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/UserAccount/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ ...newUserAccount, Password: CryptoJS.SHA256(newUserAccount.Password + "0").toString(CryptoJS.enc.Base64) }),
            cache: false,
            async: true
        }).always(() => {
            getData()
        });

    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=User&UserAccountID=' + item.row.ID, state: {} })
    }

    if (props.Roles.indexOf('Administrator') < 0) return null;
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<SCGlobal.UserAccount> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={{ label: 'Last Name', key: 'LastName', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' UserAccounts'}
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

                    handle.done(d => setOptions(d.map(item => ({ Value: item.ID, Label: item.Value }))))
                    return () => { if (handle != null && handle.abort == null) handle.abort(); }
                }}

            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" data-toggle='modal' data-target="#userAccountModal" hidden={props.Roles.indexOf('Administrator') < 0} onClick={(event) => { event.preventDefault() }}>Add User</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
          
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<SCGlobal.UserAccount>
                    cols={[
                        { key: 'Name', label: 'User Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'FirstName', label: 'First Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'LastName', label: 'Last Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Phone', label: 'Phone', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'MobilePhone', label: 'Mobile', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
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
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
                <div className="modal" id="userAccountModal">
                    <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add User</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                        <div className="modal-body">
                            <UserForm UserAccount={newUserAccount} Setter={setNewUserAccount} Edit={false}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewUserAccount}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => getNewUserAccount().done(nua => setNewUserAccount(nua))}>Close</button>
                            </div>

                        </div>
                    </div>
                </div>


        </div>
    )
   
}

export default ByUser;
