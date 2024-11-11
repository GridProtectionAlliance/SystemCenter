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
import AddEditDrawingsModal from './AddEditDrawingsModal';


const LocationDrawingsWindow = (props: { Location: OpenXDA.Types.Location }) => {
    const roles = useAppSelector(SelectRoles); // Deprecated
    const emptyRecord: SystemCenter.Types.LocationDrawing = { ID: 0, LocationID: 0, Name: '', Link: '', Description: '', Number: '', Category: '' };
    const [record, setRecord] = React.useState<SystemCenter.Types.LocationDrawing>(emptyRecord);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const [showModal, setShowModal] = React.useState<boolean>(false);

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    const fetchDrawings = (sortKey: keyof SystemCenter.Types.LocationDrawing, ascending: boolean, page: number, locationID: number) => {
        setPageState('loading');
        const handle = LocationDrawingController.PagedSearch([], sortKey, ascending, page, locationID)
            .done((result) => {
                setLinks(JSON.parse(result.Data as unknown as string));
                if (result.NumberOfPages === 0) result.NumberOfPages = 1;
                setPageInfo(result);
                setPageState('idle');
            })
            .fail(() => setPageState('error'));
        return handle;
    }

    const handleSave = () => {
        setPageState('loading');
        LocationDrawingController.DBAction('PATCH', record)
            .then(() => {
                fetchDrawings(sortKey, ascending, page, props.Location.ID);
            })
            .catch(() => {
                setPageState('error');
            });
    };

    function valid(field: keyof (SystemCenter.Types.LocationDrawing)): boolean {
        if (field == 'Name')
            return record.Name != null && record.Name.length > 0 && record.Name.length <= 200;
        else if (field == 'Link')
            return record.Link != null && record.Link.length > 0;
        else if (field == 'Number')
            return record.Number == null || record.Number.length <= 50;
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
                <LocationDrawingsTable Location={props.Location} Edit={(record) => { setRecord(record) }} />
            </div>
            <div className="card-footer">
                <button
                    className={"btn btn-info pull-left" + (!hasPermissions() ? ' disabled' : '')}
                    onMouseEnter={() => setHover('Update')}
                    onMouseLeave={() => setHover('None')}
                    onClick={() => { setRecord({ ...emptyRecord, LocationID: props.Location.ID }); setShowModal(true); }}
                    >Add Drawing
                </button>
            </div>
            <AddEditDrawingsModal
                Record={record}
                Setter={setRecord}
                Valid={valid}
                HandleSave={handleSave}
                Show={showModal}
                SetShow={setShowModal}
            />
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