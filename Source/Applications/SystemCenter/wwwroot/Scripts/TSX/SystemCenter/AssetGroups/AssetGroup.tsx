//******************************************************************************************************
//  AssetGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
//       Generated original version of source code.
//  10|9|23 - Ariana Armstrong
//    Revised hooks to handle side effects related to data fetching and storge for AssetGroupInfoWindow
//******************************************************************************************************

import * as React from 'react';
import _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { useHistory } from 'react-router-dom';
import AssetgroupInfoWindow from './AssetGroupInfo';
import AssetAssetGroupWindow from './AssetAssetGroup';
import MeterAssetGroupWindow from './MeterAssetGroup';
import AssetGroupAssetGroupWindow from './AssetGroupAssetGroup';
import { LoadingScreen, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { AssetGroupSlice } from '../Store/Store';
import { useAppSelector, useAppDispatch } from '../hooks';


declare var homePath: string;
declare type Tab = 'info' | 'meter' | 'asset' | 'assetgroup'

interface IProps { AssetGroupID: number, Tab: Tab }

function AssetGroup(props: IProps) {
    let history = useHistory();
    const dispatch = useAppDispatch();
    const [tab, setTab] = React.useState(getTab());
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const group = useAppSelector((state) => AssetGroupSlice.Datum(state, props.AssetGroupID)) as OpenXDA.Types.AssetGroup;
    const gStatus = useAppSelector(AssetGroupSlice.Status) as Application.Types.Status;
    const allAssetGroup = useAppSelector(AssetGroupSlice.Data);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('AssetGroup.Tab'))
            return JSON.parse(sessionStorage.getItem('AssetGroup.Tab'));
        else
            return 'info';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('AssetGroup.Tab', JSON.stringify(tab));
    }, [tab]);

    React.useEffect(() => {
        if (gStatus == 'unintiated' || gStatus == 'changed')
            dispatch(AssetGroupSlice.Fetch());
    }, [gStatus])

    function deleteAssetGroup() {
        dispatch(AssetGroupSlice.DBAction({
            verb: 'DELETE', record: group
        }));
        window.location.href = homePath + 'index.cshtml?name=AssetGroups'
    }

    if (gStatus == 'unintiated')
        return null;

    if (gStatus == 'error')
        return null;

    if (group == null) return null;

    const Tabs = [
        { Id: "info", Label: "Asset Group Info" },
        { Id: "asset", Label: "Assets" },
        { Id: "meter", Label: "Meters" },
        { Id: "assetgroup", Label: "Asset Subgroups" }];

    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{group.Name}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" onClick={() => setShowDelete(true)}>Delete Asset Group</button>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            <div className="tab-content" style={{maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "info" ? " active" : "fade")} id="info">
                    <AssetgroupInfoWindow AssetGroup={group} StateSetter={(data) => dispatch(AssetGroupSlice.DBAction({ verb: 'PATCH', record: data }))} AllAssetGroups={allAssetGroup} />
                </div>
                <div className={"tab-pane " + (tab == "asset" ? " active" : "fade")} id="asset">
                    <AssetAssetGroupWindow AssetGroupID={props.AssetGroupID} />
                </div>
                <div className={"tab-pane " + (tab == "meter" ? " active" : "fade")} id="meter">
                    <MeterAssetGroupWindow AssetGroupID={props.AssetGroupID} />
                </div>
                <div className={"tab-pane " + (tab == "assetgroup" ? " active" : "fade")} id="assetgroup">
                    <AssetGroupAssetGroupWindow AssetGroupID={props.AssetGroupID} />
                </div>
            </div>

            <Warning Message={'This will permanently delete this Asset Group and cannot be undone.'} Show={showDelete} Title={'Delete ' + (group?.Name ?? 'Asset Group')} CallBack={(conf) => { if (conf) deleteAssetGroup(); setShowDelete(false); }} />
            <LoadingScreen Show={gStatus == 'loading'} />
        </div>
    )
}

export default AssetGroup;
