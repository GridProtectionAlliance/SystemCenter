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
import { useAppDispatch, useAppSelector } from '../hooks';
import { ByMeterSlice, ByAssetSlice, ByLocationSlice, CustomerSlice } from '../Store/Store';
import FilterSelect from '../CommonComponents/FilterSelect';

interface IProps {
    ExtTable: SystemCenter.Types.extDBTables;
    Show: boolean;
    SetShow: (show: boolean) => void;
}

// General Control Variables
const selectStorageID = "ExternalDB_QueryTestDialog";
const parentTableOptions = ['Meter', 'Location', 'Customer', 'Asset',
    "Line", "Line Segment", "Breaker", "Bus", "Capacitor Bank", "Capacitor Bank Relay", "Transformer", "DER"].map(name => { return { Value: name, Label: name } });
const pickParentStep = 1; const pickRecordStep = 2; const sendTestStep = 3;
interface TableOptions { ShowTableSelect: boolean, TableName: string };
type allowedRecordTypes = SystemCenter.Types.DetailedMeter | SystemCenter.Types.DetailedAsset | OpenXDA.Types.Customer | SystemCenter.Types.DetailedLocation;

export default function QueryTestDialog(props: IProps) {
    const [step, setStep] = React.useState<number>(pickParentStep);
    const [parentTable, setParentTable] = React.useState<TableOptions>({ ShowTableSelect: true, TableName: parentTableOptions[0].Value });

    // Needed to Select Record for Query
    const dispatch = useAppDispatch();
    const slice = React.useMemo(() => {
        switch (parentTable.TableName) {
            case 'Meter': return ByMeterSlice;
            case 'Location': return ByLocationSlice;
            case 'Customer': return CustomerSlice;
            default: return ByAssetSlice;
        }
    }, [parentTable]);
    const dataSelect = React.useMemo(() => {
        switch (parentTable.TableName) {
            case 'Meter': return ByMeterSlice.Data;
            case 'Location': return ByLocationSlice.Data;
            case 'Customer': return CustomerSlice.Data;
            default: return ByAssetSlice.Data;
        }
    }, [parentTable]);
    const statusSelect = React.useMemo(() => {
        switch (parentTable.TableName) {
            case 'Meter': return ByMeterSlice.Status;
            case 'Location': return ByLocationSlice.Status;
            case 'Customer': return CustomerSlice.Status;
            default: return ByAssetSlice.Status;
        }
    }, [parentTable]);
    const data: any[] = useAppSelector(dataSelect as (state: any) => any[]);
    const status = useAppSelector(statusSelect);

    // Query Properties
    const [xdaRecord, setXdaRecord] = React.useState<allowedRecordTypes>(undefined);
    const [selectedRecord, setSelectedRecord] = React.useState<Set<number>>(new Set());
    const [testStatus, setTestStatus] = React.useState<Application.Types.Status>('unintiated');
    const [errorMsg, setErrorMsg] = React.useState<string>("");
    const [testData, setTestData] = React.useState<any>(undefined);

    const filterType = React.useMemo(() => {
        switch (parentTable.TableName) {
            case "Meter": case "Location": case "Customer": case "Asset":
                localStorage.removeItem(selectStorageID);
                return parentTable.TableName;
            default:
                localStorage.setItem(selectStorageID, JSON.stringify([{
                    FieldName: "AssetType",
                    SearchText: `(${parentTable.TableName.replace(/\s/g, "")})`,
                    Operator: "IN",
                    Type: "enum",
                    isPivotColumn: false
                }]));
                return 'Asset';
        }
    }, [parentTable]);

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

    const onSelectCallback = React.useCallback((selected: Set<number>, conf: boolean) => {
        if (conf) {
            setXdaRecord(data.find(item => selected.has(item.ID)));
            setStep(step => step + 1);
        }
        else setStep(step => step - 1);
    }, [setXdaRecord, data, step, setStep]);

    const getBody = React.useCallback(() => {
        if (step === sendTestStep) {
            switch (testStatus) {
                case 'loading': return (<LoadingIcon Show={true} Label={"Test in progress..."} />);
                case 'error': return (<ServerErrorIcon Show={true} Size={40} Label={errorMsg} />);
                case 'changed':
                    return (
                        <div style={{ margin: 'auto' }}>
                            {Warning}
                            <span>{`Table successfully queried, but ${testData?.length ?? 0} results were found. Please change test record or edit the table query. Only one record should be found per XDA record, or all records if no record is selected.`}</span>
                        </div>);
                case 'idle':
                    // Setting state and setting data should be batched, but just in case
                    if (testData == null) return null;
                    return (
                        <Table<any>
                            cols={(
                                parentTable.ShowTableSelect ?
                                    [
                                        { key: 'label', field: 'label', label: 'Field', content: (item) => { return item; } },
                                        { key: 'only', field: 'only', label: 'Value', content: (item) => { return testData[0][item]; } }
                                    ] :
                                    Object.keys(testData[0]).map((field: string) => {
                                        return { key: field, field: field, label: field }
                                    })
                                )}
                            tableClass="table table-hover"
                            data={(parentTable.ShowTableSelect ? Object.keys(testData[0]) : testData)}
                            sortKey={null}
                            ascending={true}
                            onSort={() => { }}
                            onClick={() => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflow: 'auto' }}
                            tbodyStyle={{ display: 'block', width: '100%', overflowX: 'scroll' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflow: 'auto' }}
                            selected={() => false} />);
            }
        } else {
            return (
                <>
                    <div className="row" style={{ display: 'inline-block', width: 'calc(100% - 20px)', height: 'auto', paddingLeft: '18px' }}>
                        <CheckBox<TableOptions> Label={'Use Parent Type'} Record={parentTable} Setter={setParentTable}
                            Field={'ShowTableSelect'} />
                    </div>
                    <div className="row" style={{ display: 'inline-block', width: 'calc(100% - 20px)', height: 'auto', paddingLeft: '18px' }}>
                        {parentTable.ShowTableSelect ?
                            <Select<TableOptions> Label={''} Record={parentTable} Setter={setParentTable}
                                Field={'TableName'} Options={parentTableOptions} />
                            : null}
                    </div>
                </>);
        }
    }, [parentTable, setParentTable, parentTableOptions, testStatus, testData]);

    React.useEffect(() => {
        if (status === 'unintiated' || status == 'changed')
            dispatch(slice.Fetch());
    }, [status]);

    React.useEffect(() => {
        setXdaRecord(undefined);
    }, [parentTable]);

    React.useEffect(() => {
        setXdaRecord(undefined);
        setStep(pickParentStep);
        setParentTable({ ShowTableSelect: true, TableName: parentTableOptions[0].Value });
    }, [props.Show]);

    React.useEffect(() => {
        if (step === sendTestStep) {
            let handle;
            if (xdaRecord !== undefined) {
                handle = requestTest();
            } else {
                handle = requestTestAll();
            }
            return (() => { if (handle != null && handle.abort != null) handle.abort(); })
        }
        else (setTestStatus('unintiated'));
    }, [step, xdaRecord]);

    React.useEffect(() => {
        const newSelect = new Set<number>();
        if (xdaRecord !== undefined) newSelect.add(xdaRecord.ID);
        setSelectedRecord(newSelect);
    }, [xdaRecord]);

    return (
        <>
            <Modal Title={"Test External Table Query"} Show={props.Show && step !== pickRecordStep}
                ConfirmText={(step !==  sendTestStep ? "Next" : "Finish")} Size={step === pickParentStep ? 'sm' : (parentTable.ShowTableSelect ? 'lg' : 'xlg')} ShowCancel={true} ShowX={false}
                CancelText={(step !== pickParentStep ? 'Back' : 'Close')} CallBack={conf => {
                    if (conf) {
                        if (step === pickParentStep && !parentTable.ShowTableSelect) setStep(sendTestStep);
                        else if (step === sendTestStep) props.SetShow(false);
                        else setStep(step => step + 1);
                    } else {
                        if (step === sendTestStep && !parentTable.ShowTableSelect) setStep(pickParentStep);
                        else if (step === pickParentStep) props.SetShow(false);
                        else setStep(step => step - 1)
                    }
                }}>
                {getBody()}
            </Modal>
            <FilterSelect OnCloseFunction={onSelectCallback} Selected={selectedRecord}
                ShowModal={step === pickRecordStep} Type={filterType} Single={true} StorageID={selectStorageID} Title='Select Test Record' />
        </>
    );
}
