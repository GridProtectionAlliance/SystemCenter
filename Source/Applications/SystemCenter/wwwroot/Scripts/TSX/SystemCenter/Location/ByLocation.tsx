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
import { ReactTable, Paging } from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from '../AssetAttribute/Asset';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { Search, Modal } from '@gpa-gemstone/react-interactive';
import { Input, TextArea } from '@gpa-gemstone/react-forms';
import { DefaultSearch } from '@gpa-gemstone/common-pages';
import { ByLocationSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';

declare var homePath: string;

const ByLocation: Application.Types.iByComponent = (props) => {

    let history = useHistory();
    const dispatch = useAppDispatch();
    const data = useAppSelector(ByLocationSlice.SearchResults);
    const ascending = useAppSelector(ByLocationSlice.Ascending);
    const sortKey = useAppSelector(ByLocationSlice.SortField);
    const searchFields = useAppSelector(ByLocationSlice.SearchFilters);
    const allKeys = useAppSelector(ByLocationSlice.Data);
    const searchStatus = useAppSelector(ByLocationSlice.SearchStatus);
    const status = useAppSelector(ByLocationSlice.Status);
    const [newLocation, setNewLocation] = React.useState<SystemCenter.Types.DetailedLocation>(getNewLocation());
    const [newLocationErrors, setNewLocationErrors] = React.useState<string[]>([]);
    const [showEXTModal, setShowExtModal] = React.useState<boolean>(false);
    const extDbUpdateAll = React.useRef<() => (() => void)>(undefined);

    const allPages = useAppSelector(ByLocationSlice.TotalPages);
    const currentPage = useAppSelector(ByLocationSlice.CurrentPage);
    const [page, setPage] = React.useState<number>(currentPage);

    const [showNew, setShowNew] = React.useState<boolean>(false);

    React.useEffect(() => {
        let errors = [];
        if (newLocation.LocationKey == null || newLocation.LocationKey.length < 1)
            errors.push('A Key is required.');
        if (newLocation.Name == null || newLocation.Name.length < 1)
            errors.push('A Name is required.');
        if (newLocation.Name != null && newLocation.Name.length > 200)
            errors.push('Name must be less than 200 characters.');
        if (newLocation.Alias != null && newLocation.Alias.length > 200)
            errors.push('Alias must be less than 200 characters.');
        if (newLocation.ShortName != null && newLocation.ShortName.length > 50)
            errors.push('Short Name must be less than 50 characters.');
        if (newLocation.Latitude == null)
            errors.push('Latitude is required.');
        if (newLocation.Longitude == null)
            errors.push('Longitude is required.');
        if (newLocation.Latitude != null && !AssetAttributes.isRealNumber(newLocation.Latitude))
            errors.push('Latitude must be numeric.');
        if (newLocation.Longitude != null && !AssetAttributes.isRealNumber(newLocation.Longitude))
            errors.push('Longitude must be numeric.');
        if (newLocation.Latitude != null && AssetAttributes.isRealNumber(newLocation.Latitude) && (newLocation.Latitude > 180 || newLocation.Latitude < -180))
            errors.push('Latitude must be between -180 and 180.')
        if (newLocation.Longitude != null && AssetAttributes.isRealNumber(newLocation.Longitude) && (newLocation.Longitude > 180 || newLocation.Longitude < -180))
            errors.push('Longitude must be between -180 and 180.')
        if (allKeys.findIndex((item) => item.LocationKey == newLocation.LocationKey) > -1)
            errors.push('Key must be unique.');

        setNewLocationErrors(errors);

    }, [newLocation, allKeys]);

    React.useEffect(() => {
        if (status == 'changed' || status == 'unintiated')
            dispatch(ByLocationSlice.Fetch());
    }, [dispatch, status])

    React.useEffect(() => {
        if (searchStatus == 'changed' || searchStatus == 'unintiated')
            dispatch(ByLocationSlice.PagedSearch({ filter: searchFields, sortField: sortKey, ascending, page }));
    }, [searchStatus, dispatch, searchFields, sortKey, ascending, page]);

    function getNewLocation() {
        return {
            ID: 0,
            LocationKey: null,
            Name: null,
            Alias: null,
            Description: null,
            Latitude: null,
            Longitude: null,
            ShortName: null,
            Meters: 0,
            Assets: 0
        }
    }

    function getAdditionalFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/Location/FieldName/0`,
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
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<SystemCenter.Types.DetailedLocation>
            )), ['label'], ["asc"]);
            setFields(ordered)
        });

        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

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
            if (handle != null && handle.abort == null)
                handle.abort();
        }
    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Location&LocationID=' + item.row.ID })
    }

    function valid(field: keyof (SystemCenter.Types.DetailedLocation)): boolean {
        if (field == 'LocationKey')
            return newLocation.LocationKey != null && allKeys.findIndex((item) => item.LocationKey == newLocation.LocationKey) == -1;
        else if (field == 'Name')
            return newLocation.Name != null && newLocation.Name.length > 0 && newLocation.Name.length <= 200;
        else if (field == 'Alias')
            return newLocation.Alias == null || newLocation.Alias.length <= 200;
        else if (field == 'ShortName')
            return newLocation.ShortName == null || newLocation.ShortName.length <= 50;
        else if (field == 'Latitude')
            return newLocation.Latitude != null && AssetAttributes.isRealNumber(newLocation.Latitude) && newLocation.Latitude < 180 && newLocation.Latitude > -180;
        else if (field == 'Longitude')
            return newLocation.Longitude != null && AssetAttributes.isRealNumber(newLocation.Longitude) && newLocation.Longitude < 180 && newLocation.Longitude > -180;
        else if (field == 'Description')
            return true;
        return false;
    }

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <DefaultSearch.Location Slice={ByLocationSlice} GetEnum={getEnum} GetAddlFields={getAdditionalFields} StorageID={'LocationsFilter'}>
                <li className="nav-item" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0} style={{ width: '20%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-primary" 
                                    onClick={(event) => { event.preventDefault(); setShowNew(true); }}>Add Substation</button>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" 
                                    onClick={(event) => { event.preventDefault(); setShowExtModal(true); }}>External Database</button>
                            </div>
                        </form>
                    </fieldset>
                </li>
            </DefaultSearch.Location>

            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <ReactTable.Table<SystemCenter.Types.DetailedLocation>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey === sortKey)
                            dispatch(ByLocationSlice.Sort({ SortField: sortKey, Ascending: ascending }));
                        else {
                            dispatch(ByLocationSlice.Sort({ SortField: d.colField as keyof SystemCenter.Types.DetailedLocation, Ascending: true }));
                        }
                    }}
                    OnClick={handleSelect}
                    TableStyle={{
                        padding: 0, width: '100%', height: '100%',
                        tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                    }}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<SystemCenter.Types.DetailedLocation>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<SystemCenter.Types.DetailedLocation>
                        Key={'LocationKey'}
                        AllowSort={true}
                        Field={'LocationKey'}
                        HeaderStyle={{ width: '30%' }}
                        RowStyle={{ width: '30%' }}
                    > Key
                    </ReactTable.Column>
                    <ReactTable.Column<SystemCenter.Types.DetailedLocation>
                        Key={'Meters'}
                        AllowSort={true}
                        Field={'Meters'}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                    > Meters
                    </ReactTable.Column>
                    <ReactTable.Column<SystemCenter.Types.DetailedLocation>
                        Key={'Assets'}
                        AllowSort={true}
                        Field={'Assets'}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                    > Assets
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>
            <div className="row">
                <div className="col">
                    <Paging Current={page + 1} Total={allPages} SetPage={(p) => setPage(p - 1)} />
                </div>
            </div>

            <Modal Show={showNew} Size={'lg'} Title={'Add New Substation'}
                ShowX={true}
                CallBack={(conf) => {
                    if (conf)
                        dispatch(ByLocationSlice.DBAction({ verb: "POST", record: newLocation }))
                    setShowNew(false);
                }}
                ConfirmShowToolTip={newLocationErrors.length > 0}
                ConfirmToolTipContent={
                    newLocationErrors.map((t, i) => <p key={i}>
                        {CrossMark} {t}
                    </p>)
                }
                DisableConfirm={newLocationErrors.length > 0}
            >
                <div className="row">
                    <div className="col">
                        <Input<SystemCenter.Types.DetailedLocation> Record={newLocation} Label='Key' Field={'LocationKey'} Feedback={'A unique Key of less than 50 characters is required.'} Valid={valid} Setter={setNewLocation} />
                        <Input<SystemCenter.Types.DetailedLocation> Record={newLocation} Label='Name' Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={valid} Setter={setNewLocation} />
                        <Input<SystemCenter.Types.DetailedLocation> Record={newLocation} Label='Short Name' Field={'ShortName'} Feedback={'Short Name must be less than 50 characters.'} Valid={valid} Setter={setNewLocation} />
                        <Input<SystemCenter.Types.DetailedLocation> Record={newLocation} Label='Alias' Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={valid} Setter={setNewLocation} />
                    </div>
                    <div className="col">
                        <Input<SystemCenter.Types.DetailedLocation> Record={newLocation} Label='Latitude' Field={'Latitude'} Feedback={'A numeric Latitude value between -180 and 180 is required.'} Valid={valid} Setter={setNewLocation} />
                        <Input<SystemCenter.Types.DetailedLocation> Record={newLocation} Label='Longitude' Field={'Longitude'} Feedback={'A numeric Longitude value between -180 and 180 is required.'} Valid={valid} Setter={setNewLocation} />
                        <TextArea<SystemCenter.Types.DetailedLocation> Rows={3} Record={newLocation} Label='Description' Field={'Description'} Valid={valid} Setter={setNewLocation} />
                    </div>
                </div>
            </Modal>
            <Modal Show={showEXTModal} Size={'xlg'} Title={'Substation External Database Fields'}
                ShowCancel={true} ConfirmText={'Update All'} CancelText={'Close'} CallBack={(c) => {
                    if (c && extDbUpdateAll.current !== undefined) extDbUpdateAll.current();
                    if (!c) setShowExtModal(false);
                }}>
                <ExternalDBUpdate Type={'Location'} UpdateAll={extDbUpdateAll} />
            </Modal>
        </div>
    )

}

export default ByLocation;