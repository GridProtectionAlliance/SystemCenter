//******************************************************************************************************
//  Applications.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  11/17/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application, SystemCenter } from "@gpa-gemstone/application-typings";
import { ValueList } from "@gpa-gemstone/common-pages";
import { Pencil, TrashCan } from "@gpa-gemstone/gpa-symbols";
import { Input, Select } from "@gpa-gemstone/react-forms";
import { Modal, Search, ToolTip, Warning } from "@gpa-gemstone/react-interactive";
import Table from "@gpa-gemstone/react-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PQApplicationsSlice } from "../Store/Store";


export interface PQApplications {
    ID: number;
    Name: string;
    URL: string;
    Image: string;
    CategoryID: number;
    SortOrder: number;
}
interface IProps { ID: number, Tab: string }

function Applications(props: IProps) {

    const dispatch = useAppDispatch();

    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof PQApplications>('Name');
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [Options, setOptions] = React.useState<SystemCenter.Types.ValueListItem[]>([]);
    const [EmptyApplication, setEmptyApplication] = React.useState<PQApplications>({ ID: 0, Name: '', URL: '', Image: '', CategoryID: props.ID, SortOrder: 0 })

    const data: PQApplications[] = useAppSelector(PQApplicationsSlice.Data);
    const status: Application.Types.Status = useAppSelector(PQApplicationsSlice.Status);
    const parentID: number = useAppSelector(PQApplicationsSlice.ParentID) as number;

    const [newPQApplications, setNewPQApplications] = React.useState<PQApplications>(EmptyApplication);


    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed' || props.ID != parentID)
            dispatch(PQApplicationsSlice.Fetch(props.ID));
    }, [dispatch, status]);

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        dispatch(PQApplicationsSlice.Sort({ SortField: sortField, Ascending: ascending }));
    }, [ascending, sortField]);

    React.useEffect(() => {
        let handle = getTileImages();
        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);

    React.useEffect(() => {
        if (Options.length > 0) 
            setEmptyApplication({ ID: 0, Name: '', URL: '', Image: Options[0].Value, CategoryID: props.ID, SortOrder: 0 })
    }, [Options]);

    function getTileImages() {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/TileImages`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done(d => setOptions(d))
        return handle;
    }

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Applications:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <Table<PQApplications>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'URL', field: 'URL', label: 'URL', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'SortOrder', field: 'SortOrder', label: 'Sort Order', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Image', field: 'Image', label: 'Image', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } }
                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colField === undefined)
                                return;

                            if (d.colField === sortField)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                            }
                        }}
                        onClick={(item) => { setNewPQApplications(item.row); setShowModal(true); setEditNew('Edit'); }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455,}}
                        rowStyle={{display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                />
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className={"btn btn-primary"} onClick={() => { { setShowModal(true); setEditNew('New'); setNewPQApplications(EmptyApplication) } }} data-tooltip={'New'} >Add Application</button>
                    </div>
                </div>
            </div>
            <Modal Title={editNew === 'Edit' ? newPQApplications.Name + ' - Application' : 'Add New Application'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={editNew === 'Edit'} ConfirmText={'Save'} CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        dispatch(PQApplicationsSlice.DBAction({ verb: 'POST', record: newPQApplications }))
                    if (conf && editNew === 'Edit')
                        dispatch(PQApplicationsSlice.DBAction({ verb: 'PATCH', record: newPQApplications }))
                    if (!conf && isBtn)
                        setShowWarning(true);
                    setShowModal(false);
                }}
                DisableConfirm={(editNew === 'Edit' && !hasChanged)}
            >
                <div className="row">
                    <div className="col">
                        <Input<PQApplications> Record={newPQApplications} Field={'Name'} Label='Name' Feedback={'A Name is required.'}
                            Valid={field => newPQApplications.Name != null && newPQApplications.Name.length > 0}
                            Setter={(record) => { setNewPQApplications(record); setHasChanged(true); }}
                        />
                        <Input<PQApplications> Record={newPQApplications} Field={'URL'} Label='URL' Feedback={'URL is required.'}
                            Valid={field => newPQApplications.URL != null && newPQApplications.URL.length > 0}
                            Setter={(record) => { setNewPQApplications(record); setHasChanged(true); }}
                        />
                        <Input<PQApplications> Type={'number'} Record={newPQApplications} Field={'SortOrder'} Label='Sort Order' Feedback={'Sort Order is required.'}
                            Valid={field => true}
                            Setter={(record) => { setNewPQApplications(record); setHasChanged(true); }}
                        />
                        <Select<PQApplications> Record={newPQApplications} Field={'Image'} Label='Image' Options={Options.map((item => ({ Value: item.Value, Label: item.AltValue })))}
                            Setter={(record) => { setNewPQApplications(record); setHasChanged(true); }}
                        />
                    </div>
                </div>
            </Modal>
            <Warning Title={'Delete Application'} Message={'This will Delete this Application from the System. This can have unintended consequences and cause the System to crash. Are you sure you want to continue?'}
                Show={showWarning} CallBack={(conf) => { if (conf) dispatch(PQApplicationsSlice.DBAction({ verb: 'DELETE', record: newPQApplications })); setShowWarning(false); }} />
        </div>
    )
}
export default Applications;