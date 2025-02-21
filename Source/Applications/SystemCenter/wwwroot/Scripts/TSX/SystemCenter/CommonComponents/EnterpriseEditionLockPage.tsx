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
import { ServerErrorIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';

interface IProps {
    EditionRequirement?: 'Enterprise' | 'Base'
}

const EnterpriseEditionLockPage: React.FunctionComponent<IProps> = (props) => {
    let dispatch = useAppDispatch();
    const configStatus = useAppSelector(ConfigSlice.XDAConfigStatus);
    const config = useAppSelector(ConfigSlice.XDAConfig);

    React.useEffect(() => {
        if (configStatus == 'unintiated' || configStatus == 'changed')
            dispatch(ConfigSlice.FetchXDAConfig());
    }, [configStatus]);

    if (config.EditionStatus[props.EditionRequirement ?? 'Enterprise'] ?? false) return <>{props.children}</>;

    // Note: Using loading screen this way is intentional, we don't want the error screen to begin rendering before we check the edition
    return (
        <div className={"container-fluid d-flex h-100 flex-column"}>
            { configStatus === 'loading' ? <LoadingScreen Show={true} /> :
                                <div className="col" style={{ height: "100%", width: "100%" }}>
                    <div className="row" style={{ width: "100%", height: "45%", minHeight: "200px", paddingBottom: "50px" }}>
                                        <img src={`${homePath}Images/GiantLogo.png`} className="contain"
                            style={{ height: "100%", marginLeft: "auto", marginRight: "auto" }} />
                                    </div>
                    <div className="row" style={{ justifyContent: "center", width: "100%", paddingBottom: "50px" }}>
                        <ServerErrorIcon Show={true} Label={`${props.EditionRequirement ?? 'Enterprise'} Edition is required to use this feature.`} Size={75} />
                                    </div>
                                </div>
                        }
        </div>
    )
}

export default EnterpriseEditionLockPage;

