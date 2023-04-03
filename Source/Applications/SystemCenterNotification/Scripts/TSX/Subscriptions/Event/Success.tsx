//******************************************************************************************************
//  Success.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ActiveSubscriptionSlice, AssetGroupSlice, EmailTypeSlice, UserInfoSlice } from '../../Store';
import { useAppDispatch, useAppSelector } from '../../hooks';

declare var homePath;
declare var version;

interface IProps {
    emailTypeID: number,
    assetGroupID: number[]
}

const Success = (props: IProps) => {
    const dispatch = useAppDispatch();
    const email = useAppSelector((state) => EmailTypeSlice.Datum(state, props.emailTypeID));
    const assetGrp = useAppSelector((state) => AssetGroupSlice.Data(state).filter(ag => props.assetGroupID.includes(ag.ID)));
    const userID = useAppSelector(UserInfoSlice.UserAccountID);

    React.useEffect(() => {
        props.assetGroupID.forEach((id) => {
            dispatch(ActiveSubscriptionSlice.DBAction({
                verb: 'POST', record: {
                    ID: 0,
                    UserAccountID: userID,
                    EmailTypeID: props.emailTypeID,
                    AssetGroup: id.toString(),
                    Approved: false,
                    Category: '',
                    Email: '',
                    Subject: '',
                    UserAccountEmailID: 0,
                    EmailName: '',
                    LastSent: '',
                    UserName: ''
                }
            }));
        });
    }, [props.assetGroupID, props.emailTypeID])
    


    return <> <div className="row">
        <div className="col">
            <div className="row">
                <div className="alert alert-success">
                    You have successfully subscribed to {email == null ? '' : email.Name}
                    for {assetGrp.length > 1 ? (assetGrp.length + " Asset groups") : (assetGrp[0]?.Name ?? null)}.
                    If approval is required an Administrator will need to approve the subscription before you receive notifications.
                </div>
            </div>
        </div>
    </div>
    </>;
}

export default Success;