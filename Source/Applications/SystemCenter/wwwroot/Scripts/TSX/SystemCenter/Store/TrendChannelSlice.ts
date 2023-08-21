//******************************************************************************************************
//  TrendChannelSlice.ts - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  08/18/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************


import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { Application } from '@gpa-gemstone/application-typings';
import { OpenXDA } from '../global';

let fetchHandle = null;

export const FetchChannels = createAsyncThunk('TrendChannels/FetchChannels', async (args: {
    sortField ?: keyof OpenXDA.TrendChannel,
    ascending ?: boolean, meterId: number
}, { getState, signal }) => {

    let sortfield = args.sortField;
    let asc = args.ascending;

    sortfield = sortfield === undefined ? ((getState() as any).TrendChannels).Sort : sortfield;
    asc = asc === undefined ? (getState() as any).TrendChannels.Ascending : asc;

    if (fetchHandle != null && fetchHandle.abort != null)
        fetchHandle.abort('Prev');

    const handle = GetRecords(asc, sortfield, args.meterId);
    fetchHandle = handle;
    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });
    return await handle;
});

export const dBAction = createAsyncThunk(`TrendChannels/DBAction`, async (args: { verb: 'POST' | 'DELETE' | 'PATCH', record: OpenXDA.TrendChannel }, { signal }) => {
    const handle = Action(args.verb, args.record);
    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });
    return await handle
});


export const TrendChannelSlice = createSlice({
    name: 'TrendChannel',
    initialState:
{
Status: 'unintiated' as Application.Types.Status,
        Error: null,
        Data: [] as OpenXDA.TrendChannel[],
        ActiveFetchID: [] as string[],
        Asc: false as boolean,
        Sort: 'Name' as keyof (OpenXDA.TrendChannel),
        ParentID: null
    },
    reducers:
{
},
    extraReducers: (builder) => {

        builder.addCase(FetchChannels.pending, (state, action: PayloadAction < undefined, string, { requestId: string }, never >) => {
            state.Status = 'loading';
            state.ActiveFetchID.push(action.meta.requestId);
        });

        builder.addCase(FetchChannels.rejected, (state, action: PayloadAction < unknown, string, { requestId: string }, SerializedError >) => {
            state.ActiveFetchID = state.ActiveFetchID.filter(id => id !== action.meta.requestId);
            if (state.ActiveFetchID.length > 0)
                return;
            state.Status = 'error';
            state.Error = {
            Message: (action.error.message == null ? '' : action.error.message),
                Verb: 'SEARCH',
                Time: new Date().toString()
            }

        });
        builder.addCase(FetchChannels.fulfilled, (state, action: PayloadAction < string, string, { arg: { meterId: number, sortField ?: keyof OpenXDA.TrendChannel, ascending ?: boolean }, requestId: string }, never >) => {
            state.ActiveFetchID = state.ActiveFetchID.filter(id => id !== action.meta.requestId);
            state.Status = 'idle';
            state.Data = JSON.parse(action.payload);
            state.ParentID = action.meta.arg.meterId;
            state.Sort = action.meta.arg.sortField ?? state.Sort;
            state.Asc = action.meta.arg.ascending ?? state.Asc;
        });
        builder.addCase(dBAction.pending, (state) => {
            state.Status = 'loading';
        });
        builder.addCase(dBAction.rejected, (state, action: PayloadAction < unknown, string, { arg: { verb: 'POST' | 'DELETE' | 'PATCH', record: OpenXDA.TrendChannel } }, SerializedError >) => {
            state.Status = 'error';
            state.Error = {
            Message: (action.error.message == null ? '' : action.error.message),
                Verb: action.meta.arg.verb,
                Time: new Date().toString()
            }

        });
        builder.addCase(dBAction.fulfilled, (state) => {
            state.Status = 'changed';
            state.Error = null;
        });
    }

});
export const { } = TrendChannelSlice.actions;
export default TrendChannelSlice.reducer;

export const SelectTrendChannels = (state) => state.TrendChannels.Data as OpenXDA.TrendChannel[];
export const SelectTrendChannelStatus = (state) => state.TrendChannels.Status as Application.Types.Status;
export const SelectMeterID = (state) => state.TrendChannels.ParentID as number;
export const SelectAscending = (state) => state.TrendChannels.Asc as boolean;
export const SelectSortKey = (state) => state.TrendChannels.Sort as keyof OpenXDA.TrendChannel;

function GetRecords(ascending: (boolean | undefined), sortField: keyof OpenXDA.TrendChannel, parentID: number | void,): JQuery.jqXHR<string> {
    return $.ajax({
    type: "GET",
        url: `${homePath}api/OpenXDA/TrendChannel${(parentID != null ? '/' + parentID : '')}/${sortField}/${ascending ? '1' : '0'}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}

function Action(verb: 'POST' | 'DELETE' | 'PATCH', record: OpenXDA.TrendChannel): JQuery.jqXHR<string> {
    let action = '';
    if (verb === 'POST') action = 'Add';
    else if (verb === 'DELETE') action = 'Delete';
    else if (verb === 'PATCH') action = 'Update';

    return $.ajax({
    type: verb,
        url: `${homePath}api/OpenXDA/TrendChannel/${action}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ ...record }),
        cache: false,
        async: true
    });
}
