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
import { Table, Column } from '@gpa-gemstone/react-table';
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
        if (searchStatus === 'unintiated' || searchStatus === 'changed')
            dispatch(ActiveSubscriptionSlice.DBSearch({ filter, sortField, ascending: asc }));
    }, [searchStatus]);

    React.useEffect(() => {
        if (force > 0) {
            dispatch(ActiveSubscriptionSlice.DBSearch({ filter, sortField, ascending: asc }));
            dispatch(ActiveSubscriptionSlice.Fetch());
        }
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
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
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
                                    <div className="form-group">
                                        <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); setShowModal(true); }}>New Subscription</button>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); setShowApproveWarning(true) }}>Approve All</button>
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
                            if (d.colKey === null) return;
                            dispatch(ActiveSubscriptionSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
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
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                        > Category
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'EmailName'}
                            AllowSort={true}
                            Field={'EmailName'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
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
                            Content={({ item }) =>
                                item.RequireApproval ?
                                    (item.Approved && item.LastSent != null) ? moment(item.LastSent).format("DD/MM/yy hh:mm") : "N/A"
                                : item.LastSent != null ? moment(item.LastSent).format("DD/MM/yy hh:mm") : "N/A"
                            }
                        > Last Sent
                        </Column>
                        <Column<ActiveSubscription>
                            Key={'UserName'}
                            AllowSort={true}
                            Field={'UserName'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > User
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
                            Content={({ item }) => item.RequireApproval ? (item.Approved ? HeavyCheckMark :
                                <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    approve(item.UserAccountEmailID);
                                }}><span>{CrossMark}</span></button>) : 'N/A'
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
                                }}><span>{TrashCan}</span></button>
                            }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
            </div>
            <Warning Show={showApproveWarning} Title={'Approve Notification Subscriptions'} Message={`This will approve all ${nApproval} Subscriptions that are currently pending.`}
                CallBack={(c) => { setShowApproveWarning(false); if (c) approveAll(); }} />
            <Warning Show={showRemoveWarning} Title={'Remove Subscription'} Message={`Are you sure you want to remove this subscription?`}
                CallBack={(c) => { setShowRemoveWarning(false); if (c) removeSubscription(); }} />
            <AddAllSubscription OnClose={() => setShowModal(false)} show={showModal} />
        </div>)
}

export default ByAllSubscription;