//******************************************************************************************************
//  ByAsset.tsx - Gbtc
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
import Table from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import { CheckBox, Input } from '@gpa-gemstone/react-forms';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import AddToGroup from './AddToGroup';
import { AssetGroupSlice, ByAssetSlice, ByMeterSlice } from '../Store/Store';

declare var homePath: string;


const defaultSearchcols: Array<Search.IField<AssetGroup>> = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Number of Meter', key: 'Meters', type: 'integer', isPivotField: false },
    { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer', isPivotField: false },
    { label: 'Number of Users', key: 'Users', type: 'integer', isPivotField: false },
    { label: 'Number of Asset Groups', key: 'AssetGroups', type: 'integer', isPivotField: false },
    { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean', isPivotField: false },     
];

interface AssetGroup {
    ID: number, Name: string, DisplayDashboard: boolean, AssetGroups: number, Meters: number, Assets: number, Users: number
}

interface extendedAssetGroup extends AssetGroup { MeterList: Array<SystemCenter.Types.DetailedMeter>, AssetList: Array<SystemCenter.Types.DetailedAsset>, UserList: Array<number>, AssetGroupList: Array<OpenXDA.Types.AssetGroup> }

const emptyAssetGroup: extendedAssetGroup = { ID: -1, Name: '', DisplayDashboard: true, AssetGroups: 0, Meters: 0, Assets: 0, Users: 0, MeterList: [], AssetList: [], UserList: [], AssetGroupList: [] };

declare var homePath: string;

const ByAssetGroup: Application.Types.iByComponent = (props) => {
    let history = useHistory();

    const [search, setSearch] = React.useState<Array<Search.IFilter<AssetGroup>>>([]);
    const [showFilter, setFilter] = React.useState<('None' | 'Meter' | 'Asset' | 'Asset Group' | 'Station')>('None');
    const [data, setData] = React.useState<Array<AssetGroup>>([]);
    const [sortKey, setSortKey] = React.useState<string>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<AssetGroup>>>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');


    const [newAssetGroup, setNewAssetGroup] = React.useState<extendedAssetGroup>(_.cloneDeep(emptyAssetGroup));
    const [allAssetGroups, setAllAssetGroups] = React.useState<Array<AssetGroup>>([]);
    const [showNewGroup, setShowNewGroup] = React.useState<boolean>(false);

    const [assetGrpErrors, setAssetGrpErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        let handle2 = getAllAssetGroups();
        handle2.done(aas => setAllAssetGroups(aas));


        return function cleanup() {

            if (handle2.abort != null)
                handle2.abort();
        }
    }, []);

    React.useEffect(() => {
        let handle = getAssetGroups();

        handle.done((data: string) => {
            setSearchState('Idle');
            setData(JSON.parse(data) as AssetGroup[])
        }).fail((d) => setSearchState('Error'));
        
        return () => {
            if (handle.abort != null)
                handle.abort();
        };

    }, [search, ascending, sortKey]);

    React.useEffect(() => {
        let e = [];
        if (newAssetGroup.Name == null || newAssetGroup.Name.length == 0)
            e.push('A Name is required.');
        else if (allAssetGroups.map(item => item.Name.toLowerCase()).indexOf(newAssetGroup.Name.toLowerCase()) > -1)
            e.push('The Name has to be unique.');
        setAssetGrpErrors(e);
    }, [newAssetGroup]);
    function getAssetGroups(): JQueryXHR {
        setSearchState('Loading');
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/AssetGroup/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortKey, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function getAllAssetGroups(): JQueryXHR {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })
    }

    function addNewAssetGroup() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Assetgroup/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ ...newAssetGroup, AssetList: newAssetGroup.AssetList.map(x => x.ID), AssetGroupList: newAssetGroup.AssetGroupList.map(x => x.ID), MeterList: newAssetGroup.MeterList.map(x => x.ID) }),
            cache: false,
            async: true
        }).done((d: OpenXDA.Types.AssetGroup) => {
            let handle1 = $.ajax({
                type: "Post",
                url: `${homePath}api/OpenXDA/AssetGroup/${d.ID}/AddAssets`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(newAssetGroup.AssetList.map(x => x.ID)),
                cache: false,
                async: true
            });

            let handle2 = $.ajax({
                type: "Post",
                url: `${homePath}api/OpenXDA/AssetGroup/${d.ID}/AddAssetGroups`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(newAssetGroup.AssetGroupList.map(x => x.ID)),
                cache: false,
                async: true
            });

            let handle3 = $.ajax({
                type: "Post",
                url: `${homePath}api/OpenXDA/AssetGroup/${d.ID}/AddMeters`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(newAssetGroup.MeterList.map(x => x.ID)),
                cache: false,
                async: true
            });

            Promise.all([handle1,handle2, handle3]).then((x) => {
                sessionStorage.clear();
                history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + d.ID, state: {} })
            }, (msg) => {
                if (msg.status == 500)
                    alert(msg.responseJSON.ExceptionMessage)
            });
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });

    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + item.row.ID, state: {} })
    }

    function valid(field: keyof (OpenXDA.Types.AssetGroup)): boolean {
        if (field == 'Name') {
            if (newAssetGroup.Name == null || newAssetGroup.Name.length == 0) return false;
                return allAssetGroups.map(item => item.Name.toLowerCase()).indexOf(newAssetGroup.Name.toLowerCase()) < 0;
        }
        return true;
    }

    const standardSearch: Search.IField<AssetGroup> = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };
    return (
        <>
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<AssetGroup> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={standardSearch} Width={'50%'} Label={'Search'}
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
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <div className="form-group">
                                    <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault(); setShowNewGroup(true); }}>Add New Asset Group</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 180px)' }}>
                <Table<AssetGroup>
                    cols={[
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Assets', field: 'Assets', label: 'Num. of Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', field: 'Meters', label: 'Num. of Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Users', field: 'Users', label: 'Num. of Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', field: 'AssetGroups', label: 'Num. of Asset Groups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'DisplayDashboard', field: 'DisplayDashboard', label: 'Show in PQ Dashboard', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === "Scroll")
                            return;

                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colKey);
                        }
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
            </div>
            <Modal Size='xlg' Show={showNewGroup} Title={'Create a New Asset Group'} ShowX={true}
                ShowCancel={false} ConfirmBtnClass={'btn-success'} ConfirmText={'Add'}
                CallBack={(conf) => { if (conf) addNewAssetGroup(); else setNewAssetGroup(_.cloneDeep(emptyAssetGroup)); setShowNewGroup(false) }}
                DisableConfirm={assetGrpErrors.length > 0}
                ConfirmShowToolTip={assetGrpErrors.length > 0}
                ConfirmToolTipContent={assetGrpErrors.map((t, i) => <p key={i}> {CrossMark} {t} </p>)}
            >
                <div className="row">
                    <div className="col">
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Name'} Label={'Name'} Feedback={'A unique name of less than 50 characters is required.'} Valid={valid}
                            Setter={setNewAssetGroup} Disabled={false} />
                        <CheckBox<extendedAssetGroup> Record={newAssetGroup} Field={'DisplayDashboard'} Label={'Show Asset Group in Dashboard'} Setter={setNewAssetGroup} Disabled={false} />
                    </div>
                    <div className="col">
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Assets'} Label={'Num. of Transmission Assets'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-primary btn-block" onClick={() => { setFilter('Asset'); }}> Add Transmission Asset </button>
                       
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Meters'} Label={'Num. of Meters'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-primary btn-block" onClick={() => { setFilter('Meter'); }}> Add Meter </button>
                        
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Users'} Label={'Num. of Users'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-primary btn-block" disabled={true}> Add User Account </button>
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'AssetGroups'} Label={'Num. of Asset Groups'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-primary btn-block" onClick={() => { setFilter('Asset Group'); }}> Add Asset Group </button>
                       
                    </div>
                </div>
            </Modal>
            <Modal Show={showFilter != 'None'} Size={'xlg'} ShowX={true} ShowCancel={false} ConfirmBtnClass={'btn-danger'} ConfirmText={'Close'} Title={"Add " + showFilter + " to " + newAssetGroup.Name} CallBack={() => setFilter('None')}>
                {showFilter == 'Asset' ?
                    <AddToGroup<SystemCenter.Types.DetailedAsset> Slice={ByAssetSlice} Type='Asset' Data={newAssetGroup.AssetList} InitialSortKey={'AssetName'} StandardSearch={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                    TableColumns={[
                        { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetType', field: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'VoltageKV', field: 'VoltageKV', label: 'Voltage (kV)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Locations', field: 'Locations', label: 'Substations', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    DefaultFilterList={[
                        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                    ]}
                     SetData={(d) => setNewAssetGroup((grp) => {
                        let updated = _.cloneDeep(grp);
                        updated.AssetList = d;
                        updated.Assets = updated.AssetList.length;
                        return updated;
                    })} />: null}
                {showFilter == 'Meter' ?
                    <AddToGroup<SystemCenter.Types.DetailedMeter> Slice={ByMeterSlice} Type='Meter' Data={newAssetGroup.MeterList} InitialSortKey={'Name'} StandardSearch={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                    TableColumns={[
                        { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Location', field: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'MappedAssets', field: 'MappedAssets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Make', field: 'Make', label: 'Make', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Model', field: 'Model', label: 'Model', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    DefaultFilterList={[
                        { label: 'AssetKey', key: 'AssetKey', type: 'string', isPivotField: false },
                        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                        { label: 'Location', key: 'Location', type: 'string', isPivotField: false },
                        { label: 'Make', key: 'Make', type: 'string', isPivotField: false },
                        { label: 'Model', key: 'Model', type: 'string', isPivotField: false },
                        { label: 'Number of Assets', key: 'MappedAssets', type: 'number', isPivotField: false },
                    ]}
                    SetData={(d) => setNewAssetGroup((grp) => {
                        let updated = _.cloneDeep(grp);
                        updated.MeterList = d;
                        updated.Meters = updated.MeterList.length;
                        return updated;
                    })} /> : null}
                {showFilter == 'Asset Group' ?
                    <AddToGroup<OpenXDA.Types.AssetGroup> Slice={AssetGroupSlice} Type='Asset Group' Data={newAssetGroup.AssetGroupList} InitialSortKey={'Name'} StandardSearch={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                    TableColumns={[
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Assets', field: 'Assets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Users', field: 'Users', label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', field: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    DefaultFilterList={[
                        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                        { label: 'Number of Meter', key: 'Meters', type: 'integer', isPivotField: false },
                        { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer', isPivotField: false },
                        { label: 'Number of Users', key: 'Users', type: 'integer', isPivotField: false },
                        { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean', isPivotField: false },
                    ]}
                    SetData={(d) => setNewAssetGroup((grp) => {
                        let updated = _.cloneDeep(grp);
                        updated.AssetGroupList = d;
                        updated.AssetGroups = updated.AssetGroupList.length;
                        return updated;
                    })} /> : null}
            </Modal>
    
        </>
    )
}

export default ByAssetGroup;

