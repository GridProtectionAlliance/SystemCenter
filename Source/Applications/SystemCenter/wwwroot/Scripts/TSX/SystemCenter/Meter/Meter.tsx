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
import MeterChannelScalingWindow from '../Meter/MeterChannelScaling';
import MeterAssetWindow from '../Meter/MeterAsset';
import NoteWindow from '../CommonComponents/NoteWindow';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import MeterConfigurationHistoryWindow from './MeterConfigurationHistory';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { Warning, LoadingScreen, TabSelector, Modal } from '@gpa-gemstone/react-interactive';
import DataRescueWindow from './Advanced/MeterDataRescue';
import { CreateGuid } from '@gpa-gemstone/helper-functions';
 
declare var homePath: string;

interface IProps { MeterID: number }

function Meter(props: IProps) {
    const [meter, setMeter] = React.useState<OpenXDA.Meter>(null);
    const [Tab, setTab] = React.useState<string>(null);
    const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
    const [dataRescueWindow, setDataRescueWindow] = React.useState<React.ReactElement>();

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

    function showDataRescueWindow() {
        // Create a new key to reset state whenever
        // the user navigates to data rescue
        const guid = CreateGuid();

        const newWindow = () =>
            <DataRescueWindow key={guid} Meter={meter} />;

        setShowAdvanced(false);
        setTab("dataRescue");
        setDataRescueWindow(newWindow());
    }

    if (meter == null) return null;

    const Tabs = [
        { Id: "notes", Label: "Notes" },
        { Id: "meterInfo", Label: "Meter Info" },
        { Id: "additionalFields", Label: "Additional Fields" },
        { Id: "substation", Label: "Substations" },
        { Id: "assets", Label: "Assets" },
        { Id: "eventChannels", Label: "Event Channels" },
        { Id: "trendChannels", Label: "Trend Channels" },
        { Id: "channelScaling", Label: "Scale Channels" },
        { Id: "configurationHistory", Label: "Configuration History" },
        { Id: "extDB", Label: "External DB" }];

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{meter.AssetKey}</h2>
                </div>
                <div className="col" style={{maxHeight: 50}}>
                    <button className="btn btn-danger pull-right" onClick={() => setShowDelete(true)}>Delete Meter</button>
                    <button className="btn btn-light pull-right" onClick={() => setShowAdvanced(true)}>Advanced</button>
                </div>
            </div>

            <hr />
            <TabSelector CurrentTab={Tab} SetTab={setTab} Tabs={Tabs} />

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
                    <MeterEventChannelWindow Meter={meter} IsVisible={Tab === "eventChannels"} />
                </div>
                <div className={"tab-pane " + (Tab == "trendChannels" ? " active" : "fade")} id="trendChannels">
                    <MeterTrendChannelWindow Meter={meter} IsVisible={Tab === "trendChannels"} />
                </div>
                <div className={"tab-pane " + (Tab == "channelScaling" ? " active" : "fade")} id="channelScaling">
                    <MeterChannelScalingWindow Meter={meter} IsVisible={Tab === "channelScaling"} />
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
                <div className={"tab-pane " + (Tab == "dataRescue" ? " active" : "fade")} id="dataRescue">
                    {dataRescueWindow}
                </div>
            </div>
            <Modal Title={'Advanced options'} Show={showAdvanced} CallBack={() => setShowAdvanced(false)} ShowCancel={false} ConfirmText={'Close'}>
                <button className="btn btn-dark btn-block" onClick={showDataRescueWindow}>Data Rescue</button>
                <button className="btn btn-dark btn-block">Merge Data</button>
                <button className="btn btn-danger btn-block">Delete Data</button>
            </Modal>
            <Warning Message={'This will permanently Delete this meter and can not be undone.'} Show={showDelete} Title={'Delete Meter ' + meter.AssetKey} CallBack={(conf) => { if (conf) deleteMeter(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
       

            )
}

export default Meter;
