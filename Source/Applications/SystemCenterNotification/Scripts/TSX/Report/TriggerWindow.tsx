//******************************************************************************************************
//  TriggerWindow.tsx - Gbtc
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
//  04/17/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch } from '../hooks';
import * as React from 'react';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ScheduledEmailType } from '../global';
import { ScheduledEmailTypeSlice } from '../Store';
import moment from 'moment';

declare var homePath;
declare var version;
const momentDateTimeFormat = "MM/DD/YYYY HH:mm:ss.SSS";

interface IProps { Record: ScheduledEmailType }


const TriggerWindow = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState<ScheduledEmailType>(props.Record);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const [triggerSQL, setTriggerSQL] = React.useState<string>(props.Record.TriggerEmailSQL);

    const [triggerStatus, setTriggerStatus] = React.useState<('idle' | 'loading' | 'valid' | 'invalid')>('idle')
    const [triggers, setTriggers] = React.useState<boolean>(false)
    const [selectedDateTime, setSelectedDateTime] = React.useState<{ dateTime: string }>({ dateTime: moment.utc().format(momentDateTimeFormat) });

    React.useEffect(() => {
        setEmail(props.Record);
    }, [props.Record])

    React.useEffect(() => {
        let h = true;
        h = h && email.TriggerEmailSQL == props.Record.TriggerEmailSQL;
       
        setHasChanged(!h);
    }, [props.Record, email])

    React.useEffect(() => {
        const handle = setTimeout(() => {
            setEmail((e) => ({ ...e, TriggerEmailSQL: triggerSQL }))
        }, 500);
        return () => { if (handle !== null) clearTimeout(handle); };
    }, [triggerSQL]);

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Report Trigger:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="row">
                            <div className={'col-12'}>
                                {triggerStatus == 'valid' && triggers ?
                                    <div className="alert alert-success">
                                        Based on this SQL Trigger, this Report will be sent.
                                    </div> : null}
                                {triggerStatus == 'valid' && triggers ?
                                    <div className="alert alert-danger">
                                        Based on this SQL Trigger, this Report will not be sent.
                                    </div> : null}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Trigger SQL</label>
                                    <textarea
                                        rows={10}
                                        className={triggerStatus != 'invalid' ? 'form-control' : 'form-control is-invalid'}
                                        onChange={(evt) => {
                                            if (evt.target.value !== '') setTriggerSQL(evt.target.value);
                                            else setTriggerSQL(null)
                                        }}
                                        value={triggerSQL == null ? '' : triggerSQL}
                                    />
                                    <div className="invalid-feedback">
                                        Trigger SQL must be a valid SQL statement returning 1 or 0.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-primary" + ((triggerStatus == 'valid' || triggerStatus == 'idle') && hasChanged ? '' : ' disabled')}
                                type="submit"
                                onClick={() => {
                                    if ((triggerStatus == 'valid' || triggerStatus == 'idle') && hasChanged)
                                        dispatch(ScheduledEmailTypeSlice.DBAction({ verb: 'PATCH', record: email }));
                                }}
                                data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className={"btn btn-warning" + (hasChanged ? '' : ' disabled')} data-tooltip="clear"
                                onClick={() => { setEmail(props.Record); setHasChanged(false); }}
                                onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToolTip Show={triggerStatus == 'invalid' && hover == 'submit'} Position={'top'} Target={"submit"}>
                {triggerStatus == 'invalid' ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> Trigger SQL is invalid.</p> : null}
            </ToolTip>
            <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Target={"clear"}>
                {props.Record.TriggerEmailSQL != email.TriggerEmailSQL ? <p> <ReactIcons.Warning Color="var(--warning)" /> Changes to Trigger SQL will be discarded.</p> : null}
            </ToolTip>
        </div>
        )
}

export default TriggerWindow;