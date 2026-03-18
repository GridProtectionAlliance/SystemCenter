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
import { Modal, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';
import NodeHealth from './NodeHealth';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';

export interface IMessage { Message: string, Type: number }

export interface IProps {
    StatsURL: string,
    ApplicationName: string,
    ApplicationType: 'SystemCenter' | 'XDA' | 'MiMD',
    Close: () => void
    Properties: { Name: string, Value: string }[]
}

const statStyle: React.CSSProperties = {
    fontSize: "1em",
    display: 'inline-block',
    overflow: 'auto'
}

const NodeStats = (props: IProps) => {
    const [statInfo, setStatInfo] = React.useState<string>('');
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [autoScroll, setAutoScroll] = React.useState<boolean>(true);
    const [lastUpdate, setLastUpdate] = React.useState<string | null>('');

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
    }, [props.ApplicationName]);

    return (
        <Modal
            Show={props.ApplicationName ? true : false}
            ShowCancel={false} ShowConfirm={false} ShowX={true} Size={'xlg'}
            CallBack={() => { props.Close(); setStatus('uninitiated'); setStatInfo('') }}
            Title={'Statistics - ' + props.ApplicationName}
        >
            {props.StatsURL === "" || props.StatsURL == null ?
                <div className="col-12">
                    <NodeHealth
                        ApplicationName={props.ApplicationName}
                        ApplicationType={props.ApplicationType}
                        Properties={props.Properties}
                    />
                </div> :
                <div className="row">
                    <fieldset className="border col-6" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>XDA Stats:</legend>
                        {
                            status === "error" ?

                                <div className={`col-12 d-flex alert-danger`}>
                                    <span className={"my-3"}>
                                        <ReactIcons.CircledX Color="var(--danger)" />
                                    </span>
                                    <h5
                                        className={"m-3"}
                                    >
                                       Failed to get openXDA stats.
                                    </h5>
                                </div> :
                                status === "loading" ?
                                    <ReactIcons.SpiningIcon /> :
                                    <pre style={statStyle}>
                                        {statInfo}
                                    </pre>
                        }
                    </fieldset>
                    <div className="col-6">
                        <NodeHealth
                            ApplicationName={props.ApplicationName}
                            ApplicationType={props.ApplicationType}
                            Properties={props.Properties}
                        />
                    </div>
                </div>
            }

        </Modal>);
}


export default NodeStats;