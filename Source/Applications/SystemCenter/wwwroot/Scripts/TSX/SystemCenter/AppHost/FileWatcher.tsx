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
import { OpenXDA, Application , SystemCenter as SC} from '@gpa-gemstone/application-typings';
import { Table, Paging, Column } from '@gpa-gemstone/react-table'
import { Plot, Bar } from '@gpa-gemstone/react-graph'
import StatusGroup from './StatusGroup'
import { LoadingScreen } from '@gpa-gemstone/react-interactive';
import moment from 'moment'


const FileWatcher = (props: {}) => {

    const [sortField, setSortField] = React.useState<keyof OpenXDA.Types.DataFile>('ID')
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [plotWidth, setPlotWidth] = React.useState<number>(100);
    const [plotHeight, setPlotHeight] = React.useState<number>(400);
    const [hoveredItem, setHoveredItem] = React.useState<string>(null)
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>()
    const [totalFailurePages, setTotalFailurePages] = React.useState<number>()
    const [dataFile, setDataFile] = React.useState<OpenXDA.Types.DataFile[]>([])
    const [dataOperationFailure, setDataOperationFailure] = React.useState<OpenXDA.Types.DataOperationFailure[]>([])
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [timeframe, setTimeframe] = React.useState<[number, number]>([null, null])

    const rowRef = React.useRef<HTMLDivElement>(null);


    const bars = React.useMemo(() => {
        const timestamps = []
        dataFile.forEach((df) => {
            if (!(timestamps.includes(df.DataStartTime))) {
                timestamps.push(df.DataStartTime)
            }
            if (!(timestamps.includes(df.ProcessingEndTime))) {
                timestamps.push(df.ProcessingEndTime)
            }
        })
        timestamps.sort((a, b) => { return moment(a).valueOf() - moment(b).valueOf()})
        const bars = {}
        timestamps.forEach((ts) => { bars[ts] = 0 })
        dataFile.forEach((df) => {
            // add 1 to every timestamp from start to end, start inclusive, end exclusive
            timestamps.forEach((ts) => { moment(ts).valueOf() >= moment(df.DataStartTime).valueOf() && moment(ts).valueOf() < moment(df.ProcessingEndTime).valueOf() ? bars[ts]++ : null })
        })
        console.log(bars)
        return bars
    }, [dataFile])

    // set plot dimensions
    React.useLayoutEffect(() => {
        setPlotHeight(rowRef?.current?.offsetHeight ?? 400)
        setPlotWidth((rowRef?.current?.offsetWidth ?? 130) - 30)
    });


    React.useEffect(() => {
        if (dataFile.length == 0)
            return;
        const startTime = Math.min(...dataFile.map((i) => moment(i.DataStartTime).valueOf()))
        const endTime = moment.now().valueOf()
        setTimeframe([startTime, endTime])
    }, [dataFile])

    React.useEffect(() => {
        setStatus('loading')
        getFileGroups()
        getDataOperationFailure()
        setStatus('idle')
    }, [sortField, ascending, page])

    function getFileGroups() {
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataFile/PagedList/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ Searches: [], OrderBy: sortField, Ascending: ascending }),
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
            data: JSON.stringify({ Searches: [], OrderBy: 'TimeOfFailure', Ascending: false }),
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

    
    return (
        <div className="row" style={{ height: 'inherit', overflowY: 'hidden'} }>
            <LoadingScreen Show={status === 'loading'} />
            {status === 'idle' && dataFile !== null ? <>
                <div className="col-6">
                    <div ref={rowRef}>
                        <Plot
                            height={plotHeight}
                            width={plotWidth}
                            defaultTdomain={timeframe}
                            defaultYdomain={[0, 50]}
                            onTDomainChange={setTimeframe}
                            zoom={true}
                            yZoom={true}
                            showDateOnTimeAxis={true}
                        >
                            {Object.keys(bars).sort((a, b) => { return moment(a).valueOf() - moment(b).valueOf()}).map((bar, i, array) => (
                                <Bar
                                    Data={[moment(bars[bar as string]).valueOf()]}
                                    BarOrigin={moment(bar).valueOf()}
                                    BarWidth={(moment(array[i + 1]).valueOf() - moment(bar).valueOf())}
                                    Color={'green'}
                                />
                            ))}
                        </Plot>
                    </div>
                    <div className="row d-flex flex-column" style={{ flex: '1, 1, 0%', overflowY: 'hidden' }}>
                        <Table<OpenXDA.Types.DataFile>
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
                            <Column<OpenXDA.Types.DataFile>
                                Key={'FilePath'}
                                AllowSort={true}
                                Field={'FilePath'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            >
                                FilePath
                            </Column>
                            <Column<OpenXDA.Types.DataFile>
                                Key={'DataStartTime'}
                                AllowSort={true}
                                Field={'DataStartTime'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            >
                                Data Start Time
                            </Column>
                            <Column<OpenXDA.Types.DataFile>
                                Key={'ProcessingEndTime'}
                                AllowSort={true}
                                Field={'ProcessingEndTime'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            >
                                Processing End Time
                            </Column>

                        </Table>
                            <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
                    </div>
                </div>
                <div className="col-6">
                    <StatusGroup
                        Status="idle"
                        StatusItems={dataOperationFailure.map((d) => { return { Name: 'Failure:', Status: 'Error', Details: [{Status: 'Error', Description: d.Log}] }})}
                        HoveredItem={hoveredItem}
                        SetHoveredItem={setHoveredItem}
                        Name={'events'}
                    />
                </div>
            </>
                : null}
        </div>)
}


export default FileWatcher