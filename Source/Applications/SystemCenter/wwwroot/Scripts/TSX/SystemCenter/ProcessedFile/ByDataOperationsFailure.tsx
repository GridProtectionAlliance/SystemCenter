//******************************************************************************************************
//  DataOperationsFailures.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  07/02/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { GenericController, Search } from '@gpa-gemstone/react-interactive';
import { Column, FilterableColumn, Paging, Table } from '@gpa-gemstone/react-table';
import moment from 'moment';
import * as React from 'react';
import EditionRestrictionTooltip from '../CommonComponents/Restrictions/EditionRestrictionTooltip';
import RoleRestrictionTooltip from '../CommonComponents/Restrictions/RoleRestrictionTooltip';
import Reason from '../CommonComponents/Reason';

const DataOperationFailureController = new GenericController<OpenXDA.Types.DataOperationFailure>(`${homePath}api/OpenXDA/DataOperationFailure`, "ID", true);
const storageID = "ByDataOperationsFailure";
const PagingID = 'ByDataOperationsFailurePage';

interface IProps { FileGroupID: number }

function ByDataOperationsFailure(props: IProps) {
    const [fileGroup, setFileGroup] = React.useState<OpenXDA.Types.DataFile>(null);
    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('idle');

    const [failureData, setFailureData] = React.useState<OpenXDA.Types.DataOperationFailure[]>([]);
    const [filters, setFilters] = React.useState<Search.IFilter<OpenXDA.Types.DataOperationFailure>[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof OpenXDA.Types.DataOperationFailure>("TimeOfFailure");

    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [page, setPage] = React.useState<number>(0);

    const [hover, setHover] = React.useState<string|undefined>(undefined);
    const [inEdition, setInEdition] = React.useState<boolean>(true);
    const [inRoles, setInRoles] = React.useState<boolean>(true);

    React.useEffect(() => {
            let storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
            if (storedInfo == null || storedInfo == 0) return; // page 0 means it's on a real page
            if (storedInfo + 1 > pageInfo.NumberOfPages) {
                storedInfo = Math.max(0, pageInfo.NumberOfPages - 1);
                localStorage.setItem(PagingID, `${storedInfo}`);
            }
            setPage(storedInfo);
    }, [pageInfo.TotalRecords]); // Make sure user is still on a real page when data is deleted or filtered out

    // Handling filter storage between sessions (this will load/save filters for all filepaths as the same, this is by design)
    React.useEffect(() => {
        setFilters(JSON.parse(localStorage.getItem(storageID) as string) ?? []);
    }, []);

    React.useEffect(() => {
        localStorage.setItem(storageID, JSON.stringify(filters));
    }, [filters]);

    React.useEffect(() => {
        if (props.FileGroupID == undefined) return null;
        setPageStatus('loading');
        const dataOperationFailureHandle = DataOperationFailureController
            .PagedSearch(filters, sortField, ascending, page, props.FileGroupID)
            .done((result) => {
                setFailureData(JSON.parse(result.Data as unknown as string));
                setPageInfo({
                    RecordsPerPage: result.RecordsPerPage,
                    NumberOfPages: result.NumberOfPages,
                    TotalRecords: result.TotalRecords
                });
                setPageStatus('idle');
        }).fail(() => setPageStatus('error'));

        return () => {
            if (dataOperationFailureHandle != null && dataOperationFailureHandle.abort != null) dataOperationFailureHandle.abort();
        }
    }, [filters, sortField, ascending, page, props.FileGroupID]);

    React.useEffect(() => {
        if (props.FileGroupID == undefined) return null;
        const fileGroupHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataFile/One/${props.FileGroupID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        fileGroupHandle.then((data: OpenXDA.Types.DataFile) => setFileGroup(data));
        return () => { if (fileGroupHandle != null && fileGroupHandle.abort != null) fileGroupHandle.abort(); }

    }, [props.FileGroupID]);

    const onHoverTrace = React.useCallback((id: number | undefined) => {
        if (id == null) setHover(undefined);
        setHover(id.toString());
    }, []);

    if (fileGroup == null) return null;

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row">
                <div className="col">
                    <h2>{fileGroup.FilePath}</h2>
                </div>
            </div>
            <hr />
            <Table<OpenXDA.Types.DataOperationFailure>
                TableClass="table table-hover"
                Data={failureData}
                SortKey={sortField}
                Ascending={ascending}
                Filters={filters}
                SetFilters={filts => setFilters(filts)}
                Selected={() => false}
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
            >
                <FilterableColumn<OpenXDA.Types.DataOperationFailure>
                    Key={'TimeOfFailure'}
                    AllowSort={true}
                    Field={'TimeOfFailure'}
                    HeaderStyle={{ width: '20%' }}
                    Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : 'N/A'}
                    RowStyle={{ width: '20%' }}
                    Type={"datetime"}
                >
                    Time Of Failure
                </FilterableColumn>
                <FilterableColumn<OpenXDA.Types.DataOperationFailure>
                    Key={'DataOperationTypeName'}
                    AllowSort={true}
                    Field={'DataOperationTypeName'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Type={"string"}
                >
                    Data Operation
                </FilterableColumn>
                <Column<OpenXDA.Types.DataOperationFailure>
                    Key={'Log'}
                    AllowSort={true}
                    Field={'Log'}
                    Content={({ item, field }) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''} />}
                    HeaderStyle={{ width: '115px' }}
                    RowStyle={{ width: '115px' }}
                >
                    Log Message
                </Column>
                <Column<OpenXDA.Types.DataOperationFailure>
                    Key={'StackTrace'}
                    AllowSort={true}
                    Field={'StackTrace'}
                    Content={({ item, field }) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''} Disabled={!inEdition || !inRoles} OnHover={setHover} />}
                    HeaderStyle={{ width: '115px' }}
                    RowStyle={{ width: '115px' }}
                >
                    Stack Trace
                </Column>
            </Table>
            <div className="row justify-content-center">
                <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
            </div>
            <EditionRestrictionTooltip
                SetMeetsRequirements={setInEdition}
                EditionRequirement={'Enterprise'}
                FeatureName={'Viewing Stack Trace'}
                Target={hover}
                Show={hover != null}
            />
            <RoleRestrictionTooltip
                SetMeetsRequirements={setInRoles}
                RolesRequirement={['Administrator']}
                FeatureName={'Viewing Stack Trace'}
                Target={hover}
                Show={hover != null && inEdition}
            />
        </div>
    );
}

export default ByDataOperationsFailure;