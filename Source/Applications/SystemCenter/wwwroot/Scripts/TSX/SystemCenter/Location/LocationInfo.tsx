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
import { Warning } from '@gpa-gemstone/gpa-symbols';
declare var homePath: string;

interface IProps { Location: OpenXDA.Types.Location, stateSetter: (location: OpenXDA.Types.Location) => void }

const LocationInfo = (props: IProps) => {
    const [location, setLocation] = React.useState<OpenXDA.Types.Location>(props.Location)
    const [state, setState] = React.useState<'loading' | 'idle' | 'error'>('idle')

    const [hasChanged, setHasChanged] = React.useState<boolean>(false)

    const [validAssetKey, setValidAssetKey] = React.useState<boolean>(true);
    const [locationErrors, setLocationErrors] = React.useState<string[]>([]);

    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    React.useEffect(() => {
        setLocation(props.Location);
    }, [props.Location])

    React.useEffect(() => {
        if (_.isEqual(props.Location, location))
            setHasChanged(false);
        else
            setHasChanged(true);
    }, [props.Location, location])

    React.useEffect(() => {
        let errors = [];
        if (location.LocationKey == null || location.LocationKey.length < 1)
            errors.push('A Key is required.');
        if (location.Name == null || location.Name.length < 1)
            errors.push('A Name is required.');
        if (location.Name != null && location.Name.length > 200)
            errors.push('Name needs to be less than 200 characters.');
        if (location.Alias != null && location.Alias.length > 200)
            errors.push('Alias needs to be less than 200 characters.');
        if (location.ShortName != null && location.ShortName.length > 50)
            errors.push('Short Name needs to be less than 50 characters.');
        if (location.Latitude == null)
            errors.push('Latitude is required.');
        if (location.Longitude == null)
            errors.push('Longitude is required.');
        if (location.Latitude != null && !AssetAttributes.isRealNumber(location.Latitude))
            errors.push('Latitude needs to be numeric.');
        if (location.Longitude != null && !AssetAttributes.isRealNumber(location.Longitude))
            errors.push('Longitude needs to be numeric.');
        if (!validAssetKey)
            errors.push('The Key has to be unique.');

        setLocationErrors(errors);

    }, [location, validAssetKey]);

    React.useEffect(() => {
        let handle = CheckAssetKey();

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        }
    }, [location]);

    function updateLocation(): JQuery.jqXHR {
        let newLoc = _.clone(location);
        setState('loading');

        return $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/Location/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(location),
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => {
            props.stateSetter(newLoc);
            setState('idle');
        }).fail(() => { setState('error'); });
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
            return location.Latitude != null && AssetAttributes.isRealNumber(location.Latitude);
        else if (field == 'Longitude')
            return location.Longitude != null && AssetAttributes.isRealNumber(location.Longitude);
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
            data: JSON.stringify({ Searches: [{ FieldName: 'LocationKey', SearchText: location.LocationKey, Operator: '=', Type: 'string', isPivotColumn: false }], OrderBy: 'ID', Ascending: false }),
            cache: false,
            async: true
        });

        h.then((d) => { setValidAssetKey((JSON.parse(d) as Array<Location>).length == 0) });
        return h;
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
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
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
                        <Input<OpenXDA.Types.Location> Record={location} Field={'LocationKey'} Feedback={'A unique key of less than 50 characters is required.'} Valid={valid} Setter={(l) => setLocation(l)} />
                        <Input<OpenXDA.Types.Location> Record={location} Field={'Name'} Feedback={'Name must be less than 200 characters and is required.'} Valid={valid} Setter={(l) => setLocation(l)} />
                        <Input<OpenXDA.Types.Location> Record={location} Field={'ShortName'} Feedback={'ShortName must be less than 50 characters.'} Valid={valid} Setter={(l) => setLocation(l)} />
                        <Input<OpenXDA.Types.Location> Record={location} Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={valid} Setter={(l) => setLocation(l)} />
                    </div>
                    <div className="col">
                        <Input<OpenXDA.Types.Location> Record={location} Field={'Latitude'} Feedback={'Latitude is a require numeric field.'} Valid={valid} Setter={(l) => setLocation(l)} />
                        <Input<OpenXDA.Types.Location> Record={location} Field={'Longitude'} Feedback={'Longitude is a require numeric field.'} Valid={valid} Setter={(l) => setLocation(l)} />
                        <TextArea<OpenXDA.Types.Location> Rows={3} Record={location} Field={'Description'} Valid={valid} Setter={(l) => setLocation(l)} />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (locationErrors.length == 0 && hasChanged ? '' : ' disabled')} type="submit" onClick={() => { if (locationErrors.length == 0 && hasChanged) updateLocation() }} data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                </div>
                <ToolTip Show={(locationErrors.length > 0 || !hasChanged) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                    {!hasChanged ? <p> No changes made.</p> : null}
                    {locationErrors.map((t, i) => <p key={i}>
                        <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> {t}
                    </p>)}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + (hasChanged ? '' : ' disabled')} data-tooltip="clear" onClick={() => setLocation(props.Location)} onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                </div>
                <ToolTip Show={hasChanged && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                    {props.Location.LocationKey != location.LocationKey ? <p> {Warning} Changes to Key will be discarded.</p> : null}
                    {props.Location.Name != location.Name ? <p> {Warning} Changes to Name will be discarded.</p> : null}
                    {props.Location.ShortName != location.ShortName ? <p> {Warning} Changes to ShortName will be discarded.</p> : null}
                    {props.Location.Alias != location.Alias ? <p> {Warning} Changes to Alias will be discarded.</p> : null}
                    {props.Location.Latitude != location.Latitude ? <p> {Warning} Changes to Latitude will be discarded.</p> : null}
                    {props.Location.Longitude != location.Longitude ? <p> {Warning} Changes to Longitude will be discarded.</p> : null}
                    {props.Location.Description != location.Description ? <p> {Warning} Changes to Description will be discarded.</p> : null}
                </ToolTip>
            </div>
        </div>
        )
}

export default LocationInfo