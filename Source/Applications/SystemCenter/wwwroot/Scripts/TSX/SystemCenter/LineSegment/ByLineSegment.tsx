//******************************************************************************************************
//  ByLineSegment.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { Search, Modal, LoadingIcon, ServerErrorIcon, GenericController, SearchBar } from '@gpa-gemstone/react-interactive';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';

declare var homePath: string;

const LineSegmentController = new GenericController<OpenXDA.Types.LineSegment>(`${homePath}api/OpenXDA/ByLineSegment`, "AssetName", true);
const PagingID = 'LineSegmentPage'; 

const ByLineSegment: Application.Types.iByComponent = (props) => {
    let navigate = useNavigate();

    const [data, setData] = React.useState<OpenXDA.Types.LineSegment[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.LineSegment>('AssetName');
    const [filters, setFilters] = React.useState<Search.IFilter<OpenXDA.Types.LineSegment>[]>([]);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0});
    const [page, setPage] = React.useState<number>(0);
    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('idle');

    const [addlFieldCols, setAddlFieldCols] = React.useState<Search.IField<OpenXDA.Types.LineSegment>[]>([]);

    const [showEXTModal, setShowExtModal] = React.useState<boolean>(false);

    const extDbUpdateAll = React.useRef<() => (() => void)>(undefined);

    React.useEffect(() => {
        let storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
        if (storedInfo == null || storedInfo == 0) return; // page 0 means it's on a real page
        if (storedInfo + 1 > pageInfo.NumberOfPages) {
            storedInfo = Math.max(0, pageInfo.NumberOfPages - 1);
            localStorage.setItem(PagingID, `${storedInfo}`);
        }
        setPage(storedInfo);
    }, [pageInfo.TotalRecords]); // Make sure user is still on a real page when data is deleted or filtered out

    React.useEffect(() => {
        localStorage.setItem(PagingID, JSON.stringify(page));
    }, [page]);

    React.useEffect(() => {
        setPageStatus('loading');
        const handle = LineSegmentController.PagedSearch(filters, sortKey, ascending, page).done((result) => {
            setData(JSON.parse(result.Data as unknown as string));
            setPageInfo(result);
            setPageStatus('idle');
        }).fail(() => setPageStatus('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [filters, sortKey, ascending, page]);

    React.useEffect(() => {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/LineSegment/FieldName/0`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });

        function ConvertType(type: string) {
            if (type == 'string' || type == 'integer' || type == 'number' || type == 'datetime' || type == 'boolean')
                return { type: type }
            return {
                type: 'enum', enum: [{ Label: type, Value: type }]
            }
        }

        handle.done((d: Array<SystemCenter.Types.AdditionalFieldView>) => {
            const ordered = _.orderBy(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<OpenXDA.Types.LineSegment>
            )), ['label'], ["asc"]);
            setAddlFieldCols(ordered);
        });

        return () => { if (handle != null && handle?.abort != null) handle.abort(); };
    }, []);


    const handleSelect = React.useCallback((ID: number) => {
        navigate(`${homePath}index.cshtml?name=LineSegment&AssetID=${ID}`);
    }, []);

    const getEnum = React.useCallback((setOptions, field) => {
        let handle = null;

        if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
            return () => { };

        handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
        return () => { if (handle != null && handle.abort == null) handle.abort(); }
    }, []);

    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <SearchBar<OpenXDA.Types.LineSegment>
                CollumnList={[
                    { label: 'Name', key: 'AssetName', type: 'string', isPivotField: false },
                    { label: 'Key', key: 'AssetKey', type: 'string', isPivotField: false },
                    { label: 'Nominal Voltage (L-L kV)', key: 'VoltageKV', type: 'number', isPivotField: false },
                    { label: 'Thermal Rating', key: 'ThermalRating', type: 'number', isPivotField: false },
                    { label: 'Length', key: 'Length', type: 'number', isPivotField: false },
                    { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
                    ...addlFieldCols]}
                defaultCollumn={{ label: 'Name', key: 'AssetName', type: 'string', isPivotField: false }}
                GetEnum={getEnum} SetFilter={setFilters} Direction='left' Width='50%' Label='Search' StorageID='SegmentsFilter'
                ShowLoading={pageStatus === 'loading'}
                ResultNote={pageStatus === 'error' ?
                    'Could not complete Search' : ('Displaying  Line Segment(s) ' + (pageInfo.TotalRecords > 0 ? (pageInfo.RecordsPerPage * page + 1) : 0) + ' - ' + (pageInfo.RecordsPerPage * page + data.length)) + ' out of ' + pageInfo.TotalRecords}
            >
                <li className="nav-item" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0} style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-info btn-block" 
                                    onClick={(event) => { event.preventDefault(); setShowExtModal(true); }}>External Database</button>
                            </div>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div className="row" style={{ flex: 1, overflow: 'auto' }}>
                {
                    pageStatus === 'idle' ?
                        <Table<OpenXDA.Types.LineSegment>
                            TableClass="table table-hover"
                            Data={data}
                            SortKey={sortKey.toString()}
                            Ascending={ascending}
                            OnSort={(d) => {
                                if (d.colKey === sortKey) setAscending(a => !a);
                                else setSortKey(d.colField);
                            }}
                            TheadStyle={{ fontSize: 'smaller' }}
                            RowStyle={{ fontSize: 'smaller' }}
                            OnClick={(item) => handleSelect(item.row.ID)}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<OpenXDA.Types.LineSegment>
                                Key={'AssetName'}
                                AllowSort={true}
                                Field={'AssetName'}
                                HeaderStyle={{ width: '15%' }}
                                RowStyle={{ width: '15%' }}
                            > Name
                            </Column>
                            <Column<OpenXDA.Types.LineSegment>
                                Key={'AssetKey'}
                                AllowSort={true}
                                Field={'AssetKey'}
                                HeaderStyle={{ width: '15%' }}
                                RowStyle={{ width: '15%' }}
                            > Key
                            </Column>
                            <Column<OpenXDA.Types.LineSegment>
                                Key={'VoltageKV'}
                                AllowSort={true}
                                Field={'VoltageKV'}
                                HeaderStyle={{ width: '20%' }}
                                RowStyle={{ width: '20%' }}
                            > Nominal Voltage (L-L kV)
                            </Column>
                            <Column<OpenXDA.Types.LineSegment>
                                Key={'ThermalRating'}
                                AllowSort={true}
                                Field={'ThermalRating'}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                            > Thermal Rating
                            </Column>
                            <Column<OpenXDA.Types.LineSegment>
                                Key={'Length'}
                                AllowSort={true}
                                Field={'Length'}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                            > Length (miles)
                            </Column>
                            <Column<OpenXDA.Types.LineSegment>
                                Key={'Description'}
                                AllowSort={true}
                                Field={'Description'}
                                HeaderStyle={{ width: '30%' }}
                                RowStyle={{ width: '30%' }}
                            > Description
                            </Column>
                        </Table> : 
                        <>
                            <LoadingIcon Show={pageStatus === 'loading'} Size={40} />
                            <ServerErrorIcon Show={pageStatus === 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                        </>
                }
            </div>
            <div style={{width: '100%'}}>
                <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
            </div>
            <Modal Show={showEXTModal} Size={'xlg'} Title={'Update Line Segment External Fields'}
                ShowCancel={true} ConfirmText={'Update All'} CancelText={'Close'} CallBack={(c) => {
                    if (c && extDbUpdateAll.current !== undefined) extDbUpdateAll.current();
                    if (!c) setShowExtModal(false);
                }}>
                <ExternalDBUpdate Type={'LineSegment'} UpdateAll={extDbUpdateAll} />
            </Modal>
        </div>
    )
}

export default ByLineSegment;

