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
import { SystemCenter as SCGlobal} from '../global';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { Search, SearchBar, ToolTip } from '@gpa-gemstone/react-interactive';

interface Meter {
    ID: number, AssetKey: string, Name: string, Location: string, MappedAssets: number, Make: string, Model: string 
}
declare var homePath: string;

const defaultSearchcols: Array<Search.IField<Meter>> = [
    { label: 'AssetKey', key: 'AssetKey', type: 'string' },
    { label: 'Name', key: 'Name', type: 'string' },
    { label: 'Location', key: 'Location', type: 'string' },
    { label: 'Make', key: 'Make', type: 'string' },
    { label: 'Model', key: 'Model', type: 'string' },
    { label: 'Number of Assets', key: 'MappedAssets', type: 'number' },
];

const ByMeter: SCGlobal.ByComponent = (props) => {
    let history = useHistory();

    const [search, setSearch] = React.useState<Array<Search.IFilter<Meter>>>([]);
    const [data, setData] = React.useState<Array<Meter>>([]);

    const [sortField, setSortField] = React.useState<string>('AssetKey');
    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<Meter>>>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const [ascending, setAscending] = React.useState<boolean>(true);

    React.useEffect(() => {
        let handle = getMeters();
        handle.done((dt: string) => {
            setSearchState('Idle');
            setData(JSON.parse(dt) as Array<Meter>);
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
            url: `${homePath}api/OpenXDA/MeterList/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID, state: {} })
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
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<Meter>
            ))), ['label'], ["asc"]);
            setFilterableList(ordered)
        });

        return handle;
    }


    const standardSearch: Search.IField<Meter> = { label: 'Name', key: 'Name', type: 'string' };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<Meter> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={standardSearch} Width={'50%'} Label={'Search'}
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
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Wizards:</legend>
                        <form>
                            <button className="btn btn-primary" data-tooltip onClick={goNewMeterWizard} hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0}>New Meter</button>
                        </form>
                    </fieldset>
                </li>
                <li className="nav-item" style={{ width: '20%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-primary" data-toggle='modal' data-target="#extDBModal" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault() }}>Update Ext DB </button>
                            </div>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table
                    cols={[
                        { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetKey', label: 'Key', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'Location', label: 'Substation', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'MappedAssets', label: 'Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Make', label: 'Make', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Model', label: 'Model', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
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

export default ByMeter;

