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

type DeviceIssuesPageTab = 'notes' | 'openmic' | 'mimd' | 'xda'
function DeviceIssuesPage(props: {MeterID: number, Tab? : DeviceIssuesPageTab}) {
    const [meter, setMeter] = React.useState<OpenXDA.Types.Meter>(null);
    const [tab, setTab] = React.useState<DeviceIssuesPageTab>(props?.Tab ?? 'notes');

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


    if (meter == null) return null;

    const Tabs: {Id: DeviceIssuesPageTab, Label: string }[] = [
        { Id: "notes", Label: "Notes" },
        { Id: "openmic", Label: "OpenMIC" },
        { Id: "mimd", Label: "MiMD" },
        { Id: "xda", Label: "OpenXDA" },
    ];

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{meter.Name}</h2>
                </div>
            </div>
            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t:DeviceIssuesPageTab) => setTab(t)} Tabs={Tabs} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 215, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "notes" ? " active" : "fade")} id="notes" style={{ maxHeight: window.innerHeight - 215 }}>
                    <NoteWindow ID={props.MeterID} Type='Meter' />
                </div>
                <div className={"tab-pane " + (tab == "openmic" ? " active" : "fade")} id="openmic" style={{ maxHeight: window.innerHeight - 215 }}>
                    <OpenMICIssuesPage Meter={meter}/>
                </div>
                <div className={"tab-pane " + (tab == "mimd" ? " active" : "fade")} id="mimd" style={{ maxHeight: window.innerHeight - 215 }}>
                    <MiMDIssuesPage Meter={meter} />
                </div>
                <div className={"tab-pane " + (tab == "xda" ? " active" : "fade")} id="xda" style={{ maxHeight: window.innerHeight - 215 }}>
                    <OpenXDAIssuesPage Meter={meter} />
                </div>
            </div>
        </div>
       

    )
}

export default DeviceIssuesPage;