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
//
//******************************************************************************************************

import * as React from 'react';
import _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings'
import AssetInfoWindow from './AssetInfo';
import AssetLocationWindow from './AssetLocation';
import AssetMeterWindow from './AssetMeter';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';

import { useNavigate } from 'react-router-dom';
import NoteWindow from '../CommonComponents/NoteWindow';
import AssetConnectionWindow from './AssetConnection';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import { getAssetTypes } from '../../../TS/Services/Asset';
import LineSegmentWindow from '../AssetAttribute/LineSegmentWindow';
import { LoadingScreen, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
declare var homePath: string;
declare type Tab = 'notes' | 'assetInfo' | 'substations' | 'meters' | 'connections' | 'additionalFields' | 'extDB' | 'Segments'

function Asset(props: { AssetID: number }) {
    let history = useNavigate();
    const [asset, setAsset] = React.useState<OpenXDA.Types.Asset>(null);
    const [tab, setTabState] = React.useState<string>(getTab());
    const [assetType, setAssetType] = React.useState<OpenXDA.Types.AssetTypeName>(null);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);

    function getTab(): Tab {
        if (sessionStorage.hasOwnProperty('Asset.Tab'))
            return JSON.parse(sessionStorage.getItem('Asset.Tab'));
        else
            return 'notes';
    }

    function setTab(tab: Tab): void {
        sessionStorage.setItem('Asset.Tab', JSON.stringify(tab));
        setTabState(tab);
    }

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
            history({ pathname: homePath + 'index.cshtml', search: '?name=Assets' });
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

        
    }, [props.AssetID]);

    if (asset == null) return null;

    const Tabs = [
        { Id: "notes", Label: "Notes" },
        { Id: "assetInfo", Label: "Asset Info" },
        { Id: "additionalFields", Label: "Additional Fields" },
        { Id: "substations", Label: "Substations" },
        { Id: "meters", Label: "Meters" },
        { Id: "connections", Label: "Connections" },
       ];

    if (assetType == 'Line')
        Tabs.push({ Id: "Segments", Label: "Line Segments" });
    if (assetType == 'Breaker' || assetType == 'CapacitorBank' || assetType == 'Line' || assetType == 'Transformer' || assetType == 'Bus')
        Tabs.push({ Id: "extDB", Label: "External DB" });

    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{asset != null ? asset.AssetKey : ''}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={asset == null} onClick={() => setShowDelete(true)}>Delete Asset</button>
                </div>
            </div>


            <hr />
            <TabSelector CurrentTab={tab} SetTab={setTab} Tabs={Tabs} />
             
            <div className="tab-content" style={{maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "notes" ? " active" : "fade")} id="notes">
                    <NoteWindow ID={asset.ID} Type='Asset' />
                </div>
                <div className={"tab-pane " + (tab == "assetInfo" ? " active" : "fade")} id="assetInfo">
                    <AssetInfoWindow Asset={asset} StateSetter={setAsset} />
                </div>
                <div className={"tab-pane " + (tab == "additionalFields" ? " active" : "fade")} id="additionalFields">
                    <AdditionalFieldsWindow ID={asset.ID} Type={(assetType == null) ? "Asset" : assetType} Tab={tab}/>
                </div>
                <div className={"tab-pane " + (tab == "substations" ? " active" : "fade")} id="substations">
                    <AssetLocationWindow Asset={asset} />
                </div>
                <div className={"tab-pane " + (tab == "meters" ? " active" : "fade")} id="meters">
                    <AssetMeterWindow Asset={asset} />
                </div>
                <div className={"tab-pane " + (tab == "connections" ? " active" : "fade")} id="connections">
                    <AssetConnectionWindow Asset={asset} />
                </div>
                <div className={"tab-pane " + (tab == "extDB" ? " active" : "fade")} id="extDB">
                    <ExternalDBUpdate ID={asset.ID} Type={(assetType == null) ? "Asset" : assetType} Tab={tab} />
                </div>
                <div className={"tab-pane " + (tab == "Segments" ? " active" : "fade")} id="Segments">
                    <LineSegmentWindow ID={asset.ID}/>
                </div>
            </div>
            <Warning Message={'This will permanently Delete this Asset and can not be undone.'} Show={showDelete} Title={'Delete Asset ' + asset.AssetName} CallBack={(conf) => { if (conf) deleteAsset(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
    )
}

export default Asset;
