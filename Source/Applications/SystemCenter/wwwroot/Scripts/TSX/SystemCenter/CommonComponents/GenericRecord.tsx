//******************************************************************************************************
//  GenericModel.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  09/09/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { GenericController, LoadingScreen, ServerErrorIcon, TabSelector, Warning } from '@gpa-gemstone/react-interactive'
import { useAppSelector, useGetOne } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

interface IProps<T> {
    /**
     * ID of the record selected by the user.
     */
    RecordID: string | number,
    /**
     * String representation of the record type for user-facing messages.
     */
    RecordType: string,
    /**
     * Local storage key for storing the users' tab
     */
    TabLocalStorage: string,
    /**
     * Default tab to use if no tab is stored in local storage
     */
    DefaultTab: string,
    /**
     * API path for record patch, delete, or post functions.
     */
    ControllerPath: string,
    /**
     * Key to sort by default
     */
    DefaultSort: keyof T,
    /**
     * API path for 
     */
    GetOnePath: string,
    /**
     * URL to redirect the user to on record delete.
     */
    Redirect: string,
    /**
     * Function for deriving the user-facing name of this record.
     * @param record
     * @returns
     */
    Name: (record: T) => string,
    /**
     * List of tabs to render with the record fetched in this component.
     */
    Tabs: ITab<T>[]
}

export interface ITab<T> {
    Label: string,
    Id: string,
    Content: (record: T, patch: (record: T) => void) => React.ReactNode
}

/**
 * Generic Record keeps a copy of the database record to pass along to the tabs for user view and interaction.
 * When changes are made to the record, that should happen in this component, so it can refresh and pass the updated database record into the tabs.
 * Renders the tabs passed into it.
 * This should also include other records? Like the AssetAttributes or the AdditionalFields?
 * @param props
 * @returns
 */
function GenericRecord<T>(props: IProps<T>) {
    const [tab, setTab] = React.useState(() => getTab(props.DefaultTab, props.TabLocalStorage));
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const { RecordData: record, RecordStatus: recordStatus } = useGetOne<T>(props.GetOnePath, refreshCount);
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        const saved = getTab(tab, props.TabLocalStorage);
        if (saved !== tab)
            sessionStorage.setItem(props.TabLocalStorage, JSON.stringify(tab));
    }, [tab, props.TabLocalStorage]);

    const patch = React.useCallback((record: T) => {
        new GenericController<T>(props.ControllerPath, props.DefaultSort).DBAction("PATCH", record)
            .then(() => refreshData(x => x+1))
    }, [props.ControllerPath, props.DefaultSort])

    const card = React.useMemo(() => {
        if (record == null) return null
        const i = props.Tabs.findIndex(t => t.Id === tab)
        if (i < 0) return null
        return props.Tabs[i].Content(record, patch)
    },[tab, props.Tabs, record]);

    function deleteRecord() {
        new GenericController<T>(props.ControllerPath, props.DefaultSort).DBAction("DELETE", record)
            .then(() => window.location.href = props.Redirect)
    }
    function getTab(tab: string, storage: string): string {
        if (tab != undefined) return tab;
        const localTab = sessionStorage.getItem(storage);
        if (localTab != null)
            return JSON.parse(sessionStorage.getItem('Customer.Tab'));
        else
            return props.DefaultTab;
    }

    if (recordStatus == 'uninitiated' || recordStatus == 'loading')
        return <LoadingScreen Show={true}/>;

    if (recordStatus == 'error')
        return <ServerErrorIcon Show={true} Label={"Error occured while retrieving record."} />;

    if (record == null)
        return null;

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row p-2">
                <div className="col">
                    <h2>{props.Name(record)}</h2>
                </div>
                <div className="col">
                    <button className={"btn btn-danger pull-right"} hidden={(record == null) || !hasPermissions()} onClick={() => { if (hasPermissions()) setShowWarning(true) }}>Delete {props.RecordType}</button>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t) => setTab(t)} Tabs={props.Tabs} />
            {card}
            <Warning Title={'Delete ' + (props.Name(record))} Show={showWarning} Message={`This will permanently delete this ${props.RecordType}.`} CallBack={(c) => { if (c) deleteRecord(); setShowWarning(false) }} />
        </div>
    )
}

export default GenericRecord;