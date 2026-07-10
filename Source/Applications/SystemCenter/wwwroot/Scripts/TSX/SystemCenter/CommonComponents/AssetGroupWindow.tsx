//******************************************************************************************************
//  AssetGroupWindow.tsx - Gbtc
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
//  07/07/2026 - Natalie Beatty
//      Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Table, Column, Paging } from '@gpa-gemstone/react-table'
import { OpenXDA, Application } from '@gpa-gemstone/application-typings'

interface IProps {
    RecordType: 'Asset' | 'Meter' | 'AssetGroup'
    ID: number
}

// note to future natalie - use AssetGroupView ModelController with filter for asset group which contains the meter. this might be a common component.
// this will probably need to be an endpoint - we need to get data from the appropriate link table, then query asset groups for it.

function AssetGroupWindow<T>(props: IProps) {
    const [page, setPage] = React.useState<number>(0)
    const [sortField, setSortField] = React.useState<keyof OpenXDA.Types.AssetGroup>("Name")
    const [ascending, setAscending] = React.useState<boolean>(true)
    const [data, setData] = React.useState<OpenXDA.Types.AssetGroup[]>([])
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')

    React.useEffect(() => {
        setStatus('loading')
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetGroup/Membership/${props.RecordType}/${props.ID}/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ Searches: [], OrderBy: 'ID', Ascending: true })
        })

        h.done((d) => {
            setStatus('idle')
            setData(JSON.parse(d.Data as unknown as string))
            setTotalPages(d.NumberOfPages)
        })

        h.fail(() => {
            setStatus('error')
        })

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [props.ID, props.RecordType, page, sortField, ascending])

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Asset Groups:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ paddingBottom: 0, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div className="row h-100">
                    <div className="col d-flex flex-column" style={{ flex: 1, overflow: 'hidden'}}>
                        <Table<OpenXDA.Types.AssetGroup>
                            Data={data}
                            SortKey={sortField}
                            Ascending={ascending}
                            KeySelector={(d) => d.ID}
                            OnSort={(d) => {
                                if (d.colKey === sortField) setAscending(a => !a);
                                else setSortField(d.colField);
                            }}
                        >
                            <Column<OpenXDA.Types.AssetGroup>
                                Key={'Name'}
                                Field={'Name'}
                            >
                            Name
                            </Column>
                        </Table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Paging
                            Current={page + 1}
                            SetPage={(p) => setPage(p - 1)}
                            Total={totalPages}
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer">
            </div>
        </div>
    )
}

export default AssetGroupWindow;