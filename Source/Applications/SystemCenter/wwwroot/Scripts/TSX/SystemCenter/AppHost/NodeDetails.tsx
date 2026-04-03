//******************************************************************************************************
//  NodeDetails.tsx - Gbtc
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
//  04/03/2026 - N. Beatty
//       Renamed to NodeDetails.
//
//******************************************************************************************************

import * as React from 'react';
import { Modal, TabSelector } from '@gpa-gemstone/react-interactive';
import NodeConnections from './NodeConnections';
import OpenXDAHealth from './OpenXDAHealth';
import ConsoleWindow from './ConsoleWindow'
import { IHost } from './ApplicationCard';

type tab = 'connections' | 'health' | 'console'

export interface IMessage { Message: string, Type: number }

export interface IProps {
    StatsURL: string,
    ConsoleURL: string,
    ApplicationName: string,
    ApplicationType: 'SystemCenter' | 'XDA' | 'MiMD',
    Properties: { Name: string, Value: string }[],
    SetDetails: React.Dispatch<React.SetStateAction<IHost | null>>
    SetConsole: React.Dispatch<React.SetStateAction<IHost | null>>
}


const NodeDetails = (props: IProps) => {

    const [tab, setTab] = React.useState<tab>('connections');
    return (
        <Modal
            Show={props.ApplicationName !== '' ? true : false}
            ShowCancel={false} ShowConfirm={false} ShowX={true} Size={'xlg'}
            CallBack={() => { props.SetDetails(null); /**setStatus('uninitiated'); setStatInfo('')*/ }}
            Title={'Details - ' + props.ApplicationName}
        >
            <div className="row">
                <TabSelector CurrentTab={tab} SetTab={(t: tab) => setTab(t)} Tabs={
                    props.ApplicationType === 'SystemCenter' ?
                        [
                            { Label: 'Connections', Id: 'connections' },
                            { Label: 'Console', Id: 'console' }
                        ]
                        : props.ApplicationType === 'XDA' ?
                            [
                                { Label: 'Connections', Id: 'connections' },
                                { Label: 'Health', Id: 'health' },
                                { Label: 'Console', Id: 'console' }
                            ]
                            : [{ Label: 'Console', Id: 'console' }]
                } />
            </div>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="col-12" style={{ padding: 0, height: '100%' }}>
                    <div className="tab-content" style={{ height: '100%' }}>
                        {tab === "connections" ?
                            <div className="tab-pane active" style={{ height: 'inherit' }}>
                                <NodeConnections
                                    ApplicationName={props.ApplicationName}
                                    ApplicationType={props.ApplicationType}
                                    Properties={props.Properties}
                                />
                            </div>
                            : tab === "health" ? <div className="tab-pane active" style={{ height: 'inherit' }} >
                                <OpenXDAHealth
                                    StatsURL={props.StatsURL}
                                    ApplicationName={props.ApplicationName}
                                    ApplicationType={props.ApplicationType}
                                    Close={() => props.SetDetails(null)}
                                    Properties={props.Properties}
                                />
                            </div>
                                : tab === "console" ? <div className="tab-pane active" style={{ height: 'inherit' }}>
                                    <ConsoleWindow
                                        ConsoleURL={props.ConsoleURL}
                                        ApplicationName={props.ApplicationName}
                                        Close={() => props.SetConsole(null)}
                                    />
                                </div>
                                    : null}
                    </div>
                </div>
            </div>
        </Modal >);
}


export default NodeDetails;