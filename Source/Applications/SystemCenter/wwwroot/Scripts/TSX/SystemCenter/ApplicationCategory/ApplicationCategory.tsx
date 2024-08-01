//******************************************************************************************************
//  ApplicationCategory.tsx - Gbtc
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
//  11/11/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************
import { ApplicationCategory } from '../ApplicationCategory/ByApplicationCategory';
import * as React from 'react';
import * as _ from 'lodash';
import { LoadingScreen, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ApplicationCategorySlice } from '../Store/Store';
import { Application } from '@gpa-gemstone/application-typings';
import ApplicationCategoryInfo from './ApplicationCategoryInfo';
import Applications from './Applications';

declare var homePath: string;
type Tab = 'appCatInfo' | 'applications'

interface IProps { ID: number, Tab: Tab }

function ApplicationCategory(props: IProps) {
    const [tab, setTab] = React.useState(getTab());
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
    const acStatus = useAppSelector(ApplicationCategorySlice.Status) as Application.Types.Status;
    const applicationCategory = useAppSelector((state) => ApplicationCategorySlice.Datum(state, props.ID)) as ApplicationCategory;
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (acStatus == 'unintiated' || acStatus == 'changed')
            dispatch(ApplicationCategorySlice.Fetch());
    }, [acStatus]);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('ApplicationCategory.Tab'))
            return JSON.parse(sessionStorage.getItem('ApplicationCategory.Tab'));
        else
            return 'appCatInfo';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('ApplicationCategory.Tab', JSON.stringify(tab));
    }, [tab]);

    const Tabs: { Id: Tab, Label: string }[] = [
        { Id: "appCatInfo", Label: "Application Category Info" },
        { Id: "applications", Label: "Applications" },
    ];

    if (applicationCategory == null) return null;

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row">
                <div className="col">
                    <h2>{applicationCategory != null ? applicationCategory.Name : ''}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={applicationCategory == null} onClick={() => { setShowDelete(true);} }>Delete Application Category</button>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            {tab === "appCatInfo" ? ( <ApplicationCategoryInfo ApplicationCat={applicationCategory} stateSetter={(record) => dispatch(ApplicationCategorySlice.DBAction({ verb: 'PATCH', record: record }))} /> ) : null}
            {tab === "applications" ? ( <Applications ID={props.ID} Tab={tab} /> ) : null}

            <Warning Message={'This will permanently delete this Application Category and cannot be undone.'}
                Show={showDelete} Title={'Delete ' + (applicationCategory?.Name ?? 'Application Category')}
                CallBack={(conf) => { if (conf) dispatch(ApplicationCategorySlice.DBAction({ verb: 'DELETE', record: applicationCategory })); setShowDelete(false); window.location.href = homePath + 'index.cshtml?name=ByApplicationCategory' }} />
            <LoadingScreen Show={loadDelete} />
            </div>
    )
}

export default ApplicationCategory;