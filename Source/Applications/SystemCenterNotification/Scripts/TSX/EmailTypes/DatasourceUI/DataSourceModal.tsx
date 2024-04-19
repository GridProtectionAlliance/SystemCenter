//******************************************************************************************************
//  DataSourceModal.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  07/26/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../../hooks';
import * as React from 'react';
import { Modal, ToolTip } from '@gpa-gemstone/react-interactive'
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { IDataSourceTriggeredEmailType, IEvent, ITriggeredEmailDataSourceSetting } from '../../global';
import { TriggeredDataSourceSettingSlice, TriggeredDataSourceSlice, TriggeredEmailDataSourceSlice } from '../../Store';
import { Select } from '@gpa-gemstone/react-forms';
import SQLDataSource from './SQLDataSource';
import { cloneDeep } from 'lodash'
import PQIDataSource from './PQIDataSource';
import FTTDataSource from './FTTDataSource';

declare var homePath;
declare var version;

interface IProps {
    Record: IDataSourceTriggeredEmailType | null,
    OnClose: () => void
}

const AllDataSources: DataSourceSettingUI[] = [SQLDataSource, PQIDataSource, FTTDataSource];

const DataSourceModal = (props: IProps) => {
    const dispatch = useAppDispatch();
    const typeStatus = useAppSelector(TriggeredDataSourceSlice.Status);
    const types = useAppSelector(TriggeredDataSourceSlice.Data);
    const [record, setRecord] = React.useState<IDataSourceTriggeredEmailType>();
    const dataSourceID = React.useMemo(() => record != null ? record.TriggeredEmailDataSourceID : null, [record]);

    const originalsettings = useAppSelector(TriggeredDataSourceSettingSlice.Data);
    const settingStatus = useAppSelector(TriggeredDataSourceSettingSlice.Status);
    const settingsParentID = useAppSelector(TriggeredDataSourceSettingSlice.ParentID);
    const [currentSettings, setCurrentSettings] = React.useState<ITriggeredEmailDataSourceSetting[]>([]);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [changes, setChanges] = React.useState<string[]>([]);

    const dataSourceUI = React.useMemo(() => {
        const type = types.find(item => item.ID == record.TriggeredEmailDataSourceID)
        return AllDataSources.find(ds => ds.Name == type.ConfigUI) ?? {Name: 'standard', UI: defaultDSUI, Defaults: []}
    }, [types, record.TriggeredEmailDataSourceID])

    
    resetCurrentSettings = React.useCallback(() => {
        const d = cloneDeep(originalsettings);
        dataSourceUI.Defaults.forEach((ds) => {
            if (d.find(s => s.Name == ds.Name) == null)
                d.push({ ...ds, TriggeredEmailDataSourceEmailTypeID: props.Record.ID });
        });
        setCurrentSettings(d);
    }, [dataSourceUI])

    React.useEffect(() => {
        if (typeStatus == 'unintiated' || typeStatus == 'changed')
            dispatch(TriggeredDataSourceSlice.Fetch());
    }, [typeStatus]);

    React.useEffect(() => {
        if (props.Record == null)
            return
        if (settingStatus == 'unintiated' || settingStatus == 'changed' || settingsParentID != props.Record.ID)
            dispatch(TriggeredDataSourceSettingSlice.Fetch(props.Record.ID));
    }, [settingStatus, props.Record]);

    React.useEffect(() => resetCurrentSettings(), [dataSourceID]);

    React.useEffect(() => {
        if (props.Record == null)
            return;
        if (types.length > 0 && types.find(t => t.ID == props.Record.TriggeredEmailDataSourceID) == null)
            setRecord({ ...props.Record, TriggeredEmailDataSourceID: types[0].ID });
        else
            setRecord(props.Record);
    }, [props.Record]);

    React.useEffect(() => {
        if (types.length == 0 || props.Record == null)
            return;
        if (types.find(t => t.ID == props.Record.TriggeredEmailDataSourceID) == null)
            setRecord({ ...props.Record, TriggeredEmailDataSourceID: types[0].ID });
    }, [types]);

    React.useEffect(() => {
        if (props.Record == null)
            return;
        resetCurrentSettings();
    }, [originalsettings]);

    // Determine Changes to Settings
    React.useEffect(() => {
        const w = [];
        currentSettings.forEach(s => {
            let saved = originalsettings.find(item => item.Name == s.Name);
            if (saved == null)
                w.push(`Changes to ${s.Name} will be lost`);
            else if (saved.Value != s.Value)
                w.push(`Changes to ${s.Name} will be lost`);
        });
        setChanges(w);
    }, [originalsettings, currentSettings]);

    function StandardUI() {
        return <div className="row">
                <div className="col">
                {record != null ? <Select<IDataSourceTriggeredEmailType> Record={record} Field={'TriggeredEmailDataSourceID'} Options={types.map(t => ({ Value: t.ID.toString(), Label: t.Name }))}
                    Setter={(r) => setRecord({ ...r, TriggeredEmailDataSourceID: parseInt(r.TriggeredEmailDataSourceID.toString()) })} Label={'Type'} /> : null}
                </div>
            </div>
    }

    function updateSettings(s: ITriggeredEmailDataSourceSetting) {
        setCurrentSettings((cs) => {
            const us = cloneDeep(cs);
            let i = us.findIndex(o => o.Name == s.Name);
            if (i == -1)
                us.push(s);
            else if (us[i].Value != s.Value)
                us[i] = { ...us[i], Value: s.Value };

            return us;
        })
    }

    return (
        <Modal Show={props.Record != null} Title={'Data Source'} ShowCancel={true} ShowX={false} CancelText={'Close'} ConfirmText={'Save'} Size={'lg'}
            CallBack={(c) => {
                if (c && record.ID < 0) {
                    dispatch(TriggeredEmailDataSourceSlice.DBAction({ verb: 'POST', record: { ...record, Settings: currentSettings.filter(s => s.Value != null) } }))
                }
                if (c && record.ID >= 0) {
                    dispatch(TriggeredEmailDataSourceSlice.DBAction({ verb: 'PATCH', record }))
                    currentSettings.forEach((s) => { if (s.Value != null) dispatch(TriggeredDataSourceSettingSlice.DBAction({ verb: s.ID == 0 ? 'POST' : 'PATCH', record: s }));});
                }
                if (!c)
                    resetCurrentSettings();
                props.OnClose();
             }}
            DisableConfirm={(props.Record == null || record == null) || (props.Record.TriggeredEmailDataSourceID == record.TriggeredEmailDataSourceID && changes.length == 0) || errors.length > 0}
            CancelShowToolTip={props.Record != null && record != null && (props.Record.TriggeredEmailDataSourceID != record.TriggeredEmailDataSourceID || changes.length > 0)}
            CancelToolTipContent={<>
                {(props.Record != null && record != null && props.Record.TriggeredEmailDataSourceID != record.TriggeredEmailDataSourceID) ? <>{Warning}<p> Changes to Type will be lost. </p></> : null}
                {changes.map((s, i) => <p key={i}> {Warning} {s} </p>)}
            </>}
            ConfirmShowToolTip={(props.Record !== null && record != null && props.Record.TriggeredEmailDataSourceID == record.TriggeredEmailDataSourceID && changes.length == 0) || errors.length > 0}
            ConfirmToolTipContent={<>
                {(props.Record !== null && record != null && props.Record.TriggeredEmailDataSourceID == record.TriggeredEmailDataSourceID && changes.length == 0) ? <p> No Changes have been made</p> : null}
                {errors.map((e, i) => <p key={i}> {CrossMark} {e} </p>)}
            </>}
        >
            <dataSourceUI.UI
                DataSourceID={record.ID}
                SetErrors={setErrors}
                SetSetting={updateSettings}
                Settings={currentSettings}
             > 
                {StandardUI()}
            </dataSourceUI.UI>
        </Modal>
        )
}

export default DataSourceModal;

export interface ISettingsUIProps {
    Settings: ITriggeredEmailDataSourceSetting[],
    SetSetting: (s: ITriggeredEmailDataSourceSetting) => void,
    SetErrors: (e: string[]) => void,
    DataSourceID: number,
}

export interface DataSourceSettingUI {
    UI: React.FC<ISettingsUIProps>,
    Defaults: ITriggeredEmailDataSourceSetting[],
    Name: string
}

const defaultDSUI: React.FC<ISettingsUIProps> = (props) => props.children;