//******************************************************************************************************
//  MeterInfo.tsx - Gbtc
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
//  09/09/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { LoadingScreen, Search, ToolTip } from '@gpa-gemstone/react-interactive';
import MeterProperties from './PropertyUI/MeterProperties';
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
import AdditionalFieldsProperties from '../CommonComponents/AdditionalFieldsProperties';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter, StateSetter: (meter: OpenXDA.Types.Meter) => void }

const MeterInforWindow = (props: IProps) => {
    const [meter, setMeter] = React.useState<OpenXDA.Types.Meter>(props.Meter);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [assetKeyValid, setAssetKeyValid] = React.useState<boolean>(true);
    const [assetKey, setAssetKey] = React.useState<string>(props.Meter.AssetKey);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');
    const roles = useAppSelector(SelectRoles);

    const saveAddl = React.useRef<() => JQuery.jqXHR<void>>(undefined);
    const resetAddl = React.useRef<() => void>(undefined);
    const [addlFieldChanged, setAddlFieldChanged] = React.useState<string[]>([]);
    const [addlFieldError, setAddlFieldError] = React.useState<string[]>([]);

    React.useEffect(() => { setMeter(props.Meter); }, [props.Meter]);

    React.useEffect(() => {
        if (assetKey != meter.AssetKey)
            setAssetKey(meter.AssetKey);
    }, [meter]);

    React.useEffect(() => {
        let handle = validateAssetKey();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [assetKey]);

    function updateMeter(): () => void {
        setLoading(true);
        const updatedMeter: OpenXDA.Types.Meter = _.clone(meter);
        const mainHandle = $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/Meter/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(updatedMeter),
            dataType: 'json',
            cache: true,
            async: true
        }).done((meterID: Number) => {
            props.StateSetter(updatedMeter);
        });

        // If addl does not exist, do only main
        let addlHandle;
        let allHandles;
        if (saveAddl.current !== undefined) {
            addlHandle = saveAddl.current();
            allHandles = Promise.all([mainHandle, addlHandle]);
        } else allHandles = mainHandle;

        allHandles.then(() => { setLoading(false); }, () => { setLoading(false); });

        return () => {
            if (mainHandle != null && mainHandle.abort != null) mainHandle.abort();
            if (addlHandle != null && addlHandle.abort != null) addlHandle.abort();
        }
    }

    function validateAssetKey(): JQuery.jqXHR<string> {
        if (assetKey == null || assetKey.length == 0 || assetKey.length > 50)
            return null;

        let h = $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/MeterList/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: [{ FieldName: 'AssetKey', Operator: "=", SearchText: assetKey, Type: 'string' } as Search.IFilter<OpenXDA.Types.Meter>], OrderBy: "AssetKey", Ascending: true }),
            cache: false,
            async: true
        });
        h.done((d: string) => {
            let meters = JSON.parse(d);

            if (meters.length == 0)
                setAssetKeyValid(true);
            else if (meters.length > 1)
                setAssetKeyValid(false);
            else if (meters[0].ID == meter.ID)
                setAssetKeyValid(true);
            else
                setAssetKeyValid(false);

        });

        return h;
    }

    function valid(field: keyof(OpenXDA.Types.Meter)): boolean {
        if (field == 'AssetKey')
            return meter.AssetKey != null && meter.AssetKey.length > 0 && meter.AssetKey.length <= 50 && assetKeyValid;
        else if (field == 'Name')
            return meter.Name != null && meter.Name.length > 0 && meter.Name.length <= 200;
        else if (field == 'Alias')
            return meter.Alias == null || meter.Alias.length <= 200;
        else if (field == 'ShortName')
            return meter.ShortName == null || meter.ShortName.length <= 50;
        else if (field == 'Make')
            return meter.Make !== null;
        else if (field == 'Model')
            return meter.Model !== null;
        else if (field == 'Description')
            return true;
        return false;
    }

    function validMeter() {
        return addlFieldError.length === 0 || (valid('AssetKey') && valid('Name') && valid('ShortName') && valid('Alias') && valid('Make') && valid('Model'));
    }
    
    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    function hasChanged(): boolean {
        if (props.Meter == null)
            return false;
        return addlFieldChanged.length > 0 ||
            props.Meter.AssetKey != meter.AssetKey ||
            props.Meter.Name != meter.Name ||
            props.Meter.ShortName != meter.ShortName ||
            props.Meter.Alias != meter.Alias ||
            props.Meter.Make != meter.Make ||
            props.Meter.Model != meter.Model ||
            props.Meter.TimeZone != meter.TimeZone ||
            props.Meter.Description != meter.Description 
    }
    if (meter == null)
        return null;

    return (
        <div className="card" style={{ flex: 1, marginBottom: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Meter Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <MeterProperties Meter={meter} StateSetter={setMeter} />
                <AdditionalFieldsProperties ID={meter.ID} ParentTable={'Meter'} AddlFieldSaveRef={saveAddl} SetChangedList={setAddlFieldChanged} SetErrorList={setAddlFieldError} ResetAddlFieldRef={resetAddl} />
                <LoadingScreen Show={loading} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (validMeter() && hasChanged() ? '' : ' disabled')} type="submit" onClick={() => { if (validMeter() && hasChanged()) return updateMeter(); }} data-tooltip='submit' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                </div>
                <ToolTip Show={(!validMeter() || !hasChanged()) && hover == 'submit'} Position={'top'} Theme={'dark'} Target={"submit"}>
                    {!hasChanged() && hasPermissions()? <p> No changes made.</p> : null}
                    {!hasPermissions() ? <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p> : null}
                    {!valid('AssetKey') ? <p> {CrossMark} A unique Key of less than 50 characters is required.</p> : null}
                    {!valid('Name') ? <p> {CrossMark} A Name of less than 200 characters is required.</p> : null}
                    {!valid('ShortName') ? <p> {CrossMark} Short Name must be less than 50 characters.</p> : null}
                    {!valid('Alias') ? <p> {CrossMark} Alias must be less than 200 characters.</p> : null}
                    {!valid('Make') ? <p> {CrossMark} Make is required.</p> : null}
                    {!valid('Model') ? <p> {CrossMark} Model is required.</p> : null}
                    {addlFieldError.map((message,i) => <p key={i}> {CrossMark} {message}</p>)}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + (hasChanged() ? '' : ' disabled')} data-tooltip="clear" onClick={() => {
                        setMeter(props.Meter);
                        if (resetAddl.current !== undefined) resetAddl.current();
                    }} onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')} >Clear Changes</button>
                </div>
                <ToolTip Show={hasChanged() && hover == 'clear'} Position={'top'} Theme={'dark'} Target={"clear"}>
                    {props.Meter.AssetKey != meter.AssetKey ? <p> {Warning} Changes to Key will be discarded.</p> : null}
                    {props.Meter.Name != meter.Name ? <p> {Warning} Changes to Name will be discarded.</p> : null}
                    {props.Meter.ShortName != meter.ShortName ? <p> {Warning} Changes to Short Name will be discarded.</p> : null}
                    {props.Meter.Alias != meter.Alias ? <p> {Warning} Changes to Alias will be discarded.</p> : null}
                    {props.Meter.Make != meter.Make ? <p> {Warning} Changes to Make will be discarded.</p> : null}
                    {props.Meter.Model != meter.Model ? <p> {Warning} Changes to Model will be discarded.</p> : null}
                    {props.Meter.TimeZone != meter.TimeZone ? <p> {Warning} Changes to Time Zone will be discarded.</p> : null}
                    {props.Meter.Description != meter.Description ? <p> {Warning} Changes to Description will be discarded.</p> : null}
                    {addlFieldChanged.map((message, i) => <p key={i}> {Warning} {message}</p>)}
                </ToolTip>
            </div>

        </div>
    );


}

export default MeterInforWindow;