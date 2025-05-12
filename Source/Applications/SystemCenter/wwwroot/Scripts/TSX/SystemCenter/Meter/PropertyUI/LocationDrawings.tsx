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
import { SystemCenter } from '@gpa-gemstone/application-typings'
import { LocationDrawingSlice } from '../../Store/Store';
import { Modal } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { Table, Column } from '@gpa-gemstone/react-table';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CreateGuid } from '@gpa-gemstone/helper-functions';

interface IProps {
    LocationID: number | null
}

const LocationDrawings = (props: IProps) => {
    const dispatch = useAppDispatch();
    const guid = React.useRef(CreateGuid());

    const drawingData = useAppSelector(LocationDrawingSlice.Data);
    const drawingStatus = useAppSelector(LocationDrawingSlice.Status);
    const drawingParentID = useAppSelector(LocationDrawingSlice.ParentID);
    const drawingSortKey = useAppSelector(LocationDrawingSlice.SortField);
    const drawingAscending = useAppSelector(LocationDrawingSlice.Ascending);

    const [showDrawings, setShowDrawings] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<'none' | 'drawings'>('none');

    React.useEffect(() => {
        if (drawingStatus == 'unintiated' || drawingStatus == 'changed' || drawingParentID != props.LocationID)
            dispatch(LocationDrawingSlice.Fetch(props.LocationID));
    }, [drawingStatus, drawingParentID, props.LocationID]);

    return (
        <div>
            <button
                type="button"
                className={"btn btn-info" + ((props.LocationID == null || props.LocationID == 0 || drawingData.length == 0) ? ' disabled' : '')}
                data-tooltip={guid.current} onMouseEnter={() => setHover('drawings')} onMouseLeave={() => setHover('none')}
                onClick={() => {
                    if (props.LocationID != null && props.LocationID != 0 && drawingData.length != 0)
                        setShowDrawings(true);
                }}>Open Drawing(s)</button>

            <Modal Show={showDrawings} Title={'Drawings'} ShowX={true} Size={'lg'} CallBack={() => setShowDrawings(false)} ShowCancel={false} ShowConfirm={false}>
                <div className="row">
                    <div className="col" style={{ width: '100%' }}>
                        <Table<SystemCenter.Types.LocationDrawing>
                            TableClass="table table-hover"
                            Data={drawingData}
                            SortKey={drawingSortKey}
                            Ascending={drawingAscending}
                            OnSort={(d) => {
                                dispatch(LocationDrawingSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                            }}
                            OnClick={(d) => window.open(d.row.Link, '_blank')}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<SystemCenter.Types.LocationDrawing>
                                Key={'Name'}
                                AllowSort={true}
                                Field={'Name'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Name
                            </Column>
                            <Column<SystemCenter.Types.LocationDrawing>
                                Key={'Description'}
                                AllowSort={true}
                                Field={'Description'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Description
                            </Column>
                            <Column<SystemCenter.Types.LocationDrawing>
                                Key={'Number'}
                                AllowSort={true}
                                Field={'Number'}
                                HeaderStyle={{ width: '15%' }}
                                RowStyle={{ width: '15%' }}
                            > Number
                            </Column>
                            <Column<SystemCenter.Types.LocationDrawing>
                                Key={'Category'}
                                AllowSort={true}
                                Field={'Category'}
                                HeaderStyle={{ width: '15%' }}
                                RowStyle={{ width: '15%' }}
                            > Category
                            </Column>
                        </Table>
                    </div>
                </div>
            </Modal>

            <ToolTip Show={hover === 'drawings' && (props.LocationID == null || props.LocationID == 0 || drawingData.length == 0)}
                Position={'top'} Target={guid.current} Zindex={9999}>
                <p>No drawings associated with this substation.</p>
            </ToolTip>
        </div>
    )
}

export default LocationDrawings;
