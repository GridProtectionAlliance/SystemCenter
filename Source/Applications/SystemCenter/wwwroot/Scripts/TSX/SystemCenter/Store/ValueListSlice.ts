//******************************************************************************************************
//  ValueListSlice.ts - Gbtc
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
import { SystemCenter as SCTyping } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal }   from '../global';

export const FetchValueList = createAsyncThunk('ValueList/FetchValueList', async (vl: {group: string}, { dispatch }) => {
    return await GetValueList(vl.group);
});

export const ValueListSlice = createSlice({
    name: 'ValueList',
    initialState: {
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(FetchValueList.fulfilled, (state, action) => {
            if (state[action.meta.arg.group] === undefined) {
                state[action.meta.arg.group] = {
                    Status: 'unitiated' as SCGlobal.Status,
                    Data: [] as any,
                    Error: null
                };
            }

            state[action.meta.arg.group].Status = 'idle';
            state[action.meta.arg.group].Error = null;
            state[action.meta.arg.group].Data = action.payload.sort((a, b) => a.SortOrder - b.SortOrder);
        });
        builder.addCase(FetchValueList.pending, (state, action) => {
            if (state[action.meta.arg.group] === undefined) {
                state[action.meta.arg.group] = {
                    Status: 'unitiated' as SCGlobal.Status,
                    Data: [] as any,
                    Error: null
                };
            }

            state[action.meta.arg.group].Status = 'loading';
        });
        builder.addCase(FetchValueList.rejected, (state, action) => {
            if (state[action.meta.arg.group] === undefined) {
                state[action.meta.arg.group] = {
                    Status: 'unitiated' as SCGlobal.Status,
                    Data: [] as any,
                    Error: null
                };
            }


            state[action.meta.arg.group].Status = 'error';
            state[action.meta.arg.group].Error = action.error.message;
        });

    }

});

export const { } = ValueListSlice.actions;
export default ValueListSlice.reducer;
export const SelectValueList = (state, group: string) => state.ValueList[group] !== undefined ? state.ValueList[group].Data : [] as SCTyping.Types.ValueListItem[];
export const SelectValueListStatus = (state, group: string) => state.ValueList[group] !== undefined ? state.ValueList[group].Status : 'unintiated' as SCGlobal.Status;

function GetValueList(group: string): JQuery.jqXHR<SCTyping.Types.ValueListItem[]> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/ValueList/Group/${group}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}