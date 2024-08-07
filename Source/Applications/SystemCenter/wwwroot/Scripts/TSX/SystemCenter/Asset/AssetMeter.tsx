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
import { ReactTable } from '@gpa-gemstone/react-table';
import { useHistory } from "react-router-dom";
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { ByMeterSlice } from '../Store/Store';
import { Search, ToolTip } from '@gpa-gemstone/react-interactive';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

function AssetMeterWindow(props: { Asset: OpenXDA.Types.Asset }): JSX.Element{
    let history = useHistory();
    const dispatch = useAppDispatch();
    const [meters, setMeters] = React.useState<Array<OpenXDA.Types.Meter>>([]);
    const [sortField, setSortField] = React.useState<keyof(OpenXDA.Types.Meter)>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const allMeters = useAppSelector(ByMeterSlice.Data);
    const mStatus = useAppSelector(ByMeterSlice.Status);
    const mParentID = useAppSelector(ByMeterSlice.ParentID);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (mStatus == 'unintiated' || mStatus == 'changed' || mParentID != null)
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
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID })
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
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', padding: 30, display: 'flex', flexDirection: 'column' }}>
                    <ReactTable.Table<OpenXDA.Types.Meter>
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
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        OnClick={handleSelect}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'AssetKey'}
                            AllowSort={true}
                            Field={'AssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Key
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '30%' }}
                            RowStyle={{ width: '30%' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Make'}
                            AllowSort={true}
                            Field={'Make'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > Make
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Model'}
                            AllowSort={true}
                            Field={'Model'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > Model
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='ChangeMeters'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions()) setShowAdd(true); }}>Change Meters</button>
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"ChangeMeters"}>
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
                Columns={[
                    { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', field: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'MappedAssets', field: 'MappedAssets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Make', field: 'Make', label: 'Make', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Model', field: 'Model', label: 'Model', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Add Meters to " + (props.Asset?.AssetName ?? 'Asset')}
                GetEnum={getEnum}
                GetAddlFields={getAdditionalMeterFields} />
        </div>
                
    );

}

export default AssetMeterWindow;