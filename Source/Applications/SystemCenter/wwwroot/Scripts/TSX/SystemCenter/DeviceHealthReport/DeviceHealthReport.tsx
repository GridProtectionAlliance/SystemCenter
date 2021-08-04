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
import Table from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';

import { Search, SearchBar, ToolTip } from '@gpa-gemstone/react-interactive';
import { useDispatch, useSelector } from 'react-redux';
import { SystemCenterSettingSlice } from '../Store/Store';
import moment from 'moment';

const defaultSearchcols: Search.IField<SCGlobal.DeviceHealthReport>[] = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Substation', key: 'Substation', type: 'string', isPivotField: false },
    { label: 'Model', key: 'Model', type: 'string', isPivotField: false },
    { label: 'TSC', key: 'TSC', type: 'string', isPivotField: false },
    { label: 'Sector', key: 'Sector', type: 'string', isPivotField: false },
    { label: 'IP', key: 'IP', type: 'string', isPivotField: false },
    { label: 'Last Successful Connection', key: 'LastGood', type: 'datetime', isPivotField: false },
    { label: 'Bad Days', key: 'BadDays', type: 'number', isPivotField: false },
    { label: 'Status', key: 'Status', type: 'string', isPivotField: false },
    { label: 'Last Config Change', key: 'LastConfigChange', type: 'datetime', isPivotField: false },

];

const DeviceHealthReport: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    let dispatch = useDispatch();

    const [search, setSearch] = React.useState<Search.IFilter<SCGlobal.DeviceHealthReport>[]>([]);

    const [data, setData] = React.useState<SCGlobal.DeviceHealthReport[]>([]);

    const [sortKey, setSortKey] = React.useState<string>('Name');
    const [filterableList, setFilterableList] = React.useState<Search.IField<SCGlobal.DeviceHealthReport>[]>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const [ascending, setAscending] = React.useState<boolean>(true);

    const settings = useSelector(SystemCenterSettingSlice.Data);
    const settingStatus = useSelector(SystemCenterSettingSlice.Status);

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
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

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
        //history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID, state: {} })
    }

    function getAdditionalFields(): JQuery.jqXHR<Array<SystemCenter.Types.AdditionalField>> {
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
            let ordered = _.orderBy(defaultSearchcols.concat(d.map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<SCGlobal.DeviceHealthReport>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }


    const standardSearch: Search.IField<SCGlobal.DeviceHealthReport> = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<SCGlobal.DeviceHealthReport> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={standardSearch} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Meters'}
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

            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<SCGlobal.DeviceHealthReport>
                    cols={[
                        { key: 'Name', label: 'Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => <a href={`${homePath}index.cshtml?name=DownloadedFiles&MeterID=${item.ID}&MeterName=${item.Name}`} target='_blank'>{item[key]}</a> },
                        { key: 'OpenMIC', label: 'OpenMIC ID', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => <a href={`${settings.find(s => s.Name == 'OpenMIC.Url')?.Value}/devices.cshtml?Acronym=${item.OpenMIC}`} target='_blank'>{item[key]}</a> },
                        { key: 'Substation', label: 'Substn', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => <a href={settings.find(s => s.Name == 'DeviceHealthReport.SubstationLink')?.Value.replace('<AssetKey>', item.LocationKey) } target='_blank'>{item[key]}</a> },
                        { key: 'Model', label: 'Model', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => <a href={`${homePath}index.cshtml?name=Location&LocationID=${item.LocationID}&Tab=images`} target='_blank'>{item[key]}</a> },
                        { key: 'TSC', label: 'TSC', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: (item, key, style) => <a href={`${homePath}index.cshtml?name=DeviceContacts&ID=${item.TSCID}&Name=${item.TSC}&Field=TSC`} target='_blank'>{item[key]}</a> },
                        { key: 'Sector', label: 'Sector', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => <a href={`${homePath}index.cshtml?name=DeviceContacts&ID=${item.SectorID}&Name=${item.Sector}&Field=Sector`} target='_blank'>{item[key]}</a> },
                        { key: 'IP', label: 'IP', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => (item.OpenMIC != undefined ? <a href={`${settings.find(s => s.Name == 'OpenMIC.Url')?.Value}/status.cshtml?Acronym=${item.OpenMIC}`} target='_blank'>{item[key]}</a> : item[key]) },
                        {
                            key: 'LastGood', label: 'Last Succ Conn', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, field, style) => {
                                if (moment().diff(moment(item[field]), 'hours') > 4) style.backgroundColor = 'yellow';
                                if (moment().diff(moment(item[field]), 'hours') > 24 ) style.backgroundColor = 'orange';
                                else if (moment().diff(moment(item[field]), 'days') > 7) style.backgroundColor = 'red';

                                return <a href={`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic`} target='_blank'>{moment(item[key]).format('MM/DD/YYYY HH:mm')}</a>
                            }
                        },
                        { key: 'BadDays', label: 'Bad Days', headerStyle: { width: '5%' }, rowStyle: { width: '5%' } },
                        {
                            key: 'LastConfigChange', label: 'Last Conf Chg', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, field, style) => {

                                if (item[key] == undefined)
                                    return '';
                                else {
                                    if (moment().diff(moment(item[field]), 'hours') < 24) style.backgroundColor = 'red';
                                    else if (moment().diff(moment(item[field]), 'days') < 7) style.backgroundColor = 'orange';
                                    else if (moment().diff(moment(item[field]), 'days') < 30) style.backgroundColor = 'yellow';

                                    return <a href={`${settings.find(s => s.Name == 'MiMD.Url')?.Value}/index.cshtml?name=Configuration&MeterID=${item.ID}`} target='_blank'>{moment(item[key]).format('MM/DD/YYYY')}</a>
                                }
                            }
                        },
                        {
                            key: 'Status', label: 'Status', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => {

                                return <a href= {`${homePath}index.cshtml?name=DeviceIssuesPage&MeterID=${item.ID}&Tab=openmic`} target='_blank'>Status</a>
                            }
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
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colKey);
                        }
                        
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%'  }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
        </div>
    )
}

export default DeviceHealthReport;

