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
import { SVGIcons } from '@gpa-gemstone/gpa-symbols';
import NewEventSubscription from './EventSubscription/NewEventSubscription';
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
import EmailConfirmed from './EventSubscription/EmailConfirmed';
import ByCellCarrier from './CellCarrier/ByCellCarrier';
import ByUserInformation from './UserInformation/ByUserInformation';
import * as $ from 'jquery';
import moment from 'moment';

declare var homePath;
declare var version;

const Phone = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file">
   <path d="m16.73442,2.78512l-9.40284,0c-0.29313,0 -0.53158,0.23844 -0.53158,0.53158l0,17.28407c0,0.29313 0.23848,0.53158 0.53158,0.53158l9.40284,0c0.29313,0 0.53158,-0.23848 0.53158,-0.53158l0,-17.28407c0,-0.29313 -0.23876,-0.53158 -0.53158,-0.53158zm-1.11059,0.89185c0.15403,0 0.27917,0.12515 0.27917,0.27948c0,0.154 -0.12513,0.27917 -0.27917,0.27917c-0.15428,0 -0.27945,-0.12513 -0.27945,-0.27917c-0.00003,-0.154 0.12545,-0.27948 0.27945,-0.27948zm-0.56653,0.15187c0.0705,0 0.12761,0.05711 0.12761,0.12761c0,0.07046 -0.05711,0.12758 -0.12761,0.12758c-0.07078,0 -0.12761,-0.05711 -0.12761,-0.12758c0,-0.0705 0.05711,-0.12761 0.12761,-0.12761zm-0.33749,0c0.0705,0 0.12761,0.05711 0.12761,0.12761c0,0.07046 -0.05711,0.12758 -0.12761,0.12758s-0.12758,-0.05711 -0.12758,-0.12758c-0.00032,-0.0705 0.0568,-0.12761 0.12758,-0.12761zm-3.73451,-0.15187l2.09509,0l0,0.55861l-2.09509,0l0,-0.55861zm2.09506,16.63767l-2.09509,0l0,-0.55864l2.09509,0l0,0.55864zm3.07656,-1.226l-8.24819,0l0,-14.20085l8.24819,0l0,14.20085z" stroke="null"/>
</svg>

