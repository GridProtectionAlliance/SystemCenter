//******************************************************************************************************
//  ByTrippedNode.tsx - Gbtc
//
//  Copyright © 2024, Grid Protection Alliance.  All Rights Reserved.
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
//  01/15/2024 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { LoadingIcon, LoadingScreen } from '@gpa-gemstone/react-interactive'
import { INode } from '../global';
import * as $ from 'jquery';
import { Table, Column } from '@gpa-gemstone/react-table';

declare var homePath;
declare var version;

interface IProps {}

const ByTrippedNode = (props: IProps) => {
    const [nodes, setNodes] = React.useState<INode[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setLoading(true);
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/EmailNode/EventEmailNodes`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).then((d: INode[]) => { setLoading(false); setNodes(d); }, () => setLoading(false));

        return () => { if (handle != null && handle.abort != null) handle.abort();  }
    }, [])

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={loading} />
            <div className="row">
                <div className="col">
                    <div className="alert alert-info"> There {nodes.length == 1 ? 'is' : 'are'} currently {nodes.length} notification service node{nodes.length == 1 ? '' : 's'} in the system. </div>
                </div>
            </div>
            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<INode>
                        TableClass="table table-hover"
                        Data={nodes}
                        SortKey={''}
                        Ascending={false}
                        OnSort={(d) => { }}
                        TableStyle={{
                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<INode>
                            Key={'Name'}
                            AllowSort={false}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<INode>
                            Key={'btn'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => <ReActivateBtn NodeID={item.ID} /> }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
            </div>
        </div>)
}

const ReActivateBtn = (props: { NodeID: number }) => {
    const [active, setActive] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/EmailNode/IsTripped/${props.NodeID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).then((d: boolean) => { setLoading(false); setActive(!d); }, () => setLoading(false));

        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [])

    function Activate() {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/EmailNode/RestoreEventEmails/${props.NodeID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).then(() => { setLoading(false); setActive(true) }, () => setLoading(false));
    }

    if (loading)
        return <LoadingIcon Show={true} />

    return <button className="btn btn-sm" onClick={(e) => {
        e.preventDefault();
        Activate();
    }} disabled={active}>{active ? "Already active" : "Activate"}</button>
}

export default ByTrippedNode;