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
import {SystemCenter, OpenXDA } from '../../global';

import { LoadingScreen, Modal, Warning } from '@gpa-gemstone/react-interactive';
import SectionSelect, { FawgConnection, FawgSection, FawgSegment } from './SectionSelect';
import { error } from 'jquery';
import SectionEdit from './SectionEdit';

declare var homePath: string;
interface IProps {
    LineID: number,
    closeWizard: () => void,
}

type WizardStep = 'SelectSection' | 'EditSection';



function LineSegmentWizard(props: IProps): JSX.Element {
    const [segments, setSegments] = React.useState<FawgSegment[]>([]);
    const [segmentConnections, setConnections] = React.useState<Array<FawgConnection>>([]);
    const [sections, SetSections] = React.useState<FawgSection[]>([]);

    const [step, setStep] = React.useState<WizardStep>('SelectSection');
    const [currentSegment, setCurrentSegment] = React.useState<number>(0);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showConfirm, setShowConfirm] = React.useState<boolean>(false);
    const [showLoading, setShowLoading] = React.useState<boolean>(false);
    const [errors, setError] = React.useState<string[]>([]);
    const [showError, setShowError] = React.useState<boolean>(false);
    React.useEffect(() => {
        getData();
        
    }, []);

    React.useEffect(() => {
        let e = [];
        if (sections.length == 0)
            e.push('At least one Section of the Line needs to be pulled from FAWG.')
        setError(e);
    }, [sections]);

    function getData(): void {
        $.ajax({
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
        });

        

    }

    function next(): void {
        if (step == 'SelectSection') {
            setCurrentSegment(0)
            setStep('EditSection');
        }

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
        
        
    }

    function submitUpdate(): void {
        setShowLoading(true);
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
        });
        
    }

    return (
        <>

            <Modal Title={'FAWG Line Segment Update'} ShowX={true} Show={true} Size={'xlg'}
                CancelText={'Back'} DisableCancel={step == 'SelectSection'}
                ConfirmBtnClass={'btn-success'} ConfirmText={step == 'EditSection' && currentSegment == (segments.length-1) ? 'Confirm' : 'Next'}
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
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}><i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> {t} </p>) }
            >
                <LoadingScreen Show={showLoading} />
                {step == 'SelectSection' ? <SectionSelect Segments={segments}
                    Connections={segmentConnections} Sections={sections} SetSections={SetSections} AddSection={() => { }}
                    LineID={props.LineID} /> : null}
                {step == 'EditSection' ? <SectionEdit Segments={segments}
                    Section={sections[currentSegment]} SetSection={(s) => SetSections((old) => { let updated = _.cloneDeep(old); updated[currentSegment] = s; return updated; })} SetSegments={setSegments}
                    /> : null}
            </Modal>
            <Warning Title={'Cancel FAWG update'} Message={'This will cancel the update and keep the Segments currently in the openXDA'}
                Show={showWarning} CallBack={(conf) => { setShowWarning(false); if (conf) props.closeWizard(); }} />
            <Warning Title={'Confirm FAWG update'} Message={'This will override any current LineSegments and save the Configuration to openXDA.'}
                Show={showConfirm} CallBack={(conf) => { setShowConfirm(false); if (conf) { submitUpdate(); } }} />
            <Warning Title={'Error'} Message={'An error occurred while updating the Line Segment Configuration.'}
                Show={showError} CallBack={(conf) => { setShowError(false); props.closeWizard(); } } />
        </>);
           
}

export default LineSegmentWizard;