const PhoneSettings = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file">
    <path d="m10.72,16.17l-0.5,-0.09c-0.23,-0.05 -0.42,-0.2 -0.51,-0.42c-0.09,-0.22 -0.06,-0.46 0.09,-0.65l0.31,-0.43c0.1,-0.14 0.09,-0.33 -0.03,-0.45l-0.68,-0.68c-0.12,-0.12 -0.3,-0.14 -0.44,-0.04l-0.42,0.29c-0.11,0.08 -0.25,0.12 -0.38,0.12c-0.29,0 -0.62,-0.2 -0.68,-0.58l-0.08,-0.52c-0.02,-0.17 -0.17,-0.29 -0.34,-0.29l-0.96,0c-0.16,0 -0.31,0.12 -0.34,0.28l-0.12,0.65c-0.07,0.36 -0.39,0.55 -0.67,0.55c-0.14,0 -0.27,-0.04 -0.38,-0.12l-0.54,-0.37c-0.14,-0.09 -0.32,-0.08 -0.44,0.04l-0.68,0.68c-0.12,0.12 -0.14,0.31 -0.03,0.45l0.32,0.43c0.14,0.19 0.17,0.43 0.09,0.65c-0.09,0.22 -0.27,0.38 -0.51,0.42l-0.5,0.09c-0.16,0.03 -0.28,0.18 -0.28,0.34l0,0.96c0,0.17 0.12,0.32 0.29,0.34l0.52,0.08c0.24,0.03 0.43,0.18 0.52,0.4c0.1,0.22 0.07,0.46 -0.06,0.65l-0.29,0.42c-0.09,0.14 -0.08,0.32 0.04,0.44l0.68,0.68c0.12,0.12 0.31,0.14 0.45,0.03l0.43,-0.32c0.12,-0.09 0.26,-0.14 0.4,-0.14c0.28,0 0.6,0.19 0.68,0.56l0.09,0.5c0.03,0.16 0.18,0.28 0.34,0.28l0.96,0c0.17,0 0.32,-0.12 0.34,-0.29l0.06,-0.37c0.06,-0.38 0.38,-0.58 0.68,-0.58c0.15,0 0.28,0.05 0.4,0.14l0.3,0.22c0.14,0.1 0.33,0.09 0.45,-0.03l0.68,-0.68c0.12,-0.12 0.14,-0.3 0.04,-0.44l-0.29,-0.42c-0.13,-0.2 -0.16,-0.44 -0.06,-0.65c0.09,-0.22 0.28,-0.37 0.52,-0.4l0.52,-0.08c0.17,-0.03 0.29,-0.17 0.29,-0.34l0,-0.96c0,-0.17 -0.12,-0.31 -0.28,-0.34zm-0.41,1l-0.23,0.03c-0.47,0.07 -0.86,0.37 -1.05,0.81c-0.19,0.43 -0.15,0.93 0.12,1.32l0.12,0.19l-0.27,0.26l-0.06,-0.05c-0.24,-0.17 -0.52,-0.27 -0.81,-0.27c-0.68,0 -1.26,0.49 -1.36,1.17l-0.01,0.08l-0.38,0l-0.04,-0.22c-0.12,-0.65 -0.69,-1.12 -1.35,-1.12c-0.29,0 -0.57,0.09 -0.81,0.27l-0.19,0.14l-0.27,-0.26l0.12,-0.19c0.27,-0.39 0.31,-0.89 0.12,-1.32c-0.19,-0.44 -0.58,-0.74 -1.05,-0.81l-0.23,-0.03l0,-0.38l0.22,-0.04c0.47,-0.09 0.85,-0.41 1.02,-0.85c0.17,-0.44 0.11,-0.93 -0.17,-1.32l-0.14,-0.19l0.27,-0.27l0.3,0.21c0.23,0.16 0.5,0.24 0.77,0.24c0.66,0 1.23,-0.47 1.35,-1.12l0.07,-0.36l0.38,0l0.03,0.23c0.1,0.68 0.68,1.17 1.36,1.17c0.27,0 0.54,-0.08 0.77,-0.24l0.18,-0.12l0.27,0.27l-0.14,0.19c-0.28,0.38 -0.35,0.88 -0.17,1.32c0.17,0.44 0.56,0.76 1.02,0.85l0.22,0.04l0,0.38z" />
    <path d="m22.69,16.12c-0.71,-1.36 -3.15,-2.83 -3.26,-2.89c-0.32,-0.18 -0.64,-0.28 -0.95,-0.28c-0.46,0 -0.83,0.21 -1.06,0.6c-0.36,0.44 -0.8,0.94 -0.91,1.02c-0.83,0.58 -1.49,0.51 -2.21,-0.23l-4.04,-4.11c-0.72,-0.73 -0.78,-1.41 -0.22,-2.25c0.08,-0.11 0.58,-0.57 1.01,-0.93c0.27,-0.16 0.46,-0.41 0.54,-0.71c0.11,-0.4 0.03,-0.88 -0.23,-1.34c-0.06,-0.1 -1.51,-2.6 -2.84,-3.32c-0.25,-0.14 -0.53,-0.2 -0.81,-0.2c-0.46,0 -0.9,0.18 -1.23,0.52l-0.89,0.91c-1.41,1.43 -1.92,3.06 -1.52,4.84c0.26,1.12 0.88,2.29 1.86,3.5c0.06,-0.08 0.16,-0.13 0.26,-0.13l2.75,0c0.17,0 0.32,0.13 0.35,0.3l0.13,0.88l0.68,-0.47c0.14,-0.1 0.33,-0.08 0.44,0.04l1.95,1.98c0.12,0.13 0.14,0.32 0.04,0.47l-0.52,0.72l0.8,0.16c0.17,0.03 0.28,0.18 0.28,0.35l0,2.8c0,0.07 -0.02,0.13 -0.06,0.18c1.7,1.5 3.32,2.25 4.83,2.25c1.31,0 2.53,-0.57 3.62,-1.68l0.89,-0.91c0.54,-0.55 0.66,-1.38 0.31,-2.07z" fill="black" />
</svg>

