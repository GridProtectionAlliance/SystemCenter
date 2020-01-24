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
import * as _ from 'lodash';
import { OpenXDA } from '../global';
import AssetNoteWindow from './AssetNote';
import AssetInfoWindow from './AssetInfo';
import AssetLocationWindow from './AssetLocation';
declare var homePath: string;
declare type Tab = 'notes' | 'assetInfo' | 'substations' | 'meters'
export default class Asset extends React.Component<{ AssetID: number }, { Asset: OpenXDA.Asset, Tab: Tab }, {}>{
    constructor(props, context) {
        super(props, context);

        this.state = {
            Asset: null,
            Tab: this.getTab()
        }
    }

    getTab(): Tab {
        if (sessionStorage.hasOwnProperty('Asset.Tab'))
            return JSON.parse(sessionStorage.getItem('Asset.Tab'));
        else
            return 'notes';
    }

    getAsset(): void {
        if (this.props.AssetID == undefined) return;
       $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/One/${this.props.AssetID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       }).done((data: OpenXDA.Asset) => this.setState({ Asset: data }));
    }

    deleteAsset(): JQuery.jqXHR {
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Asset/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Asset),
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    setTab(tab:Tab): void {
        sessionStorage.setItem('Asset.Tab', JSON.stringify(tab));
        this.setState({Tab: tab});
    }
    
    componentDidMount() {
        this.getAsset();
    }

    componentWillUnmount() {
        sessionStorage.clear();
    }

    render() {
        if (this.state.Asset == null) return null;
        return (
            <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
                <div className="row">
                    <div className="col">
                        <h2>{this.state.Asset != null ? this.state.Asset.AssetKey : ''}</h2>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger pull-right" hidden={this.state.Asset == null} onClick={() => this.deleteAsset().done(() => window.location.href = homePath + 'index.cshtml?name=Assets')}>Delete Asset (Permanent)</button>
                    </div>
                </div>


                <hr />
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={"nav-link" + (this.state.Tab == "notes" ? " active" : "")} onClick={() => this.setTab('notes')} data-toggle="tab" href="#notes">Notes</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (this.state.Tab == "assetInfo" ? " active" : "")} onClick={() => this.setTab('assetInfo')} data-toggle="tab" href="#assetInfo">Asset Info</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (this.state.Tab == "substations" ? " active" : "")} onClick={() => this.setTab('substations')} data-toggle="tab" href="#substations">Substations</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (this.state.Tab == "meters" ? " active" : "")} onClick={() => this.setTab('meters')} data-toggle="tab" href="#meters">Meters</a>
                    </li>
                </ul>
             
                <div className="tab-content" style={{maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                    <div className={"tab-pane " + (this.state.Tab == "notes" ? " active" : "fade")} id="notes">
                        <AssetNoteWindow AssetID={this.state.Asset.ID} />
                    </div>
                    <div className={"tab-pane " + (this.state.Tab == "assetInfo" ? " active" : "fade")} id="assetInfo">
                        <AssetInfoWindow Asset={this.state.Asset} StateSetter={(asset) => this.setState({Asset:asset})} />
                    </div>
                    <div className={"tab-pane " + (this.state.Tab == "substations" ? " active" : "fade")} id="substations">
                        <AssetLocationWindow Asset={this.state.Asset} />
                    </div>
                    <div className={"tab-pane " + (this.state.Tab == "meters" ? " active" : "fade")} id="meters">
                    </div>

                </div>                
            </div>
        )
    }
}

