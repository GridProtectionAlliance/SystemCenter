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

interface IProps {
    EditionRequirement?: 'Enterprise' | 'Base',
    SetInEdition: (status: boolean) => void,
    FeatureName: string,
    Target: string,
    Show: boolean
}

const EditionTooltip: React.FunctionComponent<IProps> = (props) => {
    let dispatch = useAppDispatch();

    const configStatus = useAppSelector(ConfigSlice.XDAConfigStatus);
    const config = useAppSelector(ConfigSlice.XDAConfig);

    const [inSpecifiedEdition, setInSpecifiedEdition] = React.useState<boolean>(false);

    React.useEffect(() => {
        const result = config.EditionStatus[props.EditionRequirement ?? 'Enterprise'] ?? false;
        setInSpecifiedEdition(result);
        props.SetInEdition(result);
    }, [config.EditionStatus, props.EditionRequirement]);

    React.useEffect(() => {
        if (configStatus == 'unintiated' || configStatus == 'changed')
            dispatch(ConfigSlice.FetchXDAConfig());
    }, [configStatus]);

    if (inSpecifiedEdition) return null;

    const message: string = React.useMemo(() => {
        switch (configStatus) {
            case 'error': return "Unable to retrieve edition status.";
            case 'idle': return `${props.FeatureName} is only available in ${props.EditionRequirement ?? 'Enterprise'} Edition.`;
            default: return "Retrieving edition status..."
        }
    }, [configStatus]);

    return (
        <ToolTip Show={props.Show} Position={'bottom'} Target={props.Target}>
            {message}
        </ToolTip>
    );
}

export default EditionTooltip;

