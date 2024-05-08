//******************************************************************************************************
//  ByReport.tsx - Gbtc
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
//  04/14/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { LoadingScreen, Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive'
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { ScheduledEmailType } from '../global';
import { EmailCategorySlice, ScheduledEmailTypeSlice } from '../Store';
import { ReactTable } from '@gpa-gemstone/react-table';
import { IsCron } from '@gpa-gemstone/helper-functions';
import ReportForm from './ReportForm';
import { useNavigate } from 'react-router-dom';

declare var homePath;
declare var version;

interface IProps {}

const ByReport = (props: IProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const search: Search.IFilter<ScheduledEmailType>[] = useAppSelector(ScheduledEmailTypeSlice.SearchFilters);
    const status: Application.Types.Status = useAppSelector(ScheduledEmailTypeSlice.Status);
    const searchStatus: Application.Types.Status = useAppSelector(ScheduledEmailTypeSlice.SearchStatus);
    const data: ScheduledEmailType[] = useAppSelector(ScheduledEmailTypeSlice.SearchResults);
    const allData: ScheduledEmailType[] = useAppSelector(ScheduledEmailTypeSlice.Data);
    const categoryStatus = useAppSelector(EmailCategorySlice.Status);
    const categories = useAppSelector(EmailCategorySlice.Data);
    const parentID = useAppSelector(ScheduledEmailTypeSlice.ParentID);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const emptyEmail = {
        ID: -1, Name: '',
        SMS: false, TriggerEmailSQL: 'SELECT 1',
        EmailCategoryID: -1, Template: '',
        Schedule: '23 59 * * *',
        ShowSubscription: true,
        RequireApproval: false,
    } as ScheduledEmailType
    const [newEmail, setNewEmail] = React.useState<ScheduledEmailType>(emptyEmail);

    const sortField = useAppSelector(ScheduledEmailTypeSlice.SortField);
    const asc = useAppSelector(ScheduledEmailTypeSlice.Ascending);


    React.useEffect(() => {
        if (categoryStatus == 'unintiated' || categoryStatus == 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [categoryStatus]);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != null )
            dispatch(ScheduledEmailTypeSlice.Fetch());
    }, [status, parentID]);

    React.useEffect(() => {
        if (searchStatus == 'unintiated' || searchStatus == 'changed')
            dispatch(ScheduledEmailTypeSlice.DBSearch({ filter: search, sortField, ascending: asc }));
    }, [searchStatus])

    React.useEffect(() => {
        let e = [];
        if (newEmail.Name == undefined || newEmail.Name.length < 1)
            e.push('A Name is required');
        if (allData.findIndex(s => s.Name === newEmail.Name && s.ID !== newEmail.ID) >= 0)
            e.push('A Report with this Name already exists');
        if (newEmail.EmailCategoryID < 0)
            e.push('A Category has to be selected.');
        if (!IsCron(newEmail.Schedule))
            e.push('A valid schedule required.');
        setErrors(e);
    }, [newEmail])

    React.useEffect(() => {
        if (newEmail.EmailCategoryID < 0 && categories.length > 0)
            setNewEmail((e) => ({ ...e, EmailCategoryID: categories[0].ID }));
    }, [newEmail, categories]);

    const searchFields: Search.IField<ScheduledEmailType>[] = [
        { key: "Name", label: "Name", type: "string", isPivotField: false },
        { key: "Schedule", label: "Schedule", type: "string", isPivotField: false },
        { key: "SMS", label: "Text Message", type: "boolean", isPivotField: false },
        { key: "EmailCategoryID", label: "Category", type: "enum", isPivotField: false, enum: categories.map(item => ({ Label: item.Name, Value: item.ID.toString() })) },
    ]

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
                    <SearchBar<ScheduledEmailType> CollumnList={searchFields}
                        SetFilter={(flds) => dispatch(ScheduledEmailTypeSlice.DBSearch({ filter: flds }))}
                        Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                        ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Report(s)'}
                        GetEnum={() => {
                            return () => { }
                        }}>
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <button className="btn btn-primary" onClick={(event) => { setNewEmail(emptyEmail); setShowModal(true); event.preventDefault() }}>
                                        Add Report
                                    </button>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
            </div>
            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <ReactTable.Table<ScheduledEmailType>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colKey === null) return;
                            dispatch(ScheduledEmailTypeSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        OnClick={(item) => navigate(`/ReportEmail/${item.row.ID}`)}
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
                        <ReactTable.Column<ScheduledEmailType>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<ScheduledEmailType>
                            Key={'Schedule'}
                            AllowSort={true}
                            Field={'Schedule'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Schedule
                        </ReactTable.Column>
                        <ReactTable.Column<ScheduledEmailType>
                            Key={'SMS'}
                            AllowSort={true}
                            Field={'SMS'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.SMS ? HeavyCheckMark : CrossMark }
                        > Text Message
                        </ReactTable.Column>
                        <ReactTable.Column<ScheduledEmailType>
                            Key={'ShowSubscription'}
                            AllowSort={true}
                            Field={'ShowSubscription'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                            Content={({ item }) => item.ShowSubscription ? HeavyCheckMark : CrossMark }
                        > Self Subscription
                        </ReactTable.Column>
                        <ReactTable.Column<ScheduledEmailType>
                            Key={'RequireApproval'}
                            AllowSort={true}
                            Field={'RequireApproval'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) => item.RequireApproval ? HeavyCheckMark : CrossMark }
                        > Requires Approval
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <Modal Title={'Add New Report'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={false} ConfirmText={'Add'}
                CallBack={(conf, isBtn) => {
                    if (conf)
                        dispatch(ScheduledEmailTypeSlice.DBAction({ verb: "POST", record: newEmail }))
                    setShowModal(false);
                }}
                DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)
                }
            >
                <ReportForm record={newEmail} setRecord={setNewEmail} />
            </Modal>
        </div>)
}

export default ByReport;