//******************************************************************************************************
//  AddToGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, SystemCenter } from '../global';
import Table from '@gpa-gemstone/react-table';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';

declare var homePath: string;
interface Iprops<T> {
    Show: boolean,
    onComplete: (id: Array<any>) => JQueryXHR,
    setShow: (show: boolean) => void,
    getData: (search: Array<Search.IFilter<T>>, ascending: boolean, sortField: string) => JQueryXHR,
    type: ('Asset' | 'Meter' | 'Group'),
    PrimaryKey: keyof (T),
    
}

function AddToAssetGroup<T>(props: Iprops<T>) {
    const [search, setSearch] = React.useState<Array<Search.IFilter<T>>>([]);
    const [data, setData] = React.useState<Array<T>>([]);

    const [selectedData, setSelectedData] = React.useState<Array<T>>([]);

    const [sortFieldAll, setSortFieldAll] = React.useState<string>('AssetKey');
    const [ascendingAll, setAscendingAll] = React.useState<boolean>(true);

    const [sortFieldSelected, setSortFieldSelected] = React.useState<string>('AssetKey');
    const [ascendingSelected, setAscendingSelected] = React.useState<boolean>(true);

    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<T>>>(getSearchField());
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const [result, setResult] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        if (result.length == 0)
            return () => { }
        let handle = props.onComplete(result);
        handle.done(d => setResult([]))

        return () => {
            if (handle != undefined && handle.abort != null)
                handle.abort();
        }

    }, [result]);

    React.useEffect(() => {
        setSearchState('Loading')
        let handle = props.getData(search, ascendingAll, sortFieldAll);
        handle.done(d => { setSearchState('Idle'); setData(JSON.parse(d)) });
        handle.fail(msg => setSearchState('Error'));

        return () => {
            if (handle != undefined && handle.abort != null)
                handle.abort();
        }
    }, [search, sortFieldAll, ascendingAll]);

    React.useEffect(() => {
        setFilterableList(getSearchField());

        let handles = [];

        if (props.type == 'Asset')
            handles.push(getAdditionalFields('Line'));
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('Breaker'));
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('CapBank'));
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('Transformer'));
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('Bus'));
        if (props.type == 'Meter')
            handles.push(getAdditionalFields('Meter'));
        return () => {
            handles.forEach(h => { if (h.abort != null) h.abort();})
        }
    }, []);


    function getSearchField(): Array<Search.IField<T>> {
        switch (props.type) {
            case 'Asset':
                return [
                    { label: 'Name', key: 'Name', type: 'string' },
                ];
            case 'Meter':
                return [
                    { label: 'AssetKey', key: 'AssetKey', type: 'string' },
                    { label: 'Name', key: 'Name', type: 'string' },
                    { label: 'Location', key: 'Location', type: 'string' },
                    { label: 'Make', key: 'Make', type: 'string' },
                    { label: 'Model', key: 'Model', type: 'string' },
                    { label: 'Number of Assets', key: 'MappedAssets', type: 'number' },
                ];
            case 'Group':
                return [
                    { label: 'Name', key: 'Name', type: 'string' },
                    { label: 'Number of Meter', key: 'Meters', type: 'integer' },
                    { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer' },
                    { label: 'Number of Users', key: 'Users', type: 'integer' },
                    { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean' },
                ];
        }
    }

    function getStandardSearch(): Search.IField<T> {
        switch (props.type) {
            case 'Asset':
                return { label: 'Name', key: 'Name', type: 'string' };
            case 'Meter':
                return { label: 'Name', key: 'Name', type: 'string' };
            case 'Group':
                return { label: 'Name', key: 'Name', type: 'string' };
        }
    }

    function getTableCollumns() {
        switch (props.type) {
            case 'Asset':
                return [
                    { key: 'AssetKey' as keyof (T), label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetName' as keyof (T), label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetType' as keyof (T), label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'VoltageKV' as keyof (T), label: 'Voltage (kV)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters' as keyof (T), label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Locations' as keyof (T), label: 'Substations', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Meter':
                return [
                    { key: 'AssetKey' as keyof (T), label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Name' as keyof (T), label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location' as keyof (T), label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'MappedAssets' as keyof (T), label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Make' as keyof (T), label: 'Make', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Model' as keyof (T), label: 'Model', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Group':
                return [
                    { key: 'Name' as keyof (T), label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Assets' as keyof (T), label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters' as keyof (T), label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Users' as keyof (T), label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetGroups' as keyof (T), label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
        }
        
    }

    function getSelectedCollumn() {
        switch (props.type) {
            case 'Asset':
                return [
                    { key: 'AssetKey' as keyof (T), label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetName' as keyof (T), label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetType' as keyof (T), label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Meter':
                return [
                    { key: 'AssetKey' as keyof (T), label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Name' as keyof (T), label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location' as keyof (T), label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Group':
                return [
                    { key: 'Name' as keyof (T), label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
        }
        return [
            
        ]
    }

    function reset() {
        setSelectedData([]);
    }

    function getTitle() {
        switch (props.type) {
            case ('Asset'):
                return 'Add Transmission Assets'
            case ('Meter'):
                return 'Add Meters'
            case ('Group'):
                return 'Add Asset Groups'
        }
        
    }

    function getTypeLabel() {
        switch (props.type) {
            case ('Asset'):
                return 'Transmission Assets'
            case ('Meter'):
                return 'Meters'
            case ('Group'):
                return 'Asset Groups'
        }

    }

    function getAdditionalFields(Type: string): JQuery.jqXHR<Array<SystemCenter.AdditionalField>> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/${Type}/FieldName/0`,
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

        handle.done((d: Array<SystemCenter.AdditionalField>) => {

            setFilterableList(lst => {
                let ordered = _.orderBy(lst.concat(d.map(item => (
                    { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}]${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<T>
                ))), ['label'], ["asc"]);
                return ordered;
            }
            )
        });

        return handle;
    }


    return (<>
        <Modal Show={props.Show} Title={getTitle()} ShowX={true} Size={'xlg'} CallBack={(conf) => { props.setShow(false); reset(); if (conf) setResult(selectedData.map(item => item[props.PrimaryKey])); }}>
            <div className="row">
                <div className="col">
                    <SearchBar<T> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={getStandardSearch()} Width={'50%'} Label={'Search'}
                        ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + getTypeLabel()}
                        GetEnum={(setOptions, field) => {
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
                            return () => { if (handle != null && handle.abort == null) handle.abort(); }
                        }}

                    >
                    </SearchBar>
                </div>
            </div>
            <div className="row">
                <div className="col" style={{ width: '60%' }}>
                    <Table
                        cols={getTableCollumns()}
                        tableClass="table table-hover"
                        data={data}
                        sortField={sortFieldAll}
                        ascending={ascendingAll}
                        onSort={(d) => {
                            if (d.col == sortFieldAll)
                                setAscendingAll(!ascendingAll);
                            else {
                                setAscendingAll(true);
                                setSortFieldAll(d.col as string);
                            }
                        }}
                        onClick={(d) => { setSelectedData((l) => { let updated = _.cloneDeep(l); updated.push(d.row); return updated; }) }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />
                </div>
                <div className="col" style={{ width: '40%' }}>
                    <div style={{ width: '100%' }}>
                        <h3> Selected Assets </h3>
                    </div>
                    <Table
                        cols={getSelectedCollumn()}
                        tableClass="table table-hover"
                        data={selectedData}
                        sortField={sortFieldSelected}
                        ascending={ascendingSelected}
                        onSort={(d) => {
                            if (d.col == sortFieldSelected) {
                                let ordered = _.orderBy(selectedData, [d.col], [(!ascendingSelected ? "asc" : "desc")]);
                                setAscendingSelected(!ascendingSelected);
                                setSelectedData(ordered);
                            }
                            else {
                                let ordered = _.orderBy(selectedData, [d.col], ["asc"]);
                                setAscendingSelected(!ascendingSelected);
                                setSelectedData(ordered);
                                setSortFieldSelected(d.col as string);
                            }
                        }}
                        onClick={() => { }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />
                </div>
            </div>
        </Modal>
        </>)

}

interface ITransmissionAsset {
    ID: number, AssetKey: string, AssetName: string, AssetType: string, VoltageKV: number, Meters: number, Locations: string
}
interface IMeter {
    ID: number, AssetKey: string, Name: string, Location: string, MappedAssets: number, Make: string, Model: string
}


function AddToGroupPopup(props: { onComplete: (id: Array<any>) => JQueryXHR, type: ('Asset' | 'Meter' | 'Group'), Show: boolean, Close: () => void; }) {

    function searchAsset(search: Search.IFilter<ITransmissionAsset>[], ascending: boolean, sortField: string): JQueryXHR {
        const defaults = [
            { label: 'Name', key: 'Name', type: 'string' },
        ];

        let searches = search.map(s => { if (defaults.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/Asset/SearchableListIncludingMeter`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function searchMeters(search: Search.IFilter<IMeter>[], ascending: boolean, sortField: string): JQueryXHR {
        const defaults: Array<Search.IField<IMeter>> = [
            { label: 'AssetKey', key: 'AssetKey', type: 'string' },
            { label: 'Name', key: 'Name', type: 'string' },
            { label: 'Location', key: 'Location', type: 'string' },
            { label: 'Make', key: 'Make', type: 'string' },
            { label: 'Model', key: 'Model', type: 'string' },
            { label: 'Number of Assets', key: 'MappedAssets', type: 'number' },
        ];

        let searches = search.map(s => { if (defaults.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/MeterList/ExtendedSearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function searchAssetGroups(search: Search.IFilter<OpenXDA.AssetGroup>[], ascending: boolean, sortField: string): JQueryXHR {
        let searches = search;

        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/AssetGroup/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });

    }

    if (props.type == 'Asset')
        return <AddToAssetGroup<ITransmissionAsset> Show={props.Show} setShow={() => props.Close()} type='Asset' PrimaryKey='ID' getData={searchAsset} onComplete={props.onComplete} />
    if (props.type == 'Meter')
        return <AddToAssetGroup<IMeter> Show={props.Show} setShow={() => props.Close()} type='Meter' PrimaryKey='ID' getData={searchMeters} onComplete={props.onComplete} />
    if (props.type == 'Group')
        return <AddToAssetGroup<OpenXDA.AssetGroup> Show={props.Show} setShow={() => props.Close()} type='Group' PrimaryKey='ID' getData={searchAssetGroups} onComplete={props.onComplete} />
}


export default AddToGroupPopup;