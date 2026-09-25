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
import { useGetOne } from '../hooks';
import { RecordContext } from './RecordContext';
import { SystemCenter as SC } from '../global';

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
    GetName: (record: T) => string,
    /**
     * List of tabs to render with the record fetched in this component.
     */
    Tabs: IRecordTab<T>[],
    /**
     * Callback to determine whether or not user has permission to delete record.
     */
    HasDeletePermission: () => boolean
}

interface ITab {
    Label: string,
    Id: string
}

export interface IRecordTab<T> extends ITab {
    Content: (record: T, setRecord: React.Dispatch<React.SetStateAction<T>>, patch: () => void, clearChanges: () => void) => React.ReactNode
}

/**
 * Generic Record keeps a copy of the database record to pass along to the tabs for user view and interaction.
 * When changes are made to the record, that should happen in this component, so it can refresh and pass the updated database record into the tabs.
 * Renders the tabs passed into it.
 * This should also include other records? Like the AssetAttributes or the AdditionalFields?
 * @param props
 * @returns
 */
function GenericRecord<T>({
    RecordID,
    RecordType,
    TabLocalStorage,
    DefaultTab,
    ControllerPath,
    DefaultSort,
    GetOnePath,
    Redirect,
    GetName,
    Tabs,
    HasDeletePermission
}: IProps<T>) {
    const [tab, setTab] = React.useState<string>(() => getTab(TabLocalStorage, DefaultTab));
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [selectedRecord, setSelectedRecord] = React.useState<T | null>(null);
    const [warnings, setWarnings] = React.useState<string[]>([]);
    const [errors, setErrors] = React.useState<string[]>([]);
    const { Data: originalRecord, Status: originalRecordStatus } = useGetOne<T>(GetOnePath, RecordID, refreshCount);

    React.useEffect(() => {
        setSelectedRecord(originalRecord);
    }, [originalRecord])
    
    React.useEffect(() => {
        if (selectedRecord == null) return
        Object.keys(selectedRecord).forEach((key) => {
            if (!(key in (selectedRecord as object))) return
            const originalValue = originalRecord[key];
            const warning = `Changes to ${key} will be lost.`;
            if (originalValue != selectedRecord[key]) setWarnings(warns => warns.findIndex(warn => warn === warning) < 0 ? [...warns, warning] : warns);
            else setWarnings(warnings => warnings.filter(warn => warn != warning))
        })
    }, [originalRecord, selectedRecord])
    
    const setAndSaveTab = React.useCallback((tabID: string) => {
        const saved = getTab(TabLocalStorage, DefaultTab);
        if (saved != tabID) sessionStorage.setItem(TabLocalStorage, JSON.stringify(tabID));
        setTab(tabID);
    }, [TabLocalStorage, DefaultTab])

    const clearChanges = React.useCallback(() => {
        setSelectedRecord(originalRecord);
    }, [originalRecord])

    const patch = React.useCallback(() => {
        new GenericController<T>(ControllerPath, DefaultSort).DBAction("PATCH", selectedRecord)
            .then(() => refreshData(x => x + 1))
    }, [ControllerPath, DefaultSort, selectedRecord])

    const card = React.useMemo(() => {
        if (selectedRecord == null) return null
        const i = Tabs.findIndex(t => t.Id === tab)
        if (i < 0) return null
        return Tabs[i].Content(selectedRecord, setSelectedRecord, patch, clearChanges);
    }, [tab, Tabs, selectedRecord]);

    function deleteRecord() {
        new GenericController<T>(ControllerPath, DefaultSort).DBAction("DELETE", originalRecord)
            .then(() => window.location.href = Redirect)
    }

    const recordContextValue: SC.IRecordContext<T> = React.useMemo(() => {
        return {
            SelectedRecord: selectedRecord,
            SetSelectedRecord: setSelectedRecord,
            OriginalRecord: originalRecord,
            ClearChanges: clearChanges,
            Patch: patch,
            Errors: errors,
            SetErrors: setErrors,
            Warnings: warnings,
            SetWarnings: setWarnings,
            GetName: GetName,
            RecordType: RecordType,
            RefreshCount: refreshCount,
            SetRefreshCount: refreshData
        }
    }, [selectedRecord, originalRecord, clearChanges, patch, errors, warnings, GetName, RecordType, refreshCount])

    if (originalRecordStatus == 'uninitiated' || originalRecordStatus == 'loading')
        return <LoadingScreen Show={true} />;

    if (originalRecordStatus == 'error')
        return <ServerErrorIcon Show={true} Label={"Error occured while retrieving record."} />;

    if (originalRecord == null)
        return null;

    return (
        <RecordContext.Provider value={recordContextValue}>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="row p-2">
                    <div className="col">
                        <h2>{GetName(originalRecord)}</h2>
                    </div>
                    <div className="col">
                        <button className={"btn btn-danger pull-right"} hidden={(originalRecord == null) || !HasDeletePermission()} onClick={() => { if (HasDeletePermission()) setShowWarning(true) }}>Delete {RecordType}</button>
                    </div>
                </div>
                <hr />

                <TabSelector CurrentTab={tab} SetTab={(t) => setAndSaveTab(t)} Tabs={Tabs} />
                {card}
                <Warning Title={'Delete ' + (GetName(originalRecord))} Show={showWarning} Message={`This will permanently delete this ${RecordType}.`} CallBack={(c) => { if (c) deleteRecord(); setShowWarning(false) }} />
            </div>
        </RecordContext.Provider>
    )
}

export default GenericRecord;

function getTab(storage: string, defaultTab: string): string {
    const localTab = JSON.parse(sessionStorage.getItem(storage));
    if (localTab != null) return localTab;
    return defaultTab;
}