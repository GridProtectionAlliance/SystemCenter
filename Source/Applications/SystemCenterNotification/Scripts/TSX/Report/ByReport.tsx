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

import * as React from 'react';
import { LoadingScreen, Modal, Search, SearchBar, GenericController } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { ScheduledEmailType, EmailCategory } from '../global';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { IsCron } from '@gpa-gemstone/helper-functions';
import ReportForm from './ReportForm';
import { useNavigate } from 'react-router-dom';
import TestEmailButton from '../CommonComponents/TestEmailButton';

declare var homePath;
declare var version;

const emptyEmail: ScheduledEmailType = {
    ID: -1, Name: '',
    SMS: false, TriggerEmailSQL: 'SELECT 1',
    EmailCategoryID: -1, Template: '',
    Schedule: '23 59 * * *',
    ShowSubscription: true,
    RequireApproval: false,
    FilePath: ''
};

interface IProps {}

const ByReport = (props: IProps) => {
    const navigate = useNavigate();
    const [filters, setFilters] = React.useState<Search.IFilter<ScheduledEmailType>[]>([]) 
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [searchStatus, setSearchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [data, setData] = React.useState<ScheduledEmailType[]>([]);
    const [allData, setAllData] = React.useState<ScheduledEmailType[]>([]);
    const [categoryStatus, setCategoryStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [categories, setCategories] = React.useState<EmailCategory[]>([]);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [newEmail, setNewEmail] = React.useState<ScheduledEmailType>(emptyEmail);

    const [sortField, setSortField] = React.useState<keyof ScheduledEmailType>('Name');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);

    const scheduledEmailTypeController = React.useMemo(() => new GenericController<ScheduledEmailType>(`${homePath}api/OpenXDA/ScheduledEmailType`, "Name", true), [])
    const emailCategoryController = React.useMemo(() => new GenericController<EmailCategory>(`${homePath}api/OpenXDA/EmailCategory`, "Name", true), [])

    React.useEffect(() => {
        setCategoryStatus('loading')
        const h = emailCategoryController.Fetch();
        h.done((d) => {
            setCategories(d)
            setCategoryStatus('idle')
        });
        h.fail(() => setCategoryStatus('error'));

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }

    }, [emailCategoryController.Fetch]);

    React.useEffect(() => {
        setStatus('uninitiated')
        const h = scheduledEmailTypeController.Fetch();
        h.done((d) => {
            setAllData(d)
            setStatus('idle')
        });
        h.fail(() => setStatus('error'))
        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [scheduledEmailTypeController.Fetch, refreshTrigger]);

    React.useEffect(() => {
        setSearchStatus('loading')
        const h = scheduledEmailTypeController.PagedSearch(filters, sortField, ascending, page);
        h.done((d) => {
            setData(JSON.parse(d.Data as unknown as string))
            setTotalPages(d.NumberOfPages);
            setRecordsPerPage(d.RecordsPerPage);
            setTotalRecords(d.TotalRecords);
            setSearchStatus('idle');
        });
        h.fail(() => setSearchStatus('error'))
        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [sortField, filters, ascending, page, refreshTrigger, scheduledEmailTypeController.PagedSearch])

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
        { key: "ShowSubscription", label: "Self Subscription", type: "boolean", isPivotField: false },
        { key: "RequireApproval", label: "Requires Approval", type: "boolean", isPivotField: false }, ,
    ]

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
                    <SearchBar<ScheduledEmailType> CollumnList={searchFields}
                        SetFilter={setFilters}
                        Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                        ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : `Displaying Report(s) ${totalRecords > 0 ? recordsPerPage * page + 1 : 0}-${recordsPerPage * page + data.length} out of ${totalRecords}`}
                        GetEnum={() => {
                            return () => { }
                        }}>
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <button className="btn btn-info btn-block" onClick={(event) => { setNewEmail(emptyEmail); setShowModal(true); event.preventDefault() }}>
                                    Add Report
                                </button>
                                <TestEmailButton />
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
            </div>
            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<ScheduledEmailType>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortField)
                                setAscending((val) => !val);
                            else {
                                setSortField(d.colKey as keyof ScheduledEmailType)
                            }
                        }}
                        OnClick={(item) => navigate(`${homePath}ReportEmail/${item.row.ID}`)}
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
                        <Column<ScheduledEmailType>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<ScheduledEmailType>
                            Key={'Schedule'}
                            AllowSort={true}
                            Field={'Schedule'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Schedule
                        </Column>
                        <Column<ScheduledEmailType>
                            Key={'SMS'}
                            AllowSort={true}
                            Field={'SMS'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.SMS ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" />}
                        > Text Message
                        </Column>
                        <Column<ScheduledEmailType>
                            Key={'ShowSubscription'}
                            AllowSort={true}
                            Field={'ShowSubscription'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                            Content={({ item }) =>
                                item.ShowSubscription && (categories.find(category => category.ID === item.EmailCategoryID)?.SelfSubscribe ?? false) ?
                                    <ReactIcons.CheckMark Color="var(--success)" /> :
                                    <ReactIcons.CrossMark Color="var(--danger)" />
                            }
                        > Self Subscription
                        </Column>
                        <Column<ScheduledEmailType>
                            Key={'RequireApproval'}
                            AllowSort={true}
                            Field={'RequireApproval'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) => item.RequireApproval ? <ReactIcons.CheckMark Color="var(--success)" /> : <ReactIcons.CrossMark Color="var(--danger)" />}
                        > Requires Approval
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Paging
                        Current={page + 1}
                        SetPage={(page) => setPage(page - 1)}
                        Total={totalPages}
                    />
                </div>
            </div>
            <Modal Title={'Add New Report'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={false} ConfirmText={'Add'}
                CallBack={(conf, isBtn) => {
                    if (conf)
                        scheduledEmailTypeController.DBAction("POST", newEmail).then(() => setRefreshTrigger((val) => !val))
                    setShowModal(false);
                }}
                DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)
                }
            >
                <ReportForm record={newEmail} setRecord={setNewEmail} />
            </Modal>
        </div>)
}

export default ByReport;