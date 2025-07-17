//******************************************************************************************************
//  EmailConfirmed.tsx - Gbtc
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
import { LoadingScreen } from '@gpa-gemstone/react-interactive'
import { Application } from '@gpa-gemstone/application-typings';
import { UserInfoSlice } from '../Store';
import { useAppSelector } from '../hooks';
import * as $ from 'jquery';

declare var homePath;
declare var version;

const EmailConfirmed = (props: { useParams: { code: string } }) => {

    const [success, setSuccess] = React.useState<boolean>(false);
    const [state, setState] = React.useState<Application.Types.Status>('unintiated');
    const [forceResend, setForceResend] = React.useState<number>(-1);

    const status = useAppSelector(UserInfoSlice.Status);

    React.useEffect(() => {
        if (status != 'idle' || state == 'loading')
            return;

        setState('loading');
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/Confirm/Email/${props.useParams.code}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).then((d) => {
            setState('idle');
            setSuccess(d == 1);
        }, () => {
            setSuccess(false);
            setState('error');
        });

        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [status]);

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

    function getClass() {
        if (state == 'idle' && success)
            return 'success'
        if (state == 'error')
            return 'danger'
        return 'info'
    }

    function getText() {
        if (state == 'loading')
            return 'Validating Link...' 
        if (state == 'idle' && success)
            return 'Your email has been confirmed.'
        if (state == 'error')
            return ' An Error Occurred. Please contact your administrator.'
        return 'The Link was no longer valid. It may have expired.'
    }


    return <>
        <div className="row">
            <div className="col">
                <LoadingScreen Show={state == 'loading' || status != 'idle'}/>
                <div className={"alert alert-" + getClass()}>
                    <p>{getText()}</p>
                    {!success && state == 'idle'? < button type="button" className="btn btn-info"
                        onClick={() => { setForceResend(x => x + 1) }}>Resend Link</button> : null}
                </div> 
            </div>
        </div>
        </>;
}

export default EmailConfirmed;