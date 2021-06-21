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
import _ from 'lodash';
import { SystemCenter as SCTyping } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';

export const FetchValueListGroup = createAsyncThunk('ValueListGroup/FetchValueListGroup', async (_, { dispatch }) => {
    return await GetValueListGroups();
});

export const DBActionValueListGroup = createAsyncThunk('ValueListGroup/DBActionValueListGroup', async (args: { verb: 'POST' | 'DELETE' | 'PATCH', record: SCTyping.Types.ValueListGroup }, { dispatch }) => {
    return await ActionValueListGroup(args.verb, args.record);
});


export const ValueListGroupSlice = createSlice({
    name: 'ValueListGroup',
    initialState: {
        Status: 'unintiated',
        Error: null,
        Data: [], 
        SortField: 'Name',
        Ascending: true
    } as {
        Status: SCGlobal.Status,
        Error: string,
        Data: SCTyping.Types.ValueListGroup[],
        SortField: keyof SCTyping.Types.ValueListGroup,
        Ascending: boolean
    },
    reducers: {
        Sort: (state, action) => {
            if (state.SortField === action.payload.SortField)
                state.Ascending = !action.payload.Ascending;
            else
                state.SortField = action.payload.SortField;

            const sorted = _.orderBy(state.Data, [state.SortField], [state.Ascending ? "asc" : "desc"])
            state.Data = sorted as SCTyping.Types.ValueListGroup[];
        }
    },
    extraReducers: (builder) => {

        builder.addCase(FetchValueListGroup.fulfilled, (state, action) => {
            state.Status = 'idle';
            state.Error = null;
            state.Data = _.orderBy(state.Data, [state.SortField], [state.Ascending ? "asc" : "desc"]);//.sort((a, b) => a.Name - b.Name);
        });
        builder.addCase(FetchValueListGroup.pending, (state, action) => {
            state.Status = 'loading';
        });

        builder.addCase(FetchValueListGroup.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;
        });

        builder.addCase(DBActionValueListGroup.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(DBActionValueListGroup.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = action.error.message;

        });
        builder.addCase(DBActionValueListGroup.fulfilled, (state, action) => {
            state.Status = 'changed';
            state.Error = null;
        });

    }

});

export const { Sort } = ValueListGroupSlice.actions;
export default ValueListGroupSlice.reducer;
export const SelectValueListGroups = (state) => state.ValueListGroup.Data as SCTyping.Types.ValueListGroup[] ;
export const SelectValueListGroupStatus = (state) => state.ValueListGroup.Status as SCGlobal.Status;
export const SelectValueListGroupSortField = (state) => state.ValueListGroup.SortField;
export const SelectValueListGroupAscending = (state) => state.ValueListGroup.Ascending;
export const SelectNewValueListGroup = (state) => ({ ID: 0, Name: '', Description: '' } as SCTyping.Types.ValueListGroup);

function GetValueListGroups(): JQuery.jqXHR<SCTyping.Types.ValueListGroup[]> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/ValueListGroup`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}

function ActionValueListGroup(verb: 'POST' | 'DELETE' | 'PATCH', record: SCTyping.Types.ValueListGroup): JQuery.jqXHR<SCTyping.Types.ValueListGroup> {
    return $.ajax({
        type: verb,
        url: `${homePath}api/ValueListGroup`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ ...record }),
        cache: false,
        async: true
    });
}
