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
import { LoadingScreen, Modal, Search, SearchBar, GenericController } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Application } from '@gpa-gemstone/application-typings';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ICellCarrier } from '../global';
import { CellCarrierSlice } from '../Store';
import { Input } from '@gpa-gemstone/react-forms';


declare var homePath;
declare var version;

const emptyCarrier = { Name: '', Transform: '', ID: 0 };
const searchFields: Search.IField<ICellCarrier>[] = [
    { key: "Name", label: "Name", type: "string", isPivotField: false },
    { key: "Transform", label: "Transform", type: "string", isPivotField: false },
];

interface IProps {}

const ByCellCarrier = (props: IProps) => {
    const [searchStatus, setSearchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [fetchStatus, setFetchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [data, setData] = React.useState<ICellCarrier[]>([]);
    const [allData, setAllData] = React.useState<ICellCarrier[]>([]);
    const [sortField, setSortField] = React.useState<keyof ICellCarrier>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [filters, setFilters] = React.useState<Search.IFilter<ICellCarrier>[]>([]);
    const [showModal, setShowModal] = React.useState<'New' | 'Edit' | 'Hide'>('Hide');
    const [carrier, setCarrier] = React.useState<ICellCarrier>(emptyCarrier);
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);

    const cellCarrierController = React.useMemo(() => new GenericController<ICellCarrier>(`${homePath}api/OpenXDA/CellCarrier`, "Name", true),[])

    React.useEffect(() => {
        setStatus('uninitiated')
        const h = cellCarrierController.PagedSearch(filters, sortField, ascending, page);
        h.done((d) => {
            setData(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            setStatus('idle');
        })
        h.fail(() => setStatus('error'))
        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [page, filters, sortField, ascending, refreshTrigger, cellCarrierController.PagedSearch])

    React.useEffect(() => {
        setFetchStatus('uninitiated')
        const h = cellCarrierController.Fetch();
        h.done((d) => {
            setAllData(d)
            setFetchStatus('idle')
        })
        h.fail(() => setStatus('error'))
        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [refreshTrigger, cellCarrierController.Fetch])

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit', padding: 0 }}>
            <LoadingScreen Show={status === 'loading'} />
            <div className="row">
                <div className="col">
                    <SearchBar<ICellCarrier> CollumnList={searchFields}
                        SetFilter={setFilters}
                        Direction={'left'} defaultCollumn={{ key: 'Name', label: 'Name', type: 'string', isPivotField: false }} Width={'50%'} Label={'Search'}
                        ShowLoading={searchStatus === 'loading'} ResultNote={searchStatus === 'error' ? 'Could not complete Search' : `Displaying Cell Carrier(s) ${totalRecords > 0 ? recordsPerPage * page + 1 : 0}-${recordsPerPage * page + data.length} out of ${totalRecords}`}
                    >
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <button className="btn btn-info btn-block" onClick={(event) => { event.preventDefault(); setCarrier(emptyCarrier); setShowModal('New'); }}>
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
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortField)
                                setAscending((val) => !val);
                            else {
                                setSortField(d.colKey as keyof ICellCarrier)
                            }
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
            <div className="row">
                <div className="col">
                    <Paging
                        SetPage={(p) => setPage(p - 1)}
                        Current={page + 1}
                        Total={totalPages}
                    />
                </div>
            </div>

            <Modal Show={showModal != 'Hide'} ShowCancel={showModal == 'Edit'} CancelText={'Delete'} ShowX={true} Size='lg' Title={showModal == 'Edit' ? `Edit ${carrier.Name}` : 'Add New Carrier'} ConfirmText={showModal == 'Edit' ? 'Save' : 'Add'}
                DisableConfirm={carrier.Name == null || carrier.Transform == null || carrier.Name.length == 0 || carrier.Transform.length == 0 || carrier.Name.length > 200 || carrier.Transform.length > 200 || allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) > -1}
                ConfirmShowToolTip={carrier.Name == null || carrier.Transform == null || carrier.Name.length == 0 || carrier.Transform.length == 0 || carrier.Name.length > 200 || carrier.Transform.length > 200 || allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) > -1}
                ConfirmToolTipContent={<>
                    {carrier.Name == null || carrier.Name.length == 0 ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> A Name is required. </p> : null}
                    {carrier.Name !== null && carrier.Name.length > 200 ? <p><ReactIcons.CrossMark Color="var(--danger)" /> Name must not exceed 200 characters.</p> : null}
                    {carrier.Transform == null || carrier.Transform.length == 0 ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> A Transform is required. </p> : null}
                    {carrier.Transform !== null && carrier.Transform.length > 200 ? <p><ReactIcons.CrossMark Color="var(--danger)" /> Transform must not exceed 200 characters.</p> : null}
                    {allData.findIndex(c => c.Name == carrier.Name && c.ID != carrier.ID) > -1 ? <p> <ReactIcons.CrossMark Color="var(--danger)" /> Name must be unique. </p> : null}
                </>}
                ConfirmBtnClass={'btn-primary'} CallBack={(c, b) => {
                    if (showModal == 'New' && c)
                        cellCarrierController.DBAction('POST', carrier).then(() => setRefreshTrigger((val) => !val));
                    if (showModal == 'Edit' && c)
                        cellCarrierController.DBAction('PATCH', carrier).then(() => setRefreshTrigger((val) => !val));
                    if (showModal == 'Edit' && b && !c)
                        cellCarrierController.DBAction('DELETE', carrier).then(() => setRefreshTrigger((val) => !val));

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
                    <Input<ICellCarrier> Record={carrier} Field={'Transform'} Label={'Transform'} Help={"The Gateway Domain of the specified carrier to send email as SMS or MMS, e.g., '{0}@txt.att.net'. {0} is substituted with the user's phone number."}
                        Valid={() => carrier.Transform != null && carrier.Transform.length > 0}
                    Setter={(record) => setCarrier(record)} />
                </form>
            </Modal>
        </div>)
}

export default ByCellCarrier;