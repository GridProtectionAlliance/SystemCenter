//******************************************************************************************************
//  Asset.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//  10|16|2023 - Ariana Armstrong
//       Included a conditional rendering statement for 'Channels' tab.
//
//******************************************************************************************************

import * as React from 'react';
import _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings'
import AssetInfoWindow from './AssetInfo';
import AssetLocationWindow from './AssetLocation';
import AssetMeterWindow from './AssetMeter';
import AssetChannelWindow from './AssetChannel';
import { useHistory } from 'react-router-dom';
import NoteWindow from '../CommonComponents/NoteWindow';
import AssetConnectionWindow from './AssetConnection';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import { getAssetTypes } from '../../../TS/Services/Asset';
import LineSegmentWindow from '../AssetAttribute/LineSegmentWindow';
import { LoadingScreen, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import SourceImpedanceWindow from '../AssetAttribute/SourceImpedanceWindow';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;
declare type Tab = 'notes' | 'assetInfo' | 'substations' | 'meters' | 'connections' | 'additionalFields' | 'extDB' | 'segments' | 'sourceImpedances' | 'channels';

interface IProps { AssetID: number, Tab: Tab }

function Asset(props: IProps) {
    let history = useHistory();
    const [asset, setAsset] = React.useState<OpenXDA.Types.Asset>(null);
    const [tab, setTab] = React.useState(getTab());
    const [assetType, setAssetType] = React.useState<OpenXDA.Types.AssetTypeName>(null);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
    const [forceReload, setForceReload] = React.useState<boolean>(false);
    const roles = useAppSelector(SelectRoles);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;

        let key = 'Asset.Tab';
        if (assetType == 'Line')
            key = 'Line.Tab';

        if (sessionStorage.hasOwnProperty(key))
                return JSON.parse(sessionStorage.getItem(key));
        return 'assetInfo';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab) {
            let key = 'Asset.Tab';
            if (assetType == 'Line')
                key = 'Line.Tab';
            sessionStorage.setItem(key, JSON.stringify(tab)); 
        }
            
    }, [tab]);

    function getAsset() {
        return    $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/One/${props.AssetID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       })
    }

    function getAssetType(asset: OpenXDA.Types.Asset): void {
        getAssetTypes().done((assetTypes: Array<OpenXDA.Types.AssetType>) => {
            let assetType = assetTypes.find(at => at.ID == asset['AssetTypeID'])
            setAssetType(assetType.Name);
            setAsset((cur) => ({ ...cur, AssetType: assetType.Name }));
        });
    }

    function deleteAsset(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Asset/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(asset),
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done((msg) => {
            sessionStorage.clear();
            if (window.location.href.includes('LineSegment'))
                history.push({ pathname: homePath + 'index.cshtml', search: '?name=LineSegments' });
            else
                history.push({ pathname: homePath + 'index.cshtml', search: '?name=Assets' });
        });
        handle.then((d) => setLoadDelete(false))
        return handle;
    }

    React.useEffect(() => {
        if (props.AssetID == undefined) return () => { };
        let handle = getAsset();
        handle.done((data: OpenXDA.Types.Asset) => {
            setAsset(data)
            getAssetType(data)
        });
        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.AssetID, forceReload]);

    if (asset == null) return null;

    const Tabs = [
        { Id: "notes", Label: "Notes" },
        { Id: "assetInfo", Label: "Info" },
        { Id: "additionalFields", Label: "Additional Fields" },
        { Id: "substations", Label: "Substations" },
        { Id: "meters", Label: "Meters" },
        { Id: "channels", Label: "Channels" },
        { Id: "connections", Label: "Connections" },
    ];

    if (assetType == 'Line') {
        Tabs.push({ Id: "segments", Label: "Line Segments" });
        Tabs.push({ Id: "sourceImpedances", Label: "Source Impedances" });
    }
    //if (assetType == 'Breaker' || assetType == 'CapacitorBank' || assetType == 'Line' || assetType == 'Transformer' || assetType == 'Bus')
    //    Tabs.push({ Id: "extDB", Label: "External DB" });

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }
    
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', padding: 15, display: 'flex', flexDirection: 'column' }}>
            <div className="row">
                <div className="col">
                    <h2>{asset != null ? asset.AssetName + ' (' + asset.AssetKey + ')': ''}</h2>
                </div>
                <div className="col">
                    <button className={"btn btn-danger pull-right"} hidden={(asset == null) || !hasPermissions()} onClick={() => { if (hasPermissions()) setShowDelete(true) }}>Delete Asset</button>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            <div className="tab-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {tab === 'notes' ? <NoteWindow ID={asset.ID} Type='Asset' /> : null}
                {tab === 'assetInfo' ? <AssetInfoWindow Asset={asset} StateSetter={setAsset} />: null}
                {tab === 'additionalFields' ? <AdditionalFieldsWindow ID={asset.ID} Type={(assetType == null) ? "Asset" : assetType} Tab={tab} />: null}
                {tab === 'substations' ? <AssetLocationWindow Asset={asset} />: null}
                {tab === 'meters' ? <AssetMeterWindow Asset={asset} />: null}
                {tab === "channels" ? <AssetChannelWindow Name={asset.AssetName} ID={asset.ID} />: null}
                {tab === 'connections' ? <AssetConnectionWindow Name={asset.AssetName} ID={asset.ID} TypeID={asset["AssetTypeID"]} />: null}
                {tab === 'sourceImpedances' ? <SourceImpedanceWindow ID={asset.ID} />: null}
                {tab === 'segments' ? <LineSegmentWindow ID={asset.ID} LineKey={asset.AssetKey} LineName={asset.AssetName} OnChange={() => { setForceReload(x => !x) }} />: null}
            </div>

            <Warning Message={'This will permanently delete this Asset and cannot be undone.'} Show={showDelete} Title={'Delete ' + (asset?.AssetName ?? 'Asset')} CallBack={(conf) => { if (conf) deleteAsset(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
    )
}

export default Asset;
