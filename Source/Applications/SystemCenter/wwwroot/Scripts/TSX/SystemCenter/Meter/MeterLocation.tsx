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
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { cloneDeep } from 'lodash';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import MeterLocationProperties from './PropertyUI/MeterLocationProperties';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter, StateSetter: (meter: OpenXDA.Types.Meter) => void }

const LocationWindow = (props: IProps) => {
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

    const [locationList, setLocationList] = React.useState<OpenXDA.Types.Location[]>([]);
   
    const [validKey, setValidKey] = React.useState<boolean>(true);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None' | 'New')>('None');

    React.useEffect(() => {
        let handle = getAllLocations();
        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, []);

    React.useEffect(() => {
        let h1 = getLocation();
        let h2 = getAllLocations();
        return () => {
            if (h1 != null && h1.abort != null) h1.abort();
            if (h2 != null && h2.abort != null) h2.abort();
        } 
    }, [meter])

    React.useEffect(() => {
        setMeter(props.Meter);
    }, [props.Meter])

    React.useEffect(() => {
        if (locationList.length > 0)
            sessionStorage.setItem('SystemCenter.Locations', JSON.stringify(locationList));
    }, [locationList]);

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

    function getAllLocations(): JQuery.jqXHR<OpenXDA.Types.Location[]> {
        if (sessionStorage.hasOwnProperty('SystemCenter.Locations')) {
            setLocationList(JSON.parse(sessionStorage.getItem('SystemCenter.Locations')));
            return null;
        }
        
        let h = $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/Location`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
        })

        h.done(mls => {
            setLocationList(mls);
            sessionStorage.setItem('SystemCenter.Locations', JSON.stringify(mls));
        });

        return h;
    }

    function getLocation(): JQuery.jqXHR<OpenXDA.Types.Location> {
        if (meter == null || meter.LocationID == null) return null;

        if (meter.LocationID == 0) {
            setLocation(newLocation)
            return;
        }

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/One/${meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
        handle.done((d: OpenXDA.Types.Location) => {
            setLocation(d);
            setLocationList((lst) => {
                let index = lst.findIndex(item => item.ID == d.ID);
                if (index == -1)
                    return [...lst, d];
                let ulst = _.cloneDeep(lst);
                ulst[index] = d;
                return ulst;
            })
        });
        return handle;
    }

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

    function addNewLocation(): JQuery.jqXHR {
        const newLocation: any = _.clone(location);
        newLocation.MeterID = this.props.Meter.ID;

        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Location/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(location),
            dataType: 'json',
            cache: true,
            async: true
        }).done((location: OpenXDA.Types.Location) => {
            setHasChanged(false);
            setLocation(location);
            props.StateSetter(cloneDeep(props.Meter));
        });
    }

    function updateLocation(): JQuery.jqXHR {


        return $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/Location/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(location),
            dataType: 'json',
            cache: true,
            async: true
        }).done((d: number) => {
            if (location.ID != props.Meter.LocationID) {
                const m = cloneDeep(props.Meter);
                m.LocationID = location.ID;
                $.ajax({
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
            setHasChanged(false);
        });
    }

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Meter Location / Substation Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <MeterLocationProperties Meter={meter} Location={location} Locationlist={locationList}
                    SetLocation={(loc) => { setLocation(loc); setHasChanged(true); }}
                    UpdateMeter={(m) => { setHasChanged(props.Meter.LocationID != (m.LocationID != null ? parseInt(m.LocationID.toString()) : 0)); setMeter({ ...m, LocationID: (m.LocationID != null ? parseInt(m.LocationID.toString()) : 0) }) }}
                    DisableLocation={false}
                />
             </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (!hasChanged || !isValidLocation ? ' disabled' : '')} onClick={() => { if (isValidLocation && hasChanged) addNewLocation() }} hidden={location.ID != 0}
                        onMouseEnter={() => setHover('New')} onMouseLeave={() => setHover('None')} data-tooltip={'NewLocation'}>Add New</button>
                    <ToolTip Show={hover == 'New' && (!hasChanged || !isValidLocation)} Position={'top'} Theme={'dark'} Target={"NewLocation"}>
                        {!validKey ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Key needs to be unique.  </p> : null}
                        {!valid('LocationKey') && validKey ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Key is required and needs to be less than 50 characters. </p> : null}
                        {!valid('Name') ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Name is required and needs to be less than 200 characters. </p> : null}
                        {!valid('ShortName') ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> ShortName needs to be less than 50 characters. </p> : null}
                        {!valid('Latitude') ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Latitude is required. </p> : null}
                        {!valid('Longitude') ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Longtitude is required. </p> : null}
                        </ToolTip>
                    </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (!hasChanged || !isValidLocation ? ' disabled' : '')} onClick={() => { if (isValidLocation && hasChanged) updateLocation() }} hidden={location.ID == 0}
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} data-tooltip={'UpdateLocation'}>Update</button>
                    <ToolTip Show={hover == 'Update' && (!hasChanged || !isValidLocation)} Position={'top'} Theme={'dark'} Target={"UpdateLocation"}>
                        {!hasChanged ? <p> No Changes have been made. </p> : null}
                        {!validKey ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Key needs to be unique. </p> : null}
                        {!valid('LocationKey') && validKey ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Key is required and needs to be less than 50 characters. </p> : null}
                        {!valid('Name')? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Name is required and needs to be less than 200 characters. </p> : null}
                        {!valid('ShortName') ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> ShortName needs to be less than 50 characters. </p> : null}
                        {!valid('Latitude') ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Latitude is required. </p> : null}
                        {!valid('Longitude') ? <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> Longtitude is required. </p> : null}
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