const AlertAdd = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file">
    <path d="m8.46,11.36l3.75,0l-1.06,-1.05a1.52,1.52 0 0 1 -0.44,-1.08l0,-2.37a4.5,4.5 0 0 0 -3,-4.25l0,-0.25a1.5,1.5 0 1 0 -3,0l0,0.25c-1.75,0.62 -3,2.29 -3,4.25l0,2.37c0,0.4 -0.16,0.79 -0.44,1.07l-1.06,1.06l3.75,0m4.5,0l0,0.75a2.25,2.25 0 1 1 -4.5,0l0,-0.75m4.5,0l-4.5,0"/>
    <path d="m15.77,11.17l0,3.69l-3.69,0c-0.65,0 -1.18,0.53 -1.18,1.18s0.53,1.18 1.18,1.18l3.69,0l0,3.69c0,0.65 0.53,1.18 1.18,1.18s1.17,-0.53 1.17,-1.18l0,-3.69l3.69,0c0.65,0 1.18,-0.53 1.18,-1.18s-0.53,-1.18 -1.18,-1.18l-3.69,0l0,-3.69c0,-0.65 -0.53,-1.18 -1.17,-1.18s-1.18,0.53 -1.18,1.18z" />
    <path d="m11.34,10.34c-1.51,1.51 -2.34,3.52 -2.34,5.66s0.83,4.15 2.34,5.66c1.51,1.51 3.52,2.34 5.66,2.34s4.15,-0.83 5.66,-2.34c1.51,-1.51 2.34,-3.52 2.34,-5.66s-0.83,-4.15 -2.34,-5.66c-1.51,-1.51 -3.52,-2.34 -5.66,-2.34c-2.14,0 -4.15,0.83 -5.66,2.34zm12.54,5.66c0,1.84 -0.72,3.57 -2.01,4.87s-3.03,2.01 -4.87,2.01s-3.57,-0.72 -4.87,-2.01s-2.01,-3.03 -2.01,-4.87s0.72,-3.57 2.01,-4.87s3.03,-2.01 4.87,-2.01s3.57,0.72 4.87,2.01s2.01,3.03 2.01,4.87z" />
</svg>


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
    return (
        <>
        <App
            DefaultPath={'EventSubscribe'}
            HomePath={homePath}
            Version={version} Logo={homePath + 'Images/SystemCenter.png'}
            UserRoles={roles}
            AllowCollapsed={true}
            OnSignOut={() => { window.location.href = "/Logout"; }}
            >
            <Section Label='Subscribe'>
                <Page Name='EventSubscribe' Label='Subscribe to Event' Icon={AlertAdd} >
                    <NewEventSubscription />
                </Page>
            </Section>
            <Section Label='My Subscriptions'>
                <Page Name='MyEventSubscriptions' Label='Event Notifications' Icon={SVGIcons.AlertPerson} >
                    <BySubscription/>
                </Page>
                <Page Name='ContactInfo' Label={'Contact Info'} Icon={PhoneSettings}>
                    <ByUserInformation />
                </Page>
            </Section>
            <Section Label='All Subscriptions'>
                <Page Name='AllEventSubscriptions' Label='Event Notifications' Icon={SVGIcons.AlertPeople} RequiredRoles={['Administrator']} >
                    <ByAllSubscription />
                </Page>
            </Section>
            <Section Label='System Settings'>
                <Page Name='Categories' Label='Email Categories' Icon={SVGIcons.Folder} RequiredRoles={['Administrator', 'Engineer']}>
                    <ByEmailCategory />
                </Page>
                <Page Name='Category/:id' RequiredRoles={['Administrator', 'Engineer']}>
                    <EmailCategoryPage useParams={{ id: '1' }} />
                </Page>
                <Page Name='EventEmails' Label='Event Notifications' Icon={SVGIcons.Alert} RequiredRoles={['Administrator', 'Engineer']}>
                    <ByEmailType />
                </Page>
                <Page Name='EventEmail/:id' RequiredRoles={['Administrator', 'Engineer']}>
                    <EmailPage useParams={{ id: '1' }} />
                </Page>
                <Page Name='Carrier' Label={'Cell Carrier'} Icon={Phone} RequiredRoles={['Administrator', 'Engineer']}>
                    <ByCellCarrier />
                </Page>
            </Section>
            <Page Name='ConfirmEmail' >
                <EmailConfirmed />
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