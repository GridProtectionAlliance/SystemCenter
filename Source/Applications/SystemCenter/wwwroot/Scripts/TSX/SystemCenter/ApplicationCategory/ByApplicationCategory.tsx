//******************************************************************************************************
//  ByApplicationCategory.tsx - Gbtc
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
//  11/11/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal} from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols'
import { useAppSelector, useAppDispatch } from '../hooks';
import { ApplicationCategorySlice } from '../Store/Store';
import { Input } from '@gpa-gemstone/react-forms';
import { useHistory } from "react-router-dom";

//TODO: remove this interface and use interface from gemstone when new gemstone application-typing is published (check for it being used anywhere else too)
export interface ApplicationCategory {
    ID: number;
    Name: string;
    SortOrder: number;
}

const ByApplicationCategory: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();
    let history = useHistory();

    const emptyApplicationCategory = { ID: 0, Name: '', SortOrder: 0 };
    const [editNewApplicationCategory, setEditNewApplicationCategory] = React.useState<ApplicationCategory>(emptyApplicationCategory);
    const [sortField, setSortField] = React.useState<keyof ApplicationCategory>('Name');
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const search: Search.IFilter<ApplicationCategory>[] = useAppSelector(ApplicationCategorySlice.SearchFilters);
    const status: Application.Types.Status = useAppSelector(ApplicationCategorySlice.Status);
    const searchStatus: Application.Types.Status = useAppSelector(ApplicationCategorySlice.SearchStatus);
    const data: ApplicationCategory[] = useAppSelector(ApplicationCategorySlice.SearchResults);
    const allApplicationCategories: ApplicationCategory[] = useAppSelector(ApplicationCategorySlice.Data);


    const searchFields: Search.IField<SystemCenter.Types.Setting>[] = [
        { key: 'Name', label: 'Name', type: 'string', isPivotField: false },
        { key: 'SortOrder', label: 'Sort Order', type: 'integer', isPivotField: false },
    ]

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed')
            dispatch(ApplicationCategorySlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        if (searchStatus === 'unintiated' || searchStatus === 'changed')
            dispatch(ApplicationCategorySlice.DBSearch({ filter: search, sortField, ascending }));
    }, [searchStatus]);

    React.useEffect(() => {
        dispatch(ApplicationCategorySlice.DBSearch({ filter: search, sortField, ascending }));
    }, [ascending, sortField]);

    React.useEffect(() => {
        const e: string[] = [];
        if (editNewApplicationCategory.Name == null || editNewApplicationCategory.Name.length === 0)
            e.push('A Name is required.')
        if (editNewApplicationCategory.Name != null && editNewApplicationCategory.Name.length > 0 && allApplicationCategories.findIndex(s => s.Name.toLowerCase() === editNewApplicationCategory.Name.toLowerCase() && s.ID !== editNewApplicationCategory.ID) > -1)
            e.push('A Application Category with this Name already exists.')
        if (editNewApplicationCategory.SortOrder == null || editNewApplicationCategory.SortOrder === 0)
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
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ApplicationCategory&ID=' + item.row.ID, state: {} })
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<ApplicationCategory> CollumnList={searchFields} SetFilter={(flds) => dispatch(ApplicationCategorySlice.DBSearch({ filter: flds, sortField, ascending }))} Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }}
                Width={'50%'} StorageID="ApplicationCategoriesFilter" Label={'Search'}
                ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Application Categorie(s)'}
                GetEnum={() => {
                        return () => { }
                    }}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" onClick={(event) => {
                                event.preventDefault()
                                setEditNewApplicationCategory(editNewApplicationCategory);
                                setShowModal(true);
                            }}>Add Application Category</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <ReactTable.Table<ApplicationCategory>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colField === undefined)
                            return;
                        if (d.colField === sortField)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortField(d.colField);
                        } 
                    }}
                    OnClick={handleSelect}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<ApplicationCategory>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: '50%' }}
                        RowStyle={{ width: '15%' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<ApplicationCategory>
                        Key={'SortOrder'}
                        AllowSort={true}
                        Field={'SortOrder'}
                        HeaderStyle={{ width: '50%' }}
                        RowStyle={{ width: '15%' }}
                    > Sort Order
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Title={'Add New Category'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={false} ConfirmText={'Save'}
                CallBack={(conf, isBtn) => {
                    if (conf && errors.length == 0)
                        dispatch(ApplicationCategorySlice.DBAction({ verb: 'POST', record: editNewApplicationCategory }))
                    setShowModal(false);
                }}
                DisableConfirm={ errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)
                }
            >
                <div className="row">
                    <div className="col">
                        <Input<ApplicationCategory> Record={editNewApplicationCategory} Field={'Name'} Label='Name' Feedback={'A unique Name is required.'}
                            Valid={Valid}
                            Setter={(record) => { setEditNewApplicationCategory(record);}}
                        />
                        <Input<ApplicationCategory> Record={editNewApplicationCategory} Field={'SortOrder'} Label='Sort Order' Feedback={'A numeric Sort Order value is required.'}
                            Type={'number'}
                            Valid={Valid}
                            Setter={(record) => { setEditNewApplicationCategory(record);}}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ByApplicationCategory
