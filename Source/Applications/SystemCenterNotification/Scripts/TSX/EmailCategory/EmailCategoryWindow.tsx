//******************************************************************************************************
//  EmailCategoryWindow.tsx - Gbtc
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

import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingScreen, Modal, Search, SearchBar, TabSelector, ToolTip, Warning } from '@gpa-gemstone/react-interactive'
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { EmailCategory } from '../global';
import { EmailCategorySlice } from '../Store';
import Table from '@gpa-gemstone/react-table';
import EmailCategoryForm from './EmailCategoryForm';

declare var homePath;
declare var version;

interface IProps { Category: EmailCategory}



const EmailCategoryWindow = (props: IProps) => {
    const dispatch = useDispatch();

    const [category, setCategory] = React.useState<EmailCategory>(props.Category);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const categories = useSelector(EmailCategorySlice.Data);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        let e = [];
        if (category.Name == undefined || category.Name.length < 1)
            e.push('A Name is required');
        if (categories.findIndex(s => s.Name === category.Name && s.ID !== category.ID) >= 0)
            e.push('An Email Category with this Name already exists');
        setErrors(e);
    }, [category])

    React.useEffect(() => {
        setCategory(props.Category);
        setHasChanged(false);
    }, [props.Category])



    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Email Category Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <EmailCategoryForm record={category} setRecord={(c) => { setCategory(c); setHasChanged(true); }} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (errors.length == 0 && hasChanged ? '' : ' disabled')} type="submit"
                        onClick={() => { if (errors.length == 0 && hasChanged) dispatch(EmailCategorySlice.DBAction({ verb: 'PATCH', record: category })); }}
                        data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                </div>
                <ToolTip Show={(errors.length > 0 || !hasChanged) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                    {!hasChanged ? <p> No changes made.</p> : null}
                    {errors.map((t, i) => <p key={i}>
                        {CrossMark} {t}
                    </p>)}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + (hasChanged ? '' : ' disabled')} data-tooltip="clear"
                        onClick={() => { setCategory(props.Category); setHasChanged(false); }}
                        onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                </div>
                <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                    {props.Category.Name != category.Name ? <p> {Warning} Changes to Name will be discarded.</p> : null}
                    {props.Category.SelfSubscribe != category.SelfSubscribe ? <p> {Warning} Changes to Self Subscription will be discarded.</p> : null}
                </ToolTip>
            </div>

        </div>
        )
}

export default EmailCategoryWindow;