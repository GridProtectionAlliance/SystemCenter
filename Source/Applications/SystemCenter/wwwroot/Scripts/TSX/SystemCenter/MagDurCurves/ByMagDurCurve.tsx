//******************************************************************************************************
//  ByMagDurCurve.tsx - Gbtc
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
//  03/16/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal, Warning } from '@gpa-gemstone/react-interactive';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MagDurCurveSlice } from '../Store/Store';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import CurveForm from './CurveForm';


declare var homePath: string;
const emptyCurve: OpenXDA.Types.MagDurCurve = {
    ID: 0,
    Name: 'Curve',
    Area: '0.00001 0, 1000 0, 1000 1, 0.00001 1, 0.00001 0',
    Color: ''
};

const ByMagDurCurve: Application.Types.iByComponent = (props) => {
    let dispatch = useAppDispatch();

    const cState = useAppSelector(MagDurCurveSlice.SearchStatus);
    const data = useAppSelector(MagDurCurveSlice.SearchResults);

    const sortKey = useAppSelector(MagDurCurveSlice.SortField);
    const filters = useAppSelector(MagDurCurveSlice.SearchFilters);
    const ascending = useAppSelector(MagDurCurveSlice.Ascending);

    const [curve, setCurve] = React.useState<OpenXDA.Types.MagDurCurve>(emptyCurve);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [newEdit, setNewEdit] = React.useState<Application.Types.NewEdit>('Edit');

    React.useEffect(() => {
        if (cState == 'unintiated' || cState == 'changed')
            dispatch(MagDurCurveSlice.DBSearch({ filter: filters, sortField: sortKey, ascending: ascending }));
    }, [cState]);

    function handleSelect(item) {
        setCurve(item.row);
        setShowModal(true);
        setNewEdit('Edit');
    }

    const searchFields: Search.IField<OpenXDA.Types.MagDurCurve>[] = [
        { key: 'Name', isPivotField: false, label: 'Name', type: 'string' }
    ]
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<OpenXDA.Types.MagDurCurve> CollumnList={searchFields}
                SetFilter={(flds) => dispatch(MagDurCurveSlice.DBSearch({ ascending, filter: flds }))}
                Direction={'left'}
                defaultCollumn={{ key: 'Name', isPivotField: false, label: 'Name', type: 'string' }}
                Width={'50%'} Label={'Search'}
                StorageID="MagDurCurvesFilter"
                ShowLoading={cState == 'loading'}
                ResultNote={cState == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Curve(s)'}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault(); setShowModal(true); }}>Add Curve</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <ReactTable.Table<OpenXDA.Types.MagDurCurve>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => dispatch(MagDurCurveSlice.Sort({ SortField: 'Name', Ascending: d.ascending }))}
                    OnClick={handleSelect}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<OpenXDA.Types.MagDurCurve>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Show={showModal} Title={newEdit == 'Edit' ? 'Edit ' + (curve?.Name ?? 'MagDur Curve') : 'Add New MagDur Curve'} Size={'xlg'} CallBack={(c,b) => {
                setShowModal(false);
                if (!c && b)
                    setShowDelete(true)
                if (c)
                    dispatch(MagDurCurveSlice.DBAction({ verb: curve.ID == 0 ? 'POST' : 'PATCH', record: curve }));
                if (c || !b)
                    setCurve(emptyCurve);
            }}
                ShowCancel={curve.ID != 0}
                ShowX={true}
                CancelText={'Delete'}
                DisableConfirm={errors.length > 0}
                ConfirmText={'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}> {CrossMark} {t}</p>)} >
                <div className="row">
                    <CurveForm Curve={curve} stateSetter={setCurve} setErrors={setErrors} />
                </div>
            </Modal>
            <Warning Message={'This will permanently delete the Curve and cannot be undone.'} Show={showDelete} Title={'Delete ' + (curve?.Name ?? 'MagDur Curve')}
                CallBack={(c) => { if (c) dispatch(MagDurCurveSlice.DBAction({ record: curve, verb: 'DELETE' })); setShowDelete(false); setCurve(emptyCurve); }}
            />

        </div>
    )
}

export default ByMagDurCurve;

