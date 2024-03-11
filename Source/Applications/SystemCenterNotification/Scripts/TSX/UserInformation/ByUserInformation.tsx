//******************************************************************************************************
//  ByUserInformation.tsx - Gbtc
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
import {  ToolTip } from '@gpa-gemstone/react-interactive'
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { useAppDispatch, useAppSelector } from '../hooks';
import { CellCarrierSlice, UserInfoSlice } from '../Store';
import { IsInteger } from '@gpa-gemstone/helper-functions';
import EmailConfirm from '../Subscriptions/ConfirmEmail';


declare var homePath;
declare var version;

interface IProps {}

const ByUserInformation = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [phone, setPhone] = React.useState<string>('');
    const [carrierID, setCarrierID] = React.useState<number>(-1);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const [validPhone, setValidPhone] = React.useState<boolean>(false);
    
    const carriers = useAppSelector(CellCarrierSlice.Data);
    const carrierStatus = useAppSelector(CellCarrierSlice.Status);
    const userPhone = useAppSelector(UserInfoSlice.CellPhone);
    const userCarrier = useAppSelector(UserInfoSlice.CellCarrierID);
    const emailConfirmed = useAppSelector(UserInfoSlice.ConfirmedEmail);

    

    React.useEffect(() => {
        if (carrierStatus == 'unintiated' || carrierStatus == 'changed')
            dispatch(CellCarrierSlice.Fetch());
    }, [carrierStatus]);

    React.useEffect(() => {
        if (userPhone != null && userPhone.length > 0)
            setPhone(userPhone);
    }, [userPhone]);

    React.useEffect(() => {
        if (userCarrier >= 0)
            setCarrierID(userCarrier);
    }, [userCarrier])

    React.useEffect(() => {
        let r = phone != null && phone.length >= 10;
        r = r && IsInteger(phone.replace('-', ''));
        setValidPhone(r);
    }, [phone])

    return (
        <>
            <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
                <div className="card" style={{ marginBottom: 10 }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Contact Information:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Cell Phone</label>
                                    <input
                                        className={"form-control" + (validPhone? '' : ' is-invalid')}
                                        type="tel"
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                        onChange={(evt) => {
                                            setPhone(evt.target.value);
                                        }}
                                        value={phone}
                                    />
                                    <div className="invalid-feedback">
                                        A valid Cell Phone is required.
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Cell Carrier</label>
                                    <select
                                        className={"form-control"}
                                        onChange={(evt) => {
                                            setCarrierID(parseInt(evt.target.value));
                                        }}
                                        value={carrierID != null? carrierID.toString() : -1}
                                    >
                                        {carriers.map((c, i) => (
                                            <option key={i} value={c.ID}>
                                                {c.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {!emailConfirmed ? <EmailConfirm SetConfirmed={() => { }} /> : null}
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-primary" + (validPhone && (phone != userPhone || carrierID != userCarrier) ? '' : ' disabled')} type="submit"
                                onClick={() => {
                                    if (validPhone && phone != userPhone)
                                        dispatch(UserInfoSlice.UpdatePhone(userPhone));
                                    if (carrierID != userCarrier)
                                        dispatch(UserInfoSlice.UpdateCarrier(carrierID));
                                }}
                                data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                        </div>
                        <ToolTip Show={(!validPhone || (phone == userPhone && carrierID == userCarrier)) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                            {!validPhone ? <p> {CrossMark} A valid Cell Phone is required.</p> : null}
                            {(phone == userPhone && carrierID == userCarrier) ? <p> No Changes were made.</p> : null}
                        </ToolTip>
                        <div className="btn-group mr-2">
                            <button className={"btn btn-default" + (phone != userPhone || carrierID != userCarrier ? '' : ' disabled')} data-tooltip="clear"
                                onClick={() => {
                                    setPhone(userPhone);
                                    setCarrierID(userCarrier);
                                }}
                                onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                        </div>
                        <ToolTip Show={hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                            {(phone == userPhone && carrierID == userCarrier) ? <p> No Changes were made.</p> : null}
                            {(phone != userPhone) ? <p> {Warning} Changes to Cell Phone will be lost.</p> : null}
                            {(carrierID != userCarrier) ? <p> {Warning} Changes to Cell Carrier will be lost.</p> : null}
                        </ToolTip>
                    </div>
                </div>
            </div>
        </>)
}

export default ByUserInformation;