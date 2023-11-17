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
//  10/27/2023 - Ariana Armstrong
//       Generated original version of source code.
//
//******************************************************************************************************



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { Search } from '@gpa-gemstone/react-interactive';

export const Fetch = createAsyncThunk('UserSettings/Fetch', async (_, { signal }) => {
    const handle = getRoles();

    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });

    return await handle;
});


export const UserSettingsSlice = createSlice({
    name: 'UserSettings',
    initialState: {
        Status: 'unintiated' as Application.Types.Status,
        Error: null,
        Roles: [] as Application.Types.SecurityRoleName[]
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(Fetch.fulfilled, (state, action) => {
            state.Status = 'idle';
            state.Error = null;
            state.Roles = action.payload;//.sort((a, b) => a.Name - b.Name);
        });
        builder.addCase(Fetch.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(Fetch.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;
        });
        

    }

});

export const { } = UserSettingsSlice.actions;
export default UserSettingsSlice.reducer;
export const SelectRoles = (state) => state.UserSettings.Roles as Application.Types.SecurityRoleName[];
export const SelectUserSettingsStatus = (state) => state.UserSettings.Status as Application.Types.Status;

function getRoles(): JQuery.jqXHR<Array<Application.Types.SecurityRoleName>> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/SystemCenter/SecurityRoles`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}

// The below are for meterlocation operations; with some cleanup, this might all be able to become a generic slice


