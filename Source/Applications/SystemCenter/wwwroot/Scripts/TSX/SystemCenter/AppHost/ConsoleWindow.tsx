//******************************************************************************************************
//  ConsoleWindow.tsx - Gbtc
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
//  06/20/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import { Console, ConsoleLine } from '@gpa-gemstone/react-interactive';
import moment from 'moment';
export interface IMessage { Message: string, Type: number }

export interface IProps {
    ConsoleURL: string,
    ApplicationName: string,
    Close: () => void
}

interface IConsoleMessage {
    Message: string,
    Type: number
}

const ConsoleWindow = (props: IProps) => {
    const cmdRef = React.useRef<string>('');
    const lastCmdRef = React.useRef<string>('');
    const sessionIDRef = React.useRef<string>('');

    const [update, setUpdate] = React.useState<boolean>(false);
    const [messages, setMessages] = React.useState<IConsoleMessage[]>([]);
    const [cmd, setCMD] = React.useState<string>('');
    const [lastCmd, setLastCmd] = React.useState<string>('');
    const [updateStatus, setUpdateStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [lastUpdate, setLastUpdate] = React.useState<number | null>(null);

    React.useEffect(() => {
        setCMD('');
        setMessages([]);
        if (props.ConsoleURL == null || props.ConsoleURL.length == 0)
            return;
        const h = connect();
        return () => {

            if (h !== null && h.abort != null) h.abort();
        };
    }, [props.ConsoleURL]);

    React.useEffect(() => {
        if (sessionIDRef.current == null || sessionIDRef.current.length == 0 || props.ConsoleURL == null || props.ConsoleURL.length == 0)
            return;
        const handleRequest = getResponse();
        const h = setTimeout(() => {
            setUpdate((a) => !a);
        }, 10000);

        return () => {
            if (h !== null) clearTimeout(h);
            if (handleRequest !== null && handleRequest.abort != null) handleRequest.abort();
        };
    }, [update]);


    React.useEffect(() => {
        if (props.ConsoleURL != undefined && props.ConsoleURL.length > 0)
            document.addEventListener("keydown", handleKeyPress, false);

        return () => {
            document.removeEventListener("keydown", handleKeyPress, false);
        }
    }, [props.ConsoleURL])

    React.useEffect(() => { cmdRef.current = cmd; }, [cmd]);
    React.useEffect(() => { lastCmdRef.current = lastCmd; }, [lastCmd]);

    function handleKeyPress(event) {

        if (event.keyCode == 38 && cmd.length > 0) // arrow down key
        {
            event.preventDefault();
            setCMD(lastCmdRef.current);
        }
        else if (event.keyCode == 13)  // enter key
        {
            event.preventDefault();
            sendCmd(cmdRef.current);
            setCMD('');
        }
    }

    const connect = React.useCallback(() => {
        const h = $.ajax({
            type: "GET",
            url: props.ConsoleURL + '/Connect',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        h.then((d) => { sessionIDRef.current = d; setUpdate((a) => !a); }, (d) => { console.error(d); });
        return h;
    }, [props.ConsoleURL]);

    const sendCmd = React.useCallback((cmd: string) => {
        setLastCmd(cmd)
        const h = $.ajax({
            type: "POST",
            url: `${props.ConsoleURL}/Send/${sessionIDRef.current}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(cmd),
            cache: false,
            async: true
        });
        h.then((d) => { }, (d) => { console.error(d); });
    }, [props.ConsoleURL]);

    const getResponse = React.useCallback(() => {
        setUpdateStatus('loading');
        const h = $.ajax({
            type: "GET",
            url: `${props.ConsoleURL}/Retrieve/${sessionIDRef.current}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        h.then((d) => {
            setUpdateStatus('idle');
            setMessages((m) => {
                let u = [...m, ...d];
                if (u.length > 100)
                    u = u.slice(-100);
                return u;
            });
            setLastUpdate(moment().valueOf());
        }, (d) => { console.error(d); setUpdateStatus('error') });
        return h;
    }, [props.ConsoleURL]);

    return (
        <div className="row h-100">
            <div className="col h-100 d-flex flex-column">
                <div style={{ flex: '1 1 0', minHeight: 0 }}>
                    <Console
                        Status={updateStatus}
                        LastSuccess={lastUpdate != null ? moment(lastUpdate).format('MM/DD/YYYY HH:mm:ss') : "N/A"}
                        AutoScroll={true}
                    >
                        {messages.map((m, i) => {

                            return <ConsoleLine key={i} Message={m.Message} Level={getLevel(m.Type)} />;
                        })}
                    </Console>
                </div>
                <div className="row my-4">
                    <div className="col-10">
                        <div className="input-group">
                            <input type="text" className="form-control"
                                placeholder="Server command..."
                                onChange={(evt) => setCMD(evt.target.value)}
                                value={cmd}
                            />
                        </div>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => { sendCmd(cmd); setCMD('') }}> Send </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ConsoleWindow;

function getLevel(type: number) {
    if (type == 2)
        return 'Error';
    if (type == 1)
        return 'Warning';
    return 'Normal';
}