//******************************************************************************************************
//  NewMeterWizard.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { LoadingScreen, ServerErrorIcon, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { useAppDispatch, useAppSelector } from '../hooks';
import { CrossMark, Warning as WarningSymbol } from '@gpa-gemstone/gpa-symbols';
import { SelectMeterStatus, FetchMeter } from '../Store/MeterSlice';
import { useHistory } from "react-router-dom";
import { LocationSlice } from '../Store/Store';

import MeterInfoPage from './MeterInfoPage';
import LocationPage from './LocationPage';
import ChannelPage from './ChannelPage';
import AssetPage from './AssetPage';
import ConnectionPage from './ConnectionPage';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import MultipleAssetsPage from './MultipleAssetsPage';
import CustomerAssetGroupPage from './CustomerAssetGroupPage';
import LineSegmentWindow from '../AssetAttribute/LineSegmentWindow';

export interface AssetLists {
    Breakers: Array<OpenXDA.Types.Breaker>,
    Buses: Array<OpenXDA.Types.Breaker>,
    CapBanks: Array<OpenXDA.Types.CapBank>,
    Lines: Array<OpenXDA.Types.Line>,
    Transformers: Array<OpenXDA.Types.Transformer>
}

export default function NewMeterWizard(props: {}) {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const mStatus = useAppSelector(SelectMeterStatus);
    const lStatus = useAppSelector(LocationSlice.Status);

    // Meter Info
    const [currentStep, setCurrentStep] = React.useState<number>(getCurrentStep());
    const [meterID, setMeterID] = React.useState<number>(getMeterID()); // This in particular indicates a post submission state, we want to seperate this out to ensure we don't use old data
    const [meterInfo, setMeterInfo] = React.useState<OpenXDA.Types.Meter>(getMeterInfo());
    const [locationInfo, setLocationInfo] = React.useState<OpenXDA.Types.Location>(getLocationInfo());
    const [channels, setChannels] = React.useState<OpenXDA.Types.Channel[]>(getChannels());
    const [assets, setAssets] = React.useState<OpenXDA.Types.Asset[]>(getAssets());
    const [lines, setLines] = React.useState<OpenXDA.Types.Asset[]>();
    const [assetConnections, setAssetConnections] = React.useState<OpenXDA.Types.AssetConnection[]>(getAssetConnections());

    // Wizard Page Control
    const [error, setError] = React.useState<string[]>([]);
    const [warning, setWarning] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<'None' | 'Next' | 'Prev'>('None');
    const [showSubmit, setShowSubmit] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');

    const portalID: string = "NewMeterWizardPortalID";
    const assetPageID: string = "NewMeterWizard.AssetPage";

    // Define Step Numbers
    const generalStep: number = 1;
    const locationStep: number = generalStep + 1;
    const eventChannelsStep: number = locationStep + 1;
    const trendChannelsStep: number = eventChannelsStep + 1;
    const assetStep: number = trendChannelsStep + 1;
    const connectionStep: number = assetStep + 1;
    const additionalFieldMeterStep: number = connectionStep + 1;
    const externalFieldStep: number = additionalFieldMeterStep + 1;
    const customerAssetGroupMeterStep: number = externalFieldStep + 1;
    const additionalFieldAssetStep: number = customerAssetGroupMeterStep + 1;
    const customerAssetGroupAssetStep: number = additionalFieldAssetStep + 1;
    const lineSegmentStep: number = customerAssetGroupAssetStep + 1;

    // Define Special Steps
    const saveStepNoAsset: number = assetStep;
    const saveStep: number = connectionStep;
    const finalStepNoLine: number = customerAssetGroupAssetStep;
    const finalStep: number = lineSegmentStep;

    React.useEffect(() => {
        if (mStatus === 'unintiated' || mStatus === 'changed')
            dispatch(FetchMeter());
    }, [mStatus, dispatch]);

    React.useEffect(() => {
        if (lStatus === 'unintiated' || lStatus === 'changed')
            dispatch(LocationSlice.Fetch());
    }, [lStatus, dispatch]);

    React.useEffect(() => {
        localStorage.setItem('NewMeterWizard.CurrentStep', currentStep.toString())
    }, [currentStep]);

    React.useEffect(() => {
        if (meterID > 0) {
            localStorage.setItem('NewMeterWizard.MeterID', JSON.stringify(meterID));
            let handle = loadAssetsFromServer(meterID);
            return () => {
                if (handle != null && handle.abort != null)
                    handle.abort();
            };
        }
    }, [meterID]);

    React.useEffect(() => {
        if (meterID <= 0)
            localStorage.setItem('NewMeterWizard.MeterInfo', JSON.stringify(meterInfo));
    }, [meterInfo]);

    React.useEffect(() => {
        if (meterID <= 0)
            localStorage.setItem('NewMeterWizard.LocationInfo', JSON.stringify(locationInfo));
    }, [locationInfo]);

    React.useEffect(() => {
        if (meterID <= 0)
            localStorage.setItem('NewMeterWizard.Channels', JSON.stringify(channels));
    }, [channels]);

    React.useEffect(() => {
        if (meterID <= 0)
            localStorage.setItem('NewMeterWizard.Assets', JSON.stringify(assets));
        else
            setLines(assets.filter((asset) => asset.AssetType == 'Line'));
    }, [assets]);

    React.useEffect(() => {
        if (meterID <= 0)
            localStorage.setItem('NewMeterWizard.AssetConnections', JSON.stringify(assetConnections));
    }, [assetConnections]);

    function returnToMeters() {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meters' });
    }

    function getCurrentStep(): number {
        if (localStorage.hasOwnProperty('NewMeterWizard.CurrentStep'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.CurrentStep'))
        else
            return 1
    }

    function getMeterID(): number {
        if (localStorage.hasOwnProperty('NewMeterWizard.MeterID'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.MeterID'))
        else
            return 0
    }

    function getMeterInfo(): OpenXDA.Types.Meter {
        if (localStorage.hasOwnProperty('NewMeterWizard.MeterInfo'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.MeterInfo'));
        else
            return {
                ID: 0,
                AssetKey: null,
                Name: null,
                ShortName: null,
                Alias: null,
                Make: null,
                Model: null,
                TimeZone: "UTC",
                Description: null,
                LocationID: 0
            }
    }

    function getLocationInfo(): OpenXDA.Types.Location {
        if (localStorage.hasOwnProperty('NewMeterWizard.LocationInfo'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.LocationInfo'));
        else
            return {
                ID: 0,
                LocationKey: null,
                Name: null,
                Alias: null,
                ShortName: null,
                Latitude: 0,
                Longitude: 0,
                Description: null,
            }
    }

    function getChannels(): Array<OpenXDA.Types.Channel> {
        if (localStorage.hasOwnProperty('NewMeterWizard.Channels'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.Channels'));
        else
            return [];
    }

    function getAssets(): Array<OpenXDA.Types.Breaker | OpenXDA.Types.Bus | OpenXDA.Types.CapBank | OpenXDA.Types.Line | OpenXDA.Types.Transformer>
    {
        if (localStorage.hasOwnProperty('NewMeterWizard.Assets'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));
        else
            return [];
    }

    function getAssetConnections(): Array<OpenXDA.Types.AssetConnection> {
        if (localStorage.hasOwnProperty('NewMeterWizard.AssetConnections'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.AssetConnections'));
        else
            return [];
    }

    function isFinalStep(): boolean {
        return currentStep === ((lines ?? []).length > 0 ? finalStep : finalStepNoLine);
    }

    function isSubmitStep(): boolean {
        return currentStep === ((assets ?? []).length > 0 ? saveStep : saveStepNoAsset);
    }

    function addNewMeter() {
        setStatus('loading');
        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Meter/New`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                MeterInfo: meterInfo,
                LocationInfo: locationInfo,
                Channels: channels,
                Assets: assets,
                AssetConnections: assetConnections
            }),
            dataType: 'json',
            cache: true,
            async: true
        }).done((meterID) => {
            clearLocalStorage();
            setStatus('idle');
            setMeterID(meterID);
            next();
        }).fail(msg => {
            setStatus('idle');
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        };
    }

    function loadAssetsFromServer(meterID: number): JQuery.jqXHR<OpenXDA.Types.Asset[]> {
        setStatus('loading');
        let handle = $.ajax({
            type: 'POST',
            url: `${homePath}api/OpenXDA/ByAsset/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{ FieldName: "ID", Operator: "in", SearchText: `(SELECT AssetID FROM MeterAsset WHERE MeterID = ${meterID})`, Type: 'number', isPivotColumn: false }],
                OrderBy: "ID",
                Ascending: "true"
            }),
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done((data) => {
            setAssets(JSON.parse(data.toString()));
            setStatus('idle');
        }).fail(() => {
            setStatus('error');
        });
        return handle;
    }

    function next() {
        if (disableNext())
            return;
        setError([]);
        setWarning([]);
        // Make sure currentStep is set to something reasonable
        if (isSubmitStep())
            setCurrentStep(saveStep + 1);
        else if (currentStep >= finalStep)
           setCurrentStep(finalStep);
        else
            setCurrentStep(currentStep + 1);

        if (isFinalStep())
            clearData();
    }

    function prev() {
        setError([]);
        setWarning([]);
        if (currentStep == saveStep + 1) return;
        if (currentStep <= 1) {
            setCurrentStep(1);
        } else {
            setCurrentStep(currentStep - 1);
        }

        localStorage.setItem('NewMeterWizard.CurrentStep', currentStep.toString())
    }

    function clearData(): void {
        clearLocalStorage();

        setMeterInfo(getMeterInfo());
        setLocationInfo(getLocationInfo());
        setChannels(getChannels());
        setCurrentStep(getCurrentStep());
        setAssets(getAssets());

        //Take us back to meter page when done
        if (currentStep > saveStep)
            returnToMeters();
    }

    function clearLocalStorage() {
        if (localStorage.hasOwnProperty('NewMeterWizard.MeterInfo'))
            localStorage.removeItem('NewMeterWizard.MeterInfo')
        if (localStorage.hasOwnProperty('NewMeterWizard.LocationInfo'))
            localStorage.removeItem('NewMeterWizard.LocationInfo')
        if (localStorage.hasOwnProperty('NewMeterWizard.Channels'))
            localStorage.removeItem('NewMeterWizard.Channels')
        if (localStorage.hasOwnProperty('NewMeterWizard.Assets'))
            localStorage.removeItem('NewMeterWizard.Assets')
        if (localStorage.hasOwnProperty('NewMeterWizard.AssetConnections'))
            localStorage.removeItem('NewMeterWizard.AssetConnections')
        if (localStorage.hasOwnProperty('NewMeterWizard.CurrentStep'))
            localStorage.removeItem('NewMeterWizard.CurrentStep')
        if (localStorage.hasOwnProperty('NewMeterWizard.MeterID'))
            localStorage.removeItem('NewMeterWizard.MeterID')
        if (localStorage.hasOwnProperty(assetPageID))
            localStorage.removeItem(assetPageID)
    }

    function getHeader(): string {
        switch (currentStep) {
            case generalStep:
                return `Step ${generalStep}: General information about the new meter`;
            case locationStep:
                return `Step ${locationStep}: Substation information for the new meter`;
            case eventChannelsStep:
                return `Step ${eventChannelsStep}: Populate event channels for the new meter`;
            case trendChannelsStep:
                return `Step ${trendChannelsStep}: Populate trend channels for the new meter`;
            case assetStep:
                return `Step ${assetStep}: Populate assets monitored by the new meter`;
            case connectionStep:
                return `Step ${connectionStep}: Add connection between the assets that are monitored by the new meter`;
            case additionalFieldMeterStep:
                return `Step ${additionalFieldMeterStep}: Edit the new meter's additional fields that are not from external databases`;
            case externalFieldStep:
                return `Step ${externalFieldStep}: Import data from external DB's for the new meter's additional fields`;
            case lineSegmentStep:
                return `Step ${lineSegmentStep}: Add line segments for each new line asset`;
            case additionalFieldAssetStep:
                return `Step ${additionalFieldAssetStep}: Edit the additional fields for each asset monitored by the new meter`;
            case customerAssetGroupMeterStep:
                return `Step ${customerAssetGroupMeterStep}: Assign the new meter to asset groups and customers`;
            case customerAssetGroupAssetStep:
                return `Step ${customerAssetGroupAssetStep}: Assign the new asset(s) to asset groups and customers`;
            default:
                return `Error, no page found for step #${currentStep}`;
        }
    }

    function getPage() {
        if (status === 'error')
            return (
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                    </div>
                </div>);
        switch (currentStep) {
            case generalStep:
                return <MeterInfoPage MeterInfo={meterInfo} UpdateMeterInfo={setMeterInfo} SetError={setError} />
            case locationStep:
                return <LocationPage LocationInfo={locationInfo} UpdateLocationInfo={setLocationInfo} SetError={(e) => { setError(e) }} SetWarning={setWarning} />
            case eventChannelsStep:
                // The uses the same page as the next step for now
            case trendChannelsStep:
                return <ChannelPage MeterKey={meterInfo.AssetKey} Channels={channels} UpdateChannels={setChannels} UpdateAssets={setAssets} SetError={setError} SetWarning={setWarning} TrendChannels={currentStep == 4} />
            case assetStep:
                return <AssetPage AssetConnections={assetConnections} Location={locationInfo} Channels={channels} Assets={assets} UpdateChannels={setChannels} UpdateAssets={setAssets} UpdateAssetConnections={setAssetConnections} SetWarning={setWarning} PageID={assetPageID} />
            case connectionStep:
                return <MultipleAssetsPage Assets={assets.filter(asset => asset.AssetType != 'LineSegment')} GetInnerComponent={(currentAsset) => <ConnectionPage AllAssets={assets} CurrentAsset={currentAsset} AssetConnections={assetConnections} UpdateAssetConnections={setAssetConnections} />} />
            case additionalFieldMeterStep:
                return <AdditionalFieldsWindow ID={meterID} Type='Meter' HideExternal={true} InnerOnly={true} />
            case externalFieldStep:
                return <ExternalDBUpdate ID={meterID} Type='Meter' InnerOnly={true} />
            case lineSegmentStep:
                return <MultipleAssetsPage Assets={lines} GetInnerComponent={(currentAsset) => <LineSegmentWindow ID={currentAsset.ID} InnerOnly={true} />} />
            case additionalFieldAssetStep:
                return <MultipleAssetsPage Assets={assets} GetInnerComponent={(currentAsset) => <AdditionalFieldsWindow ID={currentAsset.ID} Type='Asset' InnerOnly={true} HideExternal={true} />}/>
            case customerAssetGroupMeterStep:
                return <CustomerAssetGroupPage ID={meterID} Type={'Meter'} Name={meterInfo.AssetKey} SetWarning={setWarning} />
            case customerAssetGroupAssetStep:
                return <MultipleAssetsPage Assets={assets} Style={{width: '30%'}} GetInnerComponent={(currentAsset) => <CustomerAssetGroupPage ID={currentAsset.ID} Type={'Asset'} Name={currentAsset.AssetKey} SetWarning={setWarning} />} />
        }
    };

    function getNextButton() {
        if (isSubmitStep())
            return (<button className="btn btn-success pull-right" onClick={() => setShowSubmit(true)}>Create Meter</button>);
        else
            return (
                <button className={"btn btn-success pull-right" + (disableNext() ? ' disabled' : '')} onClick={next}
                    data-tooltip='Next' onMouseEnter={() => setHover('Next')} onMouseLeave={() => setHover('None')}
                >{isFinalStep() ? 'Finish Editing' : 'Next'}</button>);
    };
    
    function disableNext() { return error.length > 0 };

    return (
        <div style={{padding: 10, height: 'inherit', overflowY: 'hidden'}}>
            <h2>New Meter Wizard</h2>
            <hr />
            <div className="card" style={{ height: 'calc(100% - 75px)' }}>
                <LoadingScreen Show={status === 'loading'} />
                <div className="card-header">
                    <button className="btn btn-primary pull-right" onClick={clearData} >{(currentStep > saveStep) ? "Close Wizard" : "Clear Data"}</button>
                    <h4 style={{width: '90%'}}>{getHeader()}</h4>
                </div>
                <div className="card-body" style={{maxHeight: 'calc(100% - 126px)'}}>
                    {getPage()}
                </div>
                <div className="card-footer">
                    {currentStep > 1 && currentStep !== saveStep + 1 ? <button className="btn btn-danger pull-left" onClick={prev}
                        data-tooltip='Prev' onMouseEnter={() => setHover('Prev')} onMouseLeave={() => setHover('None')}
                    >Prev</button> : null}
                    {getNextButton()}
                    <div className="col-1 pull-right" id={portalID} />
                </div>
                <ToolTip Show={hover == 'Next' && (warning.length > 0 || error.length > 0)} Position={'top'} Theme={'dark'} Target={"Next"}>
                    {error.map((item, index) => <p key={index}> {CrossMark} {item} </p>)}
                    {warning.map((item, index) => <p key={index + 'w'}> {WarningSymbol} {item} </p>)}
                </ToolTip>
                <ToolTip Show={hover == 'Prev' && currentStep === saveStep + 1} Position={'top'} Theme={'dark'} Target={"Prev"}>
                    <p> {CrossMark} Cannot Return to Steps before Submission </p>
                </ToolTip>
            </div>
            <Warning Title="Submit Meter" Message="Submit and Save Meter? Submission required to continue setup..." Show={showSubmit} CallBack={(confirmed) => {
                setShowSubmit(false);
                if (confirmed)
                    addNewMeter();
            }} />
        </div>
    );
}
