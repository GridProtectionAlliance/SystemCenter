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
import { Search } from '@gpa-gemstone/react-interactive';

export const FetchAsset = createAsyncThunk('Asset/FetchAsset', async (_, { signal }) => {
    const handle = GetAsset();

    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });

    return await handle;
});

export const DBActionAsset = createAsyncThunk(`Asset/dbAction`, async (args: { verb: 'POST' | 'DELETE', record: OpenXDA.Types.Asset, meterID: number, locationID: number }, { signal }) => {
    const handle = dbAction(args.verb, args.record, args.meterID, args.locationID);

    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });

    return await handle;
});

let searchHandle: JQuery.jqXHR<any>| null;
export const DBSearchAsset = createAsyncThunk(`Asset/Search`, async (args: { filter: Search.IFilter<OpenXDA.Types.Asset>[], sortField?: keyof OpenXDA.Types.Asset, ascending?: boolean }, { signal }) => {
    let sortfield = args.sortField;
    let asc = args.ascending;

    if (searchHandle != null && searchHandle.abort != null)
        searchHandle.abort('Prev');

    sortfield = sortfield === undefined ? 'AssetKey' : sortfield;
    asc = asc === undefined ? true : asc;

    const handle = Search(args.filter, asc, sortfield);
    searchHandle = handle;

    signal.addEventListener('abort', () => {
        if (handle.abort !== undefined) handle.abort();
    });

    return await handle;
});

export const AssetSlice = createSlice({
    name: 'Asset',
    initialState: {
        Status: 'unintiated' as Application.Types.Status,
        SearchStatus: 'unintiated' as Application.Types.Status,
        Error: null,
        Data: [] as OpenXDA.Types.Asset[],
        SearchResults: [] as OpenXDA.Types.Asset[],
        ActiveSearchID: []
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
        builder.addCase(DBSearchAsset.pending, (state, action) => {
            state.SearchStatus = 'loading';
            state.ActiveSearchID.push(action.meta.requestId);
        });
        builder.addCase(DBSearchAsset.rejected, (state, action) => {
            state.ActiveSearchID = state.ActiveSearchID.filter(id => id !== action.meta.requestId);
            if (state.ActiveSearchID.length > 0)
                return;
            state.SearchStatus = 'error';
            state.Error = {
                Message: (action.error.message == null ? '' : action.error.message),
                Verb: 'SEARCH',
                Time: new Date().toString()
            }

        });
        builder.addCase(DBSearchAsset.fulfilled, (state, action) => {
            state.ActiveSearchID = state.ActiveSearchID.filter(id => id !== action.meta.requestId);
            state.SearchStatus = 'idle';
            state.SearchResults = action.payload;
        });
        builder.addCase(DBActionAsset.pending, (state, action) => {
            state.Status = 'loading';
        });
        builder.addCase(DBActionAsset.rejected, (state, action) => {
            state.Status = 'error';
            state.Error = {
                Message: (action.error.message == null ? '' : action.error.message),
                Verb: action.meta.arg.verb,
                Time: new Date().toString()
            }

        });
        builder.addCase(DBActionAsset.fulfilled, (state, action) => {
            state.Status = 'changed';
            state.SearchStatus = 'changed';
            state.Error = null;
        });
    }

});

export const { } = AssetSlice.actions;
export default AssetSlice.reducer;
export const SelectAssets = (state) => state.Asset.Data as OpenXDA.Types.Asset[];
export const SearchedAssets = (state) => state.Asset.SearchResults as OpenXDA.Types.Asset[];
export const SearchStatus = (state) => state.Asset.SearchStatus as Application.Types.Status;
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

// The below are for meterlocation operations; with some cleanup, this might all be able to become a generic slice
function Search(filter: Search.IFilter<OpenXDA.Types.Asset>[], ascending: (boolean | undefined), sortField: keyof OpenXDA.Types.Asset): JQuery.jqXHR<OpenXDA.Types.Asset[]> {
    return $.ajax({
        type: 'POST',
        url: `${homePath}api/OpenXDA/Asset/SearchableListIncludingMeter`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ Searches: filter, OrderBy: sortField, Ascending: ascending }),
        cache: false,
        async: true
    });
}

function dbAction(verb: 'POST' | 'DELETE', record: OpenXDA.Types.Asset, meterID: number, locationID: number) {
    let route: string;
    // TODO: Delete merely removes the asset meter connection, should a new controller route be added for deleteing the asset itself and associated connections?
    if (verb == 'DELETE')
        route = `${homePath}api/OpenXDA/Meter/${meterID}/Asset/${record.ID}/${locationID}`;
    else if (verb == 'POST' && record.ID > 0)
        route = `${homePath}api/OpenXDA/Asset/Edit`;
    else if (verb == 'POST')
        route = `${homePath}api/OpenXDA/Asset/New/Meter/${meterID}/${locationID}`;
    return $.ajax({
        type: verb,
        url: route,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ Asset: record }),
        cache: false,
        async: true
    }).fail((msg) => {
        if (msg.status == 500)
            alert(msg.responseJSON.ExceptionMessage)
        else
            sessionStorage.clear();
    });
}