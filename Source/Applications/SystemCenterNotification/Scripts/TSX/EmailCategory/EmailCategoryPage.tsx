//******************************************************************************************************
//  EmailCategory.tsx - Gbtc
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
import { LoadingScreen, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';
import { EmailCategorySlice } from '../Store';
import EmailCategoryWindow from './EmailCategoryWindow';
import EmailList from './EmailList';

interface IProps { useParams: { id: string } }

declare type Tab = 'settings' | 'emails';


const EmailCategoryPage = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [showDelete, setShowDelete] = React.useState<boolean>(false);

    const category = useAppSelector((state) => EmailCategorySlice.Datum(state, parseInt(props.useParams.id)));
    const status: Application.Types.Status = useAppSelector(EmailCategorySlice.Status);

    const [tab, setTab] = React.useState<Tab>(getTab());
    const Tabs = [
        { Label: 'General Settings', Id: 'settings' },
        { Label: ' Emails', Id: 'emails' },
    ];

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [status]);

    function getTab(): Tab {
        if (sessionStorage.hasOwnProperty('EmailCategory.Tab'))
            return JSON.parse(sessionStorage.getItem('EmailCategory.Tab'));
        else return 'settings';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('EmailCategory.Tab', JSON.stringify(tab));
    }, [tab]);

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <LoadingScreen Show={status === 'loading' || !category} />
            {!category ? <></> : <>
                <div className="row">
                    <div className="col-6 align-self-center">
                        <h2>{category?.Name ?? 'Email Category'}</h2>
                    </div>
                    <div className="col-6 align-self-center">
                        <button className="btn btn-danger float-right" hidden={category == null}
                            onClick={() => setShowDelete(true)}>Delete EmailCategory</button>
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
                                    <EmailCategoryWindow Category={category} />
                                </div>
                                : null}
                            {tab == "emails" ?
                                <div className="tab-pane active" style={{ height: 'inherit' }}>
                                    <EmailList CategoryID={category.ID} />
                                </div>
                                : null}
                        </div>
                    </div>
                </div>

                <Warning Message={'This will permanently Delete this Category and can not be undone.'} Show={showDelete}
                    Title={`Delete ${category?.Name ?? 'Email Category'}`}
                    CallBack={(conf) => {
                        if (conf) {
                            dispatch(EmailCategorySlice.DBAction({ verb: 'DELETE', record: category }));
                            window.location.href = `${homePath}/Categories`;
                        }
                        setShowDelete(false);
                    }} />
            </>}
        </div>)
}

export default EmailCategoryPage;