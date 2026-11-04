//******************************************************************************************************
//  GenericByPage.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  10/28/2026 - N. Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch } from '../hooks';
import * as React from 'react';
import { SearchBar, Warning, Search, GenericController, GenericSlice } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { OperationResult } from '../CommonComponents/ResultAlert';
import AlertDisplay from '../CommonComponents/AlertDisplay';
import moment from 'moment';
import * as $ from 'jquery';
//import AddAllSubscription from './AddAllSubscription';

declare var homePath;
declare var version;

// TODO: when slices are removed, we can remove this too.
interface U { ID: number | string }

// TODO: from SystemCenter - maybe move to Gemstone?
interface IColDatum<T> { item: T, key: string, field: keyof T | undefined, index: number, style?: React.CSSProperties }
export interface IByCol<T> {
    Label: string,
    Field: keyof T,
    Type: Search.FieldType,
    Width?: string,
    AllowSort?: boolean,
    Content?: (item: IColDatum<T>) => React.ReactNode;
}

interface IProps<T extends U> {
    /**
     * Api path for a GenericController.
     */
    ControllerPath: string
    /**
     * Primary key to use for record.
     */
    PrimaryKey: keyof T
    /**
     * Default sort key for table.
     */
    DefaultSort: keyof T
    /**
     * Default ascending value for table.
     */
    DefaultAscending: boolean
    /**
     * Search field for the quick search bar.
     */
    DefaultSearchKey: keyof T
    /**
     * Columns to include in the table.
     */
    Columns: IByCol<T>[]
    /**
     * Local address in browser application storage to store paging information.
     */
    PagingID: string
    /**
     * Name for the record type.
     */
    RecordType: string
    /**
     * If a slice is provided, it will be set as changed when DBACtions are taken using a controller. Eventually this will be removed.
     */
    Slice?: GenericSlice<T>
    /**
     * Function to remove subscription. If provided, adds a Removal column.
     */
    OnDelete?: (item: T) => $.jqXHR
    /**
     * Allows parent component to trigger refresh.
     */
    RefreshCount?: number
    /**
     * Base filters that the user cannot remove.
     */
    BaseFilters?: Search.IFilter<T>[]
    /**
     * Button override for the "DELETE" or removal option. 
     */
    DeleteButton?: (item: T, isDeleting: boolean, callback: (e: React.MouseEvent, item: T) => void) => React.ReactNode
    /** 
     * For use if parent is keeping Operation Results state.
     */
    OperationResults?: OperationResult[]
    /**
     * Set parent's Operation Results state.
     */
    SetOperationResults?: React.Dispatch<React.SetStateAction<OperationResult[]>>
}

/**
 * Generic ByPage component, providing a table for CRUD operations on all records of a certain type.
 * @param props
 * @returns
 */
