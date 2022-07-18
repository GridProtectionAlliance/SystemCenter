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
//
//******************************************************************************************************

import * as React from 'react';
import _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { useHistory } from 'react-router-dom';
import AssetgroupInfoWindow from './AssetGroupInfo';
import AssetAssetGroupWindow from './AssetAssetGroup';
import MeterAssetGroupWindow from './MeterAssetGroup';
import UserAssetGroupWindow from './UserAssetGroup';
import AssetGroupAssetGroupWindow from './AssetGroupAssetGroup';
import { LoadingScreen, TabSelector, Warning } from '@gpa-gemstone/react-interactive';

declare var homePath: string;
declare type Tab = 'info' | 'meter' | 'asset' | 'assetgroup' | 'user' 

function AssetGroup(props: { AssetGroupID: number }) {
    let history = useHistory();
    const [assetGroup, setAssetGroup] = React.useState<OpenXDA.Types.AssetGroup>(null);
    const [allAssetGroups, setAllAssetGroups] = React.useState<Array<OpenXDA.Types.AssetGroup>>([]);
    const [tab, setTabState] = React.useState<string>(getTab());
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
    

    function getTab(): Tab {
        if (sessionStorage.hasOwnProperty('AssetGroup.Tab'))
            return JSON.parse(sessionStorage.getItem('AssetGroup.Tab'));
        else
            return 'info';
    }

    function setTab(tab: Tab): void {
        sessionStorage.setItem('AssetGroup.Tab', JSON.stringify(tab));
        setTabState(tab);
    }

    function getAssetGroup() {
       let handle =  $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/One/${props.AssetGroupID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       })

        handle.done((data: OpenXDA.Types.AssetGroup) => {
           setAssetGroup(data)
        });

        return handle;
    }

    React.useEffect(() => {
        return getData();

    }, [props.AssetGroupID]);


    function getAllAssetGroups(): JQueryXHR {
        let handle =  $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })

        handle.done(aas => setAllAssetGroups(aas));
        return handle;
    }

    function getData() {

        let handle1 = getAssetGroup();
        let handle2 = getAllAssetGroups();

        return function cleanup() {
            if (handle1.abort != null)
                handle1.abort();
            if (handle2.abort != null)
                handle2.abort();
        }
    }

    function deleteAssetGroup(): JQuery.jqXHR {

        let handle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/AssetGroup/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(assetGroup),
            dataType: 'json',
            cache: true,
            async: true
        });
        
        handle.done((msg) => {
            sessionStorage.clear();
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroups'});
        });

        handle.then((d) => setLoadDelete(false))

        return null;

    }


    if (assetGroup == null) return null;

    const Tabs = [
        { Id: "info", Label: "Info" },
        { Id: "asset", Label: "Assets" },
        { Id: "meter", Label: "Meters" },
        { Id: "user", Label: "Users" },
        { Id: "assetgroup", Label: "Asset Groups" }];


    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{assetGroup.Name}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" onClick={() => setShowDelete(true)}>Delete Asset Group</button>
                </div>
            </div>
            <hr />
            <TabSelector CurrentTab={tab} SetTab={setTab} Tabs={Tabs} />
            
            <div className="tab-content" style={{maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "info" ? " active" : "fade")} id="info">
                    <AssetgroupInfoWindow AssetGroup={assetGroup} StateSetter={(data) => setAssetGroup(data)} AllAssetGroups={allAssetGroups} />
                </div>
                <div className={"tab-pane " + (tab == "asset" ? " active" : "fade")} id="asset">
                    <AssetAssetGroupWindow AssetGroupID={props.AssetGroupID} />
                </div>
                <div className={"tab-pane " + (tab == "meter" ? " active" : "fade")} id="meter">
                    <MeterAssetGroupWindow AssetGroupID={props.AssetGroupID} />
                </div>
                <div className={"tab-pane " + (tab == "user" ? " active" : "fade")} id="user">
                    <UserAssetGroupWindow AssetGroupID={props.AssetGroupID} />
                </div>
                <div className={"tab-pane " + (tab == "assetgroup" ? " active" : "fade")} id="assetgroup">
                    <AssetGroupAssetGroupWindow AssetGroupID={props.AssetGroupID} />
                </div>
            </div>
            <Warning Message={'This will permanently delete this Asset Group and cannot be undone'} Show={showDelete} Title={'deleteModal ' + assetGroup.Name} CallBack={(conf) => { if (conf) deleteAssetGroup(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
    )
}

export default AssetGroup;
