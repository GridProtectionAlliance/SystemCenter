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

import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { LoadingScreen, Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive'
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { EmailCategory } from '../global';
import { EmailCategorySlice } from '../Store';
import Table from '@gpa-gemstone/react-table';
import EmailCategoryForm from './EmailCategoryForm';

declare var homePath;
declare var version;

interface IProps {}

const ByEmailCategory = (props: IProps) => {
    const dispatch = useDispatch();

    const search: Search.IFilter<EmailCategory>[] = useSelector(EmailCategorySlice.SearchFilters);
    const status: Application.Types.Status = useSelector(EmailCategorySlice.Status);
    const searchStatus: Application.Types.Status = useSelector(EmailCategorySlice.SearchStatus);
    const data: EmailCategory[] = useSelector(EmailCategorySlice.SearchResults);
    const allData: EmailCategory[] = useSelector(EmailCategorySlice.Data);


    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [newEmailCategory, setNewEmailCategory] = React.useState<EmailCategory>({ ID: -1, Name: '', SelfSubscribe: true });

    const sortField = useSelector(EmailCategorySlice.SortField);
    const asc = useSelector(EmailCategorySlice.Ascending);

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
        if (allData.findIndex(s => s.Name === newEmailCategory.Name && s.ID !== newEmailCategory.ID) >= 0)
            e.push('An Email Category with this Name already exists');
        setErrors(e);
    }, [newEmailCategory])

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<EmailCategory> CollumnList={[{ key: "Name", label: "Name", type: "string", isPivotField: false }]}
                    SetFilter={(flds) => dispatch(EmailCategorySlice.DBSearch({ filter: flds }))}
                    Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Email Category(s)'}
                    GetEnum={() => {
                        return () => { }
                    }}>
                    <li className="nav-item" style={{ width: '50%', paddingRight: 10 }}>
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
                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<EmailCategory>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: '50%' }, rowStyle: { width: '10%' } },
                            { key: 'SelfSubscribe', field: 'SelfSubscribe', label: 'Self Subscription', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: (item) => item.SelfSubscribe ? HeavyCheckMark : CrossMark },
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
                                dispatch(EmailCategorySlice.Sort({ SortField: sortField, Ascending: asc }));
                            else
                                dispatch(EmailCategorySlice.Sort({ SortField: d.colField, Ascending: true }));
                        }}
                        onClick={(item) => { window.location.href = `${homePath}Category/${item.row.ID}` }}
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
                        dispatch(EmailCategorySlice.DBAction({ verb: "POST", record: newEmailCategory }))
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
        </>)
}

export default ByEmailCategory;