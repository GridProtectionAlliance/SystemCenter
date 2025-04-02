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
import { ICellCarrier } from '../global';
import { Select } from '@gpa-gemstone/react-forms';
import { Input } from '@gpa-gemstone/react-forms';


declare var homePath;
declare var version;

const emptyCarrier: ICellCarrier = { ID: -1, Name: '', Transform: '' };

interface IProps {}

const ByUserInformation = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [phone, setPhone] = React.useState<{ phone: string }>({phone: ''});
    const [carrier, setCarrier] = React.useState<ICellCarrier>(emptyCarrier);
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
            setPhone({phone:userPhone});
    }, [userPhone]);

    React.useEffect(() => {
        if (userCarrier != null && userCarrier >= 0 && carriers.length > 0)
            setCarrier(carriers.find((c) => c.ID == userCarrier));
    }, [userCarrier, carriers]);

    React.useEffect(() => {
        let r = phone.phone != null && phone.phone.length >= 10 && phone.phone.length <= 200;
        r = r && IsInteger(phone.phone.replace('-', ''));
        setValidPhone(r);
    }, [phone]);

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Contact Information:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <Input
                                        Record={phone}
                                        Field={'phone'}
                                        Label={'Cell Phone'}
                                        Help={'Enter your cellular number as numbers only. Do not include any special characters.'}
                                        Feedback={'A valid Cell Phone is required.'}
                                        Valid={(r) => validPhone}
                                        Setter={(evt) => {setPhone(evt);}}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <Select<ICellCarrier> Record={carrier} Field={'ID'} Label='Cell Carrier' Help={'An incorrect selection will result in texts being undeliverable. If you do not see your Carrier, contact your administrator.'} Setter={(record) => setCarrier({ ...record, ID: typeof record.ID == 'string' ? parseInt(record.ID) : record.ID })}
                                        Options={carriers.map((e) => { return { Label: e.Name, Value: e.ID.toString() } })} />
                                </div>
                            </div>
                        </div>
                        {!emailConfirmed ? <EmailConfirm SetConfirmed={() => { }} /> : null}
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-primary" + (validPhone && (phone.phone != userPhone || carrier.ID != userCarrier) ? '' : ' disabled')} type="submit"
                                onClick={() => {
                                    if (validPhone && phone.phone != userPhone)
                                        dispatch(UserInfoSlice.UpdatePhone(phone.phone));
                                    if (carrier.ID != userCarrier)
                                        dispatch(UserInfoSlice.UpdateCarrier(carrier.ID));
                                }}
                                data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className={"btn btn-default" + (phone.phone != userPhone || carrier.ID != userCarrier ? '' : ' disabled')} data-tooltip="clear"
                                onClick={() => {
                                    setPhone(phone);
                                    setCarrier(carriers.find((c) => c.ID == userCarrier));
                                }}
                                onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToolTip Show={(!validPhone || (phone.phone == userPhone && carrier.ID == userCarrier)) && hover == 'submit'} Position={'top'} Target={"submit"}>
                {!validPhone ? <p> {CrossMark} A valid Cell Phone is required.</p> : null}
                {(phone.phone == userPhone && carrier.ID == userCarrier) ? <p> No Changes were made.</p> : null}
            </ToolTip>
            <ToolTip Show={hover == 'clear'} Position={'top'} Target={"clear"}>
                {(phone.phone == userPhone && carrier.ID == userCarrier) ? <p> No Changes were made.</p> : null}
                {(phone.phone != userPhone) ? <p> {Warning} Changes to Cell Phone will be lost.</p> : null}
                {(carrier.ID != userCarrier) ? <p> {Warning} Changes to Cell Carrier will be lost.</p> : null}
            </ToolTip>
        </div>)
}

export default ByUserInformation;