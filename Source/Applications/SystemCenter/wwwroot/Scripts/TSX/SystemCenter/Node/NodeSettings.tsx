//******************************************************************************************************
//  NodeSettings.tsx - Gbtc
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
//  06/25/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { SearchBar, Search, Warning, LoadingScreen, ServerErrorIcon, GenericController, Modal } from '@gpa-gemstone/react-interactive';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Input, TextArea } from '@gpa-gemstone/react-forms';

interface INodeSetting {
    ID: string,
    NodeID: string,
    Name: string,
    Value: string
}

interface IProps {
    NodeID: string
}

const searchFields: Search.IField<INodeSetting>[] = [
    { key: 'Name', label: 'Setting Name', type: 'string', isPivotField: false },
    { key: 'Value', label: 'Current Value', type: 'string', isPivotField: false }
]

export default function NodeSettings (props: IProps) {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [sortField, setSortField] = React.useState<keyof INodeSetting>("Name");
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [data, setData] = React.useState<INodeSetting[]>([])
    const [editnewSetting, setEditNewSetting] = React.useState<INodeSetting>(emptyNodeSetting(props.NodeID));
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [allSettings, setAllSettings] = React.useState<INodeSetting[]>([])

    const genericController = React.useMemo(() =>
        new GenericController<INodeSetting>(`${homePath}api/OpenXDA/NodeSetting`, 'Name')
        , [])

    const filters = React.useMemo((): Search.IFilter<INodeSetting>[] => { return [{ FieldName: 'NodeID', SearchText: props.NodeID, Operator: '=', IsPivotColumn: false, Type: 'string' }] }, [props.NodeID])

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
    }, [genericController.PagedSearch, filters, sortField, ascending, currentPage, props.NodeID])

    React.useEffect(() => {
        const e: string[] = [];
        if (editnewSetting.Name == null || editnewSetting.Name.length === 0)
            e.push('A Name is required.')
        if (editnewSetting.Name != null && editnewSetting.Name.length > 0 && allSettings.findIndex(s => s.Name.toLowerCase() === editnewSetting.Name.toLowerCase() && s.ID !== editnewSetting.ID) > -1)
            e.push('A Setting with this Name already exists.')
        setErrors(e)
    }, [editnewSetting])


    React.useEffect(() => {
        if (status === 'uninitiated' || status === 'changed') {
            const h = genericController.DBSearch(filters);
            h.done((d: INodeSetting[]) => {
                setAllSettings(d)
                setStatus('idle')
            }).fail(() => setStatus('error'))
            return () => {
                if (h.abort != undefined) h.abort();
            }
        }
    }, [status, genericController.DBSearch, props.NodeID, filters]);

    React.useEffect(() => {
        if (allSettings.length > 0)
            pagedSearch()
    }, [pagedSearch, allSettings])

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row justify-content-end">
                <div className="col-4">
                    <li className="nav-item" style={{ paddingRight: 10, width: '50%' }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-info btn-block" onClick={(event) => { setEditNewSetting(emptyNodeSetting(props.NodeID)); setEditNew('New'); setShowModal(true); event.preventDefault() }}>Add Setting</button>
                            </form>
                        </fieldset>
                    </li>
                </div>
            </div>
            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'auto' }}>
                    <Table<INodeSetting>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField as string}
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
                        <Column<INodeSetting>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Setting
                        </Column>
                        <Column<INodeSetting>
                            Key={'Value'}
                            AllowSort={true}
                            Field={'Value'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        >  Value
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Paging
                        Current={currentPage + 1}
                        SetPage={(page) => setCurrentPage(page - 1)}
                        Total={totalPages}
                    />
                </div>
            </div>

            <Modal Title={editNew === 'Edit' ? 'Edit ' + (editnewSetting?.Name ?? 'Setting') : 'Add New Setting'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={editNew === 'Edit'} ConfirmText={'Save'} CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        genericController.DBAction('POST', editnewSetting).then(() => setStatus('changed')) 
                    if (conf && editNew === 'Edit')
                        genericController.DBAction('PATCH', editnewSetting).then(() => setStatus('changed')) 
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
                        <Input<INodeSetting> Record={editnewSetting} Field={'Name'} Label='Setting Name' Feedback={'A unique Setting Name is required.'}
                            Valid={field => editnewSetting.Name != null && editnewSetting.Name.length > 0 && allSettings.findIndex(s => s.Name === editnewSetting.Name && s.ID !== editnewSetting.ID) < 0}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />
                        <TextArea<INodeSetting> Record={editnewSetting} Field={'Value'} Label='Current Value' Valid={field => true}
                            Setter={(record) => {
                                setHasChanged(true);
                                setEditNewSetting(record);
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
                        genericController.DBAction('DELETE', editnewSetting).then(() => setStatus('changed')); setShowWarning(false);
                }} />
        </>)
}


const emptyNodeSetting = (nodeID: string) => {
    return {
        ID: '-1',
        NodeID: nodeID,
        Name: '',
        Value: ''
    }
}