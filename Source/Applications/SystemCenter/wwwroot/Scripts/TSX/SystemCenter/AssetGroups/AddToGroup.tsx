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
import { OpenXDA } from '../global';
import { useHistory } from 'react-router-dom';
import { isEqual } from 'lodash';
import Table from '../CommonComponents/Table';
import ParameterSearch, { ISearch } from '../CommonComponents/ParameterSearch';

declare var homePath: string;
interface Iprops<T> { id: string, onComplete: (id: Array<any>) => JQueryXHR, getData: (search: Array<ISearch>) => JQueryXHR, type: ('Asset'| 'Meter'|'Group'), PrimaryKey: keyof(T) }

function AddToAssetGroup<T>(props: Iprops<T>) {
    const [search, setSearch] = React.useState<Array<ISearch>>([]);
    const [data, setData] = React.useState<Array<T>>([]);

    const [selectedData, setSelectedData] = React.useState<Array<T>>([]);

    const [sortFieldAll, setSortFieldAll] = React.useState<string>('AssetKey');
    const [ascendingAll, setAscendingAll] = React.useState<boolean>(true);

    const [sortFieldSelected, setSortFieldSelected] = React.useState<string>('AssetKey');
    const [ascendingSelected, setAscendingSelected] = React.useState<boolean>(true);

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

    }, [result])
    React.useEffect(() => {
        let handle = props.getData(search);
        handle.done(d => setData(d) )
        return () => {
            if (handle != undefined && handle.abort != null)
                handle.abort();
        }
    }, [search]);

    function getSearchField() {
        switch (props.type) {
            case 'Asset':
                return [
                    { key: 'Asset.AssetKey', label: 'Key' },
                    { key: 'Asset.AssetName', label: 'Name' },
                    { key: 'AssetType.Name', label: 'AssetType' },
                    { key: 'Asset.VoltageKV', label: 'VoltageKV' },
                    { key: 'Meter.AssetKey', label: 'Meter' },
                    { key: 'Location.LocationKey', label: 'Location' },
                    { key: 'Note.Note', label: 'Note' },
                ];
            case 'Meter':
                return [
                    { key: 'Meter.AssetKey', label: 'Key' },
                    { key: 'Meter.Name', label: 'Name' },
                    { key: 'Meter.Location', label: 'Location' },
                    { key: 'Meter.Make', label: 'Make' },
                    { key: 'Meter.Model', label: 'Model' },
                    { key: 'Asset.AssetKey', label: 'Asset' },
                    { key: 'Note.Note', label: 'Note' },
                ];
            case 'Group':
                return [
                    { key: 'Name', label: 'Name' },
                ];
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

    return (<div className="modal" id={props.id}>
        <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{getTitle()}</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={(evt) => { $('#' + props.id).hide(); reset(); }}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col">
                            <ParameterSearch Fields={getSearchField()} getData={(searchFields) => setSearch(searchFields)} />
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
                                    if (d.col == sortFieldAll) {
                                        let ordered = _.orderBy(data, [d.col], [(!ascendingAll ? "asc" : "desc")]);
                                        setAscendingAll(!ascendingAll);
                                        setData(ordered);
                                    }
                                    else {
                                        let ordered = _.orderBy(data, [d.col], ["asc"]);
                                        setAscendingAll(!ascendingAll);
                                        setData(ordered);
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
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { $('#' + props.id).hide(); reset(); setResult(selectedData.map(item => item[props.PrimaryKey])) }}>Add</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => { $('#' + props.id).hide(); reset(); }}>Close</button>
                </div>

            </div>
        </div>
    </div>)

}

interface ITransmissionAsset {
    ID: number, AssetKey: string, AssetName: string, AssetType: string, VoltageKV: number, Meters: number, Locations: string
}
interface IMeter {
    ID: number, AssetKey: string, Name: string, Location: string, MappedAssets: number, Make: string, Model: string
}


function AddToGroupPopup(props: { onComplete: (id: Array<any>) => JQueryXHR, type: ('Asset' | 'Meter' | 'Group') }) {

    function searchAsset(search): JQueryXHR {
        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/Asset/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }

    function searchMeters(search): JQueryXHR {
        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/Meter/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }

    function searchAssetGroups(search): JQueryXHR {
        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/AssetGroup/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }

    if (props.type == 'Asset')
        return <AddToAssetGroup<ITransmissionAsset> id='AddAsset' type='Asset' PrimaryKey='ID' getData={searchAsset} onComplete={props.onComplete} />
    if (props.type == 'Meter')
        return <AddToAssetGroup<IMeter> id='AddMeter' type='Meter' PrimaryKey='ID' getData={searchMeters} onComplete={props.onComplete} />
    if (props.type == 'Group')
        return <AddToAssetGroup<IMeter> id='AddGroup' type='Group' PrimaryKey='ID' getData={searchAssetGroups} onComplete={props.onComplete} />
}


export default AddToGroupPopup;