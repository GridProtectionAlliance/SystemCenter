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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';

interface AssetAttributesProps {
    Asset: OpenXDA.Types.Asset,
    NewEdit: Application.Types.NewEdit,
    UpdateState: (Asset: OpenXDA.Types.Asset) => void,
    AssetTypes: Array<OpenXDA.Types.AssetType>,
    AllAssets: Array<OpenXDA.Types.Asset>,
    GetDifferentAsset: (assetID: number) => void,
    HideSelectAsset: boolean,
    HideAssetType: boolean,
}


export namespace AssetAttributes {

    export function AssetAttributeFields(props: AssetAttributesProps): JSX.Element {

        function changeAssetType(type: OpenXDA.Types.AssetTypeName): void {
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

        function valid(field: keyof (OpenXDA.Types.Asset)): boolean {
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
                <Select<OpenXDA.Types.Asset> Record={props.Asset} Label={'Select Asset'} Field={'ID'}
                    Options={[{ Value: '0', Label: 'Add New' }, ...props.AllAssets.map(a => ({ Value: a.ID.toString(), Label: a.AssetKey }))]}
                    Setter={(asset) => {
                        if (parseInt(asset.ID.toString()) != 0)
                            props.GetDifferentAsset(parseInt(asset.ID.toString()));
                        else
                            props.UpdateState(AssetAttributes.getNewAsset('Line'));
                    }}
                    //Disabled={props.NewEdit == 'Edit'}
                /> : null}
            { !props.HideAssetType ?
                <Select<OpenXDA.Types.Asset> Record={props.Asset} Label={'Type'} Field={'AssetType'}
                    Options={props.AssetTypes.filter(item => item.Name != 'LineSegment' || props.Asset.AssetType == 'LineSegment').map(type => ({ Value: type.Name, Label: type.Name }))}
                    Setter={(asset) => {
                        changeAssetType(asset.AssetType)
                    }}
                    Disabled={props.NewEdit == 'Edit' || props.Asset.ID != 0}
                /> : null}
            <Input<OpenXDA.Types.Asset> Record={props.Asset} Field={'AssetKey'} Label={'Key'} Feedback={'A unique key of less than 50 characters is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Asset> Record={props.Asset} Field={'AssetName'} Label={'Name'} Feedback={'Name must be less than 200 characters and is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Asset> Record={props.Asset} Field={'VoltageKV'} Label={'Nominal Voltage (L-L kV)'} Feedback={'Nominal Voltage requires a numerical value.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <TextArea<OpenXDA.Types.Asset> Rows={3} Record={props.Asset} Field={'Description'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
        </React.Fragment >
        );
    }

    export function getNewAsset(type: OpenXDA.Types.AssetTypeName): OpenXDA.Types.DetailedAsset {
        let asset: OpenXDA.Types.Asset = {
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

    export function getNewLineDetails(): OpenXDA.Types.LineDetail {
        let asset: OpenXDA.Types.LineDetail = {
            Length: 0,
            X0: 0,
            R0: 0,
            X1: 0,
            R1: 0,
            ThermalRating: 0,
        }

        return asset;
    }

    export function getNewAssetAttributes(asset: OpenXDA.Types.Asset, type: OpenXDA.Types.AssetTypeName): OpenXDA.Types.DetailedAsset {
        if (type == 'Line') {
            let record = asset as OpenXDA.Types.Line;
            record.MaxFaultDistance = null;
            record.MinFaultDistance = null;
            record.Detail = this.getNewAsset('LineSegment') as OpenXDA.Types.LineSegment;

            return record;
        }
        else if (type == 'Breaker') {
            let record = asset as OpenXDA.Types.Breaker;
            record.ThermalRating = null;
            record.Speed = null;
            record.TripTime = null;
            record.PickupTime = null;
            record.TripCoilCondition = null;
            return record;
        }
        else if (type == 'Bus') {
            let record = asset as OpenXDA.Types.Bus;
            return record
        }
        else if (type == 'CapacitorBankRelay') {
            let record = asset as OpenXDA.Types.CapBankRelay;
            return record
        }
        else if (type == 'CapacitorBank') {
            let record = asset as OpenXDA.Types.CapBank;
            record.NumberOfBanks = null;
            record.CapacitancePerBank = null;
            return record;

        }
        else if (type == 'LineSegment') {
            let record = asset as OpenXDA.Types.LineSegment;
            record.R0 = null;
            record.X0 = null;
            record.R1 = null;
            record.X1 = null;
            record.ThermalRating = null;
            record.Length = null;
            return record
        }
        else if (type == 'DER') {
            let record = asset as OpenXDA.Types.DER;
            record.FullRatedOutputCurrent = 0;
            record.VoltageLevel = 'Low';
            return record
        }

        else {
            let record = asset as OpenXDA.Types.Transformer;
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

    export function AttributeError(asset: OpenXDA.Types.DetailedAsset): string[]  {
        let errors = [];

        if (asset.AssetKey == null || asset.AssetKey.length == 0)
            errors.push('A Key is required.')
        if (asset.AssetName == null || asset.AssetName.length == 0)
            errors.push('A Name is required.')
        if (asset.VoltageKV == null || !AssetAttributes.isRealNumber(asset.VoltageKV))
            errors.push('A valid nominal Voltage is required.')

        return errors;

    }

    export function AssetError(asset: OpenXDA.Types.DetailedAsset, type: OpenXDA.Types.AssetTypeName): string[] {
        let errors = [];

        errors = AttributeError(asset);

        if (type == 'LineSegment') {
            if ((asset as OpenXDA.Types.LineSegment).Length == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.LineSegment).Length))
                errors.push('A valid Length is required.')
            if ((asset as OpenXDA.Types.LineSegment).R0 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.LineSegment).R0))
                errors.push('A valid R0 is required.')
            if ((asset as OpenXDA.Types.LineSegment).X0 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.LineSegment).X0))
                errors.push('A valid X0 is required.')
            if ((asset as OpenXDA.Types.LineSegment).R1 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.LineSegment).R1))
                errors.push('A valid R1 is required.')
            if ((asset as OpenXDA.Types.LineSegment).X1 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.LineSegment).X1))
                errors.push('A valid X1 is required.')
            if ((asset as OpenXDA.Types.LineSegment).ThermalRating == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.LineSegment).ThermalRating))
                errors.push('A valid ThermalRating is required.')
        }

        if (type == 'Breaker') {
            if ((asset as OpenXDA.Types.Breaker).ThermalRating == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Breaker).ThermalRating))
                errors.push('A valid ThermalRating is required.')
            if ((asset as OpenXDA.Types.Breaker).Speed == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Breaker).Speed))
                errors.push('A valid Breaker Speed id required.')
            if ((asset as OpenXDA.Types.Breaker).TripTime == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Breaker).TripTime))
                errors.push('A valid Trip Time Limit is required.')
            if ((asset as OpenXDA.Types.Breaker).PickupTime == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Breaker).PickupTime))
                errors.push('A valid Pickup Time Limit is required.')
            if ((asset as OpenXDA.Types.Breaker).TripCoilCondition == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Breaker).TripCoilCondition))
                errors.push('A valid Trip Coil Condition Limit is required.')
           
        }

        if (type == 'CapacitorBankRelay') {
            if ((asset as OpenXDA.Types.CapBankRelay).OnVoltageThreshhold == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBankRelay).OnVoltageThreshhold))
                errors.push('A valid On Voltage Threshold  is required.')
            if ((asset as OpenXDA.Types.CapBankRelay).CapBankNumber == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBankRelay).CapBankNumber))
                errors.push('A valid Protected CapBank  is required.')
        }

        if (type == 'Transformer') {
            if ((asset as OpenXDA.Types.Transformer).R0 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).R0))
                errors.push('A valid R0 is required.')
            if ((asset as OpenXDA.Types.Transformer).X0 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).X0))
                errors.push('A valid X0 is required.')
            if ((asset as OpenXDA.Types.Transformer).R1 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).R1))
                errors.push('A valid R1 is required.')
            if ((asset as OpenXDA.Types.Transformer).X1 == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).X1))
                errors.push('A valid X1 is required.')
            if ((asset as OpenXDA.Types.Transformer).ThermalRating == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).ThermalRating))
                errors.push('A valid Rating is required.')
            if ((asset as OpenXDA.Types.Transformer).PrimaryVoltageKV == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).PrimaryVoltageKV))
                errors.push('A valid Primary Voltage is required.')
            if ((asset as OpenXDA.Types.Transformer).SecondaryVoltageKV == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).SecondaryVoltageKV))
                errors.push('A valid Secondary Voltage is required.')
            if ((asset as OpenXDA.Types.Transformer).TertiaryVoltageKV != null && !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).TertiaryVoltageKV))
                errors.push('Tertiary Voltage needs to be numeric.')
            if ((asset as OpenXDA.Types.Transformer).Tap == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).Tap))
                errors.push('A valid Tap is required.')
            if ((asset as OpenXDA.Types.Transformer).PrimaryWinding == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).PrimaryWinding))
                errors.push('A valid Primary Winding is required.')
            if ((asset as OpenXDA.Types.Transformer).SecondaryWinding == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).SecondaryWinding))
                errors.push('A valid Secondary Winding is required.')
            if ((asset as OpenXDA.Types.Transformer).TertiaryWinding != null && !AssetAttributes.isRealNumber((asset as OpenXDA.Types.Transformer).TertiaryWinding))
                errors.push('Tertiary Winding needs to be numeric.')
        }

        if (type == 'CapacitorBank') {
            if ((asset as OpenXDA.Types.CapBank).NumberOfBanks == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).NumberOfBanks))
                errors.push('A valid Number Of Banks is required.')
            if ((asset as OpenXDA.Types.CapBank).CapacitancePerBank == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).CapacitancePerBank))
                errors.push('A valid Capacitor Step Size is required.')
            if ((asset as OpenXDA.Types.CapBank).MaxKV == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).MaxKV))
                errors.push('A valid Maximum Operating Voltage is required.')
            if ((asset as OpenXDA.Types.CapBank).UnitKV == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).UnitKV))
                errors.push('A valid Rated Voltage for a Unit is required.')

            if ((asset as OpenXDA.Types.CapBank).UnitKVAr == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).UnitKVAr))
                errors.push('A valid kVAR Rating for a Unit is required.')
            if ((asset as OpenXDA.Types.CapBank).PosReactanceTol == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).PosReactanceTol))
                errors.push('A valid pos. Reactance Tolerance is required.')
            if ((asset as OpenXDA.Types.CapBank).NegReactanceTol == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).NegReactanceTol))
                errors.push('A valid neg. Reactance Tolerance is required.')

            if ((asset as OpenXDA.Types.CapBank).Fused) {
                if ((asset as OpenXDA.Types.CapBank).Nparalell == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).Nparalell))
                    errors.push('A valid num. of units per Group is required.')
                if ((asset as OpenXDA.Types.CapBank).Nseries == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).Nseries))
                    errors.push('A valid num. of Series Groups per Phase is required.')

                if ((asset as OpenXDA.Types.CapBank).LowerXFRRatio == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).LowerXFRRatio))
                    errors.push('A valid Midgroup VT Ratio is required.')

                if ((asset as OpenXDA.Types.CapBank).Nshorted == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).Nshorted))
                    errors.push('A valid initial guess of shorted Elements is required.')

                if ((asset as OpenXDA.Types.CapBank).BlownFuses == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).BlownFuses))
                    errors.push('A valid initial guess of blown Fuses per Group is required.')

                if ((asset as OpenXDA.Types.CapBank).BlownGroups == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).BlownGroups))
                    errors.push('A valid initial guess of Groups with Blown fuse is required.')

            }
            else {
                if ((asset as OpenXDA.Types.CapBank).Nparalell == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).Nparalell))
                    errors.push('A valid num. of Parallel Strings is required.')
                if ((asset as OpenXDA.Types.CapBank).Nseries == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).Nseries))
                    errors.push('A valid num. of Units per String is required.')

                if ((asset as OpenXDA.Types.CapBank).NSeriesGroup == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).NSeriesGroup))
                    errors.push('A valid valid num. of Series Groups in each Unit is required.')
                if ((asset as OpenXDA.Types.CapBank).NParalellGroup == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).NParalellGroup))
                    errors.push('A valid num. of Elements per Group is required.')
                if ((asset as OpenXDA.Types.CapBank).VTratioBus == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).VTratioBus))
                    errors.push('A valid Bus VT ratio is required.')
                if ((asset as OpenXDA.Types.CapBank).NumberLVCaps == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).NumberLVCaps))
                    errors.push('A valid num. of Relay Caps is required.')
                if ((asset as OpenXDA.Types.CapBank).NumberLVUnits == null || !AssetAttributes.isInteger((asset as OpenXDA.Types.CapBank).NumberLVUnits))
                    errors.push('A valid num. of elements per Relay Cap is required.')


                if ((asset as OpenXDA.Types.CapBank).LVKVAr == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).LVKVAr))
                    errors.push('A valid Low Voltage Cap Size is required.')
                if ((asset as OpenXDA.Types.CapBank).LVKV == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).LVKV))
                    errors.push('A valid Low Voltage Cap rating is required.')
                if ((asset as OpenXDA.Types.CapBank).LVNegReactanceTol == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).LVNegReactanceTol))
                    errors.push('A valid neg. Reactance Tolerance for LV Units is required.')
                if ((asset as OpenXDA.Types.CapBank).LVPosReactanceTol == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).LVPosReactanceTol))
                    errors.push('A valid pos. Reactance Tolerance for LV Units is required.')
                if ((asset as OpenXDA.Types.CapBank).Nshorted == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).Nshorted))
                    errors.push('A valid initial guess of shorted elements is required.')

                if ((asset as OpenXDA.Types.CapBank).Compensated) {
                    if ((asset as OpenXDA.Types.CapBank).RelayPTRatioPrimary == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).RelayPTRatioPrimary))
                        errors.push('A valid Relay PT ratio is required.')
                    if ((asset as OpenXDA.Types.CapBank).Rh == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).Rh))
                        errors.push('A valid Vt Input Resistor is required.')
                    if ((asset as OpenXDA.Types.CapBank).Sh == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).Sh))
                        errors.push('A valid VT Input Resistor Wattage is required.')
                }
                else {
                    if ((asset as OpenXDA.Types.CapBank).Rv == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).Rv))
                        errors.push('A valid Voltage Divider Output R is required.')
                    if ((asset as OpenXDA.Types.CapBank).Rh == null || !AssetAttributes.isRealNumber((asset as OpenXDA.Types.CapBank).Rh))
                        errors.push('A valid Voltage Divider Input R is required.')
                }
            }

        }

        return errors;
    }


}

