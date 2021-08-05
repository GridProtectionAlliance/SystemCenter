//******************************************************************************************************
//  MeterSlice.ts - Gbtc
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
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';

export const FetchMeter = createAsyncThunk('Meter/FetchMeter', async (_, { dispatch }) => {
    return await GetMeter();
});

export const MeterSlice = createSlice({
    name: 'Meter',
    initialState: {
        Status: 'unintiated' as Application.Types.Status,
        Error: null,
        Data: [] as OpenXDA.Types.Meter[]
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(FetchMeter.fulfilled, (state, action) => {
            state.Status = 'idle';
            state.Error = null;
            state.Data = action.payload;//.sort((a, b) => a.Name - b.Name);
        });
        builder.addCase(FetchMeter.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(FetchMeter.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;
        });

    }

});

export const { } = MeterSlice.actions;
export default MeterSlice.reducer;
export const SelectMeters = (state) => state.Meter.Data as OpenXDA.Types.Meter[];
export const SelectMeterStatus = (state) => state.Meter.Status as Application.Types.Status;
export const SelectMeterKeysLowerCase = (state) => state.Meter.Data.map(a => a.AssetKey.toLowerCase()) as string[];

function GetMeter(): JQuery.jqXHR<OpenXDA.Types.Meter[]> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/Meter`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}