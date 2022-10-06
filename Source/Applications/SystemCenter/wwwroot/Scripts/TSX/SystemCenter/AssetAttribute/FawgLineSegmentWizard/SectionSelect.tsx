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
import Table from '@gpa-gemstone/react-table';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Select } from '@gpa-gemstone/react-forms';


declare var homePath: string;
interface IProps {
    Segments: FawgSegment[],
    Connections: FawgConnection[],
    Sections: FawgSection[],
    SetSections: (sections: FawgSection[]) => void
    AddSection: () => void,
    LineID: number
}

export interface FawgSection {
    startBus: number,
    startBusName: string,
    endBus: number,
    endBusName: string,
    startStationID: (number | null),
    endStationID: (number | null),
    Segments: string[],
    startTap: boolean,
    endTap: boolean,
    NameFrom: string,
    NameTo: string
}

export interface FawgSegment extends OpenXDA.Types.LineSegment {
    FromBus: number,
    ToBus: number,
    FromBusName: string,
    ToBusName: string,
    LocationFromID: number,
    LocationToID: number,
    Changed: boolean
};

export interface FawgConnection {
    ParentKey: string,
    ChildKey: string,
    BusNumber: number
};

interface FawgTap {
    Bus: number,
    LocationID: number,
    ProcessedSegments: string[],
    ConnectedSegments: string[],
    IsEnd: boolean
}

