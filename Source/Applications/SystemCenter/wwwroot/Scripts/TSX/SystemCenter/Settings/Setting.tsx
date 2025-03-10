// ******************************************************************************************************
//  Setting.tsx - Gbtc
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
//  04/28/2021 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import { Table, Column } from '@gpa-gemstone/react-table';
import { SearchBar, Search, Warning, LoadingScreen, ServerErrorIcon, GenericSlice } from '@gpa-gemstone/react-interactive';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppDispatch, useAppSelector } from '../hooks';

interface IProps {
    SettingsSlice: GenericSlice<SystemCenter.Types.Setting>
}

function Setting(props: IProps) {
    const dispatch = useAppDispatch();

    const search: Search.IFilter<SystemCenter.Types.Setting>[] = useAppSelector(props.SettingsSlice.SearchFilters);
    const searchStatus: Application.Types.Status = useAppSelector(props.SettingsSlice.SearchStatus);

    const data: SystemCenter.Types.Setting[] = useAppSelector(props.SettingsSlice.SearchResults);
    const allSettings: SystemCenter.Types.Setting[] = useAppSelector(props.SettingsSlice.Data);
    const status: Application.Types.Status = useAppSelector(props.SettingsSlice.Status);

    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.Setting>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const emptySetting = { ID: 0, Name: '', Value: null, DefaultValue: null }
    const [editnewSetting, setEditNewSetting] = React.useState<SystemCenter.Types.Setting>(emptySetting);
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);
    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(props.SettingsSlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        if (searchStatus === 'unintiated' || searchStatus === 'changed')
            dispatch(props.SettingsSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [searchStatus]);

    React.useEffect(() => {
        dispatch(props.SettingsSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [ascending, sortField]);

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editnewSetting.Name == null || editnewSetting.Name.length === 0)
            e.push('A Name is required.')
        if (editnewSetting.Name != null && editnewSetting.Name.length > 0 && allSettings.findIndex(s => s.Name.toLowerCase() === editnewSetting.Name.toLowerCase() && s.ID !== editnewSetting.ID) > -1)
            e.push('A Setting with this Name already exists.')
        setErrors(e)
    }, [editnewSetting])

    const searchFields: Search.IField<SystemCenter.Types.Setting>[] = [
        { key: 'Name', label: 'Setting Name', type: 'string', isPivotField: false },
        { key: 'DefaultValue', label: 'Default Value', type: 'string', isPivotField: false },
        { key: 'Value', label: 'Current Value', type: 'string', isPivotField: false }
    ]

    if (status === 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
        </div>;

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<SystemCenter.Types.Setting> CollumnList={searchFields} SetFilter={(flds) => dispatch(props.SettingsSlice.DBSearch({ filter: flds, sortField, ascending }))}
                    Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Setting Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'} StorageID={`${props.SettingsSlice.Name}Filter`}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Setting(s)'}
                    GetEnum={() => {
                        return () => { }
                    }}
                >
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-primary" onClick={(event) => { setEditNewSetting(emptySetting); setEditNew('New'); setShowModal(true); event.preventDefault() }}>Add Setting</button>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<SystemCenter.Types.Setting>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colField === sortField)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                            }
                        }}
                        OnClick={(item) => { setEditNewSetting(item.row); setShowModal(true); setEditNew('Edit'); }}
                        TheadStyle={{ fontSize: 'smaller' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<SystemCenter.Types.Setting>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '24%' }}
                            RowStyle={{ width: '24%' }}
                        > Setting
                        </Column>
                        <Column<SystemCenter.Types.Setting>
                            Key={'Value'}
                            AllowSort={true}
                            Field={'Value'}
                            HeaderStyle={{ width: '38%' }}
                            RowStyle={{ width: '38%' }}
                        > Current Value
                        </Column>
                        <Column<SystemCenter.Types.Setting>
                            Key={'DefaultValue'}
                            AllowSort={true}
                            Field={'DefaultValue'}
                            HeaderStyle={{ width: '38%' }}
                            RowStyle={{ width: '38%' }}
                        > Default Value
                        </Column>
                    </Table>
                </div>
            </div>
            <Warning Title={'Delete ' + (editnewSetting?.Name ?? 'Setting')} Message={'This will delete this Setting from the system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                Show={showWarning} CallBack={(conf) => { if (conf) dispatch(props.SettingsSlice.DBAction({ verb: 'DELETE', record: editnewSetting })); setShowWarning(false); }} />
        </>)
}

export default Setting;