//******************************************************************************************************
//  BySubscription.tsx - Gbtc
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
import { LoadingScreen, Warning } from '@gpa-gemstone/react-interactive'
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { ReactTable } from '@gpa-gemstone/react-table';
import { ActiveSubscriptionSlice } from '../../Store';
import { ActiveSubscription } from '../../global';
import moment from 'moment';
import { UserInfoSlice } from '../../Store';


declare var homePath;
declare var version;

interface IProps {}

const BySubscription = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [subscription, setSubscription] = React.useState<ActiveSubscription>(null);

    const status: Application.Types.Status = useAppSelector(ActiveSubscriptionSlice.Status);
    const data: ActiveSubscription[] = useAppSelector(ActiveSubscriptionSlice.Data);
    const parentID = useAppSelector(ActiveSubscriptionSlice.ParentID);
    const userID = useAppSelector(UserInfoSlice.UserAccountID)
    const sortField = useAppSelector(ActiveSubscriptionSlice.SortField);
    const asc = useAppSelector(ActiveSubscriptionSlice.Ascending);


    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != userID)
            dispatch(ActiveSubscriptionSlice.Fetch(userID));
    }, [status, parentID, userID])

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <ReactTable.Table<ActiveSubscription>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colKey === null || d.colKey === 'btns') return;
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
                        <ReactTable.Column<ActiveSubscription>
                            Key={'Category'}
                            AllowSort={true}
                            Field={'Category'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Category
                        </ReactTable.Column>
                        <ReactTable.Column<ActiveSubscription>
                            Key={'EmailName'}
                            AllowSort={true}
                            Field={'EmailName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Notification
                        </ReactTable.Column>
                        <ReactTable.Column<ActiveSubscription>
                            Key={'AssetGroup'}
                            AllowSort={true}
                            Field={'AssetGroup'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Assets
                        </ReactTable.Column>
                        <ReactTable.Column<ActiveSubscription>
                            Key={'Approved'}
                            AllowSort={true}
                            Field={'Approved'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.RequireApproval ? (item.Approved ? HeavyCheckMark : CrossMark) : 'N/A'}
                        > Approved
                        </ReactTable.Column>
                        <ReactTable.Column<ActiveSubscription>
                            Key={'LastSent'}
                            AllowSort={true}
                            Field={'LastSent'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => (item.Approved && item.LastSent != null) ? moment(item.LastSent).format("dd/MM/yy hh:mm") : "N/A" }
                        > Last Sent
                        </ReactTable.Column>
                        <ReactTable.Column<ActiveSubscription>
                            Key={'Subject'}
                            AllowSort={true}
                            Field={'Subject'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => (item.Approved && item.Subject != null) ? item.Subject : "N/A" }
                        > Last Subject
                        </ReactTable.Column>
                        <ReactTable.Column<ActiveSubscription>
                            Key={'btns'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) =>
                                <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    setShowWarning(true);
                                    setSubscription(item);
                                }}>Unsubscribe</button>}
                        > <p></p>
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <Warning Show={showWarning}
                Title={'Unsubscribe from ' + (subscription == undefined ? '' : subscription.EmailName)}
                Message={'This will unsubscribe you from these notifications. You will no longer recieve these notifications.'}
                CallBack={(c) => {
                    if (c)
                        dispatch(ActiveSubscriptionSlice.DBAction({ record: subscription, verb: 'DELETE' }));
                    setShowWarning(false);
                }}
            />
        </div>)
}

export default BySubscription;