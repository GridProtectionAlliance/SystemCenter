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
import { OpenXDA, NewEdit } from '../global';
import AssetAttributes from './Asset';
function CapBankAttributes(props: { NewEdit: NewEdit, Asset: OpenXDA.CapBank, UpdateState: (newEditAsset: OpenXDA.CapBank) => void }): JSX.Element {
    function valid(field: keyof (OpenXDA.CapBank)): boolean {
        if (field == 'NumberOfBanks')
            return props.Asset.NumberOfBanks != null && AssetAttributes.isInteger(props.Asset.NumberOfBanks);
        else if (field == 'CansPerBank')
            return props.Asset.CansPerBank != null && AssetAttributes.isInteger(props.Asset.CansPerBank);
        else if (field == 'CapacitancePerBank')
            return props.Asset.CapacitancePerBank != null && AssetAttributes.isInteger(props.Asset.CapacitancePerBank);
    
        return false;
    }
    if (props.Asset == null) return null;
    return (
        <>
            <div className="form-group">
                <label>Number of Banks</label>
                <input className={(valid('NumberOfBanks') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.NumberOfBanks = evt.target.value;
                    else
                        asset.NumberOfBanks = null;

                    props.UpdateState(asset);
                }} value={props.Asset.NumberOfBanks == null ? '' : props.Asset.NumberOfBanks} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Number Of Banks is a required integer field.</div>
            </div>

            <div className="form-group">
                <label>Cans per Bank</label>
                <input className={(valid('CansPerBank') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.CansPerBank = evt.target.value;
                    else
                        asset.CansPerBank = null;

                    props.UpdateState(asset);
                }} value={props.Asset.CansPerBank == null ? '' : props.Asset.CansPerBank} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Cans Per Bank is a required integer field.</div>
            </div>

            <div className="form-group">
                <label>Capacitance per Bank</label>
                <input className={(valid('CapacitancePerBank') ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                    var asset = _.clone(props.Asset, true);
                    if (evt.target.value != "")
                        asset.CapacitancePerBank = evt.target.value;
                    else
                        asset.CapacitancePerBank = null;

                    props.UpdateState(asset);
                }} value={props.Asset.CapacitancePerBank == null ? '' : props.Asset.CapacitancePerBank} disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
                <div className='invalid-feedback'>Capacitance per Bank is a required integer field.</div>
            </div>

        </>
    );

}

export default CapBankAttributes;