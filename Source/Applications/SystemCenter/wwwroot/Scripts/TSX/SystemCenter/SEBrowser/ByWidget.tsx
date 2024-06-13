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
import { ReactTable } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import { useAppSelector, useAppDispatch } from '../hooks';
import { SEBrowserWidgetSlice } from '../Store/Store';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import WidgetForm from './WidgetForm';
import { AllWidgets } from '../../../../../EventWidgets/TSX/WidgetWrapper';


declare var homePath: string;
const emptyWidget: LocalXDA.IWidget = { ID: 0, Name: '', Setting: '{}', Type: AllWidgets[0].Name };

const ByWidget: Application.Types.iByComponent = (props) => {
    let dispatch = useAppDispatch();

    const cState = useAppSelector(SEBrowserWidgetSlice.SearchStatus);
    const data = useAppSelector(SEBrowserWidgetSlice.SearchResults);
    const sortKey = useAppSelector(SEBrowserWidgetSlice.SortField);
    const filters = useAppSelector(SEBrowserWidgetSlice.SearchFilters);
    const ascending = useAppSelector(SEBrowserWidgetSlice.Ascending);

    const [record, setRecord] = React.useState<LocalXDA.IWidget>(emptyWidget);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

   
    React.useEffect(() => {
        if (cState == 'unintiated' || cState == 'changed')
            dispatch(SEBrowserWidgetSlice.DBSearch({filter: filters}))
    }, [cState]);


    const searchFields: Search.IField<LocalXDA.IWidget>[] = [
        { key: 'Name', isPivotField: false, label: 'Name', type: 'string' },
        { key: 'Type', isPivotField: false, label: 'Type', type: 'enum', enum: [] }
    ]
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<LocalXDA.IWidget> CollumnList={searchFields}
                SetFilter={(flds) => dispatch(SEBrowserWidgetSlice.DBSearch({ sortField: sortKey, ascending, filter: flds }))}
                Direction={'left'}
                defaultCollumn={{ key: 'Name', isPivotField: false, label: 'Name', type: 'string' }}
                Width={'50%'} Label={'Search'}
                StorageID="WidgetFilter"
                ShowLoading={cState == 'loading'}
                ResultNote={cState == 'error' ? 'Could not complete Search' : 'Found ' + data.length + 'PQ Browser Widget(s)'}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0}
                                onClick={(event) => { event.preventDefault(); setShowModal(true); }}>Add PQ Browser Widget</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <ReactTable.Table<LocalXDA.IWidget>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => {
                        dispatch(SEBrowserWidgetSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    OnClick={(item) => { setShowModal(true); setRecord(item.row) }}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<LocalXDA.IWidget>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<LocalXDA.IWidget>
                        Key={'Type'}
                        AllowSort={true}
                        Field={'Type'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Type
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Show={showModal} Title={'Add New PQ Browser Widget'} CallBack={(c) => {
                setShowModal(false);
                if (c && record.ID == 0)
                    dispatch(SEBrowserWidgetSlice.DBAction({ verb: 'POST', record: record }));
                if (c && record.ID > 0)
                    dispatch(SEBrowserWidgetSlice.DBAction({ verb: 'PATCH', record: record }));
                setRecord(emptyWidget);
            }} ShowCancel={false} ShowX={true} DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}> {CrossMark} {t}</p>)} >
                <div className="row">
                    <WidgetForm Widget={record} stateSetter={setRecord} setErrors={setErrors} />
                </div>
            </Modal>
            

        </div>
    )
}

export default ByWidget;

