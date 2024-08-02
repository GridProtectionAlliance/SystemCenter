//******************************************************************************************************
//  UserStatistics.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  02/07/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table';
import { Application } from '@gpa-gemstone/application-typings';
import { Plot, Line } from '@gpa-gemstone/react-graph';
import { LoadingScreen, TabSelector } from '@gpa-gemstone/react-interactive';
import * as _ from 'lodash';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ApplicationNodeSlice } from '../Store/Store';

interface Aggregate {
    Date: string,
    Count: number
}

interface IAccessSummary {
    Name: string,
    Data: [number,number][],
    Color: string
}

interface AccessLogTable {
    UserName: string,
    Logins: number,
    LastAccess: string
}

const UserStatistics: Application.Types.iByComponent = (props) => {
    const colors = ["#A30000", "#0029A3", "#007A29", "#d3d3d3", "#edc240",
        "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed", "#BD9B33", "#EE2E2F",
        "#008C48", "#185AA9", "#F47D23", "#662C91", "#A21D21", "#B43894",
        "#737373", "#ff904f", "#ff9999"]

    const dispatch = useAppDispatch();
    const rowRef = React.useRef<HTMLDivElement>(null);

    const [days, setDays] = React.useState<number>(30);
    const [tab, setTab] = React.useState<string>('SystemCenter');
    const [tableData, setTableData] = React.useState<Array<AccessLogTable>>([]);
    const [sortField, setSortField] = React.useState<string>('Logins');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const [plotData, setPlotData] = React.useState<IAccessSummary[]>([])

    const [tableStatus, setTableStatus] = React.useState<Application.Types.Status>('unintiated');
    const [plotStatus, setPlotStatus] = React.useState<Application.Types.Status>('unintiated');

    const applicationNodeStatus = useAppSelector(ApplicationNodeSlice.Status);
    const applicationNodes = useAppSelector(ApplicationNodeSlice.Data);

    const tabs = React.useMemo(() => applicationNodes.map((a) => ({ Label: a.Name, Id: a.ID })), [applicationNodes])
    const timeFrame = React.useMemo(() => { return [moment.utc().endOf('d').subtract(days, 'd').valueOf(), moment.utc().startOf('d').valueOf()] as [number, number] }, [days])

    const [plotHeight, setPlotHeight] = React.useState<number>(100);
    const [plotWidth, setPlotWidth] = React.useState<number>(100);

    React.useEffect(() => {
        if (applicationNodeStatus === 'unintiated' || applicationNodeStatus === 'changed')
            dispatch(ApplicationNodeSlice.Fetch())
    }, [applicationNodeStatus])

    React.useEffect(() => { if (tabs.length > 0) setTab(tabs[0].Id); }, [tabs]);

    React.useEffect(() => {

        setTableStatus('loading');
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AccessLog/Table/${tab}/${days}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.then((d: AccessLogTable[]) => {
            let ordered = _.orderBy(d, [sortField], [(ascending ? "asc" : "desc")])
            setTableData(ordered);
            setTableStatus('idle');
        }, () => { setTableStatus('error') })

        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        }

    }, [days, tab]);

    React.useEffect(() => {
        setPlotStatus('loading');

        const handles = applicationNodes.map(t => $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AccessLog/Aggregates/${t.ID}/${days}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }));

        Promise.all(handles).then((h) => {
            setPlotData(h.map((d: Aggregate[], i: number) => ({
                Color: colors[i % colors.length],
                Data: d.map(d => [new Date(d.Date).getTime(), d.Count] as [number, number]),
                Name: applicationNodes[i].Name
            })));
            setPlotStatus('idle')
        }, () => setPlotStatus('error'))

        return () => {
            handles.forEach(h => {
                if (h != null && h.abort != null)
                    h.abort();
            })
        }
    }, [applicationNodes]);

    React.useEffect(() => {
        var ordered = _.orderBy(tableData, [sortField], [(ascending ? "asc" : "desc")]);
        setTableData(ordered);
    }, [sortField, ascending])

    React.useLayoutEffect(() => {
        setPlotHeight(rowRef?.current?.offsetHeight ?? 100)
        setPlotWidth((rowRef?.current?.offsetWidth ?? 130) - 30)
    });

    if (props.Roles.indexOf('Administrator') < 0) return null
  
    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <LoadingScreen Show={tableStatus === 'loading' || plotStatus === 'loading' || applicationNodeStatus === 'loading'} />
            <div className="row">
                <div className="col">
                    <h2>User Statistics</h2>
                </div>
                <div className="col">
                    <select className="form-control" value={days} onChange={(e) => {
                        setDays(parseInt(e.target.value));
                    }}>
                        <option value='30'>Last 30 days</option>
                        <option value='60'>Last 60 days</option>
                        <option value='90'>Last 90 days</option>
                        <option value='180'>Last 180 days</option>
                        <option value='365'>Last 365 days</option>
                    </select>
                </div>
            </div>
            <hr />
            <div className="row h-50" ref={rowRef}>
                <div className="col">
                    <Plot
                        defaultTdomain={timeFrame}
                        height={plotHeight}
                        width={plotWidth}
                        showGrid={true}
                        XAxisType='time'
                        legend='bottom'
                        Ylabel='Count'
                        Tlabel='Date'
                        pan={false}
                        zoom={false}
                        holdMenuOpen={false}
                        yDomain={'HalfAutoValue'}
                    >
                        {plotData.map(d => <Line
                            data={d.Data}
                            lineStyle={'solid'}
                            color={d.Color}
                            legend={d.Name}
                        />)}
                    </Plot>
                </div>
            </div>
            <TabSelector CurrentTab={tab} SetTab={setTab} Tabs={tabs} />
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="col h-100" >
                    <ReactTable.Table<AccessLogTable>
                        TableClass="table table-hover"
                        Data={tableData}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey == sortField) {
                                setAscending(!ascending);
                            }
                            else {
                                setSortField(d.colKey);
                                setAscending(true);
                            }
                        }}
                        TableStyle={{
                            padding: 0, width: '100%', height: '100%',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 0
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.UserName}
                    >
                        <ReactTable.Column<AccessLogTable>
                            Key={'UserName'}
                            AllowSort={true}
                            Field={'UserName'}
                            HeaderStyle={{ width: '30%' }}
                            RowStyle={{ width: '30%' }}
                        > User
                        </ReactTable.Column>
                        <ReactTable.Column<AccessLogTable>
                            Key={'Logins'}
                            AllowSort={true}
                            Field={'Logins'}
                            HeaderStyle={{ width: '30%' }}
                            RowStyle={{ width: '30%' }}
                        > Logins for Period
                        </ReactTable.Column>
                        <ReactTable.Column<AccessLogTable>
                            Key={'LastAccess'}
                            AllowSort={true}
                            Field={'LastAccess'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => moment(item.LastAccess).format('MM/DD/YYYY HH:mm:ss')}
                        > Last Access Time
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
                </div>
            
        </div>
    )
   
}

export default UserStatistics;