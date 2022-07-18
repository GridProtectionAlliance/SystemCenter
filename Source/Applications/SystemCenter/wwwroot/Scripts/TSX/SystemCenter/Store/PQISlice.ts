//******************************************************************************************************
//  PQISlice.ts - Gbtc
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
//  07/18/2022 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Application, PQI } from '@gpa-gemstone/application-typings';

let fetchHandle: JQuery.jqXHR<any> | null;

export const FetchPQIFacilities = createAsyncThunk('PQI/FetchFacilities', async (_, { signal }) => {
    if (fetchHandle != null && fetchHandle.abort != null)
        fetchHandle.abort('Prev');

    const handle = FetchFacilites();
    fetchHandle = handle;

    return await handle;
});

export const PQISlice = createSlice({
    name: 'PQI',
    initialState: {
        Status: 'unintiated' as Application.Types.Status,
        Error: null,
        Facilities: [] as PQI.Types.Facility[]
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(FetchPQIFacilities.fulfilled, (state, action) => {
            state.Status = 'idle';
            state.Error = null;
            state.Facilities = action.payload;
        });
        builder.addCase(FetchPQIFacilities.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(FetchPQIFacilities.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;
        });
    }

});

export const { } = PQISlice.actions;
export default PQISlice.reducer;

export const SelectStatus = (state) => state.PQI.Status as Application.Types.Status;
export const SelectFacilities = (state) => state.PQI.Facilities as PQI.Types.Facility[];


function FetchFacilites(): JQuery.jqXHR<PQI.Types.Facility[]> {
    return $.ajax({
        type: 'GET',
        url: `${homePath}api/SystemCenter/PQI/Facilities`,
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true
    });
}