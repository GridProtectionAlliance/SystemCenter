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
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { LocationDrawingSlice } from '../../Store/Store';
import { BtnDropdown, LoadingIcon, Modal, ToolTip } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CreateGuid } from '@gpa-gemstone/helper-functions';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';

interface IProps {
    Locations: OpenXDA.Types.Location[];
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
    const [showDropdown, setShowDropdown] = React.useState<boolean>();
    const [disableButton, setDisableButton] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<'none' | 'drawings'>('none');

    React.useEffect(() => {
        if (drawingStatus == 'unintiated' || drawingStatus == 'changed' || drawingParentID != selectedLocation)
            dispatch(LocationDrawingSlice.Fetch(selectedLocation));
    }, [props.Locations, drawingStatus, drawingParentID, selectedLocation]);

    React.useEffect(() => {
        let e = [];

        if (props.Locations.length == 0
            || (props.Locations[0].Alias == ""
                && props.Locations[0].Description == ""
                && props.Locations[0].ID == 0
                && props.Locations[0].Latitude == null
                && props.Locations[0].LocationKey == ""
                && props.Locations[0].Longitude == null
                && props.Locations[0].Name == ""
            ))
            e.push('No location selected.');
        else if (drawingData.length == 0
            && props.Locations.length != 0)
            e.push('No drawings associated with selected location.');

        setErrors(e);
    }, [props.Locations, drawingData]);

    React.useEffect(() => {
        setDisableButton(errors.length > 0);
    }, [errors]);

    React.useEffect(() => {
        setSelectedLocation(props.Locations[0].ID);
        setShowDropdown(props.Locations.length > 1);
    }, [props.Locations]);

    function dropdownOptions() {
        const options: { Label: string; Callback: () => void; Disabled: boolean; }[] = [];
        const labels: string[] = props.Locations.map(loc => loc.Name);
        labels.forEach((label, index) => {
            options.push({
                Label: label,
                Disabled: false,
                Callback: () => {
                    setSelectedLocation(props.Locations[index].ID);
                    setShowDrawings(true);
                }
            });
        });
        return options;
    }

    return (
        <div>
            {showDropdown ?
                <BtnDropdown
                    Label={"Open Drawings " + props.Locations[0].Name}
                    Callback={() => {
                        setSelectedLocation(props.Locations[0].ID);
                        setShowDrawings(true);
                    }}
                    Options={dropdownOptions()}
                />
                : <button
                    type="button"
                    className={disableButton ? "btn btn-primary disabled" : "btn btn-primary"}
                    data-tooltip={guid.current}
                    onMouseEnter={() => setHover('drawings')}
                    onMouseLeave={() => setHover('none')}
                    onClick={() => {
                        if (!disableButton) {
                            setSelectedLocation(props.Locations[0].ID);
                            setShowDrawings(true);
                        }
                    }}
                >Open {props.Locations[0].Name} Drawings
                </button>
            }
            <ToolTip
                Show={hover === 'drawings' && (disableButton)}
                Theme={'dark'} Position={'top'} Target={guid.current} Zindex={9999}>
                {errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
            </ToolTip>
            <Modal
                Show={showDrawings}
                Title={'Drawings'}
                ShowX={true} Size={'lg'}
                CallBack={() => setShowDrawings(false)}
                ShowCancel={false}
                ConfirmText={'Done'}>
                <div className="row">
                    <div className="col" style={{ width: '100%' }}>
                        <LoadingIcon Show={drawingStatus == 'loading'} />
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
                                Key={'Link'}
                                AllowSort={true}
                                Field={'Link'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, key }) => <a href={item[key] as string} target='_blank'>{item[key]}</a>}
                            > Link
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
