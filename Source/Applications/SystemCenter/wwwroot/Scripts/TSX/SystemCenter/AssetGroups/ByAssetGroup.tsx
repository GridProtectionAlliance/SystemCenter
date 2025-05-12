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
import { Table, Column } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { Search, Modal } from '@gpa-gemstone/react-interactive';
import { CheckBox, Input } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { AssetGroupSlice, ByAssetSlice, ByMeterSlice, AssetTypeSlice } from '../Store/Store';
import { DefaultSearch, DefaultSelects } from '@gpa-gemstone/common-pages';
import { useAppDispatch, useAppSelector } from '../hooks';
import AssetSelect from '../Asset/AssetSelect';

declare var homePath: string;


interface extendedAssetGroup extends OpenXDA.Types.AssetGroup { MeterList: Array<SystemCenter.Types.DetailedMeter>, AssetList: Array<SystemCenter.Types.DetailedAsset>, UserList: Array<number>, AssetGroupList: Array<OpenXDA.Types.AssetGroup> }

const emptyAssetGroup: extendedAssetGroup = { ID: -1, Name: '', DisplayDashboard: true, AssetGroups: 0, Meters: 0, Assets: 0, Users: 0, MeterList: [], AssetList: [], UserList: [], AssetGroupList: [], DisplayEmail: false };

declare var homePath: string;

