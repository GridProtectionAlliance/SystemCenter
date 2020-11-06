//******************************************************************************************************
//  Page1.tsx - Gbtc
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
import FormInput from '../CommonComponents/FormInput';
import AssetAttributes from '../AssetAttribute/Asset';
import FormTextArea from '../CommonComponents/FormTextArea';
import { useDispatch, useSelector } from 'react-redux';
import { SelectLocations, SelectLocationStatus, FetchLocation } from '../Store/LocationSlice';

export default function Page2(props: { LocationInfo: OpenXDA.Location, UpdateLocationInfo: (record: OpenXDA.Location) => void }) {
    const dispatch = useDispatch();
    const locations = useSelector(SelectLocations);
    const lStatus = useSelector(SelectLocationStatus);

    React.useEffect(() => {
        if (lStatus === 'unintiated' || lStatus === 'changed') {
            dispatch(FetchLocation());
            return function () {
                //if (tzStatus == 'loading') promise.abort();
            }
        }
    }, [dispatch, lStatus]);


    function getDifferentMeterLocation(meterLocationID: number): void {
        props.UpdateLocationInfo(locations.find((value, index, object) => value.ID == meterLocationID));
    }

    function valid(field: keyof (OpenXDA.Location)): boolean {
        if (field == 'LocationKey') {
            if (props.LocationInfo.LocationKey == null || props.LocationInfo.LocationKey.length == 0 || props.LocationInfo.LocationKey.length > 50) return false;
            else if (props.LocationInfo.ID == 0)
                return locations.find(locs => locs.LocationKey.toLowerCase() == props.LocationInfo.LocationKey.toLowerCase()) == null;
            else
                return true;
        }
        else if (field == 'Name')
            return props.LocationInfo.Name != null && props.LocationInfo.Name.length > 0 && props.LocationInfo.Name.length <= 200;
        else if (field == 'Alias')
            return props.LocationInfo.Alias == null || props.LocationInfo.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.LocationInfo.ShortName == null || props.LocationInfo.ShortName.length <= 50;
        else if (field == 'Latitude')
            return props.LocationInfo.Latitude != null && AssetAttributes.isRealNumber(props.LocationInfo.Latitude);
        else if (field == 'Longitude')
            return props.LocationInfo.Longitude != null && AssetAttributes.isRealNumber(props.LocationInfo.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }



       return (
            <div className="row">
                <div className="col">
                    <div className="form-group">

                        <label>Select Location</label>
                        <select className="form-control" value={props.LocationInfo.ID == null ? '0' : props.LocationInfo.ID} onChange={(evt) => {
                            if (evt.target.value != "0")
                                getDifferentMeterLocation(parseInt(evt.target.value));
                            else
                                props.UpdateLocationInfo({
                                        ID: 0,
                                        LocationKey: '',
                                        Name: '',
                                        Alias: '',
                                        ShortName: '',
                                        Latitude: 0,
                                        Longitude: 0,
                                        Description: '',
                                });
                        }}>
                            <option value="0">Add New</option>
                            {
                                (locations != null ? locations.map(ml => <option value={ml.ID} key={ml.ID}>{ml.LocationKey}</option>) : null)
                            }

                        </select>
                    </div>
                   <FormInput<OpenXDA.Location> Record={props.LocationInfo} Field='LocationKey' Label='Key' Setter={props.UpdateLocationInfo} Valid={valid} Feedback='A unique Key is required and must be less than 50 characters.' Disabled={props.LocationInfo.ID != 0}/>
                   <FormInput<OpenXDA.Location> Record={props.LocationInfo} Field='Name' Setter={props.UpdateLocationInfo} Valid={valid} Feedback='Name is required and must be less than 200 characters.' Disabled={props.LocationInfo.ID != 0}/>
                   <FormInput<OpenXDA.Location> Record={props.LocationInfo} Field='ShortName' Label='Short Name' Setter={props.UpdateLocationInfo} Valid={valid} Feedback='Short Name must be less than 50 characters.' Disabled={props.LocationInfo.ID != 0}/>
                </div>
                <div className="col">
                   <FormInput<OpenXDA.Location> Record={props.LocationInfo} Field='Alias' Setter={props.UpdateLocationInfo}Valid={valid} Feedback='Alias must be less than 200 characters.' Disabled={props.LocationInfo.ID != 0}/>
                   <FormInput<OpenXDA.Location> Record={props.LocationInfo} Field='Latitude' Setter={props.UpdateLocationInfo} Valid={valid} Feedback='Latitude is a required numeric field.' Disabled={props.LocationInfo.ID != 0}/>
                   <FormInput<OpenXDA.Location> Record={props.LocationInfo} Field='Longitude' Setter={props.UpdateLocationInfo} Valid={valid} Feedback='Longitude is a required numeric field.' Disabled={props.LocationInfo.ID != 0}/>
                   <FormTextArea<OpenXDA.Location> Rows={3} Record={props.LocationInfo} Field='Description' Setter={props.UpdateLocationInfo} Valid={valid} Feedback='' Disabled={props.LocationInfo.ID != 0}/>
                </div>
            </div>
        );

}

