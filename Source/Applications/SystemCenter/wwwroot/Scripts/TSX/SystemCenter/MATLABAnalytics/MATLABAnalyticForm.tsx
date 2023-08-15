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
import * as _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MATLABAnalyticEventTypeSlice, MATLABAnalyticAssetTypeSlice, EventTypeSlice, AssetTypeSlice } from '../Store/Store';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Input, MultiCheckBoxSelect } from '@gpa-gemstone/react-forms';

export default function MATLABAnalyticForm(props: {
    Record: OpenXDA.Types.MATLABAnalytic,
    Setter: (record: OpenXDA.Types.MATLABAnalytic) => void,
    ETSetter: (records: OpenXDA.Types.MATLABAnalyticEventType[]) => void,
    ATSetter: (records: OpenXDA.Types.MATLABAnalyticAssetType[]) => void,
    setErrors?: (e: string[]) => void
}) {

    const dispatch = useAppDispatch();

    const [selectedEventTypes, setSelectedEventTypes] = React.useState<OpenXDA.Types.MATLABAnalyticEventType[]>([]);
    const [selectedAssetTypes, setSelectedAssetTypes] = React.useState<OpenXDA.Types.MATLABAnalyticAssetType[]>([]);

    const eventTypeData = useAppSelector(MATLABAnalyticEventTypeSlice.Data);
    const eventTypeStatus = useAppSelector(MATLABAnalyticEventTypeSlice.Status);
    const assetTypeData = useAppSelector(MATLABAnalyticAssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(MATLABAnalyticAssetTypeSlice.Status);

    const allEventTypes = useAppSelector(EventTypeSlice.Data);
    const allEventTypesStatus = useAppSelector(EventTypeSlice.Status);
    const allAssetTypes = useAppSelector(AssetTypeSlice.Data);
    const allAssetTypesStatus = useAppSelector(AssetTypeSlice.Status);

    const eventTypeParentID = useAppSelector(MATLABAnalyticEventTypeSlice.ParentID);
    const assetTypeParentID = useAppSelector(MATLABAnalyticAssetTypeSlice.ParentID);

    React.useEffect(() => {
        if (allEventTypesStatus == 'unintiated' || allEventTypesStatus == 'changed')
            dispatch(EventTypeSlice.Fetch());
    }, [allEventTypesStatus]);

    React.useEffect(() => {
        if (allAssetTypesStatus == 'unintiated' || allAssetTypesStatus == 'changed')
            dispatch(AssetTypeSlice.Fetch());
    }, [allAssetTypesStatus]);

    React.useEffect(() => {
        if (eventTypeStatus == 'unintiated' || eventTypeStatus == 'changed' || eventTypeParentID != props.Record.ID)
            dispatch(MATLABAnalyticEventTypeSlice.Fetch(props.Record.ID));
    }, [eventTypeStatus, props.Record]);

    React.useEffect(() => {
        if (assetTypeStatus == 'unintiated' || assetTypeStatus == 'changed' || assetTypeParentID != props.Record.ID)
            dispatch(MATLABAnalyticAssetTypeSlice.Fetch(props.Record.ID));
    }, [assetTypeStatus, props.Record]);

    React.useEffect(() => {
        setSelectedEventTypes(eventTypeData);
    }, [eventTypeData]);

    React.useEffect(() => {
        setSelectedAssetTypes(assetTypeData);
    }, [assetTypeData]);

    React.useEffect(() => {
        props.ETSetter(selectedEventTypes);
    }, [selectedEventTypes]);

    React.useEffect(() => {
        props.ATSetter(selectedAssetTypes);
    }, [selectedAssetTypes]);

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
                    <MultiCheckBoxSelect Label='Event Type'
                        Options={allEventTypes.map((item => ({ Value: item.ID, Text: item.Name.toString(), Selected: selectedEventTypes.findIndex((e) => e.EventTypeID == item.ID) !== -1 })))}
                        OnChange={(evt, opts) => {
                            let eventTypesCopy = _.cloneDeep(selectedEventTypes);
                            opts.forEach((et) => {
                                if (selectedEventTypes.findIndex((t) => t.EventTypeID == et.Value) !== -1) {
                                    eventTypesCopy = eventTypesCopy.filter((t) => t.EventTypeID !== et.Value);
                                } else {
                                    eventTypesCopy.push({ ID: 0, MATLABAnalyticID: props.Record.ID, EventTypeID: et.Value });
                                }
                            });
                            setSelectedEventTypes(eventTypesCopy);
                        }}
                    />
                    <MultiCheckBoxSelect Label='Asset Type'
                        Options={allAssetTypes.map((item => ({ Value: item.ID, Text: item.Name.toString(), Selected: selectedAssetTypes.findIndex((a) => a.AssetTypeID == item.ID) !== -1 })))}
                        OnChange={(evt, opts) => {
                            let assetTypesCopy = _.cloneDeep(selectedAssetTypes);
                            opts.forEach((at) => {
                                if (selectedAssetTypes.findIndex((t) => t.AssetTypeID == at.Value) !== -1) {
                                    assetTypesCopy = assetTypesCopy.filter((t) => t.AssetTypeID !== at.Value);
                                } else {
                                    assetTypesCopy.push({ ID: 0, MATLABAnalyticID: props.Record.ID, AssetTypeID: at.Value });
                                }
                            });
                            setSelectedAssetTypes(assetTypesCopy);
                        }}
                    />
                </div>
            </div>
        </form>

    );
}