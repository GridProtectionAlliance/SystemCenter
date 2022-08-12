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
import { useAppDispatch, useAppSelector } from './hooks';
import ByAllSubscription from './Subscriptions/Event/ByAllSubscription';
import EmailConfirmed from './EventSubscription/EmailConfirmed';
import ByCellCarrier from './CellCarrier/ByCellCarrier';

declare var homePath;
declare var version;

const Phone = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file">
   <path d="m16.73442,2.78512l-9.40284,0c-0.29313,0 -0.53158,0.23844 -0.53158,0.53158l0,17.28407c0,0.29313 0.23848,0.53158 0.53158,0.53158l9.40284,0c0.29313,0 0.53158,-0.23848 0.53158,-0.53158l0,-17.28407c0,-0.29313 -0.23876,-0.53158 -0.53158,-0.53158zm-1.11059,0.89185c0.15403,0 0.27917,0.12515 0.27917,0.27948c0,0.154 -0.12513,0.27917 -0.27917,0.27917c-0.15428,0 -0.27945,-0.12513 -0.27945,-0.27917c-0.00003,-0.154 0.12545,-0.27948 0.27945,-0.27948zm-0.56653,0.15187c0.0705,0 0.12761,0.05711 0.12761,0.12761c0,0.07046 -0.05711,0.12758 -0.12761,0.12758c-0.07078,0 -0.12761,-0.05711 -0.12761,-0.12758c0,-0.0705 0.05711,-0.12761 0.12761,-0.12761zm-0.33749,0c0.0705,0 0.12761,0.05711 0.12761,0.12761c0,0.07046 -0.05711,0.12758 -0.12761,0.12758s-0.12758,-0.05711 -0.12758,-0.12758c-0.00032,-0.0705 0.0568,-0.12761 0.12758,-0.12761zm-3.73451,-0.15187l2.09509,0l0,0.55861l-2.09509,0l0,-0.55861zm2.09506,16.63767l-2.09509,0l0,-0.55864l2.09509,0l0,0.55864zm3.07656,-1.226l-8.24819,0l0,-14.20085l8.24819,0l0,14.20085z" stroke="null"/>
</svg>


const MainPage = (props: {}) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(UserInfoSlice.Status)
    const roles = useAppSelector(UserInfoSlice.Roles)

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
                <Page Name='Carrier' Label={'Cell Carrier'} Icon={Phone}>
                    <ByCellCarrier />
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