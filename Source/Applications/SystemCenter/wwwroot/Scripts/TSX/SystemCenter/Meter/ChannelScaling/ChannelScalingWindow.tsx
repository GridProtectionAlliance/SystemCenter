//******************************************************************************************************
//  ChannelScalingWindow.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//  10/20/2022 - Gabriel Santos
//       Refactored this code, split this class from ChannelScalingForm and placed it in its own file.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import ChannelScalingForm from './ChannelScalingForm';

declare let homePath: string;

interface IProps {
    Meter: OpenXDA.Types.Meter,
    IsVisible: boolean
}

const ChannelScalingWindow = (props: IProps) => {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [channels, setChannels] = React.useState<OpenXDA.Types.Channel[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ TotalPages: number, TotalRecords: number, RecordsPerPage: number }>({ TotalPages: 0, TotalRecords: 0, RecordsPerPage: 0 })

    React.useEffect(() => {
        if (props.IsVisible)
            return loadChannels(page);
    }, [props.IsVisible, page]);

    function loadChannels(page: number) {
        setStatus('loading');
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Channels/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            async: true
        });

        handle.done((d) => {
            setChannels(JSON.parse(d.Data));
            setStatus('idle');
            setPageInfo({ TotalPages: d.NumberOfPages, TotalRecords: d.TotalRecords, RecordsPerPage: d.RecordsPerPage })
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
        });

        handle.fail(() => { setStatus('error'); });

        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }

    function updateChannels(channels: OpenXDA.Types.Channel[]) {
        setStatus('loading');
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Channel/Update`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Channels: channels }),
            cache: false,
            async: true
        });

        h.done(() => {
            setStatus('idle');
            setChannels(channels);
        });
        h.fail(() => setStatus('error'));
    
    }

    return (
        <div className="card" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channel Scaling:</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p style={{ marginTop: 2, marginBottom: 2 }}>
                            {status === 'error' ? 'Could not complete Search' :
                                status === 'loading' ? 'Loading...' :
                                    `Displaying Channel(s) ${pageInfo.TotalRecords > 0 ? (pageInfo.RecordsPerPage * page + 1) : 0} - ${pageInfo.RecordsPerPage * page + channels.length} out of ${pageInfo.TotalRecords}`}
                        </p>
                    </div>
                </div>
            </div>
            <ChannelScalingForm UpdateChannels={updateChannels} ChannelStatus={status} Channels={channels} Page={page} SetPage={setPage} TotalPages={pageInfo.TotalPages} />
        </div>
    );
}

export default ChannelScalingWindow;