//******************************************************************************************************
//  EditionLockModal.tsx - Gbtc
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

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { ConfigSlice } from '../../Store/Store';
import { ServerErrorIcon, LoadingScreen, Modal } from '@gpa-gemstone/react-interactive';

interface IProps {
    EditionRequirement?: 'Enterprise' | 'Base',
    SetShow: (c: boolean) => void,
    Show: boolean
}

const EditionLockModal: React.FunctionComponent<IProps> = (props) => {
    let dispatch = useAppDispatch();
    const configStatus = useAppSelector(ConfigSlice.XDAConfigStatus);
    const config = useAppSelector(ConfigSlice.XDAConfig);

    React.useEffect(() => {
        if (configStatus == 'uninitiated' || configStatus == 'changed')
            dispatch(ConfigSlice.FetchXDAConfig());
    }, [configStatus]);

    const editionStatus = React.useMemo(() => (config.EditionStatus[props.EditionRequirement ?? 'Enterprise'] ?? false), [props.EditionRequirement, config.EditionStatus]);

    return (
        <Modal Title={`${props.EditionRequirement} is Required`}
            Show={props.Show && !editionStatus} ShowX={true} Size={'lg'} ShowCancel={false} ShowConfirm={false}
            CallBack={() => props.SetShow(false)}>
            {configStatus === 'loading' ? <LoadingScreen Show={true} /> :
                <>
                    <div className="row" style={{ width: "100%", height: "100px" }}>
                        <img src={`${homePath}Images/GiantLogo.png`} className="contain"
                            style={{ height: "100%", marginLeft: "auto", marginRight: "auto" }} />
                    </div>
                    <div className="row" style={{ justifyContent: "center", width: "100%" }}>
                        <ServerErrorIcon Show={true} Label={`${props.EditionRequirement ?? 'Enterprise'} Edition is required to use this feature.`} Size={50} />
                    </div>
                    <div className="row" style={{ justifyContent: "center", width: "100%", fontSize: '1.2em' }}>
                        <p style={{ width: "50%", whiteSpace: "preserve-spaces", textAlign: "center" }}>
                            Click <a href="mailto:support@gridprotectionalliance.org">here</a> if you believe you are receiving this message in error or would like to inquire about openXDA {props.EditionRequirement ?? 'Enterprise'} Edition.
                        </p>
                    </div>
                </>
            }
        </Modal>
    )
}

export default EditionLockModal;

