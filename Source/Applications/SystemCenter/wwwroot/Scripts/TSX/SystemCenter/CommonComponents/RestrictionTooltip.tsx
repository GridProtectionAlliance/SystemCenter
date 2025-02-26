//******************************************************************************************************
//  EditionTooltip.tsx - Gbtc
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
//  02/19/2025 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ConfigSlice } from '../Store/Store';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import { SelectRoles } from '../Store/UserSettings';
import { Application } from '@gpa-gemstone/application-typings';

interface IProps {
    // Edition Requirement Defaults to Allow Any Edition
    EditionRequirement?: 'Enterprise' | 'Base',
    // Role Requirement Defaults to Allow to All Roles
    RolesRequirement?: Application.Types.SecurityRoleName[]
    SetMeetsRequirements: (status: boolean) => void,
    FeatureName: string,
    Target: string,
    Show: boolean
}

const RestrictionTooltip: React.FunctionComponent<IProps> = (props) => {
    let dispatch = useAppDispatch();

    const configStatus = useAppSelector(ConfigSlice.XDAConfigStatus);
    const config = useAppSelector(ConfigSlice.XDAConfig);

    const roles = useAppSelector(SelectRoles);

    const [inSpecifiedEdition, setInSpecifiedEdition] = React.useState<boolean>(false);
    const [inSpecifiedRoles, setInSpecifiedRoles] = React.useState<boolean>(false);

    const message: string = React.useMemo(() => {
        if (!inSpecifiedEdition) {
            switch (configStatus) {
                case 'error': return "Unable to retrieve edition status.";
                case 'idle': return `${props.FeatureName} is only available in ${props.EditionRequirement ?? 'Enterprise'} Edition.`;
                default: return "Validating License..."
            }
        }
        if (!inSpecifiedRoles) return `${props.FeatureName} is unavailable in your role(s).`;

        return undefined;
    }, [configStatus, inSpecifiedEdition, inSpecifiedRoles]);

    React.useEffect(() => {
        const editionResult = props.EditionRequirement != null ?
            (config.EditionStatus[props.EditionRequirement] ?? false) :
            true;
        setInSpecifiedEdition(editionResult);

        const roleResult = props.RolesRequirement != null ?
            props.RolesRequirement.some(role => roles.indexOf(role) >= 0) :
            true;
        setInSpecifiedRoles(roleResult);

        props.SetMeetsRequirements(editionResult && roleResult);
    }, [config.EditionStatus, props.EditionRequirement, props.RolesRequirement, roles]);

    React.useEffect(() => {
        if (configStatus == 'unintiated' || configStatus == 'changed')
            dispatch(ConfigSlice.FetchXDAConfig());
    }, [configStatus]);

    if (inSpecifiedEdition && inSpecifiedRoles) return null;

    return (
        <ToolTip Show={props.Show} Position={'bottom'} Target={props.Target}>
            {message}
        </ToolTip>
    );
}

export default RestrictionTooltip;

