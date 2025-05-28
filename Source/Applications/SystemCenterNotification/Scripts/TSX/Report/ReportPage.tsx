//******************************************************************************************************
//  EmailPage.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { TabSelector, Warning, LoadingScreen, ServerErrorIcon, Modal } from '@gpa-gemstone/react-interactive'
import { Application } from '@gpa-gemstone/application-typings';
import { ScheduledEmailTypeSlice } from '../Store';
import GeneralInfo from './GeneralInfo';
import Subscriptions from './Subscriptions';
import TriggerWindow from './TriggerWindow';
import DataSourceWindow from './DatasourceUI/DataSourceWindow';
import Template from './Template';
import TestEmail from './TestEmail';

declare var homePath;
declare var version;

interface IProps { useParams: {id: string}}

declare type Tab = 'settings' | 'template' | 'dataSources' | 'subscriptions' | 'trigger'
const Tabs = [
    { Label: 'Settings', Id: 'settings' },
    { Label: 'Template', Id: 'template' },
    { Label: 'Data Sources', Id: 'dataSources' },
    { Label: 'Trigger', Id: 'trigger' },
    { Label: 'Subscriptions', Id: 'subscriptions' }
];


const EmailPage = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [showTest, setShowTest] = React.useState<boolean>(false);

    const email = useAppSelector((state) => ScheduledEmailTypeSlice.Datum(state, parseInt(props.useParams.id)));
    const status: Application.Types.Status = useAppSelector(ScheduledEmailTypeSlice.Status);

    const getTab = React.useCallback(() => {
        if (sessionStorage.hasOwnProperty('ReportPage.Tab'))
            return JSON.parse(sessionStorage.getItem('ReportPage.Tab'));
        else return 'settings';
    }, []);

    const [tab, setTab] = React.useState<Tab>(getTab());

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ScheduledEmailTypeSlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('ReportPage.Tab', JSON.stringify(tab));
    }, [tab]);


    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <ServerErrorIcon Show={status == 'error'} Label={'An error occured. Please reload this page.'} />
            <LoadingScreen Show={status == 'loading' || status == 'unintiated' || email == undefined} />
            {!email ? <></> : <>
                <div className="row">
                    <div className="col-6 align-self-center">
                        <h2>{email != null ? email.Name : ''}</h2>
                    </div>
                    <div className="col-6 align-self-center">
                        <button className="btn btn-danger float-right" onClick={() => setShowDelete(true)}>Delete Report</button>
                        <button className="btn btn-info float-right" style={{ marginRight: 10 }} onClick={() => setShowTest(true)}>Test Report</button>
                    </div>
                </div>
                <div className="row">
                    <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
                </div>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="col-12" style={{ padding: 0 }}>
                        <div className="tab-content" style={{ height: '100%' }}>
                            {tab == "settings" ?
                                <div className="tab-pane active" style={{ height: 'inherit' }}>
                                    <GeneralInfo Record={email} />
                                </div>
                                : <></>}
                            {tab == "template" ?
                                <div className="tab-pane active" style={{ height: 'inherit' }}>
                                    <Template Record={email} />
                                </div>
                                : <></>}
                            {tab == "dataSources" ?
                                <div className="tab-pane active" style={{ height: 'inherit' }}>
                                    <DataSourceWindow Record={email} />
                                </div>
                                : <></>}
                            {tab == 'trigger' ?
                                <div className="tab-pane active" style={{ height: 'inherit' }}>
                                    <TriggerWindow Record={email} />
                                </div>
                                : <></>}
                            {tab == 'subscriptions' ?
                                <div className="tab-pane active" style={{ height: 'inherit' }}>
                                    <Subscriptions Record={email} />
                                </div>
                                : <></>}
                        </div>
                    </div>
                </div>
                <TestEmail show={showTest} OnClose={() => setShowTest(false)} record={email} />
                <Warning Message={'This will permanently delete this report and can not be undone.'} Show={showDelete} Title={'Delete ' + (email !== undefined ? email.Name : '')}
                    CallBack={(conf) => {
                        if (conf) {
                            dispatch(ScheduledEmailTypeSlice.DBAction({ verb: 'DELETE', record: email }));
                            window.location.href = homePath + 'ReportEmails';
                        }
                        setShowDelete(false);
                    }} />
            </>}
        </div>)
}

export default EmailPage;