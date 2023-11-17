//******************************************************************************************************
//  MeterProperties.tsx - Gbtc
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
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { Search } from '@gpa-gemstone/react-interactive';
import { useAppSelector } from '../../hooks';
import { SelectRoles } from '../../Store/UserSettings';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter, StateSetter: (meter: OpenXDA.Types.Meter) => void }

const MeterProperties = (props: IProps) => {
    const [assetKeyValid, setAssetKeyValid] = React.useState<boolean>(true);
    const [assetKey, setAssetKey] = React.useState<string>(props.Meter.AssetKey);
    const [timeZones, setTimeZones] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const [makeList, setMakeList] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const [modelList, setModelList] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const roles = useAppSelector(SelectRoles);
   

    React.useEffect(() => {
        let timeHandle = getValueList("TimeZones", setTimeZones);
        let makeHandle = getValueList("Make", setMakeList);
        let modelHandle = getValueList("Model", setModelList);

        return () => {
            if (timeHandle != null && timeHandle.abort != null) timeHandle.abort();
            if (makeHandle != null && makeHandle.abort != null) makeHandle.abort();
            if (modelHandle != null && modelHandle.abort != null) modelHandle.abort();
        }
    }, [])

    React.useEffect(() => {
        if (assetKey != props.Meter.AssetKey)
            setAssetKey(props.Meter.AssetKey);
    }, [props.Meter]);

    React.useEffect(() => {
        let handle = validateAssetKey();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [assetKey]);

    function getValueList(listName: string, setter: (value: Array<SystemCenter.Types.ValueListItem>) => void): JQuery.jqXHR<Array<SystemCenter.Types.ValueListItem>> {
        let h = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${listName}`,
            contentType: "application/json; charset=utf-8",
            dataType: `json`,
            cache: false,
            async: true
        });
        h.done((tzs: Array<SystemCenter.Types.ValueListItem>) => {
            setter(tzs);

        });
        return h;
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
            else if (meters[0].ID == props.Meter.ID)
                setAssetKeyValid(true);
            else
                setAssetKeyValid(false);

        });

        return h;
    }

    function valid(field: keyof (OpenXDA.Types.Meter)): boolean {
        if (field == 'AssetKey')
            return props.Meter.AssetKey != null && props.Meter.AssetKey.length > 0 && props.Meter.AssetKey.length <= 50 && assetKeyValid;
        else if (field == 'Name')
            return props.Meter.Name != null && props.Meter.Name.length > 0 && props.Meter.Name.length <= 200;
        else if (field == 'Alias')
            return props.Meter.Alias == null || props.Meter.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.Meter.ShortName == null || props.Meter.ShortName.length <= 50;
        else if (field == 'Make')
            return props.Meter.Make != null;
        else if (field == 'Model')
            return props.Meter.Model != null;
        else if (field == 'Description')
            return true;
        return false;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return true;
        return false;
    }

    if (props.Meter == null)
        return null;

    return (
            <div className="row">
                <div className="col">

                <Input<OpenXDA.Types.Meter> Help={'Key is used to match the data folder and must match the openMIC setting.'} Record={props.Meter} Field={'AssetKey'} Label={'Key'} Feedback={'A unique Key of less than 50 characters is required.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} Disabled={hasPermissions()} />
                <Input<OpenXDA.Types.Meter> Record={props.Meter} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} Disabled={hasPermissions()} />
                <Input<OpenXDA.Types.Meter> Record={props.Meter} Field={'ShortName'} Label={'Short Name'} Feedback={'Short Name must be less than 50 characters.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} Disabled={hasPermissions()} />
                <Input<OpenXDA.Types.Meter> Record={props.Meter} Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} Disabled={hasPermissions()} />
                </div>
                <div className="col">
                <Select<OpenXDA.Types.Meter> Record={props.Meter} Field={'Make'} Options={makeList.map(item => { return { Value: item.Value, Label: item.AltValue ?? item.Value } })} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} Disabled={hasPermissions()} />
                <Select<OpenXDA.Types.Meter> Record={props.Meter} Field={'Model'} Options={modelList.map(item => { return { Value: item.Value, Label: item.AltValue ?? item.Value } })} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} Disabled={hasPermissions()} />
                <Select<OpenXDA.Types.Meter> Help={'This Time Zone must match the Time Zone in which the Meter is configured.'} Record={props.Meter} Field={'TimeZone'} Options={timeZones.map(item => { return { Value: item.Value, Label: item.AltValue ?? item.Value } })}
                    Label={'Time Zone'} Setter={(meter) => props.StateSetter(meter)} EmptyOption={true} EmptyLabel={'None Selected'} Disabled={hasPermissions()}/>
                            
                <TextArea<OpenXDA.Types.Meter> Rows={3} Record={props.Meter} Field={'Description'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} Disabled={hasPermissions()} />
                </div>
            </div>
    );


}

export default MeterProperties;