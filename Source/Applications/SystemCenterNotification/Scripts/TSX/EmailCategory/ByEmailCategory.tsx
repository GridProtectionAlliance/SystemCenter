//******************************************************************************************************
//  ByEmailCategory.tsx - Gbtc
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
import { EmailCategory } from '../global';
import { EmailCategorySlice } from '../Store';
import { Table, Column } from '@gpa-gemstone/react-table';
import EmailCategoryForm from './EmailCategoryForm';
import { useNavigate } from 'react-router-dom';

interface IProps {}

const ByEmailCategory = (props: IProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const search: Search.IFilter<EmailCategory>[] = useAppSelector(EmailCategorySlice.SearchFilters);
    const status: Application.Types.Status = useAppSelector(EmailCategorySlice.Status);
    const searchStatus: Application.Types.Status = useAppSelector(EmailCategorySlice.SearchStatus);
    const data: EmailCategory[] = useAppSelector(EmailCategorySlice.SearchResults);
    const allData: EmailCategory[] = useAppSelector(EmailCategorySlice.Data);


    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [newEmailCategory, setNewEmailCategory] = React.useState<EmailCategory>({ ID: -1, Name: '', SelfSubscribe: true });

    const sortField = useAppSelector(EmailCategorySlice.SortField);
    const asc = useAppSelector(EmailCategorySlice.Ascending);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [status]);

    React.useEffect(() => {
        if (searchStatus == 'unintiated' || searchStatus == 'changed')
            dispatch(EmailCategorySlice.DBSearch({ filter: search, sortField, ascending: asc }));
    }, [searchStatus])

    React.useEffect(() => {
        let e = [];
        if (newEmailCategory.Name == undefined || newEmailCategory.Name.length < 1)
            e.push('A Name is required');
        if (newEmailCategory.Name !== undefined && newEmailCategory.Name !== null && newEmailCategory.Name.length > 50)
            e.push('Name cannot exceed 50 characters');
        if (allData.findIndex(s => s.Name === newEmailCategory.Name && s.ID !== newEmailCategory.ID) >= 0)
            e.push('An Email Category with this Name already exists');
        setErrors(e);
    }, [newEmailCategory])

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
                    <SearchBar<EmailCategory> CollumnList={[{ key: "Name", label: "Name", type: "string", isPivotField: false }]}
                        SetFilter={(flds) => dispatch(EmailCategorySlice.DBSearch({ filter: flds }))}
                        Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                        ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Email Category(s)'}
                    >
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <button className="btn btn-primary" onClick={(event) => { setNewEmailCategory({ ID: -1, Name: '', SelfSubscribe: true }); setShowModal(true); event.preventDefault() }}>
                                        Add Email Category
                                    </button>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
            </div>

            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<EmailCategory>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colKey === null) return;
                            dispatch(EmailCategorySlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        OnClick={(item) => navigate(`${homePath}Category/${item.row.ID}`)}
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
                        <Column<EmailCategory>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<EmailCategory>
                            Key={'SelfSubscribe'}
                            AllowSort={true}
                            Field={'SelfSubscribe'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.SelfSubscribe ? HeavyCheckMark : CrossMark }
                        > Self Subscription
                        </Column>
                    </Table>
                </div>
            </div>

            <Modal Title={'Add New Email Category'}
                Show={showModal} ShowX={true} Size={'lg'} ShowCancel={false} ConfirmText={'Add'}
                CallBack={(conf) => {
                    if (conf)
                        dispatch(EmailCategorySlice.DBAction({ verb: "POST", record: newEmailCategory }));
                    setShowModal(false);
                }}
                DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)
                }
            >
                <EmailCategoryForm record={newEmailCategory} setRecord={setNewEmailCategory} />
            </Modal>
        </div>)
}

export default ByEmailCategory;