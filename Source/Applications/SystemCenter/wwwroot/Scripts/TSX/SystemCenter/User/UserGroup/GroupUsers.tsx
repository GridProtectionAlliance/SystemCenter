// ******************************************************************************************************
//  GroupUsers.tsx - Gbtc
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
//  02/23/2023 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import { LoadingScreen } from '@gpa-gemstone/react-interactive';
import { UserAccountSliceRemote } from '../../Store/Store';
import { ISecurityGroup } from '../Types';
import Table from '@gpa-gemstone/react-table';
import { DefaultSelects } from '@gpa-gemstone/common-pages';

const GroupUser = (props: {Group: ISecurityGroup}) => {

    const [showSelect, setShowSelect] = React.useState<boolean>(false);
    const [users, setUsers] = React.useState<Application.Types.iUserAccount[]>([]);
    const [asc, setAsc] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof Application.Types.iUserAccount>('AccountName');
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');

    React.useEffect(() => {
        const handle = getUsers();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [props.Group.ID, props.Group.Type])

    React.useEffect(() => {
        setUsers((u) => _.orderBy(u, [sortField], asc ? 'asc' : 'desc'));
    }, [asc, sortField])

    function getUsers() {
        if (props.Group.Type != 'Database')
            return;

        setStatus('loading')
        return $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/FullSecurityGroup/Users/${props.Group.ID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).done((d) => {
            setUsers(_.orderBy(d, [sortField], asc ? 'asc' : 'desc'));
            setStatus('idle');
    }, () => setStatus('error'));
    }

    function saveUser(u) {
        if (props.Group.Type != 'Database')
            return;

        setStatus('loading');

        return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/FullSecurityGroup/AddUser/${props.Group.ID}`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(u),
            cache: false,
            async: true
        }).done((d) => {
            setUsers(_.orderBy(d, [sortField], asc ? 'asc' : 'desc'));
            setStatus('idle');
        }, () => setStatus('error'));
    }

    if (props.Group == null)
        return null;
    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Group Users:</h4>
                    </div>
                </div>
            </div>
            <LoadingScreen Show={status === 'loading'} />
            <div className="card-body" style={{ height: window.innerHeight - 440, maxHeight: window.innerHeight - 440, overflowY: 'auto' }}>
                {props.Group.Type == 'Azure' ? <div className="alert alert-info">
                    You can not edit users in an Azure Group. To add or remove users please contact your Azure Administrator.
                </div> : null}
                {props.Group.Type == 'AD'? <div className="alert alert-info">
                    You can not edit users for Active Directory Groups. To add or remove users please contact your AD Administrator.
                </div> : null}
                {props.Group.Type == 'Database' ? 
                    <Table<Application.Types.iUserAccount>
                        cols={[
                            { key: 'AccountName', field: 'AccountName', label: 'User Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'FirstName', field: 'FirstName', label: 'First Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'LastName', field: 'LastName', label: 'Last Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Phone', field: 'Phone', label: 'Phone', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={users}
                        sortKey={sortField}
                        ascending={asc}
                        onSort={(d) => {
                            if (d.colKey === 'scroll' || d.colField == undefined)
                                return;
                            if (d.colField === sortField)
                                setAsc(!asc);
                            else {
                                setAsc(true);
                                setSortField(d.colField);
                            }
                        }}
                        onClick={(d) => { } }
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />

                    : null}
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary"
                        onClick={() => setShowSelect(true)}
                        disabled={props.Group.Type !== 'Database'}>Add User</button>
                </div>
            </div>

            <DefaultSelects.User
                Slice={UserAccountSliceRemote}
                Selection={users}
                OnClose={(selected, conf) => {
                    setShowSelect(false);
                    if (!conf) return;
                    saveUser(selected);
                }}
                Show={showSelect}
                Type={'multiple'}
                Columns={[
                    { key: 'Name', field: 'AccountName', label: 'User Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'FirstName', field: 'FirstName', label: 'First Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'LastName', field: 'LastName', label: 'Last Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'Phone', field: 'Phone', label: 'Phone', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Add Users to " + props.Group.Name}
                GetEnum={() => () => { }}
                GetAddlFields={() => () => { }}
            />

        </div>
    );

}

export default GroupUser;
