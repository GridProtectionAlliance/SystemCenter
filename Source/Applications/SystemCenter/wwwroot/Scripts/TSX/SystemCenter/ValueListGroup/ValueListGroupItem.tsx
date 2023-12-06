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
import Table from '@gpa-gemstone/react-table';
import { CrossMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Modal, Warning } from '@gpa-gemstone/react-interactive';

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
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>List Items:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div style={{ width: '100%', height: window.innerHeight - 421, maxHeight: window.innerHeight - 421, padding: 0, overflowY: 'auto' }}>
                        <Table<SystemCenter.Types.ValueListItem>
                            cols={[
                                { key: 'Value', field: 'Value', label: 'Value', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'AltValue', field: 'AltValue', label: 'Label', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'SortOrder', field: 'SortOrder', label: 'Sort Order', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                {
                                    key: 'btns', field: 'ID', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => <>
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
                                    </>
                                },
                                { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                            ]}
                            tableClass="table table-hover"
                            data={data}
                            sortKey={sortKey}
                            ascending={asc}
                            onSort={(d) => {
                                if (d.colKey == 'btns' || d.colKey == 'scroll')
                                    return;
                                if (d.colKey === sortKey)
                                    dispatch(ValueListSlice.Sort({ SortField: d.colField, Ascending: !asc }));
                                else
                                    dispatch(ValueListSlice.Sort({ SortField: d.colField, Ascending: true }));
                            }}
                            onClick={() => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
                            rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={() => false}
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right"
                        onClick={() => { setRecord({ ...emptyRecord, GroupID: props.Record.ID }); setShowModal(true); }}
                    >Add Item</button>
                </div>
            </div>
            <Warning
                Message={'This will permanently delete this Value List Item and cannot be undone.'}
                Show={showWarning} Title={'Delete ' + (record.AltValue ?? record.Value)}
                CallBack={(conf) => { if (conf) Delete(); setShowWarning(false); }} />
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

