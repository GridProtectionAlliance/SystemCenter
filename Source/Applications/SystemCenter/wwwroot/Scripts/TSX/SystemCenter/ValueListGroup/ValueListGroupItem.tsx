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
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import ValueListForm from './ValueListForm';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Modal, Search, GenericController } from '@gpa-gemstone/react-interactive';
import { ValueListItemDelete, RequiredValueLists } from './ValueListGroupDelete';
import { ToolTip } from '@gpa-gemstone/react-forms';

interface IProps {
    Record: SystemCenter.Types.ValueListGroup
}

const ValueListItemController = new GenericController<SystemCenter.Types.ValueListItem>(`${homePath}api/ValueList`, 'SortOrder');

export default function ValueListGroupItems(props: IProps) {

    const [data, setData] = React.useState<SystemCenter.Types.ValueListItem[]>([]);
    const [sortKey, setSortKey] = React.useState<keyof SystemCenter.Types.ValueListItem>('Value');
    const [asc, setAsc] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);

    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);

    const emptyRecord: SystemCenter.Types.ValueListItem = { ID: 0, GroupID: props.Record.ID as number, Value: '', AltValue: null, SortOrder: 0 };
    const [record, setRecord] = React.useState<SystemCenter.Types.ValueListItem>(emptyRecord);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [countDictionary, setCountDictionary] = React.useState<{ [key: string]: number }>({});
    const [hover, setHover] = React.useState<string>('');

    const controller = React.useMemo(() => new GenericController<SystemCenter.Types.ValueListItem>(`${homePath}api/ValueList`, 'SortOrder'), []);

    const disallowReason = React.useCallback((ID: string) => {
        if (!RequiredValueLists.includes(props.Record?.Name))
            return null;
        if (data.length == 1)
            return 'This Value List Group is required and must contain at least 1 item.';
        if ((countDictionary?.[ID] ?? 0) !== 0)
            return 'This Value List Group is required and this Value List Item is still in use. Use of this Value List Item must be removed before it can be deleted.';

        return null;
    }, [props.Record?.Name, data.length, countDictionary]);

    React.useEffect(() => {
        setStatus('loading')
        const filters = [{ FieldName: "GroupID", SearchText: props.Record.ID.toString(), Operator: "=" as Search.OperatorType, IsPivotColumn: false, Type: "number" as Search.FieldType }]
        const h = ValueListItemController.PagedSearch(filters, sortKey, asc, page)
        h.done((d) => {
            setData(JSON.parse(d.Data as unknown as string))
            setTotalPages(d.NumberOfPages)
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
            setStatus('idle')
        }).fail((d) => {
            setStatus('error')
        })
        return () => {
            if (h.abort != undefined) h.abort();
        }
    }, [sortKey, asc, page, props.Record, refreshTrigger]);

    React.useEffect(() => {
        if (props.Record?.Name == null) return;

        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Count/${props.Record.Name}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        h.then(setCountDictionary);

        return () => { if (h?.abort != null) h.abort(); }
    }, [props.Record?.Name]);

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>List Items:</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p style={{ marginTop: 2, marginBottom: 2 }}>
                            {status === 'error' ? 'Could not complete Search' :
                                status === 'loading' ? 'Loading...' :
                                    `Displaying Item(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + data.length} out of ${totalRecords}`}
                        </p>
                    </div>
                </div>
            </div>
            <div className="card-body d-flex flex-column" style={{ flex: '1 1 0%', overflow: 'hidden' }}>
                <div className="row d-flex flex-column" style={{ flex: '1 1 0%', overflow: 'hidden' }}>
                    <div className="col d-flex flex-column" style={{ overflow: 'hidden' }}>
                        <Table<SystemCenter.Types.ValueListItem>
                            TableClass="table table-hover"
                            Data={data}
                            SortKey={sortKey}
                            Ascending={asc}
                            OnSort={(d) => {
                                if (d.colField === sortKey)
                                    setAsc(!asc);
                                else {
                                    setAsc(true);
                                    setSortKey(d.colField);
                                }
                            }}
                            TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1, width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<SystemCenter.Types.ValueListItem>
                                Key={'Value'}
                                AllowSort={true}
                                Field={'Value'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Value
                            </Column>
                            <Column<SystemCenter.Types.ValueListItem>
                                Key={'AltValue'}
                                AllowSort={true}
                                Field={'AltValue'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Label
                            </Column>
                            <Column<SystemCenter.Types.ValueListItem>
                                Key={'SortOrder'}
                                AllowSort={true}
                                Field={'SortOrder'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Sort Order
                            </Column>
                            <Column<SystemCenter.Types.ValueListItem>
                                Key={'btns'}
                                AllowSort={false}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item }) => {
                                    const id = item.ID.toString();
                                    const isDisallowed = disallowReason(id) != null;
                                    return (
                                        <>
                                            <button
                                                className="btn btn-sm"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setRecord(item);
                                                    setShowModal(true);
                                                }}
                                            >
                                                <ReactIcons.Pencil Color="var(--warning)" Size={20} />
                                            </button>
                                            <button
                                                className={`btn btn-sm${isDisallowed ? " disabled" : ""}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (isDisallowed) return;
                                                    setRecord(item);
                                                    setShowWarning(true);
                                                }}
                                                onMouseEnter={() => { if (isDisallowed) setHover(id); }}
                                                onMouseLeave={() => setHover('')}
                                                data-tooltip={id}
                                            >
                                                <ReactIcons.TrashCan Color="var(--danger)" Size={20} />
                                            </button>
                                        </>
                                    );
                                }}
                            > <p></p>
                            </Column>
                        </Table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Paging
                            Current={page + 1}
                            Total={totalPages}
                            SetPage={(p) => setPage(p - 1)}
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-info pull-right"
                        onClick={() => { setRecord({ ...emptyRecord, GroupID: props.Record.ID }); setShowModal(true); }}
                    >Add Item</button>
                </div>
            </div>
            <ValueListItemDelete
                Show={showWarning}
                CallBack={(conf) => {
                    if (conf)
                        ValueListItemController.DBAction('DELETE', { ...record }).then(() => setRefreshTrigger(val => !val));
                    setShowWarning(false);
                }}
                Record={record}
                GroupItemCount={data.length}
                AssignedDictionary={countDictionary}
                Group={props.Record}
            />
            <ToolTip Show={hover !== ''} Position={'bottom'} Target={hover}>
                {disallowReason(hover)}
            </ToolTip>
            <Modal Title={record.ID == 0 ? 'Add New Value List Item' : 'Edit ' + (record.AltValue ?? record.Value)} Show={showModal} ShowCancel={false} ConfirmText={'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {e}</p>)}
                DisableConfirm={errors.length > 0}
                ShowX={true} CallBack={(conf) => {
                    setShowModal(false);
                    if (conf && record.ID > 0)
                        ValueListItemController.DBAction('PATCH', record).then(() => setRefreshTrigger(val => !val));
                    else if (conf && record.ID == 0)
                        ValueListItemController.DBAction('POST', record).then(() => setRefreshTrigger(val => !val));
                }}
            >
                <ValueListForm Record={record} Setter={setRecord} SetErrors={setErrors} />
            </Modal>
        </div>


    );

}

