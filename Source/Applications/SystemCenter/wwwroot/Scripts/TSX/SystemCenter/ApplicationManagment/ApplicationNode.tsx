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
import Table from '@gpa-gemstone/react-table';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { SearchBar, Search, Modal, Warning, LoadingScreen, ServerErrorIcon, GenericSlice } from '@gpa-gemstone/react-interactive';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationNodeSlice } from '../Store/Store';
import { CreateGuid } from '@gpa-gemstone/helper-functions';



const ByApplicationNode: Application.Types.iByComponent = (props) => {
    const dispatch = useDispatch();

    const search: Search.IFilter<Application.Types.iApplicationNode>[] = useSelector(ApplicationNodeSlice.SearchFilters);
    const searchStatus: Application.Types.Status = useSelector(ApplicationNodeSlice.SearchStatus);

    const data: Application.Types.iApplicationNode[] = useSelector(ApplicationNodeSlice.SearchResults);
    const allApplications: Application.Types.iApplicationNode[] = useSelector(ApplicationNodeSlice.Data);
    const status: Application.Types.Status = useSelector(ApplicationNodeSlice.Status);

    const [sortField, setSortField] = React.useState<keyof Application.Types.iApplicationNode>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

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
            e.push('A Name is required')
        setErrors(e)
    }, [editnewNode])

    const searchFields: Search.IField<SystemCenter.Types.Setting>[] = [
        { key: 'Name', label: 'Name', type: 'string', isPivotField: false },
        { key: 'ID', label: 'NodeID', type: 'string', isPivotField: false }
    ]

    if (status === 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application'} />
        </div>;

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<SystemCenter.Types.Setting> CollumnList={searchFields} SetFilter={(flds) => dispatch(ApplicationNodeSlice.DBSearch({ filter: flds, sortField, ascending }))}
                    Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Applications'}
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
                    <Table<Application.Types.iApplicationNode>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Application Name', headerStyle: { width: '50%' }, rowStyle: { width: '50%' } },
                            { key: 'NodeID', field: 'ID', label: 'Node ID', headerStyle: { width: '50%' }, rowStyle: { width: '50%' } },
                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey === 'scroll' || d.colField === undefined)
                                return;
                            if (d.colField === sortField)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                            }
                            if (d.colField === sortField)
                                dispatch(ApplicationNodeSlice.DBSearch({ filter: search, sortField, ascending: true }));
                            else
                                dispatch(ApplicationNodeSlice.DBSearch({ filter: search, sortField: d.colField, ascending }));
                        }}
                        onClick={(item) => { setEditNewNode(item.row); setShowModal(true); setEditNew('Edit'); }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={() => false}
                    />
                </div>
            </div>
            <Modal Title={editNew === 'Edit' ? editnewNode.Name + ' - Application' : 'Add New Application'}
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
            <Warning Title={'Delete Application'} Message={'This will Delete this Application from the SSO System. This can have unintended consequences and cause the System to crash. Are you sure you want to continue?'}
                Show={showWarning} CallBack={(conf) => { if (conf) dispatch(ApplicationNodeSlice.DBAction({ verb: 'DELETE', record: editnewNode })); setShowWarning(false); }} />
        </>)
}

export default ByApplicationNode;