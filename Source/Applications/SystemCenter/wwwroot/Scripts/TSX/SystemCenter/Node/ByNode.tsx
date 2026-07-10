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
import { GenericController, Search, SearchBar, LoadingScreen, ServerErrorIcon, Modal } from '@gpa-gemstone/react-interactive'
import { Table, Column, Paging } from '@gpa-gemstone/react-table'
import { Application } from '@gpa-gemstone/application-typings';
import { useNavigate } from "react-router-dom";
import { SystemCenter as SC } from '../global'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols'
import NodeAttributes, { validNode, valid, IOpenXDANode, convertToXDANode } from './NodeAttributes'

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

const ByNode = (props: { Roles: Application.Types.SecurityRoleName[] }) => {
    let navigate = useNavigate();
    const [data, setData] = React.useState<SC.Node[]>([])
    const [sortField, setSortField] = React.useState<keyof SC.Node>('Name')
    const [ascending, setAscending] = React.useState<boolean>(true)
    const [filters, setFilters] = React.useState<Search.IFilter<SC.Node>[]>([])
    const [page, setPage] = React.useState<number>(0)
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [searchStatus, setSearchStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [nodeTypes, setNodeTypes] = React.useState<INodeType[]>([]);
    const [appHosts, setAppHosts] = React.useState<IHostRegistration[]>([])
    const [showNewModal, setShowNewModal] = React.useState<boolean>(false)
    const [newNode, setNewNode] = React.useState<SC.Node>(getNewNode())
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false)

    function hasPermissions(): boolean {
        if (props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    // on initial mount, fetch node types.
    React.useEffect(() => {
        const nodeTypeController = new GenericController<INodeType>(`${homePath}api/OpenXDA/NodeTypes`, 'Name', true);
        const handle = nodeTypeController.Fetch();
        setStatus('loading');
        handle.done((d: INodeType[]) => {
            setNodeTypes(d);
            setStatus('idle');
        }).fail((d) => {
            setStatus('error');
        })
        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [])

    // on initial mount, fetch app hosts.
    React.useEffect(() => {
        const appHostController = new GenericController<IHostRegistration>(`${homePath}api/OpenXDA/HostRegistration`, 'ID', true);
        const handle = appHostController.Fetch();
        setStatus('loading');
        handle.done((d: IHostRegistration[]) => {
            setAppHosts(d);
            setStatus('idle');
        }).fail((d) => {
            setStatus('error');
        })
        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [])

    // effect to collect data.
    React.useEffect(() => {
        setSearchStatus('loading');
        const nodeController = new GenericController<SC.Node>(`${homePath}api/SystemCenter/Node`, 'Name', true)
        const handle = nodeController.PagedSearch(filters, sortField, ascending, page);
        handle.done((d) => {
            setData(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setRecordsPerPage(d.RecordsPerPage);
            setTotalRecords(d.TotalRecords);
            setSearchStatus('idle');
        }).fail((d) => {
            setSearchStatus('error');
        })
        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [filters, sortField, ascending, page, refreshTrigger])

    // navigate to node info 
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

    return <div style={{ width: '100%', height: '100%' }}>
        <LoadingScreen Show={status === 'loading' || searchStatus === 'loading'} />
        <ServerErrorIcon Show={ status === 'error'} />
        <div className="container-fluid d-flex h-100 flex-column">
            <div className="row">
                <SearchBar<SC.Node> CollumnList={defaultSearchcols} SetFilter={setFilters}
                Direction={'left'} defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={status === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete search.' : `Displaying  Task Runner(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + data.length} out of ${totalRecords}`}
                StorageID="NodesFilter"
                >
                    <li className="nav-item" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0} style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <div className="form-group">
                                    <button className="btn btn-info btn-block"
                                        onClick={(event) => { event.preventDefault(); setShowNewModal(true); }}>Add Task Runner</button>
                                </div>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>
            </div>
            <div className="d-flex flex-column row" style={{ flex: 1, overflow: 'hidden' }}>
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
        <div>
            <Modal Show={showNewModal} Size={'xlg'} Title={'Add New Task Runner'}
                ShowX={true}
                ShowCancel={false}
                ConfirmText={'Save'}
                DisableConfirm={!validNode(newNode)}
                ConfirmShowToolTip={!validNode(newNode)}
                ConfirmToolTipContent={ <>
                    {!valid(newNode, 'Name') ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> A name is required.</p> : null}
                    {!valid(newNode, 'MinimumHostCount') ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> A minimum node count between 1 and 99 is required.</p> : null}
                    </>
                }
                CallBack={(conf) => {
                    if (conf) {
                        const controller = new GenericController<IOpenXDANode>(`${homePath}api/openXDA/Node`, 'ID')
                        controller.DBAction("POST", convertToXDANode(newNode, nodeTypes, appHosts)).done(() => setRefreshTrigger((val) => !val))
                    }

                    setNewNode(getNewNode());

                    setShowNewModal(false);
                }}
            >
                <div className="container-fluid d-flex h-100 flex-column">
                    <div className="tab-content row" style={{ flex: 1, overflow: 'hidden' }}>
                        <div className="col">
                            <NodeAttributes Node={newNode} SetNode={setNewNode} HasPermissions={hasPermissions()} NodeTypes={nodeTypes} AppHosts={appHosts} />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
}
export default ByNode;

function getNewNode(): SC.Node {
    return {ID: '-1', Name: '', MinimumHostCount: 0, HostRegistrationKey: null, AssignedHostRegistrationKey: null, NodeType: ''}
}