//******************************************************************************************************
//  Bus.tsx - Gbtc
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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'; 
import { CheckBox } from '@gpa-gemstone/react-forms'
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

function BusAttributes(props: { NewEdit: Application.Types.NewEdit, Asset: OpenXDA.Types.Bus, UpdateState: (newEditAsset: OpenXDA.Types.Bus) => void }): JSX.Element {

    const roles = useAppSelector(SelectRoles);

    const disable = React.useMemo(() => {
        return (
            (props.NewEdit == 'New' && props.Asset.ID != 0) ||
            (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
        );
    }, [props.NewEdit, props.Asset.ID, roles]);

    return  <div className="col-4">
        <CheckBox<OpenXDA.Types.Bus> Record={props.Asset} Field={'Spare'} Label={'Is a Spare Bus'} Setter={props.UpdateState} Disabled={disable} />
    </div>
}

export default BusAttributes;