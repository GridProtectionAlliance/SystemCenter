//******************************************************************************************************
//  MeasurementTypeSlice.ts - Gbtc
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
//  11/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SystemCenter, OpenXDA } from '../global';

export const FetchMeasurementType = createAsyncThunk('MeasurementType/FetchMeasurementType', async (_, { dispatch }) => {
    return await GetMeasurementType();
});

export const MeasurementTypeSlice = createSlice({
    name: 'MeasurementType',
    initialState: {
        Status: 'unintiated',
        Error: null,
        Data: []
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(FetchMeasurementType.fulfilled, (state, action) => {
            state.Status = 'idle';
            state.Error = null;
            state.Data = action.payload;//.sort((a, b) => a.Name - b.Name);
        });
        builder.addCase(FetchMeasurementType.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(FetchMeasurementType.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;
        });

    }

});

export const { } = MeasurementTypeSlice.actions;
export default MeasurementTypeSlice.reducer;
export const SelectMeasurementTypes = (state) => state.MeasurementType.Data;
export const SelectMeasurementTypeStatus = (state) => state.MeasurementType.Status;

function GetMeasurementType(): JQuery.jqXHR<OpenXDA.MeasurementType[]> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/MeasurementType`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}