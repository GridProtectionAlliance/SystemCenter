//******************************************************************************************************
//  FilesProcessedTable.tsx - Gbtc
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
import { Table, Paging, Column } from '@gpa-gemstone/react-table'
import { SystemCenter as SC } from '../global';
import moment from 'moment'
import { Application } from '@gpa-gemstone/application-typings';
import ProcessingStatus from '../CommonComponents/ProcessingStatus'
import { LoadingIcon } from '@gpa-gemstone/react-interactive'
import { ErrorBoundary } from '@gpa-gemstone/common-pages'
import { ToolTip } from '@gpa-gemstone/react-forms'
interface IProps {
    FilteredHour: string
    SelectedFile: number
    HandleOnTableClick: (data: any, evt: React.MouseEvent) => void
}

const FilesProcessedTable = (props: IProps) => {
    const [sortField, setSortField] = React.useState<keyof SC.DataFile>('ID')
    const [ascending, setAscending] = React.useState<boolean>(false)
    const [dataFile, setDataFile] = React.useState<SC.DataFile[]>([])
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [page, setPage] = React.useState<number>(0);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [hovered, setHovered] = React.useState<string>('')

    React.useEffect(() => {
        const h = getFileGroups(props.FilteredHour, sortField, ascending, page)
        setStatus('loading')

        h.done((d) => {
            setDataFile(JSON.parse(d.Data))
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
    }, [sortField, ascending, page, props.FilteredHour])

    return <ErrorBoundary>
        {status === "loading" ?
                <LoadingIcon
                    Show={true}
                    Size={40}
                />
            : <>
        <Table<SC.DataFile>
            Data={dataFile}
            SortKey={sortField}
            Ascending={ascending}
            KeySelector={(item) => item.ID}
            OnSort={(d) => {
                if (d.colField == sortField) {
                    setAscending(!ascending);
                }
                else {
                    setAscending(true);
                    setSortField(d.colField);
                }
            }}
            OnClick={props.HandleOnTableClick}
            Selected={(item) => item.FileGroupID === props.SelectedFile}
        >
            <Column<SC.DataFile>
                Key={'FileName'}
                AllowSort={false}
                Field={'FileName'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => {
                            return <>
                                <p
                                    onMouseEnter={() => setHovered(`${item.ID.toString()}`)}
                                    onMouseLeave={() => setHovered('')}
                                    data-tooltip={`datafile${item.ID.toString()}`}
                                >
                                    {item[field]}
                                </p>
                                <ToolTip
                                    Show={hovered === `${item.ID.toString()}`}
                                    Target={`datafile${item.ID.toString()}`}
                                >
                                    {item.FilePath}
                                </ToolTip>
                            </>
                        }}
            >
                File Name
            </Column>
            <Column<SC.DataFile>
                Key={'DataStartTime'}
                AllowSort={true}
                Field={'DataStartTime'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
                Content={({ item, field }) => {
                    if (item[field] == "0001-01-01T00:00:00")
                        return 'N/A'
                    return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                }}
            >
                Data Start Time
            </Column>
            <Column<SC.DataFile>
                Key={'ProcessingStartTime'}
                AllowSort={true}
                Field={'ProcessingStartTime'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
                Content={({ item, field }) => {
                    if (item[field] == null || item[field] == undefined)
                        return 'N/A'
                    return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                }}
            >
                Processing Start Time
            </Column>
            <Column<SC.DataFile>
                Key={'ProcessingEndTime'}
                AllowSort={true}
                Field={'ProcessingEndTime'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
                Content={({ item, field }) => {
                    if (item[field] == "0001-01-01T00:00:00")
                        return 'N/A'
                    return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                }}
            >
                Processing End Time
            </Column>
            <Column<SC.DataFile>
                Key={'ProcessingState'}
                AllowSort={true}
                Field={'ProcessingState'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
                Content={({ item, field }) => {
                    return <ProcessingStatus Status={item[field] as number} FileGroupID={item.FileGroupID} Interactive={false} />
                }}
            >
                Processing State
            </Column>
        </Table>
        <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
            </>
        }
    </ErrorBoundary>
}

export default FilesProcessedTable

function getFileGroups(filteredHour: string, sortField: string, ascending: boolean, page: number) {
    let filters = []
    if (filteredHour === null) {
        filters = [{
            FieldName: 'ProcessingStartTime',
            Operator: '>',
            Type: 'datetime',
            SearchText: moment().subtract(48, 'hour').startOf('hour').format('YYYY-MM-DD HH:mm:ss.SSS')
        }]
    }
    else {
        filters = [{
            FieldName: 'ProcessingStartTime',
            Operator: '>=',
            Type: 'datetime',
            SearchText: moment(filteredHour).format('YYYY-MM-DD HH:mm:ss.SSS')
        },
        {
            FieldName: 'ProcessingStartTime',
            Operator: '<',
            Type: 'datetime',
            SearchText: moment(filteredHour).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss.SSS')
        }
        ]
    }
    return $.ajax({
        type: "POST",
        url: `${homePath}api/OpenXDA/DataFile/PagedList/${page}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true,
        data: JSON.stringify({ Searches: filters, OrderBy: sortField, Ascending: ascending }),
    });

}