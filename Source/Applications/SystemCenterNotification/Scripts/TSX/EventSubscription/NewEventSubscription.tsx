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

import { Provider, useDispatch, useSelector } from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Application as App, Page, ToolTip } from '@gpa-gemstone/react-interactive'
import { CrossMark, SVGIcons } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import EmailSelect from './EmailSelect';
import AssetGroupSelection from './AssetGroupSelection';
import ConfirmEmail from './ConfirmEmail';
import ConfirmPhone from './ConfirmPhone';
import { EmailTypeSlice } from '../Store';
import Success from './Success';

declare var homePath;
declare var version;

const NewEventSubscription = (props: {}) => {
    const [currentStep, setCurrentStep] = React.useState<number>(1)

    const [error, setError] = React.useState<string[]>([]);
    const [hoverNext, setHoverNext] = React.useState<boolean>(false);

    const [emailTypeID, setEmailTypeID] = React.useState<number>(-1);
    const [assetGroupID, setAssetGroupID] = React.useState<number>(-1);
    const isText = useSelector((state) => (EmailTypeSlice.Datum(state, emailTypeID) == null ? false : EmailTypeSlice.Datum(state, emailTypeID).SMS));

    React.useEffect(() => {
        const e = [];
        if (emailTypeID < 0 && currentStep == 1)
            e.push('A Notification must be selected.')
        if (assetGroupID < 0 && currentStep == 2)
            e.push('An Asset Group must be selected.')
        if (currentStep == 3)
            e.push('Your emailAdress needs to be confirmed')
        if (currentStep == 3.5)
            e.push('Your phone number needs to be confirmed')
        setError(e);
    }, [emailTypeID, assetGroupID, currentStep])

    function getHeader() {
        if (currentStep == 1)
            return "Step 1: Select a notification type"
        if (currentStep == 2)
            return "Step 2: Select a set of assets"
        if (currentStep == 3)
            return "Step 3: Confirm your email address"
        if (currentStep == 3.5)
            return "Step 3: Confirm your phone number"
        if (currentStep == 4)
            return "Success"
    }

    function next() {
        if (disableNext())
            return;
        else if (currentStep == 2 && isText)
            setCurrentStep(3.5);
        else if (currentStep >= 4) 
            setCurrentStep(4);
        else 
            setCurrentStep((x) => x + 1);
        setError([]);

    }

    function prev() {
        setError([]);
        if (currentStep <= 1)
            setCurrentStep(1);
        else if (currentStep == 4)
            setCurrentStep(2);
        else if (currentStep == 3.5)
            setCurrentStep(2);
        else
            setCurrentStep(x=> x - 1);
    }


    function disableNext(): boolean {
        if (currentStep == 1) 
            return error.length > 0
        
        else if (currentStep == 2) 
            return error.length > 0

        else if (currentStep == 3 || currentStep == 3.5)
            return true
        
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
                    {currentStep == 1 ? <EmailSelect emailTypeID={emailTypeID} SetEmailTypeID={setEmailTypeID} /> : null}
                    {currentStep == 2 ? <AssetGroupSelection assetGroupID={assetGroupID} SetAssetGroupID={setAssetGroupID} /> : null}
                    {currentStep == 3 ? <ConfirmEmail SetConfirmed={() => setCurrentStep((x) => x + 1)} /> : null}
                    {currentStep == 3.5 ? <ConfirmPhone SetConfirmed={() => setCurrentStep((x) => x + 0.5)} /> : null}
                    {currentStep == 4 ? <Success assetGroupID={assetGroupID} emailTypeID={emailTypeID} /> : null}

                </div>
                <div className="card-footer">
                    {currentStep > 1 && currentStep < 4 ? <button className="btn btn-danger pull-left" onClick={prev}>Previous</button> : null}
                    {currentStep < 3 ? <button className={"btn btn-success pull-right" + (disableNext() ? ' disabled' : '')} onClick={next}
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

export default NewEventSubscription;