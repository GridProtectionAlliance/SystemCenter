//******************************************************************************************************
//  CompanyMeter.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with  work for additional information regarding copyright ownership.
//  The GPA licenses  file to you under the MIT License (MIT), the "License"; you may not use 
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
import { SystemCenter } from '@gpa-gemstone/application-typings';

import { useAppSelector, useAppDispatch } from '../hooks';
import { ValueListSlice } from '../Store/Store';
import ValueListForm from './ValueListForm';
import { ReactTable } from '@gpa-gemstone/react-table';
import { CrossMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Modal, Warning } from '@gpa-gemstone/react-interactive';
import { ValueListItemDelete } from './ValueListGroupDelete';

interface IProps { Record: SystemCenter.Types.ValueListGroup }
export default function ValueListGroupItems(props: IProps) {
    const dispatch = useAppDispatch();

    const data = useAppSelector(ValueListSlice.Data);
    const sortKey = useAppSelector(ValueListSlice.SortField);
    const asc = useAppSelector(ValueListSlice.Ascending);
    const status = useAppSelector(ValueListSlice.Status);
    const parentID= useAppSelector(ValueListSlice.ParentID);

    const emptyRecord: SystemCenter.Types.ValueListItem = { ID: 0, GroupID: parentID as number, Value: '', AltValue: null, SortOrder: 0 };
    const [record, setRecord] = React.useState<SystemCenter.Types.ValueListItem>(emptyRecord);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != props.Record.ID)
            dispatch(ValueListSlice.Fetch(props.Record.ID));
    }, [status, parentID, props.Record.ID]);

    function Delete() {
        dispatch(ValueListSlice.DBAction({ verb: 'DELETE', record: { ...record } }));
        setShowWarning(false);
        setRecord(emptyRecord);
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>List Items:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
                    <ReactTable.Table<SystemCenter.Types.ValueListItem>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortKey}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colKey == 'btns')
                                return;
                            dispatch(ValueListSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<SystemCenter.Types.ValueListItem>
                            Key={'Value'}
                            AllowSort={true}
                            Field={'Value'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Value
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.ValueListItem>
                            Key={'AltValue'}
                            AllowSort={true}
                            Field={'AltValue'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Label
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.ValueListItem>
                            Key={'SortOrder'}
                            AllowSort={true}
                            Field={'SortOrder'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Sort Order
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.ValueListItem>
                            Key={'btns'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => <>
                                <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    setRecord(item);
                                    setShowModal(true);
                                }}>{Pencil}</button>
                                <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    setRecord(item);
                                    setShowWarning(true)
                                }}>{TrashCan}</button>
                            </> }
                        > <p></p>
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right"
                        onClick={() => { setRecord({ ...emptyRecord, GroupID: props.Record.ID }); setShowModal(true); }}
                    >Add Item</button>
                </div>
            </div>
            <ValueListItemDelete
                Show={showWarning}
                CallBack={(conf) => { if (conf) Delete(); setShowWarning(false); }}
                Record={record}
                ItemCount={data.length}
                Group={props.Record}
                />
            <Modal Title={record.ID == 0 ? 'Add New Value List Item' : 'Edit ' + (record.AltValue ?? record.Value)} Show={showModal} ShowCancel={false} ConfirmText={record.ID == 0 ? 'Add' : 'Save'}
                ConfirmShowToolTip={errors.length > 0}
                CancelToolTipContent={<> {errors.map(e => <p>{CrossMark} {e}</p>)}</>}
                DisableConfirm={errors.length > 0}
                ShowX={true} CallBack={(conf) => {
                    setShowModal(false);
                    if (conf && record.ID > 0)
                        dispatch(ValueListSlice.DBAction({ verb: 'PATCH', record }));
                    else if (conf && record.ID == 0)
                        dispatch(ValueListSlice.DBAction({ verb: 'POST', record }));
                }}
            >
                <ValueListForm Record={record} Setter={setRecord} SetErrors={setErrors} />
            </Modal>
            </div>
        

    );

}

