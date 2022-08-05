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

import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { Modal, ToolTip } from '@gpa-gemstone/react-interactive'
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { IDataSourceTriggeredEmailType, IEvent, ITriggeredEmailDataSourceSetting } from '../../global';
import { TriggeredDataSourceSettingSlice, TriggeredDataSourceSlice, TriggeredEmailDataSourceSlice } from '../../Store';
import { Select } from '@gpa-gemstone/react-forms';
import SQLDataSource from './SQLDataSource';
import { cloneDeep } from 'lodash'
import PQIDataSource from './PQIDataSource';

declare var homePath;
declare var version;

interface IProps {
    Record: IDataSourceTriggeredEmailType | null,
    OnClose: () => void
}


const DataSourceModal = (props: IProps) => {
    const dispatch = useDispatch();
    const typeStatus = useSelector(TriggeredDataSourceSlice.Status);
    const types = useSelector(TriggeredDataSourceSlice.Data);
    const [record, setRecord] = React.useState<IDataSourceTriggeredEmailType>();

    const originalsettings = useSelector(TriggeredDataSourceSettingSlice.Data);
    const settingStatus = useSelector(TriggeredDataSourceSettingSlice.Status);
    const settingsParentID = useSelector(TriggeredDataSourceSettingSlice.ParentID);
    const [currentSetings, setCurrentSettings] = React.useState<ITriggeredEmailDataSourceSetting[]>([]);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [changes, setChanges] = React.useState<string[]>([]);

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

    React.useEffect(() => {
        if (props.Record == null)
            return;
        if (types.length > 0 && types.find(t => t.ID == props.Record.TriggeredEmailDataSourceID) == null)
            setRecord({ ...props.Record, TriggeredEmailDataSourceID: types[0].ID });
        else
            setRecord(props.Record);
    }, [props.Record])

    React.useEffect(() => {
        if (types.length == 0 || props.Record == null)
            return;
        if (types.find(t => t.ID == props.Record.TriggeredEmailDataSourceID) == null)
            setRecord({ ...props.Record, TriggeredEmailDataSourceID: types[0].ID });
    }, [types])

    React.useEffect(() => {
        if (props.Record == null)
            return;
        const d = cloneDeep(originalsettings);
        getDefaults().forEach((ds) => {
            if (d.find(s => s.Name == ds.Name) == null)
                d.push({ ...ds, TriggeredEmailDataSourceEmailTypeID: props.Record.ID })
        })
        setCurrentSettings(d);


    }, [originalsettings])

    // Determine Changes to Settings
    React.useEffect(() => {
        const w = [];
        currentSetings.forEach(s => {
            let saved = originalsettings.find(item => item.Name == s.Name);
            if (saved == null)
                w.push(`Changes to ${s.Name} will be lost`);
            else if (saved.Value != s.Value)
                w.push(`Changes to ${s.Name} will be lost`);
        });
        setChanges(w);
    }, [originalsettings, currentSetings])

    function getUI() {
        if (record == null)
            return null;
        const type = types.find(item => item.ID == record.TriggeredEmailDataSourceID)
        if (type == null)
            return StandardUI();

        if (type.ConfigUI == 'sql')
            return <SQLDataSource.UI
                DataSourceID={record.ID}
                SetErrors={setErrors}
                SetSetting={updateSettings}
                Settings={currentSetings}
            > {StandardUI()}</SQLDataSource.UI>;
        if (type.ConfigUI == 'pqi')
            return <PQIDataSource.UI
                DataSourceID={record.ID}
                SetErrors={setErrors}
                SetSetting={updateSettings}
                Settings={currentSetings}
            > {StandardUI()}</PQIDataSource.UI>;

        return null;
    }

    function getDefaults() {
        if (record == null)
            return [];
        const type = types.find(item => item.ID == record.TriggeredEmailDataSourceID)
        if (type == null)
            return [];

        if (type.ConfigUI == 'sql')
            return SQLDataSource.Defaults
        if (type.ConfigUI == 'pqi')
            return PQIDataSource.Defaults
        return [];
    }
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
                    dispatch(TriggeredEmailDataSourceSlice.DBAction({ verb: 'POST', record: { ...record, Settings: currentSetings.filter(s => s.Value != null) } }))
                }
                if (c && record.ID >= 0) {
                    dispatch(TriggeredEmailDataSourceSlice.DBAction({ verb: 'PATCH', record }))
                    currentSetings.forEach((s) => { if (s.Value != null) dispatch(TriggeredDataSourceSettingSlice.DBAction({ verb: s.ID == 0 ? 'POST' : 'PATCH', record: s }));});
                }
                if (!c)
                    setCurrentSettings(originalsettings);
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
            {getUI()}
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

}