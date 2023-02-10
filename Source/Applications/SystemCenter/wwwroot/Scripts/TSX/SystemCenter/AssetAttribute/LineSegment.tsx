//******************************************************************************************************
//  LineSegment.tsx - Gbtc
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
//  01/24/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from './Asset';
import { Input, CheckBox } from '@gpa-gemstone/react-forms';

function LineSegmentAttributes(props: { NewEdit: Application.Types.NewEdit, Asset: OpenXDA.Types.LineSegment, UpdateState: (newEditAsset: OpenXDA.Types.LineSegment) => void }): JSX.Element {
    function valid(field: keyof(OpenXDA.Types.LineSegment)): boolean {
        if (field == 'Length')
            return props.Asset.Length != null && AssetAttributes.isRealNumber(props.Asset.Length);
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
        else if (field == 'FromBus' || field == 'ToBus')
            return true;
        return false;
    }


    React.useEffect(() => {
    }, [props.Asset]);

    if (props.Asset == null) return null;
    return (
        <>
            <Input<OpenXDA.Types.LineSegment> Record={props.Asset} Label={'Bus (from)'} Field={'FromBus'} Feedback={''} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.LineSegment> Record={props.Asset} Label={'Bus (to)'}  Field={'ToBus'} Feedback={''} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.LineSegment> Record={props.Asset} Field={'Length'} Feedback={'Length is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.LineSegment> Record={props.Asset} Field={'R0'} Feedback={'R0 is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.LineSegment> Record={props.Asset} Field={'X0'} Feedback={'X0 is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.LineSegment> Record={props.Asset} Field={'R1'} Feedback={'R1 is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.LineSegment> Record={props.Asset} Field={'X1'} Feedback={'X1 is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <Input<OpenXDA.Types.LineSegment> Record={props.Asset} Field={'ThermalRating'} Label={'Thermal Rating'} Feedback={'Thermal Rating is a required numeric field.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
            <CheckBox<OpenXDA.Types.LineSegment> Record={props.Asset} Field={'IsEnd'} Label={'End of Line?'} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0} />
        </>
    );
}

export default LineSegmentAttributes;