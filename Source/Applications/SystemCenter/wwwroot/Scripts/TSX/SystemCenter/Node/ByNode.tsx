//******************************************************************************************************
//  ByNode.tsx - Gbtc
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
//  06/11/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { GenericController, Search, SearchBar, LoadingScreen } from '@gpa-gemstone/react-interactive'
import { Table, Column, Paging } from '@gpa-gemstone/react-table'
import { Application } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global'

const defaultSearchcols: Search.IField<SC.Node>[] = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Minimum Host Count', key: 'MinimumHostCount', type: 'number', isPivotField: false },
    { label: 'Type', key: 'NodeType', type: 'string', isPivotField: false },
    { label: 'Host Registration Key', key: 'HostRegistrationKey', type: 'string', isPivotField: false },
    { label: 'Assigned Host Registration Key', key: 'AssignedHostRegistrationKey', type: 'string', isPivotField: false }
];

const ByNode = (props: {Roles: Application.Types.SecurityRoleName[]}) => {
    const [data, setData] = React.useState<SC.Node[]>([])
    const [sortField, setSortField] = React.useState<keyof SC.Node>('Name')
    const [ascending, setAscending] = React.useState<boolean>(true)
    const [filters, setFilters] = React.useState<Search.IFilter<SC.Node>[]>([])
    const [page, setPage] = React.useState<number>(0)
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);

    const nodeController = React.useMemo(() => new GenericController<SC.Node>(`${homePath}api/OpenXDA/Node`, 'Name', true),[])

    React.useEffect(() => {
        setStatus('loading');
        const handle = nodeController.PagedSearch(filters, sortField, ascending, page);
        handle.done((d) => {
            setData(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setRecordsPerPage(d.RecordsPerPage);
            setTotalRecords(d.TotalRecords);
            setStatus('idle');
        }).fail((d) => {
            setStatus('error');
        }) },[filters, sortField, ascending, page, nodeController.PagedSearch])

    return <div style={{ width: '100%', height: '100%' }}>
        <LoadingScreen Show={status === 'loading'} />
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row">
                <SearchBar<SC.Node> CollumnList={defaultSearchcols} SetFilter={setFilters}
                Direction={'left'} defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={status === 'loading'} ResultNote={status === 'error' ? 'Could not complete search.' : `Displaying  Node(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + data.length} out of ${totalRecords}`}
                StorageID="NodesFilter"
                GetEnum={() => {return () => { }}}
            >
            </SearchBar>
            </div>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <Table<SC.Node>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey === sortField)
                            setAscending(a => !a);
                        else {
                            setAscending(true);
                            setSortField(d.colKey as keyof SC.Node);
                        }
                    }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <Column<SC.Node>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </Column>
                    <Column<SC.Node>
                        Key={'NodeType'}
                        AllowSort={true}
                        Field={'NodeType'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Type
                    </Column>
                    <Column<SC.Node>
                        Key={'MinimumHostCount'}
                        AllowSort={true}
                        Field={'MinimumHostCount'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Minimum Host Count
                    </Column>
                    <Column<SC.Node>
                        Key={'HostRegistrationKey'}
                        AllowSort={true}
                        Field={'HostRegistrationKey'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => {
                            return  <a href={`${homePath}index.cshtml?name=AppHost`} target='_blank'> <span className="badge badge-light">{item[field]}</span></a> }}
                    > Host Registration Key
                    </Column>
                    <Column<SC.Node>
                        Key={'AssignedHostRegistrationKey'}
                        AllowSort={true}
                        Field={'AssignedHostRegistrationKey'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => {
                            return <a href={`${homePath}index.cshtml?name=AppHost`} target='_blank'> <span className="badge badge-light">{item[field]}</span></a> }}
                    > Assigned Host Registration Key
                    </Column>
                </Table>
            </div>
            <div className="row">
                <div className="col">
                    <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
                </div>
            </div>
        </div>
    </div>
}
export default ByNode;