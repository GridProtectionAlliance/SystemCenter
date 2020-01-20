//******************************************************************************************************
//  Breaker.tsx - Gbtc
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

function BreakerAttributes(props: { NewEdit: NewEdit, Asset: OpenXDA.Breaker, UpdateState: (newEditAsset: OpenXDA.Breaker) => void }): JSX.Element {
    function valid(field: keyof(OpenXDA.Breaker)): boolean {
        if (field == 'ThermalRating')
            return props.Asset.ThermalRating != null && AssetAttributes.isRealNumber(props.Asset.ThermalRating);
        else if (field == 'Speed')
            return props.Asset.Speed != null && AssetAttributes.isRealNumber(props.Asset.Speed);
        else if (field == 'TripTime')
            return props.Asset.TripTime == null || AssetAttributes.isInteger(props.Asset.TripTime);
        else if (field == 'PickupTime')
            return props.Asset.PickupTime == null || AssetAttributes.isInteger(props.Asset.PickupTime);
        else if (field == 'TripCoilCondition')
            return props.Asset.TripCoilCondition == null || AssetAttributes.isRealNumber(props.Asset.TripCoilCondition);

        return false;
    }

    if (props.Asset == null) return null;
    return (
        <>
            <div className="form-group">
                <label>Thermal Rating</label>
                <input className={(valid('ThermalRating') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.ThermalRating = evt.target.value;
                    else
                        asset.ThermalRating = null;

                    props.UpdateState(asset);
                }} value={props.Asset.ThermalRating == null ? '' : props.Asset.ThermalRating} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Thermal rating is a required numeric field.</div>
            </div>
            <div className="form-group">
                <label>Speed</label>
                <input className={(valid('Speed') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.Speed = evt.target.value;
                    else
                        asset.Speed = null;
                    props.UpdateState(asset);
                }} value={props.Asset.Speed == null ? '' : props.Asset.Speed} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Speed is a required numeric field.</div>
            </div>
            <div className="form-group">
                <label>Trip Time</label>
                <input className={(valid('TripTime') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.TripTime = evt.target.value;
                    else
                        asset.TripTime = null;


                    props.UpdateState(asset);
                }} value={props.Asset.TripTime == null ? '' : props.Asset.TripTime} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Trip Time is an integer field.</div>
            </div>
            <div className="form-group">
                <label>Pickup Time</label>
                <input className={(valid('PickupTime') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.PickupTime = evt.target.value;
                    else
                        asset.PickupTime = null;

                    props.UpdateState(asset);
                }} value={props.Asset.PickupTime == null ? '' : props.Asset.PickupTime} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Pickup Time is an integer field.</div>

            </div>

            <div className="form-group">
                <label>TripCoil Condition</label>
                <input className={(valid('TripCoilCondition') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.TripCoilCondition = evt.target.value;
                    else
                        asset.TripCoilCondition = null;

                    props.UpdateState(asset);
                }} value={props.Asset.TripCoilCondition == null ? '' : props.Asset.TripCoilCondition} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>TripCoil Condition is an numeric field.</div>

            </div>

            <div className="form-group">
                <label>EDNA Point</label>
                <input className="form-control" onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.EDNAPoint = evt.target.value;
                    else
                        asset.EDNAPoint = null;

                    props.UpdateState(asset);
                }} value={props.Asset.EDNAPoint == null ? '' : props.Asset.EDNAPoint} type='text' disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" style={{ left: 2, top: 6, zIndex: 1 }} value={props.Asset.Spare ? 'on' : 'off'} onChange={(evt) => {
                        var asset = _.clone(props.Asset, true);
                        asset.Spare = evt.target.checked;

                        props.UpdateState(asset);
                    }} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                    <label className="custom-control-label" >Spare</label>
                </div>
            </div>
        </>
    );

}

export default BreakerAttributes;