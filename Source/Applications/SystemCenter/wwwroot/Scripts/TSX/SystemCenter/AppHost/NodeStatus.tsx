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


interface DBStatus {
    Name: string
    Status: 'Error' | 'Success' | 'Warning'
    Details: {
        Status: 'Success' | 'Error'
        Description: string
    }[],
}

const controllerPath = `${homePath}api/SystemCenter/ExternalDatabases`
const ExternalDBController = new GenericController<SystemCenter.Types.DetailedExternalDatabases>(controllerPath, "ID", true)

const NodeStatus = (props: {ApplicationName: string}) => {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [externalDBs, setExternalDBs] = React.useState<SystemCenter.Types.DetailedExternalDatabases[]>([]);
    const [dBStatuses, setDBStatuses] = React.useState<DBStatus[]>([]);
    const [hoveredItem, setHoveredItem] = React.useState<string>("")

    React.useEffect(() => {
        setStatus('loading');
        const handle = ExternalDBController.PagedSearch([]);

        handle.done((dt) => {
            setStatus('idle')
            setExternalDBs(JSON.parse(dt.Data as unknown as string))
        }).fail((d) => setStatus('error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [props.ApplicationName])

    React.useEffect(() => {
        let dbstatuses = [];
        externalDBs.map((db) => {
            dbstatuses.push({
                Name: db.Name,
                Status: testDB(db) ?? 'Error',
                Details: [{
                    Status: 'Error',
                    Description: 'Failed to connect to database.'
                }]
            });
        })
        setDBStatuses(dbstatuses)
    }, [externalDBs])

    function testDB(db: SystemCenter.Types.DetailedExternalDatabases) {
        let result;
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/ExternalDatabases/TestConnection`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(db),
            cache: false,
            async: true
        });

        h.then((d) => {
            result = 'Success';
        }, (d) => { result = 'Error' })
        return result;
    }

    return (
        <div>
            {dBStatuses.length == 0 ? null :
                    dBStatuses.map((dBStatus, index) => (
                        <div className="row"
                        >
                            {GetStatusSymbol(dBStatus.Status)}
                            <p
                                onMouseEnter={() => setHoveredItem(dBStatus.Name)}
                                onMouseLeave={() => setHoveredItem(dBStatus.Name)}
                                data-tooltip={`statusbutton${dBStatus.Name}`}
                            >{dBStatus.Name}</p>

                                <ToolTip
                                    Show={hoveredItem === dBStatus.Name && status === 'idle' && (dBStatus.Details?.length ?? 0) > 0}
                                    Position={'right'}
                                    Target={`statusbutton${dBStatus.Name}`}
                                >
                                    {dBStatus?.Details == null ? <></> :
                                        dBStatus.Details.map((data, index) => (
                                            <div
                                                className={'d-flex'}
                                            >
                                                {GetStatusSymbol(data.Status)}
                                                <p> {data.Description} </p>
                                            </div>
                                        ))
                                    }
                                </ToolTip>
                        </div>
                    ))
            }
        </div>
    )
}

export default NodeStatus;

// helper functions
const GetStatusSymbol = (status: 'Success' | 'Error' | 'Warning' | 'Loading') => {
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