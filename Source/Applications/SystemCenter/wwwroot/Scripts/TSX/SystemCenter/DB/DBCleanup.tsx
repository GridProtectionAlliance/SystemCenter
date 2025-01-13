//******************************************************************************************************
//  DBCleanup.tsx - Gbtc
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
//  11/24/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { TextArea } from '@gpa-gemstone/react-forms';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { GenericController, Modal, Warning } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';
import { SystemCenter } from '../global';
import { DBCleanupSlice } from '../Store/Store';
import GenericByPage from '../CommonComponents/GenericByPage';
import { useAppSelector } from '../hooks';
export interface DBCleanup {
    ID: number;
    Name: string;
    SQLCommand: string;
    Schedule: string;
}

const fieldCols: SystemCenter.IByCol<DBCleanup>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: '50%' },
    { Field: 'Schedule', Label: 'Schedule', Type: 'string', Width: '50%'}
];
const controllerPath = `${homePath}api/OpenXDA/DBCleanup`

const DBCleanupController = new GenericController<DBCleanup>(controllerPath, "ID", true);

const DBCleanup: Application.Types.iByComponent = (props) => {
    const allDBCleanup: DBCleanup[] = useAppSelector(DBCleanupSlice.Data);
    const emptyDBCleanup = { ID: 0, Name: '', SQLCommand: '', Schedule: '' };

    const [sortField, setSortField] = React.useState<keyof DBCleanup>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const emptyDBCleanup = { ID: 0, Name: '', SQLCommand: '', Schedule: ''};
    const [editNewDBCleanup, setEditNewDBCleanup] = React.useState<DBCleanup>(emptyDBCleanup);
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editNewDBCleanup.Schedule == null || editNewDBCleanup.Schedule.length === 0)
            e.push("A Schedule is required.");
        if (editNewDBCleanup.Name == null || editNewDBCleanup.Name.length === 0)
            e.push("A Name is required.");
        if (editNewDBCleanup.Name != null && editNewDBCleanup.Name.length > 0 && allDBCleanup.findIndex(s => s.Name.toLowerCase() === editNewDBCleanup.Name.toLowerCase() && s.ID !== editNewDBCleanup.ID) > -1)
            e.push('Name must be unique.')
        if (editNewDBCleanup.SQLCommand == null || editNewDBCleanup.SQLCommand.length === 0)
            e.push("A SQL Command is required.");
        setErrors(e)
    }, [editNewDBCleanup])

    function handleSelect(item) {
        setEditNewDBCleanup(item.row);
        setShowModal(true);
        setEditNew('Edit');
    }

    return (
        <GenericByPage<DBCleanup>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            PagingID='DBCleanup'
            OnClick={(item) => { handleSelect(item); }}
            Columns={fieldCols}
            DefaultSearchAscending={true}
            DefaultSearchKey='Name'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-primary"
                        onClick={(event) => {
                            setEditNewDBCleanup(emptyDBCleanup);
                            setEditNew('New');
                            setShowModal(true);
                            event.preventDefault();
                            }}
                        >Add DB Cleanup</button>
                    </form>
                </fieldset>
            </li>
            <Modal
                Title={editNew === 'Edit'
                    ? 'Edit ' + (editNewDBCleanup?.Name ?? 'Database Cleanup')
                    : 'Add New Database Cleanup'}
                Show={showModal}
                ShowX={true}
                Size={'lg'}
                ShowCancel={editNew === 'Edit'}
                ConfirmText={'Save'}
                CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        DBCleanupController.DBAction("POST", editNewDBCleanup).done(() => refreshData(x => x + 1))
                    if (conf && editNew === 'Edit')
                        DBCleanupController.DBAction("PATCH", editNewDBCleanup).done(() => refreshData(x => x + 1))
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
                        <TextArea<DBCleanup> Rows={1} Record={editNewDBCleanup} Field={'Name'} Label='Name' Feedback={'A Name is required.'}
                            Valid={field => editNewDBCleanup.Name != null && editNewDBCleanup.Name.length > 0}
                            Setter={(record) => { setEditNewDBCleanup(record); setHasChanged(true); }}
                        />
                        <TextArea<DBCleanup> Rows={1} Record={editNewDBCleanup} Field={'Schedule'} Label='Schedule' Feedback={'A Schedule is required.'}
                            Valid={field => editNewDBCleanup.Schedule != null && editNewDBCleanup.Schedule.length > 0}
                            Setter={(record) => { setEditNewDBCleanup(record); setHasChanged(true); }}
                        />
                        <TextArea<DBCleanup> Rows={4} Record={editNewDBCleanup} Field={'SQLCommand'} Label='SQL Command' Feedback={'A SQL Command is required.'}
                            Valid={field => editNewDBCleanup.SQLCommand != null && editNewDBCleanup.SQLCommand.length > 0}
                            Setter={(record) => { setEditNewDBCleanup(record); setHasChanged(true); }}
                        />
                    </div>
                </div>
            </Modal>
            <Warning
                Title={'Delete ' + (editNewDBCleanup?.Name ?? 'Database Cleanup')}
                Message={'This will delete this Database Cleanup operation from the system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                Show={showWarning}
                CallBack={(conf) => {
                    if (conf)
                        DBCleanupController.DBAction("DELETE", editNewDBCleanup).done(() => refreshData(x => x + 1))
                    setShowWarning(false);
                }} />
        </GenericByPage>
    )
}
export default DBCleanup;