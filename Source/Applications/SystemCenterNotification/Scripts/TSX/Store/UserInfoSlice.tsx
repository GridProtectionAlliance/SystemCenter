//******************************************************************************************************
//  UserInfoSlice.ts - Gbtc
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application } from "@gpa-gemstone/application-typings";
import { ActionReducerMapBuilder, AsyncThunk, createAsyncThunk, createSlice, Draft, PayloadAction, SerializedError, Slice } from "@reduxjs/toolkit";
import * as $ from 'jquery';
import { WritableDraft } from 'immer/dist/types/types-external'

declare var homePath: string;

interface IError {
    Message: string,
    Verb: 'POST' | 'DELETE' | 'PATCH' | 'FETCH' | 'SEARCH'
    Time: string
}

interface IState {
    Status: Application.Types.Status,
    ActiveFetchID: string[],
    Error: (IError | null),
    UserAccountID: string,
    Roles: Application.Types.SecurityRoleName[],
    EmailConfirmed: boolean,
    PhoneConfirmed: boolean,
    CellCarrierID?: number
}

interface IUserInfo {
    Roles: Application.Types.SecurityRoleName[],
    UserID: string,
    EmailConfirmed : boolean,
    PhoneConfirmed: boolean,
    CellCarrierID?: number,
}

export default class UserInfoSlice {
    Name: string = "";
    APIPath: string = "";
    Slice: (Slice<IState>);
    Fetch: (AsyncThunk<any, void, {}>);
    UpdateCarrier: (AsyncThunk<any, number, {}>);
    Reducer: any;

    private fetchHandle: any | null;

    
    constructor(name: string, apiPath: string) {
        this.Name = name;
        this.APIPath = apiPath;

        this.fetchHandle = null;

        const fetch = createAsyncThunk(`${name}/Fetch${name}`, async ( _: void, { signal, getState }) => {

        if (this.fetchHandle != null && this.fetchHandle.abort != null)
            this.fetchHandle.abort('Prev');

        const handle = this.GetInfo();
        this.fetchHandle = handle;

        signal.addEventListener('abort', () => {
            if (handle.abort !== undefined) handle.abort();
        });

        return await handle;
        });

        const updateCarrier = createAsyncThunk(`${name}/PatchCarrier${name}`, async (args: number, { signal, getState }) => {


            const handle = this.PatchCarrier(args);

            signal.addEventListener('abort', () => {
                if (handle.abort !== undefined) handle.abort();
            });

            return await handle;
        });




    const slice = createSlice({
        name: this.Name,
        initialState: {
            Status: 'unintiated',
            Error: null,
            Roles: [],
            UserAccountID: "",
            ActiveFetchID: [],
            EmailConfirmed: false,
            PhoneConfirmed: false,
            CellCarrierID: null
        } as IState,
        reducers: {},
        extraReducers: (builder: ActionReducerMapBuilder<IState>) => {
            builder.addCase(fetch.fulfilled, (state: WritableDraft<IState>, action: PayloadAction<IUserInfo, string, { requestId: string }, never>) => {
                state.ActiveFetchID = state.ActiveFetchID.filter(id => id !== action.meta.requestId);
                state.Status = 'idle';
                state.Error = null;
                const data = action.payload as IUserInfo;
                state.UserAccountID = data.UserID as Draft<string>;
                state.Roles = data.Roles as Draft<Application.Types.SecurityRoleName[]>;
                state.EmailConfirmed = data.EmailConfirmed;
                state.PhoneConfirmed = data.PhoneConfirmed;
                state.CellCarrierID = data.CellCarrierID;
            });
            builder.addCase(fetch.pending, (state: WritableDraft<IState>, action: PayloadAction<undefined, string, { arg: void, requestId: string }, never>) => {
                state.Status = 'loading';
                state.ActiveFetchID.push(action.meta.requestId);
            });
            builder.addCase(fetch.rejected, (state: WritableDraft<IState>, action: PayloadAction<unknown, string, { arg: void, requestId: string }, SerializedError>) => {
                state.ActiveFetchID = state.ActiveFetchID.filter(id => id !== action.meta.requestId);
                if (state.ActiveFetchID.length > 0)
                    return;
                state.Status = 'error';

                state.Error = {
                    Message: (action.error.message == null ? '' : action.error.message),
                    Verb: 'FETCH',
                    Time: new Date().toString()
                }
            });
            builder.addCase(updateCarrier.fulfilled, (state: WritableDraft<IState>, action: PayloadAction<unknown, string, { arg: number, requestId: string }, never>) => {
                state.Status = 'changed';
            });
            builder.addCase(updateCarrier.rejected, (state: WritableDraft<IState>, action: PayloadAction<unknown, string, { arg: number, requestId: string }, SerializedError>) => {
                state.Status = 'error';

                state.Error = {
                    Message: (action.error.message == null ? '' : action.error.message),
                    Verb: 'PATCH',
                    Time: new Date().toString()
                }
            });
        }

    });


    this.Fetch = fetch;
    this.Slice = slice;
        this.Reducer = slice.reducer;
        this.UpdateCarrier = updateCarrier;

    }


    private GetInfo(): any {
        return $.ajax({
            type: "GET",
            url: `${this.APIPath}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }

    private PatchCarrier(id: number): any {
        return $.ajax({
            type: "GET",
            url: `${this.APIPath}/${id.toString()}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }

    public UserAccountID = (state: any) => state[this.Name].UserAccountID as string;
    public Error = (state: any) => state[this.Name].Error as IError;
    public Roles = (state: any) => (state[this.Name] as IState).Roles as Application.Types.SecurityRoleName[];
    public Status = (state: any) => state[this.Name].Status as Application.Types.Status;
    public ConfirmedPhone = (state: any) => (state[this.Name] as IState).PhoneConfirmed as boolean;
    public ConfirmedEmail = (state: any) => (state[this.Name] as IState).EmailConfirmed as boolean;
    public CellCarrierID = (state: any) => (state[this.Name] as IState).CellCarrierID as number|null;
}