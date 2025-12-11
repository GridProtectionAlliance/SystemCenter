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

import { Application } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { GenericController, Modal } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import { EventWidget } from '../../../../../EventWidgets/TSX/global';
import { AllWidgets } from '../../../../../EventWidgets/TSX/WidgetWrapper';
import GenericByPage from '../CommonComponents/GenericByPage';
import WidgetForm from '../CommonComponents/WidgetForm';
import { SystemCenter } from '../global';

declare var homePath: string;
const controllerPath = `${homePath}api/PQDigest/Widget`;
const WidgetController = new GenericController<EventWidget.IWidgetView>(controllerPath, "ID", true);
const fieldCols: SystemCenter.IByCol<EventWidget.IWidgetView>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: 'auto' },
    { Field: 'Type', Label: 'Type', Type: 'string', Width: 'auto' }
]
const emptyWidget: EventWidget.IWidgetView = { ID: 0, Name: '', Setting: '{}', Type: AllWidgets[0].Name };

const ByWidget: Application.Types.iByComponent = () => {
    const [record, setRecord] = React.useState<EventWidget.IWidgetView>(emptyWidget);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    return (
        <GenericByPage<EventWidget.IWidgetView>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            PagingID='PQDigestWidget'
            OnClick={(item) => {
                setShowModal(true);
                setRecord(item.row)
            }}
            Columns={fieldCols}
            DefaultSearchAscending={false}
            DefaultSearchKey='Name'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-info btn-block" 
                            onClick={(event) => { event.preventDefault(); setShowModal(true); }}>Add Widget</button>
                    </form>
                </fieldset>
            </li>
            <Modal
                Show={showModal}
                Title={'Add New PQ Digest Event Widget'}
                Size={'xlg'}
                CallBack={(c) => {
                    if (c && record.ID == 0)
                        WidgetController.DBAction("POST", record).done(() => refreshData(x => x + 1));
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
                    <WidgetForm
                        Widget={record}
                        StateSetter={setRecord}
                        SetErrors={setErrors}
                        Type={'PQDigest'}
                    />
                </div>
            </Modal>
        </GenericByPage>
    )
}

export default ByWidget;

