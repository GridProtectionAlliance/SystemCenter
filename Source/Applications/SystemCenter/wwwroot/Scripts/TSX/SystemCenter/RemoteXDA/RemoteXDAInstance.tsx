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
import { useHistory } from "react-router-dom";
import { LoadingScreen, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RemoteXDAInstanceSlice } from '../Store/Store';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import SystemSettingsTab from './SystemSettingsTab'
import RemoteAssetTab from './RemoteAssetTab'
import RemoteMeterTab from './RemoteMeterTab';

declare var homePath: string;

interface IProps { Roles: Array<Application.Types.SecurityRoleName>, ID: number }

function RemoteXDAInstance(props: IProps) {
    let history = useHistory();

    const [tab, setTabState] = React.useState(getTab);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);

    const [loading, setLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const instStatus = useAppSelector(RemoteXDAInstanceSlice.Status) as Application.Types.Status;
    const connection = useAppSelector((state) => RemoteXDAInstanceSlice.Datum(state, props.ID));

    React.useEffect(() => {
        if (instStatus === 'unintiated' || instStatus === 'changed')
            dispatch(RemoteXDAInstanceSlice.Fetch());
    }, [dispatch, instStatus]);

    if (connection == null) return null;

    function getTab(): string {
        if (sessionStorage.hasOwnProperty('RemoteXDAInstance.Tab'))
            return JSON.parse(sessionStorage.getItem('RemoteXDAInstance.Tab'));
        else
            return 'systemSettings';
    }

    function setTab(tab: string): void {
        sessionStorage.setItem('RemoteXDAInstance.Tab', JSON.stringify(tab));
        setTabState(tab);
    }

    function returnMain() {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=RemoteXDAInstanceMain', state: {} })
    }

    function deleteConnection(): void {
        setLoading(true);
        if (props.Roles.includes('Administrator')) dispatch(RemoteXDAInstanceSlice.DBAction({ verb: 'DELETE', record: connection }));
        setLoading(false);
        returnMain;
    };

    function patchConnection(connection: OpenXDA.Types.RemoteXDAInstance): void {
        setLoading(true);
        dispatch(RemoteXDAInstanceSlice.DBAction({ verb: 'PATCH', record: connection }));
        setLoading(false);
    };

    const Tabs = [
        { Id: "systemSettings", Label: "System Settings" },
        { Id: "remoteMeter", Label: "Remote Meters" },
        { Id: "remoteAsset", Label: "Remote Assets" },
    ];

    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{connection.Name}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" disabled={!props.Roles.includes('Administrator')} onClick={() => setShowDelete(true)}>Delete Remote openXDA Instance Connection</button>
                </div>
            </div>
            <hr />
            <TabSelector CurrentTab={tab} SetTab={setTab} Tabs={Tabs} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "systemSettings" ? " active" : "fade")} id="systemSettings">
                    <SystemSettingsTab ID={props.ID} />
                </div>
                <div className={"tab-pane " + (tab == "remoteMeter" ? " active" : "fade")} id="blank">
                    <RemoteMeterTab ID={props.ID} />
                </div>
                <div className={"tab-pane " + (tab == "remoteAsset" ? " active" : "fade")} id="blank">
                    <RemoteAssetTab ID={props.ID} />
                </div>
            </div>
            <Warning Message={'This will permanently delete this instance connection and can not be undone.'} Show={showDelete} Title={'Delete Connection ' + connection.Name} CallBack={(conf) => { if (conf) deleteConnection(); setShowDelete(false); }} />
            <LoadingScreen Show={loading} />
        </div>
    )
}


export default RemoteXDAInstance;