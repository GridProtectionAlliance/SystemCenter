//******************************************************************************************************
//  EnterpriseEditionLockPage.tsx - Gbtc
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
//  01/14/2025 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ConfigSlice } from '../Store/Store';
import { ServerErrorIcon } from '@gpa-gemstone/react-interactive';

interface IProps {
    Style?: React.CSSProperties,
    ClassName?: string,
    EditionRequirement?: 'Enterprise' | 'Base'
}

const EnterpriseEditionLockPage: React.FunctionComponent<IProps> = (props) => {
    let dispatch = useAppDispatch();

    const configStatus = useAppSelector(ConfigSlice.XDAConfigStatus);
    const config = useAppSelector(ConfigSlice.XDAConfig);
    const inSpecifiedEdition = React.useMemo(() => (config.EditionStatus[props.EditionRequirement ?? 'Enterprise'] ?? false), [config.EditionStatus, props.EditionRequirement]);

    React.useEffect(() => {
        if (configStatus == 'unintiated' || configStatus == 'changed')
            dispatch(ConfigSlice.FetchXDAConfig());
    }, [configStatus]);

    // Note: Using loading screen this way is intentional, we don't want the error screen to begin rendering before we check the edition
    return (
        <div style={props.Style} className={props.ClassName}>
            {
                inSpecifiedEdition ?
                    props.children : 
                    <div className="col" style={{ height: "100%", width: "100%" }}>
                        <div className="row" style={{ width: "100%", height: "50%", display: "grid", alignItems: "end" }}>
                            <img src={`${homePath}Images/GiantLogo.png`} className="contain"
                                style={{ width: "40%", paddingBottom: "50px", marginLeft: "auto", marginRight: "auto" }} />
                        </div>
                        <div className="row" style={{ alignItems: "top", justifyContent: "center", width: "100%", height: `50%` }}>
                            <ServerErrorIcon Show={true} Label={'Enterprise Edition is Required to Use this Feature'} Size={100} />
                        </div>
                    </div>
                }
        </div>
    )
}

export default EnterpriseEditionLockPage;

