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
import { Input } from '@gpa-gemstone/react-forms';
import { ReactTable } from '@gpa-gemstone/react-table';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { SearchBar, Search, Modal, Warning, LoadingScreen, ServerErrorIcon, GenericSlice } from '@gpa-gemstone/react-interactive';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ApplicationNodeSlice } from '../Store/Store';
import { CreateGuid } from '@gpa-gemstone/helper-functions';



const ByApplicationNode: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const search: Search.IFilter<Application.Types.iApplicationNode>[] = useAppSelector(ApplicationNodeSlice.SearchFilters);
    const searchStatus: Application.Types.Status = useAppSelector(ApplicationNodeSlice.SearchStatus);

    const data: Application.Types.iApplicationNode[] = useAppSelector(ApplicationNodeSlice.SearchResults);
    const allApplications: Application.Types.iApplicationNode[] = useAppSelector(ApplicationNodeSlice.Data);
    const status: Application.Types.Status = useAppSelector(ApplicationNodeSlice.Status);
    const sortField = useAppSelector(ApplicationNodeSlice.SortField);
    const ascending = useAppSelector(ApplicationNodeSlice.Ascending);

    const [editnewNode, setEditNewNode] = React.useState<Application.Types.iApplicationNode>({ ID: CreateGuid(), Name: '' });
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(ApplicationNodeSlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        if (searchStatus === 'unintiated' || status === 'changed')
            dispatch(ApplicationNodeSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [searchStatus, ascending, sortField, search]);

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editnewNode.Name == null || editnewNode.Name.length === 0)
            e.push('A Name is required.')
        setErrors(e)
    }, [editnewNode])

    const searchFields: Search.IField<Application.Types.iApplicationNode>[] = [
        { key: 'Name', label: 'Application Name', type: 'string', isPivotField: false },
        { key: 'ID', label: 'Node ID', type: 'string', isPivotField: false }
    ]

    if (status === 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
        </div>;

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<Application.Types.iApplicationNode> CollumnList={searchFields} SetFilter={(flds) => dispatch(ApplicationNodeSlice.DBSearch({ filter: flds, sortField, ascending }))}
                    Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Application Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'} StorageID={'ApplicationNodeFilter'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Application(s)'}
                    GetEnum={() => {
                        return () => { }
                    }}
                >
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-primary" onClick={(event) => { setEditNewNode({ ID: CreateGuid(), Name: '' }); setEditNew('New'); setShowModal(true); event.preventDefault() }}>Add New Application</button>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <ReactTable.Table<Application.Types.iApplicationNode>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            dispatch(ApplicationNodeSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        OnClick={(item) => { setEditNewNode(item.row); setShowModal(true); setEditNew('Edit'); }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<Application.Types.iApplicationNode>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '50%' }}
                            RowStyle={{ width: '50%' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<Application.Types.iApplicationNode>
                            Key={'NodeID'}
                            AllowSort={true}
                            Field={'ID'}
                            HeaderStyle={{ width: '50%' }}
                            RowStyle={{ width: '50%' }}
                        > Node ID
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <Modal Title={editNew === 'Edit' ? ('Edit ' + (editnewNode?.Name ?? 'SSO Application')) : 'Add New SSO Application'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={editNew === 'Edit'} ConfirmText={'Save'} CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        dispatch(ApplicationNodeSlice.DBAction({ verb: 'POST', record: editnewNode }))
                    if (conf && editNew === 'Edit')
                        dispatch(ApplicationNodeSlice.DBAction({ verb: 'PATCH', record: editnewNode }))
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
                        <Input<Application.Types.iApplicationNode> Record={editnewNode} Field={'Name'} Label='Application Name' Feedback={'A unique Name is required.'}
                            Valid={field => editnewNode.Name != null && editnewNode.Name.length > 0 && allApplications.findIndex(s => s.Name === editnewNode.Name && s.ID !== editnewNode.ID) < 0}
                            Setter={(record) => { setEditNewNode(record); setHasChanged(true); }}
                        />
                        <Input<Application.Types.iApplicationNode> Record={editnewNode} Field={'ID'} Label='Node ID' Feedback={''}
                            Valid={() => true} Disabled={true}
                            Setter={(record) => {}}
                        />
                        
                    </div>
                </div>
            </Modal>
            <Warning Title={'Delete ' + (editnewNode?.Name ?? 'SSO Application')} Message={'This will delete this Application from the SSO system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                Show={showWarning} CallBack={(conf) => { if (conf) dispatch(ApplicationNodeSlice.DBAction({ verb: 'DELETE', record: editnewNode })); setShowWarning(false); }} />
        </>)
}

export default ByApplicationNode;