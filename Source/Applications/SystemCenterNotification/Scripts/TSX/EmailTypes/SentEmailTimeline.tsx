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
import * as $ from 'jquery'
import { Application } from '@gpa-gemstone/application-typings'
import { Table, Column } from '@gpa-gemstone/react-table'
import moment from 'moment';
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
    SentEmailID: number
}

const SentEmailTimeline = (props: IProps) => {
    const [timeline, setTimeline] = React.useState<TimelineItem[]>([])
    const [state, setState] = React.useState<Application.Types.Status>("uninitiated")
    const [sortKey, setSortKey] = React.useState<keyof Timestamp>('Timestamp')
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [plotWidth, setPlotWidth] = React.useState<number>(100);
    const [selectedID, setSelectedID] = React.useState<number>(null);

    const rowRef = React.useRef<HTMLDivElement>(null);

    const [timeframe, setTimeframe] = React.useState<[number, number]>([null, null]) 

    const tblData = React.useMemo(() => ToTimestamps(timeline), [timeline])

    React.useEffect(() => {
        if (props.SentEmailID == null) return;
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
    }, [props.SentEmailID, sortKey, ascending])

    React.useEffect(() => {
        if (timeline.length == 0)
            return;
        const startTime = Math.min(...timeline.map((i) => moment(i.Start).valueOf()))
        const endTime = Math.max(...timeline?.map((i) => moment(i.End ?? i.Start).valueOf()))
        setTimeframe([startTime, endTime])

    }, [timeline])


    const getTimeline = () => {
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/SentEmail/Timeline/${props.SentEmailID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ "Ascending": ascending, "OrderBy": sortKey })
        });
    }

    // set plot dimensions
    React.useLayoutEffect(() => {
        setPlotWidth((rowRef?.current?.offsetWidth ?? 130) - 30)
    });

    const handleTableOnClick = (data) => {
        setSelectedID(data.row.TimelineID)
        const timelineItem = timeline.find((item) => item.ID == data.row.TimelineID)
       setTimeframe(SetWithThresholds(timelineItem))
    }

    return (
        <>
            {state !== 'idle' ? <></> :
                <>
                    <div className="row h-10" ref={rowRef}>
                        <div className="col-12">
                            
                            <Plot
                                defaultTdomain={timeframe}
                                height={250}
                                width={plotWidth}
                                showGrid={true}
                                XAxisType='time'
                                legend='bottom'
                                Ylabel=''
                                Tlabel='Time'
                                pan={false}
                                holdMenuOpen={false}
                                yDomain={'AutoValue'}
                                showDateOnTimeAxis={true}
                                hideYAxis={true}
                                Tmin={Math.min(...timeline.map((i) => moment(i.Start).valueOf())) - 3600000}
                                Tmax={Math.max(...timeline?.map((i) => moment(i.End ?? i.Start).valueOf())) + 3600000}
                            >
                                {timeline.map((item, i) => {
                                    return (
                                        item.End == null ?
                                            <VerticalMarker
                                                key={item.ID}
                                                Value={moment(item.Start).valueOf()}
                                                color={selectedID == item.ID ? "#ffc107" : "black"}
                                                width={3}
                                                lineStyle={'solid'}
                                            /> :

                                            <Pill
                                                key={item.ID}
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
                            <Table<Timestamp>
                                TableClass="table table-hover"
                                Data={tblData}
                                SortKey={sortKey.toString()}
                                Ascending={ascending}
                                OnSort={(d) => {
                                    if (d.colKey === sortKey.toString()) setAscending(ascending => !ascending);
                                    else setSortKey(d.colField);
                                }}
                                KeySelector={(item) => item.ID}
                                Selected={(item) => item.TimelineID == selectedID}
                                OnClick={(data) => handleTableOnClick(data)}
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
                </>
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

const SetWithThresholds = (item: TimelineItem): [number, number] => {
    let buffer = 60000;
    const start = moment(item.Start).valueOf();
    const end = moment(item.End ?? item.Start).valueOf()

    if (item.End != null)
       buffer = 3 * (end- start)

    return [start - buffer, end + buffer]

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