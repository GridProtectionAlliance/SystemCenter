//******************************************************************************************************
//  ExternalDBXdaFields.tsx - Gbtc
//
//  Copyright � 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  10/23/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { ExternalXDAFieldsSlice } from '../../Store/Store';
import ExternalDBXdaFieldsForm from './ExternalDBXdaFieldsForm';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Table, Column } from '@gpa-gemstone/react-table';
import { CrossMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Modal, Warning } from '@gpa-gemstone/react-interactive';

const emptyRecord: SystemCenter.Types.ExternalOpenXDAField = {
    ID: -1,
    ParentTable: 'Meter',
    FieldName: 'Name',
    ExternalDBTableID: -1
};

export default function ExternalDBXdaFields(props: { ID: number }) {
    const dispatch = useAppDispatch();

    const data = useAppSelector(ExternalXDAFieldsSlice.Data);
    const sortKey = useAppSelector(ExternalXDAFieldsSlice.SortField);
    const asc = useAppSelector(ExternalXDAFieldsSlice.Ascending);
    const status = useAppSelector(ExternalXDAFieldsSlice.Status);
    const parentID = useAppSelector(ExternalXDAFieldsSlice.ParentID);

    const [record, setRecord] = React.useState<SystemCenter.Types.ExternalOpenXDAField>(emptyRecord);
    const [showRemove, setShowRemove] = React.useState<boolean>(false);
    const [showEdit, setShowEdit] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID !== props.ID)
            dispatch(ExternalXDAFieldsSlice.Fetch(props.ID));
    }, [status, parentID, props.ID]);

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>External XDA Fields:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <Table<SystemCenter.Types.ExternalOpenXDAField>
                                        TableClass="table table-hover"
                                        Data={data}
                                        SortKey={sortKey}
                                        Ascending={asc}
                                        OnSort={(d) => {
                                            if (d.colKey == 'btns') return;
                                            dispatch(ExternalXDAFieldsSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                                        }}
                                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        Selected={(item) => false}
                                        KeySelector={(item) => item.ID}
                                    >
                                        <Column<SystemCenter.Types.ExternalOpenXDAField>
                                            Key={'FieldName'}
                                            AllowSort={true}
                                            Field={'FieldName'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Name
                                        </Column>
                                        <Column<SystemCenter.Types.ExternalOpenXDAField>
                                            Key={'ParentTable'}
                                            AllowSort={true}
                                            Field={'ParentTable'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Parent Type
                                        </Column>
                                        <Column<SystemCenter.Types.ExternalOpenXDAField>
                                            Key={'btns'}
                                            AllowSort={false}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                            Content={({ item }) => <>
                                                <button className="btn btn-sm" onClick={(e) => {
                                                    e.preventDefault();
                                                    setRecord(item);
                                                    setShowEdit(true);
                                                }}>{Pencil}</button>
                                                <button className="btn btn-sm" onClick={(e) => {
                                                    e.preventDefault();
                                                    setRecord(item);
                                                    setShowRemove(true);
                                                }}>{TrashCan}</button>
                                            </>}
                                        > <p></p>
                                        </Column>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className="btn btn-info"
                                onClick={() => { setRecord({ ...emptyRecord, ExternalDBTableID: props.ID }); setShowEdit(true); }}
                            >Link New Field</button>
                        </div>
                    </div>
                    <Warning
                        Message={'This will permanently delete this Linked Field and cannot be undone.'}
                        Show={showRemove} Title={`Delete ${record.ParentTable}: ${record.FieldName} Linked Field`}
                        CallBack={(conf) => {
                            if (conf) {
                                dispatch(ExternalXDAFieldsSlice.DBAction({ verb: 'DELETE', record: { ...record } }));
                                setRecord(emptyRecord);
                            }
                            setShowRemove(false);
                        }}
                    />
                    <Modal Title={record.ID === -1 ? 'Link New Field' : 'Edit ' + (record?.FieldName ?? 'Field')} Show={showEdit} ShowCancel={true} ConfirmText={record.ID === -1 ? 'Link' : 'Save'}
                        ConfirmShowToolTip={errors.length > 0} DisableConfirm={errors.length > 0} ShowX={true}
                        ConfirmToolTipContent={
                            <>
                                { errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>) }
                            </>
                        }
                        CallBack={(conf) => {
                            setShowEdit(false);
                            if (conf) dispatch(ExternalXDAFieldsSlice.DBAction({ verb: (record.ID > 0 ? 'PATCH' : 'POST'), record }));
                        }}
                    >
                        <ExternalDBXdaFieldsForm Record={record} Setter={setRecord} SetErrors={setErrors} />
                    </Modal>
                </div>
            </div>
        </div>


    );

}