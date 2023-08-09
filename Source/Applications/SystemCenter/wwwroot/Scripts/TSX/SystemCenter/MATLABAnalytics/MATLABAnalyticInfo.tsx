//******************************************************************************************************
//  MATLABAnalyticInfo.tsx - Gbtc
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
//  08/07/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { EventTypeSlice, AssetTypeSlice, MATLABAnalyticSlice } from '../Store/Store';
import { ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { Input, Select } from '@gpa-gemstone/react-forms';


const MATLABAnalyticInfo = (props: { Record: OpenXDA.Types.MATLABAnalytic, ETRecord: OpenXDA.Types.MATLABAnalyticEventType, ATRecord: OpenXDA.Types.MATLABAnalyticAssetType }) => {
    const [record, setRecord] = React.useState<OpenXDA.Types.MATLABAnalytic>(props.Record);
    const [eventTypeRecord, setEventTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticEventType>(props.ETRecord);
    const [assetTypeRecord, setAssetTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticAssetType>(props.ATRecord);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('update' | 'none')>('none');

    const dispatch = useAppDispatch();
    const eventTypeData = useAppSelector(EventTypeSlice.Data);
    const eventTypeStatus = useAppSelector(EventTypeSlice.Status);
    const assetTypeData = useAppSelector(AssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(AssetTypeSlice.Status);

    React.useEffect(() => {
        let e = [];
        if (record.MethodName === null || record.MethodName.length === 0) {
            e.push('An Analytic Name is required.');
        }
        if (record.AssemblyName === null || record.AssemblyName.length === 0) {
            e.push('An Assembly Name is required.');
        }

        setErrors(e);
    }, [record]);

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
            return record.MethodName !== null && record.MethodName.length > 0;
        else if (field == 'AssemblyName')
            return record.AssemblyName !== null && record.AssemblyName.length > 0;
        return true;
    }

    // REMEMBER: Need to separate these into separate patch requests to ensure original slice status gets changed
    function updateAnalytic() {
        let handle = $.ajax({
            type: "PATCH",
            url: `${homePath}api/OpenXDA/MATLABAnalytic/Update/All`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                MATLABAnalytic: record,
                MATLABAnalyticEventType: eventTypeRecord,
                MATLABAnalyticAssetType: assetTypeRecord,
            }),
            dataType: 'json',
            cache: false,
            async: true
        }).done(() => {
            
        });

        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        };
    }


    if (record == null) return;
    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Analytic Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <Input<OpenXDA.Types.MATLABAnalytic> Record={record} Field={'MethodName'} Label={'Analytic Name'} Feedback={'An Analytic Name is required.'} Valid={Valid} Setter={setRecord} />
                        <Input<OpenXDA.Types.MATLABAnalytic> Record={record} Field={'AssemblyName'} Label={'Assembly Name'} Feedback={'An Assembly Name is required.'} Valid={Valid} Setter={setRecord} />

                        <Input<OpenXDA.Types.MATLABAnalytic> Record={record} Field={'LoadOrder'} Type={'number'} Valid={Valid} Setter={setRecord} />
                    </div>
                    <div className="col">
                        <Select<OpenXDA.Types.MATLABAnalyticEventType> Record={eventTypeRecord} Field={'EventTypeID'} Label='Event Type'
                            Options={eventTypeData.map((item => ({ Value: item.ID.toString(), Label: item.Name })))} Setter={setEventTypeRecord}
                        />
                        <Select<OpenXDA.Types.MATLABAnalyticAssetType> Record={assetTypeRecord} Field={'AssetTypeID'} Label='Asset Type'
                            Options={assetTypeData.map((item => ({ Value: item.ID.toString(), Label: item.Name })))} Setter={setAssetTypeRecord}
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (((record == props.Record && eventTypeRecord == props.ETRecord && assetTypeRecord == props.ATRecord) || errors.length > 0) ? ' disabled' : '')}
                        onClick={() => {
                            if (errors.length == 0)
                                updateAnalytic();
                        }}
                        hidden={record.ID == 0} data-tooltip={'Update-Info'}
                        onMouseEnter={() => setHover('update')} onMouseLeave={() => setHover('none')}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default"
                        onClick={() => {
                            setRecord(props.Record);
                            setEventTypeRecord(props.ETRecord);
                            setAssetTypeRecord(props.ATRecord);
                        }}
                        disabled={record == props.Record && eventTypeRecord == props.ETRecord && assetTypeRecord == props.ATRecord}>Reset</button>
                </div>
                <ToolTip Show={hover == 'update' && (errors.length > 0 || (record == props.Record && eventTypeRecord == props.ETRecord && assetTypeRecord == props.ATRecord))} Position={'top'} Target={"Update-Info"}>
                    {(record == props.Record && eventTypeRecord == props.ETRecord && assetTypeRecord == props.ATRecord) ? <p>No changes made.</p> : null}
                    {errors.map((t, i) => <p key={i}>{CrossMark} {t}</p>)}
                </ToolTip>
            </div>


        </div>
    );
}

export default MATLABAnalyticInfo;