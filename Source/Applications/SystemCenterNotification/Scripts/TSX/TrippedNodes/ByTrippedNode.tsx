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
import Table from '@gpa-gemstone/react-table';

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
        <>
            <LoadingScreen Show={loading} />
            <div style={{ width: '100%', height: '100%' }}>
                <div className="alert alert-info"> There are currently {nodes.length} notification service nodes in the system. </div>
                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<INode>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'btn', field: 'ID', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => <ReActivateBtn NodeID={item.ID} /> },
                            { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={nodes}
                        sortKey={''}
                        ascending={false}
                        onSort={(d) => { }}
                        onClick={(item) => {  }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={() => false}
                    />
                </div>
            </div>
        </>)
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