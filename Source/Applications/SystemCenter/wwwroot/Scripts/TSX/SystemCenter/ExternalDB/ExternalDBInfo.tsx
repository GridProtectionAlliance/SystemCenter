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
import * as _ from 'lodash';
import ExternalDBForm from './ExternalDBForm';
import { SystemCenter } from '@gpa-gemstone/application-typings'
import { LoadingIcon, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ExternalDBTablesSlice } from '../Store/Store';

interface IProps {
    ExternalDBTables: SystemCenter.Types.ExternalDataBaseTable,
}

export default function ExternalDBWindow(props: IProps) {

    const [extDBTable, setExtDBTable] = React.useState<SystemCenter.Types.ExternalDataBaseTable>(props.ExternalDBTables)
    const [errors, setErrors] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const dispatch = useAppDispatch();
    const status = useAppSelector(ExternalDBTablesSlice.Status);

    React.useEffect(() => { setExtDBTable(extDBTable); }, [extDBTable]);

    if (status == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>External Database Table Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                    <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} />
                    </div>
                </div>
            </div>
        </div>

    if (props.ExternalDBTables == null || status == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>External Database Table Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                    <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={"A Server Error Occurred. Please Reload the Application."}/>
                    </div>
                </div>
            </div>
        </div>
 
    function changedFields(): string[] {
        const result = [];
        if (extDBTable.TableName != props.ExternalDBTables.TableName)
            result.push('Name')
        if (extDBTable.ExternalDB != props.ExternalDBTables.ExternalDB)
            result.push('External Database')
        return result;
    }

        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>External Database Table Information:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {/*<ExternalDBForm ExternalDB={extDBTable} Setter={(record) => setExtDBTable(record)} setErrors={setErrors} />*/}
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className={"btn btn-primary" + (errors.length != 0 || changedFields().length == 0 ? ' disabled' : '')}
                            type='submit' onClick={() => { if (errors.length == 0) dispatch(ExternalDBTablesSlice.DBAction({ verb: 'PATCH', record: extDBTable }))}}
                            data-tooltip='submit' hidden={extDBTable.ID == 0}
                            onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                    </div>
                    <ToolTip Show={(errors.length > 0 || changedFields().length == 0) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                        {changedFields().length == 0 ? <p> No changes made.</p> : null}
                        {errors.map((t, i) => <p key={i}>
                            {CrossMark} {t}
                        </p>)}
                    </ToolTip>
                    <div className="btn-group mr-2">
                        <button className={"btn btn-default" + (changedFields().length == 0 ? ' disabled' : '')}
                            data-tooltip="clear" onClick={() => setExtDBTable(props.ExternalDBTables)}
                            onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                    </div>
                    <ToolTip Show={changedFields().length != 0 && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                        {changedFields().map((t, i) => <p key={i}> {Warning} Changes to {t} will be discarded.</p>)}
                    </ToolTip>
                </div>
            </div>
        );
    }
