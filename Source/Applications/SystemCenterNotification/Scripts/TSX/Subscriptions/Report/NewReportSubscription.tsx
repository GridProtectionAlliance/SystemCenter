//******************************************************************************************************
//  NewReportSubscription.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  04/03/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ToolTip } from '@gpa-gemstone/react-interactive'
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import ReportSelect from './ReportSelect';
import AssetGroupSelection from '../AssetGroupSelection';
import ConfirmEmail from '../ConfirmEmail';
import ConfirmPhone from '../ConfirmPhone';
import { EmailTypeSlice, UserInfoSlice } from '../../Store';
import { useAppSelector } from '../../hooks';
import Success from './Success';
import ConfirmPhoneCarrier from '../ConfirmCarrier';

declare var homePath;
declare var version;

type Step = 'Selection' | 'Email' | 'Phone' | 'Carrier' | 'Success';

const NewReportSubscription = (props: {}) => {
    const [currentStep, setCurrentStep] = React.useState<Step>('Selection')

    const [error, setError] = React.useState<string[]>([]);
    const [hoverNext, setHoverNext] = React.useState<boolean>(false);

    const [emailTypeID, setEmailTypeID] = React.useState<number>(-1);
    const [assetGroupID, setAssetGroupID] = React.useState<number[]>([]);
    const isText = useAppSelector((state) => (EmailTypeSlice.Datum(state, emailTypeID) == null ? false : EmailTypeSlice.Datum(state, emailTypeID).SMS));

    const carrierID = useAppSelector(UserInfoSlice.CellCarrierID);

    React.useEffect(() => {
        const e = [];
        if (emailTypeID < 0 && currentStep == 'Selection')
            e.push('A Report must be selected.')
        if (assetGroupID.length == 0 && currentStep == 'Selection')
            e.push('At least 1 Asset Group must be selected.')
        if (currentStep == 'Email')
            e.push('Your email address needs to be confirmed')
        if (currentStep == 'Phone')
            e.push('Your phone number needs to be confirmed')
        if (carrierID == null && currentStep == 'Carrier')
            e.push('A cell Carrier has to be selected.')
        setError(e);
    }, [emailTypeID, assetGroupID, currentStep])

    function getHeader() {
        if (currentStep == 'Selection')
            return "Step 1: Select A Report"
        if (currentStep == 'Email')
            return "Confirm your email address"
        if (currentStep == 'Carrier')
            return "Confirm your Cell Carrier"
        if (currentStep == 'Phone')
            return "Confirm your phone number"
        if (currentStep == 'Success')
            return "Success"
    }

    function next() {
        if (disableNext())
            return;
        else if (currentStep == 'Selection' && isText)
            setCurrentStep('Carrier');
        else if (currentStep == 'Selection' && !isText)
            setCurrentStep('Email');
        else if (currentStep == 'Carrier' && isText)
            setCurrentStep('Phone');
        else if (currentStep == 'Email' || currentStep == 'Phone')
            setCurrentStep('Success');

        setError([]);
    }

    function prev() {
        setError([]);
        if (currentStep == 'Phone')
           setCurrentStep('Carrier');
        else if (currentStep == 'Email')
            setCurrentStep('Selection');
        else if (currentStep == 'Carrier')
            setCurrentStep('Selection');
    }


    function disableNext(): boolean {
        if (currentStep == 'Selection' || currentStep == 'Carrier') 
            return error.length > 0
        return true;
    }


    return (
        <div style={{ padding: 10, height: 'inherit', overflowY: 'hidden' }}>
            <h2>Subscribe to an openXDA Event Notification</h2>
            <hr />
            <div className="card" style={{ height: 'calc(100% - 75px)' }}>
                <div className="card-header">
                    <h4 style={{ width: '90%' }}>{getHeader()}</h4>
                </div>
                <div className="card-body" style={{ maxHeight: 'calc(100% - 126px)' }}>
                    {currentStep == 'Selection' ?
                        <>
                            <AssetGroupSelection assetGroupID={assetGroupID} SetAssetGroupID={setAssetGroupID} /> 
                            <ReportSelect scheduledEmailTypeID={emailTypeID} SetScheduledEmailTypeID={setEmailTypeID} />
                        </>
                        : null}
                    {currentStep == 'Email' ? <ConfirmEmail SetConfirmed={() => setCurrentStep('Success')} /> : null}
                    {currentStep == 'Carrier' ? <ConfirmPhoneCarrier /> : null}
                    {currentStep == 'Phone' ? <ConfirmPhone SetConfirmed={() => setCurrentStep('Success')} /> : null}
                    {currentStep == 'Success' ? <Success assetGroupID={assetGroupID} emailTypeID={emailTypeID} /> : null}

                </div>
                <div className="card-footer">
                    {currentStep != 'Selection' && currentStep != 'Success' ? <button className="btn btn-danger pull-left" onClick={prev}>Previous</button> : null}
                    {currentStep == 'Selection' || currentStep == 'Carrier' ? <button className={"btn btn-success pull-right" + (disableNext() ? ' disabled' : '')} onClick={next}
                        data-tooltip='Next' onMouseEnter={() => setHoverNext(true)} onMouseLeave={() => setHoverNext(false)}
                    >Continue</button> : null}
                </div>
                <ToolTip Show={hoverNext && error.length > 0} Position={'top'} Theme={'dark'} Target={"Next"}>
                    {error.map((item, index) => <p key={index}> {CrossMark} {item} </p>)}
                </ToolTip>
            </div>

        </div>
    );
}

export default NewReportSubscription;