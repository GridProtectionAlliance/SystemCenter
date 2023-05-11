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
import { IDataSourceScheduledEmailType, IScheduledDataSource, IScheduledEmailDataSourceSetting } from '../../global';
import { ScheduledDataSourceSettingSlice, ScheduledDataSourceSlice, ScheduledEmailDataSourceSlice } from '../../Store';
import { Select } from '@gpa-gemstone/react-forms';
import SQLDataSource from './SQLDataSource';
import AzureDataSource from './AzureDataSource';
import { cloneDeep } from 'lodash';

declare var homePath;
declare var version;

interface IProps {
    Record: IDataSourceScheduledEmailType | null,
    OnClose: () => void
}


const DataSourceModal = (props: IProps) => {
    const dispatch = useAppDispatch();
    const typeStatus = useAppSelector(ScheduledDataSourceSlice.Status);
    const types: IScheduledDataSource[] = useAppSelector(ScheduledDataSourceSlice.Data);
    const [record, setRecord] = React.useState<IDataSourceScheduledEmailType>();

    const originalsettings: IScheduledEmailDataSourceSetting[] = useAppSelector(ScheduledDataSourceSettingSlice.Data);
    const settingStatus = useAppSelector(ScheduledDataSourceSettingSlice.Status);
    const settingsParentID = useAppSelector(ScheduledDataSourceSettingSlice.ParentID);
    const [currentSettings, setCurrentSettings] = React.useState<IScheduledEmailDataSourceSetting[]>([]);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [changes, setChanges] = React.useState<string[]>([]);

      React.useEffect(() => {
          if (typeStatus == 'unintiated' || typeStatus == 'changed')
              dispatch(ScheduledDataSourceSlice.Fetch());
      }, [typeStatus]);

    React.useEffect(() => {
        if (props.Record == null)
            return
        if (settingStatus == 'unintiated' || settingStatus == 'changed' || settingsParentID != props.Record.ID)
            dispatch(ScheduledDataSourceSettingSlice.Fetch(props.Record.ID));
    }, [settingStatus, props.Record]);

    React.useEffect(() => {
        if (props.Record == null)
            return;
        if (types.length > 0 && types.find(t => t.ID == props.Record.ScheduledEmailDataSourceID) == null)
            setRecord({ ...props.Record, ScheduledEmailDataSourceID: types[0].ID });
        else
            setRecord(props.Record);
    }, [props.Record])

    React.useEffect(() => {
        if (types.length == 0 || props.Record == null)
            return;
        if (types.find(t => t.ID == props.Record.ScheduledEmailDataSourceID) == null)
            setRecord({ ...props.Record, ScheduledEmailDataSourceID: types[0].ID });
    }, [types])

    React.useEffect(() => {
        if (props.Record == null)
            return;
        const oldSettings = cloneDeep(originalsettings);
        getDefaults().forEach((ds) => {
            if (oldSettings.find(s => s.Name == ds.Name) == null)
                oldSettings.push({ ...ds, ScheduledEmailDataSourceEmailTypeID: props.Record.ID })
        });

        setCurrentSettings(oldSettings);
    }, [originalsettings, record?.ScheduledEmailDataSourceID])

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
    }, [originalsettings, currentSettings])

    function getUI() {
        if (record == null)
            return null;
        const type = types.find(item => item.ID == record.ScheduledEmailDataSourceID)
        if (type == null)
            return null;

        if (type.ConfigUI == 'sql')
            return <SQLDataSource.UI
                DataSourceID={record.ID}
                SetErrors={setErrors}
                SetSetting={updateSettings}
                Settings={currentSettings}
            />;
        if (type.ConfigUI == 'azure')
            return <AzureDataSource.UI
                DataSourceID={record.ID}
                SetErrors={setErrors}
                SetSetting={updateSettings}
                Settings={currentSettings}
            />;

        return (
            <div className="row">
                <div className="col">
                    <div className="alert alert-primary" role="alert">
                        Datasource UI not implemented.
                    </div>
                </div>
            </div>);
    }

    function getDefaults() {
        if (record == null)
            return [];
        const type = types.find(item => item.ID == record.ScheduledEmailDataSourceID)
        if (type == null)
            return [];

        let defaults = [];
        if (type.ConfigUI == 'sql')
            defaults = SQLDataSource.Defaults;
        if (type.ConfigUI == 'azure')
            defaults = AzureDataSource.Defaults;

        defaults.forEach(setting => setting.ScheduledEmailDataSourceEmailTypeID = record.ID);
        return defaults;
    }

    function updateSettings(updatedSetting: IScheduledEmailDataSourceSetting) {
        const clonedSettings = cloneDeep(currentSettings);
        let index = clonedSettings.findIndex(setting => setting.Name == updatedSetting.Name);
        if (index == -1)
            clonedSettings.push(updatedSetting);
        else if (clonedSettings[index].Value != updatedSetting.Value)
            clonedSettings.splice(index, 1, { ...clonedSettings[index], Value: updatedSetting.Value });
        setCurrentSettings(clonedSettings);
    }

    return (
        <Modal Show={props.Record != null} Title={'Data Source'} ShowCancel={true} ShowX={false} CancelText={'Close'} ConfirmText={'Save'} Size={'lg'}
            CallBack={(c) => {
                if (c && record.ID < 0) {
                    dispatch(ScheduledEmailDataSourceSlice.DBAction({ verb: 'POST', record: { ...record, Settings: currentSettings.filter(s => s.Value != null) } }))
                }
                if (c && record.ID >= 0) {
                    dispatch(ScheduledEmailDataSourceSlice.DBAction({ verb: 'PATCH', record }))
                    currentSettings.forEach((s) => { if (s.Value != null) dispatch(ScheduledDataSourceSettingSlice.DBAction({ verb: s.ID == 0 ? 'POST' : 'PATCH', record: s }));});
                }
                if (!c)
                    setCurrentSettings(originalsettings);
                props.OnClose();
             }}
            DisableConfirm={(props.Record == null || record == null) || (props.Record.ScheduledEmailDataSourceID == record.ScheduledEmailDataSourceID && changes.length == 0) || errors.length > 0}
            CancelShowToolTip={props.Record != null && record != null && (props.Record.ScheduledEmailDataSourceID != record.ScheduledEmailDataSourceID || changes.length > 0)}
            CancelToolTipContent={<>
                {(props.Record != null && record != null && props.Record.ScheduledEmailDataSourceID != record.ScheduledEmailDataSourceID) ? <>{Warning}<p> Changes to Type will be lost. </p></> : null}
                {changes.map((s, i) => <p key={i}> {Warning} {s} </p>)}
            </>}
            ConfirmShowToolTip={(props.Record !== null && record != null && props.Record.ScheduledEmailDataSourceID == record.ScheduledEmailDataSourceID && changes.length == 0) || errors.length > 0}
            ConfirmToolTipContent={<>
                {(props.Record !== null && record != null && props.Record.ScheduledEmailDataSourceID == record.ScheduledEmailDataSourceID && changes.length == 0) ? <p> No Changes have been made</p> : null}
                {errors.map((e, i) => <p key={i}> {CrossMark} {e} </p>)}
            </>}
        >
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            {record != null ? <Select<IDataSourceScheduledEmailType> Record={record} Field={'ScheduledEmailDataSourceID'} Options={types.map(t => ({ Value: t.ID.toString(), Label: t.Name }))}
                                Setter={(r) => setRecord({ ...r, ScheduledEmailDataSourceID: parseInt(r.ScheduledEmailDataSourceID.toString()) })} Label={'Type'} /> : null}
                        </div>
                    </div>
                    {getUI()}
                </div>
            </div>
        </Modal>
        )
}

export default DataSourceModal;

export interface ISettingsUIProps {
    Settings: IScheduledEmailDataSourceSetting[],
    SetSetting: (s: IScheduledEmailDataSourceSetting) => void,
    SetErrors: (e: string[]) => void,
    DataSourceID: number
}

export interface DataSourceSettingUI {
    UI: React.FC<ISettingsUIProps>,
    Defaults: IScheduledEmailDataSourceSetting[]
}