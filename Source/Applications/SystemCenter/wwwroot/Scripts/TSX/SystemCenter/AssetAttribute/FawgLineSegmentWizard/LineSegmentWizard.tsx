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
import { LoadingScreen, Modal, Section, Warning } from '@gpa-gemstone/react-interactive';
import SectionSelect from './SectionSelect';
import SectionEdit from './SectionEdit';
import { ISection, ISegment, ITap } from './Types';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import TapSelect from './TapSelect';
import { stat } from 'fs';
import { IsNumber } from '@gpa-gemstone/helper-functions';


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

    const [fawgSuccess, setFAWGSucess] = React.useState<boolean>(false);

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
        if (step == 'SelectSection' && sections.some(item => item.EndBus == item.StartBus))
            e.push('A Segment can not start and end at the same Tap or Endpoint.');
        if (step == 'SelectSection' && checkParalells())
            e.push('XDA does not support Parelell Sections.');
        if (step == 'EditSection' && sections[currentSegment].Segments.some(s => s.FromBus == s.ToBus))
            e.push('A Segment can not have the same From Bus and to Bus.')

        if (step == 'EditSection' && sections[currentSegment].Segments.some(s => s.AssetName == null || s.AssetName.length == 0))
            e.push('All Segments require a Name.')
        if (step == 'EditSection' && sections[currentSegment].Segments.some(s => s.Length == null || !IsNumber(s.Length)))
            e.push('All Segments require a valid Length.')
        if (step == 'EditSection' && sections[currentSegment].Segments.some(s => s.R0 == null || !IsNumber(s.R0)))
            e.push('All Segments require a valid R0.')
        if (step == 'EditSection' && sections[currentSegment].Segments.some(s => s.X0 == null || !IsNumber(s.X0)))
            e.push('All Segments require a valid X0.')
        if (step == 'EditSection' && sections[currentSegment].Segments.some(s => s.R1 == null || !IsNumber(s.R1)))
            e.push('All Segments require a valid R1.')
        if (step == 'EditSection' && sections[currentSegment].Segments.some(s => s.X1 == null || !IsNumber(s.X1)))
            e.push('All Segments require a valid X1.')
        if (step == 'EditSection' && sections[currentSegment].Segments.some(s => s.ThermalRating == null || !IsNumber(s.ThermalRating)))
            e.push('All Segments require a valid Thermal Rating.')

        setError(e);
    }, [step, sections, taps,]);

    function checkParalells() {
        let i, j = 0;
        const result = [];
        for (i = 0; i < taps.length; i++) {
            for (j = 0; j < taps.length; j++) {
                if (j >= i)
                    break;
                result.push(sections.filter(s => (
                    (s.StartBus == taps[i].Bus && s.EndBus == taps[j].Bus) ||
                    (s.StartBus == taps[j].Bus && s.EndBus == taps[i].Bus))
                ).length)
            }
        }

        return result.some(n => n > 1)      
    }

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

        const promiseData: JQuery.jqXHR<any> = $.ajax({
            type: "GET",
            url: `${homePath}api/LineSegmentWizard/Update/${props.LineID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(data => {
            setSections(data["Sections"] as ISection[]);
            setTaps(data["Taps"] as ITap[])
            setFAWGSucess(data["UsedFAWG"] as boolean)
        });

        Promise.all([promiseLocation, promiseData]).then(() => {
            setShowLoading(false);
        }, () => {
            setShowError(true);
        });
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

        setSections((d) => {
            const bus_old = taps[index].Bus;
            let bus_new = "";
            let station_new = null;
            if (index + 1 < taps.length) {
                bus_new = taps[index + 1].Bus;
                station_new = taps[index + 1].StationID;
            }
            else if (index - 1 >= 0) {
                bus_new = taps[index - 1].Bus;
                station_new = taps[index - 1].StationID
            }

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
                if (s.Segments.length > 0 && s.Segments[0].FromBus == bus_old)
                    s.Segments[0].FromBus == bus_new;
                if (s.Segments.length > 0 && s.Segments[s.Segments.length - 1].ToBus == bus_old)
                    s.Segments[s.Segments.length - 1].ToBus == bus_new;

            });
            return u;
        });
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
                if (s.Segments.length > 0 && s.Segments[0].FromBus == bus_old)
                    s.Segments[0].FromBus == bus_new;
                if (s.Segments.length > 0 && s.Segments[s.Segments.length - 1].ToBus == bus_old)
                    s.Segments[s.Segments.length - 1].ToBus == bus_new;
                
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
            if (sec.Segments.length > 0) {
                sec.Segments[0].FromBus = sec.StartBus;
                sec.Segments[sec.Segments.length - 1].ToBus = sec.EndBus
            }
            u.splice(index, 1, sec);
            return u;
        })
    }

    function submitUpdate(): void {
        setShowLoading(true);

        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/LineSegmentWizard/Save/${props.LineID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Taps: taps, Sections: sections, UsedFAWG: false }),
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
                    External={fawgSuccess} /> : null}
                {step == 'SelectSection' ? <SectionSelect Taps={taps}
                    Sections={sections} SaveSection={editSection}
                    AddSection={() => {
                        setSections((d) => [...d, {
                            EndBus: taps[1].Bus,
                            Segments: [],
                            StartBus: taps[0].Bus,
                            StartStationID: taps[0].StationID,
                            EndStationID: taps[1].StationID,
                            IsExternal: false,
                            IsXDA: false,
                            IsDifferent: false
                        }])
                    }}
                    RemoveSections={(i) =>
                        setSections((d) => {
                            const u = [...d];
                            u.splice(i, 1);
                            return u;
                        })}
                    Locations={locations}
                    External={fawgSuccess} /> : null}
                {step == 'EditSection' ? <SectionEdit
                    Section={sections[currentSegment]} SetSection={(s) => editSection(s, currentSegment)} LineKey={props.LineKey} LineName={props.LineName}
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

