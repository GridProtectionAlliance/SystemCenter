//******************************************************************************************************
//  LocationDrawings.tsx - Gbtc
//
//  Copyright � 2023, Grid Protection Alliance.  All Rights Reserved.
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
import { BtnDropdown, Modal, ToolTip } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CreateGuid } from '@gpa-gemstone/helper-functions';

interface IProps {
    LocationID: number[];
    LocationLabels?: string[];
}

const LocationDrawings = (props: IProps) => {
    const dispatch = useAppDispatch();
    const guid = React.useRef(CreateGuid());

    const drawingData = useAppSelector(LocationDrawingSlice.Data);
    const drawingStatus = useAppSelector(LocationDrawingSlice.Status);
    const drawingParentID = useAppSelector(LocationDrawingSlice.ParentID);
    const drawingSortKey = useAppSelector(LocationDrawingSlice.SortField);
    const drawingAscending = useAppSelector(LocationDrawingSlice.Ascending);

    const [selectedLocation, setSelectedLocation] = React.useState<number>();
    const [showDrawings, setShowDrawings] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<'none' | 'drawings'>('none');

    React.useEffect(() => {
        if (props.LocationID != null)
            setSelectedLocation(null);
        if (props.LocationID.length == 1)
            setSelectedLocation(props.LocationID[0]);
    }, [props.LocationID])

    React.useEffect(() => {
        if (drawingStatus == 'unintiated' || drawingStatus == 'changed' || drawingParentID != selectedLocation )
            dispatch(LocationDrawingSlice.Fetch(selectedLocation));
    }, [drawingStatus, drawingParentID, props.LocationID]);

    function disableDropdownOption() {
        return false;
    }

    function dropdownOptions(): {Label: string; Callback: () => void; Disabled: boolean;}[] {
        if (props.LocationLabels != null) {
            const options: {
                Label: string;
                Callback: () => void;
                Disabled: boolean; }[] = [];
            for (const label of props.LocationLabels) {
                options.push({
                    Label: label,
                    Disabled: disableDropdownOption(),
                    Callback: () => {
                        if (selectedLocation != 0 && drawingData.length != 0) setShowDrawings(true)
                    }
                });
            }
            return options;
        }
        return [{Label: 'No labels given for options', Callback: () => {}, Disabled: false}];
    }

    return (
        <div>
            {props.LocationID != null && props.LocationID.length <= 1 ?
            <>
                <button
                    type="button"
                    className={"btn btn-primary" + ((selectedLocation != null || drawingData.length == 0) ? ' disabled' : '')}
                    data-tooltip={guid.current} onMouseEnter={() => setHover('drawings')} onMouseLeave={() => setHover('none')}
                    onClick={() => {
                        if (selectedLocation != 0 && drawingData.length != 0)
                            setShowDrawings(true);
                        }
                    }>Open Drawing(s)
                </button>
                <ToolTip Show={hover === 'drawings' && (props.LocationID == null || props.LocationID[0] == 0 || drawingData.length == 0)}
                    Theme={'dark'} Position={'top'} Target={guid.current} Zindex={9999}>
                    <p>No drawings associated with this substation.</p>
                </ToolTip>
            </>
            : <BtnDropdown 
                Label="Open Drawings"
                Callback={() => {
                    if (selectedLocation != 0 && drawingData.length != 0)
                        setShowDrawings(true);
                    }
                }
                Options={dropdownOptions()}
                />
            }

            <Modal Show={showDrawings} Title={'Drawings'} ShowX={true} Size={'lg'} CallBack={() => setShowDrawings(false)} ShowCancel={false} ConfirmText={'Done'}>
                <div className="row">
                    <div className="col" style={{ width: '100%' }}>
                        <ReactTable.Table<SystemCenter.Types.LocationDrawing>
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
                            <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                                Key={'Name'}
                                AllowSort={true}
                                Field={'Name'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Name
                            </ReactTable.Column>
                            <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                                Key={'Description'}
                                AllowSort={true}
                                Field={'Description'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Description
                            </ReactTable.Column>
                            <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                                Key={'Number'}
                                AllowSort={true}
                                Field={'Number'}
                                HeaderStyle={{ width: '15%' }}
                                RowStyle={{ width: '15%' }}
                            > Number
                            </ReactTable.Column>
                            <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                                Key={'Category'}
                                AllowSort={true}
                                Field={'Category'}
                                HeaderStyle={{ width: '15%' }}
                                RowStyle={{ width: '15%' }}
                            > Category
                            </ReactTable.Column>
                        </ReactTable.Table>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default LocationDrawings;
