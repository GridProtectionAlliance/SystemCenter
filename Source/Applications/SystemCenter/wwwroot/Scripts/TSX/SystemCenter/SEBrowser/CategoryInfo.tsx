//******************************************************************************************************
//  CategoryInfo.tsx - Gbtc
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
//  03/15/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { OpenXDA as LocalXDA } from '../global';
import CategoryForm from './CategoryForm';

declare var homePath: string;

interface IProps { Tab: LocalXDA.IWidgetCategory, stateSetter: (tab: LocalXDA.IWidgetCategory) => void }

export default function CategoryInfo(props: IProps) {
    const [tab, setTab] = React.useState<LocalXDA.IWidgetCategory>(props.Tab);
    const [warnings, setWarning] = React.useState<string[]>([]);
    const [errors, setError] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('None' | 'Clear' | 'Submit')>('None');

    React.useEffect(() => {
        setTab(props.Tab)
    },[props.Tab])

    React.useEffect(() => {
        let w = [];
        if (tab.Name != props.Tab.Name)
            w.push('Changes to Name will be lost.')
        if (tab.OrderBy != props.Tab.OrderBy)
            w.push('Changes to Order By will be lost.')
        
        setWarning(w);
    }, [tab, props.Tab])

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>SE Browser Tab Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'auto' }}>
                <CategoryForm Category={tab} stateSetter={setTab} setErrors={setError} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (warnings.length == 0 || errors.length > 0 ? ' disabled' : '')} onClick={() => {
                        if (warnings.length > 0 && errors.length == 0)
                            props.stateSetter(tab)
                    }}
                        onMouseEnter={() => setHover('Submit')} onMouseLeave={() => setHover('None')} data-tooltip={"Update"}
                    >Save Changes</button>
                </div>
                <ToolTip Show={hover == 'Submit' && (errors.length > 0)} Position={'top'} Target={"Update"}>
                    {errors.map((t, i) => <p key={i}>{CrossMark} {t}</p>)}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className="btn btn-warning" onClick={() => {
                        if (warnings.length > 0)
                            setTab(props.Tab)
                    }
                    } disabled={warnings.length == 0}
                        onMouseEnter={() => setHover('Clear')} onMouseLeave={() => setHover('None')} data-tooltip={"Clr"}
                    >Clear Changes</button>
                </div>
                <ToolTip Show={hover == 'Clear' && (warnings.length > 0)} Position={'top'} Target={"Clr"}>
                    {warnings.map((t, i) => <p key={i}>{Warning} {t}</p>)}
                </ToolTip>
            </div>


        </div>
    );

}