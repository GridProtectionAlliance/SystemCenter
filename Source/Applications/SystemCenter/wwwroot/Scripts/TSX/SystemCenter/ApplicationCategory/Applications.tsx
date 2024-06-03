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
import { ReactTable } from "@gpa-gemstone/react-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PQApplicationsSlice } from "../Store/Store";

//TODO: remove this interface and use interface from gemstone when new gemstone application-typing is published (check for it being used anywhere else too)
export interface PQApplications {
    ID: number;
    Name: string;
    Url: string;
    Image: string;
    CategoryID: number;
    SortOrder: number;
}

interface IProps { ID: number, Tab: string }

const EmptyApplication: PQApplications = {
    ID: 0,
    Name: '',
    Url: '',
    Image: '',
    CategoryID: 0,
    SortOrder: 0
}

function Applications(props: IProps) {

    const dispatch = useAppDispatch();

    // Pop-up consts
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [Options, setOptions] = React.useState<string[]>([]);
    const [EditApplication, setEditApplication] = React.useState<PQApplications>(EmptyApplication);

    //Table consts
    const [sortField, setSortField] = React.useState<keyof PQApplications>('Name');
    const [ascending, setAscending] = React.useState<boolean>(false);
    const data: PQApplications[] = useAppSelector(PQApplicationsSlice.Data);
    const parentID = useAppSelector(PQApplicationsSlice.ParentID);
    const status: Application.Types.Status = useAppSelector(PQApplicationsSlice.Status);

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed' || parentID !== props.ID)
            dispatch(PQApplicationsSlice.Fetch(props.ID));
    }, [dispatch, status, parentID]);

    React.useEffect(() => {
        dispatch(PQApplicationsSlice.Sort({ SortField: sortField, Ascending: ascending}));
    }, [ascending, sortField]);

    React.useEffect(() => {
        let handle = getTileImages();
        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);

    React.useEffect(() => {
        if (Options.length > 0)
            setEditApplication({ ...EditApplication, Image: Options[0], CategoryID: props.ID})
    }, [Options]);

    function getTileImages() {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Tiles/GetAll`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done(d => setOptions(d));
        return handle;
    }

    function isNew(app: PQApplications): boolean {
        return app.ID < 1;
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Applications:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                <ReactTable.Table<PQApplications>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colField === undefined)
                            return;

                        if (d.colField === sortField)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortField(d.colField);
                        }
                    }}
                    TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                    OnClick={(item) => { setEditApplication(item.row); setShowModal(true); setHasChanged(false); }}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<PQApplications>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<PQApplications>
                        Key={'Url'}
                        AllowSort={true}
                        Field={'Url'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > URL
                    </ReactTable.Column>
                    <ReactTable.Column<PQApplications>
                        Key={'SortOrder'}
                        AllowSort={true}
                        Field={'SortOrder'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Sort Order
                    </ReactTable.Column>
                    <ReactTable.Column<PQApplications>
                        Key={'Image'}
                        AllowSort={true}
                        Field={'Image'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Image
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary"} onClick={() => {
                        { setShowModal(true); setHasChanged(false); setEditApplication({ ...EmptyApplication, Image: (Options.length > 0 ? Options[0] : EmptyApplication.Image), CategoryID: props.ID }) }
                    }} data-tooltip={'New'} >Add Application</button>
                </div>
            </div>
            <Modal Title={isNew(EditApplication) ? 'Add New Application' : 'Edit ' + (EditApplication?.Name ?? 'Application')}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={!isNew(EditApplication)} ConfirmText={'Save'} CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf) {
                        if (isNew(EditApplication))
                            dispatch(PQApplicationsSlice.DBAction({ verb: 'POST', record: EditApplication }))
                        else
                            dispatch(PQApplicationsSlice.DBAction({ verb: 'PATCH', record: EditApplication }))
                    }
                    else if (isBtn)
                        setShowWarning(true);
                    setShowModal(false);
                }}
                DisableConfirm={(!isNew(EditApplication) && !hasChanged)}
            >
                <div className="row">
                    <div className="col">
                        <Input<PQApplications> Record={EditApplication} Field={'Name'} Label='Name' Feedback={'A Name is required.'}
                            Valid={field => EditApplication.Name != null && EditApplication.Name.length > 0}
                            Setter={(record) => { setEditApplication(record); setHasChanged(true); }}
                        />
                        <Input<PQApplications> Record={EditApplication} Field={'Url'} Label='URL' Feedback={'A URL is required.'}
                            Valid={field => EditApplication.Url != null && EditApplication.Url.length > 0}
                            Setter={(record) => { setEditApplication(record); setHasChanged(true); }}
                        />
                        <Input<PQApplications> Type={'number'} Record={EditApplication} Field={'SortOrder'} Label='Sort Order' Feedback={'A numeric Sort Order value is required.'}
                            Valid={field => true}
                            Setter={(record) => { setEditApplication(record); setHasChanged(true); }}
                        />
                        <Select<PQApplications> Record={EditApplication} Field={'Image'} Label='Image' Options={Options.map((item => ({ Value: item, Label: item })))}
                            Setter={(record) => { setEditApplication(record); setHasChanged(true); }}
                        />
                    </div>
                </div>
            </Modal>
            <Warning Title={'Remove ' + (EditApplication?.Name ?? 'Application') + ' from Application Category'} Message={'This will remove the Application from the Category.'}
                Show={showWarning} CallBack={(conf) => { if (conf) dispatch(PQApplicationsSlice.DBAction({ verb: 'DELETE', record: EditApplication })); setShowWarning(false); }} />
        </div>
    )
}
export default Applications;