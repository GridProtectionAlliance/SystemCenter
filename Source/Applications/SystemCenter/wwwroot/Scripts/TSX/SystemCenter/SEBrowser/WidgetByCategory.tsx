//******************************************************************************************************
//  WidgetByCategory.tsx - Gbtc
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
//  03/16/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA as LocalXDA } from '../global';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SEBrowserWidgetSlice } from '../Store/Store'
import Table from '@gpa-gemstone/react-table';
import { CrossMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { LoadingIcon, Modal, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import WidgetForm from './WidgetForm';
declare var homePath: string;

interface IProps { CategoryID: number }

const WidgetByCategory = (props: IProps) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(SEBrowserWidgetSlice.Data);
    const status = useAppSelector(SEBrowserWidgetSlice.Status);
    const categoryID = useAppSelector(SEBrowserWidgetSlice.ParentID);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [showEdit, setShowEdit] = React.useState<boolean>(false);
    const [showRemove, setShowRemove] = React.useState<boolean>(false);

    const sortField = useAppSelector(SEBrowserWidgetSlice.SortField);
    const ascending = useAppSelector(SEBrowserWidgetSlice.Ascending);

    const [record, setRecord] = React.useState<LocalXDA.IWidget>(null);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || categoryID != props.CategoryID)
            dispatch(SEBrowserWidgetSlice.Fetch(props.CategoryID))
    }, [status, categoryID, props.CategoryID])

    if (status == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>SE Browser Widgets:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                    </div>
                </div>
            </div>
        </div>

    if (status == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>SE Browser Widgets:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} Label={''} />
                    </div>
                </div>
            </div>
        </div>

    return <>
    <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                        <h4>SE Browser Widgets:</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
                <div style={{ width: '100%', height: window.innerHeight - 420 }}>
                    <Table<LocalXDA.IWidget>
                    cols={[
                            {
                                key: 'Name', field: 'Name', label: 'Widget Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }
                            },
                            {
                                key: 'Enabled', field: 'Enabled', label: 'Enabled', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }
                            },
                            {
                                key: 'Remove', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                content: (c) => <>
                                    <button className="btn btn-sm"
                                        onClick={(e) => {
                                            setRecord(c);
                                            setShowEdit(true);
                                        }}>
                                        <span>{Pencil}</span>
                                    </button>
                                    <button className="btn btn-sm"
                                        onClick={(e) => {
                                            setRecord(c);
                                            setShowRemove(true);
                                        }}>
                                        <span>{TrashCan}</span>
                                    </button>
                                </>
                            },
                            { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                        onSort={(d) => {

                            if (d.colKey === "Scroll" || d.colKey == 'Remove')
                                return;

                            if (d.colKey === sortField)
                                dispatch(SEBrowserWidgetSlice.Sort({ SortField: d.colField, Ascending: !ascending }));
                            else 
                                dispatch(SEBrowserWidgetSlice.Sort({ SortField: d.colField, Ascending: true }));
                        }}
                    onClick={() => { }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 500, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right" onClick={() => {
                        setShowAdd(true);
                        setRecord({ Enabled: false, ID: 0, Name: '', Setting: '', CategoryID: props.CategoryID });
                }}>Add Widget</button>
            </div>
        </div>
        </div>
        <Warning Message={'This will remove the Widget from this Tab.'} Show={showRemove} Title={'Remove Widget'}
            CallBack={(c) => { if (c) dispatch(SEBrowserWidgetSlice.DBAction({ record, verb: 'DELETE' })); setShowRemove(false); }}
        />
        <Modal Title={showEdit ? 'Edit Widget' : 'Add New Widget'}
            Show={showEdit || showAdd}
            CallBack={(c) => {
                if (c && showAdd)
                    dispatch(SEBrowserWidgetSlice.DBAction({ verb: 'POST', record }))
                if (c && showEdit)
                    dispatch(SEBrowserWidgetSlice.DBAction({ verb: 'PATCH', record }))
                 setShowAdd(false);
                setShowEdit(false);
            }}
            ShowX={true}
            ShowCancel={false}
            ConfirmText={showAdd ? 'Add Widget' : 'Save Changes'}
            ConfirmShowToolTip={errors.length > 0 || (showAdd && data.findIndex(r => r.ID == record.ID) >= 0)}
            DisableConfirm={errors.length > 0 || (showAdd && data.findIndex(r => r.ID == record.ID) >= 0)}
            ConfirmToolTipContent={<>
                {errors.map(e => <p> {CrossMark} {e}</p>)}
                {showAdd && data.findIndex(r => r.ID == record.ID) >= 0 ? <p> {CrossMark} This Widget already exists in the Tab.</p>: null }
            </>}
        >
            <WidgetForm Widget={record} stateSetter={setRecord} allowTypeChange={showAdd} setErrors={setErrors} />
        </Modal>
    </>
}


export default WidgetByCategory;