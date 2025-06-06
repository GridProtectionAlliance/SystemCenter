//******************************************************************************************************
//  EditionRestrictionTooltip.tsx - Gbtc
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

import { ToolTip } from '@gpa-gemstone/react-forms';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ConfigSlice } from '../../Store/Store';

interface IProps {
    EditionRequirement?: 'Enterprise' | 'Base',
    SetMeetsRequirements: (status: boolean) => void,
    FeatureName: string,
    Target: string,
    Show: boolean
}

const EditionRestrictionTooltip: React.FunctionComponent<IProps> = (props) => {
    let dispatch = useAppDispatch();

    const configStatus = useAppSelector(ConfigSlice.XDAConfigStatus);
    const config = useAppSelector(ConfigSlice.XDAConfig);

    const inSpecifiedEdition: boolean = React.useMemo(() => {
        const editionResult = config.EditionStatus[props.EditionRequirement] ?? false;
        props.SetMeetsRequirements(editionResult);
        return editionResult;
    }, [config.EditionStatus, props.EditionRequirement]);

    const message: string = React.useMemo(() => {
        if (!inSpecifiedEdition) {
            switch (configStatus) {
                case 'error': return "Unable to retrieve edition status.";
                case 'idle': return `${props.FeatureName} is only available in ${props.EditionRequirement ?? 'Enterprise'} Edition.`;
                default: return "Validating License..."
            }
        }
        return undefined;
    }, [configStatus, inSpecifiedEdition]);

    React.useEffect(() => {
        if (configStatus == 'unintiated' || configStatus == 'changed')
            dispatch(ConfigSlice.FetchXDAConfig());
    }, [configStatus]);

    if (inSpecifiedEdition) return null;

    return (
        <ToolTip Show={props.Show} Position={'bottom'} Target={props.Target}>
            {message}
        </ToolTip>
    );
}

export default EditionRestrictionTooltip;
