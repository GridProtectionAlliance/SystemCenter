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
import { LoadingScreen, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RemoteXDAInstanceSlice } from '../Store/Store';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import SystemSettingsTab from './SystemSettingsTab'
import RemoteAssetTab from './RemoteAssetTab'
import RemoteMeterTab from './RemoteMeterTab';

declare var homePath: string;
declare type Tab = 'systemSettings' | 'remoteMeter' | 'remoteAsset'

interface IProps { Roles: Array<Application.Types.SecurityRoleName>, ID: number, Tab: Tab }

function RemoteXDAInstance(props: IProps) {
    const dispatch = useAppDispatch();

    const instStatus = useAppSelector(RemoteXDAInstanceSlice.Status) as Application.Types.Status;
    const connection = useAppSelector((state) => RemoteXDAInstanceSlice.Datum(state, props.ID));

    const [tab, setTab] = React.useState(getTab());
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);


    React.useEffect(() => {
        if (instStatus === 'unintiated' || instStatus === 'changed')
            dispatch(RemoteXDAInstanceSlice.Fetch());
    }, [dispatch, instStatus]);

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('RemoteXDAInstance.Tab', JSON.stringify(tab));
    }, [tab]);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('RemoteXDAInstance.Tab'))
            return JSON.parse(sessionStorage.getItem('RemoteXDAInstance.Tab'));
        else
            return 'systemSettings';
    }

    function deleteConnection(): void {
        setLoading(true);
        if (props.Roles.includes('Administrator'))
            dispatch(RemoteXDAInstanceSlice.DBAction({ verb: 'DELETE', record: connection }));
        setLoading(false);
        window.location.href = homePath + 'index.cshtml?name=RemoteXDAInstanceMain';
    };

    const Tabs = [
        { Id: "systemSettings", Label: "System Settings" },
        { Id: "remoteMeter", Label: "Remote Meters" },
        { Id: "remoteAsset", Label: "Remote Assets" },
    ];

    if (connection == null) return null;

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row p-2">
                <div className="col">
                    <h2>{connection.Name}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" disabled={!props.Roles.includes('Administrator')} onClick={() => setShowDelete(true)}>Delete Remote Connection</button>
                </div>
            </div>
            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            {tab === 'systemSettings' ? <SystemSettingsTab ID={props.ID} /> : null}
            {tab === 'remoteMeter' ? <RemoteMeterTab ID={props.ID} /> : null}
            {tab === 'remoteAsset' ? <RemoteAssetTab ID={props.ID} /> : null}

            <Warning Message={'This will permanently delete this Remote openXDA Instance Connection and cannot be undone.'} Show={showDelete} Title={'Delete ' + (connection?.Name ?? 'Remote Connection')} CallBack={(conf) => { if (conf) deleteConnection(); setShowDelete(false); }} />
            <LoadingScreen Show={loading} />
        </div>
    )
}

export default RemoteXDAInstance;