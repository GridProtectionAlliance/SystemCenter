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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from './Asset';
import { Input } from '@gpa-gemstone/react-forms';

function TransformerAttributes(props: { NewEdit: Application.Types.NewEdit, Asset: OpenXDA.Types.Transformer, UpdateState: (newEditAsset: OpenXDA.Types.Transformer) => void }): JSX.Element {
    function valid(field: keyof (OpenXDA.Types.Transformer)): boolean {
        if (field == 'PrimaryVoltageKV')
            return props.Asset.PrimaryVoltageKV != null && AssetAttributes.isRealNumber(props.Asset.PrimaryVoltageKV);
        else if (field == 'SecondaryVoltageKV')
            return props.Asset.SecondaryVoltageKV != null && AssetAttributes.isRealNumber(props.Asset.SecondaryVoltageKV);
        else if (field == 'TertiaryVoltageKV')
            return props.Asset.TertiaryVoltageKV == null || AssetAttributes.isRealNumber(props.Asset.TertiaryVoltageKV);
        else if (field == 'PrimaryWinding')
            return props.Asset.PrimaryWinding != null && AssetAttributes.isRealNumber(props.Asset.PrimaryWinding);
        else if (field == 'SecondaryWinding')
            return props.Asset.SecondaryWinding != null && AssetAttributes.isRealNumber(props.Asset.SecondaryWinding);
        else if (field == 'TertiaryWinding')
            return props.Asset.TertiaryWinding == null || AssetAttributes.isRealNumber(props.Asset.TertiaryWinding);
        else if (field == 'Tap')
            return props.Asset.Tap != null && AssetAttributes.isRealNumber(props.Asset.Tap);
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
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'R0'} Label={'R0 (p.u.)'} Feedback={'R0 is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'X0'} Label={'X0 (p.u.)'} Feedback={'X0 is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'R1'} Label={'R1 (p.u.)'} Feedback={'R1 is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'X1'} Label={'X1 (p.u.)'} Feedback={'X1 is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'ThermalRating'} Label={'Rating (kVA)'} Feedback={'Thermal Rating is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'PrimaryVoltageKV'} Label={'Primary Voltage (kV)'} Feedback={'Primary Voltage (kV) is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'SecondaryVoltageKV'} Label={'Secondary Voltage (kV)'} Feedback={'Secondary Voltage (kV) is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'TertiaryVoltageKV'} Label={'Tertiary Voltage (kV)'} Feedback={'Tertiary Voltage (kV) is a numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'Tap'} Feedback={'Tap is a numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'PrimaryWinding'} Label={'Primary Winding'} Feedback={'Primary Winding is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'SecondaryWinding'} Label={'Secondary Winding'} Feedback={'Secondary Winding is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.Transformer> Record={props.Asset} Field={'TertiaryWinding'} Label={'Tertiary Winding'} Feedback={'Tertiary Winding is a numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />

        </>
    );
}

export default TransformerAttributes;