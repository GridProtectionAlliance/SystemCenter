//******************************************************************************************************
//  Applicationcard.tsx - Gbtc
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
//  06/10/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppDispatch } from '../hooks';

export interface IHostProperties { Name: string, Value: string }

export interface IHost {
    Image: string,
    Properties: IHostProperties[],
    PingURL: string,
    StatsURL?: string,
    ConsoleURL: string,
    Name: string,
    App: 'XDA' | 'MiMD' | 'SystemCenter',
    OpenConsole: () => void,
    OpenStats: () => void
}

export interface IApplicationCard extends IHost {
    IsSmall: boolean
}

const ApplicationCard = (props: IApplicationCard) => {
    const dispatch = useAppDispatch();
    const [status, setStatus] = React.useState<('Online' | 'Loading' | 'Unknown')>('Unknown');
    const [update, setUpdate] = React.useState<boolean>(false);

    React.useEffect(() => {
        const handlePing = sendPing();
        const h = setTimeout(() => {
            setUpdate((a) => !a);
        }, 10000);

        return () => {
            if (h !== null) clearTimeout(h);
            if (handlePing !== null && handlePing.abort != null) handlePing.abort();
        };

    }, [update]);

    function sendPing() {
        setStatus('Loading')
        const h = $.ajax({
            type: "GET",
            url: props.PingURL,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        h.then((d) => { setStatus('Online'); }, (d) => setStatus('Unknown'));
        return h;
    }
    return (
        <div className="d-flex h-100 flex-column container p-0">

            <div className="card h-100 w-100">
                <div className={`card-body`}>
                    <div className={`row ${props.IsSmall ? '' : "justify-content-around h-100 align-items-center"}`}>
                        {props.IsSmall ? null :
                            <div className="col-3">
                                <img src={props.Image} alt={props.App} style={{ width: '200px' }} />
                            </div>}
                        <div className={`col-${props.IsSmall ? 12 : 5}`}>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex flex-row justify-content-between align-items-end" key={'status'}> <span className={`badge badge-pill badge-${StatusToBadgeClass(status)}`}>{status == "Unknown" ? "Offline" : status}</span>
                                    {props.IsSmall ? <img src={`../Images/NodeTiles/${props.App}Icon.png`} alt={`${props.App} Icon`} style={{ width: '50px' }} /> : null}
                                </li> 
                                {props.Properties.map((p, i) => p.Name === "ID" ? null : <li className="list-group-item" key={i}>
                                    {p.Name}
                                    <span className="badge badge-info" style={{ marginLeft: 10 }}>{p.Value}</span>
                                </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row justify-content-between">
                        <div className={`col-3`}>
                            <button className={`btn btn-info`} onClick={() => props.OpenConsole()}>Console</button>
                        </div>
                        <div className={`col-3`}>
                            {props.App === 'MiMD' ? null :
                                <button className={`btn btn-info`} onClick={() => props.OpenStats()}>Status</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
export default ApplicationCard;

const StatusToBadgeClass = (status: "Online" | "Unknown" | "Loading") => {
    switch (status) {
        case "Online":
            return "success"
        case "Unknown":
            return "danger"
        case "Loading":
            return "secondary"
    }
}