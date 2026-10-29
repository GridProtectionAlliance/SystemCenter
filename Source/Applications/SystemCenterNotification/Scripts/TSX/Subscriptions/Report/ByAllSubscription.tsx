//******************************************************************************************************
//  ByAllSubscription.tsx - Gbtc
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
//  10/28/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import GenericByPage, { IByCol } from '../../CommonComponents/GenericByPage';
import { ActiveReportSubscriptionSlice } from '../../Store';
import { ActiveReportSubscription } from '../../global'
import { GenericController, Warning } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import AddSubscription from '../AddSubscription';
import * as $ from 'jquery';

const ActiveReportSubscriptionPath = `${homePath}api/ActiveScheduleSubscription`;

const ActiveReportSubscriptionController = new GenericController<ActiveReportSubscription>(ActiveReportSubscriptionPath, "UserName")

const ByAllSubscription = () => {

    const [refreshCount, refreshData] = React.useState<number>(0);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [showApprove, setShowApprove] = React.useState<boolean>(false);
    const [addStatus, setAddStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [allAssetStatus, setAllAssetStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [fetchStatus, setFetchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [hover, setHover] = React.useState<string | null>(null);
    const [nApproval, setNApproval] = React.useState<number>(0);

    const Columns: IByCol<ActiveReportSubscription>[] = [
        { Label: "Email", Field: "Email", Type: "string" },
        { Label: "Name", Field: "UserName", Type: "string" },
        //{ Label: "Asset Group", Field: "AssetGroup", Type: "string"} since Asset Groups aren't used to filter emails yet, we'll leave this off.
        { Field: "EmailName", Label: "Email Name", Type: "string" },
        { Field: "Category", Label: "Email Category", Type: "string" },
        {
            Field: "Approved",
            Label: "Approved",
            Type: "boolean",
            Width: "10%",
            Content: (col) =>
                col.item.RequireApproval ?
                    (col.item.Approved ? <ReactIcons.CheckMark Color="var(--success)" /> :
                        <button className="btn btn-sm"
                            data-tooltip={`${col.item.ID}_approve`}
                            onMouseEnter={() => setHover(`${col.item.ID}_approve`)}
                            onMouseLeave={() => setHover(null)}
                            onClick={(e) => {
                                e.preventDefault();
                                approve(col.item.UserAccountScheduledEmailID);
                            }}><span><ReactIcons.CrossMark Color="var(--danger)" Size={20} /></span></button>
                    ) : 'N/A'
        }
    ]

    React.useEffect(() => {
        setFetchStatus('loading')
        const handle = ActiveReportSubscriptionController.Fetch();
        handle.done((result: ActiveReportSubscription[]) => {
            setFetchStatus('idle');
            setNApproval(result.filter(sub => !sub.Approved).length);
        })
        handle.fail(() => setFetchStatus('error'))
        return () => { if (handle != null && handle.abort != null) handle.abort() }
    }, [])

    function approve(id: number) {
        $.ajax({
            type: "GET",
            url: `${homePath}api/ActiveSubscription/Approve/${id}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
        }).done(() => {
            refreshData(x => x + 1);
        })
    }

    function approveAll() {
        $.ajax({
            type: "GET",
            url: `${homePath}api/ActiveSubscription/ApproveAll`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
        }).done(() => {
            refreshData(x => x + 1);
        });
    }

    return (
        <GenericByPage<ActiveReportSubscription>
            Slice={ActiveReportSubscriptionSlice}
            ControllerPath={ActiveReportSubscriptionPath}
            DefaultAscending={true}
            DefaultSort={'UserName'}
            DefaultSearchKey={'UserName'}
            Columns={Columns}
            PagingID={'ByAllReportSubscriptions'}
            OnDelete={(item) => ActiveReportSubscriptionController.DBAction("DELETE", item)}
            RefreshCount={refreshCount}
            RecordType={'Report Subscription'}
        >

            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <div className="form-group">
                            <button className="btn btn-info btn-block" onClick={(event) => { event.preventDefault(); setShowAdd(true); }}>Add Subscription</button>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success btn-block" onClick={(event) => { event.preventDefault(); setShowApprove(true) }}>Approve All</button>
                        </div>
                    </form>
                </fieldset>
            </li>

            <AddSubscription
                EmailType={"Scheduled"}
                SetPostStatus={setAddStatus}
                SetAllAssetsStatus={setAllAssetStatus}
                OnClose={() => {
                    setShowAdd(false);
                    refreshData(x => x + 1);
                }}
                Show={showAdd}
                ShowSubscriptionOverride={true}
            />
            <Warning Show={showApprove} Title={'Approve Subscriptions'} Message={`This will approve all ${nApproval} subscriptions that are currently pending.`}
                CallBack={(c) => { setShowApprove(false); if (c) approveAll(); }} />
            <ToolTip Show={hover != null ? (hover.match(/_approve$/) != null) : false} Position={'top'} Target={hover}>
                Click to approve this subscription.
            </ToolTip>
        </GenericByPage>
    )
}

export default ByAllSubscription;