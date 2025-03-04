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
import { Application } from '@gpa-gemstone/application-typings';
import { ServerErrorIcon, Search, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { Paging, ConfigurableTable, ConfigurableColumn, Column } from '@gpa-gemstone/react-table';
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
    const [sortExt, setSortExt] = React.useState<string>("");
    const [count, setCount] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(0);
    const [filters, setFilters] = React.useState<Search.IFilter<any>[]>([]);
    const [cols, setCols] = React.useState<string[]>([]);

    React.useEffect(() => {
        setCountStatus('loading');
        const countHandle = props.GetCount(filters);

        countHandle.then((d) => { setCount(d);  setCountStatus('idle') },
            (d) => {if (d.statusText === 'abort') return; setCountStatus('error')})
        return () => {
            if (countHandle != null && countHandle.abort != null) countHandle.abort()
        }
    }, [filters, props.ForceReload]);

    React.useEffect(() => { setExternalData([]); setSortExt(''); }, [props.ForceReload])

    React.useEffect(() => {
        setDataStatus('loading');
        const dataHandle = props.GetTable(page * RowsPerPage + 1, (page + 1) * RowsPerPage, filters, sortExt, ascExt);

        dataHandle.then((d) => {
            const keyedData = d?.map((datum, index) => ({ ...datum, __tempXdaKey__: index }));
            setExternalData(keyedData ?? []);
            setDataStatus('idle');
            if (keyedData == null || keyedData.length == 0)
                setCount(0);
        }, (d) => {if (d.statusText === 'abort') return; setDataStatus('error')})
        return () => {
            if (dataHandle != null && dataHandle.abort != null) dataHandle.abort()
        }
    }, [page, ascExt, sortExt, filters]);

    React.useEffect(() => {
        if (externalData.length == 0)
            return;
        const updatedCols = Object.keys(externalData[0]);
        if (!_.isEqual(updatedCols, cols))
            setCols(updatedCols);
    }, [externalData])

    return <>
        <ServerErrorIcon Show={countstatus === 'error' || datastatus === 'error'} Size = { 40}
            Label = { 'Could not query external database table. Please contact your administrator.'}
            />
        <LoadingScreen Show={countstatus === 'loading' || datastatus === 'loading'} />
        <div className="row" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="col" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                {countstatus !== 'error' && datastatus !== 'error' ?
                    <ConfigurableTable<any>
                        SetFilters={setFilters}
                        TableClass="table table-hover"
                        Data={externalData}
                        SortKey={sortExt}
                        Ascending={ascExt}
                        OnSort={(d) => {
                            if (d.colKey === sortExt)
                                setAscExt(!ascExt);
                            else {
                                setAscExt(true);
                                setSortExt(d.colKey);
                            }
                        }}
                        OnClick={(d) => {
                            if (props.OnSelection !== undefined) props.OnSelection!(d.row);
                        }}
                        TheadStyle={{ fontSize: 'smaller' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => props.Selected === undefined ? false : props.Selected!(item) ?? false}
                        KeySelector={item => item.__tempXdaKey__}
                        LocalStorageKey={'TestTableResultColumns'}
                    >
                        {
                            cols.map(col =>
                                <ConfigurableColumn Key={col} Default={true} Label={col}>
                                    <Column<any>
                                        Key={col} Field={col}
                                        AllowSort={true} Adjustable={true}
                                        HeaderStyle={{ width: 'auto' }}
                                        RowStyle={{ width: 'auto' }}
                                    >{col}
                                    </Column>
                                </ConfigurableColumn>)
                        }
                    </ConfigurableTable> : null}
            </div>
        </div>
        <div className="row">
            <div className="col">
                {count == 0 && countstatus === 'idle' ? <div className="alert alert-warning"> The query succeeded, but no records were found. </div> : null}
                {count > 0 ? <Paging Current={page + 1} Total={Math.ceil(count / RowsPerPage)} SetPage={(p) => setPage(p - 1)} /> : null}
            </div>
        </div>
    </>
}
