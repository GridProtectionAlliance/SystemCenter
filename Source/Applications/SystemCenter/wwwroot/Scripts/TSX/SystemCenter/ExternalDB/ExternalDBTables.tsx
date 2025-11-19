//******************************************************************************************************
//  ExternalDBTables.tsx - Gbtc
//
//  Copyright � 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  10/12/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ExternalDBTablesSlice } from '../Store/Store';
import ExternalDBTableForm from './ExternalDBTableForm';
import { Table, Column } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Modal, Warning } from '@gpa-gemstone/react-interactive';

export default function ExternalDBTables(props: { ID: number }) {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const data = useAppSelector(ExternalDBTablesSlice.Data);
    const sortKey = useAppSelector(ExternalDBTablesSlice.SortField);
    const asc = useAppSelector(ExternalDBTablesSlice.Ascending);
    const status = useAppSelector(ExternalDBTablesSlice.Status);
    const parentID = useAppSelector(ExternalDBTablesSlice.ParentID);

    const emptyRecord: SystemCenter.Types.extDBTables = { ID: 0, TableName: '', ExtDBID: 0, Query: '' };
    const [record, setRecord] = React.useState<SystemCenter.Types.extDBTables>(emptyRecord);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'uninitiated' || status == 'changed' || parentID != props.ID)
            dispatch(ExternalDBTablesSlice.Fetch(props.ID));
    }, [status, parentID, props.ID]);

    React.useEffect(() => {
        let e = [];
        if (record.TableName == null || record.TableName.length == 0) {
            e.push('A Name is required.');
        }
        if (record.Query == null || record.Query.length == 0) {
            e.push('A Query is required.')
        }

        setErrors(e);
    }, [record]);

    function Delete() {
        dispatch(ExternalDBTablesSlice.DBAction({ verb: 'DELETE', record: { ...record } }));
        setShowWarning(false);
        setRecord(emptyRecord);
    }

    function handleSelect(item) {
            navigate(`${homePath}index.cshtml?name=ExternalTable&ID=${item.row.ID}`);
    }

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Tables:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <Table<SystemCenter.Types.DetailedExtDBTables>
                                        TableClass="table table-hover"
                                        Data={data}
                                        SortKey={sortKey.toString()}
                                        Ascending={asc}
                                        OnSort={(d) => {
                                            if (d.colKey == 'btns') return;
                                            dispatch(ExternalDBTablesSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                                        }}
                                        OnClick={handleSelect}
                                        TableStyle={{ padding: 0, width: '100%', height: '100%', tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        Selected={(item) => false}
                                        KeySelector={(item) => item.ID}
                                    >
                                        <Column<SystemCenter.Types.DetailedExtDBTables>
                                            Key={'TableName'}
                                            AllowSort={true}
                                            Field={'TableName'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Name
                                        </Column>
                                        <Column<SystemCenter.Types.DetailedExtDBTables>
                                            Key={'MappedFields'}
                                            AllowSort={true}
                                            Field={'MappedFields'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Mapped Fields
                                        </Column>
                                        <Column<SystemCenter.Types.DetailedExtDBTables>
                                            Key={'btns'}
                                            AllowSort={false}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                            Content={({ item }) => <>
                                                <button className="btn btn-sm" onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setRecord(item);
                                                    setShowWarning(true);
                                                }}><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></button>
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
                            <button className="btn btn-info pull-right"
                                onClick={() => { setRecord({ ...emptyRecord, ExtDBID: props.ID }); setShowModal(true); }}
                            >Add Table</button>
                        </div>
                    </div>
                    <Warning
                        Message={'This will permanently delete this External Database Table and ALL associated Fields. This cannot be undone.'}
                        Show={showWarning} Title={'Delete ' + (record?.TableName ?? 'External DB Table')}
                        CallBack={(conf) => { if (conf) Delete(); setShowWarning(false); }} />
                    <Modal Title={record.ID == 0 ? 'Add New Table' : 'Edit ' + (record?.TableName ?? 'Table')} Show={showModal} ShowCancel={false} ConfirmText={'Save'}
                        ConfirmShowToolTip={errors.length > 0}
                        ConfirmToolTipContent={errors.map((e, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" />{e}</p>)}
                        DisableConfirm={errors.length > 0}
                        ShowX={true} CallBack={(conf) => {
                            setShowModal(false);
                            if (conf && record.ID > 0)
                                dispatch(ExternalDBTablesSlice.DBAction({ verb: 'PATCH', record }));
                            else if (conf && record.ID == 0)
                                dispatch(ExternalDBTablesSlice.DBAction({ verb: 'POST', record }));
                        }}
                    >
                        <ExternalDBTableForm Record={record} Setter={setRecord} SetErrors={setErrors} />
                    </Modal>
                </div>
            </div>
        </div>


    );

}