//******************************************************************************************************
//  DataOperations.tsx - Gbtc
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

import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { SystemCenter } from '../global';
import { GenericController, Modal, Warning } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import { DataOperationSlice } from '../Store/Store';
import GenericByPage from '../CommonComponents/GenericByPage';
import { Input } from '@gpa-gemstone/react-forms';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';

const controllerPath = `${homePath}api/OpenXDA/DataOperation`;
const DataOperationController = new GenericController<OpenXDA.Types.DataOperation>(controllerPath, "ID", true);
const fieldCols: SystemCenter.IByCol<OpenXDA.Types.DataOperation>[] = [
    { Field: 'AssemblyName', Label: 'Assembly Name', Type: 'string', Width: '20%'},
    { Field: 'TypeName', Label: 'Type Name', Type: 'string', Width: 'auto' },
    { Field: 'LoadOrder', Label: 'Load Order', Type: 'integer', Width: '20%' }
]

const DataOperations: Application.Types.iByComponent = (props) => {
    const [refreshCount, refreshData] = React.useState<number>(0);

    const emptySetting: OpenXDA.Types.DataOperation = { ID: 0, AssemblyName: '', TypeName: '', LoadOrder: 0 };
    const [editnewSetting, setEditNewSetting] = React.useState<OpenXDA.Types.DataOperation>(emptySetting);
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editnewSetting.AssemblyName == null || editnewSetting.AssemblyName.length === 0)
            e.push('An Assembly Name is required.')
        if (editnewSetting.TypeName == null || editnewSetting.AssemblyName.length === 0)
            e.push('An Type Name is required.')
        setErrors(e)
    }, [editnewSetting])

    function handleSelect(item) {
        setEditNewSetting(item.row);
        setEditNew('Edit');
        setShowModal(true);
    }

    return (
        <GenericByPage<OpenXDA.Types.DataOperation>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='LoadOrder'
            PagingID='DataOperations'
            OnClick={(item) => { handleSelect(item); }}
            Columns={fieldCols}
            DefaultSearchAscending={true}
            DefaultSearchKey='AssemblyName'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-info btn-block"
                            onClick={(event) => {
                                setEditNewSetting(emptySetting);
                                setEditNew('New');
                                setShowModal(true);
                                event.preventDefault()
                            }}
                        >Add Operation</button>
                    </form>
                </fieldset>
            </li>
            <Modal
                Title={editNew === 'Edit'
                    ? 'Edit ' + (editnewSetting?.AssemblyName ?? 'Data Operation')
                    : 'Add New Data Operation'}
                Show={showModal}
                ShowX={true}
                Size={'lg'}
                ShowCancel={editNew === 'Edit'}
                ConfirmText={'Save'}
                CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        DataOperationController.DBAction("POST", editnewSetting).done(() => refreshData(x => x + 1));
                    if (conf && editNew === 'Edit')
                        DataOperationController.DBAction("PATCH", editnewSetting).done(() => refreshData(x => x + 1));
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
                        <Input<OpenXDA.Types.DataOperation>
                            Record={editnewSetting}
                            Field={'AssemblyName'}
                            Label='Assembly Name'
                            Feedback={'An Assembly Name is required'}
                            Valid={field => editnewSetting.AssemblyName != null && editnewSetting.AssemblyName.length > 0}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />
                        <Input<OpenXDA.Types.DataOperation>
                            Record={editnewSetting}
                            Field={'TypeName'}
                            Label='Type Name'
                            Feedback={'A Type Name is required.'}
                            Valid={field => editnewSetting.TypeName != null && editnewSetting.TypeName.length > 0}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />
                        <Input<OpenXDA.Types.DataOperation>
                            Record={editnewSetting}
                            Field={'LoadOrder'}
                            Type='number'
                            Label='Load Order'
                            Valid={field => true}
                            Setter={(record) => { setEditNewSetting(record); setHasChanged(true); }}
                        />
                    </div>
                </div>
            </Modal>
            <Warning
                Title={'Delete ' + (editnewSetting?.AssemblyName ?? 'Data Operation')}
                Message={'This will delete this Data Operation from the system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                Show={showWarning}
                CallBack={(conf) => {
                    if (conf)
                        DataOperationController.DBAction("DELETE", editnewSetting).done(() => refreshData(x => x + 1));
                        DataOperationSlice.DBAction({ verb: 'DELETE', record: editnewSetting });
                    setShowWarning(false);
                }}
            />
        </GenericByPage>
    )
}

export default DataOperations;