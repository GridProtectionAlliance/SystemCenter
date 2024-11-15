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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { Input } from '@gpa-gemstone/react-forms';
import { Modal, Warning } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import { SystemCenter } from '../global';
import GenericByPage from '../CommonComponents/GenericByPage';

const controllerPath = `${homePath}api/OpenXDA/DataReader`;

const fieldCols: SystemCenter.IByCol<OpenXDA.Types.DataReader>[] = [
    { Field: 'FilePattern', Label: 'File Pattern', Type: 'string', Width: '20%' },
    { Field: 'AssemblyName', Label: 'Assembly Name', Type: 'string', Width: '20%' },
    { Field: 'TypeName', Label: 'TypeName', Type: 'string', Width: 'auto' },
    { Field: 'LoadOrder', Label: 'Load Order', Type: 'integer', Width: '20%' }
]

const DataReaders: Application.Types.iByComponent = (props) => {
    const emptySetting: OpenXDA.Types.DataReader = { ID: 0, FilePattern: '',  AssemblyName: '', TypeName: '', LoadOrder: 0 };
    const [editnewSetting, setEditNewSetting] = React.useState<OpenXDA.Types.DataReader>(emptySetting);
    const [editNew, setEditNew] = React.useState<Application.Types.NewEdit>('New');
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);

    React.useEffect(() => { setHasChanged(false) }, [showModal]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editnewSetting.AssemblyName == null || (editnewSetting.AssemblyName != null && editnewSetting.AssemblyName.length === 0))
            e.push('An Assembly Name is required.')
        if (editnewSetting.FilePattern != null && editnewSetting.FilePattern.length > 500)
            e.push('File Pattern must be less than 500 characters.')
        if (editnewSetting.LoadOrder == null)
            e.push('Load Order must not be null.')
        if (editnewSetting.TypeName == null || editnewSetting.TypeName.length === 0)
            e.push('An Type Name is required.')
        setErrors(e)
    }, [editnewSetting])

    function addOperation() {
        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataReader/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(editnewSetting),
            dataType: "json",
            cache: false,
            async: true
        }).done(() => {
            refreshData(x => x + 1);
        })

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        };
    }

    function updateOperation() {
        let handle = $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/DataReader/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(editnewSetting),
            dataType: "json",
            cache: false,
            async: true
        }).done(() => {
            refreshData(x => x + 1);
        })

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        };
    }

    function deleteOperation() {
        let handle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/DataReader/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(editnewSetting),
            dataType: "json",
            cache: false,
            async: true
        }).done(() => {
            refreshData(x => x + 1);
        })

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        };
    }

    function handleSelect(item) {
        setEditNewSetting(item.row);
        setEditNew('Edit');
        setShowModal(true);
    }

    return (
        <GenericByPage<OpenXDA.Types.DataReader>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='LoadOrder'
            PagingID='DataReaders'
            OnClick={(item) => { handleSelect(item); }}
            Columns={fieldCols}
            DefaultSearchAscending={false}
            DefaultSearchKey='FilePattern'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button
                            className="btn btn-primary"
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
                    ? 'Edit ' + (editnewSetting?.AssemblyName ?? 'Data Reader')
                    : 'Add New Data Reader'}
                Show={showModal}
                ShowX={true}
                Size={'lg'}
                ShowCancel={editNew === 'Edit'}
                ConfirmText={'Save'}
                CancelText={'Delete'}
                CallBack={(conf, isBtn) => {
                    if (conf && editNew === 'New')
                        addOperation();
                    if (conf && editNew === 'Edit')
                        updateOperation();
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
                        <Input<OpenXDA.Types.DataReader>
                            Record={editnewSetting}
                            Field={'FilePattern'}
                            Label='File Pattern'
                            Feedback={'A File Pattern under 500 characters is required'}
                            Valid={field => editnewSetting.FilePattern != null
                                && editnewSetting.FilePattern.length > 0
                                && editnewSetting.FilePattern.length <= 500}
                            Setter={(record) => {
                                setEditNewSetting(record);
                                setHasChanged(true);
                            }}
                        />
                        <Input<OpenXDA.Types.DataReader>
                            Record={editnewSetting}
                            Field={'AssemblyName'}
                            Label='Assembly Name'
                            Feedback={'An Assembly name is required'}
                            Valid={field => editnewSetting.AssemblyName != null
                                && editnewSetting.AssemblyName.length > 0}
                            Setter={(record) => {
                                setEditNewSetting(record);
                                setHasChanged(true);
                            }}
                        />
                        <Input<OpenXDA.Types.DataReader>
                            Record={editnewSetting}
                            Field={'TypeName'}
                            Label='Type Name'
                            Feedback={'A Type Name is required.'}
                            Valid={field => editnewSetting.TypeName != null
                                && editnewSetting.TypeName.length > 0}
                            Setter={(record) => {
                                setEditNewSetting(record);
                                setHasChanged(true);
                            }}
                        />
                        <Input<OpenXDA.Types.DataReader>
                            Record={editnewSetting}
                            Field={'LoadOrder'}
                            Type='number'
                            Label='Load Order'
                            Valid={field => editnewSetting.LoadOrder != null}
                            Setter={(record) => {
                                setEditNewSetting(record);
                                setHasChanged(true);
                            }}
                        />
                    </div>
                </div>
            </Modal>
            <Warning
                Title={'Delete ' + (editnewSetting?.AssemblyName ?? 'Data Reader')}
                Message={'This will delete this Data Reader from the system. This can have unintended consequences and cause the system to crash. Are you sure you want to continue?'}
                Show={showWarning}
                CallBack={(conf) => {
                    if (conf)
                        deleteOperation();
                    setShowWarning(false);
                }}
            />
        </GenericByPage>
    )
}

export default DataReaders;