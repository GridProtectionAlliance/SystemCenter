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
import { LoadingIcon, LoadingScreen, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table';
import moment from 'moment';
import * as React from 'react';
import _ from 'lodash';

const ExternalDBUpdate = React.memo((props: {
    Type: 'Asset' | 'Meter' | 'Location' | 'Customer' | OpenXDA.Types.AssetTypeName,
    ID?: number,
    UpdateAll?: React.MutableRefObject<() => (() => void)>
}) => {
    // All externals and associated statuses
    const [statusMap, setStatusMap] = React.useState<Map<number, Application.Types.Status>>(new Map<number, Application.Types.Status>());
    const [externalDB, setExternalDB] = React.useState<Array<SystemCenter.Types.ExternalDatabases>>([]);
    // Status/reload for whole page
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const [reload, reloadExternals] = React.useState<number>(0);
    // Table Controls
    const [asc, setAsc] = React.useState<boolean>(false);
    const [sort, setSort] = React.useState<keyof SystemCenter.Types.ExternalDatabases>('Name');

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
            type: "GET",
            url: `${homePath}api/SystemCenter/ExternalDatabases/GetExternalDatabases/${props.Type}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((data: Array<SystemCenter.Types.ExternalDatabases>) => {
            const newMap = new Map<number, Application.Types.Status>();
            data.forEach(db => newMap.set(db.ID, 'idle'));
            setStatusMap(newMap);
            setStatus('idle');
            const ordered = _.orderBy(data, [sort], [(!asc ? "asc" : "desc")]);
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
                <Table<SystemCenter.Types.ExternalDatabases>
                    cols={[
                        { key: 'Name', field: 'Name', label: 'Database Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'LastDataPull', field: 'LastDataPull', label: 'Last Date Retrieved', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        {
                            key: 'ID', field: 'ID', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (db) => {
                                if (statusMap.get(db.ID) === 'loading') return <LoadingIcon Show={true} Label={`Performing update for ${props.Type}s on connected to ${db.Name}...`} />
                                if (statusMap.get(db.ID) === 'error') return <ServerErrorIcon Show={true} Label="Could not complete update. Please contact an administartor..." />
                                return (
                                    <button className="btn btn-primary pull-right" data-tooltip={db.ID} onClick={() => {
                                            const handle = updateExternalDB(db);
                                            handle.then(() => { reloadExternals(n => n + 1); });
                                            return () => {
                                                if (handle?.abort != undefined) handle.abort();
                                            }
                                        }}>{`Update ${db.Name}`}</button>
                                );
                            }
                        },
                        { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } }
                    ]}
                    tableClass="table table-hover"
                    data={externalDB}
                    sortKey={sort}
                    ascending={asc}
                    onSort={(d) => {
                        if (d.colKey === "scroll" || d.colKey === "ID")
                            return;

                        if (d.colKey === sort) {
                            setAsc(a => !a);
                        }
                        else {
                            setAsc(false);
                            setSort(d.colField);
                        }
                    }}
                    theadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                    selected={(item) => false}
                />
            }
            <LoadingScreen Show={status === 'loading'} />
        </>
    );
});

export default ExternalDBUpdate;
