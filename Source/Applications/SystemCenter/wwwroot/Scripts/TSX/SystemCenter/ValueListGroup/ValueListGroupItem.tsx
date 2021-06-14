//******************************************************************************************************
//  CompanyMeter.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with  work for additional information regarding copyright ownership.
//  The GPA licenses  file to you under the MIT License (MIT), the "License"; you may not use 
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
//  02/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter } from '../global';
import { useSelector, useDispatch } from 'react-redux';
import { ValueListSlice } from '../Store/Store';
import { Modal } from '@gpa-gemstone/react-interactive';
import { Input } from '@gpa-gemstone/react-forms';
import ValueListForm from './ValueListForm';

export default function ValueListGroupItems(props: { Record: SystemCenter.ValueListGroup }) {
    const dispatch = useDispatch();

    const data: SystemCenter.ValueListItem[] = useSelector(ValueListSlice.Data);
    const status: SystemCenter.Status = useSelector(ValueListSlice.Status);
    const sortField: keyof SystemCenter.ValueListGroup = useSelector(ValueListSlice.SortField);
    const ascending: boolean = useSelector(ValueListSlice.Ascending);

    const emptyRecord: SystemCenter.ValueListItem = { ID: 0, GroupID: 0, Value: '', AltValue: '', SortOrder: 0 };
    const [record, setRecord] = React.useState<SystemCenter.ValueListItem>(emptyRecord);

    const [searchTextAS, setSearchTextAS] = React.useState<string>('');


    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(ValueListSlice.Fetch(props.Record.ID));

        return function () {
        }
    }, [dispatch, status]);


    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>List Items:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div style={{ width: '100%', height: window.innerHeight - 421, maxHeight: window.innerHeight - 421, padding: 0, overflowY: 'auto' }}>
                        <input className="form-control" placeholder="Search filter for select box ..." value={searchTextAS} onChange={(e) => setSearchTextAS(e.target.value)} />

                        <table className="table">
                            <thead><tr><th>Value</th><th>Alternate Value</th><th>Sort Order</th><th></th></tr></thead>
                            <tbody>
                                {data.length > 0 ? data.filter(s => s.Value.toLowerCase().indexOf(searchTextAS.toLowerCase()) >= 0).map((site, i) =>
                                    <tr key={i}>
                                        <td>{site.Value}</td>
                                        <td>{site.AltValue}</td>
                                        <td>{site.SortOrder}</td>
                                        <td><button className="btn btn-sm" onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(ValueListSlice.DBAction({ verb: 'DELETE', record }));
                                        }}><span><i className="fa fa-times"></i></span></button></td>
                                    </tr>) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#exampleModal" onClick={() => setRecord({ ...emptyRecord, GroupID: props.Record.ID }) }>Add Item</button>
                </div>
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
                            <ValueListForm Record={record} Setter={setRecord} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => dispatch(ValueListSlice.DBAction({ verb: 'POST', record })) }>Save changes</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                
    );

}

