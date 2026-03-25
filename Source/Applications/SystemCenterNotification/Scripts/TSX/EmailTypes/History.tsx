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

import * as React from 'react';
import { EmailType, SentEmail } from '../global';
import { LoadingScreen, GenericController } from '@gpa-gemstone/react-interactive'
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { Application } from '@gpa-gemstone/application-typings';
import moment from 'moment';

interface IProps { Record: EmailType }

declare var homePath;

const History = (props: IProps) => {
    const [data, setData] = React.useState<SentEmail[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [sortKey, setSortKey] = React.useState<keyof SentEmail>('TimeSent');
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [page, setPage] = React.useState<number>(0);
    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('idle');
    const controller = React.useMemo(() =>
        new GenericController<SentEmail>(`${homePath}api/OpenXDA/SentEmail`, sortKey, ascending ?? false)
        , [sortKey, ascending]);

    React.useEffect(() => {
        setPageStatus('loading');
        const handle = controller.PagedSearch([], sortKey, ascending, page, props.Record.ID).done((result) => {
            setData(JSON.parse(result.Data as unknown as string));
            setPageInfo({
                RecordsPerPage: result.RecordsPerPage,
                NumberOfPages: result.NumberOfPages,
                TotalRecords: result.TotalRecords
            });
            setPageStatus('idle');
        }).fail(() => setPageStatus('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [props.Record.ID, sortKey, ascending, page]);

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
                                    <LoadingScreen Show={pageStatus == 'loading'} />
                                    <Table<SentEmail>
                                        TableClass="table table-hover"
                                        Data={data}
                                        SortKey={sortKey.toString()}
                                        Ascending={ascending}
                                        OnSort={(d) => {
                                            if (d.colKey === null) return;
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
                                            Key={'TimeSent'}
                                            AllowSort={true}
                                            Field={'TimeSent'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                            Content={({ item, field }) => {
                                                return <span className={`badge badge-pill badge-light`}>{moment(item[field]).format('MM/DD/YYYY HH:mm')}</span>
                                            }}
                                        > Time Sent
                                        </Column>
                                        <Column<SentEmail>
                                            Key={'ToLine'}
                                            AllowSort={true}
                                            Field={'ToLine'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Recipient(s)
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
            <div className="row">
                <div className="col">
                    {data.length > 0 ? <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} /> : null}
                </div>
            </div>
        </div>
    )
}

export default History;