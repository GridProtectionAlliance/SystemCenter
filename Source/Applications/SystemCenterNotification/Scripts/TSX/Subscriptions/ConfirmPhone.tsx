//******************************************************************************************************
//  ConfirmPhone.tsx - Gbtc
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
import { UserInfoSlice } from '../Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import * as $ from 'jquery';
import { IsInteger, IsNumber } from '@gpa-gemstone/helper-functions';

declare var homePath;
declare var version;

interface IProps {
    SetConfirmed: () => void,
}

const ConfirmPhone = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [forceResend, setForceResend] = React.useState<number>(0);
    const [number, setNumber] = React.useState<number>(0);
    const [code, setCode] = React.useState<number>(-1);

    const confirmed = useAppSelector(UserInfoSlice.ConfirmedPhone);

    React.useEffect(() => {
        if (forceResend < 0)
            return;

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/Confirm/ResendText`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).then((d) => { setCode(d); })

        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [forceResend]);


    React.useEffect(() => {
        if (confirmed)
            props.SetConfirmed();
    }, [confirmed]);

    React.useEffect(() => {
        if (code > 0 && code == number)
            $.ajax({
                type: "GET",
                url: `${homePath}api/Confirm/Phone/${number}`,
                contentType: "application/json; charset=utf-8",
                cache: false,
                async: true
            }).then((d) => {
                dispatch(UserInfoSlice.Fetch());
            });
    }, [code, number]);


    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <div className="alert alert-info" style={{ margin: 'auto' }}>
                        Please confirm your phone number by entering the 5 digit code received by Text message.
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: 15 }}>
                    <div className="col">
                        <button type="button" className="btn btn-secondary btn-block" onClick={() => { setForceResend(x => x + 1) }}>Resend Text Message</button>
                    </div>
                </div>
                <div className="row" style={{ marginTop: 15 }}>
                    <div className="col">
                        <form>
                            <div className="form-row">
                                <div className="col-4">
                                </div>
                                <div className="col">
                                    <input type="number" max={9} min={0} className="form-control" value={Math.floor(number / 10000)} onChange={(evt) => {
                                        if (IsInteger(evt.target.value))
                                            setNumber(x => x + 10000 * (-Math.floor(number / 10000) + parseInt(evt.target.value)))
                                    }} width={100} />
                                </div>
                                <div className="col">
                                    <input type="number" max={9} min={0} className="form-control" value={Math.floor(number / 1000) % 10} onChange={(evt) => {
                                        if (IsInteger(evt.target.value))
                                            setNumber(x => x + 1000 * (-Math.floor(number / 1000) % 10 + parseInt(evt.target.value)))
                                    }} />
                                </div>
                                <div className="col">
                                    <input type="number" max={9} min={0} className="form-control" value={Math.floor((number % 1000) / 100) % 10} onChange={(evt) => {
                                        if (IsNumber(evt.target.value))
                                            setNumber(x => x + 100 * (-Math.floor((number % 1000) / 100) % 10 +  parseInt(evt.target.value)))
                                    }} />
                                </div>
                                <div className="col">
                                    <input type="number" max={9} min={0} className="form-control" value={Math.floor((number % 100) / 10) % 10} onChange={(evt) => {
                                        if (IsNumber(evt.target.value))
                                            setNumber(x => x + 10 * (-Math.floor((number % 100) / 10) % 10 + parseInt(evt.target.value)))
                                    }} />
                                </div>
                                <div className="col">
                                    <input type="number" max={9} min={0} className="form-control" value={number % 10} onChange={(evt) => {
                                        if (IsNumber(evt.target.value))
                                            setNumber(x => x - (x % 10) + parseInt(evt.target.value))
                                    }} width={100} />
                                </div>
                                <div className="col-3">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
}

export default ConfirmPhone;