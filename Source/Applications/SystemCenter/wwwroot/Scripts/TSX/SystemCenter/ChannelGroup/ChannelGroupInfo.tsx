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

const ChannelGroupInfoWindow = (props: { Record: SystemCenter.Types.ChannelGroup }) => {
    const [record, setRecord] = React.useState<SystemCenter.Types.ChannelGroup>(props.Record);
    const dispatch = useAppDispatch();

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
                    <button className="btn btn-primary" onClick={() => dispatch(ChannelGroupSlice.DBAction({ verb: 'PATCH', record }))} hidden={record.ID == 0} disabled={record == props.Record}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => setRecord(props.Record)} disabled={record == props.Record}>Reset</button>
                </div>
            </div>


        </div>
    );
}

export default ChannelGroupInfoWindow;