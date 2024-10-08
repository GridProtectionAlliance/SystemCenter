//******************************************************************************************************
//  ByMeter.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/22/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { Search, Modal, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { DefaultSearch } from '@gpa-gemstone/common-pages';
import { ByMeterSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useHistory } from "react-router-dom";
import NewTabEdit from '../CommonComponents/NewTabEdit';
import { Paging } from '@gpa-gemstone/react-table';

declare var homePath: string;

const ByMeter: Application.Types.iByComponent = (props) => {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const data = useAppSelector(ByMeterSlice.SearchResults);
    const ascending = useAppSelector(ByMeterSlice.Ascending);
    const sortKey = useAppSelector(ByMeterSlice.SortField);

    const cState = useAppSelector(ByMeterSlice.PagedStatus);
    const allPages = useAppSelector(ByMeterSlice.TotalPages);
    const currentPage = useAppSelector(ByMeterSlice.CurrentPage);
    const [page, setPage] = React.useState<number>(currentPage);

    const [showEXTModal, setShowExtModal] = React.useState<boolean>(false);
    const extDbUpdateAll = React.useRef<() => (() => void)>(undefined);

    React.useEffect(() => {
        dispatch(ByMeterSlice.PagedSearch({ filter: [], sortField: sortKey, ascending, page }));
    }, [sortKey, ascending, page]);

    React.useEffect(() => {
        if (cState === 'unintiated' || cState === 'changed')
            dispatch(ByMeterSlice.PagedSearch({ filter: [], sortField: sortKey, ascending, page }));
    }, [cState]);

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID })
    }
    function goNewMeterWizard() {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=NewMeterWizard' })
    }

    function getAdditionalFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/Meter/FieldName/0`,
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
            let ordered = _.orderBy(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<SystemCenter.Types.DetailedMeter>
            )), ['label'], ["asc"]);
            setFields(ordered)
        });

        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

    function getEnum(setOptions, field) {
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

        handle.done(d => setOptions(d.map(item => ({ Value: item.ID, Label: item.Value }))))
        return () => {
            if (handle != null && handle.abort == null)
                handle.abort();
        }
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <LoadingScreen Show={cState === 'loading'} />
            <div className="container-fluid d-flex h-100 flex-column">
                <div className="row">
                    <DefaultSearch.Meter Slice={ByMeterSlice} GetEnum={getEnum} GetAddlFields={getAdditionalFields} StorageID="MetersFilter">
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Wizards:</legend>
                                <button className="btn btn-info btn-block" data-tooltip onClick={goNewMeterWizard} hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0}>New Meter</button>
                            </fieldset>
                        </li>
                        <li className="nav-item" style={{ width: '20%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <div className="form-group">
                                        <button className="btn btn-info btn-block" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0}
                                            onClick={(event) => { event.preventDefault(); setShowExtModal(true); }}>External Database</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                    </DefaultSearch.Meter>
                </div>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <ReactTable.Table<SystemCenter.Types.DetailedMeter>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortKey)
                                dispatch(ByMeterSlice.Sort({ SortField: sortKey, Ascending: !ascending }));
                            else {
                                dispatch(ByMeterSlice.Sort({ SortField: d.colField as keyof SystemCenter.Types.DetailedMeter, Ascending: true }));
                            }
                        }}
                        OnClick={handleSelect}
                        TableStyle={{
                            padding: 0, width: '100%', height: '100%',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 0
                        }}
                        TheadStyle={{ fontSize: 'auto', tableLayout: 'fixed', display: 'table', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<SystemCenter.Types.DetailedMeter>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedMeter>
                            Key={'AssetKey'}
                            AllowSort={true}
                            Field={'AssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Key
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedMeter>
                            Key={'Location'}
                            AllowSort={true}
                            Field={'Location'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Substation
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedMeter>
                            Key={'MappedAssets'}
                            AllowSort={true}
                            Field={'MappedAssets'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Assets
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedMeter>
                            Key={'Make'}
                            AllowSort={true}
                            Field={'Make'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Make
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedMeter>
                            Key={'Model'}
                            AllowSort={true}
                            Field={'Model'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Model
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.DetailedMeter>
                            Key={'Config'}
                            AllowSort={false}
                            HeaderStyle={{ width: '8%' }}
                            RowStyle={{ width: '8%' }}
                            Content={({ item }) => {
                                return <NewTabEdit ItemID={item.ID} PageLinkName='Meter' IDLinkName='MeterID' />
                            }}
                        >
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
                <div className="row">
                    <div className="col">
                        <Paging Current={page + 1} Total={allPages} SetPage={(p) => setPage(p - 1)} />
                    </div>
                </div>
            </div>
            <Modal Show={showEXTModal} Size={'xlg'} Title={'Meter External Database Fields'}
                ShowCancel={true} ConfirmText={'Update All'} CancelText={'Close'} CallBack={(c) => {
                    if (c && extDbUpdateAll.current !== undefined) extDbUpdateAll.current();
                    if (!c) setShowExtModal(false);
                }}>
                <ExternalDBUpdate Type='Meter' UpdateAll={extDbUpdateAll} />
            </Modal>
        </div>
    )
}

export default ByMeter;