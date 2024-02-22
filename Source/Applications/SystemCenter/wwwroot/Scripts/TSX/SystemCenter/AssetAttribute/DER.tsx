//******************************************************************************************************
//  DER.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  10/19/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from './Asset';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

function DERAttributes<T extends OpenXDA.Types.DER>(props: { 
    NewEdit: Application.Types.NewEdit,
     Asset: T, 
     UpdateState: (newEditAsset: T) => void,
    Disabled?: boolean
 }): JSX.Element {

    const roles = useAppSelector(SelectRoles);

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    function valid(field: keyof (T)): boolean {
        if (field == 'FullRatedOutputCurrent')
            return props.Asset.FullRatedOutputCurrent != null && AssetAttributes.isRealNumber(props.Asset.FullRatedOutputCurrent);
        if (field == 'VoltageLevel')
            return props.Asset.VoltageLevel == 'Low' || props.Asset.VoltageLevel == 'Medium';
        return true;
    }

    const disable = (props.NewEdit == 'New' && props.Asset.ID != 0) || !hasPermissions() || (props.Disabled ?? false);
   
    return <div className="row">
        <div className="col-6">
            <Select<T> Record={props.Asset} Field={'VoltageLevel'} Label={'Voltage Level'} Options={[{ Value: 'Low', Label: 'Low' }, { Value: 'Medium', Label: 'Medium' }]} Setter={(record) => props.UpdateState(record)} Disabled={disable} />
        </div>
        <div className="col-6"> 
            <Input<T> Record={props.Asset} Field={'FullRatedOutputCurrent'} Label={'Full Rated Output Current (Amps)'} Feedback={'Full Rated Output Current must be a numeric value.'} Valid={valid} Setter={props.UpdateState} Disabled={disable} />
        </div>
    </div>
       

}

export default DERAttributes;