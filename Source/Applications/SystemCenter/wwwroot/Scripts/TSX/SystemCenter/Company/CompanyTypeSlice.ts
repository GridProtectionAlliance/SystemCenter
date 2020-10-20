//******************************************************************************************************
//  CompanyTypeSlice.ts - Gbtc
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

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SystemCenter } from '../global';

export const FetchCompanyTypes = createAsyncThunk('Companys/FetchCompanyTypes', async (_, { dispatch }) => {
    return await GetCompanyTypes()
});

export const CompanyTypeSlice = createSlice({
    name: 'CompanyType',
    initialState: {
        Status: 'unitiated' as SystemCenter.Status,
        CompanyType: [] as SystemCenter.CompanyType[],
        Error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(FetchCompanyTypes.fulfilled, (state, action) => {
            state.Status = 'idle';
            state.Error = null;
            state.CompanyType.push(...action.payload);
            FetchCompanyTypes();
        });
        builder.addCase(FetchCompanyTypes.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(FetchCompanyTypes.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;

        });

    }

});

export const {} = CompanyTypeSlice.actions;
export default CompanyTypeSlice.reducer;
export const SelectCompanyTypes = state => state.CompanyType.CompanyType as SystemCenter.CompanyType[]
export const SelectCompanyTypesStatus = state => state.CompanyType.Status as SystemCenter.Status

function GetCompanyTypes(): JQuery.jqXHR<SystemCenter.CompanyType[]> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/SystemCenter/CompanyType`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}


