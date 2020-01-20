//******************************************************************************************************
//  Transformer.tsx - Gbtc
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
import { OpenXDA, NewEdit } from '../global';
import AssetAttributes from './Asset';
function TransformerAttributes(props: { NewEdit: NewEdit, Asset: OpenXDA.Transformer, UpdateState: (newEditAsset: OpenXDA.Transformer) => void }): JSX.Element {
    function valid(field: keyof (OpenXDA.Transformer)): boolean {
        if (field == 'PrimaryVoltageKV')
            return props.Asset.PrimaryVoltageKV == null || AssetAttributes.isRealNumber(props.Asset.PrimaryVoltageKV);
        else if (field == 'SecondaryVoltageKV')
            return props.Asset.SecondaryVoltageKV == null || AssetAttributes.isRealNumber(props.Asset.SecondaryVoltageKV);
        else if (field == 'Tap')
            return props.Asset.Tap == null || AssetAttributes.isRealNumber(props.Asset.Tap);
        else if (field == 'R0')
            return props.Asset.R0 != null && AssetAttributes.isRealNumber(props.Asset.R0);
        else if (field == 'X0')
            return props.Asset.X0 != null && AssetAttributes.isRealNumber(props.Asset.X0);
        else if (field == 'R1')
            return props.Asset.R1 != null && AssetAttributes.isRealNumber(props.Asset.R1);
        else if (field == 'X1')
            return props.Asset.X1 != null && AssetAttributes.isRealNumber(props.Asset.X1);
        else if (field == 'ThermalRating')
            return props.Asset.ThermalRating != null && AssetAttributes.isRealNumber(props.Asset.ThermalRating);

        return false;
    }

    if (props.Asset == null) return null;
    return (
        <>
            <div className="form-group">
                <label>R0</label>
                <input className={(valid("R0") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.R0 = evt.target.value;
                    else
                        asset.R0 = null;

                    props.UpdateState(asset);
                }} value={props.Asset.R0 == null ? '' : props.Asset.R0} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>R0 is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>X0</label>
                <input className={(valid("X0") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.X0 = evt.target.value;
                    else
                        asset.X0 = null;

                    props.UpdateState(asset);
                }} value={props.Asset.X0 == null ? '' : props.Asset.X0} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>X0 is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>R1</label>
                <input className={(valid("R1") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.R1 = evt.target.value;
                    else
                        asset.R1 = null;

                    props.UpdateState(asset);
                }} value={props.Asset.R1 == null ? '' : props.Asset.R1} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>R1 is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>X1</label>
                <input className={(valid("X1") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.X1 = evt.target.value;
                    else
                        asset.X1 = null;

                    props.UpdateState(asset);
                }} value={props.Asset.X1 == null ? '' : props.Asset.X1} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>X1 is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>Thermal Rating</label>
                <input className={(valid("ThermalRating") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.ThermalRating = evt.target.value;
                    else
                        asset.ThermalRating = null;

                    props.UpdateState(asset);
                }} value={props.Asset.ThermalRating == null ? '' : props.Asset.ThermalRating} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Thermal Rating is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>Primary Voltage (kV)</label>
                <input className={(valid("PrimaryVoltageKV") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.PrimaryVoltageKV = evt.target.value;
                    else
                        asset.PrimaryVoltageKV = null;

                    props.UpdateState(asset);
                }} value={props.Asset.PrimaryVoltageKV == null ? '' : props.Asset.PrimaryVoltageKV} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Primary Voltage (kV) is a numeric field.</div>
            </div>

            <div className="form-group">
                <label>Secondary Voltage (kV)</label>
                <input className={(valid("SecondaryVoltageKV") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.SecondaryVoltageKV = evt.target.value;
                    else
                        asset.SecondaryVoltageKV = null;

                    props.UpdateState(asset);
                }} value={props.Asset.SecondaryVoltageKV == null ? '' : props.Asset.SecondaryVoltageKV} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Secondary Voltage (kV) is a numeric field.</div>
            </div>

            <div className="form-group">
                <label>Tap</label>
                <input className={(valid("Tap") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Tap = evt.target.value;
                    else
                        asset.Tap = null;

                    props.UpdateState(asset);
                }} value={props.Asset.Tap == null ? '' : props.Asset.Tap} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Tap is a numeric field.</div>
            </div>

        </>
    );
}

export default TransformerAttributes;