const ByAssetGroup: Application.Types.iByComponent = (props) => {

    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const data = useAppSelector(AssetGroupSlice.SearchResults);
    const sortKey = useAppSelector(AssetGroupSlice.SortField);
    const ascending = useAppSelector(AssetGroupSlice.Ascending);
    const searchStatus = useAppSelector(AssetGroupSlice.SearchStatus);
    const searchFields = useAppSelector(AssetGroupSlice.SearchFilters)
    const status = useAppSelector(AssetGroupSlice.Status);
    const allAssetGroups = useAppSelector(AssetGroupSlice.Data);

    const assetType = useAppSelector(AssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(AssetTypeSlice.Status);

    const [showFilter, setFilter] = React.useState<('None' | 'Meter' | 'Asset' | 'Asset Group' | 'Station')>('None');

    const [newAssetGroup, setNewAssetGroup] = React.useState<extendedAssetGroup>(_.cloneDeep(emptyAssetGroup));
    const [showNewGroup, setShowNewGroup] = React.useState<boolean>(false);
    const [assetGrpErrors, setAssetGrpErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'changed' || status == 'unintiated')
            dispatch(AssetGroupSlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        if (searchStatus == 'changed' || searchStatus == 'unintiated')
            dispatch(AssetGroupSlice.DBSearch({ filter: searchFields }));
    }, [searchStatus]);

    React.useEffect(() => {
        if (assetTypeStatus == 'changed' || assetTypeStatus == 'unintiated')
            dispatch(AssetTypeSlice.Fetch());
    }, [assetTypeStatus]);

    React.useEffect(() => {
        let e = [];
        if (newAssetGroup.Name == null || newAssetGroup.Name.length == 0)
            e.push('A Name is required.');
        else if (allAssetGroups.map(item => item.Name.toLowerCase()).indexOf(newAssetGroup.Name.toLowerCase()) > -1)
            e.push('Name must be unique.');
        setAssetGrpErrors(e);
    }, [newAssetGroup]);

    function getAdditionalMeterFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/Meter/FieldName/0`,
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
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/Asset/FieldName/0`,
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
                dispatch(AssetGroupSlice.SetChanged())
                navigate(`${homePath}index.cshtml?name=AssetGroup&AssetGroupID=${d.ID}`);
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
        navigate(`${homePath}index.cshtml?name=AssetGroup&AssetGroupID=${item.row.ID}`);
    }

    function valid(field: keyof (extendedAssetGroup)): boolean {
        if (field == 'Name') {
            if (newAssetGroup.Name == null || newAssetGroup.Name.length == 0) return false;
                return allAssetGroups.map(item => item.Name.toLowerCase()).indexOf(newAssetGroup.Name.toLowerCase()) < 0;
        }
        return true;
    }

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

    return (
        <>
            <div className="container-fluid d-flex h-100 flex-column">
                <DefaultSearch.AssetGroup Slice={AssetGroupSlice} GetEnum={getEnum} StorageID="AssetGroupsFilter" GetAddlFields={() => { return () => {}}} >
                    <li className="nav-item" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0} style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <div className="form-group">
                                    <button className="btn btn-info btn-block" 
                                        onClick={(event) => { event.preventDefault(); setShowNewGroup(true); }}>Add Asset Group</button>
                                    </div>
                                </form>
                            </fieldset>
                    </li>
                </DefaultSearch.AssetGroup>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <Table<OpenXDA.Types.AssetGroup>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortKey)
                                dispatch(AssetGroupSlice.Sort({ SortField: sortKey, Ascending: ascending }));
                            else {
                                dispatch(AssetGroupSlice.Sort({ SortField: d.colField as keyof OpenXDA.Types.AssetGroup, Ascending: true }));
                            }
                        }}
                        OnClick={handleSelect}
                        TableStyle={{
                            padding: 0, width: '100%', height: '100%',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 0
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'Assets'}
                            AllowSort={true}
                            Field={'Assets'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Assets
                        </Column>
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'Meters'}
                            AllowSort={true}
                            Field={'Meters'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Meters
                        </Column>
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'AssetGroups'}
                            AllowSort={true}
                            Field={'AssetGroups'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. of Asset Groups
                        </Column>
                        <Column<OpenXDA.Types.AssetGroup>
                            Key={'DisplayDashboard'}
                            AllowSort={true}
                            Field={'DisplayDashboard'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.DisplayDashboard ? <ReactIcons.CheckMark Color="var(--success)" /> : null }
                        > Show in PQ Dashboard
                        </Column>
                    </Table>
                </div>
            </div>
            <Modal Size='xlg' Show={showNewGroup} Title={'Add New Asset Group'} ShowX={true}
                ShowCancel={false} ConfirmBtnClass={'btn-primary'} ConfirmText={'Save'}
                CallBack={(conf) => { if (conf) addNewAssetGroup(); else setNewAssetGroup(_.cloneDeep(emptyAssetGroup)); setShowNewGroup(false) }}
                DisableConfirm={assetGrpErrors.length > 0}
                ConfirmShowToolTip={assetGrpErrors.length > 0}
                ConfirmToolTipContent={assetGrpErrors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)}
            >
                <div className="row">
                    <div className="col">
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Name'} Label={'Name'} Feedback={'A unique Name of less than 50 characters is required.'} Valid={valid}
                            Setter={setNewAssetGroup} Disabled={false} />
                        <CheckBox<extendedAssetGroup> Record={newAssetGroup} Field={'DisplayDashboard'} Label={'Show Asset Group in PQ Dashboard'} Setter={setNewAssetGroup} Disabled={false} />
                        <CheckBox<extendedAssetGroup> Record={newAssetGroup} Field={'DisplayEmail'} Label={'Show Asset Group in Email Subscription'} Setter={setNewAssetGroup} Disabled={false} />
                    </div>
                    <div className="col">
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Assets'} Label={'Num. of Transmission Assets'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-info btn-block" onClick={() => { setFilter('Asset'); }}> Add Assets </button>
                       
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'Meters'} Label={'Num. of Meters'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-info btn-block" onClick={() => { setFilter('Meter'); }}> Add Meters </button>
                        
                        <Input<extendedAssetGroup> Record={newAssetGroup} Field={'AssetGroups'} Label={'Num. of Asset Groups'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                        <button type="button" className="btn btn-info btn-block" onClick={() => { setFilter('Asset Group'); }}> Add Asset Groups </button>
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
                Title={"Add Meters to " + (newAssetGroup.Name == undefined || newAssetGroup.Name.length == 0 ? "Asset Group" : newAssetGroup.Name)}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalMeterFields}
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
            </DefaultSelects.Meter>

            <AssetSelect Type='multiple' StorageID='ByAssetGroup.Asset' ShowModal={showFilter == 'Asset'} SelectedAssets={newAssetGroup.AssetList}
                Title={"Add Transmission Assets to " + (newAssetGroup.Name == undefined || newAssetGroup.Name.length == 0 ? "Asset Group" : newAssetGroup.Name)}
                OnCloseFunction={(selected, conf) => {
                    setFilter('None')
                    if (!conf) return
                    setNewAssetGroup((grp) => {
                        let updated = _.cloneDeep(grp);
                        updated.AssetList = selected;
                        updated.Assets = updated.AssetList.length;
                        return updated;
                    });
                }} />

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
                Title={"Add Asset Groups to " + (newAssetGroup.Name == undefined || newAssetGroup.Name.length == 0 ? "Asset Group" : newAssetGroup.Name)}
                GetEnum={getEnum}
                GetAddlFields={() => () => { }}
            >
                <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Name</Column>
                <Column Key="Assets" Field="Assets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Assets</Column>
                <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Meters</Column>
                <Column Key="AssetGroups" Field="AssetGroups" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Sub Groups</Column>
            </DefaultSelects.AssetGroup>
    
        </>
    )
}

export default ByAssetGroup;

