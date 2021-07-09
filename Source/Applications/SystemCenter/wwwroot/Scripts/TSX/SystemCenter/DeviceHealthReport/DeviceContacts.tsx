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
import Table from '@gpa-gemstone/react-table';
import { HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';

interface UserAccount extends SystemCenter.UserAccount {
    Selected: boolean
}

function DeviceContacts(props: {ID: number, Name: string, Field: 'TSC' | 'Sector' }) {
    const [data, setData] = React.useState<UserAccount[]>([]);
    const [sortKey, setSortKey] = React.useState<string>('LastName');
    const [ascending, setAscending] = React.useState<boolean>(true);
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
                <div className='col'>
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
                cols={[
                    { key: 'Selected', field: 'Selected', label: '', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item, key, style) => item.Selected ? <span>{HeavyCheckMark}</span> : '' },
                    { key: 'FirstName', field: 'FirstName', label: 'First Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'LastName', field: 'LastName', label: 'Last Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: (item, key, style) => <a href={`mailto:${item[key]}`}>{ item[key]}</a>},
                    { key: 'Title', field: 'Title', label: 'Title', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                    { key: 'Department', field: 'Department', label: 'Department', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                    { key: 'Phone', field: 'Phone', label: 'Phone', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'MobilePhone', field: 'MobilePhone', label: 'Mobile Phone', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                ]}
                tableClass="table table-hover"
                data={data}
                sortKey={sortKey}
                ascending={ascending}
                onSort={({ colKey, ascending }) => {
                    if (colKey === "Scroll")
                        return;

                    if (colKey !== sortKey)
                        setSortKey(colKey);
                    else
                        setAscending(ascending);
                }}
                onClick={(d, evt) => {
                    if (d.colKey !== "Email") {
                        let newData = [...data];
                        newData[d.index].Selected = !newData[d.index].Selected;
                        setData(newData);
                    }
                }}
                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 160, width: '100%' }}
                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                selected={(item) => false}
            />
        </div>

    )
}

export default DeviceContacts;