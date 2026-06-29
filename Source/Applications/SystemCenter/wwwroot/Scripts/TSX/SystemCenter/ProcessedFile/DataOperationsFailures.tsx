//******************************************************************************************************
//  DataOperationsFailures.tsx - Gbtc
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
//  06/26/2026 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { GenericController, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { Column, Paging, Table } from '@gpa-gemstone/react-table';
import moment from 'moment';
import * as React from 'react';
import Reason from '../CommonComponents/Reason';
import EditionRestrictionTooltip from '../CommonComponents/Restrictions/EditionRestrictionTooltip';
import RoleRestrictionTooltip from '../CommonComponents/Restrictions/RoleRestrictionTooltip';
import EditionLockModal from '../CommonComponents/Restrictions/EditionLockModal';

const DataOperationFailureController = new GenericController<LocalXDA.DataOperationFailure>(`${homePath}api/OpenXDA/DataOperationFailure`, "ID", true);

interface IProps {
    AnalysisTaskID: number,
}

function DataOperationsFailure(props: IProps) {

    const [failureData, setFailureData] = React.useState<LocalXDA.DataOperationFailure[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof LocalXDA.DataOperationFailure>("TimeOfFailure");

    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [page, setPage] = React.useState<number>(0);
    const [status, setStatus] = React.useState<Application.Types.Status>('idle');

    const [hover, setHover] = React.useState<string | undefined>(undefined);
    const [inEdition, setInEdition] = React.useState<boolean>(true);
    const [inRoles, setInRoles] = React.useState<boolean>(true);
    const [showEdition, setShowEdition] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.AnalysisTaskID == undefined) return;
        setStatus('loading');
        const handle = DataOperationFailureController
            .PagedSearch([], sortField, ascending, page, props.AnalysisTaskID)
            .done((result) => {
                setFailureData(JSON.parse(result.Data as unknown as string));
                setPageInfo({
                    RecordsPerPage: result.RecordsPerPage,
                    NumberOfPages: result.NumberOfPages,
                    TotalRecords: result.TotalRecords
                });
                setStatus('idle');
            }).fail(() => setStatus('error'));

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        }
    }, [sortField, ascending, page, props.AnalysisTaskID]);

   

    return (
    <div className="col d-flex" style={{flexDirection: 'column'}}>
        <LoadingScreen Show={status === 'loading'} />
            <Table<LocalXDA.DataOperationFailure>
            TableClass="table table-hover"
            Data={failureData}
            SortKey={sortField}
            Ascending={ascending}
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
                <Column<LocalXDA.DataOperationFailure>
                Key={'TimeOfFailure'}
                AllowSort={true}
                Field={'TimeOfFailure'}
                HeaderStyle={{ width: '20%' }}
                Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : 'N/A'}
                RowStyle={{ width: '20%' }}
            >
                Time Of Failure
                </Column>
                <Column<LocalXDA.DataOperationFailure>
                Key={'DataOperationTypeName'}
                AllowSort={true}
                Field={'DataOperationTypeName'}
                HeaderStyle={{ width: 'auto' }}
                RowStyle={{ width: 'auto' }}
            >
                Data Operation
                </Column>
                <Column<LocalXDA.DataOperationFailure>
                Key={'Log'}
                AllowSort={true}
                Field={'Log'}
                Content={({ item, field }) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''} />}
                HeaderStyle={{ width: '115px' }}
                RowStyle={{ width: '115px' }}
            >
                Log Message
            </Column>
                <Column<LocalXDA.DataOperationFailure>
                Key={'StackTrace'}
                AllowSort={true}
                Field={'StackTrace'}
                Content={({ item, field }) =>
                    <Reason
                        ID={item.ID}
                        Text={item[field]?.toString() ?? ''}
                        Disabled={!inEdition || !inRoles}
                        OnHover={setHover}
                        OnClick={() => { if (!inEdition) setShowEdition(true); }}
                    />
                }
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
            <EditionLockModal
                SetShow={setShowEdition}
                Show={showEdition}
                EditionRequirement={'Enterprise'}
            />

    </div>
                
    );
}

export default DataOperationsFailure;