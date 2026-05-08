//******************************************************************************************************
//  FilesProcessedGraph.tsx - Gbtc
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
import moment from 'moment'
import { Application } from '@gpa-gemstone/application-typings';
import { Plot, Bar } from '@gpa-gemstone/react-graph'

export interface IAggregateProcessedFile {
    Hour: string,
    Count: number
}

interface IProps {
    OffsetHeight: number
    OffsetWidth: number
    FilteredHour: string
    SelectedTime: string
    SetFilteredHour: React.Dispatch<React.SetStateAction<string>>
}

const FilesProcessedGraph = (props: IProps) => {
    const [yMax, setYMax] = React.useState<number>(0)
    const [timeframe, setTimeframe] = React.useState<[number, number]>([moment().subtract(48, 'hour').startOf('hour').valueOf(), moment().add(1, 'hour').startOf('hour').valueOf()])
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [aggregateProcessedFiles, setAggregateProcessedFiles] = React.useState<IAggregateProcessedFile[]>([])

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

    const handleOnPlotSelect = React.useCallback((x: number, y: number[]) => {
        const selectedHour = aggregateProcessedFiles.find(a => moment(a.Hour).valueOf() < x && (moment(a.Hour).valueOf() + 3600000) > x && y[0] < a.Count)
        props.SetFilteredHour(selectedHour?.Hour ?? null)
    }, [aggregateProcessedFiles])

    return <Plot
        height={props.OffsetHeight}
        width={props.OffsetWidth}
        defaultTdomain={timeframe}
        defaultYdomain={[0, yMax]}
        onTDomainChange={setTimeframe}
        zoom={false}
        yZoom={false}
        xZoom={false}
        Tmin={timeframe[0]}
        Tmax={timeframe[1]}
        Ymin={0}
        Ymax={yMax}
        Ylabel={'Files Queued'}
        onSelect={handleOnPlotSelect}
        pan={false}
        defaultMouseMode={'select'}
    >
        {aggregateProcessedFiles.length == 0 ? null :
            aggregateProcessedFiles.map((a) => {
                return <Bar
                    Data={[a.Count]}
                    BarOrigin={moment(a.Hour).valueOf()}
                    BarWidth={3600000}
                    Color={a.Hour === props.FilteredHour ? 'yellow' : moment(a.Hour).startOf('hour').valueOf() === moment(props.SelectedTime).startOf('hour').valueOf() && props.SelectedTime !== null ? 'green' : 'black'}
                    key={a.Hour}
                >
                </Bar>
            })}
    </Plot>
}

export default FilesProcessedGraph