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

import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { LoadingScreen, Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive'
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { EmailCategory, EmailType } from '../global';
import { EmailCategorySlice, EmailTypeSlice } from '../Store';
import Table from '@gpa-gemstone/react-table';
import EmailForm from './EmailForm';
import { IsNumber } from '@gpa-gemstone/helper-functions';

declare var homePath;
declare var version;

interface IProps {}

const ByEmailType = (props: IProps) => {
    const dispatch = useDispatch();

    const search: Search.IFilter<EmailType>[] = useSelector(EmailTypeSlice.SearchFilters);
    const status: Application.Types.Status = useSelector(EmailTypeSlice.Status);
    const searchStatus: Application.Types.Status = useSelector(EmailTypeSlice.SearchStatus);
    const data: EmailType[] = useSelector(EmailTypeSlice.SearchResults);
    const allData: EmailType[] = useSelector(EmailTypeSlice.Data);
    const categoryStatus = useSelector(EmailCategorySlice.Status);
    const categories = useSelector(EmailCategorySlice.Data);
    const parentID = useSelector(EmailTypeSlice.ParentID);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const emptyEmail = { ID: -1, Name: '', ShowSubscription: true, SMS: false, CombineEventsSQL: '', TriggerEmailSQL: '', EmailCategoryID: -1, MaxDelay: 0, MinDelay: 0, Template: '', RequireApproval: false } as EmailType
    const [newEmail, setNewEmail] = React.useState<EmailType>(emptyEmail);

    const sortField = useSelector(EmailTypeSlice.SortField);
    const asc = useSelector(EmailTypeSlice.Ascending);



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
    ]
    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<EmailType> CollumnList={searchFields}
                    SetFilter={(flds) => dispatch(EmailTypeSlice.DBSearch({ filter: flds }))}
                    Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Event Notification(s)'}
                    GetEnum={() => {
                        return () => { }
                    }}>
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
                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<EmailType>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                            { key: 'MaxDelay', field: 'MaxDelay', label: 'Maximum Delay (s)', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            { key: 'MinDelay', field: 'MinDelay', label: 'Minimum Delay (s)', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            { key: 'SMS', field: 'SMS', label: 'Text Message', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: (item) => item.SMS ? HeavyCheckMark : CrossMark },
                            { key: 'ShowSubscription', field: 'ShowSubscription', label: 'Self Subscription', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: (item) => item.ShowSubscription ? HeavyCheckMark : CrossMark },
                            { key: 'RequireApproval', field: 'RequireApproval', label: 'Requires Approval', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => item.RequireApproval ? HeavyCheckMark : CrossMark },
                            { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortKey={sortField}
                        ascending={asc}
                        onSort={(d) => {
                            if (d.colKey === 'scroll' || d.colKey === 'undefined')
                                return
                            if (d.colField === sortField)
                                dispatch(EmailTypeSlice.Sort({ SortField: sortField, Ascending: asc }));
                            else
                                dispatch(EmailTypeSlice.Sort({ SortField: d.colField, Ascending: true }));
                        }}
                        onClick={(item) => { window.location.href = `${homePath}EventEmail/${item.row.ID}`  }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={() => false}
                    />
                </div>
            </div>
            <Modal Title={'Add New Email Category'}
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
        </>)
}

export default ByEmailType;