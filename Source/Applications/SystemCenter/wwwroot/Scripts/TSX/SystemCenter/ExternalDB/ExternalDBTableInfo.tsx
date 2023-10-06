//******************************************************************************************************
//  ExternalDBTableInfo.tsx - Gbtc
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
//  10/03/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppDispatch } from '../hooks';
import { ExternalDBTablesSlice } from '../Store/Store';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import ExternalDBTableForm from './ExternalDBTableForm';


export default function ExternalDBInfo(props: { Record: SystemCenter.Types.extDBTables }) {
    const [record, setRecord] = React.useState<SystemCenter.Types.extDBTables>(props.Record);
    const [origRecord, setOrigRecord] = React.useState<SystemCenter.Types.extDBTables>(props.Record);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('update' | 'none')>('none');

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        let e = [];
        if (record.TableName === null || record.TableName.length === 0) {
            e.push('A Name is required.');
        }
        if (record.Query === null || record.Query.length === 0) {
            e.push('A Query is required.');
        }

        setErrors(e);
    }, [record]);


    if (record == null) return;
    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>External DB Table Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ overflow: 'scroll' }}>
                <ExternalDBTableForm Record={record} Setter={setRecord} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (((record == origRecord) || errors.length > 0) ? ' disabled' : '')}
                        onClick={() => {
                            if (errors.length == 0) {
                                dispatch(ExternalDBTablesSlice.DBAction({ verb: 'PATCH', record }));
                                setOrigRecord(record);
                            }
                        }}
                        hidden={record.ID == 0} data-tooltip={'Update-Info-Table'}
                        onMouseEnter={() => setHover('update')} onMouseLeave={() => setHover('none')}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default"
                        onClick={() => {
                            setRecord(origRecord);
                        }}
                        disabled={record == origRecord}>Reset</button>
                </div>
                <ToolTip Position={'top'} Target={"Update-Info-Table"}
                    Show={hover == 'update' && (errors.length > 0 || (record == origRecord))}>
                    {(record == origRecord) ? <p>No changes made.</p> : null}
                    {errors.map((t, i) => <p key={i}>{CrossMark} {t}</p>)}
                </ToolTip>
            </div>
        </div>
    );
}
