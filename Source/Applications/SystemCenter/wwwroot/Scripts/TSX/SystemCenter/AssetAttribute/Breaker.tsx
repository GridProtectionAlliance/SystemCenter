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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from './Asset';
import { getSpareBreakersForSubstation } from '../../../TS/Services/Asset';
import { CheckBox, Input } from '@gpa-gemstone/react-forms';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

function BreakerAttributes(props: { NewEdit: Application.Types.NewEdit, Asset: OpenXDA.Types.Breaker, UpdateState: (newEditAsset: OpenXDA.Types.Breaker) => void, ShowSpare?: boolean }): JSX.Element {

    const roles = useAppSelector(SelectRoles);

    function valid(field: keyof(OpenXDA.Types.Breaker)): boolean {
        if (field == 'ThermalRating')
            return props.Asset.ThermalRating != null && AssetAttributes.isRealNumber(props.Asset.ThermalRating);
        else if (field == 'Speed')
            return props.Asset.Speed != null && AssetAttributes.isRealNumber(props.Asset.Speed);
        else if (field == 'TripTime')
            return props.Asset.TripTime != null && AssetAttributes.isInteger(props.Asset.TripTime);
        else if (field == 'PickupTime')
            return props.Asset.PickupTime != null && AssetAttributes.isInteger(props.Asset.PickupTime);
        else if (field == 'TripCoilCondition')
            return props.Asset.TripCoilCondition != null && AssetAttributes.isRealNumber(props.Asset.TripCoilCondition);
        else if (field == 'EDNAPoint') return true;
        else if (field == 'Spare') return true;
        else if (field == 'SpareBreakerID') return true;
        else if (field == 'AirGapResistor') return true;
        return false;
    }
    const [spares, setSpares] = React.useState<Array<OpenXDA.Types.Breaker>>([]);

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    React.useEffect(() => {
        getSpareBreakersForSubstation(props.Asset).then(sps => {
            setSpares(sps);
        });
    }, [props.Asset]);

    if (props.Asset == null) return null;
    return (
        <>
            <Input<OpenXDA.Types.Breaker> Record={props.Asset} Field={'ThermalRating'} Label={'Thermal Rating'} Feedback={'A numeric Thermal Rating value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
            <Input<OpenXDA.Types.Breaker> Record={props.Asset} Field={'Speed'} Feedback={'A numeric Speed value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
            <Input<OpenXDA.Types.Breaker> Record={props.Asset} Field={'TripTime'} Label={'Trip Time Limit'} Feedback={'An integer Trip Time Limit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
            <Input<OpenXDA.Types.Breaker> Record={props.Asset} Field={'PickupTime'} Label={'Pickup Time Limit'} Feedback={'An integer Pickup Time Limit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
            <Input<OpenXDA.Types.Breaker> Record={props.Asset} Field={'TripCoilCondition'} Label={'Trip Coil Condition Limit'} Feedback={'A numeric Trip Coil Condition Limit value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
            <Input<OpenXDA.Types.Breaker> Record={props.Asset} Field={'EDNAPoint'} Label={'eDNA Point'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
            <CheckBox<OpenXDA.Types.Breaker> Record={props.Asset} Field={'AirGapResistor'} Label={'Air Gap Resistor'} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
            {props.ShowSpare ?
                <>
                    <div className="alert alert-info" role="alert">
                        <p>Spare Breakers must be assigned to the same Substation as the original Breaker.</p>
                        <p>If a Breaker does not show up in the list below, it is not assigned to the same Substation.</p>
                    </div>
                    <div className="form-group" hidden={!props.Asset.Spare}>
                <label>Spare Breaker</label>
                <select className="form-control" value={props.Asset.SpareBreakerID == null ? 0 : props.Asset.SpareBreakerID} onChange={(evt) => {
                    let record: OpenXDA.Types.Breaker = _.clone(props.Asset);
                    if (evt.target.value == '0')
                        record.SpareBreakerID = null;
                    else
                        record.SpareBreakerID = parseInt(evt.target.value as string);
                    props.UpdateState(record)
                }} disabled={props.NewEdit == 'New' && props.Asset.ID != 0}>
                    <option value={0} key={0} >None</option>
                    {
                        spares.map(spare => <option value={spare.ID} key={spare.ID} >{spare.AssetKey}</option>)
                    }

                </select>
            </div>
                    <CheckBox<OpenXDA.Types.Breaker> Record={props.Asset} Field={'Spare'} Label={'Use Spare Instead'} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
               </> : null}
        </>
    );

}

export default BreakerAttributes;