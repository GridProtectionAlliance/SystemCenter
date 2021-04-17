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
import { SystemCenter } from '../global';
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';

interface AssetAttributesProps {
    Asset: OpenXDA.Asset,
    NewEdit: SystemCenter.NewEdit,
    UpdateState: (Asset: OpenXDA.Asset) => void,
    AssetTypes: Array<OpenXDA.AssetType>,
    AllAssets: Array<OpenXDA.Asset>,
    GetDifferentAsset: (assetID: number) => void,
    HideSelectAsset: boolean,
    HideAssetType: boolean,
}


export namespace AssetAttributes {

    export function AssetAttributeFields(props: AssetAttributesProps): JSX.Element {

        function changeAssetType(type: OpenXDA.AssetTypeName): void {
            let asset = {
                ID: props.Asset.ID,
                AssetKey: props.Asset.AssetKey,
                AssetName: props.Asset.AssetName,
                AssetType: type,
                Description: props.Asset.Description,
                VoltageKV: props.Asset.VoltageKV,
                Channels: props.Asset.Channels,
                Spare: props.Asset.Spare
            }

            asset = AssetAttributes.getNewAssetAttributes(asset, type);
            asset['AssetTypeID'] = props.AssetTypes.find(ats => ats.Name == type).ID;
            props.UpdateState(asset);
        }

        function valid(field: keyof (OpenXDA.Asset)): boolean {
            if (field == 'AssetKey') {
                if (props.Asset.AssetKey == null || props.Asset.AssetKey.length == 0) return false;
                else if (props.NewEdit == 'New') {
                    if (props.Asset.ID == 0) {
                        return props.AllAssets.map(asset => asset.AssetKey.toLowerCase()).indexOf(props.Asset.AssetKey.toLowerCase()) < 0;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    let oldKey = props.AllAssets.find(aa => aa.ID === props.Asset.ID) == undefined ? '' : props.AllAssets.find(aa => aa.ID === props.Asset.ID).AssetKey;
                    if (oldKey == props.Asset.AssetKey)
                        return true;
                    else
                        return props.AllAssets.map(asset => asset.AssetKey.toLowerCase()).indexOf(props.Asset.AssetKey.toLowerCase()) < 0;
                }
            }
            else if (field == 'AssetName')
                return props.Asset.AssetName != null && props.Asset.AssetName.length > 0;
            else if (field == 'VoltageKV')
                return props.Asset.VoltageKV != null && AssetAttributes.isRealNumber(props.Asset.VoltageKV);
            else if (field == 'Description')
                return true;
            return false;
        }


        if (props.Asset == null)
            return null;

        return (<React.Fragment>
            { !props.HideSelectAsset ?
                <Select<OpenXDA.Asset> Record={props.Asset} Label={'Select Asset'} Field={'ID'}
                    Options={[{ Value: '0', Label: 'Add New' }, ...props.AllAssets.map(a => ({ Value: a.ID.toString(), Label: a.AssetKey }))]}
                    Setter={(asset) => {
                        if (parseInt(asset.ID.toString()) != 0)
                            props.GetDifferentAsset(parseInt(asset.ID.toString()));
                        else
                            props.UpdateState(AssetAttributes.getNewAsset('Line'));
                    }}
                    Disabled={props.NewEdit == 'Edit'}
                /> : null}
            { !props.HideAssetType ?
                <Select<OpenXDA.Asset> Record={props.Asset} Label={'Type'} Field={'AssetType'}
                    Options={props.AssetTypes.filter(item => item.Name != 'LineSegment').map(type => ({ Value: type.Name, Label: type.Name }))}
                    Setter={(asset) => {
                        changeAssetType(asset.AssetType)
                    }}
                    Disabled={props.NewEdit == 'Edit' || props.Asset.ID != 0}
                /> : null}
            <Input<OpenXDA.Asset> Record={props.Asset} Field={'AssetKey'} Label={'Key'} Feedback={'A unique key of less than 50 characters is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Asset> Record={props.Asset} Field={'AssetName'} Label={'Name'} Feedback={'Name must be less than 200 and is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Asset> Record={props.Asset} Field={'VoltageKV'} Label={'Nominal Voltage (L-L kV)'} Feedback={'Nominal Voltage requires a numerical value.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <TextArea<OpenXDA.Asset> Rows={3} Record={props.Asset} Field={'Description'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
        </React.Fragment >
        );
    }

    export function getNewAsset(type: OpenXDA.AssetTypeName): OpenXDA.DetailedAsset {
        let asset: OpenXDA.Asset = {
            ID: 0,
            AssetKey: null,
            AssetName: null,
            AssetType: type,
            Description: null,
            VoltageKV: null,
            Spare: false,
            Channels: []
        }

        asset = AssetAttributes.getNewAssetAttributes(asset, type);
        return asset;
    }

    export function getNewLineDetails(): OpenXDA.LineDetail {
        let asset: OpenXDA.LineDetail = {
            Length: 0,
            X0: 0,
            R0: 0,
            X1: 0,
            R1: 0,
            ThermalRating: 0,
        }

        return asset;
    }

    export function getNewAssetAttributes(asset: OpenXDA.Asset, type: OpenXDA.AssetTypeName): OpenXDA.DetailedAsset {
        if (type == 'Line') {
            let record = asset as OpenXDA.Line;
            record.MaxFaultDistance = null;
            record.MinFaultDistance = null;
            record.Detail = this.getNewAsset('LineSegment') as OpenXDA.LineSegment;

            return record;
        }
        else if (type == 'Breaker') {
            let record = asset as OpenXDA.Breaker;
            record.ThermalRating = null;
            record.Speed = null;
            record.TripTime = null;
            record.PickupTime = null;
            record.TripCoilCondition = null;
            return record;
        }
        else if (type == 'Bus') {
            let record = asset as OpenXDA.Bus;
            return record
        }
        else if (type == 'CapacitorBankRelay') {
            let record = asset as OpenXDA.CapBankRelay;
            return record
        }
        else if (type == 'CapacitorBank') {
            let record = asset as OpenXDA.CapBank;
            record.NumberOfBanks = null;
            record.CapacitancePerBank = null;
            return record;

        }
        else if (type == 'LineSegment') {
            let record = asset as OpenXDA.LineSegment;
            record.R0 = null;
            record.X0 = null;
            record.R1 = null;
            record.X1 = null;
            record.ThermalRating = null;
            record.Length = null;
            return record
        }
        else {
            let record = asset as OpenXDA.Transformer;
            record.R0 = null;
            record.X0 = null;
            record.R1 = null;
            record.X1 = null;
            record.ThermalRating = null;
            record.PrimaryVoltageKV = null;
            record.SecondaryVoltageKV = null;
            record.Tap = null;
            return record
        }


    }

    export function isInteger(value: any) {
        var regex = /^-?[0-9]+$/;
        return value.toString().match(regex) != null;
    }

    export function isRealNumber(value: any) {
        var regex = /^-?[0-9]+(\.[0-9]+)?$/;
        return value.toString().match(regex) != null;
    }

    export function AttributeError(asset: OpenXDA.DetailedAsset): string[]  {
        let errors = [];

        if (asset.AssetKey == null || asset.AssetKey.length == 0)
            errors.push('A Key is required.')
        if (asset.AssetName == null || asset.AssetName.length == 0)
            errors.push('A Name is required.')
        if (asset.VoltageKV == null || !AssetAttributes.isRealNumber(asset.VoltageKV))
            errors.push('A valid nominal Voltage is required.')

        return errors;

    }

    export function AssetError(asset: OpenXDA.DetailedAsset, type: OpenXDA.AssetTypeName): string[] {
        let errors = [];

        errors = AttributeError(asset);

        if (type == 'LineSegment') {
            if ((asset as OpenXDA.LineSegment).Length == null || !AssetAttributes.isRealNumber((asset as OpenXDA.LineSegment).Length))
                errors.push('A valid Length is required.')
            if ((asset as OpenXDA.LineSegment).R0 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.LineSegment).R0))
                errors.push('A valid R0 is required.')
            if ((asset as OpenXDA.LineSegment).X0 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.LineSegment).X0))
                errors.push('A valid X0 is required.')
            if ((asset as OpenXDA.LineSegment).R1 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.LineSegment).R1))
                errors.push('A valid R1 is required.')
            if ((asset as OpenXDA.LineSegment).X1 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.LineSegment).X1))
                errors.push('A X1 Length is required.')
            if ((asset as OpenXDA.LineSegment).ThermalRating == null || !AssetAttributes.isRealNumber((asset as OpenXDA.LineSegment).ThermalRating))
                errors.push('A valid ThermalRating is required.')
        }


        return errors;
    }
}

