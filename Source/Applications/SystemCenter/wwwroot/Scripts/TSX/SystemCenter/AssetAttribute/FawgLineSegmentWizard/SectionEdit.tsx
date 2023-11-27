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
import { ISection, ISegment } from './Types';
import { ConfigTable } from '@gpa-gemstone/react-interactive';
import { ReactTable  } from '@gpa-gemstone/react-table'
import { WarningWTooltip } from './Common';
import { IsNumber } from '@gpa-gemstone/helper-functions';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { config } from 'process';

declare var homePath: string;
interface IProps {
    Section: ISection,
    SetSection: (sec: ISection) => void,
    LineKey: string,
    LineName: string
}

interface IImpedances {
    Z1: number,
    Z0: number,
    A0: number,
    A1: number,
    Xs: number,
    Rs: number,
    Zs: number,
    As: number
}

function SectionEdit(props: IProps): JSX.Element {


    // ToDo Add Tooltip with Warning
    function DisplayWarning(segment: ISegment) {
        if (segment.Warnings.length == 0)
            return <></>
        const errors = [];

        if (segment.FromBus == segment.ToBus)
            errors.push('From Bus and To Bus cannot be the same.')

        if (segment.AssetName == null || segment.AssetName.length == 0)
            errors.push('Name is required.')
        if (segment.Length == null || !IsNumber(segment.Length))
            errors.push('A valid Length is required.')
        if (segment.R0 == null || !IsNumber(segment.R0))
            errors.push('A valid R0 is required.')
        if (segment.X0 == null || !IsNumber(segment.X0))
            errors.push('A valid X0 is required.')
        if (segment.R1 == null || !IsNumber(segment.R1))
            errors.push('A valid R1 is required.')
        if (segment.X1 == null || !IsNumber(segment.X1))
            errors.push('A valid X1 is required.')
        if (segment.ThermalRating == null || !IsNumber(segment.ThermalRating))
            errors.push('A valid Thermal Rating is required.')

        return <WarningWTooltip Errors={errors} Warnings={segment.Warnings} />
        
    }

    function RemoveSegment(index: number): void {
        let updated = _.cloneDeep(props.Section.Segments);
        updated.splice(index, 1);
        if (index == props.Section.Segments.length - 1)
            updated[updated.length - 1].ToBus = props.Section.EndBus;
        else
            updated[index - 1].ToBus = updated[index].FromBus;
        
        props.SetSection({ ...props.Section, Segments: updated })
    }

    function updateSegment(segment: ISegment, index: number): void {
        let updated = _.cloneDeep(props.Section.Segments);
        if (index > 0)
            updated[index - 1].ToBus = segment.FromBus;
        updated.splice(index, 1, segment);
        props.SetSection({ ...props.Section, Segments: updated })
    }

    function addSegment() {
        const newSegment: ISegment = {
            ID: 0,
            VoltageKV: 0,
            AssetKey: props.LineKey + '-S1',
            Description: '',
            AssetName: 'Segment 1',
            AssetType: 'LineSegment',
            Spare: false,
            Channels: [],
            R0: 0,
            X0: 0,
            R1: 0,
            X1: 0,
            ThermalRating: 0,
            Length: 0,
            IsEnd: false,
            FromBus: props.Section.StartBus,
            ToBus: props.Section.EndBus,
            Warnings: []
        };

        newSegment.ToBus = props.Section.EndBus;
        let updated = [...props.Section.Segments];

        if (props.Section.Segments.length == 0)
            newSegment.FromBus = props.Section.StartBus;
        else {
            let bus = 'Bus 1';
            let i = 2;
            while (props.Section.Segments.find(s => s.FromBus == bus) != null) {
                bus = 'Bus ' + i.toFixed(0);
                i = i + 1;
            }
            newSegment.FromBus = bus;
            updated[updated.length - 1].ToBus = bus;
        }

        updated.push(newSegment)
       
        props.SetSection({
             ...props.Section, Segments: updated
        })
    }

    function computeImpedances(record: ISegment): IImpedances {
        const result: IImpedances = {
            Z0: 0,
            Z1: 0,
            Zs: 0,
            Rs: 0,
            Xs: 0,
            A0: 0,
            A1: 0,
            As: 0
        }
        result.Z1 = Math.sqrt(record.R1 * record.R1 + record.X1 * record.X1);
        result.Z0 = Math.sqrt(record.R0 * record.R0 + record.X0 * record.X0);
        result.A0 = Math.acos(record.R0 / result.Z0) * 180.0 / Math.PI;
        result.A1 = Math.acos(record.R1 / result.Z1) * 180.0 / Math.PI;
        result.Xs = (2 * record.X1 + record.X0) / 3.0;
        result.Rs = (2 * record.R1 + record.R0) / 3.0;
        result.Zs = Math.sqrt(result.Rs * result.Rs + result.Xs * result.Xs);
        result.As = Math.acos(result.Rs / result.Zs) * 180.0 / Math.PI;

        return result;
    }

    function valid(record: ISegment, field: keyof ISegment) {
        if (field == 'AssetName')
            return record.AssetName != null && record.AssetName.length > 0
        if (field == 'Length')
            return record.Length != null && IsNumber(record.Length);
        else if (field == 'R0')
            return record.R0 != null && IsNumber(record.R0);
        else if (field == 'X0')
            return record.X0 != null && IsNumber(record.X0);
        else if (field == 'R1')
            return record.R1 != null && IsNumber(record.R1);
        else if (field == 'X1')
            return record.X1 != null && IsNumber(record.X1);
        else if (field == 'ThermalRating')
            return record.ThermalRating != null && IsNumber(record.ThermalRating);
        return true;
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="alert alert-primary" role="alert">
                        <h4 className="alert-heading">Line Section {props.Section.StartBus} to {props.Section.EndBus}</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                        <ConfigTable.Table<ISegment>
                            TableClass="table table-hover"
                            Data={props.Section.Segments}
                            SortKey={''}
                            Ascending={false}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'scroll' }}
                            RowStyle={{ display: 'table', tableLayout: 'fixed', width: 'calc(100%)' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.AssetKey}
                            OnSort={() => { }}
                        >
                            <ConfigTable.Configurable Key='AssetName' Label='Segment' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'AssetName'}
                                    AllowSort={false}
                                    Field={'AssetName'}
                                    Content={({ item, index }) => <Input<ISegment> Record={item} Field={'AssetName'} Label={''} Feedback={'A Name of less than 200 characters is required.'} Valid={(fld) => valid(item, fld)} Setter={(r) => updateSegment(r, index)} /> }
                                    HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                    RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                >
                                    Segment
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ReactTable.Column<ISegment>
                                Key={'Warning'}
                                AllowSort={false}
                                Content={({ item }) => DisplayWarning(item)}
                                HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                            >
                                <p></p>
                            </ReactTable.Column>
                            <ConfigTable.Configurable Key='FromBus' Label='From Bus' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'FromBus'}
                                    AllowSort={false}
                                    Field={'FromBus'}
                                    Content={({ item, index }) => <Input<ISegment> Label={''} Record={item} Field={'FromBus'} Type={'text'} Setter={(r) => updateSegment(r, index)} Valid={(fld) => valid(item, fld)} Disabled={true} />}
                                >
                                    From Bus
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='ToBus' Label='To Bus' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'ToBus'}
                                    AllowSort={false}
                                    Field={'ToBus'}
                                    Content={({ item, index }) => <Input<ISegment> Label={''} Record={item} Field={'ToBus'} Type={'text'} Setter={(r) => updateSegment(r, index)} Valid={(fld) => valid(item, fld)} Disabled={true} />}
                                >
                                    To Bus
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='Length' Label='Length' Default={true}>
                                <ReactTable.Column<ISegment>
                                    Key={'Length'}
                                    AllowSort={false}
                                    Field={'Length'}
                                    Content={({ item, index }) => <Input<ISegment> Label={''} Record={item} Field={'Length'} Type={'number'} Setter={(r) => updateSegment(r, index)} Valid={(fld) => valid(item, fld)} />}
                                >
                                    Length (mi)
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='Z0' Label='Z0' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'Z0'}
                                    AllowSort={false}
                                    Content={({ item }) => computeImpedances(item).Z0.toFixed(2)}
                                >
                                    Z0 (Ohm)
                                </ReactTable.Column>
                                <ReactTable.Column<ISegment>
                                    Key={'A0'}
                                    AllowSort={false}
                                    Content={({ item }) => computeImpedances(item).A0.toFixed(2)}
                                >
                                    {"<Z0 (deg)"}
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='R0' Label='R0' Default={true}>
                                <ReactTable.Column<ISegment>
                                    Key={'R0'}
                                    AllowSort={false}
                                    Content={({ item, index }) => <Input<ISegment> Label={''} Record={item} Field={'R0'} Type={'number'} Setter={(r) => updateSegment(r, index)} Valid={(fld) => valid(item, fld)} />}
                                >
                                    R0 (Ohm)
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='X0' Label='X0' Default={true}>
                                <ReactTable.Column<ISegment>
                                    Key={'X0'}
                                    AllowSort={false}
                                    Content={({ item, index }) => <Input<ISegment> Label={''} Record={item} Field={'X0'} Type={'number'} Setter={(r) => updateSegment(r, index)} Valid={(fld) => valid(item, fld)} />}
                                >
                                    X0 (Ohm)
                                </ReactTable.Column>
                            </ConfigTable.Configurable>

                            <ConfigTable.Configurable Key='Z1' Label='Z1' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'Z1'}
                                    AllowSort={false}
                                    Content={({ item }) => computeImpedances(item).Z1.toFixed(2)}
                                >
                                    Z1 (Ohm)
                                </ReactTable.Column>
                                <ReactTable.Column<ISegment>
                                    Key={'A1'}
                                    AllowSort={false}
                                    Content={({ item }) => computeImpedances(item).A1.toFixed(2)}
                                >
                                    {"<Z1 (deg)"}
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='R1' Label='R1' Default={true}>
                                <ReactTable.Column<ISegment>
                                    Key={'R1'}
                                    AllowSort={false}
                                    Content={({ item, index }) => <Input<ISegment> Label={''} Record={item} Field={'R1'} Type={'number'} Setter={(r) => updateSegment(r, index)} Valid={(fld) => valid(item, fld)} />}
                                >
                                    R1 (Ohm)
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='X1' Label='X1' Default={true}>
                                <ReactTable.Column<ISegment>
                                    Key={'X1'}
                                    AllowSort={false}
                                    Content={({ item, index }) => <Input<ISegment> Label={''} Record={item} Field={'X1'} Type={'number'} Setter={(r) => updateSegment(r, index)} Valid={(fld) => valid(item, fld)} />}
                                >
                                    X1 (Ohm)
                                </ReactTable.Column>
                            </ConfigTable.Configurable>

                            <ConfigTable.Configurable Key='Zs' Label='Zs' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'Zs'}
                                    AllowSort={false}
                                    Content={({ item }) => computeImpedances(item).Zs.toFixed(2)}
                                >
                                    Zs (Ohm)
                                </ReactTable.Column>
                                <ReactTable.Column<ISegment>
                                    Key={'As'}
                                    AllowSort={false}
                                    Content={({ item }) => computeImpedances(item).As.toFixed(2)}
                                >
                                    {"<Zs (deg)"}
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='Rs' Label='Rs' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'Rs'}
                                    AllowSort={false}
                                    Content={({ item }) => computeImpedances(item).Rs.toFixed(2)}
                                >
                                    Rs (Ohm)
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='Xs' Label='Xs' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'Xs'}
                                    AllowSort={false}
                                    Content={({ item }) => computeImpedances(item).Xs.toFixed(2)}
                                >
                                    Xs (Ohm)
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ConfigTable.Configurable Key='ThermalRating' Label='Thermal Rating' Default={false}>
                                <ReactTable.Column<ISegment>
                                    Key={'ThermalRating'}
                                    AllowSort={false}
                                    Content={({ item, index }) => <Input<ISegment> Label={''} Record={item} Field={'ThermalRating'} Type={'number'} Setter={(r) => updateSegment(r, index)} Valid={() => true} />}
                                >
                                    ThermalRating (MVA)
                                </ReactTable.Column>
                            </ConfigTable.Configurable>
                            <ReactTable.Column<ISegment>
                                Key={'btns'}
                                AllowSort={false}
                                Content={({ index }) => <button className="btn btn-sm" onClick={(e) => RemoveSegment(index)}><span>{TrashCan}</span></button>}
                            >
                                <p></p>
                            </ReactTable.Column>
                        </ConfigTable.Table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={() => addSegment()}>Add Segment</button>
                </div>
            </div>
        </>
    );
}

export default SectionEdit;
