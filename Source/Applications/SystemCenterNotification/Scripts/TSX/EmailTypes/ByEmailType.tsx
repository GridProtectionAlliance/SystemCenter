//******************************************************************************************************
//  ByEmailType.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { LoadingScreen, Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive'
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { EmailType } from '../global';
import { EmailCategorySlice, EmailTypeSlice } from '../Store';
import { ReactTable } from '@gpa-gemstone/react-table';
import EmailForm from './EmailForm';
import { IsNumber } from '@gpa-gemstone/helper-functions';
import { useNavigate } from 'react-router-dom';

declare var homePath;
declare var version;

interface IProps { }

const emptyEmail = {
    ID: -1,
    Name: '',
    ShowSubscription: true,
    SMS: false,
    CombineEventsSQL: '',
    TriggerEmailSQL: '',
    EmailCategoryID: -1,
    MaxDelay: 0,
    MinDelay: 0,
    Template: '',
    RequireApproval: false
} as EmailType

const ByEmailType = (props: IProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const search: Search.IFilter<EmailType>[] = useAppSelector(EmailTypeSlice.SearchFilters);
    const status: Application.Types.Status = useAppSelector(EmailTypeSlice.Status);
    const searchStatus: Application.Types.Status = useAppSelector(EmailTypeSlice.SearchStatus);
    const data: EmailType[] = useAppSelector(EmailTypeSlice.SearchResults);
    const allData: EmailType[] = useAppSelector(EmailTypeSlice.Data);
    const categoryStatus = useAppSelector(EmailCategorySlice.Status);
    const categories = useAppSelector(EmailCategorySlice.Data);
    const parentID = useAppSelector(EmailTypeSlice.ParentID);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [newEmail, setNewEmail] = React.useState<EmailType>(emptyEmail);

    const sortField = useAppSelector(EmailTypeSlice.SortField);
    const asc = useAppSelector(EmailTypeSlice.Ascending);


    React.useEffect(() => {
        if (categoryStatus == 'unintiated' || categoryStatus == 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [categoryStatus]);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != null )
            dispatch(EmailTypeSlice.Fetch());
    }, [status, parentID]);

    React.useEffect(() => {
        if (searchStatus == 'unintiated' || searchStatus == 'changed')
            dispatch(EmailTypeSlice.DBSearch({ filter: search, sortField, ascending: asc }));
    }, [searchStatus])

    React.useEffect(() => {
        let e = [];
        if (newEmail.Name == undefined || newEmail.Name.length < 1)
            e.push('A Name is required');
        if (allData.findIndex(s => s.Name === newEmail.Name && s.ID !== newEmail.ID) >= 0)
            e.push('An Email with this Name already exists');
        if (newEmail.EmailCategoryID < 0)
            e.push('A Category has to be selected.');
        if (!IsNumber(newEmail.MinDelay))
            e.push('A valid minimum delay is required.');
        if (!IsNumber(newEmail.MaxDelay))
            e.push('A valid maximum delay is required.');
        if (newEmail.MinDelay > newEmail.MaxDelay)
            e.push('The minimum delay can not be more than the maximum delay.')
        if (newEmail.MaxDelay < newEmail.MinDelay)
            e.push('The maximum delay can not be less than the minimum delay.')
        setErrors(e);
    }, [newEmail])

    React.useEffect(() => {
        if (newEmail.EmailCategoryID < 0 && categories.length > 0)
            setNewEmail((e) => ({ ...e, EmailCategoryID: categories[0].ID }));
    }, [newEmail, categories]);

    const searchFields: Search.IField<EmailType>[] = [
        { key: "Name", label: "Name", type: "string", isPivotField: false },
        { key: "MinDelay", label: "Minimum Delay", type: "number", isPivotField: false },
        { key: "MaxDelay", label: "Maximum Delay", type: "number", isPivotField: false },
        { key: "SMS", label: "Text Message", type: "boolean", isPivotField: false },
        { key: "ShowSubscription", label: "Self Subscription", type: "boolean", isPivotField: false },
        { key: "RequireApproval", label: "Requires Approval", type: "boolean", isPivotField: false },
        { key: "EmailCategoryID", label: "Category", type: "enum", isPivotField: false, enum: categories.map(item => ({ Label: item.Name, Value: item.ID.toString() })) },
    ];

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
                    <SearchBar<EmailType> CollumnList={searchFields}
                        SetFilter={(flds) => dispatch(EmailTypeSlice.DBSearch({ filter: flds }))}
                        Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                        ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Event Notification(s)'}
                    >
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <button className="btn btn-primary" onClick={(event) => { setNewEmail(emptyEmail); setShowModal(true); event.preventDefault() }}>
                                        Add Email
                                    </button>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
            </div>
            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <ReactTable.Table<EmailType>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={asc}
                        OnSort={(d) => {
                            dispatch(EmailTypeSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        OnClick={(item) => navigate(`${homePath}EventEmail/${item.row.ID}`)}
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
                        <ReactTable.Column<EmailType>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '30%' }}
                            RowStyle={{ width: '30%' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<EmailType>
                            Key={'MaxDelay'}
                            AllowSort={true}
                            Field={'MaxDelay'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                        > Maximum Delay (s)
                        </ReactTable.Column>
                        <ReactTable.Column<EmailType>
                            Key={'MinDelay'}
                            AllowSort={true}
                            Field={'MinDelay'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                        > Minimum Delay (s)
                        </ReactTable.Column>
                        <ReactTable.Column<EmailType>
                            Key={'SMS'}
                            AllowSort={true}
                            Field={'SMS'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                            Content={({ item }) => item.SMS ? HeavyCheckMark : CrossMark }
                        > Text Message
                        </ReactTable.Column>
                        <ReactTable.Column<EmailType>
                            Key={'ShowSubscription'}
                            AllowSort={true}
                            Field={'ShowSubscription'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                            Content={({ item }) => item.ShowSubscription ? HeavyCheckMark : CrossMark }
                        > Self Subscription
                        </ReactTable.Column>
                        <ReactTable.Column<EmailType>
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
            <Modal Title={'Add New Email'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={false} ConfirmText={'Add'}
                CallBack={(conf, isBtn) => {
                    if (conf )
                        dispatch(EmailTypeSlice.DBAction({ verb: "POST", record: newEmail }))
                    setShowModal(false);
                }}
                DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)
                }
            >
                <EmailForm record={newEmail} setRecord={setNewEmail} />
            </Modal>
        </div>)
}

export default ByEmailType;