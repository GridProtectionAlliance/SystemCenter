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
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationCategorySlice } from '../Store/Store';
import { Application } from '@gpa-gemstone/application-typings';
import { Input } from '@gpa-gemstone/react-forms';
import ApplicationCategoryInfo from './ApplicationCategoryInfo';
import Applications from './Applications';

declare var homePath: string;
type tab = 'appCatInfo' | 'applications'

interface IProps { ID: number, Tab: tab }

function ApplicationCategory(props: IProps) {

    const [tab, setTab] = React.useState(getTab());
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
    const acStatus = useSelector(ApplicationCategorySlice.Status) as Application.Types.Status;
    const applicationCategory = useSelector((state) => ApplicationCategorySlice.Datum(state, props.ID)) as ApplicationCategory;

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (acStatus == 'unintiated' || acStatus == 'changed')
            dispatch(ApplicationCategorySlice.Fetch());
    }, [acStatus]);

    const Tabs: { Id: tab, Label: string }[] = [
        { Id: "appCatInfo", Label: "Application Category Info" },
        { Id: "applications", Label: "Applications" },
    ];

    function getTab(): tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('ApplicationCategory.Tab'))
            return JSON.parse(sessionStorage.getItem('ApplicationCategory.Tab'));
        else
            return 'appCatInfo';
    }

    if (applicationCategory == null) return null;
    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{applicationCategory != null ? applicationCategory.Name : ''}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={applicationCategory == null} onClick={() => { setShowDelete(true);} }>Delete Application Category</button>
                </div>
            </div>
            <TabSelector CurrentTab={tab} SetTab={(t: tab) => setTab(t)} Tabs={Tabs} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "appCatInfo" ? " active" : "fade")} id="appCatInfo">
                    <ApplicationCategoryInfo ApplicationCat={applicationCategory} stateSetter={(record) => dispatch(ApplicationCategorySlice.DBAction({verb: 'PATCH', record: record}))} />
                </div>
                <div className={"tab-pane " + (tab == "applications" ? " active" : "fade")} id="applications">
                    <Applications ID={props.ID} Tab={tab}/>
                </div>
            </div>

            <Warning Message={'This will permanently Delete this Application Category and can not be undone.'}
                Show={showDelete} Title={'Delete Application Category ' + applicationCategory.Name}
                CallBack={(conf) => { if (conf) dispatch(ApplicationCategorySlice.DBAction({ verb: 'DELETE', record: applicationCategory })); setShowDelete(false); window.location.href = homePath + 'index.cshtml?name=ByApplicationCategory' }} />
            <LoadingScreen Show={loadDelete} />
            </div>
    )

}
export default ApplicationCategory;