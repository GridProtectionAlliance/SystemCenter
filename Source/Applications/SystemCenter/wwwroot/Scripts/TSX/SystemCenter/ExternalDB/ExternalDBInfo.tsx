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
declare var homePath: string;
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { LoadingIcon, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { useSelector } from 'react-redux';
import { ExternalDBTablesSlice } from '../Store/Store';

interface IProps {
    ExternalDBTables: SystemCenter.Types.ExternalDataBaseTable,
    stateSetter: (eDBTable: SystemCenter.Types.ExternalDataBaseTable) => void
}

export default function ExternalDBWindow(props: IProps) {

    const [extDBTable, setExtDBTable] = React.useState<SystemCenter.Types.ExternalDataBaseTable>(props.ExternalDBTables)
    const [status, setStatus] = React.useState<'error' | 'idle' | 'loading'>('idle');
    const [updateFlag, setUpdateFlag] = React.useState<number>(0);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const data = useSelector(ExternalDBTablesSlice.Data) as SystemCenter.Types.ExternalDataBaseTable[];


    React.useEffect(() => { setExtDBTable(extDBTable); }, [extDBTable]);

    React.useEffect(() => {
        const handle = updateExternalDB()
        handle.then(() => {
            props.stateSetter(extDBTable);
            setStatus('idle');
        }, () => setStatus('error'))
        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        }
    }, [updateFlag]);

    React.useEffect(() => {
        const e = ExternalDatabaseError(extDBTable);
        setErrors(e)
    }, [extDBTable]);

    function ExternalDatabaseError(eDBTable: SystemCenter.Types.ExternalDataBaseTable): string[] {
        let errors = [];

        if (eDBTable.TableName == null || eDBTable.TableName.length == 0)
            errors.push("A valid Name is required.")
        if (extDBTable.TableName != null && data.map(eDBTable => eDBTable.TableName.toLowerCase()).indexOf(extDBTable.TableName.toLowerCase()) > -1)
            errors.push('Name must be unique.');
        return errors;
    }

    if (status == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>External Database Information:</h4>
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
                        <ServerErrorIcon Show={true} Size={40} Label={"Server error occured. Please reload the page."}/>
                    </div>
                </div>
            </div>
        </div>

    function editExistingExternalDBTable(eDBTable: SystemCenter.Types.ExternalDataBaseTable): Promise<SystemCenter.Types.ExternalDataBaseTable> {
        return new Promise((res, rej) => {
            $.ajax({
                type: "POST",
                url: `${homePath}api/OpenXDA/ExternalDBTables/Edit`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({ ExternalDBTables: eDBTable }),
                cache: false,
                async: true
            }).done(d => res(d)).fail(e => rej(e))
        });
    }

    function updateExternalDB(): JQuery.jqXHR {
        setStatus('loading')
        return $.ajax({
            type: "Patch",
            url: `${homePath}api/OpenXDA/ExternalDBTables/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(extDBTable),
            dataType: 'json',
            cache: true,
            async: true
        })
    }
 
    function changedFields(): string[] {
        const result = [];
        if (extDBTable.TableName != props.ExternalDBTables.TableName)
            result.push('Name')
        if (extDBTable.ExternalDB != props.ExternalDBTables.ExternalDB)
            result.push('External Database')
        return result;
    }

    function SaveChanges() {
        setStatus('loading');
        editExistingExternalDBTable(extDBTable).then((d) => props.stateSetter(_.cloneDeep(props.ExternalDBTables)), (d) => setStatus('error'))
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
                    <ExternalDBForm ExternalDB={extDBTable} Setter={(record) => setExtDBTable(record)} />
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className={"btn btn-primary" + (errors.length != 0 || changedFields().length == 0 ? ' disabled' : '')} type='submit' onClick={() => { if (errors.length == 0) SaveChanges(), setUpdateFlag((x) => x + 1) }} data-tooltip='submit' hidden={extDBTable.ID == 0} onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                    </div>
                    <ToolTip Show={(errors.length > 0 || changedFields().length == 0) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                        {changedFields().length == 0 ? <p> No changes made.</p> : null}
                        {errors.map((t, i) => <p key={i}>
                            {CrossMark} {t}
                        </p>)}
                    </ToolTip>
                    <div className="btn-group mr-2">
                        <button className={"btn btn-default" + (changedFields().length == 0 ? ' disabled' : '')} data-tooltip="clear" onClick={() => setExtDBTable(props.ExternalDBTables)} onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                    </div>
                    <ToolTip Show={changedFields().length != 0 && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                        {changedFields().map((t, i) => <p key={i}> {Warning} Changes to {t} will be discarded.</p>)}
                    </ToolTip>
                </div>
            </div>
        );
    }
