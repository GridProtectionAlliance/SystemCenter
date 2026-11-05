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
import { APIPath, TimeFormatting } from '../../constants'
import AddSubscription from '../AddSubscription';
import * as $ from 'jquery';
import moment from 'moment';
import { OperationResult } from '../../CommonComponents/ResultAlert'; 

const ActiveReportSubscriptionController = new GenericController<ActiveReportSubscription>(APIPath.ActiveScheduleSubscription, "UserName")

const ByAllSubscription = () => {

    const [refreshCount, refreshData] = React.useState<number>(0);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [showApprove, setShowApprove] = React.useState<boolean>(false);
    const [addStatus, setAddStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [allAssetStatus, setAllAssetStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [fetchStatus, setFetchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [approveStatus, setApproveStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [approveAllStatus, setApproveAllStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [currentlyApproving, setCurrentlyApproving] = React.useState<number | null>(null);
    const [hover, setHover] = React.useState<string | null>(null);
    const [nApproval, setNApproval] = React.useState<number>(0);

    const [operationResults, setOperationResults] = React.useState<OperationResult[]>([]);

    const Columns: IByCol<ActiveReportSubscription>[] = [
        { Field: "Category", Label: "Email Category", Type: "string" },
        { Field: "EmailName", Label: "Email Name", Type: "string" },
        //{ Label: "Asset Group", Field: "AssetGroup", Type: "string"} since Asset Groups aren't used to filter emails yet, we'll leave this off.
        {
            Field: "LastSent",
            Label: "Last Sent",
            Type: "datetime",
            Content: ({ item }) => item.LastSent != null && (!item.RequireApproval || item.Approved) ? moment(item.LastSent).format(TimeFormatting.DateToMinute) : "N/A"
        },
        { Label: "First", Field: "FirstName", Type: "string" },
        { Label: "Last", Field: "LastName", Type: "string" },
        { Label: "Email", Field: "Email", Type: "string" },
        {
            Field: "Approved",
            Label: "Approved",
            Type: "boolean",
            Width: "10%",
            Content: (col) =>
                col.item.RequireApproval ?
                    (col.item.Approved ? <ReactIcons.CheckMark Color="var(--success)" /> :
                        <button className="btn btn-sm"
                            data-tooltip={`${col.item["UserAccountScheduledEmailID"]}_approve`}
                            onMouseEnter={() => setHover(`${col.item["UserAccountScheduledEmailID"]}_approve`)}
                            onMouseLeave={() => setHover(null)}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentlyApproving(col.item.UserAccountScheduledEmailID)
                                approve(col.item.UserAccountScheduledEmailID);
                                setHover(null);
                            }}>
                            <span>
                                {
                                    approveStatus === 'loading' && currentlyApproving === col.item.UserAccountScheduledEmailID ? <ReactIcons.SpiningIcon Color="var(--primary)" Size={20} /> :
                                        <ReactIcons.CrossMark Color="var(--danger)" Size={20} />
                                }
                            </span>
                        </button>
                    ) : 'N/A'
        }
    ]

    React.useEffect(() => {
        setFetchStatus('loading')
        const handle = ActiveReportSubscriptionController.Fetch();
        handle.done((result: ActiveReportSubscription[]) => {
            setFetchStatus('idle');
            setNApproval(result.filter(sub => !sub.Approved && sub.RequireApproval).length);
        })
        handle.fail(() => {
            setFetchStatus('error');
            setOperationResults(opres => [{OperationType: "FETCH", RecordType: "Report Subscription", Result: "failure", Timestamp: moment().valueOf()}, ...opres]);  
        })
        return () => { if (handle != null && handle.abort != null) handle.abort() }
    }, [refreshCount])

    function approve(id: number) {
        setApproveStatus('loading');
        $.ajax({
            type: "POST",
            url: `${APIPath.ActiveScheduleSubscription}/Approve/${id}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
        }).done(() => {
            refreshData(x => x + 1);
            setCurrentlyApproving(null);
            setApproveStatus('idle');
            setOperationResults(opres => [{ OperationType: "APPROVE", RecordType: "Report Subscription", Result: "success", Timestamp: moment().valueOf() }, ...opres]);  
        }).fail(() => {
            setCurrentlyApproving(null);
            setApproveStatus('error');
            setOperationResults(opres => [{ OperationType: "APPROVE", RecordType: "Report Subscription", Result: "failure", Timestamp: moment().valueOf() }, ...opres]);  
        })
    }

    function approveAll() {
        setApproveAllStatus('loading');
        $.ajax({
            type: "POST",
            url: `${APIPath.ActiveScheduleSubscription}/ApproveAll`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
        }).done(() => {
            refreshData(x => x + 1);
            setApproveAllStatus('idle');
            setOperationResults(opres => [{ OperationType: "APPROVE", RecordType: "Report Subscription", Result: "success", Timestamp: moment().valueOf() }, ...opres]);  
        }).fail(() => {
            setApproveAllStatus('error');
            setOperationResults(opres => [{ OperationType: "APPROVE", RecordType: "Report Subscription", Result: "failure", Timestamp: moment().valueOf() }, ...opres]);  
        })
    }

    const addDisabled = addStatus === 'loading' || allAssetStatus === 'loading';
    const approveAllDisabled = approveAllStatus === 'loading' || fetchStatus === 'loading';

    return (
        <GenericByPage<ActiveReportSubscription>
            Slice={ActiveReportSubscriptionSlice}
            PrimaryKey={'UserAccountScheduledEmailID'}
            ControllerPath={APIPath.ActiveScheduleSubscription}
            DefaultAscending={true}
            DefaultSort={'UserName'}
            DefaultSearchKey={'EmailName'}
            Columns={Columns}
            PagingID={'ByAllReportSubscriptions'}
            OnDelete={(item) => ActiveReportSubscriptionController.DBAction("DELETE", item)}
            RefreshCount={refreshCount}
            RecordType={'Report Subscription'}
            OperationResults={operationResults}
            SetOperationResults={setOperationResults}
        >

            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <div className="form-group">
                            <button className={`btn btn-info btn-block ${addDisabled ? 'btn-disabled' : ''}`} disabled={addDisabled} onClick={(event) => { event.preventDefault(); setShowAdd(true); }}>
                                {addDisabled ? <ReactIcons.SpiningIcon Color="var(--primary)" Size={20} /> : "Add Subscription"}
                            </button>

                        </div>
                        <div className="form-group">
                            <button className={`btn btn-success btn-block ${approveAllDisabled ? 'btn-disabled' : ''}`} disabled={approveAllDisabled} onClick={(event) => { event.preventDefault(); setShowApprove(true) }}>
                                {approveAllDisabled ? <ReactIcons.SpiningIcon Color="var(--primary)" Size={20} /> : "Approve All"}
                            </button>
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