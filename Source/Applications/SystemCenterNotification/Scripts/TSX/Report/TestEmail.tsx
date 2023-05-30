//******************************************************************************************************
//  TestEmail.tsx - Gbtc
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

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { Warning } from '@gpa-gemstone/react-interactive'
import { UserInfoSlice } from '../Store';
import {  ScheduledEmailType } from '../global';
import * as $ from 'jquery';

declare var homePath;
declare var version;

interface IProps { show: boolean, record: ScheduledEmailType, OnClose: () => void }

const TestEmail = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const userID = useAppSelector(UserInfoSlice.UserAccountID);
    let portalID: string = "TestEmailOuter";

    React.useEffect(() => {
        if (props.show)
            setShowWarning(props.show)
    }, [props.show])

    function sendEmail() {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/ScheduledEmailType/Test/${props.record.ID}/${userID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });
    }

    return (
        <div id={portalID}>
            <Warning Message={'This will send a report to the email address associated with your account.'} Show={showWarning} Title={'Send Test Report '}
                CallBack={(conf) => { if (conf) sendEmail(); setShowWarning(false);  props.OnClose(); }} />
        </div>)
}

export default TestEmail;