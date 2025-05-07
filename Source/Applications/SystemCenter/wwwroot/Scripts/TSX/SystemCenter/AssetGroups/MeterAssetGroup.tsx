//******************************************************************************************************
//  AssetAssetGroup.tsx - Gbtc
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
import { useNavigate } from 'react-router-dom';
import { Table, Column } from '@gpa-gemstone/react-table';
import { ByMeterSlice } from '../Store/Store';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Search, Warning } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { SelectRoles } from '../Store/UserSettings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AssetGroupSlice } from '../Store/Store';


declare var homePath: string;

function MeterAssetGroupWindow(props: { AssetGroupID: number}) {

    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [meterList, setMeterList] = React.useState<Array<SystemCenter.Types.DetailedMeter>>([]);
    const [sortField, setSortField] = React.useState<string>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(0);
    const [removeMeter, setRemoveMeter] = React.useState<number>(-1);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        dispatch(AssetGroupSlice.SetChanged());
        return getData();
    }, [props.AssetGroupID, counter])

    function getData() {
        if (props.AssetGroupID == null)
            return () => { };

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/Meters`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((data: Array<SystemCenter.Types.DetailedMeter>) => {
            const sortedData = sortData(sortField, ascending, data);
            setMeterList(sortedData);
        });
      
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }

    function sortData(key: string, ascending: boolean, data: SystemCenter.Types.DetailedMeter[]) {
        return _.orderBy(data, [key], [(ascending ? "asc" : "desc")]);
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

    function saveItems(items: SystemCenter.Types.DetailedMeter[]) {

        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/AddMeters`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true,
            data: JSON.stringify(items.map(e => e.ID))
        });

        handle.done(d => setCounter(x => x + 1))
    }

    function removeItem(id: number) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/RemoveMeter/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setCounter(x => x + 1))
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Meters in Asset Group:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Table<SystemCenter.Types.DetailedMeter>
                        TableClass="table table-hover"
                        Data={meterList}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey == 'Remove') return;
                            if (d.colKey == sortField) {
                                setAscending(!ascending);
                                const ordered = _.orderBy(meterList, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setMeterList(ordered);
                            }
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                                const ordered = _.orderBy(meterList, [d.colKey], ["asc"]);
                                setMeterList(ordered);
                            }
                        }}
                        OnClick={(data) => { 
                            if (data.colKey != 'Remove')
                                navigate(`${homePath}index.cshtml?name=Meter&MeterID=${data.row.ID}`);
                            }}
                        TheadStyle={{ fontSize: 'smaller' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<SystemCenter.Types.DetailedMeter>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<SystemCenter.Types.DetailedMeter>
                            Key={'Location'}
                            AllowSort={true}
                            Field={'Location'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Substation
                        </Column>
                        <Column<SystemCenter.Types.DetailedMeter>
                            Key={'Remove'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) =>
                                <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')}
                                    onClick={(e) => { if (hasPermissions()) setRemoveMeter(item.ID) }}>
                                    <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                                </button>
                            }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
                
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                        <button className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='AddMeters'
                            onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions()) setShowAdd(true) }}>Add Meters</button>
                    </div>
                    <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"AddMeters"}>
                        <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                    </ToolTip>
            </div>

            </div>
            <DefaultSelects.Meter
                Slice={ByMeterSlice}
                Selection={meterList}
                OnClose={(selected, conf) => {
                    setShowAdd(false)
                    if (!conf) return
                    saveItems(selected.filter(items => meterList.findIndex(g => g.ID == items.ID) < 0))
                }}
                Show={showAdd}
                Type={'multiple'}
                Title={"Add Meters to Asset Group"}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalMeterFields}
            >
                <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Name</Column>
                <Column Key="AssetKey" Field="AssetKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Key</Column>
                <Column Key="Location" Field="Location" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Substation</Column>
                <Column Key="MappedAssets" Field="MappedAssets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Assets</Column>
                <Column Key="Make" Field="Make" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Make</Column>
                <Column Key="Model" Field="Model" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Model</Column>
            </DefaultSelects.Meter>
            <Warning Show={removeMeter > -1} Title={'Remove Meter from Asset Group'} Message={'This will remove the Meter from this Asset Group.'} CallBack={(c) => { if (c) removeItem(removeMeter); setRemoveMeter(-1);  }} />
        </>
    );
}


export default MeterAssetGroupWindow;