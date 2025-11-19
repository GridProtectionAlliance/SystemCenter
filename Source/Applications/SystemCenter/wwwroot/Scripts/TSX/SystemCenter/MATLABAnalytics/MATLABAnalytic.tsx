﻿//******************************************************************************************************
//  MATTLABAnalytic.tsx - Gbtc
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
//  08/07/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************



import * as React from 'react';
import MATLABAnalyticInfo from './MATLABAnalyticInfo';
import MATLABAnalyticSQLSettings from './MATLABAnalyticSQLSetting';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MATLABAnalyticSlice, MATLABAnalyticEventTypeSlice, MATLABAnalyticAssetTypeSlice } from '../Store/Store';
import { TabSelector, Warning } from '@gpa-gemstone/react-interactive';

declare var homePath: string;
declare type Tab = 'info' | 'settings'

interface IProps { AnalyticID: number, Tab: Tab }

export default function MATLABAnalytic(props: IProps) {
    const dispatch = useAppDispatch();

    const record = useAppSelector((state) => MATLABAnalyticSlice.Datum(state, props.AnalyticID));
    const eventTypeRecords = useAppSelector(MATLABAnalyticEventTypeSlice.Data);
    const assetTypeRecords = useAppSelector(MATLABAnalyticAssetTypeSlice.Data);

    const status = useAppSelector(MATLABAnalyticSlice.Status);
    const eventTypeStatus = useAppSelector(MATLABAnalyticEventTypeSlice.Status);
    const assetTypeStatus = useAppSelector(MATLABAnalyticAssetTypeSlice.Status);

    const [tab, setTab] = React.useState(getTab());
    const [showRemove, setShowRemove] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (status == 'uninitiated' || status == 'changed')
            dispatch(MATLABAnalyticSlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        if (eventTypeStatus == 'uninitiated' || eventTypeStatus == 'changed')
            dispatch(MATLABAnalyticEventTypeSlice.Fetch(props.AnalyticID));
    }, [eventTypeStatus]);

    React.useEffect(() => {
        if (assetTypeStatus == 'uninitiated' || assetTypeStatus == 'changed')
            dispatch(MATLABAnalyticAssetTypeSlice.Fetch(props.AnalyticID));
    }, [assetTypeStatus]);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('MATLABAnalytic.Tab'))
            return JSON.parse(sessionStorage.getItem('MATLABAnalytic.Tab'));
        else return 'info';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('MATLABAnalytic.Tab', JSON.stringify(tab));
    }, [tab]);

    function Delete() {
        dispatch(MATLABAnalyticSlice.DBAction({ verb: 'DELETE', record }));
        window.location.href = homePath + 'index.cshtml?name=MATLABAnalytics';
    }

    const Tabs = [
        { Id: "info", Label: "Analytic Info" },
        { Id: "settings", Label: "Settings" },
    ];

    if (record == null) return null;
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row p-2">
                <div className="col">
                    <h2>MATLAB Analytic</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={record == null}
                        onClick={() => setShowRemove(true)}>Delete Analytic</button>
                </div>
            </div>
            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            {tab === 'info' ? <MATLABAnalyticInfo Record={record} ETRecords={eventTypeRecords} ATRecords={assetTypeRecords} /> : null}
            {tab === 'settings' ? <MATLABAnalyticSQLSettings Record={record} /> : null}
            <Warning
                Message={'This will permanently delete this MATLAB Analytic and cannot be undone.'}
                Show={showRemove} Title={'Delete ' + (record?.MethodName ?? 'Analytic')}
                CallBack={(conf) => { if (conf) Delete(); setShowRemove(false); }} />
        </div>
    )
}
