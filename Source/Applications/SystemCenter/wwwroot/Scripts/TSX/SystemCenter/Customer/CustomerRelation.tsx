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
import { OpenXDA as LocalXDA, SystemCenter as SC } from '../global';
import { GenericController, Search, SearchBar, LoadingScreen, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import ControllerSelectPopup from '../CommonComponents/ControllerSelectPopup';
import { Column } from '@gpa-gemstone/react-table';
import { SelectRoles } from '../Store/UserSettings';
import { useAppSelector, useControllerFetch } from '../hooks';
import { OperationResult } from '../CommonComponents/ResultAlert';
import moment from 'moment';

interface IProps {
    Record: OpenXDA.Types.Meter | OpenXDA.Types.Asset
    OperationResults: OperationResult[]
    SetOperationResults: React.Dispatch<React.SetStateAction<OperationResult[]>>
    ParentType: 'Meter' | 'Asset'
}
interface ICustomerRelation {
    ID: number,
    CustomerID: number
    CustomerName: string
    CustomerKey: string
}

interface CustomerRelationBaseProps<R extends ICustomerRelation> {
    Controller: GenericController<R>,
    ParentField: keyof R,
    BlankRecord: R,
    GetNewRecord: (customer: OpenXDA.Types.Customer) => R
    DetailedRecordStatus: Application.Types.Status
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

const BlankCustomerMeter: LocalXDA.CustomerMeter = { ID: -1, CustomerID: -1, MeterID: -1, CustomerKey: "", CustomerName: "", MeterKey: "", MeterName: "", MeterLocation: "" }
const BlankCustomerAsset: LocalXDA.CustomerAsset = { ID: -1, CustomerID: -1, AssetID: -1, CustomerKey: "", CustomerName: "", AssetKey: "", AssetName: "", AssetType: "" }


function CustomerRelationBase<R extends ICustomerRelation>(props: IProps & CustomerRelationBaseProps<R>) {
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [selectedCustomers, setSelectedCustomers] = React.useState<OpenXDA.Types.Customer[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [addStatus, setAddStatus] = React.useState<Application.Types.Status>('uninitiated');
    const roles = useAppSelector(SelectRoles);

    const { Data: relations, Status: relationStatus } = useControllerFetch<R>(props.Controller, undefined, undefined, undefined, refreshCount);
    const relationFilters: Search.IFilter<R>[] = React.useMemo(() => [{ SearchText: props.Record.ID.toString(), FieldName: props.ParentField.toString(), Operator: "=", Type: "number", IsPivotColumn: false }], [props.Record, props.ParentField])

    const noSameFilter: Search.IFilter<OpenXDA.Types.Customer>[] = React.useMemo(() => {
        const filter = {
            FieldName: 'ID',
            SearchText: relations.filter(cr => cr[props.ParentField] == props.Record.ID).map((r) => r.CustomerID).join(','),
            Operator: 'NOT IN' as Search.OperatorType,
            Type: 'string' as Search.FieldType,
            IsPivotColumn: false
        }
        return [filter];
    }, [relations, props.Record, props.ParentField]);


    const CustomerRelationColumns: SC.IByCol<R>[] = [
        { Field: "CustomerName", Label: "Customer Name", Type: "string" },
        { Field: "CustomerKey", Label: "Customer Key", Type: "string" }
    ]

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <>
            <LoadingScreen Show={props.DetailedRecordStatus === 'loading' || noSameFilter == null} />
            <ServerErrorIcon Show={props.DetailedRecordStatus === 'error'} />
            {props.DetailedRecordStatus  === 'idle' ?
                <GenericRelation<R>
                    PrimaryKey={"ID"}
                    Controller={props.Controller}
                    RecordType={'Customer Relation'}
                    Columns={CustomerRelationColumns}
                    GetName={() => ""}
                    BlankRecord={props.BlankRecord}
                    Filters={relationFilters}
                    DeleteColumn={true}
                    RefreshCount={refreshCount}
                    AddNew={() => setShowAdd(true)}
                    IsEditable={() => true}
                    HasPermissions={hasPermissions}
                    OperationResults={props.OperationResults}
                    SetOperationResults={props.SetOperationResults}
                    AddStatus={addStatus}
                    OnRefreshData={() => refreshData(x => x + 1)}
                /> : null}
            <ControllerSelectPopup<OpenXDA.Types.Customer>
                Controller={CustomerController}
                OnClose={(selected, conf) => {
                    setShowAdd(false);
                    setSelectedCustomers([]);
                    if (!conf) return;
                    setAddStatus('loading');
                    Promise.allSettled(
                        selected.map((customer) => {
                            const newRecord = props.GetNewRecord(customer);
                            if (newRecord[props.ParentField] === -1) return Promise.reject();
                            return props.Controller.DBAction("POST", newRecord)
                                .fail(() => {
                                    props.SetOperationResults((opres) => [{ OperationType: "SAVE", RecordType: `${props.ParentType} Customer Relation`, Result: "failure", Timestamp: moment().valueOf() }, ...opres])
                                    setAddStatus('error')
                                })
                        })
                    )
                        .then((results) => {
                            const failed = results.some(r => r.status === 'rejected')
                            if (!failed) {
                                props.SetOperationResults(opResults => [{ Result: 'success', RecordType: `Customer Relation`, OperationType: "SAVE", Timestamp: moment().valueOf() }, ...opResults])
                                setAddStatus('idle');
                            }
                            refreshData(x => x + 1);
                        })
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
                Title={`Add Customer to ${props.ParentType}`}
                BaseFilters={noSameFilter}
                PrimaryKey={'ID'}
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

const CustomerRelation = (props: IProps) => {
    const [detailedRecord, setDetailedRecord] = React.useState<SystemCenter.Types.DetailedMeter | SystemCenter.Types.DetailedAsset | null>(null)
    const [detailedRecordStatus, setDetailedRecordStatus] = React.useState<Application.Types.Status>('uninitiated');

    React.useEffect(() => {
        const getUrl = props.ParentType === 'Meter' ? `${homePath}api/OpenXDA/ByMeter/One/${props.Record.ID}` : `${homePath}api/OpenXDA/ByAsset/One/${props.Record.ID}`
        setDetailedRecordStatus('loading');
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

    }, [props.Record, props.ParentType])

    const getNewCustomerMeter = React.useCallback((customer: OpenXDA.Types.Customer): LocalXDA.CustomerMeter => {
        if (detailedRecord == null || detailedRecordStatus !== 'idle') return BlankCustomerMeter;
        const detailedMeter = detailedRecord as SystemCenter.Types.DetailedMeter;
        return {
            ID: -1,
            MeterID: props.Record.ID,
            CustomerID: customer.ID,
            CustomerKey: customer.CustomerKey,
            CustomerName: customer.Name,
            MeterKey: props.Record.AssetKey,
            MeterLocation: detailedMeter.Location,
            MeterName: detailedMeter.Name
        }
    }, [detailedRecord, detailedRecordStatus, props.Record]);

    const getNewCustomerAsset = React.useCallback((customer: OpenXDA.Types.Customer): LocalXDA.CustomerAsset => {
        if (detailedRecord == null || detailedRecordStatus !== 'idle') return BlankCustomerAsset;
        const detailedAsset = detailedRecord as SystemCenter.Types.DetailedAsset;
        return {
            ID: -1,
            AssetID: props.Record.ID,
            CustomerID: customer.ID,
            CustomerKey: customer.CustomerKey,
            CustomerName: customer.Name,
            AssetKey: props.Record.AssetKey,
            AssetName: detailedAsset.AssetName,
            AssetType: detailedAsset.AssetType
        }
    }, [detailedRecord, detailedRecordStatus, props.Record]);

    return (
        props.ParentType === 'Meter'
            ? <CustomerRelationBase<LocalXDA.CustomerMeter>
                {...props}
                Controller={CustomerMeterController}
                ParentField={'MeterID'}
                BlankRecord={BlankCustomerMeter}
                GetNewRecord={getNewCustomerMeter}
                DetailedRecordStatus={detailedRecordStatus} 
            />
            : <CustomerRelationBase<LocalXDA.CustomerAsset>
                {...props}
                Controller={CustomerAssetController}
                ParentField={'AssetID'}
                BlankRecord={BlankCustomerAsset}
                GetNewRecord={getNewCustomerAsset}
                DetailedRecordStatus={detailedRecordStatus} 
            />
    )

}

export default CustomerRelation;