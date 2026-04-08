//******************************************************************************************************
//  NodeHealth.tsx - Gbtc
//
//  Copyright � 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  10/14/2024 - G. Santos
//       Generated original version of source code.
//  04/02/2026 - N. Beatty
//       Moved from NodeStats.tsx to NodeHealth.tsx
//
//******************************************************************************************************


import * as React from 'react';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global'
import StatusDetails from './StatusDetails'

const statStyle: React.CSSProperties = {
    fontSize: "1em",
    display: 'inline-block',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
}

export interface IProps {
    StatsURL: string,
    ApplicationName: string,
    ApplicationType: 'SystemCenter' | 'XDA' | 'MiMD' | 'openMIC',
    Close: () => void
    Properties: { Name: string, Value: string }[]
}

const NodeHealth = (props: IProps) => {

    const [statInfo, setStatInfo] = React.useState<string>('');
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [openMICStatus, setOpenMICStatus] = React.useState<SC.StatusItem>({ Name: 'openMIC', Status: 'Loading', Details: [] });

    React.useEffect(() => {
        if (props.ApplicationType === 'openMIC') {
            GetOpenMICHealth()
            return
        }

        if (props.StatsURL == null || props.StatsURL.length == 0) return;

        setStatus('loading');
        let statHandle: JQuery.jqXHR<string>;
        const intervalHandle = setInterval(() => {
            if (statHandle != null && statHandle?.abort != null) statHandle.abort();

            statHandle = $.ajax({
                type: "GET",
                url: props.StatsURL,
                dataType: 'text',
                cache: false,
                async: true
            }).done((stat: string) => {
                setStatus('idle');
                // Regex remove wrapping quotes, carriage return, and format \\ to \
                setStatInfo(stat.replace(/^\"+|\"+$/g, '').replace(/\\r\\n/g, '\n').replace(/\\\\/g, '\\'));
            }).fail((_a, _b, e) => {
                console.error(e);
                setStatus('error');
            });
        }, 5000);

        return () => {
            clearInterval(intervalHandle);
            if (statHandle != null && statHandle.abort != null) statHandle.abort();
        };
    }, [props.ApplicationName]);

    const GetOpenMICHealth = () => {
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/DeviceHealthReport/OpenMICStatus`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.done((d: SC.StatusItem) => {
            setOpenMICStatus(d)
        }).fail(() => {
            setOpenMICStatus({ Status: 'Error', Name: 'openMIC', Details: [{ Status: "Error", Description: "Errors occured in retrieving openMIC health." }] })
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    return (
        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
            <legend className="w-auto" style={{ fontSize: 'large' }}>{props.ApplicationType} Health:</legend>

            {status === "error" ?

                <div className={`col-12 d-flex alert-danger`}>
                    <span className={"my-3"}>
                        <ReactIcons.CircledX Color="var(--danger)" />
                    </span>
                    <h5
                        className={"m-3"}
                    >
                        Failed to get {props.ApplicationType} health.
                    </h5>
                </div> :
                status === "loading" ?
                    <ReactIcons.SpiningIcon /> :
                    props.ApplicationType === 'XDA' ?
                        <div className="w-100 h-100">
                            <pre style={statStyle}>
                                {statInfo}
                            </pre>
                        </div>
                        : props.ApplicationType === 'openMIC'
                            ? <StatusDetails
                                StatusItem={openMICStatus}
                            /> :
                            null}

        </fieldset>
    )
}

export default NodeHealth;