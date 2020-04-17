//******************************************************************************************************
//  LineSegmentWindow.tsx - Gbtc
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
//  04/17/2020 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import {SystemCenter, OpenXDA } from '../global';
import AssetAttributes from '../AssetAttribute/Asset';
import FormInput from '../CommonComponents/FormInput';
import FormCheckBox from '../CommonComponents/FormCheckBox';
import FormSelect from '../CommonComponents/FormSelect';

declare var homePath: string;

function LineSegmentWindow(props: { ID: number }): JSX.Element {
    const [segments, setSegments] = React.useState<Array<OpenXDA.LineSegment>>([]);
    const [updated, setUpdated] = React.useState<boolean>(false);

    React.useEffect(() => {
        getData();
    }, [props.ID]);

    function getData() {
        getSegments();
        setUpdated(false);
    }

    function getSegments(): void {
       $.ajax({
            type: "GET",
           url: `${homePath}api/OpenXDA/Line/${props.ID}/LineSegments`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
       }).done((data: Array<OpenXDA.LineSegment>) => {
           console.log(data)
           setSegments(data);
       });
    }

   

    function addOrUpdateValues(): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalFieldValue/Array`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(''),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });
    }

    function addNewField(): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/AdditionalField/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(''),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });
    }

    function deleteField(field: SystemCenter.AdditionalField): void {
        let response = confirm("This will delete the field '" + field.FieldName + "' from all " + props.ID + "s and will also delete all information assigned to these fields");

        if (!response) return;
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/AdditionalField/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(field),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
        });

    }

    function editField(field: SystemCenter.AdditionalField): void {
        //setNewField(field);
    }

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <h4>Additional Fields:</h4>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: 300 }}>Segment</th>
                                <th style={{ width: 100 }}>Length</th>
                                <th style={{ width: 50 }}>R0</th>
                                <th style={{ width: 50 }}>X0</th>
                                <th style={{ width: 50 }}>R1</th>
                                <th style={{ width: 50 }}>X1</th>
                                <th style={{ width: 150 }}>Thermal Rating</th>
                                <th style={{ width: 30 }}></th>
                                <th style={{ width: 30 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {segments.map((a, i) => <TableRowInput key={i} ParentLineID={props.ID} Segment={a}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" data-toggle='modal' data-target="#newField">Add Field</button>
                </div>

                <div className="btn-group mr-2">
                    <button className="btn btn-primary"  disabled={!updated}>Save Changes</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default"  disabled={!updated}>Reset</button>
                </div>
            </div>

            <div className="modal" id="newField">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Additional Field</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewField} >Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

/*<FormInput<SystemCenter.AdditionalField> Record={newField} Field='FieldName' Valid={(field) => true} Label="Field Name" Setter={setNewField} /> 
<FormSelect<SystemCenter.AdditionalField> Record={newField} Field='Type' Options={[{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }]} Label="External Database" Setter={setNewField} />
    <FormInput<SystemCenter.AdditionalField> Record={newField} Field='ExternalDB' Valid={(field) => true} Label="External Database" Setter={setNewField} />
    <FormInput<SystemCenter.AdditionalField> Record={newField} Field='ExternalDBTable' Valid={(field) => true} Label="External Database Table" Setter={setNewField} />
    <FormInput<SystemCenter.AdditionalField> Record={newField} Field='ExternalDBTableKey' Valid={(field) => true} Label="External Database Table Key" Setter={setNewField} />
    <FormCheckBox<SystemCenter.AdditionalField> Record={newField} Field='IsSecure' Label="Secure Data" Setter={setNewField} /> 
*/
export default LineSegmentWindow;

function TableRowInput(props: { ParentLineID: number, Segment: OpenXDA.LineSegment }) {
    return(
        <tr>
            <td>{props.Segment.AssetName} ({props.Segment.AssetKey})</td>
            <td>{props.Segment.Length}</td>
            <td>{props.Segment.R0}</td>
            <td>{props.Segment.X0}</td>
            <td>{props.Segment.R1}</td>
            <td>{props.Segment.X1}</td>
            <td>{props.Segment.ThermalRating}</td>
            <td><button className="btn btn-sm" data-toggle='modal' data-target="#newField"  onClick={(e) => console.log("Update")}><span><i className="fa fa-pencil"></i></span></button></td>
            <td><button className="btn btn-sm" onClick={(e) => console.log("Delete")}><span><i className="fa fa-times"></i></span></button></td>
        </tr>
    );
}
