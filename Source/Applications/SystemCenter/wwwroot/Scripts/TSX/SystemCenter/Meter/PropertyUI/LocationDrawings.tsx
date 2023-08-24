//******************************************************************************************************
//  LocationDrawings.tsx - Gbtc
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
//  08/24/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { LocationDrawingSlice } from '../../Store/Store';
import { Modal, ToolTip } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface IProps {
    Location: OpenXDA.Types.Location,
    Drawings: SystemCenter.Types.LocationDrawing[],
    ShowDrawings: boolean,
    SetShowDrawings: (show: boolean) => void,
    Hover: 'none' | 'drawings',
}

const LocationDrawings = (props: IProps) => {
    const dispatch = useAppDispatch();

    const drawingSortKey = useAppSelector(LocationDrawingSlice.SortField);
    const drawingAscending = useAppSelector(LocationDrawingSlice.Ascending);

    return (
        <div>
            <Modal Show={props.ShowDrawings} Title={'Drawings'} ShowX={true} Size={'lg'} CallBack={() => props.SetShowDrawings(false)} ShowCancel={false} ConfirmText={'Done'}>
                <div className="row">
                    <div className="col" style={{ width: '100%' }}>
                        <Table<SystemCenter.Types.LocationDrawing>
                            cols={[
                                { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Description', field: 'Description', label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            ]}
                        tableClass="table table-hover"
                        data={props.Drawings}
                            sortKey={drawingSortKey}
                            ascending={drawingAscending}
                            onSort={(d) => {
                                dispatch(LocationDrawingSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                            }}
                            onClick={(d) => {
                                window.open(d.row.Link, '_blank');
                            }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        />
                    </div>
                </div>
            </Modal>

            <ToolTip Show={props.Hover === 'drawings' && (props.Location == null || props.Location.ID == null || props.Location.ID == 0 || props.Drawings.length == 0)} Theme={'dark'} Position={'top'} Target={'drawings'} Zindex={9999}>
                <p>No drawings associated with this substation.</p>
            </ToolTip>
        </div>
    )
}

export default LocationDrawings;
