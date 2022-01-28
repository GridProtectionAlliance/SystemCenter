//******************************************************************************************************
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
import { useSelector, useDispatch } from 'react-redux';
import { CustomerSlice } from '../Store/Store';
import { Warning } from '@gpa-gemstone/react-interactive';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'
import MDMKeys from './MDMKeys';

declare var homePath: string;

interface IProps { CustomerID: number}
export default function Customer(props: IProps) {
    const dispatch = useDispatch();

    const [tab, setTab] = React.useState<string>(getTab());
    const customer = useSelector((state) => CustomerSlice.Datum(state, props.CustomerID)) as OpenXDA.Types.Customer;
    const cStatus = useSelector(CustomerSlice.Status) as Application.Types.Status;
    const [showWarning, setShowWarning] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (getTab() != tab)
            sessionStorage.setItem('Customer.Tab', JSON.stringify(tab));

    }, [tab])

    React.useEffect(() => {
        if (cStatus == 'unintiated' || cStatus == 'changed')
            dispatch(CustomerSlice.Fetch());
    }, []);

    React.useEffect(() => {
        if (cStatus == 'unintiated' || cStatus == 'changed')
            dispatch(CustomerSlice.Fetch());
    }, [cStatus])


    function getTab(): string {
        if (sessionStorage.hasOwnProperty('Customer.Tab'))
            return JSON.parse(sessionStorage.getItem('Customer.Tab'));
        else
            return 'customerInfo';
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

    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{customer != null ? customer.Name : ''}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={customer == null} onClick={() => setShowWarning(true)}>Delete Customer</button>
                </div>
            </div>


            <hr />
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "customerInfo" ? " active" : "")} onClick={() => setTab('customerInfo')} data-toggle="tab" href="#customerInfo">Customer Info</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "additionalFields" ? " active" : "")} onClick={() => setTab('additionalFields')} data-toggle="tab">Additional Fields</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "meters" ? " active" : "")} onClick={() => setTab('meters')} data-toggle="tab" href="#meters">Assigned Meters</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "notes" ? " active" : "")} onClick={() => setTab('notes')} data-toggle="tab" href="#notes">Notes</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link" + (tab == "mdmkeys" ? " active" : "")} onClick={() => setTab('mdmkeys')} data-toggle="tab" href="#mdmkeys">MDM Keys</a>
                </li>
            </ul>

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "customerInfo" ? " active" : "fade")} id="customerInfo">
                    <CustomerInfo Customer={customer} stateSetter={(record) => dispatch(CustomerSlice.DBAction({ verb: 'PATCH', record: record }))} />
                </div>
                <div className={"tab-pane " + (tab == "additionalFields" ? " active" : "fade")} id="additionalFields">
                    <AdditionalFieldsWindow ID={customer.ID} Type='Customer' Tab={tab} />
                </div>
                <div className={"tab-pane " + (tab == "meters" ? " active" : "fade")} id="meters">
                    <CustomerMeterWindow Customer={customer} />
                </div>
                <div className={"tab-pane " + (tab == "notes" ? " active" : "fade")} id="notes" >
                    <NoteWindow ID={props.CustomerID} Type='Customer' />
                </div>
                <div className={"tab-pane " + (tab == "mdmkeys" ? " active" : "fade")} id="mdmkeys" >
                    <MDMKeys CustomerID={customer.ID} />
                </div>
            </div>
            <Warning Title={'Confirm'} Show={showWarning} Message={'This will permanently delete this Customer.'} CallBack={(c) => { if (c) deleteCustomer(); setShowWarning(false)}} />
        </div>
    )

}