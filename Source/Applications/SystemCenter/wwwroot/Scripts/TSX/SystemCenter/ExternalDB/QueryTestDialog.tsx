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
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { LoadingIcon, Modal } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table';
import { Warning } from '@gpa-gemstone/gpa-symbols';
import { TextArea, Select, Input } from '@gpa-gemstone/react-forms';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ByMeterSlice, ByAssetSlice } from '../Store/Store';
import FilterSelect from '../CommonComponents/FilterSelect';

interface IProps {
    ExtTable: SystemCenter.Types.extDBTables;
    SetExtTable: (table: SystemCenter.Types.extDBTables) => void;
    Show: boolean;
    SetShow: (show: boolean) => void;
}

export default function QueryTestDialog(props: IProps) {
    // Allowed Tables
    const TableOptions = ["Meter", "Transformer", "Asset", "Line"];

    // General Control Variables
    const selectStorageID = "ExternalDB_QueryTestDialog"

    // External Table Buffer
    const [table, setTable] = React.useState<SystemCenter.Types.extDBTables>(props.ExtTable);

    // Select Properties
    const parentTableOptions = TableOptions.map(name => { return { Value: name, Label: name } });
    const [parentTable, setParentTable] = React.useState<{ TableName: string }>({ TableName: TableOptions[0] });
    const [showRecordSelect, setShowRecordSelect] = React.useState<boolean>(false);

    // Needed to Select Record for Query
    const dispatch = useAppDispatch();
    const slice = React.useMemo(() => {
        switch (parentTable.TableName) {
            default: case 'Meter': return ByMeterSlice;
            case 'Asset': case 'Transformer': case 'Line': return ByAssetSlice;
        }
    }, [parentTable]);
    const dataSelect = React.useMemo(() => {
        switch (parentTable.TableName) {
            default: case 'Meter': return ByMeterSlice.Data;
            case 'Asset': case 'Transformer': case 'Line': return ByAssetSlice.Data;
        }
    }, [parentTable]);
    const statusSelect = React.useMemo(() => {
        switch (parentTable.TableName) {
            default: case 'Meter': return ByMeterSlice.Status;
            case 'Asset': case 'Transformer': case 'Line': return ByAssetSlice.Status;
        }
    }, [parentTable]);
    const data: any[] = useAppSelector(dataSelect as (state: any) => any[]);
    const status = useAppSelector(statusSelect);

    // Query Properties
    type allowedRecordTypes = SystemCenter.Types.DetailedMeter | SystemCenter.Types.DetailedAsset;
    const [xdaRecord, setXdaRecord] = React.useState<allowedRecordTypes>(undefined);
    const [selectedRecord, setSelectedRecord] = React.useState<Set<number>>(new Set());
    const [testStatus, setTestStatus] = React.useState<Application.Types.Status>('unintiated');
    const [testData, setTestData] = React.useState<any>(undefined);

    const filterType = React.useMemo(() => {
        switch (parentTable.TableName) {
            default: case "Meter":
                localStorage.removeItem(selectStorageID);
                return 'Meter';
            case "Asset":
                localStorage.removeItem(selectStorageID);
                return'Asset';
            case 'Transformer':
                localStorage.setItem(selectStorageID, JSON.stringify([{
                    FieldName: "AssetType",
                    SearchText: "(Transformer)",
                    Operator: "IN",
                    Type: "enum",
                    isPivotColumn: false
                }]));
                return 'Asset';
            case 'Line':
                localStorage.setItem(selectStorageID, JSON.stringify([{
                    FieldName: "AssetType",
                    SearchText: "(Line)",
                    Operator: "IN",
                    Type: "enum",
                    isPivotColumn: false
                }]));
                return 'Asset';
        }
    }, [parentTable]);

    React.useEffect(() => {
        if (status === 'unintiated' || status == 'changed')
            dispatch(slice.Fetch());
    }, [status]);

    React.useEffect(() => {
        setTable(props.ExtTable);
    }, [props.ExtTable]);

    React.useEffect(() => {
        setXdaRecord(undefined);
    }, [parentTable]);

    React.useEffect(() => {
        const newSelect = new Set<number>();
        if (xdaRecord !== undefined) newSelect.add(xdaRecord.ID);
        setSelectedRecord(newSelect);
    }, [xdaRecord]);

    const requestTest = React.useCallback(() => {
        setTestStatus('loading');
        let handle = $.ajax({
            type: "POST",
            url: `${slice.APIPath}/RetrieveExternalRecord`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
            data: JSON.stringify({ xdaRecord: xdaRecord, table: table })
        });
        handle.done((extData: any) => {
            setTestStatus('idle');
            if (extData == null || extData.length === 0) {
                // This doesn't make that much sense on the face of it, 
                // but its useful to differentiate between a successful connection with no data and one with data
                setTestStatus('changed');
            } else {
                setTestData(extData);
                setTestStatus('idle');
            }
        })
        handle.fail(() => { setTestStatus("error"); })
        return handle;
    }, [setTestStatus, slice.APIPath, xdaRecord, table]);

    const changeQuery = React.useCallback((newTable: SystemCenter.Types.extDBTables) => {
        setTable(newTable);
        if (testStatus === 'idle') setTestStatus('unintiated');
    }, [setTable, setTestStatus, testStatus]);

    const onSelectCallback = React.useCallback((selected: Set<number>, conf: boolean) => {
        if (conf)
            setXdaRecord(data.find(item => selected.has(item.ID)));
        setShowRecordSelect(false);
    }, [setXdaRecord, data, setShowRecordSelect]);

    const getResponseMessage = React.useCallback(() => {
        switch (testStatus) {
            default: case 'unintiated':
                return (
                    <div style={{ margin: 'auto' }}>
                        {Warning}
                        <span>Test not yet ran.</span>
                    </div>);
            case 'loading':
                return <LoadingIcon Show={true} Label={"Test in progress..."} />;
            case 'error':
                return (
                    <div style={{ margin: 'auto' }}>
                        {Warning}
                        <span>Test failure. Please change test parameters, edit table query, or ensure that the database connection is valid.</span>
                    </div>);
            case 'changed':
                return (
                    <div style={{ margin: 'auto' }}>
                        {Warning}
                        <span>Table successfully queried, but no results were found. Please change test record or edit the table query.</span>
                    </div>);
            case 'idle':
                // Setting state and setting data should be batched, but just in case
                if (testData == null) return null;
                return (
                    <>
                        Test results:
                        <Table<any>
                            cols={
                                Object.keys(testData[0]).map((field: string) => {
                                    return { key: field, field: field, label: field }
                                })}
                            tableClass="table table-hover"
                            data={testData}
                            sortKey={null}
                            ascending={true}
                            onSort={() => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                            tbodyStyle={{ display: 'block', width: '100%', overflowX: 'scroll' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                            selected={() => false}
                        />
                    </>
                );
        }
    }, [testStatus, testData]);

    return (
        <>
            <Modal Title={"Test External Table Query"} Show={props.Show && !showRecordSelect}
                ConfirmText={(testStatus === 'idle' ? "Save and Close" : "Test Query")} DisableConfirm={(testStatus !== 'idle' && xdaRecord === undefined)}
                Size={'xlg'} ShowCancel={true} ShowX={true} CancelText={'Close'} CallBack={conf => {
                    if (conf) {
                        if (testStatus === 'idle') {
                            props.SetExtTable(table);
                            props.SetShow(false);
                        } else if (xdaRecord !== undefined) {
                            const handle = requestTest();
                            return () => { if (handle != null && handle.abort != null) handle.abort(); }
                        }
                    } else {
                        props.SetShow(false);
                    }
                }}>
                <div className="row" style={{ display: 'inline-block', width: 'calc(100% - 20px)', height: 'auto', paddingLeft: '18px' }}>
                    <TextArea<SystemCenter.Types.extDBTables> Rows={10} Record={table} Field={'Query'} Valid={() => true} Setter={changeQuery} />
                </div>
                <div className="row" style={{ alignItems: "center", display: 'flex', width: '100%', height: 'auto' }}>
                    <div className="col" style={{ width: '50%', height: '100%', float: 'left' }}>
                    <Select<{ TableName: string }> Label={'Select XDA Table'} Record={parentTable} Setter={setParentTable}
                            Field={'TableName'} Options={parentTableOptions} />
                    </div>
                    <div className="col" style={{ width: "50%", height: `100%`, float: 'right' }}>
                        <button className="btn btn-primary pull-left" hidden={false}
                            onClick={() => { setShowRecordSelect(true); }}>Get Xda Record</button>
                    </div>
                </div>
                <div className="row" style={{ display: 'flex', width: '100%', height: 'auto', paddingLeft: '18px' }}>
                    {xdaRecord === undefined ? null :
                        <Input<any> Record={xdaRecord} Field={parentTable.TableName === 'Meter' ? 'Name' : 'AssetName'} Setter={() => { }}
                            Valid={() => { return true; }} Disabled={true} Label='Selected XDA Record' />
                    }
                </div>
                <div className="row" style={{ display: 'flex', width: '100%', height: 'auto', alignContent: 'center', justifyContent: 'center' }}>
                    {getResponseMessage()}
                </div>
            </Modal>
            <FilterSelect OnCloseFunction={onSelectCallback} Selected={selectedRecord}
                ShowModal={showRecordSelect} Type={filterType} Single={true} StorageID={selectStorageID} Title='Select Xda Record' />
        </>
    );
}
