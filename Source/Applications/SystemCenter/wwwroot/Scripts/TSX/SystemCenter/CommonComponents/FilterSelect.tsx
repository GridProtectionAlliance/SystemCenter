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
import { ByMeterSlice, ByAssetSlice, AssetTypeSlice, ByLocationSlice, CustomerSlice } from '../Store/Store';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { Search } from '@gpa-gemstone/react-interactive';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Column } from '@gpa-gemstone/react-table';

declare var homePath: string;

interface IProps {
    OnCloseFunction: (selected: Set<number>, confirmed: boolean) => void,
    Selected: Set<number>,
    ShowModal: boolean,
    Type: ('Meter'|'Location'|'Customer'|'Asset'),
    Single?: boolean,
    StorageID?: string,
    Title?: string,
    children?: React.ReactNode
}

type Data = (SystemCenter.Types.DetailedMeter | SystemCenter.Types.DetailedLocation | OpenXDA.Types.Customer |SystemCenter.Types.DetailedAsset);

export default function FilterSelect(props: IProps) {
    const assetType = useAppSelector(AssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(AssetTypeSlice.Status);
    const dispatch = useAppDispatch();

    const select = React.useMemo(() => {
        switch (props.Type) {
            default: console.error(`Unexpected type ${props.Type} found. Using meter...`);
            // Default falls-through to Meter
            case 'Meter': return ByMeterSlice.Data;
            case 'Location': return ByLocationSlice.Data;
            case 'Customer': return CustomerSlice.Data;
            case 'Asset': return ByAssetSlice.Data;
        }
    }, [props.Type]);
    const data: Data[] = useAppSelector(select as (state: any) => Data[]);

    const [selectedData, setSelectedData] = React.useState<Data[]>();

    React.useEffect(() => {
        setSelectedData(data.filter(i => props.Selected.has(i.ID)));
    }, [data, props.Selected]);

    React.useEffect(() => {
        if (assetTypeStatus == 'changed' || assetTypeStatus == 'unintiated')
            dispatch(AssetTypeSlice.Fetch());
    }, [assetTypeStatus]);

    const closeCallback = React.useCallback((selected: Data[], confirmed: boolean) => {
        const newSelected = new Set<number>();
        selected.forEach(item => newSelected.add(item.ID));
        props.OnCloseFunction(newSelected, confirmed);
    }, [props.OnCloseFunction]);

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
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/${props.Type}/FieldName/0`,
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
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<Data>
            )), ['label'], ["asc"]);
            setFields(ordered);
        });
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

    switch (props.Type) {
        default:
        // Default falls-through to Meter
        case "Meter": return (
            <DefaultSelects.Meter
                Slice={ByMeterSlice}
                Selection={selectedData as SystemCenter.Types.DetailedMeter[]}
                OnClose={closeCallback}
                Show={props.ShowModal}
                Type={(props.Single ?? false) ? 'single' : 'multiple'}
                StorageID={props.StorageID}
                Title={props.Title === undefined ? "Select Meters" : props.Title}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalAssetFields}>
                {props.children}
                <Column Key="AssetKey" Field="AssetKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Key</Column>
                <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Name</Column>
                <Column Key="Location" Field="Location" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Substation</Column>
                <Column Key="MappedAssets" Field="MappedAssets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Assets</Column>
                <Column Key="Make" Field="Make" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Make</Column>
                <Column Key="Model" Field="Model" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Model</Column>
            </DefaultSelects.Meter>
        );
        case "Location": return (
            <DefaultSelects.Location
                Slice={ByLocationSlice}
                Selection={selectedData as SystemCenter.Types.DetailedLocation[]}
                OnClose={closeCallback}
                Show={props.ShowModal}
                Type={(props.Single ?? false) ? 'single' : 'multiple'}
                StorageID={props.StorageID}
                Title={props.Title === undefined ? "Select Substations" : props.Title}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalAssetFields}>
                {props.children}
                <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Name</Column>
                <Column Key="LocationKey" Field="LocationKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Key</Column>
                <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Meters</Column>
                <Column Key="Assets" Field="Assets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Assets</Column>
            </DefaultSelects.Location>
        );
        case "Customer": return (
            <DefaultSelects.Customer
                Slice={CustomerSlice}
                Selection={selectedData as OpenXDA.Types.Customer[]}
                OnClose={closeCallback}
                Show={props.ShowModal}
                Type={(props.Single ?? false) ? 'single' : 'multiple'}
                StorageID={props.StorageID}
                Title={props.Title === undefined ? "Select Assets" : props.Title}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalAssetFields}>
                {props.children}
                <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Name</Column>
                <Column Key="CustomerKey" Field="CustomerKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Key</Column>
                <Column Key="LSCVS" Field="LSCVS" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >LSCVS</Column>
                <Column Key="Description" Field="Description" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Description</Column>
            </DefaultSelects.Customer>
        );
        case "Asset": return (
            <DefaultSelects.Asset
                Slice={ByAssetSlice}
                Selection={selectedData as SystemCenter.Types.DetailedAsset[]}
                OnClose={closeCallback}
                Show={props.ShowModal}
                Type={(props.Single ?? false) ? 'single' : 'multiple'}
                StorageID={props.StorageID}
                Title={props.Title === undefined ? "Select Assets" : props.Title}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalAssetFields}>
                {props.children}
                <Column Key="AssetKey" Field="AssetKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Key</Column>
                <Column Key="AssetName" Field="AssetName" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Name</Column>
                <Column Key="AssetType" Field="AssetType" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Type</Column>
                <Column Key="VoltageKV" Field="VoltageKV" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Voltage (kV)</Column>
                <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Meters</Column>
                <Column Key="Locations" Field="Locations" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Substations</Column>
            </DefaultSelects.Asset>
        );
    }
}