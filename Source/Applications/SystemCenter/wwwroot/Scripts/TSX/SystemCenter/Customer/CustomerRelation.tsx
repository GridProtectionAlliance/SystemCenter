//******************************************************************************************************
//  CustomerRelation.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  09/22/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import GenericRelation from '../CommonComponents/GenericRelation';
import { OpenXDA as LocalXDA, SystemCenter as SC } from '../global'
import { GenericController, Search, SearchBar, LoadingScreen, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import ControllerSelectPopup from '../CommonComponents/ControllerSelectPopup';
import { Column } from '@gpa-gemstone/react-table';

interface IProps {
    Record: OpenXDA.Types.Meter | OpenXDA.Types.Asset
}

const CustomerController = new GenericController<OpenXDA.Types.Customer>(`${homePath}api/SystemCenter/Customer`, "Name", true);
const CustomerAssetController = new GenericController<LocalXDA.CustomerAsset>(`${homePath}api/SystemCenter/CustomerAsset`, 'AssetName', true);
const CustomerMeterController = new GenericController<LocalXDA.CustomerMeter>(`${homePath}api/SystemCenter/CustomerMeter`, 'MeterName', true);

const CustomerSearchCols: Search.IField<OpenXDA.Types.Customer>[] = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Account Name', key: 'CustomerKey', type: 'string', isPivotField: false },
    { label: 'Phone', key: 'Phone', type: 'string', isPivotField: false },
    { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
];

const CustomerAssetColumns: SC.IByCol<LocalXDA.CustomerAsset>[] = [
    { Field: "CustomerName", Label: "Customer Name", Type: "string" },
    { Field: "CustomerKey", Label: "Customer Key", Type: "string" }
]
const CustomerMeterColumns: SC.IByCol<LocalXDA.CustomerMeter>[] = [
    { Field: "CustomerName", Label: "Customer Name", Type: "string" },
    { Field: "CustomerKey", Label: "Customer Key", Type: "string" }
]

const BlankCustomerMeter: LocalXDA.CustomerMeter = { ID: -1, CustomerID: -1, MeterID: -1, CustomerKey: "", CustomerName: "", MeterKey: "", MeterName: "", MeterLocation: "" }
const BlankCustomerAsset: LocalXDA.CustomerAsset = { ID: -1, CustomerID: -1, AssetID: -1, CustomerKey: "", CustomerName: "", AssetKey: "", AssetName: "", AssetType: "" }

const CustomerRelation = (props: IProps) => {
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [selectedCustomers, setSelectedCustomers] = React.useState<OpenXDA.Types.Customer[]>([]);
    const [searchResults, setSearchResults] = React.useState<LocalXDA.CustomerAsset[] | LocalXDA.CustomerMeter[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [detailedRecord, setDetailedRecord] = React.useState<SystemCenter.Types.DetailedAsset | SystemCenter.Types.DetailedMeter | null>(null)
    const [detailedRecordStatus, setDetailedRecordStatus] = React.useState<Application.Types.Status>('uninitiated');

    const recordType = React.useMemo(() => props.Record['Make'] != undefined ? "Meter" : "Asset", [props.Record])

    const customerMeterFilters: Search.IFilter<LocalXDA.CustomerMeter>[] = React.useMemo(() => [{ SearchText: props.Record.ID.toString(), FieldName: "MeterID", Operator: "=", Type: "number", IsPivotColumn: false }], [props.Record])
    const customerAssetFilters: Search.IFilter<LocalXDA.CustomerAsset>[] = React.useMemo(() => [{ SearchText: props.Record.ID.toString(), FieldName: "AssetID", Operator: "=", Type: "number", IsPivotColumn: false }], [props.Record])

    React.useEffect(() => {
        setDetailedRecordStatus('loading');
        const getUrl = recordType === 'Meter' ? `${homePath}api/OpenXDA/ByMeter/One/${props.Record.ID}` : `${homePath}api/OpenXDA/ByAsset/One/${props.Record.ID}`
        const handle = $.ajax({
            type: "GET",
            url: getUrl,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d) => {
            setDetailedRecord(d);
            setDetailedRecordStatus('idle');
        }).fail(() => setDetailedRecordStatus('error'));

        return () => { if (handle != null && handle.abort != null) return handle.abort() }

    }, [recordType, props.Record])


    const noSameFilter: Search.IFilter<OpenXDA.Types.Customer>[] = React.useMemo(() => {
        const filter = {
            FieldName: 'ID',
            SearchText: searchResults.map((r) => r.CustomerID).join(','),
            Operator: 'NOT IN' as Search.OperatorType,
            Type: 'string' as Search.FieldType,
            IsPivotColumn: false
        }
        return [filter];
    }, [searchResults]);

    return (
        <>
            <LoadingScreen Show={detailedRecordStatus === 'loading'} />
            <ServerErrorIcon Show={detailedRecordStatus === 'error'} />
            {detailedRecordStatus === 'idle' ?
                recordType === 'Meter' ?
                    <GenericRelation<LocalXDA.CustomerMeter>
                        Controller={CustomerMeterController}
                        RecordType={'Customer'}
                        SetSearchResults={setSearchResults}
                        Columns={CustomerMeterColumns}
                        GetName={() => ""}
                        BlankRecord={BlankCustomerMeter}
                        Filters={customerMeterFilters}
                        DeleteColumn={true}
                        RefreshCount={refreshCount}
                        AddNew={() => setShowAdd(true)}
                        IsEditable={() => true}
                    /> :
                    <GenericRelation<LocalXDA.CustomerAsset>
                        Controller={CustomerAssetController}
                        RecordType={'Customer'}
                        SetSearchResults={setSearchResults}
                        Columns={CustomerAssetColumns}
                        GetName={() => ""}
                        BlankRecord={BlankCustomerAsset}
                        Filters={customerAssetFilters}
                        DeleteColumn={true}
                        RefreshCount={refreshCount}
                        AddNew={() => setShowAdd(true)}
                        IsEditable={() => true }
                    /> : null}
            <ControllerSelectPopup<OpenXDA.Types.Customer>
                Controller={CustomerController}
                OnClose={(selected, conf) => {
                    setShowAdd(false);
                    setSelectedCustomers([]);
                    if (!conf) return;
                    switch (recordType) {
                        case 'Meter':
                            Promise.all(
                                selected.map((customer) => {
                                    const detailedMeter = detailedRecord as SystemCenter.Types.DetailedMeter;
                                    const newRelation: LocalXDA.CustomerMeter = {
                                        ID: -1,
                                        MeterID: props.Record.ID,
                                        CustomerID: customer.ID,
                                        CustomerKey: customer.CustomerKey,
                                        CustomerName: customer.Name,
                                        MeterKey: props.Record.AssetKey,
                                        MeterName: detailedMeter.Name,
                                        MeterLocation: detailedMeter.Location
                                    }
                                    return CustomerMeterController.DBAction("POST", newRelation)
                                })
                            ).then(() => refreshData(x => x + 1))
                            break;
                        default:
                            Promise.all(
                                selected.map((customer) => {
                                    const detailedAsset = detailedRecord as SystemCenter.Types.DetailedAsset;
                                    const newRelation: LocalXDA.CustomerAsset = {
                                        ID: -1,
                                        AssetID: props.Record.ID,
                                        CustomerID: customer.ID,
                                        CustomerKey: customer.CustomerKey,
                                        CustomerName: customer.Name,
                                        AssetKey: props.Record.AssetKey,
                                        AssetName: detailedAsset.AssetName,
                                        AssetType: detailedAsset.AssetType
                                    }
                                    return CustomerAssetController.DBAction("POST", newRelation)
                                })
                            ).then(() => refreshData(x => x + 1))
                            break;
                    }
                }}
                Searchbar={(children, setFilters) => (
                    <SearchBar<OpenXDA.Types.Customer>
                        SetFilter={setFilters}
                        CollumnList={CustomerSearchCols}
                        defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                        Direction={'left'}
                        Width={'50%'}
                        Label={'Search'}
                    >
                        {children}
                    </SearchBar>
                )}
                Selection={selectedCustomers}
                Show={showAdd}
                Title={`Add Customer to ${recordType}`}
                Filters={noSameFilter}
            >
                <Column<OpenXDA.Types.Customer>
                    Key={'Name'}
                    Field={'Name'}
                >
                    Name
                </Column>
                <Column<OpenXDA.Types.Customer>
                    Key={'CustomerKey'}
                    Field={'CustomerKey'}
                >
                    Key
                </Column>
            </ControllerSelectPopup>
        </>
    )
}

export default CustomerRelation;