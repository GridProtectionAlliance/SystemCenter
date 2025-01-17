//******************************************************************************************************
//  ConfigurationSlice.tsx - Gbtc
//
//  Copyright © 2024, Grid Protection Alliance.  All Rights Reserved.
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
//  10/17/2024 - G. Santos
//       Generated original version of source code.
//
//******************************************************************************************************
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'
import { Search } from '@gpa-gemstone/react-interactive';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, ActionReducerMapBuilder, AsyncThunk, createAsyncThunk, createSlice, Draft, PayloadAction, Slice } from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';

interface ConfigurationState {
    XDAConfigStatus: Application.Types.Status,
    XDAConfig: XDAConfiguration
}
interface XDAConfiguration {
    EditionStatus: { [key: string]: boolean }
}

export default class ConfigurationSlice {
    Name: string = "";
    Slice: (Slice<ConfigurationState>);
    FetchXDAConfig: (AsyncThunk<any, void, {}>);
    Reducer: any;

    constructor(name: string) {
        this.Name = name;

        const fetchXDAConfiguration = createAsyncThunk(`${name}/FetchXDAConfiguration`, async () => {
            const fetchEditionCheckHandle: JQuery.jqXHR = $.ajax({
                type: "Get",
                url: `${homePath}api/OpenXDA/GetEditionComparitor`,
                dataType: 'json',
                cache: false,
                async: true
            });
            return await Promise.all([fetchEditionCheckHandle]);
        });

        const slice = createSlice({
            name: this.Name,
            initialState: {
                XDAConfigStatus: 'unintiated',
                XDAConfig: {
                    EditionStatus: {}
                }
            } as ConfigurationState,
            reducers: { },
            extraReducers: (builder) => {
                builder.addCase(fetchXDAConfiguration.fulfilled, (state, action) => {
                    state.XDAConfig.EditionStatus = _.cloneDeep(action.payload[0]);
                    state.XDAConfigStatus = 'idle';
                    return state;
                });
                builder.addCase(fetchXDAConfiguration.pending, (state, action) => {
                    state.XDAConfigStatus = 'loading';
                    return state;
                });
                builder.addCase(fetchXDAConfiguration.rejected, (state) => {
                    state.XDAConfigStatus = 'error';
                    return state;
                });
            }

        });

        this.Slice = slice;
        this.FetchXDAConfig = fetchXDAConfiguration;
        this.Reducer = slice.reducer;
    }

    public XDAConfig = (state: any) => state[this.Name].XDAConfig as XDAConfiguration;
    public XDAConfigStatus = (state: any) => state[this.Name].XDAConfigStatus as Application.Types.Status;
}

