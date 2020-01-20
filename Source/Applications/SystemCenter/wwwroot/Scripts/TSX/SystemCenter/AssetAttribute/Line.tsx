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
import { OpenXDA, NewEdit } from '../global';
import AssetAttributes from './Asset';

function LineAttributes(props: { NewEdit: NewEdit, Asset: OpenXDA.Line, UpdateState: (newEditAsset: OpenXDA.Line) => void }): JSX.Element {
    function valid(field: keyof (OpenXDA.Line) | keyof(OpenXDA.LineSegment)): boolean {
        if (field == 'MaxFaultDistance')
            return props.Asset.MaxFaultDistance == null || AssetAttributes.isRealNumber(props.Asset.MaxFaultDistance);
        else if (field == 'MinFaultDistance')
            return props.Asset.MinFaultDistance == null || AssetAttributes.isRealNumber(props.Asset.MinFaultDistance);
        else if (field == 'Length')
            return props.Asset.Segment.Length != null && AssetAttributes.isRealNumber(props.Asset.Segment.Length);
        else if (field == 'R0')
            return props.Asset.Segment.R0 != null && AssetAttributes.isRealNumber(props.Asset.Segment.R0);
        else if (field == 'X0')
            return props.Asset.Segment.X0 != null && AssetAttributes.isRealNumber(props.Asset.Segment.X0);
        else if (field == 'R1')
            return props.Asset.Segment.R1 != null && AssetAttributes.isRealNumber(props.Asset.Segment.R1);
        else if (field == 'X1')
            return props.Asset.Segment.X1 != null && AssetAttributes.isRealNumber(props.Asset.Segment.X1);
       else if (field == 'ThermalRating')
            return props.Asset.Segment.ThermalRating != null && AssetAttributes.isRealNumber(props.Asset.Segment.ThermalRating);

        return false;
    }

    if (props.Asset == null || props.Asset.Segment == null) return null;

    return (
        <>
            <div className="form-group">
                <label>Max Fault Distance</label>
                <input className={(valid('MaxFaultDistance') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.MaxFaultDistance = evt.target.value;
                    else
                        asset.MaxFaultDistance = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset.MaxFaultDistance == null ? '' : props.Asset.MaxFaultDistance} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Max Fault Distance is a numeric field.</div>

            </div>

            <div className="form-group">
                <label>MinFaultDistance</label>
                <input className={(valid('MinFaultDistance') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.MinFaultDistance = evt.target.value;
                    else
                        asset.MinFaultDistance = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset.MinFaultDistance == null ? '' : props.Asset.MinFaultDistance} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Min Fault Distance is a numeric field.</div>
            </div>

            <div className="form-group">
                <label>Length</label>
                <input className={(valid("Length") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.Length = evt.target.value;
                    else
                        asset.Segment.Length = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset.Segment == null || props.Asset.Segment.Length == null   ? '' : props.Asset.Segment.Length} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Length is a required numeric field.</div>
            </div>


            <div className="form-group">
                <label>R0</label>
                <input className={(valid("R0") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.R0 = evt.target.value;
                    else
                        asset.Segment.R0 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset.Segment == null || props.Asset.Segment.R0 == null ? '' : props.Asset.Segment.R0}  disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>R0 is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>X0</label>
                <input className={(valid("X0") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.X0 = evt.target.value;
                    else
                        asset.Segment.X0 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset.Segment == null || props.Asset.Segment.X0 == null ? '' : props.Asset.Segment.X0} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>X0 is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>R1</label>
                <input className={(valid("R1") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.R1 = evt.target.value;
                    else
                        asset.Segment.R1 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset.Segment == null || props.Asset.Segment.R1 == null ? '' : props.Asset.Segment.R1} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>R1 is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>X1</label>
                <input className={(valid("X1") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.X1 = evt.target.value;
                    else
                        asset.Segment.X1 = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset.Segment == null || props.Asset.Segment.X1 == null ? '' : props.Asset.Segment.X1} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>X1 is a required numeric field.</div>
            </div>

            <div className="form-group">
                <label>Thermal Rating</label>
                <input className={(valid("ThermalRating") ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Segment.ThermalRating = evt.target.value;
                    else
                        asset.Segment.ThermalRating = null;

                    this.setState({ NewEditAsset: asset });
                }} value={props.Asset.Segment == null || props.Asset.Segment.ThermalRating == null  ? '' : props.Asset.Segment.ThermalRating} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Thermal Rating is a required numeric field.</div>
            </div>


        </>
    );
}

export default LineAttributes;