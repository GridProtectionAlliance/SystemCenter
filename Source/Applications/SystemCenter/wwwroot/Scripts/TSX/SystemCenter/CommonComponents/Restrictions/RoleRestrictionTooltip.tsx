//******************************************************************************************************
//  RoleRestrictionTooltip.tsx - Gbtc
//
//  Copyright © 2025, Grid Protection Alliance.  All Rights Reserved.
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
//  06/06/2025 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application } from '@gpa-gemstone/application-typings';
import { ToolTip } from '@gpa-gemstone/react-forms';
import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { SelectRoles } from '../../Store/UserSettings';

interface IProps {
    RolesRequirement?: Application.Types.SecurityRoleName[]
    SetMeetsRequirements: (status: boolean) => void,
    FeatureName: string,
    Target: string,
    Show: boolean
}

const RoleRestrictionTooltip: React.FunctionComponent<IProps> = (props) => {
    const roles = useAppSelector(SelectRoles);

    const inSpecifiedRoles: boolean = React.useMemo(() => {
        const roleResult = props.RolesRequirement.some(role => roles.indexOf(role) >= 0);
        props.SetMeetsRequirements(roleResult);
        return roleResult;
    }, [props.RolesRequirement, roles]);

    if (inSpecifiedRoles) return null;

    return (
        <ToolTip Show={props.Show} Position={'bottom'} Target={props.Target}>
            {`${props.FeatureName} is unavailable in your role(s).`}
        </ToolTip>
    );
}

export default RoleRestrictionTooltip;