function SectionSelect(props: IProps): JSX.Element {
    const [locations, setLocations] = React.useState<OpenXDA.Types.Location[]>([]);

    React.useEffect(() => {
        ProcessSegments();

    }, [props.Segments, props.Connections]);

    React.useEffect(() => {
        let handle = getLocations();
        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [props.LineID])

    function getLocations(): JQuery.jqXHR<OpenXDA.Types.Location> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${props.LineID}/Locations`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(data => setLocations(data));
    }

    function ProcessSegments(): void {
        if (props.Segments.length == 0)
            return;
        if (props.Segments.length > 1 && props.Connections.length == 0)
            return;

        let Taps: FawgTap[] = [];
        // Find all real Taps...
        Taps = _.uniq(props.Connections.map(c => c.BusNumber).filter(b => props.Connections.filter(con => con.BusNumber == b).length > 1)).map((b, index) => ({ Bus: b,  IsEnd: false} as FawgTap))
        // Find all "Taps" at the end of the Line
        Taps = Taps.concat(props.Segments.filter(s => s.IsEnd).map(s => props.Connections.filter(con => con.BusNumber == s.FromBus).length > 0 ? s.ToBus : s.FromBus).map((b, index) => ({ Bus: b, IsEnd: true } as FawgTap)));

        // We need to add a Tap at the end if there is only 1 Segment since in that case IsEnd is only true once even though that segment has 2 ends at substations
        if (Taps.length == 1 && props.Segments.length == 1)
            Taps.push({ Bus: props.Segments[0].ToBus, IsEnd: true } as FawgTap);

        // update Taps with locationID as available (-1) otherwise and add connected Segments
        Taps.forEach((item, index) => {
            item.ConnectedSegments = [];
            item.ProcessedSegments = [];
            item.LocationID = -1;

            item.ConnectedSegments = props.Segments.filter(seg => seg.FromBus == item.Bus || seg.ToBus == item.Bus).map(seg => seg.AssetKey);

            if (item.ConnectedSegments.length == 1) {
                const segment = props.Segments.find(seg => seg.FromBus == item.Bus);
                if (segment != null)
                    item.LocationID = segment.LocationFromID;
                else
                    item.LocationID = props.Segments.find(seg => seg.ToBus == item.Bus).LocationToID;
            }
        });

        // Process Segments and taps into Sections
        let currentTap = Taps.find(t => t.ConnectedSegments.length > t.ProcessedSegments.length)
        let CompletedSections: FawgSection[] = [];
        while (currentTap != null) {
            let currentSection: FawgSection = {
                startBus: currentTap.Bus, startStationID: currentTap.LocationID, Segments: [], endBus: -1, endStationID: -1, startTap: !currentTap.IsEnd, endTap: true, NameFrom: '', NameTo: '', startBusName: '', endBusName: ''
            };
            let segBus = props.Segments.find(seg => seg.ToBus == currentSection.startBus);
            if (segBus != undefined) {
                currentSection.startBusName = segBus.ToBusName;
            } else {
                currentSection.startBusName = props.Segments.find(seg => seg.FromBus == currentSection.startBus).FromBusName;
            }
            let currentSegment = currentTap.ConnectedSegments.find(s => currentTap.ProcessedSegments.findIndex(ps => ps == s) == -1);
            let nextSeg = props.Segments.find(s => s.AssetKey == currentSegment);
            let nextBus = nextSeg.FromBus;
            let nextBusName = nextSeg.FromBusName;

            if (nextBus == currentTap.Bus) {
                nextSeg = props.Segments.find(s => s.AssetKey == currentSegment);
                nextBus = nextSeg.ToBus;
                nextBusName = nextSeg.ToBusName;
            }
            currentSection.Segments.push(currentSegment);
            currentTap.ProcessedSegments.push(currentSegment);
            while (true) {
                if (Taps.findIndex(t => t.Bus == nextBus) > -1)
                    break;
                let nextConnection = props.Connections.find(item => (item.ChildKey == currentSegment || item.ParentKey == currentSegment) && item.BusNumber == nextBus)

                currentSegment = (nextConnection.ChildKey == currentSegment) ? nextConnection.ParentKey : nextConnection.ChildKey;
                nextSeg = props.Segments.find(s => s.AssetKey == currentSegment);
                nextBus = nextSeg.ToBus;
                nextBusName = nextSeg.ToBusName;
                if (nextBus == nextConnection.BusNumber) {
                    nextSeg = props.Segments.find(s => s.AssetKey == currentSegment);
                    nextBus = nextSeg.FromBus;
                    nextBusName = nextSeg.FromBusName;
                }
                currentSection.Segments.push(currentSegment);
            }

            currentSection.endBus = nextBus;
            currentSection.endBusName = nextBusName;
            currentSection.endStationID = Taps.find(t => t.Bus == nextBus).LocationID;
            currentSection.endTap = !Taps.find(t => t.Bus == nextBus).IsEnd;
            CompletedSections.push(currentSection);
            Taps.find(t => t.Bus == nextBus).ProcessedSegments.push(currentSegment);
            currentTap = Taps.find(t => t.ConnectedSegments.length > t.ProcessedSegments.length);
        }

        props.SetSections(CompletedSections);
    }

    function RemoveSection(firstSegment: string): void {
        let index = props.Sections.findIndex(sec => sec.Segments[0] == firstSegment);
        if (index == -1)
            return;
        let bus1 = props.Sections[index].startBus;
        let bus2 = props.Sections[index].endBus;

        let updated = _.cloneDeep(props.Sections);
        updated.splice(index, 1);

        //re-calculate affected Sections to make them endpoints as necessary
        updated.forEach((section) => {
            if (section.endBus == bus1 || section.endBus == bus2)
                section.endTap = updated.filter(s => s.endBus == section.endBus || s.startBus == section.endBus).length > 1;
            if (section.startBus == bus1 || section.startBus == bus2)
                section.startTap = updated.filter(s => s.endBus == section.startBus || s.startBus == section.startBus).length > 1;
        });

        props.SetSections(updated);
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="alert alert-info" role="alert">
                        <h4 className="alert-heading">Selecting Line Sections</h4>
                        <p>Note that only Substations associated with this Line are available for endpoints.</p>
                        <hr/>
                        <p>If an Endpoint is left blank the system can only perform single ended Fault Location algorithms towards that end of the Line.</p>
                        <hr />
                        <p>Removing a Section will remove all line segments that were found in FAWG for that Section.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                        <Table<FawgSection>
                            cols={[
                                {
                                    key: 'startBus', label: 'Start', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => item.startTap ? 'Tap (Bus ' + item.startBus + ')' : <Select<FawgSection> Label={(item.startBusName == '' ? "Unknown Bus" : item.startBusName) + " (ID: " + item.startBus + ")"} Field={'startStationID'} Record={item} EmptyLabel={'N/A'} Setter={(r) => {
                                        let updated = _.cloneDeep(props.Sections);
                                        let index = props.Sections.findIndex(sec => sec.Segments[0] == item.Segments[0]);
                                        if (r.startStationID == null) {
                                            updated[index].startStationID = -1;
                                            updated[index].NameFrom = '';
                                        }
                                        else {
                                            updated[index].startStationID = parseInt(r.startStationID as any);
                                            updated[index].NameFrom = locations.find(l => l.ID == updated[index].startStationID).LocationKey;
                                        }
                                        props.SetSections(updated);
                                    }} Options={locations.map(l => ({ Value: l.ID.toString(), Label: l.Name + '(' + l.LocationKey + ')' }))} EmptyOption={true} />
                                },
                                {
                                    key: 'endBus', label: 'End', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => item.endTap ? 'Tap (Bus ' + item.endBus + ')' : <Select<FawgSection> Label={(item.endBusName == '' ? "Unknown Bus" : item.endBusName) + " (ID: " + item.endBus + ")"} Field={'endStationID'} Record={item} EmptyLabel={'N / A'} Setter={(r) => {
                                        let updated = _.cloneDeep(props.Sections);
                                    let index = props.Sections.findIndex(sec => sec.Segments[0] == item.Segments[0]);
                                        if (r.endStationID == null) {
                                            updated[index].endStationID = -1;
                                            updated[index].NameTo = '';
                                        }
                                        else {
                                            updated[index].endStationID = parseInt(r.endStationID as any);
                                            updated[index].NameTo = locations.find(l => l.ID == updated[index].endStationID).LocationKey;
                                        }
                                        props.SetSections(updated);
                                    }} Options={locations.map(l => ({ Value: l.ID.toString(), Label: l.Name + '(' + l.LocationKey + ')' }))} EmptyOption={true} />
                                },
                                { key: 'Segments', label: '# of Segments', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => item.Segments.length },
                                { key: 'endStationID', label: 'Length (miles)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => item.Segments.map((v) => props.Segments.find(seg => seg.AssetKey == v).Length).reduce((a,v) => a=a+v) },

                                {
                                    key: 'DeleteButton', label: '', headerStyle: { width: 40, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 40, paddingLeft: 0, paddingRight: 5 },
                                    content: (item) => <> 
                                        <button className="btn btn-sm"
                                            onClick={(e) => {
                                                RemoveSection(item.Segments[0]);
                                            }}><span>{TrashCan}</span></button>
                                    </>
                                }

                            ]}
                            tableClass="table table-hover"
                            data={props.Sections}
                            sortKey={'startBus'}
                            ascending={true}
                            onSort={(d) => { }}
                            onClick={() => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => false}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {/* Add new Section Button to be added in Future */}
                </div>
            </div>
        </>
    );
}

export default SectionSelect;
