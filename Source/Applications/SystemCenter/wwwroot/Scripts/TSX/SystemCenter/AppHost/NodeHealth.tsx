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
import { Application } from '@gpa-gemstone/application-typings';
import { Console } from '@gpa-gemstone/react-interactive';
import { SystemCenter as SC } from '../global';
import StatusDetails from '../CommonComponents/StatusDetails';
import { INamedStatusItem } from '../CommonComponents/StatusItem';
import moment from 'moment';

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
    ApplicationType: SC.ApplicationType,
    Close: () => void
    Properties: { Name: string, Value: string }[]
}

const NodeHealth = (props: IProps) => {

    const [statInfo, setStatInfo] = React.useState<string>('');
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [openMICStatus, setOpenMICStatus] = React.useState<INamedStatusItem>({ Name: 'openMIC', Status: 'Loading', Details: [] });
    const [lastSuccess, setLastSuccess] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (props.ApplicationType === 'openMIC') {
            const cleanup = GetOpenMICHealth()
            return cleanup
        }

        if (props.StatsURL == null || props.StatsURL.length == 0) return;

        setStatus('loading');
        let statHandle: JQuery.jqXHR<string>;
        const intervalHandle = setInterval(() => {
            setStatus('loading');
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
                setLastSuccess(moment().valueOf());
            }).fail((_a, _b, e) => {
                setStatus('error');
            });
        }, 5000);

        return () => {
            clearInterval(intervalHandle);
            if (statHandle != null && statHandle.abort != null) statHandle.abort();
        };
    }, [props.ApplicationName]);

    const GetOpenMICHealth = () => {
        setStatus('loading');
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/DeviceHealthReport/OpenMICStatus`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.done((d: INamedStatusItem) => {
            setOpenMICStatus(d)
            setStatus('idle')
        }).fail(() => {
            setOpenMICStatus(item => {
                return { Status: 'Error', Details: 'Network request for OpenMICStatus failed.', ...item }
            })
            setStatus('error')
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }

    if (props.ApplicationType === 'openMIC') {
        return (
            <StatusDetails
                StatusItem={openMICStatus}
            />
        )
    }

    return (
        <div className="d-flex flex-column h-100" style={{ flex: 1 }}>
            <Console Status={status} LastSuccess={lastSuccess != null ? moment(lastSuccess).format('MM/DD/YYYY HH:mm:ss') : "N/A"}>
            <span style={{ color: 'white' }}>{statInfo}</span>
            </Console>
        </div>
    )
}
export default NodeHealth;