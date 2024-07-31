//******************************************************************************************************
//  Meter.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  03/15/2023 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../hooks';
import { WidgetCategorySlice } from '../Store/Store';
import { TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings'
import CategoryInfo from './CategoryInfo';
import WidgetByCategory from './WidgetByCategory';

declare var homePath: string;
declare type Tab = 'info' | 'widgets'

interface IProps { TabID: number, Tab: Tab }

const Tabs = [
    { Id: "info", Label: "Tab Info" },
    { Id: "widgets", Label: "Widgets" },
]

export default function WidgetCategory(props: IProps) {
    const dispatch = useAppDispatch();
    const [tab, setTab] = React.useState(getTab());
    const category = useAppSelector((state) => WidgetCategorySlice.Datum(state, props.TabID));
    const cStatus = useAppSelector(WidgetCategorySlice.Status) as Application.Types.Status;
    const [showWarning, setShowWarning] = React.useState<boolean>(false);

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('WidgetCategory.Tab', JSON.stringify(tab));
    }, [tab])

    React.useEffect(() => {
        if (cStatus == 'unintiated' || cStatus == 'changed')
            dispatch(WidgetCategorySlice.Fetch());
    }, [cStatus])

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('WidgetCategory.Tab'))
            return JSON.parse(sessionStorage.getItem('WidgetCategory.Tab'));
        else
            return 'info';
    }

    function deleteTab() {
        dispatch(WidgetCategorySlice.DBAction({
            verb: 'DELETE', record: category
        }));
        window.location.href = homePath + 'index.cshtml?name=SEBrowserTabs'
    }

    if (cStatus == 'unintiated' || cStatus == 'loading')
        return null;

    if (cStatus == 'error')
        return null;

    if (category == null) return null

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row">
                <div className="col">
                    <h2>{category != null ? category.Name : ''}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={category == null} onClick={() => setShowWarning(true)}>Delete Tab</button>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            <div className="tab-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: 'hidden' }}>
                {tab === "info" ? ( <CategoryInfo Tab={category} stateSetter={(record) => dispatch(WidgetCategorySlice.DBAction({ verb: 'PATCH', record: record }))} /> ) : null}
                {tab === "widgets" ? ( <WidgetByCategory CategoryID={category.ID} /> ) : null}
            </div>

            <Warning Title={'Delete ' + (category?.Name ?? 'SE Browser Tab')} Show={showWarning} Message={'This will permanently delete this SE Browser Tab.'} CallBack={(c) => { if (c) deleteTab(); setShowWarning(false) }} />
        </div>
    )
}