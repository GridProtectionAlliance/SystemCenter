//******************************************************************************************************
//  ByAllSubscription.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as $ from 'jquery';
import moment from 'moment';
import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { GenericController, LoadingScreen, Search, SearchBar, Warning } from '@gpa-gemstone/react-interactive'
import { Column, Paging, Table } from '@gpa-gemstone/react-table';
import AddAllSubscription from './AddAllSubscription';
import { ActiveSubscription } from '../../global';

declare var homePath;
declare var version;

interface IProps { }

const ByAllSubscription = (props: IProps) => {

    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [data, setData] = React.useState<ActiveSubscription[]>([]);
    const [allData, setAllData] = React.useState<ActiveSubscription[]>([]);
    const [sortField, setSortField] = React.useState<keyof ActiveSubscription>('Category');
    const [asc, setAsc] = React.useState<boolean>(false);
    const [filters, setFilters] = React.useState<Search.IFilter<ActiveSubscription>[]>([]);
    const [searchStatus, setSearchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [showApproveWarning, setShowApproveWarning] = React.useState<boolean>(false);
    const [showRemoveWarning, setShowRemoveWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [nApproval, setNApproval] = React.useState<number>(0);
    const [record, setRecord] = React.useState<ActiveSubscription>();
    const [hover, setHover] = React.useState<string>('none');
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false)

    const activeSubscriptionController = React.useMemo(() => new GenericController<ActiveSubscription>(`${homePath}api/ActiveSubscription`, 'LastSent'),[])

    React.useEffect(() => {
        setStatus('loading');
        const h = activeSubscriptionController.Fetch();

        h.done((d) => {
            setAllData(d);
            setStatus('idle');
        })

        h.fail(() => setStatus('error'))

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [refreshTrigger, activeSubscriptionController.Fetch]);

    React.useEffect(() => {
        setSearchStatus('loading');
        const h = activeSubscriptionController.PagedSearch(filters, sortField, asc, page);

        h.done((d) => {
            setData(JSON.parse(d));
            setTotalPages(d.NumberOfPages);
            setRecordsPerPage(d.RecordsPerPage);
            setTotalRecords(d.TotalRecords);
        })

        h.fail(() => setSearchStatus('error'))

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [filters, sortField, asc, page, refreshTrigger, activeSubscriptionController.PagedSearch]);

    React.useEffect(() => {
        setNApproval(allData.filter(s => !s.Approved).length);
    }, [allData])

    function approve(id: number) {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ActiveSubscription/Approve/${id}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
        }).then((d) => {
            setRefreshTrigger(val => !val)
        }, () => {
            setRefreshTrigger(val => !val)
        });
    }

    function approveAll() {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ActiveSubscription/ApproveAll`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
        }).then((d) => {
            setRefreshTrigger(val => !val)
        }, () => {
            setRefreshTrigger(val => !val)
        });
    }

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
                    <SearchBar<ActiveSubscription> CollumnList={[
                        { key: 'Category', label: 'Category', type: 'string', isPivotField: false },
                        { key: 'EmailName', label: 'Notification', type: 'string', isPivotField: false },
                        { key: 'AssetGroup', label: 'Assets', type: 'string', isPivotField: false },
                        { key: 'LastSent', label: 'Last Sent', type: 'datetime', isPivotField: false },
                        { key: 'FirstName', label: 'First', type: 'string', isPivotField: false },
                        { key: 'LastName', label: 'Last', type: 'string', isPivotField: false },
                        { key: 'Email', label: 'Email', type: 'string', isPivotField: false },
                        { key: 'Approved', label: 'Approved', type: 'boolean', isPivotField: false },
                    ]} SetFilter={setFilters}
                        Direction={'left'} defaultCollumn={{ key: 'EmailName', label: 'Notification', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                        ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : `Displaying Subscription(s) ${totalRecords > 0 ? recordsPerPage * page + 1 : 0}-${recordsPerPage * page + data.length} out of ${totalRecords}`}
                        GetEnum={() => {
                            return () => { }
                        }}
                    >
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <div className="form-group">
                                        <button className="btn btn-info btn-block" onClick={(event) => { event.preventDefault(); setShowModal(true); }}>Add Subscription</button>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-success btn-block" onClick={(event) => { event.preventDefault(); setShowApproveWarning(true) }}>Approve All</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
            </div>
            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<ActiveSubscription>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colKey === sortField)
                                setAsc((val) => !val);
                            else {
                                setSortField(d.colKey as keyof ActiveSubscription)
                            }
                        }}
                        TableStyle={{
                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item, index) => index}
                    >
                        <Column<ActiveSubscription>
                            Key={'Category'}
                            AllowSort={true}
                            Field={'Category'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > Category
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'EmailName'}
                            AllowSort={true}
                            Field={'EmailName'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > Notification
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'AssetGroup'}
                            AllowSort={true}
                            Field={'AssetGroup'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > Assets
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'LastSent'}
                            AllowSort={true}
                            Field={'LastSent'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) => item.LastSent != null && (!item.RequireApproval || item.Approved) ? moment(item.LastSent).format("DD/MM/yy hh:mm") : "N/A"}
                        > Last Sent
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'FirstName'}
                            AllowSort={true}
                            Field={'FirstName'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > First
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'LastName'}
                            AllowSort={true}
                            Field={'LastName'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > Last
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'Email'}
                            AllowSort={true}
                            Field={'Email'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > Email
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'Approved'}
                            AllowSort={true}
                            Field={'Approved'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) => item.RequireApproval ? (item.Approved ? <ReactIcons.CheckMark Color="var(--success)" /> :
                                <button className="btn btn-sm"
                                    data-tooltip={`${item.ID}_approve`}
                                    onMouseEnter={() => setHover(`${item.ID}_approve`)}
                                    onMouseLeave={() => setHover('none')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        approve(item.UserAccountEmailID);
                                    }}><span><ReactIcons.CrossMark Color="var(--danger)" Size={20} /></span></button>) : 'N/A'
                            }
                        > Approved
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'Remove'}
                            AllowSort={true}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) =>
                                <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    setRecord(item);
                                    setShowRemoveWarning(true);
                                }}><span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span></button>
                            }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Paging
                        Current={page + 1}
                        SetPage={(page) => setPage(page - 1)}
                        Total={totalPages}
                    />
                </div>
            </div>
            <Warning Show={showApproveWarning} Title={'Approve Subscriptions'} Message={`This will approve all ${nApproval} subscriptions that are currently pending.`}
                CallBack={(c) => { setShowApproveWarning(false); if (c) approveAll(); }} />
            <Warning Show={showRemoveWarning} Title={'Remove Subscription'} Message={`Are you sure you want to remove this subscription?`}
                CallBack={(c) => { setShowRemoveWarning(false); if (c) activeSubscriptionController.DBAction('DELETE', record).then(() => setRefreshTrigger(val => !val)); }} />
            <AddAllSubscription OnClose={() => { setShowModal(false); setRefreshTrigger((val) => !val) }} show={showModal} />
            <ToolTip Show={hover.match(/_approve$/) != null} Position={'top'} Target={hover}>
                Click to approve this subscription.
            </ToolTip>
        </div>)
}

export default ByAllSubscription;