//******************************************************************************************************
//  SystemCenter.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with  work for additional information regarding copyright ownership.
//  The GPA licenses  file to you under the MIT License (MIT), the "License"; you may not use 
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
//  08/22/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import FormInput from '../CommonComponents/FormInput';
import FormTextArea from '../CommonComponents/FormTextArea';
import { OpenXDA, SystemCenter } from '../global';
import { AssetAttributes } from '../AssetAttribute/Asset';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

type FieldName = 'Location.LocationKey' | 'Location.Name' | 'Note.Note' | 'Meter.AssetKey' | 'Asset.AssetKey';

const defaultSearchcols: Array<Search.IField<Location>> = [
    { label: 'Name', key: 'Name', type: 'string' },
];

interface Location {
    ID: number, LocationKey: string, Name: string, Assets: number, Meters: number
}


const ByLocation: SystemCenter.ByComponent = (props) => {
    let history = useHistory();
    const [search, setSearch] = React.useState<Array<Search.IFilter<Location>>>([]);
    const [data, setData] = React.useState<Array<Location>>([]);

    const [newLocation, setNewLocation] = React.useState<OpenXDA.Location>(getNewLocation());


    const [sortField, setSortField] = React.useState<string>('LocationKey');
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<Location>>>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const [ascending, setAscending] = React.useState<boolean>(true);

    React.useEffect(() => {
        let handle = getLocations();
        handle.done((dt: string) => {
            setSearchState('Idle');
            setData(JSON.parse(dt) as Array<Location>);
        }).fail((d) => setSearchState('Error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [sortField, ascending, search]);

   
    React.useEffect(() => {
        setNewLocation(getNewLocation());
    }, []);

    React.useEffect(() => {
        let handle = getAdditionalFields();

        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);

    function getNewLocation() {
        return {
            ID: 0,
            LocationKey: null,
            Name: null,
            Alias: null,
            Description: null,
            Latitude: null,
            Longitude: null,
            ShortName: null
        }
    }


    function getLocations(): JQuery.jqXHR<string> {
        setSearchState('Loading');
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/openXDA/Location/SearchableListIncludingMeter`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function getAdditionalFields(): JQuery.jqXHR<Array<SystemCenter.AdditionalField>> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/Location/FieldName/0`,
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
            let ordered = _.orderBy(defaultSearchcols.concat(d.map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<Location>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }

    function addNewLocation() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Location/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newLocation),
            cache: false,
            async: true
        })
            //.done((data) => getData());

    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Location&LocationID=' + item.row.ID, state: {} })
    }

    function valid(field: keyof(OpenXDA.Location)): boolean {
        if (field == 'LocationKey')
            return newLocation.LocationKey != null;
        else if (field == 'Name')
            return newLocation.Name != null && newLocation.Name.length > 0 && newLocation.Name.length <= 200;
        else if (field == 'Alias')
            return newLocation.Alias == null || newLocation.Alias.length <= 200;
        else if (field == 'ShortName')
            return newLocation.ShortName == null || newLocation.ShortName.length <= 50;
        else if (field == 'Latitude')
            return newLocation.Latitude != null && AssetAttributes.isRealNumber(newLocation.Latitude);
        else if (field == 'Longitude')
            return newLocation.Longitude != null && AssetAttributes.isRealNumber(newLocation.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }

    const standardSearch: Search.IField<Location> = { label: 'Name', key: 'Name', type: 'string' };
    return (
        <div style={{ width: '100%', height: '100%' }}>

            <SearchBar<Location> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={standardSearch} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Locations'}
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

                        
                {/*<option value='Location.LocationKey'>Key</option>
                <option value='Location.Name'>Name</option>
                <option value='Note.Note'>Note</option>
                <option value='Meter.AssetKey'>Meter</option>
                <option value='Asset.AssetKey'>Asset</option>*/}

                    
            <li className="nav-item" style={{ width: '20%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <div className="form-group">
                            <button className="btn btn-primary" data-toggle='modal' data-target="#locationModal" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault() }}>Add Substation</button>
                        </div>
                        <div className="form-group">
                                <button className="btn btn-primary" data-toggle='modal' data-target="#extDBModal" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault() }}>Update Ext DB </button>
                        </div>
                    </form>
                </fieldset>
            </li>
            </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<Location>
                    cols={[
                        { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'LocationKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        //{ key: 'Type', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Meters', label: 'Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Assets', label: 'Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortField={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.col == sortField)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortField(d.col);
                        }
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <div className="modal" id="locationModal">
                <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Substation</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <FormInput<OpenXDA.Location> Record={newLocation} Field={'LocationKey'} Feedback={'A unique key of less than 50 characters is required.'} Valid={valid} Setter={setNewLocation} />
                                    <FormInput<OpenXDA.Location> Record={newLocation} Field={'Name'} Feedback={'Name must be less than 200 characters and is required.'} Valid={valid} Setter={setNewLocation} />
                                    <FormInput<OpenXDA.Location> Record={newLocation} Field={'ShortName'} Feedback={'ShortName must be less than 50 characters.'} Valid={valid} Setter={setNewLocation} />
                                    <FormInput<OpenXDA.Location> Record={newLocation} Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={valid} Setter={setNewLocation} />
                                </div>
                                <div className="col">
                                    <FormInput<OpenXDA.Location> Record={newLocation} Field={'Latitude'} Feedback={'Latitude is a require numeric field.'} Valid={valid} Setter={setNewLocation} />
                                    <FormInput<OpenXDA.Location> Record={newLocation} Field={'Longitude'} Feedback={'Longitude is a require numeric field.'} Valid={valid} Setter={setNewLocation} />
                                    <FormTextArea<OpenXDA.Location> Rows={3} Record={newLocation} Field={'Description'} Valid={valid} Setter={setNewLocation} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewLocation}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal" id="extDBModal">
                <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Substation External Database Fields</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <ExternalDBUpdate ID={-1} Type='Location' Tab = ""/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
   
}

export default ByLocation;
