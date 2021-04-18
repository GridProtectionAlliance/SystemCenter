//******************************************************************************************************
//  Meter.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/27/2019 - Billy Ernest
//       Generated original version of source code.
//  04/15/2020 - Christoph Lackner
//       Added Tab for external Database Fields
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import MeterLocationWindow from '../Meter/MeterLocation';
import { OpenXDA } from '../global';
import MeterInfoWindow from './MeterInfo';
import MeterEventChannelWindow from '../Meter/MeterEventChannel';
import MeterTrendChannelWindow from '../Meter/MeterTrendChannel';
import MeterAssetWindow from '../Meter/MeterAsset';
import NoteWindow from '../CommonComponents/NoteWindow';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import MeterConfigurationHistoryWindow from './MeterConfigurationHistory';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { Modal, Warning, LoadingIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

interface IProps { MeterID: number }

function Meter(props: IProps) {
    const [meter, setMeter] = React.useState<OpenXDA.Meter>(null);
    const [Tab, setTab] = React.useState<string>(null);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);

    React.useEffect(() => {
        setTab(getTab());
        return () => { sessionStorage.clear(); }
    }, []);

    React.useEffect(() => {
        if (Tab == null)
            return;
        sessionStorage.setItem('Meter.Tab', JSON.stringify(Tab));
    }, [Tab]);

    React.useEffect(() => {
        let handle = getMeter();
        handle.then((data: OpenXDA.Meter) => setMeter(data));
        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [props.MeterID]);

    React.useEffect(() => { }, [])
    function getTab(): string {
        if (sessionStorage.hasOwnProperty('Meter.Tab'))
            return JSON.parse(sessionStorage.getItem('Meter.Tab'));
        else
            return 'notes';
    }

    function getMeter(): JQuery.jqXHR<OpenXDA.Meter> {
        if (props.MeterID == undefined) return null;
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/One/${props.MeterID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })
    }

    function deleteMeter(): JQuery.jqXHR {

        setLoadDelete(true);

        let handle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Meter/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(meter),
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(() => {
            window.location.href = homePath + 'index.cshtml?name=Meters'
        })

        handle.then((d) => setLoadDelete(false))

        return handle;
    }

    if (meter == null) return null;

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{meter.AssetKey}</h2>
                </div>
                <div className="col" style={{maxHeight: 50}}>
                    <button className="btn btn-danger pull-right" onClick={() => setShowDelete(true)}>Delete Meter (Permanent)</button>
                </div>
            </div>

            <hr />
            <ul className="nav nav-tabs" style={{ maxHeight: 38 }}>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "notes" ? " active" : "")} onClick={() => setTab('notes')} data-toggle="tab" href="#notes">Notes</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "meterInfo" ? " active" : "")} onClick={() => setTab('meterInfo')} data-toggle="tab" href="#meterInfo">Meter Info</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "additionalFields" ? " active" : "")} onClick={() => setTab('additionalFields')} data-toggle="tab" href="#additionalFields">Additional Fields</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "substation" ? " active" : "")} onClick={() => setTab('substation')} data-toggle="tab" href="#substation">Substation</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "assets" ? " active" : "")} onClick={() => setTab('assets')} data-toggle="tab" href="#assets">Assets</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "eventChannels" ? " active" : "")} onClick={() => setTab('eventChannels')} data-toggle="tab" href="#eventChannels">Event Channels</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "trendChannels" ? " active" : "")} onClick={() => setTab('trendChannels')} data-toggle="tab" href="#trendChannels">Trend Channels</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "configurationHistory" ? " active" : "")} onClick={() => setTab('configurationHistory')} data-toggle="tab" href="#configurationHistory">Configuration History</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (Tab == "extDB" ? " active" : "")} onClick={() => setTab('extDB')} data-toggle="tab" href="#extDB">External DB</a>
                </li>
            </ul>

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 215, overflow: 'hidden' }}>
                <div className={"tab-pane " + (Tab == "notes" ? " active" : "fade")} id="notes" style={{ maxHeight: window.innerHeight - 215 }}>
                    <NoteWindow ID={props.MeterID} Type='Meter' />
                </div>
                <div className={"tab-pane " + (Tab == "meterInfo" ? " active" : "fade")} id="meterInfo" style={{ maxHeight: window.innerHeight - 215 }}>
                    <MeterInfoWindow Meter={meter} StateSetter={(meter: OpenXDA.Meter) => setMeter(meter)} />
                </div>
                <div className={"tab-pane " + (Tab == "additionalFields" ? " active" : "fade")} id="additionalFields" style={{ maxHeight: window.innerHeight - 215 }}>
                    <AdditionalFieldsWindow ID={props.MeterID} Type='Meter' Tab={Tab} />
                </div>
                <div className={"tab-pane " + (Tab == "substation" ? " active" : "fade")} id="substation" style={{ maxHeight: window.innerHeight - 215 }}>
                    <MeterLocationWindow Meter={meter} StateSetter={(meter: OpenXDA.Meter) => setMeter(meter)} />
                </div>
                <div className={"tab-pane " + (Tab == "eventChannels" ? " active" : "fade")} id="eventChannels">
                    <MeterEventChannelWindow Meter={meter} />
                </div>
                <div className={"tab-pane " + (Tab == "trendChannels" ? " active" : "fade")} id="trendChannels">
                    <MeterTrendChannelWindow Meter={meter} />
                </div>
                <div className={"tab-pane " + (Tab == "assets" ? " active" : "fade")} id="assets">
                    <MeterAssetWindow Meter={meter} />
                </div>
                <div className={"tab-pane " + (Tab == "configurationHistory" ? " active" : "fade")} id="configurationHistory">
                    <MeterConfigurationHistoryWindow Meter={meter} />
                </div>
                <div className={"tab-pane " + (Tab == "extDB" ? " active" : "fade")} id="extDB">
                    <ExternalDBUpdate ID={props.MeterID} Type='Meter' Tab={Tab} />
                </div>
            </div>
            <Warning Message={'This will permanently Delete this meter and can not be undone.'} Show={showDelete} Title={'Delete Meter ' + meter.AssetKey} CallBack={(conf) => { if (conf) deleteMeter(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
       

            )
}

export default Meter;