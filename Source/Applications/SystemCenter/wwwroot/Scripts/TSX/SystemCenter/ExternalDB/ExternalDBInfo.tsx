//******************************************************************************************************
//  ExternalDBInfo.tsx - Gbtc
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
//  10/28/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppDispatch } from '../hooks';
import { ExternalDatabasesSlice } from '../Store/Store';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import ExternalDBForm from './ExternalDBForm';


export default function ExternalDBInfo(props: { Record: SystemCenter.Types.DetailedExternalDatabases }) { 
    const [record, setRecord] = React.useState<SystemCenter.Types.ExternalDatabases>(props.Record);
    const [origRecord, setOrigRecord] = React.useState<SystemCenter.Types.ExternalDatabases>(props.Record);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('update' | 'none')>('none');

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        let e = [];
        if (record.Name === null || record.Name.length === 0) {
            e.push('A Name is required.');
        }

        setErrors(e);
    }, [record]);


    if (record == null) return;
    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>External Database Information:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, flex: 1, overflowY: 'auto' }}>
                        <ExternalDBForm Record={record} Setter={setRecord} ShowTestButton={true} />
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-primary" + (((record == origRecord) || errors.length > 0) ? ' disabled' : '')}
                                onClick={() => {
                                    if (errors.length == 0) {
                                        dispatch(ExternalDatabasesSlice.DBAction({ verb: 'PATCH', record }));
                                        setOrigRecord(record);
                                    }
                                }}
                                hidden={record.ID == 0} data-tooltip={'Update-Info'}
                                onMouseEnter={() => setHover('update')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button className="btn btn-warning"
                                onClick={() => {
                                    setRecord(origRecord);
                                }}
                                disabled={record == origRecord}>Clear Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToolTip Position={'top'} Target={"Update-Info"}
                Show={hover == 'update' && (errors.length > 0 || (record == origRecord))}>
                {(record == origRecord) ? <p>No changes made.</p> : null}
                {errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
            </ToolTip>
        </div>
    );
}
