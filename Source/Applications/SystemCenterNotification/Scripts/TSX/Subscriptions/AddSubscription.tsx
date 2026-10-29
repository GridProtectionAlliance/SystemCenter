//******************************************************************************************************
//  AddSubscription.tsx - Gbtc
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
import { Modal, GenericController } from '@gpa-gemstone/react-interactive';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import EmailSelect from './Event/EmailSelect';
import ReportSelect from './Report/ReportSelect';
import AssetGroupSelection from './AssetGroupSelection';
import UserSelect from './UserSelect';
import { ActiveSubscription, ActiveReportSubscription } from '../global'
import { ActiveSubscriptionSlice, ActiveReportSubscriptionSlice } from '../Store';
import { useAppDispatch } from '../hooks';
import * as $ from 'jquery';

//import moment from 'moment';

declare var homePath;
declare var version;

const AssetGroupController = new GenericController<OpenXDA.Types.AssetGroup>(`${homePath}api/OpenXDA/AssetGroup`, "Name");
const ActiveTriggeredSubscriptionController = new GenericController<ActiveSubscription>(`${homePath}api/ActiveSubscription`, 'LastSent');
const ActiveReportSubscriptionController = new GenericController<ActiveReportSubscription>(`${homePath}api/ActiveScheduleSubscription`, 'Email');

interface IProps {
    /**
     * Show the modal.
     */
    Show: boolean
    /**
     * Called on close.
     */
    OnClose: () => void
    /**
     * Show Subscriptions that aren't otherwise shown and subscriptable.
     */
    ShowSubscriptionOverride?: boolean
    /**
     * Whether or not to include a subscription step. 
     */
    UserAccountID?: string
    /**
     * Whether the email is Scheduled or Triggered.
     */
    EmailType: "Scheduled" | "Triggered"
    /**
     * Keep track of SAVE network request status in parent component.
     */
    SetPostStatus: React.Dispatch<React.SetStateAction<Application.Types.Status>>
    /**
     * Keep track of "AllAssets" network request status in parent component.
     */
    SetAllAssetsStatus: React.Dispatch<React.SetStateAction<Application.Types.Status>>
    /**
     * Refresh parent component when post is successful.
     */
    RefreshData?: React.Dispatch<React.SetStateAction<number>>
}

