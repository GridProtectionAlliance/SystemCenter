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
//  01/17/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '../global';
import { NewEdit } from '../global';

interface AssetAttributesProps {
    Asset: OpenXDA.Asset,
    NewEdit: NewEdit,
    UpdateState: (Asset: OpenXDA.Asset) => void,
    AssetTypes: Array<OpenXDA.AssetType>,
    AllAssets: Array<OpenXDA.Asset>,
    GetDifferentAsset: (assetID: number) => void,
}
export default class AssetAttributes extends React.Component<AssetAttributesProps, {}, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    componentDidMount() {
    }


    static getNewAsset(type: OpenXDA.AssetTypeName): OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.LineSegment | OpenXDA.Transformer {
        let asset: OpenXDA.Asset = {
            ID: 0,
            AssetKey: '',
            AssetName: '',
            AssetType: type,
            Description: '',
            VoltageKV: 0,
            Spare: false,
            Channels: []
        }

        asset = AssetAttributes.getNewAssetAttributes(asset, type);

        return asset;
    }

    static getNewAssetAttributes(asset: OpenXDA.Asset, type: OpenXDA.AssetTypeName): OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.LineSegment | OpenXDA.Transformer {
        if (type == 'Line') {
            let record = asset as OpenXDA.Line;
            record.MaxFaultDistance = 0;
            record.MinFaultDistance = 0;
            record.Segment = this.getNewAsset('LineSegment') as OpenXDA.LineSegment;

            return record;
        }
        else if (type == 'Breaker') {
            let record = asset as OpenXDA.Breaker;
            record.ThermalRating = 0;
            record.Speed = 0;
            record.TripTime = 0;
            record.PickupTime = 0;
            record.TripCoilCondition = 0;
            return record;
        }
        else if (type == 'Bus') {
            let record = asset as OpenXDA.Bus;
            return record
        }
        else if (type == 'CapacitorBank') {
            let record = asset as OpenXDA.CapBank;
            record.NumberOfBanks = 0;
            record.CansPerBank = 0;
            record.CapacitancePerBank = 0;
            return record;

        }
        else if (type == 'LineSegment') {
            let record = asset as OpenXDA.LineSegment;
            record.R0 = 0;
            record.X0 = 0;
            record.R1 = 0;
            record.X1 = 0;
            record.ThermalRating = 0;
            record.Length = 0;
            return record
        }
        else {
            let record = asset as OpenXDA.Transformer;
            record.R0 = 0;
            record.X0 = 0;
            record.R1 = 0;
            record.X1 = 0;
            record.ThermalRating = 0;
            record.PrimaryVoltageKV = 0;
            record.SecondaryVoltageKV = 0;
            record.Tap = 0;
            return record
        }


    }

    changeAssetType(type: OpenXDA.AssetTypeName): void {
        let asset = {
            ID: this.props.Asset.ID,
            AssetKey: this.props.Asset.AssetKey,
            AssetName: this.props.Asset.AssetName,
            AssetType: type,
            Description: this.props.Asset.Description,
            VoltageKV: this.props.Asset.VoltageKV,
            Channels: this.props.Asset.Channels,
            Spare: this.props.Asset.Spare
        }

        asset = AssetAttributes.getNewAssetAttributes(asset, type);
        this.props.UpdateState(asset);
    }

    valid(field: keyof (OpenXDA.Asset)): boolean {       
        if (field == 'AssetKey') {
            if (this.props.Asset.AssetKey.length == 0) return false;
            else if (this.props.NewEdit == 'New') {
                if (this.props.Asset.ID == 0) {
                    return this.props.AllAssets.map(asset => asset.AssetKey.toLowerCase()).indexOf(this.props.Asset.AssetKey.toLowerCase()) < 0;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        else if (field == 'AssetName')
            return this.props.Asset.AssetName.length > 0;
        else if (field == 'VoltageKV')
            return this.props.Asset.VoltageKV.toString().length != 0 && !isNaN(this.props.Asset.VoltageKV);
        return false;
    }

    render() {
        if (this.props.Asset == null) return null;
        return (
            <>
            <div className="form-group" hidden={this.props.NewEdit == 'Edit'}>
                <label>Select Asset</label>
                <select className="form-control" value={this.props.Asset.ID.toString()} disabled={this.props.NewEdit == 'Edit'} onChange={(evt) => {
                    if (evt.target.value != "0")
                        this.props.GetDifferentAsset(parseInt(evt.target.value));
                    else
                        this.props.UpdateState(AssetAttributes.getNewAsset('Line'));
                }}>
                    <option key={0} value="0">Add New</option>

                    {
                        this.props.AllAssets.map((asset, index) => <option key={index + 1} value={asset.ID} >{asset.AssetKey}</option>)
                    }

                </select>
            </div>

            <div className="form-group">
                <label>Type</label>
                <select className="form-control" value={this.props.Asset.AssetType} onChange={(evt) => {
                    this.changeAssetType(evt.target.value as 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer')
                }} disabled={this.props.NewEdit == 'Edit' || this.props.Asset.ID != 0}>
                    {
                        this.props.AssetTypes.map(assetType => <option value={assetType.Name} key={assetType.ID} hidden={assetType.Name == 'LineSegment'}>{assetType.Name}</option>)
                    }

                </select>
            </div>

            <div className="form-group">
                <label>Key</label>
                <input className={(this.valid('AssetKey') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    let asset = _.clone(this.props.Asset, true);
                    asset.AssetKey = evt.target.value;

                    this.props.UpdateState(asset);
                }} value={this.props.Asset.AssetKey} required={true} disabled={this.props.NewEdit == 'New' && this.props.Asset.ID != 0} />
                <div className='invalid-feedback'>{(this.props.AllAssets.map(asset => asset.AssetKey.toLowerCase()).indexOf(this.props.Asset.AssetKey.toLowerCase()) < 0 ? 'A unique key is required.' : 'The key provided is not unique.')}</div>
            </div>

            <div className="form-group">
                <label>Name</label>
                <input className={(this.valid('AssetName')? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(this.props.Asset, true);
                    asset.AssetName = evt.target.value;
                    this.props.UpdateState(asset);
                }} value={this.props.Asset.AssetName} disabled={this.props.NewEdit == 'New' && this.props.Asset.ID != 0} />
                <div className='invalid-feedback'>Name is a required field.</div>
            </div>

            <div className="form-group">
                <label>Nominal Voltage (kV)</label>
                <input className={(this.valid('VoltageKV') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(this.props.Asset, true);
                    asset.VoltageKV = evt.target.value;

                    this.props.UpdateState(asset);
                }} value={this.props.Asset.VoltageKV} disabled={this.props.NewEdit == 'New' && this.props.Asset.ID != 0} />
                <div className='invalid-feedback'>Nominal Voltage requires a numerical value.</div>
            </div>


            <div className="form-group">
                <label>Description</label>
                <textarea rows={2} className="form-control" onChange={(evt) => {
                    var asset: OpenXDA.Asset = _.clone(this.props.Asset, true);
                    if (evt.target.value != "")
                        asset.Description = evt.target.value;
                    else
                        asset.Description = null;

                    this.props.UpdateState(asset);
                }} value={this.props.Asset.Description != null ? this.props.Asset.Description : ''} disabled={this.props.NewEdit == 'New' && this.props.Asset.ID != 0} />
            </div>
        </>
        );
    }
}