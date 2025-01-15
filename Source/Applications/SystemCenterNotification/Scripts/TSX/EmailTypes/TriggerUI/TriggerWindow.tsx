//******************************************************************************************************
//  TriggerWindow.tsx - Gbtc
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
//  07/26/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch } from '../../hooks';
import * as React from 'react';
import { ToolTip } from '@gpa-gemstone/react-interactive'
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { EmailType } from '../../global';
import { EmailTypeSlice } from '../../Store';
import EventSelect from './EventSelect';
import EventDetails from './EventDetails';

declare var homePath;
declare var version;

interface IProps { Record: EmailType}


const TriggerWindow = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState<EmailType>(props.Record);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const [triggerSQL, setTriggerSQL] = React.useState<string>(props.Record.TriggerEmailSQL);
    const [aggregateSQL, setAggregaterSQL] = React.useState<string>(props.Record.CombineEventsSQL);

    const [triggerStatus, setTriggerStatus] = React.useState<('idle' | 'loading' | 'valid' | 'invalid')>('idle')
    const [aggregateStatus, setAggregateStatus] = React.useState<('idle' | 'loading' | 'valid' | 'invalid')>('idle')

    const [selectedEvent, setSelectedEvent] = React.useState<number>(-1);

    React.useEffect(() => {
        setEmail(props.Record);
    }, [props.Record])

    React.useEffect(() => {
        let h = true;
        h = h && email.CombineEventsSQL == props.Record.CombineEventsSQL;
        h = h && email.TriggerEmailSQL == props.Record.TriggerEmailSQL;
       
        setHasChanged(!h);
    }, [props.Record, email])

    React.useEffect(() => {
        const handle = setTimeout(() => {
            setEmail((e) => ({ ...e, TriggerEmailSQL: triggerSQL, CombineEventsSQL: aggregateSQL }))
        }, 500);
        return () => { if (handle !== null) clearTimeout(handle); };
    }, [triggerSQL, aggregateSQL]);

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Notification Trigger:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="row h-100">
                            <div className="col h-100">
                                <EditSection
                                    SetCombineSQL={setAggregaterSQL} SetTriggerSQL={setTriggerSQL} ValidCombine={aggregateStatus != 'invalid'}
                                    TriggerSQL={triggerSQL} CombineSQL={aggregateSQL} ValidTrigger={triggerStatus != 'invalid'}
                                />
                            </div>
                            <div className="col h-100">
                                <div className="row h-50 pb-1">
                                    <div className="col h-100">
                                        <EventSelect TriggerSQL={triggerSQL} SetStatus={(v, l) => {
                                            if (l) setTriggerStatus('loading');
                                            else if (v) setTriggerStatus('valid');
                                            else setTriggerStatus('invalid');
                                        }}
                                            SetSelectedEvent={setSelectedEvent}
                                            SelectedEventID={selectedEvent}
                                        />
                                    </div>
                                </div>
                                <div className="row h-50 pb-1">
                                    <div className="col h-100">
                                        <EventDetails CombineSQL={aggregateSQL} SetStatus={(v, l) => {
                                            if (l) setAggregateStatus('loading');
                                            else if (v) setAggregateStatus('valid');
                                            else setAggregateStatus('invalid');
                                        }}
                                            SelectedEventID={selectedEvent} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-primary" + ((triggerStatus == 'valid' || triggerStatus == 'idle') &&
                                (aggregateStatus == 'valid' || aggregateStatus == 'idle')
                                && hasChanged ? '' : ' disabled')}
                                type="submit"
                                onClick={() => {
                                    if ((triggerStatus == 'valid' || triggerStatus == 'idle') &&
                                        (aggregateStatus == 'valid' || aggregateStatus == 'idle')
                                        && hasChanged)
                                        dispatch(EmailTypeSlice.DBAction({ verb: 'PATCH', record: email }));
                                }}
                                data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className={"btn btn-danger" + (hasChanged ? '' : ' disabled')} data-tooltip="clear"
                                onClick={() => { setEmail(props.Record); setHasChanged(false); }}
                                onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToolTip Show={(triggerStatus == 'invalid' || aggregateStatus == 'invalid') && hover == 'submit'} Position={'top'} Target={"submit"}>
                {triggerStatus == 'invalid' ? <p> {CrossMark} Trigger SQL is invalid.</p> : null}
                {aggregateStatus == 'invalid' ? <p> {CrossMark} Suppression SQL is invalid.</p> : null}
            </ToolTip>
            <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Target={"clear"}>
                {props.Record.TriggerEmailSQL != email.TriggerEmailSQL ? <p> {Warning} Changes to Trigger SQL will be discarded.</p> : null}
                {props.Record.CombineEventsSQL != email.CombineEventsSQL ? <p> {Warning} Changes to Suppression SQL will be discarded.</p> : null}
            </ToolTip>
        </div>
        )
}

export default TriggerWindow;

interface IEditProps {
    TriggerSQL: string,
    CombineSQL: string,
    SetTriggerSQL: (sql: string) => void,
    SetCombineSQL: (sql: string) => void,
    ValidTrigger: boolean,
    ValidCombine: boolean,
}

const EditSection = (props: IEditProps) => {

    return <>
        <div className="form-group">
        <label>Trigger SQL</label>
        <textarea
            rows={3}
            className={props.ValidTrigger ? 'form-control' : 'form-control is-invalid'}
            onChange={(evt) => {
                if (evt.target.value !== '') props.SetTriggerSQL(evt.target.value);
                else props.SetTriggerSQL(null)
            }}
            value={props.TriggerSQL == null ? '' : props.TriggerSQL}
        />
        <div className="invalid-feedback">
            Trigger SQL needs to be a valid SQL statement returning 1 or 0. {'{0}'} is substituted with the event ID.
        </div>
    </div>
        <div className="form-group">
            <label>Suppression SQL</label>
            <textarea
                rows={3}
                className={props.ValidCombine ? 'form-control' : 'form-control is-invalid'}
                onChange={(evt) => {
                    if (evt.target.value !== '') props.SetCombineSQL(evt.target.value);
                    else props.SetCombineSQL(null)
                }}
                value={props.CombineSQL == null ? '' : props.CombineSQL}
            />
            <div className="invalid-feedback">
                Suppression SQL needs to be a valid SQL statement returning a set of event IDs that are suppressed to avoid notification flooding. {'{0}'} is substituted with the Event ID.
            </div>
        </div>
    </>;
}