//******************************************************************************************************
//  SentEmailTimeline.tsx - Gbtc
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
//  03/25/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { SentEmail } from '../global'
import * as $ from 'jquery'
import { Application } from '@gpa-gemstone/application-typings'
import { Table, Column } from '@gpa-gemstone/react-table'
import moment from 'moment';
import { Modal } from '@gpa-gemstone/react-interactive'
import { Pill, Plot, VerticalMarker } from '@gpa-gemstone/react-graph'

interface TimelineItem {
    Start: string,
    End?: string | null,
    Description: string,
    ID: number
}

interface Timestamp {
    Description: string,
    Timestamp: string
    TimelineID: number,
    ID: number,
    Delta: number
}

interface IProps {
    SentEmail: SentEmail
}

const SentEmailTimeline = (props: IProps) => {
    const [timeline, setTimeline] = React.useState<TimelineItem[]>(null)
    const [state, setState] = React.useState<Application.Types.Status>("uninitiated")
    const [sortKey, setSortKey] = React.useState<keyof Timestamp>('Timestamp')
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [plotHeight, setPlotHeight] = React.useState<number>(100);
    const [plotWidth, setPlotWidth] = React.useState<number>(100);
    const [selectedID, setSelectedID] = React.useState<number>(null);
    const rowRef = React.useRef<HTMLDivElement>(null);

    const [timeframe, setTimeframe] = React.useState<[number, number]>([null, null]) 


    React.useEffect(() => {
        if (props.SentEmail == null) return;
        let handle = getTimeline();
        handle.done((dt: string) => {
            const eventResults = JSON.parse(dt) as TimelineItem[];
            setTimeline(eventResults);
            setState('idle');
        }).fail((d) => setState('error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [props.SentEmail, sortKey, ascending])

    React.useEffect(() => {
        const times = timeline?.map((i) => { return moment(i.Start).valueOf() })
        const startTime = times != null ? Math.min(...times) : null
        const endTime = times != null ? Math.max(...times) : null
        setTimeframe([startTime, endTime])
    }, [timeline])


    const getTimeline = () => {
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/SentEmail/Timeline/${props.SentEmail.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ "Ascending": ascending, "OrderBy": sortKey })
        });
    }

    // set plot dimensions
    React.useLayoutEffect(() => {
        setPlotHeight(rowRef?.current?.offsetHeight ?? 100)
        setPlotWidth((rowRef?.current?.offsetWidth ?? 130) - 30)
    });

    const handleTableOnClick = (data) => {
        setSelectedID(data.row.TimelineID)
        const timelineItem = timeline.find((item) => item.ID == data.row.TimelineID)
        timelineItem.End == null ? setTimeframe(TenMinutesBeforeAndAfter(timelineItem))
            : setTimeframe(ThreeTimesDurationBeforeAndAfter(timelineItem))
    }

    return (
        <>
            {state !== 'idle' ? <></> :
                <div className="container-fluid d-flex h-100 flex-column">
                    <div className="row h-10" ref={rowRef}>
                        <div className="col-12">
                            
                            <Plot
                                defaultTdomain={timeframe}
                                height={plotHeight}
                                width={plotWidth}
                                showGrid={true}
                                XAxisType='time'
                                legend='bottom'
                                Ylabel=''
                                Tlabel='Time'
                                pan={false}
                                zoom={false}
                                holdMenuOpen={false}
                                yDomain={'HalfAutoValue'}
                                showDateOnTimeAxis={true}
                                hideYAxis={true}
                                
                            >
                                {timeline.map((item, i) => {
                                    return (
                                        item.End == null ?
                                            <VerticalMarker
                                                key={i}
                                                Value={moment(item.Start).valueOf()}
                                                color={selectedID == item.ID ? "#ffc107" : "black"}
                                                width={3}
                                                lineStyle={'solid'}
                                            /> :

                                            <Pill
                                                key={i}
                                                XData={[moment(item.Start).valueOf(), moment(item.End).valueOf()]}
                                                YData={[1,2]}
                                                RadiusPX={200}
                                                Color={selectedID == item.ID ? "#ffc107" : "black"}
                                                TextColor={selectedID == item.ID ? "black" : "white" }
                                                Text={item.Description}
                                            />
                                    )
                                })
                                }
                            </Plot>
                        </div>
                    </div>
                    <div className="row h-90">
                        <div className="col-12">
                            <Table<Timestamp>
                                TableClass="table table-hover"
                                Data={ToTimestamps(timeline)} 
                                SortKey={sortKey.toString()}
                                Ascending={ascending}
                                OnSort={(d) => {
                                    if (d.colKey === sortKey.toString()) setAscending(ascending => !ascending);
                                    else setSortKey(d.colField);
                                }}
                                KeySelector={(item) => item.ID}
                                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%'}}
                                Selected={(item) => item.TimelineID == selectedID}
                                OnClick={(data) => handleTableOnClick(data) }
                            >
                                <Column<Timestamp>
                                    Key={'Description'}
                                    AllowSort={true}
                                    Field={'Description'}
                                    HeaderStyle={{ width: 'auto' }}
                                    RowStyle={{ width: 'auto' }}
                                > Description
                                </Column>
                                <Column<Timestamp>
                                    Key={'Timestamp'}
                                    AllowSort={true}
                                    Field={'Timestamp'}
                                    HeaderStyle={{ width: 'auto' }}
                                    RowStyle={{ width: 'auto' }}
                                    Content={({ item, field }) => {
                                        return <span className={`badge badge-pill badge-${DeltaToClass(item.Delta)}`}>{moment(item[field]).format('MM/DD/YYYY HH:mm:ss')}</span>
                                    }}
                                > Timestamp
                                </Column>
                            </Table>
                        </div>
                    </div>
                </div>
            }</>)
}

export default SentEmailTimeline;

const ToTimestamps = (timeline: TimelineItem[]): Timestamp[] => {
    let timestamps = []
    let index = 0
    timeline.forEach((e, i, a) => {
        if (e.End == null) {
            timestamps.push({
                Description: e.Description,
                Timestamp: e.Start,
                TimelineID: e.ID,
                ID: index,
                Delta: GetDelta(e, i, a)
            })
            index++
            return
        }
        timestamps.push({
            Description: e.Description + ' Start',
            Timestamp: e.Start,
            TimelineID: e.ID,
            ID: index,
            Delta: GetDelta(e, i, a)
        })
        index++
        timestamps.push({
            Description: e.Description + ' End',
            Timestamp: e.End,
            TimelineID: e.ID,
            ID: index,
            Delta: GetDelta(e, i, a, true)
        })
        index++
    })
    return timestamps
}

const TenMinutesBeforeAndAfter = (item: TimelineItem): [number, number] => {
    const newTimeframe = [moment(item.Start).valueOf() - 60000, moment(item.Start).valueOf() + 60000]
    console.log(`start: ${moment(item.Start).valueOf()}, newframe: ${newTimeframe}`)
    return newTimeframe as [number, number]
}

const ThreeTimesDurationBeforeAndAfter = (item: TimelineItem): [number, number] => {
    const start = moment(item.Start).valueOf()
    const end = moment(item.End).valueOf()
    const duration = end - start
    const newTimeframe = [start - duration * 3, end + duration * 3]
    console.log(`start: ${start}, end: ${end}, duration: ${duration}, newframe: ${newTimeframe}`)
    return newTimeframe as [number, number]
}

const DeltaToClass = (delta: number): string => {
    if (delta >= 3600000) return 'danger'
    if (delta >= 1800000) return 'warning'
    return 'light'
}

const GetDelta = (e: TimelineItem, i: number, a: TimelineItem[], end: boolean = false) => {
    if (i == 0) return 0
    if (end) return moment(e.End).valueOf() - moment(e.Start).valueOf()
    const previous = a[i - 1]
    if (e.End == null) {
        if (previous.End == null) {
            return moment(e.Start).valueOf() - moment(previous.Start).valueOf()
        }
        return moment(e.Start).valueOf() - moment(previous.End).valueOf()
    }
    if (previous.End == null) {
        return moment(e.Start).valueOf() - moment(previous.Start).valueOf()
    }
    return moment(e.Start).valueOf() - moment(previous.End).valueOf()
}