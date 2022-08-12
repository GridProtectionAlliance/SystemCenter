//******************************************************************************************************
//  EmailSelect.tsx - Gbtc
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

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Application as App, LoadingIcon, Page } from '@gpa-gemstone/react-interactive'
import { SVGIcons } from '@gpa-gemstone/gpa-symbols';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { EmailType } from '../global';
import { EmailCategorySlice, EmailTypeSlice, SettingSlice, UserInfoSlice } from '../Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import * as $ from 'jquery';

declare var homePath;
declare var version;

interface IProps {
    SetConfirmed: () => void,
}

const EmailSelect = (props: IProps) => {
    const dispatch = useAppDispatch();
   
    const [force, setForce] = React.useState<number>(-1);
    const [forceResend, setForceResend] = React.useState<number>(-1);

    const confirmed = useAppSelector(UserInfoSlice.ConfirmedEmail);
    const status = useAppSelector(UserInfoSlice.Status);

    React.useEffect(() => {
        dispatch(UserInfoSlice.Fetch());
    }, [force]);

    React.useEffect(() => {
        let handle = setTimeout(() => {
            setForce(x => x + 1);
        }, 15000);
        return () => { if (handle !== null) clearTimeout(handle); };
    }, [force])

    React.useEffect(() => {
        if (forceResend < 0)
            return;

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/Confirm/ResendEmail`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        })

        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [forceResend]);


    React.useEffect(() => {
        if (confirmed)
            props.SetConfirmed();
    }, [confirmed]);

    return <> <div className="row">
        <div className="col">
            <div className="alert alert-info">
                Please Confirm your Email by Clicking on the link provided in the email send to you.
                <LoadingIcon Show={status == 'loading'} />
                <button type="button" className="btn btn-secondary" onClick={() => { setForceResend(x=> x+1)}}>Resend Link</button>
            </div>
            </div>
        </div>
        </>;
}

export default EmailSelect;