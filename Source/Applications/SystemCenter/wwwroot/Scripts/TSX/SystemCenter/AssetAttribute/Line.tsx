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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from './Asset';
import { Input } from '@gpa-gemstone/react-forms';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

function LineAttributes(props: { 
    NewEdit: Application.Types.NewEdit,
    Asset: OpenXDA.Types.Line,
    UpdateState: (newEditAsset: OpenXDA.Types.Line) => void,
    Disabled?: boolean }): JSX.Element {

    const roles = useAppSelector(SelectRoles);

    function valid(field: keyof (OpenXDA.Types.Line) | keyof(OpenXDA.Types.LineDetail)): boolean {
        if (field == 'MaxFaultDistance')
            return props.Asset.MaxFaultDistance == null || AssetAttributes.isRealNumber(props.Asset.MaxFaultDistance);
        else if (field == 'MinFaultDistance')
            return props.Asset.MinFaultDistance == null || AssetAttributes.isRealNumber(props.Asset.MinFaultDistance);
        else if (field == 'Length')
            return props.Asset.Detail.Length == null || AssetAttributes.isRealNumber(props.Asset.Detail.Length);
        else if (field == 'R0')
            return props.Asset.Detail.R0 == null || AssetAttributes.isRealNumber(props.Asset.Detail.R0);
        else if (field == 'X0')
            return props.Asset.Detail.X0 == null || AssetAttributes.isRealNumber(props.Asset.Detail.X0);
        else if (field == 'R1')
            return props.Asset.Detail.R1 == null || AssetAttributes.isRealNumber(props.Asset.Detail.R1);
        else if (field == 'X1')
            return props.Asset.Detail.X1 == null || AssetAttributes.isRealNumber(props.Asset.Detail.X1);
       else if (field == 'ThermalRating')
            return props.Asset.Detail.ThermalRating == null || AssetAttributes.isRealNumber(props.Asset.Detail.ThermalRating);

        return false;
    }

    function updateLineDetail(record: OpenXDA.Types.LineDetail): void {
        var asset: OpenXDA.Types.Line = _.clone(props.Asset);
        asset.Detail = record;
        props.UpdateState(asset);

    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    React.useEffect(() => {
    }, [props.Asset]);

    if (props.Asset == null || props.Asset.Detail == null) return null;

    const disable = (props.NewEdit == 'New' && props.Asset.ID != 0) || !hasPermissions() || (props.Disabled ?? false);
    return (
        <div className="row">
            <div className="col-6">
            <Input<OpenXDA.Types.Line> Record={props.Asset} Help={'If this field is left blank the system will use Length as the maximum fault distance.'} Field={'MaxFaultDistance'} Label={'Max Fault Distance'} Feedback={'Max Fault Distance must be a numeric value.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-6">
            <Input<OpenXDA.Types.Line> Record={props.Asset} Help={'If this field is left blank the system will use 0 as the minimum fault distance.'} Field={'MinFaultDistance'} Label={'Min Fault Distance'} Feedback={'Min Fault Distance must be a numeric value.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
            </div>
            <div className="col-12">
            <div className="alert alert-info" role="alert">
                <p>Reactance, Length, and Thermal Rating are based on the Line Segments associated with this Line.</p>
                <p>To change these values, edit the properties of the Line Segements.</p>
            </div>
            </div>
            <div className="col-6">
            <Input<OpenXDA.Types.LineDetail> Record={props.Asset.Detail} Field={'ThermalRating'} Label={'Thermal Rating MVA'} Valid={valid} Setter={updateLineDetail} Disabled={true} />
            </div>
            <div className="col-6">
            <Input<OpenXDA.Types.LineDetail> Record={props.Asset.Detail} Field={'Length'} Label={'Length (miles)'} Feedback={'Length is a required numeric field.'} Valid={valid} Setter={updateLineDetail} Disabled={true} />
            </div>
            <div className="col-6">
            <Input<OpenXDA.Types.LineDetail> Record={props.Asset.Detail} Field={'R0'}  Label={'R0 (Ohm)'} Valid={valid} Setter={updateLineDetail} Disabled={true} />
            </div>
            <div className="col-6">
            <Input<OpenXDA.Types.LineDetail> Record={props.Asset.Detail} Field={'X0'} Label={'X0 (Ohm)'} Valid={valid} Setter={updateLineDetail} Disabled={true} />
            </div>
            <div className="col-6">
            <Input<OpenXDA.Types.LineDetail> Record={props.Asset.Detail} Field={'R1'} Label={'R1 (Ohm)'} Valid={valid} Setter={updateLineDetail} Disabled={true} />
            </div>
            <div className="col-6">
            <Input<OpenXDA.Types.LineDetail> Record={props.Asset.Detail} Field={'X1'} Label={'X1 (Ohm)'}  Valid={valid} Setter={updateLineDetail} Disabled={true} />
            </div>
            
        </div>
    );
}

export default LineAttributes;