//******************************************************************************************************
//  ByMATLABAnalytic.tsx - Gbtc
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
//  08/03/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MATLABAnalyticSlice } from '../Store/Store';

import { useHistory } from "react-router-dom";
import Table from '@gpa-gemstone/react-table'
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';

import MATLABAnalyticForm from './MATLABAnalyticForm';


const MATLABAnalytics: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(MATLABAnalyticSlice.SearchResults);
    const analyticStatus = useAppSelector(MATLABAnalyticSlice.SearchStatus);

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof OpenXDA.Types.MATLABAnalytic>('LoadOrder');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');

    let history = useHistory();

    const MATLABAnalyticSearchFields = [
        { label: 'Method Name', key: 'MethodName', type: 'string', isPivotField: false },
        { label: 'Assembly Name', key: 'AssemblyName', type: 'string', isPivotField: false },
        { label: 'Load Order', key: 'LoadOrder', type: 'number', isPivotField: false }
    ];
    const MATLABAnalyticDefaultSearchField = { label: 'Method Name', key: 'MethodName', type: 'string', isPivotField: false };
    const [search, setSearch] = React.useState<Array<Search.IFilter<OpenXDA.Types.MATLABAnalytic>>>([]);

    const emptyRecord = { ID: 0, AssemblyName: '', MethodName: '', SettingSQL: '', LoadOrder: 0 };
    const [record, setRecord] = React.useState<OpenXDA.Types.MATLABAnalytic>(emptyRecord);
    const [eventTypeRecord, setEventTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticEventType[]>([]);
    const [assetTypeRecord, setAssetTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticAssetType[]>([]);

    React.useEffect(() => {
        if (analyticStatus == 'unintiated' || analyticStatus == 'changed')
            dispatch(MATLABAnalyticSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [analyticStatus]);

    React.useEffect(() => {
        dispatch(MATLABAnalyticSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [search, sortField, ascending]);

    React.useEffect(() => {
        let e = [];
        if (record.MethodName === null || record.MethodName.length === 0) {
            e.push('A Method Name is required.');
        }
        if (record.AssemblyName === null || record.AssemblyName.length === 0) {
            e.push('An Assembly Name is required.');
        }

        setErrors(e);
    }, [record]);

    function handleSelect(item) {
        if (props.Roles.indexOf('Administrator') != -1) {
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=MATLABAnalytic&AnalyticID=' + item.row.ID });
        } 
    }

    function addNewAnalytic() {
        let handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/MATLABAnalytic/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                MATLABAnalytic: record,
                MATLABAnalyticEventType: eventTypeRecord,
                MATLABAnalyticAssetType: assetTypeRecord,
            }),
            dataType: 'json',
            cache: false,
            async: true
        }).done(() => {
            dispatch(MATLABAnalyticSlice.DBSearch({ filter: search, sortField, ascending }));
        }).fail(() => {
            setStatus('error');
        });

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        };
    }

    return (
        <>
            <div style={{ width: '100%', height: '200px' }} hidden={status !== 'error'}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={'A server error has occurred. Please contact your administrator.'} />
                </div>
            </div>

            <div style={{ width: '100%', height: '100%' }} hidden={status === 'error'}>
                <SearchBar<OpenXDA.Types.MATLABAnalytic>
                    CollumnList={MATLABAnalyticSearchFields as Search.IField<OpenXDA.Types.MATLABAnalytic>[]}
                    SetFilter={(flds) => dispatch(MATLABAnalyticSlice.DBSearch({ filter: flds }))}
                    Direction={'left'}
                    defaultCollumn={MATLABAnalyticDefaultSearchField as Search.IField<OpenXDA.Types.MATLABAnalytic>}
                    Width={'50%'}
                    Label={'Search'}
                    ShowLoading={analyticStatus == 'loading'}
                    ResultNote={analyticStatus == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' MATLAB Analytic(s)'}
                >

                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0}
                                    onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); setShowNew(true); }}>Add Analytic</button>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<OpenXDA.Types.MATLABAnalytic>
                        cols={[
                            { key: 'MethodName', label: 'Method Name', field: 'MethodName', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'AssemblyName', label: 'Assembly Name', field: 'AssemblyName', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'LoadOrder', label: 'Load Order', field: 'LoadOrder', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                        ]}
                        tableClass="table table-hover"
                        data={data}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colField === null) return;
                            if (d.colKey !== sortField)
                                dispatch(MATLABAnalyticSlice.DBSearch({ filter: search, sortField: (d.colField as any), ascending: true }));
                            else
                                dispatch(MATLABAnalyticSlice.DBSearch({ filter: search, ascending: !ascending }));

                        }}
                        onClick={handleSelect}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    />
                </div>

                <Modal Title={'Add New MATLAB Analytic'}
                    CallBack={(conf) => {
                        if (conf) addNewAnalytic();
                        setShowNew(false);
                    }}
                    ShowCancel={false}
                    ShowX={true}
                    ConfirmBtnClass={'btn-primary'}
                    ConfirmText={'Add Analytic'}
                    ConfirmShowToolTip={errors.length > 0}
                    ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                    DisableConfirm={errors.length > 0}
                    Show={showNew} >
                    <MATLABAnalyticForm Record={record} Setter={setRecord} ETSetter={setEventTypeRecord} ATSetter={setAssetTypeRecord} />
                </Modal>
            </div>
        </>
    )
}

export default MATLABAnalytics;