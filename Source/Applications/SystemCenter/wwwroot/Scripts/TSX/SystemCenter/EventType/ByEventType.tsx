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

import * as _ from 'lodash';
import { Modal, GenericController } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import EventTypeForm from './EventTypeForm';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import GenericByPage from '../CommonComponents/GenericByPage';
import { SystemCenter } from '../global'
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';

declare var homePath: string;
const fieldCols: SystemCenter.IByCol<OpenXDA.Types.EventType>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: 'auto' },
    { Field: 'Category', Label: 'Category', Type: 'string', Width: 'auto' },
    { Field: 'Description', Label: 'Description', Type: 'string', Width: 'auto'},
    { Field: 'ShowInFilter', Label: 'Show in UI', Type: 'boolean', Width: 'auto' }
]
const controllerPath = `${homePath}api/OpenXDA/EventType`

const EventTypeController = new GenericController<OpenXDA.Types.EventType>(controllerPath, "ID", true);

const ByEventType: Application.Types.iByComponent = (props) => {
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
                ShowCancel={true}
                CallBack={(conf) => {
                    if (conf)
                        EventTypeController.DBAction('PATCH', record).done(() => refreshData(x => x + 1));
                    setShowModal(false);
                }}
                DisableConfirm={errors.length > 0}
                ShowX={true}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}> {CrossMark} {t} </p>)
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

