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
import { LoadingIcon, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { Input, TextArea } from '@gpa-gemstone/react-forms';
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import AdditionalFieldsProperties from '../CommonComponents/AdditionalFieldsProperties';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
declare var homePath: string;

interface IProps { Location: OpenXDA.Types.Location, stateSetter: (location: OpenXDA.Types.Location) => void }

const LocationInfo = (props: IProps) => {
    const [location, setLocation] = React.useState<OpenXDA.Types.Location>(props.Location)
    const [state, setState] = React.useState<'loading' | 'idle' | 'error'>('idle')

    const [hasChanged, setHasChanged] = React.useState<boolean>(false)

    const [validAssetKey, setValidAssetKey] = React.useState<boolean>(true);
    const [locationErrors, setLocationErrors] = React.useState<string[]>([]);

    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');
    const roles = useAppSelector(SelectRoles);

    const saveAddl = React.useRef<() => JQuery.jqXHR<void>>(undefined);
    const resetAddl = React.useRef<() => void>(undefined);
    const [addlFieldChanged, setAddlFieldChanged] = React.useState<string[]>([]);
    const [addlFieldError, setAddlFieldError] = React.useState<string[]>([]);

    React.useEffect(() => {
        setLocation(props.Location);
    }, [props.Location])

    React.useEffect(() => {
        setHasChanged(addlFieldChanged.length > 0 || !_.isEqual(props.Location, location));
    }, [props.Location, location, addlFieldChanged])

    React.useEffect(() => {
        let errors = [];
        if (location.LocationKey == null || location.LocationKey.length < 1)
            errors.push('A Key is required.');
        if (location.Name == null || location.Name.length < 1)
            errors.push('A Name is required.');
        if (location.Name != null && location.Name.length > 200)
            errors.push('Name must be less than 200 characters.');
        if (location.Alias != null && location.Alias.length > 200)
            errors.push('Alias must be less than 200 characters.');
        if (location.ShortName != null && location.ShortName.length > 50)
            errors.push('Short Name must be less than 50 characters.');
        if (location.Latitude == null)
            errors.push('Latitude is required.');
        if (location.Longitude == null)
            errors.push('Longitude is required.');
        if (location.Latitude != null && !AssetAttributes.isRealNumber(location.Latitude))
            errors.push('Latitude must be numeric.');
        if (location.Longitude != null && !AssetAttributes.isRealNumber(location.Longitude))
            errors.push('Longitude must be numeric.');
        if (location.Latitude != null && AssetAttributes.isRealNumber(location.Latitude) && (location.Latitude > 180 || location.Latitude < -180))
            errors.push('Latitude must be between -180 and 180.')
        if (location.Longitude != null && AssetAttributes.isRealNumber(location.Longitude) && (location.Longitude > 180 || location.Longitude < -180))
            errors.push('Longitude must be between -180 and 180.')
        if (!validAssetKey)
            errors.push('Key must be unique.');

        setLocationErrors(errors);

    }, [location, validAssetKey]);

    React.useEffect(() => {
        let handle = CheckAssetKey();

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        }
    }, [location]);

    function updateLocation(): () => void {
        let newLoc = _.clone(location);
        setState('loading');
        const mainHandle = $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/Location/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(location),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => {
            props.stateSetter(newLoc);
        });

        // If addl does not exist, do only main
        let addlHandle;
        let allHandles;
        if (saveAddl.current !== undefined) {
            addlHandle = saveAddl.current();
            allHandles = Promise.all([mainHandle, addlHandle]);
        } else allHandles = mainHandle;

        allHandles.then(() => { setState('idle'); }, () => { setState('error'); });

        return () => {
            if (mainHandle != null && mainHandle.abort != null) mainHandle.abort();
            if (addlHandle != null && addlHandle.abort != null) addlHandle.abort();
        }
    }

    function valid(field: keyof (OpenXDA.Types.Location)): boolean {
        if (field == 'LocationKey')
            return location.LocationKey != null && location.LocationKey.length > 0 && location.LocationKey.length <= 50;
        else if (field == 'Name')
            return location.Name != null && location.Name.length > 0 && location.Name.length <= 200;
        else if (field == 'Alias')
            return location.Alias == null || location.Alias.length <= 200;
        else if (field == 'ShortName')
            return location.ShortName == null || location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return location.Latitude != null && AssetAttributes.isRealNumber(location.Latitude) && location.Latitude < 180 && location.Latitude > -180;
        else if (field == 'Longitude')
            return location.Longitude != null && AssetAttributes.isRealNumber(location.Longitude) && location.Longitude < 180 && location.Longitude > -180;
        else if (field == 'Description')
            return true;
        return false;
    }

    function CheckAssetKey(): JQuery.jqXHR<string> {
        if (location.LocationKey == null || location.LocationKey.length == 0) {
            setValidAssetKey(true);
            return null;
        }
        const h = $.ajax({
            type: "Post",
            url: `${homePath}api/openXDA/Location/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                Searches: [
                    { FieldName: 'LocationKey', SearchText: location.LocationKey, Operator: '=', Type: 'string', isPivotColumn: false },
                    { FieldName: 'ID', SearchText: location.ID, Operator: '<>', Type: 'number', isPivotColumn: false }                ], OrderBy: 'ID', Ascending: false
            }),
            cache: false,
            async: true
        });

        h.then((d) => { setValidAssetKey((JSON.parse(d) as Array<Location>).length == 0) });
        return h;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return true;
        return false;
    }

    if (state == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Substation Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                    <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} />
                    </div>
                </div>
            </div>
        </div>

    if (state == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Substation Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                    </div>
                </div>
            </div>
        </div>

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Substation Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <Input<OpenXDA.Types.Location> Record={location} Field={'LocationKey'} Label={'Key'} Feedback={'A unique Key of less than 50 characters is required.'} Valid={valid} Setter={(l) => setLocation(l)} Disabled={hasPermissions()} />
                        <Input<OpenXDA.Types.Location> Record={location} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={valid} Setter={(l) => setLocation(l)} Disabled={hasPermissions()} />
                        <Input<OpenXDA.Types.Location> Record={location} Field={'ShortName'} Label={'Short Name'} Feedback={'Short Name must be less than 50 characters.'} Valid={valid} Setter={(l) => setLocation(l)} Disabled={hasPermissions()} />
                        <Input<OpenXDA.Types.Location> Record={location} Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={valid} Setter={(l) => setLocation(l)} Disabled={hasPermissions()} />
                    </div>
                    <div className="col">
                        <Input<OpenXDA.Types.Location> Record={location} Field={'Latitude'} Feedback={'A numeric Latitude value between -180 and 180 is required.'} Valid={valid} Setter={(l) => setLocation(l)} Disabled={hasPermissions()} />
                        <Input<OpenXDA.Types.Location> Record={location} Field={'Longitude'} Feedback={'A numeric Longitude value between -180 and 180 is required.'} Valid={valid} Setter={(l) => setLocation(l)} Disabled={hasPermissions()} />
                        <TextArea<OpenXDA.Types.Location> Rows={3} Record={location} Field={'Description'} Valid={valid} Setter={(l) => setLocation(l)} Disabled={hasPermissions()} />
                    </div>
                </div>
                <AdditionalFieldsProperties ID={location.ID} ParentTable={'Location'} AddlFieldSaveRef={saveAddl} SetChangedList={setAddlFieldChanged} SetErrorList={setAddlFieldError} ResetAddlFieldRef={resetAddl} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (locationErrors.length == 0 && addlFieldError.length === 0 && hasChanged ? '' : ' disabled')}
                        type="submit" onClick={() => {
                            if (locationErrors.length == 0 && addlFieldError.length === 0 && hasChanged) return updateLocation()
                        }} data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                </div>
                <ToolTip Show={(locationErrors.length > 0 || addlFieldError.length > 0 || !hasChanged) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                    {hasPermissions() ? <p>You do not have permission.</p> : !hasChanged ? <p> No changes made.</p> : null}
                    {locationErrors.map((t, i) => <p key={i}>
                        {CrossMark} {t}
                    </p>)}
                    {addlFieldError.map((t, i) => <p key={`a_${i}`}>
                        {CrossMark} {t}
                    </p>)}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + (hasChanged ? '' : ' disabled')} data-tooltip="clear" onClick={() => {
                        setLocation(props.Location);
                        if (resetAddl.current !== undefined) resetAddl.current();
                    }} onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                </div>
                <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                    {props.Location.LocationKey != location.LocationKey ? <p> {Warning} Changes to Key will be discarded.</p> : null}
                    {props.Location.Name != location.Name ? <p> {Warning} Changes to Name will be discarded.</p> : null}
                    {props.Location.ShortName != location.ShortName ? <p> {Warning} Changes to Short Name will be discarded.</p> : null}
                    {props.Location.Alias != location.Alias ? <p> {Warning} Changes to Alias will be discarded.</p> : null}
                    {props.Location.Latitude != location.Latitude ? <p> {Warning} Changes to Latitude will be discarded.</p> : null}
                    {props.Location.Longitude != location.Longitude ? <p> {Warning} Changes to Longitude will be discarded.</p> : null}
                    {props.Location.Description != location.Description ? <p> {Warning} Changes to Description will be discarded.</p> : null}
                    {addlFieldChanged.map((t, i) => <p key={i}>
                        {Warning} {t}
                    </p>)}
                </ToolTip>
            </div>
        </div>
        )
}

export default LocationInfo