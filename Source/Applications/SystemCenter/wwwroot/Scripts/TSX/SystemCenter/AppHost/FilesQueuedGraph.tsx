//******************************************************************************************************
//  FilesQueuedGraph.tsx - Gbtc
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
//  06/16/2026 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import moment from 'moment'
import { Application } from '@gpa-gemstone/application-typings';
import { Plot, Line } from '@gpa-gemstone/react-graph'
import { ErrorBoundary } from '@gpa-gemstone/common-pages'
import { LoadingIcon } from '@gpa-gemstone/react-interactive'

interface IQueueLength {
    Time: string,
    QueueLengthByPriority: [number, number][],
    TimeStamp?: number
}

interface IQueueData {
    Priority: number,
    Data: [number, number][]
}

interface IProps {
    Height: number
    Width: number,
}

const FilesProcessedGraph = (props: IProps) => {
    const [timeframe, setTimeframe] = React.useState<[number, number]>([moment().subtract(48, 'hour').startOf('hour').valueOf(), moment().add(1, 'hour').startOf('hour').valueOf()])
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [aggregateProcessedFiles, setAggregateProcessedFiles] = React.useState<IQueueData[]>([])

    React.useEffect(() => {

        setStatus('loading')

        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AppHost/xda/AnalysisQueue/`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
        }).done((d) => {
            
            const dat: IQueueData[] = [];
            let tmin = 0;
            let tmax = 0;
            d.forEach((c: IQueueLength) => {
                c.TimeStamp = moment.utc(c.Time).valueOf();
                if (tmin > c.TimeStamp || tmin == 0)
                    tmin = c.TimeStamp;
                if (tmax < c.TimeStamp)
                    tmax = c.TimeStamp;


                c.QueueLengthByPriority.forEach(qlbp => {
                    const i = dat.findIndex(item => item.Priority == qlbp[0])
                    if (i > -1)
                        dat[i].Data.push([c.TimeStamp, qlbp[1]]);
                    else
                        dat.push({ Priority: qlbp[0], Data: [[c.TimeStamp, qlbp[1]]] })
                });
            }
            )
            setTimeframe([tmin, tmax])
            setAggregateProcessedFiles(dat);
            setStatus('idle');
        }).fail(() => {
            setStatus('error')
        })

        return () => { if (h.abort != null) h.abort(); }

    }, [])

    return <ErrorBoundary
        ErrorMessage={"Files Queued Graph has encountered an error."}
    >
        {status === "loading" ?
            <LoadingIcon
                Show={true}
                Size={40}
            /> :
            <>
                <div className="row">
                    <div className="col">
                        <h6>Current Tasks Queued</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Plot
                            height={props.Height}
                            width={props.Width}
                            defaultTdomain={timeframe}
                            onTDomainChange={setTimeframe}
                            legend={'right'}
                            zoom={false}
                            yZoom={false}
                            xZoom={false}
                            Tmin={timeframe[0]}
                            Tmax={timeframe[1]}
                            yDomain={'HalfAutoValue'}
                            Ylabel={'Tasks Queued'}
                            pan={false}
                            useUTC={false}
                            Tlabel={''}
                        >
                            {aggregateProcessedFiles.map((a) =>
                                <Line
                                    legend={getPriorityText(a.Priority)}
                                    data={a.Data}
                                    color={getPriorityColor(a.Priority)}
                                    showPoints={true}
                                    key={a.Priority}
                                    lineStyle={'-'}
                                >
                                </Line>
                            )}
                        </Plot>
                    </div>
                </div>

            </>
        }
    </ErrorBoundary>
}


export default FilesProcessedGraph

const getPriorityText = (priority: number ) => {
    if (priority == 1)
        return "Enumeration";
    if (priority == 2)
        return "Normal";
    if (priority == 3)
        return "High";
    if (priority == 2)
        return "Manual";

    return "Unknown";
}


const getPriorityColor = (priority: number) => {
    if (priority == 3) // High Priority
        return "#f8f9fa";
    if (priority == 2) //Normal Priority
        return "#0dcaf0";
    if (priority == 1) // Enumeration
        return "#0d6efd";
    if (priority == 4) // Manual Requeue
        return "#ffc107";
    return "#ffc107";
}
