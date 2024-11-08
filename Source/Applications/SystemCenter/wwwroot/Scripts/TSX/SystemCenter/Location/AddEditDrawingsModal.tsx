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
//  11/06/2024 - Collins Self
//       Generated original version of source code.
//
//******************************************************************************************************
import { SystemCenter } from "@gpa-gemstone/application-typings";
import { Input, Select } from "@gpa-gemstone/react-forms";
import React from "react";

interface IProps {
    Record: SystemCenter.Types.LocationDrawing,
    Category: {
        Value: string | number;
        Label: string;
    }[],
    Setter: (record) => void,
    Valid: (field) => boolean,
    HandleSave: () => void
}

const AddEditDrawingsModal = (props: IProps) => {
    return <>
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
                        <Input<SystemCenter.Types.LocationDrawing>
                            Record={props.Record}
                            Field={'Name'}
                            Feedback={'A Name of less than 200 characters is required.'}
                            Valid={props.Valid}
                            Setter={(r) => props.Setter(r)} />
                        <Input<SystemCenter.Types.LocationDrawing>
                            Record={props.Record}
                            Field={'Link'}
                            Feedback={'A Link is required.'}
                            Valid={props.Valid}
                            Setter={(r) => props.Setter(r)} />
                        <Input<SystemCenter.Types.LocationDrawing>
                            Record={props.Record}
                            Field={'Description'}
                            Valid={props.Valid}
                            Setter={(r) => props.Setter(r)} />
                        <Select<SystemCenter.Types.LocationDrawing>
                            Record={props.Record}
                            Field={'Category'}
                            Options={props.Category}
                            Label={'Category'}
                            Setter={(r) => props.Setter(r)} />
                        <Input<SystemCenter.Types.LocationDrawing>
                            Record={props.Record}
                            Field={'Number'}
                            Feedback={'Number must be less than 50 characters.'}
                            Valid={props.Valid}
                            AllowNull={true}
                            Setter={(r) => props.Setter(r)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => props.HandleSave()}>Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default AddEditDrawingsModal;