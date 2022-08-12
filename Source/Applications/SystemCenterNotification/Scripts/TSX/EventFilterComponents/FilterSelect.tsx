//******************************************************************************************************
//  FilterSelect.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  10/05/2021 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import React from 'react';
import 'moment';
import _ from 'lodash';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { useAppDispatch, useAppSelector } from '../hooks';
import { EventMeterSlice, EventLocationSlice, EventAssetSlice, EventAssetGroupSlice } from '../Store';
import * as $ from 'jquery';
import { Search } from '@gpa-gemstone/react-interactive';

interface IProps {
    IDs: number[],
    Type: ('Meter' | 'Asset' | 'AssetGroup' | 'Location'),
    Show: boolean,
    OnClose: () => void,
    OnConfirm: (ids: number[]) => void
}

type Data = (SystemCenter.Types.DetailedMeter | SystemCenter.Types.DetailedAsset | OpenXDA.Types.AssetGroup | SystemCenter.Types.DetailedLocation);

function FilterSelect(props: IProps) {
    const dispatch = useAppDispatch();
    const select = React.useMemo(() => {
        if (props.Type == 'Meter') return EventMeterSlice.Data;
        if (props.Type == 'Location') return EventLocationSlice.Data;
        if (props.Type == 'Asset') return EventAssetSlice.Data;
        if (props.Type == 'AssetGroup') return EventAssetGroupSlice.Data;
    }, [props.Type])

    const slice = React.useMemo(() => {
        if (props.Type == 'Meter') return EventMeterSlice 
        if (props.Type == 'Location')  return EventLocationSlice 
        if (props.Type == 'Asset')  return EventAssetSlice 
        if (props.Type == 'AssetGroup')  return EventAssetGroupSlice
    }, [props.Type])


    const data: Data[] = useAppSelector(select as (state: any) => Data[]);
    const [selectedData, setSelectedData] = React.useState<Data[]>();

    React.useEffect(() => {
        setSelectedData(data.filter(i => props.IDs.findIndex((j) => j == i.ID) > -1));
    }, [data])

    function getEnum(setOptions, field) {
        let handle = null;
        if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
            return () => { };

        handle = $.ajax({
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


    function getAdditionalFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/${props.Type}/FieldName/0`,
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

        handle.done((d: Array<SystemCenter.Types.AdditionalField>) => {

            let ordered = _.orderBy(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<Data>
            )), ['label'], ["asc"]);
            setFields(ordered);
        });
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }



    if (props.Type == 'Meter')
        return <DefaultSelects.Meter
            Slice={slice as any}
         Selection={selectedData as SystemCenter.Types.DetailedMeter[]}
        OnClose={(selected, conf) => {
            props.OnClose();
            if (conf) 
                props.OnConfirm(selected.map(m => m.ID));
         }}
         Show={props.Show}
            Type={'multiple'}
            Columns={[
                { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Location', field: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'MappedAssets', field: 'MappedAssets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Make', field: 'Make', label: 'Make', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Model', field: 'Model', label: 'Model', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
            ]}
            Title={"Filter Meters"}
            GetEnum={getEnum}
         GetAddlFields={getAdditionalFields} />

    if (props.Type == 'Asset')
            return <DefaultSelects.Asset
                Slice={slice as any}
                Selection={selectedData as SystemCenter.Types.DetailedAsset[]}
                OnClose={(selected, conf) => {
                    props.OnClose();
                    if (conf)
                        props.OnConfirm(selected.map(m => m.ID));
                }}
                Show={props.Show}
                Type={'multiple'}
                Columns={[{ key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'AssetType', field: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'VoltageKV', field: 'VoltageKV', label: 'Voltage (kV)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Locations', field: 'Locations', label: 'Substations', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } }]}
                Title={"Filter Transmission Assets"}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalFields} />

    if (props.Type == 'AssetGroup')
            return <DefaultSelects.AssetGroup
                Slice={slice as any}
                Selection={selectedData as OpenXDA.Types.AssetGroup[]}
                OnClose={(selected, conf) => {
                    props.OnClose();
                    if (conf)
                        props.OnConfirm(selected.map(m => m.ID));
                }}
                Show={props.Show}
                Type={'multiple'}
                Columns={[
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Assets', field: 'Assets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Users', field: 'Users', label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetGroups', field: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Filter Asset Groups"}
                GetEnum={getEnum}
            GetAddlFields={() => () => { }} />

    if (props.Type == 'Location')
        return <DefaultSelects.Location
            Slice={slice as any}
            Selection={selectedData as SystemCenter.Types.DetailedLocation[]}
            OnClose={(selected, conf) => {
                props.OnClose();
                if (conf)
                    props.OnConfirm(selected.map(m => m.ID));
            }}
            Show={props.Show}
            Type={'multiple'}
            Columns={[
                { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'LocationKey', field: 'LocationKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                { key: 'Assets', field: 'Assets', label: 'Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
            ]}
            Title={"Filter by Location"}
            GetEnum={getEnum}
            GetAddlFields={getAdditionalFields} />

    return null
}


export default FilterSelect;