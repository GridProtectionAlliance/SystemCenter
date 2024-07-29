//******************************************************************************************************
//  QueryTestDialog.tsx - Gbtc
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
//  10/05/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal, Search, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ByMeterSlice, ByAssetSlice, ByLocationSlice, CustomerSlice } from '../../Store/Store';
import TargetSelection, { RecordTypes } from './TargetSelection';
import TargetTypesSelection from './TargetTypeSelection';
import ResultDisplay from './ResultDisplay';

interface IProps {
    ExtTable: SystemCenter.Types.extDBTables;
    Show: boolean;
    SetShow: (show: boolean) => void;
}

enum steps {
    Error = -1,
    PickType = 1,
    PickRecord = 2,
    Results = 3,
}


export default function QueryTestDialog(props: IProps) {
    const [step, setStep] = React.useState<steps>(steps.PickType);
    const [parentTable, setParentTable] = React.useState<string>('');
    const [recordId, setRecordID] = React.useState<number>(undefined);
    const record = useAppSelector((state) => {
        switch (parentTable) {
            case 'Meter': return ByMeterSlice.Datum(state, recordId);
            case 'Location': return ByLocationSlice.Datum(state, recordId);
            case 'Customer': return CustomerSlice.Datum(state, recordId)
            default: return ByAssetSlice.Datum(state, recordId)
        }
    });
    // Needed to Select Record for Query
    const dispatch = useAppDispatch();
    const [errorMsg, setErrorMsg] = React.useState<string>('');

    // Slice Properties
    const assetStatus = useAppSelector(ByAssetSlice.Status);
    const locationStatus = useAppSelector(ByLocationSlice.Status);
    const meterStatus = useAppSelector(ByMeterSlice.Status);
    const customerStatus = useAppSelector(CustomerSlice.Status);

    React.useEffect(() => {
        if (assetStatus === 'unintiated' || assetStatus == 'changed')
            dispatch(ByAssetSlice.Fetch());
    }, [assetStatus]);

    React.useEffect(() => {
        if (meterStatus === 'unintiated' || meterStatus == 'changed')
            dispatch(ByMeterSlice.Fetch());
    }, [meterStatus]);

    React.useEffect(() => {
        if (locationStatus === 'unintiated' || locationStatus == 'changed')
            dispatch(ByLocationSlice.Fetch());
    }, [locationStatus]);

    React.useEffect(() => {
        if (customerStatus === 'unintiated' || customerStatus == 'changed')
            dispatch(CustomerSlice.Fetch());
    }, [customerStatus]);

    React.useEffect(() => {
        console.log(step);
    }, [step])

    const requestCount = (filters) => {
        let handle;
        if (record === undefined) {
            handle = $.ajax({
                type: "POST",
                url: `api/SystemCenter/extDBTables/RetrieveTableCount`,
                contentType: "application/json; charset=utf-8",
                cache: false,
                async: true,
                data: JSON.stringify({ Ascending: false, OrderBy: '', Searches: filters, externalTable: props.ExtTable })
            }).fail((d) => { if (d.statusText === 'abort') return; setStep(steps.Error); setErrorMsg(d.statusText); });
        }
        else {
            handle = Promise.resolve(1);
        }
        return handle;
    }

    const requestTable = (start: number, end: number, filters: Search.IFilter<any>[], orderBy: string, ascending: boolean) => {
        const path = () => {
            switch (parentTable) {
                case 'Meter': return 'api/OpenXDA/ByMeter';
                case 'Location': return'api/OpenXDA/ByLocation';
                case 'Customer': return 'api/SystemCenter/Customer'
                default: return 'api/OpenXDA/ByAsset'
            }
        };
        let handle;
        if (record === undefined) {
            handle = $.ajax({
                type: "POST",
                url: `api/SystemCenter/extDBTables/RetrieveTempTable/${start}/${end}`,
                contentType: "application/json; charset=utf-8",
                cache: false,
                async: true,
                data: JSON.stringify({ Ascending: ascending, OrderBy: orderBy, Searches: filters, externalTable: props.ExtTable })
            });
        }
        else
            handle = $.ajax({
                type: "POST",
                url: `${path()}/RetrieveExternalRecord`,
                contentType: "application/json; charset=utf-8",
                cache: false,
                async: true,
                data: JSON.stringify({ xdaRecord: record, table: props.ExtTable })
            });
        return handle.fail((d) => { if (d.statusText === 'abort') return; setStep(steps.Error); setErrorMsg(d.statusText); });
    }

    return (
        <>
            <Modal Title={"Test External Table Query"} Show={props.Show && step !== steps.PickRecord}
                Size={step === steps.Results ? 'xlg' : 'lg'}
                ConfirmText={"Next"} ShowCancel={false}
                ShowConfirm={step !== steps.Results && step !== steps.Error}
                ShowX={true}
                CallBack={(conf, btn) => {
                    if (!btn) {
                        props.SetShow(false);
                        return;
                    }
                    if (conf) {
                        if (step === steps.PickType && parentTable === '')
                            setStep(step => step + 2);
                        else
                            setStep(step => step + 1);
                    }
                }}
                BodyStyle={{ maxHeight: 'calc(100vh - 210px)', display: 'flex', flexDirection: 'column' }}
            >
                {step == steps.PickType ? <TargetTypesSelection SetTable={setParentTable} /> : null}
                {step == steps.Results ? <ResultDisplay GetCount={requestCount} GetTable={requestTable} ForceReload={step === steps.Results} /> : null}
                {(step == steps.Error) ? <ServerErrorIcon Show={true} Size={40} Label={errorMsg} /> : null}
            </Modal>
            <TargetSelection OnBack={() => setStep(steps.PickType)}
                SetSelectedID={(id) => { setStep(steps.Results); setRecordID(id); }}
                Table={(parentTable === ''? 'Meter' : parentTable)}
                Show={step == steps.PickRecord && parentTable !== ''}
            />
        </>
    );
}