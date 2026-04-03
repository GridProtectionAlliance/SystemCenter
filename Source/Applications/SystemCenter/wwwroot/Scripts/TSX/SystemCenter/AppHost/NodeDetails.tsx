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
import NodeHealth from './NodeHealth';

type tabs = 'Connections' | 'Health' | 'Console'

export interface IMessage { Message: string, Type: number }

export interface IProps {
    StatsURL: string,
    ApplicationName: string,
    ApplicationType: 'SystemCenter' | 'XDA' | 'MiMD',
    Close: () => void
    Properties: { Name: string, Value: string }[]
}


const NodeDetails = (props: IProps) => {

    return (
        <Modal
            Show={props.ApplicationName !== '' ? true : false}
            ShowCancel={false} ShowConfirm={false} ShowX={true} Size={'xlg'}
            CallBack={() => { props.Close(); /**setStatus('uninitiated'); setStatInfo('')*/ }}
            Title={'Details - ' + props.ApplicationName}
        >
            <div className="col-12">
                <NodeHealth
                    ApplicationName={props.ApplicationName}
                    ApplicationType={props.ApplicationType}
                    Properties={props.Properties}
                />
            </div>
        </Modal>);
}


export default NodeDetails;