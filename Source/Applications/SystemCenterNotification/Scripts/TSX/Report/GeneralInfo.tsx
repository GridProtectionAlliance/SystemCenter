//******************************************************************************************************
//  GeneralInfo.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  04/10/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import {ToolTip } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ScheduledEmailType } from '../global';
import { ScheduledEmailTypeSlice } from '../Store';
import { IsCron } from '@gpa-gemstone/helper-functions';
import ReportForm from './ReportForm';

declare var homePath;
declare var version;

interface IProps { Record: ScheduledEmailType }


const GeneralInfo = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState<ScheduledEmailType>(props.Record);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const allEmails = useAppSelector(ScheduledEmailTypeSlice.Data);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        let e = [];
        if (email.Name == undefined || email.Name.length < 1)
            e.push('A Name is required');
        if (allEmails.findIndex(s => s.Name === email.Name && s.ID !== email.ID) >= 0)
            e.push('An Email with this Name already exists');
        if (email.EmailCategoryID < 0)
            e.push('A Category has to be selected.');
        if (email.Schedule == null || !IsCron(email.Schedule))
            e.push('A valid schedule is required.');
        setErrors(e);
    }, [email])

    React.useEffect(() => {
        setEmail(props.Record);
    }, [props.Record])

    React.useEffect(() => {
        let h = true;
        h = h && email.Name == props.Record.Name;
        h = h && email.EmailCategoryID == props.Record.EmailCategoryID;
        h = h && email.Schedule == props.Record.Schedule;
        h = h && email.ShowSubscription == props.Record.ShowSubscription;
        h = h && email.RequireApproval == props.Record.RequireApproval;

        h = h && email.FilePath == props.Record.FilePath;
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
                                <h4>Report Information:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <ReportForm record={email} setRecord={(e) => { setEmail(e); }} />
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-primary" + (errors.length == 0 && hasChanged ? '' : ' disabled')} type="submit"
                                onClick={() => {
                                    if (errors.length == 0 && hasChanged) {
                                        dispatch(ScheduledEmailTypeSlice.DBAction({ verb: 'PATCH', record: email }));
                                    }
                                }}
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
            <ToolTip Show={(errors.length > 0 || !hasChanged) && hover == 'submit'} Position={'top'} Target={"submit"}>
                {!hasChanged ? <p> No changes made.</p> : null}
                {errors.map((t, i) => <p key={i}>
                    <ReactIcons.CrossMark Color="var(--danger)" /> {t}
                </p>)}
            </ToolTip>
            <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Target={"clear"}>
                {props.Record.Name != email.Name ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to Name will be discarded.</p> : null}
                {props.Record.EmailCategoryID != email.EmailCategoryID ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to Category will be discarded.</p> : null}
                {props.Record.SMS != email.SMS ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to delivery type will be discarded.</p> : null}
                {props.Record.Schedule != email.Schedule ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to schedule will be discarded.</p> : null}
                {props.Record.FilePath != email.FilePath ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to the file path will be discarded.</p> : null}
            </ToolTip>
        </div>
        )
}

export default GeneralInfo;