//******************************************************************************************************
//  NodeConnections.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  02/26/2026 - Natalie Beatty
//       Generated original version of source code.
//
//  04/03/2026 - Natalie Beatty
//       Renamed to NodeConnections.tsx
//
//******************************************************************************************************

import * as React from 'react'
import { SystemCenter as SC } from '../global'
import StatusGroup from '../CommonComponents/StatusGroup'
import { INamedStatusItem } from '../CommonComponents/StatusItem'

const NodeConnections = (props: { ApplicationName: string, ApplicationType: SC.ApplicationType, Properties: { Name: string, Value: string }[] }) => {
    const [extDBStatus, setExtDBStatus] = React.useState<INamedStatusItem[]>([{ Name: "Loading...", Status: "Loading", Details: [] }]);
    const [remoteXDAStatus, setRemoteXDAStatus] = React.useState<INamedStatusItem[]>([{ Name: "Loading...", Status: "Loading", Details: [] }]);
    const [hoveredItem, setHoveredItem] = React.useState<string>(null)
    const [fawgStatus, setFawgStatus] = React.useState<INamedStatusItem>({ Name: "FAWG", Status: "Loading", Details: [] })
    const [PQIStatus, setPQIStatus] = React.useState<INamedStatusItem>({ Name: "PQI", Status: "Loading", Details: [] })
    const [SCADAStatus, setSCADAStatus] = React.useState<INamedStatusItem>({ Name: "SCADA Resource", Status: "Loading", Details: [] })
    const [structureCrawlerStatus, setStructureCrawlerStatus] = React.useState<INamedStatusItem>({ Name: "Structure Crawler", Status: "Loading", Details: [] })
    const [lightningRealTimeStatus, setLightningRealTimeStatus] = React.useState<INamedStatusItem>({ Name: "Lightning Real Time Data", Status: "Loading", Details: [] })
    const [lightningStructureStatus, setLightningStructureStatus] = React.useState<INamedStatusItem>({ Name: "Lightning Structure Data", Status: "Loading", Details: [] })

    React.useEffect(() => {
        switch (props.ApplicationType) {
            case 'SystemCenter':
                setExtDBStatus([{ Name: "Loading...", Status: "Loading", Details: [] }])
                const dbs = testDBs()
                dbs.done((statuses: INamedStatusItem[]) => {
                    setExtDBStatus(statuses)
                }).fail(() => {
                    setExtDBStatus([])
                })

                setFawgStatus({ Name: "FAWG", Status: "Loading", Details: [] })
                const fawg = testFAWG()
                fawg.done((d: SC.StatusItem) => {
                    setFawgStatus({ Status: d.Status, Name: "FAWG", Details: d.Details })
                }).fail(() => {
                    setFawgStatus({ Status: 'Error', Name: 'FAWG', Details: [{ Status: "Error", Description: "Errors occurred in retrieving FAWG connection status." }] })
                })

                setPQIStatus({ Name: "PQI", Status: "Loading", Details: [] })
                const pqi = testPQI()
                pqi.done((d: SC.StatusItem) => {
                    setPQIStatus({ Status: d.Status, Name: "PQI", Details: d.Details })
                }).fail(() => {
                    setPQIStatus({ Status: 'Error', Name: 'PQI', Details: [{ Status: "Error", Description: "Errors occurred in retrieving PQI connection status." }] })
                })

                return function cleanup() {
                    if (dbs.abort != null)
                        dbs.abort();
                    if (fawg.abort != null)
                        fawg.abort()
                    if (pqi.abort != null)
                        pqi.abort()
                }

            case 'XDA':
                setRemoteXDAStatus([{ Name: "Loading...", Status: "Loading", Details: [] }])
                const rxdas = testRemoteXDAs(props.Properties)
                rxdas.done((statuses: INamedStatusItem[]) => {
                    setRemoteXDAStatus(statuses)
                }).fail(() => {
                    setRemoteXDAStatus([])
                })

                setSCADAStatus({ Name: "SCADA Resource", Status: "Loading", Details: [] })
                const scada = testSCADA()
                scada.done((d: SC.StatusItem) => {
                    setSCADAStatus({ Status: d.Status, Name: 'SCADA Resource', Details: d.Details })
                }).fail(() => {
                    setSCADAStatus({ Status: 'Error', Name: 'SCADA Resource', Details: [{ Status: "Error", Description: "Errors occurred in retrieving SCADA Resource connection status." }] })
                })

                setStructureCrawlerStatus({ Name: "Structure Crawler", Status: "Loading", Details: [] })
                const crawler = testStructureCrawler()
                crawler.done((d: SC.StatusItem) => {
                    setStructureCrawlerStatus({ Status: d.Status, Name: "Structure Crawler", Details: d.Details })
                }).fail(() => {
                    setStructureCrawlerStatus({ Status: 'Error', Name: 'Structure Crawler', Details: [{ Status: "Error", Description: "Errors occurred in retrieving Structure Crawler connection status." }] })
                })

                const lightningRealTime = testLightningRealTimeData()
                lightningRealTime.done((d: SC.StatusItem) => {
                    setLightningRealTimeStatus({ Status: d.Status, Name: 'Lightning Real Time Data', Details: d.Details })
                }).fail(() => {
                    setLightningRealTimeStatus({ Status: 'Error', Name: 'Lightning Real Time Data', Details: [{ Status: "Error", Description: "Errors occurred in retrieving Lightning Real Time Data connection status." }] })
                })

                const lightningStructure = testLightningStructureData()
                lightningStructure.done((d: SC.StatusItem) => {
                    setLightningStructureStatus({ Status: d.Status, Name: 'Lightning Structure Data', Details: d.Details })
                }).fail(() => {
                    setLightningStructureStatus({ Status: 'Error', Name: 'Lightning Structure Data', Details: [{ Status: "Error", Description: "Errors occurred in retrieving Lightning Structure Data connection status." }] })
                })


                return function cleanup() {
                    if (rxdas.abort != null)
                        rxdas.abort()
                    if (scada.abort != null)
                        scada.abort()
                    if (crawler.abort != null)
                        crawler.abort()
                    if (lightningRealTime.abort != null)
                        lightningRealTime.abort()
                    if (lightningStructure.abort != null)
                        lightningStructure.abort()
                }
            default:
                return;
    }
    }, [props.ApplicationName])

    return (
        props.ApplicationType === 'SystemCenter' ?
            <div className="row h-100">
                {extDBStatus.length == 0 ? null :
                    <div className="col-6 h-100">
                        <StatusGroup
                            StatusItems={extDBStatus}
                            HoveredItem={hoveredItem}
                            SetHoveredItem={setHoveredItem}
                            Name="External Database Connections"
                        />
                    </div>
                }
                <div className={`col-${extDBStatus.length == 0 ? 12 : 6} h-100`}>
                    <StatusGroup
                        StatusItems={[fawgStatus, PQIStatus]}
                        HoveredItem={hoveredItem}
                        SetHoveredItem={setHoveredItem}
                        Name="Other Connections"
                    />
                </div>
            </div >
            : props.ApplicationType === "XDA" ?
                <div className="row h-100">
                    {remoteXDAStatus.length == 0 ? null :
                        <div className="col-6 h-100">
                            <StatusGroup
                                StatusItems={remoteXDAStatus}
                                HoveredItem={hoveredItem}
                                SetHoveredItem={setHoveredItem}
                                Name="Remote openXDA Connections"
                            />
                        </div>
                    }
                    <div className={`col-${remoteXDAStatus.length == 0 ? 12 : 6} h-100`}>
                        <StatusGroup
                            StatusItems={[SCADAStatus, structureCrawlerStatus, lightningRealTimeStatus, lightningStructureStatus]}
                            HoveredItem={hoveredItem}
                            SetHoveredItem={setHoveredItem}
                            Name="Other Connections"
                        />
                    </div>
                </div>
                : null
    )
}

export default NodeConnections;


function testDBs() {
    return $.ajax({
        type: "POST",
        url: `${homePath}api/SystemCenter/ExternalDatabases/TestAllConnections`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}

function testFAWG() {
    return $.ajax({
        type: "POST",
        url: `${homePath}api/LineSegmentWizard/TestConnection`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}

function testPQI() {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/SystemCenter/PQI/Test`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}
function testRemoteXDAs(properties: { Name: string, Value: string }[]) {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/remoteXDAInstance/RemoteConnectionStatus/${properties.find(prop => prop.Name === "ID").Value}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}

function testSCADA() {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/ScadaHealth`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}

function testStructureCrawler() {
        return $.ajax({
            type: "GET",
        url: `${homePath}api/OpenXDA/StructureCrawlerHealth`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
    });
    }

function testLightningRealTimeData() {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/LightningRealTimeDataHealth`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    })
}
function testLightningStructureData() {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/LightningStructureDataHealth`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    })
}