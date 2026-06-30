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
    const [extDBStatus, setExtDBStatus] = React.useState<INamedStatusItem[]>([{ Name: "Loading...", Status: "Loading", Details: [], ServerError: false }]);
    const [remoteXDAStatus, setRemoteXDAStatus] = React.useState<INamedStatusItem[]>([{ Name: "Loading...", Status: "Loading", Details: [], ServerError: false }]);
    const [hoveredItem, setHoveredItem] = React.useState<string>(null)
    const [fawgStatus, setFawgStatus] = React.useState<INamedStatusItem>({ Name: "FAWG", Status: "Loading", Details: [], ServerError: false })
    const [PQIStatus, setPQIStatus] = React.useState<INamedStatusItem>({ Name: "PQI", Status: "Loading", Details: [], ServerError: false })
    const [XDAConnectionsStatus, setXDAConnectionsStatus] = React.useState<INamedStatusItem[]>([{ Name: "Loading...", Status: "Loading", Details: [], ServerError: false}])

    React.useEffect(() => {
        switch (props.ApplicationType) {
            case 'SystemCenter':
                setExtDBStatus([{ Name: "Loading...", Status: "Loading", Details: [], ServerError: false }])
                const dbs = testDBs()
                dbs.done((statuses: INamedStatusItem[]) => {
                    setExtDBStatus(statuses)
                }).fail(() => {
                    setExtDBStatus([{ Name: "External Databases", Status: "Error", Details: [], ServerError: true}])
                })

                setFawgStatus({ Name: "FAWG", Status: "Loading", Details: [], ServerError: false })
                const fawg = testFAWG()
                fawg.done((d: SC.StatusItem) => {
                    setFawgStatus({ Status: d.Status, Name: "FAWG", Details: d.Details, ServerError: false })
                }).fail(() => {
                    setFawgStatus({ Status: 'Error', Name: 'FAWG', Details: [{ Status: "Error", Description: "Errors occurred in retrieving FAWG connection status." }], ServerError: true })
                })

                setPQIStatus({ Name: "PQI", Status: "Loading", Details: [], ServerError: false })
                const pqi = testPQI()
                pqi.done((d: SC.StatusItem) => {
                    setPQIStatus({ Status: d.Status, Name: "PQI", Details: d.Details, ServerError: false })
                }).fail(() => {
                    setPQIStatus({ Status: 'Error', Name: 'PQI', Details: [{ Status: "Error", Description: "Errors occurred in retrieving PQI connection status." }], ServerError: true })
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
                setRemoteXDAStatus([{ Name: "Loading...", Status: "Loading", Details: [], ServerError: false }])
                const rxdas = testRemoteXDAs(props.Properties)
                rxdas.done((statuses: INamedStatusItem[]) => {
                    setRemoteXDAStatus(statuses)
                }).fail(() => {
                    setRemoteXDAStatus([{ Name: "Loading...", Status: "Loading", Details: [], ServerError: true }])
                })

                setRemoteXDAStatus([{ Name: "Loading...", Status: "Loading", Details: [], ServerError: false }])
                const xdaConnections = testAllXDAConnections()
                xdaConnections.done((statuses: INamedStatusItem[]) => {
                    setXDAConnectionsStatus(statuses)
                }).fail(() => {
                    setXDAConnectionsStatus([{ Name: "XDA Connections", Status: "Error", Details: [], ServerError: true }])
                })

                return function cleanup() {
                    if (rxdas.abort != null)
                        rxdas.abort()
                    if (xdaConnections.abort != null)
                        xdaConnections.abort()
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
                            StatusItems={XDAConnectionsStatus}
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

function testAllXDAConnections() {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/AllConnectionsHealth`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    })
}