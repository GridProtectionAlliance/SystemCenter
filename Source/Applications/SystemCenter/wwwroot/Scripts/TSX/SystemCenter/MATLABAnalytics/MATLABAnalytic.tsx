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
import { MATLABAnalyticSlice } from '../Store/Store';
import { TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { OpenXDA } from '@gpa-gemstone/application-typings';

declare var homePath: string;

export default function MATLABAnalytic(props: { AnalyticID: number }) {
    const dispatch = useAppDispatch();

    const record = useAppSelector((state) => MATLABAnalyticSlice.Datum(state, props.AnalyticID));
    const emptyEventTypeRecord = { ID: 0, MATLABAnalyticID: 0, EventTypeID: 0 };
    const [eventTypeRecord, setEventTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticEventType>(emptyEventTypeRecord);
    const emptyAssetTypeRecord = { ID: 0, MATLABAnalyticID: 0, AssetTypeID: 0 };
    const [assetTypeRecord, setAssetTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticAssetType>(emptyAssetTypeRecord);

    const status = useAppSelector(MATLABAnalyticSlice.Status);
    const [eventTypeStatus, setEventTypeStatus] = React.useState<'uninitialized' | 'done'>('uninitialized');
    const [assetTypeStatus, setAssetTypeStatus] = React.useState<'uninitialized' | 'done'>('uninitialized');

    const [tab, setTab] = React.useState<'info' | 'sql'>('info');
    const [showRemove, setShowRemove] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(MATLABAnalyticSlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        sessionStorage.setItem('MATLABAnalytic.Tab', JSON.stringify(tab));
    }, [tab]);

    React.useEffect(() => {
        if (record?.ID === props.AnalyticID && eventTypeRecord?.ID === 0 && eventTypeStatus === 'uninitialized')
            getEventType();
    }, [record, props.AnalyticID, eventTypeRecord, eventTypeStatus]);

    React.useEffect(() => {
        if (record?.ID === props.AnalyticID && assetTypeRecord?.ID === 0 && assetTypeStatus === 'uninitialized')
            getAssetType();
    }, [record, props.AnalyticID, assetTypeRecord, assetTypeStatus]);

    function getEventType() {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/openXDA/MATLABAnalytic/EventType/${record.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d) => {
            setEventTypeRecord(d);
            setEventTypeStatus('done');
        });

        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        }
    }

    function getAssetType() {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/openXDA/MATLABAnalytic/AssetType/${record.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d) => {
            setAssetTypeRecord(d);
            setAssetTypeStatus('done');
        });

        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        }
    }

    function Delete() {
        dispatch(MATLABAnalyticSlice.DBAction({ verb: 'DELETE', record }))
        window.location.href = homePath + 'index.cshtml?name=MATLABAnalytics';
    }

    if (record == null) return null;

    if (eventTypeStatus === 'done' && assetTypeStatus === 'done') {
        return (
            <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
                <div className="row">
                    <div className="col">
                        <h2>MATLAB Analytic</h2>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger pull-right" hidden={record == null}
                            onClick={() => setShowRemove(true)}>Delete Analytic (Permanent)</button>
                    </div>
                </div>


                <hr />
                <TabSelector CurrentTab={tab} SetTab={(t) => setTab(t as ('info' | 'sql'))} Tabs={[{ Label: 'Analytic Info', Id: 'info' }, { Label: 'SQL Settings', Id: 'sql' }]} />

                <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                    <div className={"tab-pane " + (tab == "info" ? " active" : "fade")} id="info">
                        <MATLABAnalyticInfo Record={record} ETRecord={eventTypeRecord} ATRecord={assetTypeRecord} />
                    </div>
                    <div className={"tab-pane " + (tab == "sql" ? " active" : "fade")} id="sql">
                        <MATLABAnalyticSQLSettings Record={record} />
                    </div>
                </div>
                <Warning
                    Message={'This will permanently delete this MATLAB Analytic and cannot be undone.'}
                    Show={showRemove} Title={'Delete ' + (record?.MethodName ?? 'Analytic')}
                    CallBack={(conf) => { if (conf) Delete(); setShowRemove(false); }} />
            </div>
        )
    }
}
