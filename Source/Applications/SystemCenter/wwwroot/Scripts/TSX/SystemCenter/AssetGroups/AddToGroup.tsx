  
﻿//******************************************************************************************************
//  EventSearchbarFitlerModal.tsx - Gbtc
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
//  10/05/2021 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import React from 'react';
import 'moment';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { GenericSlice, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import Table, { Column } from '@gpa-gemstone/react-table';
import { ascending } from 'd3';

interface S {ID: number}

interface IProps<T extends S> {
    Data: T[],
    Type: ('Meter' | 'Asset' | 'Asset Group'),
    SetData: (d: T[]) => void,
    Slice: GenericSlice<T>,
    TableColumns: Column<T>[]
    InitialSortKey: keyof T
    StandardSearch: Search.IField<T>
    DefaultFilterList: Search.IField<T>[]
}

function AddToGroup<T extends S>(props: IProps<T>) {
    const dispatch = useDispatch();
    const status = useSelector(props.Slice.Status);
    const list = useSelector(props.Slice.SearchResults) as T[];
    const filters = useSelector(props.Slice.SearchFilters) as Search.IFilter<T>[];

    const [filterableList, setFilterableList] = React.useState<Search.IField<T>[]>(props.DefaultFilterList as Search.IField<T>[]);
    const [sortKey, setSortKey] = React.useState<keyof T>(props.InitialSortKey);
    const [asc, setAsc] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (status == 'changed' || status == 'unintiated')
            dispatch(props.Slice.Fetch());
    }, [status]);

    // #ToDo: Move default Fields into gpa-gemstone to match SystemCenter and SEBrowser
    React.useEffect(() => {
        let handle = null;
        let handleLine = null;
        let handleBreaker = null;
        let handleCapBank = null;
        let handleTransformer = null;
        let handleBus = null;

        if (props.Type == 'Meter')
            handle = getAdditionalFields('Meter');
        if (props.Type == 'Asset') {
            handleLine = getAdditionalFields('Line');
            handleBreaker = getAdditionalFields('Breaker');
            handleCapBank = getAdditionalFields('CapBank');
            handleTransformer = getAdditionalFields('Transformer');
            handleBus = getAdditionalFields('Bus');
        }

        setFilterableList(props.DefaultFilterList as Search.IField<T>[]);

        if (props.Type == 'Asset') {
            return () => {
                if (handleLine.abort != null) handleLine.abort();
                if (handleBreaker.abort != null) handleBreaker.abort();
                if (handleCapBank.abort != null) handleCapBank.abort();
                if (handleTransformer.abort != null) handleTransformer.abort();
                if (handleBus.abort != null) handleBus.abort();
            }
        }

        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [props.Type]);

    function getAdditionalFields(table: string): JQuery.jqXHR<SystemCenter.Types.AdditionalField[]> {
        function ConvertType(type: string) {
            if (type == 'string' || type == 'integer' || type == 'number' || type == 'datetime' || type == 'boolean')
                return { type: type }
            return {
                type: 'enum', enum: [{ Label: type, Value: type }]
            }
        };
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/openXDA/AdditionalField/ParentTable/${table}/FieldName/0`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });

        handle.done((d: Array<SystemCenter.Types.AdditionalField>) => {
            setFilterableList(defaults => {
                return _.orderBy(defaults.concat(d.filter(item => item.Searchable).map(item => (
                    { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<T>
                ))), ['label'], ["asc"]);
            })
        });
        return handle;
    }

    React.useEffect(() => {
        Search(filters);
        props.SetData(props.Data);

    }, [sortKey, asc]);

    function Search(flds: Search.IFilter<T>[]) {
        if (props.Type == 'Meter')
            dispatch(props.Slice.DBSearch({ filter: flds, sortField: sortKey, ascending: asc }));
        if (props.Type == 'Asset')
            dispatch(props.Slice.DBSearch({ filter: flds, sortField: sortKey, ascending: asc }));
        if (props.Type == 'Asset Group')
            dispatch(props.Slice.DBSearch({ filter: flds, sortField: sortKey, ascending: asc }));

    }

    function GetCount(): number {
        return list.length;
    }

    function AddCurrentList() {
        let updatedData: any[];
        updatedData = (props.Data as any[]).concat(list);
        props.SetData(_.uniqBy((updatedData as T[]), (d) => d.ID));
    }

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <SearchBar<T>
                        CollumnList={filterableList}
                        SetFilter={Search}
                        Direction={'left'}
                        defaultCollumn={props.StandardSearch}
                        Width={'50%'}
                        Label={'Search'}
                        ShowLoading={status == 'loading'}
                        ResultNote={status == 'error' ?
                            'Could not complete Search' : 'Found ' + GetCount() + ' ' + props.Type + '(s)'}
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

                            handle.done(d => setOptions(d.map(item => ({ Value: item.ID, Label: item.Value }))))
                            return () => { if (handle != null && handle.abort == null) handle.abort(); }
                        }}

                    >
                        <li className="nav-item" style={{ width: '20%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Quick Selects:</legend>
                                <form>
                                    <div className="form-group">
                                        <div className="btn btn-primary" onClick={(event) => { event.preventDefault(); AddCurrentList(); }}>Add Current List to Asset Group</div>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <Table<T>
                            cols={props.TableColumns}
                            tableClass="table table-hover"
                            data={list as T[]}
                            sortKey={sortKey as string}
                            ascending={asc}
                            onSort={(d) => {
                                if (d.colKey === "Scroll")
                                    return;
                                if (d.colKey === sortKey)
                                    setAsc(!asc);
                                else {
                                    setAsc(true);
                                    setSortKey(d.colField);
                                }
                            }}
                            onClick={(d) => props.SetData([...props.Data.filter(item => item.ID != d.row.ID), d.row])}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 450, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => false}
                        />
                    </div>
                    <div className='col-6'>
                        <Table<T>
                            cols={props.TableColumns}
                            tableClass="table table-hover"
                            data={props.Data}
                            sortKey={sortKey as string}
                            ascending={asc}
                            onSort={(d) => {
                                if (d.colKey === "Scroll")
                                    return;
                                if (d.colKey === sortKey)
                                    setAsc(!asc);
                                else {
                                    setAsc(true);
                                    setSortKey(d.colField);
                                }
                            }}
                            onClick={(d) => props.SetData(props.Data.filter(item => item.ID != d.row.ID))}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 450, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


export default AddToGroup;