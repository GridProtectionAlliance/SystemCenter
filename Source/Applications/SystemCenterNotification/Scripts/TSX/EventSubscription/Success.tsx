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

import { Provider, useDispatch, useSelector } from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Application as App, LoadingIcon, Page } from '@gpa-gemstone/react-interactive'
import { SVGIcons } from '@gpa-gemstone/gpa-symbols';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { EmailType } from '../global';
import { ActiveSubscriptionSlice, AssetGroupSlice, EmailCategorySlice, EmailTypeSlice, SettingSlice, UserInfoSlice } from '../Store';
import * as $ from 'jquery';

declare var homePath;
declare var version;

interface IProps {
    emailTypeID: number,
    assetGroupID: number
}

const Success = (props: IProps) => {
    const dispatch = useDispatch();
    const email = useSelector((state) => EmailTypeSlice.Datum(state, props.emailTypeID));
    const assetGrp = useSelector((state) => AssetGroupSlice.Datum(state, props.assetGroupID));
    const userID = useSelector(UserInfoSlice.UserAccountID);

    React.useEffect(() => {
        dispatch(ActiveSubscriptionSlice.DBAction({
            verb: 'POST', record: {
                ID: 0,
                UserAccountID: userID,
                EmailTypeID: props.emailTypeID,
                AssetGroup: props.assetGroupID.toString(),
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
    }, [props.assetGroupID, props.emailTypeID])
    


    return <> <div className="row">
        <div className="col">
            <div className="row">
                <div className="alert alert-success">
                    You have successfully subscribed to {email == null ? '' : email.Name} for {assetGrp == null ? '' : assetGrp.Name}.
                    If approval is required an Administrator will need to approve the subscription before you receive notifications.
                </div>
            </div>
        </div>
    </div>
    </>;
}

export default Success;