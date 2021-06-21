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
import { OpenXDA, SystemCenter } from '../global';
import AddToGroupPopup from './AddToGroup';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import { CheckBox, Input } from '@gpa-gemstone/react-forms';

declare var homePath: string;


const defaultSearchcols: Array<Search.IField<AssetGroup>> = [
    { label: 'Name', key: 'Name', type: 'string' },
    { label: 'Number of Meter', key: 'Meters', type: 'integer' },
    { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer' },
    { label: 'Number of Users', key: 'Users', type: 'integer' },
    { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean' },
        
];

interface AssetGroup {
    ID: number, Name: string, DisplayDashboard: boolean, AssetGroups: number, Meters: number, Assets: number, Users: number
}

interface extendedAssetGroup extends AssetGroup { MeterList: Array<number>, AssetList: Array<number>, UserList: Array<number>, AssetGroupList: Array<number> }

const emptyAssetGroup: extendedAssetGroup = { ID: -1, Name: '', DisplayDashboard: true, AssetGroups: 0, Meters: 0, Assets: 0, Users: 0, MeterList: [], AssetList: [], UserList: [], AssetGroupList: [] };

declare var homePath: string;

const ByAssetGroup: SystemCenter.ByComponent = (props) => {
    let history = useHistory();

    const [search, setSearch] = React.useState<Array<Search.IFilter<AssetGroup>>>([]);
    const [data, setData] = React.useState<Array<AssetGroup>>([]);
    const [sortField, setSortField] = React.useState<keyof AssetGroup>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<AssetGroup>>>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');


    const [newAssetGroup, setNewAssetGroup] = React.useState<extendedAssetGroup>(_.cloneDeep(emptyAssetGroup));
    const [allAssetGroups, setAllAssetGroups] = React.useState<Array<AssetGroup>>([]);
    const [showNewGroup, setShowNewGroup] = React.useState<boolean>(false);

    const [showAddAsset, setShowAddAsset] = React.useState<boolean>(false);
    const [showAddMeter, setShowAddMeter] = React.useState<boolean>(false);
    const [showAddGroup, setShowAddGroup] = React.useState<boolean>(false);


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

    }, [search, ascending, sortField]);

    
    function getAssetGroups(): JQueryXHR {
        setSearchState('Loading');
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

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
            data: JSON.stringify(newAssetGroup),
            cache: false,
            async: true
        }).done((newAssetGroup: OpenXDA.AssetGroup) => {
            sessionStorage.clear();
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + newAssetGroup.ID, state: {} })
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });

    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + item.row.ID, state: {} })
    }

    function valid(field: keyof (OpenXDA.AssetGroup)): boolean {
        if (field == 'Name') {
            if (newAssetGroup.Name == null || newAssetGroup.Name.length == 0) return false;
            return allAssetGroups.map(item => item.Name.toLowerCase()).indexOf(newAssetGroup.Name.toLowerCase()) < 0;
        }
        return true;
    }

    const standardSearch: Search.IField<AssetGroup> = { label: 'Name', key: 'Name', type: 'string' };
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
                                    <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { setShowNewGroup(true) }}>Add New AssetGroup</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                </SearchBar>

            <div style={{ width: '100%', height: 'calc( 100% - 180px)' }}>
                <Table<AssetGroup>
                    cols={[
                        { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Assets', label: 'Num. of Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', label: 'Num. of Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Users', label: 'Num. of Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', label: 'Num. of Asset Groups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
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
            </div>
            <Modal Size='xlg' Show={showNewGroup} Title={'Create a New AssetGroup'} ShowX={true}
                CancelText={'Close'} CancelBtnClass={'btn-danger'} ConfirmBtnClass={'btn-success'} ConfirmText={'Add'}
                CallBack={(conf) => { if (conf) addNewAssetGroup(); else setNewAssetGroup(_.cloneDeep(emptyAssetGroup)); setShowNewGroup(false); }}
            >
                <div className="row">
                    <div className="col">
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Name'} Label={'Name'} Feedback={'A unique name of less than 50 characters is required.'} Valid={valid}
                            Setter={setNewAssetGroup} Disabled={false} />
                        <CheckBox<extendedAssetGroup> Record={newAssetGroup} Field={'DisplayDashboard'} Label={'Show Asset Group in Dashboard'} Setter={setNewAssetGroup} Disabled={false} />
                    </div>
                    <div className="col">
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Assets'} Label={'Num. of Transmission Assets'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-primary btn-block" onClick={() => setShowAddAsset(true)}> Add Transmission Asset </button>
                       
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Meters'} Label={'Num. of Meters'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-primary btn-block" onClick={() => setShowAddMeter(true)}> Add Meter </button>
                        
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Users'} Label={'Num. of Users'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-primary btn-block" disabled={true}> Add User Account </button>
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'AssetGroups'} Label={'Num. of Asset Groups'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-primary btn-block" onClick={() => setShowAddGroup(true)}> Add Asset Group </button>
                       
                    </div>
                </div>
            </Modal>
            <AddToGroupPopup type='Asset' onComplete={(list) => {
                setNewAssetGroup((grp) => {
                    let updated = _.cloneDeep(grp);
                    updated.AssetList.push(...list);
                    updated.AssetList = _.uniq(updated.AssetList);
                    updated.Assets = updated.AssetList.length;
                    return updated;
                });
                return null;
            }} Show={showAddAsset} Close={() => setShowAddAsset(false)} />

            <AddToGroupPopup type='Meter' onComplete={(list) => {
                setNewAssetGroup((grp) => {
                    let updated = _.cloneDeep(grp);
                    updated.MeterList.push(...list);
                    updated.MeterList = _.uniq(updated.MeterList);
                    updated.Meters = updated.MeterList.length;
                    return updated;
                });
                return null;
            }} Show={showAddMeter} Close={() => setShowAddMeter(false)} />
            <AddToGroupPopup type='Group' onComplete={(list) => {
                setNewAssetGroup((grp) => {
                    let updated = _.cloneDeep(grp);
                    updated.AssetGroupList.push(...list);
                    updated.AssetGroupList = _.uniq(updated.AssetGroupList);
                    updated.AssetGroups = updated.AssetGroupList.length;
                    return updated;
                });
                return null;
            }} Show={showAddGroup} Close={() => setShowAddGroup(false)} />

            </>
    )
}

export default ByAssetGroup;

