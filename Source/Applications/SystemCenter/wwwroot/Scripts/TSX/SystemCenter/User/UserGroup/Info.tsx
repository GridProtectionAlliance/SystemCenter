// ******************************************************************************************************
//  Info.tsx - Gbtc
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
//  02/23/2023 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { SecurityGroupSlice } from '../../Store/Store';
import { useAppDispatch } from '../../hooks';
import { ISecurityGroup } from '../Types';
import GroupForm from './GroupForm';

const GroupInfo = (props: {Group: ISecurityGroup}) => {
    const dispatch = useAppDispatch();

    const [group, setGroup] = React.useState<ISecurityGroup>(props.Group);
    const [warnings, setWarning] = React.useState<string[]>([]);
    const [errors, setError] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('None' | 'Clear' | 'Save')>('None');


    React.useEffect(() => {
        if (group == null || props.Group == null)
            return;

        const w = [];
        if (group.Description !== props.Group.Description)
            w.push('Changes to Description will be lost.')
        if (group.DisplayName !== props.Group.DisplayName)
            w.push('Changes to Name will be lost.')

        setWarning(w);
    }, [group, props.Group])

    React.useEffect(() => { setGroup(props.Group) }, [props.Group])

    if (group == null)
        return null;
    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>User Group Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                {group.Type == 'Azure' ? <div className="alert alert-info">
                    Information for Azure Groups cannot be edited in System Center. To edit these fields, please contact your Azure Administrator.
                </div> : null}
                {group.Type == 'AD'? <div className="alert alert-info">
                    Information for Active Directoy Groups cannot be edited in System Center. To edit these fields, please contact your AD Administrator.
                </div> : null}
                <GroupForm Group={group} Setter={(u) => setGroup(u)} Edit={true} SetErrors={setError} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary"
                        onClick={() => dispatch(SecurityGroupSlice.DBAction({ verb: 'PATCH', record: { ...group, Name: group.DisplayName } }))}
                        onMouseEnter={() => setHover('Save')} onMouseLeave={() => setHover('None')}
                        data-tooltip={'Save'}
                        disabled={warnings.length === 0 || errors.length > 0 || group.Type !== 'Database'}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => setGroup(props.Group)} disabled={warnings.length === 0 || group.Type !== 'Database'}
                        data-tooltip={'Clr'}
                        onMouseEnter={() => setHover('Clear')} onMouseLeave={() => setHover('None')}>Reset</button>
                </div>
                <ToolTip Show={hover === 'Clear' && (warnings.length > 0)} Position={'top'} Theme={'dark'} Target={"Clr"}>
                    {warnings.map((t, i) => <p key={i}>{Warning} {t}</p>)}
                </ToolTip>
                <ToolTip Show={hover === 'Save' && (errors.length > 0)} Position={'top'} Theme={'dark'} Target={"Save"}>
                    {errors.map((t, i) => <p key={i}>{CrossMark} {t}</p>)}
                </ToolTip>
            </div>


        </div>
    );

}

export default GroupInfo;
