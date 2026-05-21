//******************************************************************************************************
//  DataOperationFailureTable.tsx - Gbtc
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
//  05/21/2026 - Natalie Beatty
//       Renamed to DataOperationFailureTable
//******************************************************************************************************
import * as React from 'react'
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import moment from 'moment'
import { ToolTip } from '@gpa-gemstone/react-forms'
import { ErrorBoundary } from '@gpa-gemstone/common-pages'
import { LoadingIcon } from '@gpa-gemstone/react-interactive'
import { Table, Column, Paging } from '@gpa-gemstone/react-table'

export interface INamedDataOperationFailure extends OpenXDA.Types.DataOperationFailure {
    DataFileName: string
    FilePath: string
    DataOperation: string
}

interface IProps {
    FilteredHour: string
    SelectedFile: number
    HandleViewMoreClick: (info: INamedDataOperationFailure, event: React.MouseEvent) => void
}

const DataOperationFailureTable = (props: IProps) => {
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const [dataOperationFailures, setDataOperationFailures] = React.useState<INamedDataOperationFailure[]>([])
    const [hovered, setHovered] = React.useState<string>('')
    const [sortField, setSortField] = React.useState<keyof INamedDataOperationFailure>('TimeOfFailure')
    const [ascending, setAscending] = React.useState<boolean>(true)

    React.useEffect(() => {
        const h = getDataOperationFailure(props.SelectedFile, props.FilteredHour, page, ascending, sortField)

        setStatus('loading')

        h.done((d) => {
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
    }, [page, props.FilteredHour, props.SelectedFile, ascending, sortField])

  
    return <ErrorBoundary>
        {status === "loading" ?
            <LoadingIcon
                Show={true}
                Size={40}
            /> : 
            dataOperationFailures.length == 0 ? <h6 style={{ justifySelf: 'center' }}>No Data Operation Failures over the past 48 hours.</h6> :
            <fieldset className="border h-100" style={{ padding: '10px', flex: '1 1 0%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <legend className="w-auto" style={{ fontSize: 'large' }}> Data Operation Failures :</legend>
                <div className="row h-100" style={{ overflow: 'hidden'}}>
                    <div className="col h-100 d-flex flex-column " style={{ overflow: 'auto', flex: '1 1 0%' }}>
                        <Table<INamedDataOperationFailure>
                            Data={dataOperationFailures}
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
                                setPage(0)
                            }}
                        >
                            <Column<INamedDataOperationFailure>
                                Key={'TimeOfFailure'}
                                AllowSort={true}
                                Field={'TimeOfFailure'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, field }) => {
                                    if (item[field] == null || item[field] == undefined)
                                        return 'N/A'
                                    return <span className={`badge badge-pill badge-info`}>{moment(item[field]).format('MM/DD/YYYY hh:mm')}</span>
                                }}
                            >
                                Time Of Failure
                            </Column>
                            <Column<INamedDataOperationFailure>
                                Key={"DataFileName"}
                                AllowSort={true}
                                Field={'DataFileName'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, field }) => {
                                    return <><p
                                        onMouseEnter={() => setHovered(`datafilename${item['ID']}`)}
                                        onMouseLeave={() => setHovered('')}
                                        data-tooltip={`datafilename${item['ID']}`}
                                    >{item[field]}</p>
                                        <ToolTip
                                            Show={hovered === `datafilename${item['ID']}`}
                                            Target={`datafilename${item['ID']}`}
                                        >
                                            {item['FilePath']}
                                        </ToolTip>
                                    </>
                                }}
                            >
                                File Name
                            </Column>
                            <Column<INamedDataOperationFailure>
                                Key={"DataOperation"}
                                AllowSort={true}
                                Field={"DataOperation"}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, field }) => {
                                    return <h5>{item[field]}</h5>
                                }}
                            >
                                Data Operation
                            </Column>
                            <Column<INamedDataOperationFailure>
                                Key={"Log"}
                                AllowSort={false}
                                Field={"Log"}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, field }) => {
                                    return <><div className={'btn btn-primary'}
                                        onMouseEnter={() => setHovered(`failurelog${item['ID']}`)}
                                        onMouseLeave={() => setHovered('')}
                                        data-tooltip={`failurelog${item['ID']}`}
                                    >Details</div>
                                        <ToolTip
                                            Show={hovered === `failurelog${item['ID']}`}
                                            Target={`failurelog${item['ID']}`}
                                        >
                                            {item[field].toString().length > 100
                                                ? <>
                                                    <p>{`${item[field].toString().slice(0, 100)}...`}</p>
                                                    <a href="#" onClick={(evt) => { props.HandleViewMoreClick(item, evt) }}>View more</a>
                                                </>
                                                : <p>{item[field]}</p>}
                                        </ToolTip>
                                    </>
                                }}
                            >
                            </Column>
                        </Table>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Paging Current={page + 1} Total={totalPages} SetPage={(p) => setPage(p - 1)} />
            </div>
        </div>
    </fieldset>
        }
    </ErrorBoundary>
}
export default DataOperationFailureTable

function getDataOperationFailure(selectedFile: number, filteredHour: string, page: number, ascending, sortField) {
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
        data: JSON.stringify({ Searches: filters, OrderBy: sortField, Ascending: ascending }),
        });
    }