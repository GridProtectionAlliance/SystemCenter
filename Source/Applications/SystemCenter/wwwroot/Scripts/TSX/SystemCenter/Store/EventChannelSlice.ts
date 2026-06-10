//******************************************************************************************************
//  EventChannelSlice.ts - Gbtc
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
//  07/01/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************



import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { Application } from '@gpa-gemstone/application-typings';
import { OpenXDA } from '../global';

let fetchHandle = null;
let pagedHandle = null;

interface PagedResults {
    Data: string,
    NumberOfPages: number
}

export const FetchChannels = createAsyncThunk('EventChannels/FetchChannels', async (args: {
    sortField?: keyof OpenXDA.EventChannel,
    ascending?: boolean, meterId: number
}, { getState, signal }) => {

    let sortfield = args.sortField;
    let asc = args.ascending;

    sortfield = sortfield === undefined ? ((getState() as any).EventChannels).Sort : sortfield;
    asc = asc === undefined ? (getState() as any).EventChannels.Ascending : asc;

    if (fetchHandle != null && fetchHandle.abort != null)
        fetchHandle.abort('Prev');

    const handle = GetRecords(asc, sortfield, args.meterId);
    fetchHandle = handle;

    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });

    return await handle;
});

export const dBAction = createAsyncThunk(`EventChannels/DBAction`, async (args: { verb: 'POST' | 'DELETE' | 'PATCH', record: OpenXDA.EventChannel }, { signal }) => {
    const handle = Action(args.verb, args.record);
    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });
    return await handle
});

export const PagedSearch = createAsyncThunk('EventChannels/PagedSearch', async (args: {
    sortField?: keyof OpenXDA.EventChannel,
    ascending?: boolean,
    meterId: number,
    page: number
}, { getState, signal }) => {

    let sortfield = args.sortField;
    let asc = args.ascending;

    sortfield = sortfield === undefined ? ((getState() as any).EventChannels).Sort : sortfield;
    asc = asc === undefined ? (getState() as any).EventChannels.Ascending : asc;

    if (pagedHandle != null && pagedHandle.abort != null)
        fetchHandle.abort('Prev');

    const handle = GetPagedRecords(asc, sortfield, args.meterId, args.page);
    pagedHandle = handle;

    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });

    return await handle;
})

export const EventChannelSlice = createSlice({
    name: 'EventChannel',
    initialState: {
        Status: 'unintiated' as Application.Types.Status,
        Error: null,
        Data: [] as OpenXDA.EventChannel[],
        ActiveFetchID: [] as string[],
        Asc: true as boolean,
        Sort: 'Name' as keyof (OpenXDA.EventChannel),
        ParentID: null,
        NumberOfPages: 0,
        PagedData: [] as OpenXDA.EventChannel[]
    },
    reducers: {
        SetChanged: (state) => {
            state.Status = "changed";
        }
    },
    extraReducers: (builder) => {

        builder.addCase(FetchChannels.pending, (state, action: PayloadAction<undefined, string, { requestId: string }, never>) => {
            state.Status = 'loading';
            state.ActiveFetchID.push(action.meta.requestId);
        });

        builder.addCase(FetchChannels.rejected, (state, action: PayloadAction<unknown, string, { requestId: string }, SerializedError>) => {
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
        builder.addCase(FetchChannels.fulfilled, (state, action: PayloadAction<string, string, { arg: { meterId: number, sortField?: keyof OpenXDA.EventChannel, ascending?: boolean }, requestId: string }, never>) => {
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
        builder.addCase(dBAction.rejected, (state, action: PayloadAction<unknown, string, { arg: { verb: 'POST' | 'DELETE' | 'PATCH', record: OpenXDA.EventChannel } }, SerializedError>) => {
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
        builder.addCase(PagedSearch.pending, (state, action: PayloadAction<undefined, string, { requestId: string }, never>) => {
            state.Status = 'loading';
            state.ActiveFetchID.push(action.meta.requestId);
        });
        builder.addCase(PagedSearch.rejected, (state, action: PayloadAction<unknown, string, { requestId: string }, SerializedError>) => {
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
        builder.addCase(PagedSearch.fulfilled, (state, action: PayloadAction<any, string, { arg: { meterId: number, sortField?: keyof OpenXDA.EventChannel, ascending?: boolean, page: number }, requestId: string }, never>) => {
            state.ActiveFetchID = state.ActiveFetchID.filter(id => id !== action.meta.requestId);
            state.Status = 'idle';
            state.PagedData = JSON.parse(action.payload.Data);
            state.ParentID = action.meta.arg.meterId;
            state.Sort = action.meta.arg.sortField ?? state.Sort;
            state.Asc = action.meta.arg.ascending ?? state.Asc;
            state.NumberOfPages = action.payload.NumberOfPages;
        });
    }

});

export const { SetChanged } = EventChannelSlice.actions;
export default EventChannelSlice.reducer;
export const SelectEventChannels = (state) => state.EventChannels.Data as OpenXDA.EventChannel[];
export const SelectEventChannelStatus = (state) => state.EventChannels.Status as Application.Types.Status;
export const SelectMeterID = (state) => state.EventChannels.ParentID as number;
export const SelectAscending = (state) => state.EventChannels.Asc as boolean;
export const SelectSortKey = (state) => state.EventChannels.Sort as keyof OpenXDA.EventChannel;
export const SelectNumberOfPages = (state) => state.EventChannels.NumberOfPages as number;
export const SelectPagedData = (state) => state.EventChannels.PagedData as OpenXDA.EventChannel[];

function GetRecords(ascending: (boolean | undefined), sortField: keyof OpenXDA.EventChannel, parentID: number | void,): JQuery.jqXHR<string> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/EventChannel${(parentID != null ? '/' + parentID : '')}/${sortField}/${ascending ? '1' : '0'}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}

function GetPagedRecords(ascending: (boolean | undefined), sortField: keyof OpenXDA.EventChannel, parentID: number | void, page: number): JQuery.jqXHR<string> {
    return $.ajax({
        type: "POST",
        url: `${homePath}api/OpenXDA/EventChannel${(parentID != null ? '/' + parentID : '')}/PagedList/${page}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true,
        data: JSON.stringify({OrderBy: sortField, Ascending: ascending, Searches: []})
    });
}

function Action(verb: 'POST' | 'DELETE' | 'PATCH', record: OpenXDA.EventChannel): JQuery.jqXHR<string> {
    let action = '';
    if(verb === 'POST') action = 'Add';
    else if (verb === 'DELETE') action = 'Delete';
    else if (verb === 'PATCH') action = 'Update';

    return $.ajax({
        type: verb,
        url: `${homePath}api/OpenXDA/EventChannel/${action}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ ...record }),
        cache: false,
        async: true
    });
}
