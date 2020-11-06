//******************************************************************************************************
//  Page1.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, SystemCenter } from '../global';
import FormInput from '../CommonComponents/FormInput';
import FormTextArea from '../CommonComponents/FormTextArea';
import { useDispatch, useSelector } from 'react-redux';
import { SelectValueList, SelectValueListStatus, FetchValueList } from '../Store/ValueListSlice';
import { SelectMeterKeysLowerCase, SelectMeterStatus, FetchMeter } from '../Store/MeterSlice';

declare var homePath: string;

export default function Page1(props: { MeterInfo: OpenXDA.Meter, UpdateMeterInfo: (record: OpenXDA.Meter) => void }) {
    const dispatch = useDispatch();
    const timeZones = useSelector(state => SelectValueList(state, 'TimeZones'));
    const tzStatus = useSelector(state => SelectValueListStatus(state, 'TimeZones')) as SystemCenter.Status;
    const meterKeys = useSelector(SelectMeterKeysLowerCase);
    const mStatus = useSelector(SelectMeterStatus);

    React.useEffect(() => {
        if (mStatus === 'unintiated' || mStatus === 'changed') {
            dispatch(FetchMeter());
            return function () {
            }
        }
    }, [dispatch, mStatus]);

    React.useEffect(() => {
        if (tzStatus === 'unintiated' || tzStatus === 'changed') {
            dispatch(FetchValueList({ group: 'TimeZones' }));
            return function () {
            }
        }
    }, [dispatch, tzStatus]);

    function valid(field: keyof (OpenXDA.Meter)): boolean {
        if (field == 'AssetKey')
            return props.MeterInfo.AssetKey != null && meterKeys.indexOf(props.MeterInfo.AssetKey.toLowerCase()) < 0 &&props.MeterInfo.AssetKey.length > 0 && props.MeterInfo.AssetKey.length <= 50;
        else if (field == 'Name')
            return props.MeterInfo.Name != null && props.MeterInfo.Name.length > 0 && props.MeterInfo.Name.length <= 200;
        else if (field == 'Alias')
            return props.MeterInfo.Alias == null || props.MeterInfo.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.MeterInfo.ShortName == null || props.MeterInfo.ShortName.length <= 50;
        else if (field == 'Make')
            return props.MeterInfo.Make != null && props.MeterInfo.Make.length > 0 && props.MeterInfo.Make.length <= 200;
        else if (field == 'Model')
            return props.MeterInfo.Model != null && props.MeterInfo.Model.length > 0 && props.MeterInfo.Model.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }

     return (
            <div className="row">
                <div className="col">
                 <FormInput<OpenXDA.Meter> Record={props.MeterInfo} Field={'AssetKey'} Feedback={'A unique key of less than 50 characters is required.'} Valid={valid} Setter={props.UpdateMeterInfo} />
                 <FormInput<OpenXDA.Meter> Record={props.MeterInfo} Field={'Name'} Feedback={'Name must be less than 200 characters and is required.'} Valid={valid} Setter={props.UpdateMeterInfo} />
                 <FormInput<OpenXDA.Meter> Record={props.MeterInfo} Field={'ShortName'} Feedback={'ShortName must be less than 50 characters.'} Valid={valid} Setter={props.UpdateMeterInfo} />
                 <FormInput<OpenXDA.Meter> Record={props.MeterInfo} Field={'Alias'} Feedback={'Alias must be less than 200 characters.'} Valid={valid} Setter={props.UpdateMeterInfo} />
                </div>
                <div className="col">
                 <FormInput<OpenXDA.Meter> Record={props.MeterInfo} Field={'Make'} Feedback={'Make must be less than 200 characters.'} Valid={valid} Setter={props.UpdateMeterInfo} />
                 <FormInput<OpenXDA.Meter> Record={props.MeterInfo} Field={'Model'} Feedback={'Model must be less than 200 characters.'} Valid={valid} Setter={props.UpdateMeterInfo} />
                    <div className="form-group">
                        <label>Time Zone</label>
                        <select className="form-control" value={props.MeterInfo == null || props.MeterInfo.TimeZone == null ? '-1' : props.MeterInfo.TimeZone} onChange={(evt) => {
                            var meter: OpenXDA.Meter = _.clone(props.MeterInfo);
                            if (evt.target.value != "-1")
                                meter.TimeZone = evt.target.value;
                            else
                                meter.TimeZone = null;
                         props.UpdateMeterInfo(meter);
                        }}>
                            <option value="-1">None Selected</option>
                            {
                                (timeZones != null ? timeZones.map(tz => <option value={tz.Text} key={tz.Text} disabled={!tz.Enabled} hidden={tz.Hidden}>{tz.AltText1}</option>) : null)
                            }
                        </select>
                    </div>
                 <FormTextArea<OpenXDA.Meter> Rows={3} Record={props.MeterInfo} Field={'Description'} Valid={valid} Setter={props.UpdateMeterInfo} />
                </div>
            </div>
        );

}

