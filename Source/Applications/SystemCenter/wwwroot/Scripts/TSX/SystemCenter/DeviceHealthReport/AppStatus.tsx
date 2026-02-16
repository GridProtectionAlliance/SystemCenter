//******************************************************************************************************
//  AppStatus.tsx - Gbtc
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
//  02/09/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { Application } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ServerErrorIcon, LoadingIcon } from '@gpa-gemstone/react-interactive'
import { ErrorBoundary } from '@gpa-gemstone/common-pages'

interface IOpenMICStatus {
    Details: {
        Status: 'Success' | 'Error' 
        Description: string
    }[],
    Status: 'Success' | 'Error' | 'N/A'
}

const AppStatus = (props: { Name: string, Endpoint: string }) => {

    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [appStatusData, setAppStatusData] = React.useState<IOpenMICStatus>({Status: 'N/A', Details: []});

    React.useEffect(() => {
        let handle = getAppStatus();

        handle.done((dt) => {
            setStatus('idle')
            setAppStatusData(dt)
        }).fail((d) => setStatus('error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [])

    function getAppStatus(): JQuery.jqXHR<IOpenMICStatus> {
        setStatus('loading');

        return $.ajax({
            type: "Get",
            url: `${homePath}api/DeviceHealthReport/${props.Endpoint}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });
    }

    return (
        <>
            <div
                data-tooltip={`statusbutton${props.Name}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`btn btn-${GetStatusClass(appStatusData.Status)} m-2`}
            >
                {status === 'idle' ? props.Name : null}
                <ServerErrorIcon Show={status == 'error'} />
                <LoadingIcon Show={status == 'loading' } />
            </div>
            <ToolTip
                Show={isHovered && status === 'idle' && appStatusData.Status !== 'N/A' && appStatusData.Details !== null && appStatusData.Details.length !== 0}
                Position={'bottom'}
                Target={`statusbutton${props.Name}`}
            >
                {appStatusData == undefined || appStatusData.Details == null ? <></> :
                   appStatusData.Details.map((data, index) => (
                        <div className={'d-flex'}>
                            {GetStatusSymbol(data.Status)}
                            <p> {data.Description} </p>
                        </div>
                    ))

                }
            </ToolTip>
        </>
    )
}

export default AppStatus;

// helper functions
const GetStatusSymbol = (status:'Success' | 'Error') => {
    switch (status) {
        case 'Success':
            return <ReactIcons.CheckMark Color="var(--success)" />
        case 'Error':
            return <ReactIcons.CrossMark Color="var(--danger)" />
        default:
            return <></>
    }
}

const GetStatusClass = (status: 'Success' | 'Error' | 'N/A') => {
    switch (status) {
        case 'Success':
            return 'success'
        case 'Error':
            return 'danger'
        case 'N/A':
            return 'secondary'
        default:
            return ''
    }
}