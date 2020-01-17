//******************************************************************************************************
//  Line.tsx - Gbtc
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

function LineAttributes(props: { Asset: OpenXDA.Line, UpdateState: (newEditAsset: OpenXDA.Line) => void }): JSX.Element {
    return (
        <>
            <div className="form-group">
                <label>Max Fault Distance</label>
                <input className="form-control" onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.MaxFaultDistance = evt.target.value;
                    else
                        asset.MaxFaultDistance = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.MaxFaultDistance == null ? 0 : props.Asset.MaxFaultDistance} type='number' disabled={props.Asset.ID != 0} />
            </div>

            <div className="form-group">
                <label>MinFaultDistance</label>
                <input className="form-control" onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.MinFaultDistance = evt.target.value;
                    else
                        asset.MinFaultDistance = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.MinFaultDistance == null ? 0 : props.Asset.MinFaultDistance} type='number' disabled={props.Asset.ID != 0} />
            </div>

            <div className="form-group">
                <label>Length</label>
                <input className={(props.Asset.Segment != null && props.Asset.Segment.Length != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.Length = evt.target.value;
                    else
                        asset.Segment.Length = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.Segment == null || props.Asset.Segment.Length == null ? 0 : props.Asset.Segment.Length} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>Length is a required field.</div>
            </div>


            <div className="form-group">
                <label>R0</label>
                <input className={(props.Asset.Segment != null && props.Asset.Segment.R0 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.R0 = evt.target.value;
                    else
                        asset.Segment.R0 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.Segment == null || props.Asset.Segment.R0 == null ? 0 : props.Asset.Segment.R0} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>R0 is a required field.</div>
            </div>

            <div className="form-group">
                <label>X0</label>
                <input className={(props.Asset.Segment != null && props.Asset.Segment.X0 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.X0 = evt.target.value;
                    else
                        asset.Segment.X0 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.Segment == null || props.Asset.Segment.X0 == null ? 0 : props.Asset.Segment.X0} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>X0 is a required field.</div>
            </div>

            <div className="form-group">
                <label>R1</label>
                <input className={(props.Asset.Segment != null && props.Asset.Segment.R1 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.R1 = evt.target.value;
                    else
                        asset.Segment.R1 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.Segment == null || props.Asset.Segment.R1 == null ? 0 : props.Asset.Segment.R1} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>R1 is a required field.</div>
            </div>

            <div className="form-group">
                <label>X1</label>
                <input className={(props.Asset.Segment != null && props.Asset.Segment.X1 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.X1 = evt.target.value;
                    else
                        asset.Segment.X1 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.Segment == null || props.Asset.Segment.X1 == null ? 0 : props.Asset.Segment.X1} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>X1 is a required field.</div>
            </div>

            <div className="form-group">
                <label>Thermal Rating</label>
                <input className={(props.Asset.Segment != null && props.Asset.Segment.ThermalRating != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.ThermalRating = evt.target.value;
                    else
                        asset.Segment.ThermalRating = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset == null || props.Asset.Segment == null || props.Asset.Segment.ThermalRating == null ? 0 : props.Asset.Segment.ThermalRating} type='number' disabled={props.Asset.ID != 0} />
                <div className='invalid-feedback'>Thermal Rating is a required field.</div>
            </div>


        </>
    );
}

export default LineAttributes;