//******************************************************************************************************
//  CustomerAssetGroupPage.tsx - Gbtc
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
//  01/10/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { Table, Column } from '@gpa-gemstone/react-table';
import { LoadingIcon, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { CustomerSlice, AssetGroupSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { TrashCan } from '@gpa-gemstone/gpa-symbols';

declare var homePath: string;

interface IProps {
    ID: number,
    Name: string,
    Type: 'Meter' | 'Asset',
    SetWarning: (e: string[]) => void
}

interface CommonCustomerAssetMeter extends LocalXDA.CustomerAsset, LocalXDA.CustomerMeter { }
interface CommonAssetGroupAssetMeter extends LocalXDA.AssetAssetGroup, LocalXDA.MeterAssetGroup { }

export default function CustomerAssetGroupPage(props: IProps) {
    const [state, setState] = React.useState<Application.Types.Status>('unintiated');
    const dispatch = useAppDispatch();

    const [customerList, setCustomerList] = React.useState<CommonCustomerAssetMeter[]>([]);
    const [customerKey, setCustomerKey] = React.useState<string>('CustomerName');
    const [customerAsc, setCustomerAsc] = React.useState<boolean>(true);
    const [showCustomer, setShowCustomer] = React.useState<boolean>(false);
    const [selectedCustomers, setSelectedCustomers] = React.useState<OpenXDA.Types.Customer[]>([]);
    const [resetCustomer, setResetCustomer] = React.useState<number>(0);
    const customerStatus = useAppSelector(CustomerSlice.Status);
    const customerData = useAppSelector(CustomerSlice.Data);

    const [groupList, setGroupList] = React.useState<CommonAssetGroupAssetMeter[]>([]);
    const [groupKey, setGroupKey] = React.useState<string>('Name');
    const [groupAsc, setGroupAsc] = React.useState<boolean>(true);
    const [showGroup, setShowGroup] = React.useState<boolean>(false);
    const [selectedGroups, setSelectedGroups] = React.useState<OpenXDA.Types.AssetGroup[]>([]);
    const [resetGroup, setResetGroup] = React.useState<number>(0);
    const groupStatus = useAppSelector(AssetGroupSlice.Status);
    const groupData = useAppSelector(AssetGroupSlice.Data);

    React.useEffect(() => {
        let warnings = [];
        if (customerList.length < 1)
            warnings.push(`${props.Type} not assigned to any Customers.`);
        if (groupList.length < 1)
            warnings.push(`${props.Type} not assigned to any Asset Groups.`);
        props.SetWarning(warnings);
    }, [customerList, groupList]);

    React.useEffect(() => {
        if (showCustomer) {
            let customers = [];
            customerList.forEach((customer) => customers.push(customerData.find((customerDatum) => customer.CustomerID === customerDatum.ID)));
            setSelectedCustomers(customers);
        }
    }, [showCustomer]);

    React.useEffect(() => {
        if (showGroup) {
            let groups = [];
            groupList.forEach((group) => groups.push(groupData.find((groupDatum) => group.AssetGroupID === groupDatum.ID)));
            setSelectedGroups(groups);
        }
    }, [showGroup]);

    React.useEffect(() => {
        if (customerStatus === 'unintiated' || customerStatus === 'changed')
            dispatch(CustomerSlice.Fetch());
    }, [CustomerSlice]);

    React.useEffect(() => {
        if (groupStatus === 'unintiated' || groupStatus === 'changed')
            dispatch(AssetGroupSlice.Fetch());
    }, [AssetGroupSlice]);

    React.useEffect(() => {
        let customerHandle = getAssignedCustomerList();
        return () => {
            if (customerHandle != null && customerHandle.abort != null)
                customerHandle.abort();
        };
    }, [props.ID, props.Type, customerKey, customerAsc, resetCustomer]);

    React.useEffect(() => {
        let groupHandle = getAssignedGroupList();
        return () => {
            if (groupHandle != null && groupHandle.abort != null)
                groupHandle.abort();
        };
    }, [props.ID, props.Type, groupKey, groupAsc, resetGroup]);

    function deleteCustomer(cust: CommonCustomerAssetMeter) {
        setState('loading');
        let idList = [];

        let handle = $.ajax({
            type: 'DELETE',
            url: `${homePath}api/SystemCenter/Customer${props.Type}/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cust),
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done(() => {
            setResetCustomer(x => x + 1);
            setState('idle');
        }).fail(() => setState('error'));
    }

    function deleteGroup(cust: CommonAssetGroupAssetMeter) {
        setState('loading');
        let idList = [];

        let handle = $.ajax({
            type: 'DELETE',
            url: `${homePath}api/SystemCenter/AssetGroup${props.Type}/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cust),
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done(() => {
            setResetGroup(x => x + 1);
            setState('idle');
        }).fail(() => setState('error'));
    }

    function getAssignedCustomerList(): JQuery.jqXHR<CommonCustomerAssetMeter[]>{
        setState('loading');
        let handle = $.ajax({
            type: 'POST',
            url: `${homePath}api/SystemCenter/Customer${props.Type}/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{ FieldName: (props.Type === 'Meter' ? 'MeterID' : 'AssetID'), Operator: "=", SearchText: props.ID, Type: 'string', IsPivotColumn: false }],
                OrderBy: customerKey,
                Ascending: customerAsc
            }),
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((data) => {
            setCustomerList(JSON.parse(data.toString()));
            setState('idle');
        }).fail(() => setState('error'));
        return handle;
    }

    function postCustomerIdList(postList: OpenXDA.Types.Customer[]): JQuery.jqXHR {
        setState('loading');
        let idList = [];
        postList.forEach((customer) => {idList.push(customer.ID)});
        let handle = $.ajax({
            type: 'POST',
            url: `${homePath}api/SystemCenter/Customer${props.Type}/PostCustomerList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ CustomerIDs: idList, ID: props.ID }),
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done(() => {
            setResetCustomer(resetCustomer + 1);
            setState('idle');
        }).fail(() => setState('error'));
        return handle;
    }

    function getAssignedGroupList(): JQuery.jqXHR<CommonAssetGroupAssetMeter[]> {
        setState('loading');
        let handle = $.ajax({
            type: 'POST',
            url: `${homePath}api/SystemCenter/AssetGroup${props.Type}/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{ FieldName: (props.Type === 'Meter' ? 'MeterID' : 'AssetID'), Operator: "=", SearchText: props.ID, Type: 'string', IsPivotColumn: false }],
                OrderBy: groupKey,
                Ascending: groupAsc
            }),
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((data) => {
            setGroupList(JSON.parse(data.toString()));
            setState('idle');
        }).fail(() => setState('error'));
        return handle;
    }

    function postGroupIdList(postList: OpenXDA.Types.AssetGroup[]): JQuery.jqXHR {
        setState('loading');
        let idList = [];
        postList.forEach((group) => { idList.push(group.ID) });
        let handle = $.ajax({
            type: 'POST',
            url: `${homePath}api/SystemCenter/AssetGroup${props.Type}/PostGroupList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ GroupIDs: idList, ID: props.ID }),
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done(() => {
            setResetGroup(resetGroup + 1);
            setState('idle');
        }).fail(() => setState('error'));
        return handle;
    }

    if (state == 'loading')
        return (
            <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <LoadingIcon Show={true} Size={40} />
                </div>
            </div>);
    if (state == 'error')
        return (
            <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                </div>
            </div>);
    else
        return (
            <>
                <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                <div className={'row'} style={{ flex: 1, overflow: 'hidden' }}>
                        <div className="col-6" style={{
                            height: '100%', overflow: 'hidden',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            <div className={'row'}>
                                <div className='col-6'>
                                    <h4>
                                        Customers
                                    </h4>
                                </div>
                                <div className='col-6'>
                                    <button className="btn btn-primary pull-right"
                                        onClick={() => { setShowCustomer(true); }}>
                                        Assign
                                    </button>

                                </div>
                            </div>
                            <div className={'row'} style={{ flex: 1, overflow: 'hidden' }}>
                                <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                                    <Table<CommonCustomerAssetMeter>
                                        TableClass="table table-hover"
                                        Data={customerList}
                                        SortKey={customerKey}
                                        Ascending={customerAsc}
                                        OnSort={(d) => {
                                            if (d.colKey == 'btns')
                                                return;
                                            if (d.colKey === customerKey)
                                                setCustomerAsc(!customerAsc);
                                            else {
                                                setCustomerAsc(true);
                                                setCustomerKey(d.colKey);
                                            }
                                        }}
                                        TableStyle={{
                                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                                        }}
                                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        Selected={(item) => false}
                                        KeySelector={(item) => item.ID}
                                    >
                                        <Column<CommonCustomerAssetMeter>
                                            Key={'CustomerName'}
                                            AllowSort={true}
                                            Field={'CustomerName'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Customer
                                        </Column>
                                        <Column<CommonCustomerAssetMeter>
                                            Key={'CustomerKey'}
                                            AllowSort={true}
                                            Field={'CustomerKey'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Key
                                        </Column>
                                        <Column<CommonCustomerAssetMeter>
                                            Key={'btns'}
                                            AllowSort={false}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                            Content={({ item }) => <button className="btn btn-sm" onClick={(e) => deleteCustomer(item)}>{TrashCan}</button> }
                                        > <p></p>
                                        </Column>
                                    </Table>
                                </div>
                            </div>
                    </div>
                        <div className="col-6" style={{
                            height: '100%', overflow: 'hidden',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            <div className={'row'}>
                                <div className='col-6'>
                                    <h4>
                                        Asset Groups
                                    </h4>
                                </div>
                                <div className='col-6'>
                                    <button className="btn btn-primary pull-right"
                                        onClick={() => { setShowGroup(true); }}>
                                        Assign
                                    </button>

                                </div>
                            </div>
                            <div className={'row'} style={{ flex: 1, overflow: 'hidden' }}>
                                <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                                    <Table<CommonAssetGroupAssetMeter>
                                        TableClass="table table-hover"
                                        Data={groupList}
                                        SortKey={groupKey}
                                        Ascending={groupAsc}
                                        OnSort={(d) => {
                                            if (d.colKey == 'btns')
                                                return;
                                            if (d.colKey === groupKey)
                                                setGroupAsc(!groupAsc);
                                            else {
                                                setGroupAsc(true);
                                                setGroupKey(d.colKey);
                                            }
                                        }}
                                        TableStyle={{
                                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                                        }}
                                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        Selected={(item) => false}
                                        KeySelector={(item) => item.ID}
                                    >
                                        <Column<CommonAssetGroupAssetMeter>
                                            Key={'Name'}
                                            AllowSort={true}
                                            Field={'Name'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Asset Group
                                        </Column>
                                        <Column<CommonAssetGroupAssetMeter>
                                            Key={'DisplayDashboard'}
                                            AllowSort={true}
                                            Field={'DisplayDashboard'}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                        > Show in PQ Dashboard
                                        </Column>
                                        <Column<CommonAssetGroupAssetMeter>
                                            Key={'btns'}
                                            AllowSort={false}
                                            HeaderStyle={{ width: 'auto' }}
                                            RowStyle={{ width: 'auto' }}
                                            Content={({ item }) => <button className="btn btn-sm" onClick={(e) => deleteGroup(item)}>{TrashCan}</button> }
                                        > <p></p>
                                        </Column>
                                    </Table>
                                </div>
                            </div>
                    </div>
                </div>
                <DefaultSelects.Customer
                    Slice={CustomerSlice}
                    Selection={selectedCustomers}
                    OnClose={(selected, conf) => {
                        setShowCustomer(false);
                        if (conf) {
                            let customerHandle = postCustomerIdList(selected);
                            return () => {
                                if (customerHandle != null && customerHandle.abort != null)
                                    customerHandle.abort();
                            }
                        }
                    }}
                    Show={showCustomer}
                    Type={'multiple'}
                    Title={"Assign to Customers"}
                    GetEnum={() => { return () => { } }}
                        GetAddlFields={() => { return () => { } }}
                    >
                        <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        >Name</Column>
                        <Column Key="CustomerKey" Field="CustomerKey" HeaderStyle={{ width: '20%' }} RowStyle={{ width: '20%' }}
                        >Key</Column>
                        <Column Key="LSCVS" Field="LSCVS" HeaderStyle={{ width: '15%' }} RowStyle={{ width: '15%' }}
                        >LSCVS</Column>
                        <Column Key="Description" Field="Description" HeaderStyle={{ width: '40%' }} RowStyle={{ width: '40%' }}
                        >Description</Column>
                    </DefaultSelects.Customer>
                <DefaultSelects.AssetGroup
                    Slice={AssetGroupSlice}
                    Selection={selectedGroups}
                    OnClose={(selected, conf) => {
                        setShowGroup(false);
                        if (conf) {
                            let groupHandle = postGroupIdList(selected);
                            return () => {
                                if (groupHandle != null && groupHandle.abort != null)
                                    groupHandle.abort();
                            }
                        }
                    }}
                    Show={showGroup}
                    Type={'multiple'}
                    Title={"Assign to Asset Groups"}
                    GetEnum={() => { return () => { } }}
                        GetAddlFields={() => { return () => { } }}
                    >
                        <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        >Name</Column>
                        <Column Key="Assets" Field="Assets" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        >Assets</Column>
                        <Column Key="Meters" Field="Meters" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        >Meters</Column>
                        <Column Key="Users" Field="Users" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        >Users</Column>
                        <Column Key="AssetGroups" Field="AssetGroups" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                        >Sub Groups</Column>
                    </DefaultSelects.AssetGroup>
            </div>
            </>
        );
}