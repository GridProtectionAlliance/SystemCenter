//******************************************************************************************************
//  Subscriptions.tsx - Gbtc
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
import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { GenericController, LoadingScreen, Search } from '@gpa-gemstone/react-interactive';
import { Column, Table, Paging } from '@gpa-gemstone/react-table';
import { EmailType, SubscribeEmails } from '../global';

declare var homePath;
declare var version;

interface IProps { Record: EmailType}



const Subscriptions = (props: IProps) => {

    const [subscriptions, setSubscriptions] = React.useState<SubscribeEmails[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof SubscribeEmails>('FirstName');
    const [hover, setHover] = React.useState<string>('none');

    const [approvalStatus, setApprovalStatus] = React.useState<Application.Types.Status>('idle');

    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);

    React.useEffect(() => {
        setStatus('loading');
        const filters: Search.IFilter<SubscribeEmails>[] = [{ FieldName: "EmailID", SearchText: props.Record.ID.toString(), Operator: '=', Type: 'string', IsPivotColumn: false }];
        const h = new GenericController<SubscribeEmails>(`${homePath}api/EventSubscription`, 'Email').PagedSearch(filters, sortField, ascending, page);

        h.done((d) => {
            setSubscriptions(JSON.parse(d.Data));
            setTotalPages(d.NumberOfPages);
            setStatus('idle');
        })
        h.fail(() => setStatus('error'))

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }

    }, [props.Record.ID, sortField, ascending, page, refreshTrigger])

    function approve(record: SubscribeEmails) {
        setApprovalStatus('loading')
        $.ajax({
            type: "GET",
            url: `${homePath}api/EventSubscription/approve/${record.ID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).then((d) => {
            setApprovalStatus('idle');
            setRefreshTrigger((val) => !val);
        }, () => { setApprovalStatus('error'); });
    }

    function approveAll() {
        setApprovalStatus('loading')
        const handles = subscriptions.filter(item => !item.Approved).map(record => $.ajax({
            type: "GET",
            url: `${homePath}api/EventSubscription/approve/${record.ID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }));

        Promise.all(handles).then((d) => {
            setApprovalStatus('idle');
            setRefreshTrigger((val) => !val);
        }, () => { setApprovalStatus('error'); });
    }


    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 align-self-center">
                                <h4>Subscriptions:</h4>
                            </div>
                            <div className="col-6 align-self-center">
                                {props.Record.RequireApproval ?
                                    <button className="btn btn-success float-right"
                                        disabled={!subscriptions.some(s => !s.Approved)}
                                        onClick={() => approveAll()}>
                                        Approve All
                                    </button> : null}
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden' }}>
                                    <LoadingScreen Show={status == 'loading' || approvalStatus == 'loading'} />
                                    <Table<SubscribeEmails>
                                        TableClass="table table-hover"
                                        Data={subscriptions}
                                        SortKey={sortField}
                                        Ascending={ascending}
                                        OnSort={(d) => {
                                            if (d.colKey === sortField)
                                                setAscending((val) => !val);
                                            else {
                                                setSortField(d.colKey as keyof SubscribeEmails)
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
                                        KeySelector={(item) => item.ID}
                                    >
                                        <Column<SubscribeEmails>
                                            Key={'FirstName'}
                                            AllowSort={true}
                                            Field={'FirstName'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > First Name
                                        </Column>
                                        <Column<SubscribeEmails>
                                            Key={'LastName'}
                                            AllowSort={true}
                                            Field={'LastName'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Last Name
                                        </Column>
                                        <Column<SubscribeEmails>
                                            Key={'Email'}
                                            AllowSort={true}
                                            Field={'Email'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Email
                                        </Column>
                                        <Column<SubscribeEmails>
                                            Key={'AssetGroup'}
                                            AllowSort={true}
                                            Field={'AssetGroup'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Assets
                                        </Column>
                                        {props.Record.RequireApproval ?
                                            <Column<SubscribeEmails>
                                                Key={'Approved'}
                                                AllowSort={true}
                                                Field={'Approved'}
                                                HeaderStyle={{ width: 'auto' }}
                                                RowStyle={{ width: 'auto' }}
                                                Content={({ item }) => item.Approved ? <ReactIcons.CheckMark Color="var(--success)" /> :
                                                    <button className="btn btn-sm"
                                                        data-tooltip={`${item.ID}_approve`}
                                                        onMouseEnter={() => setHover(`${item.ID}_approve`)}
                                                        onMouseLeave={() => setHover('none')}
                                                        onClick={() => approve(item)}>
                                                        <span><ReactIcons.CrossMark Color="var(--danger)" Size={20} /></span></button>}
                                            > Approved
                                            </Column>
                                        : null }
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
                        </div>
                    </div>
                </div>
            </div>
            <ToolTip Show={hover.match(/_approve$/) != null} Position={'top'} Target={hover}>
                Click to approve this subscription.
            </ToolTip>
        </div>
        )
}

export default Subscriptions;