//******************************************************************************************************
//  hooks.ts - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  08/10/2022 - G. Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Application } from '@gpa-gemstone/application-typings';
import { GenericController, Search } from '@gpa-gemstone/react-interactive';
import { AppDispatch, RootState } from './Store/Store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IPagedResult<T> {
    Data: T[],
    NumberOfPages: number,
    TotalRecords: number,
    RecordsPerPage: number
}

export const useBoundPaging = (currentPage: number, totalPages: number, setPage: (number) => void): void => {
    React.useEffect(() => {
        if (currentPage >= totalPages && totalPages > 0) {
            setPage(totalPages)
        }
        if (currentPage < 1) {
            setPage(1)
        }
    }, [totalPages, currentPage])

}

export function usePagedSearch<T,>(controller: GenericController<T>, filters: Search.IFilter<T>[], sortField?: keyof T, ascending?: boolean, page?: number, parentID?: string | number, refreshCount?: number) {

    const pagedHandle = React.useRef<JQuery.jqXHR<IPagedResult<T>> | null>(null);
    const [pagedData, setPagedData] = React.useState<T[]>([]);
    const [pagedStatus, setPagedStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const sortKey = sortField ?? controller.DefaultSort;
    const asc = ascending ?? controller.Ascending;
    const requestedPage = page ?? currentPage;

    const refetchData = React.useCallback(() => {
        setPagedStatus('loading');

        pagedHandle.current = controller.PagedSearch(filters, sortKey, asc, requestedPage, parentID)
            .done((data: IPagedResult<T>) => {
                setPagedData(JSON.parse(data.Data as unknown as string));
                setTotalPages(data.NumberOfPages);
                setTotalRecords(data.TotalRecords);
                setRecordsPerPage(data.RecordsPerPage);
                if (page >= data.NumberOfPages)
                    setCurrentPage(Math.max(data.NumberOfPages - 1, 0));

                setPagedStatus('idle');
            })
            .fail(() => setPagedStatus('error'));
    }, [controller, filters, sortKey, asc, requestedPage, parentID, currentPage])

    React.useEffect(() => {
        const cleanup = refetchData();
        return cleanup;
    }, [refetchData, refreshCount])

    return {
        Data: pagedData,
        Status: pagedStatus,
        TotalPages: totalPages,
        TotalRecords: totalRecords,
        RecordsPerPage: recordsPerPage
    }
}

export function useControllerFetch<T,>(controller: GenericController<T>, sortField?: keyof T, ascending?: boolean, parentID?: string|number, refreshCount?: number) {

    const fetchHandle = React.useRef<JQuery.jqXHR<T[]> | null>(null);
    const [fetchData, setFetchData] = React.useState<T[]>([]);
    const [fetchStatus, setFetchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const sortKey = sortField ?? controller.DefaultSort;
    const asc = ascending ?? controller.Ascending;

    const refetchData = React.useCallback(() => {
        setFetchStatus('loading');

        fetchHandle.current = controller.Fetch(parentID, sortKey, asc)
            .done((data: T[]) => {
                setFetchData(data);
                setFetchStatus('idle');
            })
            .fail(() => setFetchStatus('error'))
        const cleanup = () => {
            if (fetchHandle.current?.abort != null) fetchHandle.current.abort();
        }
        return cleanup
    }, [controller, parentID, sortKey, asc])

    React.useEffect(() => {
        const cleanup = refetchData();
        return cleanup;
    }, [refetchData, refreshCount])

    return {
        Data: fetchData,
        Status: fetchStatus
    }
} 

export function useGetOne<T,>(apiPath: string, refreshCount?: number) {
    const getOneHandle = React.useRef<JQuery.jqXHR<T> | null>(null);
    const [record, setRecord] = React.useState<T | null>(null);
    const [recordStatus, setRecordStatus] = React.useState<Application.Types.Status>('uninitiated');

    const refetchData = React.useCallback(() => {
        setRecordStatus('loading');

        getOneHandle.current = $.ajax({
            type: "GET",
            url: apiPath,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
            .done((record: T) => {
                setRecord(record);
                setRecordStatus('idle');
            })
            .fail(() => setRecordStatus('error'))

        const cleanup = () => {
            if (getOneHandle.current?.abort != null) getOneHandle.current.abort();
        }
        return cleanup
        
    }, [apiPath])

    React.useEffect(() => {
        const cleanup = refetchData();
        return cleanup;
    }, [refetchData, refreshCount])

    return {
        RecordData: record,
        RecordStatus: recordStatus
    }
}