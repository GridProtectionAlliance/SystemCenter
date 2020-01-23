//******************************************************************************************************
//  MeterInfo.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  09/09/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
import { OpenXDA } from '../global';
import AssetAttributes from '../AssetAttribute/Asset';
import { getEDNAPoint, getLineSegment, getAssetTypes, getSpareBreaker, getAsset} from '../../../TS/Services/Asset';
import BreakerAttributes from '../AssetAttribute/Breaker';
import BusAttributes from '../AssetAttribute/Bus';
import CapBankAttributes from '../AssetAttribute/CapBank';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
declare var homePath: string;

export default class AssetInfoWindow extends React.Component<{ Asset: OpenXDA.Asset, StateSetter: (asset: OpenXDA.Asset) => void }, { Asset: OpenXDA.Asset, AssetTypes: Array<OpenXDA.AssetType>, }, {}> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            Asset: this.props.Asset,
            AssetTypes: [],
        }

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        getAssetTypes().then((assetTypes: Array<OpenXDA.AssetType>) => {
            this.setState({ AssetTypes: assetTypes });
            let assetType = assetTypes.find(at => at.ID == this.state.Asset['AssetTypeID'])

            getAsset(this.props.Asset.ID,  assetType.Name);
        });
    }

    componentWillReceiveProps(nextProps): void {
        if (nextProps.Asset != this.state.Asset)
            this.setState({ Asset: nextProps.Asset }, () => {
                let assetType = this.state.AssetTypes.find(at => at.ID == this.state.Asset['AssetTypeID'])
                getAsset(this.state.Asset.ID, assetType.Name);
            });
    }

    //getAsset(): void {
    //    let assetType = this.state.AssetTypes.find(at => at.ID == this.state.Asset['AssetTypeID'])
    //    $.ajax({
    //        type: "GET",
    //        url: `${homePath}api/OpenXDA/${assetType.Name}/One/${this.state.Asset.ID}`,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: 'json',
    //        cache: true,
    //        async: true
    //    }).done((asset: OpenXDA.Asset) => {
    //        asset.AssetType = assetType.Name;
    //        asset.Channels = [];

    //        if (asset.AssetType == 'Breaker')
    //            getEDNAPoint(asset.ID).done(ednaPoint => {
    //                let record: OpenXDA.Breaker = asset as OpenXDA.Breaker;
    //                if (ednaPoint != undefined) {
    //                    record.EDNAPoint = ednaPoint.Point
    //                    this.setState({ Asset: record }, () => this.props.StateSetter(record));
    //                }
    //                getSpareBreaker(asset.ID).done(spare => {
    //                    if (spare != null) {
    //                        record.SpareBreakerID = spare.ID;
    //                        this.setState({ Asset: record }, () => this.props.StateSetter(record));
    //                    }
    //                });
    //            });
    //        else if (asset.AssetType == 'Line')
    //            getLineSegment(asset.ID).done(lineSegment => {
    //                let record: OpenXDA.Line = asset as OpenXDA.Line;
    //                if (lineSegment != undefined) {
    //                    record.Segment = lineSegment
    //                }
    //                else {
    //                    record.Segment = AssetAttributes.getNewAsset('LineSegment') as OpenXDA.LineSegment;
    //                }

    //                this.setState({ Asset: record }, () => this.props.StateSetter(record));

    //            });

    //        this.setState({ Asset: asset }, () => this.props.StateSetter(asset));
    //    });
    //}

    updateAsset(): void {
       $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/${this.state.Asset.AssetType}/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Asset),
            dataType: 'json',
            cache: true,
            async: true
       }).done((asset: OpenXDA.Asset) => {
           this.props.StateSetter(this.state.Asset);
       });
    }

    showAttributes(): JSX.Element {
        if (this.state.Asset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={'Edit'} Asset={this.state.Asset as OpenXDA.Breaker} UpdateState={this.updateState} ShowSpare={true} />;
        else if (this.state.Asset.AssetType == 'Bus')
            return <BusAttributes NewEdit={'Edit'} Asset={this.state.Asset} UpdateState={this.updateState} />;
        else if (this.state.Asset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={'Edit'} Asset={this.state.Asset as OpenXDA.CapBank} UpdateState={this.updateState} />;
        else if (this.state.Asset.AssetType == 'Line')
            return <LineAttributes NewEdit={'Edit'} Asset={this.state.Asset as OpenXDA.Line} UpdateState={this.updateState} />;
        else if (this.state.Asset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={'Edit'} Asset={this.state.Asset as OpenXDA.Transformer} UpdateState={this.updateState} />;
    }


    updateState(asset: OpenXDA.Asset) {
        this.setState({ Asset: asset });
    }

    render() {
        if (this.props.Asset == null) return null;
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Asset Information:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <AssetAttributes Asset={this.state.Asset} NewEdit='Edit' AssetTypes={this.state.AssetTypes} AllAssets={[]} UpdateState={this.updateState} GetDifferentAsset={() => { }} />
                        </div>
                        <div className="col">
                            {this.showAttributes()}
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" type="submit" onClick={() => this.updateAsset()} disabled={this.state.Asset == this.props.Asset}>Save Changes</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={() => this.setState({ Asset: this.props.Asset })} disabled={this.state.Asset == this.props.Asset}>Clear Changes</button>
                    </div>
                </div>

            </div>
        );
    }
}
