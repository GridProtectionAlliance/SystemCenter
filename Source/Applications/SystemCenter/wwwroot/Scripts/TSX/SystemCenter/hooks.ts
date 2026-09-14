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
import { GenericController } from '@gpa-gemstone/react-interactive';
import { AppDispatch, RootState } from './Store/Store';


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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

export function useControllerFetch<T,>(controller: GenericController<T>, sortField?: keyof T, ascending?: boolean, parentID?: string|number, refreshCount?: number,) {

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