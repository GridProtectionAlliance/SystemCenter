//******************************************************************************************************
//  AppHost.tsx - Gbtc
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
import { Application } from '@gpa-gemstone/application-typings';
import { useAppDispatch } from '../hooks';
import { LoadingScreen, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import ApplicationCard, { IHost } from './ApplicationCard';
import ConsoleWindow from './ConsoleWindow';
import NodeStats from './NodeStats';


const AppHost: Application.Types.iByComponent = (props) => {
    const [hosts, setHosts] = React.useState<IHost[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [console, setConsole] = React.useState<IHost | null>(null);
    const [stats, setStats] = React.useState<IHost | null>(null);

    React.useEffect(() => {
        if (status == 'changed' || status == 'uninitiated') {
            getApps();
        }
    }, [status]);

    function getApps() {
        setStatus('loading');
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AppHost`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        h.then((d) => { setStatus('idle'); setHosts(d) }, (d) => setStatus('error'));
    }

    return (
        <>
            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <LoadingScreen Show={status == 'loading'} />
                <ServerErrorIcon Show={status == 'error'} />
                <div className="card-deck">
                    {hosts.map((h) => <ApplicationCard {...h}
                        OpenConsole={() => setConsole(h)}
                        OpenStats={() => setStats(h)}
                    />)}
                </div>               
            </div>
            <ConsoleWindow
                ApplicationName={console?.Name ?? ''}
                Close={() => setConsole(null)}
                ConsoleURL={console?.ConsoleURL}
            />
            <NodeStats
                ApplicationName={stats?.Name ?? ''}
                Close={() => setStats(null)}
                StatsURL={stats?.StatsURL}
            />
         </>)
}
export default AppHost;