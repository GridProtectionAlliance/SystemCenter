//******************************************************************************************************
//  Store.ts - Gbtc
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
//  10/20/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { configureStore } from '@reduxjs/toolkit';
import CompanyTypeReducer from '../Company/CompanyTypeSlice';
import ValueListReducer from './ValueListSlice';
import MeasurementTypeReducer from './MeasurementTypeSlice';
import PhaseReducer from './PhaseSlice';
import AssetTypeReducer from './AssetTypeSlice';
import AssetConnectionTypeReducer from './AssetConnectionTypeSlice';
import MeterReducer from './MeterSlice';
import LocationReducer from './LocationSlice';
import AssetReducer from './AssetSlice';
import GenericSlice from './GenericSlice'
import { SystemCenter } from '../global';

export const ValueListGroupSlice = new GenericSlice<SystemCenter.ValueListGroup>('ValueListGroup');
export const ValueListSlice = new GenericSlice<SystemCenter.ValueListItem>('ValueList');
export const LocationDrawingSlice = new GenericSlice<SystemCenter.LocationDrawing>('LocationDrawing');

export default configureStore({
    reducer: {
        CompanyType: CompanyTypeReducer,
        //ValueList: ValueListReducer,
        MeasurementType: MeasurementTypeReducer,
        Phase: PhaseReducer,
        AssetType: AssetTypeReducer,
        AssetConnectionType: AssetConnectionTypeReducer,
        Meter: MeterReducer,
        Asset: AssetReducer,
        Location: LocationReducer,
        ValueListGroup: ValueListGroupSlice.Reducer,
        ValueList: ValueListSlice.Reducer,
        LocationDrawing: LocationDrawingSlice.Reducer
    }
});