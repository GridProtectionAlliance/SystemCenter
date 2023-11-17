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
import { SelectRoles } from '../Store/UserSettings';
import { useAppSelector } from '../hooks';
import AdditionalFieldsProperties from '../CommonComponents/AdditionalFieldsProperties';
import GenerationAttributes from '../AssetAttribute/Generation';
import StationAuxAttributes from '../AssetAttribute/StationAux';
import StationBatteryAttributes from '../AssetAttribute/StationBattery';

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
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    const saveAddlAsset = React.useRef<() => JQuery.jqXHR<void>>(undefined);
    const resetAddlAsset = React.useRef<() => void>(undefined);
    const [addlFieldChangedAsset, setAddlFieldChangedAsset] = React.useState<string[]>([]);
    const [addlFieldErrorAsset, setAddlFieldErrorAsset] = React.useState<string[]>([]);

    const saveAddlType = React.useRef<() => JQuery.jqXHR<void>>(undefined);
    const resetAddlType = React.useRef<() => void>(undefined);
    const [addlFieldChangedType, setAddlFieldChangedType] = React.useState<string[]>([]);
    const [addlFieldErrorType, setAddlFieldErrorType] = React.useState<string[]>([]);

    const [state, setState] = React.useState<'error' | 'idle' | 'loading'>('idle');
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');
    const roles = useAppSelector(SelectRoles);

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
            e.push('Key must be unique.');

        setErrors(e)
    }, [editAsset]);

    React.useEffect(() => {
        setHasChanged(addlFieldChangedType.length > 0 || addlFieldChangedAsset.length > 0 || !_.isEqual(asset, editAsset));
    }, [asset, editAsset, addlFieldChangedAsset, addlFieldChangedType])

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
        else if (asset.AssetType == 'Generation')
            return <GenerationAttributes NewEdit={'New'} Asset={editAsset as OpenXDA.Types.Generation} UpdateState={setEditAsset} />;
        else if (asset.AssetType == 'StationAux')
            return <StationAuxAttributes NewEdit={'New'} Asset={editAsset as OpenXDA.Types.StationAux} UpdateState={setEditAsset} />;
        else if (asset.AssetType == 'StationBattery')
            return <StationBatteryAttributes NewEdit={'New'} Asset={editAsset as OpenXDA.Types.StationBattery} UpdateState={setEditAsset} />;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return true;
        return false;
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
                result.push('On Voltage Threshold')
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
                result.push('Design')
            if ((asset as OpenXDA.Types.CapBank).NumberOfBanks != (editAsset as OpenXDA.Types.CapBank).NumberOfBanks)
                result.push('Number of Banks')
            if ((asset as OpenXDA.Types.CapBank).CktSwitcher != (editAsset as OpenXDA.Types.CapBank).CktSwitcher)
                result.push('Pre-insertion Switchers')
            if ((asset as OpenXDA.Types.CapBank).CapacitancePerBank != (editAsset as OpenXDA.Types.CapBank).CapacitancePerBank)
                result.push('Capacitor Step Size')
            if ((asset as OpenXDA.Types.CapBank).MaxKV != (editAsset as OpenXDA.Types.CapBank).MaxKV)
                result.push('Maximum Operating Voltage')
            if ((asset as OpenXDA.Types.CapBank).UnitKV != (editAsset as OpenXDA.Types.CapBank).UnitKV)
                result.push('Rated Voltage per Unit')
            if ((asset as OpenXDA.Types.CapBank).UnitKVAr != (editAsset as OpenXDA.Types.CapBank).NumberOfBanks)
                result.push('Rating of a Unit')
            if ((asset as OpenXDA.Types.CapBank).PosReactanceTol != (editAsset as OpenXDA.Types.CapBank).PosReactanceTol)
                result.push('Pos. Reactance Tolerance')
            if ((asset as OpenXDA.Types.CapBank).NegReactanceTol != (editAsset as OpenXDA.Types.CapBank).NegReactanceTol)
                result.push('Neg. Reacteance Tolerance')
            if ((asset as OpenXDA.Types.CapBank).Nparalell != (editAsset as OpenXDA.Types.CapBank).Nparalell)
                result.push('Num. of Units per Group')
            if ((asset as OpenXDA.Types.CapBank).Nseries != (editAsset as OpenXDA.Types.CapBank).Nseries)
                result.push('Num. of Series Groups per Phase')
            if ((editAsset as OpenXDA.Types.CapBank).Fused) {
                if ((asset as OpenXDA.Types.CapBank).LowerXFRRatio != (editAsset as OpenXDA.Types.CapBank).LowerXFRRatio)
                    result.push('Midgroup VT Ratio')
                if ((asset as OpenXDA.Types.CapBank).Nshorted != (editAsset as OpenXDA.Types.CapBank).Nshorted)
                    result.push('Init. Guess of Shorted Elements')
                if ((asset as OpenXDA.Types.CapBank).BlownFuses != (editAsset as OpenXDA.Types.CapBank).BlownFuses)
                    result.push('Init. Guess of Blown Fuses per Group')
                if ((asset as OpenXDA.Types.CapBank).BlownGroups != (editAsset as OpenXDA.Types.CapBank).BlownGroups)
                    result.push('Init. Guess of Groups with Blown Fuse')
                if ((asset as OpenXDA.Types.CapBank).NSeriesGroup != (editAsset as OpenXDA.Types.CapBank).NSeriesGroup)
                    result.push('Num. of Series Groups per Unit')
                if ((asset as OpenXDA.Types.CapBank).NParalellGroup != (editAsset as OpenXDA.Types.CapBank).NParalellGroup)
                    result.push('Num. of Elements per Group')
            }
            else {
                if ((editAsset as OpenXDA.Types.CapBank).Compensated) {
                    if ((asset as OpenXDA.Types.CapBank).RelayPTRatioPrimary != (editAsset as OpenXDA.Types.CapBank).RelayPTRatioPrimary ||
                        (asset as OpenXDA.Types.CapBank).RelayPTRatioSecondary != (editAsset as OpenXDA.Types.CapBank).RelayPTRatioSecondary)
                        result.push('Relay PT Ratio')
                    if ((asset as OpenXDA.Types.CapBank).Rh != (editAsset as OpenXDA.Types.CapBank).Rh)
                        result.push('Vt Input Resistor')
                    if ((asset as OpenXDA.Types.CapBank).Sh != (editAsset as OpenXDA.Types.CapBank).Sh)
                        result.push('Vt Input Resistor Wattage')
                }
                else {
                    if ((asset as OpenXDA.Types.CapBank).Rv != (editAsset as OpenXDA.Types.CapBank).Rv)
                        result.push('V Divider Output Resistor ')
                    if ((asset as OpenXDA.Types.CapBank).Rh != (editAsset as OpenXDA.Types.CapBank).Rh)
                        result.push('V Divider Input Resistor')
                }
                if ((asset as OpenXDA.Types.CapBank).VTratioBus != (editAsset as OpenXDA.Types.CapBank).VTratioBus)
                    result.push('Bus Vt Ratio')
                if ((asset as OpenXDA.Types.CapBank).NumberLVCaps != (editAsset as OpenXDA.Types.CapBank).NumberLVCaps)
                    result.push('Num. of Relay Caps')
                if ((asset as OpenXDA.Types.CapBank).NumberLVUnits != (editAsset as OpenXDA.Types.CapBank).NumberLVUnits)
                    result.push('Num. of Elements per Cap')
                if ((asset as OpenXDA.Types.CapBank).LVKVAr != (editAsset as OpenXDA.Types.CapBank).LVKVAr)
                    result.push('LV Cap Size')
                if ((asset as OpenXDA.Types.CapBank).LVKV != (editAsset as OpenXDA.Types.CapBank).LVKV)
                    result.push('LV Cap Voltage Rating')
                if ((asset as OpenXDA.Types.CapBank).LVNegReactanceTol != (editAsset as OpenXDA.Types.CapBank).LVNegReactanceTol)
                    result.push('Neg. Reactance Tol. LV Caps')
                if ((asset as OpenXDA.Types.CapBank).LVPosReactanceTol != (editAsset as OpenXDA.Types.CapBank).LVPosReactanceTol)
                    result.push('Pos. Reactance Tol. LV Caps')
                if ((asset as OpenXDA.Types.CapBank).Nshorted != (editAsset as OpenXDA.Types.CapBank).Nshorted)
                    result.push('Init. Guess of Shorted Elements')

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
        const mainHandle = editExistingAsset(editAsset);
        let allHandles = [mainHandle];

        // If addls do not exist, do only main
        let addlHandleAsset;
        if (saveAddlAsset.current !== undefined) {
            addlHandleAsset = saveAddlAsset.current();
            allHandles.push(addlHandleAsset);
        }
        let addlHandleType;
        if (saveAddlType.current !== undefined) {
            addlHandleType = saveAddlType.current();
            allHandles.push(addlHandleType);
        }

        Promise.all(allHandles).then(() => { setState('idle'); }, () => { setState('error'); });

        return () => {
            if (addlHandleAsset != null && addlHandleAsset.abort != null) addlHandleAsset.abort();
            if (addlHandleType != null && addlHandleType.abort != null) addlHandleType.abort();
        }

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
            <div className="row" style={{ height: window.innerHeight - 420, maxHeight: window.innerHeight - 420, overflowY: 'auto' }}>
                <div className="col">
                    <AssetAttributes.AssetAttributeFields Asset={editAsset} NewEdit='Edit' AssetTypes={assetTypes} AllAssets={allAssets} UpdateState={setEditAsset} GetDifferentAsset={() => { }} HideAssetType={false} HideSelectAsset={true} />
                    <AdditionalFieldsProperties ID={editAsset.ID} ParentTable={"Asset"} AddlFieldSaveRef={saveAddlAsset} SetChangedList={setAddlFieldChangedAsset} SetErrorList={setAddlFieldErrorAsset} ResetAddlFieldRef={resetAddlAsset} SingleColumn={true} />
                </div>
                <div className="col">
                    {showAttributes()}
                    <AdditionalFieldsProperties ID={editAsset.ID} ParentTable={asset.AssetType} AddlFieldSaveRef={saveAddlType} SetChangedList={setAddlFieldChangedType} SetErrorList={setAddlFieldErrorType} ResetAddlFieldRef={resetAddlType} SingleColumn={true} />
                </div>
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                <button className={"btn btn-primary" + (errors.length == 0 && addlFieldErrorAsset.length === 0 && addlFieldErrorType.length === 0 && hasChanged ? '' : ' disabled')} type="submit" onClick={() => { if (errors.length == 0 && addlFieldErrorAsset.length === 0 && addlFieldErrorType.length === 0 && hasChanged) return SaveChanges(); }} data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
            </div>
            <ToolTip Show={(errors.length > 0 || addlFieldErrorAsset.length > 0 || addlFieldErrorType.length > 0 || !hasChanged) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                {hasPermissions() ? <p>You do not have permission.</p>: !hasChanged ? <p> No changes made.</p> : null}
                {errors.map((t, i) => <p key={i}>
                    {CrossMark} {t}
                </p>)}
                {addlFieldErrorAsset.map((t, i) => <p key={`a_${i}`}>
                    {CrossMark} {t}
                </p>)}
                {addlFieldErrorType.map((t, i) => <p key={`t_${i}`}>
                    {CrossMark} {t}
                </p>)}
            </ToolTip>
            <div className="btn-group mr-2">
                <button className={"btn btn-default" + (hasChanged ? '' : ' disabled')} data-tooltip="clear" onClick={() => {
                    setEditAsset(asset);
                    if (resetAddlAsset.current !== undefined) resetAddlAsset.current();
                    if (resetAddlType.current !== undefined) resetAddlType.current();
                }} onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
            </div>
            <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                {changedFields().map((t, i) => <p key={i}> {Warning} Changes to {t} will be discarded.</p>)}
                {addlFieldErrorAsset.map((t, i) => <p key={`a_${i}`}>
                    {Warning} {t}
                </p>)}
                {addlFieldErrorType.map((t, i) => <p key={`t_${i}`}>
                    {Warning} {t}
                </p>)}
            </ToolTip>
        </div>

    </div>

}

export default AssetInfoWindow 
