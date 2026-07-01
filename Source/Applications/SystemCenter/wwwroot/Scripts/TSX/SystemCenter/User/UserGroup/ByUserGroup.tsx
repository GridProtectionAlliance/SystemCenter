// ******************************************************************************************************
//  ByUserGroup.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  02/23/2023 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { SearchBar, Search, Modal, ServerErrorIcon, LoadingScreen, GenericController } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { ISecurityGroup } from '../Types';
import GroupForm from './GroupForm';

const defaultSearchcols: Search.IField<Application.Types.iSecurityGroup>[] = [
    { label: 'Name', key: 'DisplayName', type: 'string', isPivotField: false },
    { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
    { label: 'Type', key: 'Type', type: 'enum', enum: [{ Label: 'AD', Value: 'AD' }, { Label: 'Database', Value: 'Database' },{ Label: 'Azure', Value: 'Azure' }], isPivotField: false },
];

const emptyGroup: ISecurityGroup = { Name: "", CreatedBy: "", CreatedOn: new Date(), Description: "", DisplayName: "", ID: "00000000-0000-0000-0000-000000000000", Type: "Database", UpdatedOn: new Date() };


const ByUser: Application.Types.iByComponent = (props) => {
    let navigate = useNavigate();
    const securityGroupController = React.useMemo(() => new GenericController<ISecurityGroup>(`${homePath}api/SystemCenter/FullSecurityGroup`, "DisplayName" as keyof ISecurityGroup),[])
    const [filters, setFilters] = React.useState<Search.IFilter<ISecurityGroup>[]>([]);
    const [securityGroups, setSecurityGroups] = React.useState<ISecurityGroup[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [sortField, setSortField] = React.useState<keyof ISecurityGroup>('DisplayName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [groupError, setGroupError] = React.useState<string[]>([]);
    const [newGroup, setNewGroup] = React.useState<ISecurityGroup>(emptyGroup);

    React.useEffect(() => { 
        const h = getUserGroups(securityGroupController, filters, sortField, ascending, currentPage)
        h.done((d) => {
            setSecurityGroups(JSON.parse(d.Data as unknown as string))
            setTotalPages(d.NumberOfPages)
            setRecordsPerPage(d.RecordsPerPage)
            setTotalRecords(d.TotalRecords)
            if (d.NumberOfPages <= currentPage)
                setCurrentPage(d.NumberOfPages > 0 ? d.NumberOfPages - 1 : 0)
            setStatus('idle')
        }).fail(() => setStatus('error'))
        return () => {
            if (h.abort != undefined) h.abort();
        }
    }, [sortField, ascending, filters, currentPage, securityGroupController])

    React.useEffect(() => {
        if (status === 'changed') {
            const h = getUserGroups(securityGroupController, filters, sortField, ascending, currentPage)
            h.done((d) => {
                setSecurityGroups(JSON.parse(d.Data as unknown as string))
                setTotalPages(d.NumberOfPages)
                setRecordsPerPage(d.RecordsPerPage)
                setTotalRecords(d.TotalRecords)
                if (d.NumberOfPages <= currentPage)
                    setCurrentPage(d.NumberOfPages > 0 ? d.NumberOfPages - 1 : 0)
                setStatus('idle')
            }).fail(() => setStatus('error'))
            return () => {
                if (h.abort != undefined) h.abort();
            }
        }
    }, [status, sortField, ascending, filters, currentPage, securityGroupController])

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <SearchBar<ISecurityGroup> CollumnList={defaultSearchcols} SetFilter={setFilters}
                    Direction={'left'} defaultCollumn={{ label: 'Name', key: 'DisplayName', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={status === 'loading'} ResultNote={'Displaying  User Group(s) ' + (totalRecords > 0 ? (recordsPerPage * currentPage + 1) : 0) + ' - ' + (recordsPerPage * currentPage + securityGroups.length) + ' out of ' + totalRecords}
                    StorageID="UsersGroupFilter"
                    GetEnum={() => {
                        return () => { }
                    }}
                >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-info btn-block" onClick={(event) => { event.preventDefault(); setShowModal(true) }}>Add User Group</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            </div>

            <div className="row" style={{flex: 1, overflow: 'hidden'}}>
                <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<ISecurityGroup>
                        TableClass="table table-hover"
                        Data={securityGroups}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colField === sortField)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                            }
                        }}
                        OnClick={(d) => navigate(`${homePath}index.cshtml?name=Group&GroupID=${d.row.ID}`)}
                        TableStyle={{
                            padding: 0, width: '100%', height: '100%',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<ISecurityGroup>
                            Key={'DisplayName'}
                            AllowSort={true}
                            Field={'DisplayName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<ISecurityGroup>
                            Key={'Description'}
                            AllowSort={true}
                            Field={'Description'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Description
                        </Column>
                        <Column<ISecurityGroup>
                            Key={'CreatedOn'}
                            AllowSort={true}
                            Field={'CreatedOn'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Added On
                        </Column>
                        <Column<ISecurityGroup>
                            Key={'CreatedBy'}
                            AllowSort={true}
                            Field={'CreatedBy'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Created By
                        </Column>
                        <Column<ISecurityGroup>
                            Key={'Type'}
                            AllowSort={true}
                            Field={'Type'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Type
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Paging
                        Current={currentPage + 1}
                        SetPage={(page) => setCurrentPage(page - 1)}
                        Total={totalPages}
                    />
                </div>
            </div>
            <Modal Show={showModal} Size={'lg'} ShowCancel={false} ShowX={true} ConfirmText={'Save'}
                Title={'Add New User Group'} CallBack={(confirm) => {
                    if (confirm) {
                        securityGroupController.DBAction(
                            'POST',
                            { ...newGroup, Name: ((newGroup.Name?.length ?? 0) > 0 ? newGroup.Name : newGroup.DisplayName) }
                        ).then(() => {
                            setStatus('changed');
                            setShowModal(false);
                        })
                    }
                }}
                ConfirmShowToolTip={groupError.length > 0}
                ConfirmToolTipContent={<>
                    {groupError.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                </>}
                DisableConfirm={groupError.length > 0}
            >
                <GroupForm Group={newGroup} Setter={(u) => setNewGroup(u)} Edit={false} SetErrors={setGroupError} />
            </Modal>
        </div>
    )

}

export default ByUser;

function getUserGroups(controller: GenericController<ISecurityGroup>, filters: Search.IFilter<ISecurityGroup>[], sortField: keyof ISecurityGroup, ascending: boolean, page: number) {
    return controller.PagedSearch(filters, sortField, ascending, page)
}
