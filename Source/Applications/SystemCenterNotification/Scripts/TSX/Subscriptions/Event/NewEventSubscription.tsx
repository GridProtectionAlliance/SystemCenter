//******************************************************************************************************
//  NewEventSubscription.tsx - Gbtc
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

import * as $ from 'jquery';
import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import { ProgressBar } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { useAppSelector } from '../../hooks';
import { EmailType } from '../../global';
import { UserInfoSlice } from '../../Store';
import AssetGroupSelection from '../AssetGroupSelection';
import ConfirmPhoneCarrier from '../ConfirmCarrier';
import ConfirmEmail from '../ConfirmEmail';
import ConfirmPhone from '../ConfirmPhone';
import EmailSelect from './EmailSelect';
import Success from './Success';

declare var homePath;
declare var version;

type Step = 'Selection' | 'Email' | 'Phone' | 'Carrier' | 'Success';

const NewEventSubscription = (props: {}) => {
    const [currentStep, setCurrentStep] = React.useState<Step>('Selection')

    const [error, setError] = React.useState<string[]>([]);
    const [hoverNext, setHoverNext] = React.useState<boolean>(false);

    const [emailTypeID, setEmailTypeID] = React.useState<number>(-1);
    const [assetGroupID, setAssetGroupID] = React.useState<number[]>([]);
    const [isText, setIsText] = React.useState<boolean>(false);
    const [emailTypeStatus, setEmailTypeStatus] = React.useState<Application.Types.Status>('uninitiated');

    const carrierID = useAppSelector(UserInfoSlice.CellCarrierID);

    React.useEffect(() => {
        if (emailTypeID < 0) return
        setEmailTypeStatus('loading')
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/EmailType/One/${emailTypeID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })
        h.done((d) => {
            setIsText(d.SMS);
            setEmailTypeStatus('idle');
        });
        h.fail(() => setEmailTypeStatus('error'));

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }

    }, [emailTypeID])

    const PhoneSteps = [
        { short: 'Notification', long: 'Select Notification', id: 'Selection' },
        { short: 'Phone Provider', long: 'Confirm Phone Provider', id: 'Carrier' },
        { short: 'Phone Number', long: 'Confirm Phone Number', id:'Phone' },
        { short: 'Success', long: 'Success', id: 'Success' }
    ];

    const EmailSteps = [
        { short: 'Notification', long: 'Select Notification', id: 'Selection' },
        { short: 'Email', long: 'Confirm Email Address', id: 'Email' },
        { short: 'Success', long: 'Success', id: 'Success' }
    ];


    React.useEffect(() => {
        const e = [];
        if (emailTypeID < 0 && currentStep == 'Selection')
            e.push('A Notification must be selected.')
        if (assetGroupID.length == 0 && currentStep == 'Selection')
            e.push('At least 1 Asset Group must be selected.')
        if (currentStep == 'Email')
            e.push('Your email address must be confirmed.')
        if (currentStep == 'Phone')
            e.push('Your phone number must be confirmed.')
        if (carrierID == null && currentStep == 'Carrier')
            e.push('A Cell Carrier must be selected.')
        setError(e);
    }, [emailTypeID, assetGroupID, currentStep])

    function getHeader() {
        if (currentStep == 'Selection')
            return "Step 1: Select a Notification"
        if (currentStep == 'Email')
            return "Confirm Your Email Address"
        if (currentStep == 'Carrier')
            return "Confirm Your Cell Carrier"
        if (currentStep == 'Phone')
            return "Confirm Your Phone Number"
        if (currentStep == 'Success')
            return "Success!"
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
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row">
                <div className="col">
                    <h2>Subscribe to an openXDA Event Notification</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ProgressBar steps={isText ? PhoneSteps : EmailSteps} activeStep={currentStep} />
                </div>
            </div>
            
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4 style={{ width: '90%' }}>{getHeader()}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className='row h-100'>
                            {currentStep == 'Selection' ?
                                <>
                                    <AssetGroupSelection assetGroupID={assetGroupID} SetAssetGroupID={setAssetGroupID} /> 
                                    <EmailSelect emailTypeID={emailTypeID} SetEmailTypeID={setEmailTypeID} />
                                </>
                                : null}
                            {currentStep == 'Email' ? <ConfirmEmail SetConfirmed={() => setCurrentStep('Success')} /> : null}
                            {currentStep == 'Carrier' ? <ConfirmPhoneCarrier /> : null}
                            {currentStep == 'Phone' ? <ConfirmPhone SetConfirmed={() => setCurrentStep('Success')} /> : null}
                            {currentStep == 'Success' ? <Success assetGroupID={assetGroupID} emailTypeID={emailTypeID} /> : null}
                        </div>
                    </div>
                    <div className="card-footer">
                        {currentStep != 'Selection' && currentStep != 'Success' ?
                            <div className="btn-group mr-2 float-left">
                                <button className="btn btn-danger" onClick={prev}>Previous</button>
                            </div> : null}
                            <div className="btn-group mr-2 float-right">
                                <button className={"btn btn-success" + ((disableNext() || (currentStep != 'Selection' && currentStep != 'Carrier')) ? ' disabled' : '')} onClick={next}
                                    data-tooltip='Next' onMouseEnter={() => setHoverNext(true)} onMouseLeave={() => setHoverNext(false)}
                                >{currentStep !== 'Success' ? 'Next' : 'Subscribe'}</button>
                            </div>
                    </div>
                </div>
            </div>
            <ToolTip Show={hoverNext && error.length > 0} Position={'top'} Target={"Next"}>
                {error.map((item, index) => <p key={index}> <ReactIcons.CrossMark Color={'var(--danger)'} /> {item} </p>)}
            </ToolTip>
        </div>
    );
}

export default NewEventSubscription;