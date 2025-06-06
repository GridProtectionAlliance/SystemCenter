//******************************************************************************************************
//  ByMATLABAnalytic.tsx - Gbtc
//
//  Copyright � 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  08/03/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '../global';
import { useNavigate } from "react-router-dom";
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { Modal } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';

import MATLABAnalyticForm from './MATLABAnalyticForm';
import GenericByPage from '../CommonComponents/GenericByPage';
import EditionLockPage from '../CommonComponents/Restrictions/EditionLockPage';

const controllerPath = `${homePath}api/OpenXDA/MATLABAnalytic`;

const fieldCols: SystemCenter.IByCol<OpenXDA.Types.MATLABAnalytic>[] = [
    { Field: 'MethodName', Label: 'Method Name', Type: 'string', Width: 'auto' },
    { Field: 'AssemblyName', Label: 'Assembly Name', Type: 'string', Width: 'auto' },
    { Field: 'LoadOrder', Label: 'Load Order', Type: 'integer', Width: '15%' }
]

const MATLABAnalytics: Application.Types.iByComponent = (props) => {
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const navigate = useNavigate();

    const emptyRecord = { ID: 0, AssemblyName: '', MethodName: '', SettingSQL: '', LoadOrder: 0 };
    const [record, setRecord] = React.useState<OpenXDA.Types.MATLABAnalytic>(emptyRecord);
    const [eventTypeRecord, setEventTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticEventType[]>([]);
    const [assetTypeRecord, setAssetTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticAssetType[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);

    React.useEffect(() => {
        let e = [];
        if (record.MethodName === null || record.MethodName.length === 0) {
            e.push('A Method Name is required.');
        }
        if (record.AssemblyName === null || record.AssemblyName.length === 0) {
            e.push('An Assembly Name is required.');
        }

        setErrors(e);
    }, [record]);

    function handleSelect(item) {
        if (props.Roles.indexOf('Administrator') != -1)
            navigate(`${homePath}index.cshtml?name=MATLABAnalytic&AnalyticID=${item.row.ID}`);
    }

    return (
        <EditionLockPage>
            <GenericByPage<OpenXDA.Types.MATLABAnalytic>
                ControllerPath={controllerPath}
                RefreshData={refreshCount}
                DefaultSortKey='LoadOrder'
                PagingID='ByMATLABAnalytics'
                OnClick={(item) => { handleSelect(item); }}
                Columns={fieldCols}
                DefaultSearchAscending={false}
                DefaultSearchKey='MethodName'
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-info btn-block"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    setRecord({ ...emptyRecord });
                                    setShowNew(true);
                                }}
                                >Add Analytic
                            </button>
                        </form>
                    </fieldset>
                </li>
                <Modal Title={'Add New MATLAB Analytic'}
                    CallBack={(conf) => {
                        if (conf) $.ajax({
                            type: "POST",
                            url: `${homePath}api/OpenXDA/MATLABAnalytic/Add`,
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({
                                MATLABAnalytic: record,
                                MATLABAnalyticEventType: eventTypeRecord,
                                MATLABAnalyticAssetType: assetTypeRecord,
                            }),
                            dataType: 'json',
                            cache: false,
                            async: true
                        }).done(() => {
                            refreshData(x => x + 1);
                        });
                        setShowNew(false);
                    }}
                    ShowCancel={false}
                    ShowX={true}
                    ConfirmBtnClass={'btn-primary'}
                    ConfirmText={'Save'}
                    ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {e}</p>)}
                    DisableConfirm={errors.length > 0}
                    Show={showNew} >
                    <MATLABAnalyticForm
                        Record={record}
                        Setter={setRecord}
                        ETSetter={setEventTypeRecord}
                        ATSetter={setAssetTypeRecord}
                    />
                </Modal>
            </GenericByPage>
        </EditionLockPage>
    )
}

export default MATLABAnalytics;