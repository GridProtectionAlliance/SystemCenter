//******************************************************************************************************
//  ByApplicationCategory.tsx - Gbtc
//
//  Copyright (c) 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  11/11/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal, GenericController} from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols'
import { SystemCenter as LocalSC } from '../global';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ApplicationCategorySlice } from '../Store/Store';
import { Input } from '@gpa-gemstone/react-forms';
import { useNavigate } from "react-router-dom";
import GenericByPage from '../CommonComponents/GenericByPage';

//TODO: remove this interface and use interface from gemstone when new gemstone application-typing is published (check for it being used anywhere else too)
export interface ApplicationCategory {
    ID: number;
    Name: string;
    SortOrder: number;
}
const controllerPath = `${homePath}api/OpenXDA/ApplicationCategory`;
const fieldCols: LocalSC.IByCol<ApplicationCategory>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: '50%' },
    { Field: 'SortOrder', Label: 'Sort Order', Type: 'string', Width: '50%'}
];

const CategoryController = new GenericController<SystemCenter.Types.ApplicationCategory>(
    controllerPath, "ID", true
);

const ByApplicationCategory: Application.Types.iByComponent = () => {
    let navigate = useNavigate();

    const emptyApplicationCategory = { ID: 0, Name: '', SortOrder: 0 };
    const [editNewApplicationCategory, setEditNewApplicationCategory] = React.useState<ApplicationCategory>(emptyApplicationCategory);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);

    const allApplicationCategories: ApplicationCategory[] = useAppSelector(ApplicationCategorySlice.Data);

    React.useEffect(() => {
        const e: string[] = [];
        if (editNewApplicationCategory.Name == null
            || editNewApplicationCategory.Name.length === 0)
            e.push('A Name is required.')
        if (editNewApplicationCategory.Name != null
            && editNewApplicationCategory.Name.length > 0
            && allApplicationCategories.findIndex(s =>
                s.Name.toLowerCase() === editNewApplicationCategory.Name.toLowerCase()
                && s.ID !== editNewApplicationCategory.ID) > -1)
            e.push('A Application Category with this Name already exists.')
        if (editNewApplicationCategory.SortOrder == null
            || editNewApplicationCategory.SortOrder === 0)
            e.push('A numeric Sort Order value is required.')
        setErrors(e)
    }, [editNewApplicationCategory])

    function Valid(field: keyof (ApplicationCategory)): boolean {
        if (field == 'Name')
            return editNewApplicationCategory.Name != null && editNewApplicationCategory.Name.length > 0 && editNewApplicationCategory.Name.length < 200;
        if (field == 'SortOrder')
            return editNewApplicationCategory.SortOrder % 1 == 0 && editNewApplicationCategory.SortOrder > 0 && editNewApplicationCategory.SortOrder != null;
        return false;
    }

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=ApplicationCategory&ID=${item.row.ID}`);
    }

    return (
        <GenericByPage<ApplicationCategory>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='SortOrder'
            PagingID='ApplicationCategory'
            OnClick={(item) => { handleSelect(item); }}
            Columns={fieldCols}
            DefaultSearchAscending={true}
            DefaultSearchKey='Name'
        >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary btn-block" onClick={(event) => {
                                event.preventDefault()
                                setEditNewApplicationCategory(editNewApplicationCategory);
                                setShowModal(true);
                            }}>Add Application Category</button>
                        </form>
                    </fieldset>
                </li>
            <Modal
                Title={'Add New Category'}
                Show={showModal}
                ShowX={true}
                Size={'lg'}
                ShowCancel={false}
                ConfirmText={'Save'}
                CallBack={(conf, isBtn) => {
                    if (conf && errors.length == 0)
                        CategoryController.DBAction("POST", editNewApplicationCategory).done(() => refreshData(refreshCount + 1));
                    setShowModal(false);
                }}
                DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)
                }
            >
                <div className="row">
                    <div className="col">
                        <Input<ApplicationCategory>
                            Record={editNewApplicationCategory}
                            Field={'Name'}
                            Label='Name'
                            Feedback={'A unique Name is required.'}
                            Valid={Valid}
                            Setter={(record) => { setEditNewApplicationCategory(record); }}
                        />
                        <Input<ApplicationCategory>
                            Record={editNewApplicationCategory}
                            Field={'SortOrder'}
                            Label='Sort Order'
                            Feedback={'A numeric Sort Order value is required.'}
                            Type={'number'}
                            Valid={Valid}
                            Setter={(record) => { setEditNewApplicationCategory(record); }}
                        />
                    </div>
                </div>
            </Modal>
        </GenericByPage>
    )
}

export default ByApplicationCategory
