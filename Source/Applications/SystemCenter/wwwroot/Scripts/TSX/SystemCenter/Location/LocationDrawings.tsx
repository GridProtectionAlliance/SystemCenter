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
//
//******************************************************************************************************




import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';
import Table from '@gpa-gemstone/react-table';
import { useAppSelector, useAppDispatch } from '../hooks';
import { LocationDrawingSlice } from '../Store/Store';
import { Input } from '@gpa-gemstone/react-forms';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';


const LocationDrawingsWindow = (props: { Location: OpenXDA.Types.Location }) => {
    const dispatch = useAppDispatch();

    const links: SystemCenter.Types.LocationDrawing[] = useAppSelector(LocationDrawingSlice.Data);
    const status: Application.Types.Status = useAppSelector(LocationDrawingSlice.Status);
    const sortKey = useAppSelector(LocationDrawingSlice.SortField);
    const ascending: boolean = useAppSelector(LocationDrawingSlice.Ascending);
    const parentID: number = useAppSelector(LocationDrawingSlice.ParentID) as number;
    const emptyRecord: SystemCenter.Types.LocationDrawing = { ID: 0, LocationID: 0, Name: '', Link: '', Description: '' };
    const [record, setRecord] = React.useState<SystemCenter.Types.LocationDrawing>(emptyRecord);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID !== props.Location.ID)
            dispatch(LocationDrawingSlice.Fetch(props.Location.ID));

        return function () {
        }
    }, [dispatch, status, props.Location.ID]);

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Substation Drawings:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' }}>
                    <Table<SystemCenter.Types.LocationDrawing>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                            { key: 'Link', field: 'Link', label: 'Link', headerStyle: { width: '30%' }, rowStyle: { width: '30%' }, content: (item, key, style) => <a href={item[key] as string} target='_blank'>{item[key]}</a> },
                            { key: 'Description', field: 'Description', label: 'Description', headerStyle: { width: 'calc(30%)' }, rowStyle: { width: '30%' } },
                            {
                                key: 'EditDelete',
                                label: '',
                                headerStyle: { width: 300 },
                                rowStyle: { width: 300 },
                                content: (item, key, style) =>
                                    <span>
                                        <button title='Edit Link.' className="btn" data-toggle="modal" data-target="#exampleModal" onClick={(e) => { setRecord(item) }}>{Pencil}</button>
                                        <button title='Delete Link.' className="btn" onClick={(e) => { dispatch(LocationDrawingSlice.DBAction({ verb: 'DELETE', record: item })); }}>{TrashCan}</button>
                                    </span>
                            }

                        ]}
                        tableClass="table table-hover"
                        data={links}
                        sortKey={sortKey}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey === "EditDelete")
                                return;
                            dispatch(LocationDrawingSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                        }}
                        onClick={data => { }}
                        selected={() => false}
                    />

                </div>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#exampleModal" onClick={() => setRecord({ ...emptyRecord, LocationID: props.Location.ID })}>Add Drawing</button>
            </div>

            <div className="modal" id="exampleModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new list item</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Name'} Feedback={'Name must be set and be less than 200 characters.'} Valid={() => record.Name != null && record.Name.length > 0 && record.Name.length <= 200} Setter={(r) => setRecord(r)} />
                            <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Link'} Feedback={'Link must be set.'} Valid={() => (record.Link != null && record.Link.length > 0)} Setter={(r) => setRecord(r)} />
                            <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Description'} Type='text' Valid={() => true} Setter={(r) => setRecord(r)} />
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