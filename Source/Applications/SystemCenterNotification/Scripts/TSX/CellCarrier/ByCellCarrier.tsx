//******************************************************************************************************
//  ByCellCarrier.tsx - Gbtc
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
import Table from '@gpa-gemstone/react-table';
import moment from 'moment';
import { ICellCarrier } from '../global';
import { CellCarrierSlice } from '../Store';
import { Input } from '@gpa-gemstone/react-forms';
import { castArray } from 'lodash';


declare var homePath;
declare var version;

interface IProps {}

const ByCellCarrier = (props: IProps) => {
    const dispatch = useDispatch();

    const searchFields: Search.IField<ICellCarrier>[] = [
        { key: "Name", label: "Name", type: "string", isPivotField: false },
        { key: "Transform", label: "Transform", type: "string", isPivotField: false },
    ]

    const searchStatus: Application.Types.Status = useSelector(CellCarrierSlice.SearchStatus);
    const status: Application.Types.Status = useSelector(CellCarrierSlice.Status);
    const data: ICellCarrier[] = useSelector(CellCarrierSlice.SearchResults);
    const allData: ICellCarrier[] = useSelector(CellCarrierSlice.Data);
    const sortField = useSelector(CellCarrierSlice.SortField);
    const asc = useSelector(CellCarrierSlice.Ascending);
    const filters = useSelector(CellCarrierSlice.SearchFilters);
    const [showModal, setShowModal] = React.useState<'New'|'Edit'|'Hide'>('Hide');
    const [carrier, setCarrier] = React.useState<ICellCarrier>({ Name: '', Transform: '', ID: 0 })


    React.useEffect(() => {
        if (searchStatus == 'unintiated' || searchStatus == 'changed')
            dispatch(CellCarrierSlice.DBSearch({ filter: filters, sortField, ascending: asc }));
    }, [searchStatus])

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(CellCarrierSlice.Fetch());
    }, [status])

    return (
        <>
            <LoadingScreen Show={status === 'loading'} />
            <div style={{ width: '100%', height: '100%' }}>
                <SearchBar<ICellCarrier> CollumnList={searchFields}
                    SetFilter={(flds) => dispatch(CellCarrierSlice.DBSearch({ filter: flds }))}
                    Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                    ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Cell Carrier(s)'}
                    GetEnum={() => {
                        return () => { }
                    }}>
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <button className="btn btn-primary" onClick={(event) => { setCarrier({ Name: '', Transform: '', ID: 0 }); setShowModal('New'); event.preventDefault() }}>
                                    Add Cell Carrier
                                </button>
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>

                <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                    <Table<ICellCarrier>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: '50%' }, rowStyle: { width: '50%' } },
                            { key: 'Transform', field: 'Transform', label: 'Transform', headerStyle: { width: '50%' }, rowStyle: { width: '50%' } },
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
                                dispatch(CellCarrierSlice.Sort({ SortField: sortField, Ascending: asc }));
                            else
                                dispatch(CellCarrierSlice.Sort({ SortField: d.colField, Ascending: true }));
                        }}
                        onClick={(item) => { setCarrier(item.row); setShowModal('Edit'); }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={() => false}
                    />
                </div>
            </div>
            <Modal Show={showModal != 'Hide'} ShowCancel={showModal == 'Edit'} CancelText={'Delete'} ShowX={true} Size='lg' Title={''} ConfirmText={showModal == 'Edit' ? 'Save' : 'Add'}
                DisableConfirm={carrier.Name == null || carrier.Transform == null || carrier.Name.length == 0 || carrier.Transform.length == 0 || allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) > -1}
                ConfirmShowToolTip={carrier.Name == null || carrier.Transform == null || carrier.Name.length == 0 || carrier.Transform.length == 0 || allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) > -1}
                ConfirmToolTipContent={<>
                    {carrier.Name == null || carrier.Name.length == 0 ? <p> {CrossMark} A Name is required. </p> : null}
                    {carrier.Transform == null || carrier.Transform.length == 0 ? <p> {CrossMark} A Transform is required. </p> : null}
                    {allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) > -1 ? <p> {CrossMark} The Name has to be unique. </p> : null}
                </>}
                ConfirmBtnClass={'btn-success'} CallBack={(c, b) => {
                    if (showModal == 'New' && c)
                        dispatch(CellCarrierSlice.DBAction({ verb: 'POST', record: carrier }))
                    if (showModal == 'Edit' && c)
                        dispatch(CellCarrierSlice.DBAction({ verb: 'PATCH', record: carrier }))
                    if (showModal == 'Edit' && b && !c)
                        dispatch(CellCarrierSlice.DBAction({ verb: 'DELETE', record: carrier }))

                    setShowModal('Hide');

                }}
            >
                <div className="row">
                    <div className="col">
                        <Input<ICellCarrier> Record={carrier} Field={'Name'} Label={'Name'}
                            Valid={() => allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) < 0 && carrier.Name != null && carrier.Name.length > 0}
                            Setter={(record) => setCarrier(record)} />
                        <Input<ICellCarrier> Record={carrier} Field={'Transform'} Label={'Transform'} Help={'\'{0}\' will be replaced with the users Phone number.'}
                            Valid={() => carrier.Transform != null && carrier.Transform.length > 0}
                        Setter={(record) => setCarrier(record)} />
                    </div>
                </div>
            </Modal>
        </>)
}

export default ByCellCarrier;