//******************************************************************************************************
//  DeviceIssuesPage.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  07/02/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { OpenXDA } from '@gpa-gemstone/application-typings';
import { TabSelector } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import NoteWindow from '../CommonComponents/NoteWindow';
import OpenMICIssuesPage from './OpenMICIssuesPage';
import MiMDIssuesPage from './MiMDIssuesPage';
import OpenXDAIssuesPage from './OpenXDAIssuesPage';
import DownloadedFilesPage from './DownloadedFilesPage';
import DataQualityIssuesPage from './DataQualityIssuesPage';

declare type Tab = 'notes' | 'openmic' | 'mimd' | 'xda' | 'files' | 'dq'

interface IProps { MeterID: number, OpenMICAcronym: string, Tab: Tab }

function DeviceIssuesPage(props: IProps) {
    const [meter, setMeter] = React.useState<OpenXDA.Types.Meter>(null);
    const [tab, setTab] = React.useState(getTab());

    React.useEffect(() => {
        let handle = getMeter();
        handle.then((data: OpenXDA.Types.Meter) => setMeter(data));
        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [props.MeterID]);

    React.useEffect(() => { }, [])

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

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('DeviceIssuesPage.Tab'))
            return JSON.parse(sessionStorage.getItem('DeviceIssuesPage.Tab'));
        else
            return 'notes';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('DeviceIssuesPage.Tab', JSON.stringify(tab));
    }, [tab]);

    if (meter == null) return null;

    const Tabs = [
        { Id: "notes", Label: "Notes" },
        { Id: "openmic", Label: "openMIC" },
        { Id: "mimd", Label: "miMD" },
        { Id: "xda", Label: "openXDA" },
        { Id: "dq", Label: "Data Quality" },
        { Id: "files", Label: "Last 50 Downloaded Files" },
    ];

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row">
                <div className="col">
                    <h2>{meter.Name}</h2>
                </div>
            </div>
            <hr />
                <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            <div className="tab-content" style={{ flex: 1, overflow: 'hidden' }}>
                {tab === 'notes' ? <div className={"tab-pane active"} style={{ height: '100%' }}>
                    <NoteWindow ID={props.MeterID} Type='Meter' />
                </div> : null}
                {tab === 'openmic' ? <div className={"tab-pane active"} style={{ height: '100%' }}>
                    <OpenMICIssuesPage Meter={meter} OpenMICAcronym={props.OpenMICAcronym}/>
                </div> : null}
                {tab === 'mimd' ? <div className={"tab-pane active"} style={{ height: '100%' }}>
                    <MiMDIssuesPage Meter={meter} />
                </div> : null}
                {tab === 'xda' ? <div className={"tab-pane active"} style={{ height: '100%' }}>
                    <OpenXDAIssuesPage Meter={meter} />
                </div> : null}
                {tab === 'dq' ? <div className={"tab-pane active"} style={{ height: '100%' }}>
                    <DataQualityIssuesPage Meter={meter} />
                </div> : null}
                {tab === 'files' ? <div className={"tab-pane active"} style={{ height: '100%' }}>
                    <DownloadedFilesPage Meter={meter} />
                </div> : null}
            </div>
        </div>
    )
}

export default DeviceIssuesPage;