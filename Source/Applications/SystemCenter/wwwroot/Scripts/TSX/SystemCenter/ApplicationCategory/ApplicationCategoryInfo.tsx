//******************************************************************************************************
//  ApplicationCategoryWindow.tsx - Gbtc
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
//  11/15/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { ApplicationCategory } from './ByApplicationCategory';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-forms';
import ApplicationCategoryForm from './ApplicationCategoryForm';

interface IProps { ApplicationCat: ApplicationCategory, stateSetter: (appcat: ApplicationCategory) => void }

export default function ApplicationCategoryInfo(props: IProps) {

    const [errors, setErrors] = React.useState<string[]>([]);
    const [warnings, setWarning] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('None' | 'Clear' | 'Submit')>('None');
    const [applicationCategory, setApplicationCategory] = React.useState<ApplicationCategory>(props.ApplicationCat);

    React.useEffect(() => {
        let w = [];
        if (applicationCategory.Name != props.ApplicationCat.Name)
            w.push('Changes to Name will be lost.');
        if (applicationCategory.SortOrder != props.ApplicationCat.SortOrder)
            w.push('Changes to Sort Order will be lost.');
        setWarning(w);
    }, [applicationCategory, props.ApplicationCat])

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Application Category Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                    <ApplicationCategoryForm ApplicationCat={applicationCategory} stateSetter={setApplicationCategory} setErrors={setErrors} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (errors.length > 0 ? ' disabled' : '')} onClick={() => { if (errors.length == 0) props.stateSetter(applicationCategory) }}
                        hidden={props.ApplicationCat.ID == 0}
                        data-tooltip={"Update"}
                        onMouseEnter={() => setHover('Submit')} onMouseLeave={() => setHover('None')}>Save Changes</button>
                </div>
                <ToolTip Show={hover == 'Submit' && (errors.length > 0)} Position={'top'} Target={"Update"}>
                    {errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className="btn btn-warning" onClick={() => {
                        if (warnings.length > 0)
                            setApplicationCategory(props.ApplicationCat)
                    }
                    } disabled={warnings.length == 0}
                        onMouseEnter={() => setHover('Clear')} onMouseLeave={() => setHover('None')} data-tooltip={"Clr"}
                        >Clear Changes</button>
                </div>
                <ToolTip Show={hover == 'Clear' && (warnings.length > 0)} Position={'top'} Target={"Clr"}>
                    {warnings.map((t, i) => <p key={i}><ReactIcons.Warning Color="var(--warning)" /> {t}</p>)}
                </ToolTip>
            </div>
        </div> 
    )

}

