//******************************************************************************************************
//  PhaseSlice.ts - Gbtc
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

export const FetchPhase = createAsyncThunk('Phase/FetchPhase', async (_, { dispatch }) => {
    return await GetPhase();
});

export const PhaseSlice = createSlice({
    name: 'Phase',
    initialState: {
        Status: 'unintiated',
        Error: null,
        Data: []
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(FetchPhase.fulfilled, (state, action) => {
            state.Status = 'idle';
            state.Error = null;
            state.Data = action.payload;//.sort((a, b) => a.Name - b.Name);
        });
        builder.addCase(FetchPhase.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(FetchPhase.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;
        });

    }

});

export const { } = PhaseSlice.actions;
export default PhaseSlice.reducer;
export const SelectPhases = (state) => state.Phase.Data;
export const SelectPhaseStatus = (state) => state.Phase.Status;

function GetPhase(): JQuery.jqXHR<OpenXDA.Phase[]> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/Phase`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}