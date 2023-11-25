//******************************************************************************************************
//  ResultDisplay.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  11/23/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { FilterableTable, ServerErrorIcon, Search } from '@gpa-gemstone/react-interactive';
import { Paging } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';

interface IProps {
    GetTable: (start: number, end: number, Filters: Search.IFilter<any>[], OrderBy: string, Ascending: boolean) => JQuery.jqXHR<any[]>;
    GetCount: (Filters: Search.IFilter<any>[]) => JQuery.jqXHR<number>;
    OnSelection?: (record: any) => void;
    Selected?: (record: any) => boolean;
    ForceReload?: boolean;
}

const RowsPerPage = 50;

export default function ResultDisplay(props: IProps) {
    const [datastatus, setDataStatus] = React.useState<Application.Types.Status>('unintiated');
    const [countstatus, setCountStatus] = React.useState<Application.Types.Status>('unintiated');
    const [externalData, setExternalData] = React.useState<any[]>([]);
    const [ascExt, setAscExt] = React.useState<boolean>(false);
    const [sortExt, setSortExt] = React.useState<string>("Hero");
    const [count, setCount] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(0);
    const [filters, setFilters] = React.useState<Search.IFilter<any>[]>([]);
    const [cols, setCols] = React.useState<any[]>([]);

    React.useEffect(() => {
        setCountStatus('loading');
        const countHandle = props.GetCount(filters);

        countHandle.then((d) => { setCount(d);  setCountStatus('idle') }, () => setCountStatus('error'))
        return () => {
            if (countHandle != null && countHandle.abort != null) countHandle.abort()
        }
    }, [filters, props.ForceReload]);

    React.useEffect(() => {

        setDataStatus('loading');
        const dataHandle = props.GetTable(page * RowsPerPage + 1, (page + 1) * RowsPerPage, filters, sortExt, ascExt);

        dataHandle.then((d) => {
            setExternalData(d ?? []);
            setDataStatus('idle');
            if (d == null || d.length == 0)
                setCount(0);
        }, () => setDataStatus('error'))
        return () => {
            if (dataHandle != null && dataHandle.abort != null) dataHandle.abort()
        }
    }, [page, ascExt, sortExt, filters]);

    React.useEffect(() => {
        if (externalData.length == 0)
            return;
        const updatedCols = Object.keys(externalData[0]).map((field: string) => {
            return { key: field, field: field, label: field, Type: 'string' }
        })
        if (!_.isEqual(updatedCols, cols))
            setCols(updatedCols);
    }, [externalData])

    return <>
        <ServerErrorIcon Show={countstatus === 'error' || datastatus === 'error'} Size = { 40}
            Label = { 'Could not query external database table. Please contact your administrator.'}
            />
    
        <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="col" style={{ flex: 1, overflow: 'hidden' }}>
                {countstatus !== 'error' && datastatus !== 'error' ?
                    <FilterableTable<any>
                        cols={cols}
                        SetFilter={setFilters}
                        tableClass="table table-hover"
                        data={externalData}
                        sortKey={sortExt}
                        ascending={ascExt}
                        onSort={(d) => {
                            if (d.colKey === sortExt)
                                setAscExt(!ascExt);
                            else {
                                setAscExt(true);
                                setSortExt(d.colKey);
                            }
                        }}
                        onClick={(d) => {
                            if (props.OnSelection !== undefined) props.OnSelection!(d.row);
                        }}
                        tableStyle={{
                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        theadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                        selected={(item) => props.Selected === undefined? false : props.Selected!(item) ?? false}
                    /> : null}
            </div>
        </div>
        <div className="row">
            <div className="col">
                {count == 0 && countstatus === 'idle' ? <div className="alert alert-warning"> The query succeeded but no records where found. </div> : null}
                {count > 0 ? <Paging Current={page + 1} Total={Math.ceil(count / RowsPerPage)} SetPage={(p) => setPage(p - 1)} /> : null}
            </div>
        </div>
    </>


}
