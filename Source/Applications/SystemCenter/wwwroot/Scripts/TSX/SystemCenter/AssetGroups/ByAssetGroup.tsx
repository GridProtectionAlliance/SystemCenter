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
import { Search, Modal } from '@gpa-gemstone/react-interactive';
import { CheckBox, Input } from '@gpa-gemstone/react-forms';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { AssetGroupSlice, ByAssetSlice, ByLocationSlice, ByMeterSlice } from '../Store/Store';
import { DefaultSearch, DefaultSelects } from '@gpa-gemstone/common-pages';
import { useDispatch, useSelector } from 'react-redux';
import AssetGroup from './AssetGroup';

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
    const dispatch = useDispatch();
    const data = useSelector(AssetGroupSlice.SearchResults);
    const sortKey = useSelector(AssetGroupSlice.SortField);
    const ascending = useSelector(AssetGroupSlice.Ascending);
    const searchStatus = useSelector(AssetGroupSlice.SearchStatus);
    const searchFields = useSelector(AssetGroupSlice.SearchFilters)
    const status = useSelector(AssetGroupSlice.Status);
    const allAssetGroups = useSelector(AssetGroupSlice.Data);

    const [showFilter, setFilter] = React.useState<('None' | 'Meter' | 'Asset' | 'Asset Group' | 'Station')>('None');

    const [newAssetGroup, setNewAssetGroup] = React.useState<extendedAssetGroup>(_.cloneDeep(emptyAssetGroup));
    const [showNewGroup, setShowNewGroup] = React.useState<boolean>(false);
    const [assetGrpErrors, setAssetGrpErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'changed' || status == 'unintiated')
            dispatch(AssetGroupSlice.Fetch());
    }, [status])

    React.useEffect(() => {
        if (searchStatus == 'changed' || searchStatus == 'unintiated')
            dispatch(AssetGroupSlice.DBSearch({ filter: searchFields }));
    }, [searchStatus])

    React.useEffect(() => {
        let e = [];
        if (newAssetGroup.Name == null || newAssetGroup.Name.length == 0)
            e.push('A Name is required.');
        else if (allAssetGroups.map(item => item.Name.toLowerCase()).indexOf(newAssetGroup.Name.toLowerCase()) > -1)
            e.push('The Name has to be unique.');
        setAssetGrpErrors(e);
    }, [newAssetGroup]);

    function getAdditionalMeterFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/Meter/FieldName/0`,
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
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<SystemCenter.Types.DetailedMeter>
            )), ['label'], ["asc"]);
            setFields(ordered)
        });

        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

    function getAdditionalAssetFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/Asset/FieldName/0`,
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
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<SystemCenter.Types.DetailedAsset>
            )), ['label'], ["asc"]);
            setFields(ordered);
        });
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
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
                history({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + d.ID })
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
        history({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + item.row.ID})
    }

    function valid(field: keyof (OpenXDA.Types.AssetGroup)): boolean {
        if (field == 'Name') {
            if (newAssetGroup.Name == null || newAssetGroup.Name.length == 0) return false;
                return allAssetGroups.map(item => item.Name.toLowerCase()).indexOf(newAssetGroup.Name.toLowerCase()) < 0;
        }
        return true;
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
            if (handle != null && handle.abort == null) handle.abort();
        }
    }

    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>
                <DefaultSearch.AssetGroup Slice={AssetGroupSlice} GetEnum={getEnum} GetAddlFields={() => { return () => {}}}>
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <div className="form-group">
                                    <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0}
                                        onClick={(event) => { event.preventDefault(); setShowNewGroup(true); }}>Add New Asset Group</button>
                                    </div>
                                </form>
                            </fieldset>
                    </li>
                </DefaultSearch.AssetGroup>
            <div style={{ width: '100%', height: 'calc( 100% - 180px)' }}>
                <Table<AssetGroup>
                    cols={[
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Assets', field: 'Assets', label: 'Num. of Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', field: 'Meters', label: 'Num. of Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Users', field: 'Users', label: 'Num. of Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', field: 'AssetGroups', label: 'Num. of Asset Groups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            {
                                key: 'DisplayDashboard', field: 'DisplayDashboard', label: 'Show in PQ Dashboard', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                content: (item) => (item.DisplayDashboard ? HeavyCheckMark : null)
                            },
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
                            dispatch(AssetGroupSlice.Sort({ SortField: sortKey, Ascending: ascending }));
                        else {
                            dispatch(AssetGroupSlice.Sort({ SortField: d.colField as keyof OpenXDA.Types.AssetGroup, Ascending: true }));
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

            <DefaultSelects.Meter
                Slice={ByMeterSlice}
                Selection={newAssetGroup.MeterList}
                OnClose={(selected, conf) => {
                    setFilter('None')
                    if (!conf) return
                    setNewAssetGroup((grp) => {
                        let updated = _.cloneDeep(grp);
                        updated.MeterList = selected;
                        updated.Meters = updated.MeterList.length;
                        return updated;
                    })
                }}
                Show={showFilter == 'Meter'}
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
                Title={"Add Meters to " + (newAssetGroup.Name == undefined || newAssetGroup.Name.length == 0 ? "Asset Group" : newAssetGroup.Name)}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalMeterFields} />
            <DefaultSelects.Asset
                Slice={ByAssetSlice}
                Selection={newAssetGroup.AssetList}
                OnClose={(selected, conf) => {
                    setFilter('None')
                    if (!conf) return
                    setNewAssetGroup((grp) => {
                        let updated = _.cloneDeep(grp);
                        updated.AssetList = selected;
                        updated.Assets = updated.AssetList.length;
                        return updated;
                    })
                }}
                Show={showFilter == 'Asset'}
                Type={'multiple'}
                Columns={[{ key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetType', field: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'VoltageKV', field: 'VoltageKV', label: 'Voltage (kV)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Locations', field: 'Locations', label: 'Substations', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } }]}
                Title={"Add Transmission Assets to " + (newAssetGroup.Name == undefined || newAssetGroup.Name.length == 0 ? "Asset Group" : newAssetGroup.Name)}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalAssetFields} />

            <DefaultSelects.AssetGroup
                Slice={AssetGroupSlice}
                Selection={newAssetGroup.AssetGroupList}
                OnClose={(selected, conf) => {
                    setFilter('None')
                    if (!conf) return
                    setNewAssetGroup((grp) => {
                        let updated = _.cloneDeep(grp);
                        updated.AssetGroupList = selected;
                        updated.AssetGroups = updated.AssetGroupList.length;
                        return updated;
                    })
                }}
                Show={showFilter == 'Asset Group'}
                Type={'multiple'}
                Columns={[
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Assets', field: 'Assets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Users', field: 'Users', label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetGroups', field: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Add Asset Groups to " + (newAssetGroup.Name == undefined || newAssetGroup.Name.length == 0 ? "Asset Group" : newAssetGroup.Name)}
                GetEnum={getEnum}
                GetAddlFields={() => () => { }} />
    
        </>
    )
}

export default ByAssetGroup;

