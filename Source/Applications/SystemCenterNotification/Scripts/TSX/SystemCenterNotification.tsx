//******************************************************************************************************
//  SystemCenterNotification.tsx - Gbtc
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
//  02/15/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Application as App, Modal, Page, Section } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import NewEventSubscription from './Subscriptions/Event/NewEventSubscription';
import store from './Store';
import ByEmailCategory from './EmailCategory/ByEmailCategory';
import EmailCategoryPage from './EmailCategory/EmailCategoryPage';
import ByEmailType from './EmailTypes/ByEmailType';
import EmailPage from './EmailTypes/EmailPage';
import { useParams } from 'react-router-dom';
import BySubscription from './Subscriptions/Event/BySubscription';
import { UserInfoSlice } from './Store';
import { useAppDispatch, useAppSelector } from './hooks';
import ByAllSubscription from './Subscriptions/Event/ByAllSubscription';
import EmailConfirmed from './Subscriptions/EmailConfirmed';
import ByCellCarrier from './CellCarrier/ByCellCarrier';
import ByUserInformation from './UserInformation/ByUserInformation';
import * as $ from 'jquery';
import moment from 'moment';
import NewReportSubscription from './Subscriptions/Report/NewReportSubscription';
import ByReport from './Report/ByReport';
import ReportPage from './Report/ReportPage';
import ByTrippedNode from './TrippedNodes/ByTrippedNode';

declare var homePath;
declare var version;

const MainPage = (props: {}) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(UserInfoSlice.Status)
    const roles = useAppSelector(UserInfoSlice.Roles)

    const [acknowledge, setAcknowledge] = React.useState<boolean>(LoadAck());
    const [ackSetting, setAckSetting] = React.useState<string>('');

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(UserInfoSlice.Fetch());
    }, [status])

    React.useEffect(() => {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/Confirm/Acknowledgment`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.then((d: string) => { setAckSetting(d); })

        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [])

    function LoadAck() {
        if (sessionStorage.hasOwnProperty('Notifications.Ack'))
            return moment.duration(moment(JSON.parse(sessionStorage.getItem('Notifications.Ack'))).diff(moment())).asDays() < 1;
        return false;
    }

    React.useEffect(() => {
        if (acknowledge)
            sessionStorage.setItem('Notifications.Ack', JSON.stringify(moment().format("YYYY-MM-DD")));
    }, [acknowledge])

    const isAdmin = roles.includes('Administrator');

    return (
        <>
        <App
            DefaultPath={'EventSubscribe'}
            HomePath={homePath}
            Version={version} Logo={homePath + 'Images/Notifications.png'}
            UserRoles={roles}
            AllowCollapsed={true}
            OnSignOut={() => { window.location.href = "/Logout"; }}
            >
            <Section Label='Subscribe'>
                <Page Name='EventSubscribe' Label='Subscribe to Event' Icon={ReactIcons.AlertAdd} >
                    <NewEventSubscription />
                </Page>
                <Page Name='ReportSubscribe' Label='Subscribe to Report' Icon={ReactIcons.ReportAdd} >
                        <NewReportSubscription />
                </Page>
            </Section>
            <Section Label='Subscriptions'>
                <Page Name='MyEventSubscriptions' Label='My Subscriptions' Icon={ReactIcons.AlertPerson} >
                    <BySubscription/>
                </Page>
                <Page Name='AllEventSubscriptions' Label='All Event Subscriptions' Icon={ReactIcons.AlertPeople} RequiredRoles={['Administrator']} >
                    <ByAllSubscription />
                </Page>
                {/*TO DO: Add 'All Report Subscriptions' page*/}
                <Page Name='ContactInfo' Label={'My Contact Info'} Icon={ReactIcons.PhoneSettings}>
                    <ByUserInformation />
                </Page>
                </Section>
            {isAdmin && (
                <Section Label='System Settings'>
                    <Page Name='Categories' Label='Email Categories' Icon={ReactIcons.Folder} RequiredRoles={['Administrator', 'Engineer']} OtherActivePages={['Category']} >
                        <ByEmailCategory />
                    </Page>
                    <Page Name='Category/:id' RequiredRoles={['Administrator', 'Engineer']}>
                        <EmailCategoryPage useParams={{ id: '1' }} />
                    </Page>
                    <Page Name='EventEmails' Label='Event Notifications' Icon={ReactIcons.Alert} RequiredRoles={['Administrator', 'Engineer']} OtherActivePages={['EventEmail']} >
                        <ByEmailType />
                    </Page>
                    <Page Name='EventEmail/:id' RequiredRoles={['Administrator', 'Engineer']}>
                        <EmailPage useParams={{ id: '1' }} />
                    </Page>
                    <Page Name='ReportEmails' Label='Reports' Icon={ReactIcons.Document} RequiredRoles={['Administrator', 'Engineer']}>
                        <ByReport />
                    </Page>
                    <Page Name='ReportEmail/:id' RequiredRoles={['Administrator', 'Engineer']}>
                        <ReportPage useParams={{ id: '1' }} />
                    </Page>
                    <Page Name='Carrier' Label={'Cell Carrier'} Icon={ReactIcons.Phone} RequiredRoles={['Administrator', 'Engineer']}>
                        <ByCellCarrier />
                    </Page>
                </Section>
            )}
                <Page Name='ConfirmEmail/:code' >
                    <EmailConfirmed useParams={{ code: '0000' }} />
                </Page>
                <Page Name='EnableNode' RequiredRoles={['Administrator']}>
                    <ByTrippedNode />
                </Page>
            </App>
            <Modal Show={!acknowledge && ackSetting.length > 0} Title={'Terms of Use'} ShowCancel={false} ShowX={false} Size={'xlg'} ConfirmBtnClass={'btn-success'} ConfirmText={'Acknowledge'}
                CallBack={() => setAcknowledge(true)}
            >
                <div className="row">
                    <div className="col">
                        {ackSetting}
                    </div>
                </div>
            </Modal>
        </>
    );
}
const X = (props: {}) => {
    const { id } = useParams<{ id }>();

    return <p> {id} </p>
}
ReactDOM.render(<Provider store={store}><MainPage /></Provider>, document.getElementById('pageBody'));