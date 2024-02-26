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
import { ReactTable } from '@gpa-gemstone/react-table';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { SearchBar, Search, Modal, ServerErrorIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useHistory } from "react-router-dom";
import { SecurityGroupSlice } from '../../Store/Store';
import { ISecurityGroup } from '../Types';
import { useSelector } from 'react-redux';
import GroupForm from './GroupForm';

const defaultSearchcols: Search.IField<Application.Types.iSecurityGroup>[] = [
    { label: 'Name', key: 'DisplayName', type: 'string', isPivotField: false },
    { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
    { label: 'Type', key: 'Type', type: 'enum', enum: [{ Label: 'AD', Value: 'AD' }, { Label: 'Database', Value: 'Database' },{ Label: 'Azure', Value: 'Azure' }], isPivotField: false },
];

const emptyGroup: ISecurityGroup = { Name: "", CreatedBy: "", CreatedOn: new Date(), Description: "", DisplayName: "", ID: "00000000-0000-0000-0000-000000000000", Type: "Database", UpdatedOn: new Date() };


const ByUser: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const search = useSelector(SecurityGroupSlice.SearchFilters);
    const data = useSelector(SecurityGroupSlice.SearchResults);
    const allGroups = useSelector(SecurityGroupSlice.Data);

    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const searchStatus = useSelector(SecurityGroupSlice.SearchStatus);

    const sortField = useSelector(SecurityGroupSlice.SortField);
    const ascending = useSelector(SecurityGroupSlice.Ascending);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [groupError, setGroupError] = React.useState<string[]>([]);

    const [newGroup, setNewGroup] = React.useState<ISecurityGroup>(emptyGroup);

    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('unintiated');

    React.useEffect(() => {
        if (status === 'error')
            setPageStatus('error')
        else if (status === 'loading' )
            setPageStatus('loading')
        else
            setPageStatus('idle');
    }, [status])

    React.useEffect(() => {
        if (searchStatus == 'unintiated' || searchStatus == 'changed')
            dispatch(SecurityGroupSlice.DBSearch({ filter: search }))
    }, [searchStatus])

    if (pageStatus === 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
        </div>;

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <LoadingScreen Show={pageStatus === 'loading'} />
            <div className="row">
                <SearchBar<ISecurityGroup> CollumnList={defaultSearchcols} SetFilter={(flds) => dispatch(SecurityGroupSlice.DBSearch({ sortField, ascending, filter: flds }))}
                    Direction={'left'} defaultCollumn={{ label: 'Name', key: 'DisplayName', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' User Group(s)'}
                    StorageID="UsersGroupFilter"
                    GetEnum={() => {
                        return () => { }
                    }}
                >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); setShowModal(true) }}>Add Group</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            </div>

            <div className="row" style={{flex: 1, overflow: 'hidden'}}>
                <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                    <ReactTable.Table<ISecurityGroup>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            dispatch(SecurityGroupSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        OnClick={(d) => history.push({ pathname: homePath + 'index.cshtml', search: '?name=Group&GroupID=' + d.row.ID })}
                        TableStyle={{
                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<ISecurityGroup>
                            Key={'DisplayName'}
                            AllowSort={true}
                            Field={'DisplayName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<ISecurityGroup>
                            Key={'Description'}
                            AllowSort={true}
                            Field={'Description'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Description
                        </ReactTable.Column>
                        <ReactTable.Column<ISecurityGroup>
                            Key={'CreatedOn'}
                            AllowSort={true}
                            Field={'CreatedOn'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Added On
                        </ReactTable.Column>
                        <ReactTable.Column<ISecurityGroup>
                            Key={'CreatedBy'}
                            AllowSort={true}
                            Field={'CreatedBy'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Created By
                        </ReactTable.Column>
                        <ReactTable.Column<ISecurityGroup>
                            Key={'Type'}
                            AllowSort={true}
                            Field={'Type'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Type
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <Modal Show={showModal} Size={'lg'} ShowCancel={false} ShowX={true} ConfirmText={'Save'}
                Title={'Add New User Group'} CallBack={(confirm) => {
                    if (confirm)
                        dispatch(SecurityGroupSlice.DBAction({ 
                            verb: 'POST', 
                            record: { ...newGroup, Name: ((newGroup.Name?.length ?? 0) > 0? newGroup.Name : newGroup.DisplayName) }
                         }))
                    setShowModal(false);
                }}
                ConfirmShowToolTip={groupError.length > 0}
                ConfirmToolTipContent={<>
                    {groupError.map((t, i) => <p key={i}>{CrossMark} {t}</p>)}
                </>}
                DisableConfirm={groupError.length > 0}
            >
                <GroupForm Group={newGroup} Setter={(u) => setNewGroup(u)} Edit={false} SetErrors={setGroupError} />
            </Modal>
        </div>
    )

}

export default ByUser;
