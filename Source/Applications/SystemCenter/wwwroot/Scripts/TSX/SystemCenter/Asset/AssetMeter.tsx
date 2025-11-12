//******************************************************************************************************
//  LocationMeter.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { Table, Column } from '@gpa-gemstone/react-table';
import { useNavigate } from "react-router-dom";
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { ByMeterSlice } from '../Store/Store';
import { Search } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

function AssetMeterWindow(props: { Asset: OpenXDA.Types.Asset }): JSX.Element{
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [meters, setMeters] = React.useState<Array<OpenXDA.Types.Meter>>([]);
    const [sortField, setSortField] = React.useState<keyof(OpenXDA.Types.Meter)>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const allMeters = useAppSelector(ByMeterSlice.Data);
    const mStatus = useAppSelector(ByMeterSlice.Status);
    const mParentID = useAppSelector(ByMeterSlice.ParentID);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (mStatus == 'uninitiated' || mStatus == 'changed' || mParentID != null)
            dispatch(ByMeterSlice.Fetch());
    }, [mStatus, mParentID]);


    React.useEffect(() => {
        getMeters();
    }, [props.Asset]);

    function getMeters(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Meters`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(meters => {
            const sortedMeters = sortData(sortField, ascending, meters);
            setMeters(sortedMeters);
        });
    }

    function sortData(key: keyof OpenXDA.Types.Meter, ascending: boolean, data: OpenXDA.Types.Meter[]) {
        return _.orderBy(data, [key], [(ascending ? "asc" : "desc")]);
    }

    function addMeter(meterID: number) {
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Meter/${meterID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(record => {
            getMeters();
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });
    }

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=Meter&MeterID=${item.row.ID}`);
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

    async function deleteMeter(meter: OpenXDA.Types.Meter) {
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Meter/${meter.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => {
            getMeters();
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Meters:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Table<OpenXDA.Types.Meter>
                    TableClass="table table-hover"
                    Data={meters}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey == sortField) {
                            setAscending(!ascending);
                            const ordered = _.orderBy(meters, [d.colKey], [(!ascending ? "asc" : "desc")]);
                            setMeters(ordered);
                        }
                        else {
                            setAscending(true);
                            setSortField(d.colField);
                            const ordered = _.orderBy(meters, [d.colKey], ["asc"]);
                            setMeters(ordered);
                        }
                    }}
                    TableStyle={{ height: '100%' }}
                    TheadStyle={{ fontSize: 'smaller' }}
                    RowStyle={{ fontSize: 'smaller' }}
                    OnClick={handleSelect}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <Column<OpenXDA.Types.Meter>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: '30%' }}
                        RowStyle={{ width: '30%' }}
                    > Name
                    </Column>
                    <Column<OpenXDA.Types.Meter>
                        Key={'AssetKey'}
                        AllowSort={true}
                        Field={'AssetKey'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Key
                    </Column>
                    <Column<OpenXDA.Types.Meter>
                        Key={'Make'}
                        AllowSort={true}
                        Field={'Make'}
                        HeaderStyle={{ width: '20%' }}
                        RowStyle={{ width: '20%' }}
                    > Make
                    </Column>
                    <Column<OpenXDA.Types.Meter>
                        Key={'Model'}
                        AllowSort={true}
                        Field={'Model'}
                        HeaderStyle={{ width: '20%' }}
                        RowStyle={{ width: '20%' }}
                    > Model
                    </Column>
                </Table>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='ChangeMeters'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions()) setShowAdd(true); }}>Change Meters</button>
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"ChangeMeters"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>
            <DefaultSelects.Meter
                Slice={ByMeterSlice}
                Selection={allMeters.filter(m => meters.findIndex(g => g.ID == m.ID) > -1)}
                OnClose={(selected, conf) => {
                    setShowAdd(false)
                    if (!conf) return
                    selected.map(m => m.ID).filter(m => meters.findIndex(g => g.ID == m) < 0).forEach((m) => addMeter(m));
                    meters.filter(m => selected.findIndex(s => s.ID == m.ID) < 0).forEach(m => deleteMeter(m));
                }}
                Show={showAdd}
                Type={'multiple'}
                Title={"Add Meters to " + (props.Asset?.AssetName ?? 'Asset')}
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
        </div>
                
    );

}

export default AssetMeterWindow;