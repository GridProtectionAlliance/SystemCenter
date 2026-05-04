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
import { Application } from '@gpa-gemstone/application-typings';
import { Table, Paging, Column } from '@gpa-gemstone/react-table'
import { Plot, Bar } from '@gpa-gemstone/react-graph'
import { LoadingScreen, Modal } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols'
import { SystemCenter as SC } from '../global';
import moment from 'moment'
import DataOperationFailure, { INamedDataOperationFailure } from './DataOperationFailure'

interface IAggregateProcessedFile {
    Hour: string,
    Count: number
}

const FilesProcessed = () => {
    const [sortField, setSortField] = React.useState<keyof SC.DataFile>('ID')
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [plotWidth, setPlotWidth] = React.useState<number>(100);
    const [plotHeight, setPlotHeight] = React.useState<number>(400);
    const [page, setPage] = React.useState<number>(0);
    const [failurePage, setFailurePage] = React.useState<number>(0)
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [totalFailurePages, setTotalFailurePages] = React.useState<number>(0)
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
    const [selectedFile, setSelectedFile] = React.useState<string>(null)
    const [filteredHour, setFilteredHour] = React.useState<string>(null)
    const [selectedTime, setSelectedTime] = React.useState<string>(null)

    // set plot dimensions
    React.useLayoutEffect(() => {
        setPlotHeight(rowRef?.current?.offsetHeight ?? 400)
        setPlotWidth((rowRef?.current?.offsetWidth ?? 130) - 30)
    });

    React.useEffect(() => {
        setStatus('loading')
        getFileGroups()
        getDataOperationFailure()
        setStatus('idle')
    }, [sortField, ascending, page, filteredHour, failurePage])

    React.useEffect(() => {
        getAggregateRecentlyProcessedFiles()
    }, [])

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
        const filters = filteredHour === null ? [{
            FieldName: 'ProcessingStartTime',
            Operator: '>',
            Type: 'datetime',
            SearchText: moment().subtract(48, 'hour').startOf('hour').format('YYYY-MM-DD HH:mm:ss.SSS')
        }]
            : [
                {
                    FieldName: 'ProcessingStartTime',
                    Operator: '>=',
                    Type: 'datetime',
                    SearchText: moment(filteredHour).format('YYYY-MM-DD HH:mm:ss.SSS')
                },
                {
                    FieldName: 'ProcessingStartTime',
                    Operator: '<',
                    Type: 'datetime',
                    SearchText: moment(filteredHour).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss.SSS')
                }
            ]
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataFile/PagedList/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ Searches: filters, OrderBy: sortField, Ascending: ascending }),
        });

        h.done((d) => {
            setDataFile(JSON.parse(d.Data))
            setTotalPages(d.NumberOfPages)
            if (page - 1 >= d.NumberOfPages)
                setPage(d.NumberOfPages - 1)
            // if datafile not in there, set it to null
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
        const filters = filteredHour === null ? [{
            FieldName: 'TimeOfFailure',
            Operator: '>',
            Type: 'datetime',
            SearchText: moment().subtract(48, 'hour').startOf('hour').format('YYYY-MM-DD HH:mm:ss.SSS')
        }]
            : [
                {
                    FieldName: 'TimeOfFailure',
                    Operator: '>=',
                    Type: 'datetime',
                    SearchText: moment(filteredHour).format('YYYY-MM-DD HH:mm:ss.SSS')
                },
                {
                    FieldName: 'TimeOfFailure',
                    Operator: '<',
                    Type: 'datetime',
                    SearchText: moment(filteredHour).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss.SSS')
                }
            ]

        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataOperationFailure/RecentFailures/${failurePage}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ Searches: filters, OrderBy: 'TimeOfFailure', Ascending: false }),
        });

        h.done((d) => {
            setDataOperationFailure(JSON.parse(d.Data))
            setTotalFailurePages(d.NumberOfPages)
            if (failurePage - 1 >= d.NumberOfPages)
                setPage(d.NumberOfPages - 1)
            setStatus('idle')
        }).fail(() => {
            setStatus('error')
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    function handleViewMoreClick(info: string, event: React.MouseEvent) {
        setDetailModalContent(info)
        setShowDetailModal(true)
    }

    const handleOnPlotSelect = React.useCallback((x: number, y: number[]) => {
        const selectedHour = aggregateProcessedFiles.find(a => moment(a.Hour).valueOf() < x && (moment(a.Hour).valueOf() + 3600000) > x && y[0] < a.Count)
        setFilteredHour(selectedHour?.Hour ?? null)
    }, [aggregateProcessedFiles])

    function handleOnTableClick(data, event: React.MouseEvent) {
        setSelectedFile(data.row.FileName)
        setSelectedTime(data.row.ProcessingStartTime)
    }

    function handleDataOperationFailureClick(data: INamedDataOperationFailure, event: React.MouseEvent) {
        setSelectedFile(data.DataFileName)
        setSelectedTime(data.TimeOfFailure)
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
                            onSelect={handleOnPlotSelect}
                            pan={false}
                            defaultMouseMode={'select'}
                        >
                            {aggregateProcessedFiles.length == 0 ? null :
                                aggregateProcessedFiles.map((a, i) => {
                                    return <Bar
                                        Data={[a.Count]}
                                        BarOrigin={moment(a.Hour).valueOf()}
                                        BarWidth={3600000}
                                        Color={a.Hour === filteredHour ? 'yellow' : moment(a.Hour).startOf('hour').valueOf() === moment(selectedTime).startOf('hour').valueOf() && selectedTime !== null ? 'green' : 'black'}
                                        key={a.Hour}
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
                            OnClick={handleOnTableClick}
                            Selected={(item) => item.FileName == selectedFile}
                        >
                            <Column<SC.DataFile>
                                Key={'FileName'}
                                AllowSort={false}
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
                                    if (item[field] == "0001-01-01T00:00:00")
                                        return 'N/A'
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
                                    if (item[field] == null || item[field] == undefined)
                                        return 'N/A'
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
                                    if (item[field] == "0001-01-01T00:00:00")
                                        return 'N/A'
                                    return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                                }}
                            >
                                Processing End Time
                            </Column>
                            <Column<SC.DataFile>
                                Key={'ProcessingState'}
                                AllowSort={true}
                                Field={'ProcessingState'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, field }) => {
                                    return processingStateToSymbol(item[field] as number)
                                }}
                            >
                            </Column>
                        </Table>
                        <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
                    </div>
                </div>
                <div className="col-6 h-100">
                    <fieldset className="border h-100" style={{ padding: '10px', flex: '1 1 0%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}> Data Operation Failures :</legend>
                        <div className="row d-flex flex-column h-100" style={{ overflow: 'hidden' }}>
                            <div className="col h-100" style={{ overflow: 'auto' }}>
                                {dataOperationFailure.map((e) => {
                                    return <DataOperationFailure
                                        NamedDataOperationFailure={e}
                                        SelectedFile={selectedFile}
                                        HandleViewMoreClick={handleViewMoreClick}
                                        HandleDataOperationFailureClick={handleDataOperationFailureClick}
                                        SetHovered={setHovered}
                                        Hovered={hovered}

                                    />
                                })
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Paging Current={failurePage + 1} Total={totalFailurePages} SetPage={(p) => setFailurePage(p - 1)} />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </>
                : null}
            <Modal
                Title={'Log'}
                CallBack={() => { setShowDetailModal(false) }}
                Show={showDetailModal}
                ShowCancel={false}
                ShowX={true}
                ShowConfirm={false}
            >
                {detailModalContent}
            </Modal>
        </div>)
}

export default FilesProcessed

const processingStateToSymbol = (processingState: number) => {
    if (processingState == 0) //Added - Unknown
        return <ReactIcons.Warning Size={15} />;
    if (processingState == 1) //Queued
        return <ReactIcons.Document Size={15} />;
    if (processingState == 2) // Processing
        return <ReactIcons.SpiningIcon Size={15} />;
    if (processingState == 3) // Processed
        return <ReactIcons.CircleCheckMark Size={15} />
    if (processingState == 4) // Error
        return <ReactIcons.CircledX Size={15} />;
    if (processingState == 5) // Partial Success
        return <ReactIcons.Alert Size={15} />;
    return <ReactIcons.Warning Size={15} />
}