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

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter, StateSetter: (meter: OpenXDA.Types.Meter) => void }

const MeterProperties = (props: IProps) => {
    const [assetKeyValid, setAssetKeyValid] = React.useState<boolean>(true);
    const [assetKey, setAssetKey] = React.useState<string>(props.Meter.AssetKey);
    const [timeZones, setTimeZones] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
   

    React.useEffect(() => {
        let handle = getTimeZones();

        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [])

    React.useEffect(() => {
        if (assetKey != props.Meter.AssetKey)
            setAssetKey(props.Meter.AssetKey);
    }, [props.Meter]);

    React.useEffect(() => {
        let handle = validateAssetKey();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [assetKey]);

    function getTimeZones(): JQuery.jqXHR<Array<SystemCenter.Types.ValueListItem>> {
        if (sessionStorage.hasOwnProperty('SystemCenter.TimeZones')) {
            setTimeZones(JSON.parse(sessionStorage.getItem('SystemCenter.TimeZones')));
            return null;
        }

        let h = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/TimeZones`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        h.done((tzs: Array<SystemCenter.Types.ValueListItem>) => {
            setTimeZones(tzs);
            sessionStorage.setItem('SystemCenter.TimeZones', JSON.stringify(tzs));

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
            return props.Meter.Make != null && props.Meter.Make.length > 0 && props.Meter.Make.length <= 200;
        else if (field == 'Model')
            return props.Meter.Model != null && props.Meter.Model.length > 0 && props.Meter.Model.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }

    if (props.Meter == null)
        return null;

    return (
            <div className="row">
                <div className="col">

                <Input<OpenXDA.Types.Meter> Help={'Asset Key is used to match the data folder and needs to match the OpenMIC setting.'} Record={props.Meter} Field={'AssetKey'} Label={'Asset Key'} Feedback={'A unique key of less than 50 characters is required.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} />
                <Input<OpenXDA.Types.Meter> Record={props.Meter} Field={'Name'} Feedback={'Name must be less than 200 characters and is required.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} />
                <Input<OpenXDA.Types.Meter> Record={props.Meter} Field={'ShortName'} Label={'Short Name'} Feedback={'ShortName must be less than 50 characters.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} />
                <Input<OpenXDA.Types.Meter> Record={props.Meter} Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} />
                </div>
                <div className="col">
                <Input<OpenXDA.Types.Meter> Record={props.Meter} Field={'Make'} Feedback={'Make must be less than 200 characters.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} />
                <Input<OpenXDA.Types.Meter> Record={props.Meter} Field={'Model'} Feedback={'Model must be less than 200 characters.'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} />
                <Select<OpenXDA.Types.Meter> Help={'The Timezone needs to match the Timezone the meter is configured in.'} Record={props.Meter} Field={'TimeZone'} Options={timeZones.map(item => { return { Value: item.Value, Label: item.Value } })}
                    Label={'Time Zone'} Setter={(meter) => props.StateSetter(meter)} EmptyOption={true} EmptyLabel={'None Selected'} />
                            
                <TextArea<OpenXDA.Types.Meter> Rows={3} Record={props.Meter} Field={'Description'} Valid={valid} Setter={(meter: OpenXDA.Types.Meter) => props.StateSetter(meter)} />
                </div>
            </div>
    );


}

export default MeterProperties;