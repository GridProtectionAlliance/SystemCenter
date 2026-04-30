//******************************************************************************************************
//  FileWatcher.tsx - Gbtc
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
//  04/09/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { Table, Paging, Column } from '@gpa-gemstone/react-table'
import { Plot, Bar } from '@gpa-gemstone/react-graph'
import { LoadingScreen, Modal } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { SystemCenter as SC } from '../global';
import moment from 'moment'

interface INamedDataOperationFailure extends OpenXDA.Types.DataOperationFailure {
    DataFileName: string
}

interface IAggregateProcessedFile {
    Hour: string,
    Count: number
}

const FilesProcessed = (props: {}) => {

    const [sortField, setSortField] = React.useState<keyof SC.DataFile>('ID')
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [plotWidth, setPlotWidth] = React.useState<number>(100);
    const [plotHeight, setPlotHeight] = React.useState<number>(400);
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>()
    const [totalFailurePages, setTotalFailurePages] = React.useState<number>()
    const [hovered, setHovered] = React.useState<string>('')
    const [dataFile, setDataFile] = React.useState<SC.DataFile[]>([])
    const [dataOperationFailure, setDataOperationFailure] = React.useState<INamedDataOperationFailure[]>([])
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [timeframe, setTimeframe] = React.useState<[number, number]>([moment().subtract(48, 'hour').startOf('hour').valueOf(), moment().add(1, 'hour').startOf('hour').valueOf()])
    const [yMax, setYMax] = React.useState<number>(0)
    const rowRef = React.useRef<HTMLDivElement>(null);
    const [aggregateProcessedFiles, setAggregateProcessedFiles] = React.useState<IAggregateProcessedFile[]>([])
    const [detailModalContent, setDetailModalContent] = React.useState<string>('')
    const [showDetailModal, setShowDetailModal] = React.useState<boolean>(false)

    // set plot dimensions
    React.useLayoutEffect(() => {
        setPlotHeight(rowRef?.current?.offsetHeight ?? 400)
        setPlotWidth((rowRef?.current?.offsetWidth ?? 130) - 30)
    });

    React.useEffect(() => {
        setStatus('loading')
        getFileGroups()
        getDataOperationFailure()
        getAggregateRecentlyProcessedFiles()
        setStatus('idle')
    }, [sortField, ascending, page])

    function getAggregateRecentlyProcessedFiles() {
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataFile/AggregateRecentlyProcessedFiles`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
        })

        h.done((d) => {
            setAggregateProcessedFiles(d)
            setYMax(Math.max(...d?.map((c) => { return c.Count })))
        }).fail(() => {
            setStatus('error')
        })
        return function cleanup() {
            if (h.abort != null)
                h.abort();

        }
    }

    function getFileGroups() {
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataFile/PagedList/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ Searches: [{ FieldName: 'ProcessingStartTime', SearchText: moment().subtract(48, 'hour').startOf('hour').format('YYYY-MM-DD HH:mm:ss.SSS'), Operator: '>', Type: 'datetime' }], OrderBy: sortField, Ascending: ascending }),
        });

        h.done((d) => {
            setDataFile(JSON.parse(d.Data))
            setTotalPages(d.NumberOfPages)
            setStatus('idle')
        }).fail(() => {
            setStatus('error')
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    function getDataOperationFailure() {
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataOperationFailure/RecentFailures`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ Searches: [{ FieldName: 'TimeOfFailure', SearchText: moment().subtract(48, 'hour').startOf('hour').format('YYYY-MM-DD HH:mm:ss.SSS'), Operator: '>', Type: 'datetime' }], OrderBy: 'TimeOfFailure', Ascending: false }),
        });

        h.done((d) => {
            setDataOperationFailure(JSON.parse(d.Data))
            setTotalFailurePages(d.NumberOfPages)
            setStatus('idle')
        }).fail(() => {
            setStatus('error')
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    function handleViewMoreClick(event: React.MouseEvent, message: string) {
        setDetailModalContent(message)
        setShowDetailModal(true)
    }
    
    return (
        <div className="row h-100">
            <LoadingScreen Show={status === 'loading'} />
            {status === 'idle' && dataFile !== null ? <>
                <div className="col-6 h-100">
                    <div className="row h-50" ref={rowRef}>
                        <Plot
                            height={plotHeight}
                            width={plotWidth}
                            defaultTdomain={timeframe}
                            defaultYdomain={[0, yMax]}
                            onTDomainChange={setTimeframe}
                            zoom={false}
                            yZoom={false}
                            xZoom={false}
                            Tmin={timeframe[0]}
                            Tmax={timeframe[1]}
                            Ymin={0}
                            Ymax={yMax} // should be dynamic
                            Ylabel={'Files Queued'}
                        >
                            {aggregateProcessedFiles.length == 0 ? null :
                                aggregateProcessedFiles.map((a, i) => {
                                    return <Bar
                                        Data={[a.Count]}
                                        BarOrigin={moment(a.Hour).valueOf()}
                                        BarWidth={3600000}
                                        Color={'black'}
                                        >
                                    </Bar>
                                })}
                        </Plot>
                    </div>
                    <div className="row d-flex flex-column h-50" style={{ flex: '1, 1, 0%' }}>
                        <Table<SC.DataFile>
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
                            }}
                        >
                            <Column<SC.DataFile>
                                Key={'FileName'}
                                AllowSort={true}
                                Field={'FileName'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            >
                                File Name
                            </Column>
                            <Column<SC.DataFile>
                                Key={'DataStartTime'}
                                AllowSort={true}
                                Field={'DataStartTime'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, field }) => {
                                    return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                                }}
                            >
                                Data Start Time
                            </Column>
                            <Column<SC.DataFile>
                                Key={'ProcessingStartTime'}
                                AllowSort={true}
                                Field={'ProcessingStartTime'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, field }) => {
                                    return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                                }}
                            >
                                Processing Start Time
                            </Column>
                            <Column<SC.DataFile>
                                Key={'ProcessingEndTime'}
                                AllowSort={true}
                                Field={'ProcessingEndTime'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, field }) => {
                                    return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                                }}
                            >
                                Processing End Time
                            </Column>

                        </Table>
                            <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
                    </div>
                </div>
                <div className="col-6">
                    <fieldset className="border h-100" style={{ padding: '10px', flex: '1 1 0%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}> Data Operation Failures :</legend>
                    {dataOperationFailure.map((e, i) => {
                                return <div className={'row alert-danger m-2'}>
                                <div className={'col-2 d-flex justify-content-center align-items-center'}>
                                <span className={`badge badge-pill badge-secondary`}>{moment(e.TimeOfFailure).format('MM/DD/YYYY hh:mm')}</span>
                            </div>
                                <div className={'col-3 d-flex justify-content-center align-items-center'}>
                                    <h6>{e.DataOperationTypeName.split('.')[e.DataOperationTypeName.split('.').length - 1]}</h6>
                                </div>
                                <div className={'col-3 d-flex justify-content-center align-items-center'}>{e.DataFileName}</div>
                            <div className={'col-2 d-flex justify-content-around align-items-center'}>
                                    <div className={'btn btn-primary'}
                                        onMouseEnter={() => setHovered(`failurelog${e.ID.toString()}`)}
                                        onMouseLeave={() => setHovered('')}
                                        data-tooltip={`failurelog${e.ID.toString()}`}
                                    >
                                        View Log
                            </div>
                                    <ToolTip
                                        Show={hovered === `failurelog${e.ID.toString()}`}
                                        Target={`failurelog${e.ID.toString()}`}
                                    >
                                        {e.Log.length > 100
                                            ? <>
                                                <p>{`${e.Log.slice(0, 100)}...`}</p>
                                                <a href="#" onClick={(ev) => { handleViewMoreClick(ev, e.Log) }}>View more</a>
                                            </>
                                            : <p>{e.Log}</p>}
                                    </ToolTip>
                                </div>
                            <div className={'col-2 d-flex justify-content-around align-items-center'}>
                                    <div className={'btn btn-primary'}
                                        onMouseEnter={() => setHovered(`failurestacktrace${e.ID.toString()}`)}
                                        onMouseLeave={() => setHovered('')}
                                        data-tooltip={`failurestacktrace${e.ID.toString()}`}
                                    >
                                        View Stack Trace
                                    </div>
                                    <ToolTip
                                        Show={hovered === `failurestacktrace${e.ID.toString()}`}
                                        Target={`failurestacktrace${e.ID.toString()}`}
                                    >
                                        {e.StackTrace.length > 100
                                            ? <>
                                                <p>{`${e.StackTrace.slice(0, 100)}...`}</p>
                                                <a href="#" onClick={(ev) => {handleViewMoreClick(ev,e.StackTrace)}}>View more</a>
                                            </>
                                            : <p>{e.StackTrace}</p>}
                                    </ToolTip>
                            </div>
                            </div>
                    })
                    }
                </div>
            </>
                : null}
        </div>)
}


export default FilesProcessed