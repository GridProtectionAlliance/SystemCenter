﻿//******************************************************************************************************
//  CategoryForm.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  03/15/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../hooks';
import { SEBrowserWidgetSlice } from '../Store/Store';
import { Input } from '@gpa-gemstone/react-forms';
import { Table, Column } from '@gpa-gemstone/react-table';
import { Circle, Line, Plot } from '@gpa-gemstone/react-graph';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ColorPicker } from '@gpa-gemstone/react-forms'
import { OpenXDA } from '@gpa-gemstone/application-typings'

interface IProps { Curve: OpenXDA.Types.MagDurCurve, stateSetter: (curve: OpenXDA.Types.MagDurCurve) => void, setErrors?: (e: string[]) => void }

type Point = [number, number];

export default function CurveForm(props: IProps) {
    const dispatch = useAppDispatch();

    const div = React.useRef(null);

    const [errors, setErrors] = React.useState<string[]>([]);
    const allCurves = useAppSelector(SEBrowserWidgetSlice.Data);
    const acStatus = useAppSelector(SEBrowserWidgetSlice.Status);

    const [curve, setCurve] = React.useState<Point[]>(calculateArea(props.Curve.Area));
    const [plotWidth, setPlotWidth] = React.useState<number>(100);
    const [plotHeight, setPlotHeight] = React.useState<number>(100);
        
    React.useEffect(() => {
        if (acStatus == 'changed' || acStatus == 'unintiated')
            dispatch(SEBrowserWidgetSlice.Fetch());
    }, [acStatus])

    React.useEffect(() => {
        let e = [];
        if (props.Curve.Name == null || props.Curve.Name.length == 0)
            e.push('A Name is required.')
        if (allCurves.findIndex(c => c.Name == props.Curve.Name && c.ID != props.Curve.ID) > -1)
            e.push('A Curve with this Name already exists.')
        if (curve.length < 3)
            e.push('The Curve must have at least 3 points.')
        if (curve.length > 2 && (curve[0][0] != curve[curve.length - 1][0] || curve[0][1] != curve[curve.length - 1][1]))
            e.push('The Curve must be closed (the same start and end point).')
        if (curve.map(p => p[0]).some(m => m < 0 || m > 1000))
            e.push('All Magnitudes must be between 0 and 1000.')
        if (curve.map(p => p[1]).some(m => m < 0 || m > 9999))
            e.push('All Durations must be between 0 and 9999.')
        setErrors(e);
    }, [props.Curve, allCurves, curve])

    React.useEffect(() => {
        const c = calculateArea(props.Curve.Area);
        if (!_.isEqual(c, curve))
            setCurve(c);
    }, [props.Curve]);

    React.useEffect(() => {
        const a = curve.map(p => p[0] + " " + p[1]).join(',');
        if (a != props.Curve.Area)
            props.stateSetter({ ...props.Curve, Area: a });
    }, [curve]);

    React.useEffect(() => {
        if (props.setErrors != undefined)
            props.setErrors(errors);
    }, [props.setErrors, errors])

    React.useLayoutEffect(() => {
        setPlotWidth(div?.current?.clientWidth ?? 0);
        setPlotHeight(div?.current?.clientHeight ?? 0);
    })
    function valid(field: keyof (OpenXDA.Types.MagDurCurve)): boolean {
        if (field == 'Name')
            return props.Curve.Name != null && props.Curve.Name.length > 0 && props.Curve.Name.length <= 30;
        return true;
    }

    function calculateArea(area: string): Point[] {
        if (area == null || area.length == 0)
            return [];
        return area.split(',').map((p, i) => {
            let s = p.trim().split(" ");
            return [parseFloat(s[0]), parseFloat(s[1])] as Point;
        })
    }

    function validPoint(key: keyof Point, p: Point) {
        if (key == '0')
            return p[0] != null && p[0] >= 0 && p[0] <= 1000;
        if (key == '1')
            return p[1] != null && p[1] >= 0 && p[1] <= 9999;
        return true
    }

    return (
        <>
            <div className="row">
                <div className="col-9">
                    <Input<OpenXDA.Types.MagDurCurve> Record={props.Curve} Field={'Name'} Label='Name' Feedback={'A unique Name is required.'}
                        Valid={valid} Setter={(record) => props.stateSetter(record)} />
                </div>
                <div className="col-3" style={{ marginTop: '30px' }}>
                    <ColorPicker<OpenXDA.Types.MagDurCurve>
                        Field={'Color'}
                        Label={'Color'}
                        Record={props.Curve}
                        Style={{ background: props.Curve.Color }}
                        Setter={(record) => props.stateSetter(record) }
                      
                    />
                </div>
            </div>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="col-6" style={{display: "flex", height: "100%", flexDirection: "column"}}>
                    <Table<Point>
                        TableClass="table table-hover"
                        Data={curve}
                        SortKey={''}
                        Ascending={false}
                        OnSort={() => { }}
                        Selected={(item) => false}
                        KeySelector={(item, index) => `${item.toString()}-${index}`}
                    >
                        <Column<Point>
                            Key={'Index'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ index }) => <>
                                <p>{index + 1}</p>
                            </>}
                        > Point Index
                        </Column>
                        <Column<Point>
                            Key={'Magnitude'}
                            AllowSort={false}
                            Field={'1'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item, index }) =>
                                <Input<Point>
                                    Type={'number'}
                                    Record={item}
                                    Field={'1'}
                                    Label=''
                                    Valid={(k) => validPoint(k, item)}
                                    Feedback={'Magnitude must be between 0 and 9999.'}
                                    Setter={(record) => setCurve((d) => { let u = _.cloneDeep(d); u[index][1] = record[1]; return u; })}
                                />
                            }
                        > Magnitude (pu)
                        </Column>
                        <Column<Point>
                            Key={'Duration'}
                            AllowSort={false}
                            Field={'1'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item, index }) =>
                                <Input<Point>
                                    Record={item}
                                    Type={'number'}
                                    Field={'0'}
                                    Label=''
                                    Valid={(k) => validPoint(k, item)}
                                    Feedback={'Duration must be between 0 and 1000.'}
                                    Setter={(record) => setCurve((d) => { let u = _.cloneDeep(d); u[index][0] = record[0]; return u; })}
                                />
                            }
                        > Duration (s)
                        </Column>
                        <Column<Point>
                            Key={'Remove'}
                            AllowSort={false}
                            Field={'1'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ index }) => <>
                                <button className="btn btn-sm"
                                    onClick={(e) => {
                                        setCurve((d) => {
                                            const u = _.cloneDeep(d);
                                            u.splice(index, 1);
                                            return u;
                                        })
                                    }}
                                    disabled={curve.length < 4}
                                >
                                    <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                                </button>
                                <button className="btn btn-sm"
                                    onClick={(e) => {
                                        setCurve((d) => {
                                            const u = _.cloneDeep(d);
                                            const p = u.splice(index, 1, u[index - 1]);
                                            u[index - 1] = p[0];
                                            return u;
                                        })
                                    }}
                                    disabled={index == 0}
                                >
                                    <span><ReactIcons.ChevronUp Size={20} /></span>
                                </button>
                                <button className="btn btn-sm"
                                    onClick={(e) => {
                                        setCurve((d) => {
                                            const u = _.cloneDeep(d);
                                            const p = u.splice(index, 1, u[index + 1]);
                                            u[index + 1] = p[0];
                                            return u;
                                        })
                                    }}
                                    disabled={index + 1 == curve.length}
                                >
                                    <span><ReactIcons.ChevronDown Size={20} /></span>
                                </button>
                            </>}
                        > <p></p>
                        </Column>
                    </Table>
                    <form>
                        <button className="btn btn-info"
                            onClick={(event) => { event.preventDefault(); setCurve((d) => [...d, [d[d.length - 1][0], d[d.length - 1][1]]]); }}
                        >Add Point</button>
                    </form>
                </div>
                <div className="col-6 p-0 h-100" ref={div}>
                    <Plot height={plotHeight} width={plotWidth} showBorder={false}
                        defaultTdomain={[0.00001, 1000]}
                        defaultYdomain={[0, 5]}
                        Tmax={1000}
                        Tmin={0.00001}
                        Ymax={9999}
                        Ymin={0}
                        legend={'hidden'}
                        Tlabel={'Duration (s)'}
                        Ylabel={'Magnitude (pu)'}
                        showMouse={false}
                        showGrid={true}
                        yDomain={'Manual'}
                        zoom={true} pan={false}
                        useMetricFactors={false} XAxisType={'log'}
                    >
                        <Line highlightHover={false} showPoints={false} lineStyle={'-'}
                            color={props.Curve.Color} data={curve} />
                        {curve.map((p, i) => (i == curve.length - 1 ? null : <Circle data={[p[0], p[1]]} color={props.Curve.Color} radius={8} borderColor={props.Curve.Color} borderThickness={2} text={String(curve.indexOf(p) + 1)} key={i} />))}
                    </Plot>
                </div>
            </div>
        </>
    )

}