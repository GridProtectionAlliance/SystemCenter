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
import { ReactTable } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import { useAppSelector, useAppDispatch } from '../hooks';
import { WidgetCategorySlice } from '../Store/Store';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import CategoryForm from './CategoryForm';


declare var homePath: string;
const emptyCategory: LocalXDA.IWidgetCategory = { ID: 0, Name: '', OrderBy: 0 };

const ByWidgetCategory: Application.Types.iByComponent = (props) => {
    let dispatch = useAppDispatch();
    let history = useHistory();

    const cState = useAppSelector(WidgetCategorySlice.SearchStatus);
    const data = useAppSelector(WidgetCategorySlice.SearchResults);

    const sortKey = useAppSelector(WidgetCategorySlice.SortField);
    const filters = useAppSelector(WidgetCategorySlice.SearchFilters);
    const ascending = useAppSelector(WidgetCategorySlice.Ascending);

    const [newCategory, setNewCategory] = React.useState<LocalXDA.IWidgetCategory>(emptyCategory);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

   
    React.useEffect(() => {
        if (cState == 'unintiated' || cState == 'changed')
            dispatch(WidgetCategorySlice.DBSearch({filter: filters}))
    }, [cState]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=SEBrowserTab&TabID=' + item.row.ID })
    }

    const searchFields: Search.IField<LocalXDA.IWidgetCategory>[] = [
        { key: 'Name', isPivotField: false, label: 'Name', type: 'string' },
        { key: 'OrderBy', isPivotField: false, label: 'Order By', type: 'number' }
    ]
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<LocalXDA.IWidgetCategory> CollumnList={searchFields}
                SetFilter={(flds) => dispatch(WidgetCategorySlice.DBSearch({ sortField: sortKey, ascending, filter: flds }))}
                Direction={'left'}
                defaultCollumn={{ key: 'Name', isPivotField: false, label: 'Name', type: 'string' }}
                Width={'50%'} Label={'Search'}
                StorageID="WidgetCategoryFilter"
                ShowLoading={cState == 'loading'}
                ResultNote={cState == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Tab(s)'}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault(); setShowModal(true); }}>Add Tab</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <ReactTable.Table<LocalXDA.IWidgetCategory>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => {
                        dispatch(WidgetCategorySlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    OnClick={handleSelect}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<LocalXDA.IWidgetCategory>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<LocalXDA.IWidgetCategory>
                        Key={'OrderBy'}
                        AllowSort={true}
                        Field={'OrderBy'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Order By
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Show={showModal} Title={'Add New SE Browser Tab'} CallBack={(c) => {
                setShowModal(false);
                if (c)
                    dispatch(WidgetCategorySlice.DBAction({ verb: 'POST', record: newCategory }));
                setNewCategory(emptyCategory);
            }} ShowCancel={false} ShowX={true} DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}> {CrossMark} {t}</p>)} >
                <div className="row">
                    <CategoryForm Category={newCategory} stateSetter={setNewCategory} setErrors={setErrors} />
                </div>
            </Modal>
            

        </div>
    )
}

export default ByWidgetCategory;

