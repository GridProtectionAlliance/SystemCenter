//******************************************************************************************************
//  History.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  03/24/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************


import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { EmailType, SentEmail } from '../global';
import { LoadingScreen } from '@gpa-gemstone/react-interactive'
import { SentEmailSlice, EmailTypeSlice } from '../Store';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';

interface IProps { Record: EmailType }

const History = (props: IProps) => {
    const dispatch = useAppDispatch();

    const sentEmails = useAppSelector(SentEmailSlice.Data);
    const status = useAppSelector(SentEmailSlice.Status);
    const parentID = useAppSelector(SentEmailSlice.ParentID);
    const asc = useAppSelector(SentEmailSlice.Ascending);
    const sortKey = useAppSelector(SentEmailSlice.SortField);


    React.useEffect(() => {
        if (status == 'uninitiated' || status == 'changed' || parentID != props.Record.ID) {

            dispatch(SentEmailSlice.Fetch(props.Record.ID))
            dispatch(SentEmailSlice.PagedSearch({ page: 1 }))
        }
    }, [props.Record, parentID, status])


    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 align-self-center">
                                <h4>History:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden' }}>
                                    <LoadingScreen Show={status == 'loading'} />
                                    <Table<SentEmail>
                                        TableClass="table table-hover"
                                        Data={sentEmails}
                                        SortKey={sortKey.toString()}
                                        Ascending={asc}
                                        OnSort={(d) => {
                                            if (d.colKey === null) return;
                                            dispatch(SentEmailSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                                        }}
                                        TableStyle={{
                                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                                        }}
                                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        Selected={(item) => false}
                                        KeySelector={(item) => item.ID}
                                    >
                                        <Column<SentEmail>
                                            Key={'EmailTypeID'}
                                            AllowSort={true}
                                            Field={'EmailTypeID'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > EmailTypeID
                                        </Column>
                                        <Column<SentEmail>
                                            Key={'TimeSent'}
                                            AllowSort={true}
                                            Field={'TimeSent'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > TimeSent
                                        </Column>
                                        <Column<SentEmail>
                                            Key={'ToLine'}
                                            AllowSort={true}
                                            Field={'ToLine'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > ToLine
                                        </Column>
                                        <Column<SentEmail>
                                            Key={'Subject'}
                                            AllowSort={true}
                                            Field={'Subject'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Subject
                                        </Column>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;