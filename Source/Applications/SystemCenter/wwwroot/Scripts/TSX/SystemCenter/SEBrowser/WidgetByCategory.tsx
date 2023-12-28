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
import { useAppDispatch, useAppSelector } from '../hooks';
import { SEBrowserWidgetSlice, SEBrowserWidgetViewSlice } from '../Store/Store'
import { ReactTable } from '@gpa-gemstone/react-table';
import { CrossMark, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { LoadingIcon, Modal, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { EventWidget } from '../../../../../EventWidgets/TSX/global';
import { Select } from '@gpa-gemstone/react-forms';
import { cross } from 'd3';
declare var homePath: string;

interface IProps { CategoryID: number }

const WidgetByCategory = (props: IProps) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(SEBrowserWidgetViewSlice.Data);
    const status = useAppSelector(SEBrowserWidgetViewSlice.Status);
    const categoryID = useAppSelector(SEBrowserWidgetViewSlice.ParentID);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [showRemove, setShowRemove] = React.useState<boolean>(false);

    const sortField = useAppSelector(SEBrowserWidgetViewSlice.SortField);
    const ascending = useAppSelector(SEBrowserWidgetViewSlice.Ascending);
    const [record, setRecord] = React.useState<EventWidget.IWidgetView>(null);
    const allWidgets = useAppSelector(SEBrowserWidgetSlice.Data);
    const allWidgetStatus = useAppSelector(SEBrowserWidgetSlice.Status);

    React.useEffect(() => {
        if (allWidgetStatus == 'unintiated' || allWidgetStatus == 'changed')
            dispatch(SEBrowserWidgetSlice.Fetch())
    }, [allWidgetStatus]);

    React.useEffect(() => {
        if (allWidgets.length == 0)
            return;
        if (record == null)
            return setRecord({ ...allWidgets[0], CategoryID: props.CategoryID })
    }, [allWidgets])

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || categoryID != props.CategoryID)
            dispatch(SEBrowserWidgetViewSlice.Fetch(props.CategoryID))
    }, [status, categoryID, props.CategoryID])

    if (status == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>PQ Browser Widgets:</h4>
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
                        <h4>PQ Browser Widgets:</h4>
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
                        <h4>PQ Browser Widgets:</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
            <div style={{ width: '100%', height: window.innerHeight - 420 }}>
                <ReactTable.Table<EventWidget.IWidgetView>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey == 'Remove')
                            return;

                        if (d.colKey === sortField)
                            dispatch(SEBrowserWidgetViewSlice.Sort({ SortField: d.colField, Ascending: !ascending }));
                        else
                            dispatch(SEBrowserWidgetViewSlice.Sort({ SortField: d.colField, Ascending: true }));
                    }}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 500, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<EventWidget.IWidgetView>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Widget Name
                    </ReactTable.Column>
                    <ReactTable.Column<EventWidget.IWidgetView>
                        Key={'Type'}
                        AllowSort={true}
                        Field={'Type'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Widget Type
                    </ReactTable.Column>
                    <ReactTable.Column<EventWidget.IWidgetView>
                        Key={'Remove'}
                        AllowSort={false}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => <>
                            <button className="btn btn-sm"
                                onClick={(e) => {
                                    setRecord(item);
                                    setShowRemove(true);
                                }}>
                                <span>{TrashCan}</span>
                            </button>
                        </>}
                    > <p></p>
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right" onClick={() => {
                        setShowAdd(true);
                        //setRecord({ Enabled: false, ID: 0, Name: '', CategoryID: props.CategoryID });
                }}>Add Widget</button>
            </div>
        </div>
        </div>
        <Warning Message={'This will remove the Widget from this Tab.'} Show={showRemove} Title={'Remove ' + (record?.Name ?? 'Widget')}
            CallBack={(c) => { if (c) dispatch(SEBrowserWidgetViewSlice.DBAction({ record, verb: 'DELETE' })); setShowRemove(false); }}
        />
        <Modal Title={`Add Widget`}
            Show={showAdd}
            CallBack={(c) => {
                if (c)
                    dispatch(SEBrowserWidgetViewSlice.DBAction({ verb: 'POST', record }))
                 setShowAdd(false);
            }}
            DisableConfirm={data.find(d => d.ID == (record?.ID ?? 0)) != null}
            ConfirmShowToolTip={data.find(d => d.ID == (record?.ID ?? 0)) != null}
            ConfirmToolTipContent={<p>{CrossMark} This widget is already in this Category</p>}
            ShowX={true}
            ShowCancel={false}
            ConfirmText={'Add Widget'}
        >
            {record != null ?
                <Select<EventWidget.IWidgetView> Record={record} Field={'ID'}
                    Label='Widget'
                    Setter={(record) => setRecord({ ...record, CategoryID: props.CategoryID, ID: parseInt(record.ID.toString()) })}
                    Options={allWidgets.map(o => ({ Value: o.ID.toString(), Label: o.Name }))}
                /> : null}
        </Modal>
    </>
}


export default WidgetByCategory;