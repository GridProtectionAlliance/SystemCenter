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
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { SearchBar, Search, Warning, LoadingScreen, ServerErrorIcon, GenericController, Modal } from '@gpa-gemstone/react-interactive';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Input, TextArea } from '@gpa-gemstone/react-forms';

export type System = 'SystemCenter' | 'MiMD' | 'OpenXDA' | 'OpenSEE' | 'SEBrowser' | 'PQDigest'
interface IProps<T extends SystemCenter.Types.Setting>  {
    SettingSystem: System
    DefaultSetting?: T
}

function Setting<T extends SystemCenter.Types.Setting>(props: IProps<T>) {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [filters, setFilters] = React.useState<Search.IFilter<T>[]>([])
    const [sortField, setSortField] = React.useState<keyof T>("Name");
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [data, setData] = React.useState<T[]>([])
    const [editnewSetting, setEditNewSetting] = React.useState<T>(props.DefaultSetting);
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);

    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [allSettings, setAllSettings] = React.useState<T[]>([])

    const genericController = React.useMemo(() => 
        new GenericController<T>(`${homePath}api/${props.SettingSystem === 'SystemCenter' ? '' : props.SettingSystem + '/'}Setting`, 'Name')
    , [props.SettingSystem])

    const pagedSearch = React.useCallback(() => {
        setStatus('loading')
        const h = genericController.PagedSearch(filters, sortField, ascending, currentPage);
        h.done((d) => {
            setData(JSON.parse(d.Data as unknown as string))
            setTotalPages(d.NumberOfPages)
            setRecordsPerPage(d.RecordsPerPage)
            setTotalRecords(d.TotalRecords)
            setStatus('idle')
            if (d.NumberOfPages <= currentPage)
                setCurrentPage(d.NumberOfPages > 0 ? d.NumberOfPages - 1 : 0)
        }).fail(() => setStatus('error'))

        return () => {
            if (h.abort != undefined) h.abort();
        }
    }, [genericController.PagedSearch, filters, sortField, ascending, currentPage])

    React.useEffect(() => {
        if (status === 'uninitiated' || status === 'changed') {
            const h = genericController.Fetch();
            h.done((d: T[]) => {
                setAllSettings(d)
                setStatus('idle')
            }).fail(() => setStatus('error'))
            return () => {
                if (h.abort != undefined) h.abort();
            }
        }
    }, [status, genericController.Fetch]);

    React.useEffect(() => {
        if (allSettings.length > 0)
            pagedSearch()
    }, [pagedSearch, allSettings])

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editnewSetting.Name == null || editnewSetting.Name.length === 0)
            e.push('A Name is required.')
        if (editnewSetting.Name != null && editnewSetting.Name.length > 0 && allSettings.findIndex(s => s.Name.toLowerCase() === editnewSetting.Name.toLowerCase() && s.ID !== editnewSetting.ID) > -1)
            e.push('A Setting with this Name already exists.')
        setErrors(e)
    }, [editnewSetting])

    const searchFields: Search.IField<T>[] = [
        { key: 'Name', label: 'Setting Name', type: 'string', isPivotField: false },
        { key: 'DefaultValue', label: 'Default Value', type: 'string', isPivotField: false },
        { key: 'Value', label: 'Current Value', type: 'string', isPivotField: false }
    ]
    
    if (status === 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
        </div>;

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
                    <SearchBar<T> CollumnList={searchFields} SetFilter={setFilters}
                    Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Setting Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'} StorageID={`${props.SettingSystem}SettingsFilter`}
                        ShowLoading={status === 'loading'} ResultNote={'Displaying  Setting(s) ' + (totalRecords > 0 ? (recordsPerPage * currentPage + 1) : 0) + ' - ' + (recordsPerPage * currentPage + data.length) + ' out of ' + totalRecords}
                    GetEnum={() => {
                        return () => { }
                    }}
                >
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-info btn-block" onClick={(event) => { setEditNewSetting(props.DefaultSetting); setEditNew('New'); setShowModal(true); event.preventDefault() }}>Add Setting</button>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>
                </div>
            </div >

            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'auto' }}>
                    <Table<T>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField as string}
                        Ascending={ascending}
                        OnSort={sort}
                        OnClick={(item) => { setEditNewSetting(item.row); setShowModal(true); setEditNew('Edit'); }}
                        TheadStyle={{ fontSize: 'smaller' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<T>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '24%' }}
                            RowStyle={{ width: '24%' }}
                        > Setting
                        </Column>
                        <Column<T>
                            Key={'Value'}
                            AllowSort={true}
                            Field={'Value'}
                            HeaderStyle={{ width: '38%' }}
                            RowStyle={{ width: '38%' }}
                        > Current Value
                        </Column>
                        <Column<T>
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
            <div className="row">
                <div className="col">
                    <Paging
                        Current={currentPage + 1}
                        SetPage={(page) => setCurrentPage(page - 1) } 
                        Total={totalPages}
                    />
                </div>
            </div>

            <Modal Title={editNew === 'Edit' ? 'Edit ' + (editnewSetting?.Name ?? 'Setting') : 'Add New Setting'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={editNew === 'Edit'} ConfirmText={'Save'} CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        genericController.DBAction('POST', editnewSetting); setStatus('changed');
                    if (conf && editNew === 'Edit')
                        genericController.DBAction('PATCH', editnewSetting); setStatus('changed');
                    if (!conf && isBtn)
                        setShowWarning(true);
                    setShowModal(false);
                }}
                DisableConfirm={(editNew === 'Edit' && !hasChanged) || errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)
                }
            >
                <div className="row">
                    <div className="col">
                        <Input<T> Record={editnewSetting} Field={'Name'} Label='Setting Name' Feedback={'A unique Setting Name is required.'}
                            Valid={field => editnewSetting.Name != null && editnewSetting.Name.length > 0 && allSettings.findIndex(s => s.Name === editnewSetting.Name && s.ID !== editnewSetting.ID) < 0}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />
                        <TextArea<T> Record={editnewSetting} Field={'Value'} Label='Current Value' Valid={field => true}
                            Setter={(record) => {
                                setHasChanged(true);
                                setEditNewSetting(record);
                            }}
                            Rows={1}
                        />
                        <TextArea<T> Record={editnewSetting} Field={'DefaultValue'} Label='Default Value' Valid={field => true} Disabled={editNew !== 'New'}
                            Setter={(record) => {
                                setEditNewSetting(record);
                                setHasChanged(true);
                            }}
                            Rows={1}
                        />
                    </div>
                </div>
            </Modal>
            <Warning Title={'Delete ' + (editnewSetting?.Name ?? 'Setting')} Message={'This will delete this Setting from the system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                Show={showWarning}
                CallBack={(conf) => {
                    if (conf)
                        genericController.DBAction('DELETE', editnewSetting); setShowWarning(false); setStatus('changed');
                }} />
        </div>)
}

export default Setting;