//******************************************************************************************************
//  GeneralInfo.tsx - Gbtc
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
import {ToolTip } from '@gpa-gemstone/react-interactive'
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import {  EmailType } from '../global';
import {  EmailTypeSlice } from '../Store';
import { IsNumber } from '@gpa-gemstone/helper-functions';
import EmailForm from './EmailForm';

declare var homePath;
declare var version;

interface IProps { Record: EmailType}



const GeneralInfo = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState<EmailType>(props.Record);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const allEmails = useAppSelector(EmailTypeSlice.Data);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        let e = [];
        if (email.Name == undefined || email.Name.length < 1)
            e.push('A Name is required');
        if (email.Name != undefined && email.Name.length > 50)
            e.push('Name cannot exceed 50 characters.');
        if (email.FilePath != undefined && email.FilePath.length > 200)
            e.push('File path cannot exceed 200 characters.')
        if (allEmails.findIndex(s => s.Name === email.Name && s.ID !== email.ID) >= 0)
            e.push('An Email with this Name already exists');
        if (email.EmailCategoryID < 0)
            e.push('A Category has to be selected.');
        if (!IsNumber(email.MinDelay))
            e.push('A valid minimum delay is required.');
        if (!IsNumber(email.MaxDelay))
            e.push('A valid maximum delay is required.');
        if (email.MinDelay > email.MaxDelay)
            e.push('The minimum delay can not be more than the maximum delay.')
        if (email.MaxDelay < email.MinDelay)
            e.push('The maximum delay can not be less than the minimum delay.')
        setErrors(e);
    }, [email])


    React.useEffect(() => {
        setEmail(props.Record);
    }, [props.Record])

    React.useEffect(() => {
        let h = true;
        h = h && email.Name == props.Record.Name;
        h = h && email.EmailCategoryID == props.Record.EmailCategoryID;
        h = h && email.RequireApproval == props.Record.RequireApproval;
        h = h && email.ShowSubscription == props.Record.ShowSubscription;

        h = h && email.FilePath == props.Record.FilePath;
        h = h && email.MinDelay == props.Record.MinDelay;
        h = h && email.MaxDelay == props.Record.MaxDelay;
        h = h && email.SMS == props.Record.SMS;

        setHasChanged(!h);
    }, [props.Record, email])


    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Notification Information:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <EmailForm record={email} setRecord={(e) => { setEmail(e);  }} />
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-primary" + (errors.length == 0 && hasChanged ? '' : ' disabled')} type="submit"
                                onClick={() => { if (errors.length == 0 && hasChanged) dispatch(EmailTypeSlice.DBAction({ verb: 'PATCH', record: email })); }}
                                data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className={"btn btn-default" + (hasChanged ? '' : ' disabled')} data-tooltip="clear"
                                onClick={() => { setEmail(props.Record); setHasChanged(false); }}
                                onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToolTip Show={(errors.length > 0 || !hasChanged) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                {!hasChanged ? <p> No changes made.</p> : null}
                {errors.map((t, i) => <p key={i}>
                    {CrossMark} {t}
                </p>)}
            </ToolTip>
            <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                {props.Record.Name != email.Name ? <p> {Warning} Changes to Name will be discarded.</p> : null}
                {props.Record.EmailCategoryID != email.EmailCategoryID ? <p> {Warning} Changes to Category will be discarded.</p> : null}
                {props.Record.MaxDelay != email.MaxDelay ? <p> {Warning} Changes to maximum delay will be discarded.</p> : null}
                {props.Record.MinDelay != email.MinDelay ? <p> {Warning} Changes to minimum delay will be discarded.</p> : null}
                {props.Record.SMS != email.SMS ? <p> {Warning} Changes to notification type will be discarded.</p> : null}
                {props.Record.ShowSubscription != email.ShowSubscription ? <p> {Warning} Changes to self subscription will be discarded.</p> : null}
                {props.Record.RequireApproval != email.RequireApproval ? <p> {Warning} Changes to approval requirement will be discarded.</p> : null}
                {props.Record.FilePath != email.FilePath ? <p> {Warning} Changes to the file path will be discarded.</p> : null}
            </ToolTip>
        </div>
        )
}

export default GeneralInfo;