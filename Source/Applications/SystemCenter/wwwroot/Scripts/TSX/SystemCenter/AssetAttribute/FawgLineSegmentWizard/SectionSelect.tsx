//******************************************************************************************************
//  SectionSelect.tsx - Gbtc
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
//  04/13/2021 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { ReactTable } from '@gpa-gemstone/react-table';
import { TrashCan, Warning } from '@gpa-gemstone/gpa-symbols';
import { Select } from '@gpa-gemstone/react-forms';
import { ISection, ITap } from './Types';
import { WarningWTooltip } from './Common';


declare var homePath: string;
interface IProps {
    Taps: ITap[],
    Sections: ISection[],
    AddSection: () => void,
    SaveSection: (tap: ISection, index: number) => void,
    RemoveSections: (index: number) => void,
    Locations: OpenXDA.Types.Location[],
    External: boolean
}

function SectionSelect(props: IProps): JSX.Element {
    const [asc, setAsc] = React.useState<boolean>(false);
    const [data, setData] = React.useState<ISection[]>(props.Sections);
    const [sortKey, setSortKey] = React.useState<string>('Segments');

    React.useEffect(() => {
        if (sortKey == 'Segments')
            setData(_.orderBy(props.Sections, (s) => s.Segments.length, [asc ? "asc" : "desc"]))
        else if (sortKey == 'Length')
            setData(_.orderBy(props.Sections, (s) => s.Segments.reduce((acc, item) => acc + item.Length,0), [asc ? "asc" : "desc"]))
        else
            setData(_.orderBy(props.Sections, [sortKey as keyof ISection], [asc ? "asc" : "desc"]))

    }, [props.Sections, asc, sortKey])

    function DisplayWarning(section: ISection) {
        if (!props.External || (section.IsExternal && section.IsXDA && !section.IsDifferent))
            return <></>

        const errors = [];
        if (section.EndBus == section.StartBus)
            errors.push("A Segment cannot start and end at the same Tap or Endpoint.");

        if (props.Sections.filter(sec => (sec.EndBus == section.EndBus && sec.StartBus == section.StartBus)
            || (sec.StartBus == section.EndBus && sec.EndBus == section.StartBus)).length > 1) 
            errors.push("openXDA does not support parallel Sections.");

        if (section.IsDifferent)
            return <WarningWTooltip Errors={errors} Warnings={['This Section exists in FAWG and openXDA, but the number of Segments differs.']} />
        if (section.IsExternal)
            return <WarningWTooltip Errors={errors} Warnings={['This Section exists in FAWG but cannot be found in openXDA.']} />

        return <WarningWTooltip Errors={errors} Warnings={['This Section exists in openXDA but cannot be found in FAWG.']} />
    }

    function generateBusLabel(tap: ITap) {
        if (tap.StationID == null)
            return tap.Bus;
        const location = props.Locations.find(l => l.ID == tap.StationID);
        if (location == null)
            return tap.Bus;
        return tap.Bus + ` (${location.Name} - ${location.LocationKey})`
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540}}>
                        <ReactTable.Table<ISection>
                            TableClass="table table-hover"
                            Data={data}
                            SortKey={sortKey}
                            Ascending={asc}
                            OnSort={(d) => {
                                if (d.colKey == 'DeleteButton' || d.colKey == 'Warning')
                                    return;
                                if (d.colKey == sortKey)
                                    setAsc((a) => !a);
                                else {
                                    setAsc(true);
                                    setSortKey(d.colKey);
                                }
                            }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 600, width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => `${item.StartStationID}-${item.EndStationID}-${item.Segments.length}`}
                        >
                            <ReactTable.Column<ISection>
                                Key={'StartBus'}
                                AllowSort={true}
                                Field={'StartBus'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, key, field, index }) => <>
                                    <Select<ISection>
                                        Label={""} Field={'StartBus'} Record={item}
                                        Setter={(r) => props.SaveSection(r, index)}
                                        Options={props.Taps.map(l => ({ Value: l.Bus, Label: generateBusLabel(l) }))} EmptyOption={false} />
                                </> }
                            > Start
                            </ReactTable.Column>
                            <ReactTable.Column<ISection>
                                Key={'EndBus'}
                                AllowSort={true}
                                Field={'EndBus'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, key, field, index }) => <>
                                    <Select<ISection>
                                        Label={""} Field={'EndBus'} Record={item}
                                        Setter={(r) => props.SaveSection(r, index)}
                                        Options={props.Taps.map(l => ({ Value: l.Bus, Label: generateBusLabel(l) }))} EmptyOption={false} />
                                </> }
                            > End
                            </ReactTable.Column>
                            <ReactTable.Column<ISection>
                                Key={'Segments'}
                                AllowSort={true}
                                Field={'Segments'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item }) => item.Segments.length }
                            > # of Segments
                            </ReactTable.Column>
                            <ReactTable.Column<ISection>
                                Key={'Length'}
                                AllowSort={true}
                                Field={'Segments'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item }) => item.Segments.reduce((acc, seg) => acc + seg.Length, 0).toFixed(3) }
                            > Length (miles)
                            </ReactTable.Column>
                            <ReactTable.Column<ISection>
                                Key={'Warning'}
                                AllowSort={false}
                                HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                Content={({ item }) => DisplayWarning(item) }
                            > <p></p>
                            </ReactTable.Column>
                            <ReactTable.Column<ISection>
                                Key={'DeleteButton'}
                                AllowSort={false}
                                HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                Content={({ item, key, field, index }) => <>
                                    <button className="btn btn-sm"
                                        onClick={(e) => props.RemoveSections(index)}><span>{TrashCan}</span></button>
                                </> }
                            > <p></p>
                            </ReactTable.Column>
                        </ReactTable.Table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button type="button"
                        className={'btn-primary btn'}
                        onClick={() => props.AddSection()}
                    >Add Section</button>
                </div>
            </div>
        </>
    );
}

export default SectionSelect;
