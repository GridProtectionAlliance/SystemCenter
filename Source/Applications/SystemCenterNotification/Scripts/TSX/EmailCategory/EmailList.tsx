//******************************************************************************************************
//  EmailList.tsx - Gbtc
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
import { useParams } from 'react-router-dom';
import { LoadingScreen, Modal, Search, SearchBar, TabSelector, ToolTip, Warning } from '@gpa-gemstone/react-interactive'
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { EmailCategory, EmailType } from '../global';
import { EmailCategorySlice, EmailTypeSlice } from '../Store';
import Table from '@gpa-gemstone/react-table';
import EmailCategoryForm from './EmailCategoryForm';

declare var homePath;
declare var version;

interface IProps { CategoryID: number}



const EmailList = (props: IProps) => {
    const dispatch = useAppDispatch();

    const emails = useAppSelector(EmailTypeSlice.Data);
    const status = useAppSelector(EmailTypeSlice.Status);

    const parentID = useAppSelector(EmailTypeSlice.ParentID);

    const sortField = useAppSelector(EmailTypeSlice.SortField);
    const ascending = useAppSelector(EmailTypeSlice.Ascending);

    React.useEffect(() => {
        if (props.CategoryID != parentID || status == 'unintiated' || status == 'changed')
            dispatch(EmailTypeSlice.Fetch(props.CategoryID));
    }, [parentID, status, props.CategoryID])

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Emails:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' }}>
                    <Table<EmailType>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: '60%' }, rowStyle: { width: '60%' } },
                            //{ key: 'Type', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'MinDelay', field: 'MinDelay', label: 'Min Delay', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'MaxDelay', field: 'MaxDelay', label: 'Max Delay', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'SMS', field: 'SMS', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => item.SMS? 'Text' : 'Email' },
                        ]}
                        tableClass="table table-hover"
                        data={emails}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey === 'scroll' || d.colKey === 'undefined')
                                return
                            if (d.colField === sortField)
                                dispatch(EmailTypeSlice.Sort({ SortField: sortField, Ascending: true }));
                            else
                                dispatch(EmailTypeSlice.Sort({ SortField: sortField, Ascending: ascending }));
                        }}
                        onClick={() => { }}
                        //theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        //tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 182, width: '100%' }}
                        //rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={() => false}
                    />

                </div>
            </div>
            <div className="card-footer">
                
            </div>

        </div>
        )
}

export default EmailList;