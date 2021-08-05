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
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { useDispatch, useSelector } from 'react-redux';
import { SelectMeterKeysLowerCase, SelectMeterStatus, FetchMeter } from '../Store/MeterSlice';
import MeterProperties from '../Meter/PropertyUI/MeterProperties';

declare var homePath: string;

export default function Page1(props: { MeterInfo: OpenXDA.Types.Meter, UpdateMeterInfo: (record: OpenXDA.Types.Meter) => void , SetError: (e: string[]) => void}) {
    const dispatch = useDispatch();
    const meterKeys = useSelector(SelectMeterKeysLowerCase);
    const mStatus = useSelector(SelectMeterStatus);

    React.useEffect(() => {
        if (mStatus === 'unintiated' || mStatus === 'changed') {
            dispatch(FetchMeter());
            return function () {
            }
        }
    }, [dispatch, mStatus]);

    

    React.useEffect(() => {
        const error = [];
        if (!valid('AssetKey'))
            error.push('A unique AssetKey of less than 50 characters is required.');
    
        if (!valid('Name'))
            error.push('Name must be less than 200 characters and is required.');
    
        if (!valid('ShortName'))
            error.push('ShortName must be less than 50 characters.');

        if (!valid('Alias'))
            error.push('Alias must be less than 200 characters.');
        if (!valid('Make'))
            error.push('Make must be less than 200 characters.');
        if (!valid('Model'))
            error.push('Model must be less than 200 characters.');

        props.SetError(error);
    }, [props.MeterInfo, meterKeys])

    function valid(field: keyof (OpenXDA.Types.Meter)): boolean {
        if (field == 'AssetKey')
            return props.MeterInfo.AssetKey != null && meterKeys.indexOf(props.MeterInfo.AssetKey.toLowerCase()) < 0 &&props.MeterInfo.AssetKey.length > 0 && props.MeterInfo.AssetKey.length <= 50;
        else if (field == 'Name')
            return props.MeterInfo.Name != null && props.MeterInfo.Name.length > 0 && props.MeterInfo.Name.length <= 200;
        else if (field == 'Alias')
            return props.MeterInfo.Alias == null || props.MeterInfo.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.MeterInfo.ShortName == null || props.MeterInfo.ShortName.length <= 50;
        else if (field == 'Make')
            return props.MeterInfo.Make != null && props.MeterInfo.Make.length > 0 && props.MeterInfo.Make.length <= 200;
        else if (field == 'Model')
            return props.MeterInfo.Model != null && props.MeterInfo.Model.length > 0 && props.MeterInfo.Model.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }


    return (
        <MeterProperties Meter={props.MeterInfo} StateSetter={props.UpdateMeterInfo} />
        );

}

