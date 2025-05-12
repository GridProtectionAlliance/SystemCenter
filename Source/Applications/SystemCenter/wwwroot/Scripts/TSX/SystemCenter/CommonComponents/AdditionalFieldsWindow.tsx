//******************************************************************************************************
//  AdditionalFieldsWindow.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  01/28/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import { OpenXDA as LocalXDA } from '../global';
import AdditionalFieldsTable from './AdditionalFieldsTable';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { SelectRoles } from '../Store/UserSettings';
import { useAppDispatch, useAppSelector } from '../hooks';
import _ from 'lodash';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { IsInteger } from '@gpa-gemstone/helper-functions';
import { AssetNoteSlice, CompanyNoteSlice, CustomerNoteSlice, LocationNoteSlice, MeterNoteSlice } from '../Store/Store';

declare var homePath: string;

interface IProps {
    ID: number,
    Type: LocalXDA.AdditionalFieldType,
    Tab?: string
}

interface IValidated {
    FieldID: number;
    Message: string;
}

function AdditionalFieldsWindow(props: IProps): JSX.Element {
    // View perms are different than write
    const dispatch = useAppDispatch();
    const roles = useAppSelector(SelectRoles);
    const hasPermissions = React.useMemo(() => (roles.indexOf('Administrator') >= 0 || roles.indexOf('Engineer') >= 0), [roles]);

    const [invalidChanges, setInvalidChanges] = React.useState<IValidated[]>([]);
    const [validChanges, setValidChanges] = React.useState<IValidated[]>([]);

    const [hover, setHover] = React.useState<('None' | 'Save' | 'Clear')>('None');

    const [changes, setChanges] = React.useState<SystemCenter.Types.AdditionalFieldValue[]>([]);
    const [values, setValues] = React.useState<SystemCenter.Types.AdditionalFieldValue[]>([]);
    const [state, setState] = React.useState<Application.Types.Status>('unintiated')

    const allValues = React.useMemo(() => values.filter((v) => changes.findIndex((item) => item.AdditionalFieldID == v.AdditionalFieldID) < 0).concat(changes), [values, changes])

    React.useEffect(() => {
        if (state === 'unintiated' || state === 'changed') {
            setState('loading');
            $.ajax({
                type: "GET",
                url: `${homePath}api/SystemCenter/AdditionalFieldValue/${props.ID}`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).then((d) => {
                setValues(d);
                setState('idle');
                if (props.Type == 'Meter')
                    dispatch(MeterNoteSlice.SetChanged());
                else if (props.Type == 'Location')
                    dispatch(LocationNoteSlice.SetChanged());
                else if (props.Type == 'Customer')
                    dispatch(CustomerNoteSlice.SetChanged());
                else if (props.Type == 'Company')
                    dispatch(CompanyNoteSlice.SetChanged());
                else
                    dispatch(AssetNoteSlice.SetChanged());
            }, () => {
                setState('error');
            });
        }
    }, [state])

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <h4>Additional Fields:</h4>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                <AdditionalFieldsTable
                    ID={props.ID}
                    Type={props.Type}
                    FieldValues={allValues}
                    HideExternal={false}
                    LoadState={state}
                    SetValues={(value, field) => {
                        const i = changes.findIndex(f => f.AdditionalFieldID === field.ID);
                        const iCurrent = values.findIndex(f => f.AdditionalFieldID === field.ID);

                        if (i >= 0 && iCurrent < 0)
                            setChanges((c) => { const u = _.cloneDeep(c); u[i] = value; return u })
                        else if (i >= 0 && values[iCurrent].Value != value.Value)
                            setChanges((c) => { const u = _.cloneDeep(c); u[i] = value; return u })
                        else if (i >= 0)
                            setChanges((c) => { const u = _.cloneDeep(c); u.splice(i); return u })
                        else if (iCurrent >= 0 && values[iCurrent].Value != value.Value)
                            setChanges((c) => { const u = _.cloneDeep(c); u.push(value); return u })
                        else if (iCurrent < 0)
                            setChanges((c) => { const u = _.cloneDeep(c); u.push(value); return u })

                        const iInvalid = invalidChanges.findIndex(item => item.FieldID == field.ID);
                        const iChange = validChanges.findIndex(item => item.FieldID == field.ID);
                        const valid = field.Type != 'integer' || (value.Value != null && IsInteger(value.Value));
        
                        if (valid && iInvalid >= 0)
                            setInvalidChanges((c) => { const u = _.cloneDeep(c); u.splice(iInvalid); return u });
                        if (!valid && iInvalid < 0) 
                            setInvalidChanges((c) => { const u = _.cloneDeep(c); u.push({ FieldID: field.ID, Message: `Value for \'${field.FieldName}\' must be an integer.` }); return u });

                        if (valid && iCurrent >= 0 && iChange < 0) 
                            setValidChanges((c) => { const u = _.cloneDeep(c); u.push({ FieldID: field.ID, Message: `Changes to \'${field.FieldName}\' will be lost.`}); return u });
                        if (!valid && iCurrent >= 0 && iChange >= 0) 
                            setValidChanges((c) => { const u = _.cloneDeep(c); u.splice(iChange); return u });


                    }}
                     />
            </div>
            <div className="card-footer">
                {hasPermissions ?
                    <>
                        <div className="btn-group mr-2">
                            <button
                                className={"btn btn-primary" + ((changes.length === 0 || invalidChanges.length > 0) ? ' disabled' : '')}
                                onClick={() => {
                                    if (changes.length > 0 && invalidChanges.length === 0) {
                                            setState('loading');
                                            $.ajax({
                                                type: "PATCH",
                                                url: `${homePath}api/SystemCenter/AdditionalFieldValue/Array`,
                                                contentType: "application/json; charset=utf-8",
                                                data: JSON.stringify(changes),
                                                dataType: 'json',
                                                cache: true,
                                                async: true
                                            }).then(() => {
                                                setChanges([]);
                                                setState('changed');
                                            }, () => setState('error'));
                                        }
                                    }
                                }
                                onMouseEnter={() => setHover('Save')}
                                onMouseLeave={() => setHover('None')}
                                data-tooltip={'SaveValues'}
                            >Save Changes</button>
                            <ToolTip
                                Show={hover == 'Save' && (changes.length > 0 || !hasPermissions)}
                                Position={'top'}
                                Target={"SaveValues"}
                            >
                                {invalidChanges.map((change, index) => <p key={index}> <ReactIcons.CrossMark Color={'var(--danger)'} /> {change.Message}</p>)}
                                {invalidChanges.length === 0 ? <p> <ReactIcons.CheckMark Color={'var(--success)'} /> Save all changes made.</p> : <></>}
                            </ToolTip>
                        </div>
                        <div className="btn-group mr-2">
                            <button className={"btn btn-warning" + (changes.length === 0 ? ' disabled' : '')}
                                onClick={() => { if (changes.length > 0) setChanges([]); }}
                                onMouseEnter={() => setHover('Clear')}
                                onMouseLeave={() => setHover('None')}
                                data-tooltip={'Clear'}
                            >Clear Changes</button>
                            <ToolTip
                                Show={hover == 'Clear' && changes.length > 0}
                                Position={'top'}
                                Target={"Clear"}>
                                {changes.map((change, index) => <p key={index}> <ReactIcons.Warning Color="var(--warning)"/> {change}</p>)}
                            </ToolTip>
                        </div>
                    </> : null                 
                }
            </div>
        </div>);
}

export default AdditionalFieldsWindow;