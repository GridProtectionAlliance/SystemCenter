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


interface StatusItem {
    Name: string
    Type: 'ExternalDB'
    Status: 'Error' | 'Success' | 'Warning'
    Details: {
        Status: 'Success' | 'Error'
        Description: string
    }[],
}

const controllerPath = `${homePath}api/SystemCenter/ExternalDatabases`
const ExternalDBController = new GenericController<SystemCenter.Types.DetailedExternalDatabases>(controllerPath, "ID", true)

const NodeHealth = (props: {ApplicationName: string, ApplicationType: 'SystemCenter' | 'MiMD' | 'XDA'}) => {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [statusItems, setStatusItems] = React.useState<StatusItem[]>([]);
    const [hoveredItem, setHoveredItem] = React.useState<string>(null)

    React.useEffect(() => {
        setStatus('loading');
        switch (props.ApplicationType) {
            case 'SystemCenter':
                getExternalDBs()
                break;
            default:
                setStatus('idle')
                break;
        }
    }, [props.ApplicationName])

    function getExternalDBs() {
        setStatus('loading');
        setStatusItems([])
        const handle = ExternalDBController.PagedSearch([]);

        handle.done((dt) => {
            const externalDBs = JSON.parse(dt.Data as unknown as string)
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

        h.done((d) => {
            const status = { Name: db.Name, Status: 'Success', Type: "ExternalDB", Details: [{ Status: 'Success', Description: 'Successfully connected to database.' }] }
            setStatusItems(statusItems => [...statusItems, status as StatusItem])
        }).fail((d) => {
            const status = handleAdoException(d.responseJSON)
            status.Name = db.Name
            setStatusItems(statusItems => [...statusItems, status as StatusItem])
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    return (
        <div>
            {status === 'loading' ? <ReactIcons.SpiningIcon/> :
                    statusItems.map((statusItem, index) => (
                        <div className="row mb-2 mx-2"
                            key={index}
                        >
                        <div className={`col-12 d-flex alert-${statusItem.Status === 'Success' ? 'success' : 'danger'}`}>
                                <span className={"my-3"}>{GetStatusSymbol(statusItem.Status)}</span>
                            <h5
                                    onMouseEnter={() => setHoveredItem(statusItem.Name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    data-tooltip={`statusbutton${statusItem.Name}`}
                                    className={"m-3"}
                            >{statusItem.Name}</h5>
                                <ToolTip
                                Show={hoveredItem === statusItem.Name && status === 'idle' && (statusItem.Details?.length ?? 0) > 0}
                                    Position={'right'}
                                Target={`statusbutton${statusItem.Name}`}
                                >
                                {statusItem?.Details == null ? <ReactIcons.SpiningIcon/> :
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
        </div>
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

const handleAdoException = (result) => {

    const dbstatus = { Name: '', Status: 'Error', Type: "ExternalDB", Details: [] }

    if (result == null || result == undefined) {
        dbstatus.Status = 'Warning'
        dbstatus.Details.push({ Status: 'Warning', Description: 'Unexpected exception.' })
        return dbstatus
    }

    if (!('ExceptionMessage' in result)) {
        dbstatus.Status = 'Warning'
        dbstatus.Details.push({ Status: 'Warning', Description: 'Excpetion response has no message.' })
        return dbstatus
    }

    const exceptionMessage = result['ExceptionMessage']

    // specific error handling in case we want to derive our messages from the ADO exception
    /**
    if (exceptionMessage.includes('cannot find the file')) {
        dbstatus.Status = 'Error'
        dbstatus.Details.push({ Status: 'Error', Description: 'Could not load database connection settings from configuration file.'})
        return dbstatus
    }

    if (exceptionMessage.includes('not set to an instance')) {
        dbstatus.Status = 'Error'
        dbstatus.Details.push({ Status: 'Error', Description: 'Failed to connect to database.' })
        return dbstatus
    }

    if (exceptionMessage.includes('No listener')) {
        dbstatus.Status = 'Error'
        dbstatus.Details.push({ Status: 'Error', Description: 'Failed to connect to given host.' })
        return dbstatus
    }
    */

    if (exceptionMessage.includes('Login failed')) {
        dbstatus.Details.push({ Status: 'Success', Description: 'Successfully found database.' })
    }

    dbstatus.Details.push({ Status: 'Error', Description: `${exceptionMessage}` })

    return dbstatus
}