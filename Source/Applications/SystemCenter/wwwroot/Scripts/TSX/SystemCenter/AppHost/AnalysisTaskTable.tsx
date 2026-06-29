//******************************************************************************************************
//  AnalysisTaskTable.tsx - Gbtc
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
//  05/07/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { Table, Paging, Column } from '@gpa-gemstone/react-table'
import { OpenXDA } from '../global';
import moment from 'moment'
import { Application } from '@gpa-gemstone/application-typings';
import { LoadingIcon, GenericController, Search } from '@gpa-gemstone/react-interactive'
import { ErrorBoundary } from '@gpa-gemstone/common-pages'
import { ToolTip } from '@gpa-gemstone/react-forms'

const FileController = new GenericController<OpenXDA.AnalysisTask>(`${homePath}api/OpenXDA/AnalysisTask`, "TimeQueued", false);

const AnalysisTaskTable = () => {
    const [sortField, setSortField] = React.useState<keyof OpenXDA.AnalysisTask>('TimeQueued')
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [dataFile, setDataFile] = React.useState<OpenXDA.AnalysisTask[]>([])
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [page, setPage] = React.useState<number>(0);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [hovered, setHovered] = React.useState<string>('')

    React.useEffect(() => {
        setStatus('loading')

        const h = FileController.PagedSearch([], sortField, ascending, page)

        h.done((d) => {
            setDataFile(JSON.parse(d.Data.toString()))
            setTotalPages(d.NumberOfPages)
            if (page >= d.NumberOfPages && d.NumberOfPages > 0)
                setPage(d.NumberOfPages - 1)
            setStatus('idle')
        }).fail(() => {
            setStatus('error')
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }, [sortField, ascending, page])

    return <ErrorBoundary
        ErrorMessage={"Queued Tasks Table has encountered an error."}
    >
        {status === "loading" ?
            <LoadingIcon
                Show={true}
                Size={40}
            />
            : <>
                <Table<OpenXDA.AnalysisTask>
                    Data={dataFile}
                    SortKey={sortField}
                    Ascending={ascending}
                    KeySelector={(item) => item.ID}
                    OnSort={(d) => {
                        if (d.colField == sortField) {
                            setAscending(!ascending);
                        }
                        else {
                            setAscending(true);
                            setSortField(d.colField);
                        }
                        setPage(0)
                    }}
                    OnClick={() => { } }
                    Selected={() => false}
                >
                    <Column<OpenXDA.AnalysisTask>
                        Key={'MeterName'}
                        AllowSort={false}
                        Field={'MeterName'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    >
                        Meter
                    </Column>
                
                    <Column<OpenXDA.AnalysisTask>
                        Key={'DataStartTime'}
                        AllowSort={true}
                        Field={'DataStartTime'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                        Content={({ item, field }) => {
                            if (item[field] == "0001-01-01T00:00:00")
                                return 'N/A'
                            return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                        }}
                    >
                        Data Start
                    </Column>

                    <Column<OpenXDA.AnalysisTask>
                        Key={'DataEndTime'}
                        AllowSort={true}
                        Field={'DataEndTime'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                        Content={({ item, field }) => {
                            if (item[field] == "0001-01-01T00:00:00")
                                return 'N/A'
                            return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                        }}
                    >
                        Data End
                    </Column>
                    <Column<OpenXDA.AnalysisTask>
                        Key={'Priority'}
                        AllowSort={true}
                        Field={'Priority'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                        Content={({ item, field }) =>
                            <Priority
                                priority={item[field] as number}
                            />
                        }
                    >
                        Priority
                    </Column>
                </Table>
                <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
            </>
        }
    </ErrorBoundary>
}

export default AnalysisTaskTable

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

