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
import { OpenXDA } from '@gpa-gemstone/application-typings'
import { Input, TextArea } from '@gpa-gemstone/react-forms';
import { AssetAttributes } from '../../AssetAttribute/Asset';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { ByLocationSlice } from '../../Store/Store';
import LocationDrawings from './LocationDrawings';
import { useAppSelector } from '../../hooks';
import { SelectRoles } from '../../Store/UserSettings';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import { Column } from '@gpa-gemstone/react-table';

declare var homePath: string;

interface IProps {
    Meter: OpenXDA.Types.Meter,
    UpdateMeter: (meter: OpenXDA.Types.Meter) => void,
    Locationlist: OpenXDA.Types.Location[],
    Location: OpenXDA.Types.Location,
    SetLocation: (loc: OpenXDA.Types.Location) => void,
    DisableLocation: boolean
}

const MeterLocationProperties = (props: IProps) => {
    const [validKey, setValidKey] = React.useState<boolean>(true);
    const [showStationSelector, setShowStationSelector] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');
    const roles = useAppSelector(SelectRoles);

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

    function getEnum(setOptions, field) {
        let handle = null;
        if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
            return () => { };

        handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        }
    }

    function valid(field: keyof OpenXDA.Types.Location): boolean {
        if (field == 'LocationKey')
            return props.Location.LocationKey != null && props.Location.LocationKey.length > 0 && props.Location.LocationKey.length <= 50 && validKey;
        else if (field == 'Name')
            return props.Location.Name != null && props.Location.Name.length > 0 && props.Location.Name.length <= 200;
        else if (field == 'Alias')
            return props.Location.Alias == null || props.Location.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.Location.ShortName == null || props.Location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return props.Location.Latitude != null && AssetAttributes.isRealNumber(props.Location.Latitude) && props.Location.Latitude < 180 && props.Location.Latitude > -180;
        else if (field == 'Longitude')
            return props.Location.Longitude != null && AssetAttributes.isRealNumber(props.Location.Longitude) && props.Location.Longitude < 180 && props.Location.Longitude > -180;
        else if (field == 'Description')
            return true;
        return false;
    }

    function isEmpty() {
        let empty = false;
        empty = empty && (props.Location.LocationKey == null || props.Location.LocationKey.length == 0);
        empty = empty && (props.Location.Name == null || props.Location.Name.length == 0);
        empty = empty && (props.Location.Alias == null || props.Location.Alias.length == 0);
        empty = empty && (props.Location.ShortName == null || props.Location.ShortName.length == 0);
        empty = empty && (props.Location.Latitude == null);
        empty = empty && (props.Location.Longitude == null);
        empty = empty && (props.Location.Description == null || props.Location.Description.length == 0);

        return empty;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    if (props.Location == null || props.Meter == null)
        return null;

    return (
        <>
            <div className="row">
                <div className="col">
                    <div style={{ marginBottom: 5 }}>
                        <button
                            type="button"
                            style={{ marginRight: 10 }}
                            className={"btn btn-info" + (hasPermissions() ? '' : 'disabled')} data-tooltip='SelectLocation' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}
                            onClick={() => { if (hasPermissions()) setShowStationSelector(true) }}>Select Substation</button>
                        <button type="button" className={"btn btn-secondary" + (hasPermissions() || isEmpty() ? '' : 'disabled')} data-tooltip='ClearLocation' onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')}
                            onClick={() => { if (hasPermissions()) props.UpdateMeter({ ...props.Meter, LocationID: null }) }}>Clear</button>
                    </div>
                    <ToolTip Show={hover == 'clear' && !hasPermissions()} Position={'top'} Target={"ClearLocation"}>
                        <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                    </ToolTip>
                    <ToolTip Show={hover == 'submit' && !hasPermissions()} Position={'top'} Target={"SelectLocation"}>
                        <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                    </ToolTip>
                    <Input<OpenXDA.Types.Location> 
                        Record={props.Location} Field={'LocationKey'} 
                        Label={'Key'}
                        Feedback={'A unique key of less than 50 characters is required.'}
                        Valid={valid} 
                        Setter={(loc) => props.SetLocation(loc)} Disabled={!hasPermissions() || props.DisableLocation} />
                    <Input<OpenXDA.Types.Location> Record={props.Location}
                        Field={'Name'}
                        Label={'Name'}
                        Feedback={'A Name of less than 200 characters is required.'}
                        Valid={valid}
                        Setter={(loc) => props.SetLocation(loc)} Disabled={!hasPermissions() || props.DisableLocation} />
                    <Input<OpenXDA.Types.Location>
                        Record={props.Location} Field={'ShortName'}
                        Label={'Short Name'} Feedback={'Short Name must be less than 50 characters.'}
                        Valid={valid}
                        Setter={(loc) => props.SetLocation(loc)} Disabled={!hasPermissions() || props.DisableLocation} />
                </div>
                <div className="col">
                    <div className="pull-right" style={{ marginBottom: 10 }}>
                        <LocationDrawings LocationID={props.Location.ID} />
                    </div>
                    <div style={{ marginTop: 43 }}>
                        <Input<OpenXDA.Types.Location> Record={props.Location} 
                            Field={'Alias'} Label={'Alias'} Feedback={'Alias must be less than 200 characters.'} 
                            Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={!hasPermissions() || props.DisableLocation} />
                        <Input<OpenXDA.Types.Location> Record={props.Location} 
                            Field={'Latitude'} Label={'Latitude'} 
                            Feedback={'A numeric Latitude value between -180 and 180 is required.'} 
                            Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={!hasPermissions() || props.DisableLocation} />
                        <Input<OpenXDA.Types.Location> Record={props.Location} Field={'Longitude'} Label={'Longitude'} 
                            Feedback={'A numeric Longitude value between -180 and 180 is required.'} 
                            Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={!hasPermissions() || props.DisableLocation} />
                        <TextArea<OpenXDA.Types.Location> Rows={3} Record={props.Location} Field={'Description'} Label={'Description'} 
                            Valid={valid} Setter={(loc) => props.SetLocation(loc)} Disabled={!hasPermissions() || props.DisableLocation} />
                    </div>
                </div>
            </div>
            <DefaultSelects.Location 
                Slice={ByLocationSlice}
                Selection={[]}
                OnClose={(selected, conf) => {
                    setShowStationSelector(false);
                    if (conf)
                        props.UpdateMeter({ ...props.Meter, LocationID: selected[0].ID })
                }}
                Show={showStationSelector}
                Type={'single'}
                Title={"Select Substation"}
                GetEnum={getEnum}
                GetAddlFields={() => { return () => { } }}
            >
                <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Name</Column>
                <Column Key="LocationKey" Field="LocationKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Key</Column>
                <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Meters</Column>
                <Column Key="Assets" Field="Assets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Assets</Column>
            </DefaultSelects.Location>
        </>
    );


}

export default MeterLocationProperties;