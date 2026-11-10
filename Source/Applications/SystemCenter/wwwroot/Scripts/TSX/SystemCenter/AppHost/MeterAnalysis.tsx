//******************************************************************************************************
//  MeterAnalysis.tsx - Gbtc
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
//  11/10/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react'
import { Table, Paging, Column } from '@gpa-gemstone/react-table'
import { OpenXDA } from '../global';
import { Application } from '@gpa-gemstone/application-typings';
import { LoadingIcon, GenericController } from '@gpa-gemstone/react-interactive'
import { ErrorBoundary } from '@gpa-gemstone/common-pages'


const MeterAnalysisController = new GenericController<OpenXDA.MeterAnalysis>(`${homePath}api/OpenXDA/MeterAnalysis`, "Name", false);

const AnalysisTaskTable = () => {
    const [sortField, setSortField] = React.useState <keyof OpenXDA.MeterAnalysis>('Name')
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [dataFile, setDataFile] = React.useState<OpenXDA.MeterAnalysis[]>([])
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [page, setPage] = React.useState<number>(0);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')

    React.useEffect(() => {
        setStatus('loading')

        const h = MeterAnalysisController.PagedSearch([], sortField, ascending, page)

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
                <Table<OpenXDA.MeterAnalysis>
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
                    OnClick={() => { }}
                    Selected={() => false}
                >
                    <Column<OpenXDA.MeterAnalysis>
                        Key={'Name'}
                        AllowSort={false}
                        Field={'Name'}
                    >
                        Meter
                    </Column>
                    <Column<OpenXDA.MeterAnalysis>
                        Key={'EnumeratorCount'}
                        AllowSort={false}
                        Field={'EnumeratorCount'}
                    >
                        # Enumerator
                    </Column>
                    <Column<OpenXDA.MeterAnalysis>
                        Key={'EnumeratorCount'}
                        AllowSort={false}
                        Field={'EnumeratorCount'}
                    >
                        # Enumerator
                    </Column>
                    <Column<OpenXDA.MeterAnalysis>
                        Key={'HighCount'}
                        AllowSort={false}
                        Field={'HighCount'}
                    >
                        # High
                    </Column>
                    <Column<OpenXDA.MeterAnalysis>
                        Key={'NormalCount'}
                        AllowSort={false}
                        Field={'NormalCount'}
                    >
                        # Normal
                    </Column>
                    <Column<OpenXDA.MeterAnalysis>
                        Key={'RequeueCount'}
                        AllowSort={false}
                        Field={'RequeueCount'}
                    >
                        # Requeue
                    </Column>
                    <Column<OpenXDA.MeterAnalysis>
                        Key={'TotalCount'}
                        AllowSort={false}
                        Field={'TotalCount'}
                    >
                        # Total
                    </Column>
                </Table>
                <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
            </>
        }
    </ErrorBoundary>
}

export default AnalysisTaskTable;