//******************************************************************************************************
//  ConnectionInfo.tsx - Gbtc
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
//  09/11/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { useAppDispatch, useAppSelector } from '../hooks';
import { cloneDeep } from 'lodash';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import MeterLocationProperties from './PropertyUI/MeterLocationProperties';
import { LocationSlice, ByMeterSlice } from '../Store/Store';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter, StateSetter: (meter: OpenXDA.Types.Meter) => void }

const LocationWindow = (props: IProps) => {
    // Location Slice consts
    const dispatch = useAppDispatch();
    const locationStatus = useAppSelector(LocationSlice.Status) as Application.Types.Status;
    const locationList = useAppSelector(LocationSlice.Data) as OpenXDA.Types.Location[];
    const [updateMeter, setUpdateMeter] = React.useState<boolean>(false);

    const newLocation: OpenXDA.Types.Location = {
        ID: 0,
        LocationKey: null,
        Name: null,
        Alias: null,
        ShortName: null,
        Latitude: null,
        Longitude: null,
        Description: null,
    }
    const [location, setLocation] = React.useState<OpenXDA.Types.Location>(newLocation);
    const [meter, setMeter] = React.useState<OpenXDA.Types.Meter>(props.Meter);
   
    const [validKey, setValidKey] = React.useState<boolean>(true);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (locationStatus === 'unintiated' || locationStatus === 'changed')
            dispatch(LocationSlice.Fetch());
        else if (locationStatus === 'idle' && updateMeter)
            setLocation(locationList.find((d: OpenXDA.Types.Location) => d.LocationKey === location.LocationKey) as OpenXDA.Types.Location);

    }, [dispatch, locationStatus, updateMeter]);

    React.useEffect(() => {
        setMeter(props.Meter);
    }, [props.Meter]);

    React.useEffect(() => {
        setLocationFromMeter(meter.LocationID);
    }, [meter.LocationID, locationList]);

    React.useEffect(() => {
        const key = location.LocationKey;
        if (key == null || key == '')
            return;
        const index = locationList.filter(item => item.LocationKey == key);
        if (index.length == 0)
            setValidKey(true);
        else if (index.length > 1)
            setValidKey(false);
        else
            setValidKey(location.ID == index[0].ID);
    }, [location, locationList]);

    React.useEffect(() => {
        if (location.ID < 1 || !updateMeter) return;
        setUpdateMeter(false);
        let updateMeterHandle = updateMeterLocation(location.ID);
        return () => {
            if (updateMeterHandle != null && updateMeterHandle.abort != null) {
                updateMeterHandle.abort();
            }
        };

    }, [location, updateMeter]);

    function valid(field: keyof OpenXDA.Types.Location): boolean {
        if (field == 'LocationKey')
            return location.LocationKey != null && location.LocationKey.length > 0 && location.LocationKey.length <= 50 && validKey;
        else if (field == 'Name')
            return location.Name != null && location.Name.length > 0 && location.Name.length <= 200;
        else if (field == 'Alias')
            return location.Alias == null || location.Alias.length <= 200;
        else if (field == 'ShortName')
            return location.ShortName == null ||location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return location.Latitude != null && AssetAttributes.isRealNumber(location.Latitude);
        else if (field == 'Longitude')
            return location.Longitude != null && AssetAttributes.isRealNumber(location.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }

    const isValidLocation = valid('LocationKey') && valid('Name') && valid('Alias') && valid('ShortName') && valid('Latitude') && valid('Longitude');

    function postLocation() {
        setUpdateMeter(true);
        dispatch(LocationSlice.DBAction({ verb: (location.ID > 0 ? 'PATCH' : 'POST'), record: location }));
    }

    function setLocationFromMeter(locationID: number) {
        if (locationID > 0 && locationStatus === 'idle')
            setLocation(locationList.find((d: OpenXDA.Types.Location) => d.ID === locationID) as OpenXDA.Types.Location);
        else
            setLocation(newLocation);
    }

    function updateMeterLocation(locationID: number): JQuery.jqXHR {
        if (props.Meter.LocationID != locationID) {
            const m = cloneDeep(props.Meter);
            m.LocationID = locationID;
            return $.ajax({
                type: "PATCH",
                url: `${homePath}api/OpenXDA/Meter/Update`,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(m),
                dataType: 'json',
                cache: true,
                async: true
            }).done((msg) => {
                props.StateSetter(cloneDeep(m));
            });
        }
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Meter Substation Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <MeterLocationProperties Meter={meter} Location={location} Locationlist={locationList}
                    SetLocation={(loc) => { setLocation(loc); setHasChanged(true); }}
                    UpdateMeter={(m) => {
                        setHasChanged(props.Meter.LocationID != (m.LocationID != null ? parseInt(m.LocationID.toString()) : 0));
                        setMeter({ ...m, LocationID: (m.LocationID != null ? parseInt(m.LocationID.toString()) : 0) });
                    }}
                    DisableLocation={location.ID > 0}
                />
             </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (!(isValidLocation && hasChanged) ? ' disabled' : '')} onClick={postLocation}
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} data-tooltip={'NewLocation'}>{location.ID > 0 ? "Update" : "Add New"}</button>
                    <ToolTip Show={hover == 'Update' && (!hasChanged || !isValidLocation)} Position={'top'} Theme={'dark'} Target={"NewLocation"}>
                        {(!hasChanged || location.ID < 1) && hasPermissions() ? <p> No changes have been made. </p> : null}
                        {!hasPermissions() ? <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p> : null}
                        {!validKey ? <p> {CrossMark} Key must be unique.  </p> : null}
                        {!valid('LocationKey') && validKey ? <p> {CrossMark} A Key of less than 50 characters is required. </p> : null}
                        {!valid('Name') ? <p> {CrossMark} A Name of less than 200 characters is required. </p> : null}
                        {!valid('ShortName') ? <p> {CrossMark} Short Name must be less than 50 characters. </p> : null}
                        {!valid('Latitude') ? <p> {CrossMark} Latitude is required. </p> : null}
                        {!valid('Longitude') ? <p> {CrossMark} Longtitude is required. </p> : null}
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                <button className={"btn btn-default" + (hasChanged? '' : ' disabled')}
                    data-tooltip='ResetLocation' onMouseEnter={() => setHover('Reset')} onMouseLeave={() => setHover('None')}
                    onClick={() => { if (hasChanged) { setMeter(props.Meter); setHasChanged(false); } } }>Reset</button>
                <ToolTip Show={hover == 'Reset' && !hasChanged} Position={'top'} Theme={'dark'} Target={"ResetLocation"}>
                    <p> No Changes have been made.</p>
                </ToolTip>
                </div>
            </div>
        </div>
    );

}


export default LocationWindow;