//******************************************************************************************************
//  PQISlice.ts - Gbtc
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
//  07/18/2022 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Application, PQI } from '@gpa-gemstone/application-typings';
import _ from 'lodash';

export interface Address { Path: string, Company: string, Facilities: string, AddressLine1: string, AdressLine2: string, City: string, StateOrProvince: string, PostalCode: string, Country: string, Primary: boolean }
export interface Company { Addresses: string, Path: string, Type: string, Name: string, Industry: string }
export interface Facility extends PQI.Types.Facility { Address: string }


let faclityFetchHandle: JQuery.jqXHR<any> | null;
let addressFetchHandle: JQuery.jqXHR<any> | null;
let companyFetchHandle: JQuery.jqXHR<any> | null;

export const FetchPQIFacilities = createAsyncThunk('PQI/FetchFacilities', async (_, { signal }) => {
    if (faclityFetchHandle != null && faclityFetchHandle.abort != null)
        faclityFetchHandle.abort('Prev');

    const handle = FetchFacilites();
    faclityFetchHandle = handle;

    return await handle;
});

export const FetchPQIAddresses = createAsyncThunk('PQI/FetchAddresses', async (_, { signal }) => {
    if (addressFetchHandle != null && addressFetchHandle.abort != null)
        addressFetchHandle.abort('Prev');

    const handle = FetchAddresses();
    addressFetchHandle = handle;

    return await handle;
});

export const FetchPQICompanies = createAsyncThunk('PQI/FetchCompanies', async (_, { signal }) => {
    if (companyFetchHandle != null && companyFetchHandle.abort != null)
        companyFetchHandle.abort('Prev');

    const handle = FetchCompanies();
    companyFetchHandle = handle;

    return await handle;
});

export const PQISlice = createSlice({
    name: 'PQI',
    initialState: {
        StatusCompanies: 'unintiated' as Application.Types.Status,
        StatusAddresses: 'unintiated' as Application.Types.Status,
        StatusFacilites: 'unintiated' as Application.Types.Status,
        Error: null,
        Facilities: [] as Facility[],
        Addresses: [] as Address[],
        Companies: [] as Company[]
    },
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(FetchPQIFacilities.fulfilled, (state, action) => {
            state.StatusFacilites = 'idle';
            state.Error = null;
            state.Facilities = action.payload;
            _.orderBy(state.Facilities, ['Name'], ['desc']);
        });
        builder.addCase(FetchPQIFacilities.pending, (state, action) => {
            state.StatusFacilites = 'loading';
        });
        builder.addCase(FetchPQIFacilities.rejected, (state, action) => {
            state.StatusFacilites = 'error';
            state.Error = action.error.message;
        });

        builder.addCase(FetchPQIAddresses.fulfilled, (state, action) => {
            state.StatusAddresses = 'idle';
            state.Error = null;
            state.Addresses = action.payload;
            _.orderBy(state.Addresses, ['Country', 'StateOrProvince', 'City', 'AddressLine1'], ['desc', 'desc', 'desc', 'desc']);
        });
        builder.addCase(FetchPQIAddresses.pending, (state, action) => {
            state.StatusAddresses = 'loading';
        });
        builder.addCase(FetchPQIAddresses.rejected, (state, action) => {
            state.StatusAddresses = 'error';
            state.Error = action.error.message;
        });

        builder.addCase(FetchPQICompanies.fulfilled, (state, action) => {
            state.StatusCompanies = 'idle';
            state.Error = null;
            state.Companies = action.payload;
            _.orderBy(state.Companies, ['Name'], ['desc']);
        });
        builder.addCase(FetchPQICompanies.pending, (state, action) => {
            state.StatusCompanies = 'loading';
        });
        builder.addCase(FetchPQICompanies.rejected, (state, action) => {
            state.StatusCompanies = 'error';
            state.Error = action.error.message;
        });
    }

});

export const { } = PQISlice.actions;
export default PQISlice.reducer;

export const SelectFacilityStatus = (state) => state.PQI.StatusFacilites as Application.Types.Status;
export const SelectFacilities = (state) => state.PQI.Facilities as Facility[];

export const SelectCompaniesStatus = (state) => state.PQI.StatusCompanies as Application.Types.Status;
export const SelectCompanies = (state) => state.PQI.Companies as Company[];

export const SelectAddressStatus = (state) => state.PQI.StatusAddresses as Application.Types.Status;
export const SelectAddresses = (state) => state.PQI.Addresses as Address[];


function FetchFacilites(): JQuery.jqXHR<Facility[]> {
    return $.ajax({
        type: 'GET',
        url: `${homePath}api/SystemCenter/PQI/Facilities`,
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true
    });
}

function FetchCompanies(): JQuery.jqXHR<Company[]> {
    return $.ajax({
        type: 'GET',
        url: `${homePath}api/SystemCenter/PQI/Companies`,
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true
    });
}

function FetchAddresses(): JQuery.jqXHR<Address[]> {
    return $.ajax({
        type: 'GET',
        url: `${homePath}api/SystemCenter/PQI/Addresses`,
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true
    });
}