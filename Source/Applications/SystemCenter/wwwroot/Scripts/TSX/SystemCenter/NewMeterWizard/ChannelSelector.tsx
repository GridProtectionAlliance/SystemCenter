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
    UpdateChannels: (channels: OpenXDA.Types.Channel[]) => void
    SelectedChannels: OpenXDA.Types.Channel[],
    Label: string;
}

export default function ChannelSelector(props: IProps) {
    
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const visibleChannels = React.useMemo(() => {
        const r = props.Channels.filter(channel => channel.Name.toLowerCase().includes(searchTerm.toLowerCase()) || channel.Description.toLowerCase().includes(searchTerm.toLowerCase()));
        return _.uniqBy(r.concat(props.SelectedChannels), (c) => c?.ID);
}, [props.Channels, props.SelectedChannels, searchTerm])

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
            <select multiple style={{ flex: 1, width: '100%', overflowX: 'auto' }} onChange={(evt) => {
                props.UpdateChannels(($(evt.target).val() as Array<string>).map(a => props.Channels.find(ch => ch.ID == parseInt(a))))
            }}
                value={props.SelectedChannels.map(a => a.ID.toString())}>
                {visibleChannels.map((channel, index) => (
                    <option key={channel.ID} value={channel.ID}>
                            {channel.Name + ' - ' + channel.Description}
                    </option>
                    ))}
                </select>
            </>         
                       
        );

}
