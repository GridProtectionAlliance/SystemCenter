//******************************************************************************************************
//  SectionEdit.tsx - Gbtc
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
//  04/15/2021 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Input } from '@gpa-gemstone/react-forms';
import { FawgSection, FawgSegment } from './SectionSelect';


declare var homePath: string;
interface IProps {
    Segments: FawgSegment[],
    Section: FawgSection,
    SetSection: (sec: FawgSection) => void
    SetSegments: (sections: FawgSegment[]) => void
}


function SectionEdit(props: IProps): JSX.Element {
    const [data, setData] = React.useState<FawgSegment[]>([]);

    React.useEffect(() => {
        CreateTableData();
    }, [props.Segments, props.Section]);


    function CreateTableData(): void {
        if (props.Segments.length == 0)
            return;

        let data: FawgSegment[] = [];

        props.Section.Segments.forEach((item) => {
            let updated = _.cloneDeep(props.Segments.find(seg => seg.AssetKey == item));
            let lastBus = props.Section.startBus;
            if (data.length > 0)
                lastBus = data[data.length - 1].ToBus;

            if (lastBus != updated.FromBus)
                updated.ToBus = updated.FromBus;
            updated.FromBus = lastBus;
            
            data.push(updated);
        });

        setData(data)
    }

    function RemoveSegment(assetKey: string): void {
        let updated = _.cloneDeep(props.Section);
        let index = updated.Segments.findIndex(a => a == assetKey);
        if (index == -1)
            return;
        updated.Segments.splice(index, 1);
        props.SetSection(updated);
    }

    function updateSegment(segment: FawgSegment): void {
        let index = props.Segments.findIndex(seg => seg.AssetKey == segment.AssetKey);
        if (index == -1)
            return;
        let updated = _.cloneDeep(props.Segments);
        updated[index].R0 = segment.R0;
        updated[index].R1 = segment.R1;

        updated[index].X0 = segment.X0;
        updated[index].X1 = segment.X1;

        updated[index].Length = segment.Length;
        updated[index].ThermalRating = segment.ThermalRating;

        props.SetSegments(updated);
    }
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="alert alert-primary" role="alert">
                        <h4 className="alert-heading">Line Section {props.Section.startTap ? 'Tap' : props.Section.NameFrom} (Bus {props.Section.startBusName}) to {props.Section.endTap ? 'Tap' : props.Section.NameTo} (Bus {props.Section.endBusName})</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th style={{ width: 'auto' }}>Segment</th>
                                    <th style={{ width: 'auto' }}>Length</th>
                                    <th colSpan={2} style={{ width: 'auto' }}>FAWG Bus</th>

                                    <th colSpan={4} style={{ width: 'auto' }}>Zero Seq (Ohm/deg)</th>
                                    <th colSpan={4} style={{ width: 'auto' }}>Positive Seq (Ohm/deg)</th>
                                    <th colSpan={4} style={{ width: 'auto' }}>Loop (LG) (Ohm/deg)</th>
                                    <th style={{ width: 'auto' }}>Thermal Rating</th>
                                    <th style={{ width: 40 }}></th>
                                </tr>
                                <tr>
                                    <th style={{ width: 'auto' }}></th>
                                    <th style={{ width: 'auto' }}></th>

                                    <th style={{ width: 'auto' }}>From</th>
                                    <th style={{ width: 'auto' }}>To</th>

                                    <th style={{ width: 'auto' }}>Z0</th>
                                    <th style={{ width: 'auto' }}>&lt;</th>
                                    <th style={{ width: 'auto' }}>R0</th>
                                    <th style={{ width: 'auto' }}>X0</th>

                                    <th style={{ width: 'auto' }}>Z1</th>
                                    <th style={{ width: 'auto' }}>&lt;</th>
                                    <th style={{ width: 'auto' }}>R1</th>
                                    <th style={{ width: 'auto' }}>X1</th>

                                    <th style={{ width: 'auto' }}>Zs</th>
                                    <th style={{ width: 'auto' }}>&lt;</th>
                                    <th style={{ width: 'auto' }}>Rs</th>
                                    <th style={{ width: 'auto' }}>Xs</th>

                                    <th style={{ width: 'auto' }}></th>
                                    <th style={{ width: 40 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((a, i) => <TableRowInput key={i} Segment={a} remove={RemoveSegment} index={i} edit={updateSegment} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {/* Add new Segment Button to be added in Future */}
                </div>
            </div>
        </>
    );
}

function TableRowInput(props: { Segment: FawgSegment, remove: (assetKey: string) => void, edit: (asset: FawgSegment) => void, index: number }) {
    let Z1 = Math.sqrt(props.Segment.R1 * props.Segment.R1 + props.Segment.X1 * props.Segment.X1);
    let Z0 = Math.sqrt(props.Segment.R0 * props.Segment.R0 + props.Segment.X0 * props.Segment.X0);
    let a0 = Math.acos(props.Segment.R0 / Z0) * 180.0 / Math.PI;
    let a1 = Math.acos(props.Segment.R1 / Z1) * 180.0 / Math.PI;
    let Xs = (2 * props.Segment.X1 + props.Segment.X0) / 3.0;
    let Rs = (2 * props.Segment.R1 + props.Segment.R0) / 3.0;
    let Zs = Math.sqrt(Rs * Rs + Xs * Xs);
    let as = Math.acos(Rs / Zs) * 180.0 / Math.PI;

    return (
        <tr>
            <td style={{verticalAlign: 'middle'}}>Segment {props.index+1}</td>
            <td><Input<FawgSegment> Label={'Length (miles)'} Record={props.Segment} Field={'Length'} Type={'number'} Setter={props.edit} Valid={() => true} /></td>
            <td style={{ verticalAlign: 'middle' }}>{props.Segment.FromBusName + " (ID: " + props.Segment.FromBus + ")"}</td>
            <td style={{ verticalAlign: 'middle' }}>{props.Segment.ToBusName + " (ID: " + props.Segment.ToBus + ")"}</td>

            <td style={{ verticalAlign: 'middle' }}>{Z0.toFixed(2)}</td>
            <td style={{ verticalAlign: 'middle' }}>{a0.toFixed(2)}</td>
            <td><Input<FawgSegment> Label={'R0 (Ohm)'} Record={props.Segment} Field={'R0'} Type={'number'} Setter={props.edit} Valid={() => true} /></td>
            <td><Input<FawgSegment> Label={'X0 (Ohm)'} Record={props.Segment} Field={'X0'} Type={'number'} Setter={props.edit} Valid={() => true} /></td>
            <td style={{ verticalAlign: 'middle' }}>{Z1.toFixed(2)}</td>
            <td style={{ verticalAlign: 'middle' }}>{a1.toFixed(2)}</td>
            <td><Input<FawgSegment> Label={'R1 (Ohm)'} Record={props.Segment} Field={'R1'} Type={'number'} Setter={props.edit} Valid={() => true} /></td>
            <td><Input<FawgSegment> Label={'X1 (Ohm)'} Record={props.Segment} Field={'X1'} Type={'number'} Setter={props.edit} Valid={() => true} /></td>
            <td style={{ verticalAlign: 'middle' }}>{Zs.toFixed(2)}</td>
            <td style={{ verticalAlign: 'middle' }}>{as.toFixed(2)}</td>
            <td style={{ verticalAlign: 'middle' }}>{Rs.toFixed(2)}</td>
            <td style={{ verticalAlign: 'middle' }}>{Xs.toFixed(2)}</td>
            <td><Input<FawgSegment> Label={'Thermal Rating'} Record={props.Segment} Field={'ThermalRating'} Type={'number'} Setter={props.edit} Valid={() => true} /></td>
            <td style={{ width: 40 }}><button className="btn btn-sm" onClick={(e) => props.remove(props.Segment.AssetKey)}><span>{TrashCan}</span></button></td>
        </tr>
    );
}
export default SectionEdit;
