﻿//******************************************************************************************************
//  Meter.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/27/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import NoteWindow from '../CommonComponents/NoteWindow';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import CustomerInfo from './CustomerInfo';
import CustomerMeterWindow from './CustomerMeter';
import { useAppSelector, useAppDispatch } from '../hooks';
import { CustomerSlice } from '../Store/Store';
import { TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'
import MDMKeys from './MDMKeys';
import CustomerAssetWindow from './CustomerAsset';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;
declare type Tab = 'info' | 'notes' | 'additionalFields' | 'meters' | 'assets' | 'mdm'

interface IProps { CustomerID: number, Tab: Tab }

const Tabs = [
    { Id: "info", Label: "Customer Info" },
    { Id: "notes", Label: "Notes" },
    { Id: "additionalFields", Label: "Additional Fields" },
    { Id: "meters", Label: "Assigned Meters" },
    { Id: "assets", Label: "Assigned Assets" },
    { Id: "mdm", Label: "MDM Keys" },
]

export default function Customer(props: IProps) {
    const dispatch = useAppDispatch();
    const [tab, setTab] = React.useState(getTab());
    const customer = useAppSelector((state) => CustomerSlice.Datum(state, props.CustomerID)) as OpenXDA.Types.Customer;
    const cStatus = useAppSelector(CustomerSlice.Status) as Application.Types.Status;
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('Customer.Tab', JSON.stringify(tab));
    }, [tab]);

    React.useEffect(() => {
        if (cStatus == 'unintiated' || cStatus == 'changed')
            dispatch(CustomerSlice.Fetch());
    }, [cStatus])

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('Customer.Tab'))
            return JSON.parse(sessionStorage.getItem('Customer.Tab'));
        else
            return 'info';
    }

    function deleteCustomer() {
        dispatch(CustomerSlice.DBAction({
            verb: 'DELETE', record: customer
        }));
        window.location.href = homePath + 'index.cshtml?name=PQViewCustomers'
    }

    if (cStatus == 'unintiated' || cStatus == 'loading')
        return null;

    if (cStatus == 'error')
        return null;

    if (customer == null)
        return null;

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row p-2">
                <div className="col">
                    <h2>{customer != null ? customer.Name : ''}</h2>
                </div>
                <div className="col">
                    <button className={"btn btn-danger pull-right"} hidden={(customer == null) || !hasPermissions()} onClick={() => { if (hasPermissions()) setShowWarning(true) }}>Delete Customer</button>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            {tab === 'info' ? ( <CustomerInfo Customer={customer} stateSetter={(record) => dispatch(CustomerSlice.DBAction({ verb: 'PATCH', record: record }))} /> ) : null}
            {tab === 'additionalFields' ? ( <AdditionalFieldsWindow ID={customer.ID} Type='Customer' Tab={tab} /> ) : null}
            {tab === 'meters' ? <CustomerMeterWindow Customer={customer} /> : null}
            {tab === 'assets' ? <CustomerAssetWindow Customer={customer} /> : null}
            {tab === 'notes' ? <NoteWindow ID={props.CustomerID} Type='Customer' /> : null}
            {tab === 'mdm' ? <MDMKeys CustomerID={customer.ID} /> : null}

            <Warning Title={'Delete ' + (customer?.Name ?? 'Customer')} Show={showWarning} Message={'This will permanently delete this Customer.'} CallBack={(c) => { if (c) deleteCustomer(); setShowWarning(false)}} />
        </div>
    )
}