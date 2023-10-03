//******************************************************************************************************
//  ExternalDBTables.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
import { useHistory } from "react-router-dom";
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ExternalDBTablesSlice } from '../Store/Store';
import ExternalDBTableForm from './ExternalDBTableForm';
import Table from '@gpa-gemstone/react-table';
import { CrossMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Modal, Warning } from '@gpa-gemstone/react-interactive';

export default function ExternalDBTables(props: { ID: number }) {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const data = useAppSelector(ExternalDBTablesSlice.Data);
    const sortKey = useAppSelector(ExternalDBTablesSlice.SortField);
    const asc = useAppSelector(ExternalDBTablesSlice.Ascending);
    const status = useAppSelector(ExternalDBTablesSlice.Status);
    const parentID = useAppSelector(ExternalDBTablesSlice.ParentID);

    const emptyRecord: SystemCenter.Types.ExternalDataBaseTable = { ID: 0, TableName: '', ExtDBID: 0, Query: '' };
    const [record, setRecord] = React.useState<SystemCenter.Types.ExternalDataBaseTable>(emptyRecord);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != props.ID)
            dispatch(ExternalDBTablesSlice.Fetch(props.ID));
    }, [status, parentID, props.ID]);

    React.useEffect(() => {
        let e = [];
        if (record.TableName == null || record.TableName.length == 0) {
            e.push('A Table Name is required.');
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
        if (item.colKey == 'btns') return;
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=ExternalDBTable&ID=' + item.row.ID })
    }

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Tables:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div style={{ width: '100%', height: window.innerHeight - 421, maxHeight: window.innerHeight - 421, padding: 0, overflowY: 'auto' }}>
                        <Table<SystemCenter.Types.ExternalDataBaseTable>
                            cols={[
                                { key: 'TableName', field: 'TableName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
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
                                if (d.colKey == 'btns' || d.colKey == 'scroll' || d.colField == null) return;
                                dispatch(ExternalDBTablesSlice.Sort({ SortField: d.colField, Ascending: !asc }));
                            }}
                            onClick={handleSelect}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', maxHeight: window.innerHeight - 455, }}
                            rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={() => false}
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right"
                        onClick={() => { setRecord({ ...emptyRecord, ExtDBID: props.ID }); setShowModal(true); }}
                    >Add Table</button>
                </div>
            </div>
            <Warning
                Message={'This will permanently delete this External DB Table and cannot be undone.'}
                Show={showWarning} Title={'Delete ' + (record?.TableName ?? 'External DB Table')}
                CallBack={(conf) => { if (conf) Delete(); setShowWarning(false); }} />
            <Modal Title={record.ID == 0 ? 'Add New Table' : 'Edit ' + (record?.TableName ?? 'Table')} Show={showModal} ShowCancel={false} ConfirmText={record.ID == 0 ? 'Add' : 'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
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


    );

}