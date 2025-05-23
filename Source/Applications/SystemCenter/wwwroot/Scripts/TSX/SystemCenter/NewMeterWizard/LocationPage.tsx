﻿//******************************************************************************************************
//  LocationPage.tsx - Gbtc
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
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { useAppDispatch, useAppSelector } from '../hooks';
import { LocationSlice } from '../Store/Store';
import MeterLocationProperties from '../Meter/PropertyUI/MeterLocationProperties';
import { Search } from '@gpa-gemstone/react-interactive';

interface IProps {
    LocationInfo: OpenXDA.Types.Location,
    UpdateLocationInfo: (record: OpenXDA.Types.Location) => void,
    SetError: (e: string[]) => void,
    SetWarning: (e: string[]) => void
}

export default function LocationPage(props: IProps) {
    const dispatch = useAppDispatch();
    const locations = useAppSelector(LocationSlice.Data);
    const lStatus = useAppSelector(LocationSlice.Status);

    React.useEffect(() => {
        if (lStatus === 'unintiated' || lStatus === 'changed') {
            dispatch(LocationSlice.Fetch());
        }
    }, []);

    React.useEffect(() => {
        const error = [];

        if (props.LocationInfo.LocationKey == null || props.LocationInfo.LocationKey.length == 0 || props.LocationInfo.LocationKey.length > 50)
            error.push('A Key of less than 50 characters is required.')
        else if (props.LocationInfo.ID == 0 && locations.find(locs => locs.LocationKey.toLowerCase() == props.LocationInfo.LocationKey.toLowerCase()) != null)
            error.push('Key must be unique.');
        if (props.LocationInfo.Name == null || props.LocationInfo.Name.length == 0 || props.LocationInfo.Name.length > 200)
            error.push('A Name of less than 200 characters is required.');
        if (props.LocationInfo.ShortName != null && props.LocationInfo.ShortName.length > 50)
            error.push('Short Name must be less than 50 characters.');
        if (props.LocationInfo.Alias != null && props.LocationInfo.Alias.length >200)
            error.push('Alias must be less than 200 characters.');
        if (props.LocationInfo.Latitude == null || !AssetAttributes.isRealNumber(props.LocationInfo.Latitude))
            error.push('Latitude is required.')
        if (props.LocationInfo.Longitude == null || !AssetAttributes.isRealNumber(props.LocationInfo.Longitude))
            error.push('Longitude is required.')
        if (props.LocationInfo.Latitude != null && AssetAttributes.isRealNumber(props.LocationInfo.Latitude) && (props.LocationInfo.Latitude > 180 || props.LocationInfo.Latitude < -180)) 
            error.push('Latitude must be between -180 and 180.')
        if (props.LocationInfo.Longitude != null && AssetAttributes.isRealNumber(props.LocationInfo.Longitude) && (props.LocationInfo.Longitude > 180 || props.LocationInfo.Longitude < -180))
            error.push('Longitude must be between -180 and 180.')

        props.SetError(error);
    }, [props.LocationInfo]);

    function getDifferentMeterLocation(meterLocationID: number): void {
        props.UpdateLocationInfo(locations.find((value, index, object) => value.ID == meterLocationID));
    }

    function setLocationFilter(meterLocationID: number) {
        const location = locations.find((value) => value.ID == meterLocationID);
        const locationFilter = {
            FieldName: "Location",
            SearchText: `${location.LocationKey}`,
            Operator: "LIKE",
            Type: "string",
            IsPivotColumn: false
        }
        const localFilters: Search.IFilter<SystemCenter.Types.DetailedAsset>[] =
            JSON.parse(localStorage.getItem(`NewMeterWizard.AssetPage.Filters`) ?? '[]');

        localStorage.setItem(`NewMeterWizard.AssetPage.Filters`, JSON.stringify([locationFilter, ...localFilters.filter(f => f.FieldName != "Location")]));
    }

    return (
        <MeterLocationProperties Meter={{ LocationID: props.LocationInfo.ID == null ? '0' : props.LocationInfo.ID } as OpenXDA.Types.Meter} Location={props.LocationInfo} SetLocation={props.UpdateLocationInfo}
            UpdateMeter={(m) => {
                if (m.LocationID != 0 && m.LocationID != null) {
                    getDifferentMeterLocation(m.LocationID);
                    setLocationFilter(m.LocationID);
                }
                else
                    props.UpdateLocationInfo({
                        ID: 0,
                        LocationKey: '',
                        Name: '',
                        Alias: '',
                        ShortName: '',
                        Latitude: null,
                        Longitude: null,
                        Description: '',
                    });
            }}
            Locationlist={locations != null ? locations : []} DisableLocation={props.LocationInfo.ID != 0} />
         
        );

}

