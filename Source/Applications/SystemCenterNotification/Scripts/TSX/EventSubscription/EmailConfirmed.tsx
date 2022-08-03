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

import { Provider, useDispatch, useSelector } from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Application as App, LoadingIcon, LoadingScreen, Page } from '@gpa-gemstone/react-interactive'
import { SVGIcons } from '@gpa-gemstone/gpa-symbols';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { EmailType } from '../global';
import { EmailCategorySlice, EmailTypeSlice, SettingSlice, UserInfoSlice } from '../Store';
import { Select } from '@gpa-gemstone/react-forms';
import * as $ from 'jquery';

declare var homePath;
declare var version;

const EmailConfirmed = (props: {}) => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const status = useSelector(UserInfoSlice.Status);

    React.useEffect(() => {
        if (status != 'idle' || loading)
            return;

        setLoading(true);
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/Confirm/Email`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).then((d) => {
            setLoading(false);
            setSuccess(d == 1);
        }, () => {
            setSuccess(false);
            setLoading(false);
        });

        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [status]);

    return <>
        <div className="row">
            <div className="col">
                <LoadingScreen Show={loading || status != 'idle'}/>
                {success ? <div className="alert alert-info">
                    Your email has been confirmed.
                </div> :
                    <div className="alert alert-danger">
                        An Error Occurred. Please contact your administrator.
                    </div>
                }
            </div>
        </div>
        </>;
}

export default EmailConfirmed;