const GenericByPage = <T extends U,>({
    ControllerPath,
    PrimaryKey,
    DefaultSort,
    DefaultAscending,
    DefaultSearchKey,
    Columns,
    PagingID,
    OnDelete,
    Slice,
    RefreshCount,
    RecordType,
    BaseFilters,
    DeleteButton,
    OperationResults,
    SetOperationResults,
    children
}: React.PropsWithChildren<IProps<T>>) => {
    const dispatch = useAppDispatch();

    const [data, setData] = React.useState<T[]>([]);
    const [searchStatus, setSearchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [sortField, setSortField] = React.useState<keyof T>(DefaultSort);
    const [ascending, setAscending] = React.useState<boolean>(DefaultAscending);
    const [filters, setFilters] = React.useState<Search.IFilter<T>[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [refreshCount, refreshData] = React.useState<number>(0);

    const [selectedRecord, setSelectedRecord] = React.useState<T | null>(null);
    const [showRemoveWarning, setShowRemoveWarning] = React.useState<boolean>(false);
    const [deleteStatus, setDeleteStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [operationResults, setOperationResults] = React.useState<OperationResult[]>([]); // keep it locally in most implementations, but if provided in props, we'll use and propagate those.

    const allFilters = React.useMemo(() => {
        if (BaseFilters == null) return filters;
        return [...filters, ...BaseFilters]
    }, [filters, BaseFilters])


    // just going to write out this useEffect right now, we can move it into a hook later.
    React.useEffect(() => {
        setSearchStatus('loading');
        const handle = new GenericController<T>(ControllerPath, sortField, ascending).PagedSearch(allFilters, sortField, ascending, page);
        handle.done((response) => {
            setSearchStatus('idle');
            setData(JSON.parse(response.Data));
            setTotalPages(response.NumberOfPages);
            setTotalRecords(response.TotalRecords);
            setRecordsPerPage(response.RecordsPerPage);
            if (page >= response.NumberOfPages) setPage(Math.max(response.NumberOfPages - 1, 0))
        })
        handle.fail((_, textStatus) => {
            if (textStatus === "abort") return;
            setSearchStatus('error');
            (SetOperationResults ?? setOperationResults)(opres => [{ RecordType: RecordType, Timestamp: moment().valueOf(), OperationType: "FETCH", Result: "failure" }, ...opres]);
        })
        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        }
    }, [allFilters, sortField, ascending, page, refreshCount, RefreshCount])


    const getContent = React.useCallback((datum: IColDatum<T>, col: IByCol<T>) => {
        if (col?.Content != null) return col.Content(datum);
        else if (col.Type === 'boolean') return datum.item[datum.field] ? <ReactIcons.CheckMark Color="var(--success)" /> : <></>
        else return datum.item[datum.field] ?? <></>
    }, []);

    const searchCols = React.useMemo(() =>
        Columns.map(
            col => ({ label: col.Label, key: col.Field.toString(), type: col.Type, isPivotField: false })
        )
        , [Columns]);

    const handleDelete = React.useCallback((e: React.MouseEvent, item: T) => {
        e.preventDefault();
        setSelectedRecord(item);
        setShowRemoveWarning(true);
    }, [])

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <div className="row">
                <div className="col">
                    <SearchBar<T>
                        CollumnList={searchCols}
                        defaultCollumn={searchCols.find(col => col.key === DefaultSearchKey) ?? searchCols[0]}
                        SetFilter={setFilters} Direction='left' Width='50%' Label='Search' StorageID={`${PagingID}/Filters`}
                        ShowLoading={searchStatus === 'loading'}
                        ResultNote={searchStatus === 'error' ?
                            'Could not complete Search' : (`Displaying ${RecordType}(s) ` + (totalRecords > 0 ? (recordsPerPage * page + 1) : 0) + ' - ' + (recordsPerPage * page + data.length)) + ' out of ' + totalRecords}
                    >
                        {children}
                    </SearchBar>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <AlertDisplay OperationResults={OperationResults ?? operationResults} SetOperationResults={SetOperationResults ?? setOperationResults} />
                </div>
            </div>
            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<T>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField as string}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortField)
                                setAscending((val) => !val);
                            else {
                                setSortField(d.colKey as keyof T)
                            }
                        }}
                        TableStyle={{
                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item, index) => index}
                    >
                        {
                            ...Columns.map(col => (
                                <Column<T>
                                    Key={col.Field.toString()}
                                    AllowSort={col.AllowSort}
                                    Field={col.Field}
                                    HeaderStyle={{ width: col?.Width ?? 'auto' }}
                                    RowStyle={{ width: col?.Width ?? 'auto' }}
                                    Content={datum => getContent(datum, col)}
                                >{col.Label}
                                </Column>
                            ))
                        }
                        {
                            OnDelete != null ? <Column<T>
                                Key={'Remove'}
                                AllowSort={false}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                                Content={({ item }) => {
                                    const isDeleting = selectedRecord != null && selectedRecord[PrimaryKey] === item[PrimaryKey] && deleteStatus === 'loading';
                                    return (
                                        DeleteButton != null
                                            ? DeleteButton(
                                                item,
                                                isDeleting,
                                                (e) => handleDelete(e, item)
                                            )
                                            : <button className={`btn btn-sm ${isDeleting ? 'btn-disabled' : ''}`} disabled={isDeleting} onClick={(e) => handleDelete(e, item)}><span>
                                                {
                                                    isDeleting
                                                        ? <ReactIcons.SpiningIcon Color="var(--danger)" Size={20} />
                                                        : <ReactIcons.TrashCan Color="var(--danger)" Size={20} />
                                                }
                                            </span></button>
                                    )
                                }}
                            > <p></p>
                            </Column> : null
                        }
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Paging
                        Current={page + 1}
                        SetPage={(page) => setPage(page - 1)}
                        Total={totalPages}
                    />
                </div>
            </div>
            <Warning Show={showRemoveWarning} Title={`Remove ${RecordType}`} Message={`Are you sure you want to remove this ${RecordType}?`}
                CallBack={(c) => {
                    setShowRemoveWarning(false);
                    if (c) {
                        setDeleteStatus('loading');
                        OnDelete(selectedRecord)
                            .done(() => {
                                setDeleteStatus('idle');
                                refreshData(x => x + 1);
                                (SetOperationResults ?? setOperationResults)(opres => [{ RecordType: RecordType, Timestamp: moment().valueOf(), OperationType: "DELETE", Result: "success" }, ...opres]);
                                if (Slice != null) dispatch(Slice.SetChanged());
                            })
                            .fail(() => {
                                setDeleteStatus('error');
                                (SetOperationResults ?? setOperationResults)(opres => [{ RecordType: RecordType, Timestamp: moment().valueOf(), OperationType: "DELETE", Result: "failure" }, ...opres]);
                            })
                    }
                    else {
                        setSelectedRecord(null);
                    }
                }} />
        </div>
    )
}

export default GenericByPage;