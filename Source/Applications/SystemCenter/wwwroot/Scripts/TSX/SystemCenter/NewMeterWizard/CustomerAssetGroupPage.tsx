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
import Table from '@gpa-gemstone/react-table'
import { LoadingIcon, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { CustomerSlice, AssetGroupSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';

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
            warnings.push(`${props.Type} not assigned to any customers.`);
        if (groupList.length < 1)
            warnings.push(`${props.Type} not assigned to any groups.`);
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

    function getAssignedCustomerList(): JQuery.jqXHR<CommonCustomerAssetMeter[]>{
        setState('loading');
        let handle = $.ajax({
            type: 'POST',
            url: `${homePath}api/SystemCenter/Customer${props.Type}/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{ FieldName: (props.Type === 'Meter' ? 'MeterID' : 'AssetID'), Operator: "=", SearchText: props.ID, Type: 'string', isPivotColumn: false }],
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
                Searches: [{ FieldName: (props.Type === 'Meter' ? 'MeterID' : 'AssetID'), Operator: "=", SearchText: props.ID, Type: 'string', isPivotColumn: false }],
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

    let cardBody;
    if (state == 'loading')
        cardBody = (
            <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <LoadingIcon Show={true} Size={40} />
                </div>
            </div>);
    else if (state == 'error')
        cardBody = (
            <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                </div>
            </div>);
    else
        cardBody = (
            <>
                <div className="row" style={{ height: '100%' }}>
                    <div className="col" style={{width: '50%'}}>
                        <div className="card" style={{ marginBottom: 10, height: '100%', maxHeight: window.innerHeight - 215 }}>
                            <div className="card-header">
                                <h4>{"Customers Assigned:"}</h4>
                            </div>
                            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                                <Table<CommonCustomerAssetMeter>
                                    cols={[
                                        { key: 'CustomerName', field: 'CustomerName', label: 'Customer', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                        { key: 'CustomerKey', field: 'CustomerKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } }
                                    ]}
                                    tableClass="table table-hover"
                                    data={customerList}
                                    sortKey={customerKey}
                                    ascending={customerAsc}
                                    onSort={(d) => {
                                        if (d.colKey === customerKey)
                                            setCustomerAsc(!customerAsc);
                                        else {
                                            setCustomerAsc(true);
                                            setCustomerKey(d.colKey);
                                        }
                                    }}
                                    onClick={() => { }}
                                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
                                    rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                    selected={() => false}
                                />
                            </div>
                            <div className="card-footer">
                                <div className="col-1 pull-right">
                                    <button className="btn btn-primary pull-right" onClick={() => { setShowCustomer(true); }}>Assign to Customers</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col" style={{ width: '50%' }}>
                        <div className="card" style={{ marginBottom: 10, height: '100%', maxHeight: window.innerHeight - 215 }}>
                            <div className="card-header">
                                <h4>{"Asset Groups Assigned:"}</h4>
                            </div>
                            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                                <Table<CommonAssetGroupAssetMeter>
                                    cols={[
                                        { key: 'Name', field: 'Name', label: 'Asset Group', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                        { key: 'DisplayDashboard', field: 'DisplayDashboard', label: 'Show in PQ Dashboard', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } }
                                    ]}
                                    tableClass="table table-hover"
                                    data={groupList}
                                    sortKey={groupKey}
                                    ascending={groupAsc}
                                    onSort={(d) => {
                                        if (d.colKey === groupKey)
                                            setGroupAsc(!groupAsc);
                                        else {
                                            setGroupAsc(true);
                                            setGroupKey(d.colKey);
                                        }
                                    }}
                                    onClick={() => { }}
                                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
                                    rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                    selected={() => false}
                                />
                            </div>
                            <div className="card-footer">
                                <div className="col-1 pull-right">
                                    <button className="btn btn-primary pull-right" onClick={() => { setShowGroup(true); }}>Assign to Asset Groups</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            </>
        );

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215, height: '100%'  }}>
            <div className="card-header">
                <div className="row">
                    <h4>{`Assign ${props.Name} to Customers and Asset Groups:`}</h4>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto', height: '100%' }}>
                {cardBody}
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
                Columns={[
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'CustomerKey', field: 'CustomerKey', label: 'Customer Key', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                    { key: 'LSCVS', field: 'LSCVS', label: 'LSCVS', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                    { key: 'Description', field: 'Description', label: 'Description', headerStyle: { width: '40%' }, rowStyle: { width: '40%' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Assign to Customers"}
                GetEnum={() => { return () => { } }}
                GetAddlFields={() => { return () => { } }} />
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
                Columns={[
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Assets', field: 'Assets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Users', field: 'Users', label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetGroups', field: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Assign to Groups"}
                GetEnum={() => { return () => { } }}
                GetAddlFields={() => { return () => { } }} />
        </div>);
}