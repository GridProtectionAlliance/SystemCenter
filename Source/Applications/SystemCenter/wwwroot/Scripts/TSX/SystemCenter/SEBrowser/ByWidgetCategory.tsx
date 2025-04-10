//******************************************************************************************************
//  ByWidgetCategory.tsx - Gbtc
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
//  02/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';
import { OpenXDA as LocalXDA } from '../global';
import { useNavigate } from "react-router-dom";
import { Modal, GenericController } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import CategoryForm from './CategoryForm';
import GenericByPage from '../CommonComponents/GenericByPage';

const emptyCategory: LocalXDA.IWidgetCategory = { ID: 0, Name: '', OrderBy: 0 };
const fieldCols: SC.IByCol<LocalXDA.IWidgetCategory>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string' },
    { Field: 'OrderBy', Label: 'Order By', Type: 'number' }
];
const controllerPath = `${homePath}api/SystemCenter/WidgetCategory`;
const categoryController = new GenericController<LocalXDA.IWidgetCategory>(controllerPath, 'OrderBy', false);

const ByWidgetCategory: Application.Types.iByComponent = (props) => {
    let navigate = useNavigate();

    const [newCategory, setNewCategory] = React.useState<LocalXDA.IWidgetCategory>(emptyCategory);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const handleSelect = React.useCallback((item: { row: LocalXDA.IWidgetCategory }) => {
        navigate(`${homePath}index.cshtml?name=SEBrowserTab&TabID=${item.row.ID}`);
    }, []);

    return (
        <GenericByPage<LocalXDA.IWidgetCategory>
            ControllerPath={controllerPath} RefreshData={refreshCount}
            DefaultSortKey='OrderBy' PagingID='ByWidgetCategory' OnClick={handleSelect}
            Columns={fieldCols} DefaultSearchAscending={false} DefaultSearchKey='Name'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-info btn-block" onClick={(event) => { event.preventDefault(); setShowModal(true); }}>Add Tab</button>
                    </form>
                </fieldset>
            </li>
            <Modal Show={showModal} Title={'Add New PQ Browser Tab'} CallBack={(c) => {
                if (c) categoryController.DBAction('POST', newCategory).done(() => refreshData(c => c + 1));
                setShowModal(false);
                setNewCategory(emptyCategory);
            }} ShowCancel={false} ShowX={true} DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color='red'/> {t}</p>)} >
                <div className="row">
                    <CategoryForm Category={newCategory} stateSetter={setNewCategory} setErrors={setErrors} />
                </div>
            </Modal>
        </GenericByPage>
    )
}

export default ByWidgetCategory;

