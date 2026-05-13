//******************************************************************************************************
//  DataOperationFailures.tsx - Gbtc
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
//  05/07/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react'
import { Application } from '@gpa-gemstone/application-typings';
import moment from 'moment'
import DataOperationFailure, { INamedDataOperationFailure } from './DataOperationFailure'
import { Paging } from '@gpa-gemstone/react-table'

interface IProps {
    FilteredHour: string
    SelectedFile: number
    HandleViewMoreClick: (info: string, event: React.MouseEvent) => void
}

const DataOperationFailures = (props: IProps) => {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [dataOperationFailures, setDataOperationFailures] = React.useState<INamedDataOperationFailure[]>([])
    const [hovered, setHovered] = React.useState<string>('')


    React.useEffect(() => {
        const h = getDataOperationFailure(props.SelectedFile, props.FilteredHour, page)
        h.done((d) => {
        setStatus('loading')
            setDataOperationFailures(JSON.parse(d.Data))
            setTotalPages(d.NumberOfPages)
            if (page >= d.NumberOfPages && d.NumberOfPages > 0)
                setPage(d.NumberOfPages - 1)
        setStatus('idle')
        }).fail(() => {
            setStatus('error')
        })

        return function cleanup() {
            if (h.abort != null)
                h.abort();
        }
    }, [page, props.FilteredHour, props.SelectedFile, setStatus, setDataOperationFailures, setTotalPages])

  
    return <fieldset className="border h-100" style={{ padding: '10px', flex: '1 1 0%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <legend className="w-auto" style={{ fontSize: 'large' }}> Data Operation Failures :</legend>
        <div className="row d-flex flex-column h-100" style={{ overflow: 'hidden' }}>
            <div className="col h-100" style={{ overflow: 'auto' }}>
                {dataOperationFailures.map((e) => {
                    return <DataOperationFailure
                        NamedDataOperationFailure={e}
                        SelectedFile={props.SelectedFile}
                        HandleViewMoreClick={props.HandleViewMoreClick}
                        SetHovered={setHovered}
                        Hovered={hovered}
                    />
                })
                }
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
            </div>
        </div>
    </fieldset>
}

export default DataOperationFailures

function getDataOperationFailure(selectedFile: number, filteredHour: string, page: number) {
        let filters = []
    if (selectedFile !== null) {
            filters = [{
                FieldName: 'FileGroupID',
                Operator: '=',
                Type: 'number',
            SearchText: selectedFile
            }]
        }
    else if (filteredHour !== null) {
            filters = [
                {
                    FieldName: 'TimeOfFailure',
                    Operator: '>=',
                    Type: 'datetime',
                SearchText: moment(filteredHour).format('YYYY-MM-DD HH:mm:ss.SSS')
                },
                {
                    FieldName: 'TimeOfFailure',
                    Operator: '<',
                    Type: 'datetime',
                SearchText: moment(filteredHour).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss.SSS')
                }
            ]
        }
        else {
            filters = [{
                FieldName: 'TimeOfFailure',
                Operator: '>',
                Type: 'datetime',
                SearchText: moment().subtract(48, 'hour').startOf('hour').format('YYYY-MM-DD HH:mm:ss.SSS')
            }]
        }

    return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataOperationFailure/RecentFailures/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ Searches: filters, OrderBy: 'TimeOfFailure', Ascending: false }),
        });
    }