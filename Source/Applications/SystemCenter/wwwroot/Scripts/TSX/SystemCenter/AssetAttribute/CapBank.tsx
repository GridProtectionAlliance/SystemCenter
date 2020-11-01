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
import { OpenXDA, SystemCenter } from '../global';
import AssetAttributes from './Asset';
import FormInput from '../CommonComponents/FormInput';
import FormCheckBox from '../CommonComponents/FormCheckBox';
import { number } from 'prop-types';
function CapBankAttributes(props: { NewEdit: SystemCenter.NewEdit, Asset: OpenXDA.CapBank, UpdateState: (newEditAsset: OpenXDA.CapBank) => void }): JSX.Element {
    function valid(field: keyof (OpenXDA.CapBank)): boolean {
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
        else if (field == 'UpperXFRRatio')
            return props.Asset.UpperXFRRatio != null && AssetAttributes.isRealNumber(props.Asset.UpperXFRRatio);
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
        return false;
    }
    if (props.Asset == null) return null;
    return (
        <>
            <DesignSelect Record={props.Asset} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <PreSwitchSelect Record={props.Asset} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            
            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'NumberOfBanks'} Label={'Number Of Banks'} Feedback={'Number Of Banks is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'CapacitancePerBank'} Label={'Capacitor Step Size (kVAR)'} Feedback={'Capacitor Step Size is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />

            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'MaxKV'} Label={'Maximum Operating Voltage (kV)'} Feedback={'Maximum Operating Voltage is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'UnitKV'} Label={'Rated Voltage of a Unit (kV)'} Feedback={'Rated Voltage of a Unit is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />

            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'UnitKVAr'} Label={'Rating of a Unit (kVAR)'} Feedback={'Rating of a Unit is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'PosReactanceTol'} Label={'pos. Reactance Tolerance of a Unit (%)'} Feedback={'pos. Reactance Tolerance of a Unit is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'NegReactanceTol'} Label={'neg. Reactance Tolerance of a Unit (%)'} Feedback={'neg. Reactance Tolerance of a Unit (%) is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />

            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'Nparalell'} Label={(props.Asset.Fused ? 'Num. of Units per group' : 'Num. of Parallel Strings')} Feedback={(props.Asset.Fused ? 'Num. of Caps. per group' : 'Num. of Parallel Strings') + ' is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'Nseries'} Label={(props.Asset.Fused ? 'Num. of Series Groups per Phase' : 'Num. Units in each String')} Feedback={(props.Asset.Fused ? 'Num. of Series Groups per Phase' : 'Num. Units in each String') + ' is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            
            {(!props.Asset.Fused ?
                <>
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'NSeriesGroup'} Label={'Num. of Series Groups in each Unit'} Feedback={'Num. of Series Groups in each Unit is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'NParalellGroup'} Label={'Num. of Elements in each Group'} Feedback={'Num. of Elements in each Group is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                </> : null)}

           
            {(props.Asset.Fused ? 
                <>
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'UpperXFRRatio'} Label={'Bus VT Ratio'} Feedback={'Bus VT Ratio is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'LowerXFRRatio'} Label={'Midgroup VT Ratio'} Feedback={'Midgroup VT Ratio is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />


                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'Nshorted'} Label={'Initial guess of shorted elements'} Feedback={'Initial guess of shorted elements is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'BlownFuses'} Label={'Initial Guess of blown fuses per group'} Feedback={'Initial Guess of blown fuses per group is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'BlownGroups'} Label={'Initial guess of Groups with blown Fuse'} Feedback={'Initial guess of Groups with blown Fuse is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'ShortedGroups'} Label={'Initial guess of shorted Groups'} Feedback={'Initial guess of shorted Groups required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                </> : <>
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'VTratioBus'} Label={'Bus VT Ratio'} Feedback={'Bus VT Ratio is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'NumberLVCaps'} Label={'Num.of Relay Caps'} Feedback={'Num. of Relay Caps is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'NumberLVUnits'} Label={'Num. of Elements per Relay Cap'} Feedback={'Num. of Elements per Relay Cap is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'LVKVAr'} Label={'Low Voltage Cap size (kVAR)'} Feedback={'Low Voltage Cap size is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'LVKV'} Label={'Low Volatage Cap rating (V)'} Feedback={'Low Volatage Cap rating is a required integer field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'LVNegReactanceTol'} Label={'neg. Reactance Tolerance of LV Unit (%)'} Feedback={'neg. Reactance Tolerance of LV Unitis a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'LVPosReactanceTol'} Label={'pos. Reactance Tolerance of LV Unit (%)'} Feedback={'pos. Reactance Tolerance of LV Unit is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <PTRatioInput Record={props.Asset} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'Rv'} Label={'Voltage Divider output R (Ohm)'} Feedback={'Voltage Divider output R is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'Rh'} Label={'Voltage Divider input R'} Feedback={'Voltage Divider input R is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />

                    <FormInput<OpenXDA.CapBank> Record={props.Asset} Field={'Nshorted'} Label={'Initial guess of shorted elements'} Feedback={'Initial guess of shorted elements is a required field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />

                </>)}

            
            
        </>
    );

}

export default CapBankAttributes;

class DesignSelect extends React.Component<{ Record: OpenXDA.CapBank, Setter: (record: OpenXDA.CapBank) => void, Disabled?: boolean}, {}, {}>{

    computBools(selection: string) {
        var record: OpenXDA.CapBank = _.clone(this.props.Record);

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

    computeSelection(record: OpenXDA.CapBank): string {
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

class PTRatioInput extends React.Component<{ Record: OpenXDA.CapBank, Setter: (record: OpenXDA.CapBank) => void, Disabled?: boolean }, {low: string, high: string}, {}>{

    constructor(props, context) {
        super(props, context);

        let regex = /^([0-9]+) ([0-9]+)$/;
       
        if (this.props.Record.RelayPTRatio != undefined && this.props.Record.RelayPTRatio.match(regex) != null) {
            this.state = { low: this.props.Record.RelayPTRatio.match(regex)[1], high: this.props.Record.RelayPTRatio.match(regex)[2] };
        }
        else {
            this.state = { low: "", high: "" };
        }

        
        
    }

    updateValues(input: string) {
        input = input.trim();

        let regex = /^([0-9]+) ([0-9]+)$/;
        if (input.match(regex) != null) {
            this.setState({ low: input.match(regex)[1], high: input.match(regex)[2] })
        }
        else {
            this.setState({low: "0", high: "100"})
        }         
    }

    componentDidUpdate(prevprop, prevstate) {
        if (prevprop.Record.RelayPTRatio !== this.props.Record.RelayPTRatio) {
            this.updateValues(this.props.Record.RelayPTRatio)
        }
        if ((prevstate.low !== this.state.low || prevstate.high !== this.state.high) && this.isInteger(this.state.low) && this.isInteger(this.state.high)) {
            var record: OpenXDA.CapBank = _.clone(this.props.Record);
            if (parseInt(this.state.low) > parseInt(this.state.high))
                record.RelayPTRatio = this.state.low.toString() + " " + this.state.high.toString();
            else
                record.RelayPTRatio = this.state.high.toString() + " " + this.state.low.toString();
            this.props.Setter(record);
        }
    }

    isInteger(value: any) {
        var regex = /^-?[0-9]+$/;
        return value.toString().match(regex) != null;
    }

    render() {
        return <div className="form-group">
            <label>Relay PT Ratio</label>
            <div className="input-group">
                <input className={(this.isInteger(this.state.high) ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    this.setState({ high: evt.target.value as string})
                }} value={this.state.high} disabled={this.props.Disabled == null ? false : this.props.Disabled} />
                <input className={(this.isInteger(this.state.low) ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    this.setState({ low: evt.target.value as string })
                    }} value={this.state.low} disabled={this.props.Disabled == null ? false : this.props.Disabled} />
            </div>
            <div className='invalid-feedback'> Relay PT Ratio is a required field.</div>
        </div>;
    }
}

class PreSwitchSelect extends React.Component<{ Record: OpenXDA.CapBank, Setter: (record: OpenXDA.CapBank) => void, Disabled?: boolean }, { preSwitch: boolean[] }, {}>{

    constructor(props, context) {
        super(props, context);

        let numbers = [];

        if (this.props.Record.CktSwitcher != undefined)
            numbers = this.props.Record.CktSwitcher.trim().split(",");

        let nBanks = 1;
        if (this.props.Record.NumberOfBanks != undefined)
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
        if (this.props.Record.NumberOfBanks != undefined)
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
            var record: OpenXDA.CapBank = _.clone(this.props.Record);

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