//******************************************************************************************************
//  NodeStatus.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
import { Application, SystemCenter } from '@gpa-gemstone/application-typings'
import { GenericController } from '@gpa-gemstone/react-interactive'
import { ToolTip } from '@gpa-gemstone/react-forms'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { SystemCenter as SC } from '../global'

const controllerPath = `${homePath}api/SystemCenter/ExternalDatabases`
const ExternalDBController = new GenericController<SystemCenter.Types.DetailedExternalDatabases>(controllerPath, "ID", true)

const NodeHealth = (props: { ApplicationName: string, ApplicationType: 'SystemCenter' | 'MiMD' | 'XDA' }) => {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [statusItems, setStatusItems] = React.useState<SC.StatusItem[]>([]);
    const [hoveredItem, setHoveredItem] = React.useState<string>(null)
    const [fawgStatus, setFawgStatus] = React.useState<SC.StatusItem>(null)

    React.useEffect(() => {
        setStatus('loading');
        switch (props.ApplicationType) {
            case 'SystemCenter':
                getExternalDBs()
                testFAWG()
                break;
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
            setStatusItems(externalDBs.map((db) => {
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
            setStatusItems(statusItems => statusItems.map((statusItem) => {
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
            setFawgStatus(d)
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
                <fieldset className="border col-6" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Database Connection Status:</legend>
                    {status === 'loading' ? <ReactIcons.SpiningIcon /> :
                        statusItems.map((statusItem, index) => (
                            <div className="row mb-2 mx-2"
                                key={index}
                            >
                                <div className={`col-12 d-flex alert-${GetStatusItemAlertClass(statusItem.Status)}`}>
                                    <span className={"my-3"}>{GetStatusSymbol(statusItem.Status)}</span>
                                    <h5
                                        onMouseEnter={() => setHoveredItem(statusItem.Name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        data-tooltip={`statusbutton${statusItem.Name}`}
                                        className={"m-3"}
                                    >
                                        {statusItem.Name}
                                    </h5>
                                    {statusItem.Status !== 'Error' ? null : <p className={"my-3 mx-2"}> {statusItem.Details.find((detail) => detail.Status === 'Error').Description} </p>}
                                    <ToolTip
                                        Show={hoveredItem === statusItem.Name && status === 'idle' && (statusItem.Details?.length ?? 0) > 0}
                                        Position={'right'}
                                        Target={`statusbutton${statusItem.Name}`}
                                    >
                                        {statusItem?.Details == null ? <ReactIcons.SpiningIcon /> :
                                            statusItem.Details.map((data, index) => (
                                                <div
                                                    className={'d-flex'}
                                                    key={index}
                                                >
                                                    {GetDetailStatusSymbol(data.Status)}
                                                    <p> {data.Description} </p>
                                                </div>
                                            ))
                                        }
                                    </ToolTip>
                                </div>
                            </div>
                        ))
                    }
                </fieldset>
                <fieldset className="border col-6" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>FAWG Connection Status:</legend>
                    { fawgStatus ? <h3> Conncection successful. </h3> : <h3> Connection unsuccessful. </h3> }
                </fieldset>
            </div >
        : null 
    )
}

export default NodeHealth;

// helper functions
const GetStatusSymbol = (status: 'Success' | 'Error' | 'Warning' | 'Loading') => {
    switch (status) {
        case 'Success':
            return <ReactIcons.CircleCheckMark Color="var(--success)" />
        case 'Error':
            return <ReactIcons.CircledX Color="var(--danger)"/>
        case 'Warning':
            return <ReactIcons.QuestionMark />
        case 'Loading':
            return <ReactIcons.SpiningIcon />
        default:
            return <></>
    }
}

const GetDetailStatusSymbol = (status: 'Success' | 'Error' | 'Warning' | 'Loading') => {
    switch (status) {
        case 'Success':
            return <ReactIcons.CheckMark Color="var(--success)" />
        case 'Error':
            return <ReactIcons.CrossMark Color="var(--danger)" />
        case 'Warning':
            return <ReactIcons.QuestionMark />
        case 'Loading':
            return <ReactIcons.SpiningIcon />
        default:
            return <></>
    }
}

const GetStatusItemAlertClass = (status: 'Success' | 'Error' | 'Warning' | 'Loading') => {
    switch (status) {
        case 'Success':
            return 'success'
        case 'Error':
            return 'danger'
        case 'Warning':
            return 'warning'
        case 'Loading':
            return 'secondary'
    }
}