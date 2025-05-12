//******************************************************************************************************
//  MATLABAnalyticInfo.tsx - Gbtc
//
//  Copyright � 2020, Grid Protection Alliance.  All Rights Reserved.
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
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { useAppDispatch } from '../hooks';
import { MATLABAnalyticSlice, MATLABAnalyticEventTypeSlice, MATLABAnalyticAssetTypeSlice } from '../Store/Store';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import MATLABAnalyticForm from './MATLABAnalyticForm';


const MATLABAnalyticInfo = (props: { Record: OpenXDA.Types.MATLABAnalytic, ETRecords: OpenXDA.Types.MATLABAnalyticEventType[], ATRecords: OpenXDA.Types.MATLABAnalyticAssetType[] }) => {
    const [record, setRecord] = React.useState<OpenXDA.Types.MATLABAnalytic>(props.Record);
    const [eventTypeRecord, setEventTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticEventType[]>(props.ETRecords);
    const [assetTypeRecord, setAssetTypeRecord] = React.useState<OpenXDA.Types.MATLABAnalyticAssetType[]>(props.ATRecords);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('update' | 'none')>('none');

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        let e = [];
        if (record.MethodName === null || record.MethodName.length === 0) {
            e.push('A Method Name is required.');
        }
        if (record.AssemblyName === null || record.AssemblyName.length === 0) {
            e.push('An Assembly Name is required.');
        }

        setErrors(e);
    }, [record]);


    if (record == null) return;
    return (
        <div className="card" style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Analytic Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ overflowY: 'hidden', flex: 1 }}>
                <MATLABAnalyticForm Record={record} Setter={setRecord} ETSetter={setEventTypeRecord} ATSetter={setAssetTypeRecord} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (((record == props.Record && eventTypeRecord == props.ETRecords && assetTypeRecord == props.ATRecords) || errors.length > 0) ? ' disabled' : '')}
                        onClick={() => {
                            if (errors.length == 0) {
                                dispatch(MATLABAnalyticSlice.DBAction({ verb: 'PATCH', record }));

                                // Update event types
                                props.ETRecords.filter((item) => eventTypeRecord.findIndex((e) => e.EventTypeID == item.EventTypeID) < 0)
                                    .forEach((item) => dispatch(MATLABAnalyticEventTypeSlice.DBAction({ verb: 'DELETE', record: item })));

                                eventTypeRecord.filter((item) => props.ETRecords.findIndex((e) => e.EventTypeID == item.EventTypeID) < 0)
                                    .forEach((item) => dispatch(MATLABAnalyticEventTypeSlice.DBAction({ verb: 'POST', record: item })));

                                // Update asset types
                                props.ATRecords.filter((item) => assetTypeRecord.findIndex((a) => a.AssetTypeID == item.AssetTypeID) < 0)
                                    .forEach((item) => dispatch(MATLABAnalyticAssetTypeSlice.DBAction({ verb: 'DELETE', record: item })));

                                assetTypeRecord.filter((item) => props.ATRecords.findIndex((a) => a.AssetTypeID == item.AssetTypeID) < 0)
                                    .forEach((item) => dispatch(MATLABAnalyticAssetTypeSlice.DBAction({ verb: 'POST', record: item })));
                            }
                        }}
                        hidden={record.ID == 0} data-tooltip={'Update-Info'}
                        onMouseEnter={() => setHover('update')} onMouseLeave={() => setHover('none')}>Save Changes</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-warning"
                        onClick={() => {
                            setRecord(props.Record);
                            setEventTypeRecord(props.ETRecords);
                            setAssetTypeRecord(props.ATRecords);
                        }}
                        disabled={record == props.Record && eventTypeRecord == props.ETRecords && assetTypeRecord == props.ATRecords}>Clear Changes</button>
                </div>
                <ToolTip Position={'top'} Target={"Update-Info"}
                    Show={hover == 'update' && (errors.length > 0 || (record == props.Record && eventTypeRecord == props.ETRecords && assetTypeRecord == props.ATRecords))}>
                        {(record == props.Record) ? <p>No changes made.</p> : null}
                    {errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                </ToolTip>
            </div>
        </div>
    );
}

export default MATLABAnalyticInfo;