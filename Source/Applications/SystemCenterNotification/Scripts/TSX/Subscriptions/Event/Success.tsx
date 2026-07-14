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

import * as $ from 'jquery';
import * as React from 'react';
import { EmailType } from '../../global';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ActiveSubscriptionSlice, AssetGroupSlice, UserInfoSlice } from '../../Store';

declare var homePath;
declare var version;

interface IProps {
    emailTypeID: number,
    assetGroupID: number[]
}

const Success = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = React.useState<EmailType | null>(null);
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
                    UserName: '',
                    FirstName: '',
                    LastName: '',
                    RequireApproval: false
                }
            }));
        });
    }, [props.assetGroupID, props.emailTypeID])

    React.useEffect(() => {
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/EmailType/One/${props.emailTypeID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })
        h.done((d) => {
            setEmail(d);
        });

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }

    }, [props.emailTypeID])
    
    return (
        <div className="col">
            <div className="alert alert-success" style={{ margin: 'auto' }}>
                You have successfully subscribed to {email == null ? '' : email.Name + ' '}
                for {assetGrp.length > 1 ? (assetGrp.length + " Asset groups") : (assetGrp[0]?.Name ?? null)}.
                If approval is required, an Administrator will need to approve the subscription before you receive notifications.
            </div>
        </div>);
}

export default Success;