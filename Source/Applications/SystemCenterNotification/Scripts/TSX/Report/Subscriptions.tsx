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
//  04/10/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { LoadingScreen, Modal, Search, SearchBar, TabSelector, ToolTip, Warning } from '@gpa-gemstone/react-interactive'
import {  HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import {  ScheduledEmailType, SubscribeReports } from '../global';
import { ReportSubscriptionSlice } from '../Store';
import Table, { Column } from '@gpa-gemstone/react-table';
import * as $ from 'jquery';
import { Application } from '@gpa-gemstone/application-typings';

declare var homePath;
declare var version;

interface IProps { Record: ScheduledEmailType }



const Subscriptions = (props: IProps) => {
    const dispatch = useAppDispatch();

    const subscriptions = useAppSelector(ReportSubscriptionSlice.Data);
    const status = useAppSelector(ReportSubscriptionSlice.Status);
    const parentID = useAppSelector(ReportSubscriptionSlice.ParentID);
    const asc = useAppSelector(ReportSubscriptionSlice.Ascending);
    const sortKey = useAppSelector(ReportSubscriptionSlice.SortField);

    const [approvalStatus, setApprovalStatus] = React.useState<Application.Types.Status>('idle');

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != props.Record.ID)
            dispatch(ReportSubscriptionSlice.Fetch(props.Record.ID))
    }, [props.Record, parentID, status])

    function approve(record: SubscribeReports) {
        setApprovalStatus('loading')
        $.ajax({
            type: "GET",
            url: `${homePath}api/ReportSubscription/approve/${record.ID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).then((d) => {
            setApprovalStatus('idle');
            dispatch(ReportSubscriptionSlice.Fetch(props.Record.ID))
        }, () => { setApprovalStatus('error'); });
    }

    function approveAll() {
        setApprovalStatus('loading')
        const handles = subscriptions.filter(item => !item.Approved).map(record => $.ajax({
            type: "GET",
            url: `${homePath}api/ReportSubscription/approve/${record.ID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }));

        Promise.all(handles).then((d) => {
            setApprovalStatus('idle');
            dispatch(ReportSubscriptionSlice.Fetch(props.Record.ID));
        }, () => { setApprovalStatus('error'); });
    }

    const tblColumns: Column<SubscribeReports>[] = [
        { key: 'FirstName', field: 'FirstName', label: 'First Name', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
        { key: 'LastName', field: 'LastName', label: 'Last Name', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
        { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
        { key: 'AssetGroup', field: 'AssetGroup', label: 'Assets', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } }
    ]
    /*if (props.Record)
        tblColumns.push(
            {
                key: 'Approved', field: 'Approved', label: 'Approved', headerStyle: { width: '20%' }, rowStyle: { width: '20%' }, content: (item) => item.Approved ? HeavyCheckMark :
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => approve(item)}>Approve</button>
            });
            */

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Subscriptions:</h4>
                    </div>
                    <div className="col">
                        {/*props.Record.RequireApproval ?
                            <button className="btn btn-danger float-right"
                                disabled={!subscriptions.some(s => !s.Approved)}
                                onClick={() => approveAll()}>
                                Approve All
                            </button> : null*/}
                    </div>
                </div>
            </div>
            <div className="card-body">
                <LoadingScreen Show={status == 'loading' || approvalStatus == 'loading'} />
                <Table<SubscribeReports>
                    cols={tblColumns}
                    tableClass="table table-hover"
                    data={subscriptions}
                    sortKey={sortKey}
                    ascending={asc}
                    onSort={(d) => {
                        if (d.colKey === 'scroll' || d.colKey === 'undefined')
                            return
                        if (d.colField === sortKey)
                            dispatch(ReportSubscriptionSlice.Sort({ SortField: sortKey, Ascending: asc }));
                        else
                            dispatch(ReportSubscriptionSlice.Sort({ SortField: d.colField, Ascending: true }));
                    }}
                    onClick={(item) => { }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={() => false}
                />
            </div>
            <div className="card-footer">
            </div>

        </div>
        )
}

export default Subscriptions;