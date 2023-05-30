//******************************************************************************************************
//  AddAllSubscription.tsx - Gbtc
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

import * as React from 'react';
import { Modal } from '@gpa-gemstone/react-interactive'
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import EmailSelect from './EmailSelect';
import AssetGroupSelection from '../AssetGroupSelection';
import UserSelect from '../UserSelect';
import { ActiveSubscriptionSlice } from '../../Store';
import { useAppDispatch } from '../../hooks';

declare var homePath;
declare var version;

interface IProps {
    show: boolean,
    OnClose: () => void
}

const AddAllSubscription = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [step, setStep] = React.useState<('Email'|'User')>('User');
    const [error, setError] = React.useState<string[]>([]);

    const [emailTypeID, setEmailTypeID] = React.useState<number>(-1);
    const [assetGroupIDs, setAssetGroupIDs] = React.useState<number[]>([]);
    const [userAccountID, setUserAccountID] = React.useState<string>('');

    React.useEffect(() => {
        const e = [];
        if (emailTypeID < 0 && step == 'Email')
            e.push('A Notification must be selected.')
        if (assetGroupIDs.length == 0 && step == 'Email')
            e.push('At least 1 Asset Group must be selected.')
        if (userAccountID.length == 0 && step == 'User')
            e.push('A User must be selected.')
        setError(e);
    }, [emailTypeID, assetGroupIDs, userAccountID, step])

    React.useEffect(() => {
        if (!props.show)
            return;
        setEmailTypeID(-1);
        setAssetGroupIDs([]);
        setUserAccountID('');
        setStep('User');
    }, [props.show]) 

    function save() {
        assetGroupIDs.forEach((id) => {
            dispatch(ActiveSubscriptionSlice.DBAction({
                verb: 'POST', record: {
                    ID: 0,
                    UserAccountID: userAccountID,
                    EmailTypeID: emailTypeID,
                    AssetGroup: id.toString(),
                    Approved: false,
                    Category: '',
                    Email: '',
                    Subject: '',
                    UserAccountEmailID: 0,
                    EmailName: '',
                    LastSent: '',
                    UserName: ''
                }
            }));
        });
        props.OnClose();
    }

    return (
        <>
            <Modal Show={props.show} ShowCancel={true} Size={'xlg'} ShowX={true} Title={'Add New Event Subscription'}
                ConfirmText={step == 'Email' ? 'Add Subscription' : 'Next'}
                CancelText={'Back'}
                DisableCancel={step == 'User'}
                DisableConfirm={error.length > 0}
                ConfirmShowToolTip={error.length > 0}
                ConfirmToolTipContent={<> {error.map((s, i) => <p key={i}> {CrossMark} {s} </p>)}</>}
                ConfirmBtnClass={'success-btn'}
                CallBack={(c,b) => {
                    if (!b)
                        props.OnClose();
                    if (!c && b && step == 'Email')
                        setStep('User');
                    if (c && step == 'User')
                        setStep('Email');
                    if (c && step == 'Email')
                        save();
                }}
            >
                {step == 'Email' ? <>
                    <AssetGroupSelection assetGroupID={assetGroupIDs} SetAssetGroupID={setAssetGroupIDs} />
                    <EmailSelect emailTypeID={emailTypeID} SetEmailTypeID={setEmailTypeID} />
                </> : null}
                {step == 'User' ? <UserSelect UserAccountID={userAccountID} SetUserAccountID={setUserAccountID} /> : null}
            </Modal>
        </>)
}

export default AddAllSubscription;