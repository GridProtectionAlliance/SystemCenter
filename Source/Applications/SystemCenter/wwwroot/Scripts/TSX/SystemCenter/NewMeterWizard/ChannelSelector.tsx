//******************************************************************************************************
//  ChannelSelector.tsx - Gbtc
//
//  Copyright © 2024, Grid Protection Alliance.  All Rights Reserved.
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
//  09/24/2024 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { OpenXDA } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import * as React from 'react';

declare var homePath: string;

interface IProps {
    Channels: OpenXDA.Types.Channel[],
    UpdateChannels: (channels: OpenXDA.Types.Channel[]) => void,
    CurrentConnectionPriority: number,
    ConnectionPriorityTranslation: { Id: string, Label: string }[],
    ShowSeries: boolean,
    Label: string,
    Asset: string
}

export default function ChannelSelector(props: IProps) {
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const searchedChannels = React.useMemo(() =>
        props.Channels.filter(channel => channel.Name.toLowerCase().includes(searchTerm.toLowerCase()) || channel.Description.toLowerCase().includes(searchTerm.toLowerCase()))
    , [props.Channels, props.CurrentConnectionPriority, searchTerm, props.Asset]);

    return (
        <>
            <label>{props.Label}</label>
            <input
                type="text"
                placeholder="Search Channels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <select multiple style={{ flex: 1, width: '100%', overflowX: 'auto' }}
                onChange={(evt) =>
                    props.UpdateChannels(
                        ($(evt.target).val() as Array<string>)
                            .map(a =>
                                ({ ...props.Channels.find(ch => ch.ID == parseInt(a)), Asset: props.Asset, ConnectionPriority: props.CurrentConnectionPriority })
                            )
                    )
                }
                value={
                    searchedChannels.filter(ch => ch.ConnectionPriority === props.CurrentConnectionPriority && ch.Asset === props.Asset).map(a => a.ID.toString())
                }
            >
                {searchedChannels.map((channel, index) => {
                    const mismatchPrio = channel.Asset === props.Asset && channel.ConnectionPriority !== props.CurrentConnectionPriority;

                    return (
                        <option key={channel.ID} value={channel.ID} style={{ textDecoration: mismatchPrio ? 'line-through' : undefined }}>
                            {
                                (mismatchPrio ?
                                    `${(props.ConnectionPriorityTranslation
                                        .find(translation => translation.Id === channel.ConnectionPriority.toString())
                                        ?.Label ?? "Unknown").split(' ')[0]} - ` : '') +
                                channel.Name +
                                (channel.Name !== channel.Description ? ` - ${channel.Description}` : '') +
                                (props.ShowSeries && channel.Series.length > 0 ? ` - ${channel.Series[0].SeriesType}` : '')
                            }
                        </option>
                    );
                    }
                )}
            </select>
        </>                  
    );
}
