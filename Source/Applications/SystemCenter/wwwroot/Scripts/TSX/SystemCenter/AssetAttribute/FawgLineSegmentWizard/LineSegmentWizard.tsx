//******************************************************************************************************
//  LineSegmentWizard.tsx - Gbtc
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
//  04/17/2020 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { LoadingScreen, Modal, Warning } from '@gpa-gemstone/react-interactive';
import SectionSelect from './SectionSelect';
import SectionEdit from './SectionEdit';
import { ISection, ISegment, ITap } from './Types';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import TapSelect from './TapSelect';
import { promises } from 'stream';

declare var homePath: string;
interface IProps {
    LineID: number,
    LineKey: string,
    LineName: string,
    closeWizard: () => void,
}

type WizardStep = 'SetupTap' | 'SelectSection' | 'EditSection';



function LineSegmentWizard(props: IProps): JSX.Element {
    const [sections, setSections] = React.useState<ISection[]>([]);
    const [taps, setTaps] = React.useState<ITap[]>([]);
    const [step, setStep] = React.useState<WizardStep>('SetupTap');

    const [currentSegment, setCurrentSegment] = React.useState<number>(0);

    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showConfirm, setShowConfirm] = React.useState<boolean>(false);
    const [showLoading, setShowLoading] = React.useState<boolean>(false);

    const [errors, setError] = React.useState<string[]>([]);
    const [showError, setShowError] = React.useState<boolean>(false);

    const [locations, setLocations] = React.useState<OpenXDA.Types.Location[]>([]);

    React.useEffect(() => {
        getData();
    }, [props.LineID]);

    React.useEffect(() => {
        let e = [];
        if (step == 'SetupTap' && taps.length < 2)
            e.push('At least 2 Taps or Endpoints have to be defined.')
        if (step == 'SetupTap' && _.uniqBy(taps, (t) => t.Bus).length != taps.length)
            e.push('All Taps have to have unique Bus names.')
        if (step == 'SelectSection' && sections.length == 0)
            e.push('At least 1 Section of the Line needs to be defined.')
        if (step == 'EditSection' && sections[currentSegment].Segments.length == 0)
            e.push('At least 1 Segment needs to be defined.')
        setError(e);
    }, [step, sections, taps,]);


    function getData(): void {
        setShowLoading(true);
        setShowError(false);
        const promiseLocation: JQuery.jqXHR<OpenXDA.Types.Location> =  $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/Asset/${props.LineID}/Locations`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
        }).done(data => setLocations(data));

        Promise.all([promiseLocation]).then(() => {
            setShowLoading(false);
        }, () => {
            setShowError(true);
        });
    
        // ToDo implement logic that loads segments from xda and fawg as appropriate
        /*$.ajax({
            type: "GET",
            url: `${homePath}api/ExternalDB/FAWG/LineSegment/UpdateSegments/${props.LineID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((data: any) => {
            setSegments(data["segments"]);
            setConnections(data["connections"])
        }).fail((msg) => {
            setShowError(true)
            if (msg.status == 500)
                console.log(msg.responseJSON.ExceptionMessage)
        });*/       

    }

    function next(): void {
        if (step == 'SelectSection') {
            setCurrentSegment(0)
            setStep('EditSection');
        }
        if (step == 'SetupTap') 
            setStep('SelectSection');
        
        if (step == 'EditSection' && (currentSegment < (sections.length - 1)))
            setCurrentSegment((x) => x + 1);
        if (step == 'EditSection' && (currentSegment == (sections.length - 1)))
            setShowConfirm(true)
    }

    function back(): void {
        if (step == 'EditSection' && currentSegment == 0)
            setStep('SelectSection');
        if (step == 'EditSection' && currentSegment > 0)
            setCurrentSegment((x) => x - 1);
        if (step == 'SelectSection')
            setStep('SetupTap')
    }

    function removeTap(index: number) {

        const bus = taps[index].Bus;

        setTaps((d) => {
            const u = [...d];
            u.splice(index, 1);
            return u;
        });

        setSections((d) => d.filter(s => s.EndBus != bus && s.StartBus != bus));
    }

    function editTap(tap: ITap, index: number) {
        const bus_old = taps[index].Bus;
        const bus_new = tap.Bus;
        const station_new = tap.StationID;

        setTaps((d) => {
            const u = [...d];
            u.splice(index, 1, tap);
            return u;
        });

        setSections((d) => {
            let u = [...d]
            u.forEach(s => {
                if (s.EndBus == bus_old) {
                    s.EndBus = bus_new;
                    s.EndStationID = station_new;
                }
                if (s.StartBus == bus_old) {
                    s.StartBus = bus_new;
                    s.StartStationID = station_new;
                }
            });
            return u;
        })
    }

    function editSection(section: ISection, index: number) {
        setSections((d) => {
            const u = [...d];
            const sec = _.cloneDeep(section);
            sec.StartStationID = taps.find(t => t.Bus == section.StartBus)?.StationID;
            sec.EndStationID = taps.find(t => t.Bus == section.EndBus)?.StationID;
            u.splice(index, 1, sec);
            return u;
        })
    }

    function submitUpdate(): void {
        setShowLoading(true);

        // Todo add Logic that takes care of saving updates to the database
        /*
        let finishedSegments = [];
        let finishedConnections = [];

        sections.forEach((sec,secIndex) => {
            // start by adding the Segments
            if (sec.Segments.length == 1) {
                let segment = segments.find(item => item.AssetKey == sec.Segments[0]);
                segment.LocationFromID = sec.startStationID;
                segment.LocationToID = sec.endStationID;
                segment.IsEnd = !sec.endTap || !sec.startTap;
                finishedSegments.push(segment);
            }
            else {
                let segment = segments.find(item => item.AssetKey == sec.Segments[0]);
                segment.LocationFromID = sec.startStationID;
                segment.LocationToID = -1;
                segment.IsEnd = !sec.startTap;
                finishedSegments.push(segment);

                for (let i = 1; i < (sec.Segments.length - 1); i++) {
                    segment = segments.find(item => item.AssetKey == sec.Segments[i]);
                    segment.LocationFromID = -1;
                    segment.LocationToID = -1;
                    segment.IsEnd = false;
                    finishedSegments.push(segment);
                    finishedConnections.push({ ChildKey: segment.AssetKey, ParentKey: finishedSegments[finishedSegments.length - 2].AssetKey, BusNumber: 0 } as FawgConnection)
                }
                segment = segments.find(item => item.AssetKey == sec.Segments[sec.Segments.length - 1]);
                segment.LocationFromID = -1;
                segment.LocationToID = sec.endStationID;
                segment.IsEnd = !sec.endTap;
                finishedSegments.push(segment);
                finishedConnections.push({ ChildKey: segment.AssetKey, ParentKey: finishedSegments[finishedSegments.length - 2].AssetKey, BusNumber: 0 } as FawgConnection)
            }

            //If this section goes to a Tap add all other connections....
            if (sec.startTap) {
                let connectedSections = sections.filter((item, i) => (item.startBus == sec.startBus || item.endBus == sec.startBus) && secIndex != i);
                let connectedSegments = connectedSections.map(item => item.startBus == sec.startBus ? item.Segments[0] : item.Segments[item.Segments.length - 1]);
                connectedSegments.filter((cSeg) =>
                    !finishedConnections.some(seg => (seg.ChildKey == cSeg && seg.ParentKey == sec.Segments[0]) || (seg.ParentKey == cSeg && seg.ChildKey == sec.Segments[0]))
                ).forEach(cSeg => {
                    finishedConnections.push({ ChildKey: cSeg, ParentKey: sec.Segments[0], BusNumber: 0 } as FawgConnection)
                })
            }
            if (sec.endTap) {
                let connectedSections = sections.filter((item, i) => (item.startBus == sec.endBus || item.endBus == sec.endBus) && secIndex != i);
                let connectedSegments = connectedSections.map(item => item.startBus == sec.endBus ? item.Segments[0] : item.Segments[item.Segments.length - 1]);
                connectedSegments.filter((cSeg) =>
                    !finishedConnections.some(seg => (seg.ChildKey == cSeg && seg.ParentKey == sec.Segments[sec.Segments.length - 1]) || (seg.ParentKey == cSeg && seg.ChildKey == sec.Segments[sec.Segments.length - 1]))
                ).forEach(cSeg => {
                    finishedConnections.push({ ChildKey: cSeg, ParentKey: sec.Segments[sec.Segments.length - 1], BusNumber: 0 } as FawgConnection)
                })
            }

        })
        $.ajax({
            type: "POST",
            url: `${homePath}api/ExternalDB/FAWG/LineSegment/ConfirmSegments/${props.LineID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ "data": { "segments": finishedSegments, "connections": finishedConnections } }),
            cache: false,
            async: true
        }).done(() => {
            setShowLoading(false);
            props.closeWizard();
        }).fail((msg) => {
            setShowError(true)
            if (msg.status == 500)
                console.log(msg.responseJSON.ExceptionMessage)
        });*/
        
    }

    return (
        <>

            <Modal Title={'Line Segment Wizard'} ShowX={true} Show={true} Size={'xlg'}
                CancelText={'Back'} DisableCancel={step == 'SetupTap'}
                ConfirmBtnClass={'btn-success'}
                ConfirmText={step == 'EditSection' && currentSegment == (sections.length - 1) ? 'Confirm' : 'Next'}
                CallBack={(conf, btn) => {
                    if (!btn)
                        setShowWarning(true);
                    if (conf && btn)
                        next();
                    if (!conf && btn)
                        back();
                }}
                DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)}
            >
                {step == 'SetupTap' ? <TapSelect
                    Taps={taps} AddTap={(t) => { setTaps((d) => [...d, t]) }}
                    SaveTap={editTap}
                    RemoveTap={removeTap}
                    Locations={locations}
                External={false} /> : null}
                {step == 'SelectSection' ? <SectionSelect Taps={taps}
                    Sections={sections} SaveSection={editSection}
                    AddSection={() => {
                        setSections((d) => [...d, {
                            EndBus: taps[1].Bus,
                            Segments: [],
                            StartBus: taps[0].Bus,
                            StartStationID: taps[0].StationID,
                            EndStationID: taps[1].StationID
                        }])
                    }}
                    RemoveSections={(i) => (i) =>
                        setSections((d) => {
                            const u = [...d];
                            u.splice(i, 1);
                            return u;
                        })}
                    Locations={locations}
                    External={false} /> : null}
                {step == 'EditSection' ? <SectionEdit
                    Section={sections[currentSegment]} SetSection={(s) => { }} LineKey={props.LineKey} LineName={props.LineName}
                    /> : null}
            </Modal>
            <LoadingScreen Show={showLoading} />
            <Warning Title={'Cancel FAWG update'} Message={'This will cancel the update and keep the Segments currently in the openXDA'}
                Show={showWarning} CallBack={(conf) => { setShowWarning(false); if (conf) props.closeWizard(); }} />
            <Warning Title={'Confirm FAWG update'} Message={'This will override any current LineSegments and save the Configuration to openXDA.'}
                Show={showConfirm} CallBack={(conf) => { setShowConfirm(false); if (conf) { submitUpdate(); } }} />
            <Warning Title={'Error'} Message={'An error occurred while updating the Line Segment Configuration.'}
                Show={showError} CallBack={(conf) => { setShowError(false); props.closeWizard(); } } />
        </>);
           
}

export default LineSegmentWizard;

