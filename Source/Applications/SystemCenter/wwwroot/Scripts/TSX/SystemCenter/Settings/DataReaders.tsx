//******************************************************************************************************
//  DataReaders.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  10/28/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
import { Application, SystemCenter, OpenXDA } from '@gpa-gemstone/application-typings';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { Input } from '@gpa-gemstone/react-forms';
import { LoadingScreen, Modal, Search, SearchBar, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SystemCenter as GlobalSC } from '../global';
import { DataReaderSlice } from '../Store/Store';
const DataReaders: Application.Types.iByComponent = (props) => {

    const dispatch = useAppDispatch();

    const search = useAppSelector(DataReaderSlice.SearchFilters);
    const searchStatus = useAppSelector(DataReaderSlice.SearchStatus);

    const data = useAppSelector(DataReaderSlice.SearchResults);
    const status = useAppSelector(DataReaderSlice.Status);

    const [sortField, setSortField] = React.useState<keyof OpenXDA.Types.DataReader>('LoadOrder');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const emptySetting: OpenXDA.Types.DataReader = { ID: 0, FilePattern: '',  AssemblyName: '', TypeName: '', LoadOrder: 0 };
    const [editnewSetting, setEditNewSetting] = React.useState<OpenXDA.Types.DataReader>(emptySetting);
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(DataReaderSlice.Fetch());
    }, [dispatch, status]);

    React.useEffect(() => {
        if (searchStatus === 'unintiated' || status === 'changed')
            dispatch(DataReaderSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [dispatch, searchStatus, ascending, sortField, search]);

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editnewSetting.AssemblyName == null || editnewSetting.AssemblyName.length === 0)
            e.push('An Assembly Name is required.')
        if (editnewSetting.TypeName == null || editnewSetting.AssemblyName.length === 0)
            e.push('An Type Name is required.')
        setErrors(e)
    }, [editnewSetting])

    const searchFields: Search.IField<OpenXDA.Types.DataReader>[] = [
        { key: 'FilePattern', label: 'File Pattern', type: 'string', isPivotField: false },
        { key: 'AssemblyName', label: 'Assembly Name', type: 'string', isPivotField: false },
        { key: 'TypeName', label: 'Type Name', type: 'string', isPivotField: false },
        { key: 'LoadOrder', label: 'Load Order', type: 'number', isPivotField: false }
    ]

    if (status === 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
        </div>;

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<OpenXDA.Types.DataReader> CollumnList={searchFields} SetFilter={(flds) => dispatch(DataReaderSlice.DBSearch({ filter: flds, sortField, ascending }))}
                    Direction={'left'} defaultCollumn={{ key: 'AssemblyName', label: 'Assembly Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Data Reader(s)'}
                    GetEnum={() => {
                        return () => { }
                    }}
                >
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-primary" onClick={(event) => { setEditNewSetting(emptySetting); setEditNew('New'); setShowModal(true); event.preventDefault() }}>Add Operation</button>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <ReactTable.Table<OpenXDA.Types.DataReader>
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
                            if (d.colField === sortField)
                                dispatch(DataReaderSlice.DBSearch({ filter: search, sortField, ascending: true }));
                            else
                                dispatch(DataReaderSlice.DBSearch({ filter: search, sortField: d.colField, ascending }));
                        }}
                        OnClick={(item) => { setEditNewSetting(item.row); setShowModal(true); setEditNew('Edit'); }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<OpenXDA.Types.DataReader>
                            Key={'FilePattern'}
                            AllowSort={true}
                            Field={'FilePattern'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > File Pattern
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.DataReader>
                            Key={'AssemblyName'}
                            AllowSort={true}
                            Field={'AssemblyName'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > Assembly Name
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.DataReader>
                            Key={'TypeName'}
                            AllowSort={true}
                            Field={'TypeName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Type Name
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.DataReader>
                            Key={'LoadOrder'}
                            AllowSort={true}
                            Field={'LoadOrder'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > Load Order
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <Modal Title={editNew === 'Edit' ? 'Edit ' + (editnewSetting?.AssemblyName ?? 'Data Reader'): 'Add New Data Reader'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={editNew === 'Edit'} ConfirmText={'Save'} CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        dispatch(DataReaderSlice.DBAction({ verb: 'POST', record: editnewSetting }))
                    if (conf && editNew === 'Edit')
                        dispatch(DataReaderSlice.DBAction({ verb: 'PATCH', record: editnewSetting }))
                    if (!conf && isBtn)
                        setShowWarning(true);
                    setShowModal(false);
                }}
                DisableConfirm={(editNew === 'Edit' && !hasChanged) || errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)
                }
            >
                <div className="row">
                    <div className="col">
                        <Input<OpenXDA.Types.DataReader> Record={editnewSetting} Field={'FilePattern'} Label='File Pattern' Feedback={'A File Pattern is required'}
                            Valid={field => editnewSetting.AssemblyName != null && editnewSetting.AssemblyName.length > 0}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />

                        <Input<OpenXDA.Types.DataReader> Record={editnewSetting} Field={'AssemblyName'} Label='Assembly Name' Feedback={'An Assembly name is required'}
                            Valid={field => editnewSetting.AssemblyName != null && editnewSetting.AssemblyName.length > 0}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />
                        <Input<OpenXDA.Types.DataReader> Record={editnewSetting} Field={'TypeName'} Label='Type Name' Feedback={'A Type Name is required.'}
                            Valid={field => editnewSetting.TypeName != null && editnewSetting.TypeName.length > 0}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />
                        <Input<OpenXDA.Types.DataReader> Record={editnewSetting} Field={'LoadOrder'} Type='number' Label='Load Order' Valid={field => true}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />
                    </div>
                </div>
            </Modal>
            <Warning Title={'Delete ' + (editnewSetting?.AssemblyName ?? 'Data Reader')} Message={'This will delete this Data Reader from the system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                Show={showWarning} CallBack={(conf) => { if (conf) dispatch(DataReaderSlice.DBAction({ verb: 'DELETE', record: editnewSetting })); setShowWarning(false); }} />
        </>)
}

export default DataReaders;