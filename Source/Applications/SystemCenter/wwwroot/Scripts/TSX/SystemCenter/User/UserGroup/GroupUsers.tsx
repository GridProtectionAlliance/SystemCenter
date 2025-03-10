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
import { Table, Column } from '@gpa-gemstone/react-table';
import { DefaultSelects } from '@gpa-gemstone/common-pages';

const GroupUser = (props: {Group: ISecurityGroup}) => {

    const [showSelect, setShowSelect] = React.useState<boolean>(false);
    const [users, setUsers] = React.useState<Application.Types.iUserAccount[]>([]);
    const [asc, setAsc] = React.useState<boolean>(true);
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
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Users:</h4>
                    </div>
                </div>
            </div>
            <LoadingScreen Show={status === 'loading'} />
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                {props.Group.Type == 'Azure' ? <div className="alert alert-info">
                    Users in an Azure Group cannot be edited in System Center. To add or remove Users, please contact your Azure Administrator.
                </div> : null}
                {props.Group.Type == 'AD'? <div className="alert alert-info">
                    Users in an Active Directory Group cannot be edited in System Center. To add or remove Users, please contact your AD Administrator.
                </div> : null}
                {props.Group.Type == 'Database' ?
                    <Table<Application.Types.iUserAccount>
                        TableClass="table table-hover"
                        Data={users}
                        SortKey={sortField}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colField === sortField)
                                setAsc(!asc);
                            else {
                                setAsc(true);
                                setSortField(d.colField);
                            }
                        }}
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<Application.Types.iUserAccount>
                            Key={'AccountName'}
                            AllowSort={true}
                            Field={'AccountName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Username
                        </Column>
                        <Column<Application.Types.iUserAccount>
                            Key={'FirstName'}
                            AllowSort={true}
                            Field={'FirstName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > First Name
                        </Column>
                        <Column<Application.Types.iUserAccount>
                            Key={'LastName'}
                            AllowSort={true}
                            Field={'LastName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Last Name
                        </Column>
                        <Column<Application.Types.iUserAccount>
                            Key={'Phone'}
                            AllowSort={true}
                            Field={'Phone'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Phone
                        </Column>
                        <Column<Application.Types.iUserAccount>
                            Key={'Email'}
                            AllowSort={true}
                            Field={'Email'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Email
                        </Column>
                    </Table>

                    : null}
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary"
                        onClick={() => setShowSelect(true)}
                        disabled={props.Group.Type !== 'Database'}>Add Users</button>
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
                Title={"Add Users to " + props.Group.Name}
                GetEnum={() => () => { }}
                GetAddlFields={() => () => { }}
            >
                <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: '10%' }}
                >Username</Column>
                <Column Key="FirstName" Field="FirstName" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: '10%' }}
                >First Name</Column>
                <Column Key="LastName" Field="LastName" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: '10%' }}
                >Last Name</Column>
                <Column Key="Phone" Field="Phone" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: '10%' }}
                >Phone</Column>
                <Column Key="Email" Field="Email" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Email</Column>
            </DefaultSelects.User>

        </div>
    );

}

export default GroupUser;
