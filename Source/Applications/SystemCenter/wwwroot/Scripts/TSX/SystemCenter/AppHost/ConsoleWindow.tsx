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
import { Modal } from '@gpa-gemstone/react-interactive';

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

const remoteConsoleStyle = {
    backgroundColor: 'black',
    padding: 10,
    fontSize: 10,
    height: '100%'
}

const ConsoleWindow = (props: IProps) => {
    const consoleDiv = React.useRef<HTMLPreElement>(null);
    const cmdRef = React.useRef<string>('');
    const lastCmdRef = React.useRef<string>('');

    const [sessionID, setSessionID] = React.useState<string>('');
    const [update, setUpdate] = React.useState<boolean>(false);
    const [messages, setMessages] = React.useState<IConsoleMessage[]>([]);
    const [cmd, setCMD] = React.useState<string>('');
    const [lastCmd, setLastCmd] = React.useState<string>('');
    const [autoScroll, setAutoScroll] = React.useState<boolean>(true);

    const [lastUpdate, setLastUpdate] = React.useState<string|null>('');

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

    React.useLayoutEffect(() => {
        if (consoleDiv.current == null)
            return;
        if (!autoScroll)
            return;
        $(consoleDiv.current).scrollTop($(consoleDiv.current)[0].scrollHeight);
    })


    React.useEffect(() => {
        if (sessionID == null || sessionID.length == 0 || props.ConsoleURL == null || props.ConsoleURL.length == 0)
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


    function connect() {
        const h = $.ajax({
            type: "GET",
            url: props.ConsoleURL + '/Connect',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        h.then((d) => { setSessionID(d); setUpdate((a) => !a); }, (d) => { console.log(d); });
        return h;
    }

    function sendCmd(cmd: string) {
        setLastCmd(cmd)
        const h = $.ajax({
            type: "POST",
            url: `${props.ConsoleURL}/Send/${sessionID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(cmd),
            cache: false,
            async: true
        });
        h.then((d) => {  }, (d) => { console.log(d); });
    }

    function getResponse() {
        setLastUpdate(null);
        const h = $.ajax({
            type: "GET",
            url: `${props.ConsoleURL}/Retrieve/${sessionID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        h.then((d) => {
            setMessages((m) => {
                let u = [...m, ...d];
                if (u.length > 100)
                    u = u.slice(-100);
                return u;
            });
            setLastUpdate(new Date().toLocaleTimeString());
        }, (d) => { console.log(d); });
        return h;
    }

    function getColor(type: number) {
        if (type == 2)
            return 'red';
        if (type == 1)
            return 'yellow';
        return 'white';
    }

    return (
        <>
            <Modal
                Show={props.ConsoleURL != undefined && props.ConsoleURL.length > 0}
                CallBack={(c, b) => { if (!b) { props.Close(); setSessionID(''); } else { sendCmd(cmd); setCMD(''); } }}
                ShowCancel={false} Size={'xlg'}
                Title={'Console - ' + props.ApplicationName}
                ShowX={true}
                ConfirmText={'Send'}
            >
                <div className="well" style={{ height: innerHeight - 400, display: 'flex', flexDirection: 'column' }}>
                    <div className="row">
                        <div className="col-6">
                            <label className="small pull-left" >
                                {lastUpdate !== null ? <small><em>Last update {lastUpdate}</em></small> : 
                                <small><em>Updating...</em></small>}
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="small pull-right" style={{ display: autoScroll ? 'none' : undefined }} >
                                <small><em>Scrolling paused during mouse interaction...</em></small>
                            </label>
                        </div>
                    </div>
                    <div className="row" style={{ flex: 1, overflow: "auto" }}>
                        <div className="col">
                            <pre className="small" style={remoteConsoleStyle} ref={consoleDiv}
                                onMouseEnter={() => setAutoScroll(false)}
                                onMouseLeave={() => setAutoScroll(true)}
                            >
                                {messages.map((m) => <span style={{ color: getColor(m.Type) }} >
                                    {m.Message}
                                </span>)}
                            </pre>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    placeholder="Server command..."
                                    onChange={(evt) => setCMD(evt.target.value)}
                                    value={cmd}
                                />
                            </div>
                        </div>
                    </div> 
                </div>
            </Modal>
         </>)
}


export default ConsoleWindow;