const AddSubscription = ({
    Show,
    OnClose,
    EmailType,
    UserAccountID,
    ShowSubscriptionOverride,
    SetPostStatus,
    SetAllAssetsStatus,
    RefreshData
}: IProps) => {
    const dispatch = useAppDispatch(); // only used for setting changed slices until they can be removed.

    const [step, setStep] = React.useState<"User" | "Email">(UserAccountID != null ? "Email" : "User");
    const [errors, setErrors] = React.useState<string[]>([]);

    const [emailTypeID, setEmailTypeID] = React.useState<number>(-1);
    const [assetGroupIDs, setAssetGroupIDs] = React.useState<number[]>([]);
    const [userAccountID, setUserAccountID] = React.useState<string>(UserAccountID);

    const [allAssetGroup, setAllAssetGroup] = React.useState<OpenXDA.Types.AssetGroup | null>(null);

    // get all asset groups to find the "AllAssets" group, to use by default for reports until asset group filtering is implemented.
    React.useEffect(() => {
        SetAllAssetsStatus('loading');
        const handle = AssetGroupController.Fetch()
            .done((result: OpenXDA.Types.AssetGroup[]) => {
                const maybeAllAssetGroup = result.find(ag => ag.Name === "AllAssets");
                if (maybeAllAssetGroup != null) {
                    setAllAssetGroup(maybeAllAssetGroup);
                    SetAllAssetsStatus('idle');
                }
                else {
                    SetAllAssetsStatus('error')
                }
            })
            .fail(() => SetAllAssetsStatus('error'));
        return () => {
            if (handle != null && handle.abort != null) handle.abort()
        }
    }, [])

    React.useEffect(() => {
        const e = [];
        if (emailTypeID < 0 && step == 'Email')
            e.push('A Notification must be selected.')
        if (assetGroupIDs.length == 0 && step == 'Email' && EmailType === 'Triggered')
            e.push('At least 1 Asset Group must be selected.')
        if (userAccountID == null && step == 'User')
            e.push('A User must be selected.')
        setErrors(e);
    }, [emailTypeID, assetGroupIDs, userAccountID, step])

    function save() {
        SetPostStatus("loading");
        let subscriptionsHandle: Promise<any>;
        if (EmailType === 'Triggered') {
            subscriptionsHandle = Promise.allSettled(
                assetGroupIDs.map(agi => ActiveTriggeredSubscriptionController.DBAction("POST", {
                    UserAccountID: userAccountID,
                    EmailTypeID: emailTypeID,
                    AssetGroup: agi.toString(),
                    Email: "",
                    EmailName: "",
                    ID: -1,
                    UserAccountEmailID: -1,
                    FirstName: "",
                    LastName: "",
                    Approved: false,
                    Category: "",
                    LastSent: "",
                    RequireApproval: true,
                    Subject: "",
                    UserName: ""
                }).fail(() => {
                    SetPostStatus('error');
                })
                )
            ).then((results) => {
                const failed = results.some(r => r.status === 'rejected')
                if (!failed) {
                    SetPostStatus('idle');
                }
                dispatch(ActiveSubscriptionSlice.SetChanged());
            })
        }
        else {
            subscriptionsHandle = ActiveReportSubscriptionController.DBAction("POST", {
                UserAccountID: userAccountID,
                ScheduledEmailTypeID: emailTypeID,
                AssetGroup: allAssetGroup.ID.toString(),
                Email: "",
                EmailName: "",
                ID: -1,
                FirstName: "",
                LastName: "",
                Approved: false,
                Category: "",
                LastSent: "",
                RequireApproval: true,
                Subject: "",
                UserName: "",
                UserAccountScheduledEmailID: -1
            })
                .fail(() => {
                    SetPostStatus('error');
                })
                .done((results) => {
                    const failed = results.some(r => r.status === 'rejected')
                    if (!failed) {
                        SetPostStatus('idle');
                    }
                    dispatch(ActiveReportSubscriptionSlice.SetChanged());
                })
        }
        setUserAccountID("");
        setAssetGroupIDs([]);
        setEmailTypeID(-1);
        return subscriptionsHandle;
    }


    return (
        <>
            <Modal
                Show={Show}
                ShowCancel={true}
                Size={'xlg'}
                ShowX={true}
                Title={`Add New ${EmailType === 'Triggered' ? "Event" : "Report"} Subscription`}
                BodyStyle={{ overflow: 'hidden', height: 'calc(100vh - 210px)' }}
                CancelText={step == 'Email' ? 'Add Subscription' : 'Next'}
                ConfirmText={'Previous'}
                DisableConfirm={step == 'User'}
                DisableCancel={errors.length > 0}
                CancelShowToolTip={errors.length > 0}
                CancelToolTipContent={<> {errors.map((s, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" /> {s} </p>)}</>}
                CancelBtnClass={step == 'Email' ? 'btn-primary' : 'btn-success'}
                ConfirmBtnClass={'btn-danger mr-auto'}
                CallBack={(c, b) => {
                    if (!b)
                        OnClose();
                    if (!c && b && step == 'User')
                        setStep('Email');
                    if (c && step == 'Email')
                        setStep('User');
                    if (!c && b && step == 'Email') {
                        save().then(() => { if (RefreshData != null) RefreshData(x => x + 1) })
                        OnClose()
                    }
                }}
            >
                {step == 'Email' ?
                    <div className="row h-100">
                        {
                            EmailType === "Triggered" ?
                                <>
                                    <AssetGroupSelection assetGroupID={assetGroupIDs} SetAssetGroupID={setAssetGroupIDs} /> {/** TODO: allow subscription to Asset Groups when Asset Group Filtering for Reports is implemented. */}
                                    <EmailSelect emailTypeID={emailTypeID} SetEmailTypeID={setEmailTypeID} ShowSubscriptionOverride={ShowSubscriptionOverride} />
                                </> :
                                <ReportSelect scheduledEmailTypeID={emailTypeID} SetScheduledEmailTypeID={setEmailTypeID} ShowSubscriptionOverride={ShowSubscriptionOverride} />
                        }

                    </div> : null}
                {step == 'User' ? <UserSelect UserAccountID={userAccountID} SetUserAccountID={setUserAccountID} /> : null}
            </Modal>
        </>)
}

export default AddSubscription;