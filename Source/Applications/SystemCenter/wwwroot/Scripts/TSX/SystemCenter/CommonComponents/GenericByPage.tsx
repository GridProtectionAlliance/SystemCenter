//******************************************************************************************************
//  GenericByPage.tsx - Gbtc
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
//  10/09/2024 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';
import { Search, Modal, GenericController, SearchBar, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';

interface U {
    ID: number|string
}

interface IProps<T extends U> {
    ControllerPath: string,
    DefaultSortKey: keyof T,
    DefaultSearchKey: string,
    DefaultSearchAscending: boolean,
    PagingID: string,
    Columns: SC.IByCol<T>[],
    OnClick?: (
        data: { colKey?: string; colField?: keyof T; row: T; data: T[keyof T] | null; index: number },
        event: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => void;
    RefreshData?: number,
    QueryAdditionalFields?: () => JQuery.jqXHR<SystemCenter.Types.AdditionalFieldView[]>
}

function GenericByPage<T extends U>(props: React.PropsWithChildren<IProps<T>>) {
    const [data, setData] = React.useState<T[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(props.DefaultSearchAscending ?? false);
    const [sortKey, setSortKey] = React.useState<keyof T>(props.DefaultSortKey);
    const [filters, setFilters] = React.useState<Search.IFilter<T>[]>([]);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [page, setPage] = React.useState<number>(0);
    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('idle');
    const [addlFieldCols, setAddlFieldCols] = React.useState<Search.IField<T>[]>([]);

    const [enumMap, setEnumMap] = React.useState<{ [key: string]: string }>({});

    const controller = React.useMemo(() =>
        new GenericController<T>(props.ControllerPath, props.DefaultSortKey, props.DefaultSearchAscending ?? false)
    , [props.ControllerPath, props.DefaultSortKey, props.DefaultSearchAscending]);

    const searchCols = React.useMemo(() => (
        [
            ...props.Columns.map(col => ({ label: col.Label, key: col.Field.toString(), type: col.Type, isPivotField: false })),
            ...addlFieldCols
        ]
    ), [addlFieldCols, props.Columns]);

    React.useEffect(() => {
        const storedInfo = JSON.parse(localStorage.getItem(`${props.PagingID}/Page`) as string);
        if (storedInfo == null) return;
        setPage(storedInfo);
    }, []);

    React.useEffect(() => {
        localStorage.setItem(`${props.PagingID}/Page`, JSON.stringify(page));
    }, [page]);

    React.useEffect(() => {
        setPageStatus('loading');
        const handle = controller.PagedSearch(filters, sortKey, ascending, page).done((result) => {
            setData(JSON.parse(result.Data as unknown as string));
            setPageInfo({
                RecordsPerPage: result.RecordsPerPage,
                NumberOfPages: result.NumberOfPages,
                TotalRecords: result.TotalRecords
            });
            setPageStatus('idle');
        }).fail(() => setPageStatus('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [filters, sortKey, ascending, page, props.RefreshData]);

    React.useEffect(() => {
        if (props.QueryAdditionalFields == null) return;

        function ConvertType(type: string) {
            if (type == 'string' || type == 'integer' || type == 'number' || type == 'datetime' || type == 'boolean')
                return { type: type }
            return { type: 'enum' }
        }
        const handle = props.QueryAdditionalFields().done((d: Array<SystemCenter.Types.AdditionalFieldView>) => {
            const ordered = _.orderBy(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<T>
            )), ['label'], ["asc"]);
            setAddlFieldCols(ordered);

            const x = {};
            d.filter(item => item.Searchable).forEach(item => {
                if (item.Type == 'string' || item.Type == 'integer' || item.Type == 'number' || item.Type == 'datetime' || item.Type == 'boolean')
                    return;
                x[item.FieldName] = item.Type;
            });
            setEnumMap(x);

        });

        return () => { if (handle != null && handle?.abort != null) handle.abort(); };
    }, [props.QueryAdditionalFields]);

    const getEnum = React.useCallback((setOptions, field) => {
        let handle = null;

        if (field.type != 'enum' || enumMap[field.key] == undefined)
            return () => { };

        handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${enumMap[field.key]}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
        return () => { if (handle != null && handle.abort == null) handle.abort(); }
    }, []);

    const getContent = React.useCallback((datum: SC.IColDatum<T>, col: SC.IByCol<T>) => {
        if (col?.Content != null) return col.Content(datum);
        else if (col.Type === 'boolean') return datum.item[datum.field] ? <ReactIcons.CheckMark Color="var(--green)" /> : <></>
        else return datum.item[datum.field] ?? <></>
    }, []);

    if (searchCols.length === 0) return (<></>);

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <LoadingScreen Show={pageStatus === 'loading'} />
            <SearchBar<T>
                CollumnList={searchCols}
                defaultCollumn={searchCols.find(col => col.key === props.DefaultSearchKey) ?? searchCols[0]}
                GetEnum={getEnum} SetFilter={setFilters} Direction='left' Width='50%' Label='Search' StorageID={`${props.PagingID}/Filters`}
                ShowLoading={pageStatus === 'loading'}
                ResultNote={pageStatus === 'error' ?
                    'Could not complete Search' : ('Displaying Record(s) ' + (pageInfo.TotalRecords > 0 ? (pageInfo.RecordsPerPage * page + 1) : 0) + ' - ' + (pageInfo.RecordsPerPage * page + data.length)) + ' out of ' + pageInfo.TotalRecords}
            >
                {props.children}
            </SearchBar>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <Table<T>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey.toString()}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey === sortKey) setAscending(a => !a);
                        else setSortKey(d.colField);
                    }}
                    TableStyle={{
                        padding: 0, width: '100%', height: '100%',
                        tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 0
                    }}
                    TheadStyle={{ fontSize: 'auto', tableLayout: 'fixed', display: 'table', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                    RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                    OnClick={props.OnClick}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    {
                        ...props.Columns.map(col => (
                            <Column<T>
                                Key={col.Field.toString()}
                                AllowSort={true}
                                Field={col.Field}
                                HeaderStyle={{ width: col?.Width ?? 'auto' }}
                                RowStyle={{ width: col?.Width ?? 'auto' }}
                                Content={datum => getContent(datum, col)}
                            >{col.Label}
                            </Column>
                        ))
                    }
                </Table>
            </div>
            <div className="row justify-content-center">
                <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
            </div>
        </div>
    )
}

export default GenericByPage;

