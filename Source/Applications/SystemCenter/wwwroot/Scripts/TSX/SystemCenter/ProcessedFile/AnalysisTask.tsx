//******************************************************************************************************
//  AnalysisTask.tsx - Gbtc
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
//  06/25/2026 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { GenericController, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { Column, Paging, Table } from '@gpa-gemstone/react-table';
import moment from 'moment';
import * as React from 'react';

const AnalysisJobController = new GenericController<LocalXDA.FileGroupAnalysisJob>(`${homePath}api/OpenXDA/FileGroupAnalysisJob`, "ProcessingVersion", true);

interface IProps {
    FileGroupID: number,
    SetAnalysisJob: React.Dispatch<React.SetStateAction<LocalXDA.FileGroupAnalysisJob>>,
    AnalysisJobID?: number
}

function AnalysisTask(props: IProps) {

    const [status, setStatus] = React.useState<Application.Types.Status>('idle');
    const [data, setData] = React.useState<LocalXDA.FileGroupAnalysisJob[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof LocalXDA.FileGroupAnalysisJob>("TaskPriority");

    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [page, setPage] = React.useState<number>(0);


    React.useEffect(() => {
        if (props.FileGroupID == undefined) return;
        setStatus('loading');
        const handle = AnalysisJobController
            .PagedSearch([], sortField, ascending, page, props.FileGroupID)
            .done((result) => {
                setData(JSON.parse(result.Data as unknown as string));
                setPageInfo({
                    RecordsPerPage: result.RecordsPerPage,
                    NumberOfPages: result.NumberOfPages,
                    TotalRecords: result.TotalRecords
                });
                setStatus('idle');
        }).fail(() => setStatus('error'));

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        }
    }, [sortField, ascending, page, props.FileGroupID]);

    React.useEffect(() => {
        if ((pageInfo.TotalRecords == 1 || AnalysisTask == undefined) && data.length > 0)
            props.SetAnalysisJob(data[0]);
    }, [data, AnalysisTask])

    if (props.FileGroupID == undefined) return null;

    return (
        <div className="col d-flex" style={{ flexDirection: 'column' }}>
            <LoadingScreen Show={status === 'loading'} />
            <Table<LocalXDA.FileGroupAnalysisJob>
                TableClass="table table-hover"
                Data={data}
                SortKey={sortField}
                Ascending={ascending}
                Selected={(d) => d.ID == props.AnalysisJobID}
                KeySelector={(item) => item.ID}
                OnClick={(d) => props.SetAnalysisJob(d.row)}
                OnSort={(d) => {
                    if (d.colField == sortField) {
                        setAscending(!ascending);
                    }
                    else {
                        setAscending(true);
                        setSortField(d.colField);
                    }
                }}
            >
                <Column<LocalXDA.FileGroupAnalysisJob>
                    Key={'ProcessingVersion'}
                    AllowSort={true}
                    Field={'ProcessingVersion'}
                    HeaderStyle={{ width: '10%' }}
                    RowStyle={{ width: '10%' }}
                >
                    Version
                </Column>
                <Column<LocalXDA.FileGroupAnalysisJob>
                    Key={'TaskQueuedTime'}
                    AllowSort={true}
                    Field={'TaskQueuedTime'}
                    HeaderStyle={{ width: '25%' }}
            RowStyle={{ width: '25%' }}
            Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : 'N/A'}

                >
                    Task Queued
                </Column>
                <Column<LocalXDA.FileGroupAnalysisJob>
                    Key={'ProcessingStartTime'}
                    AllowSort={true}
                    Field={'ProcessingStartTime'}
                    Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : 'N/A'}
                    HeaderStyle={{ width: '25%' }}
            RowStyle={{ width: '25%' }}
        >
                Processing Started
                </Column>
                <Column<LocalXDA.FileGroupAnalysisJob>
            Key={'ProcessingEndTime'}
                    AllowSort={true}
                    Field={'ProcessingEndTime'}
                    Content={({ item, field }) => (item[field] != undefined && moment(item[field])).valueOf() > 1000 ? moment(item[field]).format('MM/DD/YY HH:mm') : 'N/A'}
            HeaderStyle={{ width: '25%' }}
            RowStyle={{ width: '25%' }}
                >
                    Processing Finished
        </Column>
        <Column<LocalXDA.FileGroupAnalysisJob>
            Key={'TaskPriority'}
            AllowSort={true}
            Field={'TaskPriority'}
            Content={({ item, field }) =>
                <Priority
                    priority={item[field] as number}
                />
            }
            HeaderStyle={{ width: '15%' }}
            RowStyle={{ width: '15%' }}
        >
            Priority
        </Column>
            </Table>
            <div className="row justify-content-center">
                <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
            </div>
        </div>
    );
}

const Priority = ({ priority }: { priority: number }) => {

    const visual = React.useMemo(() => {
        if (priority == 3) // High Priority
            return "badge-light";
        if (priority == 2) //Normal Priority
            return "badge-info";
        if (priority == 1) // Enumeration
            return "badge-primary";
        if (priority == 4) // Manual Requeue
            return "badge-warning";
        return "badge-warning";
    }, [priority]);

    const text = React.useMemo(() => {
        if (priority == 1)
            return "Enumeration";
        if (priority == 2)
            return "Normal";
        if (priority == 3)
            return "High";
        if (priority == 2)
            return "Manual";

        return "Unknown";
    }, [priority]);

    return <span className={`"badge badge-pill ${visual}`}>
        {text}
    </span>
}
   
export default AnalysisTask;