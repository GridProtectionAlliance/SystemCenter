//******************************************************************************************************
//  ByEventType.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  01/30/2023 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Modal } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import GenericByPage from '../CommonComponents/GenericByPage';
import { EventTypeAssetTypeSlice, EventTypeSlice } from '../Store/Store';
import { SystemCenter } from '../global';
import { useAppDispatch } from '../hooks';
import EventTypeForm from './EventTypeForm';

declare var homePath: string;
const fieldCols: SystemCenter.IByCol<OpenXDA.Types.EventType>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: 'auto' },
    { Field: 'Category', Label: 'Category', Type: 'string', Width: 'auto' },
    { Field: 'Description', Label: 'Description', Type: 'string', Width: 'auto'},
    { Field: 'ShowInFilter', Label: 'Show in UI', Type: 'boolean', Width: 'auto' }
]
const controllerPath = `${homePath}api/OpenXDA/EventType`;

const ByEventType: Application.Types.iByComponent = () => {
    const dispatch = useAppDispatch();

    const [record, setRecord] = React.useState<OpenXDA.Types.EventType>(null);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [assetTypeET, setAssettypeET] = React.useState<OpenXDA.Types.EventTypeAssetType[]>([]);

    function handleSelect(item) {
        setRecord(item);
        setShowModal(true);
    }

    return (
        <GenericByPage<OpenXDA.Types.EventType>
            PagingID='EventType'
            OnClick={(item) => handleSelect(item.row)}
            Columns={fieldCols}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            ControllerPath={controllerPath}
            DefaultSearchKey='Name'
            DefaultSearchAscending={true}
        >
            <Modal
                Show={showModal}
                Title={'Edit ' + (record?.Name ?? 'Event Type')}
                ShowCancel={false}
                CallBack={(conf) => {
                    if (conf) {
                        $.ajax({
                            type: "PATCH",
                            url: `${controllerPath}/UpdateWithAssetTypes`,
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            data: JSON.stringify({ EventType: record, EventTypeAssetType: assetTypeET }),
                            cache: false,
                            async: true
                        }).done(() => {
                            refreshData(x => x + 1);
                            dispatch(EventTypeAssetTypeSlice.SetChanged());
                            dispatch(EventTypeSlice.SetChanged());
                        });
                    }
                    setShowModal(false);
                }}
                DisableConfirm={errors.length > 0}
                ShowX={true}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" />{t} </p>)
                }>
                    <EventTypeForm
                        Record={record}
                        Setter={setRecord}
                        setErrors={setErrors}
                        setAssetTypeETs={setAssettypeET}
                    />
            </Modal>
        </GenericByPage>
    )
}

export default ByEventType;

