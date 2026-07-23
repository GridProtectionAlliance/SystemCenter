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
import { useNavigate } from "react-router-dom";
import * as _ from 'lodash';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { GenericController, Modal, Search, Warning } from '@gpa-gemstone/react-interactive';
import { Column, Paging, Table } from '@gpa-gemstone/react-table';
import ExternalDBTableForm from './ExternalDBTableForm';

const emptyRecord: SystemCenter.Types.extDBTables = { ID: 0, TableName: '', ExtDBID: 0, Query: '' };

interface IProps {
    ID: number
}

const ExternalDBTables = (props: IProps) => {
    let navigate = useNavigate();

    // extDBTable table
    const [extDBTables, setExtDBTables] = React.useState<SystemCenter.Types.DetailedExtDBTables[]>([]);
    const [extDBTablesStatus, setExtDBTablesStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.DetailedExtDBTables>('ID');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);

    // extDBTable pagination
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);

    const [record, setRecord] = React.useState<SystemCenter.Types.extDBTables>(emptyRecord);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    // db action statuses
    const [deleteStatus, setDeleteStatus] = React.useState<Application.Types.Status>('idle');
    const [createStatus, setCreateStatus] = React.useState<Application.Types.Status>('idle');
    const [editStatus, setEditStatus] = React.useState<Application.Types.Status>('idle');

    const filters: Search.IFilter<SystemCenter.Types.extDBTables>[] = React.useMemo(() => [{ SearchText: props.ID.toString(), FieldName: 'ExtDBID', Operator: "=", IsPivotColumn: false, Type: 'string' }], [props.ID])
    const externalDBTableController = React.useMemo(() => new GenericController<SystemCenter.Types.DetailedExtDBTables>(`${homePath}api/SystemCenter/extDBTables`, "TableName", true),[])


    // fetch data for External DB Tables table, filtered, sorted, and paged.
    React.useEffect(() => {
        setExtDBTablesStatus('loading');
        const handle = externalDBTableController.PagedSearch(filters, sortField, ascending, page);

        handle.done((d) => {
            setExtDBTables(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
            setExtDBTablesStatus('idle');
        })

        handle.fail(() => setExtDBTablesStatus('error'));

        return () => {
            if (handle != null && handle.abort != null)
                handle.abort()
        }
    }, [filters, sortField, ascending, page, refreshTrigger]);

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

    async function Delete() {
        setDeleteStatus('loading');
        externalDBTableController.DBAction('DELETE', record).done(() => {
            setDeleteStatus('idle');
            setRefreshTrigger(val => !val);
        }).fail(() => setDeleteStatus('error'));
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
                        <div className="row">
                            <div className="col">
                                <p style={{ marginTop: 2, marginBottom: 2 }}>
                                    {extDBTablesStatus === 'error' ? 'Could not complete Search' :
                                        extDBTablesStatus === 'loading' ? 'Loading...' :
                                            `Displaying External DB Table(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + extDBTables.length} out of ${totalRecords}`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <Table<SystemCenter.Types.DetailedExtDBTables>
                                        TableClass="table table-hover"
                                        Data={extDBTables}
                                        SortKey={sortField}
                                        Ascending={ascending}
                                        OnSort={(d) => {
                                            if (d.colKey == sortField) {
                                                setAscending(a => !a);
                                            }
                                            else {
                                                setSortField(d.colKey as keyof SystemCenter.Types.DetailedExtDBTables);
                                            }
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
                            <div className="row">
                                <div className="col">
                                    <Paging
                                        SetPage={(page) => setPage(page - 1)}
                                        Current={page + 1}
                                        Total={totalPages}
                                    />
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
                                externalDBTableController.DBAction('PATCH', record).done(() => { setEditStatus('idle'); setRefreshTrigger(val => !val); }).fail(() => setEditStatus('error'));
                            else if (conf && record.ID == 0)
                                externalDBTableController.DBAction('POST', record).done(() => { setCreateStatus('idle'); setRefreshTrigger(val => !val); }).fail(() => setCreateStatus('error'));
                        }}
                    >
                        <ExternalDBTableForm Record={record} Setter={setRecord} SetErrors={setErrors} />
                    </Modal>
                </div>
            </div>
        </div>


    );

}

export default ExternalDBTables;