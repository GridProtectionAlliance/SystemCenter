//******************************************************************************************************
//  NodeStats.tsx - Gbtc
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
//  10/14/2024 - G. Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { LoadingScreen, Modal, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';

export interface IMessage { Message: string, Type: number }

export interface IProps {
    StatsURL: string,
    ApplicationName: string,
    Close: () => void
}

const statStyle: React.CSSProperties = {
    fontSize: "1em",
    display: 'inline-block',
    overflow: 'auto'
}

const ConsoleWindow = (props: IProps) => {
    const [statInfo, setStatInfo] = React.useState<string>('');
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const [autoScroll, setAutoScroll] = React.useState<boolean>(true);
    const [lastUpdate, setLastUpdate] = React.useState<string|null>('');

    React.useEffect(() => {
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
    }, [props.StatsURL]);

    return (
        <Modal
            Show={props.StatsURL != undefined && props.StatsURL.length > 0}
            ShowCancel={false} ShowConfirm={false} ShowX={true} Size={'xlg'}
            CallBack={() => { props.Close(); setStatus('unintiated'); setStatInfo('') }}
            Title={'Statistics - ' + props.ApplicationName}
        >
            <LoadingScreen Show={status === "loading"} />
            {
                status === "error" ?
                    <ServerErrorIcon Show={true}
                        Label={"An error has occurred. Please contact your administrator."}
                        Size={50} /> :
                    <pre style={statStyle}>
                        {statInfo}
                    </pre>
            }
        </Modal>);
}


export default ConsoleWindow;