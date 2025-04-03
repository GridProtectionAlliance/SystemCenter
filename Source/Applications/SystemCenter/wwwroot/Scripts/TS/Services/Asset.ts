
//******************************************************************************************************
//  AssetServices.ts - Gbtc
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
//  01/23/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
import { OpenXDA } from "@gpa-gemstone/application-typings/";
import * as _ from 'lodash';

declare var homePath: string;


function getSpareBreaker(breaker: OpenXDA.Types.Breaker) {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/Breaker/${breaker.ID}/SpareBreaker`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    }).promise();
}

function getLocationForBreaker(breaker: OpenXDA.Types.Breaker): Promise<OpenXDA.Types.Location> {
    return new Promise((res, rej) => {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Breaker/${breaker.ID}/Location`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(d => res(d)).fail(e => rej(e))
    });

}
function getSparesForLocation(location: OpenXDA.Types.Location): Promise<Array<OpenXDA.Types.Breaker>> {
    return new Promise((res, rej) => {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Breaker/SpareBreakers/Substation/${location.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(d => res(d)).fail(e => rej(e))
    });
}

export async function getSpareBreakersForSubstation(breaker: OpenXDA.Types.Breaker): Promise<Array<OpenXDA.Types.Breaker>> {
    const location = await getLocationForBreaker(breaker);
    if (location == null) return [];
    const spares = await getSparesForLocation(location);
    return spares
}


export function getAssetTypes(): JQueryXHR {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/AssetType`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}

export function getAllAssets(): JQueryXHR{
        return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/Asset`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
        })
}

export function getAsset(assetID: number, assetType: OpenXDA.Types.AssetTypeName): JQuery.jqXHR<OpenXDA.Types.Asset> {
    return $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/${assetType}/One/${assetID}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}

export async function getAssetWithAdditionalFields(assetID: number, assetType: OpenXDA.Types.AssetTypeName): Promise<OpenXDA.Types.Asset> {
    var asset = await getAsset(assetID, assetType);
    asset.AssetType = assetType;
    asset.Channels = [];

    if (assetType == 'Breaker') {
        const SCADAPoint = await getSCADAPoint(asset as OpenXDA.Types.Breaker)
        if (SCADAPoint != null)
            asset['SCADAPoint'] = SCADAPoint.Point;
        else
            asset['SCADAPoint'] = null;

        const spareBreaker = await await getSpareBreaker(asset as OpenXDA.Types.Breaker)
        if (spareBreaker != null)
            asset['SpareBreakerID'] = spareBreaker.ID;
        else
            asset['SpareBreakerID'] = null;
    }   
    else if (assetType == 'Line')
        asset['Detail'] = await getLineDetails(asset as OpenXDA.Types.Line);

    return asset;
}

function getSCADAPoint(breaker: OpenXDA.Types.Breaker): Promise<OpenXDA.Types.SCADAPoint> {
    return new Promise((res, rej) => {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Breaker/${breaker.ID}/SCADAPoint`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(d => res(d)).fail(e => rej(e))
    });
}

function getLineDetails(line: OpenXDA.Types.Line): Promise<OpenXDA.Types.LineDetail> {
    return new Promise((res, rej) => {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Line/${line.ID}/LineSegment`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(d => res(d)).fail(e => rej(e))
    });
}


export function editExistingAsset(asset: OpenXDA.Types.Asset): Promise<OpenXDA.Types.Asset> {
    return new Promise((res, rej) => {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/Edit`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: asset }),
            cache: false,
            async: true
        }).done(d => res(d)).fail(e => rej(e))
    });
}

