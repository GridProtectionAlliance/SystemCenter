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
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import LocationDrawingsTable from './LocationDrawingsTable';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';


const LocationDrawingsWindow = (props: { Location: OpenXDA.Types.Location }) => {
    const roles = useAppSelector(SelectRoles); // Deprecated
    const emptyRecord: SystemCenter.Types.LocationDrawing = { ID: 0, LocationID: 0, Name: '', Link: '', Description: '', Number: '', Category: '' };
    const [record, setRecord] = React.useState<SystemCenter.Types.LocationDrawing>(emptyRecord);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <div className="card" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Substation Drawings:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ paddingBottom: 0, flex: 1, overflow: 'hidden' }}>
                <LocationDrawingsTable Location={props.Location} />
            </div>
            <div className="card-footer">
                <button
                    className={"btn btn-info pull-left" + (!hasPermissions() ? ' disabled' : '')}
                    data-toggle={"modal" + (!hasPermissions() ? ' disabled' : '')} data-target="#exampleModal"
                    data-tooltip='AddDrawing'
                    onMouseEnter={() => setHover('Update')}
                    onMouseLeave={() => setHover('None')}
                    onClick={() => { setRecord({ ...emptyRecord, LocationID: props.Location.ID }) }}
                    >Add Drawing
                </button>
            </div>
            <ToolTip
                Show={hover == 'Update' && !hasPermissions()}
                Position={'top'}
                Theme={'dark'}
                Target={"AddDrawing"}>
                <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
            </ToolTip>
        </div>

    );

}

export default LocationDrawingsWindow;