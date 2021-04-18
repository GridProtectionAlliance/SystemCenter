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
import { OpenXDA } from '../global';
import { useDispatch, useSelector } from 'react-redux';
import { SelectMeterKeysLowerCase, SelectMeterStatus, FetchMeter } from '../Store/MeterSlice';
import { SelectLocationKeysLowerCase, SelectLocationStatus, FetchLocation } from '../Store/LocationSlice';

import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import { ToolTip } from '@gpa-gemstone/react-interactive';

export interface AssetLists {
    Breakers: Array<OpenXDA.Breaker>,
    Buses: Array<OpenXDA.Breaker>,
    CapBanks: Array<OpenXDA.CapBank>,
    Lines: Array<OpenXDA.Line>,
    Transformers: Array<OpenXDA.Transformer>
}

export default function NewMeterWizard(props: {}) {
    const dispatch = useDispatch();

    const meterKeys = useSelector(SelectMeterKeysLowerCase);
    const mStatus = useSelector(SelectMeterStatus);
    const locationKeys = useSelector(SelectLocationKeysLowerCase);
    const lStatus = useSelector(SelectLocationStatus);

    const [currentStep, setCurrentStep] = React.useState<number>(getCurrentStep());
    const [meterInfo, setMeterInfo] = React.useState<OpenXDA.Meter>(getMeterInfo());
    const [locationInfo, setLocationInfo] = React.useState<OpenXDA.Location>(getLocationInfo());
    const [channels, setChannels] = React.useState<OpenXDA.Channel[]>(getChannels());
    const [assets, setAssets] = React.useState<OpenXDA.Asset[]>(getAssets());
    const [assetConnections, setAssetConnections] = React.useState<OpenXDA.AssetConnection[]>(getAssetConnections());

    const [error, setError] = React.useState<string[]>([]);
    const [hoverNext, setHoverNext] = React.useState<boolean>(false);
    

    React.useEffect(() => {
        if (mStatus === 'unintiated' || mStatus === 'changed') {
            dispatch(FetchMeter());
            return function () {
            }
        }
    }, [dispatch, mStatus]);

    React.useEffect(() => {
        if (lStatus === 'unintiated' || lStatus === 'changed') {
            dispatch(FetchLocation());
            return function () {
            }
        }
    }, [dispatch, lStatus]);

    React.useEffect(() => {
        localStorage.setItem('NewMeterWizard.CurrentStep', currentStep.toString())
    }, [currentStep]);

    React.useEffect(() => {
        return () => {
            sessionStorage.clear();
        }
    }, []);

    

    React.useEffect(() => {
        localStorage.setItem('NewMeterWizard.MeterInfo', JSON.stringify(meterInfo));
    }, [meterInfo]);
    React.useEffect(() => {
        localStorage.setItem('NewMeterWizard.LocationInfo', JSON.stringify(locationInfo));
    }, [ locationInfo]);
    React.useEffect(() => {
        localStorage.setItem('NewMeterWizard.Channels', JSON.stringify(channels));
    }, [channels]);
    React.useEffect(() => {
        localStorage.setItem('NewMeterWizard.Assets', JSON.stringify(assets));
    }, [assets]);
    React.useEffect(() => {
        localStorage.setItem('NewMeterWizard.AssetConnections', JSON.stringify(assetConnections));
    }, [ assetConnections]);

    function getCurrentStep(): number {
        if (localStorage.hasOwnProperty('NewMeterWizard.CurrentStep'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.CurrentStep'))
        else
            return 1

    }

    function getMeterInfo(): OpenXDA.Meter {
        if (localStorage.hasOwnProperty('NewMeterWizard.MeterInfo'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.MeterInfo'))
        else
            return {
                ID: 0,
                AssetKey: null,
                Name: null,
                ShortName: null,
                Alias: null,
                Make: null,
                Model: null,
                TimeZone: null,
                Description: null,
                LocationID: 0
            }
    }

    function getLocationInfo(): OpenXDA.Location {
        if (localStorage.hasOwnProperty('NewMeterWizard.LocationInfo'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.LocationInfo'))
        else
            return {
                ID: 0,
                LocationKey: null,
                Name: null,
                Alias: null,
                ShortName: null,
                Latitude: null,
                Longitude: null,
                Description: null,
            }
    }

    function getChannels(): Array<OpenXDA.Channel> {
        if (localStorage.hasOwnProperty('NewMeterWizard.Channels'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.Channels'))
        else
            return [];
    }

    function getAssets(): Array<OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.Transformer>
    {
        if (localStorage.hasOwnProperty('NewMeterWizard.Assets'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.Assets'))
        else
            return [];
    }

    function getAssetConnections(): Array<OpenXDA.AssetConnection> {
        if (localStorage.hasOwnProperty('NewMeterWizard.AssetConnections'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.AssetConnections'))
        else
            return [];
    }

    function addNewMeter(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();

        $.ajax({
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
        }).done(() => {
            clearData();
            window.location.href = homePath + 'index.cshtml?name=Meters';
        }).fail(msg => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                clearData();
                window.location.href = homePath + 'index.cshtml?name=Meters';
            }
        });
    }

    function next() {
        if (disableNext())
            return;
        setError([]);
        // Make sure currentStep is set to something reasonable
        if (currentStep >= 4) {
           setCurrentStep(5);
        } else {
            setCurrentStep(currentStep + 1);
        }

    }

    function prev() {
        setError([]);
        if (currentStep <= 1) {
            setCurrentStep(1);
        } else {
            setCurrentStep(currentStep - 1);
        }

        localStorage.setItem('NewMeterWizard.CurrentStep', currentStep.toString())
    }


    function clearData(): void {
        clearLocalStorage();
        sessionStorage.clear();

        setMeterInfo(getMeterInfo());
        setLocationInfo(getLocationInfo());
        setChannels(getChannels());
        setCurrentStep(getCurrentStep());
        setAssets(getAssets());
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
    }

    function getHeader(): string {
        if(currentStep == 1)
            return "Step 1: General information about the new meter"
        else if (currentStep == 2)
            return "Step 2: Substation information for the new meter"
        else if (currentStep == 3)
            return "Step 3: Populate channels for the new meter"
        else if (currentStep == 4)
            return "Step 4: Populate assets monitored by the new meter"
        else if (currentStep == 5)
            return "Step 5: Add connection between the assets that are monitored by the new meter"

    }

    function getPage() {
        if (currentStep == 1)
            return <Page1 MeterInfo={meterInfo} UpdateMeterInfo={setMeterInfo} SetError={setError} />
        else if (currentStep == 2)
            return <Page2 LocationInfo={locationInfo} UpdateLocationInfo={setLocationInfo} SetError={(e) => { setError(e) }}/>
        else if (currentStep == 3)
            return <Page3 MeterKey={meterInfo.AssetKey} Channels={channels} UpdateChannels={setChannels} UpdateAssets={setAssets} SetError={setError}/>
        else if (currentStep == 4)
            return <Page4 AssetConnections={assetConnections} Channels={channels} Assets={assets} UpdateChannels={setChannels} UpdateAssets={setAssets} UpdateAssetConnections={setAssetConnections} SetError={setError}/>
        else if (currentStep == 5)
            return <Page5 Assets={assets} AssetConnections={assetConnections} UpdateAssetConnections={setAssetConnections} />

    }

    function disableNext(): boolean {
        if (currentStep == 1) {
            return error.length > 0
        }
        else if (currentStep == 2) {
            return error.length > 0
        }
        else if (currentStep == 3)
            return channels.length == 0;
        else if (currentStep == 4)
            return assets.length == 0;


        return true;
    }

    return (
        <div style={{padding: 10, height: 'inherit', overflowY: 'hidden'}}>
            <h2>New Meter Wizard</h2>
            <hr/>
            <div className="card" style={{height: 'calc(100% - 75px)'}}>
                <div className="card-header">
                    <button className="btn btn-primary pull-right" onClick={clearData} >Clear Data</button>
                    <h4 style={{width: '90%'}}>{getHeader()}</h4>
                </div>
                <div className="card-body" style={{maxHeight: 'calc(100% - 126px)'}}>
                    {getPage()}
                </div>
                <div className="card-footer">
                    {currentStep > 1 ? <button className="btn btn-danger pull-left" onClick={prev}>Prev</button> : null}
                    {currentStep < 5 ? <button className={"btn btn-success pull-right" + (disableNext() ? ' disabled' : '')} onClick={next}
                        data-tooltip='Next' onMouseEnter={() => setHoverNext(true)} onMouseLeave={() => setHoverNext(false)}
                    >Next</button> : null}
                    <button className="btn btn-success pull-right" onClick={addNewMeter} hidden={currentStep < 5}>Submit</button>
                </div>
                <ToolTip Show={hoverNext && error.length > 0} Position={'top'} Theme={'dark'} Target={"Next"}>
                    {error.map((item, index) => <p key={index}> {ErrorSymbol()} {item} </p>)}
                </ToolTip>
            </div>

        </div>
    );
}

const ErrorSymbol = () => <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i>
