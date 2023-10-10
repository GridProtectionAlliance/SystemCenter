//******************************************************************************************************
//  ChannelGroupDetailsForm.tsx - Gbtc
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
//  07/05/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { MeasurmentTypeSlice, MeasurementCharacteristicSlice, ValueListSlice, ValueListGroupSlice } from '../Store/Store';
import { useAppSelector, useAppDispatch } from '../hooks';

interface IProps {
    Record: SystemCenter.Types.ChannelGroupDetails,
    Setter: (record: SystemCenter.Types.ChannelGroupDetails) => void,
    SetErrors?: (e: string[]) => void
}

export default function ChannelGroupItemForm(props: IProps) {
    const dispatch = useAppDispatch();

    const measurementTypeData = useAppSelector(MeasurmentTypeSlice.Data);
    const measurementTypeStatus = useAppSelector(MeasurmentTypeSlice.Status);
    const measurementCharacteristicData = useAppSelector(MeasurementCharacteristicSlice.Data);
    const measurementCharacteristicStatus = useAppSelector(MeasurementCharacteristicSlice.Status);
    const valueListData = useAppSelector(ValueListSlice.Data);
    const valueListStatus = useAppSelector(ValueListSlice.Status);
    const valueListGroupData = useAppSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    React.useEffect(() => {
        if (valueListGroupStatus == 'unintiated' || valueListGroupStatus == 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);

    React.useEffect(() => {
        if (valueListStatus == 'unintiated' || valueListStatus == 'changed')
            dispatch(ValueListSlice.Fetch());
    }, [valueListStatus]);

    React.useEffect(() => {
        if (measurementTypeStatus == 'unintiated' || measurementTypeStatus == 'changed')
            dispatch(MeasurmentTypeSlice.Fetch());
    }, [measurementTypeStatus]);

    React.useEffect(() => {
        if (measurementCharacteristicStatus == 'unintiated' || measurementCharacteristicStatus == 'changed')
            dispatch(MeasurementCharacteristicSlice.Fetch());
    }, [measurementCharacteristicStatus]);

    function Valid(field: keyof (SystemCenter.Types.ChannelGroupDetails)): boolean {
        if (field == 'DisplayName')
            return props.Record.DisplayName != null && props.Record.DisplayName.length > 0 && props.Record.DisplayName.length <= 200;

        return true;
    }

    return (
        <>
            <Input<SystemCenter.Types.ChannelGroupDetails> Record={props.Record} Field={'DisplayName'} Label='Name' Feedback={'A Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <Select<SystemCenter.Types.ChannelGroupDetails> Record={props.Record} Field={'MeasurementTypeID'} Label='Measurement Type'
                Options={measurementTypeData.map((item => ({ Value: item.ID.toString(), Label: item.Name })))} Setter={props.Setter}
            />
            <Select<SystemCenter.Types.ChannelGroupDetails> Record={props.Record} Field={'MeasurementCharacteristicID'} Label='Measurement Characteristic'
                Options={measurementCharacteristicData.map((item => ({ Value: item.ID.toString(), Label: item.Name })))} Setter={props.Setter}
            />
            <Select<SystemCenter.Types.ChannelGroupDetails> Record={props.Record} Field={'Unit'} Label='Unit'
                Options={valueListData.filter((item) => item.GroupID == valueListGroupData.find((d) => d.Name == 'Unit').ID).map((item) => ({ Value: item.Value, Label: item.Value }))} Setter={props.Setter}
            />
        </>
    );
}