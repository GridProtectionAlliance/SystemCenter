//******************************************************************************************************
//  ChannelGroupInfo.tsx - Gbtc
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
//  07/05/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppDispatch } from '../hooks';
import { ChannelGroupSlice } from '../Store/Store';
import ChannelGroupForm from './ChannelGroupForm';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';

const ChannelGroupInfoWindow = (props: { Record: SystemCenter.Types.ChannelGroup }) => {
    const [record, setRecord] = React.useState<SystemCenter.Types.ChannelGroup>(props.Record);
    const [errors, setError] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('update' | 'none')>('none');
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        let e = [];
        if (record.Name == null || record.Name.length == 0) {
            e.push('A Name is required.');
        }
        if (record.Name.length > 200) {
            e.push('A Name of less than 200 characters is required.')
        }

        setError(e);
    }, [record]);

    if (record == null) return;
    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channel Group Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <ChannelGroupForm Record={record} Setter={(r) => setRecord(r)} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + ((record == props.Record || errors.length > 0) ? ' disabled' : '')} onClick={() => {
                        if (errors.length == 0)
                            dispatch(ChannelGroupSlice.DBAction({ verb: 'PATCH', record }));
                    }} hidden={record.ID == 0} data-tooltip={'Update'}
                        onMouseEnter={() => setHover('update')} onMouseLeave={() => setHover('none')}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => setRecord(props.Record)} disabled={record == props.Record}>Reset</button>
                </div>
                <ToolTip Show={hover == 'update' && (errors.length > 0 || record == props.Record)} Position={'top'} Target={"Update"}>
                    {record == props.Record ? <p>No changes made.</p> : null}
                    {errors.map((t, i) => <p key={i}>{CrossMark} {t}</p>)}
                </ToolTip>
            </div>


        </div>
    );
}

export default ChannelGroupInfoWindow;