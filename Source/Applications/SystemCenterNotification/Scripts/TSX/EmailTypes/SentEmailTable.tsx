//******************************************************************************************************
//  SentEmailTable.tsx - Gbtc
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
//  04/02/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { EmailType, SentEmail } from '../global';
import moment from 'moment'
import { Application } from '@gpa-gemstone/application-typings';
import { GenericController, LoadingScreen } from '@gpa-gemstone/react-interactive';

interface IProps {
    OnClick: (SentEmail: SentEmail) => void,
    EmailTypeID: number
}
const controller = new GenericController<SentEmail>(`${homePath}api/OpenXDA/SentEmail`, 'TimeSent', false)

const SentEmailTable = (props: IProps) => {
    const [data, setData] = React.useState<SentEmail[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [sortKey, setSortKey] = React.useState<keyof SentEmail>('TimeSent');
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [page, setPage] = React.useState<number>(0);
    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('idle');


    React.useEffect(() => {
        setPageStatus('loading');
        const handle = controller.PagedSearch([], sortKey, ascending, page, props.EmailTypeID).done((result) => {
            setData(JSON.parse(result.Data as unknown as string));
            setPageInfo({
                RecordsPerPage: result.RecordsPerPage,
                NumberOfPages: result.NumberOfPages,
                TotalRecords: result.TotalRecords
            });
            setPageStatus('idle');
        }).fail(() => setPageStatus('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [props.EmailTypeID, sortKey, ascending, page]);

    return (
        <>
            <LoadingScreen Show={pageStatus == 'loading'} />
            <div className="row flex-grow-1" style={{overflow: 'hidden'}}>
                <div className="col h-100 d-flex flex-column" style={{ overflow: 'hidden' }}>
                    <Table<SentEmail>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortKey) setAscending(a => !a);
                            else setSortKey(d.colField);
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
                        OnClick={(data) => props.OnClick(data.row)}
                    >
                        <Column<SentEmail>
                            Key={'TimeSent'}
                            AllowSort={true}
                            Field={'TimeSent'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item, field }) => {
                                return <span className={`badge badge-pill badge-light`}>{moment(item[field]).format('MM/DD/YYYY HH:mm:ss')}</span>
                            }}
                        > Time Sent
                        </Column>
                        <Column<SentEmail>
                            Key={'ToLine'}
                            AllowSort={true}
                            Field={'ToLine'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Recipient
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
            {pageInfo?.NumberOfPages > 1 ?
                <div className="row">
                    <div className="col">
                        <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                    </div>
                </div> : null}
        </>
    )
}

export default SentEmailTable;