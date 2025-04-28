//******************************************************************************************************
//  AssetSelect.tsx - Gbtc
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
//  11/07/2022 - G. Santos
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import { ByAssetSlice, AssetTypeSlice } from '../Store/Store';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { Search } from '@gpa-gemstone/react-interactive';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Column } from '@gpa-gemstone/react-table';

declare var homePath: string;

//TODO: Everything that uses this should use FilterSelect in common components instead
interface IProps {
    OnCloseFunction: (selectedArrays: Array<SystemCenter.Types.DetailedAsset>, confirmed: boolean) => void,
    SelectedAssets: Array<SystemCenter.Types.DetailedAsset>,
    ShowModal: boolean,
    Type?: 'single' | 'multiple',
    StorageID?: string,
    Title?: string,
    children?: React.ReactNode
}

export default function AssetSelect(props: IProps) {
    const assetType = useAppSelector(AssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(AssetTypeSlice.Status);
    const dispatch = useAppDispatch();

    const lineSegmentFilter: Search.IFilter<SystemCenter.Types.DetailedAsset> =
    {
        FieldName: 'AssetType',
        SearchText: 'LineSegment',
        Operator: '<>',
        Type: 'string',
        IsPivotColumn: false
    };

    React.useEffect(() => {
        if (assetTypeStatus == 'changed' || assetTypeStatus == 'unintiated')
            dispatch(AssetTypeSlice.Fetch());
    }, [assetTypeStatus]);

    function getEnum(setOptions, field) {
        if (field.key == 'AssetType' && field.type == 'enum') {
            setOptions(assetType.map((t) => ({ Value: t.Name, Label: t.Name })))
            return () => { }
        }

        if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
            return () => { };

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        }
    }

    function getAdditionalAssetFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/Asset/FieldName/0`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });

        function ConvertType(type: string) {
            if (type == 'string' || type == 'integer' || type == 'number' || type == 'datetime' || type == 'boolean')
                return { type: type }
            return {
                type: 'enum', enum: [{ Label: type, Value: type }]
            }
        }

        handle.done((d: Array<SystemCenter.Types.AdditionalFieldView>) => {

            let ordered = _.orderBy(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<SystemCenter.Types.DetailedAsset>
            )), ['label'], ["asc"]);
            setFields(ordered);
        });
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

    return (
        <DefaultSelects.Asset
            Slice={ByAssetSlice}
            Selection={props.SelectedAssets}
            OnClose={props.OnCloseFunction}
            Show={props.ShowModal}
            Type={props.Type === undefined ? 'multiple' : props.Type}
            StorageID={props.StorageID}
            AddlFilters={[lineSegmentFilter]}
            Title={props.Title === undefined ? "Select Assets" : props.Title}
            GetEnum={getEnum}
            GetAddlFields={getAdditionalAssetFields}>
            {props.children}
            <Column Key="AssetName" Field="AssetName" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Name</Column>
            <Column Key="AssetKey" Field="AssetKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Key</Column>
            <Column Key="AssetType" Field="AssetType" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Asset Type</Column>
            <Column Key="VoltageKV" Field="VoltageKV" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Voltage (kV)</Column>
            <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Meters</Column>
            <Column Key="Locations" Field="Locations" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Substations</Column>
        </DefaultSelects.Asset>
    )
}