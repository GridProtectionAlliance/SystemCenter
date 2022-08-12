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
import { LoadingScreen } from '@gpa-gemstone/react-interactive'
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import Table from '@gpa-gemstone/react-table';
import { ActiveSubscriptionSlice } from '../../Store';
import { ActiveSubscription } from '../../global';
import moment from 'moment';
import { UserInfoSlice } from '../../Store';


declare var homePath;
declare var version;

interface IProps {}

const BySubscription = (props: IProps) => {
    const dispatch = useAppDispatch();

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
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '100%' }}>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" style={{ width: '100%' }}>
                            <ul className="navbar-nav mr-auto" style={{ width: '100%' }}>  
                            </ul>
                        </div>
                    </nav>
                </div>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<ActiveSubscription>
                        cols={[
                            { key: 'Category', field: 'Category', label: 'Category', headerStyle: { width: '25%' }, rowStyle: { width: '25%' } },
                            { key: 'EmailName', field: 'EmailName', label: 'Notification', headerStyle: { width: '25%' }, rowStyle: { width: '25%' } },
                            { key: 'AssetGroup', field: 'AssetGroup', label: 'Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Approved', field: 'Approved', label: 'Approved', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => item.Approved ? HeavyCheckMark : CrossMark },
                            { key: 'LastSent', field: 'LastSent', label: 'Last Sent', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => (item.Approved && item.LastSent != null) ? moment(item.LastSent).format("dd/MM/yy hh:mm") : "N/A" },
                            { key: 'Subject', field: 'Subject', label: 'Last Subject', headerStyle: { width: '20%', padding: 0 }, rowStyle: { width: '20%' }, content: (item) => (item.Approved && item.Subject != null) ? item.Subject : "N/A" },
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
        </>)
}

export default BySubscription;