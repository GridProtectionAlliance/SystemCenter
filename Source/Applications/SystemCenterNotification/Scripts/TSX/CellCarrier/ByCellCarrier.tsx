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

import * as React from 'react';
import { LoadingScreen, Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive'
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { Table, Column } from '@gpa-gemstone/react-table';
import moment from 'moment';
import { ICellCarrier } from '../global';
import { CellCarrierSlice } from '../Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Input } from '@gpa-gemstone/react-forms';
import { castArray } from 'lodash';


declare var homePath;
declare var version;

const emptyCarrier = { Name: '', Transform: '', ID: 0 };
const searchFields: Search.IField<ICellCarrier>[] = [
    { key: "Name", label: "Name", type: "string", isPivotField: false },
    { key: "Transform", label: "Transform", type: "string", isPivotField: false },
];

interface IProps {}

const ByCellCarrier = (props: IProps) => {
    const dispatch = useAppDispatch();

    const searchStatus: Application.Types.Status = useAppSelector(CellCarrierSlice.SearchStatus);
    const status: Application.Types.Status = useAppSelector(CellCarrierSlice.Status);
    const data: ICellCarrier[] = useAppSelector(CellCarrierSlice.SearchResults);
    const allData: ICellCarrier[] = useAppSelector(CellCarrierSlice.Data);
    const sortField = useAppSelector(CellCarrierSlice.SortField);
    const asc = useAppSelector(CellCarrierSlice.Ascending);
    const filters = useAppSelector(CellCarrierSlice.SearchFilters);
    const [showModal, setShowModal] = React.useState<'New' | 'Edit' | 'Hide'>('Hide');
    const [carrier, setCarrier] = React.useState<ICellCarrier>(emptyCarrier);


    React.useEffect(() => {
        if (searchStatus == 'unintiated' || searchStatus == 'changed')
            dispatch(CellCarrierSlice.DBSearch({ filter: filters, sortField, ascending: asc }));
    }, [searchStatus])

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(CellCarrierSlice.Fetch());
    }, [status])

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
                    <SearchBar<ICellCarrier> CollumnList={searchFields}
                        SetFilter={(flds) => dispatch(CellCarrierSlice.DBSearch({ filter: flds }))}
                        Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                        ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Cell Carrier(s)'}
                    >
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); setCarrier(emptyCarrier); setShowModal('New'); }}>
                                        Add Cell Carrier
                                    </button>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
            </div>

            <div className='row' style={{ flex: 1, overflow: 'hidden' }}>
                <div className='col-12' style={{ height: '100%', overflow: 'hidden' }}>
                    <Table<ICellCarrier>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colKey === null) return;
                            dispatch(CellCarrierSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        OnClick={(item) => { setCarrier(item.row); setShowModal('Edit'); }}
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
                        <Column<ICellCarrier>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<ICellCarrier>
                            Key={'Transform'}
                            AllowSort={true}
                            Field={'Transform'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Transform
                        </Column>
                    </Table>
                </div>
            </div>

            <Modal Show={showModal != 'Hide'} ShowCancel={showModal == 'Edit'} CancelText={'Delete'} ShowX={true} Size='lg' Title={showModal == 'Edit' ? `Edit ${carrier.Name}` : 'Add New Carrier'} ConfirmText={showModal == 'Edit' ? 'Save' : 'Add'}
                DisableConfirm={carrier.Name == null || carrier.Transform == null || carrier.Name.length == 0 || carrier.Transform.length == 0 || carrier.Name.length > 200 || carrier.Transform.length > 200 || allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) > -1}
                ConfirmShowToolTip={carrier.Name == null || carrier.Transform == null || carrier.Name.length == 0 || carrier.Transform.length == 0 || carrier.Name.length > 200 || carrier.Transform.length > 200 || allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) > -1}
                ConfirmToolTipContent={<>
                    {carrier.Name == null || carrier.Name.length == 0  ? <p> {CrossMark} A Name is required. </p> : null}
                    {carrier.Name !== null && carrier.Name.length > 200 ? <p>{CrossMark} Name must not exceed 200 characters.</p> : null}
                    {carrier.Transform == null || carrier.Transform.length == 0  ? <p> {CrossMark} A Transform is required. </p> : null}
                    {carrier.Transform !== null && carrier.Transform.length > 200 ? <p>{CrossMark} Transform must not exceed 200 characters.</p> : null}
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
                <form>
                    <Input<ICellCarrier> Record={carrier} Field={'Name'} Label={'Name'}
                        Valid={() => 
                            (allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) < 0)
                            && (carrier.Name != null)
                            && (carrier.Name.length > 0)
                            && (carrier.Name.length <= 200)
                        }
                        Setter={(record) => setCarrier(record)} />
                    <Input<ICellCarrier> Record={carrier} Field={'Transform'} Label={'Transform'} Help={"The Gateway Domain of the specified carrier to send email as SMS or MMS. {0} is substituted with the user's phone number."}
                        Valid={() => carrier.Transform != null && carrier.Transform.length > 0}
                    Setter={(record) => setCarrier(record)} />
                </form>
            </Modal>
        </div>)
}

export default ByCellCarrier;