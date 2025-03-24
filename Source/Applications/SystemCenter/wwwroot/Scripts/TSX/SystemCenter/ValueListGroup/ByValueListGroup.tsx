//******************************************************************************************************
//  ByCompany.tsx - Gbtc
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
//  10/16/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { Application } from '@gpa-gemstone/application-typings';
import { GenericController, Modal } from '@gpa-gemstone/react-interactive';
import {SystemCenter as localSC } from '../global'
import ValueListGroupForm from './ValueListGroupForm';
import GenericByPage from '../CommonComponents/GenericByPage';

const controllerPath = `${homePath}api/ValueListGroup`;
const ValueListGroupController = new GenericController<localSC.ValueListGroupView>(controllerPath, "ID", true);
const fieldCols: localSC.IByCol<localSC.ValueListGroupView>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: '15%' },
    { Field: 'Description', Label: 'Description', Type: 'string', Width: 'auto' },
    { Field: 'ItemCount', Label: 'Items', Type: 'integer', Width: '10%' }
];
const emptyRecord = { ID: 0, Name: '', Description: '', ItemCount: 0 };

const ValueListGroups: Application.Types.iByComponent = () => {
    const navigate = useNavigate();

    const [refreshCount, refreshData] = React.useState<number>(0);
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [record, setRecord] = React.useState<localSC.ValueListGroupView>(emptyRecord);

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=ValueListGroup&GroupID=${item.row.ID}`);
    }

    return (
        <GenericByPage<localSC.ValueListGroupView>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            PagingID='ValueLists'
            OnClick={(item) => { handleSelect(item); }}
            Columns={fieldCols}
            DefaultSearchAscending={false}
            DefaultSearchKey='Name'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-primary"
                            onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); setShowNew(true); }}>Add Group</button>
                    </form>
                </fieldset>
            </li>
            <Modal
                Title={'Add New Value List Group'}
                CallBack={(c) => {
                    if (c)
                        ValueListGroupController.DBAction("POST", record).done(() => refreshData(x => x + 1));
                    setShowNew(false);
                }}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Save'}
                Show={showNew} >
                <ValueListGroupForm
                    Record={record}
                    Setter={(r) => setRecord({ ...r, ItemCount: 0 })}
                />
            </Modal>
        </GenericByPage>
    )
}

export default ValueListGroups;