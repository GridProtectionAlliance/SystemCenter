//******************************************************************************************************
//  ByWidget.tsx - Gbtc
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
//  09/20/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import HomeScreenWidgetForm from './HomeScreenWidgetForm';
import GenericByPage from '../CommonComponents/GenericByPage';
import {  GenericController, Modal } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { AllWidgets } from '../../../../../EventWidgets/TSX/WidgetWrapper';
import { Application } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA, SystemCenter } from '../global';

declare var homePath: string;
const controllerPath = `${homePath}api/PQDigest/HomeScreenWidget`;
const WidgetController = new GenericController<LocalXDA.IHomeScreenWidget>(controllerPath, "ID", true);
const fieldCols: SystemCenter.IByCol<LocalXDA.IHomeScreenWidget>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: 'auto' },
    { Field: 'Type', Label: 'Type', Type: 'string', Width: 'auto' }
]
const emptyWidget: LocalXDA.IHomeScreenWidget = { ID: 0, Name: '', Setting: '{}', Type: AllWidgets[0].Name, TimeFrame: 30 };

const ByWidget: Application.Types.iByComponent = () => {
    const [record, setRecord] = React.useState<LocalXDA.IHomeScreenWidget>(emptyWidget);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    return (
        <GenericByPage<LocalXDA.IHomeScreenWidget>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            PagingID='PQDigestHomeScreenWidget'
            OnClick={(item) => {
                setShowModal(true);
                setRecord(item.row)
            }}
            Columns={fieldCols}
            DefaultSearchAscending={false}
            DefaultSearchKey='Name'
        >
            <Modal
                Show={showModal}
                Title={'Edit PQ Digest Home Screen Widget'}
                Size={'xlg'}
                CallBack={(c) => {
                    if (c && record.ID > 0)
                        WidgetController.DBAction("PATCH", record).done(() => refreshData(x => x + 1));
                    setRecord(emptyWidget);
                    setShowModal(false);
                }}
                ShowCancel={false}
                ShowX={true}
                DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)} >
                <div className="row">
                    <HomeScreenWidgetForm
                        Widget={record}
                        stateSetter={setRecord}
                        setErrors={setErrors}
                    />
                </div>
            </Modal>
        </GenericByPage>
    )
}

export default ByWidget;

