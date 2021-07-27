//******************************************************************************************************
//  AssetSlice.ts - Gbtc
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

export const FetchAsset = createAsyncThunk('Asset/FetchAsset', async (_, { dispatch }) => {
    return await GetAsset();
});

export const AssetSlice = createSlice({
    name: 'Asset',
    initialState: {
        Status: 'unintiated' as Application.Types.Status,
        Error: null,
        Data: [] as OpenXDA.Types.Asset[]
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(FetchAsset.fulfilled, (state, action) => {
            state.Status = 'idle';
            state.Error = null;
            state.Data = action.payload;//.sort((a, b) => a.Name - b.Name);
        });
        builder.addCase(FetchAsset.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(FetchAsset.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;
        });

    }

});

export const { } = AssetSlice.actions;
export default AssetSlice.reducer;
export const SelectAssets = (state) => state.Asset.Data as OpenXDA.Types.Asset[];
export const SelectAssetStatus = (state) => state.Asset.Status as Application.Types.Status;
export const SelectAssetKeysLowerCase = (state) => state.Asset.Data.map(a => a.AssetKey.toLowerCase()) as string[];

function GetAsset(): JQuery.jqXHR<OpenXDA.Types.Asset[]> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/Asset`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}