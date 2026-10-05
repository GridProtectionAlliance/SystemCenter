//******************************************************************************************************
//  RemoteXDAInstance.tsx - Gbtc
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
//  05/04/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import SystemSettingsTab from './SystemSettingsTab'
import RemoteAssetTab from './RemoteAssetTab'
import RemoteMeterTab from './RemoteMeterTab';
import GenericRecord, { ITab } from '../CommonComponents/GenericRecord';

declare var homePath: string;
declare type Tab = 'systemSettings' | 'remoteMeter' | 'remoteAsset'

interface IProps { Roles: Array<Application.Types.SecurityRoleName>, ID: number, Tab: Tab }

const tabs: ITab<OpenXDA.Types.RemoteXDAInstance>[] = [
    { Id: 'systemSettings', Label: "System Settings", Content: (rec, patch) => <SystemSettingsTab RemoteXDAInsance={rec} Patch={patch} /> },
    { Id: "remoteMeter", Label: "Remote Meter", Content: (rec) => <RemoteMeterTab ID={rec.ID} /> },
    { Id: "remoteAsset", Label: "Remote Asset", Content: (rec) => <RemoteAssetTab ID={rec.ID} /> }
]

function RemoteXDAInstance(props: IProps) {
    return (
        <GenericRecord
            RecordID={props.ID}
            RecordType={"Remote XDA Instance"}
            TabLocalStorage={"RemoteXDAInstance.Tab"}
            ControllerPath={`${homePath}api/OpenXDA/remoteXDAInstance`}
            DefaultSort={"Name"}
            GetOnePath={`${homePath}api/OpenXDA/remoteXDAInstance/One/${props.ID}`}
            Redirect={`${homePath}index.cshtml?name=RemoteXDAInstanceMain`}
            DefaultTab={"systemSettings"}
            Name={(record) => record.Name}
            Tabs={tabs}
        />
    )
}
export default RemoteXDAInstance;