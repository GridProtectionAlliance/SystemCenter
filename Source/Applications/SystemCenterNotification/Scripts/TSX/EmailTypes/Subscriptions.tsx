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

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { LoadingScreen } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { EmailType, SubscribeEmails } from '../global';
import { EventSubscriptionSlice } from '../Store';
import { Table, Column } from '@gpa-gemstone/react-table';
import * as $ from 'jquery';
import { Application } from '@gpa-gemstone/application-typings';

declare var homePath;
declare var version;

interface IProps { Record: EmailType}



const Subscriptions = (props: IProps) => {
    const dispatch = useAppDispatch();

    const subscriptions = useAppSelector(EventSubscriptionSlice.Data);
    const status = useAppSelector(EventSubscriptionSlice.Status);
    const parentID = useAppSelector(EventSubscriptionSlice.ParentID);
    const asc = useAppSelector(EventSubscriptionSlice.Ascending);
    const sortKey = useAppSelector(EventSubscriptionSlice.SortField);

    const [approvalStatus, setApprovalStatus] = React.useState<Application.Types.Status>('idle');

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != props.Record.ID)
            dispatch(EventSubscriptionSlice.Fetch(props.Record.ID))
    }, [props.Record, parentID, status])

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
            dispatch(EventSubscriptionSlice.Fetch(props.Record.ID))
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
            dispatch(EventSubscriptionSlice.Fetch(props.Record.ID))
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
                                        SortKey={sortKey.toString()}
                                        Ascending={asc}
                                        OnSort={(d) => {
                                            if (d.colKey === null) return;
                                            dispatch(EventSubscriptionSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
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
                                            HeaderStyle={{ width: props.Record.RequireApproval ? '20%' : '25%' }}
                                            RowStyle={{ width: props.Record.RequireApproval ? '20%' : '25%' }}
                                        > First Name
                                        </Column>
                                        <Column<SubscribeEmails>
                                            Key={'LastName'}
                                            AllowSort={true}
                                            Field={'LastName'}
                                            HeaderStyle={{ width: props.Record.RequireApproval ? '20%' : '25%' }}
                                            RowStyle={{ width: props.Record.RequireApproval ? '20%' : '25%' }}
                                        > Last Name
                                        </Column>
                                        <Column<SubscribeEmails>
                                            Key={'Email'}
                                            AllowSort={true}
                                            Field={'Email'}
                                            HeaderStyle={{ width: props.Record.RequireApproval ? '20%' : '25%' }}
                                            RowStyle={{ width: props.Record.RequireApproval ? '20%' : '25%' }}
                                        > Email
                                        </Column>
                                        <Column<SubscribeEmails>
                                            Key={'AssetGroup'}
                                            AllowSort={true}
                                            Field={'AssetGroup'}
                                            HeaderStyle={{ width: props.Record.RequireApproval ? '20%' : '25%' }}
                                            RowStyle={{ width: props.Record.RequireApproval ? '20%' : '25%' }}
                                        > Assets
                                        </Column>
                                        {props.Record.RequireApproval ?
                                            <Column<SubscribeEmails>
                                                Key={'Approved'}
                                                AllowSort={true}
                                                Field={'Approved'}
                                                HeaderStyle={{ width: '20%' }}
                                                RowStyle={{ width: '20%' }}
                                                Content={({ item }) => item.Approved ? <ReactIcons.CheckMark Color="var(--success)" /> :
                                                    <button type="button" className="btn btn-success btn-sm" onClick={() => approve(item)}>Approve</button> }
                                            > Approved
                                            </Column>
                                        : null }
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Subscriptions;