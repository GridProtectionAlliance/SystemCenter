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

import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingScreen, Modal, Search, SearchBar, TabSelector, Warning } from '@gpa-gemstone/react-interactive'
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { EmailCategory } from '../global';
import { EmailCategorySlice } from '../Store';
import Table from '@gpa-gemstone/react-table';
import EmailCategoryForm from './EmailCategoryForm';
import EmailCategoryWindow from './EmailCategoryWindow';
import EmailList from './EmailList';

declare var homePath;
declare var version;

interface IProps { useParams: {id: string} }

type tab = 'settings' | 'emails' 


const EmailCategoryPage = (props: IProps) => {
    const dispatch = useDispatch();

    const [showDelete, setShowDelete] = React.useState<boolean>(false);

    const category = useSelector((state) => EmailCategorySlice.Datum(state, parseInt(props.useParams.id)));
    const status: Application.Types.Status = useSelector(EmailCategorySlice.Status);

    const [tab, setTab] = React.useState<tab>('settings');

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [status]);

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
                <div className="row">
                    <div className="col">
                        <h2>{category != null ? category.Name : ''}</h2>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger pull-right" hidden={location == null} onClick={() => setShowDelete(true)}>Delete EmailCategory</button>
                    </div>
                </div>

                <hr />
                <TabSelector CurrentTab={tab} SetTab={(t: tab) => setTab(t)} Tabs={[{ Label: 'General Settings', Id: 'settings' }, { Label: ' Emails', Id:'emails' }]} />

                <div className="tab-content" style={{ maxHeight: window.innerHeight - 215, overflow: 'hidden' }}>
                    <div className={"tab-pane " + (tab == "settings" ? " active" : "fade")} id="settings">
                        {category != null ? <EmailCategoryWindow Category={category} /> : null}
                    </div>
                    <div className={"tab-pane " + (tab == "emails" ? " active" : "fade")} id="emails">
                        {category != null ? <EmailList CategoryID={category.ID} /> : null}
                    </div>
                </div>
                <Warning Message={'This will permanently Delete this Category and can not be undone.'} Show={showDelete} Title={'Delete Email Category ' + (category != null? category.Name : '')} CallBack={(conf) => { if (conf) dispatch(EmailCategorySlice.DBAction({ verb: 'DELETE', record: category })); }} />
            </div>
        </>)
}

export default EmailCategoryPage;