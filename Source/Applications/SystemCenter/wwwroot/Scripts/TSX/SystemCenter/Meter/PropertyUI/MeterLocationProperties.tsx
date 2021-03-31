//******************************************************************************************************
//  MeterLocationProperties.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  03/31/2021 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, SystemCenter } from '../../global';
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { AssetAttributes } from '../../AssetAttribute/Asset';

declare var homePath: string;

interface IProps {
    Meter: OpenXDA.Meter,
    UpdateMeter: (meter: OpenXDA.Meter) => void,
    Locationlist: OpenXDA.Location[],
    Location: OpenXDA.Location,
    SetLocation: (loc: OpenXDA.Location) => void,
    DisableLocation: boolean
}

const MeterLocationProperties = (props: IProps) => {
    const [validKey, setValidKey] = React.useState<boolean>(true);

    React.useEffect(() => {
        const key = props.Location.LocationKey;
        if (key == null || key == '')
            return;
        const index = props.Locationlist.filter(item => item.LocationKey == key);
        if (index.length == 0)
            setValidKey(true);
        else if (index.length > 1)
            setValidKey(false);
        else
            setValidKey(props.Location.ID == index[0].ID);

    }, [props.Location, props.Locationlist]);

 
    function valid(field: keyof OpenXDA.Location): boolean {
        if (field == 'LocationKey')
            return props.Location.LocationKey != null && props.Location.LocationKey.length > 0 && props.Location.LocationKey.length <= 50 && validKey;
        else if (field == 'Name')
            return props.Location.Name != null && props.Location.Name.length > 0 && props.Location.Name.length <= 200;
        else if (field == 'Alias')
            return props.Location.Alias == null || props.Location.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.Location.ShortName == null || props.Location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return props.Location.Latitude != null && AssetAttributes.isRealNumber(props.Location.Latitude);
        else if (field == 'Longitude')
            return props.Location.Longitude != null && AssetAttributes.isRealNumber(props.Location.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }

    if (props.Location == null || props.Meter == null)
        return null;

    return (
        <div className="row">
            <div className="col">
                <Select<OpenXDA.Meter> Record={props.Meter} Field={'LocationID'} Label={'Select location'} Setter={(m) => props.UpdateMeter(m)}
                    Options={props.Locationlist.map(item => ({ Label: item.LocationKey, Value: item.ID.toString() }))} EmptyOption={true} EmptyLabel={'Add New'} />

                <Input<OpenXDA.Location> Record={props.Location} Field={'LocationKey'} Label={'Key'} Feedback={'A unique key of less than 50 characters is required.'} Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={props.DisableLocation} />
                <Input<OpenXDA.Location> Record={props.Location} Field={'Name'} Feedback={'Name must be less than 200 characters and is required.'} Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={props.DisableLocation}/>
                <Input<OpenXDA.Location> Record={props.Location} Field={'ShortName'} Feedback={'ShortName must be less than 50 characters.'} Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={props.DisableLocation}/>
            </div>
            <div className="col">
                <Input<OpenXDA.Location> Record={props.Location} Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={props.DisableLocation}/>
                <Input<OpenXDA.Location> Record={props.Location} Field={'Latitude'} Feedback={'Latitude is a required numeric field.'} Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={props.DisableLocation}/>
                <Input<OpenXDA.Location> Record={props.Location} Field={'Longitude'} Feedback={'Longitude is a required numeric field.'} Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={props.DisableLocation}/>
                <TextArea<OpenXDA.Location> Rows={3} Record={props.Location} Field={'Description'} Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={props.DisableLocation}/>
            </div>
        </div>
                
    );


}

export default MeterLocationProperties;