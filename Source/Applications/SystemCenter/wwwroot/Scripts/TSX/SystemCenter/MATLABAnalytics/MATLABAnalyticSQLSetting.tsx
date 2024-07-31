//******************************************************************************************************
//  MATLABAnalyticInfo.tsx - Gbtc
//
//  Copyright � 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  08/07/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { useAppDispatch } from '../hooks';
import { MATLABAnalyticSlice } from '../Store/Store';
import { TextArea } from '@gpa-gemstone/react-forms';
import { ToolTip } from '@gpa-gemstone/react-interactive';

const MATLABAnalyticSQLSetting = (props: { Record: OpenXDA.Types.MATLABAnalytic }) => {
    const [record, setRecord] = React.useState<OpenXDA.Types.MATLABAnalytic>(props.Record);
    const [hover, setHover] = React.useState<('update' | 'none')>('none');
    const dispatch = useAppDispatch();

    if (record == null) return;
    return (
        <div className="card" style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>SQL Settings:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ overflowY: 'auto', flex: 1 }}>
                <TextArea<OpenXDA.Types.MATLABAnalytic> Rows={8} Record={record} Field={'SettingSQL'} Label={''} Valid={() => true}
                    Setter={(r) => {
                        if (r.SettingSQL === null) r.SettingSQL = '';
                        setRecord(r);
                    }
                } />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + ((record == props.Record) ? ' disabled' : '')} onClick={() => {
                        dispatch(MATLABAnalyticSlice.DBAction({ verb: 'PATCH', record }));
                    }} hidden={record.ID == 0} data-tooltip={'Update-SQL'}
                        onMouseEnter={() => setHover('update')} onMouseLeave={() => setHover('none')}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => setRecord(props.Record)} disabled={record == props.Record}>Reset</button>
                </div>
                <ToolTip Show={hover == 'update' && record == props.Record} Position={'top'} Target={"Update-SQL"}>
                    <p>No changes made.</p>
                </ToolTip>
            </div>


        </div>
    );
}

export default MATLABAnalyticSQLSetting;
