﻿//******************************************************************************************************
//  Template.tsx - Gbtc
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

import { useAppDispatch } from '../hooks';
import * as React from 'react';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { EmailType } from '../global';
import { EmailTypeSlice } from '../Store';
import { TextArea, ToolTip } from '@gpa-gemstone/react-forms';

declare var homePath;
declare var version;

interface IProps { Record: EmailType}



const Template = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState<EmailType>(props.Record);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');



    React.useEffect(() => {
        setEmail(props.Record);
    }, [props.Record])

    React.useEffect(() => {
        let h = true;
        h = h && email.Template == props.Record.Template;
        setHasChanged(!h);
    }, [props.Record, email])


    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-12">
                                <h4>Template:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="row">
                            <div className="col-12">
                                <TextArea<EmailType> Record={email} Setter={setEmail} Field={'Template'} Help={'XML-formatted template to specify the layout of the notification.'} Rows={12} Label='' Valid={(r) => email.Template != null && email.Template.length > 0} />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-primary" + (email.Template != null && email.Template.length > 0 && hasChanged ? '' : ' disabled')} type="submit"
                                onClick={() => { if (email.Template != null && email.Template.length > 0 && hasChanged) dispatch(EmailTypeSlice.DBAction({ verb: 'PATCH', record: email })); }}
                                data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className={"btn btn-warning" + (hasChanged ? '' : ' disabled')} data-tooltip="clear"
                                onClick={() => { setEmail(props.Record); setHasChanged(false); }}
                                onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                        </div>
                        <ToolTip Show={(email.Template == null || email.Template.length == 0 || !hasChanged) && hover == 'submit'} Position={'top'} Target={"submit"}>
                            {!hasChanged ? <p> No changes made.</p> : null}
                            {email.Template == null || email.Template.length == 0 ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> A valid Template is required.</p> : null}
                        </ToolTip>
                        <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Target={"clear"}>
                            <p><ReactIcons.Warning Color="var(--warning)" /> Changes to Template will be discarded.</p>
                        </ToolTip>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Template;