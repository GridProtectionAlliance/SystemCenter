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
import EmailConfirmed from './EventSubscription/EmailConfirmed';

declare var homePath;
declare var version;



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
                <Page Name='MyEventSubscriptions' Label='Event Notifications' Icon={SVGIcons.AlertPerson} >
                    <BySubscription/>
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
                <Page Name='Category/:id' >
                    <EmailCategoryPage useParams={{ id: '1' }} />
                </Page>
                <Page Name='EventEmails' Label='Event Notifications' Icon={SVGIcons.Alert} >
                    <ByEmailType />
                </Page>
                <Page Name='EventEmail/:id' >
                    <EmailPage useParams={{ id: '1' }} />
                </Page>
            </Section>
            <Page Name='ConfirmEmail' >
                <EmailConfirmed />
            </Page>
        </App>
    );
}
const X = (props: {}) => {
    const { id } = useParams<{ id }>();

    return <p> {id} </p>
}
ReactDOM.render(<Provider store={store}><MainPage /></Provider>, document.getElementById('pageBody'));