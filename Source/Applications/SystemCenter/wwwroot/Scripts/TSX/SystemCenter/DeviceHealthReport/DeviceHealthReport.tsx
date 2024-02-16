//******************************************************************************************************
//  ByMeter.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/22/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';

import { Search, SearchBar, ToolTip } from '@gpa-gemstone/react-interactive';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SystemCenterSettingSlice } from '../Store/Store';
import moment from 'moment';
import { HeavyCheckMark, CrossMark, Warning, Questionmark } from '@gpa-gemstone/gpa-symbols';

const defaultSearchcols: Search.IField<SCGlobal.DeviceHealthReport>[] = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Substation', key: 'LocationKey', type: 'string', isPivotField: false },
    { label: 'Model', key: 'Model', type: 'string', isPivotField: false },
    { label: 'TSC', key: 'TSC', type: 'string', isPivotField: false },
    { label: 'Sector', key: 'Sector', type: 'string', isPivotField: false },
    { label: 'IP', key: 'IP', type: 'string', isPivotField: false },
    { label: 'Last Successful Connection', key: 'LastGood', type: 'datetime', isPivotField: false },
    { label: 'Bad Days', key: 'BadDays', type: 'number', isPivotField: false },
    { label: 'MIC', key: 'MICStatus', type: 'enum', enum: [{ Value: 'Warning', Label: 'Warning' }, { Value: 'Error', Label: 'Error' }], isPivotField: false },
    { label: 'miMD', key: 'MiMDStatus', type: 'enum', enum: [{ Value: 'Warning', Label: 'Warning' }, { Value: 'Error', Label: 'Error' }], isPivotField: false },
    { label: 'XDA', key: 'XDAStatus', type: 'enum', enum: [{ Value: 'Warning', Label: 'Warning' }, { Value: 'Error', Label: 'Error' }], isPivotField: false },
    { label: 'Last Config Change', key: 'LastConfigChange', type: 'datetime', isPivotField: false },

];

