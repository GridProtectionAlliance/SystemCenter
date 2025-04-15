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
import { OpenXDA } from '@gpa-gemstone/application-typings';
import MeterInfoWindow from './MeterInfo';
import MeterEventChannelWindow from '../Meter/MeterEventChannel';
import MeterTrendChannelWindow from '../Meter/MeterTrendChannel';
import ChannelScalingWindow from './ChannelScaling/ChannelScalingWindow';
import MeterAssetWindow from '../Meter/MeterAsset';
import MeterMaintenanceWindow from '../Meter/MeterMaintenance';
import NoteWindow from '../CommonComponents/NoteWindow';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import MeterConfigurationHistoryWindow from './MeterConfigurationHistory';
import { Warning, LoadingScreen, TabSelector, Modal } from '@gpa-gemstone/react-interactive';
import DataRescueWindow from './Advanced/MeterDataRescue';
import DataMergeWindow from './Advanced/MeterDataMerge';
import DataDeleteWindow from './Advanced/MeterDataDelete';
import { CreateGuid } from '@gpa-gemstone/helper-functions';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
 
declare var homePath: string;
declare type Tab = 'notes' | 'meterInfo' | 'additionalFields' | 'substation' | 'assets' | 'eventChannels' | 'trendChannels' | 'channelScaling' | 'configurationHistory' | 'extDB' | 'maintenance' | 'dataRescue' | 'dataMerge' | 'dataDelete'

interface IProps { MeterID: number, Tab: Tab }

function Meter(props: IProps) {
    const [meter, setMeter] = React.useState<OpenXDA.Types.Meter>(null);
    const [tab, setTab] = React.useState(getTab());
    const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
    const [dataRescueWindow, setDataRescueWindow] = React.useState<React.ReactElement>();
    const [dataMergeWindow, setDataMergeWindow] = React.useState<React.ReactElement>();
    const [dataDeleteWindow, setDataDeleteWindow] = React.useState<React.ReactElement>();
    const roles = useAppSelector(SelectRoles);
    
    React.useEffect(() => {
        let handle = getMeter();
        handle.then((data: OpenXDA.Types.Meter) => setMeter(data));
        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [props.MeterID]);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (localStorage.hasOwnProperty('Meter.InfoTab')) {
            const tab = localStorage.getItem('Meter.InfoTab') as Tab;
            localStorage.removeItem('Meter.InfoTab')
            return tab;
        }
        else if (sessionStorage.hasOwnProperty('Meter.Tab'))
            return JSON.parse(sessionStorage.getItem('Meter.Tab'));
        else
            return 'notes';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('Meter.Tab', JSON.stringify(tab));
    }, [tab]);

    function getMeter(): JQuery.jqXHR<OpenXDA.Types.Meter> {
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

    function showDataMergeWindow() {
        // Create a new key to reset state whenever
        // the user navigates to data merge
        const guid = CreateGuid();
        const returnToMeters = () => {
            window.location.href = homePath + 'index.cshtml?name=Meters';
        };
        const newWindow = () =>
            <DataMergeWindow key={guid} Meter={meter} OnMerge={returnToMeters} />;
        setShowAdvanced(false);
        setTab("dataMerge");
        setDataMergeWindow(newWindow());
    }

    function showDataDeleteWindow() {
        // Create a new key to reset state whenever
        // the user navigates to data delete
        const guid = CreateGuid();
        const returnToMeters = () => {
            window.location.href = homePath + 'index.cshtml?name=Meters';
        };
        const newWindow = () =>
            <DataDeleteWindow key={guid} Meter={meter} OnDelete={returnToMeters} />;
        setShowAdvanced(false);
        setTab("dataDelete");
        setDataDeleteWindow(newWindow());
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
        { Id: "maintenance", Label: "Maintenance" }];

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row p-2">
                <div className="col">
                    <h2>{meter.Name} ({meter.AssetKey})</h2>
                </div>
                <div className="col" style={{ maxHeight: 50 }} hidden={roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0}>
                    <button className="btn btn-danger pull-right" onClick={() => setShowDelete(true)}>Delete Meter</button>
                    <button className="btn btn-info pull-right mr-2" onClick={() => setShowAdvanced(true)}>Advanced</button>
                </div>
            </div>
            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            {tab === 'notes' ? <NoteWindow ID={props.MeterID} Type='Meter' /> : null}
            {tab === 'meterInfo' ? <MeterInfoWindow Meter={meter} StateSetter={(meter: OpenXDA.Types.Meter) => setMeter(meter)} /> : null}
            {tab === 'additionalFields' ? <AdditionalFieldsWindow ID={props.MeterID} Type='Meter' Tab={tab} /> : null}
            {tab === 'substation' ? <MeterLocationWindow Meter={meter} StateSetter={(meter: OpenXDA.Types.Meter) => setMeter(meter)} /> : null}
            {tab === 'eventChannels' ? <MeterEventChannelWindow Meter={meter} IsVisible={tab === "eventChannels"} /> : null}
            {tab === 'trendChannels' ? <MeterTrendChannelWindow Meter={meter} IsVisible={tab === "trendChannels"} /> : null}
            {tab === 'channelScaling' ? <ChannelScalingWindow Meter={meter} IsVisible={tab === "channelScaling"} /> : null}
            {tab === 'assets' ? <MeterAssetWindow Meter={meter} /> : null}
            {tab === 'configurationHistory' ? <MeterConfigurationHistoryWindow Meter={meter} /> : null}
            {tab === 'dataRescue' ? dataRescueWindow : null}
            {tab === 'dataMerge' ? dataMergeWindow : null}
            {tab === 'dataDelete' ? dataDeleteWindow : null}
            {tab === 'maintenance' ? <MeterMaintenanceWindow Meter={meter} /> : null}

            <Modal Title={'Advanced Options'} Show={showAdvanced} CallBack={() => setShowAdvanced(false)} ShowCancel={false} ShowConfirm={false} ShowX={true}>
                <button className="btn btn-info btn-block" onClick={showDataRescueWindow}>Data Rescue</button>
                <button className="btn btn-info btn-block" onClick={showDataMergeWindow}>Merge Data</button>
                <button className="btn btn-danger btn-block" onClick={showDataDeleteWindow}>Delete Data</button>
            </Modal>

            <Warning Message={'This will permanently delete this Meter and cannot be undone.'} Show={showDelete} Title={'Delete ' + (meter?.Name ?? 'Meter')} CallBack={(conf) => { if (conf) deleteMeter(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
    )
}

export default Meter;
