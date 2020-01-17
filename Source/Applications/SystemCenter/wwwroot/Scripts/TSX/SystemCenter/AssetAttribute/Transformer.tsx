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
import { OpenXDA } from '../global';
function TransformerAttributes(props: { Asset: OpenXDA.Transformer, UpdateState: (newEditAsset: OpenXDA.Transformer) => void }): JSX.Element {
    return (
        <>
            <div className="form-group">
                <label>R0</label>
                <input className={(props.Asset.R0 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.R0 = evt.target.value;
                    else
                        asset.R0 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.R0 == null ? 0 : props.Asset.R0} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>R0 is a required field.</div>
            </div>

            <div className="form-group">
                <label>X0</label>
                <input className={(props.Asset.X0 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.X0 = evt.target.value;
                    else
                        asset.X0 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.X0 == null ? 0 : props.Asset.X0} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>X0 is a required field.</div>
            </div>

            <div className="form-group">
                <label>R1</label>
                <input className={(props.Asset.R1 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.R1 = evt.target.value;
                    else
                        asset.R1 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.R1 == null ? 0 : props.Asset.R1} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>R1 is a required field.</div>
            </div>

            <div className="form-group">
                <label>X1</label>
                <input className={(props.Asset.X1 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.X1 = evt.target.value;
                    else
                        asset.X1 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.X1 == null ? 0 : props.Asset.X1} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>X1 is a required field.</div>
            </div>

            <div className="form-group">
                <label>Thermal Rating</label>
                <input className={(props.Asset.ThermalRating != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.ThermalRating = evt.target.value;
                    else
                        asset.ThermalRating = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.ThermalRating == null ? 0 : props.Asset.ThermalRating} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>Thermal Rating is a required field.</div>
            </div>

            <div className="form-group">
                <label>Primary Voltage (kV)</label>
                <input className="form-control" onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.PrimaryVoltageKV = evt.target.value;
                    else
                        asset.PrimaryVoltageKV = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.PrimaryVoltageKV == null ? 0 : props.Asset.PrimaryVoltageKV} type='number' disabled={props.Asset.ID != 0} />
            </div>

            <div className="form-group">
                <label>Secondary Voltage (kV)</label>
                <input className="form-control" onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.SecondaryVoltageKV = evt.target.value;
                    else
                        asset.SecondaryVoltageKV = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.SecondaryVoltageKV == null ? 0 : props.Asset.SecondaryVoltageKV} type='number' disabled={props.Asset.ID != 0} />
            </div>

            <div className="form-group">
                <label>Tap</label>
                <input className="form-control" onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Tap = evt.target.value;
                    else
                        asset.Tap = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.Tap == null ? 0 : props.Asset.Tap} type='number' disabled={props.Asset.ID != 0} />
            </div>

        </>
    );
}

export default TransformerAttributes;