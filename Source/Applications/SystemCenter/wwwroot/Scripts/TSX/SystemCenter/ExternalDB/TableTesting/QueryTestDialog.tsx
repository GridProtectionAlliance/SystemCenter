//******************************************************************************************************
//  QueryTestDialog.tsx - Gbtc
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
//  10/05/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { Application, SystemCenter, OpenXDA } from '@gpa-gemstone/application-typings';
import { LoadingIcon, Modal, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table';
import { Warning } from '@gpa-gemstone/gpa-symbols';
import { Select, CheckBox } from '@gpa-gemstone/react-forms';
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
    PickType = 1,
    PickRecord = 2,
    Results = 3,
    Error = -1
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

    const requestCount = (filters) => { return null;  }

    const requestTable = (filters, orderBy, ascending, start, end) => {
        if (record === undefined) {
            return null;
        }

        return null;
        
    }
    const requestTest = React.useCallback(() => {
        setTestStatus('loading');
        let handle = $.ajax({
            type: "POST",
            url: `${slice.APIPath}/RetrieveExternalRecord`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
            data: JSON.stringify({ xdaRecord: xdaRecord, table: props.ExtTable })
        });
        handle.done((extData: any) => {
            setTestData(extData);
            if (extData == null || extData.length !== 1) {
                // This doesn't make that much sense on the face of it, 
                // but its useful to differentiate between a successful connection with no data and one with data
                setTestStatus('changed');
            } else {
                setTestStatus('idle');
            }
        });
        handle.fail((msg) => {
            setTestStatus("error");
            if (msg.status == 500)
                setErrorMsg(msg.responseJSON.ExceptionMessage);
        });
        return handle;
    }, [setTestStatus, slice.APIPath, xdaRecord, props.ExtTable]);

    const requestTestAll = React.useCallback(() => {
        setTestStatus('loading');
        let handle = $.ajax({
            type: "POST",
            url: `api/SystemCenter/extDBTables/RetrieveTable`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
            data: JSON.stringify(props.ExtTable)
        });
        handle.done((extData: any) => {
            setTestData(extData);
            if (extData == null || extData.length === 0) {
                // This doesn't make that much sense on the face of it, 
                // but its useful to differentiate between a successful connection with no data and one with data
                setTestStatus('changed');
            } else {
                setTestStatus('idle');
            }
        });
        handle.fail((msg) => {
            setTestStatus("error");
            if (msg.status == 500)
                setErrorMsg(msg.responseJSON.ExceptionMessage);
        });
        return handle;
    }, [setTestStatus, props.ExtTable]);

    React.useEffect(() => {
        setStep(steps.PickType);
        setRecordID(undefined);
    }, [props.Show])
   
    return (
        <>
            <Modal Title={"Test External Table Query"} Show={props.Show && step !== steps.PickRecord}
                ConfirmText={"Next"} ShowCancel={step !== steps.PickType && step !== steps.Error} ShowConfirm={step !== steps.Results && step !== steps.Error}
                CancelText={'Back'} CallBack={(conf, btn) => {
                    if (!btn) {
                        props.SetShow(false);
                        return;
                    }
                    if (conf) 
                        setStep(step => step + 1);
                    else
                        setStep(step => step - 1);
                }}>
                {step == steps.PickType ? <TargetTypesSelection SetTable={setParentTable} /> : null}
                {step == steps.Results ? <ResultDisplay GetCount={requestCount} GetTable={requestTable} ForceReload={step === steps.Results} /> : null}
                {step == steps.Error ? <ServerErrorIcon Show={true} Size={40} Label={errorMsg} /> : null}
            </Modal>
            {step == steps.PickRecord ? <TargetSelection OnBack={() => setStep(steps.PickType)} SetSelectedID={(id) => { setStep(steps.Results); setRecordID(id); }} Table={parentTable} /> : null}
        </>
    );
}


const data: RecordTypes[] = useAppSelector((state) => {
   
});
const status = useAppSelector((state) => {
    switch (props.Table) {
        case 'Meter': return ByMeterSlice.Status(state);
        case 'Location': return ByLocationSlice.Status(state);
        case 'Customer': return CustomerSlice.Status(state);
        default: return ByAssetSlice.Status(state);
    }
});