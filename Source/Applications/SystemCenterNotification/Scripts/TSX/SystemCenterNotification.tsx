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

import { Provider, useDispatch, useSelector } from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Application as App, Page, Section } from '@gpa-gemstone/react-interactive'
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
import ByAllSubscription from './Subscriptions/Event/ByAllSubscription';

declare var homePath;
declare var version;

const Folder = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
    <path d="M2.5,6.5H22.5V22.5H2.5V2.5 H 10.5 L 12.5,4.5" />
</svg>

const AlertPerson = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
    <path d="m21.43,11.36a3.71,3.71 0 1 1 -7.43,0a3.71,3.71 0 0 1 7.43,0zm-3.71,6.5a6.5,6.5 0 0 0 -6.5,6.5l13,0a6.5,6.5 0 0 0 -6.5,-6.5z" />
    <path d="m8.46,11.36l3.75,0l-1.06,-1.05a1.52,1.52 0 0 1 -0.44,-1.08l0,-2.37a4.5,4.5 0 0 0 -3,-4.25l0,-0.25a1.5,1.5 0 1 0 -3,0l0,0.25c-1.75,0.62 -3,2.29 -3,4.25l0,2.37c0,0.4 -0.16,0.79 -0.44,1.07l-1.06,1.06l3.75,0m4.5,0l0,0.75a2.25,2.25 0 1 1 -4.5,0l0,-0.75m4.5,0l-4.5,0" />
</svg>

const AlertPeople = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
    <path d="m23.25,22s0.75,0 0.75,-0.75s-0.75,-3 -3.75,-3s-3.75,2.25 -3.75,3s0.75,0.75 0.75,0.75l6,0zm-5.99,-0.75a0.2,0.2 0 0 1 -0.01,0c0,-0.2 0.13,-0.77 0.57,-1.29c0.41,-0.49 1.14,-0.96 2.43,-0.96c1.29,0 2.02,0.47 2.43,0.96c0.44,0.52 0.57,1.09 0.57,1.29l-0.01,0a0.2,0.2 0 0 1 -0.01,0l-5.97,0zm2.99,-4.5a1.5,1.5 0 1 0 0,-3a1.5,1.5 0 0 0 0,3zm2.25,-1.5a2.25,2.25 0 1 1 -4.5,0a2.25,2.25 0 0 1 4.5,0zm-5.29,3.21a4.41,4.41 0 0 0 -0.92,-0.19a5.51,5.51 0 0 0 -0.53,-0.02c-3,0 -3.75,2.25 -3.75,3c0,0.5 0.25,0.75 0.75,0.75l3.17,0a1.68,1.68 0 0 1 -0.17,-0.75c0,-0.76 0.29,-1.53 0.82,-2.18c0.18,-0.22 0.4,-0.43 0.64,-0.62l-0.01,0.01zm-1.52,0.54a4.12,4.12 0 0 0 -0.69,2.25l-2.25,0c0,-0.2 0.12,-0.77 0.57,-1.29c0.41,-0.48 1.12,-0.94 2.37,-0.96zm-2.57,-3.38a2.25,2.25 0 1 1 4.5,0a2.25,2.25 0 0 1 -4.5,0zm2.25,-1.5a1.5,1.5 0 1 0 0,3a1.5,1.5 0 0 0 0,-3z" />
    <path d="m8.46,11.36l3.75,0l-1.06,-1.05a1.52,1.52 0 0 1 -0.44,-1.08l0,-2.37a4.5,4.5 0 0 0 -3,-4.25l0,-0.25a1.5,1.5 0 1 0 -3,0l0,0.25c-1.75,0.62 -3,2.29 -3,4.25l0,2.37c0,0.4 -0.16,0.79 -0.44,1.07l-1.06,1.06l3.75,0m4.5,0l0,0.75a2.25,2.25 0 1 1 -4.5,0l0,-0.75m4.5,0l-4.5,0" />
</svg>


const Alert = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
</svg>


const MainPage = (props: {}) => {
    const dispatch = useDispatch();
    const status = useSelector(UserInfoSlice.Status)
    const roles = useSelector(UserInfoSlice.Roles)

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(UserInfoSlice.Fetch());
    }, [status])

    return (
        <App
            DefaultPath={'EventSubscribe'}
            HomePath={homePath}
            Version={version} Logo={homePath + 'Images/SystemCenter.png'}
            UserRoles={roles}
            AllowCollapsed={true}>
            <Section Label='Subscribe'>
                <Page Name='EventSubscribe' Label='Subscribe to Event' Icon={SVGIcons.Cube} >
                    <NewEventSubscription />
                </Page>
            </Section>
            <Section Label='My Subscriptions'>
                <Page Name='MyEventSubscriptions' Label='Event Notifications' Icon={AlertPerson} >
                    <BySubscription/>
                </Page>
            </Section>
            <Section Label='All Subscriptions'>
                <Page Name='AllEventSubscriptions' Label='Event Notifications' Icon={AlertPeople} RequiredRoles={['Administrator']} >
                    <ByAllSubscription />
                </Page>
            </Section>
            <Section Label='System Settings'>
                <Page Name='Categories' Label='Email Categories' Icon={Folder} RequiredRoles={['Administrator', 'Engineer']}>
                    <ByEmailCategory />
                </Page>
                <Page Name='Category/:id' >
                    <EmailCategoryPage useParams={{ id: '1' }} />
                </Page>
                <Page Name='EventEmails' Label='Event Notifications' Icon={Alert} >
                    <ByEmailType />
                </Page>
                <Page Name='EventEmail/:id' >
                    <EmailPage useParams={{ id: '1' }} />
                </Page>
            </Section>
            <Page Name='ConfirmEmail' >
                <EmailPage useParams={{ id: '1' }} />
            </Page>
        </App>
    );
}
const X = (props: {}) => {
    const { id } = useParams<{ id }>();

    return <p> {id} </p>
}
ReactDOM.render(<Provider store={store}><MainPage /></Provider>, document.getElementById('pageBody'));