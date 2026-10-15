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
import { Table, Column } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { LoadingIcon, Modal, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { PQBrowser } from '@gpa-gemstone/application-typings';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { IsInteger } from '@gpa-gemstone/helper-functions';

//TODO: remove this interface and use interface from gemstone when new gemstone application-typing is published (check for it being used anywhere else too)
export interface IWidgetView extends PQBrowser.Types.IWidgetView {
    SortOrder: number
}

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
    const [record, setRecord] = React.useState<IWidgetView | null>(null);
    const [editRecord, setEditRecord] = React.useState<IWidgetView | null>(null);
    const allWidgets = useAppSelector(SEBrowserWidgetSlice.Data);
    const allWidgetStatus = useAppSelector(SEBrowserWidgetSlice.Status);

    React.useEffect(() => {
        if (allWidgetStatus == 'uninitiated' || allWidgetStatus == 'changed')
            dispatch(SEBrowserWidgetSlice.Fetch())
    }, [allWidgetStatus]);

    React.useEffect(() => {
        if (allWidgets.length == 0)
            return;
        if (record == null)
            return setRecord({ ...allWidgets[0], CategoryID: props.CategoryID, SortOrder: 0 });
    }, [allWidgets])

    React.useEffect(() => {
        if (status == 'uninitiated' || status == 'changed' || categoryID != props.CategoryID)
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
    <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                        <h4>PQ Browser Widgets:</h4>
                </div>
            </div>
        </div>
        <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
                <Table<IWidgetView>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey == 'Remove')
                            return;

                        dispatch(SEBrowserWidgetViewSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                    OnClick={(item) => setEditRecord(item.row)}
                    TheadStyle={{ fontSize: 'smaller' }}
                    RowStyle={{ fontSize: 'smaller' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <Column<IWidgetView>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </Column>
                    <Column<IWidgetView>
                        Key={'Type'}
                        AllowSort={true}
                        Field={'Type'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Type
                    </Column>
                    <Column<IWidgetView>
                        Key={'SortOrder'}
                        AllowSort={true}
                        Field={'SortOrder'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Sort Order
                    </Column>
                    <Column<IWidgetView>
                        Key={'Remove'}
                        AllowSort={false}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => <>
                            <button className="btn btn-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setRecord(item);
                                    setShowRemove(true);
                                }}>
                                <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                            </button>
                        </>}
                    > <p></p>
                    </Column>
                </Table>
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                    <button className="btn btn-info pull-right" onClick={() => {
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
            DisableConfirm={data.find(d => d.ID == (record?.ID ?? 0)) != null || record?.SortOrder == null || !IsInteger(record.SortOrder)}
            ConfirmShowToolTip={data.find(d => d.ID == (record?.ID ?? 0)) != null}
            ConfirmToolTipContent={<p><ReactIcons.CrossMark Color="var(--danger)" /> This widget is already in this tab.</p>}
            ShowX={true}
            ShowCancel={false}
            ConfirmText={'Save'}
        >
            {record != null ? <>
                <Select<IWidgetView> Record={record} Field={'ID'}
                    Label='Widget'
                    Setter={(record) => setRecord({ ...record, CategoryID: props.CategoryID, ID: parseInt(record.ID.toString()) })}
                    Options={allWidgets.map(o => ({ Value: o.ID.toString(), Label: o.Name }))}
                />
                <Input<IWidgetView>
                    Type={'number'}
                    Record={record}
                    Field={'SortOrder'}
                    Label='Sort Order'
                    Feedback={'Sort Order must be an integer.'}
                    Help={'Controls the order this widget is shown in within this PQ Browser tab. Lower numbers are shown first.'}
                    Valid={() => record.SortOrder != null && IsInteger(record.SortOrder)}
                    Setter={setRecord}
                />
            </> : null}
        </Modal>
        <Modal
            Title={'Edit ' + (editRecord?.Name ?? 'Widget')}
            Show={editRecord != null}
            CallBack={(c) => {
                if (c)
                    dispatch(SEBrowserWidgetViewSlice.DBAction({ verb: 'PATCH', record: editRecord }))
                setEditRecord(null);
            }}
            DisableConfirm={editRecord?.SortOrder == null || !IsInteger(editRecord.SortOrder)}
            ShowX={true}
            ShowCancel={false}
            ConfirmText={'Save'}
        >
            {editRecord != null ?
                <Input<IWidgetView>
                    Type={'number'}
                    Record={editRecord}
                    Field={'SortOrder'}
                    Label='Sort Order'
                    Feedback={'Sort Order must be an integer.'}
                    Help={'Controls the order this widget is shown in within this PQ Browser tab. Lower numbers are shown first.'}
                    Valid={() => editRecord.SortOrder != null && IsInteger(editRecord.SortOrder)}
                    Setter={setEditRecord}
                /> : null}
        </Modal>
    </>
}


export default WidgetByCategory;