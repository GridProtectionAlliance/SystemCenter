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
import { GenericController, Search, SearchBar, LoadingScreen, Modal } from '@gpa-gemstone/react-interactive'
import { Table, Column, Paging } from '@gpa-gemstone/react-table'
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { useNavigate } from "react-router-dom";
import { SystemCenter as SC } from '../global'

interface INodeType {
    ID: number,
    Name: string,
    AssemblyName: string,
    TypeName: string
}

interface IHostRegistration {
    ID: number,
    RegistrationKey: string,
    APIToken: string,
    URL: string,
    CheckedIn: string
}

interface IOpenXDANode {
    ID: number,
    NodeTypeID: number,
    HostRegistrationID: number,
    AssignedHostRegistrationID: number,
    Name: string,
    MinimumHostCount: number
}

const ByNode = (props: { Roles: Application.Types.SecurityRoleName[] }) => {
    let navigate = useNavigate();
    const [data, setData] = React.useState<SC.Node[]>([])
    const [sortField, setSortField] = React.useState<keyof SC.Node>('Name')
    const [ascending, setAscending] = React.useState<boolean>(true)
    const [filters, setFilters] = React.useState<Search.IFilter<SC.Node>[]>([])
    const [page, setPage] = React.useState<number>(0)
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [nodeTypes, setNodeTypes] = React.useState<INodeType[]>([]);
    const [appHosts, setAppHosts] = React.useState<IHostRegistration[]>([])
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [selectedNode, setSelectedNode] = React.useState<SC.Node>({ ID: '-1', Name: "", AssignedHostRegistrationKey: '', HostRegistrationKey: '', NodeType: '', MinimumHostCount: 0 });
    const [refreshCount, refreshData] = React.useState<number>(0);

    React.useEffect(() => {
        if (status === 'uninitiated') {
            const nodeTypeController = new GenericController<INodeType>(`${homePath}api/OpenXDA/NodeTypes`, 'Name', true);
            const handle = nodeTypeController.Fetch();
            handle.done((d: INodeType[]) => {
                setNodeTypes(d);
            }).fail((d) => {
                setStatus('error');
            })
        }
    }, [status])

    React.useEffect(() => {
        const appHostController = new GenericController<IHostRegistration>(`${homePath}api/OpenXDA/HostRegistration`, 'ID', true);
        const handle = appHostController.Fetch();
        handle.done((d: IHostRegistration[]) => {
            setAppHosts(d);
        }).fail((d) => {
            setStatus('error');
        })
    }, [status])

    React.useEffect(() => {
        setStatus('loading');
        const nodeController = new GenericController<SC.Node>(`${homePath}api/SystemCenter/Node`, 'Name', true)
        const handle = nodeController.PagedSearch(filters, sortField, ascending, page);
        handle.done((d) => {
            setData(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setRecordsPerPage(d.RecordsPerPage);
            setTotalRecords(d.TotalRecords);
            setStatus('idle');
        }).fail((d) => {
            setStatus('error');
        })
    }, [filters, sortField, ascending, page, refreshCount])
    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=Node&NodeID=${item.row.ID}`);
    }

    const defaultSearchcols: Search.IField<SC.Node>[] = [
        { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
        { label: 'Minimum Host Count', key: 'MinimumHostCount', type: 'number', isPivotField: false },
        { label: 'Type', key: 'NodeType', isPivotField: false, type: 'enum', enum: nodeTypes.map((n) => { return { Value: n.Name, Label: n.Name } }) },
        { label: 'Node', key: 'HostRegistrationKey', isPivotField: false, type: 'enum', enum: appHosts.map((h) => { return { Value: h.RegistrationKey, Label: h.RegistrationKey } })},
        { label: 'Assigned Node', key: 'AssignedHostRegistrationKey', isPivotField: false, type: 'enum', enum: appHosts.map((h) => { return { Value: h.RegistrationKey, Label: h.RegistrationKey } })}
    ];

    const convertToXDANode = React.useCallback((node: SC.Node): IOpenXDANode => {
        return {
            ID: parseInt(node.ID),
            MinimumHostCount: node.MinimumHostCount,
            NodeTypeID: nodeTypes.find(nt => nt.Name == node.NodeType).ID,
            AssignedHostRegistrationID: appHosts.find(ah => ah.RegistrationKey == node.AssignedHostRegistrationKey)?.ID ?? null,
            HostRegistrationID: appHosts.find(ah => ah.RegistrationKey == node.HostRegistrationKey)?.ID ?? null,
            Name: node.Name
        }
    }, [nodeTypes, appHosts])

    return <div style={{ width: '100%', height: '100%' }}>
        <LoadingScreen Show={status === 'loading'} />
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row">
                <SearchBar<SC.Node> CollumnList={defaultSearchcols} SetFilter={setFilters}
                Direction={'left'} defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={status === 'loading'} ResultNote={status === 'error' ? 'Could not complete search.' : `Displaying  TaskRunner(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + data.length} out of ${totalRecords}`}
                StorageID="NodesFilter"
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
                    OnClick={handleSelect}
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
                    > Minimum Node Count
                    </Column>
                    <Column<SC.Node>
                        Key={'HostRegistrationKey'}
                        AllowSort={true}
                        Field={'HostRegistrationKey'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => {
                            return item[field] === 'N/A' ? item[field] : <a href={`${homePath}index.cshtml?name=AppHost`} target='_blank'> <span className='badge badge-light'>{item[field]}</span></a> }}
                    > Node
                    </Column>
                    <Column<SC.Node>
                        Key={'AssignedHostRegistrationKey'}
                        AllowSort={true}
                        Field={'AssignedHostRegistrationKey'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => {
                            return item[field] === 'N/A' ? item[field] : <a href={`${homePath}index.cshtml?name=AppHost`} target='_blank'> <span className='badge badge-light'>{item[field]}</span></a>
                        }}
                    > Assigned Nodes
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
