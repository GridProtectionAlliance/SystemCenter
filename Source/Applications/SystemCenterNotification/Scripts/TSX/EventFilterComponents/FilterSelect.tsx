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
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import * as $ from 'jquery';
import { GenericController, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { Column } from '@gpa-gemstone/react-table';
import { ControllerSelects } from '../CommonComponents/ControllerSelects'

interface IProps {
    IDs: number[],
    Type: ('Meter' | 'Asset' | 'AssetGroup' | 'Location'),
    Show: boolean,
    OnClose: () => void,
    OnConfirm: (ids: number[]) => void
}

type Data = (SystemCenter.Types.DetailedMeter | SystemCenter.Types.DetailedAsset | OpenXDA.Types.AssetGroup | SystemCenter.Types.DetailedLocation);

function FilterSelect(props: IProps) {

    const [data, setData] = React.useState<Data[]>([]);
    const [selectedData, setSelectedData] = React.useState<Data[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [addlFields, setAddlFields] = React.useState<Search.IField<Data>[]>([])

    // get data according to whatever
    React.useEffect(() => {
        let controller;
        switch (props.Type) {
            case 'Meter':
                controller = new GenericController<SystemCenter.Types.DetailedMeter>(`${homePath}api/OpenXDA/Event/Meter`, "Name", true);
                break;
            case 'Asset':
                controller = new GenericController<OpenXDA.Types.DetailedAsset>(`${homePath}api/OpenXDA/Event/Asset`, "AssetName", true);
                break;
            case 'AssetGroup':
                controller = new GenericController<OpenXDA.Types.AssetGroup>(`${homePath}api/openXDA/Event/AssetGroup`, 'Name');
                break;
            case 'Location':
                controller = new GenericController<SystemCenter.Types.DetailedLocation>(`${homePath}api/OpenXDA/Event/Location`, "LocationKey", true);
                break;
        }
        setStatus('loading');
        const h = controller.Fetch();
        h.done((d) => {
            setStatus('idle');
            setData(d);
        })
        h.fail(() => {
            setStatus('error');
        })

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [props.Type])

    React.useEffect(() => {
        setSelectedData(data.filter(i => props.IDs.findIndex((j) => j == i.ID) > -1));
    }, [props.Type, data])

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


    React.useEffect(() => { 
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/openXDA/AdditionalFieldView/ParentTable/${props.Type}/FieldName/0`,
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
            setAddlFields(ordered);
        });
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }, [props.Type])



    if (props.Type == 'Meter')
        return <ControllerSelects<SystemCenter.Types.DetailedMeter>
            Controller={new GenericController<SystemCenter.Types.DetailedMeter>(`${homePath}api/OpenXDA/Event/Meter`, "Name", true)}
            Selection={selectedData as any}
            OnClose={(selected, conf) => {
                props.OnClose();
                if (conf)
                    props.OnConfirm(selected.map(m => m.ID));
            }}
            Show={props.Show}
            Type={'multiple'}
            Title={`Filter by Meter`}
            MinSelection={0}
            PrimaryKey={'ID'}
            Searchbar={(children, setFilter, searchStatus, resultCount) =>
                <SearchBar<SystemCenter.Types.DetailedMeter>
                    SetFilter={setFilter}
                    CollumnList={[
                        { label: 'Key', key: 'AssetKey', type: 'string', isPivotField: false },
                        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                        { label: 'Substation Name', key: 'Location', type: 'string', isPivotField: false },
                        { label: 'Make', key: 'Make', type: 'string', isPivotField: false },
                        { label: 'Model', key: 'Model', type: 'string', isPivotField: false },
                        { label: 'Number of Assets', key: 'MappedAssets', type: 'number', isPivotField: false },
                        { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
                        ...addlFields
                    ]}
                    defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                    GetEnum={getEnum}
                />
            }
            DefaultSortField={'Name'}
        >
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
        </ControllerSelects>

    if (props.Type == 'Asset')
        return <ControllerSelects<OpenXDA.Types.DetailedAsset>
            Controller={new GenericController<OpenXDA.Types.DetailedAsset>(`${homePath}api/OpenXDA/Event/Asset`, "AssetName", true)}
            Selection={selectedData as any}
            OnClose={(selected, conf) => {
                props.OnClose();
                if (conf)
                    props.OnConfirm(selected.map(m => m.ID));
            }}
            Show={props.Show}
            Type={'multiple'}
            Title={"Filter by Asset"}
            MinSelection={0}
            PrimaryKey={'ID'}
            Searchbar={(children, setFilter, searchStatus, resultCount) =>
                <SearchBar<OpenXDA.Types.DetailedAsset>
                    SetFilter={setFilter}
                    CollumnList={[
                        { label: 'Key', key: 'AssetKey', type: 'string', isPivotField: false },
                        { label: 'Name', key: 'AssetName', type: 'string', isPivotField: false },
                        { label: 'Nominal Voltage (L-L kV)', key: 'VoltageKV', type: 'number', isPivotField: false },
                        { label: 'Type', key: 'AssetType', type: 'enum', isPivotField: false },
                        { label: 'Meter Key', key: 'Meter', type: 'string', isPivotField: false },
                        { label: 'Substation Key', key: 'Location', type: 'string', isPivotField: false },
                        { label: 'Number of Meters', key: 'Meters', type: 'integer', isPivotField: false },
                        { label: 'Number of Substations', key: 'Locations', type: 'integer', isPivotField: false },
                        { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
                        ...addlFields
                    ]}
                    defaultCollumn={{label: 'Name', key: 'AssetName', type: 'string', isPivotField: false}}
                    GetEnum={getEnum}
                />
            }
            DefaultSortField={'AssetName'}
        >
            <Column Key="AssetKey" Field="AssetKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Key</Column>
            <Column Key="AssetName" Field="AssetName" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Name</Column>
            <Column Key="AssetType" Field="AssetType" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Asset Type</Column>
            <Column Key="VoltageKV" Field="VoltageKV" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Voltage (kV)</Column>
            <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Meters</Column>
            <Column Key="Locations" Field="Locations" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Substations</Column>
        </ControllerSelects>


    if (props.Type == 'AssetGroup')
        return <ControllerSelects<OpenXDA.Types.AssetGroup>
            Controller={new GenericController<OpenXDA.Types.AssetGroup>(`${homePath}api/openXDA/Event/AssetGroup`, 'Name')}
            Selection={selectedData as any}
            OnClose={(selected, conf) => {
                props.OnClose();
                if (conf)
                    props.OnConfirm(selected.map(m => m.ID));
            }}
            Show={props.Show}
            Type={'multiple'}
            Title={"Filter by AssetGroup"}
            MinSelection={0}
            PrimaryKey={'ID'}
            Searchbar={(children, setFilter, searchStatus, resultCount) =>
                <SearchBar<OpenXDA.Types.AssetGroup>
                    SetFilter={setFilter}
                    CollumnList={[
                        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                        { label: 'Number of Meters', key: 'Meters', type: 'integer', isPivotField: false },
                        { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer', isPivotField: false },
                        { label: 'Number of Asset Groups', key: 'AssetGroups', type: 'integer', isPivotField: false },
                        { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean', isPivotField: false },
                        { label: 'Show in Email Subscription', key: 'DisplayEmail', type: 'boolean', isPivotField: false },
                        ...addlFields
                    ]}
                    GetEnum={getEnum}
                    defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                />
            }
            DefaultSortField={'Name'}
        >
            <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Name</Column>
            <Column Key="Assets" Field="Assets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Assets</Column>
            <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Meters</Column>
            <Column Key="Users" Field="Users" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Users</Column>
            <Column Key="AssetGroups" Field="AssetGroups" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Sub Groups</Column>
        </ControllerSelects>

    if (props.Type == 'Location')
        return <ControllerSelects<SystemCenter.Types.DetailedLocation>
            Controller={new GenericController<SystemCenter.Types.DetailedLocation>(`${homePath}api/OpenXDA/Event/Location`, "LocationKey", true)}
            Selection={selectedData as any}
            OnClose={(selected, conf) => {
                props.OnClose();
                if (conf)
                    props.OnConfirm(selected.map(m => m.ID));
            }}
            Show={props.Show}
            Type={'multiple'}
            Title={"Filter by Substation"}
            MinSelection={0}
            PrimaryKey={'ID'}
            Searchbar={(children, setFilter, searchStatus, resultCount) =>
                <SearchBar<SystemCenter.Types.DetailedLocation>
                    SetFilter={setFilter}
                    CollumnList={[
                        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                        { label: 'Key', key: 'LocationKey', type: 'string', isPivotField: false },
                        { label: 'Asset Key', key: 'Asset', type: 'string', isPivotField: false },
                        { label: 'Meter Key', key: 'Meter', type: 'string', isPivotField: false },
                        { label: 'Number of Assets', key: 'Assets', type: 'integer', isPivotField: false },
                        { label: 'Number of Meters', key: 'Meters', type: 'integer', isPivotField: false },
                        { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
                        ...addlFields
                    ]}
                    GetEnum={getEnum}
                    defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false } }
                />
            }
            DefaultSortField={'Name'}

        >
            <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Name</Column>
            <Column Key="LocationKey" Field="LocationKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Key</Column>
            <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Meters</Column>
            <Column Key="Assets" Field="Assets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Assets</Column>
        </ControllerSelects>
    return null
}


export default FilterSelect;