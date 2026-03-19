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
//******************************************************************************************************

import * as React from 'react'
import { Application, SystemCenter, OpenXDA } from '@gpa-gemstone/application-typings'
import { GenericController } from '@gpa-gemstone/react-interactive'
import { SystemCenter as SC } from '../global'
import StatusGroup from './StatusGroup'

const controllerPath = `${homePath}api/SystemCenter/ExternalDatabases`
const ExternalDBController = new GenericController<SystemCenter.Types.DetailedExternalDatabases>(controllerPath, "ID", true)

const NodeHealth = (props: { ApplicationName: string, ApplicationType: 'SystemCenter' | 'MiMD' | 'XDA', Properties: { Name: string, Value: string }[] }) => {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [extDBStatus, setExtDBStatus] = React.useState<SC.StatusItem[]>([]);
    const [remoteXDAStatus, setRemoteXDAStatus] = React.useState<SC.StatusItem[]>([]);
    const [hoveredItem, setHoveredItem] = React.useState<string>(null)
    const [fawgStatus, setFawgStatus] = React.useState<SC.StatusItem>({ Name: "FAWG", Status: "Loading", Details: [] })
    const [PQIStatus, setPQIStatus] = React.useState<SC.StatusItem>({ Name: "PQI", Status: "Loading", Details: [] })

    React.useEffect(() => {
        setStatus('loading');
        switch (props.ApplicationType) {
            case 'SystemCenter':
                getExternalDBs()
                testFAWG()
                testPQI()
                break;
            case 'XDA':
                getRemoteXDAs()
            default:
                setStatus('idle')
                break;
        }
    }, [props.ApplicationName])

    function getExternalDBs() {
        setStatus('loading');
        const handle = ExternalDBController.PagedSearch([]);

        handle.done((dt) => {
            const externalDBs = JSON.parse(dt.Data as unknown as string)
            // first set them all as loading
            setExtDBStatus(externalDBs.map((db) => {
                return {
                    Name: db.Name,
                    Type: 'ExternalDB',
                    Details: [],
                    Status: 'Loading'
                }
            }))
            externalDBs.map((db) => {
                testDB(db)
            })
            setStatus('idle')
        }).fail((d) => setStatus('error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }

    function testDB(db: SystemCenter.Types.DetailedExternalDatabases) {
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/ExternalDatabases/TestConnection`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(db),
            cache: false,
            async: true
        });

        h.done((d: SC.StatusItem) => {
            setExtDBStatus(statusItems => statusItems.map((statusItem) => {
                if (db.Name !== statusItem.Name) {
                    return statusItem
                }
                else {
                    const status = d
                    status.Name = db.Name
                    return status
                }
            }))
        }).fail((d) => {
            setStatus('error')
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    function getRemoteXDAs() {
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/remoteXDAInstance/Get`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })

        h.done((remoteXDAs: OpenXDA.Types.RemoteXDAInstance[]) => {
            // first set them all as loading
            setRemoteXDAStatus(remoteXDAs.map((xda) => {
                return {
                    Name: xda.Name,
                    Type: 'RemoteXDA',
                    Details: [],
                    Status: 'Loading'
                }
            }))
            remoteXDAs.map((remoteXDA) => {
                 testRemoteXDA(remoteXDA)
            })
            setStatus('idle')
        }).fail((d) => {
            setStatus('error')
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    function testRemoteXDA(remoteXDA) {
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/remoteXDAInstance/RemoteConnectionStatus/${props.Properties.find(prop => prop.Name === "ID").Value}/${remoteXDA.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.done((xda: SC.StatusItem) => {
            setRemoteXDAStatus(statusItems => statusItems.map((statusItem) => {
                if (remoteXDA.Name !== statusItem.Name) {
                    return statusItem
                }
                else {
                    const status = xda
                    status.Name = remoteXDA.Name
                    return status
                }
            }))
        }).fail((d) => {
            setStatus('error')
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
        }).fail((d) => {
            setStatus('error')
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
        }).fail((d) => {
            setStatus('error')
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
                <div>
                    <div className="row">
                        <StatusGroup
                            StatusItems={remoteXDAStatus}
                        Status={status}
                        HoveredItem={hoveredItem}
                        SetHoveredItem={setHoveredItem}
                            Name="Remote XDA Connections"
                    />
                    </div>
                <div className="row">
                    <fieldset className="border col-12" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Remote XDA Connections:</legend>
                        {status === 'loading' ? <ReactIcons.SpiningIcon /> :
                            remoteXDAStatus.map((statusItem, index) => (
                                <StatusItem
                                    StatusItem={statusItem}
                                    Status={status}
                                    HoveredItem={hoveredItem}
                                    SetHoveredItem={setHoveredItem}
                                    key={index}
                                />
                    </div>
                </div>
                : null
    )
}

export default NodeHealth;