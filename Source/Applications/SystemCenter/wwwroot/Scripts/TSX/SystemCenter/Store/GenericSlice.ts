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

import { createSlice, createAsyncThunk, AsyncThunk, Slice, Draft } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { SystemCenter } from '../global';
import * as $ from 'jquery';
import { Search } from '@gpa-gemstone/react-interactive';

export default class GenericSlice<T> {
    Name: string = "";
    APIPath: string = "";
    Slice: Slice<{
        Status: SystemCenter.Status,
        Error: string,
        Data: T[],
        SortField: keyof T,
        Ascending: boolean,
        ParentID: number,
        SearchResults: T[]
    }> = null;
    Fetch: AsyncThunk<any, void | number, {}> = null;
    DBAction: AsyncThunk<any, { verb: 'POST' | 'DELETE' | 'PATCH', record: T }, {}> = null;
    DBSearch: AsyncThunk<any, { filter: Search.IFilter<T>[], sortField?: keyof T, ascending?: boolean }, {}> = null;
    Sort;
    Reducer;

    constructor(name: string, apiPath: string) {
        this.Name = name;
        this.APIPath = apiPath;

        const fetch = createAsyncThunk(`${name}/Fetch${name}`, async (parentID:number, { dispatch }) => {
            return await this.GetRecords(parentID);
        });

        const dBAction = createAsyncThunk(`${name}/DBAction${name}`, async (args: {verb, record}, { dispatch }) => {
            return await this.Action(args.verb, args.record);
        });

        const dBSearch = createAsyncThunk(`${name}/Search${name}`, async (args: { filter, sortfield?, ascending?}, { dispatch, getState }) => {

            let sortfield = args.sortfield;
            let asc = args.ascending;

            sortfield = sortfield == undefined ? getState()[this.Name].SortField : sortfield;
            asc = asc == undefined ? getState()[this.Name].Ascending : asc;
           
            return await this.Search(args.filter, asc,sortfield);
        });

        const slice = createSlice({
            name: this.Name,
            initialState: {
                Status: 'unintiated',
                SearchStatus: 'unintiated',
                Error: null,
                Data: [],
                SortField: 'Name',
                Ascending: true,
                ParentID: null,
                SearchResults: []
            } as {
                Status: SystemCenter.Status,
                SearchStatus: SystemCenter.Status,
                Error: string,
                Data: T[],
                SortField: keyof T,
                Ascending: boolean,
                ParentID: number,
                SearchResults: T[]
            },
            reducers: {
                Sort: (state, action) => {
                    if (state.SortField === action.payload.SortField)
                        state.Ascending = !action.payload.Ascending;
                    else
                        state.SortField = action.payload.SortField;

                    state.Data = _.orderBy(state.Data, [state.SortField], [state.Ascending ? "asc" : "desc"])
                }
            },
            extraReducers: (builder) => {

                builder.addCase(fetch.fulfilled, (state, action) => {
                    state.Status = 'idle';
                    state.Error = null;
                    state.Data = _.orderBy(action.payload as Draft<T[]>, [state.SortField], [state.Ascending ? "asc" : "desc"]);
                });
                builder.addCase(fetch.pending, (state, action) => {
                    state.ParentID = action.meta.arg;
                    state.Status = 'loading';
                });

                builder.addCase(fetch.rejected, (state, action) => {
                    state.Status = 'error';
                    state.Error = action.error.message;
                });

                builder.addCase(dBAction.pending, (state, action) => {
                    state.Status = 'loading';
                });
                builder.addCase(dBAction.rejected, (state, action) => {
                    state.Status = 'error';
                    state.Error = action.error.message;

                });
                builder.addCase(dBAction.fulfilled, (state, action) => {
                    state.Status = 'changed';
                    state.Error = null;
                });

                builder.addCase(dBSearch.pending, (state, action) => {
                    state.SearchStatus = 'loading';
                });
                builder.addCase(dBSearch.rejected, (state, action) => {
                    state.SearchStatus = 'error';

                });
                builder.addCase(dBSearch.fulfilled, (state, action) => {
                    state.SearchStatus = 'idle';
                    state.SearchResults = JSON.parse(action.payload) as Draft<T[]>
                });

            }

        });


        this.Fetch = fetch;
        this.DBAction = dBAction;
        this.Slice = slice;
        this.DBSearch = dBSearch;
        const { Sort } = slice.actions
        this.Sort = Sort;
        this.Reducer = slice.reducer;
    }



    private GetRecords(parentID: number): JQuery.jqXHR<T[]> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/${this.APIPath}${(parentID != null ? '/' + parentID : '')}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    private Action(verb: 'POST' | 'DELETE' | 'PATCH', record: T): JQuery.jqXHR<T> {
        let action = '';
        if (verb == 'POST') action = 'Add';
        else if (verb == 'DELETE') action = 'Delete';
        else if (verb == 'PATCH') action = 'Update';

        return $.ajax({
            type: verb,
            url: `${homePath}api/${this.APIPath}/${action}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ ...record }),
            cache: false,
            async: true
        });
    }

    private Search(filter: Search.IFilter<T>[], ascending: boolean, sortField: keyof T): JQuery.jqXHR<string> {
        return $.ajax({
            type: 'POST',
            url: `${homePath}api/${this.APIPath}/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: filter, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }
    

    public Data = (state) => state[this.Name].Data as T[];
    public Datum = (state, id: number) => state[this.Name].Data.find(d => d.ID == id) as T;
    public Status = (state) => state[this.Name].Status as SystemCenter.Status;
    public SortField = (state) => state[this.Name].SortField;
    public Ascending = (state) => state[this.Name].Ascending;
    public ParentID = (state) => state[this.Name].ParentID;

    public SearchResults = (state) => state[this.Name].SearchResults as T[];
    public SearchStatus = (state) => state[this.Name].SearchStatus as SystemCenter.Status;
    public SearchFilters = (state) => state[this.Name].SearchResults as T[];
}


