//******************************************************************************************************
//  EmailList.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { EmailType } from '../global';
import { EmailTypeSlice } from '../Store';
import { Table, Column } from '@gpa-gemstone/react-table';

interface IProps { CategoryID: number}


const EmailList = (props: IProps) => {
    const dispatch = useAppDispatch();

    const emails = useAppSelector(EmailTypeSlice.Data);
    const status = useAppSelector(EmailTypeSlice.Status);

    const parentID = useAppSelector(EmailTypeSlice.ParentID);

    const sortField = useAppSelector(EmailTypeSlice.SortField);
    const ascending = useAppSelector(EmailTypeSlice.Ascending);

    React.useEffect(() => {
        if (props.CategoryID != parentID || status == 'unintiated' || status == 'changed')
            dispatch(EmailTypeSlice.Fetch(props.CategoryID));
    }, [parentID, status, props.CategoryID])

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Emails:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden' }}>
                                    <Table<EmailType>
                                        TableClass="table table-hover"
                                        Data={emails}
                                        SortKey={sortField}
                                        Ascending={ascending}
                                        OnSort={(d) => {
                                            if (d.colKey === null) return;
                                            dispatch(EmailTypeSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
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
                                        <Column<EmailType>
                                            Key={'Name'}
                                            AllowSort={true}
                                            Field={'Name'}
                                            HeaderStyle={{ width: '70%' }}
                                            RowStyle={{ width: '70%' }}
                                        > Name
                                        </Column>
                                        <Column<EmailType>
                                            Key={'MinDelay'}
                                            AllowSort={true}
                                            Field={'MinDelay'}
                                            HeaderStyle={{ width: '10%' }}
                                            RowStyle={{ width: '10%' }}
                                        > Min Delay
                                        </Column>
                                        <Column<EmailType>
                                            Key={'MaxDelay'}
                                            AllowSort={true}
                                            Field={'MaxDelay'}
                                            HeaderStyle={{ width: '10%' }}
                                            RowStyle={{ width: '10%' }}
                                        > Max Delay
                                        </Column>
                                        <Column<EmailType>
                                            Key={'SMS'}
                                            AllowSort={true}
                                            Field={'SMS'}
                                            HeaderStyle={{ width: '10%' }}
                                            RowStyle={{ width: '10%' }}
                                            Content={({ item }) => item.SMS ? 'Text' : 'Email' }
                                        > Type
                                        </Column>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default EmailList;