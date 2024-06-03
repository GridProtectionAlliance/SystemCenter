//******************************************************************************************************
//  LocationDrawings.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  06/17/2021 - Billy Ernest
//       Generated original version of source code.
//  09|25|2023 - Ariana Armstrong 
//       Modified original source code; Incorporated 'Number' and 'Category' fields into 
//       'Substation Drawings' table.
//******************************************************************************************************




import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';
import { ReactTable } from '@gpa-gemstone/react-table';
import { useAppSelector, useAppDispatch } from '../hooks';
import { LocationDrawingSlice } from '../Store/Store';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { SelectRoles } from '../Store/UserSettings';
import { ToolTip } from '@gpa-gemstone/react-interactive';


const LocationDrawingsWindow = (props: { Location: OpenXDA.Types.Location }) => {
    const dispatch = useAppDispatch();

    const links: SystemCenter.Types.LocationDrawing[] = useAppSelector(LocationDrawingSlice.Data);
    const status: Application.Types.Status = useAppSelector(LocationDrawingSlice.Status);
    const sortKey = useAppSelector(LocationDrawingSlice.SortField);
    const ascending: boolean = useAppSelector(LocationDrawingSlice.Ascending);
    const parentID: number = useAppSelector(LocationDrawingSlice.ParentID) as number;
    const emptyRecord: SystemCenter.Types.LocationDrawing = { ID: 0, LocationID: 0, Name: '', Link: '', Description: '', Number: '', Category: '' };
    const [record, setRecord] = React.useState<SystemCenter.Types.LocationDrawing>(emptyRecord);
    const [category, setCategory] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID !== props.Location.ID)
            dispatch(LocationDrawingSlice.Fetch(props.Location.ID));

        return function () {
        }
    }, [dispatch, status, props.Location.ID]);

    React.useEffect(() => {
        let categoryHandle = getValueList("Category", setCategory);

        return () => {
            if (categoryHandle != null && categoryHandle.abort != null) categoryHandle.abort();
        }
    }, [])

    function getValueList(listName: string, setter: (value: Array<SystemCenter.Types.ValueListItem>) => void): JQuery.jqXHR<Array<SystemCenter.Types.ValueListItem>> {
        let h = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${listName}`,
            contentType: "application/json; charset=utf-8",
            dataType: `json`,
            cache: false,
            async: true
        });
        h.done((dCat: Array<SystemCenter.Types.ValueListItem>) => {
            setter(dCat);

        });
        return h;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    function valid(field: keyof (SystemCenter.Types.LocationDrawing)): boolean {
        if (field == 'Name')
            return record.Name != null && record.Name.length > 0 && record.Name.length <= 200;
        else if (field == 'Link')
            return record.Link != null && record.Link.length > 0;
        else if (field == 'Number')
            return record.Number == null || record.Number.length <=50;
        return true;
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Substation Drawings:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <ReactTable.Table<SystemCenter.Types.LocationDrawing>
                        TableClass="table table-hover"
                        Data={links}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === "EditDelete") return;
                            dispatch(LocationDrawingSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                            Key={'Link'}
                            AllowSort={true}
                            Field={'Link'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                            Content={({ item, key }) => <a href={item[key] as string} target='_blank'>{item[key]}</a> }
                        > Link
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
                        <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                            Key={'EditDelete'}
                            AllowSort={false}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                            Content={({ item }) =>
                                <span>
                                    <button title='Edit Link' className={"btn" + (!hasPermissions() ? ' disabled' : '')} data-toggle={"modal" + (!hasPermissions() ? ' disabled' : '')} data-target="#exampleModal" onClick={(e) => {setRecord(item) }}>{Pencil}</button>
                                    <button title='Delete Link' className={"btn" + (!hasPermissions() ? ' disabled' : '')} onClick={(e) => { if (hasPermissions()) dispatch(LocationDrawingSlice.DBAction({ verb: 'DELETE', record: item })); }}>{TrashCan}</button>
                                </span>
                            }
                        > <p></p>
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <div className="card-footer">
                <button className={"btn btn-primary pull-right" + (!hasPermissions() ? ' disabled' : '')} data-toggle={"modal" + (!hasPermissions() ? ' disabled' : '')} data-target="#exampleModal" data-tooltip='AddDrawing' onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')}
                    onClick={() => { setRecord({ ...emptyRecord, LocationID: props.Location.ID }) }}>Add Drawing</button>
            </div>
            <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"AddDrawing"}>
                <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
            </ToolTip>
            <div className="modal" id="exampleModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Drawing</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={valid} Setter={(r) => setRecord(r)} />
                            <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Link'} Feedback={'A Link is required.'} Valid={valid} Setter={(r) => setRecord(r)} />
                            <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Description'} Valid={valid} Setter={(r) => setRecord(r)} />
                            <Select<SystemCenter.Types.LocationDrawing> Record={record} Field={'Category'} Options={category.map(item => { return { Value: item.Value, Label: item.AltValue ?? item.Value } })} Label={'Category'} Setter={(r) => setRecord(r)} />
                            <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Number'} Feedback={'Number must be less than 50 characters.'} Valid={valid} AllowNull={true} Setter={(r) => setRecord(r)} />

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => dispatch(LocationDrawingSlice.DBAction({ verb: 'PATCH', record }))}>Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

        </div>

    );

}

export default LocationDrawingsWindow;