const DeviceHealthReport: Application.Types.iByComponent = (props) => {
    let dispatch = useAppDispatch();

    const [search, setSearch] = React.useState<Search.IFilter<SCGlobal.DeviceHealthReport>[]>([]);

    const [data, setData] = React.useState<SCGlobal.DeviceHealthReport[]>([]);

    const [sortKey, setSortKey] = React.useState<string>('Name');
    const [filterableList, setFilterableList] = React.useState<Search.IField<SCGlobal.DeviceHealthReport>[]>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const [ascending, setAscending] = React.useState<boolean>(true);

    const settings = useAppSelector(SystemCenterSettingSlice.Data);
    const settingStatus = useAppSelector(SystemCenterSettingSlice.Status);

    React.useEffect(() => {
        let handle = getMeters();
        handle.done((dt: string) => {
            setSearchState('Idle');
            setData(JSON.parse(dt) as SCGlobal.DeviceHealthReport[]);
        }).fail((d) => setSearchState('Error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [sortKey, ascending, search]);

    React.useEffect(() => {
        let handle = getAdditionalFields();

        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);

    React.useEffect(() => {
        if (settingStatus == 'unintiated' || settingStatus == 'changed')
            dispatch(SystemCenterSettingSlice.Fetch());
    }, [settingStatus]);



    function getMeters(): JQuery.jqXHR<string>{
        setSearchState('Loading');
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, IsPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/DeviceHealthReport/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortKey, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function handleSelect(item) {
        //history({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID})
    }

    function getAdditionalFields(): JQuery.jqXHR<Array<SystemCenter.Types.AdditionalField>> {
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
            let ordered = _.orderBy(defaultSearchcols.concat(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<SCGlobal.DeviceHealthReport>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }

    function trimString(text: string, maxLength: number) {
        if (text == undefined)
            return '';
        else if (text.length > maxLength)
            return <span title={text}>{text.substring(0, maxLength - 1)}...</span>
        else
            return text;
    }

    const standardSearch: Search.IField<SCGlobal.DeviceHealthReport> = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row">
                <SearchBar<SCGlobal.DeviceHealthReport> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={standardSearch} Width={'50%'} Label={'Search'} StorageID="DeviceHealthReportFilter"
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Meter(s)'}
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
            </SearchBar>
            </div>
            <div className={'row'} style={{ flex: 1, overflow: 'hidden' }}>
                <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                    <ReactTable.Table<SCGlobal.DeviceHealthReport>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortKey)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortKey(d.colKey);
                            }
                        }}
                        OnClick={handleSelect}
                        TableStyle={{
                            padding: 0, width: 'calc(100%)', height: '100%',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 0
                        }}
                        TheadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item, field }) => <a href={`${homePath}index.cshtml?name=Meter&MeterID=${item.ID}&MeterName=${item.Name}`} target='_blank'>{item[field]}</a> }
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'OpenMIC'}
                            AllowSort={true}
                            Field={'OpenMIC'}
                            HeaderStyle={{ width: 120 }}
                            RowStyle={{ width: 120 }}
                            Content={({ item }) => <a href={`${settings.find(s => s.Name == 'OpenMIC.Url')?.Value}/devices.cshtml?Acronym=${item.OpenMIC}`} target='_blank'>{trimString(item.OpenMIC, 10)}</a> }
                        > openMIC ID
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'LocationKey'}
                            AllowSort={true}
                            Field={'LocationKey'}
                            HeaderStyle={{ width: 100 }}
                            RowStyle={{ width: 100 }}
                            Content={({ item }) => <a href={settings.find(s => s.Name == 'DeviceHealthReport.SubstationLink')?.Value.replace('<AssetKey>', item.LocationID.toString())} target='_blank'>{item.LocationKey}</a>}
                        > Substn
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'Model'}
                            AllowSort={true}
                            Field={'Model'}
                            HeaderStyle={{ width: '8%' }}
                            RowStyle={{ width: '8%' }}
                            Content={({ item, field }) => <a href={`${settings.find(s => s.Name == 'MiMD.Url')?.Value}/Diagnostic/Meter/${item.ID}`} target='_blank'>{item[field]}</a> }
                        > Model
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'TSC'}
                            AllowSort={true}
                            Field={'TSC'}
                            HeaderStyle={{ width: 50 }}
                            RowStyle={{ width: 50 }}
                            Content={({ item, field }) => <a href={`${homePath}index.cshtml?name=DeviceContacts&ID=${item.TSC}&Name=${item.TSC}&Field=TSC`} target='_blank'>{item[field]}</a> }
                        > TSC
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'Sector'}
                            AllowSort={true}
                            Field={'Sector'}
                            HeaderStyle={{ width: '5%' }}
                            RowStyle={{ width: '5%' }}
                            Content={({ item, field }) => <a href={`${homePath}index.cshtml?name=DeviceContacts&ID=${item.Sector}&Name=${item.Sector}&Field=Sector`} target='_blank'>{item[field]}</a> }
                        > Sector
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'IP'}
                            AllowSort={true}
                            Field={'IP'}
                            HeaderStyle={{ width: 150 }}
                            RowStyle={{ width: 150 }}
                            Content={({ item, field }) => (item.OpenMIC != undefined ? <a href={`${settings.find(s => s.Name == 'OpenMIC.Url')?.Value}/status.cshtml?Acronym=${item.OpenMIC}`} target='_blank'>{item[field]}</a> : item[field]) }
                        > IP
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'LastGood'}
                            AllowSort={true}
                            Field={'LastGood'}
                            HeaderStyle={{ width: 150 }}
                            RowStyle={{ width: 150, textAlign: 'center' }}
                            Content={({ item, field }) => {
                                let className = 'light'
                                if (moment().diff(moment(item[field]), 'hours') > 4) className = 'info';
                                if (moment().diff(moment(item[field]), 'hours') > 24) className = 'warning';
                                else if (moment().diff(moment(item[field]), 'days') > 7) className = 'danger';
                                return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic`} target='_blank'>
                                    <span className={`badge badge-pill badge-${className}`}>{moment(item[field]).format('MM/DD/YYYY HH:mm')}</span></a>
                            }}
                        > Last Succ Conn
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'BadDays'}
                            AllowSort={true}
                            Field={'BadDays'}
                            HeaderStyle={{ width: 100 }}
                            RowStyle={{ width: 100, textAlign: 'center' }}
                        > Bad Days
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'LastConfigChange'}
                            AllowSort={true}
                            Field={'LastConfigChange'}
                            HeaderStyle={{ width: 120 }}
                            RowStyle={{ width: 120, textAlign: 'center' }}
                            Content={({ item, key, field, style }) => {
                                if (item[key] == undefined)
                                    return '';
                                else {
                                    if (moment().diff(moment(item[field]), 'hours') < 24) style.backgroundColor = 'red';
                                    else if (moment().diff(moment(item[field]), 'days') < 7) style.backgroundColor = 'orange';
                                    else if (moment().diff(moment(item[field]), 'days') < 30) style.backgroundColor = 'yellow';

                                    return <a href={`${settings.find(s => s.Name == 'MiMD.Url')?.Value}/Configuration/Meter/${item.ID}`} target='_blank'>{moment(item[field]).format('MM/DD/YYYY')}</a>
                                }
                            }}
                        > Last Cfg Chg
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'MICStatus'}
                            AllowSort={true}
                            Field={'MICStatus'}
                            HeaderStyle={{ width: 50 }}
                            RowStyle={{ width: 50, textAlign: 'center' }}
                            Content={({ item, field, style }) => {
                                if (item[field] == 'Error') {
                                    style.backgroundColor = 'palevioletred';
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic&OpenMICAcronym=${item.OpenMIC}`} target='_blank' >{CrossMark}</a>;
                                }
                                else if (item[field] == 'Warning') {
                                    style.backgroundColor = 'antiquewhite';
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic&OpenMICAcronym=${item.OpenMIC}`} target='_blank' >{Warning}</a>;
                                }
                                else if (item.LastGood == null && item.MICBadDays == null) {
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic&OpenMICAcronym=${item.OpenMIC}`} target='_blank' >{Questionmark}</a>;
                                }
                                else
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic&OpenMICAcronym=${item.OpenMIC}`} target='_blank'>{HeavyCheckMark}</a>;
                            }}
                        > MIC
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'MiMDStatus'}
                            AllowSort={true}
                            Field={'MiMDStatus'}
                            HeaderStyle={{ width: 50 }}
                            RowStyle={{ width: 50, textAlign: 'center' }}
                            Content={({ item, field, style }) => {
                                if (item[field] == 'Error') {
                                    style.backgroundColor = 'palevioletred';
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic&OpenMICAcronym=${item.OpenMIC}`} target='_blank' >{CrossMark}</a>;
                                }
                                else if (item[field] == 'Warning') {
                                    style.backgroundColor = 'antiquewhite';
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic&OpenMICAcronym=${item.OpenMIC}`} target='_blank' >{Warning}</a>;
                                }
                                else if (item.LastGood == null && item.MICBadDays == null) {
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic&OpenMICAcronym=${item.OpenMIC}`} target='_blank' >{Questionmark}</a>;
                                }
                                else
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic&OpenMICAcronym=${item.OpenMIC}`} target='_blank'>{HeavyCheckMark}</a>;
                            }}
                        > miMD
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'XDAStatus'}
                            AllowSort={true}
                            Field={'XDAStatus'}
                            HeaderStyle={{ width: 50 }}
                            RowStyle={{ width: 50, textAlign: 'center' }}
                            Content={({ item, field, style }) => {
                                if (item[field] == 'Error') {
                                    style.backgroundColor = 'palevioletred';
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=xda`} target='_blank' >{CrossMark}</a>;
                                }
                                else if (item[field] == 'Warning') {
                                    style.backgroundColor = 'antiquewhite';
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=xda`} target='_blank' >{Warning}</a>;
                                }
                                else
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=xda`} target='_blank'>{HeavyCheckMark}</a>;
                            }}
                        > XDA
                        </ReactTable.Column>
                        <ReactTable.Column<SCGlobal.DeviceHealthReport>
                            Key={'DQStatus'}
                            AllowSort={true}
                            Field={'DQStatus'}
                            HeaderStyle={{ width: 50 }}
                            RowStyle={{ width: 50, textAlign: 'center' }}
                            Content={({ item, field, style }) => {
                                if (item.DQStatus == 'Error') {
                                    style.backgroundColor = 'palevioletred';
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=xda`} target='_blank' >{CrossMark}</a>;
                                }
                                else if (item.DQStatus == 'Warning') {
                                    style.backgroundColor = 'antiquewhite';
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=dq`} target='_blank' >{Warning}</a>;
                                }
                                else
                                    return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=dq`} target='_blank'>{HeavyCheckMark}</a>;
                            }}
                        > DQ
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
        </div>
    )
}

export default DeviceHealthReport;

