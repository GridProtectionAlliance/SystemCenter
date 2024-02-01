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

import { useAppDispatch, useAppSelector } from '../../hooks';
import * as React from 'react';
import { LoadingScreen, SearchBar, Warning } from '@gpa-gemstone/react-interactive'
import { CrossMark, HeavyCheckMark, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import Table from '@gpa-gemstone/react-table';
import { ActiveSubscriptionSlice } from '../../Store';
import { ActiveSubscription } from '../../global';
import moment from 'moment';
import * as $ from 'jquery';
import AddAllSubscription from './AddAllSubscription';

declare var homePath;
declare var version;

interface IProps {}

const ByAllSubscription = (props: IProps) => {
    const dispatch = useAppDispatch();

    const status: Application.Types.Status = useAppSelector(ActiveSubscriptionSlice.Status);
    const data: ActiveSubscription[] = useAppSelector(ActiveSubscriptionSlice.SearchResults);
    const allData: ActiveSubscription[] = useAppSelector(ActiveSubscriptionSlice.Data);
    const parentID = useAppSelector(ActiveSubscriptionSlice.ParentID);
    const sortField = useAppSelector(ActiveSubscriptionSlice.SortField);
    const asc = useAppSelector(ActiveSubscriptionSlice.Ascending);
    const filter = useAppSelector(ActiveSubscriptionSlice.SearchFilters);
    const searchStatus = useAppSelector(ActiveSubscriptionSlice.SearchStatus);
    const [showApproveWarning, setShowApproveWarning] = React.useState<boolean>(false);
    const [showRemoveWarning, setShowRemoveWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [force, setForce] = React.useState<number>(0);
    const [nApproval, setNApproval] = React.useState<number>(0);
    const [record, setRecord] = React.useState<ActiveSubscription>();

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != null)
            dispatch(ActiveSubscriptionSlice.Fetch());
    }, [status, parentID]);

    React.useEffect(() => {
        if (searchStatus === 'unintiated' || status === 'changed')
            dispatch(ActiveSubscriptionSlice.DBSearch({ filter, sortField, ascending: asc }));
    }, [searchStatus]);

    React.useEffect(() => {
        if (force < 1)
            return;
        dispatch(ActiveSubscriptionSlice.DBSearch({ filter, sortField, ascending: asc }));
        dispatch(ActiveSubscriptionSlice.Fetch());

    }, [force])

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
            setForce((x) => x + 1)
        }, () => {
            setForce((x) => x + 1)
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
            setForce((x) => x+1)
        }, () => {
            setForce((x) => x + 1)
        });
    }

    const removeSubscription = () => {
        dispatch(ActiveSubscriptionSlice.DBAction({ verb: 'DELETE', record }));
    };

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<ActiveSubscription> CollumnList={[
                    { key: 'EmailName', label: 'Notification', type: 'string', isPivotField: false},
                    { key: 'AssetGroup', label: 'Assets', type: 'string', isPivotField: false },
                    { key: 'UserName', label: 'User', type: 'string', isPivotField: false },
                    { key: 'Email', label: 'Email', type: 'string', isPivotField: false },
                    { key: 'Approved', label: 'Approved', type: 'boolean', isPivotField: false },
                    { key: 'LastSent', label: 'Last Sent', type: 'datetime', isPivotField: false },
                    { key: 'Category', label: 'Category', type: 'string', isPivotField: false },
                ]} SetFilter={(flds) => dispatch(ActiveSubscriptionSlice.DBSearch({ filter: flds, sortField, ascending: asc }))}
                    Direction={'left'} defaultCollumn={{ key: 'EmailName', label: 'Notification', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Subscriptions'}
                    GetEnum={() => {
                        return () => { }
                    }}
                >
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); setShowModal(true); }}>New Subscription</button>
                                <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); setShowApproveWarning(true) }}>Approve All</button>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<ActiveSubscription>
                        cols={[
                            { key: 'Category', field: 'Category', label: 'Category', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            { key: 'EmailName', field: 'EmailName', label: 'Notification', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            { key: 'AssetGroup', field: 'AssetGroup', label: 'Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'LastSent', field: 'LastSent', label: 'Last Sent', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => (item.Approved && item.LastSent != null) ? moment(item.LastSent).format("dd/MM/yy hh:mm") : "N/A" },
                            { key: 'UserName', field: 'UserName', label: 'User', headerStyle: { width: '20%', padding: 0 }, rowStyle: { width: '20%' } },
                            { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: '20%', padding: 0 }, rowStyle: { width: '20%' } },
                            {
                                key: 'Approved', field: 'Approved', label: 'Approved', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => item.Approved ? HeavyCheckMark : <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    approve(item.UserAccountEmailID);
                                }}><span>{CrossMark}</span></button>
                            },
                            {
                                key: 'Remove', label: 'Remove', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) =>
                                    <button className="btn btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        setRecord(item);
                                        setShowRemoveWarning(true);
                                }}><span>{TrashCan}</span></button>
                            },
                            { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortKey={sortField}
                        ascending={asc}
                        onSort={(d) => {
                            if (d.colKey === 'scroll' || d.colKey === 'undefined')
                                return
                            if (d.colField === sortField)
                                dispatch(ActiveSubscriptionSlice.Sort({ SortField: sortField, Ascending: asc }));
                            else
                                dispatch(ActiveSubscriptionSlice.Sort({ SortField: d.colField, Ascending: true }));
                        }}
                        onClick={(item) => { }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={() => false}
                    />
                </div>
            </div>
            <Warning Show={showApproveWarning} Title={'Approve Notification Subscriptions'} Message={`This will approve all ${nApproval} Subscriptions that are currently pending.`}
                CallBack={(c) => { setShowApproveWarning(false); if (c) approveAll(); }} />
            <Warning Show={showRemoveWarning} Title={'Remove Subscription'} Message={`Are you sure you want to remove this subscription?`}
                CallBack={(c) => { setShowRemoveWarning(false); if (c) removeSubscription(); }} />
            <AddAllSubscription OnClose={() => setShowModal(false)} show={showModal} />
        </>)
}

export default ByAllSubscription;