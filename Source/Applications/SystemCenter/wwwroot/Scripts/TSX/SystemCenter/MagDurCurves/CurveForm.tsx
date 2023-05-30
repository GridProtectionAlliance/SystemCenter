//******************************************************************************************************
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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'
import { useAppSelector, useAppDispatch } from '../hooks';
import { CustomerSlice, SEBrowserWidgetSlice, WidgetCategorySlice } from '../Store/Store';
import { Input, Select, TextArea, CheckBox } from '@gpa-gemstone/react-forms';
import { OpenXDA as LocalXDA } from '../global';
import { IsNumber } from '@gpa-gemstone/helper-functions';
import Table from '@gpa-gemstone/react-table';
import { Circle, Line, Plot } from '@gpa-gemstone/react-graph';
import { DownArrow, TrashCan, UpArrow } from '@gpa-gemstone/gpa-symbols';

declare var homePath: string;

interface IProps { Curve: LocalXDA.IMagDurCurve, stateSetter: (tab: LocalXDA.IMagDurCurve) => void, setErrors?: (e: string[]) => void }

type Point = [number, number];

export default function CurveForm(props: IProps) {
    const dispatch = useAppDispatch();

    const div = React.useRef(null);

    const [errors, setErrors] = React.useState<string[]>([]);
    const allCurves = useAppSelector(SEBrowserWidgetSlice.Data);
    const acStatus = useAppSelector(SEBrowserWidgetSlice.Status);

    const [curve, setCurve] = React.useState<Point[]>(calculateArea(props.Curve.Area));
    const [plotWidth, setPlotWidth] = React.useState<number>(100);


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
        if (curve.map(p => p[0]).some(m => m < 0.00001 || m > 1000))
            e.push('All Magnitudes must be between 0.00001 and 1000.')
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
        setPlotWidth(div?.current?.offsetWidth ?? 0)
 })
    function valid(field: keyof (LocalXDA.IMagDurCurve)): boolean {
        if (field == 'Name')
            return props.Curve.Name != null && props.Curve.Name.length > 0 && props.Curve.Name.length <= 30;
        return true;
    }

    function calculateArea(area: string): Point[] {
        if (area == null || area.length == 0)
            return []; 
        return area.split(',').map(p => {
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
        <div className="col">
            <div className="row">
                <div className="col">
                    <Input<LocalXDA.IMagDurCurve> Record={props.Curve} Field={'Name'} Label='Name' Feedback={'A unique Name is required.'}
                        Valid={valid} Setter={(record) => props.stateSetter(record)} />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Table<Point>
                        cols={[
                            {
                                key: 'Index', label: 'Point Index', headerStyle: { width: '15%' }, rowStyle: { width: '15%' },
                                content: (item, key, fld, style, i) => <>
                                    <p>{i+1}</p>
                                </>
                            },
                            {
                                key: 'Magnitude', field: '1', label: 'Magnitude (pu)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                content: (item, key, fld, style, i) => <Input<Point>
                                    Type={'number'}
                                    Record={item}
                                    Field={'1'}
                                    Label=''
                                    Valid={(k) => validPoint(k, item)}
                                    Feedback={'Magnitude must be between 0 and 9999.'}
                                    Setter={(record) => setCurve((d) => { let u = _.cloneDeep(d); u[i][1] = record[1]; return u; })}
                                />
                            },
                            {
                                key: 'Duration', field: '0', label: 'Duration (s)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                content: (item, key, fld, style, i) => <Input<Point>
                                    Record={item}
                                    Type={'number'}
                                    Field={'0'}
                                    Label=''
                                    Valid={(k) => validPoint(k, item)}
                                    Feedback={'Duration must be between 0 and 1000.'}
                                    Setter={(record) => setCurve((d) => { let u = _.cloneDeep(d); u[i][0] = record[0]; return u; })}
                                />
                            },
                            {
                                key: 'Remove', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                content: (item, key, fld, style, i) => <>
                                    <button className="btn btn-sm"
                                        onClick={(e) => {
                                            setCurve((d) => {
                                                const u = _.cloneDeep(d);
                                                u.splice(i, 1);
                                                return u;
                                            })
                                        }}
                                        disabled={curve.length < 4}
                                    >
                                        <span>{TrashCan}</span>
                                    </button>
                                    <button className="btn btn-sm"
                                        onClick={(e) => {
                                            setCurve((d) => {
                                                const u = _.cloneDeep(d);
                                                const p = u.splice(i, 1, u[i - 1]);
                                                u[i - 1] = p[0];
                                                return u;
                                            })
                                        }}
                                        disabled={i == 0}
                                    >
                                        <span>{UpArrow}</span>
                                    </button>
                                    <button className="btn btn-sm"
                                        onClick={(e) => {
                                            setCurve((d) => {
                                                const u = _.cloneDeep(d);
                                                const p = u.splice(i, 1, u[i + 1]);
                                                u[i + 1] = p[0];
                                                return u;
                                            })
                                        }}
                                        disabled={i+1 == curve.length }
                                    >
                                        <span>{DownArrow}</span>
                                    </button>
                                </>
                            },
                            { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={curve}
                        sortKey={''}
                        ascending={false}
                        onSort={() => { } }
                        onClick={() => { } }
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 500, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />
                    <form>
                        <button className="btn btn-primary"
                            onClick={(event) => { event.preventDefault(); setCurve((d) => [...d, [d[d.length-1][0], d[d.length-1][1]]]); }}
                        >Add Point</button>
                    </form>
                </div>
                <div className="col-6" ref={div}>
                    <Plot height={window.innerHeight - 400} width={plotWidth - 50} showBorder={false}
                        defaultTdomain={[0.00001, 1000]}
                        defaultYdomain={[0, 5]}
                        Tmax={1000}
                        Tmin={0.00001}
                        Ymax={9999}
                        Ymin={0}
                        legend={'right'}
                        Tlabel={'Duration (s)'}
                        Ylabel={'Magnitude (pu)'}
                        showMouse={false}
                        showGrid={true}
                        zoomMode={'Rect'}
                        zoom={true} pan={false}
                        useMetricFactors={false} XAxisType={'log'}
                        >
                        <Line highlightHover={false} showPoints={false} lineStyle={'-'}
                            color={"#A30000"} data={curve} />
                        {curve.map((p,i) => (i == curve.length-1? null : <Circle data={[p[0], p[1]]} color={"#FFFFFF"} radius={8} borderColor={"#A30000"} borderThickness={2} text={String(curve.indexOf(p) + 1)} />))}
                    </Plot> 
                </div>
            </div>
        </div>
    )

}
