//******************************************************************************************************
//  BySubscription.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  10/29/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppSelector } from '../../hooks';
import * as React from 'react';
import { Search, GenericController } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ActiveReportSubscriptionSlice } from '../../Store';
import { ActiveReportSubscription } from '../../global';
import moment from 'moment';
import { UserInfoSlice } from '../../Store';
import GenericByPage, { IByCol } from '../../CommonComponents/GenericByPage';
import { APIPath, TimeFormatting }  from '../../constants';

const ActiveReportSubscriptionController = new GenericController<ActiveReportSubscription>(APIPath.ActiveScheduleSubscription, "Email");

const Columns: IByCol<ActiveReportSubscription>[] = [
    {
        Label: "Category",
        Field: "Category",
        Type: "string"
    },
    {
        Label: "Notification",
        Field: "EmailName",
        Type: "string"
    },
    //{Label: "Asset Group", Field: "AssetGroup", Type: "string"}, commented for now.
    {
        Label: "Approved",
        Field: "Approved",
        Type: "boolean",
        Content: ({ item }) => item.RequireApproval ? (item.Approved ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" />) : 'N/A'
    },
    {
        Label: "Last Sent",
        Field: "LastSent",
        Type: "string",
        Content: ({ item }) => item.LastSent != null && (!item.RequireApproval || item.Approved) ? moment(item.LastSent).format(TimeFormatting.DateToMinute) : "N/A"
    },
    {
        Label: "Last Subject",
        Field: "Subject",
        Type: "string",
        Content: ({item }) => (item.Subject != null && (!item.RequireApproval || item.Approved)) ? item.Subject : "N/A"
    }
]

const BySubscription = ({ }) => {
    const userID = useAppSelector(UserInfoSlice.UserAccountID)
    const filters: Search.IFilter<ActiveReportSubscription>[] = React.useMemo(() => [{ FieldName: 'UserAccountID', SearchText: userID.toString(), IsPivotColumn: false, Operator: "=", Type: 'string' }], [userID]);

    if (userID == null || userID === "") return null

    return (
        <GenericByPage<ActiveReportSubscription>
            Slice={ActiveReportSubscriptionSlice}
            PrimaryKey={'UserAccountScheduledEmailID'}
            ControllerPath={APIPath.ActiveScheduleSubscription}
            DefaultAscending={true}
            DefaultSearchKey={'EmailName'}
            DefaultSort={'EmailName'}
            PagingID={'MyReportSubscription'}
            Columns={Columns}
            BaseFilters={filters}
            RecordType={"Report Subscription"}
            OnDelete={(item) => ActiveReportSubscriptionController.DBAction("DELETE", item)}
            DeleteButton={(item, isDeleting, callback) => <button className={`btn btn-sm ${isDeleting ? 'btn-disabled' : ''}`} onClick={(e) => callback(e, item)} disabled={isDeleting}>
                <span>
                    {isDeleting ? <ReactIcons.SpiningIcon Color="var(--primary)" /> : "Unsubscribe"} 
                </span>
            </button>}
        />
    )
}

export default BySubscription;