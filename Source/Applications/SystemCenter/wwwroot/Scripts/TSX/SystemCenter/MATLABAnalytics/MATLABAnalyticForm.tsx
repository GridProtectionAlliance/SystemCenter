//******************************************************************************************************
//  MATLABAnalyticForm.tsx - Gbtc
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
//  08/03/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { EventTypeSlice, AssetTypeSlice } from '../Store/Store';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Input, Select } from '@gpa-gemstone/react-forms';

export default function MATLABAnalyticForm(props: {
    Record: OpenXDA.Types.MATLABAnalytic,
    ETRecord: OpenXDA.Types.MATLABAnalyticEventType,
    ATRecord: OpenXDA.Types.MATLABAnalyticAssetType,
    Setter: (record: OpenXDA.Types.MATLABAnalytic) => void,
    ETSetter: (eventTypeRecord: OpenXDA.Types.MATLABAnalyticEventType) => void,
    ATSetter: (assetTypeRecord: OpenXDA.Types.MATLABAnalyticAssetType) => void,
    setErrors?: (e: string[]) => void
}) {
    const dispatch = useAppDispatch();

    const eventTypeData = useAppSelector(EventTypeSlice.Data);
    const eventTypeStatus = useAppSelector(EventTypeSlice.Status);
    const assetTypeData = useAppSelector(AssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(AssetTypeSlice.Status);

    React.useEffect(() => {
        if (eventTypeStatus == 'unintiated' || eventTypeStatus == 'changed')
            dispatch(EventTypeSlice.Fetch());
    }, [eventTypeStatus]);

    React.useEffect(() => {
        if (assetTypeStatus == 'unintiated' || assetTypeStatus == 'changed')
            dispatch(AssetTypeSlice.Fetch());
    }, [assetTypeStatus]);

    function Valid(field: keyof (OpenXDA.Types.MATLABAnalytic)): boolean {
        if (field == 'MethodName')
            return props.Record.MethodName !== null && props.Record.MethodName.length > 0;
        else if (field == 'AssemblyName')
            return props.Record.AssemblyName !== null && props.Record.AssemblyName.length > 0;
        return true;
    }

    return (
        <form>
            <div className="row">
                <div className="col">
                    <Input<OpenXDA.Types.MATLABAnalytic> Record={props.Record} Field={'MethodName'} Label={'Method Name'} Feedback={'A Method Name is required.'} Valid={Valid} Setter={props.Setter} />
                    <Input<OpenXDA.Types.MATLABAnalytic> Record={props.Record} Field={'AssemblyName'} Label={'Assembly Name'} Feedback={'An Assembly Name is required.'} Valid={Valid} Setter={props.Setter} />
                    <Input<OpenXDA.Types.MATLABAnalytic> Record={props.Record} Field={'LoadOrder'} Type={'number'} Valid={Valid} Setter={props.Setter} />
                </div>
                <div className="col">
                    <Select<OpenXDA.Types.MATLABAnalyticEventType> Record={props.ETRecord} Field={'EventTypeID'} Label='Event Type'
                        Options={eventTypeData.map((item => ({ Value: item.ID.toString(), Label: item.Name })))} Setter={props.ETSetter}
                    />
                    <Select<OpenXDA.Types.MATLABAnalyticAssetType> Record={props.ATRecord} Field={'AssetTypeID'} Label='Asset Type'
                        Options={assetTypeData.map((item => ({ Value: item.ID.toString(), Label: item.Name })))} Setter={props.ATSetter}
                    />
                </div>
            </div>
        </form>

    );
}