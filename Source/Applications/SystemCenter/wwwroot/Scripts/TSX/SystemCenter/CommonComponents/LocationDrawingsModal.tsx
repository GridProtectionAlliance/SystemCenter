//******************************************************************************************************
//  LocationDrawings.tsx - Gbtc
//
//  Copyright © 2024, Grid Protection Alliance.  All Rights Reserved.
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
import { Modal } from '@gpa-gemstone/react-interactive';
import LocationDrawingsTable from '../Location/LocationDrawingsTable';
import { OpenXDA } from '@gpa-gemstone/application-typings';

interface IProps {
    Location: OpenXDA.Types.Location;
    Show: boolean;
    SetShow: (b: boolean) => void;
}

const LocationDrawingsModal = (props: IProps) => {
    return (
        <Modal
            Show={props.Show}
            Title={'Drawings for ' + props.Location?.Name}
            ShowX={true} Size={'lg'}
            CallBack={() => props.SetShow(false)}
            ShowCancel={false}
            ShowConfirm={false}>
            <div className="row">
                <div className="col-12">
                    <LocationDrawingsTable
                        LocationID={props.Location?.ID}
                        RefreshDrawings={0}
                    />
                </div>
            </div>
        </Modal>
    )
}
export default LocationDrawingsModal;