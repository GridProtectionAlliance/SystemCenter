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


import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Warning } from '@gpa-gemstone/gpa-symbols';
import { LoadingIcon, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import _ from 'lodash';
import * as React from 'react';
import { editExistingAsset, getAllAssets, getAssetTypes, getAssetWithAdditionalFields } from '../../../TS/Services/Asset';
import { AssetAttributes } from '../AssetAttribute/Asset';
import BreakerAttributes from '../AssetAttribute/Breaker';
import BusAttributes from '../AssetAttribute/Bus';
import CapBankAttributes from '../AssetAttribute/CapBank';
import CapBankRelayAttributes from '../AssetAttribute/CapBankRelay';
import LineAttributes from '../AssetAttribute/Line';
import LineSegmentAttributes from '../AssetAttribute/LineSegment';
import TransformerAttributes from '../AssetAttribute/Transformer';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import DERAttributes from '../AssetAttribute/DER';

declare var homePath: string;

interface IProps {
    Asset: OpenXDA.Types.Asset,
    StateSetter: (asset: OpenXDA.Types.Asset) => void
}

function AssetInfoWindow(props: IProps) {
    const [asset, setAsset] = React.useState<OpenXDA.Types.Asset>(props.Asset);
    const [assetTypes, setAssetTypes] = React.useState<OpenXDA.Types.AssetType[]>([]);
    const [allAssets, setAllAssets] = React.useState<OpenXDA.Types.Asset[]>([]);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [editAsset, setEditAsset] = React.useState<OpenXDA.Types.Asset>(props.Asset);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)


    const [state, setState] = React.useState<'error' | 'idle' | 'loading'>('idle');
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    React.useEffect(() => {
        setState('loading')
        let handle = getAssetTypes();
        handle.done((d: OpenXDA.Types.AssetType[]) => {
            setAssetTypes(d);
        })
        handle.fail((d) => setState('error'));

        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [])

    React.useEffect(() => {
        setState('loading');

        if (assetTypes.length == 0)
            return;

        let handleAsset = getAssetWithAdditionalFields(props.Asset.ID, assetTypes.find(a => a.ID == props.Asset["AssetTypeID"]).Name)
            .then((d: OpenXDA.Types.Asset) => { setAsset(d); })
        let handleAllAssets = getAllAssets()
            .then((d: OpenXDA.Types.Asset[]) => setAllAssets(d))

        Promise.all([handleAsset, handleAllAssets]).then((d) => { setState('idle') }, (d) => setState('error'))

    }, [assetTypes, props.Asset]);

    React.useEffect(() => { setEditAsset(asset); }, [asset]);

    React.useEffect(() => {
        const e = AssetAttributes.AssetError(editAsset, editAsset.AssetType);
        if (editAsset.AssetKey != undefined && allAssets.findIndex(a => a.AssetKey.toLowerCase() == editAsset.AssetKey.toLowerCase() && a.ID != editAsset.ID) > -1)
            e.push('The AssetKey has to be unique.');

        setErrors(e)
    }, [editAsset]);

    React.useEffect(() => {
        if (_.isEqual(asset, editAsset))
            setHasChanged(false);
        else
            setHasChanged(true);
    }, [asset, editAsset])

    function showAttributes(): JSX.Element {
        if (asset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={'Edit'} Asset={editAsset as OpenXDA.Types.Breaker} UpdateState={setEditAsset} ShowSpare={true} />;
        else if (asset.AssetType == 'Bus')
            return <BusAttributes NewEdit={'Edit'} Asset={editAsset as OpenXDA.Types.Bus} UpdateState={setEditAsset} />;
        else if (asset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={'Edit'} Asset={editAsset as OpenXDA.Types.CapBank} UpdateState={setEditAsset} />;
        else if (asset.AssetType == 'CapacitorBankRelay')
            return <CapBankRelayAttributes NewEdit={'Edit'} Asset={editAsset as OpenXDA.Types.CapBankRelay} UpdateState={setEditAsset} />;
        else if (asset.AssetType == 'Line')
            return <LineAttributes NewEdit={'Edit'} Asset={editAsset as OpenXDA.Types.Line} UpdateState={setEditAsset} />;
        else if (asset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={'Edit'} Asset={editAsset as OpenXDA.Types.Transformer} UpdateState={setEditAsset} />;
        else if (asset.AssetType == 'LineSegment')
            return <LineSegmentAttributes NewEdit={'Edit'} Asset={editAsset as OpenXDA.Types.LineSegment} UpdateState={setEditAsset} />;
        else if (asset.AssetType == 'DER')
            return <DERAttributes NewEdit={'Edit'} Asset={editAsset as OpenXDA.Types.DER} UpdateState={setEditAsset} />;

    }

    function changedFields(): string[] {
        const result = [];
        if (asset.AssetKey != editAsset.AssetKey)
            result.push('Key')
        if (asset.AssetName != editAsset.AssetName)
            result.push('Name')
        if (asset.VoltageKV != editAsset.VoltageKV)
            result.push('VoltageKV')
        if (asset.Description != editAsset.Description)
            result.push('Description')

        if (asset.AssetType == 'Breaker') {
            if ((asset as OpenXDA.Types.Breaker).ThermalRating != (editAsset as OpenXDA.Types.Breaker).ThermalRating)
                result.push('Thermal Rating')
            if ((asset as OpenXDA.Types.Breaker).Speed != (editAsset as OpenXDA.Types.Breaker).Speed)
                result.push('Speed')
            if ((asset as OpenXDA.Types.Breaker).TripTime != (editAsset as OpenXDA.Types.Breaker).TripTime)
                result.push('Trip Time Limit')
            if ((asset as OpenXDA.Types.Breaker).PickupTime != (editAsset as OpenXDA.Types.Breaker).PickupTime)
                result.push('Pickup Time Limit')
            if ((asset as OpenXDA.Types.Breaker).TripCoilCondition != (editAsset as OpenXDA.Types.Breaker).TripCoilCondition)
                result.push('Trip Coil Condition Limit')
            if ((asset as OpenXDA.Types.Breaker).EDNAPoint != (editAsset as OpenXDA.Types.Breaker).EDNAPoint)
                result.push('eDNA Point')
            if ((asset as OpenXDA.Types.Breaker).Spare != (editAsset as OpenXDA.Types.Breaker).Spare)
                result.push('Spare Condition')

        }
        if (asset.AssetType == 'CapacitorBankRelay') {
            if ((asset as OpenXDA.Types.CapBankRelay).OnVoltageThreshhold != (editAsset as OpenXDA.Types.CapBankRelay).OnVoltageThreshhold)
                result.push('On voltage Threshold')
            if ((asset as OpenXDA.Types.CapBankRelay).CapBankNumber != (editAsset as OpenXDA.Types.CapBankRelay).CapBankNumber)
                result.push('Protected CapBank')
        }
        if (asset.AssetType == 'Line') {
            if ((asset as OpenXDA.Types.Line).MaxFaultDistance != (editAsset as OpenXDA.Types.Line).MaxFaultDistance)
                result.push('Maximum Fault Distance')
            if ((asset as OpenXDA.Types.Line).MinFaultDistance != (editAsset as OpenXDA.Types.Line).MinFaultDistance)
                result.push('Minimum Fault Distance')
        }
        if (asset.AssetType == 'LineSegment') {
            if ((asset as OpenXDA.Types.LineSegment).Length != (editAsset as OpenXDA.Types.LineSegment).Length)
                result.push('Length')
            if ((asset as OpenXDA.Types.LineSegment).R0 != (editAsset as OpenXDA.Types.LineSegment).R0)
                result.push('R0')
            if ((asset as OpenXDA.Types.LineSegment).X0 != (editAsset as OpenXDA.Types.LineSegment).X0)
                result.push('X0')
            if ((asset as OpenXDA.Types.LineSegment).R1 != (editAsset as OpenXDA.Types.LineSegment).R1)
                result.push('R1')
            if ((asset as OpenXDA.Types.LineSegment).X1 != (editAsset as OpenXDA.Types.LineSegment).X1)
                result.push('X1')
            if ((asset as OpenXDA.Types.LineSegment).ThermalRating != (editAsset as OpenXDA.Types.LineSegment).ThermalRating)
                result.push('Thermal Rating')
        }
        if (asset.AssetType == 'Transformer') {
            if ((asset as OpenXDA.Types.Transformer).R0 != (editAsset as OpenXDA.Types.Transformer).R0)
                result.push('R0')
            if ((asset as OpenXDA.Types.Transformer).X0 != (editAsset as OpenXDA.Types.Transformer).X0)
                result.push('X0')
            if ((asset as OpenXDA.Types.Transformer).R1 != (editAsset as OpenXDA.Types.Transformer).R1)
                result.push('R1')
            if ((asset as OpenXDA.Types.Transformer).X1 != (editAsset as OpenXDA.Types.Transformer).X1)
                result.push('X1')
            if ((asset as OpenXDA.Types.Transformer).ThermalRating != (editAsset as OpenXDA.Types.Transformer).ThermalRating)
                result.push('Thermal Rating')

            if ((asset as OpenXDA.Types.Transformer).PrimaryVoltageKV != (editAsset as OpenXDA.Types.Transformer).PrimaryVoltageKV)
                result.push('Primary Voltage')
            if ((asset as OpenXDA.Types.Transformer).SecondaryVoltageKV != (editAsset as OpenXDA.Types.Transformer).SecondaryVoltageKV)
                result.push('Secondary Voltage')
            if ((asset as OpenXDA.Types.Transformer).TertiaryVoltageKV != (editAsset as OpenXDA.Types.Transformer).TertiaryVoltageKV)
                result.push('Tertiary Voltage')
            if ((asset as OpenXDA.Types.Transformer).Tap != (editAsset as OpenXDA.Types.Transformer).Tap)
                result.push('Tap')
            if ((asset as OpenXDA.Types.Transformer).PrimaryWinding != (editAsset as OpenXDA.Types.Transformer).PrimaryWinding)
                result.push('Primary Winding')
            if ((asset as OpenXDA.Types.Transformer).SecondaryWinding != (editAsset as OpenXDA.Types.Transformer).SecondaryWinding)
                result.push('Secondary Winding')
            if ((asset as OpenXDA.Types.Transformer).TertiaryWinding != (editAsset as OpenXDA.Types.Transformer).TertiaryWinding)
                result.push('Tertiary Winding')
        }
        if (asset.AssetType == 'CapacitorBank') {
            if ((asset as OpenXDA.Types.CapBank).Fused != (editAsset as OpenXDA.Types.CapBank).Fused ||
                (asset as OpenXDA.Types.CapBank).Compensated != (editAsset as OpenXDA.Types.CapBank).Compensated)
                result.push('design')
            if ((asset as OpenXDA.Types.CapBank).NumberOfBanks != (editAsset as OpenXDA.Types.CapBank).NumberOfBanks)
                result.push('number of banks')
            if ((asset as OpenXDA.Types.CapBank).CktSwitcher != (editAsset as OpenXDA.Types.CapBank).CktSwitcher)
                result.push('pre-insertion switchers')
            if ((asset as OpenXDA.Types.CapBank).CapacitancePerBank != (editAsset as OpenXDA.Types.CapBank).CapacitancePerBank)
                result.push('capacitor Step Size')
            if ((asset as OpenXDA.Types.CapBank).MaxKV != (editAsset as OpenXDA.Types.CapBank).MaxKV)
                result.push('maximum operating voltage')
            if ((asset as OpenXDA.Types.CapBank).UnitKV != (editAsset as OpenXDA.Types.CapBank).UnitKV)
                result.push('rated voltage per unit')
            if ((asset as OpenXDA.Types.CapBank).UnitKVAr != (editAsset as OpenXDA.Types.CapBank).NumberOfBanks)
                result.push('rating of a unit')
            if ((asset as OpenXDA.Types.CapBank).PosReactanceTol != (editAsset as OpenXDA.Types.CapBank).PosReactanceTol)
                result.push('pos. reactance tolerance')
            if ((asset as OpenXDA.Types.CapBank).NegReactanceTol != (editAsset as OpenXDA.Types.CapBank).NegReactanceTol)
                result.push('neg. reacteance tolerance')
            if ((asset as OpenXDA.Types.CapBank).Nparalell != (editAsset as OpenXDA.Types.CapBank).Nparalell)
                result.push('num. of units per group')
            if ((asset as OpenXDA.Types.CapBank).Nseries != (editAsset as OpenXDA.Types.CapBank).Nseries)
                result.push('num. of series groups per phase')
            if ((editAsset as OpenXDA.Types.CapBank).Fused) {
                if ((asset as OpenXDA.Types.CapBank).LowerXFRRatio != (editAsset as OpenXDA.Types.CapBank).LowerXFRRatio)
                    result.push('midgroup VT ratio')
                if ((asset as OpenXDA.Types.CapBank).Nshorted != (editAsset as OpenXDA.Types.CapBank).Nshorted)
                    result.push('init. guess of shorted elements')
                if ((asset as OpenXDA.Types.CapBank).BlownFuses != (editAsset as OpenXDA.Types.CapBank).BlownFuses)
                    result.push('init. guess of blown fuses per group')
                if ((asset as OpenXDA.Types.CapBank).BlownGroups != (editAsset as OpenXDA.Types.CapBank).BlownGroups)
                    result.push('init. guess of groups with blown fuse')
                if ((asset as OpenXDA.Types.CapBank).NSeriesGroup != (editAsset as OpenXDA.Types.CapBank).NSeriesGroup)
                    result.push('num. of series groups per unit')
                if ((asset as OpenXDA.Types.CapBank).NParalellGroup != (editAsset as OpenXDA.Types.CapBank).NParalellGroup)
                    result.push('num. of elements per group')
            }
            else {
                if ((editAsset as OpenXDA.Types.CapBank).Compensated) {
                    if ((asset as OpenXDA.Types.CapBank).RelayPTRatioPrimary != (editAsset as OpenXDA.Types.CapBank).RelayPTRatioPrimary ||
                        (asset as OpenXDA.Types.CapBank).RelayPTRatioSecondary != (editAsset as OpenXDA.Types.CapBank).RelayPTRatioSecondary)
                        result.push('relay PT ratio')
                    if ((asset as OpenXDA.Types.CapBank).Rh != (editAsset as OpenXDA.Types.CapBank).Rh)
                        result.push('Vt input resistor')
                    if ((asset as OpenXDA.Types.CapBank).Sh != (editAsset as OpenXDA.Types.CapBank).Sh)
                        result.push('Vt input resistor wattage')
                }
                else {
                    if ((asset as OpenXDA.Types.CapBank).Rv != (editAsset as OpenXDA.Types.CapBank).Rv)
                        result.push('V divider output resistor ')
                    if ((asset as OpenXDA.Types.CapBank).Rh != (editAsset as OpenXDA.Types.CapBank).Rh)
                        result.push('V divider input resistor')
                }
                if ((asset as OpenXDA.Types.CapBank).VTratioBus != (editAsset as OpenXDA.Types.CapBank).VTratioBus)
                    result.push('bus Vt ratio')
                if ((asset as OpenXDA.Types.CapBank).NumberLVCaps != (editAsset as OpenXDA.Types.CapBank).NumberLVCaps)
                    result.push('num of relay caps ')
                if ((asset as OpenXDA.Types.CapBank).NumberLVUnits != (editAsset as OpenXDA.Types.CapBank).NumberLVUnits)
                    result.push('num. of elements per cap ')
                if ((asset as OpenXDA.Types.CapBank).LVKVAr != (editAsset as OpenXDA.Types.CapBank).LVKVAr)
                    result.push('LV cap size')
                if ((asset as OpenXDA.Types.CapBank).LVKV != (editAsset as OpenXDA.Types.CapBank).LVKV)
                    result.push('LV cap voltage rating')
                if ((asset as OpenXDA.Types.CapBank).LVNegReactanceTol != (editAsset as OpenXDA.Types.CapBank).LVNegReactanceTol)
                    result.push('neg. reactance tol. LV caps')
                if ((asset as OpenXDA.Types.CapBank).LVPosReactanceTol != (editAsset as OpenXDA.Types.CapBank).LVPosReactanceTol)
                    result.push('pos. reactance tol LV caps')
                if ((asset as OpenXDA.Types.CapBank).Nshorted != (editAsset as OpenXDA.Types.CapBank).Nshorted)
                    result.push('init. guess of shorted elements')

            }
            
        }
        if (asset.AssetType == 'DER') {
            if ((asset as OpenXDA.Types.DER).FullRatedOutputCurrent != (editAsset as OpenXDA.Types.DER).FullRatedOutputCurrent)
                result.push('Full Rated Output Current')
            if ((asset as OpenXDA.Types.DER).VoltageLevel != (editAsset as OpenXDA.Types.DER).VoltageLevel)
                result.push('Voltage Level')
        }

        return result;
    }

    if (props.Asset == null || state == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Asset Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                    <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} />
                    </div>
                </div>
            </div>
       </div>

    if (state == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Asset Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                    <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} />
                    </div>
                </div>
            </div>
        </div>

    function SaveChanges() {
        setState('loading');
        editExistingAsset(editAsset).then((d) => props.StateSetter(_.cloneDeep(props.Asset)), (d) => setState('error'))

    }

    return <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Asset Information:</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
            <div className="row" style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                <div className="col">
                    <AssetAttributes.AssetAttributeFields Asset={editAsset} NewEdit='Edit' AssetTypes={assetTypes} AllAssets={allAssets} UpdateState={setEditAsset} GetDifferentAsset={() => { }} HideAssetType={false} HideSelectAsset={true} />
                </div>
                <div className="col">
                    {showAttributes()}
                </div>
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                <button className={"btn btn-primary" + (errors.length == 0 && hasChanged ? '' : ' disabled')} type="submit" onClick={() => { if (errors.length == 0 && hasChanged) SaveChanges() }} data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
            </div>
            <ToolTip Show={(errors.length > 0 || !hasChanged) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                {!hasChanged ? <p> No changes made.</p> : null}
                {errors.map((t, i) => <p key={i}>
                    {CrossMark} {t}
                </p>)}
            </ToolTip>
            <div className="btn-group mr-2">
                <button className={"btn btn-default" + (hasChanged ? '' : ' disabled')} data-tooltip="clear" onClick={() => setEditAsset(asset)} onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
            </div>
            <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                {changedFields().map((t, i) => <p key={i}> {Warning} Changes to {t} will be discarded.</p>)}
            </ToolTip>
        </div>

    </div>

}

export default AssetInfoWindow 
