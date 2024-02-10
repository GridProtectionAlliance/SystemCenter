//******************************************************************************************************
//  CapBankRelay.tsx - Gbtc
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
//  08/12/2020 - C. Lackner
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

function CapBankRelayAttributes(props: { NewEdit: Application.Types.NewEdit, Asset: OpenXDA.Types.CapBankRelay, UpdateState: (newEditAsset: OpenXDA.Types.CapBankRelay) => void }): JSX.Element {

    const roles = useAppSelector(SelectRoles);

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    function valid(field: keyof (OpenXDA.Types.CapBankRelay)): boolean {
        if (field == 'OnVoltageThreshhold')
            return props.Asset.OnVoltageThreshhold != null && AssetAttributes.isRealNumber(props.Asset.OnVoltageThreshhold);
        if (field == 'CapBankNumber')
            return props.Asset.CapBankNumber != null && AssetAttributes.isInteger(props.Asset.CapBankNumber);
        return true;
    }
    return <>
    <div className="row">
        <div className="col-6">
            <Input<OpenXDA.Types.CapBankRelay> Record={props.Asset} Field={'CapBankNumber'} Label={'Protected CapBank'} Feedback={'An integer Protected CapBank value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
        </div>
        <div className="col-6">
            <Input<OpenXDA.Types.CapBankRelay> Record={props.Asset} Field={'OnVoltageThreshhold'} Label={'Relay On Voltage Threshhold (pu)'} Feedback={'A numeric Relay On Voltage Threshhold value is required.'} Valid={valid} Setter={props.UpdateState} Disabled={props.NewEdit == 'New' && props.Asset.ID != 0 || !hasPermissions()} />
        </div>
    </div>
       </>;

}

export default CapBankRelayAttributes;