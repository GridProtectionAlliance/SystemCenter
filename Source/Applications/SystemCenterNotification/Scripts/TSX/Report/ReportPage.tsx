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

type tab = 'settings' | 'template' | 'dataSources' | 'subscriptions'  | 'trigger'


const EmailPage = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [showTest, setShowTest] = React.useState<boolean>(false);

    const email = useAppSelector((state) => ScheduledEmailTypeSlice.Datum(state, parseInt(props.useParams.id)));
    const status: Application.Types.Status = useAppSelector(ScheduledEmailTypeSlice.Status);

    const [tab, setTab] = React.useState<tab>('settings');

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ScheduledEmailTypeSlice.Fetch());
    }, [status]);

    if (status == 'error')
        return <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <ServerErrorIcon Show={true} Label={'An error occured. Please reload this page.'} />
        </div>
    if (status == 'loading' || status == 'unintiated' || email == undefined)
        return <LoadingScreen Show={true} />

    return (
        <>
            <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
                <div className="row">
                    <div className="col">
                        <h2>{email != null ? email.Name : ''}</h2>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger float-right" onClick={() => setShowDelete(true)}>Delete Report</button>
                        <button className="btn btn-primary float-right" style={{ marginRight: 10 }} onClick={() => setShowTest(true)}>Test Report</button>
                    </div>
                </div>

                <hr />
                <TabSelector CurrentTab={tab} SetTab={(t: tab) => setTab(t)} Tabs={[
                    { Label: 'Settings', Id: 'settings' },
                    { Label: ' Template', Id: 'template' },
                    { Label: ' Data Sources', Id: 'dataSources' },
                    { Label: ' Trigger', Id: 'trigger' },
                    { Label: ' Subscriptions', Id: 'subscriptions' }
                ]} />

               
                {tab == "settings" ? <div className={"tab-pane active"} id="settings">
                    <GeneralInfo Record={email} />
                </div> : null}
                {tab == "template" ? <div className={"tab-pane active"} id="template">
                    <Template Record={email} />
                </div> : null}
                {tab == "dataSources" ? <div className={"tab-pane active"} id="dataSources">
                    <DataSourceWindow Record={email} />
                </div> : null}
                {tab == 'trigger' ? <div className={"tab-pane active"} id="trigger">
                    <TriggerWindow Record={email} />
                </div> : null}
                {tab == 'subscriptions' ? <div className={"tab-pane active"} id="subscriptions">
                    <Subscriptions Record={email} />
                </div> : null}
                <TestEmail show={showTest} OnClose={() => setShowTest(false)} record={email} />
                <Warning Message={'This will permanently delete this report and can not be undone.'} Show={showDelete} Title={'Delete ' + (email !== undefined? email.Name : '')}
                    CallBack={(conf) => {
                        if (conf) {
                            dispatch(ScheduledEmailTypeSlice.DBAction({ verb: 'DELETE', record: email }));
                            window.location.href = homePath + 'ReportEmails';
                        }
                        setShowDelete(false);
                    }} />
            </div>
        </>)
}

export default EmailPage;