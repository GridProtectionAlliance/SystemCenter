//******************************************************************************************************
//  DeviceContacts.tsx - Gbtc
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
//  06/29/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter } from '../global';
import { Table, Column } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

interface UserAccount extends Application.Types.iUserAccount {
    Selected: boolean
}

function DeviceContacts(props: {ID: string, Name: string, Field: 'TSC' | 'Sector' }) {
    const [data, setData] = React.useState<UserAccount[]>([]);
    const [sortKey, setSortKey] = React.useState<string>('LastName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/UserAccount/${props.Field}/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setData(_.orderBy(d.map(datum => ({ ...datum, Selected: 1 })), [sortKey], [ascending])));

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.ID, props.Field]);

    React.useEffect(() => {
        setData(_.orderBy(data, [sortKey], [ascending]))
    }, [sortKey, ascending]);

    if (props.ID == undefined) return null;
    return (
        <div style={{ width: '100%', height: 'calc( 100% - 90px)' }}>
            <div className='row'>
                <div className='col'>
                    <h3>Contacts for {props.Field} {props.Name}</h3>
                </div>
                <div className='col' hidden={roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0}>
                    <a className='btn btn-primary pull-right' style={{ color: 'white' }} href={`mailto:${data.filter(d => d.Selected).map(d => d.Email).join(';')}` } >Email Selected</a>
                    <button className='btn btn-primary pull-right' onClick={() => {
                        let newData = data.map(d => ({...d, Selected: false}));;
                        setData(newData);
                    }}>Unselect All</button>

                    <button className='btn btn-primary pull-right' onClick={() => {
                        let newData = data.map(d => ({ ...d, Selected: true }));;
                        setData(newData);
                    }}>Select All</button>
                </div>
            </div>
            <Table<UserAccount>
                TableClass="table table-hover"
                Data={data}
                SortKey={sortKey}
                Ascending={ascending}
                OnSort={(d) => {
                    if (d.colKey !== sortKey)
                        setSortKey(d.colKey);
                    else
                        setAscending(d.ascending);
                }}
                OnClick={(d) => {
                    if (d.colKey !== "Email") {
                        let newData = [...data];
                        newData[d.index].Selected = !newData[d.index].Selected;
                        setData(newData);
                    }
                }}
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 160, width: '100%' }}
                RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <Column<UserAccount>
                    Key={'Selected'}
                    AllowSort={true}
                    HeaderStyle={{ width: '5%' }}
                    RowStyle={{ width: '5%' }}
                    Content={({ item }) => item.Selected ? <span><ReactIcons.CircleCheckMark /></span> : ''}
                > <p></p>
                </Column>
                <Column<UserAccount>
                    Key={'FirstName'}
                    AllowSort={true}
                    Field={'FirstName'}
                    HeaderStyle={{ width: '10%' }}
                    RowStyle={{ width: '10%' }}
                > First Name
                </Column>
                <Column<UserAccount>
                    Key={'LastName'}
                    AllowSort={true}
                    Field={'LastName'}
                    HeaderStyle={{ width: '10%' }}
                    RowStyle={{ width: '10%' }}
                > Last Name
                </Column>
                <Column<UserAccount>
                    Key={'Email'}
                    AllowSort={true}
                    Field={'Email'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                    Content={({ item, key }) => <a href={`mailto:${item[key]}`}>{item[key]}</a>}
                > Email
                </Column>
                <Column<UserAccount>
                    Key={'Phone'}
                    AllowSort={true}
                    Field={'Phone'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Phone
                </Column>
            </Table>
        </div>

    )
}

export default DeviceContacts;