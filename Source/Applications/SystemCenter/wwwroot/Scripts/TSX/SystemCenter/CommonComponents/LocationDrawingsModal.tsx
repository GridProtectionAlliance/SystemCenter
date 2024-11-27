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
import React from 'react';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { GenericController, LoadingScreen, Modal, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { CreateGuid } from '@gpa-gemstone/helper-functions';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import LocationDrawingsTable from '../Location/LocationDrawingsTable';

interface IProps {
    Location: OpenXDA.Types.Location;
    Show: boolean;
    SetShow: (b: boolean) => void;
    Errors: (e: string[]) => void;
}

const LocationDrawingsModal = (props: IProps) => {
    const [errors, setErrors] = React.useState<string[]>([]);
    const [pageState, setPageState] = React.useState<"loading" | "error" | "idle">("idle");
    const LocationDrawingController = new GenericController<SystemCenter.Types.LocationDrawing>(`${homePath}api/LocationDrawing`, "Name", true);

    const isValid = (drawingData) => {
        let e = [];

        if (props.Location == undefined
            || (props.Location.Alias == ""
                && props.Location.Description == ""
                && props.Location.ID == 0
                && props.Location.Latitude == null
                && props.Location.LocationKey == ""
                && props.Location.Longitude == null
                && props.Location.Name == ""))
            e.push('No locations have been set.');
        else if (drawingData.TotalRecords == 0)
            e.push('No drawings associated with location.');
        return e;
    }

    React.useEffect(() => {
        setPageState('loading');
        LocationDrawingController.PagedSearch([], 'Name', true, 1, props.Location?.ID)
            .done((result) => {
                setErrors(isValid(result));
                setPageState('idle');
            })
            .fail(() => setPageState('error'));
    }, [props.Location?.ID])

    React.useEffect(() => {
        props.Errors(errors);
    }, [errors]);

    return (
        <div>
            <LoadingScreen Show={pageState == 'loading'} />
            <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
            <Modal
                Show={props.Show}
                Title={'Drawings'}
                ShowX={true} Size={'lg'}
                CallBack={() => props.SetShow(false)}
                ShowCancel={false}
                ConfirmText={'Done'}>
                <div className="row">
                    <div className="col" style={{ width: '100%' }}>
                        <LocationDrawingsTable
                            LocationID={props.Location?.ID}
                            UpdateTable={0}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default LocationDrawingsModal;