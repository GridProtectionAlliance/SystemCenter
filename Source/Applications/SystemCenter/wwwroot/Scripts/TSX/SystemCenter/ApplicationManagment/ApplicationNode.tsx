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
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import {  Modal, Warning } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ApplicationNodeSlice } from '../Store/Store';
import GenericByPage from '../CommonComponents/GenericByPage';
import { SystemCenter } from '../global';
import { CreateGuid } from '@gpa-gemstone/helper-functions';

const controllerPath = `${homePath}api/OpenXDA/ApplicationNode`;

const fieldCols: SystemCenter.IByCol<Application.Types.iApplicationNode>[] = [
        { Field: 'Name', Label: 'Name', Type: 'string', Width: '50%' },
        { Field: 'ID',   Label: 'Node ID', Type: 'string', Width: '50%', AllowSort: false }
];

const ByApplicationNode: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();
    const allApplications: Application.Types.iApplicationNode[] = useAppSelector(ApplicationNodeSlice.Data);

    const sortField = useAppSelector(ApplicationNodeSlice.SortField);
    const ascending = useAppSelector(ApplicationNodeSlice.Ascending);

    const emptyRecord = { ID: CreateGuid(), Name: '' };
    const [record, setRecord] = React.useState<Application.Types.iApplicationNode>(emptyRecord);
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        const e: string[] = [];
        if (record.Name == null || record.Name.length === 0)
            e.push('A Name is required.')
        setErrors(e)
    }, [record])

    return (
        <>
            <GenericByPage<Application.Types.iApplicationNode>
                ControllerPath={controllerPath}
                DefaultSortKey={sortField}
                RefreshData={refreshCount}
                DefaultSearchKey={'Name'}
                DefaultSearchAscending={ascending}
                PagingID={'ApplicationNodes'}
                Columns={fieldCols}
                OnClick={(item) => {
                    setRecord(item.row);
                    setShowModal(true);
                    setEditNew('Edit');
                }}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    setRecord({ ...emptyRecord });
                                    setShowModal(true);
                                }}
                                >Add New Application
                            </button>
                        </form>
                    </fieldset>
                </li>
                <Modal Title={editNew === 'Edit'
                        ? ('Edit ' + (record?.Name ?? 'SSO Application'))
                        : 'Add New SSO Application'}
                    Show={showModal}
                    ShowX={true}
                    Size={'lg'}
                    ShowCancel={editNew === 'Edit'}
                    ConfirmText={'Save'}
                    CancelText={'Delete'}
                    CallBack={(conf, isBtn) => {
                        if (conf && editNew === 'New')
                            dispatch(ApplicationNodeSlice.DBAction({ verb: 'POST', record: record }))
                                .then(() => refreshData(x => x + 1))
                        if (conf && editNew === 'Edit')
                            dispatch(ApplicationNodeSlice.DBAction({ verb: 'PATCH', record: record }))
                                .then(() => refreshData(x => x + 1))
                        if (!conf && isBtn)
                            setShowWarning(true);
                        setShowModal(false);
                    }}
                    DisableConfirm={(editNew === 'Edit' && !hasChanged) || errors.length > 0}
                    ConfirmShowToolTip={errors.length > 0}
                    ConfirmToolTipContent={
                        errors.map((t, i) => <p key={i}>{ReactIcons.CrossMark} {t} </p>)
                    }
                >
                    <div className="row">
                        <div className="col">
                            <Input<Application.Types.iApplicationNode>
                                Record={record}
                                Field={'Name'}
                                Label='Application Name'
                                Feedback={'A unique Name is required.'}
                                Valid={field => record.Name != null
                                    && record.Name.length > 0
                                    && allApplications.findIndex(s => s.Name === record.Name && s.ID !== record.ID) < 0}
                                Setter={(r) => {
                                    setRecord({ID: r.ID, Name: r.Name });
                                    setHasChanged(true);
                                }}
                            />
                            <Input<Application.Types.iApplicationNode>
                                Record={record}
                                Field={'ID'}
                                Label='Node ID'
                                Feedback={''}
                                Valid={() => true}
                                Disabled={true}
                                Setter={(record) => {}}
                            />
                        </div>
                    </div>
                </Modal>
                <Warning Title={'Delete ' + (record?.Name ?? 'SSO Application')}
                    Message={'This will delete this Application from the SSO system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                    Show={showWarning}
                    CallBack={(conf) => {
                        if (conf)
                        dispatch(ApplicationNodeSlice.DBAction({ verb: 'DELETE', record: record }))
                            .then(() => refreshData(x => x + 1));
                        setShowWarning(false);
                    }} />
            </GenericByPage>
        </>)
}

export default ByApplicationNode;
