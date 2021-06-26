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
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';

import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { Search, SearchBar, ToolTip } from '@gpa-gemstone/react-interactive';


const defaultSearchcols: Search.IField<SCGlobal.DeviceHealthReport>[] = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Substation', key: 'Substation', type: 'string', isPivotField: false },
    { label: 'Model', key: 'Model', type: 'string', isPivotField: false },
    { label: 'TSC', key: 'TSC', type: 'string', isPivotField: false },
    { label: 'Sector', key: 'Sector', type: 'string', isPivotField: false },
    { label: 'IP', key: 'IP', type: 'string', isPivotField: false },
    { label: 'Last Good Health', key: 'LastGood', type: 'datetime', isPivotField: false },
    { label: 'Bad Days', key: 'BadDays', type: 'number', isPivotField: false },
    { label: 'Status', key: 'Status', type: 'string', isPivotField: false },
    { label: 'Last Config Change', key: 'LastConfigChange', type: 'datetime', isPivotField: false },

];

const DeviceHealthReport: SCGlobal.ByComponent = (props) => {
    let history = useHistory();

    const [search, setSearch] = React.useState<Search.IFilter<SCGlobal.DeviceHealthReport>[]>([]);
    const [data, setData] = React.useState<SCGlobal.DeviceHealthReport[]>([]);

    const [sortField, setSortField] = React.useState<keyof SCGlobal.DeviceHealthReport>('Name');
    const [filterableList, setFilterableList] = React.useState<Search.IField<SCGlobal.DeviceHealthReport>[]>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const [ascending, setAscending] = React.useState<boolean>(true);

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
    }, [sortField, ascending, search]);

    React.useEffect(() => {
        let handle = getAdditionalFields();

        return () => {
            if (handle.abort != null) handle.abort();
        }
    }, []);


    function getMeters(): JQuery.jqXHR<string>{
        setSearchState('Loading');
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/DeviceHealthReport/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function handleSelect(item) {
        //history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID, state: {} })
    }
    function goNewMeterWizard() {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=NewMeterWizard', state: {} })
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
                        { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Substation', label: 'Substation', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => <a href={`${homePath}index.cshtml?name=Location&LocationID=${item.LocationID}&Tab=images` } target='_blank'>{item[key]}</a> },
                        { key: 'Model', label: 'Model', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'TSC', label: 'TSC', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Sector', label: 'Sector', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'IP', label: 'IP', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'LastGood', label: 'Last Good', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item,key,style) => moment(item[key]).format('MM/DD/YYYY') },
                        { key: 'BadDays', label: 'Bad Days', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Status', label: 'Status', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        {
                            key: 'LastConfigChange', label: 'Last Config Change', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item, key, style) => {
                                if (item[key] == undefined)
                                    return '';
                                else
                                    return moment(item[key]).format('MM/DD/YYYY')
                            }
                        },
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
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%'  }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <div className="modal" id="extDBModal">
                <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Meter External Database Fields</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <ExternalDBUpdate ID={-1} Type='Meter' Tab = ""/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeviceHealthReport;

