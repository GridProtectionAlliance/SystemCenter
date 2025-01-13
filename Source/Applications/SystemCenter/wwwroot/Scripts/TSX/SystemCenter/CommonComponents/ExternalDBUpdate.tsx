//******************************************************************************************************
//  ExternalDBUpdate.tsx - Gbtc
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
//  04/07/2020 - C. Lackner
//       Generated original version of source code.
//  11/27/2023 - G. Santos
//      Updated to work with addl field rework.
//
//******************************************************************************************************

import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { LoadingIcon, LoadingScreen, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { Table, Column } from '@gpa-gemstone/react-table';
import * as React from 'react';
import _ from 'lodash';
import moment from 'moment';

const ExternalDBUpdate = React.memo((props: {
    Type: 'Asset' | 'Meter' | 'Location' | 'Customer' | OpenXDA.Types.AssetTypeName,
    ID?: number,
    UpdateAll?: React.MutableRefObject<() => (() => void)>
}) => {
    // All externals and associated statuses
    const [statusMap, setStatusMap] = React.useState<Map<number, Application.Types.Status>>(new Map<number, Application.Types.Status>());
    const [externalDB, setExternalDB] = React.useState<Array<SystemCenter.Types.DetailedExternalDatabases>>([]);
    // Status/reload for whole page
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const [reload, reloadExternals] = React.useState<number>(0);
    // Table Controls
    const [asc, setAsc] = React.useState<boolean>(false);
    const [sort, setSort] = React.useState<keyof SystemCenter.Types.DetailedExternalDatabases>('Name');

    const updateMap = React.useCallback((id: number, status: Application.Types.Status) => {
        setStatusMap((oldMap) => {
            const newMap = new Map(oldMap);
            newMap.set(id, status);
            return newMap;
        });
    }, []);

    const updateExternalDB = React.useCallback((record: SystemCenter.Types.ExternalDatabases) => {
        updateMap(record.ID, 'loading');
        const handle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/ExternalDatabases/UnscheduledUpdate/${props.Type}${props.ID === undefined ? '' : "/" + props.ID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
            data: JSON.stringify(record),
        }).done(() => {
            updateMap(record.ID, 'idle');
        }).fail(() => { updateMap(record.ID, 'error'); });

        return handle;
    }, [updateMap, props.Type]);

    const updateAllExternalDB = React.useCallback(() => {
        // Promise that all db's will be updated
        const allPromises = externalDB.map(db => updateExternalDB(db));

        // Cancel all promises if we need to
        return () => {
            allPromises.forEach(handle => {
                if (handle?.abort != null) handle.abort();
            });
        }
    }, [externalDB, updateExternalDB]);

    React.useEffect(() => {
        setStatus('loading');
        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/ExternalDatabases/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{
                    Type: 'query',
                    FieldName: 'ID',
                    SearchText: `(SELECT DISTINCT ExternalDatabases.ID
                        FROM AdditionalField INNER JOIN 
                        extDBTables ON AdditionalField.ExternalDBTableID = extDBTables.ID INNER JOIN 
                        ExternalDatabases ON extDBTables.ExtDBID = ExternalDatabases.ID 
                        WHERE AdditionalField.ParentTable = '${props.Type}')`,
                    Operator: 'IN',
                    IsPivotColumn: false
                }], OrderBy: sort, Ascending: asc }),
            dataType: 'json',
            cache: false,
            async: true
        }).done((data: string) => {
            const newMap = new Map<number, Application.Types.Status>();
            const extDbs: Array<SystemCenter.Types.DetailedExternalDatabases> = JSON.parse(data);
            extDbs.forEach(db => newMap.set(db.ID, 'idle'));
            setStatusMap(newMap);
            setStatus('idle');
            const ordered = _.orderBy(extDbs, [sort], [(!asc ? "asc" : "desc")]);
            setExternalDB(ordered);
        }).fail(() => { setStatus('error') });

        return () => {
            if (handle?.abort != undefined) handle.abort();
        }
    }, [props.Type, reload]);

    React.useEffect(() => {
        const ordered = _.orderBy(externalDB, [sort], [(!asc ? "asc" : "desc")]);
        setExternalDB(ordered);
    }, [asc, sort]);

    React.useEffect(() => {
        if (props.UpdateAll !== undefined) props.UpdateAll.current = updateAllExternalDB;
    }, [updateAllExternalDB, props.UpdateAll]);

    return (
        <>
            {status === 'error' ?
                <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} /> : 
                <Table<SystemCenter.Types.DetailedExternalDatabases>
                    TableClass="table table-hover"
                    Data={externalDB}
                    SortKey={sort}
                    Ascending={asc}
                    OnSort={(d) => {
                        if (d.colKey === "ID")
                            return;

                        if (d.colKey === sort) {
                            setAsc(a => !a);
                        }
                        else {
                            setAsc(false);
                            setSort(d.colField);
                        }
                    }}
                    TheadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <Column<SystemCenter.Types.DetailedExternalDatabases>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Database Name
                    </Column>
                    <Column<SystemCenter.Types.DetailedExternalDatabases>
                        Key={'LastDataUpdate'}
                        AllowSort={true}
                        Field={'LastDataUpdate'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => {
                            if (item.LastDataUpdate == null || item.LastDataUpdate == '') return ''
                            else return moment(item.LastDataUpdate).format('MM/DD/YYYY HH:mm.ss.ssss')
                        }}
                    > Last Data Update
                    </Column>
                    <Column<SystemCenter.Types.DetailedExternalDatabases>
                        Key={'ID'}
                        AllowSort={false}
                        Field={'ID'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => {
                            if (statusMap.get(item.ID) === 'loading') return <LoadingIcon Show={true} Label={`Performing update for ${props.Type}s on connected to ${item.Name}...`} />
                            if (statusMap.get(item.ID) === 'error') return <ServerErrorIcon Show={true} Label="Could not complete update. Please contact an administartor..." />
                            return (
                                <button className="btn btn-primary pull-right" data-tooltip={item.ID} onClick={() => {
                                    const handle = updateExternalDB(item);
                                    handle.then(() => { reloadExternals(n => n + 1); });
                                    return () => {
                                        if (handle?.abort != undefined) handle.abort();
                                    }
                                }}>{`Update ${item.Name}`}</button>
                            );
                        }}
                    > <p></p>
                    </Column>
                </Table>
            }
            <LoadingScreen Show={status === 'loading'} />
        </>
    );
});

export default ExternalDBUpdate;
