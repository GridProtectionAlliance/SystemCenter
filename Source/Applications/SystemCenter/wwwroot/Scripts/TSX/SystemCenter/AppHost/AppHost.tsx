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
import { LoadingScreen, ServerErrorIcon, LayoutGrid } from '@gpa-gemstone/react-interactive';
import ApplicationCard, { IHost } from './ApplicationCard';
import NodeDetails from './NodeDetails';
import { useMediaQuery } from '@gpa-gemstone/helper-functions';


const AppHost: Application.Types.iByComponent = (props) => {
    const [hosts, setHosts] = React.useState<IHost[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [console, setConsole] = React.useState<IHost | null>(null);
    const [details, setDetails] = React.useState<IHost | null>(null);

    const shouldHaveTwoRowsHeight = useMediaQuery('(max-height: 1250px)');
    const shouldBeSmall = useMediaQuery('(max-width: 1750px)');
    const shouldHaveTwoColumns = useMediaQuery('(max-width: 750px)')

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
        <div className="w-100 h-100">
            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <LoadingScreen Show={status == 'loading'} />
                <ServerErrorIcon Show={status == 'error'} />
                <LayoutGrid RowsPerPage={shouldHaveTwoRowsHeight ? 2 : 3} ColMax={shouldHaveTwoColumns ? 2 : 3}>
                    {hosts.map((h) => <ApplicationCard {...h}
                        OpenConsole={() => setConsole(h)}
                        OpenDetails={() => { setDetails(h); setConsole(h) }}
                        key={h.PingURL}
                        IsSmall={shouldBeSmall}
                    />)}
                </LayoutGrid>
            </div>
            <NodeDetails
                ApplicationName={details?.Name ?? ''}
                StatsURL={details?.StatsURL ?? ''}
                ApplicationType={details?.App ?? null}
                Properties={details?.Properties ?? []}
                SetDetails={setDetails}
                SetConsole={setConsole}
                ConsoleURL={console?.ConsoleURL ?? ''}
            />
        </div>)
}
export default AppHost;