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

import { useAppDispatch, useAppSelector } from '../../hooks';
import * as React from 'react';
import { LoadingScreen, Warning, Search, GenericController } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { ActiveReportSubscriptionSlice } from '../../Store';
import { ActiveReportSubscription } from '../../global';
import moment from 'moment';
import { UserInfoSlice } from '../../Store';
import GenericByPage, { IByCol } from '../../CommonComponents/GenericByPage';

interface IProps {

}

const ActiveReportSubscriptionPath = `${homePath}api/ActiveScheduleSubscription`;

const ActiveReportSubscriptionController = new GenericController<ActiveReportSubscription>(ActiveReportSubscriptionPath, "Email");

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
        Content: ({ item }) => item.LastSent != null && (!item.RequireApproval || item.Approved) ? moment(item.LastSent).format("DD/MM/yy hh:mm") : "N/A"
    },
    {
        Label: "Last Subject",
        Field: "Subject",
        Type: "string",
        Content: ({item }) => (item.Subject != null && (!item.RequireApproval || item.Approved)) ? item.Subject : "N/A"
    }
]

const BySubscription = ({ }: IProps) => {
    const userID = useAppSelector(UserInfoSlice.UserAccountID)
    const filters: Search.IFilter<ActiveReportSubscription>[] = [{ FieldName: 'UserAccountID', SearchText: userID.toString(), IsPivotColumn: false, Operator: "=", Type: 'string' }]

    return (
        <GenericByPage<ActiveReportSubscription>
            Slice={ActiveReportSubscriptionSlice}
            ControllerPath={ActiveReportSubscriptionPath}
            DefaultAscending={true}
            DefaultSearchKey={'UserName'}
            DefaultSort={'UserName'}
            PagingID={'MyReportSubscription'}
            Columns={Columns}
            BaseFilters={filters}
            RecordType={"Report Subscription"}
            OnDelete={(item) => ActiveReportSubscriptionController.DBAction("DELETE", item) }
        />
    )
}

export default BySubscription;