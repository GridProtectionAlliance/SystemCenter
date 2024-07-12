//******************************************************************************************************
//  CapBank.tsx - Gbtc
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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from './Asset';
import { Input } from '@gpa-gemstone/react-forms';
import { IsInteger } from '@gpa-gemstone/helper-functions';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

function CapBankAttributes(props: {
    NewEdit: Application.Types.NewEdit, 
    Asset: OpenXDA.Types.CapBank, 
    UpdateState: (newEditAsset: OpenXDA.Types.CapBank) => void,
    Disabled?: boolean 
 }): JSX.Element {

    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (props.Asset.Fused == undefined || props.Asset.Compensated == undefined || props.Asset.CktSwitcher == undefined || props.Asset.CktSwitcher.length == 0)
            props.UpdateState({ ...props.Asset, Fused: true, Compensated: false, CktSwitcher: '0' });

    }, [props.Asset])

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    function valid(field: keyof (OpenXDA.Types.CapBank)): boolean {
        if (field == 'NumberOfBanks')
            return props.Asset.NumberOfBanks != null && AssetAttributes.isInteger(props.Asset.NumberOfBanks);
        else if (field == 'CapacitancePerBank')
            return props.Asset.CapacitancePerBank != null && AssetAttributes.isRealNumber(props.Asset.CapacitancePerBank);
        else if (field == 'MaxKV')
            return props.Asset.MaxKV != null && AssetAttributes.isRealNumber(props.Asset.MaxKV);
        else if (field == 'UnitKV')
            return props.Asset.UnitKV != null && AssetAttributes.isRealNumber(props.Asset.UnitKV);
        else if (field == 'UnitKVAr')
            return props.Asset.UnitKVAr != null && AssetAttributes.isRealNumber(props.Asset.UnitKVAr);
        else if (field == 'PosReactanceTol')
            return props.Asset.PosReactanceTol != null && AssetAttributes.isRealNumber(props.Asset.PosReactanceTol);
        else if (field == 'NegReactanceTol')
            return props.Asset.NegReactanceTol != null && AssetAttributes.isRealNumber(props.Asset.NegReactanceTol);
        else if (field == 'Nparalell')
            return props.Asset.Nparalell != null && AssetAttributes.isInteger(props.Asset.Nparalell);
        else if (field == 'Nseries')
            return props.Asset.Nseries != null && AssetAttributes.isInteger(props.Asset.Nseries);
        else if (field == 'NSeriesGroup')
            return props.Asset.NSeriesGroup != null && AssetAttributes.isInteger(props.Asset.NSeriesGroup);
        else if (field == 'NParalellGroup')
            return props.Asset.NParalellGroup != null && AssetAttributes.isInteger(props.Asset.NParalellGroup);
        else if (field == 'VTratioBus')
            return props.Asset.VTratioBus != null && AssetAttributes.isRealNumber(props.Asset.VTratioBus);
        else if (field == 'NumberLVCaps')
            return props.Asset.NumberLVCaps != null && AssetAttributes.isInteger(props.Asset.NumberLVCaps);
        else if (field == 'NumberLVUnits')
            return props.Asset.NumberLVUnits != null && AssetAttributes.isInteger(props.Asset.NumberLVUnits);
        else if (field == 'LVKVAr')
            return props.Asset.LVKVAr != null && AssetAttributes.isRealNumber(props.Asset.LVKVAr);
        else if (field == 'LVKV')
            return props.Asset.LVKV != null && AssetAttributes.isRealNumber(props.Asset.LVKV);
        else if (field == 'LVNegReactanceTol')
            return props.Asset.LVNegReactanceTol != null && AssetAttributes.isRealNumber(props.Asset.LVNegReactanceTol);
        else if (field == 'LVPosReactanceTol')
            return props.Asset.LVPosReactanceTol != null && AssetAttributes.isRealNumber(props.Asset.LVPosReactanceTol);
        else if (field == 'LowerXFRRatio')
            return props.Asset.LowerXFRRatio != null && AssetAttributes.isRealNumber(props.Asset.LowerXFRRatio);
        else if (field == 'Nshorted')
            return props.Asset.Nshorted != null && AssetAttributes.isRealNumber(props.Asset.Nshorted);
        else if (field == 'BlownFuses')
            return props.Asset.BlownFuses != null && AssetAttributes.isRealNumber(props.Asset.BlownFuses);
        else if (field == 'BlownGroups')
            return props.Asset.BlownGroups != null && AssetAttributes.isRealNumber(props.Asset.BlownGroups);
        else if (field == 'Rv')
            return props.Asset.Rv != null && AssetAttributes.isRealNumber(props.Asset.Rv);
        else if (field == 'Rh')
            return props.Asset.Rh != null && AssetAttributes.isRealNumber(props.Asset.Rh);
        else if (field == 'NLowerGroups')
            return props.Asset.NLowerGroups != null && AssetAttributes.isInteger(props.Asset.NLowerGroups);
        else if (field == 'ShortedGroups')
            return props.Asset.ShortedGroups != null && AssetAttributes.isRealNumber(props.Asset.ShortedGroups);
        else if (field == 'RelayPTRatioPrimary')
            return props.Asset.RelayPTRatioPrimary != null && AssetAttributes.isRealNumber(props.Asset.RelayPTRatioPrimary);
        else if (field == 'RelayPTRatioSecondary')
            return props.Asset.RelayPTRatioSecondary != null && AssetAttributes.isRealNumber(props.Asset.RelayPTRatioSecondary);
        else if (field == 'Sh')
            return props.Asset.Sh != null && AssetAttributes.isRealNumber(props.Asset.Sh);
        return false;
    }
    if (props.Asset == null) return null;

    const disable = (props.NewEdit == 'New' && props.Asset.ID != 0) || !hasPermissions() || (props.Disabled ?? false);
    return (
        <>
        <div className="row">
            <div className="col-4">
                <DesignSelect Record={props.Asset} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-4">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'NumberOfBanks'} Label={'Number of Banks'} Feedback={'An integer Number of Banks value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-4">
                <PreSwitchSelect Record={props.Asset} Setter={props.UpdateState} Disabled={disable} />
            </div>

            <div className="col-4">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'CapacitancePerBank'} Label={'Capacitor Step Size (kVAR)'} Feedback={'A numeric Capacitor Step Size value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-4">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'MaxKV'} Label={'Maximum Operating Voltage (kV)'} Feedback={'A numeric Maximum Operating Voltage value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-4">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'UnitKV'} Label={'Rated Voltage of a Unit (kV)'} Feedback={'A numeric Rated Voltage of a Unit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>

            <div className="col-4">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'UnitKVAr'} Label={'Rating of a Unit (kVAR)'} Feedback={'A numeric Rating of a Unit is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-4">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'PosReactanceTol'} Label={'Pos. Reactance Tolerance of a Unit (%)'} Feedback={'A numeric Pos. Reactance Tolerance of a Unit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-4">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'NegReactanceTol'} Label={'Neg. Reactance Tolerance of a Unit (%)'} Feedback={'A numeric Neg. Reactance Tolerance of a Unit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>

            <div className="col-6">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'Nparalell'} Label={(props.Asset.Fused ? 'Num. of Units per Group' : 'Num. of Parallel Strings')} Feedback={'An integer ' + (props.Asset.Fused ? 'Num. of Caps. per Group' : 'Num. of Parallel Strings') + ' value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-6">
                <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'Nseries'} Label={(props.Asset.Fused ? 'Num. of Series Groups per Phase' : 'Num. Units in each String')} Feedback={'An integer ' + (props.Asset.Fused ? 'Num. of Series Groups per Phase' : 'Num. Units in each String') + ' value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
        
            {(props.Asset.Fused ? 
                <>
                 <div className="col-6">
                    <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'LowerXFRRatio'} Label={'Midgroup VT Ratio'} Feedback={'A numeric Midgroup VT Ratio value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                </div>
                <div className="col-6">
                    <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'Nshorted'} Label={'Initial Guess of Shorted Elements'} Feedback={'A numeric Initial Guess of Shorted Elements value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                </div>
                <div className="col-6">
                    <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'BlownFuses'} Label={'Initial Guess of Blown Fuses per Group'} Feedback={'A numeric Initial Guess of Blown Fuses per Group value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                </div>
                <div className="col-6">
                    <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'BlownGroups'} Label={'Initial Guess of Groups with Blown Fuse'} Feedback={'A numeric Initial Guess of Groups with Blown Fuse value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                </div>
                </> : <>
                <div className="col-6">
                    <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'NSeriesGroup'} Label={'Num. of Series Groups in each Unit'} Feedback={'An integer Num. of Series Groups in each Unit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                </div>
                <div className="col-6">
                    <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'NParalellGroup'} Label={'Num. of Elements in each Group'} Feedback={'An integer Num. of Elements in each Group value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                </div>
                    {(props.Asset.Compensated ? 
                        <>
                        <div className="col-12">
                            <DoubleInput<OpenXDA.Types.CapBank> Record={props.Asset} Field2={'RelayPTRatioSecondary'} Field1={'RelayPTRatioPrimary'} Label={'Relay PT Ratio (Primary - Secondary V)'} Feedback={'An integer Relay PT Ratio value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable}/>
                        </div>
                        <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'Rh'} Label={'Vt Input Resistor (Ohm)'} Feedback={'A numeric Vt Input Resistor value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                         </div>
                         <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'Sh'} Label={'Vt Input Resistor Wattage (W)'} Feedback={'A numeric Vt Input Resistor Wattage value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>
                        </>
                    : 
                        <>
                         <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'Rv'} Label={'Voltage Divider Output R (Ohm)'} Feedback={'A numeric Voltage Divider Output R value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>
                         <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'Rh'} Label={'Voltage Divider Input R (Ohm)'} Feedback={'A numeric Voltage Divider Input R value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>
                        </>
                    )}
                        <div className="col-4">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'VTratioBus'} Label={'Bus VT Ratio'} Feedback={'A numeric Bus VT Ratio value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>
                         <div className="col-4">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'NumberLVCaps'} Label={'Num. of Relay Caps'} Feedback={'An integer Num. of Relay Caps value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>
                         <div className="col-4">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'NumberLVUnits'} Label={'Num. of Elements per Relay Cap'} Feedback={'An integer Num. of Elements per Relay Cap value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>

                        <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'LVKVAr'} Label={'Low Voltage Cap Size (kVAR)'} Feedback={'A numeric Low Voltage Cap Size value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>
                        <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'LVKV'} Label={'Low Voltage Cap Rating (V)'} Feedback={'An integer Low Voltage Cap Rating value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>

                        
                        <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'LVNegReactanceTol'} Label={'Neg. Reactance Tolerance of LV Unit (%)'} Feedback={'A numeric Neg. Reactance Tolerance of LV Unit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable}/>
                        </div>
                        <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'LVPosReactanceTol'} Label={'Pos. Reactance Tolerance of LV Unit (%)'} Feedback={'A numeric Pos. Reactance Tolerance of LV Unit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>
                        <div className="col-6">
                            <Input<OpenXDA.Types.CapBank> Record={props.Asset} Field={'Nshorted'} Label={'Initial Guess of Shorted Elements'} Feedback={'A numeric Initial Guess of Shorted Elements value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
                        </div>
                </>)}

            
            </div>
        </>
    );

}

export default CapBankAttributes;

class DesignSelect extends React.Component<{ Record: OpenXDA.Types.CapBank, Setter: (record: OpenXDA.Types.CapBank) => void, Disabled?: boolean}, {}, {}>{

    computBools(selection: string) {
        var record: OpenXDA.Types.CapBank = _.clone(this.props.Record);

        if (selection == '0') {
            record.Compensated = true;
            record.Fused = false;
        }
        else if (selection == '1') {
            record.Compensated = false;
            record.Fused = false;
        }
        else if (selection == '2') {
            record.Compensated = false;
            record.Fused = true;
        }

        this.props.Setter(record);
    }

    computeSelection(record: OpenXDA.Types.CapBank): string {
        if (record.Compensated) 
            return "0";
        else if (!record.Fused) 
            return "1";
        return "2";
    }
    render() {
        return <div className="form-group">
            <label>Design</label>
            <select className="form-control" value={this.computeSelection(this.props.Record)} disabled={this.props.Disabled == null ? false : this.props.Disabled} onChange={(evt) => this.computBools(evt.target.value)}>
                <option key={0} value="0">Fuseless Compensated</option>
                <option key={1} value="1">Fuseless Uncompensated</option>
                <option key={2} value="2">Fused</option>
            </select>
        </div>;
    }
}

class PreSwitchSelect extends React.Component<{ Record: OpenXDA.Types.CapBank, Setter: (record: OpenXDA.Types.CapBank) => void, Disabled?: boolean }, { preSwitch: boolean[] }, {}>{

    constructor(props, context) {
        super(props, context);

        let numbers = [];

        if (this.props.Record.CktSwitcher != undefined)
            numbers = this.props.Record.CktSwitcher.trim().split(",");

        let nBanks = 1;
        if (this.props.Record.NumberOfBanks != undefined && IsInteger(this.props.Record.NumberOfBanks))
            nBanks = this.props.Record.NumberOfBanks;

        

        if (numbers.length !== parseInt(nBanks.toString()))
            numbers = Array.from(Array(parseInt(nBanks.toString())), (e, i) => '0')

        this.state = { preSwitch: numbers.map(item => (item.trim() == '1'? true: false)) };
    }

    updateValues(input: string) {

        let numbers = []
        if (input != undefined)
            numbers = input.trim().split(",");
         
        let nBanks = 1;
        if (this.props.Record.NumberOfBanks != undefined && IsInteger(this.props.Record.NumberOfBanks))
            nBanks = this.props.Record.NumberOfBanks;

        if (numbers.length !== parseInt(nBanks.toString()))
            numbers = Array.from(Array(parseInt(nBanks.toString())), (e, i) => '0')

        this.setState({ preSwitch: numbers.map(item => (item.trim() == '1' ? true : false)) })
     
    }

    componentDidUpdate(prevprop, prevstate) {
        if (prevprop.Record.NumberOfBanks !== this.props.Record.NumberOfBanks || prevprop.Record.CktSwitcher !== this.props.Record.CktSwitcher) {
            this.updateValues(this.props.Record.CktSwitcher)
        }
        if (!_.isEqual(prevstate,this.state)) {
            var record: OpenXDA.Types.CapBank = _.clone(this.props.Record);

            record.CktSwitcher = this.state.preSwitch.map(item => (item ? "1" : "0")).join(",");
           
            this.props.Setter(record);
        }
    }

    
    render() {
        return <div className="form-group">
            <label>CapBank with Pre-insertion Switcher</label>
            <div>
            {this.state.preSwitch.map((v, i) =>
                <div className="from-check form-check-inline" key={i}>
                    <input className="form-check-input" type="checkbox" id={"inlineCheckbox-" + i} onChange={(evt) => {
                        var lst = _.clone(this.state.preSwitch);
                        lst[i] = !lst[i];
                        this.setState({ preSwitch: lst })
                    }} value={(v ? 1 : 0)} checked={v} disabled={this.props.Disabled == null ? false : this.props.Disabled} />
                    <label className="form-check-label" htmlFor={"inlineCheckbox-" + i}>{i+1}</label>
                </div>)}
            </div>
        </div>;
    }
}

function DoubleInput<T>(props: {
    Record: T;
    Field1: keyof T;
    Field2: keyof T;
    Setter: (record: T) => void;
    Valid: (field: keyof T) => boolean;
    Label?: string;
    Feedback?: string;
    Disabled?: boolean;
    Type?: 'number' | 'text' | 'password' | 'email' | 'color';
}) {
    return (
        <div className="form-group">
            <label>{props.Label == null ? (props.Field1 as string + ' ' + (props.Field2 as string)) : props.Label}</label>
            <div className="input-group">
                <input
                    type={props.Type === undefined ? 'text' : props.Type}
                    className={props.Valid(props.Field1) ? 'form-control' : 'form-control is-invalid'}
                    onChange={(evt) =>
                        props.Setter({ ...props.Record, [props.Field1]: evt.target.value !== '' ? evt.target.value : null })
                    }
                    value={props.Record[props.Field1] == null ? '' : (props.Record[props.Field1] as any).toString()}
                    disabled={props.Disabled == null ? false : props.Disabled}
                />
                <input
                    type={props.Type === undefined ? 'text' : props.Type}
                    className={props.Valid(props.Field2) ? 'form-control' : 'form-control is-invalid'}
                    onChange={(evt) =>
                        props.Setter({ ...props.Record, [props.Field2]: evt.target.value !== '' ? evt.target.value : null })
                    }
                    value={props.Record[props.Field2] == null ? '' : (props.Record[props.Field2] as any).toString()}
                    disabled={props.Disabled == null ? false : props.Disabled}
                />
            </div>
            <div className="invalid-feedback">
                {props.Feedback == null ? (props.Field1 as string + ' ' + (props.Field2 as string) + ' is required.') : props.Feedback}
            </div>
        </div>
    );
}