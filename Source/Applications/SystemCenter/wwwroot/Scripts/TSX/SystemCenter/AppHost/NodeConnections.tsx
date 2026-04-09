//******************************************************************************************************
//  NodeHealth.tsx - Gbtc
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
import { Application, SystemCenter, OpenXDA } from '@gpa-gemstone/application-typings'
import { SystemCenter as SC } from '../global'
import StatusGroup from './StatusGroup'

const NodeConnections = (props: { ApplicationName: string, ApplicationType: SC.ApplicationType, Properties: { Name: string, Value: string }[] }) => {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [extDBStatus, setExtDBStatus] = React.useState<SC.StatusItem[]>([{ Name: "Loading...", Status: "Loading", Details: [] }]);
    const [remoteXDAStatus, setRemoteXDAStatus] = React.useState<SC.StatusItem[]>([{ Name: "Loading...", Status: "Loading", Details: [] }]);
    const [hoveredItem, setHoveredItem] = React.useState<string>(null)
    const [fawgStatus, setFawgStatus] = React.useState<SC.StatusItem>({ Name: "FAWG", Status: "Loading", Details: [] })
    const [PQIStatus, setPQIStatus] = React.useState<SC.StatusItem>({ Name: "PQI", Status: "Loading", Details: [] })
    const [SCADAStatus, setSCADAStatus] = React.useState<SC.StatusItem>({ Name: "SCADA Resource", Status: "Loading", Details: [] })

    React.useEffect(() => {
        setStatus('loading');
        switch (props.ApplicationType) {
            case 'SystemCenter':
                testDBs()
                testFAWG()
                testPQI()
                break;
            case 'XDA':
                testRemoteXDAs()
                testSCADA()
                break;
            default:
                break;
        }
    }, [props.ApplicationName])


    function testDBs() {
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/ExternalDatabases/TestAllConnections`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.done((statuses: SC.StatusItem[]) => {
            setExtDBStatus(statuses)
        }).fail((d) => {
            setExtDBStatus([{ Status: 'Error', Name: 'External Database Connections', Details: [{ Status: "Error", Description: "Errors occurred in retrieving External DB Connection status." }] }])
        })


        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    function testRemoteXDAs() {
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/remoteXDAInstance/RemoteConnectionStatus/${props.Properties.find(prop => prop.Name === "ID").Value}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.done((statuses: SC.StatusItem[]) => {
            setRemoteXDAStatus(statuses)
        }).fail(() => {
            setRemoteXDAStatus([{ Status: 'Error', Name: 'Remote XDA Connection', Details: [{ Status: "Error", Description: "Errors occurred in retrieving Remote openXDA Connection status." }] }])
        })
        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    function testFAWG() {
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/LineSegmentWizard/TestConnection`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.done((d: SC.StatusItem) => {
            d.Name = 'FAWG'
            setFawgStatus(d)
        }).fail(() => {
            setFawgStatus({ Status: 'Error', Name: 'FAWG', Details: [{ Status: "Error", Description: "Errors occurred in retrieving FAWG connection status." }] })
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    function testPQI() {
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/PQI/Test`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.done((d: SC.StatusItem) => {
            d.Name = 'PQI'
            setPQIStatus(d)
        }).fail(() => {
            setPQIStatus({ Status: 'Error', Name: 'PQI', Details: [{ Status: "Error", Description: "Errors occurred in retrieving PQI connection status." }] })
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }
    function testSCADA() {
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/ScadaHealth`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.done((d: SC.StatusItem) => {
            d.Name = 'SCADA'
            setSCADAStatus(d)
        }).fail(() => {
            setSCADAStatus({ Status: 'Error', Name: 'SCADA Resource', Details: [{ Status: "Error", Description: "Errors occurred in retrieving SCADA Resource connection status." }] })
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    return (
        props.ApplicationType === 'SystemCenter' ?
            <div className="row">
                <div className="col-6">
                    <StatusGroup
                        StatusItems={extDBStatus}
                        Status={status}
                        HoveredItem={hoveredItem}
                        SetHoveredItem={setHoveredItem}
                        Name="External Database Connections"
                    />
                </div>
                <div className="col-6">
                    <StatusGroup
                        StatusItems={[fawgStatus, PQIStatus]}
                        Status={status}
                        HoveredItem={hoveredItem}
                        SetHoveredItem={setHoveredItem}
                        Name="Other Connections"
                    />
                </div>
            </div >
            : props.ApplicationType === "XDA" ?
                <div className="row">
                    <div className="col-6">
                        <StatusGroup
                            StatusItems={remoteXDAStatus}
                            Status={status}
                            HoveredItem={hoveredItem}
                            SetHoveredItem={setHoveredItem}
                            Name="Remote openXDA Connections"
                        />
                    </div>
                    <div className="col-6">
                        <StatusGroup
                            StatusItems={[SCADAStatus]}
                            Status={status}
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